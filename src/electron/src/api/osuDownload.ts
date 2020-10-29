import axios, { AxiosResponse } from 'axios'
import fs from 'fs'
import eventListener from 'events'
import { ipcMain } from 'electron'

import OsuApi from './osuApi'
import delay from '../utils/delay'
import { IBeatmapIdList } from './osuFavoriteList'
import { IpcMainEvent } from 'electron/main'
import Error from '../utils/errorType'

let listener = new eventListener()

ipcMain.on("stopDownload", event => {
    console.log("download stopped")
    listener.emit("stopDownload")
})

async function downloadSingleBeatmap(this: OsuApi, beatmapId: number, noVideo: boolean = false){
    const beatmap = await axios.get(`https://osu.ppy.sh/beatmapsets/${beatmapId}/download`, {
        params: {
            noVideo: noVideo ? 1 : 0
        },
        responseType: "stream",
        jar: this.cookieJar,
        headers: this.getHeader(`https://osu.ppy.sh/beatmapsets/${beatmapId}`)
    })
    await delay(this.globalDelay)
    return beatmap
}

async function downloadBeatmapList(this: OsuApi, beatmapList: IBeatmapIdList[], offset: number, path: string, noVideo?: boolean, event?: IpcMainEvent){
    for(let i=offset; i<beatmapList.length; i++){
        const item = beatmapList[i]
        if(item){
            try{
                const beatmap = await this.downloadSingleBeatmap(item.id, noVideo)
                if(beatmap){
                    await saveBeatmap(beatmap, path, item.id, event)
                    await delay(this.globalDelay*3)
                }else{
                    return false
                } 
            }catch(err){
                if(event && err !== "download-stopped" && !Error.sendInternetErrorMessage(err, event, true))
                    Error.sendFileError(event)
                event?.reply("downloadCanceled")
                return false
            }
        }else{
            if(event) Error.sendUnknownError("error on download beatmap list - 1", event)
            return false
        }
        event?.reply("finishedMapDownload", item.id)
    }
    return true
}

async function saveBeatmap(beatmap: AxiosResponse, path: string, beatmapId: number, event?: IpcMainEvent){
    return new Promise((resolve, reject) => {
        const dest = fs.createWriteStream(path + "\\" + beatmapId + ".osz")
        beatmap.data.pipe(dest)
        
        const mapSize = Number.parseInt(beatmap.data.headers['content-length'])

        const updateProgress = setInterval(() => {
            const progress = Math.trunc(dest.bytesWritten/mapSize*100)
            if(event) event.reply("progressUpdate", progress)
        }, 500)

        listener.on("stopDownload", () => {
            clearInterval(updateProgress)
            dest.destroy()
            fs.unlinkSync(dest.path)
            listener = new eventListener()
            reject("download-stopped")
        })

        dest.on("finish", () => {
            console.log("finished download of " + beatmapId)
            clearInterval(updateProgress)
            listener = new eventListener()
            resolve()
        })
        dest.on("error", () => {
            clearInterval(updateProgress)
            listener = new eventListener()
            console.log("----- Error on archive -----")
            reject("ERROR ON ARCHIVE")
        });
    })
}

export default {
    downloadSingleBeatmap,
    saveBeatmap,
    downloadBeatmapList
}
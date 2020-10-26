import axios, { AxiosResponse } from 'axios'
import fs from 'fs'

import OsuApi from './osuApi'
import delay from '../utils/delay'
import { IBeatmapIdList } from './osuFavoriteList'
import { ipcMain } from 'electron'
import { IpcMainEvent } from 'electron/main'

axios({
    url: "https://osu.ppy.sh/beatmapsets/",
    onDownloadProgress(progressEvent){
        console.log(progressEvent)
        //console.log(progressEvent.target, progressEvent.loaded, progressEvent.total, progressEvent.lengthComputable)
    }
})

async function downloadSingleBeatmap(this: OsuApi, beatmapId: number, noVideo: boolean = false){
    try{
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
    }catch(err){
        console.log(err)
        console.log("error on download single beatmap")
    }
}

async function downloadBeatmapList(this: OsuApi, beatmapList: IBeatmapIdList[], offset: number, path: string, noVideo?: boolean, event?: IpcMainEvent){
    for(let i=offset; i<beatmapList.length; i++){
        const item = beatmapList[i]
        if(item){
            const beatmap = await this.downloadSingleBeatmap(item.id, noVideo)
            if(beatmap) await saveBeatmap(beatmap, path, item.id, event)
            else return false
        }else{
            return false
        }
    }
    return true
}

async function saveBeatmap(beatmap: AxiosResponse, path: string, beatmapId: number, event?: IpcMainEvent){
    return new Promise((resolve, reject) => {
        const dest = fs.createWriteStream(path + "\\" + beatmapId + ".osz");
        beatmap.data.pipe(dest)
        
        const mapSize = Number.parseInt(beatmap.data.headers['content-length'])

        const updateProgress = setInterval(() => {
            const progress = Math.trunc(dest.bytesWritten/mapSize*100)
            if(event) event.reply("progressUpdate", progress)
        }, 500)

        dest.on("finish", () => {
            console.log("finished download of " + beatmapId)
            clearInterval(updateProgress)
            resolve()
        })
        dest.on("error", () => reject("ERROR ON ARCHIVE"));

        
    })
}

export default {
    downloadSingleBeatmap,
    saveBeatmap,
    downloadBeatmapList
}
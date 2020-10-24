import axios, { AxiosResponse } from 'axios'
import fs from 'fs'

import OsuApi from './osuApi'
import delay from '../utils/delay'
import { IBeatmapIdList } from './osuFavoriteList'
import { IpcMain } from 'electron'

async function downloadSingleBeatmap(this: OsuApi, beatmapId: number, noVideo: boolean = false){
    try{
        const beatmap = await axios.get(`https://osu.ppy.sh/beatmapsets/${beatmapId}/download`, {
            params: {
                noVideo: noVideo ? 1 : 0
            },
            responseType: 'stream',
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

async function downloadBeatmapList(this: OsuApi, beatmapList: IBeatmapIdList[], offset: number, path: string, noVideo?: boolean){
    for(let i=offset; i<beatmapList.length; i++){
        const item = beatmapList.shift()
        if(item){
            const beatmap = await this.downloadSingleBeatmap(item.id, noVideo)
            if(beatmap) await saveBeatmap(beatmap, path, item.id)
            else return false
        }
        else{
            return false
        } 
    }
    return true
}

async function saveBeatmap(beatmap: AxiosResponse, path: string, beatmapId: number){
    return new Promise((resolve, reject) => {
        const dest = fs.createWriteStream(path + "\\" + beatmapId + ".osz");
        beatmap.data.pipe(dest)
        beatmap.data.on("end", () => resolve());
        dest.on("error", () => reject("ERROR ON ARCHIVE"));
    })
}

export default {
    downloadSingleBeatmap,
    saveBeatmap,
    downloadBeatmapList
}
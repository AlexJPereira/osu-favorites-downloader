import OsuApi from './osuApi'
import delay from '../utils/delay'
import axios, { AxiosResponse } from 'axios'
import fs from 'fs'

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

async function saveBeatmap(beatmap: AxiosResponse, path: string, beatmapId: number){
    return new Promise((resolve, reject) => {
        const dest = fs.createWriteStream(path + beatmapId + ".osz");
        beatmap.data.pipe(dest)
        beatmap.data.on("end", () => resolve());
        dest.on("error", () => reject("ERROR ON ARCHIVE"));
    })
}

export default {
    downloadSingleBeatmap,
    saveBeatmap
}
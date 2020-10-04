import OsuApi from './osuApi'
import delay from '../utils/delay'
import axios from 'axios'

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

export default {
    downloadSingleBeatmap
}
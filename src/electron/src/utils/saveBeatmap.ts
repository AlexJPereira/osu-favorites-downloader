import { AxiosResponse } from 'axios'
import fs from 'fs'

export default async function(beatmap: AxiosResponse, path: string, beatmapId: number){
    return new Promise((resolve, reject) => {
        const dest = fs.createWriteStream(path + beatmapId + ".osz");
        beatmap.data.pipe(dest)
        beatmap.data.on("end", () => resolve());
        dest.on("error", () => reject("ERROR ON ARCHIVE"));
    })
}
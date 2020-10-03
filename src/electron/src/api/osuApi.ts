import axios from 'axios'
import axiosCookieJarSupport from 'axios-cookiejar-support'
import tough from 'tough-cookie'
import dotenv from 'dotenv'
import { stringify } from 'querystring'

import delay from '../utils/delay'
import saveBeatmap from '../utils/saveBeatmap'


//dotenv.config({path: "../../.env"})
dotenv.config()
axiosCookieJarSupport(axios)
axios.defaults.withCredentials = true

const envUsername = process.env.OSU_USERNAME || ""
const envPassword = process.env.OSU_PASSWORD || ""

export default class OsuApi{
    private cookieJar = new tough.CookieJar(undefined, { rejectPublicSuffixes: false })
    private globalDelay = 1000
    private xsrfToken = ""
    private xsrfTokenName = ""

    async tests(){
        await this.getCookies()
        await this.loginOsuUser(envUsername, envPassword)
        const a1 = await this.downloadSingleBeatmap(1143263)
        if(a1)
            await saveBeatmap(a1, "D:\\maps\\", 1143263)
    }
    
    async getCookies(){
        const starterPage = await axios.get("https://osu.ppy.sh/home", { jar: this.cookieJar })
        this.xsrfTokenName = starterPage.config.xsrfCookieName || ""
        this.updateXsrfToken()
        await delay(this.globalDelay)
    }

    updateXsrfToken(){
        this.xsrfToken = this.cookieJar.getCookiesSync("https://osu.ppy.sh/").find(cookie => cookie.key === this.xsrfTokenName)?.value || ""
    }

    async loginOsuUser(username: string, password: string){
        await axios.post("https://osu.ppy.sh/session",stringify({
            _token: this.xsrfToken,
            username,
            password
        }), {
            jar: this.cookieJar,
            headers: this.getHeader("https://osu.ppy.sh/home"),
        })

        this.updateXsrfToken()
        await delay(this.globalDelay)
    }

    async downloadSingleBeatmap(beatmapId: number, noVideo: boolean = false){
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

    getHeader(Referer: string){
        return {
            "X-CSRF-Token": this.xsrfToken,
            Cookie: this.cookieJar.getCookieStringSync("https://osu.ppy.sh/"),
            "Referer": Referer,
        }
    }
}

//const test = new OsuApi()
//test.tests()

import axios from 'axios'
import axiosCookieJarSupport from 'axios-cookiejar-support'
import tough from 'tough-cookie'
import dotenv from 'dotenv'

import delay from '../utils/delay'
import { stringify } from 'querystring'

dotenv.config({path: "../../.env"})
axiosCookieJarSupport(axios)
axios.defaults.withCredentials = true

const envUsername = process.env.OSU_USERNAME || ""
const envPassword = process.env.OSU_PASSWORD || ""

export default class OsuApi{
    private cookieJar = new tough.CookieJar()
    private globalDelay = 1000
    private xsrfToken = ""

    async tests(){
        await this.getCookies()
        const resp = await this.loginOsuUser(envUsername, envPassword)
        console.log(resp)
    }
    
    async getCookies(){
        const starterPage = await axios.get("https://osu.ppy.sh/home", { jar: this.cookieJar })
        const xsrfTokenName = starterPage.config.xsrfCookieName || ""
        this.xsrfToken = this.cookieJar.getCookiesSync("https://osu.ppy.sh/home").find(cookie => cookie.key === xsrfTokenName)?.value || ""
        await delay(this.globalDelay)
    }

    async loginOsuUser(username: string, password: string){
        return await axios.post("https://osu.ppy.sh/session",stringify({
            _token: this.xsrfToken,
            username,
            password
        }), {
            headers: this.getHeader(),
        })
    }

    getHeader(){
        return {
            "X-CSRF-Token": this.xsrfToken,
            Cookie: this.cookieJar.getCookieStringSync("https://osu.ppy.sh/home"),
            "Referer": "https://osu.ppy.sh/home",
        }
    }
}

const test = new OsuApi()
test.tests()
import OsuApi from './osuApi'
import delay from '../utils/delay'
import { stringify } from 'querystring'
import axios from 'axios'
import OsuUser from './osuUser'

async function getCookies(this: OsuApi){
    const starterPage = await axios.get("https://osu.ppy.sh/home", { jar: this.cookieJar })
    this.xsrfTokenName = starterPage.config.xsrfCookieName || ""
    this.updateXsrfToken()
    await delay(this.globalDelay)
}

async function loginOsuUser(this: OsuApi, username: string, password: string){
    const loginPage = await axios.post("https://osu.ppy.sh/session",stringify({
        _token: this.xsrfToken,
        username,
        password
    }), {
        jar: this.cookieJar,
        headers: this.getHeader("https://osu.ppy.sh/home"),
    })

    this.updateXsrfToken()
    await delay(this.globalDelay)
    this.osuUser = new OsuUser(loginPage)
    return this.osuUser
}

function updateXsrfToken(this: OsuApi){
    this.xsrfToken = this.cookieJar.getCookiesSync("https://osu.ppy.sh/").find(cookie => cookie.key === this.xsrfTokenName)?.value || ""
}

export default {
    getCookies,
    updateXsrfToken,
    loginOsuUser
}
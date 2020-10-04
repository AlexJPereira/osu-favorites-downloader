import axios from 'axios'
import axiosCookieJarSupport from 'axios-cookiejar-support'
import tough from 'tough-cookie'
import dotenv from 'dotenv'
import { stringify } from 'querystring'

import OsuUser from './osuUser'

import OsuLogin from './osuLogin'
import OsuDownload from './osuDownload'
import OsuFavoriteList from './osuFavoriteList'

dotenv.config({path: "../../.env"})
axiosCookieJarSupport(axios)
const envUsername = process.env.OSU_USERNAME || ""
const envPassword = process.env.OSU_PASSWORD || ""

export default class OsuApi{
    protected cookieJar = new tough.CookieJar(undefined, { rejectPublicSuffixes: false })
    protected globalDelay = 1000
    protected xsrfToken = ""
    protected xsrfTokenName = ""

    async tests(){
        // await this.getCookies()
        // const page = await this.loginOsuUser(envUsername, envPassword)
        // const wykke = new OsuUser(page)
        // console.log(wykke.userPic)
        console.log(await this.getFavoriteCount(9866460))
    }
    
    getCookies = OsuLogin.getCookies.bind(this)
    updateXsrfToken = OsuLogin.updateXsrfToken.bind(this)
    loginOsuUser = OsuLogin.loginOsuUser.bind(this)

    getFavoriteCount = OsuFavoriteList.getFavoriteCount.bind(this)

    downloadSingleBeatmap = OsuDownload.downloadSingleBeatmap.bind(this)
    saveBeatmap = OsuDownload.saveBeatmap

    getHeader(Referer: string){
        return {
            "X-CSRF-Token": this.xsrfToken,
            Cookie: this.cookieJar.getCookieStringSync("https://osu.ppy.sh/"),
            "Referer": Referer,
        }
    }
}

const test = new OsuApi()
test.tests()

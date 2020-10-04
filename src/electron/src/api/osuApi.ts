import axios from 'axios'
import axiosCookieJarSupport from 'axios-cookiejar-support'
import tough from 'tough-cookie'
import dotenv from 'dotenv'

import OsuUser from './osuUser'

import OsuLogin from './osuLogin'
import OsuDownload from './osuDownload'
import OsuFavoriteList from './osuFavoriteList'
import osuFavoriteList from './osuFavoriteList'

dotenv.config({path: "../../.env"})
axiosCookieJarSupport(axios)
const envUsername = process.env.OSU_USERNAME || ""
const envPassword = process.env.OSU_PASSWORD || ""

export default class OsuApi{
    protected cookieJar = new tough.CookieJar(undefined, { rejectPublicSuffixes: false })
    protected globalDelay = 1000
    protected maxFavoriteCallCount = 50
    protected xsrfToken = ""
    protected xsrfTokenName = ""

    public osuUser: OsuUser | undefined = undefined

    async tests(){
        // await this.getCookies()
        // const page = await this.loginOsuUser(envUsername, envPassword)
        // const wykke = new OsuUser(page)
        // console.log(wykke.userPic)
        const btmcount = await this.getFavoriteCount(9866460)
        console.log((await this.getUserFavoriteBeatmapsIds(9866460, 0, btmcount)).length, btmcount)
    }
    
    getCookies = OsuLogin.getCookies.bind(this)
    updateXsrfToken = OsuLogin.updateXsrfToken.bind(this)
    loginOsuUser = OsuLogin.loginOsuUser.bind(this)

    getFavoriteCount = OsuFavoriteList.getFavoriteCount.bind(this)
    getUserFavouriteBeatmaps = OsuFavoriteList.getUserFavouriteBeatmaps.bind(this)
    getUserFavoriteBeatmapsIds = osuFavoriteList.getUserFavoriteBeatmapsIds.bind(this)

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

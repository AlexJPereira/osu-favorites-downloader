import axios from 'axios'
import axiosCookieJarSupport from 'axios-cookiejar-support'
import tough from 'tough-cookie'

import OsuUser from './osuUser'

import OsuLogin from './osuLogin'
import OsuDownload from './osuDownload'
import OsuFavoriteList from './osuFavoriteList'
import osuFavoriteList from './osuFavoriteList'

axiosCookieJarSupport(axios)

export default class OsuApi{
    protected cookieJar = new tough.CookieJar(undefined, { rejectPublicSuffixes: false })
    protected globalDelay = 1000
    protected maxFavoriteCallCount = 50
    protected xsrfToken = ""
    protected xsrfTokenName = ""

    public osuUser: OsuUser | undefined = undefined
    
    getCookies = OsuLogin.getCookies.bind(this)
    updateXsrfToken = OsuLogin.updateXsrfToken.bind(this)
    loginOsuUser = OsuLogin.loginOsuUser.bind(this)

    getFavoriteCount = OsuFavoriteList.getFavoriteCount.bind(this)
    getUserFavouriteBeatmaps = OsuFavoriteList.getUserFavouriteBeatmaps.bind(this)
    getUserFavoriteBeatmapsIds = osuFavoriteList.getUserFavoriteBeatmapsIds.bind(this)

    downloadSingleBeatmap = OsuDownload.downloadSingleBeatmap.bind(this)
    downloadBeatmapList = OsuDownload.downloadBeatmapList.bind(this)
    saveBeatmap = OsuDownload.saveBeatmap

    getHeader(Referer: string){
        return {
            "X-CSRF-Token": this.xsrfToken,
            Cookie: this.cookieJar.getCookieStringSync("https://osu.ppy.sh/"),
            "Referer": Referer,
        }
    }
}

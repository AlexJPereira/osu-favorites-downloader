import OsuApi from './osuApi'
import delay from '../utils/delay'
import axios from 'axios'

async function getFavoriteCount(this: OsuApi, userId: number){
    const userPage = await axios.get(`https://osu.ppy.sh/users/${userId}`, { jar: this.cookieJar })
    const favCountLocation = userPage.data.indexOf('"favourite_beatmapset_count":')
    const favTagLength = '"favourite_beatmapset_count":'.length
    const favCount = userPage.data.substring(favCountLocation + favTagLength, userPage.data.indexOf(",",favCountLocation))
    return favCount
}

export default {
    getFavoriteCount
}
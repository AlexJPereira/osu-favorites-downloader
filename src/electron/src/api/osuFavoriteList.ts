import OsuApi from './osuApi'
import delay from '../utils/delay'
import axios from 'axios'

interface IBeatmapFavoriteList{
    artist: string
    covers: {
        cover: string
        list: string
    }
    title: string
    title_unicode: string
    video: boolean
    favourite_count: number
    play_count: number
    id: number
    preview_url: string
    creator: string
}

async function getFavoriteCount(this: OsuApi, userId: number){
    const userPage = await axios.get(`https://osu.ppy.sh/users/${userId}`, { jar: this.cookieJar })
    const favCountLocation = userPage.data.indexOf('"favourite_beatmapset_count":')
    const favTagLength = '"favourite_beatmapset_count":'.length
    const favCount = userPage.data.substring(favCountLocation + favTagLength, userPage.data.indexOf(",",favCountLocation))
    await delay(this.globalDelay)
    return Number.parseInt(favCount)
}

async function getUserFavouriteBeatmaps(this: OsuApi, userId: number, offset: number, favoriteCount: number){
    const favoritesPage = await axios.get(
        `https://osu.ppy.sh/users/${userId}/beatmapsets/favourite?offset=${offset}&limit=${favoriteCount}`,
        { jar: this.cookieJar }
    )
    const favoritesList = (favoritesPage.data) as IBeatmapFavoriteList[]
    return favoritesList
}

async function getUserFavoriteBeatmapsIds(this: OsuApi, userId: number, offset: number, favoriteCount: number){
    const favoriteIds: {id: number}[] = []
    while(offset + this.maxFavoriteCallCount < favoriteCount){
        const list = await this.getUserFavouriteBeatmaps(userId, offset, this.maxFavoriteCallCount)
        list.forEach(beatmap => {
            favoriteIds.push({id: beatmap.id})
        })
        offset += this.maxFavoriteCallCount
        await delay(this.globalDelay)
    }
    const finalList = await this.getUserFavouriteBeatmaps(userId, offset, favoriteCount - offset)
    finalList.forEach(beatmap => {
        favoriteIds.push({id: beatmap.id})
    })
    return favoriteIds
}

export default {
    getFavoriteCount,
    getUserFavouriteBeatmaps,
    getUserFavoriteBeatmapsIds
}
import OsuApi from './osuApi'
import delay from '../utils/delay'
import axios from 'axios'

export interface IBeatmapFavoriteList{
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

export interface IBeatmapIdList{
    id: number
}

async function getFavoriteCount(this: OsuApi, userId: number){
    const userPage = await axios.get(`https://osu.ppy.sh/users/${userId}`, {
        jar: this.cookieJar,
        headers: this.getHeader(`https://osu.ppy.sh/users/${userId}`)
    })
    const favCountLocation = userPage.data.indexOf('"favourite_beatmapset_count":')
    const favTagLength = '"favourite_beatmapset_count":'.length
    const favCount = userPage.data.substring(favCountLocation + favTagLength, userPage.data.indexOf(",",favCountLocation))
    await delay(this.globalDelay)
    return Number.parseInt(favCount)
}

async function getUserFavouriteBeatmaps(this: OsuApi, userId: number, offset: number, favoriteCount: number){
    const favoritesPage = await axios.get(`https://osu.ppy.sh/users/${userId}/beatmapsets/favourite?offset=${offset}&limit=${favoriteCount}`,{ 
        jar: this.cookieJar, 
        headers: this.getHeader(`https://osu.ppy.sh/users/${userId}`)
    })
    const favoritesList = (favoritesPage.data) as IBeatmapFavoriteList[]
    return favoritesList
}

async function getUserCompleteFavoriteBeatmaps(this: OsuApi, userId: number, offset: number, favoriteCount: number){
    const favoriteIds: IBeatmapFavoriteList[] = []
    while(offset + this.maxFavoriteCallCount < favoriteCount){
        const list = await this.getUserFavouriteBeatmaps(userId, offset, this.maxFavoriteCallCount)
        favoriteIds.push(...list)
        offset += this.maxFavoriteCallCount
        await delay(this.globalDelay)
    }
    const finalList = await this.getUserFavouriteBeatmaps(userId, offset, favoriteCount - offset)
    favoriteIds.push(...finalList)
    return favoriteIds
}

export default {
    getFavoriteCount,
    getUserFavouriteBeatmaps,
    getUserCompleteFavoriteBeatmaps
}
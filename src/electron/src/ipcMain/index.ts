import { ipcMain } from 'electron'
import OsuApi from '../api/osuApi'
import { dialog } from 'electron'

export interface ILoginOsu{
    username: string
    password: string
}

const osuApi = new OsuApi()

ipcMain.on("loginOsu", async (event, arg: ILoginOsu) => {
    try{
        await osuApi.getCookies()
        const user = await osuApi.loginOsuUser(arg.username, arg.password)
        event.reply("loginOsuReply", user.object)
    }catch(err){
        console.log(err)
        console.log("----- error on login ----")
    }
})

ipcMain.on("getFavoriteList", async (event, id: number) => {
    try{
        const favoriteCount = await osuApi.getFavoriteCount(id)
        const initialList = await osuApi.getUserCompleteFavoriteBeatmaps(id, 0, favoriteCount)
        event.reply("getFavoriteListReply", initialList)
    }catch(err){
        console.log(err)
        console.log("----- error on get initial favorite beatmaps -----")
    }
})

ipcMain.on("getFavoriteCount", async (event, id: number) => {
    try{
        const favoriteCount = await osuApi.getFavoriteCount(id)
        event.reply("FavoriteCountReply", favoriteCount)
    }catch(err){
        console.log(err)
        console.log("----- error on get favorite count -----")
    }
})

ipcMain.on("downloadFavorites", async (event, id: number, withVideo: boolean, beatmapCount: number, offset: number) => {
    try{
        const path = await dialog.showOpenDialog({
            title: "Choose the directory to save the maps",
            properties: ["openDirectory"]
        });
        if (path.canceled)
            return
        const favoriteList = await osuApi.getUserFavouriteBeatmaps(id, offset, beatmapCount)
        osuApi.downloadBeatmapList(favoriteList, 0, path.filePaths.pop() || './', withVideo, event)
    }catch(err){
        console.log(err)
        console.log("----- error on download favorites -----")
    }
})

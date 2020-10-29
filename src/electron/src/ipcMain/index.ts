import { BrowserWindow, ipcMain } from 'electron'
import OsuApi from '../api/osuApi'
import eventListener  from 'events'
import { dialog } from 'electron'
import { IBeatmapFavoriteList } from '../api/osuFavoriteList'
import Error from '../utils/errorType'
import OsuUser from '../api/osuUser'

export interface ILoginOsu{
    username: string
    password: string
}

let listener = new eventListener()
const osuApi = new OsuApi()
let fullList: IBeatmapFavoriteList[]
let globalWindow: BrowserWindow
let user: OsuUser

async function fullListLoad(){
    return new Promise((resolve) => {
        if(fullList && fullList.length > 0)
            resolve()
        listener.on("listLoaded", () => {
            listener = new eventListener()
            resolve()
        })
        if(fullList && fullList.length > 0){
            listener = new eventListener()
            resolve()
        }
    })
}

export function mainWindow(window: BrowserWindow){
    globalWindow = window
}

ipcMain.on("loginOsu", async (event, arg: ILoginOsu) => {
    try{
        await osuApi.getCookies()
        user = await osuApi.loginOsuUser(arg.username, arg.password)
        event.reply("loginOsuReply")
    }catch(err){
        if(!Error.sendInternetErrorMessage(err, event))
            Error.sendUnknownError(err, event)
        console.log("----- error on login ----");
    }
})

ipcMain.on("getCurrentUser", (event) => {
    event.returnValue = user.object
})

ipcMain.on("getFavoriteList", async (event, id: number) => {
    try{
        const favoriteCount = await osuApi.getFavoriteCount(id)
        const initialList = await osuApi.getUserFavouriteBeatmaps(id, 0, 6)
        event.reply("getFavoriteListReply", initialList)
        fullList = await osuApi.getUserCompleteFavoriteBeatmaps(id, 0, favoriteCount)
        listener.emit("listLoaded")
        event.reply("getFavoriteListReply", fullList)
    }catch(err){
        if(!Error.sendInternetErrorMessage(err, event))
            Error.sendUnknownError(err, event)
        console.log("----- error on get initial favorite beatmaps -----")
    }
})

ipcMain.on("getFavoriteCount", async (event, id: number) => {
    try{
        const favoriteCount = await osuApi.getFavoriteCount(id)
        event.reply("FavoriteCountReply", favoriteCount)
    }catch(err){
        if(!Error.sendInternetErrorMessage(err, event))
            Error.sendUnknownError(err, event)
        console.log("----- error on get favorite count -----")
    }
})

ipcMain.on("downloadFavorites", async (event, id: number, withVideo: boolean, beatmapCount: number, offset: number) => {
    try{
        const path = await dialog.showOpenDialog(globalWindow, {
            title: "Choose the directory to save the maps",
            properties: ["openDirectory"]
        });
        if (path.canceled){
            event.reply("downloadCanceled")
            return
        }

        await fullListLoad()
        if(offset + beatmapCount > fullList.length){
            Error.sendErrorMessage(event, "Error, the offset plus the beatmap count must be less than the favorite count.")
            event.reply("downloadCanceled")
            return
        }
        event.reply("finishLoading")
        console.log("list loaded")
        await osuApi.downloadBeatmapList(fullList.slice(offset, offset+beatmapCount), 0, path.filePaths.pop() || './', withVideo, event)
    }catch(err){
        if(!Error.sendInternetErrorMessage(err, event))
            Error.sendUnknownError(err, event)
        console.log("----- error on download favorites -----")
    }
})


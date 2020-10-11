import { ipcMain } from 'electron'
import OsuApi from '../api/osuApi'

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
        const initialList = await osuApi.getUserFavouriteBeatmaps(id, 0, 5)
        event.reply("getFavoriteListReply", initialList)
    }catch(err){
        console.log(err)
        console.log("----- error on get initial favorite beatmaps -----")
    }
})

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
        const loginPage = await osuApi.loginOsuUser(arg.username, arg.password)
        console.log(loginPage.data)
    }catch(err){
        console.log("error")
    }
})

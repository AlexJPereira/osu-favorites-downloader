import { ipcMain } from 'electron'
//import OsuApi from '../api/osuApi'

export interface ILoginOsu{
    username: string
    password: string
}

ipcMain.on("loginOsu", (event, arg: ILoginOsu) => {
    console.log(arg)
})

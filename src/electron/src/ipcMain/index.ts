import { ipcMain } from 'electron'
//import OsuApi from '../api/osuApi'

ipcMain.on("loginOsu", (event, arg) => {
    console.log(arg)
})
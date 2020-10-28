import {app, BrowserWindow} from 'electron'
import path from 'path'
import isDev from 'electron-is-dev'

import { mainWindow } from './src/ipcMain'

const startURL = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`;

function createWindow () {
  const win = new BrowserWindow({
    width: 1200,
    height: 600,
    webPreferences: {
      worldSafeExecuteJavaScript: true,
      nodeIntegration: true
    }
  })

  win.setMenu(null)
  win.loadURL(startURL)

  win.webContents.openDevTools()
  mainWindow(win)
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})


import { app, BrowserWindow, shell, ipcMain, Tray, nativeImage } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import os from 'node:os'
import fs from 'node:fs'
import { testConnection,getConfig, query, closePool } from './services/database'
import type { DbConfig } from '@models/db';
import {clearCache} from "./services/database/utils/cache";
import appIcon from '../public/logo.png?asset';

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))


let sqlConfig: DbConfig | null = null

// Load database config
try {
  const configPath = path.join(app.getPath('userData'), 'config.json')
  if (fs.existsSync(configPath)) {
    sqlConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'))
  }
} catch (err) {
  console.error('Error loading config:', err)
}

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.mjs   > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.APP_ROOT = path.join(__dirname, '../..')

export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')
export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, 'public')
  : RENDERER_DIST

// Disable GPU Acceleration for Windows 7
if (os.release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

let win: BrowserWindow | null = null
const preload = path.join(__dirname, './preload.mjs')
const indexHtml = path.join(RENDERER_DIST, 'index.html')

let tray:Tray|null;

const icon=nativeImage.createFromDataURL(appIcon);

async function createWindow() {
  win = new BrowserWindow({
    title: 'McCormick Toolbox',
    width: 1200,
    height: 800,
    icon,
    // icon: path.join(process.env.VITE_PUBLIC as string, 'logo.png'),
    webPreferences: {
      preload,
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // nodeIntegration: true,

      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      // contextIsolation: false,
    },
  })
  tray=new Tray(icon)
  if (VITE_DEV_SERVER_URL) { // #298
    win.loadURL(VITE_DEV_SERVER_URL)
    // Open devTool if the app is not packaged
    win.webContents.openDevTools()
  } else {
    win.loadFile(indexHtml)
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })
  // win.webContents.on('will-navigate', (event, url) => { }) #344
}

app.whenReady().then(createWindow)

app.on('window-all-closed', async () => {
  win = null
  await closePool();
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})

// New window example arg: new windows url
ipcMain.handle('open-win', (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  if (VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${VITE_DEV_SERVER_URL}#${arg}`)
  } else {
    childWindow.loadFile(indexHtml, { hash: arg })
  }
})

// IPC handlers for database operations
ipcMain.handle('test-connection', async (_,config?:DbConfig) => {
  await closePool();
  if (!config) {
    return { success: false, message: 'Database configuration not found' }
  }
  return await testConnection(config)
})

ipcMain.handle('get-config', getConfig);

ipcMain.handle('query', async (_, queryString: string) => {
  try {
    return await query(queryString)
  } catch (err: any) {
    return Promise.reject({ success: false, message: err.message })
  }
})

ipcMain.handle('save-config', async (_, config: DbConfig) => {
  try {
    const configPath = path.join(app.getPath('userData'), 'config.json')
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2))
    sqlConfig = config
    clearCache();
    return Promise.resolve({ success: true })
  } catch (err: any) {
    return Promise.reject({ success: false, message: err.message })
  }
})

import './icp-handlers';
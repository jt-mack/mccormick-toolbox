/// <reference types="vite/client" />

import type {DbConfig, ConnectionResult} from '@models/db'

declare global {
  interface Window {
    ipcRenderer: import('electron').IpcRenderer
    electronAPI: {
      testConnection: (config:DbConfig) => Promise<ConnectionResult>
      saveConfig: (config: DbConfig) => Promise<ConnectionResult>
      getConfig: () => Promise<DbConfig>
    }
  }
}
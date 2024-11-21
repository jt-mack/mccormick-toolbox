/// <reference types="vite/client" />

import type { DbConfig, ConnectionResult } from './types'

interface Window {
  electronAPI: {
    testConnection: () => Promise<ConnectionResult>
    saveConfig: (config: DbConfig) => Promise<ConnectionResult>
  }
}
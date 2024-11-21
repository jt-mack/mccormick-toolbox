/// <reference types="vite-plugin-electron/electron-env" />
import type {ConnectionResult, DbConfig} from "../src/types";

declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * The built directory structure
     *
     * ```tree
     * ├─┬ dist
     * │ ├─┬ electron
     * │ │ ├── main.js
     * │ │ └── preload.js
     * │ ├── index.html
     * │ ├── ...other-static-files-from-public
     * │
     * ```
     */
    DIST: string
    /** /dist/ or /public/ */
    VITE_PUBLIC: string
  }
}

// Used in Renderer process, expose in `preload.ts`
interface Window {
  ipcRenderer: import('electron').IpcRenderer;
  electronAPI: {
    testConnection: () => Promise<ConnectionResult>;
    saveConfig: (config: DbConfig) => Promise<ConnectionResult>;
    getConfig: () => DbConfig;
    query: (query: string) => Promise<any>;
  };
}
import { defineStore } from 'pinia'
import type { DbConfig } from '@models/db'

export const useConfigStore = defineStore('config', {
  state: () => ({
    config: null as DbConfig | null
  }),
  actions: {
    setConfig(config: DbConfig) {
      this.config = config
    },
    async getConfig() {
      try {
       const config= await window.electronAPI.getConfig();
        this.setConfig(config);
      } catch(e){
        console.error('Error fetching config:', e);
      }
    }
  }
})
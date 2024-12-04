import {ref} from 'vue'
import {defineStore} from 'pinia'
import type {DbConfig} from '@models/db'


export const useConfigStore = defineStore('config', () => {
  const config = ref<DbConfig | null>(null);

  const setConfig = function (configItem: DbConfig) {
    config.value = configItem
  };
  const getConfig = async function () {
    try {
      const config = await window.electronAPI.getConfig();
      setConfig(config);
    } catch (e) {
      console.error('Error fetching config:', e);
    }
  }
  return {
    config,
    setConfig,
    getConfig
  }
})
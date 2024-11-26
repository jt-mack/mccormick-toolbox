import { ref } from 'vue';

export function useIpcLoader() {
  const isLoading = ref(false);

  const callIpc = async (channel: string, args?: any): Promise<any> => {
    isLoading.value = true;
    try {
      const result = await window.ipcRenderer.invoke(channel, args);
      return result;
    } catch (error) {
      console.error(`Error calling IPC channel "${channel}":`, error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  return { isLoading, callIpc };
}

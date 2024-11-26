import {defineStore} from 'pinia';
import {ref} from "vue";
import Menu from '@primevue/menu';

export const useGlobalStore = defineStore('global', () => {
  const sidebarRef = ref<typeof Menu>();
  const sidebarVisible = ref(false);
  return {sidebarVisible, sidebarRef};
})
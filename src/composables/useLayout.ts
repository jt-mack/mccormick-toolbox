import { computed, reactive, readonly, watch } from 'vue';
import {useGlobalStore} from "../stores";
import {storeToRefs} from "pinia";


const layoutConfig = reactive({
  preset: 'Aura',
  primary: 'emerald',
  surface: '',
  darkTheme: false,
  menuMode: 'static'
});

const layoutState = reactive({
  staticMenuDesktopInactive: false,
  overlayMenuActive: false,
  profileSidebarVisible: false,
  configSidebarVisible: false,
  staticMenuMobileActive: false,
  menuHoverActive: false,
  activeMenuItem: '',
});

export function useLayout() {
  const globalStore=useGlobalStore();
  const {sidebarVisible, sidebarRef}=storeToRefs(globalStore);

  const setPrimary = (value:string) => {
    layoutConfig.primary = value;
  };

  const setSurface = (value:string) => {
    layoutConfig.surface = value;
  };

  const setPreset = (value:string) => {
    layoutConfig.preset = value;
  };

  const setActiveMenuItem = (item:string) => {
    layoutState.activeMenuItem =  item;
  };


  const setMenuMode = (mode:string) => {
    layoutConfig.menuMode = mode;
  };

  const toggleDarkMode = () => {
    if (!document.startViewTransition) {
      executeDarkModeToggle();

      return;
    }

    document.startViewTransition(() => executeDarkModeToggle(event));
  };

  const executeDarkModeToggle = () => {
    layoutConfig.darkTheme = !layoutConfig.darkTheme;
    document.documentElement.classList.toggle('app-dark');
  };

  const onMenuToggle = (event?:Event) => {
    if (layoutConfig.menuMode === 'overlay') {
      layoutState.overlayMenuActive = !layoutState.overlayMenuActive;
    }

    if (window.innerWidth > 991) {
      layoutState.staticMenuDesktopInactive = !layoutState.staticMenuDesktopInactive;
    } else {
      layoutState.staticMenuMobileActive = !layoutState.staticMenuMobileActive;
    }
    return isSidebarActive.value ? sidebarRef.value?.show(event) : sidebarRef.value?.hide();
  };

  const resetMenu = () => {
    layoutState.overlayMenuActive = false;
    layoutState.staticMenuMobileActive = false;
    layoutState.menuHoverActive = false;
  };


  const isSidebarActive = computed(() => layoutState.overlayMenuActive || layoutState.staticMenuMobileActive || layoutState.staticMenuDesktopInactive);

  watch(()=>isSidebarActive.value,(value)=>{
    sidebarVisible.value=value;
  });

  const isDarkTheme = computed(() => layoutConfig.darkTheme);

  const getPrimary = computed(() => layoutConfig.primary);

  const getSurface = computed(() => layoutConfig.surface);

  return { layoutConfig: readonly(layoutConfig), layoutState: readonly(layoutState), onMenuToggle, isSidebarActive, isDarkTheme, getPrimary, getSurface, setActiveMenuItem, toggleDarkMode, setPrimary, setSurface, setPreset, resetMenu, setMenuMode };
}
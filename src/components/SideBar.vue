
<template>
  <div :class="['flex',{ 'w-16': isCollapsed, 'w-64': !isCollapsed }]">
    <Menu :model="menuItems"  :class="['bg-gray-800 text-white transition-all duration-300 h-full  max-h-full',{ 'w-16': isCollapsed, 'w-64': !isCollapsed },

      ]">
      <template #start>
        <div class="flex justify-content-center">
          <Image src="/logo.png" alt="Image" :width=" isCollapsed? 45: 100" />
        </div>
      </template>
      <template #item="{ item, props }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a v-ripple :href="href" v-bind="props.action" @click="navigate">
            <span :class="item.icon" />
            <span v-if="!isCollapsed" class="ml-2">{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
          <span :class="item.icon" />
          <span v-if="!isCollapsed"  class="ml-2">{{ item.label }}</span>
        </a>
      </template>
      <template #end>
<!--        <button v-ripple class="relative overflow-hidden w-full border-0 bg-transparent flex items-start p-2 pl-4 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-none cursor-pointer transition-colors duration-200">-->
<!--          <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" class="mr-2" shape="circle" />-->
<!--          <span class="inline-flex flex-col items-start">-->
<!--                        <span class="font-bold">Amy Elsner</span>-->
<!--                        <span class="text-sm">Admin</span>-->
<!--                    </span>-->
<!--        </button>-->
        <div class="flex">
          <div class="grow"/>
        </div>
        <a v-ripple class="flex gap-2 w-full" >
          <span :class="configItem.icon" />
          <span v-if="!isCollapsed">{{ configItem.label }}</span>
        </a>
      </template>
    </Menu>
  </div>
</template>

<script setup lang="ts">
import { ref,computed } from "vue";
import { useRouter } from 'vue-router'

import {useLayout} from "../composables/useLayout";

const router = useRouter()
// const isCollapsed = ref(false)
const configItem= { label: 'Config', icon: 'pi pi-cog', route: '/config' };

const menuItems = [
  { label: 'Land Rates', icon: 'pi pi-map', route: '/land' },
  { label: 'Future Page 1', icon: '', route: '#' },
  { label: 'Future Page 2', icon: '', route: '#' },
  { label: 'Future Page 4', icon: '', route: '#' },
  {
    separator: true
  },
  {...configItem},
]

// const toggleNav = () => {
//   isCollapsed.value = !isCollapsed.value
// }
// const toggleNav=()=>useLayout().onMenuToggle();

const navigate = (route: string) => {
  if (route !== '#') {
    router.push(route)
  }
}

const {isSidebarActive:isCollapsed, onMenuToggle:toggleNav}=useLayout();
// const isCollapsed = computed(()=>!useLayout().isSidebarActive.value);

// const toggleNav = () => {
//   isCollapsed.value = !isCollapsed.value
// }

const items = ref([
  {
    separator: true
  },
  {
    label: 'Documents',
    items: [
      {
        label: 'New',
        icon: 'pi pi-plus',
        shortcut: '⌘+N'
      },
      {
        label: 'Search',
        icon: 'pi pi-search',
        shortcut: '⌘+S'
      }
    ]
  },
  {
    label: 'Profile',
    items: [
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        shortcut: '⌘+O'
      },
      {
        label: 'Messages',
        icon: 'pi pi-inbox',
        badge: 2
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        shortcut: '⌘+Q'
      }
    ]
  },
  {
    separator: true
  }
]);
</script>
<style>
.p-menu{
  min-width: unset;
}
.p-menu-end{
  display: flex;
 flex-grow: 1;
}
</style>

<template>

  <Menu ref="sidebarRef" :model="menuItems"
        :class="['bg-gray-800 text-white transition-all duration-300  max-h-full p-4',{ 'w-16': isCollapsed, 'w-64': !isCollapsed }]">
    <template #start>
      <div class="flex justify-content-center">
        <Image src="/logo.png" alt="Image" :width=" isCollapsed? 45: 45"/>
      </div>
    </template>
    <template #item="{ item, props }">
      <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
        <a v-ripple :href="href" v-bind="props.action" @click="navigate" :class="{'font-bold': activeRoute.path == href}">
          <span :class="item.icon"/>
          <span v-if="!isCollapsed" class="ml-2">{{ item.label }}</span>
        </a>
      </router-link>
      <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action" :class="{'font-bold': activeRoute.path == item.route}" custom>
        <span :class="item.icon"/>
        <span v-if="!isCollapsed" class="ml-2">{{ item.label }}</span>
      </a>
    </template>
    <template #end>

      <router-link v-if="configItem.route" v-slot="{ href, navigate }" :to="configItem.route" custom>
        <Button as="a" variant="text" :icon="configItem.icon" :label="configItem?.label" v-ripple class="flex justify-content-center gap-2" :href="href" @click="navigate"/>
      </router-link>

    </template>
  </Menu>

</template>

<script setup lang="ts">
import {ref, computed, watch} from "vue";
import {useRouter} from 'vue-router'
import {useGlobalStore} from "../stores";
import {storeToRefs} from "pinia";

import {useLayout} from "../composables/useLayout";

const {sidebarVisible, sidebarRef} = storeToRefs(useGlobalStore());

const router = useRouter()


// const isCollapsed = ref(false)
const configItem = {label: 'Config', icon: 'pi pi-cog', route: '/config'};

const activeRoute = computed(() => router.currentRoute.value);

const menuItems = [
  {label: 'Land Rates', icon: 'pi pi-map', route: '/land'},
  {label: 'Future Page 1', icon: 'pi pi-minus', route: '#'},
  {label: 'Future Page 2', icon: 'pi pi-minus', route: '#'},
  {label: 'Future Page 4', icon: 'pi pi-minus', route: '#'},
  {
    separator: true
  }
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

const {isSidebarActive: isCollapsed, onMenuToggle: toggleNav} = useLayout();


</script>
<style>
.p-menu {
  min-width: unset !important;
}

.p-menu-end {
  display: flex;
  flex-grow: 1;
  flex-flow: column;
}
</style>

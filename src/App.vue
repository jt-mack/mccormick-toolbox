<script setup lang="ts">
import SideNav from './components/SideNav.vue'
import SideBar from "./components/SideBar.vue";
import Loader from './components/Loader.vue';

import AppTopbar from "./layout/AppTopbar.vue";
import {onMounted} from "vue";
import {storeToRefs} from "pinia";
import {useConfigStore} from "./stores";
import {useRouter} from "vue-router";

const configStore = useConfigStore();
const {config} = storeToRefs(configStore);


const router = useRouter();
onMounted(async () => {
  if (!config.value) {
    await configStore.getConfig();
  }

  router.beforeEach((to, _from, next) => {
    if (!config.value && to.name !== 'Config') {
      next({name: 'Config'})
    } else {
      next()
    }
  });
});

// if (!config.value) {
//   configStore.getConfig();
//   console.log({config: config.value});
// }
// router.beforeEach((to, from, next) => {
//   if (!config.value && to.name !== 'Config') {
//     next({name: 'Config'})
//   } else {
//     next()
//   }
// });
</script>

<template>
  <div class="container h-screen flex flex-column overflow-hidden">
    <AppTopbar class="flex flex-row"/>
    <div class="h-full flex flex-row overflow-hidden">
      <SideBar/>
      <Loader/>
      <div class="flex-1 flex-column  overflow-auto">
        <main :class="{ 'container h-full': true }">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<style>
</style>
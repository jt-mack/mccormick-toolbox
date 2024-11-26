<script setup lang="ts">
import SideNav from './components/SideNav.vue'
import SideBar from "./components/SideBar.vue";
import Loader from './components/Loader.vue';

import AppTopbar from "./layout/AppTopbar.vue";

import {storeToRefs} from "pinia";
import {useConfigStore} from "./stores";
import {useRouter} from "vue-router";

const configStore = useConfigStore();
const {config} = storeToRefs(configStore);
if (!config.value) {
  configStore.getConfig();
  console.log({config: config.value});
}

const router = useRouter();
router.beforeEach((to, from, next) => {
  if (!config.value && to.name !== 'Config') {
    next({name: 'Config'})
  } else {
    next()
  }
});
</script>

<template>
  <div class="container h-screen flex flex-column">
    <AppTopbar/>
    <div class="flex h-full">
            <SideBar/>
      <Loader/>
<!--      <SideNav/>-->
      <div class="flex-1 bg-gray-100 p-6">
        <main :class="{ 'content-area grid gap-6': true }">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<style>
</style>
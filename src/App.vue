<script setup lang="ts">
import SideNav from './components/SideNav.vue'
import Loader from './components/Loader.vue';

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
  <div class="app-container">
    <Loader />
    <SideNav/>
    <main :class="{ 'content-area': true }">
      <router-view></router-view>
    </main>
  </div>
</template>

<style>
.app-container {
  display: flex;
  min-height: 100vh;
}

.content-area {
  flex: 1;
  margin-left: 250px;
  transition: margin-left 0.3s ease;
  padding: 20px;
}

body {
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}
</style>
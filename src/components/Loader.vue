<template>
  <div v-if="isLoading" class="loader">
    <p>Loading...</p>
  </div>
</template>

<script setup lang="ts">
import {useIpcLoader} from '../composables';

const {isLoading} = useIpcLoader();
</script>

<style scoped>
.loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.5em;
  z-index: 9999;
}
</style>

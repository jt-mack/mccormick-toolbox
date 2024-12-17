<template>
  <div class="container h-full">
    <GISMap v-if="hasGIS"/>
    <FileUploader v-else/>
  </div>
</template>
<script setup lang="ts">
import {ref, onMounted} from "vue";
import GISMap from "../../components/GISMap.vue";
import FileUploader from '../../components/FileUploader.vue';

const hasGIS = ref(false);

onMounted(() => {
  hasGIS.value = true;
})

</script>
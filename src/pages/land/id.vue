<template>
  <div class="container">
<!--    <Breadcrumb :home="{path:'/'}" :model="landRoutes"/>-->
    <div v-if="entity">
      <h1>{{ entity.description }} ({{ entity.id }})</h1>
      <div v-for="[key,val] of Object.entries(entity ?? {})" :key="key">
        <div>{{ key }}</div>
        <div>{{ val }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {ref, onMounted, computed} from 'vue';
import {useLandRepo} from '../../repositories/landRepo';
import {landRoutes} from "../../router/routes";
import {useRoute} from "vue-router";
import type {LandClassification} from "@models/entities/land-classification.ts";

const route = useRoute();


const landRepo = useLandRepo();
const entity = ref<LandClassification>();

onMounted(async () => {
  entity.value = await landRepo.getLandClass(route!.params!.id);
})
</script>
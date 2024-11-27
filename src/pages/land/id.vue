<template>
  <div class="container">
    <!--    <Breadcrumb :home="{path:'/'}" :model="landRoutes"/>-->

    <HeaderPanel v-if="entity" :title="`${entity.description} (${entity.id})`" :fields="panelFields"/>


    <PrimeTable v-if="landRecords.length" :data="landRecords" lazy/>

  </div>
</template>
<script setup lang="ts">
import {ref, onMounted, computed} from 'vue';
import {useLandRepo} from '../../repositories/landRepo';
import {landRoutes} from "../../router/routes";
import {useRoute} from "vue-router";
import type {LandClassification, LandRecord} from "@models/entities";
import {formatNumber, formatDecimal} from "@/utils";

import HeaderPanel from "../../components/HeaderPanel.vue";
import PrimeTable from "../../components/PrimeTable.vue";

const route = useRoute();


const landRepo = useLandRepo();
const entity = ref<LandClassification>();

const landRecords = ref<LandRecord[]>([]);

const panelFields = computed(() => {

  const fields = {
    'Value Method': entity.value?.method_lookup ?? entity.value?.method,
    'Base Rate': formatNumber(entity.value?.base_rate),
    'Excessive Units Breakpoint': formatNumber(entity.value?.base_rate_breakpoint),
    'Excessive Units Adjustment': formatDecimal(entity.value?.base_rate_breakpoint_adjustment),
    'Number of Land Records': landRecords.value.length

  };
  return fields
})

onMounted(async () => {
  entity.value = await landRepo.getLandClass(route!.params!.id);
  landRecords.value = await landRepo.getLandRecords(route!.params!.id);
})
</script>
<template>
  <div class="container">
    <!--    <Breadcrumb :home="{path:'/'}" :model="landRoutes"/>-->

    <HeaderPanel v-if="entity" :title="`${entity.description} (${entity.id})`" :fields="panelFields"/>

    <div class="card">
      <Tabs value="records">
        <TabList class="flex justify-content-between w-full">
          <Tab class="grow flex basis-1/3" value="records">Entries</Tab>
          <Tab class="grow" value="sales">Sales</Tab>
          <Tab class="grow" value="placeholder">...</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="records">
            <PrimeTable v-if="landRecords.length" :data="landRecords" lazy/>
          </TabPanel>
          <TabPanel value="sales">
            <div class="flex justify-center w-full">
              <DatePicker class="w-full" size="large" v-model="selectedSaleYears" selection-mode="range"
                          :manual-input="false" view="year" dateFormat="yy"/>
            </div>
            <div>
              <PrimeTable v-if="landSales.length" :data="landSales" lazy/>
            </div>
          </TabPanel>
          <TabPanel value="placeholder">
            <p class="m-0">
              ...
            </p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>

  </div>
</template>
<script setup lang="ts">
import {ref, onMounted, computed} from 'vue';
import {watchDebounced} from '@vueuse/core';
import {useLandRepo} from '../../repositories/landRepo';
import {useSaleRepo} from "../../repositories/saleRepo.ts";
import {landRoutes} from "../../router/routes";
import {useRoute} from "vue-router";
import type {LandClassification, LandRecord, PropertySale, PropertyWithSale} from "@models/entities";
import {formatNumber, formatDecimal} from "@/utils";
import {generateBaseCostSchedule} from "@/utils/values/generators";

import HeaderPanel from "../../components/HeaderPanel.vue";
import PrimeTable from "../../components/PrimeTable.vue";

const route = useRoute();

// const land_class_id=computed(()=>route.params.id as string);


const landRepo = useLandRepo();
const saleRepo = useSaleRepo();

const entity = ref<LandClassification>();

const landRecords = ref<LandRecord[]>([]);

// const landSales=ref<PropertySale[]>([]);
const landSales = ref<PropertyWithSale[]>([]);

const lastYear = new Date(new Date().getFullYear() - 1, 0, 1);
const selectedSaleYears = ref<Date[]>([lastYear]);

const saleYears = computed<number[]>(() => selectedSaleYears.value.map(d => d?.getFullYear()).filter(d => d));

watchDebounced(() => saleYears.value, async (value) => {
  // landSales.value=await saleRepo.getSalesByLandCode(route!.params!.id as number,value);
  landSales.value = await saleRepo.getSalesWithPropertyByLandCode(route!.params!.id as number, value);
}, {debounce: 500, immediate: false});

const suggestedCostSchedule=computed<LandClassification|null>(()=>entity.value && landSales.value?.length ? generateBaseCostSchedule(landSales.value,landRecords.value,entity.value):null);

const panelFields = computed(() => {

  const fields = {
    'Value Method': entity.value?.method_lookup ?? entity.value?.method,
    'Base Rate': formatNumber(entity.value?.base_rate),
    'Excessive Units Breakpoint': formatNumber(entity.value?.base_rate_breakpoint),
    'Excessive Units Adjustment': formatDecimal(entity.value?.base_rate_breakpoint_adjustment),
    'Number of Land Records': landRecords.value.length,

    'Suggested Value Method': entity.value?.method_lookup ?? entity.value?.method,
    'Suggested Base Rate': formatNumber(suggestedCostSchedule.value?.base_rate),
    'Suggested Excessive Units Breakpoint': formatNumber(suggestedCostSchedule.value?.base_rate_breakpoint),
    'Suggested Excessive Units Adjustment': formatDecimal(suggestedCostSchedule.value?.base_rate_breakpoint_adjustment),
  };
  return fields
})

onMounted(async () => {
  entity.value = await landRepo.getLandClass(route!.params!.id);
  landRecords.value = await landRepo.getLandRecords(route!.params!.id);
  // landSales.value=await saleRepo.getSalesByLandCode(route!.params!.id,saleYears.value);
  landSales.value = await saleRepo.getSalesWithPropertyByLandCode(route!.params!.id, saleYears.value);
})
</script>
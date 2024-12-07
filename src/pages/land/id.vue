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
            <PrimeTable v-if="landRecords.length" :data="landRecords"/>
          </TabPanel>
          <TabPanel value="sales">
            <div class="flex flex-shrink-1 gap-2 ">

              <HeaderPanel v-if="suggestedCostSchedule && suggestedScheduleFields" title="Suggested Schedule"
                           :fields="suggestedScheduleFields"/>

            </div>
            <div>
              <Toolbar class="mb-6">
                <template #start>

                  <FloatLabel variant="in">
                    <DatePicker :size="undefined" v-model="selectedSaleYears" selection-mode="range"
                                inputId="year_Select"
                                :manual-input="false" view="year" dateFormat="yy"/>
                    <label for="year_Select">Sale Years</label>
                  </FloatLabel>


                </template>

                <template #end>
                  <div class="w-full">
                    <IftaLabel>
                      <MultiSelect v-model="selectedSaleCodes" inputId="ms_codes" :options="saleCodes"
                                   optionLabel="name" filter show-clear :maxSelectedLabels="5" class="w-full"
                                   variant="filled" @value-change="(val:any)=>Array.isArray(val)?val:[]"/>
                      <label for="ms_codes">Sale Codes</label>
                    </IftaLabel>
                  </div>
                </template>
              </Toolbar>
              <PrimeTable :data="landSales"/>
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
import {useSaleRepo} from "../../repositories/saleRepo";
import {useSalesStore} from "../../stores";
import {useLocalStorage} from "@vueuse/core";
import {landRoutes} from "../../router/routes";
import {useRoute} from "vue-router";
import type {LandClassification, LandRecord, PropertySale, PropertyWithSale, Lookup} from "@models/entities";
import {formatNumber, formatDecimal} from "@/utils";
import {generateBaseCostSchedule} from "@/utils/values/generators";

import HeaderPanel from "../../components/HeaderPanel.vue";
import PrimeTable from "../../components/PrimeTable.vue";
import {storeToRefs} from "pinia";

const route = useRoute();

// const land_class_id=computed(()=>route.params.id as string);


const landRepo = useLandRepo();
const saleRepo = useSaleRepo();

const entity = ref<LandClassification>();

const landRecords = ref<LandRecord[]>([]);

// const landSales=ref<PropertySale[]>([]);
const landSales = ref<PropertyWithSale[]>([]);

const {saleCodes, selectedSaleCodes} = storeToRefs(useSalesStore());


const landSalesForTable = computed(() => landSales.value.map(s => ({
  id: s.id,
  code: s.sale_code,
  sale_date: s.sale_date,
  sale_price: s.sale_price,
})));

const lastYear = new Date(new Date().getFullYear() - 1, 0, 1);

const selectedSaleYears = useLocalStorage<Date[]>('selectedSaleYears', [lastYear], {
  serializer: {
    read: (v) => v ? JSON.parse(v).filter((v: string | null) => v).map((d: string) => new Date(d)) : null,
    write: (v) => JSON.stringify(v)
  }
});

const saleYears = computed<number[]>(() => selectedSaleYears.value?.filter(d => d)?.map(d => d?.getFullYear?.()));

watchDebounced([() => saleYears.value, () => selectedSaleCodes.value], async ([saleYears, saleCodes]) => {
  landSales.value = await saleRepo.getSalesWithPropertyByLandCode(route!.params!.id as string, saleYears, saleCodes);
}, {debounce: 1500, immediate: false});

const suggestedCostSchedule = computed<LandClassification | null>(() => entity.value && landSales.value?.length ? generateBaseCostSchedule(landSales.value, landRecords.value, entity.value) : null);
const suggestedScheduleFields = computed(() => suggestedCostSchedule.value ? {
  'Suggested Base Rate': formatNumber(suggestedCostSchedule.value?.base_rate),
  'Suggested Excessive Units Breakpoint': formatNumber(suggestedCostSchedule.value?.base_rate_breakpoint),
  'Suggested Excessive Units Adjustment': formatDecimal(suggestedCostSchedule.value?.base_rate_breakpoint_adjustment),
} : null)

const panelFields = computed(() => {

  const fields = {
    'Value Method': entity.value?.method_lookup ?? entity.value?.method,
    'Base Rate': formatNumber(entity.value?.base_rate),
    'Excessive Units Breakpoint': formatNumber(entity.value?.base_rate_breakpoint),
    'Excessive Units Adjustment': formatDecimal(entity.value?.base_rate_breakpoint_adjustment),
    'Number of Land Records': landRecords.value.length,
  };
  return fields
})

onMounted(async () => {
  entity.value = await landRepo.getLandClass(route!.params!.id as string);
  landRecords.value = await landRepo.getLandRecords(route!.params!.id as string);
  // landSales.value=await saleRepo.getSalesByLandCode(route!.params!.id,saleYears.value);
  landSales.value = await saleRepo.getSalesWithPropertyByLandCode(route!.params!.id as string, saleYears.value, selectedSaleCodes.value);
})
</script>
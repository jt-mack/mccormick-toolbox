<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useLandRepo } from '../../repositories/landRepo'
import type { LandClassification } from '@models/entities/land-classification';

import PrimeTable from "../../components/PrimeTable.vue";


const landRepo = useLandRepo()
const entities = ref<LandClassification[]>([])


onMounted(async () => {
  entities.value = await landRepo.getEntities()
})


</script>

<template>
  <div class="container">

    <h1>Land Records</h1>
<PrimeTable :data="entities" :route-name="'LandDetail'"/>
<!--    <DataTable :value="entities" v-model:filters="filters" filter-display="menu" :paginator="true" :rows="10"  :globalFilterFields="['description']"  dataKey="id">-->
<!--      <template #header>-->
<!--        <div class="flex justify-content-between w-full">-->
<!--          <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="filters.global.value=''" />-->
<!--          <IconField>-->
<!--            <InputIcon>-->
<!--              <i class="pi pi-search" />-->
<!--            </InputIcon>-->
<!--            <InputText v-model="filters['global'].value" placeholder="Search..." />-->
<!--          </IconField>-->
<!--        </div>-->
<!--      </template>-->
<!--      <Column field="id" header="ID"></Column>-->
<!--      <Column field="description" header="Description"></Column>-->
<!--      <Column field="method_lookup" header="Method"></Column>-->
<!--      <Column field="base_rate" header="Rate"></Column>-->
<!--      <Column class="w-24 !text-end">-->
<!--        <template #body="{ data }">-->
<!--          <Button icon="pi pi-arrow-up-right" @click="router.push({name:'LandDetail',params:{id:data.id}})" severity="secondary" rounded></Button>-->
<!--        </template>-->
<!--      </Column>-->
<!--    </DataTable>-->

  </div>
</template>

<style scoped>

</style>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useLandRepo } from '../repositories/landRepo'
import type { LandClassification } from '@models/entities/land-classification';

import DataTable from "primevue/datatable";
import Column from "primevue/column";
import {Button, IconField, InputIcon, InputText} from "primevue";
import { FilterMatchMode } from '@primevue/core/api';
const landRepo = useLandRepo()
const entities = ref<LandClassification[]>([])
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = 10


const filters=ref({global:{value:'', matchMode:FilterMatchMode.CONTAINS}})

onMounted(async () => {
  entities.value = await landRepo.getEntities()
})

const filteredEntities = computed(() => {
  return entities.value.filter(entity =>
    entity.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const paginatedEntities = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredEntities.value.slice(start, end)
})

const totalPages = computed(() => 
  Math.ceil(filteredEntities.value.length / itemsPerPage)
)

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const handleSearchInput = () => {
  currentPage.value = 1
}
</script>

<template>
  <div class="land-page">
    <h1>Land Records</h1>
    
<!--    <div class="search-container">-->
<!--      <input-->
<!--        type="text"-->
<!--        v-model="searchQuery"-->
<!--        @input="handleSearchInput"-->
<!--        placeholder="Search by description..."-->
<!--        class="search-input"-->
<!--      >-->
<!--    </div>-->
<DataTable :value="entities" v-model:filters="filters" filter-display="menu" :paginator="true" :rows="10"  :globalFilterFields="['description']"  dataKey="id" filterDisplay="row">
  <template #header>
    <div class="flex justify-between">
      <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="filters.global.value=''" />
      <IconField>
        <InputIcon>
          <i class="pi pi-search" />
        </InputIcon>
        <InputText v-model="filters['global'].value" placeholder="Search..." />
      </IconField>
    </div>
  </template>
    <Column field="id" header="ID"></Column>
    <Column field="description" header="Description"></Column>
    <Column field="method" header="Method"></Column>
    <Column field="base_rate" header="Rate"></Column>
</DataTable>
<!--    <table class="data-table">-->
<!--      <thead>-->
<!--        <tr>-->
<!--          <th>ID</th>-->
<!--          <th>Description</th>-->
<!--          <th>Method</th>-->
<!--          <th>Rate</th>-->
<!--        </tr>-->
<!--      </thead>-->
<!--      <tbody>-->
<!--        <tr v-for="entity in paginatedEntities" :key="entity.id">-->
<!--          <td>{{ entity.id }}</td>-->
<!--          <td>{{ entity.description }}</td>-->
<!--          <td>{{ entity.method }}</td>-->
<!--          <td>{{entity.base_rate}}</td>-->
<!--        </tr>-->
<!--      </tbody>-->
<!--    </table>-->

<!--    <div class="pagination">-->
<!--      <button -->
<!--        @click="prevPage" -->
<!--        :disabled="currentPage === 1"-->
<!--        class="pagination-btn"-->
<!--      >-->
<!--        Previous-->
<!--      </button>-->
<!--      <span class="page-info">-->
<!--        Page {{ currentPage }} of {{ totalPages }}-->
<!--      </span>-->
<!--      <button -->
<!--        @click="nextPage"-->
<!--        :disabled="currentPage === totalPages"-->
<!--        class="pagination-btn"-->
<!--      >-->
<!--        Next-->
<!--      </button>-->
<!--    </div>-->
  </div>
</template>

<style scoped>
.land-page {
  padding: 20px;
}

.search-container {
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.data-table th,
.data-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.data-table th {
  background-color: #f5f5f5;
  font-weight: bold;
  color:black;
}

.data-table tr:hover {
  background-color: #f9f9f9;
  color: black;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.pagination-btn {
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.pagination-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.pagination-btn:hover:not(:disabled) {
  background-color: #45a049;
}

.page-info {
  font-size: 14px;
}
</style>
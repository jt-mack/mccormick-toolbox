<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useLandRepo } from '../repositories/landRepo'
import type { LandEntity } from '../types'

const landRepo = useLandRepo()
const entities = ref<LandEntity[]>([])
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = 5

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
    
    <div class="search-container">
      <input
        type="text"
        v-model="searchQuery"
        @input="handleSearchInput"
        placeholder="Search by description..."
        class="search-input"
      >
    </div>

    <table class="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Description</th>
          <th>Method</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entity in paginatedEntities" :key="entity.id">
          <td>{{ entity.id }}</td>
          <td>{{ entity.description }}</td>
          <td>{{ entity.method }}</td>
        </tr>
      </tbody>
    </table>

    <div class="pagination">
      <button 
        @click="prevPage" 
        :disabled="currentPage === 1"
        class="pagination-btn"
      >
        Previous
      </button>
      <span class="page-info">
        Page {{ currentPage }} of {{ totalPages }}
      </span>
      <button 
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="pagination-btn"
      >
        Next
      </button>
    </div>
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
}

.data-table tr:hover {
  background-color: #f9f9f9;
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
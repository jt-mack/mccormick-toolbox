<script setup lang="ts">
import DatabaseForm from '../components/DatabaseForm.vue'
</script>

<template>
  <div class="config-page">
    <h1>Database Configuration</h1>
    <DatabaseForm />
  </div>
</template>

<style scoped>
.config-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
</style>
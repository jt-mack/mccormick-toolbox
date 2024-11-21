<script setup lang="ts">
import { ref } from 'vue'
import type { DbConfig } from '../types'
import { useConfigStore } from '../stores'
import {storeToRefs} from "pinia";

const configStore = useConfigStore()
const {config:dbConfig} = storeToRefs(configStore);
const status = ref('')

const config = ref<DbConfig>(dbConfig.value? dbConfig.value : {
  user: '',
  password: '',
  server: '',
  database: '',
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
})

async function testConnection() {
  status.value = 'Testing connection...'
  const result = await window.electronAPI.testConnection(JSON.parse(JSON.stringify(config.value)))
  status.value = result.message
}

async function saveConfig() {
  const result = await window.electronAPI.saveConfig(JSON.parse(JSON.stringify(config.value)))
  if (result.success) {
    configStore.setConfig(config.value)
    status.value = 'Configuration saved successfully'
  } else {
    status.value = `Error saving configuration: ${result.message}`
  }
}
</script>

<template>
  <div class="form-container">
    <div class="form-group">
      <label>Server:</label>
      <input v-model="config.server" type="text" placeholder="localhost">
    </div>

    <div class="form-group">
      <label>Database:</label>
      <input v-model="config.database" type="text" placeholder="database_name">
    </div>

    <div class="form-group">
      <label>Username:</label>
      <input v-model="config.user" type="text" placeholder="username">
    </div>

    <div class="form-group">
      <label>Password:</label>
      <input v-model="config.password" type="password" placeholder="password">
    </div>

    <div class="buttons">
      <button @click="saveConfig">Save Configuration</button>
      <button @click="testConnection">Test Connection</button>
    </div>

    <div class="status" :class="{ error: status.includes('Error') }">
      {{ status }}
    </div>
  </div>
</template>

<style scoped>
.form-container {
  width: 100%;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.buttons {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

button {
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.status {
  margin-top: 20px;
  padding: 10px;
  border-radius: 4px;
  color:green;
  background-color: #f0f0f0;
}

.status.error {
  background-color: #ffebee;
  color: #c62828;
}
</style>
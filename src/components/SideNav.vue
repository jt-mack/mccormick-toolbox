<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import {useLayout} from "../composables/useLayout";

const router = useRouter()
const isCollapsed = ref(false)
const menuItems = [
  { name: 'Land Rates', icon: '🏠', route: '/land' },
  { name: 'Future Page 1', icon: '📋', route: '#' },
  { name: 'Future Page 2', icon: '📊', route: '#' },
  { name: 'Future Page 4', icon: '📑', route: '#' },
  { name: 'Config', icon: '⚙️', route: '/config' },
]

// const toggleNav = () => {
//   isCollapsed.value = !isCollapsed.value
// }
const toggleNav=useLayout().onMenuToggle;

const navigate = (route: string) => {
  if (route !== '#') {
    router.push(route)
  }
}
</script>

<template>
  <nav :class="{ 'nav-collapsed': isCollapsed }">
    <div class="nav-header">
      <h2 v-if="!isCollapsed">Navigation</h2>
      <button @click="toggleNav" class="toggle-btn">
        {{ isCollapsed ? '→' : '←' }}
      </button>
    </div>
    <ul class="nav-items">
      <li v-for="item in menuItems" :key="item.name" class="nav-item">
        <a 
          href="#" 
          :title="isCollapsed ? item.name : ''"
          @click.prevent="navigate(item.route)"
        >
          <span class="icon">{{ item.icon }}</span>
          <span class="text" v-if="!isCollapsed">{{ item.name }}</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  background-color: #2c3e50;
  color: white;
  height: 100vh;
  width: 250px;
  transition: width 0.3s ease;
  position: fixed;
  left: 0;
  top: 0;
}

.nav-collapsed {
  width: 60px;
}

.nav-header {
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #34495e;
}

.nav-header h2 {
  margin: 0;
  font-size: 1.2rem;
}

.toggle-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 5px 10px;
  font-size: 1.2rem;
}

.nav-items {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item a {
  display: flex;
  align-items: center;
  padding: 1rem;
  color: white;
  text-decoration: none;
  transition: background-color 0.2s;
}

.nav-item a:hover {
  background-color: #34495e;
}

.icon {
  width: 24px;
  text-align: center;
  margin-right: 10px;
}

.nav-collapsed .text {
  display: none;
}
</style>
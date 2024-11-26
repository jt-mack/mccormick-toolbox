<template>
  <div>
    <h1>Land Item</h1>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useLandRepo } from '../../repositories/landRepo';

const landRepo = useLandRepo();
const entity=ref(null);
</script>
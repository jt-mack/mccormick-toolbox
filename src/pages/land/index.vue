<script setup lang="ts">
import {ref, onMounted, computed} from 'vue'
import {useLandRepo} from '../../repositories/landRepo'
import type {LandClassification} from '@models/entities/land-classification';

import PrimeTable from "../../components/PrimeTable.vue";


const landRepo = useLandRepo()
const entities = ref<LandClassification[]>([])


onMounted(async () => {
  entities.value = await landRepo.getEntities()
})


</script>

<template>
  <div>

    <PrimeTable title="Land Records" :data="entities" :route-name="'LandDetail'"/>

  </div>
</template>

<style scoped>

</style>
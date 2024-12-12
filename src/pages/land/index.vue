<script setup lang="ts">
import {ref, onMounted, computed} from 'vue'
import {useLandRepo} from '../../repositories/landRepo'
import type {LandClassification} from '@models/entities/land-classification';

import PrimeTable from "../../components/PrimeTable.vue";
import {useRouter} from "vue-router";


const landRepo = useLandRepo()
const entities = ref<LandClassification[]>([])

const router=useRouter();

onMounted(async () => {
  entities.value = await landRepo.getEntities()
})


</script>

<template>
  <div>

    <PrimeTable title="Land Records" :data="entities" stateStorage="session"
                stateKey="land-records-session">
      <template #actions="{row}">
        <Button variant="text" icon="pi pi-arrow-right"
                @click="router.push({name:'LandDetail',params:{id:row?.id}})"
                severity="secondary" rounded></Button>
      </template>
    </PrimeTable>

  </div>
</template>

<style scoped>

</style>
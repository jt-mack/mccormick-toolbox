<template>
  <div class="card my-2">
    <Panel toggleable>
      <template #header>
        <div class="flex items-center gap-2">
          <span class="font-bold">{{ title }}</span>
        </div>
      </template>
      <template #footer>
      </template>
      <div class="flex gap-3 justify-content-between">

        <slot>
<!--          <FieldItem class="w-16" v-if="fields" v-for="([key,val]) of Object.entries(fields)" :title="toProperCase(key)"-->
<!--                     :value="val as string" :key="key"/>-->
          <FieldItem title="# of Sales" class="w-16" :value="result.count.toFixed()" />
          <FieldItem title="Ratio" class="w-16" :value="result.medianRatio.toFixed(3)" />
          <FieldItem title="COD" class="w-16" :value="result.cod.toFixed(3)" />
          <FieldItem title="PRD" class="w-16" :value="result.prd.toFixed()" />
        </slot>

      </div>
    </Panel>
  </div>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue';
import type {PropType} from "vue";
import type {PropertyWithSale, SalesRatio} from "@models/entities";
import FieldItem from "./FieldItem.vue";
import {calculateSalesRatio} from "@/utils/values/ratio";


const props = defineProps({
  title:{
    type: String,
    required: false,
    default: 'Sales Ratio'
  },
  sales: {
    type: Array as PropType<PropertyWithSale[]>,
    required: true
  },
})

const result=ref<SalesRatio>(calculateSalesRatio(props.sales));


</script>

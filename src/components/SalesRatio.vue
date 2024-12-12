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
      <div class="flex gap-3 justify-content-between" v-if="result">
        <FieldItem title="# of Sales" class="w-16" :value="result.count.toFixed()"/>
        <FieldItem title="Ratio" class="w-16" :value="result.medianRatio.toFixed(3)"/>
        <FieldItem title="COD" class="w-16" :value="result.cod.toFixed(3)"/>
        <FieldItem title="PRD" class="w-16" :value="result.prd.toFixed(3)"/>
        <FieldItem title="Lower Limit" class="w-16" :value="result.lowerLimit.toFixed(3)"/>
        <FieldItem title="Upper Limit" class="w-16" :value="result.upperLimit.toFixed(3)"/>
        <FieldItem v-if="result?.outliers" title="Outliers" :value="result?.outliers?.length?.toString()"/>
      </div>
      <template #icons>
        <SelectButton v-model="ratioType" :options="[{name:'40%',value:.4},{name:'100%',value:1}]" option-label="name"
                      option-value="value" class="mr-2" size="small"/>
      </template>
    </Panel>
  </div>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue';
import type {PropType} from "vue";
import type {PropertyWithSale, SalesRatio, SalesRatioType} from "@models/entities";
import FieldItem from "./FieldItem.vue";
import {calculateSalesRatio} from "@/utils/values/ratio";


const props = defineProps({
  title: {
    type: String,
    required: false,
    default: 'Sales Ratio'
  },
  modelValue: {
    type: Array as PropType<PropertyWithSale[]>,
    required: true
  },
})

const emit = defineEmits(["outliers"]);

const ratioType = ref<SalesRatioType>(.4);

const result = computed<SalesRatio | null>(()=> {
  const stats=calculateSalesRatio(props.modelValue, ratioType.value)
  if(stats?.outliers?.length) emit('outliers', stats.outliers);
  return stats;
});


</script>

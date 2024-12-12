
<template>
  <div>
    <Button size="small" variant="text" type="button" v-if="params?.id" icon="pi pi-angle-left" label="Back" aria-label="Back" @click="router.back()"/>
  <div class="card my-2">
    <Panel toggleable>
      <template #header>
        <div class="flex items-center gap-2">
          <span class="font-bold">{{title}}</span>
        </div>
      </template>
      <template #footer>

      </template>
      <div class="flex gap-3 justify-content-between">

          <slot>
            <FieldItem class="w-16" v-if="fields" v-for="([key,val]) of Object.entries(fields)" :title="toProperCase(key)" :value="val as string" :key="key"/>
          </slot>

      </div>
    </Panel>
  </div>
</div>
</template>

<script setup lang="ts">
import { ref,computed } from 'vue';
import type {PropType} from "vue";
import FieldItem from "./FieldItem.vue";
import {toProperCase} from "@/utils";
import { useRouter } from 'vue-router';

const props=defineProps({
  title: {
    type: String,
    required: true
  },
  fields:{
    type: Object as PropType<any>,
    required:false,
  }
})

const router = useRouter();
const params=computed(()=>router.currentRoute.value.params);

</script>

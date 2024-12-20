<template>
  <div class="card">
    <FileUpload  @select="onFileSelect" customUpload auto severity="secondary" class="p-button-outlined" :accept="accept">
      <template #empty>
        <p>{{context}}</p>
        <span>Drag and drop files to here to upload.</span>
      </template>
    </FileUpload>
    <img v-if="src" :src="src" alt="Image" class="shadow-md rounded-xl w-full sm:w-64" style="filter: grayscale(100%)" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {FileUploadSelectEvent} from "primevue";

const props=defineProps({
  title: {
    type: String,
    required: false,
    default: 'Upload',
  },
  context:{
    type: String,
    required: false,
    default: 'Upload a file',
  },
  accept:{
    type: String,
    required: false,
    default: '*',
  }
})

const src = ref(null);

function onFileSelect(event:FileUploadSelectEvent) {
  console.log({event});
  // const file = event.files[0];
  // const reader = new FileReader();
  //
  // reader.onload = async (e) => {
  //   src.value = e.target.result;
  // };
  //
  // reader.readAsDataURL(file);
}
</script>
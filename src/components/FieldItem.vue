
<template>
  <div class="card" v-bind="$attrs">
    <Fieldset :legend="title">
      <p class="m-0 text-center ">
        {{value}}
        <slot></slot>
      </p>
    </Fieldset>
  </div>
</template>

<script setup lang="ts">
const props=defineProps({
  title: {
    type: String,
    required: true
  },
  value:{
    type: String,
    required:true,
  }
})
</script>

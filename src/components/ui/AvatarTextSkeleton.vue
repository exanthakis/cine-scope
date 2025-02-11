<script setup lang="ts">
import AnimatedPlaceholder from './AnimatedPlaceholder.vue'
</script>

<template>
  <div class="flex flex-col items-center gap-4 justify-center w-full">
    <AnimatedPlaceholder class="w-25 h-25 rounded-full object-cover object-center" />
    <div class="font-medium text-white text-center">
      <AnimatedPlaceholder class="w-15 h-10" />
    </div>
  </div>
</template>

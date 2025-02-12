<script setup lang="ts">
import AnimatedPlaceholder from './AnimatedPlaceholder.vue'
</script>

<template>
  <div class="flex w-full flex-col items-center justify-center gap-4">
    <AnimatedPlaceholder class="h-25 w-25 rounded-full object-cover object-center" />
    <div class="text-center font-medium text-white">
      <AnimatedPlaceholder class="h-10 w-15" />
    </div>
  </div>
</template>

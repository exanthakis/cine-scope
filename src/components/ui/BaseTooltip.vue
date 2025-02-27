<script setup lang="ts">
import type { VNode } from 'vue'

defineSlots<{
  default?: () => VNode | VNode[]
  content?: () => VNode | VNode[]
}>()
</script>

<template>
  <div class="has-tooltip">
    <span class="tooltip text-black-primary bottom-6 w-fit rounded bg-gray-100 p-1 shadow-lg"
      ><slot name="content"></slot
    ></span>
    <div class="flex">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.tooltip {
  @apply invisible absolute;
}

.has-tooltip:hover .tooltip {
  @apply visible z-50;
}
</style>

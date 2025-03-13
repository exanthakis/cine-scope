<script setup lang="ts">
import type { VNode } from 'vue'

defineSlots<{
  default?: () => VNode | VNode[]
  content?: () => VNode | VNode[]
}>()
</script>

<template>
  <div class="has-tooltip group">
    <span
      class="tooltip text-black-primary invisible absolute bottom-6 w-fit rounded bg-gray-100 p-1 shadow-lg group-hover:visible group-hover:z-50"
    >
      <slot name="content"></slot>
    </span>
    <div class="tooltip-title flex">
      <slot></slot>
    </div>
  </div>
</template>

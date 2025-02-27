<script setup lang="ts">
import type { MovieDetailsItemProps } from '@/types/movie'
import type { VNode } from 'vue'

defineProps<MovieDetailsItemProps>()
defineSlots<{
  default?: () => VNode | VNode[]
  header?: () => VNode | VNode[]
}>()
</script>

<template>
  <div class="m-1 font-normal">
    <div class="text-black-primary/80 text-base dark:text-[#a3a3a3]">
      <slot name="header"></slot>
    </div>
    <span
      class="text-black-primary/70 flex w-2/3 flex-wrap gap-10 whitespace-pre-wrap dark:text-white"
      :class="classes"
    >
      <slot></slot>
    </span>
  </div>
</template>

<script setup lang="ts">
import type { BaseButtonProps } from '@/types/general'
import { computed, type VNode } from 'vue'

const { to = '', mode } = defineProps<BaseButtonProps>()
defineSlots<{
  default?: () => VNode | VNode[]
}>()

const buttonClasses = computed(() => [
  'relative px-6 py-2 text-white no-underline align-middle cursor-pointer text-sm rounded-xs font-bold transition-all ease-in',
  mode === 'primary'
    ? 'bg-red-netflix hover:bg-button-hover/60'
    : 'bg-black-primary hover:bg-button-sec-hover hover:border-0 hover:text-black-primary ',
])
</script>

<template>
  <button v-if="!to || !to.trim()" :class="buttonClasses">
    <slot></slot>
  </button>
  <RouterLink v-else :to="to" :class="buttonClasses">
    <slot></slot>
  </RouterLink>
</template>

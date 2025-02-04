<script setup lang="ts">
import type { BaseButtonProps } from '@/types/component-types'
import { computed } from 'vue'

const { to = '/', mode, isLink } = defineProps<BaseButtonProps>()

const buttonClasses = computed(() => [
  'relative px-6 py-2 text-white no-underline align-middle cursor-pointer text-sm rounded-xs font-bold',
  mode === 'primary'
    ? 'bg-film-primary hover:bg-button-hover'
    : 'bg-film-tertiary hover:bg-button-sec-hover border-[1px] ',
])
</script>

<template>
  <button v-if="!isLink" :class="buttonClasses">
    <slot></slot>
  </button>
  <RouterLink v-else :to="to" :class="buttonClasses">
    <slot></slot>
  </RouterLink>
</template>

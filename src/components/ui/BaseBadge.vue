<script setup lang="ts">
import type { BaseBadgeProps } from '@/types/general'

defineProps<BaseBadgeProps>()
defineEmits<{
  (event: 'close'): void
}>()
</script>

<template>
  <span
    class="bg-blue-navy inline-flex items-center gap-x-1.5 rounded-full py-1.5 ps-3 pe-2 text-xs font-medium text-white dark:bg-white/10"
  >
    {{ title }}
    <button
      type="button"
      class="inline-flex size-3 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white hover:bg-gray-300 focus:bg-blue-200 focus:text-blue-500 focus:outline-none"
      @click="$emit('close')"
    >
      <span class="sr-only">Remove badge</span>
      <img alt="Remove icon" src="@/assets/icons/close.svg" />
    </button>
  </span>
</template>

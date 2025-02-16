<script setup lang="ts">
interface BaseBadgeProps {
  title: string
}
defineProps<BaseBadgeProps>()
defineEmits(['close'])
</script>

<template>
  <span
    class="inline-flex items-center gap-x-1.5 rounded-full bg-[#10141e] py-1.5 ps-3 pe-2 text-xs font-medium text-white"
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

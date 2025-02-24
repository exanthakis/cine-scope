<script setup lang="ts">
interface MovieDetailsItemProps {
  classes?: string
}

defineProps<MovieDetailsItemProps>()
</script>

<template>
  <div class="m-1 font-normal">
    <div class="text-base text-[#a3a3a3]"><slot name="header"></slot></div>
    <span class="flex w-2/3 flex-wrap gap-10 whitespace-pre-wrap text-white" :class="classes"
      ><slot></slot
    ></span>
  </div>
</template>

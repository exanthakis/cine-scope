<script setup lang="ts">
import type { SingleRangeSliderProps } from '@/types/general'
import { ref } from 'vue'

const { min, max, step, initialValue } = defineProps<SingleRangeSliderProps>()
const emit = defineEmits<{
  (event: 'updateSingleRange', range: number): void
}>()

const rangeVal = ref(initialValue)

const handleInputChange = (e: Event) => {
  const newValue = Number((e.target as HTMLInputElement).value)
  rangeVal.value = newValue
  emit('updateSingleRange', newValue)
}
</script>

<template>
  <label for="default-range" class="text-film-secondary mb-2 block text-sm font-medium">{{
    rangeVal
  }}</label>
  <input
    id="default-range"
    type="range"
    :value="rangeVal"
    @input="handleInputChange"
    class="range-min h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
    :min="min"
    :step="step"
    :max="max"
  />
</template>

<script setup lang="ts">
import type { RangeSliderProps } from '@/types/general'
import { computed, onWatcherCleanup, ref, watchEffect } from 'vue'

const { min, max, step, initialMax, initialMin } = defineProps<RangeSliderProps>()
const emit = defineEmits<{
  (event: 'updateRange', range: { min: number; max: number }): void
}>()

const minValue = ref(initialMin)
const maxValue = ref(initialMax)
const progressRef = ref<HTMLDivElement | null>(null)

const disableMinThumb = computed(() => minValue.value >= maxValue.value)
const disableMaxThumb = computed(() => maxValue.value <= minValue.value)

const handleMin = (e: Event) => {
  const newValue = Number((e.target as HTMLInputElement).value)
  if (newValue <= maxValue.value) {
    minValue.value = newValue
    emit('updateRange', { min: minValue.value, max: maxValue.value })
  }
}

const handleMax = (e: Event) => {
  const newValue = Number((e.target as HTMLInputElement).value)
  if (newValue >= minValue.value) {
    maxValue.value = newValue
    emit('updateRange', { min: minValue.value, max: maxValue.value })
  }
}

watchEffect(() => {
  if (progressRef.value) {
    const minPercent = ((minValue.value - min) / (max - min)) * 100
    const maxPercent = ((maxValue.value - min) / (max - min)) * 100

    progressRef.value.style.left = minPercent + '%'
    progressRef.value.style.right = 100 - maxPercent + '%'
  }

  onWatcherCleanup(() => {
    if (progressRef.value) {
      progressRef.value.style.left = ''
      progressRef.value.style.right = ''
    }
  })
})
</script>

<template>
  <div class="flex flex-col rounded-lg bg-transparent px-0 pb-4">
    <div class="mb-6 flex items-center justify-between">
      <div class="rounded-md">
        <label for="release-year-min" class="p-2 font-semibold"> Min</label>
        <input
          type="number"
          id="release-year-min"
          v-model="minValue"
          @input="emit('updateRange', { min: minValue, max: maxValue })"
          class="w-24 rounded-md border border-gray-400 px-2 py-1"
        />
      </div>
      <div class=" ">
        <label for="release-year-max" class="p-2 font-semibold"> Max</label>
        <input
          type="number"
          id="release-year-max"
          v-model="maxValue"
          @input="emit('updateRange', { min: minValue, max: maxValue })"
          class="w-24 rounded-md border border-gray-400 px-2 py-1"
        />
      </div>
    </div>

    <div class="mb-4">
      <div class="bg-blue-slate relative h-1 overflow-hidden rounded-md">
        <div class="progress absolute h-1 rounded bg-gray-300" ref="progressRef"></div>
      </div>

      <div class="relative">
        <input
          type="range"
          :min="min"
          :step="step"
          :max="max"
          :value="minValue"
          @input="handleMin"
          :class="[
            'range-min pointer-events-none absolute -top-1 h-1 w-full appearance-none bg-transparent',
            disableMinThumb ? 'disabled-thumb' : '',
          ]"
          aria-label="Release year min button"
        />

        <input
          type="range"
          :min="min"
          :step="step"
          :max="max"
          :value="maxValue"
          @input="handleMax"
          :class="[
            'range-max pointer-events-none absolute -top-1 h-1 w-full appearance-none bg-transparent',
            disableMaxThumb ? 'disabled-thumb' : '',
          ]"
          aria-label="Release year max button"
        />
      </div>
    </div>
  </div>
</template>

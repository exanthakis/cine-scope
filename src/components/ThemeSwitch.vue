<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import IconMoon from './icons/IconMoon.vue'
import IconSun from './icons/IconSun.vue'
import IconSystem from './icons/IconSystem.vue'
import { type Theme } from '@/types/general'

const theme = ref<Theme>((localStorage.getItem('theme') as Theme) ?? 'system')

const system = computed(() =>
  matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
)

const applyTheme = () => {
  const html = document.documentElement
  html.classList.remove('light', 'dark')

  if (theme.value === 'dark') {
    html.classList.add('dark')
  } else if (theme.value === 'light') {
    html.classList.add('light')
  } else {
    html.classList.add(system.value)
  }
}

watch(theme, (newTheme) => {
  localStorage.setItem('theme', newTheme)
  applyTheme()
})

onMounted(() => {
  if (theme.value === 'system') {
    theme.value = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  applyTheme()
})
</script>

<template>
  <div
    class="relative z-0 -ml-0.5 inline-grid grid-cols-3 gap-0.5 rounded-full bg-white/10 p-0.75 text-white md:-ml-0"
  >
    <span
      class="cursor-pointer rounded-full p-0.5 transition duration-500 *:size-7"
      :class="
        theme === 'system'
          ? 'bg-gray-700 text-white inset-ring ring-transparent inset-ring-white/10'
          : ''
      "
      aria-label="System theme"
      :aria-checked="theme === 'system'"
      role="radio"
      @click="theme = 'system'"
    >
      <IconSystem />
    </span>
    <span
      class="cursor-pointer rounded-full p-0.5 transition duration-500 *:size-7"
      :class="
        theme === 'light'
          ? 'bg-gray-700 text-white inset-ring ring-transparent inset-ring-white/10'
          : ''
      "
      :aria-checked="theme === 'light'"
      aria-label="Light theme"
      role="radio"
      @click="theme = 'light'"
    >
      <IconSun />
    </span>
    <span
      class="cursor-pointer rounded-full p-0.5 transition duration-500 *:size-7"
      :class="
        theme === 'dark'
          ? 'bg-gray-700 text-white inset-ring ring-transparent inset-ring-white/10'
          : ''
      "
      :aria-checked="theme === 'dark'"
      aria-label="Dark theme"
      role="radio"
      @click="theme = 'dark'"
    >
      <IconMoon />
    </span>
  </div>
</template>

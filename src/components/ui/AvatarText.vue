<script setup lang="ts">
import type { AvatarTextProps } from '@/types/general'

defineProps<AvatarTextProps>()
</script>

<template>
  <div class="flex w-full flex-col items-center justify-center gap-4">
    <img
      v-if="path"
      class="h-25 w-25 rounded-full object-cover object-center"
      :src="`https://image.tmdb.org/t/p/original/${path}`"
      :alt="title"
    />
    <img
      v-else
      alt="Avatar placeholder"
      class="h-25 w-25"
      src="@/assets/icons/placeholder-avatar.svg"
    />

    <div class="text-film-tertiary/80 text-center font-medium dark:text-white">
      <h5>{{ name }}</h5>
      <p class="text-film-tertiary/70 text-sm dark:text-gray-400">{{ title }}</p>
    </div>
  </div>
</template>

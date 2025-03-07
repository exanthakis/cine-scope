<script setup lang="ts">
import type { AvatarTextProps } from '@/types/general'
import IconAvatar from '../icons/IconAvatar.vue'

defineProps<AvatarTextProps>()
</script>

<template>
  <div class="flex w-full flex-col items-center justify-center gap-4">
    <img
      v-if="poster_path"
      class="h-25 w-25 rounded-full object-cover object-center"
      :src="`https://image.tmdb.org/t/p/original/${poster_path}`"
      :alt="title"
    />

    <IconAvatar v-else class="fill-black-primary dark:fill-white-primary h-25 w-25" />

    <div class="text-black-primary/80 text-center font-medium dark:text-white">
      <h5>{{ name }}</h5>
      <p class="text-black-primary/70 text-sm dark:text-gray-400">{{ title }}</p>
    </div>
  </div>
</template>

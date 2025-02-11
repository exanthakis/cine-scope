<script setup lang="ts">
import type { AvatarTextProps } from '@/types/general'

defineProps<AvatarTextProps>()
</script>

<template>
  <div class="flex flex-col items-center gap-4 justify-center w-full">
    <img
      v-if="path"
      class="w-25 h-25 rounded-full object-cover object-center"
      :src="`https://image.tmdb.org/t/p/original/${path}`"
      :alt="title"
    />
    <img v-else alt="Imdb logo" class="w-25 h-25" src="@/assets/placeholder-avatar.svg" />

    <div class="font-medium text-white text-center">
      <h5>{{ name }}</h5>
      <p class="text-sm text-gray-400">{{ title }}</p>
    </div>
  </div>
</template>

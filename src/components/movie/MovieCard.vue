<script setup lang="ts">
import type { MovieCard } from '@/types'

defineProps<MovieCard>()

const onFavoriteClick = () => {
  console.log('clicked')
}
</script>
<template>
  <RouterLink :to="{ name: 'movie-details', params: { id } }">
    <div class="mx-auto rounded-sm w-fit">
      <img
        class="h-full rounded-lg"
        :src="`https://image.tmdb.org/t/p/w500${imgUrl}`"
        :alt="title"
      />

      <button @click="onFavoriteClick">like</button>

      <h3>{{ title }}</h3>
      <p>{{ date?.split('-')[0] }}</p>
    </div>
  </RouterLink>
</template>

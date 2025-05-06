<script setup lang="ts">
import type { MovieCardsProps } from '@/types/general'
import MovieCard from './MovieCard.vue'

const { showNum = false } = defineProps<MovieCardsProps>()
</script>

<template>
  <div
    class="max-2xl mx-auto grid grid-cols-2 gap-9 pb-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
  >
    <MovieCard
      v-for="(movie, idx) in movies.slice(0, limit || movies.length)"
      :key="movie.id"
      :id="movie.id"
      :title="movie.title"
      :imgUrl="'poster_path' in movie ? movie.poster_path : movie.imgUrl"
      :config="{
        ...(showNum && { num: idx + 1 }),
      }"
    />
  </div>
</template>

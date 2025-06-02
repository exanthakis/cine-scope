<script setup lang="ts">
import type { MovieCardsProps } from '@/types/general'
import MovieCard from './MovieCard.vue'
import { MOVIES_VIEW } from '@/types/enums'
import { useMoviesViewStore } from '@/stores/movies-view'
import ListCard from '../list/ListCard.vue'

const { showNum = false } = defineProps<MovieCardsProps>()

const moviesViewStore = useMoviesViewStore()
</script>

<template>
  <div class="max-2xl mx-auto" v-show="moviesViewStore.view === MOVIES_VIEW.CARDS_VIEW">
    <TransitionGroup
      name="movie-fade"
      tag="a"
      class="grid grid-cols-2 gap-9 pb-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
      <MovieCard
        v-for="(movie, idx) in movies.slice(0, limit || movies.length)"
        :key="movie.id"
        :id="movie.id"
        :title="movie.title"
        :description="
          'overview' in movie ? movie.overview : 'description' in movie ? movie.description : ''
        "
        :imgUrl="'poster_path' in movie ? movie.poster_path : movie.imgUrl"
        :config="{
          ...(showNum && { num: idx + 1 }),
        }"
      />
    </TransitionGroup>
  </div>
  <div class="max-2xl mx-auto" v-show="moviesViewStore.view !== MOVIES_VIEW.CARDS_VIEW">
    <TransitionGroup name="movie-fade" tag="a" class="flex flex-col gap-9 pb-7">
      <ListCard
        v-for="(movie, idx) in movies.slice(0, limit || movies.length)"
        :key="movie.id"
        :id="movie.id"
        :title="movie.title"
        :description="
          'overview' in movie ? movie.overview : 'description' in movie ? movie.description : ''
        "
        :imgUrl="'poster_path' in movie ? movie.poster_path : movie.imgUrl"
        :config="{
          ...(showNum && { num: idx + 1 }),
        }"
      />
    </TransitionGroup>
  </div>
</template>

<style scoped>
.movie-fade-enter-from {
  opacity: 0;
  transform: scale(0.9);
}
.movie-fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
.movie-fade-enter-active {
  transition: all 0.3s ease;
}
.movie-fade-leave-active {
  transition: opacity 0.2s ease;
  opacity: 0;
}
</style>

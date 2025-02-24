<script setup lang="ts">
import MovieCard from '@/components/movie/MovieCard.vue'
import { useFavoritesStore } from '@/stores/favorites'
import { computed } from 'vue'

const favoritesStore = useFavoritesStore()

const favoriteText = computed(() => {
  return favoritesStore.totalFavorites === 1 ? 'favorite movie:' : `favorites movies:`
})
</script>

<template>
  <div class="px-[5vw] md:px-[8vw] lg:px-[15vw]">
    <h5 v-if="favoritesStore.totalFavorites === 0" class="text-film-tertiary p-5 text-lg font-bold">
      No favorite movies found.
    </h5>
    <div v-else>
      <h5 class="pt-10 pb-5 text-lg">
        Found <b>{{ favoritesStore.totalFavorites }}</b> {{ favoriteText }}
      </h5>
      <div
        class="max-2xl mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      >
        <MovieCard
          v-for="movie in favoritesStore.movies"
          :key="movie.id"
          :id="movie.id"
          :title="movie.title"
          :imgUrl="movie.imgUrl"
        />
      </div>
    </div>
  </div>
</template>

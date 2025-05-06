<script setup lang="ts">
import MovieCards from '@/components/movie/MovieCards.vue'
import { useFavoritesStore } from '@/stores/favorites'
import { computed } from 'vue'

const favoritesStore = useFavoritesStore()

const favoriteText = computed(() => {
  return favoritesStore.totalFavorites === 1 ? 'favorite movie:' : `favorites movies:`
})
</script>

<template>
  <div
    class="text-black-primary dark:text-white-primary 3xl:max-w-[100rem] mx-auto max-w-5xl px-5 sm:px-10 md:max-w-4xl lg:max-w-7xl"
  >
    <h5 v-if="favoritesStore.totalFavorites === 0" class="pt-10 text-lg">
      No favorite movies found.
    </h5>
    <div v-else>
      <h5 class="pt-10 pb-5 text-lg">
        Found <b>{{ favoritesStore.totalFavorites }}</b> {{ favoriteText }}
      </h5>

      <MovieCards :movies="favoritesStore.movies" />
    </div>
  </div>
</template>

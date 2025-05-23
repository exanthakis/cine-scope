<script setup lang="ts">
import MovieCards from '@/components/movie/MovieCards.vue'
import MoviesViewToggle from '@/components/ui/MoviesViewToggle.vue'
import { useFavoritesStore } from '@/stores/favorites'
import { computed } from 'vue'

const favoritesStore = useFavoritesStore()

const favoriteText = computed(() => {
  return favoritesStore.totalFavorites === 1 ? 'favorite movie:' : `favorites movies:`
})
</script>

<template>
  <div
    class="text-black-primary dark:text-white-primary 3xl:max-w-[100rem] w-full max-w-5xl px-5 sm:px-10 md:max-w-4xl lg:max-w-7xl"
  >
    <h5 v-if="favoritesStore.totalFavorites === 0" class="pt-10 text-center text-lg">
      No favorite movies found.
    </h5>
    <template v-else>
      <div class="flex w-full items-center justify-between pt-10 pb-5">
        <h5 class="text-lg">
          Found <b>{{ favoritesStore.totalFavorites }}</b> {{ favoriteText }}
        </h5>
        <MoviesViewToggle />
      </div>

      <MovieCards :movies="favoritesStore.movies" />
    </template>
  </div>
</template>

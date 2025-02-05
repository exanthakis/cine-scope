<script setup lang="ts">
import MovieCard from '@/components/movie/MovieCard.vue'
import MoviePagination from '@/components/movie/MoviePagination.vue'
import MovieService from '@/services/MovieService'
import type { Movie } from '@/types/api'
import { computed, ref, watch } from 'vue'

const props = defineProps(['page'])
const totalPages = ref(0)
const searchQuery = ref('')
const queryTimeout = ref<ReturnType<typeof setTimeout> | null>(null)
const movieResults = ref<Movie[] | null>(null)

const page = computed(() => props.page)

const hasNextPage = computed(() => {
  return page.value < totalPages.value
})

const getSearchResults = async () => {
  clearTimeout(queryTimeout.value ?? undefined)

  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== '') {
      try {
        const movieDetails = await MovieService.searchMovies(searchQuery.value, page.value)
        movieResults.value = movieDetails.data.results
        totalPages.value = movieDetails.data.total_pages
      } catch {
        // searchError.value = true
      }
      return
    }
    movieResults.value = null
  }, 2000)
}

watch([page], getSearchResults)
</script>

<template>
  <main class="container">
    <div
      class="grid grid-cols-1 gap-4 px-5 py-10 mx-auto max-2xl lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2"
    >
      <input
        type="text"
        v-model="searchQuery"
        @input="getSearchResults"
        placeholder="Search for a city or state"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"
      />
      <MovieCard
        v-for="movie in movieResults"
        :key="movie.id"
        :id="movie.id"
        :title="movie.title"
        :date="movie.release_date"
        :imgUrl="movie.poster_path"
      />
    </div>

    <MoviePagination
      v-show="movieResults && movieResults.length > 0"
      :page="page"
      :hasNextPage="hasNextPage"
      route="movie-list"
    />
  </main>
</template>

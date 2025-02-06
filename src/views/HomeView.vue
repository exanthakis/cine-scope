<script setup lang="ts">
import MovieCard from '@/components/movie/MovieCard.vue'
import MovieCardSkeleton from '@/components/movie/MovieCardSkeleton.vue'
import MoviePagination from '@/components/movie/MoviePagination.vue'
import SearchInput from '@/components/SearchInput.vue'
import MovieService from '@/services/MovieService'
import type { Movie } from '@/types/api'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps(['page'])
const totalPages = ref(0)
const searchQuery = ref('')
const queryTimeout = ref<ReturnType<typeof setTimeout> | null>(null)
const movieResults = ref<Movie[] | null>(null)
const isLoading = ref(false)
const searchError = ref<string | null>(null)
const router = useRouter()

const page = computed(() => props.page)

const hasNextPage = computed(() => {
  return page.value < totalPages.value
})

const getSearchResults = async () => {
  if (!searchQuery.value.trim()) {
    movieResults.value = null
    return
  }

  searchError.value = null

  if (queryTimeout.value) clearTimeout(queryTimeout.value)

  queryTimeout.value = setTimeout(async () => {
    isLoading.value = true
    try {
      const movieDetails = await MovieService.searchMovies(searchQuery.value, page.value)
      movieResults.value = movieDetails.data.results
      totalPages.value = movieDetails.data.total_pages
    } catch (error) {
      searchError.value =
        error instanceof Error ? error.message : 'Failed to fetch data - please try again later'
      router.push({ name: 'network-error' })
    } finally {
      // Flicker Delay to display skeleton
      await new Promise((res) => setTimeout(res, 1000))
      isLoading.value = false
    }
  }, 1500)
}

watch([page], getSearchResults)
</script>

<template>
  <main class="container">
    <div class="flex w-full justify-center align-center mx-auto max-w-2xl">
      <SearchInput v-model:searchQuery="searchQuery" @get-search-results="getSearchResults" />
    </div>
    <div
      v-if="isLoading"
      class="grid grid-cols-1 gap-4 px-5 py-10 mx-auto max-2xl lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2"
    >
      <MovieCardSkeleton v-for="res in movieResults?.length" :key="res" />
    </div>
    <p v-else-if="!isLoading && searchError">{{ searchError }}</p>
    <p
      v-else-if="
        !isLoading && (!movieResults || movieResults.length === 0) && searchQuery.trim().length > 0
      "
    >
      Sorry, we couldn't find any results
    </p>
    <div
      v-else
      class="grid grid-cols-1 gap-4 px-5 py-10 mx-auto max-2xl lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2"
    >
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

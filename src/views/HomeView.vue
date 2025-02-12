<script setup lang="ts">
import MovieCard from '@/components/movie/MovieCard.vue'
import MovieCardSkeleton from '@/components/movie/MovieCardSkeleton.vue'
import MoviePagination from '@/components/movie/MoviePagination.vue'
import SearchInput from '@/components/SearchInput.vue'
import MovieService from '@/services/MovieService'
import type { Movie } from '@/types/movie'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps(['page'])
const totalPages = ref(0)
const totalResults = ref(null)
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
  totalResults.value = null

  if (queryTimeout.value) clearTimeout(queryTimeout.value)

  queryTimeout.value = setTimeout(async () => {
    isLoading.value = true
    try {
      const movieDetails = await MovieService.searchMovies(searchQuery.value, page.value)
      totalResults.value = movieDetails.data.total_results
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
    <div class="align-center mx-auto flex w-full max-w-2xl justify-center">
      <SearchInput v-model:searchQuery="searchQuery" @get-search-results="getSearchResults" />
    </div>
    <div
      v-if="isLoading"
      class="max-2xl mx-auto grid grid-cols-1 gap-4 px-5 py-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
      <MovieCardSkeleton v-for="res in movieResults?.length" :key="res" />
    </div>
    <p v-else-if="!isLoading && searchError">{{ searchError }}</p>
    <p
      v-else-if="!isLoading && totalResults === 0 && searchQuery.trim().length > 0"
      class="text-center text-lg font-bold"
    >
      Sorry, we couldn't find any results
    </p>
    <div v-else class="px-5">
      <p v-if="totalResults && totalResults > 0" class="text-left">
        Total results found: <span class="font-bold">{{ totalResults }}</span>
      </p>
      <div
        class="max-2xl mx-auto grid grid-cols-1 gap-4 py-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      >
        <MovieCard
          v-for="movie in movieResults"
          :key="movie.id"
          :id="movie.id"
          :title="movie.title"
          :imgUrl="movie.poster_path"
        />
      </div>
    </div>

    <MoviePagination
      v-show="movieResults && movieResults.length > 0"
      :total-pages="totalPages"
      :page="page"
      :has-next-page="hasNextPage"
      route="movie-list"
    />
  </main>
</template>

<script setup lang="ts">
import MovieService from '@/services/MovieService'
import type { AxiosError } from 'axios'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MovieCard from './MovieCard.vue'
import type { Movie } from '@/types/api'

interface SimilarMoviesProps {
  id: number
}
const { id } = defineProps<SimilarMoviesProps>()
const route = useRoute()
const router = useRouter()
const similarMovies = ref<Movie[] | null>(null)
const movieId = computed(() => (id ? id.toString() : ''))
const isLoading = ref(false)

const getSimilarMovies = async () => {
  isLoading.value = true
  try {
    const similarMovies = await MovieService.getSimilarMovies(movieId.value)

    return similarMovies.data.results
  } catch (err) {
    const error = err as AxiosError
    if (error && error.response && error.response.status == 404) {
      router.push({ name: '404-resource', params: { resource: 'movie' } })
    } else {
      router.push({ name: 'network-error' })
    }
  } finally {
    isLoading.value = false
  }
}

similarMovies.value = await getSimilarMovies()

watch(
  () => route.params.id,
  async (newId) => {
    if (newId) similarMovies.value = await getSimilarMovies()
  },
)
</script>
<template>
  <div>
    <div v-if="isLoading">loading..</div>
    <p v-else-if="!isLoading && similarMovies?.length === 0">Sorry, we couldn't find any results</p>
    <div v-else class="mt-6">
      <h2 class="text-3xl text-white mb-2.5 mt-5">More Like This</h2>
      <div
        class="grid grid-cols-1 gap-4 py-7 mx-auto max-2xl xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2"
      >
        <MovieCard
          v-for="movie in similarMovies"
          :key="movie.id"
          :id="movie?.id"
          :title="movie.title"
          :date="movie.release_date"
          :imgUrl="movie.poster_path"
          class="no-rounded"
        />
      </div>
    </div>
  </div>
</template>

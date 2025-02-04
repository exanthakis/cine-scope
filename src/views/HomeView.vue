<script setup lang="ts">
import MovieCard from '@/components/movie/MovieCard.vue'
import MoviePagination from '@/components/movie/MoviePagination.vue'
import MovieService from '@/services/MovieService'
import type { Movie } from '@/types/api'
import { computed, onMounted, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps(['page'])
const movies = ref<Movie[] | null>(null)
const totalPages = ref(0)

const router = useRouter()
const page = computed(() => props.page)

const hasNextPage = computed(() => {
  return page.value < totalPages.value
})

onMounted(() => {
  watchEffect(() => {
    movies.value = null
    MovieService.getPopularMovies(page.value)
      .then((response) => {
        if (response.status === 200) {
          movies.value = response.data.results
          totalPages.value = response.data.total_pages
        } else throw new Error('Could not retrieve data!')
      })
      .catch((error) => {
        router.push({ name: 'network-error' })

        console.error(error)
      })
  })
})
</script>

<template>
  <main class="container">
    <div
      class="grid grid-cols-1 gap-4 px-5 py-10 mx-auto max-2xl lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2"
    >
      <MovieCard
        v-for="movie in movies"
        :key="movie.id"
        :id="movie.id"
        :title="movie.title"
        :date="movie.release_date"
        :imgUrl="movie.poster_path"
      />
    </div>

    <MoviePagination :page="page" :hasNextPage="hasNextPage" />
  </main>
</template>

<script setup lang="ts">
import MovieService from '@/services/MovieService'
import type { Movie } from '@/types/movie'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import MovieSlider from '@/components/movie/MovieSlider.vue'
import BaseSpinner from '@/components/ui/BaseSpinner.vue'
import MovieCard from '@/components/movie/MovieCard.vue'

const trendingMovies = ref<Movie[]>([])
const movies = ref<Movie[]>([])
const netflixMovies = ref<Movie[]>([])
const disneyMovies = ref<Movie[]>([])
const loading = ref(true)
const router = useRouter()

onMounted(async () => {
  try {
    const [trendingResponse, popularResponse, netflixResponse, disneyResponse] = await Promise.all([
      MovieService.getTrendingMovies(),
      MovieService.getPopularMovies('1'), //1st page only
      MovieService.getMoviesByProvider('8'), // Netflix
      MovieService.getMoviesByProvider('337'), // Disney+
    ])
    await new Promise((res) => setTimeout(res, 1000))

    if (trendingResponse.status === 200)
      trendingMovies.value = trendingResponse.data.results.slice(0, 6) || [] // Get only the first 6 movies
    else throw new Error('Could not retrieve Trending movies!')

    if (popularResponse.status === 200) movies.value = popularResponse.data.results || []
    else throw new Error('Could not retrieve Popular movies!')

    if (netflixResponse.status === 200) netflixMovies.value = netflixResponse.data.results || []
    else throw new Error('Could not retrieve Netflix movies!')

    if (disneyResponse.status === 200) disneyMovies.value = disneyResponse.data.results || []
    else throw new Error('Could not retrieve Disney movies!')
  } catch (error) {
    router.push({ name: 'network-error' })
    console.error(error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <main class="min-h-[calc(100vh-60px)] w-full pb-15">
    <div class="px-[5vw] md:px-[8vw] lg:px-[15vw]">
      <div v-if="loading" class="flex h-[50vh] items-center justify-center">
        <BaseSpinner />
      </div>

      <div v-else>
        <section class="mt-10">
          <div class="mt-5 mb-4 w-full border-b border-gray-500/55 pb-2">
            <h2 class="text-black-primary relative w-fit text-2xl dark:text-white">
              Trending movies
              <span
                class="bg-film-primary absolute top-0 -right-4 inline-flex h-2 w-2 animate-ping rounded-full opacity-75"
              ></span>
            </h2>
          </div>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-6">
            <MovieCard
              v-for="trendingMovie in trendingMovies"
              :key="trendingMovie.id"
              :id="trendingMovie.id"
              :title="trendingMovie.title"
              :imgUrl="trendingMovie.poster_path"
            />
          </div>
        </section>
        <section class="mt-10">
          <h2
            class="text-black-primary mt-5 mb-4 w-full border-b border-gray-500/55 pb-2 text-2xl dark:text-white"
          >
            Popular movies
          </h2>
          <MovieSlider :movies="movies" />
        </section>

        <section class="mt-10">
          <div class="mt-5 mb-4 flex w-full items-center border-b border-gray-500/55 pb-2">
            <img src="@/assets/images/netflix.png" alt="Netflix logo" class="h-5 w-18" />
            <h2 class="text-black-primary pl-2 text-2xl dark:text-white">movies</h2>
          </div>
          <MovieSlider :movies="netflixMovies" />
        </section>

        <section class="mt-10">
          <div class="mt-5 mb-4 flex w-full items-center border-b border-gray-500/55 pb-2">
            <img
              src="@/assets/images/disney-dark.png"
              alt="Disney logo"
              class="block h-10 w-17 dark:hidden"
            />
            <img
              src="@/assets/images/disney.png"
              alt="Disney logo"
              class="hidden h-10 w-17 dark:block"
            />
            <h2 class="text-black-primary pl-2 text-2xl dark:text-white">movies</h2>
          </div>
          <MovieSlider :movies="disneyMovies" />
        </section>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import MovieService from '@/services/MovieService'
import type { Movie } from '@/types/movie'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import MovieSlider from '@/components/movie/MovieSlider.vue'
import BaseSpinner from '@/components/ui/BaseSpinner.vue'

const movies = ref<Movie[]>([])
const netflixMovies = ref<Movie[]>([])
const disneyMovies = ref<Movie[]>([])
const loading = ref(true)
const router = useRouter()

onMounted(async () => {
  try {
    const [popularResponse, netflixResponse, disneyResponse] = await Promise.all([
      MovieService.getPopularMovies('1'),
      MovieService.getMoviesByProvider('8'), // Netflix
      MovieService.getMoviesByProvider('337'), // Disney+
    ])
    await new Promise((res) => setTimeout(res, 1000))

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
  <main class="min-h-[calc(100vh-60px)] w-full bg-[#10141e] pb-15">
    <div class="px-[5vw] md:px-[8vw] lg:px-[15vw]">
      <div v-if="loading" class="flex h-[50vh] items-center justify-center">
        <BaseSpinner />
      </div>

      <div v-else>
        <section class="mt-10">
          <h2 class="mt-5 mb-4 w-full border-b border-gray-500/55 pb-2 text-2xl text-white">
            Popular movies
          </h2>
          <MovieSlider :movies="movies" />
        </section>

        <section class="mt-10">
          <div class="mt-5 mb-4 flex w-full items-center border-b border-gray-500/55 pb-2">
            <img src="@/assets/images/netflix.png" alt="play-video-icon" class="h-5 w-18" />
            <h2 class="pl-2 text-2xl text-white">movies</h2>
          </div>
          <MovieSlider :movies="netflixMovies" />
        </section>

        <section class="mt-10">
          <div class="mt-5 mb-4 flex w-full items-center border-b border-gray-500/55 pb-2">
            <img src="@/assets/images/disney.png" alt="play-video-icon" class="h-10 w-17" />
            <h2 class="pl-2 text-2xl text-white">movies</h2>
          </div>
          <MovieSlider :movies="disneyMovies" />
        </section>
      </div>
    </div>
  </main>
</template>

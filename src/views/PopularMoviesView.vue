<script setup lang="ts">
import MovieService from '@/services/MovieService'
import type { Movie } from '@/types/movie'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseSpinner from '@/components/ui/BaseSpinner.vue'
import MovieCard from '@/components/movie/MovieCard.vue'
import SwiperSlider from '@/components/ui/SwiperSlider.vue'
import { MOVIES_SLIDER_BREAKPOINTS } from '@/constants/general'
import MovieCards from '@/components/movie/MovieCards.vue'

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

    if (trendingResponse.status === 200) trendingMovies.value = trendingResponse.data.results || []
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
    <div class="3xl:max-w-[100rem] mx-auto max-w-5xl px-5 sm:px-10 md:max-w-4xl lg:max-w-7xl">
      <div v-if="loading" class="flex h-[50vh] items-center justify-center">
        <BaseSpinner />
      </div>

      <div v-else>
        <section class="mt-10">
          <div class="mt-5 mb-4 w-full border-b border-gray-500/55 pb-2">
            <h2 class="text-black-primary relative w-fit text-2xl dark:text-white">
              Trending movies
              <span
                class="bg-red-netflix absolute top-0 -right-4 inline-flex h-2 w-2 animate-ping rounded-full opacity-75"
              ></span>
            </h2>
          </div>

          <MovieCards :movies="trendingMovies" :show-num="true" :limit="6" class="xl:grid-cols-6" />
        </section>
        <section class="mt-10">
          <h2
            class="text-black-primary mt-5 mb-4 w-full border-b border-gray-500/55 pb-2 text-2xl dark:text-white"
          >
            Popular movies
          </h2>
          <SwiperSlider :data="movies" :navigation="false" :breakpoints="MOVIES_SLIDER_BREAKPOINTS">
            <template #default="{ id, title, poster_path }">
              <template v-if="id && title">
                <MovieCard
                  :id="id"
                  :title="title"
                  :imgUrl="poster_path"
                  :config="{
                    hideFav: true,
                    hideOutline: true,
                  }"
                  class="!min-h-[10vh]"
                />
              </template>
            </template>
          </SwiperSlider>
        </section>

        <section class="mt-10">
          <div class="mt-5 mb-4 flex w-full items-center border-b border-gray-500/55 pb-2">
            <img src="@/assets/images/netflix.png" alt="Netflix logo" class="h-5 w-18" />
            <h2 class="text-black-primary pl-2 text-2xl dark:text-white">movies</h2>
          </div>
          <SwiperSlider
            :data="netflixMovies"
            :navigation="false"
            :breakpoints="MOVIES_SLIDER_BREAKPOINTS"
          >
            <template #default="{ id, title, poster_path }">
              <template v-if="id && title">
                <MovieCard
                  :id="id"
                  :title="title"
                  :imgUrl="poster_path"
                  :config="{
                    hideFav: true,
                    hideOutline: true,
                  }"
                  class="!min-h-[10vh]"
                />
              </template>
            </template>
          </SwiperSlider>
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
          <SwiperSlider
            :data="disneyMovies"
            :navigation="false"
            :breakpoints="MOVIES_SLIDER_BREAKPOINTS"
          >
            <template #default="{ id, title, poster_path }">
              <div v-if="id && title">
                <MovieCard
                  :id="id"
                  :title="title"
                  :imgUrl="poster_path"
                  :config="{
                    hideFav: true,
                    hideOutline: true,
                  }"
                  class="!min-h-[10vh]"
                />
              </div>
            </template>
          </SwiperSlider>
        </section>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import BaseSpinner from '@/components/ui/BaseSpinner.vue'
import MovieCard from '@/components/movie/MovieCard.vue'
import SwiperSlider from '@/components/ui/SwiperSlider.vue'
import MoviesViewToggle from '@/components/ui/MoviesViewToggle.vue'
import { MOVIES_SLIDER_BREAKPOINTS } from '@/constants/general'
import MovieCards from '@/components/movie/MovieCards.vue'
import { useMultipleMovieLists } from '@/composables/usePopularMoviesLists'
import { usePopularMovies } from '@/composables/usePopularMovies'
import { useProviderMovies } from '@/composables/useProviderMovies'
import { handlePaginatedFetch } from '@/lib/utils'

const popularMoviesPage = ref('1')
const netflixMoviesPage = ref('1')
const disneyMoviesPage = ref('1')
const limit = ref(5)

const { trendingMovies, popularMovies, netflixMovies, disneyMovies, loadMovieLists, isLoading } =
  useMultipleMovieLists(popularMoviesPage)
const { getPopularMovies, isLoading: popularMoviesLoading } = usePopularMovies(popularMoviesPage)
const { getProviderMovies: getNetflixMovies, isLoading: netflixMoviesLoading } = useProviderMovies(
  '8',
  netflixMoviesPage,
)
const { getProviderMovies: getDisneyMovies, isLoading: disneyMoviesLoading } = useProviderMovies(
  '337',
  disneyMoviesPage,
)

onMounted(() => {
  loadMovieLists()
  popularMoviesPage.value = (parseInt(popularMoviesPage.value) + 1).toString()
  netflixMoviesPage.value = (parseInt(netflixMoviesPage.value) + 1).toString()
  disneyMoviesPage.value = (parseInt(disneyMoviesPage.value) + 1).toString()
})

const loadTrendingMovies = () => {
  limit.value = limit.value === 5 ? trendingMovies.value.length : 5
}

const handleReachEnd = async (type: 'popular' | 'disney' | 'netflix') => {
  if (type === 'popular') {
    await handlePaginatedFetch(getPopularMovies, popularMoviesPage, popularMovies)
  } else if (type === 'netflix') {
    await handlePaginatedFetch(getNetflixMovies, netflixMoviesPage, netflixMovies)
  } else if (type === 'disney') {
    await handlePaginatedFetch(getDisneyMovies, disneyMoviesPage, disneyMovies)
  }
}
</script>

<template>
  <main class="min-h-[calc(100vh-60px)] w-full pb-15">
    <div class="3xl:max-w-[100rem] mx-auto max-w-5xl px-5 sm:px-10 md:max-w-4xl lg:max-w-7xl">
      <div v-if="isLoading" class="flex h-[50vh] items-center justify-center">
        <BaseSpinner />
      </div>

      <div v-else>
        <section class="mt-10">
          <div
            class="mt-5 mb-4 flex w-full items-center justify-between gap-3 border-b border-gray-500/55 pb-2"
          >
            <h2 class="text-black-primary relative w-fit text-2xl dark:text-white">
              Trending movies
              <span
                class="bg-red-netflix absolute top-0 -right-4 inline-flex h-2 w-2 animate-ping rounded-full opacity-75"
              ></span>
            </h2>
            <MoviesViewToggle />
          </div>

          <MovieCards :movies="trendingMovies" :show-num="true" :limit="limit" />
          <BaseButton
            @click="loadTrendingMovies"
            class="mx-auto flex cursor-pointer !rounded-full"
            mode="primary"
          >
            {{ limit === 5 ? 'Load more' : 'Load less' }}
          </BaseButton>
        </section>
        <section class="mt-10">
          <h2
            class="text-black-primary mt-5 mb-4 w-full border-b border-gray-500/55 pb-2 text-2xl dark:text-white"
          >
            Popular movies
          </h2>
          <SwiperSlider
            :data="popularMovies"
            :navigation="false"
            :breakpoints="MOVIES_SLIDER_BREAKPOINTS"
            @reach-end="() => handleReachEnd('popular')"
            :loop="false"
          >
            <template #default="{ id, title, poster_path }">
              <template v-if="id && title && !popularMoviesLoading">
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
              <div v-else class="flex items-center justify-center py-10">
                <BaseSpinner />
              </div>
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
            @reach-end="() => handleReachEnd('netflix')"
            :loop="false"
          >
            <template #default="{ id, title, poster_path }">
              <template v-if="id && title && !netflixMoviesLoading">
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
              <div v-else class="flex items-center justify-center py-10">
                <BaseSpinner />
              </div>
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
            @reach-end="() => handleReachEnd('disney')"
            :loop="false"
          >
            <template #default="{ id, title, poster_path }">
              <template v-if="id && title && !disneyMoviesLoading">
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
              <div v-else class="flex items-center justify-center py-10">
                <BaseSpinner />
              </div>
            </template>
          </SwiperSlider>
        </section>
      </div>
    </div>
  </main>
</template>

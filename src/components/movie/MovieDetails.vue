<script setup lang="ts">
import MovieService from '@/services/MovieService'
import type { MovieDetailsProps } from '@/types/component-types'
import type { MovieDetails } from '@/types/movie-details'
import { computed } from 'vue'

const props = defineProps<MovieDetailsProps>()
const id = computed(() => props.id)

const getMovieData = async () => {
  try {
    const movieDetails = await MovieService.getMovieData(id.value)

    // Flicker Delay to display skeleton
    await new Promise((res) => setTimeout(res, 1000))
    return movieDetails.data
  } catch (err) {
    if (err instanceof Error) return err.message
  }
}

const movieDetails: MovieDetails = await getMovieData()

const rating = computed(() =>
  movieDetails.vote_average ? movieDetails.vote_average.toFixed(1) : 0,
)

console.log(movieDetails)

const duration = computed(() => {
  if (movieDetails.runtime) {
    const hours = Math.floor(movieDetails.runtime / 60)
    const remainingMinutes = movieDetails.runtime % 60
    return `${hours}h${hours !== 1 ? 's' : ''} ${remainingMinutes}m`
  }
  return 0
})

const imdbLink = computed(() => (movieDetails.imdb_id ? movieDetails.imdb_id : 0))
console.log('imdbLink', imdbLink.value)
const formattedGenres = movieDetails.genres
  ? movieDetails.genres.map((genre) => genre.name).join(' - ')
  : ''
</script>

<template>
  <div class="w-full bg-[#181818] relative text-white">
    <div
      class="w-full bg-center bg-cover min-h-[70vh] h-[80vh] px-[5vw] gradient-bottom after:z-[-1] after:absolute after:content-[''] after:left-0 after:h-full after:w-full after:top-0"
      :style="{
        backgroundImage: `url('https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}')`,
        backgroundPosition: '50% top',
      }"
    >
      <div
        class="container flex items-center justify-start h-full py-12 bg-opacity-50 gradient-left after:z-[-1] after:absolute after:content-[''] after:left-0 after:right[-200px] after:top-0 after:w-[60%] after:h-full"
      >
        <div class="text-start z-100">
          <div class="pl-0 pr-4 mx-auto">
            <div class="max-w-4xl mx-auto text-start">
              <span class="font-semibold text-gray-200 text-2xl uppercase py-2.5">{{
                movieDetails.title
              }}</span>

              <!-- info metadata -->
              <div class="mt-4 text-[#a3a3a3] font-normal">
                <span class="inline-block">{{ movieDetails.release_date?.split('-')[0] }}</span>
                <span class="text-[#a3a3a3] mx-1 my-0"> | </span>
                <span class="inline-block">
                  <span class="absolute left-[-9999px] top-[-9999px]">Maturity Rating:</span>
                  <span class="border border-[#a1a1a1] p-1">{{ rating }}+</span>
                  <span class="text-[#a3a3a3] mx-1 my-0"> | </span>
                  <span class="inline-block">{{ duration }}</span>
                  <span class="text-[#a3a3a3] mx-1 my-0"> | </span>
                  <span>{{ formattedGenres }}</span>
                </span>
              </div>
              <!-- overview -->
              <p class="max-w-xl mx-auto mt-4 mb-8 ml-0 text-lg text-gray-300">
                {{ movieDetails.overview }}
              </p>

              <a :href="'https://www.imdb.com/title/' + imdbLink + '/'" target="_blank"
                ><img alt="Imdb logo" class="logo" src="@/assets/imdb.svg" width="60" height="40"
              /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="pt-20 bg-[#181818] w-full px-[5vw]">
    <div class="container pb-5">
      <div>
        <div class="hook-hr h-0.5 mb-4"></div>
        <div class="max-w-xl mx-auto text-base text-[#a3a3a3] text-center">
          {{ movieDetails.tagline }}
        </div>
        <div class="hook-hr h-0.5 mt-4"></div>
      </div>

      <div class="py-10">
        <h2 class="text-3xl text-white">More Details</h2>
      </div>
    </div>
  </div>
</template>

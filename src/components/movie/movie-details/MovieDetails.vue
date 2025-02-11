<script setup lang="ts">
import MovieService from '@/services/MovieService'
import type { MovieDetailsProps } from '@/types/general'
import type { MovieDetails } from '@/types/movie'
import { computed, ref, watch } from 'vue'
import MovieDetailsItem from './MovieDetailsItem.vue'
import { useRoute, useRouter } from 'vue-router'
import type { AxiosError } from 'axios'
import SimilarMovies from '../SimilarMovies.vue'
import CreditsWrapper from '@/components/credits/CreditsWrapper.vue'
import MovieDetailsHero from './MovieDetailsHero.vue'

const props = defineProps<MovieDetailsProps>()
const route = useRoute()
const router = useRouter()
const movieDetails = ref<MovieDetails | null>(null)
const id = computed(() => props.id)
const isLoading = ref(false)

const getMovieData = async () => {
  isLoading.value = true
  try {
    const response = await MovieService.getMovieData(id.value)
    await new Promise((res) => setTimeout(res, 1000)) // Flicker Delay to display skeleton
    return response.data
  } catch (err) {
    const error = err as AxiosError
    if (error.response?.status === 404) {
      router.push({ name: '404-resource', params: { resource: 'movie' } })
    } else {
      router.push({ name: 'network-error' })
    }
  } finally {
    isLoading.value = false
  }
}

movieDetails.value = await getMovieData()

// Re-Fetch Data When Route Changes (On click at similar movies section)
watch(
  () => route.params.id,
  async (newId) => {
    if (newId) movieDetails.value = await getMovieData()
  },
)

const adultContent = computed(() => (movieDetails.value?.adult ? 'Yes' : 'No'))

const spokenLanguages = computed(
  () => movieDetails.value?.spoken_languages?.map((l) => l.english_name).join(', ') ?? 'N/A',
)

const productionCountries = computed(
  () => movieDetails.value?.production_countries?.map((c) => c.name).join(', ') ?? 'N/A',
)

const originCountry = computed(
  () => movieDetails.value?.origin_country?.map((country) => country).join(', ') ?? 'N/A',
)

const prodCompanies = computed(
  () => movieDetails.value?.production_companies?.map((cmp) => cmp.name).join(', ') ?? 'N/A',
)

const trailerKey = computed((): string => {
  const ytTrailers = movieDetails.value?.videos?.results.filter(
    (el) =>
      el.type?.toLowerCase() === 'trailer' &&
      el.site?.toLowerCase() === 'youtube' &&
      el.key &&
      el.official,
  )
  if (ytTrailers && ytTrailers.length > 0 && ytTrailers[0].key) return ytTrailers[0].key
  return ''
})
</script>

<template>
  <div v-if="movieDetails" class="w-full bg-[#181818] relative text-white">
    <MovieDetailsHero
      :id="movieDetails.id"
      :backdrop_path="movieDetails.backdrop_path"
      :homepage="movieDetails.homepage"
      :title="movieDetails.title"
      :release_date="movieDetails.release_date"
      :vote_average="movieDetails.runtime"
      :runtime="movieDetails.runtime"
      :genres="movieDetails.genres"
      :overview="movieDetails.overview"
      :imdb_id="movieDetails.imdb_id"
      :trailerKey="trailerKey"
    />
  </div>
  <div v-if="movieDetails" class="pt-20 bg-[#181818] w-full px-[5vw] sm:px-[15vw]">
    <div class="container pb-5">
      <div v-if="movieDetails.tagline">
        <div class="bg-linear-hr h-0.5 mb-4"></div>
        <div class="max-w-xl mx-auto text-base text-[#a3a3a3] text-center">
          {{ movieDetails.tagline }}
        </div>
        <div class="bg-linear-hr h-0.5 mt-4"></div>
      </div>

      <div class="py-10">
        <h2 class="text-3xl text-white mb-2.5 mt-5">More Details</h2>
        <div
          class="grid grid-cols-1 gap-4 mx-auto max-2xl lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2"
        >
          <MovieDetailsItem>
            <template #header>Audio</template>
            <template #default>{{ spokenLanguages }}</template>
          </MovieDetailsItem>
          <MovieDetailsItem>
            <template #header>Adult Content</template>
            <template #default>{{ adultContent }}</template>
          </MovieDetailsItem>
          <MovieDetailsItem>
            <template #header>Production Countries</template>
            <template #default>{{ productionCountries }}</template>
          </MovieDetailsItem>
          <MovieDetailsItem>
            <template #header>Origin Country</template>
            <template #default>{{ originCountry }}</template>
          </MovieDetailsItem>
        </div>
        <div class="mt-4">
          <MovieDetailsItem>
            <template #header>Production Companies</template>
            <template #default>
              {{ prodCompanies }}
            </template>
          </MovieDetailsItem>
        </div>
      </div>

      <CreditsWrapper
        :isLoading="isLoading"
        :cast="movieDetails.credits.cast"
        :crew="movieDetails.credits.crew"
      />

      <div v-if="movieDetails.id" class="pb-10">
        <SimilarMovies :id="movieDetails.id" />
      </div>
    </div>
  </div>
</template>

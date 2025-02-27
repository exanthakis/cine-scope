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

const providers = computed(() => movieDetails.value?.['watch/providers']?.results['US']?.flatrate)

// Re-Fetch Data When Route Changes (On click at similar movies section)
watch(
  () => route.params.id,
  async (newId) => {
    if (newId) movieDetails.value = await getMovieData()
  },
)
</script>

<template>
  <div v-if="movieDetails" class="bg-white-primary dark:bg-blue-navy w-full">
    <div class="text-black-primary relative dark:text-white">
      <MovieDetailsHero
        :id="movieDetails.id"
        :backdrop_path="movieDetails.backdrop_path"
        :homepage="movieDetails.homepage"
        :title="movieDetails.title"
        :release_date="movieDetails.release_date"
        :vote_average="movieDetails.vote_average"
        :runtime="movieDetails.runtime"
        :genres="movieDetails.genres"
        :overview="movieDetails.overview"
        :imdb_id="movieDetails.imdb_id"
        :trailerKey="trailerKey"
        :poster_path="movieDetails.poster_path"
      />
    </div>
    <div class="px-[5vw] pt-20 md:px-[8vw] lg:px-[15vw]">
      <div class="container pb-5">
        <div v-if="movieDetails.tagline" class="pb-10">
          <div class="bg-linear-hr mb-4 h-0.5"></div>
          <div
            class="text-black-primary/80 dark:text-gray-medium mx-auto max-w-xl text-center text-base"
          >
            {{ movieDetails.tagline }}
          </div>
          <div class="bg-linear-hr mt-4 h-0.5"></div>
        </div>

        <div class="pb-10">
          <h2 class="text-black-primary mt-5 mb-2.5 text-3xl dark:text-white">More Details</h2>
          <div
            class="max-2xl mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            <MovieDetailsItem>
              <template #header>Audio</template>
              <template #default>{{ spokenLanguages }}</template>
            </MovieDetailsItem>

            <MovieDetailsItem>
              <template #header>Production Companies</template>
              <template #default>
                {{ prodCompanies }}
              </template>
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
          <div class="mt-4" v-if="providers">
            <MovieDetailsItem classes="inline">
              <template #header>Streaming Services</template>
              <template #default v-if="providers">
                <span
                  class="inline-flex items-center gap-1 pt-2"
                  v-for="(prov, index) in providers"
                  :key="prov.provider_id"
                >
                  <img
                    :src="`https://image.tmdb.org/t/p/w45/${prov.logo_path}`"
                    :alt="prov.provider_name"
                    class="h-7 w-7 rounded-full"
                  />
                  {{ prov.provider_name + (index !== providers?.length - 1 ? ', ' : '') }}
                </span>
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
  </div>
</template>

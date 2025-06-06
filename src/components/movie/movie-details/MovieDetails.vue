<script setup lang="ts">
import type { MovieDetailsProps } from '@/types/general'
import type { MovieDetails } from '@/types/movie'
import { computed, ref, watch } from 'vue'
import MovieDetailsItem from './MovieDetailsItem.vue'
import { useRoute } from 'vue-router'
import SimilarMovies from '../SimilarMovies.vue'
import CreditsWrapper from '@/components/CreditsWrapper.vue'
import MovieDetailsHero from './MovieDetailsHero.vue'
import BaseSpinner from '@/components/ui/BaseSpinner.vue'
import { useMovieDetails } from '@/composables/useMovieDetails'

const { id: initialId } = defineProps<MovieDetailsProps>()
const id = ref(initialId)
const route = useRoute()
const movieDetails = ref<MovieDetails | null>(null)

const { getMovieDetails, isLoading } = useMovieDetails(id)

movieDetails.value = await getMovieDetails()

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

const routeId = computed(() => {
  const param = route.params.id
  return Array.isArray(param) ? param[0] : param
})

// Re-Fetch Data When Route Changes (On click at similar movies section)
watch(routeId, async (newId) => {
  if (newId && newId !== id.value) {
    id.value = newId
    movieDetails.value = await getMovieDetails()
  }
})
</script>

<template>
  <div class="dark:bg-blue-navy w-full bg-gray-200">
    <div class="text-black-primary relative dark:text-white" v-if="movieDetails">
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
    <div class="3xl:max-w-[100rem] mx-auto max-w-5xl px-5 pt-20 sm:px-10 md:max-w-4xl lg:max-w-7xl">
      <div class="container pb-5">
        <div v-if="movieDetails && movieDetails.tagline" class="pb-10">
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
          :id="movieDetails?.id"
          :isLoading="isLoading"
          :cast="movieDetails?.credits.cast"
          :crew="movieDetails?.credits.crew"
        />

        <div v-if="isLoading" class="flex items-center justify-center py-10">
          <BaseSpinner />
        </div>
        <div v-else class="pb-10">
          <SimilarMovies :id="+id" />
        </div>
      </div>
    </div>
  </div>
</template>

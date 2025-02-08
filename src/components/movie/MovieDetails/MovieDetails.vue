<script setup lang="ts">
import MovieService from '@/services/MovieService'
import type { MovieDetailsProps } from '@/types/component-types'
import type { MovieDetails } from '@/types/movie-details'
import { computed, ref, watch } from 'vue'
import MovieDetailsItem from './MovieDetailsItem.vue'
import { useRoute, useRouter } from 'vue-router'
import type { AxiosError } from 'axios'
import FavoritesBadge from '@/components/FavoritesBadge.vue'
import SimilarMovies from '../SimilarMovies.vue'

const props = defineProps<MovieDetailsProps>()
const route = useRoute()
const router = useRouter()
const openFavModal = ref(false)
const isExpanded = ref(false)
const movieDetails = ref<MovieDetails | null>(null)
const id = computed(() => props.id)

const getMovieData = async () => {
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

const rating = computed(() => movieDetails.value?.vote_average?.toFixed(1) ?? 'N/A')

const duration = computed(() => {
  const runtime = movieDetails.value?.runtime
  if (!runtime) return 'Unknown'
  const hours = Math.floor(runtime / 60)
  const minutes = runtime % 60
  return `${hours}h ${minutes}m`
})

const imdbLink = computed(() => `https://www.imdb.com/title/${movieDetails.value?.imdb_id}/`)

const formattedGenres = computed(
  () => movieDetails.value?.genres?.map((g) => g.name).join(' - ') ?? 'N/A',
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

const toggleFavModal = () => {
  openFavModal.value = !openFavModal.value
  document.documentElement.style.overflow = openFavModal.value ? 'hidden' : 'auto'
}

const addToFavorite = (id: number) => {
  console.log('add to favorite, id: ', id)
}
const toggleReadMore = () => (isExpanded.value = !isExpanded.value)
</script>

<template>
  <div v-if="movieDetails" class="w-full bg-[#181818] relative text-white">
    <BaseDialog
      :show="!!openFavModal"
      title="Do you want to add the movie to your favorites?"
      @close="toggleFavModal"
    >
      <template #default>
        <p>
          Are you sure you want to add <strong>{{ movieDetails.title }}</strong> to your favorites?
          This will save the movie to your list, allowing you to easily find and watch it later. You
          can access your favorites anytime from the main navigation.
        </p>
        <p class="pt-5">Click 'Confirm' to add it now, or 'Close' if you change your mind.</p>
      </template>
      <template #actions>
        <div class="flex gap-3">
          <BaseButton
            mode="primary"
            class="rounded-xs"
            :isLink="false"
            @click="addToFavorite(movieDetails.id ? movieDetails.id : -1)"
            >Confirm</BaseButton
          >
          <BaseButton mode="secondary" class="rounded-xs" :isLink="false" @click="toggleFavModal"
            >Close</BaseButton
          >
        </div>
      </template>
    </BaseDialog>

    <div
      class="w-full relative bg-center bg-cover min-h-[70vh] px-[5vw] sm:px-[10vw] h-[80vh] bg-gradient-bottom after:z-[-1] after:absolute after:content-[''] after:left-0 after:h-full after:w-full after:top-0"
      :style="{
        backgroundImage: `url('https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}')`,
        backgroundPosition: '50% top',
      }"
    >
      <div
        class="container flex items-center justify-start h-full py-12 bg-opacity-50 bg-gradient-left after:z-[-1] after:absolute after:content-[''] after:left-0 after:right[-200px] after:top-0 after:w-[60%] after:h-full"
      >
        <div class="text-start z-100">
          <div class="pl-0 pr-4 mx-auto">
            <div class="max-w-4xl mx-auto text-start">
              <span class="font-semibold text-gray-200 text-2xl uppercase py-2.5">
                <a v-if="movieDetails.homepage" :href="movieDetails.homepage" target="_blank">
                  {{ movieDetails.title }}
                </a>
                <span v-else>{{ movieDetails.title }}</span>
              </span>

              <!-- info metadata -->
              <div class="mt-4 text-[#a3a3a3] font-normal">
                <span class="inline-block">{{ movieDetails.release_date?.split('-')[0] }}</span>
                <span class="text-[#a3a3a3] mx-1 my-0"> | </span>

                <span class="absolute left-[-9999px] top-[-9999px]">Maturity Rating:</span>
                <span class="border border-[#a1a1a1] p-1">{{ rating }}+</span>
                <span class="text-[#a3a3a3] mx-1 my-0"> | </span>
                <span class="inline-block">{{ duration }}</span>
                <span class="text-[#a3a3a3] mx-1 my-0"> | </span>
                <span>{{ formattedGenres }}</span>
              </div>
              <!-- overview -->

              <div class="max-w-xl mx-auto mt-4 mb-8 ml-0 text-lg text-gray-300">
                <div class="max-h-[20vh] scrollbar-0 overflow-scroll">
                  <Transition name="fade-text" mode="out-in">
                    <p v-if="isExpanded && movieDetails.overview" class="inline">
                      {{ movieDetails.overview }}
                    </p>
                    <p v-else-if="!isExpanded && movieDetails.overview" class="inline">
                      {{ movieDetails?.overview.slice(0, 120) + '...' }}
                    </p>
                  </Transition>
                </div>

                <button
                  v-if="movieDetails && movieDetails.overview && movieDetails.overview.length > 120"
                  @click="toggleReadMore"
                  class="font-semibold hover:underline cursor-pointer"
                >
                  {{ isExpanded ? 'Read Less' : 'Read More' }}
                </button>
              </div>

              <a :href="imdbLink" target="_blank"
                ><img alt="Imdb logo" class="logo" src="@/assets/imdb.svg" width="60" height="40"
              /></a>
            </div>
          </div>
        </div>
      </div>

      <FavoritesBadge class="absolute bottom-15">
        <template #default>
          <div
            class="flex flex-col sm:flex-row justify-between items-center gap-4 z-10 w-full pr-0 sm:pr-4"
          >
            <h5 class="text-film-secondary z-10">⭐ Add to Favorites</h5>
            <BaseButton
              class="!px-11 w-full sm:w-fit"
              :mode="'primary'"
              :isLink="false"
              @click="toggleFavModal"
            >
              Add Now
            </BaseButton>
          </div>
        </template>
      </FavoritesBadge>
    </div>
  </div>
  <div v-if="movieDetails" class="pt-20 bg-[#181818] w-full px-[5vw] sm:px-[10vw]">
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
            <template #default v-if="movieDetails && movieDetails.production_companies">
              <template v-for="prodCmp in movieDetails.production_companies" :key="prodCmp.id">
                <img
                  class="mt-2 rounded-lg h-9"
                  :src="`https://image.tmdb.org/t/p/original${prodCmp.logo_path}`"
                  :alt="prodCmp.name"
                />
              </template>
            </template>
          </MovieDetailsItem>
        </div>
      </div>

      <div v-if="movieDetails.id" class="pb-10">
        <SimilarMovies :id="movieDetails.id" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-text-enter-from,
.fade-text-leave-to {
  opacity: 0;
}

.fade-text-enter-active {
  transition: opacity 0.3s ease-out;
}

.fade-text-enter-to,
.fade-text-leave-from {
  opacity: 1;
}

.fade-text-leave-active {
  transition: opacity 0.3s ease-in;
}
</style>

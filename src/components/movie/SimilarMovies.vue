<script setup lang="ts">
import MovieService from '@/services/MovieService'
import type { AxiosError } from 'axios'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Movie } from '@/types/movie'
import { MOVIES_SLIDER_BREAKPOINTS } from '@/constants/general'
import SwiperSlider from '@/components/ui/SwiperSlider.vue'
import MovieCard from '@/components/movie/MovieCard.vue'

interface SimilarMoviesProps {
  id: number
}
const { id } = defineProps<SimilarMoviesProps>()
const route = useRoute()
const router = useRouter()
const similarMovies = ref<Movie[] | null>(null)
const movieId = computed(() => (id ? id.toString() : ''))
const isLoading = ref(false)

const getSimilarMovies = async () => {
  isLoading.value = true
  try {
    const similarMovies = await MovieService.getSimilarMovies(movieId.value)

    return similarMovies.data.results
  } catch (err) {
    const error = err as AxiosError
    if (error && error.response && error.response.status == 404) {
      router.push({ name: '404-resource', params: { resource: 'movie' } })
    } else {
      router.push({ name: 'network-error' })
    }
  } finally {
    isLoading.value = false
  }
}

similarMovies.value = await getSimilarMovies()

watch(
  () => route.params.id,
  async (newId) => {
    if (newId) similarMovies.value = await getSimilarMovies()
  },
)
</script>
<template>
  <div>
    <h2 class="text-black-primary mt-5 mb-2.5 text-3xl dark:text-white">More Like This</h2>
    <div v-if="isLoading">loading..</div>
    <p v-else-if="!isLoading && similarMovies?.length === 0">Sorry, we couldn't find any results</p>
    <div v-else class="mt-6">
      <SwiperSlider :data="similarMovies || []" :breakpoints="MOVIES_SLIDER_BREAKPOINTS">
        <template #default="{ id, title, poster_path }">
          <template v-if="id && title">
            <MovieCard
              :id="id"
              :title="title"
              :imgUrl="poster_path"
              :hide-fav="true"
              class="!min-h-[10vh]"
            />
          </template>
        </template>
      </SwiperSlider>
    </div>
  </div>
</template>

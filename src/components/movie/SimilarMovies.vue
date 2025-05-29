<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { Movie } from '@/types/movie'
import { MOVIES_SLIDER_BREAKPOINTS } from '@/constants/general'
import SwiperSlider from '@/components/ui/SwiperSlider.vue'
import BaseSpinner from '@/components/ui/BaseSpinner.vue'
import MovieCard from '@/components/movie/MovieCard.vue'
import { useSimilarMovies } from '@/composables/useSimilarMovies'

interface SimilarMoviesProps {
  id?: number
}
const { id } = defineProps<SimilarMoviesProps>()
const route = useRoute()
const similarMovies = ref<Movie[] | null>(null)
const movieId = computed(() => (id ? id.toString() : ''))

const { getSimilarMovies, isLoading } = useSimilarMovies(movieId)

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
    <div v-if="isLoading || !similarMovies"><BaseSpinner /></div>
    <p
      v-else-if="!isLoading && similarMovies?.length === 0"
      class="text-blue-navy text-center dark:text-white"
    >
      Sorry, we couldn't find any results
    </p>
    <div v-else-if="similarMovies && similarMovies.length > 0" class="mt-6">
      <SwiperSlider :data="similarMovies" :breakpoints="MOVIES_SLIDER_BREAKPOINTS">
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
    </div>
  </div>
</template>

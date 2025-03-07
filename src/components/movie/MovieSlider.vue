<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { FreeMode } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/free-mode'
import MovieCard from '@/components/movie/MovieCard.vue'
import type { MovieSliderProps } from '@/types/movie'
import { CREDITS_SLIDER_BREAKPOINTS } from '@/constants/general'

const { breakpoints = CREDITS_SLIDER_BREAKPOINTS } = defineProps<MovieSliderProps>()
</script>

<template>
  <Swiper
    :breakpoints="breakpoints"
    :spaceBetween="10"
    :freeMode="true"
    :navigation="true"
    :modules="[FreeMode]"
    :scrollbar="{ draggable: true }"
    v-if="movies.length > 0"
  >
    <SwiperSlide v-for="movie in movies" :key="movie.id" class="width-fit">
      <MovieCard
        :id="movie.id"
        :title="movie.title"
        :imgUrl="movie.poster_path"
        :hide-fav="true"
        class="!min-h-[10vh]"
      />
    </SwiperSlide>
  </Swiper>
</template>

<style scoped>
.swiper-slide {
  height: auto !important;
}
</style>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { FreeMode } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/free-mode'
import { CREDITS_SLIDER_BREAKPOINTS } from '@/constants/general'
import type { Movie } from '@/types/movie'
import type { CreditsArr, SwiperSliderProps } from '@/types/general'

const { breakpoints = CREDITS_SLIDER_BREAKPOINTS, data } =
  defineProps<SwiperSliderProps<Movie[] | CreditsArr[]>>()

defineSlots<{
  default: (props: { id?: number; title?: string; poster_path?: string }) => void
}>()
</script>

<template>
  <Swiper
    :breakpoints="breakpoints"
    :spaceBetween="10"
    :freeMode="true"
    :navigation="true"
    :modules="[FreeMode]"
    :scrollbar="{ draggable: true }"
    v-if="data.length > 0"
  >
    <SwiperSlide v-for="el in data" :key="el.id" class="width-fit">
      <slot :id="el.id" :title="el.title" :poster_path="el.poster_path"></slot>
    </SwiperSlide>
  </Swiper>
</template>

<style scoped>
.swiper-slide {
  height: auto !important;
}
</style>

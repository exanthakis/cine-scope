<script setup lang="ts">
import type { CreditsListProps } from '@/types/general'
import AvatarText from '../ui/AvatarText.vue'
import { FreeMode } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/free-mode'
import { CREDITS_SLIDER_BREAKPOINTS } from '@/constants/general'

defineProps<CreditsListProps>()
</script>

<template>
  <Swiper
    :breakpoints="CREDITS_SLIDER_BREAKPOINTS"
    :spaceBetween="10"
    :freeMode="true"
    :pagination="false"
    :modules="[FreeMode]"
    :scrollbar="{ draggable: true }"
  >
    <SwiperSlide v-for="credit in credits" :key="credit.id" class="width-fit"
      ><AvatarText :="credit"
    /></SwiperSlide>
  </Swiper>
</template>

<style lang="scss" scoped></style>

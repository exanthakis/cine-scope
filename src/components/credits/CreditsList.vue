<script setup lang="ts">
import AvatarText from '../ui/AvatarText.vue'
import { FreeMode } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/free-mode'
import { CREDITS_SLIDER_BREAKPOINTS } from '@/constants/general'
import AvatarTextSkeleton from '../ui/AvatarTextSkeleton.vue'
import type { AvatarTextProps } from '@/types/general'
import type { Credit } from '@/types/cast'

export interface CreditsListProps {
  /** Info about the actor, cast */
  credits: AvatarTextProps[]
  /** 'Cast' or 'Crew' */
  type: Credit
  /** Loading state */
  isLoading: boolean
}
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
    <SwiperSlide v-for="credit in credits" :key="credit.id" class="width-fit">
      <AvatarText v-if="!isLoading" :="credit" />
      <AvatarTextSkeleton v-else />
    </SwiperSlide>
  </Swiper>
</template>

<script setup lang="ts">
import type { MovieCardProps } from '@/types/general'
import { onMounted, ref } from 'vue'

const { id, title, imgUrl = '', hideFav = false } = defineProps<MovieCardProps>()

const isHeroImgLoaded = ref(false)
const movieImg = ref<HTMLImageElement | null>(null)

onMounted(() => {
  if (movieImg.value) {
    if (movieImg.value.complete) {
      isHeroImgLoaded.value = true
    } else {
      movieImg.value.addEventListener('load', () => {
        isHeroImgLoaded.value = true
      })
    }
  }
})

const onFavoriteClick = () => {
  console.log('clicked')
}
</script>
<template>
  <RouterLink :to="{ name: 'movie-details', params: { id } }">
    <div
      class="group relative mx-auto h-full w-full transform overflow-hidden rounded-sm transition duration-200 hover:scale-105"
    >
      <div
        v-if="imgUrl"
        :class="[
          `h-full w-full bg-cover before:absolute before:h-full before:w-full before:animate-pulse before:bg-[rgba(255,255,255,0.2)] before:content-['']`,
          isHeroImgLoaded ? 'before:content-none' : '',
        ]"
        :style="{
          backgroundImage: `url('https://image.tmdb.org/t/p/w45${imgUrl}')`,
          backgroundPosition: 'top',
          backgroundSize: 'cover',
        }"
      >
        <img
          ref="movieImg"
          :src="`https://image.tmdb.org/t/p/w500${imgUrl}`"
          :alt="title"
          :class="[
            'h-full w-full rounded-lg bg-cover bg-center object-cover object-top opacity-0 shadow-lg transition-opacity duration-200 ease-in-out',
            isHeroImgLoaded ? '!opacity-100' : '',
          ]"
          loading="lazy"
        />
      </div>
      <div class="h-full" v-else>
        <img
          alt="Movie image placeholder"
          class="h-full w-full rounded-lg bg-cover bg-center object-cover object-top shadow-lg"
          src="@/assets/images/no-image-placeholder.png"
        />

        <span class="absolute inset-0 top-2 p-2 text-center font-bold">{{ title }}</span>
      </div>

      <div
        v-if="!hideFav"
        class="bg-film-tertiary/35 absolute top-0 right-0 bottom-0 left-0 flex flex-col justify-end p-1 opacity-0 transition-normal duration-200 group-hover:opacity-100"
      >
        <button
          class="bg-film-tertiary absolute top-2 right-2 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full"
          @click.stop.prevent="onFavoriteClick"
        >
          🤍
        </button>
      </div>
    </div>
  </RouterLink>
</template>

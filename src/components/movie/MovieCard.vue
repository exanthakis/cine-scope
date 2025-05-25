<script setup lang="ts">
import { useFavoritesStore } from '@/stores/favorites'
import type { MovieCardProps, MovieCardStore } from '@/types/general'
import { computed, ref } from 'vue'

const {
  id,
  title,
  imgUrl = '',
  config = { hideFav: false, hideOutline: false, num: null },
} = defineProps<MovieCardProps>()

const isHeroImgLoaded = ref(false)
const favoritesStore = useFavoritesStore()

const isFavorite = computed(() => favoritesStore.isFavorite(id))

const onFavoriteClick = () => {
  const movie: MovieCardStore = {
    id,
    title,
    imgUrl,
  }

  if (isFavorite.value) favoritesStore.removeMovie(movie)
  else favoritesStore.addMovie(movie)
}
</script>
<template>
  <RouterLink :to="{ name: 'movie-details', params: { id }, query: { t: title } }">
    <div
      class="group before:outline-blue-navy relative mx-auto h-full max-h-[25rem] w-full transform rounded-md transition duration-400 before:absolute before:inset-0 before:rounded-sm before:border-3 before:border-solid before:border-transparent before:opacity-0 before:outline-3 before:outline-offset-3 before:transition-opacity before:duration-300 before:content-[''] hover:scale-105 dark:before:outline-white"
      :class="config.hideOutline ? 'hover:before:opacity-0' : 'hover:before:opacity-100'"
    >
      <div
        v-if="imgUrl"
        :class="[
          `h-full w-full rounded-md bg-cover before:absolute before:h-full before:w-full before:animate-pulse before:bg-[rgba(255,255,255,0.2)] before:content-['']`,
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
          @load="isHeroImgLoaded = true"
          loading="lazy"
        />
      </div>
      <div class="h-full rounded-md" v-else>
        <img
          alt="Movie image default placeholder"
          class="h-full w-full rounded-lg bg-cover bg-center object-cover object-top shadow-lg"
          src="@/assets/images/no-image-placeholder.png"
        />

        <span class="absolute inset-0 top-2 p-2 text-center font-bold">{{ title }}</span>
      </div>

      <div
        v-if="!config.hideFav"
        class="bg-black-primary/35 absolute top-0 right-0 bottom-0 left-0 flex flex-col justify-end rounded-md p-1 opacity-0 transition-normal duration-200 group-hover:opacity-100"
      >
        <button
          class="bg-black-primary absolute top-2 right-2 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition"
          @click.stop.prevent="onFavoriteClick"
        >
          {{ isFavorite ? '❤️' : '🤍' }}
        </button>
      </div>

      <span
        v-if="isHeroImgLoaded && config.num"
        class="card-number absolute -bottom-3 z-2 inline-block text-[5rem] leading-none font-bold [text-shadow:0_0_1.5rem_rgba(0,0,0,0.5)] before:absolute before:content-[''] before:[-webkit-text-fill-color:rgb(0,0,0)] before:[-webkit-text-stroke:0.25rem_rgb(255,255,255)] sm:bottom-0 sm:-left-5 sm:text-[6rem] sm:before:[-webkit-text-stroke:0]"
      >
        {{ config.num }}
      </span>
    </div>
  </RouterLink>
</template>

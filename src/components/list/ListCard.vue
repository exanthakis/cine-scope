<script setup lang="ts">
import { useMouse } from '@/composables/useMouse'
import { useFavoritesStore } from '@/stores/favorites'
import { useMoviesViewStore } from '@/stores/movies-view'
import { MOVIES_VIEW } from '@/types/enums'
import type { MovieCardProps, MovieCardStore } from '@/types/general'
import { computed, ref, watch } from 'vue'

const {
  id,
  title,
  description,
  imgUrl = '',
  config = { hideFav: false, hideOutline: false, num: null },
} = defineProps<MovieCardProps>()

const textWrapper = ref<HTMLDivElement | null>(null)
const moviesViewStore = useMoviesViewStore()

const { isHovered } = useMouse(textWrapper, 0, 1)
const isHeroImgLoaded = ref(false)
const favoritesStore = useFavoritesStore()

const isFavorite = computed(() => favoritesStore.isFavorite(id))

const onFavoriteClick = () => {
  const movie: MovieCardStore = {
    id,
    title,
    description,
    imgUrl,
  }

  if (isFavorite.value) favoritesStore.removeMovie(movie)
  else favoritesStore.addMovie(movie)
}

const numberClasses = computed(() => {
  const baseClasses =
    "card-number absolute z-2 inline-block text-[5rem] leading-none font-bold [text-shadow:0_0_1.5rem_rgba(0,0,0,0.5)] before:absolute before:content-[''] before:[-webkit-text-fill-color:rgb(0,0,0)] before:[-webkit-text-stroke:0.25rem_rgb(255,255,255)] sm:text-[6rem] sm:before:[-webkit-text-stroke:0]"

  return [
    baseClasses,
    moviesViewStore.view === MOVIES_VIEW.CARDS_VIEW
      ? 'sm:bottom-0 sm:-left-5 -bottom-3'
      : // : 'xs:-bottom-3 xs:top-auto xs:-right-5 xs:left-auto -left-3 -top-6 right-auto',
        '-bottom-6 -right-4 left-auto xs:-bottom-3 ',
  ]
    .filter(Boolean)
    .join(' ')
})
</script>
<template>
  <RouterLink
    :to="{ name: 'movie-details', params: { id }, query: { t: title } }"
    class="group before:outline-blue-navy dark:bg-black-primary/50 bg-black-primary/10 xs:flex-row relative flex transform cursor-pointer flex-col justify-start gap-4 rounded-md transition duration-400 before:absolute before:inset-0 before:rounded-sm before:border-3 before:border-solid before:border-transparent before:opacity-0 before:outline-3 before:outline-offset-3 before:transition-opacity before:duration-300 before:content-[''] hover:scale-105 dark:before:outline-white"
  >
    <div
      class="h-full rounded-md sm:max-w-[12rem] md:w-[20%]"
      :class="config.hideOutline ? 'hover:before:opacity-0' : 'hover:before:opacity-100'"
    >
      <div
        v-if="imgUrl"
        :class="[
          `h-full w-full rounded-md bg-cover before:absolute before:h-full before:w-full before:animate-pulse`,
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
      </div>

      <div
        v-if="!config.hideFav"
        class="absolute top-0 right-0 bottom-0 left-0 flex flex-col justify-end rounded-md p-3 opacity-0 transition-normal duration-200 group-hover:opacity-100"
      >
        <div
          class="bg-black-primary/30 absolute top-2 right-2 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition"
          @click.stop.prevent="onFavoriteClick"
        >
          {{ isFavorite ? '❤️' : '🤍' }}
        </div>
      </div>

      <span v-if="isHeroImgLoaded && config.num" :class="numberClasses">
        {{ config.num }}
      </span>
    </div>
    <div
      ref="textWrapper"
      :class="`z-1 w-full pt-4 pb-8 pl-4 md:w-[80%] md:py-7 ${config.num ? 'pr-8' : 'pr-4'}`"
    >
      <h3 class="text-black-primary dark:text-white-primary text-xl font-semibold md:text-2xl">
        {{ title }}
      </h3>

      <div class="text-black-primary dark:text-white-primary h-[90%] pt-5 text-lg">
        <div
          class="scrollbar-0 overflow-scroll text-base duration-700 sm:max-h-[12vh] lg:max-h-[70%]"
        >
          <Transition name="fade-text" mode="out-in">
            <p v-if="isHovered && description" class="inline">
              {{ description }}
            </p>
            <p v-else-if="!isHovered && description" class="inline">
              {{ description.slice(0, 150) + '...' }}
            </p>
          </Transition>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.fade-text-enter-from,
.fade-text-leave-to {
  opacity: 0;
}

.fade-text-enter-active {
  transition: opacity 0.1s ease-out;
}

.fade-text-enter-to,
.fade-text-leave-from {
  opacity: 1;
}

.fade-text-leave-active {
  transition: opacity 0.1s ease-in;
}
</style>

<script setup lang="ts">
import type { MovieCardProps } from '@/types/general'

const { id, title, imgUrl = '', hideFav = false } = defineProps<MovieCardProps>()

const onFavoriteClick = () => {
  console.log('clicked')
}
</script>
<template>
  <RouterLink :to="{ name: 'movie-details', params: { id } }">
    <div
      class="relative min-h-[40vh] h-full w-full mx-auto overflow-hidden transition duration-200 transform rounded-sm group hover:scale-105"
    >
      <img
        class="h-full rounded-lg shadow-lg w-full"
        :src="`https://image.tmdb.org/t/p/w500${imgUrl}`"
        :alt="title"
      />
      <div
        v-if="!hideFav"
        class="absolute top-0 bottom-0 left-0 right-0 flex flex-col justify-end p-1 duration-200 opacity-0 group-hover:opacity-100 bg-film-tertiary/35 transition-normal"
      >
        <button
          class="absolute z-10 flex items-center justify-center w-8 h-8 rounded-full cursor-pointer bg-film-tertiary top-2 right-2"
          @click.stop.prevent="onFavoriteClick"
        >
          🤍
        </button>
      </div>
    </div>
  </RouterLink>
</template>

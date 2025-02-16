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
      class="group relative mx-auto h-full w-full transform overflow-hidden rounded-sm transition duration-200 hover:scale-105"
    >
      <img
        v-if="imgUrl"
        class="h-full w-full rounded-lg shadow-lg"
        :src="`https://image.tmdb.org/t/p/w500${imgUrl}`"
        :alt="title"
      />
      <div class="h-full" v-else>
        <img
          alt="placeholder"
          class="h-full w-full rounded-lg shadow-lg"
          src="@/assets/images/no-image-placeholder.png"
        />

        <span class="absolute inset-0 top-2 text-center font-bold">{{ title }}</span>
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

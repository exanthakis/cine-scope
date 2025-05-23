<script setup lang="ts">
import { useMoviesViewStore } from '@/stores/movies-view'
import { MOVIES_VIEW } from '@/types/enums'

import IconCardView from '@/components/icons/IconCardView.vue'
import IconListView from '@/components/icons/IconListView.vue'
const moviesViewStore = useMoviesViewStore()
</script>

<template>
  <div class="relative flex gap-3">
    <IconCardView
      @click="moviesViewStore.setView(MOVIES_VIEW.CARDS_VIEW)"
      :class="`size-6 cursor-pointer transition duration-300 hover:scale-115 ${moviesViewStore.view === MOVIES_VIEW.CARDS_VIEW ? 'scale-110 dark:text-amber-50' : 'text-gray-500'}`"
    />
    <IconListView
      @click="moviesViewStore.setView(MOVIES_VIEW.LIST_VIEW)"
      :class="`size-6 cursor-pointer transition duration-300 hover:scale-115 ${moviesViewStore.view === MOVIES_VIEW.LIST_VIEW ? 'scale-110 dark:text-amber-50' : 'text-gray-500'}`"
    />
  </div>
</template>

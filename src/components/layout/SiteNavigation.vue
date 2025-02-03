<script setup lang="ts">
import { RouterLink } from 'vue-router'
import TheLogo from '../ui/TheLogo.vue'
</script>

<template>
  <header class="sticky top-0 left-0 flex justify-center w-full mx-auto shadow-lg bg-film-tertiary">
    <nav
      class="container flex flex-col items-center justify-between w-full gap-4 py-6 text-white sm:flex-row"
    >
      <TheLogo />
      <ul class="flex items-center gap-3">
        <li><RouterLink :to="{ name: 'movie-list' }">Movies</RouterLink></li>
        <li><RouterLink :to="{ name: 'favorites' }">Favorites</RouterLink></li>
      </ul>
    </nav>
  </header>
</template>

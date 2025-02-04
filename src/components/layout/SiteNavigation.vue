<script setup lang="ts">
import { RouterLink } from 'vue-router'
import TheLogo from '../ui/TheLogo.vue'
</script>

<template>
  <header class="flex justify-center w-full px-0 mx-auto shadow-lg sm:px-5 bg-film-tertiary">
    <nav
      class="container flex flex-col items-center justify-between w-full gap-4 py-6 text-white sm:flex-row"
    >
      <TheLogo />
      <ul class="flex items-center gap-3">
        <li>
          <RouterLink :to="{ name: 'movie-list' }">Search Movies</RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'popular-list' }">Popular Movies</RouterLink>
        </li>
        <li><RouterLink :to="{ name: 'favorites' }">Favorites</RouterLink></li>
      </ul>
    </nav>
  </header>
</template>

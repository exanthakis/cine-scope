<script setup lang="ts">
import { RouterLink } from 'vue-router'
import TheLogo from '../ui/TheLogo.vue'
</script>

<template>
  <header class="flex justify-center w-full !px-[5vw] shadow-lg bg-film-tertiary">
    <nav
      class="container flex flex-col items-center justify-between w-full gap-4 py-4 font-light text-gray-400 sm:flex-row"
    >
      <TheLogo />
      <ul class="flex items-center gap-3">
        <li class="hover:text-film-primary">
          <RouterLink :to="{ name: 'movie-list' }">Search</RouterLink>
        </li>
        <li class="hover:text-film-primary">
          <RouterLink :to="{ name: 'popular-list' }">Popular</RouterLink>
        </li>
        <li class="hover:text-film-primary">
          <RouterLink :to="{ name: 'favorites' }">Favorites</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import TheLogo from '../ui/TheLogo.vue'
</script>

<template>
  <header class="sticky top-0 left-0 flex bg-film-tertiary shadow-lg w-full mx-auto justify-center">
    <nav
      class="container flex flex-col sm:flex-row items-center justify-between gap-4 text-white py-6 w-full"
    >
      <div>
        <TheLogo />
      </div>
      <ul class="flex items-center gap-3">
        <li><RouterLink :to="{ name: 'movie-list' }">Movies</RouterLink></li>
        <li><RouterLink :to="{ name: 'favorites' }">Favorites</RouterLink></li>
      </ul>
    </nav>
  </header>
</template>

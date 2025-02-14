<script setup lang="ts">
import { RouterLink } from 'vue-router'
import TheLogo from '../ui/TheLogo.vue'
</script>

<template>
  <header class="w-full bg-[#10141e] px-[5vw] shadow-lg backdrop-blur md:px-[8vw] lg:px-[15vw]">
    <nav
      class="flex w-full flex-col items-center justify-between gap-4 py-4 font-light text-gray-400 sm:flex-row"
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
      <div>dark/light</div>
    </nav>
  </header>
</template>

<style scoped>
nav .active {
  font-weight: bolder;
  color: #fff;
}
</style>

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
      <ul class="nav-wrap flex items-center gap-3">
        <li class="nav transition">
          <RouterLink :to="{ name: 'movie-list' }">Search</RouterLink>
        </li>
        <li class="nav transition">
          <RouterLink :to="{ name: 'popular-list' }">Popular</RouterLink>
        </li>
        <li class="nav transition">
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

.nav-wrap:hover .nav {
  filter: blur(1px);
  opacity: 0.5;
  box-shadow: none;
}
.nav-wrap:hover .nav:hover {
  transform: scale(1.1);
  filter: blur(0px);
  opacity: 1;
  box-shadow: 0 8px 20px 0px rgba(0, 0, 0, 0.125);
}
</style>

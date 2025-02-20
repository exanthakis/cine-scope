<script setup lang="ts">
import { RouterLink } from 'vue-router'
import TheLogo from '../ui/TheLogo.vue'
import { ref } from 'vue'
import MobileNav from './MobileNav.vue'

const open = ref(false)
</script>

<template>
  <header
    class="z-10 w-full bg-[#10141e] px-[5vw] shadow-lg backdrop-blur md:px-[8vw] lg:px-[15vw]"
  >
    <nav
      class="flex w-full flex-col items-start justify-between gap-4 py-4 font-light text-gray-400 sm:flex-row sm:items-center"
    >
      <TheLogo />
      <ul class="nav-wrap hidden items-center gap-3 md:flex">
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
      <div class="hidden md:flex">dark/light</div>
    </nav>

    <button
      type="button"
      className="fixed right-[5vw] top-0 py-5 text-3xl text-white md:hidden ml-auto"
      :aria-expanded="open"
      @click="open = true"
    >
      <svg
        class="text-film-secondary size-7 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 12H21M3 6H21M3 18H15"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <span className="sr-only">Open menu</span>
    </button>
    <MobileNav :open="open" @close="open = false" />
  </header>
</template>

<style scoped>
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

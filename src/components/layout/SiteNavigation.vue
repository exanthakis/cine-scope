<script setup lang="ts">
import { RouterLink } from 'vue-router'
import TheLogo from '../ui/TheLogo.vue'
import { defineAsyncComponent, ref, watch } from 'vue'
import { useWindowResize } from '@/hooks/useWindowResize'
import { useFavoritesStore } from '@/stores/favorites'
import ThemeSwitch from '../ThemeSwitch.vue'
import IconMenu from '../icons/IconMenu.vue'

// Mobile navigation
const { width } = useWindowResize()
const MobileNav = defineAsyncComponent(() => import('./MobileNav.vue'))
const open = ref(false)

const toggleMenu = () => {
  open.value = !open.value
  document.documentElement.style.overflow = open.value ? 'hidden' : 'auto'
}

// Favorites animation
const favoritesStore = useFavoritesStore()
const queryTimeout = ref<ReturnType<typeof setTimeout> | null>(null)
const scaleEffect = ref(false)

watch(
  () => favoritesStore.totalFavorites,
  () => {
    scaleEffect.value = true

    if (queryTimeout.value) clearTimeout(queryTimeout.value)

    queryTimeout.value = setTimeout(() => {
      scaleEffect.value = false
    }, 300)
  },
)
</script>

<template>
  <header
    class="bg-blue-navy z-10 w-full px-[5vw] shadow-lg backdrop-blur md:px-[8vw] lg:px-[15vw]"
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
        <li class="nav relative transition">
          <RouterLink :to="{ name: 'favorites' }"
            >Favorites
            <div
              v-if="favoritesStore.totalFavorites > 0"
              class="bg-film-primary border-blue-navy absolute -end-6 -top-2 inline-flex h-6 w-6 scale-100 items-center justify-center rounded-full border-2 text-xs font-bold text-white"
              :class="scaleEffect ? 'scale-140 transition duration-200 ease-in' : ''"
            >
              {{ favoritesStore.totalFavorites }}
            </div>
          </RouterLink>
        </li>
      </ul>
      <div class="hidden md:flex"><ThemeSwitch /></div>
    </nav>

    <button
      type="button"
      className="fixed right-[5vw] top-0 py-5 text-3xl text-white md:hidden ml-auto"
      :aria-expanded="open"
      @click="toggleMenu"
    >
      <IconMenu class="text-film-secondary size-7 shrink-0" />
      <span className="sr-only">Open menu</span>
    </button>
    <div
      v-if="open"
      @click="toggleMenu"
      class="bg-film-tertiary/75 fixed top-0 left-0 z-1 h-screen w-full"
    ></div>
    <MobileNav v-if="width < 768" :open="open" @close="toggleMenu" />
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

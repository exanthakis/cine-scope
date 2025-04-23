<script setup lang="ts">
import { useFavoritesStore } from '@/stores/favorites'
import ThemeSwitch from '../ThemeSwitch.vue'
import IconClose from '../icons/IconClose.vue'
import type { MobileNavProps } from '@/types/general'

defineProps<MobileNavProps>()
defineEmits<{
  (event: 'close'): void
}>()

const favoritesStore = useFavoritesStore()
</script>

<template>
  <div
    :class="[
      'bg-blue-navy absolute top-0 right-0 bottom-0 left-0 z-1 flex h-fit flex-col items-end justify-between px-5 pt-14 pb-6 transition-transform duration-300 ease-in-out motion-reduce:transition-none md:hidden',
      open ? 'translate-y-0' : '-translate-y-[100%]',
    ]"
  >
    <button
      type="button"
      className="fixed right-[5vw] top-4 mb-4 block py-1 text-3xl text-white "
      :aria-expanded="open"
      @click="$emit('close')"
    >
      <IconClose class="text-white-primary size-7 shrink-0" />
      <span className="sr-only">Close menu</span>
    </button>

    <nav
      class="flex w-full flex-col items-start justify-start gap-4 pt-6 pb-2 font-light text-gray-400 sm:flex-row md:hidden"
    >
      <ul class="flex flex-col items-start gap-7">
        <li
          :class="[
            'text-2xl opacity-0 transition-[opacity] duration-1000 ease-in-out',
            open ? 'opacity-100' : 'opacity-0',
          ]"
          :style="{ transitionDelay: open ? '100ms' : '0ms' }"
          @click="$emit('close')"
        >
          <RouterLink :to="{ name: 'movie-list' }">Search</RouterLink>
        </li>
        <li
          :class="[
            'text-2xl opacity-0 transition-[opacity] duration-1000 ease-in-out',
            open ? 'opacity-100' : 'opacity-0',
          ]"
          :style="{ transitionDelay: open ? '200ms' : '0ms' }"
          @click="$emit('close')"
        >
          <RouterLink :to="{ name: 'popular-list' }">Popular</RouterLink>
        </li>
        <li
          :class="[
            'relative text-2xl opacity-0 transition-[opacity] duration-1000 ease-in-out',
            open ? 'opacity-100' : 'opacity-0',
          ]"
          :style="{ transitionDelay: open ? '300ms' : '0ms' }"
          @click="$emit('close')"
        >
          <RouterLink :to="{ name: 'favorites' }"
            >Favorites
            <div
              v-if="favoritesStore.totalFavorites > 0"
              class="bg-red-netflix border-blue-navy absolute -end-6 -top-2 inline-flex h-6 w-6 scale-100 items-center justify-center rounded-full border-2 text-xs font-bold text-white"
            >
              {{ favoritesStore.totalFavorites }}
            </div></RouterLink
          >
        </li>
        <li
          :class="[
            'relative pt-2 text-2xl opacity-0 transition-[opacity] duration-1000 ease-in-out',
            open ? 'opacity-100' : 'opacity-0',
          ]"
          :style="{ transitionDelay: open ? '500ms' : '0ms' }"
          @click="$emit('close')"
        >
          <ThemeSwitch />
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import FavoritesBadge from '@/components/FavoritesBadge.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import type { MovieDetailsHeroProps } from '@/types/general'
import { computed, ref } from 'vue'

const { vote_average, runtime, genres, imdb_id, trailerKey } = defineProps<MovieDetailsHeroProps>()

const isExpanded = ref(false)
const openFavModal = ref(false)
const rating = computed(() => vote_average?.toFixed(1) ?? 'N/A')

const duration = computed(() => {
  const runtimeval = runtime
  if (!runtimeval) return 'Unknown'
  const hours = Math.floor(runtimeval / 60)
  const minutes = runtimeval % 60
  return `${hours}h ${minutes}m`
})

const imdbLink = computed(() => `https://www.imdb.com/title/${imdb_id}/`)

const formattedGenres = computed(() => genres?.map((g) => g.name).join(' - ') ?? 'N/A')

const toggleReadMore = () => (isExpanded.value = !isExpanded.value)

const toggleFavModal = () => {
  openFavModal.value = !openFavModal.value
  document.documentElement.style.overflow = openFavModal.value ? 'hidden' : 'auto'
}

const addToFavorite = (id: number) => {
  console.log('add to favorite, id: ', id)
}

const xEl = ref(0)
const yEl = ref(0)
const isHovered = ref(false)
const hideCursor = ref(true)

const cursorCircle = computed(
  () =>
    `transform: translateX(${xEl.value}px) translateY(${yEl.value}px) translateZ(0) translate3d(0, 0, 0);`,
)

const moveCursor = (e: { clientX: number; clientY: number }) => {
  xEl.value = e.clientX - 15
  yEl.value = e.clientY - 15
}

const handleVideoPlay = () => {
  if (!isHovered.value && trailerKey) {
    window.open(`https://www.youtube.com/watch?v=${trailerKey}`)
  }
}
</script>

<template>
  <div
    @click="handleVideoPlay"
    @mousemove="moveCursor"
    @mouseenter="() => (hideCursor = false)"
    @mouseleave="() => (hideCursor = true)"
    class="w-full cursor-none relative bg-center bg-cover min-h-[70vh] px-[5vw] sm:px-[15vw] h-[80vh] before:bg-[rgba(0,0,0,0.6)] before:absolute sm:before:content-none before:content-[''] before:z-0 before:h-full before:w-full before:left-0 before:top-0 bg-gradient-bottom after:z-[-1] after:absolute after:content-[''] after:left-0 after:h-full after:w-full after:top-0"
    :style="{
      backgroundImage: `url('https://image.tmdb.org/t/p/original${backdrop_path}')`,
      backgroundPosition: '50% top',
    }"
  >
    <!-- Custom video cursor that appears on hero cmp hover -->
    <div :class="{ 'hidden opacity-0': hideCursor }">
      <div
        :style="cursorCircle"
        :class="[
          'pointer-events-none select-none top-0 left-0 fixed w-15 h-15 rounded-full bg-film-secondary z-10 backface-hidden transition-opacity duration-500 ease-out',
          isHovered ? 'opacity-0 ' : '',
        ]"
      ></div>
    </div>
    <BaseDialog
      :show="!!openFavModal"
      title="Do you want to add the movie to your favorites?"
      @close="toggleFavModal"
    >
      <template #default>
        <p>
          Are you sure you want to add <strong>{{ title }}</strong> to your favorites? This will
          save the movie to your list, allowing you to easily find and watch it later. You can
          access your favorites anytime from the main navigation.
        </p>
        <p class="pt-5">Click 'Confirm' to add it now, or 'Close' if you change your mind.</p>
      </template>
      <template #actions>
        <div class="flex gap-3">
          <BaseButton
            mode="primary"
            class="rounded-xs"
            :isLink="false"
            @click="addToFavorite(id ? id : -1)"
            >Confirm</BaseButton
          >
          <BaseButton mode="secondary" class="rounded-xs" :isLink="false" @click="toggleFavModal"
            >Close</BaseButton
          >
        </div>
      </template>
    </BaseDialog>
    <div
      class="container cursor-auto flex items-center justify-start h-full py-12 bg-opacity-50 after:content-none sm:after:content-[''] bg-gradient-left after:z-[-1] after:absolute after:left-0 after:right[-200px] after:top-0 after:w-[60%] after:h-full"
    >
      <div
        class="text-start z-100"
        @mouseenter="() => (isHovered = true)"
        @mouseleave="() => (isHovered = false)"
      >
        <div class="pl-0 pr-4 mx-auto">
          <div class="max-w-4xl mx-auto text-start">
            <span class="font-semibold text-gray-200 text-2xl uppercase py-2.5">
              <a v-if="homepage" :href="homepage" target="_blank">
                {{ title }}
              </a>
              <span v-else>{{ title }}</span>
            </span>

            <!-- info metadata -->
            <div class="mt-4 text-[#a3a3a3] font-normal">
              <span class="inline-block">{{ release_date?.split('-')[0] }}</span>
              <span class="text-[#a3a3a3] mx-1 my-0"> | </span>

              <span class="absolute left-[-9999px] top-[-9999px]">Maturity Rating:</span>
              <span class="border border-[#a1a1a1] p-1">{{ rating }}+</span>
              <span class="text-[#a3a3a3] mx-1 my-0"> | </span>
              <span class="inline-block">{{ duration }}</span>
              <span class="text-[#a3a3a3] mx-1 my-0"> | </span>
              <span>{{ formattedGenres }}</span>
            </div>
            <!-- overview -->

            <div class="max-w-xl mx-auto mt-4 mb-8 ml-0 text-lg text-gray-300">
              <div class="max-h-[20vh] scrollbar-0 overflow-scroll">
                <Transition name="fade-text" mode="out-in">
                  <p v-if="isExpanded && overview" class="inline">
                    {{ overview }}
                  </p>
                  <p v-else-if="!isExpanded && overview" class="inline">
                    {{ overview.slice(0, 120) + '...' }}
                  </p>
                </Transition>
              </div>

              <button
                v-if="overview && overview.length > 120"
                @click="toggleReadMore"
                class="font-semibold hover:underline cursor-pointer"
              >
                {{ isExpanded ? 'Read Less' : 'Read More' }}
              </button>
            </div>

            <a :href="imdbLink" target="_blank"
              ><img alt="Imdb logo" src="@/assets/icons/imdb.svg" width="60" height="40"
            /></a>
          </div>
        </div>
      </div>
    </div>

    <FavoritesBadge
      class="absolute bottom-15 cursor-auto"
      @mouseenter="() => (isHovered = true)"
      @mouseleave="() => (isHovered = false)"
    >
      <template #default>
        <div
          class="flex flex-col sm:flex-row justify-between items-center gap-4 z-10 w-full pr-0 sm:pr-4"
        >
          <h5 class="text-film-secondary z-10">⭐ Add to Favorites</h5>
          <BaseButton
            class="!px-11 w-full sm:w-fit"
            :mode="'primary'"
            :isLink="false"
            @click="toggleFavModal"
          >
            Add Now
          </BaseButton>
        </div>
      </template>
    </FavoritesBadge>
  </div>
</template>

<style scoped>
.fade-text-enter-from,
.fade-text-leave-to {
  opacity: 0;
}

.fade-text-enter-active {
  transition: opacity 0.3s ease-out;
}

.fade-text-enter-to,
.fade-text-leave-from {
  opacity: 1;
}

.fade-text-leave-active {
  transition: opacity 0.3s ease-in;
}
</style>

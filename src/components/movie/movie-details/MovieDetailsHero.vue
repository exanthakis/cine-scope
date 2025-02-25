<script setup lang="ts">
import FavoritesBadge from '@/components/FavoritesBadge.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useMouse } from '@/hooks/useMouse'
import { useFavoritesStore } from '@/stores/favorites'
import type { MovieCardStore, MovieDetailsHeroProps } from '@/types/general'
import { computed, onMounted, ref, watch } from 'vue'

const props = defineProps<MovieDetailsHeroProps>()

// Hero img lazy load
const isHeroImgLoaded = ref(false)
const heroImg = ref<HTMLImageElement | null>(null)

onMounted(() => {
  if (heroImg.value) {
    if (heroImg.value.complete) {
      isHeroImgLoaded.value = true
    } else {
      heroImg.value.addEventListener('load', () => {
        isHeroImgLoaded.value = true
      })
    }
  }
})

// Hero movie texts
const isExpanded = ref(false)
const rating = computed(() => (props.vote_average ? Math.round(props.vote_average * 10) : 'N/A'))
const duration = computed(() => {
  const runtimeval = props.runtime
  if (!runtimeval) return 'Unknown'
  const hours = Math.floor(runtimeval / 60)
  const minutes = runtimeval % 60
  return `${hours}h ${minutes}m`
})

const imdbLink = computed(() => `https://www.imdb.com/title/${props.imdb_id}/`)

const formattedGenres = computed(() => props.genres?.map((g) => g.name).join(' - ') ?? 'N/A')

const toggleReadMore = () => (isExpanded.value = !isExpanded.value)

// Cursor logic
const heroWrapper = ref<HTMLDivElement | null>(null)
const { x, y } = useMouse(heroWrapper, 15)
const isHovered = ref(false)
const hideCursor = ref(true)

const cursorCircle = computed(
  () =>
    `transform: translateX(${x.value}px) translateY(${y.value}px) translateZ(0) translate3d(0, 0, 0);`,
)

const handleVideoPlay = (device: string) => {
  if ((!isHovered.value && props.trailerKey) || (device === 'sm' && props.trailerKey)) {
    window.open(`https://www.youtube.com/watch?v=${props.trailerKey}`)
  }
}

// Favorites logic
const openFavModal = ref(false)
const favoritesStore = useFavoritesStore()
const isMovieFavorite = computed(() => (props.id ? favoritesStore.isFavorite(props.id) : false))

const toggleFavModal = () => {
  openFavModal.value = !openFavModal.value
  document.documentElement.style.overflow = openFavModal.value ? 'hidden' : 'auto'
}

const addToFavorite = (id: number) => {
  const movie: MovieCardStore = {
    id,
    title: props.title ?? '',
    imgUrl: props.poster_path ?? '',
  }

  if (isMovieFavorite.value) favoritesStore.removeMovie(movie)
  else favoritesStore.addMovie(movie)

  toggleFavModal()
}

const favoriteDialogText = computed(() => {
  const action = isMovieFavorite.value ? 'Remove' : 'Add'
  const toFrom = action === 'Add' ? 'to' : 'from'

  return {
    btnLabel: `${action} Now`,
    title: `${action} ${toFrom} Favorites`,
    heading: `Do you want to ${action.toLowerCase()} the movie ${toFrom} your favorites?`,
    body: `Are you sure you want to ${action.toLowerCase()} ${props.title} ${toFrom} your favorites? This will ${
      action === 'Add'
        ? 'save the movie to your list, allowing you to easily find and watch it later'
        : 'remove it from your list'
    }. You can access your favorites anytime from the main navigation.`,
    confirm: `Click "Confirm" to ${action.toLowerCase()} it now, or "Close" if you change your mind.`,
  }
})

watch(
  () => props.id,
  () => {
    isHeroImgLoaded.value = false
    heroImg.value = null
    heroWrapper.value = null
  },
)
</script>

<template>
  <div
    ref="heroWrapper"
    @click="() => handleVideoPlay('')"
    @mouseenter="() => (hideCursor = false)"
    @mouseleave="() => (hideCursor = true)"
    class="bg-gradient-bottom pointer-events-none relative h-[80vh] min-h-[70vh] w-full cursor-none before:absolute before:top-0 before:left-0 before:z-2 before:h-full before:w-full before:bg-[rgba(0,0,0,0.6)] before:content-[''] after:absolute after:top-0 after:left-0 after:z-[-1] after:h-full after:w-full after:content-[''] sm:before:content-none md:pointer-events-auto"
  >
    <!-- Hero image lazy loading with blur animation-->
    <div
      :class="[
        `absolute inset-0 h-[80vh] min-h-[70vh] w-full bg-cover before:absolute before:h-full before:w-full before:animate-pulse before:bg-[rgba(255,255,255,0.2)] before:content-['']`,
        isHeroImgLoaded ? 'before:content-none' : '',
      ]"
      :style="{
        backgroundImage: `url('https://image.tmdb.org/t/p/w45${backdrop_path}')`,
        backgroundPosition: 'top',
        backgroundSize: 'cover',
      }"
    >
      <img
        ref="heroImg"
        :src="`https://image.tmdb.org/t/p/original${backdrop_path}`"
        alt="Movie details background image"
        :class="[
          'pointer-events-none h-full w-full cursor-none bg-cover bg-center object-cover object-top opacity-0 transition-opacity duration-200 ease-in-out',
          isHeroImgLoaded ? '!opacity-100' : '',
        ]"
        loading="lazy"
      />
    </div>

    <div class="h-full px-[5vw] md:px-[8vw] lg:px-[15vw]">
      <!-- Custom video cursor that appears on hero cmp hover -->
      <div class="hidden lg:block">
        <div :class="{ 'hidden h-0 w-0 opacity-0': hideCursor }">
          <div
            :style="cursorCircle"
            :class="[
              'bg-film-secondary pointer-events-none fixed top-0 left-0 z-10 flex h-20 w-20 items-center justify-center rounded-full transition-opacity duration-500 ease-out backface-hidden select-none',
              isHovered ? 'h-0 w-0 opacity-0' : '',
            ]"
          >
            <img
              src="@/assets/icons/play.svg"
              alt="Play video icon"
              class="h-2.5 w-2.5 rotate-90"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <BaseDialog
        :show="!!openFavModal"
        :title="favoriteDialogText.heading"
        @close="toggleFavModal"
      >
        <template #default>
          <p>
            {{ favoriteDialogText.body }}
          </p>
          <p class="pt-5"></p>
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
        class="bg-opacity-50 bg-gradient-left after:right[-200px] container flex h-full items-center justify-start py-12 after:absolute after:top-0 after:left-0 after:z-[-1] after:h-full after:w-[60%] after:content-none sm:after:content-['']"
      >
        <div
          class="z-3 cursor-auto text-start"
          @mouseenter="() => (isHovered = true)"
          @mouseleave="() => (isHovered = false)"
        >
          <div class="w-[70%] pr-4 pl-0 dark:mx-auto dark:w-full">
            <div class="mx-auto max-w-4xl text-start">
              <span
                class="sm:text-film-tertiary/80 pointer-events-auto py-2.5 text-2xl font-semibold text-gray-200 uppercase dark:text-gray-200"
              >
                <a v-if="homepage" :href="homepage" target="_blank">
                  {{ title }}
                </a>
                <span v-else>{{ title }}</span>
              </span>

              <!-- info metadata -->
              <div
                class="sm:text-film-tertiary/80 mt-4 font-normal text-[#a3a3a3] dark:text-[#a3a3a3]"
              >
                <span class="inline-block">{{ release_date?.split('-')[0] }}</span>
                <span class="mx-1 my-0"> | </span>

                <span class="absolute top-[-9999px] left-[-9999px]">Maturity Rating:</span>
                <span class="border border-[#a1a1a1] p-1">{{ rating }}%</span>
                <span class="mx-1 my-0"> | </span>
                <span class="inline-block">{{ duration }}</span>
                <span class="mx-1 my-0"> | </span>
                <span>{{ formattedGenres }}</span>
              </div>
              <!-- overview -->

              <div
                class="sm:text-film-tertiary/70 mx-auto mt-4 mb-8 ml-0 max-w-xl text-lg text-gray-300 dark:text-gray-300"
              >
                <div class="scrollbar-0 max-h-[20vh] overflow-scroll">
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
                  class="sm:text-film-tertiary/70 pointer-events-auto cursor-pointer font-semibold text-gray-300 hover:underline dark:text-gray-300"
                >
                  {{ isExpanded ? 'Read Less' : 'Read More' }}
                </button>
              </div>

              <div class="flex items-center justify-start gap-4">
                <a :href="imdbLink" target="_blank " class="pointer-events-auto"
                  ><img
                    alt="Imdb logo"
                    src="@/assets/icons/imdb.svg"
                    width="60"
                    height="40"
                    loading="lazy"
                /></a>
                <div
                  class="pointer-events-auto z-2 flex w-fit items-center gap-3 rounded-full bg-white px-3 py-1.5 lg:hidden"
                  @click="() => handleVideoPlay('sm')"
                >
                  <span class="text-film-tertiary font-bold"> Trailer</span>
                  <img
                    src="@/assets/icons/play.svg"
                    alt="Play video icon"
                    class="h-2.5 w-2.5 rotate-90"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FavoritesBadge
        class="pointer-events-auto absolute bottom-15 cursor-auto"
        @mouseenter="() => (isHovered = true)"
        @mouseleave="() => (isHovered = false)"
      >
        <template #default>
          <div
            class="z-10 flex w-full flex-col items-center justify-between gap-4 pr-0 sm:flex-row sm:pr-4"
          >
            <h5 class="text-film-secondary z-10">⭐ {{ favoriteDialogText.title }}</h5>
            <BaseButton
              class="w-full !px-11 sm:w-fit"
              :mode="'primary'"
              :isLink="false"
              @click="toggleFavModal"
            >
              {{ favoriteDialogText.btnLabel }}
            </BaseButton>
          </div>
        </template>
      </FavoritesBadge>
    </div>
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

<script setup lang="ts">
import type { MovieFilter, ReleaseYear } from '@/types/general'
import type { Genre } from '@/types/movie'
import { computed, defineAsyncComponent, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import BaseButton from './ui/BaseButton.vue'
import RangeSlider from './ui/RangeSlider.vue'
import SingleRangeSlider from './ui/SingleRangeSlider.vue'
import { LANGUAGES } from '@/constants/general'

interface FiltersForm {
  genres: Genre[] | null
  searchQuery: string
}

const emits = defineEmits(['submitFiltersForm', 'resetFilters'])
const { searchQuery } = defineProps<FiltersForm>()
const BaseTooltip = defineAsyncComponent(() => import('./ui/BaseTooltip.vue'))

const route = useRoute()
const selectedGenres = ref<number[]>([])
const minSelected = ref(1920)
const maxSelected = ref(2020)
const singleRangeSelected = ref(2020)
const selectedLanguage = ref('en')

const extractYears = (str: string): ReleaseYear => {
  const [firstYear, secondYear] = str.split('|').map((y) => y || null)
  return { lte: firstYear || '', gte: secondYear || '' }
}

const handleSubmitForm = () => {
  const results: MovieFilter = {
    genres: [],
    releaseYear: {
      lte: '',
      gte: '',
    },
    language: 'en',
  }
  results.genres = selectedGenres.value
  results.releaseYear = {
    lte: !searchQuery.trim() ? maxSelected.value.toString() : singleRangeSelected.value.toString(),
    gte: !searchQuery.trim() ? minSelected.value.toString() : '',
  }
  results.language = selectedLanguage.value
  emits('submitFiltersForm', results)
}

const currentYear = computed(() => new Date().getFullYear())

const updateRange = (range: { min: number; max: number }) => {
  minSelected.value = range.min
  maxSelected.value = range.max
}
const updateSingleRange = (range: number) => {
  singleRangeSelected.value = range
}

// Runs once on mount to initialize `selectedGenres` & `minSelected`, `maxSelected`, `singleRangeSelected`
watch(
  () => [route.query.genres, route.query.year, route.query.lang],
  ([newGenres, newYear, newLang]) => {
    if (!newGenres) {
      selectedGenres.value = []
    } else {
      const genreString = Array.isArray(newGenres) ? newGenres[0] : newGenres
      selectedGenres.value = genreString ? genreString.split('|').map(Number) : []
    }

    // Handle Release Year
    if (newYear) {
      const yearString = Array.isArray(newYear) ? newYear[0] : newYear
      if (yearString) {
        const { lte, gte } = extractYears(yearString)
        if (lte.trim() && gte.trim()) {
          minSelected.value = parseInt(lte)
          maxSelected.value = parseInt(gte)
        } else {
          singleRangeSelected.value = parseInt(gte)
        }
      }
    }

    // Handle Language
    if (newLang) {
      const langString = Array.isArray(newLang) ? newLang[0] : newLang
      if (langString) selectedLanguage.value = langString
    }
  },
  { immediate: true },
)
</script>

<template>
  <form @submit.prevent="handleSubmitForm">
    <div v-if="!searchQuery.trim()" class="pb-6">
      <div class="mb-4 flex items-center gap-2">
        <img src="@/assets/icons/genres.svg" alt="Release year icon" class="size-4" />
        <h2 class="text-dark text-xl">Genres</h2>
      </div>
      <div v-if="genres" class="flex flex-wrap gap-2">
        <div v-for="genre in genres" :key="genre.id">
          <input
            class="hidden"
            :id="genre.id + genre.name"
            :name="genre.name"
            type="checkbox"
            :value="genre.id"
            v-model="selectedGenres"
          />

          <label
            :for="genre.id + genre.name"
            :class="[
              'cursor-pointer rounded-2xl bg-[#232731] px-3 py-1 text-white',
              selectedGenres.includes(genre.id) ? 'bg-film-primary' : '',
            ]"
            >{{ genre.name }}</label
          >
        </div>
      </div>
    </div>
    <div>
      <div class="mb-4 flex items-center gap-2">
        <img src="@/assets/icons/release-year.svg" alt="Release year icon" class="size-4" />
        <h2 class="text-dark text-xl">Release Year</h2>
      </div>
      <RangeSlider
        v-if="!searchQuery.trim()"
        :min="1900"
        :max="currentYear"
        :step="1"
        :initialMin="minSelected"
        :initialMax="maxSelected"
        @update-range="updateRange"
      />
      <SingleRangeSlider
        v-else
        :min="1900"
        :max="currentYear"
        :step="1"
        :initialValue="singleRangeSelected"
        @update-single-range="updateSingleRange"
      />
    </div>
    <div class="pt-2">
      <div class="relative mb-4 flex items-center gap-2">
        <img src="@/assets/icons/language.svg" alt="Release year icon" class="size-4" />
        <h2 class="text-dark text-xl">Language</h2>
        <BaseTooltip>
          <template #content>
            Language of the movie's metadata (title, overview, etc.), not necessarily the spoken
            language in the movie.
          </template>
          <template #default><img src="@/assets/icons/info.svg" class="size-5" /></template>
        </BaseTooltip>
      </div>
      <div class="styleSelect w-full overflow-hidden rounded-full !bg-[#232731]">
        <select
          id="referrer"
          name="referrer"
          v-model="selectedLanguage"
          class="text-film-secondary w-full cursor-pointer bg-transparent px-5 py-2"
        >
          <option
            v-for="lang in LANGUAGES"
            :key="lang.code"
            :value="lang.code"
            class="bg-[#10141e]"
          >
            {{ lang.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="-mb-5 pt-10">
      <BaseButton
        class="!bg-film-secondary !text-film-tertiary mr-4 cursor-pointer !rounded-full"
        mode="secondary"
        :isLink="false"
        @click="$emit('resetFilters')"
      >
        Clear All
      </BaseButton>
      <BaseButton type="submit" class="cursor-pointer !rounded-full" mode="primary" :isLink="false">
        Save
      </BaseButton>
    </div>
  </form>
</template>

<style scoped>
.styleSelect {
  background: url('@/assets/icons/down.svg') no-repeat right;
  background-size: 18px 18px;
  background-position-x: 95%;
}

.styleSelect select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
</style>

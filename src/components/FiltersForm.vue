<script setup lang="ts">
import type { MovieFilter } from '@/types/general'
import type { Genre } from '@/types/movie'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import BaseButton from './ui/BaseButton.vue'
import RangeSlider from './ui/RangeSlider.vue'
import SingleRangeSlider from './ui/SingleRangeSlider.vue'

interface FiltersForm {
  genres: Genre[] | null
  searchQuery: string
}
const emits = defineEmits(['submitFiltersForm', 'resetFilters'])
const { searchQuery } = defineProps<FiltersForm>()

const route = useRoute()
const selectedGenres = ref<number[]>([])
const minSelected = ref(1920)
const maxSelected = ref(2020)
const singleRangeSelected = ref(2020)

// Runs once on mount to initialize `selectedGenres`
watch(
  () => route.query.genres,
  (newGenres) => {
    if (!newGenres) {
      selectedGenres.value = []
      return
    }

    const genreString = Array.isArray(newGenres) ? newGenres[0] : newGenres
    selectedGenres.value = genreString ? genreString.split('|').map(Number) : []
  },
  { immediate: true },
)

const handleSubmitForm = () => {
  const results: MovieFilter = {
    genres: [],
    releaseYear: {
      lte: '',
      gte: '',
    },
  }
  results.genres = selectedGenres.value
  results.releaseYear = {
    lte: !searchQuery.trim() ? maxSelected.value.toString() : singleRangeSelected.value.toString(),
    gte: !searchQuery.trim() ? minSelected.value.toString() : '',
  }
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
</script>

<template>
  <form @submit.prevent="handleSubmitForm">
    <div v-if="!searchQuery.trim()" class="pb-6">
      <h2 class="text-dark mb-4 text-xl">Genres</h2>
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
              'cursor-pointer rounded-2xl bg-[#10141e] px-3 py-1 text-white',
              selectedGenres.includes(genre.id) ? 'bg-film-primary' : '',
            ]"
            >{{ genre.name }}</label
          >
        </div>
      </div>
    </div>
    <div>
      <h2 class="text-dark mb-4 text-xl">Release Year</h2>
      <RangeSlider
        v-if="!searchQuery.trim()"
        :min="1900"
        :max="currentYear"
        :step="1"
        :initialMin="1920"
        :initialMax="2020"
        @update-range="updateRange"
      />
      <SingleRangeSlider
        v-else
        :min="1900"
        :max="currentYear"
        :step="1"
        :initialValue="currentYear"
        @update-single-range="updateSingleRange"
      />
    </div>
    <div class="-mb-5 pt-8">
      <BaseButton
        class="mr-4 cursor-pointer !rounded-full"
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

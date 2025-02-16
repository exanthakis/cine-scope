<script setup lang="ts">
import type { MovieFilter } from '@/types/general'
import type { Genre } from '@/types/movie'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import BaseButton from './ui/BaseButton.vue'

interface FiltersForm {
  genres: Genre[] | null
}
const emits = defineEmits(['submitFiltersForm', 'resetFilters'])
defineProps<FiltersForm>()

const route = useRoute()
const selectedGenres = ref<number[]>([])

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
  const results: MovieFilter = {}
  results.genres = selectedGenres.value
  emits('submitFiltersForm', results)
}
</script>

<template>
  <form @submit.prevent="handleSubmitForm">
    <div class="form-control">
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

<style lang="scss" scoped></style>

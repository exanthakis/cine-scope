<script setup lang="ts">
import type { MovieFilter } from '@/types/general'
import type { Genre } from '@/types/movie'
import { ref } from 'vue'

interface FiltersForm {
  genres: Genre[] | null
}
const emits = defineEmits(['submitFiltersForm'])
defineProps<FiltersForm>()

const selectedGenres = ref<number[]>([])

const handleSubmitForm = () => {
  const results: MovieFilter = {}
  results.genres = selectedGenres.value
  emits('submitFiltersForm', results)
}
</script>

<template>
  <form @submit.prevent="handleSubmitForm">
    <div class="form-control">
      <h2 class="text-dark mb-2.5 text-xl">Genres</h2>
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
    <button type="submit" class="cursor-pointer pt-8">Save</button>
  </form>
</template>

<style lang="scss" scoped></style>

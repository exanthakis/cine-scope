import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { type MovieCardStore } from '@/types/general'

export const useFavoritesStore = defineStore('favorites', () => {
  const movies = ref<MovieCardStore[]>(JSON.parse(localStorage.getItem('savedMovies') || '[]'))

  const totalFavorites = computed(() => movies.value.length)

  const addMovie = (movie: MovieCardStore) => {
    const movieExists = movies.value?.find((el) => el.id === movie.id)

    if (!movieExists) movies.value.push(movie)
  }

  const removeMovie = (movie: MovieCardStore) => {
    const updatedFavorites = movies.value.filter((el) => el.id !== movie.id)
    movies.value = updatedFavorites
  }

  const isFavorite = (id: number) => {
    const movieExists = movies.value?.find((el) => el.id === id)

    return !!movieExists
  }

  watch(
    movies,
    (newMovies) => {
      localStorage.setItem('savedMovies', JSON.stringify(newMovies))
    },
    { deep: true },
  )

  return { movies, totalFavorites, addMovie, removeMovie, isFavorite }
})

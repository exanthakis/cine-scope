import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { type MovieCardProps } from '@/types/general'

export const useFavoritesStore = defineStore('favorites', () => {
  const movies = ref<MovieCardProps[]>([])

  const totalFavorites = computed(() => movies.value.length)

  const addMovie = (movie: MovieCardProps) => {
    const movieExists = movies.value?.find((el) => el.id === movie.id)

    if (!movieExists) movies.value.push(movie)
  }

  const removeMovie = (movie: MovieCardProps) => {
    const updatedFavorites = movies.value.filter((el) => el.id !== movie.id)
    movies.value = updatedFavorites
  }

  const isFavorite = (id: number) => {
    const movieExists = movies.value?.find((el) => el.id === id)

    return !!movieExists
  }

  return { movies, totalFavorites, addMovie, removeMovie, isFavorite }
})

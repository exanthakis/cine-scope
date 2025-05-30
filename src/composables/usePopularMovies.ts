import MovieService from '@/services/MovieService'
import { useFetch } from './useFetch'
import type { Ref } from 'vue'

export const usePopularMovies = (popularMoviesPage: Ref<string>) => {
  const { fetchData, isLoading } = useFetch()

  const getPopularMovies = async () => {
    if (!popularMoviesPage.value) {
      return null
    }

    return await fetchData(() =>
      MovieService.getPopularMovies(popularMoviesPage.value).then((res) => res.data),
    )
  }

  return {
    getPopularMovies,
    isLoading,
  }
}

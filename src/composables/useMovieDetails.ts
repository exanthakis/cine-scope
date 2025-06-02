import MovieService from '@/services/MovieService'
import { useFetch } from './useFetch'
import type { Ref } from 'vue'

export const useMovieDetails = (movieId: Ref<string>) => {
  const { fetchData, isLoading } = useFetch()

  const getMovieDetails = async () => {
    if (!movieId) {
      return null
    }

    return await fetchData(() => MovieService.getMovieData(movieId.value).then((res) => res.data), {
      delay: 1000,
    })
  }

  return {
    getMovieDetails,
    isLoading,
  }
}

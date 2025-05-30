import MovieService from '@/services/MovieService'
import { useFetch } from './useFetch'

export const useMovieDetails = (movieId: string | undefined | null) => {
  const { fetchData, isLoading } = useFetch()

  const getMovieDetails = async () => {
    if (!movieId) {
      return null
    }

    return await fetchData(() => MovieService.getMovieData(movieId).then((res) => res.data), {
      delay: 1000,
    })
  }

  return {
    getMovieDetails,
    isLoading,
  }
}

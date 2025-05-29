import { type Ref } from 'vue'
import MovieService from '@/services/MovieService'
import { useFetch } from './useFetch'

export function useSimilarMovies(movieId: Ref<string>) {
  const { fetchData, isLoading } = useFetch()

  const getSimilarMovies = async () => {
    return await fetchData(
      () => MovieService.getSimilarMovies(movieId.value).then((res) => res.data.results),
      { delay: 1000 },
    )
  }

  return {
    getSimilarMovies,
    isLoading,
  }
}

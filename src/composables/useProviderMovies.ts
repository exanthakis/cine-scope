import MovieService from '@/services/MovieService'
import { useFetch } from './useFetch'
import type { Ref } from 'vue'

export const useProviderMovies = (providerId: string, providerMoviesPage: Ref<string>) => {
  const { fetchData, isLoading } = useFetch()

  const getProviderMovies = async () => {
    if (!providerMoviesPage.value || !providerId) {
      return null
    }

    return await fetchData(
      () =>
        MovieService.getMoviesByProvider(providerId, providerMoviesPage.value).then(
          (res) => res.data,
        ),
      { delay: 500 },
    )
  }

  return {
    getProviderMovies,
    isLoading,
  }
}

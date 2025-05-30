import { ref, type Ref } from 'vue'
import { useFetch } from './useFetch'
import MovieService from '@/services/MovieService'
import type { Movie } from '@/types/movie'

export const useMultipleMovieLists = (popularMoviesPage: Ref<string>) => {
  const trendingMovies = ref<Movie[]>([])
  const popularMovies = ref<Movie[]>([])
  const netflixMovies = ref<Movie[]>([])
  const disneyMovies = ref<Movie[]>([])

  const { fetchData, isLoading } = useFetch()

  const loadMovieLists = async () => {
    await fetchData(
      async () => {
        const [trending, popular, netflix, disney] = await Promise.all([
          MovieService.getTrendingMovies().then((res) => res.data.results),
          MovieService.getPopularMovies(popularMoviesPage.value).then((res) => res.data.results),
          MovieService.getMoviesByProvider('8', '1').then((res) => res.data.results),
          MovieService.getMoviesByProvider('337', '1').then((res) => res.data.results),
        ])

        trendingMovies.value = trending || []
        popularMovies.value = popular || []
        netflixMovies.value = netflix || []
        disneyMovies.value = disney || []
      },
      { delay: 1000 },
    )
  }

  return {
    trendingMovies,
    popularMovies,
    netflixMovies,
    disneyMovies,
    loadMovieLists,
    isLoading,
  }
}

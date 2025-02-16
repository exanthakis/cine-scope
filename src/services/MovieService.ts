import { DEFAULT_LANGUAGE } from '@/constants/general'
import { apiClient } from '@/lib/http'

const getPopularMovies = (page: string) => {
  return apiClient.get(
    '/movie/popular?api_key=' + import.meta.env.VITE_TMDB_API_KEY + '&page=' + page,
  )
}

const getTrendingMovies = () => {
  return apiClient.get('/trending/movie/day?api_key=' + import.meta.env.VITE_TMDB_API_KEY)
}

const getMoviesByProvider = (id: string) => {
  return apiClient.get(
    '/discover/movie?api_key=' +
      import.meta.env.VITE_TMDB_API_KEY +
      '&sort_by=vote_count.desc&with_watch_providers=' +
      id +
      '&watch_region=US',
  )
}

const getMovieData = (id: string) => {
  return apiClient.get(
    '/movie/' +
      id +
      '?api_key=' +
      import.meta.env.VITE_TMDB_API_KEY +
      '&language=' +
      DEFAULT_LANGUAGE +
      '&append_to_response=credits,videos,watch/providers',
  )
}

const getSimilarMovies = (id: string) => {
  return apiClient.get(
    '/movie/' +
      id +
      '/recommendations?api_key=' +
      import.meta.env.VITE_TMDB_API_KEY +
      '&language=' +
      DEFAULT_LANGUAGE +
      '&page=1',
  )
}

export const searchMovies = async (query: string, genres: string, page: number) => {
  const filter = query.trim() ? '/search' : '/discover'
  return apiClient.get(
    filter +
      '/movie?api_key=' +
      import.meta.env.VITE_TMDB_API_KEY +
      '&query=' +
      encodeURIComponent(query) +
      '&with_genres=' +
      genres +
      '&page=' +
      page,
  )
}

const getGenres = () => {
  return apiClient.get(
    '/genre/movie/list?api_key=' +
      import.meta.env.VITE_TMDB_API_KEY +
      '&language=' +
      DEFAULT_LANGUAGE,
  )
}

export default {
  getPopularMovies,
  getTrendingMovies,
  getMoviesByProvider,
  getMovieData,
  getSimilarMovies,
  searchMovies,
  getGenres,
}

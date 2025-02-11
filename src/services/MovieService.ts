import { DEFAULT_LANGUAGE } from '@/constants/general'
import { apiClient } from '@/lib/http'

const getPopularMovies = (page: string) => {
  return apiClient.get(
    '/movie/popular?api_key=' + import.meta.env.VITE_TMDB_API_KEY + '&page=' + page,
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

export const searchMovies = async (query: string, page: string) => {
  return apiClient.get(
    '/search/movie?api_key=' +
      import.meta.env.VITE_TMDB_API_KEY +
      '&query=' +
      encodeURIComponent(query) +
      '&page=' +
      page,
  )
}

export default { getPopularMovies, getMovieData, getSimilarMovies, searchMovies }

import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

const getPopularMovies = (page: string) => {
  return apiClient.get(
    '/movie/popular?api_key=' + import.meta.env.VITE_TMDB_API_KEY + '&page=' + page,
  )
}

const getMovieData = (id: string) => {
  return apiClient.get(
    '/movie/' + id + '?api_key=' + import.meta.env.VITE_TMDB_API_KEY + '&language=en-US',
  )
}

const getSimilarMovies = (id: string) => {
  return apiClient.get(
    '/movie/' +
      id +
      '/similar?api_key=' +
      import.meta.env.VITE_TMDB_API_KEY +
      '&language=en-US&page=1',
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

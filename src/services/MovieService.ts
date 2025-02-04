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

export default { getPopularMovies, getMovieData }

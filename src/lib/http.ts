import { TMDB_API_BASE_URL } from '@/constants/general'
import axios from 'axios'

export const apiClient = axios.create({
  baseURL: TMDB_API_BASE_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

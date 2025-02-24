import type { Credits } from './cast'

export interface Movie {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

interface Collection {
  id: number
  name: string
  poster_path: string | null
  backdrop_path: string | null
}

export interface Genre {
  id: number
  name: string
}

interface ProductionCompany {
  id: number
  logo_path: string | null
  name: string
  origin_country: string
}

interface ProductionCountry {
  iso_3166_1: string
  name: string
}

interface SpokenLanguage {
  english_name: string
  iso_639_1: string
  name: string
}

interface Video {
  id?: string
  iso_639_1?: string
  iso_3166_1?: string
  key?: string
  name?: string
  official?: boolean
  published_at?: string
  site?: string
  size?: number
  type?: string
}

export interface WatchProvider {
  provider_id: number
  provider_name: string
  logo_path: string
}

export interface WatchProviderRegion {
  link: string
  flatrate?: WatchProvider[]
  rent?: WatchProvider[]
  buy?: WatchProvider[]
}
export interface WatchProviders {
  results: Record<string, WatchProviderRegion>
}

export interface MovieDetails {
  adult?: boolean
  backdrop_path?: string | null
  belongs_to_collection?: Collection | null
  budget?: number
  credits: Credits
  genres?: Genre[]
  homepage?: string | null
  id?: number
  imdb_id?: string | null
  origin_country?: string[]
  original_language?: string
  original_title?: string
  overview?: string | null
  popularity?: number
  poster_path?: string | null
  production_companies?: ProductionCompany[]
  production_countries?: ProductionCountry[]
  release_date?: string
  revenue?: number
  runtime?: number | null
  spoken_languages?: SpokenLanguage[]
  status?: string
  tagline?: string | null
  title?: string
  video?: boolean
  vote_average?: number
  vote_count?: number
  videos?: {
    results: Video[]
  }
  'watch/providers'?: WatchProviders
}

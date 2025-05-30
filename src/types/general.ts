import type { Genre, Movie } from './movie'

export interface MovieCardProps {
  id: number
  title: string
  description?: string
  imgUrl?: string
  config?: {
    hideFav?: boolean
    hideOutline?: boolean
    num?: number | null
  }
}

export interface MovieCardsProps {
  movies: Movie[] | MovieCardStore[]
  limit?: number
  showNum?: boolean
}

export type MovieCardStore = Omit<MovieCardProps, 'hideFav'>

export interface MovieDetailsProps {
  id: string
  t?: string
}

export interface BaseBadgeProps {
  title: string
}

export interface BaseButtonProps {
  mode: 'primary' | 'secondary'
  to?: string
}

export interface BaseDialogProps {
  show: boolean
  classes?: string
}

export interface CreditsArr {
  id?: number
  original_title?: string
  title?: string
  poster_path?: string
}

export type AvatarTextProps = Omit<CreditsArr, 'id'>

export interface MovieDetailsHeroProps {
  id?: number
  backdrop_path?: string | null
  poster_path?: string | null
  homepage?: string | null
  title?: string
  release_date?: string
  vote_average?: number | null
  runtime?: number | null
  genres?: Genre[]
  overview?: string | null
  imdb_id?: string | null
  trailerKey: string
}

export interface MovieFilter {
  genres?: number[]
  releaseYear: ReleaseYear
  language: string
}

export interface ReleaseYear {
  lte: string
  gte: string
}
export interface SelectedFilters {
  genres: number[]
  releaseYear: ReleaseYear | null
  language: string
}

export type Theme = 'dark' | 'light' | 'system'

export interface RangeSliderProps {
  initialMin: number
  initialMax: number
  min: number
  max: number
  step: number
}

export interface SingleRangeSliderProps {
  initialValue: number
  min: number
  max: number
  step: number
}

export interface MoviePaginationProps {
  totalPages: number
  page: number
  route: string
  hasNextPage: boolean
}

export interface FiltersForm {
  genres: Genre[] | null
  searchQuery: string
}

export interface MobileNavProps {
  open: boolean
}

export type SwiperSliderProps<T> = {
  data: T
  breakpoints?: Record<number, { slidesPerView: number }>
  navigation?: boolean
}

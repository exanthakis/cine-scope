import type { Genre } from './movie'

export interface MovieCardProps {
  id: number
  title: string
  imgUrl?: string
  hideFav?: boolean
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
  isLink: boolean
  to?: string
}

export interface BaseDialogProps {
  show: boolean
  classes?: string
}

export interface AvatarTextProps {
  id?: number
  name?: string
  title?: string
  path?: string
}

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

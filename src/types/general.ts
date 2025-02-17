import type { Genre } from './movie'

export interface MovieCardProps {
  id: number
  title: string
  imgUrl?: string
  hideFav?: boolean
}

export interface MovieDetailsProps {
  id: string
}

export interface BaseButtonProps {
  mode: 'primary' | 'secondary'
  isLink: boolean
  to?: string
}

export interface CreditsListProps {
  credits: AvatarTextProps[]
  type: string
  isLoading: boolean
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
  providers?: string[]
  releaseYear: ReleaseYear
}

export interface ReleaseYear {
  lte: string
  gte: string
}
export interface SelectedFilters {
  genres: number[]
  releaseYear: ReleaseYear | null
}

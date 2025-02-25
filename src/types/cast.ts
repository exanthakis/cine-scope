type Cast = {
  adult?: boolean
  cast_id?: number
  character?: string
  credit_id?: string
  gender?: number
  id: number
  known_for_department?: string
  name?: string
  order?: number
  original_name?: string
  popularity?: number
  profile_path?: string
}

type Crew = Omit<Cast, 'cast_id' | 'character' | 'order'> & {
  department?: string
  job?: string
}

export type CreditsWrapperProps = {
  cast: Cast[]
  crew: Crew[]
  isLoading: boolean
}

export type Credit = 'Cast' | 'Crew'

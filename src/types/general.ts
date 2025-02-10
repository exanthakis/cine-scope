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
}
export interface AvatarTextProps {
  id?: number
  name?: string
  title?: string
  path?: string
}

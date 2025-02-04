export interface MovieCardProps {
  id: number
  title: string
  date: string
  imgUrl?: string
}

export interface MovieDetailsProps {
  id: string
}

export interface BaseButtonProps {
  mode: 'primary' | 'secondary'
  isLink: boolean
  to?: string
}

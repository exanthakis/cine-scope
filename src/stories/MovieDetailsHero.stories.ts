import MovieDetailsHero from '@/components/movie/movie-details/MovieDetailsHero.vue'
import { mockMovieDetails } from '@/mocks/movies'
import type { MovieDetailsHeroProps } from '@/types/general'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  title: 'Components/MovieDetailsHero',
  component: MovieDetailsHero,
  tags: ['autodocs'],
  argTypes: {
    id: { control: 'number' },
    backdrop_path: { control: 'text' },
    poster_path: { control: 'text' },
    homepage: { control: 'text' },
    title: { control: 'text' },
    release_date: { control: 'text' },
    vote_average: { control: 'number' },
    runtime: { control: 'number' },
    genres: { control: 'object' },
    overview: { control: 'text' },
    imdb_id: { control: 'text' },
    trailerKey: { control: 'text' },
  },

  parameters: {
    layout: 'fullscreen',
  },
  render: (args: MovieDetailsHeroProps) => ({
    components: { MovieDetailsHero },
    setup() {
      return { args }
    },
    template: '<MovieDetailsHero v-bind="args"/>',
  }),
} satisfies Meta<typeof MovieDetailsHero>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    ...mockMovieDetails,
  },
}

import MovieSlider from '@/components/movie/MovieSlider.vue'
import { mockMovies } from '@/mocks/movies'
import type { MovieSliderProps } from '@/types/movie'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  title: 'Components/MovieSlider',
  component: MovieSlider,
  tags: ['autodocs'],
  argTypes: {},
  render: (args: MovieSliderProps) => ({
    components: { MovieSlider },
    setup() {
      return { args }
    },
    template: '<MovieSlider v-bind="args"/>',
  }),
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof MovieSlider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    movies: mockMovies,
  },
}

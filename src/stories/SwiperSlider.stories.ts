import MovieCard from '@/components/movie/MovieCard.vue'
import SwiperSlider from '@/components/ui/SwiperSlider.vue'
import { mockMovies } from '@/mocks/movies'
import type { CreditsArr, SwiperSliderProps } from '@/types/general'
import type { Movie } from '@/types/movie'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  title: 'UI/SwiperSlider',
  component: SwiperSlider,
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'object',
    },
    breakpoints: {
      control: 'object',
    },
  },
  render: (args: SwiperSliderProps<Movie[] | CreditsArr[]>) => ({
    components: { SwiperSlider, MovieCard },
    setup() {
      return { args }
    },
    template: `
      <SwiperSlider v-bind="args">
        <template #default="{ id, title, poster_path }">
          <MovieCard 
            :id="id"
            :title="title"
            :imgUrl="poster_path"
            :hide-fav="true"
            class="!min-h-[10vh]"
          />
        </template>
      </SwiperSlider>
    `,
  }),
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SwiperSlider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    data: mockMovies,
  },
}

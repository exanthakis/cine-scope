import MovieCard from '@/components/movie/MovieCard.vue'
import type { MovieCardProps } from '@/types/general'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  title: 'Components/MovieCard',
  component: MovieCard,
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: 'number',
    },
    title: {
      control: 'text',
    },
    imgUrl: {
      control: 'text',
    },
    hideFav: {
      control: 'boolean',
    },
  },

  parameters: {
    layout: 'centered',
  },
  render: (args: MovieCardProps) => ({
    components: { MovieCard },
    setup() {
      return { args }
    },
    template: '<MovieCard v-bind="args"/>',
  }),
} satisfies Meta<typeof MovieCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: 672,
    title: 'Harry Potter and the Chamber of Secrets',
    imgUrl: '/yHzyPJrVqlTySQ9mc379yxrLBYQ.jpg',
    hideFav: false,
  },
}

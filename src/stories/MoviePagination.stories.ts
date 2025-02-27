import MoviePagination from '@/components/movie/MoviePagination.vue'
import type { MoviePaginationProps } from '@/types/general'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  title: 'Components/MoviePagination',
  component: MoviePagination,
  tags: ['autodocs'],
  argTypes: {
    totalPages: {
      control: 'number',
    },
    page: {
      control: 'number',
    },
    route: {
      control: 'text',
    },
    hasNextPage: {
      control: 'boolean',
    },
  },

  parameters: {
    layout: 'centered',
  },
  render: (args: MoviePaginationProps) => ({
    components: { MoviePagination },
    setup() {
      return { args }
    },
    template: '<MoviePagination v-bind="args"/>',
  }),
} satisfies Meta<typeof MoviePagination>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    totalPages: 200,
    page: 1,
    route: 'movie-list',
    hasNextPage: true,
  },
}

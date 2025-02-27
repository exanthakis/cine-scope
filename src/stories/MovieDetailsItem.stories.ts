import MovieDetailsItem from '@/components/movie/movie-details/MovieDetailsItem.vue'
import type { MovieDetailsItemProps } from '@/types/movie'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  title: 'Components/MovieDetailsItem',
  component: MovieDetailsItem,
  tags: ['autodocs'],
  argTypes: {
    classes: { control: 'text' },
    default: { control: 'text', description: 'Default slot content' },
    header: { control: 'text', description: 'Header slot content' },
  },

  parameters: {
    layout: 'centered',
  },
  render: (args: MovieDetailsItemProps) => ({
    components: { MovieDetailsItem },
    setup() {
      return { args }
    },
    template:
      '<MovieDetailsItem v-bind="args"><template #header>{{args.header}}</template><template #default>{{args.default}}</template></MovieDetailsItem>',
  }),
} satisfies Meta<typeof MovieDetailsItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    classes: '',
    header: 'Header Content',
    default: 'Main Content',
  },
}

import FiltersForm from '@/components/FiltersForm.vue'
import { mockGenres } from '@/mocks/genres'
import { fn } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  title: 'Components/FiltersForm',
  component: FiltersForm,
  tags: ['autodocs'],
  argTypes: {
    searchQuery: { control: 'text', description: 'Tooltip label (default slot content)' },
  },
  parameters: {
    layout: 'centered',
  },
  render: (args) => ({
    components: { FiltersForm },
    setup() {
      return { args }
    },
    template: '<FiltersForm v-bind="args" class="text-black" />',
  }),
  args: {
    onSubmitFiltersForm: fn(),
    onResetFilters: fn(),
  },
} satisfies Meta<typeof FiltersForm>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    genres: mockGenres,
    searchQuery: '',
  },
}
export const Secondary: Story = {
  args: {
    genres: mockGenres,
    searchQuery: 'Test content',
  },
}

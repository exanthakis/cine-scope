import SearchInput from '@/components/SearchInput.vue'
import { fn } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  title: 'Components/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  argTypes: {
    searchQuery: { control: 'text' },
  },
  parameters: {
    layout: 'centered',
  },
  render: (args) => ({
    components: { SearchInput },
    setup() {
      return { args }
    },
    template:
      '<SearchInput v-model:searchQuery="args.searchQuery" v-bind="args" class="text-black" />',
  }),
  args: {
    onOnFilterShow: fn(),
    onClearSearchQuery: fn(),
  },
} satisfies Meta<typeof SearchInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    searchQuery: '',
  },
}

import TheFooter from '@/components/layout/TheFooter.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  title: 'Layout/TheFooter',
  component: TheFooter,
  tags: ['autodocs'],
  argTypes: {},
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: (args) => ({
    components: { TheFooter },
    setup() {
      return { args }
    },
    template: '<TheFooter v-bind="args" />',
  }),
} satisfies Meta<typeof TheFooter>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

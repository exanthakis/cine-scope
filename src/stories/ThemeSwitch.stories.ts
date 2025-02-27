import ThemeSwitch from '@/components/ThemeSwitch.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  title: 'Components/ThemeSwitch',
  component: ThemeSwitch,
  tags: ['autodocs'],
  argTypes: {},
  parameters: {
    layout: 'centered',
  },
  render: (args) => ({
    components: { ThemeSwitch },
    setup() {
      return { args }
    },
    template: '<ThemeSwitch v-bind="args" class="!bg-gray-300" />',
  }),
} satisfies Meta<typeof ThemeSwitch>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {},
}

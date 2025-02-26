import BaseBadge from '@/components/ui/BaseBadge.vue'
import type { BaseBadgeProps } from '@/types/general'
import { fn } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  title: 'BaseComponents/BaseBadge',
  component: BaseBadge,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
    },
  },

  parameters: {
    layout: 'centered',
  },
  render: (args: BaseBadgeProps) => ({
    components: { BaseBadge },
    setup() {
      return { args }
    },
    template: '<BaseBadge v-bind="args"/>',
  }),
  args: {
    onClose: fn(),
  },
} satisfies Meta<typeof BaseBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'test',
  },
}

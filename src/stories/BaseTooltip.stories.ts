import BaseTooltip from '@/components/ui/BaseTooltip.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  title: 'UI/BaseTooltip',
  component: BaseTooltip,
  tags: ['autodocs'],
  argTypes: {
    default: { control: 'text', description: 'Tooltip label (default slot content)' },
    content: { control: 'text', description: 'Tooltip content (main slot content)' },
  },
  parameters: {
    layout: 'centered',
  },
  render: (args) => ({
    components: { BaseTooltip },
    setup() {
      return { args }
    },
    template:
      '<BaseTooltip class="text-black relative"><template #content>{{args.content}}</template><template #default>{{args.default}}</template></BaseTooltip>',
  }),
} satisfies Meta<typeof BaseTooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    default: 'Tooltip',
    content: 'Test content',
  },
}

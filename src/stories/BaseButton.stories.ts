import BaseButton from '@/components/ui/BaseButton.vue'
import type { BaseButtonProps } from '@/types/general'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  title: 'UI/BaseButton',
  component: BaseButton,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'radio',
      options: ['primary', 'secondary'],
    },
    isLink: {
      control: 'boolean',
    },
    to: {
      control: 'text',
    },
    default: { control: 'text', description: 'Default slot content' },
  },
  parameters: {
    layout: 'centered',
  },
  render: (args: BaseButtonProps) => ({
    components: { BaseButton },
    setup() {
      return { args }
    },
    template:
      '<BaseButton v-bind="args"><template #default>{{args.default}}</template></BaseButton>',
  }),
} satisfies Meta<typeof BaseButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    mode: 'primary',
    isLink: false,
    default: 'Button',
  },
}
export const Secondary: Story = {
  args: {
    mode: 'secondary',
    isLink: false,
    default: 'Button',
  },
}

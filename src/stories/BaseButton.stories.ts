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
  },
  parameters: {
    layout: 'centered',
  },
  render: (args: BaseButtonProps) => ({
    components: { BaseButton },
    setup() {
      return { args }
    },
    template: '<BaseButton v-bind="args">Button</BaseButton>',
  }),
} satisfies Meta<typeof BaseButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    mode: 'primary',
    isLink: false,
  },
}
export const Secondary: Story = {
  args: {
    mode: 'secondary',
    isLink: false,
  },
}

import MobileNav from '@/components/layout/MobileNav.vue'
import type { MobileNavProps } from '@/types/general'
import { fn } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  title: 'Layout/MobileNav',
  component: MobileNav,
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
    },
  },
  parameters: {
    layout: 'centered',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: (args: MobileNavProps) => ({
    components: { MobileNav },
    setup() {
      return { args }
    },
    template: '<MobileNav v-bind="args" />',
  }),
  args: {
    onClose: fn(),
  },
} satisfies Meta<typeof MobileNav>

export default meta
type Story = StoryObj<typeof meta>

export const Mobile: Story = {
  args: {
    open: true,
  },
}

import SiteNavigation from '@/components/layout/SiteNavigation.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  title: 'Layout/SiteNavigation',
  component: SiteNavigation,
  tags: ['autodocs'],
  argTypes: {},
  parameters: {
    layout: 'fullscreen',
  },
  render: (args) => ({
    components: { SiteNavigation },
    setup() {
      return { args }
    },
    template: '<SiteNavigation v-bind="args" />',
  }),
} satisfies Meta<typeof SiteNavigation>

export default meta
type Story = StoryObj<typeof meta>

export const Desktop: Story = {}

import CreditsWrapper from '@/components/credits/CreditsWrapper.vue'
import { mockCreditsCast, mockCreditsCrew } from '@/mocks/credits'
import type { CreditsWrapperProps } from '@/types/cast'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  title: 'Components/CreditsWrapper',
  component: CreditsWrapper,
  tags: ['autodocs'],
  argTypes: {
    isLoading: {
      control: 'boolean',
    },
  },
  render: (args: CreditsWrapperProps) => ({
    components: { CreditsWrapper },
    setup() {
      return { args }
    },
    template: '<CreditsWrapper v-bind="args"/>',
  }),
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CreditsWrapper>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    cast: mockCreditsCast,
    crew: mockCreditsCrew,
    isLoading: false,
  },
}

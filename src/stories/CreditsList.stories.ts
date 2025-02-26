import CreditsList, { type CreditsListProps } from '@/components/credits/CreditsList.vue'
import { mockCreditsCast, mockCreditsCrew } from '@/mocks/credits'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/configure/#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Components/CreditsList',
  component: CreditsList,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'radio',
      options: ['Cast', 'Crew'],
    },
    isLoading: {
      control: 'boolean',
    },
  },
  render: (args: CreditsListProps) => ({
    components: { CreditsList },
    setup() {
      return { args }
    },
    template: '<CreditsList v-bind="args" />',
  }),
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
} satisfies Meta<typeof CreditsList>

export default meta
type Story = StoryObj<typeof meta>

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

export const Default: Story = {
  args: {
    credits: mockCreditsCast,
    type: 'Cast',
    isLoading: false,
  },
}

export const Loading: Story = {
  args: {
    credits: mockCreditsCast,
    type: 'Cast',
    isLoading: true,
  },
}

export const Crew: Story = {
  args: {
    credits: mockCreditsCrew,
    type: 'Crew',
    isLoading: false,
  },
}

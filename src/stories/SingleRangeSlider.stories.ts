import SingleRangeSlider from '@/components/ui/SingleRangeSlider.vue'
import type { SingleRangeSliderProps } from '@/types/general'
import { fn } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  title: 'UI/SingleRangeSlider',
  component: SingleRangeSlider,
  tags: ['autodocs'],
  argTypes: {
    initialValue: {
      control: 'number',
    },
    min: {
      control: 'number',
    },
    max: {
      control: 'number',
    },
    step: {
      control: 'number',
    },
  },
  parameters: {
    layout: 'centered',
  },
  render: (args: SingleRangeSliderProps) => ({
    components: { SingleRangeSlider },
    setup() {
      return { args }
    },
    template: '<SingleRangeSlider v-bind="args" />',
  }),
  args: {
    onUpdateSingleRange: fn(),
  },
} satisfies Meta<typeof SingleRangeSlider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    initialValue: 1920,
    min: 1900,
    max: 2020,
    step: 1,
  },
}

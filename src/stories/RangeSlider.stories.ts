import RangeSlider from '@/components/ui/RangeSlider.vue'
import type { RangeSliderProps } from '@/types/general'
import { fn } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  title: 'UI/RangeSlider',
  component: RangeSlider,
  tags: ['autodocs'],
  argTypes: {
    initialMin: {
      control: 'number',
    },
    initialMax: {
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
  render: (args: RangeSliderProps) => ({
    components: { RangeSlider },
    setup() {
      return { args }
    },
    template: '<RangeSlider v-bind="args" class="text-film-tertiary"/>',
  }),
  args: {
    onUpdateRange: fn(),
  },
} satisfies Meta<typeof RangeSlider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    initialMin: 1920,
    initialMax: 2000,
    min: 1900,
    max: 2020,
    step: 1,
  },
}

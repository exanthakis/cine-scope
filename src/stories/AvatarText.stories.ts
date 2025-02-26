import AvatarText from '@/components/ui/AvatarText.vue'
import type { AvatarTextProps } from '@/types/general'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  title: 'UI/AvatarText',
  component: AvatarText,
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: 'number',
    },
    name: {
      control: 'text',
    },
    title: {
      control: 'text',
    },
    path: {
      control: 'text',
    },
  },
  parameters: {
    layout: 'centered',
  },
  render: (args: AvatarTextProps) => ({
    components: { AvatarText },
    setup() {
      return { args }
    },
    template: '<AvatarText v-bind="args"/>',
  }),
} satisfies Meta<typeof AvatarText>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: 1,
    name: 'Daniel Radcliffe',
    title: 'Harry Potter',
    path: '/iPg0J9UzAlPj1fLEJNllpW9IhGe.jpg',
  },
}

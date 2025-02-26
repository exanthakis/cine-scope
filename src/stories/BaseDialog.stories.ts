import BaseDialog from '@/components/ui/BaseDialog.vue'
import type { BaseDialogProps } from '@/types/general'
import { fn } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  title: 'BaseComponents/BaseDialog',
  component: BaseDialog,
  tags: ['autodocs'],
  argTypes: {
    show: {
      control: 'boolean',
    },
    classes: {
      control: 'text',
    },
  },

  parameters: {
    layout: 'centered',
  },
  render: (args: BaseDialogProps) => ({
    components: { BaseDialog },
    setup() {
      return { args }
    },
    template:
      '<BaseDialog v-bind="args"><template #header><h3>Test title</h3></template><template #default>Test content</template></BaseDialog>',
  }),
  args: {
    onClose: fn(),
  },
} satisfies Meta<typeof BaseDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    show: true,
    classes: '',
  },
}

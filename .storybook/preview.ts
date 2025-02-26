import { type Preview, setup } from '@storybook/vue3'
import BaseButton from '../src/components/ui/BaseButton.vue'
import '../src/assets/main.css'

setup((app) => {
  app.component('BaseButton', BaseButton)
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview

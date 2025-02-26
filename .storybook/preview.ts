import { type Preview, setup } from '@storybook/vue3'
import { createRouter, createWebHistory } from 'vue-router'
import BaseButton from '../src/components/ui/BaseButton.vue'
import NotFound from '../src/views/NotFound.vue'
import '../src/assets/main.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/:catchAll(.*)*',
      component: NotFound,
    },
  ],
})

setup((app) => {
  app.component('BaseButton', BaseButton)
  app.use(router)
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

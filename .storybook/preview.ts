import type { Preview } from '@storybook/vue3'
import { setup } from '@storybook/vue3'
import { createPinia } from 'pinia'
import { createRouter, createMemoryHistory } from 'vue-router'
import BaseButton from '../src/components/ui/BaseButton.vue'
import BaseDialog from '../src/components/ui/BaseDialog.vue'
import NotFound from '../src/views/NotFound.vue'
import '../src/assets/main.css'

let done = false
const pinia = createPinia()

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: '/',
      name: 'movie-list',
      component: {
        template: '<div>Mock Home Page</div>',
      },
    },
    {
      path: '/movies/:id',
      name: 'movie-details',
      component: {
        template: '<div>Mock Movie Details Page</div>',
      },
    },
    {
      path: '/popular',
      name: 'popular-list',
      component: {
        template: '<div>Mock Popular Page</div>',
      },
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: {
        template: '<div>Mock Favorites Page</div>',
      },
    },
    {
      path: '/:catchAll(.*)*',
      component: NotFound,
    },
  ],
})

setup((app) => {
  app.component('BaseButton', BaseButton)
  app.component('BaseDialog', BaseDialog)
  /** Register Pinia only once to prevent Storybook from overwriting or resetting Pinia on each setup. */
  if (!done) {
    app.use(pinia)
  }
  app.use(router)
  done = true
})

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'light',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview

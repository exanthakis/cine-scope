import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import BaseButton from './components/ui/BaseButton.vue'

const app = createApp(App)

app.component('BaseButton', BaseButton)
app.use(createPinia())
app.use(router)

app.mount('#app')

import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import moten from '@moten/ui'
import '@moten/ui/style'

import App from './App.vue'
import router from './router'
import '@moten/ui/style'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use<{ platform: 'editor' | 'user' }>(moten, { platform: 'user' })
app.mount('#app')

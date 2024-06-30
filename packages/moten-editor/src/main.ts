import './assets/styles/main.scss'
import '@moten/ui/style'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { Icon } from '@iconify/vue'

import Draggable from 'vuedraggable'
import moten from '@moten/ui'

const app = createApp(App)

app.use<{ platform: 'editor' | 'user' }>(moten, { platform: 'editor' })
app.use(createPinia())
app.use(router)

app.component('Icon', Icon)
app.component('draggable', Draggable)

app.mount('#app')

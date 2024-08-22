import './assets/styles/main.scss'
import '@moten/ui/style'
import 'element-plus/dist/index.css'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useUserStore } from '@/stores/user'
import { getToken } from '@/utils/storage'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { QuillEditor } from '@vueup/vue-quill'

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
app.component('QuillEditor', QuillEditor)
app.mount('#app')

const userStore = useUserStore()
userStore.setToken(getToken())

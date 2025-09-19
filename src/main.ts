import { createApp } from 'vue'
import './style.css'
import { router } from './router/router.ts'
import App from './pages/App.vue'
import { createPinia } from 'pinia'
import { useHabitsStore } from '@/store/habits'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
const store = useHabitsStore()
store.init()

app.mount('#app')
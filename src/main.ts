import { createApp } from 'vue'
import './style.css'
import { router } from './router/router.ts'
import App from './pages/App.vue'

createApp(App).use(router).mount('#app')
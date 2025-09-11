import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: () => import('@/pages/HomePage.vue') },
    { path: '/about', component: () => import('@/pages/AboutPage.vue') },
  ]
})
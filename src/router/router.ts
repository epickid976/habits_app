import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/',      component: () => import('@/pages/HomePage.vue'),  meta: { transition: 'fade' } },
    { path: '/about', component: () => import('@/pages/AboutPage.vue'), meta: { transition: 'slide' } },
    { path: '/habits', component: () => import('@/pages/HabitsPage.vue'), meta: { transition: 'fade' } },
  ],
  scrollBehavior() {
    return { top: 0 } // scroll to top on every nav
  }
})
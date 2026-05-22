import { createRouter, createWebHistory } from 'vue-router'
import DashboardPage from '../features/dashboard/DashboardPage.vue'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardPage,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router

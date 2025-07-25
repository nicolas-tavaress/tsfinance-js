import { createRouter, createWebHistory } from 'vue-router';
import { userRoutes } from './UserRoutes';
import home from '@/views/home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: home
  },
  {
    path: '/about',
    name: 'About',
    component: home
  },
  ...userRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

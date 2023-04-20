import { createRouter, createWebHistory } from 'vue-router';

import HomeView from './views/HomeView.vue';

const router = createRouter({
  strict: true,
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: `/`,
      component: HomeView,
    },
    {
      path: '/polls',
      component: () => import('./views/CreatePollView.vue'),
      name: 'createPoll',
    },
    {
      path: '/polls/:id([0-9a-fA-F]{64,64})',
      component: () => import('./views/PollView.vue'),
      props: true,
      name: 'poll',
    },
    {
      path: '/:path(.*)',
      component: () => import('./views/404View.vue'),
    },
  ],
});

export default router;

import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/pages/HomeView.vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/authStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { guest: true },
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      meta: { guest: true },
      component: () => import('../views/auth/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      meta: { auth: true },
      component: () => import('../views/auth/RegisterView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const { user, token } = storeToRefs(useAuthStore());
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);

  if (authRequired && (!user.value || !token.value)) next('/login');
  else next();
});

export default router

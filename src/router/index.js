import Vue from 'vue';
import Router from 'vue-router';
import Body from '../components/body';
import SamplePage from '../pages/sample_page';
import { GET_TOKEN } from '../store/store.type';
import { store } from './../store';

// component

Vue.use(Router);

const routes = [
  { path: '', redirect: { name: 'dashboard' } },
  {
    path: '/auth',
    name: 'auth',
    redirect: {
      path: '/auth/login'
    },
    component: () =>
      import(/* webpackChunkName: "Auth" */ '../pages/auth/auth.vue'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () =>
          import(
            /* webpackChunkName: "LoginComponent" */ '../pages/auth/auth-components/login.vue'
          )
      }
    ]
  },
  {
    path: '/admin',
    component: Body,
    children: [
      {
        path: '',
        name: 'dashboard',
        component: SamplePage,
        meta: {
          title: 'Dashboard | Laravue Scaffold App',
          requiresAuth: true
        }
      }
    ]
  }
  // {
  //   path: '/dashboard',
  //   component: Body,
  //   children: [
  //     {
  //       path: 'default',
  //       name: 'default',
  //       component: SamplePage,
  //       meta: {
  //         title: 'Default Dashboard | Endless - Premium Admin Template',
  //         requiresAuth: true
  //       }
  //     },
  //     {
  //       path: 'ecommerce',
  //       name: 'ecommerce',
  //       component: SamplePage,
  //       meta: {
  //         title: 'Ecommerce Dashboard | Endless - Premium Admin Template',
  //         requiresAuth: true
  //       }
  //     }
  //   ]
  // }
];

const router = new Router({
  routes,
  base: '/',
  mode: 'history',
  linkActiveClass: 'active',
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (!store.getters[`auth/${GET_TOKEN}`]) {
      return next({ name: 'auth' });
    }
  }
  next();
});
// router.afterEach(afterEach);

export default router;

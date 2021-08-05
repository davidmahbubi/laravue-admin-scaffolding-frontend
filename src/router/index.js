import Vue from 'vue';
import Router from 'vue-router';
import Body from '../components/body';
import SamplePage from '../pages/sample_page';
import ProfilePage from './../pages/Profile.vue';
import { checkToken } from '../services/token.service';

Vue.use(Router);

const appName = 'Laravue Scaffold App';

const routes = [
  { path: '', redirect: { name: 'dashboard' } },
  {
    path: '/auth',
    name: 'auth',
    redirect: {
      path: '/auth/login',
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
          ),
      },
    ],
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
          title: `Dashboard | ${appName}`,
          requiresAuth: true,
        },
      },
      {
        path: 'profile',
        name: 'admin_profile',
        meta: {
          title: `Profile | ${appName}`,
          requiresAuth: true,
        },
        component: ProfilePage,
      },
    ],
  },
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
  },
});

router.beforeEach((to, from, next) => {
  if ((to.name == 'login' || to.name == 'register') && checkToken()) {
    next({ name: 'dashboard' });
  }
  if (to.meta.requiresAuth) {
    if (!checkToken()) {
      return next({ name: 'auth' });
    }
  }
  next();
});
// router.afterEach(afterEach);

export default router;

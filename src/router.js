import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      alias: '/index.html',
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/admin/:page?',
      name: 'Admin',
      component: () =>
        import(/* webpackChunkName: "admin" */ './views/Admin-View.vue'),
      meta: {
        requiresAuth: true,
        isAdminView: true,
      },
    },
  ],
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

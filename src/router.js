import Vue from 'vue';
import fb from '@/firebaseConfig';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      alias: '/index.html',
    },
    {
      path: '/auth',
      name: 'Auth',
      component: () =>
        import(/* webpackChunkName: "auth" */ './views/Auth-View.vue'),
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

// router.beforeEach((to, from, next) => {
//   const requiresAuth = to.matched.some(route => route.meta.requiresAuth);
//   const isAdminView = to.matched.some(route => route.meta.isAdminView);
//   const { currentUser } = fb.auth;

//   if (requiresAuth && !currentUser) {
//     next({ name: 'Auth', query: { redirect: to.path } });
//   } else if (isAdminView) {
//     const { uid } = currentUser;
//     fb.usersCollection.doc(uid).get()
//       .then((doc) => {
//         const role = doc.data().role || 'viewer';
//         if (role === 'admin') {
//           next();
//         } else {
//           next('/');
//         }
//       })
//       .catch((error) => {
//         next('/');
//         console.log('Error getting user role', error);
//       });
//   } else if (requiresAuth && currentUser) {
//     next();
//   } else {
//     next();
//   }
// });

export default router;

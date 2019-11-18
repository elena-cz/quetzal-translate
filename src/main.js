import Vue from 'vue';
import App from './App.vue';
import router from './router';
import fb from './firebaseConfig';
import store from './vuex';
import './registerServiceWorker';
import vuetify from './plugins/vuetify';

import '@/styles/index.scss';

Vue.config.productionTip = false;

let app;
fb.auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      store,
      vuetify,
      render: h => h(App),
    }).$mount('#app');
  }
});

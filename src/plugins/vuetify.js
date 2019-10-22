import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: '#00CEE6',
        // secondary: '#1DE9B6',
        secondary: '#1ad2a4',
        accent: '#F44336',
        error: '#F44336',
      },
    },
  },
});

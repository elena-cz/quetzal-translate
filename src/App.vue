<script>
import Layout from '@/components/Layout.vue';

export default {
  name: 'App',

  components: {
    Layout,
  },

  watch: {
    $route: {
      handler: 'getRoute',
      immediate: true,
    },
  },

  created() {
    window.addEventListener('beforeinstallprompt', e => {
      console.log('Stashing installPrompt');
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      this.$store.dispatch('sw/updateInstallPrompt', e);
    });

    // window.addEventListener('appinstalled', (e) => {
    //   console.log('PWA installed');
    //   // Only relevant if clicked button from prompt
    //   // this.$store.commit('sw/setAcceptedInstallPrompt', true);
    //   this.$store.dispatch('analytics/acceptAddToHomeScreen');
    // });
  },

  methods: {
    getRoute() {
      const { $store, $route } = this;
      $store.dispatch('ui/parseRoute', $route);
      // console.log($route);
      // const appContainer = document.getElementById('main-app-container');
      // if (appContainer) {
      //   appContainer.scrollTop = 0;
      // }
    },
  },
};
</script>

<template>
  <v-app>
    <Layout>
      <template v-slot:main-content>
        <transition name="fade">
          <router-view />
        </transition>
      </template>
    </Layout>
  </v-app>
</template>

<style lang="scss" scoped>
.fade-enter-active {
  transition: opacity 400ms cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-leave-active {
  transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

<script>
import Layout from '@/components/Layout.vue';

export default {
  name: 'App',

  components: {
    Layout,
  },

  data: () => ({
    //
  }),

  watch: {
    $route: {
      handler: 'getRoute',
      immediate: true,
    },
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
        <router-view />
      </template>
    </Layout>
  </v-app>
</template>

<style lang="scss" scoped>
// .v-content--wrap {
//   background-color: white;
//   border-top-left-radius: 24px;
//   border-top-right-radius: 24px;
// }
</style>

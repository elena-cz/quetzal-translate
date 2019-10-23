<script>
import { mapState, mapGetters, mapActions } from 'vuex';
// import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Admin-View',

  components: {
    // HelloWorld,
  },

  props: {
    // thing: {
    //   type: Array,
    //   required: true,
    // },
  },

  data() {
    return {};
  },

  computed: {
    page() {
      return this.$route.params.page || 'phrases';
    },
    // ...mapState('module', [
    //   'foo',
    // ]),
    // ...mapGetters('module', [
    //   'foo',
    // ]),
    // property() {},
  },

  methods: {
    // ...mapActions('module', [
    //   'foo',
    // ]),
    // method() {},
  },
};
</script>

<template>
  <div class="app-container">
    <v-app-bar app flat color="transparent">
      <v-toolbar-title class="headline white--text">
        <span>Quetzal Admin</span>
      </v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container class="admin-grid">
        <aside class="sidebar">sidebar</aside>
        <div class="main">main</div>
      </v-container>
    </v-content>
  </div>
</template>

<style lang="scss" scoped>
.admin-grid {
  display: grid;
  grid-template-columns: 230px auto;
  grid-template-rows: auto;
  grid-template-areas: 'sidebar main';
  grid-gap: 1rem;
  align-content: flex-start;
  min-height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;
}

.sidebar {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: calc(230px + 1rem);
  height: 100%;
  max-height: 100%;
  padding: 1rem;
  box-sizing: border-box;
  overflow: hidden;
}

.main {
  grid-area: main;
  width: 100%;
}
</style>

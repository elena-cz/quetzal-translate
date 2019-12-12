<script>
import { mapState, mapGetters, mapActions } from 'vuex';
// import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Offline-View',

  components: {
    // HelloWorld,
  },

  props: {
    // thing: {
    //   type: Array,
    //   required: true,
    // },
  },

  data: () => ({
    //
  }),

  computed: {
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
    testWorker() {
      this.$store.dispatch('audio/testWorker');
    },
  },
};
</script>

<template>
  <div>
    <v-btn rounded color="primary" @click="testWorker">Test Worker</v-btn>
  </div>
</template>

<style lang="scss" scoped>
// @import '@/styles/colors.scss';
</style>

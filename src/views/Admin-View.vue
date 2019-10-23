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
  <div>{{page}}</div>
</template>

<style lang="scss" scoped>
// @import '@/design/colors.scss';
</style>

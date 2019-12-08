<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import BackLayer from '@/components/BackLayer.vue';

export default {
  name: 'About-View',

  components: {
    BackLayer,
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
  <div>
    <BackLayer />
  </div>
</template>

<style lang="scss" scoped>
// @import '@/design/colors.scss';
</style>

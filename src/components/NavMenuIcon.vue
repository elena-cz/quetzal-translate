<script>
// import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'NavMenuIcon',

  components: {
    // HelloWorld,
  },

  props: {
    isBackLayerActive: {
      type: Boolean,
      required: true,
    },
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
  <v-btn
    text
    icon
    :retain-focus-on-click="false"
    dark
    class="hamburger hamburger--collapse"
    :class="{'is-active': isBackLayerActive }"
    @click="$root.$emit('toggleBackLayer', 'menu')"
  >
    <span class="hamburger-box">
      <span class="hamburger-inner" />
    </span>
  </v-btn>
</template>

<style lang="scss" scoped>
@import '@/styles/hamburger.scss';
</style>

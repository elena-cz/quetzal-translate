<script>
import { mapState, mapGetters, mapActions } from 'vuex';
// import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'InFeedPromo',

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
    // method() {},
  },
};
</script>

<template>
  <v-sheet dark class="promo gradient pa-4 mt-6 mb-8">
    Install our app
  </v-sheet>
</template>

<style lang="scss" scoped>
@import '@/styles/colors.scss';

.promo {
  border-radius: 8px;
}
</style>

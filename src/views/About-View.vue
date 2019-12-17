<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import Layout from '@/components/Layout.vue';

export default {
  name: 'About-View',

  components: {
    Layout,
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
    showSnack() {
      this.$store.dispatch('ui/updateSnack', {
        text: 'Test snack',
        actionText: 'Test',
        handler: () => {
          console.log('test handler');
        },
        keepOpen: true,
      });
    },
  },
};
</script>

<template>
  <div>
    <!-- <Layout page-title="About">
    <template v-slot:main-content>-->
    <v-btn rounded color="primary" @click.stop="showSnack">Show Snack</v-btn>
    <ol>
      <li>Good day!</li>
      <li>Please sit here.</li>
      <li>I am your dentist today</li>
      <li>Are you allergic to any medicines?</li>
      <li>Where does it hurt?</li>
      <li>When does it hurt?</li>
      <li>All the time?</li>
      <li>Or now and then?</li>
      <li>Does the cold water or air hurt you?</li>
      <li>Does it wake you up at night?</li>
      <li>Does it hurt when you bite?</li>
      <li>We need to fix your broken tooth</li>
      <li>We need to take x-rays.</li>
      <li>We need to remove this tooth.</li>
      <li>You have some cavities that we must treat.</li>
      <li>We need to fill ____ teeth. (show fingers)</li>
      <li>We need to extract ____ teeth. (show fingers)</li>
      <li>This tooth cannot be repaired. We must extract it.</li>
      <li>This tooth is loose.</li>
    </ol>
    <!-- </template> -->
    <!-- </Layout> -->
  </div>
</template>

<style lang="scss" scoped>
// @import '@/design/colors.scss';
</style>

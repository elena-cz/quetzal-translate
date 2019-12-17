<script>
import { mapState } from 'vuex';

export default {
  name: 'Snackbar',

  computed: {
    ...mapState('ui', ['snack']),
  },

  methods: {
    handleActionClick() {
      const { snack, $store } = this;
      snack.handler();
      $store.dispatch('ui/updateSnack', {});
    },

    clearSnack(isVisible) {
      if (!isVisible) {
        this.$store.dispatch('ui/updateSnack', {});
      }
    },
  },
};
</script>

<template>
  <v-snackbar
    :value="snack.text"
    :timeout="snack.keepOpen ? 0 : 5000"
    @input="clearSnack"
  >
    {{ snack.text }}
    <v-btn
      v-if="snack.actionText"
      color="#b1ffff"
      text
      @click="handleActionClick"
      >{{ snack.actionText }}</v-btn
    >
  </v-snackbar>
</template>

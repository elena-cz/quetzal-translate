<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'ShareMenuWidget',
  computed: {
    isShareSupported() {
      return 'share' in navigator;
    },
  },

  methods: {
    share() {
      const { isShareSupported } = this;
      if (isShareSupported) {
        navigator
          .share({
            title: 'Quetzal App',
            text: `Q'eqchi' & Spanish Dentistry Phrases`,
            url: 'https://quetzal.app',
          })
          .then(() => {
            // $store.dispatch('analytics/shareApp');
          })
          .catch(error => console.log('Error sharing', error));
      }
    },
  },
};
</script>

<template>
  <v-list-item v-if="isShareSupported" @click="share">
    <v-list-item-icon>
      <v-icon class="material-icons-round">share</v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title>Share App</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>


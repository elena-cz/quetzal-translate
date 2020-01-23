<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'OfflinePromo',

  computed: {
    ...mapState('ui', {
      isComplete: state => state.banners.offlinePromo.isComplete,
    }),

    ...mapGetters('device', ['shouldShowOfflineFlow']),
  },

  methods: {
    handleDismissClick() {
      this.$store.dispatch('ui/updateBannerStatus', {
        banner: 'offlinePromo',
        status: 'dismissed',
      });
      // send analytics event
    },

    handleInstallClick() {
      this.$router.push('/offline');
      this.$store.dispatch('ui/updateBannerStatus', {
        banner: 'offlinePromo',
        status: 'done',
      });
      // send analytics event
    },
  },
};
</script>

<template>
  <v-sheet v-if="!isComplete && shouldShowOfflineFlow" dark class="promo gradient pa-4 mt-6 mb-8">
    <div class="d-flex align-center mb-3">
      <v-icon class="offline-icon material-icons-round mr-3">offline_pin</v-icon>
      <div>
        <h3 class="d-inline">Get offline translations</h3>
        <p class="mb-0 description">Install the app & download audio</p>
      </div>
    </div>
    <div class="d-flex justify-end mt-4">
      <v-btn text dark class="font-weight-bold" @click="handleDismissClick">Not now</v-btn>
      <v-btn
        rounded
        depressed
        color="white"
        class="font-weight-bold primary--text"
        @click="handleInstallClick"
      >Install</v-btn>
    </div>
  </v-sheet>
</template>

<style lang="scss" scoped>
.offline-icon {
  font-size: 48px;
}

.promo {
  border-radius: 8px;
}

.description {
  font-weight: 600;
}
</style>

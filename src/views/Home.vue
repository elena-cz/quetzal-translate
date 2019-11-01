<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import Translator from '../components/Translator';

export default {
  components: {
    Translator,
  },

  computed: {
    ...mapGetters('audio', [
      'showDownloadNotification',
      'downloadTooltip',
      'userCacheIsUpToDate',
    ]),

    ...mapState('sw', ['updateNotification']),
  },

  methods: {
    addAudioToCache() {
      this.$store.dispatch('audio/updateAudioCache');
    },
  },
};
</script>


<template>
  <div class="app-container">
    <v-app-bar app flat color="transparent" class="d-flex justify-stretch align-center">
      <v-toolbar-title class="headline white--text app-headline">Quetzal</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon color="white" large v-on="on" @click.prevent="addAudioToCache">
            <v-badge :value="showDownloadNotification" color="accent" overlap class="small-badge">
              <template v-slot:badge>
                <span></span>
              </template>
              <v-icon v-if="userCacheIsUpToDate" class="material-icons-round" large>check</v-icon>
              <v-icon v-else class="material-icons-round" large>download</v-icon>
            </v-badge>
          </v-btn>
        </template>
        <span>{{ downloadTooltip }}</span>
      </v-tooltip>
    </v-app-bar>

    <v-content>
      <Translator />

      <v-snackbar :value="updateNotification.text" :timeout="0">
        {{ updateNotification.text }}
        <v-btn color="#b1ffff" text @click="updateNotification.handler">Refresh</v-btn>
      </v-snackbar>
    </v-content>
  </div>
</template>

<style lang="scss" scoped>
.app-headline {
  font-weight: 600 !important;
  letter-spacing: 2px !important;
}
</style>

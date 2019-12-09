<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import Layout from '@/components/Layout';
import Translator from '@/components/Translator';

export default {
  components: {
    Layout,
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
  <Layout page-title="Dentistry">
    <template v-slot:right-icons>
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
    </template>

    <template v-slot:main-content>
      <Translator />
    </template>

    <v-snackbar :value="updateNotification.text" :timeout="0">
      {{ updateNotification.text }}
      <v-btn color="#b1ffff" text @click="updateNotification.handler">Refresh</v-btn>
    </v-snackbar>
  </Layout>
</template>

<style lang="scss" scoped>
</style>

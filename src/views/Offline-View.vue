<script>
import { mapState, mapGetters } from 'vuex';
import InstallDirections from '@/components/install/InstallDirections.vue';
import OfflineAudio from '@/components/OfflineAudio.vue';

// Show offline flow if...

export default {
  name: 'Offline-View',

  components: {
    InstallDirections,
    OfflineAudio,
  },

  data: () => ({
    step: 1,
    numSteps: 2,
    markedAppInstalled: false,
    markAudioDownloaded: false,
    showOfflineFlow: true,
  }),

  computed: {
    ...mapState('device', ['isStandaloneMode']),

    ...mapGetters('device', ['device', 'isIOS']),

    ...mapGetters('audio', ['hasDownloadedLangs']),

    noOffline() {
      return this.device === 'NoSW';
    },
  },

  created() {
    if (!this.deviceInfoSet) {
      this.$store.dispatch('device/init');
    }

    const { noOffline, isStandaloneMode, hasDownloadedLangs, device } = this;

    if (noOffline || (isStandaloneMode && hasDownloadedLangs)) {
      this.showOfflineFlow = false;
    }

    if (!isStandaloneMode && !(device === 'WebDefault')) {
      this.numSteps = 3; // Add "Open app" step if on supported device
    }

    if (isStandaloneMode) {
      this.step = 2;
    }
  },

  methods: {},
};
</script>

<template>
  <div class="offline-view scroll-container mx-n4">
    <div class="px-4 pb-4">
      <div v-if="noOffline">
        <p>It looks like your browser or device doesn't support offline for this app.</p>
      </div>

      <div v-if="showOfflineFlow">
        <p>Get translations offline by installing the app and downloading the audio recordings for the languages you choose.</p>

        <v-stepper v-model="step" vertical non-linear>
          <!-- INSTALL -->
          <v-stepper-step
            :complete="isStandaloneMode || markedAppInstalled"
            step="1"
            @click="step = 1"
          >Install app</v-stepper-step>
          <v-stepper-content step="1">
            <InstallDirections />

            <div class="d-flex justify-end py-1">
              <v-btn text @click="step = 2">Skip</v-btn>
              <v-btn
                rounded
                outlined
                color="primary"
                @click="() => { step = 2; markedAppInstalled = true;}"
              >Done</v-btn>
            </div>
          </v-stepper-content>

          <!-- OPEN -->
          <v-stepper-step
            v-if="numSteps === 3"
            :complete="isStandaloneMode"
            step="2"
            @click="step = 2"
          >Open App</v-stepper-step>
          <v-stepper-content v-if="numSteps === 3" step="2" class="text-content">
            <ol>
              <li>
                Open the
                <b>Quetzal</b> app on your Home screen
              </li>
              <li>
                Open this
                <b>Offline</b> page in the app to continue
              </li>
            </ol>
            <div class="d-flex justify-end py-1">
              <v-btn text @click="step = 3">Skip</v-btn>
              <v-btn rounded outlined color="primary" @click="step = 3">Done</v-btn>
            </div>
          </v-stepper-content>

          <!-- AUDIO -->
          <v-stepper-step
            :complete="step > numSteps"
            :step="numSteps"
            @click="step = numSteps"
          >Download audio</v-stepper-step>
          <v-stepper-content :step="numSteps">
            <OfflineAudio class="mb-3" />

            <div class="d-flex justify-end py-1">
              <v-btn text @click="step = numSteps + 1">Skip</v-btn>
              <v-btn rounded outlined color="primary" @click="step = numSteps + 1">Done</v-btn>
            </div>
          </v-stepper-content>
        </v-stepper>
      </div>

      <div v-if="!noOffline && !showOfflineFlow" class="text-content">
        <h2>Offline Audio</h2>

        <OfflineAudio class="mb-6" />
      </div>

      <div v-if="!noOffline" class="text-content">
        <h2>Offline Tips</h2>

        <ul>
          <li>
            If your Internet connection is slow, turn on
            <b>Airplane</b> mode
          </li>

          <li>
            If the audio isn't playing, check these settings:
            <ul>
              <li class="mt-3">The volume for media is turned up</li>
              <li>
                <b>Do Not Disturb</b> mode is turned off
              </li>
              <li v-if="isIOS">
                If you have a hardware
                <b>Ring/Silent switch</b> on your phone, make sure it's in "Ring" mode
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/styles/colors.scss';

.offline-view {
  .v-stepper {
    box-shadow: none;
  }

  .v-stepper__step {
    padding-right: 0;
    padding-left: 0;
  }

  .v-stepper__label {
    font-weight: 700 !important;
    font-size: 1.2rem !important;
  }

  .v-stepper__step--active {
    text-shadow: 0px 0px 0px $black !important;
  }

  .v-stepper__content {
    margin-left: 12px;
    margin-right: 0;
    padding-right: 16px;
  }

  // .v-btn {
  //   text-transform: none;
  // }

  // .v-btn--outlined {
  //   border-width: 1px;
  // }
}
</style>

<script>
import { mapState, mapGetters } from 'vuex';
import InstallDirections from '@/components/install/InstallDirections.vue';

export default {
  name: 'Offline-View',

  components: {
    InstallDirections,
  },

  data: () => ({
    step: 1,
  }),

  computed: {
    ...mapState('languages', ['langNames']),

    ...mapState('audio', ['langStatus']),

    ...mapGetters('audio', ['downloadedLangs', 'availableLangs']),
  },

  methods: {
    downloadLang(lang) {
      this.$store.dispatch('audio/downloadLang', lang);
    },

    updateLang(lang) {
      this.$store.dispatch('audio/updateLang', lang);
    },

    deleteLang(lang) {
      this.$store.dispatch('audio/deleteLang', lang);
    },
  },
};
</script>

<template>
  <div class="scroll-container mx-n4">
    <div class="px-4">
      <v-stepper v-model="step" vertical non-linear>
        <v-stepper-step :complete="step > 1" step="1">Install app</v-stepper-step>

        <v-stepper-content step="1">
          <InstallDirections />

          <div class="d-flex justify-end py-1">
            <v-btn text>Cancel</v-btn>
            <v-btn rounded outlined color="primary" @click="step = 2">Continue</v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-step :complete="step > 2" step="2">Download audio</v-stepper-step>

        <v-stepper-content step="2">
          <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
          <v-btn color="primary" @click="step = 1">Continue</v-btn>
          <v-btn text>Cancel</v-btn>
        </v-stepper-content>
      </v-stepper>

      <v-subheader>Downloaded Languages</v-subheader>
      <v-list flat class="mb-5">
        <v-list-item v-if="!downloadedLangs.length" key="noDownloads">
          <v-list-item-content class="caption">No languages downloaded yet</v-list-item-content>
        </v-list-item>
        <template v-for="(lang, index) in downloadedLangs">
          <v-list-item :key="lang">
            <v-list-item-content>
              <v-list-item-title v-text="langNames[lang]"></v-list-item-title>
            </v-list-item-content>

            <v-list-item-action class="d-flex flex-row align-center">
              <v-progress-circular v-if="langStatus[lang].isUpdating" indeterminate color="primary">
                <v-icon class="material-icons-round">download</v-icon>
              </v-progress-circular>

              <template v-else>
                <v-btn
                  v-if="langStatus[lang].hasUpdates"
                  color="accent"
                  rounded
                  outlined
                  small
                  class="mr-4"
                  @click.prevent="updateLang(lang)"
                >Update</v-btn>

                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on" @click.prevent="deleteLang(lang)">
                      <v-icon class="material-icons-round">delete</v-icon>
                    </v-btn>
                  </template>
                  <span>Remove</span>
                </v-tooltip>
              </template>
            </v-list-item-action>
          </v-list-item>
          <v-divider :key="index"></v-divider>
        </template>
      </v-list>

      <v-subheader>Available Languages</v-subheader>
      <v-list flat>
        <v-list-item v-if="!availableLangs.length" key="allDownloaded">
          <v-list-item-content class="caption">All languages downloaded</v-list-item-content>
        </v-list-item>
        <template v-for="(lang, index) in availableLangs">
          <v-list-item :key="lang" color="primary">
            <v-list-item-content>
              <v-list-item-title v-text="langNames[lang]"></v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on" @click.prevent="downloadLang(lang)">
                    <v-icon class="material-icons-round">download</v-icon>
                  </v-btn>
                </template>
                <span>Download</span>
              </v-tooltip>
            </v-list-item-action>
          </v-list-item>
          <v-divider :key="index"></v-divider>
        </template>
      </v-list>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.v-stepper {
  box-shadow: none;
}

.v-stepper__step {
  padding-right: 0;
  padding-left: 0;
}

.v-stepper__label {
  font-weight: 700;
}

.v-stepper__content {
  margin-left: 12px;
  margin-right: 0;
  padding-right: 16px;
}

.v-subheader {
  color: var(--v-primary-base);
  font-weight: 700;
  font-size: 1rem;
  padding: 0;
}

.v-list-item {
  min-height: 60px !important;
}

.v-list-item__title {
  font-size: 1rem;
}

// .v-btn {
//   text-transform: none;
// }

.v-btn--outlined {
  border-width: 1px;
}
</style>

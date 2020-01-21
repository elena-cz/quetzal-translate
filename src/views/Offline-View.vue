<script>
import { mapState, mapGetters } from 'vuex';
import InstallDirections from '@/components/install/InstallDirections.vue';
import OfflineAudio from '@/components/OfflineAudio.vue';

export default {
  name: 'Offline-View',

  components: {
    InstallDirections,
    OfflineAudio,
  },

  data: () => ({
    step: 1,
  }),

  computed: {},

  methods: {},
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
          <OfflineAudio />

          <div class="d-flex justify-end py-1">
            <v-btn text>Cancel</v-btn>
            <v-btn rounded outlined color="primary" @click="step = 2">Continue</v-btn>
          </div>
        </v-stepper-content>
      </v-stepper>
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

// .v-btn--outlined {
//   border-width: 1px;
// }
</style>

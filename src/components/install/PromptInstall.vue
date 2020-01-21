<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'PromptInstall',

  computed: {
    ...mapState('sw', ['installPrompt', 'acceptedInstallPrompt']),

    installButtonText() {
      if (this.acceptedInstallPrompt) {
        return 'Added to home screen';
      }
      return 'Add app to home screen';
    },
  },

  methods: {
    ...mapActions('sw', ['showInstallPrompt']),
  },
};
</script>

<template>
  <div>
    <p>Click the button to install:</p>

    <v-btn
      color="primary"
      rounded
      class="mb-4"
      :disabled="acceptedInstallPrompt"
      @click="showInstallPrompt"
    >{{ installButtonText }}</v-btn>

    <p>
      Then, check out the
      <b>Quetzal</b> app on your Home screen
    </p>

    <p class="body-2">
      Note: This is a web app so you can install it right from here. Once you do, it works just like
      other apps&mdash;even offline. Plus, you never have to install updates and it works on every
      device.
    </p>
  </div>
</template>

<style lang="scss" scoped>
</style>

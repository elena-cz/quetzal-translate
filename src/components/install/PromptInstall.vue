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
    <h5>Install app</h5>

    <p>Click the button to install:</p>

    <v-btn
      outlined
      :disabled="acceptedInstallPrompt"
      @click="showInstallPrompt"
    >{{ installButtonText }}</v-btn>

    <p>
      Then, check out the
      <b>Quetzal</b> app on your Home screen & enjoy!
    </p>
  </div>
</template>

<style lang="scss" scoped>
</style>

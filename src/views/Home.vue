<script>
import Translator from '../components/Translator';

export default {
  components: {
    Translator,
  },

  methods: {
    addAudioToCache() {
      this.$store.dispatch('audio/addAudioToCache');
    },
  },
};
</script>


<template>
  <div class="app-container">
    <v-app-bar app flat color="transparent" class="d-flex justify-stretch align-center">
      <v-toolbar-title class="headline white--text app-headline">Quetzal</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon color="white" large @click.prevent="addAudioToCache">
        <v-icon class="material-icons-round">download</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <Translator />

      <audio controls>
        <source
          src="https://firebasestorage.googleapis.com/v0/b/quetzal-translate.appspot.com/o/es-VzNQvMN7OSv9N3GN0Tgc%2Fes-VzNQvMN7OSv9N3GN0Tgc-201910301337.webm?alt=media&token=9b3295e2-3329-44fd-adce-da246faf1018"
          type="audio/webm"
        />Your browser does not support the audio element.
      </audio>
    </v-content>
  </div>
</template>

<style lang="scss" scoped>
.app-headline {
  font-weight: 600 !important;
  letter-spacing: 2px !important;
}
</style>

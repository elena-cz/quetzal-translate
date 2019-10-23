<script>
import Translator from '../components/Translator';

export default {
  components: {
    Translator,
  },
};
</script>


<template>
  <div class="app-container">
    <v-app-bar app flat color="transparent">
      <v-toolbar-title class="headline white--text">
        <span>Quetzal</span>
      </v-toolbar-title>
      <!-- <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        text
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>-->
    </v-app-bar>

    <v-content>
      <Translator />
    </v-content>
  </div>
</template>

<style lang="scss" scoped>
</style>

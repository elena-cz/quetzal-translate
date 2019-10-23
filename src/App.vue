<script>
import Translator from './components/Translator';

export default {
  name: 'App',
  components: {
    Translator,
  },
  data: () => ({
    //
  }),
};
</script>

<template>
  <v-app>
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

    <!-- <v-content class="elevation-8"> -->
    <v-content>
      <!-- <v-content class="elevation-8 content"> -->
      <Translator />
    </v-content>
  </v-app>
</template>

<style lang="scss" scoped>
.v-content--wrap {
  background-color: white;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
}
</style>

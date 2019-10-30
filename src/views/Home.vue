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
    <v-app-bar app flat color="transparent" class="d-flex justify-stretch align-center">
      <v-toolbar-title class="headline white--text app-headline">Quetzal</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon color="white" large>
        <v-icon class="material-icons-round">download</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <Translator />
    </v-content>
  </div>
</template>

<style lang="scss" scoped>
.app-headline {
  font-weight: 600 !important;
  letter-spacing: 2px !important;
}
</style>

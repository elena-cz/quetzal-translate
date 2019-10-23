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
    <router-view />
  </v-app>
</template>

<style lang="scss" scoped>
.v-content--wrap {
  background-color: white;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
}
</style>

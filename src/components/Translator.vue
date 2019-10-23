<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  data: () => ({
    tab: null,
  }),

  computed: {
    ...mapState('phrases', ['subtopicIds', 'subtopics', 'phrases']),
  },
};
</script>

<template>
  <v-container class="container px-5">
    <v-tabs v-model="tab" background-color="transparent" color="primary" grow>
      <v-tab key="lang1" class="lang1-tab">Q'eqchi'</v-tab>
      <v-tab key="lang2" class="lang2-tab">Spanish</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" class="tab-items pt-5">
      <v-tab-item key="lang1" class="tab-item">
        <v-expansion-panels accordion multiple elevation="0">
          <v-expansion-panel v-for="(subtopicId) in subtopicIds" :key="subtopicId">
            <v-expansion-panel-header class="outer-header">{{ subtopics[subtopicId].title }}</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-expansion-panels accordion>
                <v-expansion-panel
                  v-for="(phraseId) in subtopics[subtopicId].phraseIds"
                  :key="phraseId"
                >
                  <v-expansion-panel-header
                    hide-actions
                    class="inner-header d-flex justify-space-between align-center"
                  >
                    <span>{{ phrases[phraseId].text}}</span>
                    <v-btn text icon color="primary" width="52" max-width="52" class="ml-2" x-large>
                      <v-icon class="material-icons-round" x-large>play_arrow</v-icon>
                    </v-btn>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>{{ phrases[phraseId].es.text}}</v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

        <!-- <v-card flat>Q'echi' Content</v-card> -->
      </v-tab-item>
      <v-tab-item key="lang2" class="tab-item">
        <!-- <v-card flat> -->
        Spanish Content
        <!-- </v-card> -->
      </v-tab-item>
    </v-tabs-items>
    <v-layout text-center wrap>
      <!-- <v-flex xs12>
        <v-img :src="require('../assets/logo.svg')" class="my-3" contain height="200"></v-img>
      </v-flex>

      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">Welcome to Vuetify</h1>
        <v-btn class="gradient" rounded>Button</v-btn>
        <p class="subheading font-weight-regular">
          For help and collaboration with other Vuetify developers,
          <br />please join our online
          <a
            href="https://community.vuetifyjs.com"
            target="_blank"
          >Discord Community</a>
        </p>
      </v-flex>

      <v-flex mb-5 xs12>
        <h2 class="headline font-weight-bold mb-3">What's next?</h2>

        <v-layout justify-center>
          <a
            v-for="(next, i) in whatsNext"
            :key="i"
            :href="next.href"
            class="subheading mx-3"
            target="_blank"
          >{{ next.text }}</a>
        </v-layout>
      </v-flex>

      <v-flex xs12 mb-5>
        <h2 class="headline font-weight-bold mb-3">Important Links</h2>

        <v-layout justify-center>
          <a
            v-for="(link, i) in importantLinks"
            :key="i"
            :href="link.href"
            class="subheading mx-3"
            target="_blank"
          >{{ link.text }}</a>
        </v-layout>
      </v-flex>

      <v-flex xs12 mb-5>
        <h2 class="headline font-weight-bold mb-3">Ecosystem</h2>

        <v-layout justify-center>
          <a
            v-for="(eco, i) in ecosystem"
            :key="i"
            :href="eco.href"
            class="subheading mx-3"
            target="_blank"
      >{{ eco.text }}</a>-->
      <!-- </v-layout> -->
      <!-- </v-flex> -->
    </v-layout>
  </v-container>
</template>

<style lang="scss" scoped>
.container,
.tab-items {
  height: 100%;
}

.lang1-tab {
  color: var(--v-primary-base) !important;
}

.lang2-tab {
  color: var(--v-secondary-base) !important;
}
</style>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import TranslationItem from '@/components/TranslationItem.vue';

export default {
  name: 'Translator',

  components: {
    TranslationItem,
  },

  data: () => ({
    tab: null,
    langs: ['kek', 'es'],
  }),

  computed: {
    ...mapState('topics', ['subtopicIds', 'subtopics']),
    ...mapState('phrases', ['phrases', 'translations']),
  },

  methods: {
    getTranslation(lang, phraseId) {
      const { phrases = {}, translations = {} } = this;
      const phrase = phrases[phraseId] || {};
      const id = phrase[`${lang}Id`] || '';
      return translations[id];
    },
  },
};
</script>

<template>
  <v-container class="px-5">
    <v-tabs v-model="tab" background-color="transparent" color="primary" grow>
      <v-tab key="kek" class="lang1-tab">Q'eqchi'</v-tab>
      <v-tab key="es" class="lang2-tab">Spanish</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" class="tab-items pt-5">
      <v-tab-item v-for="(lang, index) in langs" :key="lang" class="tab-item">
        <v-expansion-panels accordion multiple elevation="0">
          <v-expansion-panel v-for="(subtopicId) in subtopicIds" :key="subtopicId">
            <v-expansion-panel-header class="outer-header pr-3">{{ subtopics[subtopicId].title }}</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-expansion-panels accordion>
                <TranslationItem
                  v-for="(phraseId) in subtopics[subtopicId].phraseIds"
                  :key="phraseId"
                  :phrase="phrases[phraseId]"
                  :translation="getTranslation(lang, phraseId)"
                  :lang="lang"
                  :index="index"
                />
              </v-expansion-panels>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-tab-item>
    </v-tabs-items>

    <v-layout text-center wrap></v-layout>
  </v-container>
</template>

<style lang="scss" scoped>
.lang1-tab {
  color: var(--v-primary-base) !important;
}

.lang2-tab {
  color: var(--v-secondary-base) !important;
}
</style>
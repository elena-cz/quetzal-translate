<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import PhraseItem from '@/components/PhraseItem.vue';

export default {
  name: 'Translator',

  components: {
    PhraseItem,
  },

  data: () => ({
    tab: null,
    langs: ['kek', 'es'],
    openItemIndex: null,
  }),

  computed: {
    ...mapState('topics', ['subtopicIds', 'subtopics']),
    ...mapState('phrases', ['phrases', 'translations']),
    ...mapState('favorites', ['favoritePhrases']),
  },

  created() {
    const { $root, setOpenItemIndex } = this;
    $root.$on('playingIndex', setOpenItemIndex);
  },

  methods: {
    getTranslation(lang, phraseId) {
      const { phrases = {}, translations = {} } = this;
      const phrase = phrases[phraseId] || {};
      const id = phrase[`${lang}Id`] || '';
      return translations[id];
    },

    setOpenItemIndex(index) {
      this.openItemIndex = index;
    },

    handleSubtopicClick(subtopicId) {
      const { $el } = this.$refs[subtopicId][0];
      this.$nextTick(() => {
        $el.scrollIntoView();
      });
      setTimeout(() => {
        $el.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 400);
      this.setOpenItemIndex(null);
    },
  },
};
</script>

<template>
  <v-container class="pa-0 mt-n1">
    <v-tabs v-model="tab" background-color="transparent" color="primary" grow>
      <v-tab key="kek" class="lang1-tab">Q'eqchi'</v-tab>
      <v-tab key="es" class="lang2-tab">Spanish</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" class="tab-items pt-5">
      <v-tab-item
        v-for="(lang, langIndex) in langs"
        :key="lang"
        class="tab-item pb-12"
      >
        <v-expansion-panels accordion elevation="0">
          <v-expansion-panel
            :key="`${lang}Favorites`"
            @click="handleSubtopicClick(`${lang}Favorites`)"
          >
            <v-expansion-panel-header
              :ref="`${lang}Favorites`"
              class="outer-header pr-2"
            >
              Favorites
              <v-icon class="material-icons-round ml-2 star" color="yellow"
                >star</v-icon
              >
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-expansion-panels
                v-if="favoritePhrases[lang]"
                accordion
                v-model="openItemIndex"
              >
                <PhraseItem
                  v-for="(phraseId, itemIndex) in favoritePhrases[lang]"
                  :key="phraseId"
                  :phrase="phrases[phraseId]"
                  :translation="getTranslation(lang, phraseId)"
                  :lang="lang"
                  :langIndex="langIndex"
                  :itemIndex="itemIndex"
                />
              </v-expansion-panels>
              <div v-else class="caption pl-4">
                No favorites added
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel
            v-for="subtopicId in subtopicIds"
            :key="subtopicId"
            @click="handleSubtopicClick(subtopicId)"
          >
            <v-expansion-panel-header
              :ref="subtopicId"
              class="outer-header pr-3"
            >
              {{ subtopics[subtopicId].title }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-expansion-panels accordion v-model="openItemIndex">
                <PhraseItem
                  v-for="(phraseId, itemIndex) in subtopics[subtopicId]
                    .phraseIds"
                  :key="phraseId"
                  :phrase="phrases[phraseId]"
                  :translation="getTranslation(lang, phraseId)"
                  :lang="lang"
                  :langIndex="langIndex"
                  :itemIndex="itemIndex"
                />
              </v-expansion-panels>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<style lang="scss" scoped>
.lang1-tab {
  color: var(--v-primary-base) !important;
}

.lang2-tab {
  color: var(--v-secondary-base) !important;
}

.container {
  overflow: unset;
  height: 100%;
}

.tab-items {
  height: 100%;
  max-height: 100%;
  overflow-y: auto;
}

.star {
  flex-grow: 0;
  font-size: 28px !important;
}

// .tab-item {
//   margin-bottom: 20px;
// }
</style>

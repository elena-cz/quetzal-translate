<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import AudioPlayer from '@/components/AudioPlayer.vue';

export default {
  name: 'PhraseItem',

  components: {
    AudioPlayer,
  },

  props: {
    phrase: {
      type: Object,
      default() {
        return {};
      },
    },
    translation: {
      type: Object,
      default() {
        return {};
      },
    },
    lang: {
      type: String,
      required: true,
    },
    langIndex: {
      type: Number,
      required: true,
    },
    itemIndex: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {};
  },

  computed: {
    ...mapGetters('favorites', ['indexInFavorites']),

    playlist() {
      const { translation } = this;
      const { mp3_url = '', webm_url = '' } = translation;
      const playlist = [];
      if (webm_url) playlist.push(webm_url);
      if (mp3_url) playlist.push(mp3_url);
      return playlist;
    },

    showTranslation() {
      const { playlist, translation, phrase } = this;
      return (
        phrase && phrase.visible && (translation.text || playlist.length > 0)
      );
    },

    translationId() {
      return this.translation.id || 'no-id';
    },
  },

  methods: {
    handlePhraseClick() {
      const { phrase, lang, $store } = this;
      const { id } = phrase;
      $store.dispatch('ui/updateCurrentId', { id, lang });
    },

    toggleFavorite() {
      this.$store.dispatch('favorites/toggleFavorite');
    },
  },
};
</script>

<template>
  <v-expansion-panel
    v-if="showTranslation"
    class="inner-panel"
    :class="langIndex === 0 ? 'primary-theme' : 'secondary-theme'"
    @change="handlePhraseClick"
  >
    <v-expansion-panel-header
      hide-actions
      class="d-flex justify-space-between align-center"
    >
      <span>{{ phrase.text || '' }}</span>
      <AudioPlayer
        :playlist="[playlist]"
        :color="langIndex === 0 ? 'primary' : 'secondary'"
        :item-index="itemIndex"
        :lang="lang"
        :phrase-id="phrase.id"
      />
    </v-expansion-panel-header>

    <v-expansion-panel-content>
      <span :id="translationId" class="translation-text font-weight-bold">{{
        translation.text
      }}</span>

      <div class="d-flex justify-end align-center">
        <!-- <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              text
              v-on="on"
              class="phrase-action"
              @click.prevent="copyText(translationId)"
            >
              <v-icon class="material-icons-round">copy</v-icon>
            </v-btn>
          </template>
          <span>Copy</span>
        </v-tooltip>-->

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              text
              v-on="on"
              class="phrase-action"
              @click.stop="toggleFavorite"
            >
              <v-icon
                v-if="indexInFavorites > -1"
                class="material-icons-round star"
                color="yellow"
                >star</v-icon
              >
              <v-icon v-else class="material-icons-round star"
                >star_border</v-icon
              >
            </v-btn>
          </template>
          <span>{{
            indexInFavorites > -1 ? 'Remove Favorite' : 'Favorite'
          }}</span>
        </v-tooltip>
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<style lang="scss" scoped>
// @import '@/styles/colors.scss';
.translation-text {
  display: block;
  margin-block-start: 8px;
  margin-block-end: 16px;
}

.phrase-action {
  margin-right: 8px;
}

.star {
  font-size: 32px !important;
}
</style>

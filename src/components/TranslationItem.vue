<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import AudioPlayer from '@/components/AudioPlayer.vue';

export default {
  name: 'TranslationItem',

  components: {
    AudioPlayer,
  },

  props: {
    phrase: {
      type: Object,
      required: true,
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
      return phrase.visible && (translation.text || playlist.length > 0);
    },
  },

  methods: {
    testEvent() {
      console.log('play or pause fired');
    },
  },
};
</script>

<template>
  <v-expansion-panel
    v-if="showTranslation"
    class="inner-panel"
    :class="langIndex === 0 ? 'primary-theme' : 'secondary-theme'"
  >
    <v-expansion-panel-header hide-actions class="d-flex justify-space-between align-center">
      <span>{{ phrase.text || '' }}</span>
      <AudioPlayer
        :playlist="[playlist]"
        :color="langIndex === 0 ? 'primary' : 'secondary'"
        :item-index="itemIndex"
      />
    </v-expansion-panel-header>

    <v-expansion-panel-content
      v-if="translation.text"
      class="font-weight-bold"
    >{{ translation.text }}</v-expansion-panel-content>
  </v-expansion-panel>
</template>

<style lang="scss" scoped>
// @import '@/styles/colors.scss';
//
// .v-item--active {
//   background-color: $green-transparent !important;
//   padding: 8px 0;
// }
</style>

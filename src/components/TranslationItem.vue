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
    lang: {
      type: String,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {};
  },

  computed: {
    translation() {
      const { phrase, lang } = this;
      return phrase.translations[lang] || {};
    },

    playlist() {
      const { translation } = this;
      const { mp3_url, webm_url } = translation;
      return [mp3_url || '', webm_url || ''];
    },
  },

  methods: {
    // ...mapActions('module', [
    //   'foo',
    // ]),
    // method() {},
  },
};
</script>

<template>
  <v-expansion-panel class="inner-panel">
    <v-expansion-panel-header hide-actions class="d-flex justify-space-between align-center">
      <span>{{ phrase.text || '' }}</span>
      <AudioPlayer :playlist="[playlist]" :color="index === 0 ? 'primary' : 'secondary'" />
    </v-expansion-panel-header>

    <v-expansion-panel-content
      v-if="translation.text"
      class="font-weight-bold"
    >{{ translation.text }}</v-expansion-panel-content>
  </v-expansion-panel>
</template>

<style lang="scss" scoped>
// @import '@/design/colors.scss';
</style>

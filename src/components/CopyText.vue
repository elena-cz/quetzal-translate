<script>
import { mapState } from 'vuex';

export default {
  name: 'CopyText',

  computed: {
    ...mapState('ui', ['textToCopy']),
  },

  watch: {
    textToCopy(text) {
      if (text) {
        this.copy();
      }
    },
  },

  methods: {
    copy() {
      const { $refs, $store } = this;
      this.$nextTick(() => {
        const $el = $refs.copyInput;
        $el.select();
        try {
          document.execCommand('copy', true);
          $store.dispatch('ui/updateSnack', { text: 'Copied', quick: true });
          $store.dispatch('ui/copyText', '');
        } catch (error) {
          $store.dispatch('ui/updateSnack', { text: 'Error copying' });
          $store.dispatch('ui/copyText', '');
        }
      });
      // $store.dispatch('analytics/copyLinkClick');
    },
  },
};
</script>

<template>
  <div>
    <input id="copy-input" ref="copyInput" type="text" :value="textToCopy" readonly />
  </div>
</template>

<style lang="scss" scoped>
#copy-input {
  position: fixed;
  bottom: 0;
  opacity: 0;
  transform: translateY(-500px);
}
</style>

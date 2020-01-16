<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import PromptInstall from '@/components/install/PromptInstall.vue';
import AndroidChrome from '@/components/install/AndroidChrome.vue';
import OtherMobile from '@/components/install/OtherMobile.vue';

export default {
  name: 'InstallDirections',

  components: {
    PromptInstall,
    AndroidChrome,
    OtherMobile,
  },

  props: {
    // thing: {
    //   type: Array,
    //   required: true,
    // },
  },

  data: () => ({
    //
  }),

  computed: {
    ...mapState('sw', ['installPrompt', 'acceptedInstallPrompt']),

    ...mapState('device', ['deviceInfoSet', 'browser', 'os', 'swSupported']),

    ...mapGetters('device', ['isAndroid', 'isIOS']),

    device() {
      const { browser, swSupported: sw, isAndroid, isIOS } = this;
      const size = this.$mq;

      let device = '';
      if (isIOS) {
        if (sw && browser === 'Safari') {
          device = 'iOS-Safari';
        } else if (!sw && browser === 'Safari') {
          device = 'iOS-Safari-NoSW';
        } else {
          device = 'iOS-Other';
        }
      } else if (isAndroid) {
        if (sw && browser === 'Chrome') {
          device = 'Android-Chrome';
        } else if (sw && browser.includes('Firefox')) {
          device = 'Android-Firefox';
        } else if (sw && browser.includes('Samsung')) {
          device = 'Android-Samsung';
        } else if (!sw && browser === 'Chrome') {
          device = 'Android-Chrome-NoSW';
        } else {
          device = 'Android-Other';
        }
      } else if (size === 'sm') {
        device = 'OtherMobile';
      } else {
        device = 'WebDefault';
      }
      // return 'iOS-Safari';
      // return 'iOS-Safari-NoSW';
      // return 'iOS-Other';
      // return 'Android-Chrome';
      // return 'Android-Firefox';
      // return 'Android-Samsung';
      // return 'Android-Chrome-NoSW';
      // return 'Android-Other';
      // return 'OtherMobile';
      // return 'WebDefault';
      return device;
    },
  },

  created() {
    if (!this.deviceInfoSet) {
      this.$store.dispatch('device/init');
    }
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
  <div>
    <PromptInstall />
    <!-- <PromptInstall v-if="installPrompt || acceptedInstallPrompt" /> -->
    <hr />
    <AndroidChrome />
    <!-- <AndroidChrome v-else-if="device === 'Android-Chrome'" /> -->
    <hr />
    <OtherMobile />
  </div>
</template>

<style lang="scss" scoped>
// @import '@/styles/colors.scss';
</style>

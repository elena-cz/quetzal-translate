<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import PromptInstall from '@/components/install/PromptInstall.vue';
import AndroidChrome from '@/components/install/AndroidChrome.vue';
import OtherMobile from '@/components/install/OtherMobile.vue';
import iOSSafari from '@/components/install/iOSSafari.vue';
import iOSOther from '@/components/install/iOSOther.vue';

export default {
  name: 'InstallDirections',

  components: {
    PromptInstall,
    AndroidChrome,
    OtherMobile,
    iOSSafari,
    iOSOther,
  },

  computed: {
    ...mapState('sw', ['installPrompt', 'acceptedInstallPrompt']),

    // ...mapState('device', ['deviceInfoSet', 'browser', 'os', 'swSupported']),

    ...mapGetters('device', ['device']),
  },
};
</script>

<template>
  <div class="text-content">
    <!-- <PromptInstall /> -->
    <PromptInstall v-if="installPrompt || acceptedInstallPrompt" />

    <!-- <AndroidChrome /> -->
    <AndroidChrome v-else-if="device === 'Android-Chrome'" />

    <!-- <OtherMobile /> -->
    <OtherMobile v-else-if="device === 'OtherMobile'" />

    <!-- <iOSSafari /> -->
    <IOSSafari v-else-if="device === 'iOS-Safari'" />

    <!-- <iOSOther /> -->
    <IOSOther v-else-if="device === 'iOS-Other'" />
  </div>
</template>


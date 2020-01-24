<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import PromptInstall from '@/components/install/PromptInstall.vue';
import AndroidChrome from '@/components/install/AndroidChrome.vue';
import OtherMobile from '@/components/install/OtherMobile.vue';
import IOSSafari from '@/components/install/IOSSafari.vue';
import IOSOther from '@/components/install/IOSOther.vue';
import WebDefault from '@/components/install/WebDefault.vue';

export default {
  name: 'InstallDirections',

  components: {
    PromptInstall,
    AndroidChrome,
    OtherMobile,
    IOSSafari,
    IOSOther,
    WebDefault,
  },

  computed: {
    ...mapState('sw', ['installPrompt', 'acceptedInstallPrompt']),

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

    <!-- <IOSSafari /> -->
    <IOSSafari v-else-if="device === 'iOS-Safari'" />

    <!-- <IOSOther /> -->
    <IOSOther v-else-if="device === 'iOS-Other'" />

    <WebDefault v-else />
  </div>
</template>


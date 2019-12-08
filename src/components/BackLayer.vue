<script>
import { mapState, mapGetters, mapActions } from 'vuex';
// import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'BackLayer',

  components: {
    // HelloWorld,
  },

  props: {
    // height: {
    //   type: Array,
    //   required: true,
    // },
  },

  data() {
    return {
      isBackLayerActive: false,
      openHeight: 0,
      defaultHeight: 60,
      willUseCloseTransition: false,
    };
  },

  computed: {
    frontTranslateStyle() {
      const { openHeight, defaultHeight } = this;
      return {
        transform: `translateY(${openHeight + defaultHeight}px)`,
      };
    },
    frontHeightStyle() {
      const { openHeight, defaultHeight } = this;
      return {
        'max-height': `calc(100vh - ${openHeight + defaultHeight}px)`,
      };
    },
  },

  methods: {
    toggleBackLayer() {
      this.isBackLayerActive = !this.isBackLayerActive;
    },

    testButton() {
      console.log('clicked test button - stop');
    },

    onBackLayerContentEnter() {
      const $el = this.$refs.backLayerContent || {};
      const height = $el.clientHeight || 0;
      this.openHeight = height;
      setTimeout(() => {
        this.willUseCloseTransition = true;
      }, 100);
    },

    onBackLayerContentLeave() {
      this.openHeight = 0;
      this.willUseCloseTransition = false;
    },
  },
};
</script>

<template>
  <div class="app-container">
    <div class="back-layer pa-4">
      <h4 @click="toggleBackLayer">Quetzal</h4>
      <transition
        name="fade"
        v-on:enter="onBackLayerContentEnter"
        v-on:leave="onBackLayerContentLeave"
      >
        <div v-if="isBackLayerActive" ref="backLayerContent" class="back-layer-content">
          <p>About</p>
          <p>Share app</p>
          <p>Install app</p>
        </div>
      </transition>
    </div>
    <div
      class="front-layer"
      :style="frontTranslateStyle"
      :class="{'inactive-front-layer':  willUseCloseTransition}"
    >
      <transition name="fade">
        <div v-if="isBackLayerActive" class="front-overlay" @click="toggleBackLayer"></div>
      </transition>
      <div class="front-content pa-4" :style="frontHeightStyle">
        <v-btn rounded color="primary" @click.stop="testButton">Test</v-btn>
        <ol>
          <li>Good day!</li>
          <li>Please sit here.</li>
          <li>I am your dentist today</li>
          <li>Are you allergic to any medicines?</li>
          <li>Where does it hurt?</li>
          <li>When does it hurt?</li>
          <li>All the time?</li>
          <li>Or now and then?</li>
          <li>Does the cold water or air hurt you?</li>
          <li>Does it wake you up at night?</li>
          <li>Does it hurt when you bite?</li>
          <li>We need to fix your broken tooth</li>
          <li>We need to take x-rays.</li>
          <li>We need to remove this tooth.</li>
          <li>You have some cavities that we must treat.</li>
          <li>We need to fill ____ teeth. (show fingers)</li>
          <li>We need to extract ____ teeth. (show fingers)</li>
          <li>This tooth cannot be repaired. We must extract it.</li>
          <li>This tooth is loose.</li>
        </ol>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// @import '@/design/colors.scss';

.back-layer {
  color: white;
}

.front-layer {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 24px 24px 0 0;
  transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.inactive-front-layer {
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.front-overlay {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 24px 24px 0 0;
  z-index: 10;
}

.front-content {
  height: 100%;
  overflow: scroll;
}

.fade-enter-active {
  transition: opacity 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-leave-active {
  transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

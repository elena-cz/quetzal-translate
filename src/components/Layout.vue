<script>
// import { mapState, mapGetters, mapActions } from 'vuex';
import NavMenu from '@/components/NavMenu.vue';

export default {
  name: 'Layout',

  components: {
    NavMenu,
  },

  props: {
    navType: {
      type: String,
      default: 'menu',
    },
    defaultTitle: {
      type: String,
      default: '',
    },
    openTitle: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      isBackLayerActive: false,
      usingCloseTransition: false,
      openHeight: 0,
      defaultHeight: 60,
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

  created() {
    const { $root, openBackLayer, closeBackLayer } = this;
    // $children.$on('openBackLayer', openBackLayer);
    $root.$on('closeBackLayer', closeBackLayer);
  },

  methods: {
    toggleBackLayer() {
      this.isBackLayerActive = !this.isBackLayerActive;
    },

    openBackLayer() {
      this.isBackLayerActive = true;
    },

    closeBackLayer() {
      console.log('close back layer');
      this.isBackLayerActive = false;
    },

    testButton() {
      console.log('clicked test button - stop');
    },

    onBackLayerContentEnter() {
      const $el = this.$refs.backLayerContent || {};
      const height = $el.clientHeight || 0;
      this.openHeight = height;
      setTimeout(() => {
        this.usingCloseTransition = true;
      }, 100);
    },

    onBackLayerContentLeave() {
      this.openHeight = 0;
      this.usingCloseTransition = false;
    },
  },
};
</script>

<template>
  <div class="app-container">
    <div class="back-layer pa-4">
      <h4 @click="openBackLayer">Quetzal</h4>
      <transition
        name="fade"
        v-on:enter="onBackLayerContentEnter"
        v-on:leave="onBackLayerContentLeave"
      >
        <div v-if="isBackLayerActive" ref="backLayerContent" class="back-layer-content">
          <NavMenu />
        </div>
      </transition>
    </div>
    <div
      class="front-layer"
      :style="frontTranslateStyle"
      :class="{'inactive-front-layer':  usingCloseTransition}"
    >
      <transition name="fade">
        <div v-if="isBackLayerActive" class="front-overlay" @click="closeBackLayer"></div>
      </transition>
      <div class="front-content pa-4" :style="frontHeightStyle">
        <slot name="main-content"></slot>
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

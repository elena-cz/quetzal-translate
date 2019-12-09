<script>
import NavMenu from '@/components/NavMenu.vue';
import NavMenuIcon from '@/components/NavMenuIcon.vue';

export default {
  name: 'Layout',

  components: {
    NavMenu,
    NavMenuIcon,
  },

  props: {
    // navType: {
    //   type: String,
    //   default: 'menu',
    // },
    pageTitle: {
      type: String,
      default: '',
    },
    // openTitle: {
    //   type: String,
    //   default: '',
    // },
  },

  data() {
    return {
      isBackLayerActive: false,
      usingCloseTransition: false,
      showMenu: false,
      openHeight: 0,
      defaultHeight: 56,
      appTitle: 'Quetzal',
    };
  },

  computed: {
    title() {
      const { pageTitle, appTitle, isBackLayerActive, showMenu } = this;
      return isBackLayerActive && showMenu ? appTitle : pageTitle;
    },

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
    const { $root, openBackLayer, closeBackLayer, toggleBackLayer } = this;
    $root.$on('openBackLayer', openBackLayer);
    $root.$on('closeBackLayer', closeBackLayer);
    $root.$on('toggleBackLayer', toggleBackLayer);
  },

  methods: {
    toggleBackLayer(type = '') {
      this.showMenu = type === 'menu';
      this.isBackLayerActive = !this.isBackLayerActive;
    },

    openBackLayer(type = '') {
      this.showMenu = type === 'menu';
      this.isBackLayerActive = true;
    },

    closeBackLayer() {
      this.isBackLayerActive = false;
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
    <div class="back-layer">
      <v-app-bar flat dark color="transparent">
        <NavMenuIcon :is-back-layer-active="isBackLayerActive" />

        <v-toolbar-title class="back-layer-title">{{ title }}</v-toolbar-title>

        <v-spacer></v-spacer>

        <slot name="right-icons" />
      </v-app-bar>

      <transition
        name="fade"
        v-on:enter="onBackLayerContentEnter"
        v-on:leave="onBackLayerContentLeave"
      >
        <div v-if="isBackLayerActive" ref="backLayerContent" class="back-layer-content pa-3 pt-0">
          <NavMenu v-if="showMenu" />
          <slot name="back-layer-content" />
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
.back-layer {
  color: white;
}

.back-layer-title {
  padding-left: 16px !important;
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

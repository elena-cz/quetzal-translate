<script>
import { mapGetters } from 'vuex';

/* 
  Transforming icons update with this logic:

  | Prev Type | Current Type  | isBackLayerActive | Icon Set   | IconDisplayed |
  | ''/menu   | menu          | false             | menuClose  | menu          |
  | menu      | menu          | true              | menuClose  | close         |
  | menu      | back          | false             | closeArrow | arrow         |
  | back      | menu          | false             | menuArrow  | menu          |
 */

export default {
  name: 'NavMenuIcon',

  props: {
    navType: {
      type: String,
      default: 'menu',
    },
    isBackLayerActive: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      type: 'menu',
      iconSet: 'menuClose',
    };
  },

  computed: {
    ...mapGetters('audio', ['shouldShowAudioUpdateBadge']),
  },

  watch: {
    navType(newType, oldType) {
      if (oldType === 'menu' && newType === 'back') {
        this.iconSet = 'closeArrow';
      } else if (oldType === 'back' && newType === 'menu') {
        this.iconSet = 'menuArrow';
      } else if (newType === 'menu') {
        this.iconSet = 'menuClose';
      } else {
        this.iconSet = 'menuArrow';
      }
    },

    isBackLayerActive(isActive) {
      if (this.navType === 'menu' && isActive) {
        this.iconSet = 'menuClose';
      }
    },
  },
};
</script>

<template>
  <!-- menu/close -->
  <v-btn
    v-if="iconSet === 'menuClose'"
    text
    icon
    :retain-focus-on-click="false"
    dark
    class="hamburger hamburger--squeeze"
    :class="{ 'is-active': isBackLayerActive }"
    @click="$root.$emit('toggleBackLayer', 'menu')"
  >
    <v-badge
      :value="shouldShowAudioUpdateBadge && !isBackLayerActive"
      color="accent"
      dot
      offset-x="4"
      offset-y="4"
      class="mt-0"
    >
      <span class="hamburger-box">
        <span class="hamburger-inner" />
      </span>
    </v-badge>
  </v-btn>

  <!-- close/arrow -->
  <v-btn
    v-else-if="iconSet === 'closeArrow'"
    text
    icon
    :retain-focus-on-click="false"
    dark
    class="hamburger hamburger--x-arrow"
    :class="{ 'is-active': navType === 'back' }"
    @click="$router.go(-1)"
  >
    <span class="hamburger-box">
      <span class="hamburger-inner" />
    </span>
  </v-btn>

  <!-- menu/arrow -->
  <v-btn
    v-else
    text
    icon
    :retain-focus-on-click="false"
    dark
    class="hamburger hamburger--arrowalt"
    :class="{ 'is-active': navType === 'back' }"
    @click="$root.$emit('toggleBackLayer', 'menu')"
  >
    <span class="hamburger-box">
      <span class="hamburger-inner" />
    </span>
  </v-btn>
</template>

<style lang="scss" scoped>
@import '@/styles/hamburger.scss';
</style>

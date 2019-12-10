<script>
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
    };
  },

  watch: {
    navType(newType) {
      setTimeout(() => {
        this.type = newType;
      }, 110);
    },
  },
};
</script>

<template>
  <v-btn
    v-if="type === 'menu'"
    text
    icon
    :retain-focus-on-click="false"
    dark
    class="hamburger hamburger--squeeze"
    :class="{'is-active': isBackLayerActive }"
    @click="$root.$emit('toggleBackLayer', 'menu')"
  >
    <span class="hamburger-box">
      <span class="hamburger-inner" />
    </span>
  </v-btn>

  <v-btn
    v-else
    text
    icon
    :retain-focus-on-click="false"
    dark
    class="hamburger hamburger--arrowalt"
    :class="{'is-active': !isBackLayerActive }"
    @click="$router.go(-1)"
  >
    <span class="hamburger-box">
      <span class="hamburger-inner" />
    </span>
  </v-btn>
</template>

<style lang="scss" scoped>
@import '@/styles/hamburger.scss';
</style>

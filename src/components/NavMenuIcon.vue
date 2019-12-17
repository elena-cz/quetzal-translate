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
      }, 120);
    },
  },
};
</script>

<template>
  <!-- <v-badge :value="showDownloadNotification" color="accent" overlap class="small-badge">
              <template v-slot:badge>
                <span></span>
              </template>
              <v-icon v-if="userCacheIsUpToDate" class="material-icons-round" large>check</v-icon>
              <v-icon v-else class="material-icons-round" large>download</v-icon>
            </v-badge> -->
  <v-btn
    v-if="type === 'menu'"
    text
    icon
    :retain-focus-on-click="false"
    dark
    class="hamburger hamburger--squeeze"
    :class="{ 'is-active': isBackLayerActive }"
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
    :class="{ 'is-active': !isBackLayerActive }"
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

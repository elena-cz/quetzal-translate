<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import ShareMenuWidget from '@/components/ShareMenuWidget.vue';

export default {
  name: 'NavMenu',

  components: {
    ShareMenuWidget,
  },

  data() {
    return {};
  },

  computed: {
    ...mapGetters('audio', ['shouldShowAudioUpdateBadge']),
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
    <v-list
      shaped
      color="transparent"
      dark
      class="ml-n4 pa-0 pt-2"
      width="fit-content"
      min-width="200"
    >
      <v-list-item-group tile="false" @change="$root.$emit('closeBackLayer')">
        <!-- <v-list-item :to="'/'">
          <v-list-item-icon>
            <v-icon class="material-icons-round">home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>-->

        <v-list-item :to="'/offline'">
          <v-list-item-icon>
            <v-icon class="material-icons-round">offline_pin</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <v-badge
                :value="shouldShowAudioUpdateBadge"
                color="accent"
                dot
                class="mt-0"
                offset-x="-2"
                >Offline</v-badge
              >
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <ShareMenuWidget />

        <v-list-item :to="'/about'">
          <v-list-item-icon>
            <v-icon class="material-icons-round">info</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<style lang="scss" scoped>
.install-item {
  color: var(--v-primary-base) !important;
  background-color: white;
  .v-list-item__content {
    color: var(--v-primary-base) !important;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 1px;
  }
}

.install-icon {
  height: 24px;
  width: 24px;
  padding: 1px;
  fill: var(--v-primary-base);
}

.v-list-item {
  padding-right: 40px;
}

.v-list-item__title {
  font-size: 1rem !important;
  overflow: visible !important;
}
</style>

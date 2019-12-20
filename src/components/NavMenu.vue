<script>
// import { mapState, mapGetters, mapActions } from 'vuex';
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
    // ...mapState('module', [
    //   'foo',
    // ]),
    // ...mapGetters('module', [
    //   'foo',
    // ]),
    // property() {},
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
        <!-- <v-list-item class="install-item">
          <v-list-item-icon>
            <svg
              class="install-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
            >
              <path
                d="M8,0.6C3.9,0.6,0.6,3.9,0.6,8s3.3,7.4,7.4,7.4s7.4-3.3,7.4-7.4S12.1,0.6,8,0.6z M11.3,9.7l-2.9,2.9
	c-0.2,0.2-0.6,0.2-0.8,0L4.7,9.7c-0.2-0.2-0.2-0.6,0-0.8s0.6-0.2,0.8,0l1.9,1.9V3.2c0-0.3,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v7.5
	l1.9-1.9c0.2-0.2,0.6-0.2,0.8,0S11.5,9.5,11.3,9.7z"
              />
            </svg>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Install</v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->

        <!-- <v-list-item :to="'/'">
          <v-list-item-icon>
            <v-icon class="material-icons-round">home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->

        <v-list-item :to="'/offline'">
          <v-list-item-icon>
            <v-icon class="material-icons-round">offline_pin</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Offline Audio</v-list-item-title>
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
}
</style>

<script>
// import { mapState, mapGetters, mapActions } from 'vuex';
// import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'NavMenu',

  components: {
    // HelloWorld,
  },

  props: {
    // thing: {
    //   type: Array,
    //   required: true,
    // },
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
    <v-list shaped color="transparent" dark class="ml-n4 pa-0" width="fit-content">
      <v-list-item-group tile="false" @change="$root.$emit('closeBackLayer')">
        <v-list-item>
          <v-list-item-icon>
            <v-icon class="material-icons-round">home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon class="material-icons-round">share</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Share App</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
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
.v-list-item {
  padding-right: 40px;
}

.v-list-item__title {
  font-size: 1rem !important;
}
</style>

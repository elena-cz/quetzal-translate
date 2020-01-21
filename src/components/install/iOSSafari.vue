<script>
import { mapGetters } from 'vuex';

export default {
  name: 'IOSSafariInstall',

  components: {},

  computed: {
    ...mapGetters('device', ['isIPad']),
  },
};
</script>

<template>
  <!-- iOS SAFARI-->
  <div>
    <p class="body-2">
      Note: This is a web app so you can install it right from here. Once you do, it works just like
      other apps&mdash;even offline. Plus, you never have to install updates and it works on every
      device.
    </p>

    <ol>
      <li v-if="!isIPad">
        At the bottom of the screen,
        <span class="nobr">
          tap
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="ios-icon">
            <path
              d="M19.9 7.1h-4c-0.3 0-0.5 0.2-0.5 0.5 0 0.3 0.2 0.5 0.5 0.5h3.5v14.9H4.6V8.1H8c0.3 0 0.5-0.2 0.5-0.5 0-0.3-0.2-0.5-0.5-0.5h-4c-0.3 0-0.5 0.2-0.5 0.5v15.9c0 0.3 0.2 0.5 0.5 0.5h15.9c0.3 0 0.5-0.2 0.5-0.5V7.6C20.4 7.3 20.2 7.1 19.9 7.1z"
            />
            <path
              d="M8.4 5l3.1-3.1v13.6c0 0.3 0.2 0.5 0.5 0.5s0.5-0.2 0.5-0.5V1.8l3.1 3.1c0.2 0.2 0.5 0.2 0.7 0 0.2-0.2 0.2-0.5 0-0.7l-4-4c-0.2-0.2-0.5-0.2-0.7 0l-4 4c-0.2 0.2-0.2 0.5 0 0.7C7.8 5.1 8.2 5.1 8.4 5z"
            />
          </svg>
        </span>
        <br />
        <span class="gray-text body-2">(scroll up to see buttons)</span>
        <picture>
          <source :srcset="require('@/assets/images/iOS-Share.webp')" type="image/webp" />
          <source :srcset="require('@/assets/images/iOS-Share.png')" type="image/png" />
          <img
            :src="require('@/assets/images/iOS-Share.png')"
            alt="iOS Share screenshot"
            class="screenshot"
          />
        </picture>
      </li>
      <li v-if="isIPad">
        At the top of the screen, tap
        <iosAction class="ios-icon" />
      </li>
      <li>
        Choose
        <b>Add to Home Screen</b>
      </li>
      <li>
        Tap
        <b>Add</b>
      </li>
    </ol>

    <p>
      Check out the
      <b>Quetzal</b> app on your Home Screen
    </p>
  </div>
</template>

<style lang="scss" scoped>
// @import '@/design/help.scss';
// @import '@/design/colors.scss';

.ios-icon {
  height: 1.2em;
  width: 1.2em;
  fill: #027aff;
}

.screenshot {
  margin: 10px;
  margin-left: 0;
  margin-right: 30px;
  box-sizing: border-box;
  max-width: 400px;
  width: 100%;

  &.ipad {
    border: 1px solid;
    // border-color: $border-color;
    max-width: 300px;
  }
}
</style>

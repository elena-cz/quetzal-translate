<script>
export default {
  name: 'IOSOther',

  methods: {
    copyLink() {
      this.$store.dispatch('ui/copyText', 'https://quetzal.app/offline');
      // this.$store.dispatch('analytics/copyLinkClick');
    },
  },
};
</script>

<template>
  <div>
    <!-- iOS OTHER -->
    <h5 class="regular-font">Install on iOS</h5>

    <p>
      Note: This is a web app so it takes a couple extra steps to install it.
      Once you do, it works just like other apps&mdash;even offline.
      Plus, you never have to install updates and it works on every device.
    </p>

    <p>To install the app, open this page in Safari.</p>

    <ol>
      <li>
        Copy the link to this page
        <br />
        <v-btn outlined @click="copyLink">Copy link</v-btn>
      </li>
      <li>
        Open
        <b>Safari</b>
        <img src="@/assets/icons/safari-icon-72.png" class="app-icon" />
      </li>
      <li>Paste the link in the address bar</li>
      <li>
        Near the bottom of the screen, tap
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 24 24"
          style="enable-background:new 0 0 24 24;"
          xml:space="preserve"
          class="ios-icon"
        >
          <g>
            <path
              d="M19.9,7.1h-4c-0.3,0-0.5,0.2-0.5,0.5c0,0.3,0.2,0.5,0.5,0.5h3.5v14.9H4.6V8.1H8c0.3,0,0.5-0.2,0.5-0.5
		c0-0.3-0.2-0.5-0.5-0.5h-4c-0.3,0-0.5,0.2-0.5,0.5v15.9c0,0.3,0.2,0.5,0.5,0.5h15.9c0.3,0,0.5-0.2,0.5-0.5V7.6
		C20.4,7.3,20.2,7.1,19.9,7.1z"
            />
            <path
              d="M8.4,5l3.1-3.1v13.6c0,0.3,0.2,0.5,0.5,0.5s0.5-0.2,0.5-0.5V1.8l3.1,3.1c0.2,0.2,0.5,0.2,0.7,0c0.2-0.2,0.2-0.5,0-0.7l-4-4
		c-0.2-0.2-0.5-0.2-0.7,0l-4,4c-0.2,0.2-0.2,0.5,0,0.7C7.8,5.1,8.2,5.1,8.4,5z"
            />
          </g>
        </svg>
      </li>
      <li>
        Choose
        <b>Add to Home Screen</b>
      </li>
    </ol>
  </div>
</template>

<style lang="scss" scoped>
// @import '@/design/help.scss';

.ios-icon {
  height: 1.2em;
  width: 1.2em;
  fill: #027aff;
}

.app-icon {
  display: inline-block;
  height: 1.2em;
  min-width: 1.2em;
  padding-left: 0.5em;
  margin-bottom: -2px;
  filter: drop-shadow(1px 2px 2px rgba(0, 0, 0, 0.14));
}
</style>

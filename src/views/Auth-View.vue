<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import fb from '@/firebaseConfig';
// import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Auth-View',

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

  mounted() {
    const authUiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          return true;
        },
        uiShown: function() {
          // The widget is rendered.
          // Hide the loader.
          document.getElementById('loader').style.display = 'none';
        },
      },
      // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
      signInFlow: 'popup',
      // signInSuccessUrl: '<url-to-redirect-to-on-success>',
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        fb.authValues.googleAuth,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        // firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      ],
      // Terms of service url.
      // tosUrl: '<your-tos-url>',
      // Privacy policy url.
      // privacyPolicyUrl: '<your-privacy-policy-url>',
    };

    // ui.start('#firebaseui-auth-container', uiConfig);
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
    <div id="firebaseui-auth-container"></div>
    <div id="loader">Loading...</div>
  </div>
</template>

<style lang="scss" scoped>
// @import '@/design/colors.scss';
</style>

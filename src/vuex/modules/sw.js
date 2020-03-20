// Vuex store for Service Worker interactions

/*

  STATE

 */

const state = {
  installPrompt: null,
  acceptedInstallPrompt: null,
};

/*

  GETTERS

 */

const getters = {
  // exampleGetter: state => { },
};

/*

  ACTIONS

 */

const actions = {
  showUpdateNotification({ dispatch }, { onClick }) {
    // console.log('in showUpdateNotification');
    const snack = {
      text: 'App update available',
      actionText: 'Refresh',
      handler: onClick,
      keepOpen: true,
    };
    dispatch('ui/updateSnack', snack, { root: true });
  },

  updateInstallPrompt({ commit, dispatch }, prompt) {
    console.log('updateInstallPrompt');
    commit('setInstallPrompt', prompt);
    // if (prompt) {
    //   dispatch('showInstallNotification');
    // } else {
    //   dispatch('clearNotification');
    // }
  },

  showInstallPrompt({ state, commit, dispatch }) {
    console.log('showInstallPrompt');
    const { installPrompt } = state;
    installPrompt.prompt();
    // dispatch('clearNotification');
    // Wait for the user to respond to the prompt
    installPrompt.userChoice.then(choiceResult => {
      if (choiceResult.outcome === 'accepted') {
        commit('setAcceptedInstallPrompt', true);
        // Handled in App.vue in case user clicks mini-bar
        // dispatch('analytics/acceptAddToHomeScreen', null, { root: true });
        console.log('User accepted the A2HS prompt');
      } else {
        commit('setAcceptedInstallPrompt', false);
        // dispatch('analytics/declineAddToHomeScreen', null, { root: true });
        console.log('User dismissed the A2HS prompt');
      }
      dispatch('updateInstallPrompt', null);
    });
  },
};

/*

  MUTATIONS

 */

const mutations = {
  setInstallPrompt(state, prompt) {
    state.installPrompt = prompt;
  },

  setAcceptedInstallPrompt(state, bool) {
    state.acceptedInstallPrompt = bool;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

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
    // console.log('in displayUpdateNotification');
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

  // showInstallNotification({ commit, dispatch, state }) {
  //   console.log('showInstallNotification');
  //   if (state.notification) {
  //     return;
  //   }

  //   const notification = {
  //     type: 'install',
  //     message: 'Add app to Home screen',
  //     actionText: 'Add app to Home screen',
  //     // confirmHandler: dispatch('showInstallPrompt'),
  //   };
  //   console.log('show notification', notification);
  //   setTimeout(() => {
  //     commit('setNotification', notification);
  //   }, 500);
  // },
};

/*

  MUTATIONS

 */

const mutations = {
  // setNotification(state, notification) {
  //   state.notification = notification;
  // },

  // clearNotification(state) {
  //   state.notification = null;
  // },

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

// /*

//   STATE

//  */

// const state = {
//   updateNotification: {},
// };

// /*

//   GETTERS

//  */

// const getters = {
//   // exampleGetter: state => {},
// };

// /*

//   ACTIONS

//  */

// const actions = {
//   showUpdateNotification({ commit }, { onClick }) {
//     commit('setNotification', {
//       text: 'App update available',
//       handler: onClick,
//     });
//   },
// };

// /*

//   MUTATIONS

//  */

// const mutations = {
//   setNotification(state, info) {
//     state.updateNotification = info;
//   },
// };

// export default {
//   namespaced: true,
//   state,
//   getters,
//   actions,
//   mutations,
// };

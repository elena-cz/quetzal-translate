import fb from '@/firebaseConfig';

/*

  STATE

 */

const state = {};

/*

  GETTERS

 */

const getters = {
  exampleGetter: state => {},
};

/*

  ACTIONS

 */

const actions = {
  init({ commit }) {
    fb.auth.onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
      } else {
        // No user is signed in.
      }
    });
  },
};

/*

  MUTATIONS

 */

const mutations = {
  exampleMutation(state, data) {
    state.property = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

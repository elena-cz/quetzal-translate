/*

  STATE

 */

const state = {
  updateNotification: {},
};

/*

  GETTERS

 */

const getters = {
  // exampleGetter: state => {},
};

/*

  ACTIONS

 */

const actions = {
  showUpdateNotification({ commit }, { onClick }) {
    commit('setNotification', {
      text: 'App update available',
      handler: onClick,
    });
  },
};

/*

  MUTATIONS

 */

const mutations = {
  setNotification(state, info) {
    state.updateNotification = info;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

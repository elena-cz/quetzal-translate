/*  
  
  STATE

 */

const state = {
  langNames: {
    es: 'Spanish',
    kek: `Q'echi'`,
  },
};

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
  exampleAction(
    { commit, dispatch, state, getters, rootState, rootGetters },
    otherParams
  ) {},
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

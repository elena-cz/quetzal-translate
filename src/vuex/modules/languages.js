/*  
  
  STATE

 */

const state = {
  langs: ['kek', 'es'],
  langNames: {
    kek: `Q'eqchi'`,
    es: 'Spanish',
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

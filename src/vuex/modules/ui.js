/*

  STATE

 */

const state = {
  appTitle: 'Quetzal',
  routeName: '',
  routeParams: {},
  routeMeta: {},
};

/*

  GETTERS

 */

const getters = {
  pageTitle: state => {
    const { routeName, appTitle } = state;
    const titles = {
      about: 'About',
      admin: 'Admin',
      home: 'Dentistry',
    };
    return titles[routeName] || appTitle;
  },

  navType: state => {
    const { routeName } = state;
    const types = {
      about: 'back',
      admin: 'menu',
      home: 'menu',
    };
    return types[routeName] || 'menu';
  },
};

/*

  ACTIONS

 */

const actions = {
  // exampleAction({ commit, dispatch, state, getters, rootState, rootGetters }, otherParams) { },

  parseRoute({ commit }, { name, params, meta }) {
    commit('setCurrentRoute', { name, params, meta });
  },
};

/*

  MUTATIONS

 */

const mutations = {
  setCurrentRoute(state, { name, params, meta }) {
    state.routeName = name;
    state.routeParams = params;
    state.routeMeta = meta;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

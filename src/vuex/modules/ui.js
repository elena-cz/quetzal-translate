/*

  STATE

 */

const state = {
  appTitle: 'Quetzal',
  routeName: '',
  routeParams: {},
  routeMeta: {},
  currentId: '',
  currentLang: '',
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
      auth: 'Sign In',
      home: 'Dentistry',
      offline: 'Offline Audio',
    };
    return titles[routeName] || appTitle;
  },

  navType: state => {
    const { routeName } = state;
    const types = {
      about: 'back',
      admin: 'menu',
      auth: 'back',
      home: 'menu',
      offline: 'back',
    };
    return types[routeName] || 'menu';
  },
};

/*

  ACTIONS

 */

const actions = {
  parseRoute({ commit }, { name, params, meta }) {
    commit('setCurrentRoute', { name, params, meta });
  },

  updateCurrentId({ commit }, idAndLang) {
    commit('setCurrentId', idAndLang);
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

  setCurrentId(state, { id, lang }) {
    state.currentId = id;
    state.currentLang = lang;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

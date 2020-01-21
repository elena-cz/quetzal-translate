/*

  STATE

 */

const state = {
  appTitle: 'Quetzal Translate',
  routeName: '',
  routeParams: {},
  routeMeta: {},
  currentId: '',
  currentLang: '',
  currentTopic: 'dentistry',
  snack: {
    text: '',
    actionText: '',
    handler: null,
    keepOpen: false,
    quick: false,
  },
  textToCopy: '',
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
      admin: 'back',
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
  parseRoute({ commit, dispatch, state }, { name, params, meta, path }) {
    const { currentTopic } = state;
    commit('setCurrentRoute', { name, params, meta });
    dispatch(
      'analytics/sendView',
      { name, path, topic: currentTopic },
      { root: true }
    );
  },

  updateCurrentId({ commit }, idAndLang) {
    commit('setCurrentId', idAndLang);
  },

  updateSnack(
    { commit },
    {
      text = '',
      actionText = '',
      handler = null,
      keepOpen = false,
      quick = false,
    }
  ) {
    commit('setSnack', { text, actionText, handler, keepOpen, quick });
  },

  copyText({ commit }, text = '') {
    commit('setTextToCopy', text);
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

  setSnack(state, snack) {
    state.snack = snack;
  },

  setTextToCopy(state, textToCopy) {
    state.textToCopy = textToCopy;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

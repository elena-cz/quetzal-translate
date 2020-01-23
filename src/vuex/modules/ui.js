import { setIDB, getIDB } from '@/helpers/settings';

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
  banners: {
    offlinePromo: {
      status: '', // 'dismissed', 'done'
      isComplete: false,
    },
  },
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
      offline: 'Offline',
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
  init({ dispatch }) {
    dispatch('getBannerStatusFromIDB', 'offlinePromo');
  },

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

  async getBannerStatusFromIDB({ commit }, banner) {
    const status = await getIDB(`banner-${banner}`);
    const isComplete = status === 'dismissed' || status === 'done';
    commit('setBannerStatus', { banner, status, isComplete });
  },

  async updateBannerStatusInIDB({ commit }, { banner, status }) {
    setIDB(`banner-${banner}`, status);
    const isComplete = status === 'dismissed' || status === 'done';
    commit('setBannerStatus', { banner, status, isComplete });
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

  setBannerStatus(state, { banner, status, isComplete }) {
    state.banners[banner].status = status;
    state.banners[banner].isComplete = isComplete;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

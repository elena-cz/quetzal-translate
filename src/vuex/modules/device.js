import Bowser from 'bowser';

// const getVersionNum = (version) => {
//   if (!version || typeof version !== 'string') {
//     return null;
//   }
//   const arr = version.split('.');
//   return +(`${arr[0] || 0}.${arr[1] || 0}`);
// };

/*

  STATE

 */

const state = {
  bowser: {},
  browser: '',
  browserInfo: {},
  // browserVersionNum: null,
  os: '',
  osInfo: {},
  // osVersionNum: null,
  platformModel: '',
  shareSupported: false,
  swSupported: null,
  isStandaloneMode: false,
  deviceInfoSet: false,
};

/*

  GETTERS

 */

const getters = {
  isAndroid: state => state.os === 'Android',
  isIOS: state => state.os === 'iOS',
  // isOlderIOS: state => state.os === 'iOS' && state.osVersionNum < 12.2,
  isIPad: state => state.platformModel.toLowerCase().includes('ipad'),
};

/*

  ACTIONS

 */

const actions = {
  init({ commit, dispatch }) {
    const info = {};
    const bowser = Bowser.getParser(window.navigator.userAgent);

    info.bowser = bowser.getResult();
    info.browserInfo = bowser.getBrowser() || {};
    info.browser = info.browserInfo.name;
    // info.browserVersionNum = getVersionNum(info.browserInfo.version);

    info.osInfo = bowser.getOS() || {};
    info.os = info.osInfo.name;
    // info.osVersionNum = getVersionNum(info.osInfo.version);

    info.platform = info.bowser.platform || {};
    info.platformModel = info.platform.model || '';

    info.shareSupported = navigator.share !== undefined;
    info.swSupported = !!('serviceWorker' in navigator);

    commit('setDeviceInfo', info);
    dispatch('detectStandaloneMode');
  },

  detectStandaloneMode({ commit, dispatch }) {
    // let isStandalone = false;
    if (
      window.matchMedia('(display-mode: fullscreen)').matches ||
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true
    ) {
      // isStandalone = true;
      commit('setStandaloneMode');
    }
    // dispatch('analytics/setDisplayMode', isStandalone, { root: true });
  },
};

/*

  MUTATIONS

 */

const mutations = {
  setDeviceInfo(state, info) {
    const {
      bowser,
      browser,
      browserInfo,
      // browserVersionNum,
      os,
      osInfo,
      // osVersionNum,
      platformModel,
      shareSupported,
      swSupported,
    } = info;
    state.bowser = bowser;
    state.browser = browser;
    state.browserInfo = browserInfo;
    // state.browserVersionNum = browserVersionNum;
    state.os = os;
    state.osInfo = osInfo;
    // state.osVersionNum = osVersionNum;
    state.platformModel = platformModel;
    state.shareSupported = shareSupported;
    state.swSupported = swSupported;
    state.deviceInfoSet = true;
  },

  setStandaloneMode(state) {
    state.isStandaloneMode = true;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

import { Howler } from 'howler';

const audioCacheWorker = new Worker('@/workers/audioCacheWorker.js', {
  type: 'module',
});

// TO DO
// Add snackbar notifications
// Detect feature compatibility & add error messages & analytics

// FUTURE
// Show size of download
// Show modal confirmations
// Handle case of downloading languge that hasn't been loaded yet

/*

  STATE

 */

const state = {
  langStatus: {}, // { es: { isDownloaded: true, hasUpdates: true, isUpdating: false } }
  updatesAvailable: false, // Includes languages not downloaded, and downloaded languages with updates
};

/*

  GETTERS

 */

const getters = {
  downloadedLangs: (state, getters, rootState) => {
    const { langStatus } = state;
    const { langs } = rootState.languages;
    // Keeping list in alphabetical order
    return langs.filter(lang => {
      const status = langStatus[lang] || {};
      return status.isDownloaded || status.isUpdating;
    });
  },

  availableLangs: (state, getters, rootState) => {
    const { langStatus } = state;
    const { langs } = rootState.languages;
    return langs.filter(lang => {
      const status = langStatus[lang] || {};
      return !status.isDownloaded && !status.isUpdating;
    });
  },

  hasDownloadedLangs: (state, getters) => {
    const { downloadedLangs = [] } = getters;
    return downloadedLangs.length > 0;
  },

  // Only show badge if a downloaded language has updates
  shouldShowAudioUpdateBadge: (state, getters) => {
    const { langStatus } = state;
    const { downloadedLangs } = getters;
    let shouldShow = false;
    downloadedLangs.forEach(lang => {
      if (langStatus[lang].hasUpdates) {
        shouldShow = true;
      }
    });
    return shouldShow;
  },
};

/*

  ACTIONS

 */

const actions = {
  // Triggered by phrases module when translations are loaded
  init({ commit, dispatch, rootState }, translations) {
    const { langs } = rootState.languages;
    commit('setInitialLangStatus', langs);
    dispatch('setUpWorkerListeners');
    const format = Howler.codecs('webm') ? 'webm' : 'mp3';
    audioCacheWorker.postMessage({ type: 'INIT', langs, translations, format });
  },

  setUpWorkerListeners({ commit }) {
    audioCacheWorker.onmessage = ({ data }) => {
      // console.log('worker message:', data);
      const { type } = data;
      if (type === 'DOWNLOADED_LANGS_INFO') {
        commit('setDownloadedLangs', data.langs);
      } else if (type === 'LANGS_TO_UPDATE_INFO') {
        commit('setLangsToUpdate', data.langs);
      }
    };
    audioCacheWorker.onerror = error => {
      console.error('Error from worker', error.message);
    };
  },

  downloadLang({ commit }, lang) {
    audioCacheWorker.postMessage({ type: 'DOWNLOAD_LANG', lang });
    commit('setLangUpdatingStatus', { lang, isUpdating: true });
  },

  updateLang({ commit }, lang) {
    audioCacheWorker.postMessage({ type: 'UPDATE_LANG', lang });
    commit('setLangUpdatingStatus', { lang, isUpdating: true });
  },

  deleteLang({ commit }, lang) {
    audioCacheWorker.postMessage({ type: 'DELETE_LANG', lang });
    commit('setDeletedLangs', lang);
  },
};

/*

  MUTATIONS

 */

const mutations = {
  setInitialLangStatus(state, langs) {
    const langStatus = {};
    langs.forEach(lang => {
      langStatus[lang] = {
        isDownloaded: false,
        hasUpdates: false,
        isUpdating: false,
      };
    });
    state.langStatus = langStatus;
  },

  setDownloadedLangs(state, langs) {
    langs.forEach(lang => {
      state.langStatus[lang].isDownloaded = true;
      state.langStatus[lang].hasUpdates = false;
      state.langStatus[lang].isUpdating = false;
    });
  },

  // Includes languages not downloaded, and downloaded languages with updates
  setLangsToUpdate(state, langs) {
    state.updatesAvailable = langs.length > 0;
    langs.forEach(lang => {
      state.langStatus[lang].hasUpdates = true;
    });
  },

  setLangUpdatingStatus(state, { lang, isUpdating }) {
    state.langStatus[lang].isUpdating = isUpdating;
  },

  setDeletedLangs(state, lang) {
    state.langStatus[lang].isDownloaded = false;
    state.langStatus[lang].hasUpdates = true;
    state.langStatus[lang].isUpdating = false;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

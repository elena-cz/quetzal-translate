import { Howler } from 'howler';

const audioCacheWorker = new Worker('@/workers/audioCacheWorker.js', {
  type: 'module',
});

// TO DO
// Detect feature compatibility & add error messages & analytics

/*

  STATE

 */

const state = {
  langStatus: {}, // { es: { isDownloaded: true, hasUpdates: true, isUpdating: false } }
  updatesAvailable: false,
};

/*

  GETTERS

 */

const getters = {
  downloadedLangs: (state, getters, rootState) => {
    const { langStatus } = state;
    const { langs } = rootState.languages;
    // Keeping list in alphabetical order
    return langs.filter(
      lang => langStatus[lang] && langStatus[lang].isDownloaded
    );
  },

  availableLangs: (state, getters, rootState) => {
    const { langStatus } = state;
    const { langs } = rootState.languages;
    return langs.filter(
      lang => !langStatus[lang] || !langStatus[lang].isDownloaded
    );
  },
};

/*

  ACTIONS

 */

const actions = {
  // Triggered by phrases module when translations are loaded
  init({ commit, dispatch, rootState }, translations) {
    const { langs } = rootState.languages;
    dispatch('setUpWorkerListeners');
    const format = Howler.codecs('webm') ? 'webm' : 'mp3';
    // commit('setFormat', format);
    audioCacheWorker.postMessage({ type: 'INIT', langs, translations, format });
  },

  setUpWorkerListeners({ dispatch, commit }) {
    audioCacheWorker.onmessage = ({ data }) => {
      console.log('worker message:', data);
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

  downloadLang(context, lang) {
    audioCacheWorker.postMessage({ type: 'DOWNLOAD_LANG', lang });
  },

  updateLang(context, lang) {
    audioCacheWorker.postMessage({ type: 'UPDATE_LANG', lang });
  },
};

/*

  MUTATIONS

 */

const mutations = {
  setDownloadedLangs(state, langs) {
    langs.forEach(lang => {
      state.langStatus[lang].isDownloaded = true;
    });
  },

  setLangsToUpdate(state, langs) {
    if (langs.length) {
      state.updatesAvailable = true;
    }
    langs.forEach(lang => {
      state.langStatus[lang].hasUpdates = true;
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

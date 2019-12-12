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
  // format: null,
  downloadedLangs: [],
  langsToUpdate: [],
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
};

/*

  MUTATIONS

 */

const mutations = {
  setDownloadedLangs(state, langs) {
    state.downloadedLangs = langs || [];
  },

  setLangsToUpdate(state, langs) {
    state.langsToUpdate = langs || [];
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

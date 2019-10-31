import { Howl, Howler } from 'howler';

// Check which codec is supported
// Get all current audio files per language with given file type
// Get the keys for all files in the cache
// See which files need to be added
// See which files should be deleted
// Download all files for language not in cache already
// Update IndexDB for each file
//  Show download status?
// Option to clear cache for a language

// IndexDB
// 'translationId': { lang, url}

/*

  STATE

 */

const state = {};

/*

  GETTERS

 */

const getters = {
  // allTranslations: state, getters, rootState => {
  //   // const { phrases } = rootstate.phrases;
  //   // const translations = {};
  //   // Object.keys(phrases).forEach({ translations } => {
  //   //   Object.keys(translations).forEach(translation)
  //   // });
  // },
};

/*

  ACTIONS

 */

const actions = {
  exampleAction(
    { commit, dispatch, state, getters, rootState, rootGetters },
    otherParams
  ) {},

  init({ dispatch }) {
    const isWebmSupported = Howler.codecs('webm');
    console.log('Webm supported?', isWebmSupported);
    dispatch('getCacheKeys');
  },

  async getCacheKeys() {
    const audioCache = await window.caches.open('quetzal-audio-cache');
    const keys = await audioCache.keys();
    console.log('cache keys', keys);
    // keys.forEach((request, index, array) => {
    //   console.log('request', request, 'index', index, 'array', array);
    // });
    const url =
      'https://firebasestorage.googleapis.com/v0/b/quetzal-translate.appspot.com/o/es-VzNQvMN7OSv9N3GN0Tgc%2Fes-VzNQvMN7OSv9N3GN0Tgc-201910301337.webm?alt=media&token=9b3295e2-3329-44fd-adce-da246faf1018';
    const matchingKey = await audioCache.match(url);
    console.log('matchingKey', matchingKey);
  },

  async addAudioToCache() {
    const urls = [
      'https://firebasestorage.googleapis.com/v0/b/quetzal-translate.appspot.com/o/es-VzNQvMN7OSv9N3GN0Tgc%2Fes-VzNQvMN7OSv9N3GN0Tgc-201910301337.webm?alt=media&token=9b3295e2-3329-44fd-adce-da246faf1018',
    ];
    const url =
      'https://firebasestorage.googleapis.com/v0/b/quetzal-translate.appspot.com/o/es-xfbDNRnWQ3AO6nH5f76v%2Fes-xfbDNRnWQ3AO6nH5f76v-201910301343.webm?alt=media&token=8899e760-c2a5-4b56-8b2d-28d45881e471';
    console.log('adding cache');
    const audioCache = await window.caches.open('quetzal-audio-cache');
    // await audioCache.add(Howler.load(url));
    await audioCache.addAll(urls);
  },
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

import { openDB, deleteDB, wrap, unwrap } from 'idb';
import { Howler } from 'howler';
import { Store, set, get, keys, del, clear } from 'idb-keyval';

const idbStore = new Store('quetzal-audio', 'cache-details');

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

const state = {
  format: null,
  cacheItems: {},
  isCacheLoaded: false,
};

/*

  GETTERS

 */

const getters = {
  // Get all translation items & current urls that should be cached
  // Webm is default because smaller filesize, with mp3 backup
  dbItems: (state, getters, rootState) => {
    const { format } = state;
    const { translations } = rootState.phrases;
    const items = {};
    if (format) {
      Object.keys(translations).forEach(id => {
        const item = translations[id];
        const { lang, webm_ref, webm_url, mp3_ref, mp3_url } = item;
        const url = format === 'webm' ? webm_url || mp3_url : mp3_url;
        const ref = format === 'webm' ? webm_ref || mp3_ref : mp3_ref;
        if (url) {
          items[id] = { id, lang, url, ref };
        }
      });
    }
    return items;
  },

  itemsToUpdateInCache: (state, getters) => {
    const { cacheItems, isCacheLoaded } = state;
    const { dbItems } = getters;
    const items = {
      toAdd: [], // Not in cache
      toReplace: [], // Wrong version in cache
      toDelete: [], // Translation item no longer used
    };
    if (isCacheLoaded) {
      Object.keys(dbItems).forEach(id => {
        if (cacheItems[id]) {
          if (cacheItems[id].ref !== dbItems[id].ref) {
            items.toReplace.push(id);
          }
        } else {
          items.toAdd.push(id);
        }
      });
      Object.keys(cacheItems).forEach(id => {
        if (!dbItems[id]) {
          items.toDelete.push(id);
        }
      });
    }
    return items;
  },
};

/*

  ACTIONS

 */

const actions = {
  exampleAction(
    { commit, dispatch, state, getters, rootState, rootGetters },
    otherParams
  ) {},

  init({ commit, dispatch }) {
    const format = Howler.codecs('webm') ? 'webm' : 'mp3';
    commit('setFormat', format);
    dispatch('getCacheDetails');
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
    // const idbStore = new Store('quetzal-audio', 'cache-details');
    console.log(idbStore);
    await set(
      'es-VzNQvMN7OSv9N3GN0Tgc',
      { lang: 'es', id: 'es-VzNQvMN7OSv9N3GN0Tgc', url: urls[0] },
      idbStore
    );
    const testVal = await get('es-VzNQvMN7OSv9N3GN0Tgc', idbStore);
    console.log('testVal', testVal);
  },

  async getCacheDetails({ commit }) {
    try {
      const cacheKeys = await keys(idbStore);
      const items = {};
      for (const key of cacheKeys) {
        const val = await get(key, idbStore);
        items[key] = val;
      }
      commit('setCacheItems', items);
    } catch (error) {
      console.error('Error getting items from cache', error);
    }
  },
};

/*

  MUTATIONS

 */

const mutations = {
  exampleMutation(state, data) {
    state.property = data;
  },

  setFormat(state, format) {
    state.format = format;
  },

  setCacheItems(state, cacheItems) {
    state.cacheItems = cacheItems;
    state.isCacheLoaded = true;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

import { Howler } from 'howler';
import { Store, set, get, keys, del, clear } from 'idb-keyval';

const idbStore = new Store('quetzal-audio', 'cache-details');

// TO DO
// Clear downloads
// Split by language
// Add downloading status

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

  cacheIds: state => Object.keys(state.cacheItems),

  itemsToUpdateInCache: (state, getters) => {
    const { cacheItems, isCacheLoaded } = state;
    const { dbItems, cacheIds } = getters;
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
      cacheIds.forEach(id => {
        if (!dbItems[id]) {
          items.toDelete.push(id);
        }
      });
    }
    return items;
  },

  userHasDownloadedBefore: (state, getters) => getters.cacheIds.length > 0,

  userHasItemsToUpdate: (state, getters) => {
    const { itemsToUpdateInCache } = getters;
    const hasItemsToAdd = itemsToUpdateInCache.toAdd.length > 0;
    const hasItemsToReplace = itemsToUpdateInCache.toReplace.length > 0;
    return hasItemsToAdd || hasItemsToReplace;
  },

  userCacheIsUpToDate: (state, getters) => {
    const { userHasDownloadedBefore, userHasItemsToUpdate } = getters;
    return userHasDownloadedBefore && !userHasItemsToUpdate;
  },

  showDownloadNotification: (state, getters) => {
    const { userHasDownloadedBefore, userHasItemsToUpdate } = getters;
    return userHasDownloadedBefore && userHasItemsToUpdate;
  },

  downloadTooltip: (state, getters) => {
    const { userCacheIsUpToDate, showDownloadNotification } = getters;
    if (showDownloadNotification) {
      return 'New Audio To Download';
    } else if (userCacheIsUpToDate) {
      return 'Audio Downloaded';
    }
    return 'Download Audio for Offline Translations';
  },
};

/*

  ACTIONS

 */

const actions = {
  init({ commit, dispatch }) {
    const format = Howler.codecs('webm') ? 'webm' : 'mp3';
    commit('setFormat', format);
    dispatch('getCacheDetails');
  },

  async updateAudioCache({ dispatch, state, getters }) {
    const { cacheItems } = state;
    const { dbItems, itemsToUpdateInCache } = getters;

    const idsToReplace = itemsToUpdateInCache.toReplace;
    const idsToAdd = [...itemsToUpdateInCache.toAdd, ...idsToReplace];
    const idsToDelete = [...itemsToUpdateInCache.toDelete];

    const urlsToAdd = idsToAdd.map(id => dbItems[id].url);
    const urlsToDelete = [...idsToDelete, ...idsToReplace].map(id => {
      return cacheItems[id].url;
    });

    await dispatch('addToCacheAndIdb', { ids: idsToAdd, urls: urlsToAdd });
    await dispatch('deleteFromCache', urlsToDelete);
    await dispatch('deleteFromIdb', idsToDelete);
    dispatch('getCacheDetails');
  },

  async addToCacheAndIdb({ getters }, { ids, urls }) {
    if (!ids.length) return;
    const { dbItems } = getters;
    try {
      const audioCache = await window.caches.open('quetzal-audio-cache');
      await audioCache.addAll(urls);
      for (const id of ids) {
        const data = JSON.stringify(dbItems[id]);
        await set(id, data, idbStore);
      }
    } catch (error) {
      console.error('Error adding audio to cache', error);
    }
  },

  async deleteFromCache(context, urls) {
    if (!urls.length) return;
    try {
      const audioCache = await window.caches.open('quetzal-audio-cache');
      for (const url of urls) {
        await audioCache.delete(url);
      }
    } catch (error) {
      console.error('Error deleting audio from cache', error);
    }
  },

  async deleteFromIdb(context, ids) {
    if (!ids.length) return;
    for (const id of ids) {
      await del(id, idbStore);
    }
  },

  async getCacheDetails({ commit }) {
    try {
      const items = {};
      const audioCache = await window.caches.open('quetzal-audio-cache');
      const cacheKeys = await audioCache.keys(); // Check that cache wasn't cleared
      if (cacheKeys.length) {
        const idbKeys = await keys(idbStore);
        for (const key of idbKeys) {
          const val = await get(key, idbStore);
          items[key] = JSON.parse(val);
        }
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

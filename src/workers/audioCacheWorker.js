import { Store, set, get, keys, del, clear } from 'idb-keyval';
const itemsStore = new Store('quetzal-audio-items', 'cached-items');
const infoStore = new Store('quetzal-audio-info', 'cache-info');

// CLASS DEFINITION

class AudioCacheManager {
  constructor() {
    this.allLangs = [];
    this.downloadedLangs = [];
    this.allItems = {};
    this.isAllItemsLoaded = false;
    this.cachedItems = {};
    this.idsToUpdateInCache = {};
    this.langsToUpdate = [];
  }

  // INIT
  // Compare what should be cached with what is cached
  init = async (langs, translations, format) => {
    const {
      getDownloadedLangs,
      isAllItemsLoaded,
      getAllItems,
      getCachedItems,
      getIdsToUpdateInCache,
      getLangsToUpdate,
    } = this;

    if (langs) {
      this.allLangs = langs;
    }

    await getDownloadedLangs();
    self.postMessage({
      type: 'DOWNLOADED_LANGS_INFO',
      langs: this.downloadedLangs,
    });

    if (!isAllItemsLoaded) {
      getAllItems(translations, format);
    }
    await getCachedItems();
    getIdsToUpdateInCache();
    getLangsToUpdate();
    self.postMessage({
      type: 'LANGS_TO_UPDATE_INFO',
      langs: this.langsToUpdate,
    });
  };

  // Init - Step 1
  // Find out which languages the user has downloaded (stored in IndexDB)
  getDownloadedLangs = async () => {
    try {
      const langs = await get('downloadedLangs', infoStore);
      const downloadedLangs = langs ? JSON.parse(langs) : [];
      this.downloadedLangs = downloadedLangs;
    } catch (error) {
      console.error(error);
    }
  };

  // Init - Step 2
  // Get all translation items & current urls that should be cached
  // Gets data for all loaded langs, can split by lang later
  // Webm is default because smaller filesize, with mp3 backup
  getAllItems = (translations, format) => {
    const items = {};
    Object.keys(translations).forEach(id => {
      const item = translations[id];
      const { lang, webm_ref, webm_url, mp3_ref, mp3_url } = item;
      const url = format === 'webm' ? webm_url || mp3_url : mp3_url;
      const ref = format === 'webm' ? webm_ref || mp3_ref : mp3_ref;
      if (url) {
        items[id] = { id, lang, url, ref };
      }
    });
    this.allItems = items;
    this.isAllItemsLoaded = true;
  };

  // Init - Step 3
  // Find out what's already in the cache
  getCachedItems = async () => {
    try {
      const items = {};
      const audioCache = await self.caches.open('quetzal-audio-cache');
      const cacheKeys = await audioCache.keys(); // Check that cache wasn't cleared
      if (cacheKeys.length) {
        const idbKeys = await keys(itemsStore);
        for (const key of idbKeys) {
          const val = await get(key, itemsStore);
          items[key] = JSON.parse(val);
        }
      }
      this.cachedItems = items;
    } catch (error) {
      console.error('Error getting items from cache', error);
    }
  };

  // Init - Step 4
  // Find out if any items need to be added, replaced, or deleted (per lang)
  getIdsToUpdateInCache = () => {
    const { allItems, cachedItems, allLangs } = this;
    const cachedIds = Object.keys(cachedItems);

    const ids = {};
    allLangs.forEach(lang => {
      ids[lang] = {
        toAdd: [], // Not in cache
        toReplace: [], // Wrong version in cache
        toDelete: [], // Translation item no longer used
      };
    });

    Object.keys(allItems).forEach(id => {
      const { lang } = allItems[id];
      if (cachedItems[id]) {
        if (cachedItems[id].ref !== allItems[id].ref) {
          ids[lang].toReplace.push(id);
        }
      } else {
        ids[lang].toAdd.push(id);
      }
    });

    cachedIds.forEach(id => {
      const { lang } = allItems[id];
      if (!allItems[id]) {
        ids[lang].toDelete.push(id);
      }
    });
    this.idsToUpdateInCache = ids;
  };

  // Init - Step 5
  // Summarize available updates
  getLangsToUpdate = () => {
    const { idsToUpdateInCache } = this;
    const langsToUpdate = [];

    Object.keys(idsToUpdateInCache).forEach(lang => {
      const { toAdd, toReplace } = idsToUpdateInCache[lang];
      if (toAdd.length || toReplace.length) {
        langsToUpdate.push(lang);
      }
    });
    this.langsToUpdate = langsToUpdate;
  };

  // HANDLE USER ACTIONS
  X;
  downloadLang = async lang => {
    const { init, updateAudioCache, updateDownloadedLangsInIdb } = this;
    await updateAudioCache(lang);
    await updateDownloadedLangsInIdb(lang);
    init();
  };

  updateLang = async lang => {
    const { init, updateAudioCache } = this;
    await updateAudioCache(lang);
    init();
  };

  deleteLang = async lang => {};

  // UPDATE CACHE
  // Add, replace, or delete items for particular language
  updateAudioCache = async lang => {
    const { allItems, cachedItems, idsToUpdateInCache } = this;
    const { addToCacheAndIdb, deleteFromCache, deleteFromIdb } = this;

    const idsToReplace = idsToUpdateInCache[lang].toReplace;
    const idsToAdd = [...idsToUpdateInCache[lang].toAdd, ...idsToReplace];
    const idsToDelete = [...idsToUpdateInCache[lang].toDelete];

    const urlsToAdd = idsToAdd.map(id => allItems[id].url);
    const urlsToDelete = [...idsToDelete, ...idsToReplace].map(id => {
      return cachedItems[id].url;
    });

    await addToCacheAndIdb(idsToAdd, urlsToAdd);
    await deleteFromCache(urlsToDelete);
    await deleteFromIdb(idsToDelete);
  };

  addToCacheAndIdb = async (ids, urls) => {
    if (!ids.length) return;
    const { allItems } = this;
    try {
      const audioCache = await self.caches.open('quetzal-audio-cache');
      await audioCache.addAll(urls);
      for (const id of ids) {
        const data = JSON.stringify(allItems[id]);
        await set(id, data, itemsStore);
      }
    } catch (error) {
      console.error('Error adding audio to cache', error);
    }
  };

  deleteFromCache = async urls => {
    if (!urls.length) return;
    try {
      const audioCache = await self.caches.open('quetzal-audio-cache');
      for (const url of urls) {
        await audioCache.delete(url);
      }
    } catch (error) {
      console.error('Error deleting audio from cache', error);
    }
  };

  deleteFromIdb = async ids => {
    if (!ids.length) return;
    for (const id of ids) {
      await del(id, itemsStore);
    }
  };

  updateDownloadedLangsInIdb = async lang => {
    const langs = [...this.downloadedLangs];
    try {
      if (langs.indexOf(lang) === -1) {
        langs.push(lang);
        await set('downloadedLangs', JSON.stringify(langs), infoStore);
      }
    } catch (error) {
      console.error('Error updating Downloaded Languages in IDB', error);
    }
  };
}

// EVENT LISTENERS
const audioCacheManager = new AudioCacheManager();

self.onmessage = async ({ data }) => {
  const { type } = data;
  // console.log('caches in self', 'caches' in self);
  if (type === 'INIT') {
    const { langs, translations, format } = data;
    audioCacheManager.init(langs, translations, format);
  } else if (type === 'DOWNLOAD_LANG') {
    audioCacheManager.downloadLang(data.lang);
  } else if (type === 'UPDATE_LANG') {
    audioCacheManager.updateLang(data.lang);
  } else if (type === 'DELETE_LANG') {
    audioCacheManager.deleteLang(data.lang);
  } else {
    throw new Error(`Unknown message type`);
  }
};

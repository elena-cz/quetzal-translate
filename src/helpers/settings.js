import { Store, set, get } from 'idb-keyval';

const infoStore = new Store('quetzal-info', 'user-settings');

const setIDB = async (key, value) => {
  try {
    await set(key, JSON.stringify(value), infoStore);
  } catch (error) {
    console.error(`Error setting ${key} in IndexedDB`, error);
  }
};

const getIDB = async key => {
  try {
    const value = await get(key, infoStore);
    return value ? JSON.parse(value) : '';
  } catch (error) {
    console.error(`Error getting ${key} in IndexedDB`, error);
  }
};

export { setIDB, getIDB };

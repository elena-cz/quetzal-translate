import { Store, set, get } from 'idb-keyval';
import { sortByText } from '@/helpers/helpers';

const infoStore = new Store('quetzal-info', 'user-settings');

/*

  STATE

 */

const state = {
  favoritePhrases: {}, // ex: { kek: ['123', '456'], es: ['123']} (stored alphabetized)
};

/*

  GETTERS

 */

const getters = {
  indexInFavorites: (state, getters, rootState) => {
    const { currentId, currentLang } = rootState.ui;
    const { favoritePhrases } = state;
    const favoriteIds = favoritePhrases[currentLang] || [];
    return favoriteIds.indexOf(currentId);
  },
};

/*

  ACTIONS

 */

const actions = {
  init({ dispatch }) {
    dispatch('getFavoritesFromIdb');
  },

  async getFavoritesFromIdb({ commit }) {
    try {
      const val = await get('favoritePhrases', infoStore);
      const favorites = val ? JSON.parse(val) : {};
      commit('setFavoritePhrases', favorites);
    } catch (error) {
      console.error('Error getting favorites from IndexedDB', error);
    }
  },

  toggleFavorite({ commit, dispatch, state, getters, rootState }) {
    const { phrases } = rootState.phrases;
    const { currentId: id, currentLang: lang } = rootState.ui;
    const { indexInFavorites } = getters;
    const favoritePhrases = { ...state.favoritePhrases };
    let langIds = favoritePhrases[lang] || [];
    langIds = [...langIds];

    if (indexInFavorites === -1) {
      langIds.push(id);
      langIds = sortByText(phrases, langIds);
      dispatch('analytics/saveFavorite', { id, lang }, { root: true });
    } else {
      langIds.splice(indexInFavorites, 1);
      dispatch('analytics/removeFavorite', { id, lang }, { root: true });
    }

    favoritePhrases[lang] = langIds;
    commit('updateFavoritePhrases', { lang, langIds });
    dispatch('setFavoritePhrasesInIdb', favoritePhrases);
  },

  async setFavoritePhrasesInIdb(context, favorites) {
    try {
      await set('favoritePhrases', JSON.stringify(favorites), infoStore);
    } catch (error) {
      console.error('Error setting favorites in IndexedDB', error);
    }
  },
};

/*

  MUTATIONS

 */

const mutations = {
  setFavoritePhrases(state, favorites) {
    state.favoritePhrases = favorites;
  },

  updateFavoritePhrases(state, { lang, langIds }) {
    state.favoritePhrases[lang] = langIds;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

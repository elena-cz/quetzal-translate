import { sortByText } from '@/helpers/helpers';
import { setIDB, getIDB } from '@/helpers/settings';

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
    const favorites = await getIDB('favoritePhrases');
    commit('setFavoritePhrases', favorites || {});
  },

  toggleFavorite({ commit, dispatch, state, getters, rootState }) {
    const { phrases } = rootState.phrases;
    const { currentId: id, currentLang: lang } = rootState.ui;
    const { indexInFavorites } = getters;
    const favoritePhrases = { ...state.favoritePhrases };
    const isFavorite = indexInFavorites > -1;
    let langIds = favoritePhrases[lang] || [];
    langIds = [...langIds];

    if (!isFavorite) {
      langIds.push(id);
      langIds = sortByText(phrases, langIds);
    } else {
      langIds.splice(indexInFavorites, 1);
    }

    favoritePhrases[lang] = langIds;
    commit('updateFavoritePhrases', { lang, langIds });
    setIDB('favoritePhrases', favoritePhrases);

    if (!isFavorite) {
      dispatch('analytics/saveFavorite', { id, lang }, { root: true });
    } else {
      dispatch('analytics/removeFavorite', { id, lang }, { root: true });
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

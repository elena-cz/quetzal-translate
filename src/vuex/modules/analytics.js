import fb from '@/firebaseConfig';

/*

  STATE

 */

const state = {};

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
  // exampleAction(
  //   { commit, dispatch, state, getters, rootState, rootGetters },
  //   otherParams
  // ) {},

  saveFavorite({ rootGetters }, { id, lang }) {
    // const category = rootGetters['ui/currentLang'];
    console.log('in saveFavorite analytics');
    fb.analytics.logEvent('save_favorite', { phrase_id: id, language: lang });
  },

  removeFavorite({ rootGetters }, id) {
    fb.analytics.logEvent('remove_favorite');
    // const category = rootGetters['ui/currentCategory'];
    // gtag('event', 'Remove_Favorite', {
    //   event_category: category,
    //   event_label: cardId,
    //   value: 0,
    // });
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

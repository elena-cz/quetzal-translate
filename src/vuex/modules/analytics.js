import fb from '@/firebaseConfig';

/*

  STATE

 */

const state = {};

/*

  GETTERS

 */

const getters = {
  // exampleGetter: state => {},
};

/*

  ACTIONS

 */

const actions = {
  sendView(context, { name, path, topic }) {
    fb.analytics.logEvent('screen_view', {
      screen_name: name,
      path,
      topic,
    });
  },

  saveFavorite({ rootState }, { id, lang }) {
    const { currentTopic } = rootState.ui;
    fb.analytics.logEvent('save_favorite', {
      phrase_id: id,
      language: lang,
      topic: currentTopic,
      value: 1,
    });
  },

  removeFavorite({ rootState }, { id, lang }) {
    const { currentTopic } = rootState.ui;
    fb.analytics.logEvent('remove_favorite', {
      phrase_id: id,
      language: lang,
      topic: currentTopic,
      value: 0,
    });
  },
};

/*

  MUTATIONS

 */

const mutations = {
  // exampleMutation(state, data) {
  //   state.property = data;
  // },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

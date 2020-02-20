import fb from '@/firebaseConfig';

/*

  STATE

 */

const state = {
  id: 'dentistry',
  title: '',
  subtopicIds: [],
  subtopics: {},
  areSubtopicsLoaded: false,
};

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
  // exampleAction(
  //   { commit, dispatch, state, getters, rootState, rootGetters },
  //   otherParams
  // ) {},

  async init({ commit }) {
    try {
      const doc = await fb.topicsCollection.doc('dentistry').get();
      const topic = doc.data();
      commit('setTopic', topic);
    } catch (error) {
      console.log('Error getting phrases: ', error);
    }
  },
};

/*

  MUTATIONS

 */

const mutations = {
  setTopic(state, topic) {
    const { id, title, subtopicIds, subtopics } = topic;
    state.id = id;
    state.title = title;
    state.subtopicIds = subtopicIds;
    state.subtopics = subtopics;
    state.areSubtopicsLoaded = true;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

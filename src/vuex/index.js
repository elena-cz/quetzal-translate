import Vue from 'vue';
import Vuex from 'vuex';

import audio from './modules/audio';
import languages from './modules/languages';
import phrases from './modules/phrases';
import sw from './modules/sw';
import topics from './modules/topics';
import user from './modules/user';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    audio,
    languages,
    phrases,
    sw,
    topics,
    user,
  },
  strict: process.env.NODE_ENV !== 'production',
});

store.dispatch('user/init');
store.dispatch('topics/init');
store.dispatch('phrases/init');
// store.dispatch('audio/init');

export default store;

// Template for modules:

// /*

//   STATE

//  */

// const state = {

// };

// /*

//   GETTERS

//  */

// const getters = {
//   exampleGetter: state => { },
// };

// /*

//   ACTIONS

//  */

// const actions = {
//   exampleAction({ commit, dispatch, state, getters, rootState, rootGetters }, otherParams) { },
// };

// /*

//   MUTATIONS

//  */

// const mutations = {
//   exampleMutation(state, data) {
//     state.property = data;
//   },
// };

// export default {
//   namespaced: true,
//   state,
//   getters,
//   actions,
//   mutations,
// };

import Vue from 'vue';
import Vuex from 'vuex';

import languages from './modules/languages';
import phrases from './modules/phrases';
import topics from './modules/topics';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    languages,
    phrases,
    topics,
  },
  strict: process.env.NODE_ENV !== 'production',
});

store.dispatch('topics/init');
store.dispatch('phrases/init');

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

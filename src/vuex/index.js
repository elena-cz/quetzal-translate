import Vue from 'vue';
import Vuex from 'vuex';

import analytics from './modules/analytics';
import audio from './modules/audio';
import device from './modules/device';
import favorites from './modules/favorites';
import languages from './modules/languages';
import phrases from './modules/phrases';
import sw from './modules/sw';
import topics from './modules/topics';
import ui from './modules/ui';
import user from './modules/user';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    analytics,
    audio,
    device,
    favorites,
    languages,
    phrases,
    sw,
    topics,
    ui,
    user,
  },
  strict: process.env.NODE_ENV !== 'production',
});

store.dispatch('user/init');
store.dispatch('topics/init');
store.dispatch('phrases/init');
store.dispatch('favorites/init');
store.dispatch('device/init');

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

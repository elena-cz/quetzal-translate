import fb from '@/firebaseConfig';

// TO DO
// Move translations to own collection instead of subcollections under EN phrases
// Copy topics over to each translation so that they can be queried by topic/language combo

/*

  STATE

 */

const state = {
  phrases: {},
  translations: {},
  arePhrasesLoaded: false,
};

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
  // Get phrases, then translations, and dispatch audio init
  async init({ commit, dispatch }) {
    try {
      const phrases = {};
      const translations = {};
      const phrasesSnapshot = await fb.phrasesCollection
        .where('topics', 'array-contains', 'dentistry')
        .get();
      phrasesSnapshot.forEach(doc => {
        phrases[doc.id] = { ...doc.data(), translations: {} };
      });

      const translationSnapshot = await fb.db
        .collectionGroup('translations')
        .get();
      translationSnapshot.forEach(doc => {
        const { id } = doc;
        const translation = doc.data();
        const { enId, lang } = translation;
        phrases[enId][`${lang}Id`] = id;
        translations[id] = translation;
        // phrases[enId].translations[lang] = translation;
      });
      commit('setPhrases', { phrases, translations });
      dispatch('audio/init', translations, { root: true });
    } catch (error) {
      console.log('Error getting phrases: ', error);
    }
  },
};

/*

  MUTATIONS

 */

const mutations = {
  setPhrases(state, { phrases, translations }) {
    state.phrases = phrases;
    state.translations = translations;
    state.arePhrasesLoaded = true;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

/*

State Examples:

phrases: {
  1gZjiK5sEDCzouYl46LB: {
    createdAt: "2019-11-03T17:12:03-06:00",
    esId: "es-1gZjiK5sEDCzouYl46LB",
    id: "1gZjiK5sEDCzouYl46LB",
    kekId: "kek-1gZjiK5sEDCzouYl46LB",
    langs: ['es', 'kek'],
    lastUpdatedAt: "2019-11-03T17:12:03-06:00",
    text: "Does it hurt anymore?",
    topics: ['dentistry'],
    version:1,
    visible:true
  }
};

translations: {
  es-0fnCd566NShivvjokGnt: {
    createdAt: "2019-11-01T22:31:12-07:00",
    enId: "0fnCd566NShivvjokGnt",
    id: "es-0fnCd566NShivvjokGnt",
    lang: "es",
    lastUpdatedAt: "2019-11-03T18:15:02-06:00",
    mp3_ref: "es-0fnCd566NShivvjokGnt/es-0fnCd566NShivvjokGnt-201911031814.mp3",
    mp3_url: "https://firebasestorage.googleapis.com/v0/b/quetzal-translate.appspot.com/o/es-0fnCd566NShivvjokGnt%2Fes-0fnCd566NShivvjokGnt-201911031814.mp3?alt=media&token=05febe28-1449-44f1-a68f-10f2f3294c78",
    text: "Será solo una punzadita.",
    version:2 ,
    webm_ref: "es-0fnCd566NShivvjokGnt/es-0fnCd566NShivvjokGnt-201911031814.webm",
    webm_url: "https://firebasestorage.googleapis.com/v0/b/quetzal-translate.appspot.com/o/es-0fnCd566NShivvjokGnt%2Fes-0fnCd566NShivvjokGnt-201911031814.webm?alt=media&token=ab35ace6-d3f9-4da0-8e8b-d81f75b9350e",
  }
}

*/

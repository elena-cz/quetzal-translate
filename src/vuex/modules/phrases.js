import fb from '@/firebaseConfig';

/*

  STATE

 */

const state = {
  phrases: {},
  translations: {},
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
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

// const testData = {
//   subtopicIds: ['intake', 'chairside', 'postop'],
//   subtopics: {
//     intake: {
//       id: 'intake',
//       title: 'Intake',
//       phraseIds: [1, 2, 3],
//     },
//     chairside: {
//       id: 'chairside',
//       title: 'Chairside',
//       phraseIds: [4, 5, 6, 7],
//     },
//     postop: {
//       id: 'postop',
//       title: 'Post Op',
//       phraseIds: [8, 9],
//     },
//   },
//   phrases: {
//     1: {
//       id: '1',
//       text: 'Good day!',
//       es: {
//         id: 'es-1',
//         text: '¡Buenos días!',
//       },
//     },
//     2: {
//       id: '2',
//       text: 'I am your dentist',
//       es: {
//         id: 'es-2',
//         text: 'Soy su dentista',
//       },
//     },
//     3: {
//       id: '3',
//       text: 'We need to fix your broken tooth',
//       es: {
//         id: 'es-3',
//         text: 'Tenemos que reparar su diente roto',
//       },
//     },
//     4: {
//       id: '4',
//       text: 'Open your mouth, please.',
//       es: {
//         id: 'es-4',
//         text: 'Abra la boca, por favor.',
//       },
//     },
//     5: {
//       id: '5',
//       text: 'Lift your hand to signal to me if you have pain.',
//       es: {
//         id: 'es-5',
//         text: 'Levante su mano para señalarme si tiene dolor.',
//       },
//     },
//     6: {
//       id: '6',
//       text: 'Close your mouth a little, please.',
//       es: {
//         id: 'es-6',
//         text: 'Cierre la boca un poco, por favor.',
//       },
//     },
//     7: {
//       id: '7',
//       text: "I'm going to clean your teeth.",
//       es: {
//         id: 'es-7',
//         text: 'Le voy a limpiar los dientes.',
//       },
//     },
//     8: {
//       id: '8',
//       text: 'Do not eat or drink for 30 minutes.',
//       es: {
//         id: 'es-8',
//         text: 'No coma ni beba por 30 minutos.',
//       },
//     },
//     9: {
//       id: '9',
//       text: 'Do not brush tonight.',
//       es: {
//         id: 'es-9',
//         text: 'No se cepille esta noche.',
//       },
//     },
//   },
// };

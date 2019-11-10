import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
// import 'firebase/performance';
import 'firebase/storage';
import * as firebaseui from 'firebaseui';

// Firebase init
const config = {
  apiKey: process.env.VUE_APP_APIKEY,
  authDomain: process.env.VUE_APP_AUTHDOMAIN,
  databaseURL: process.env.VUE_APP_DATABASEURL,
  projectId: process.env.VUE_APP_PROJECTID,
  storageBucket: process.env.VUE_APP_STORAGEBUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGINGSENDERID,
  appId: process.env.VUE_APP_APP_ID,
  measurementId: process.env.VUE_APP_MEASUREMENTID,
};
firebase.initializeApp(config);

// Firebase Auth
const auth = firebase.auth();
const { currentUser } = auth;
const authUi = new firebaseui.auth.AuthUI(auth);

const authValues = {
  googleAuth: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
};

// Firestore
const db = firebase.firestore();

db.enablePersistence({ synchronizeTabs: true })
  .then(() => {
    // console.log('Woohoo! Multi-Tab Persistence!');
  })
  .catch(error => {
    console.log('No offline capability', error);
  });

const dbFieldValue = firebase.firestore.FieldValue;

const phrasesCollection = db.collection('phrases');
const topicsCollection = db.collection('topics');

// Storage
const storage = firebase.storage();

// Export
const fb = {
  auth,
  authUi,
  authValues,
  currentUser,
  db,
  dbFieldValue,
  phrasesCollection,
  topicsCollection,
  storage,
};

export default fb;

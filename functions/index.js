const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!');
});

// USER SIGNUP

// When a new user is authenticated, adds user data to Users DB
exports.userSignedUp = functions.auth.user().onCreate(user => {
  const { displayName, email, emailVerified, photoURL, uid } = user;

  return admin
    .firestore()
    .collection('users')
    .doc(uid)
    .set(
      {
        uid,
        profile: {
          name: displayName,
          email,
          emailVerified,
          photoURL,
        },
        role: 'viewer',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    )
    .catch(error => {
      console.error('Error writing document: ', error);
    });
});

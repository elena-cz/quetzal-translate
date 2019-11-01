/* eslint-disable no-console */

import store from '@/vuex';
import { register } from 'register-service-worker';

// Added function to show notification to user
const notifyUserAboutUpdate = worker => {
  // console.log('in notifyUserAboutUpdate');
  store.dispatch('sw/showUpdateNotification', {
    onClick: () => worker.postMessage({ action: 'skipWaiting' }),
  });
};

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log(
        'App is being served from cache by a service worker.\n' +
          'For more details, visit https://goo.gl/AFskqB'
      );
    },
    registered() {
      console.log('Service worker has been registered.');
    },
    cached() {
      console.log('Content has been cached for offline use.');
    },
    updatefound() {
      console.log('New content is downloading.');
    },
    updated(registration) {
      console.log('New content is available; please refresh.');
      notifyUserAboutUpdate(registration.waiting); // Added
    },
    offline() {
      console.log(
        'No internet connection found. App is running in offline mode.'
      );
    },
    error(error) {
      console.error('Error during service worker registration:', error);
    },
  });
}

// Added
let refreshing;
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return;
    window.location.reload();
    refreshing = true;
  });
}

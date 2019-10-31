/* eslint-disable no-restricted-globals, no-underscore-dangle */
/* global workbox */

workbox.setConfig({
  debug: true,
});

workbox.routing.registerNavigationRoute('/index.html');

workbox.routing.setCatchHandler(({ event }) => {
  if (event.request.mode === 'navigate') {
    return caches.match('/index.html');
  }
  return Response.error();
});

workbox.routing.registerRoute(
  /^https:\/\/firebasestorage\.googleapis\.com/,
  new workbox.strategies.CacheFirst({
    cacheName: 'audio-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 180,
      }),
    ],
  })
);

// workbox.routing.registerRoute(
//   new RegExp('.(jpe?g|png|webp|svg)$'),
//   new workbox.strategies.CacheFirst({
//     cacheName: 'images',
//     plugins: [
//       new workbox.expiration.Plugin({
//         maxAgeSeconds: 30 * 24 * 60 * 60,
//       }),
//     ],
//   }),
// );

workbox.core.setCacheNameDetails({ prefix: 'quetzal' });

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

// workbox.googleAnalytics.initialize();

// Install new service worker after user confirms, then reload page

self.addEventListener('message', msg => {
  if (msg.data.action === 'skipWaiting') {
    // console.log('Success! SkipWaiting');
    self.skipWaiting();
  }
});

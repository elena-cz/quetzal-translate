/* eslint-disable no-restricted-globals, no-underscore-dangle */
/* global workbox */

// workbox.setConfig({
//   debug: true,
// });

workbox.routing.registerNavigationRoute('/index.html', {
  blacklist: [/^\/_/, /^\/__/],
});

workbox.routing.setCatchHandler(({ event }) => {
  if (event.request.mode === 'navigate') {
    return caches.match('/index.html');
  }
  return Response.error();
});

workbox.routing.registerRoute(
  /^https:\/\/firebasestorage\.googleapis\.com/,
  new workbox.strategies.CacheFirst({
    cacheName: 'quetzal-audio-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 180,
      }),
    ],
  })
);

// Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
);

// Cache the underlying font files with a cache-first strategy for 1 year.
workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new workbox.strategies.CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
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

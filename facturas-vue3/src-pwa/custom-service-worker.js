/* eslint-env serviceworker */

/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.config.js > pwa > workboxMode is set to "injectManifest"
 */

import { clientsClaim } from 'workbox-core';
import { precacheAndRoute, cleanupOutdatedCaches, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute, NavigationRoute } from 'workbox-routing';

self.skipWaiting();
clientsClaim();

// Define version
const VERSION = '0.0.1';

// Use with precache injection
precacheAndRoute([
  { url: '/facturas-test/version.json', revision: null }, // Precache version.json
  ...self.__WB_MANIFEST // Precache other assets
]);

cleanupOutdatedCaches();

// Non-SSR fallback to index.html
// Production SSR fallback to offline.html (except for dev)
if (process.env.MODE !== 'ssr' || process.env.PROD) {
  registerRoute(
    new NavigationRoute(
      createHandlerBoundToURL(process.env.PWA_FALLBACK_HTML),
      { denylist: [/sw\.js$/, /workbox-(.)*\.js$/] }
    )
  );
}

// Listen for messages from the client
self.addEventListener('message', (event) => {
  console.log('Message received in service worker:', event.data); // Agrega un console.log para verificar
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: VERSION });
    console.log('Version sent:', VERSION); // Agrega otro console.log para verificar
  }
});


// import { clientsClaim } from 'workbox-core';
// import { precacheAndRoute, cleanupOutdatedCaches, createHandlerBoundToURL } from 'workbox-precaching';
// import { registerRoute, NavigationRoute } from 'workbox-routing';

// self.skipWaiting();
// clientsClaim();

// // Define the version of the Service Worker
// const VERSION = '0.0.1';

// // Use with precache injection
// precacheAndRoute(self.__WB_MANIFEST);

// cleanupOutdatedCaches();

// // Non-SSR fallback to index.html
// // Production SSR fallback to offline.html (except for dev)
// if (process.env.MODE !== 'ssr' || process.env.PROD) {
//   registerRoute(
//     new NavigationRoute(
//       createHandlerBoundToURL(process.env.PWA_FALLBACK_HTML),
//       { denylist: [/sw\.js$/, /workbox-(.)*\.js$/] }
//     )
//   );
// }

// // Add event listener to respond with the version when requested
// self.addEventListener('message', event => {
//   console.log('Message received in Service Worker', event.data);
//   if (event.data && event.data.type === 'GET_VERSION') {
//     console.log('Sending version back to client');
//     event.ports[0].postMessage({ version: VERSION });
//   }
// });
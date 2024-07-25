/* eslint-env serviceworker */

/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.config.js > pwa > workboxMode is set to "injectManifest"
 */

import { clientsClaim } from 'workbox-core';
import { precacheAndRoute, cleanupOutdatedCaches, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute, NavigationRoute } from 'workbox-routing';

const PWA = location.pathname.split('/')[1];
const ver = '0.0.1'; // ver debe cambiar para actualizar el cache

self.skipWaiting();
clientsClaim();

// Define version

// Use with precache injection
const precacheManifest = self.__WB_MANIFEST;

// Optionally add version.json if not already in __WB_MANIFEST
if (!precacheManifest.some(entry => entry.url === '/facturas-test/version.json')) {
  precacheManifest.push({ url: '/facturas-test/version.json', revision: null });
}

precacheAndRoute(precacheManifest);

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
  if (event.data && event.data.action === 'getVersion') {
    event.ports[0].postMessage({ version: ver });
  }
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting(); // actualiza sw
    event.ports[0].postMessage({
      version: PWA + ver,
    });
  } else if (event.data.action === 'getSWVer') {
    event.ports[0].postMessage({
      version: PWA + ver,
    });
  } else if (event.data.action === 'getCliCnt') {
    self.clients.matchAll().then((wins) => {
      event.ports[0].postMessage({
        cliCnt: wins.length,
      });
    });
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
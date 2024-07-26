







import { clientsClaim } from 'workbox-core';
import { precacheAndRoute, cleanupOutdatedCaches, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute, NavigationRoute } from 'workbox-routing';

self.skipWaiting();
clientsClaim();

// Use with precache injection
precacheAndRoute(self.__WB_MANIFEST);

// Ensure index.html is precached
precacheAndRoute([{ url: 'index.html', revision: null }]);

cleanupOutdatedCaches();

// Non-SSR fallbacks to index.html
registerRoute(
  new NavigationRoute(
    createHandlerBoundToURL('index.html'),
    { denylist: [/workbox-(.)*\.js$/] }
  )
);





























// import { clientsClaim } from 'workbox-core';
// import { precacheAndRoute, cleanupOutdatedCaches, createHandlerBoundToURL } from 'workbox-precaching';
// import { registerRoute, NavigationRoute } from 'workbox-routing';
// import { CacheFirst, NetworkFirst } from 'workbox-strategies';
// import { ExpirationPlugin } from 'workbox-expiration';

// const PWA = location.pathname.split('/')[1], ver = '0.0.1'; // ver debe cambiar para actualizar el cache

// self.skipWaiting();
// clientsClaim();

// // Precaching
// precacheAndRoute(self.__WB_MANIFEST || []);
// cleanupOutdatedCaches();

// // Cache de imágenes con estrategia CacheFirst
// registerRoute(
//   ({ request }) => request.destination === 'image',
//   new CacheFirst({
//     cacheName: 'image-cache',
//     plugins: [
//       new ExpirationPlugin({
//         maxEntries: 60,
//         maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
//       }),
//     ],
//   })
// );




// // Otras rutas que quieras cachear
// registerRoute(
//   ({ request }) => request.destination === 'script' || request.destination === 'style',
//   new CacheFirst({
//     cacheName: 'static-resources',
//     plugins: [
//       new ExpirationPlugin({
//         maxEntries: 100,
//         maxAgeSeconds: 7 * 24 * 60 * 60, // 7 días
//       }),
//     ],
//   })
// );

// // Listener para manejar mensajes de clientes
// self.addEventListener('message', (event) => {
//   if (event.data && event.data.action === 'getVersion') {
//     event.ports[0].postMessage({ version: '0.0.1' });
//   }
//   if (event.data.action === 'skipWaiting') {
//     self.skipWaiting();
//     event.ports[0].postMessage({
//       "version": PWA + ver
//     });
//   } else if (event.data.action === 'getSWVer') {
//     event.ports[0].postMessage({
//       "version": PWA + ver
//     });
//   } else if (event.data.action === 'getCliCnt') {
//     self.clients.matchAll().then(wins => {
//       event.ports[0].postMessage({
//         "cliCnt": wins.length
//       });
//     });
//   }
// });



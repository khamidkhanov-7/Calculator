// Version kesh nomini boshqaradi
const CACHE_NAME = 'calc-cache-v2';

const FILES_TO_CACHE = [
  './',
  './index.html',
  './click.mp3',
  './manifest.json',
  './style.css',
  './script.js',       // JavaScript faylini ham qo‘sh!
  './icon-192.png',
  './icon-512.png'
];

// INSTALL
self.addEventListener('install', event => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[Service Worker] Caching app shell');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// ACTIVATE
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activate');
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) {
            console.log('[Service Worker] Removing old cache', key);
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// FETCH
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Keshda bo‘lsa — qaytaradi
      if (response) {
        return response;
      }
      // Aks holda — internetdan oladi
      return fetch(event.request);
    })
  );
});

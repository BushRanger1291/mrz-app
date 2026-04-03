const cacheName = 'mrz-cache-v1';
const assets = [
  './MRZ.html',
  './manifest.json'
];

// Installation : mise en cache des fichiers
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Interception des requêtes pour servir le cache si hors-ligne
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});
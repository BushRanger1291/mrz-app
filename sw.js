const cacheName = 'mrz-cache-v1';
const assets = [
  './index.html',
  './manifest.json',
  'https://cdn-icons-png.flaticon.com/512/1055/1055666.png'
];

// Installation : mise en cache
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Activation et nettoyage des anciens caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.filter(key => key !== cacheName).map(key => caches.delete(key)));
    })
  );
});

// Interception des requêtes
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});
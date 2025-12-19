const CACHE_NAME = 'gs-studio-v1.1';
const ASSETS = [
  'index.html',
  'Tapple.html',
  'GenerateurPW.html',
  'style.css',
  'manifest.json'
];

// Installation du Service Worker
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Intercepter les requêtes pour servir le cache
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
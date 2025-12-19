
const CACHE_NAME = 'gs-studio-v1.0.2'; // Assurez-vous que cette variable existe
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'GET_VERSION') {
    // On renvoie le nom du cache au port qui a posé la question
    event.ports[0].postMessage(CACHE_NAME);
  }
});

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

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage(CACHE_NAME);
  }
});



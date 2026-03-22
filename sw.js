const CACHE = 'catalogue-v9';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Pour le fichier Excel : toujours réseau en priorité (données à jour)
  if (e.request.url.includes('catalogue.xlsx')) {
    e.respondWith(
      fetch(e.request).catch(() => caches.match(e.request))
    );
    return;
  }
  // Pour le reste : cache en priorité
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});

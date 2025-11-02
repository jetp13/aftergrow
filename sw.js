const SW_VERSION = "2025-11-03-1"; // force refresh
const CACHE_NAME = 'afterglow-v1';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './audio/afterglow-5min.m4a',
  './data/emergency.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => (k !== CACHE_NAME) && caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);
  const isDataOrAudio = url.pathname.includes('/data/') || url.pathname.includes('/audio/');
  if (isDataOrAudio) {
    event.respondWith(
      fetch(new Request(req, { cache: 'reload' })).then(r => {
        const clone = r.clone();
        caches.open(CACHE_NAME).then(c => c.put(req, clone));
        return r;
      }).catch(() => caches.match(req))
    );
    return;
  }
  event.respondWith(caches.match(req).then((cached) => cached || fetch(req)));
});

const CACHE_NAME = 'bk-distribution-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/login.html',
  '/products.html',
  '/orders.html',
  '/profile.html',
  '/main.js',
  '/db.js',
  '/manifest.json',
  '/resources/bk-distribution-logo.png',
  '/resources/sugar-product-1.png',
  '/resources/sugar-product-2.png',
  '/resources/sugar-product-3.png',
  '/resources/warehouse-hero.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(names => 
      Promise.all(names.map(name => name !== CACHE_NAME && caches.delete(name)))
    )
  );
  // Claim clients without forcing reload
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

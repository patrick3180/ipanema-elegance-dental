const CACHE_NAME = 'clareamento-mobile-v1';
const CRITICAL_RESOURCES = [
  '/',
  '/lp/clareamento-dental',
  '/lovable-uploads/Vertical de jaleco.avif',
  '/lovable-uploads/Vertical de jaleco.webp',
  '/lovable-uploads/Vertical de jaleco.png'
];

// Install service worker and cache critical resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(CRITICAL_RESOURCES);
      })
  );
  self.skipWaiting();
});

// Activate service worker and clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Cache-first strategy for static assets, network-first for HTML
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Cache-first for images and static assets
  if (event.request.destination === 'image' || 
      url.pathname.includes('/assets/') ||
      url.pathname.includes('/lovable-uploads/')) {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          if (response) {
            return response;
          }
          return fetch(event.request).then((response) => {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
            return response;
          });
        })
    );
  }
  // Network-first for HTML pages
  else if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch(() => {
          return caches.match(event.request);
        })
    );
  }
});
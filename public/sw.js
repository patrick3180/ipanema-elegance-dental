// Service Worker for Core Web Vitals Optimization
const CACHE_NAME = 'dra-carla-v1';
const urlsToCache = [
  '/',
  '/src/index.css',
  '/lovable-uploads/729cc6a8-3563-45af-9e82-3581b91c7d7e.png',
  '/lovable-uploads/164bae76-428b-4fae-a600-ba61172b5dac.png',
  'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600&display=swap'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching critical resources');
        return cache.addAll(urlsToCache);
      })
      .catch(err => console.log('Service Worker: Error caching resources', err))
  );
});

// Fetch event - Stale While Revalidate strategy for images
self.addEventListener('fetch', event => {
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          // Return cached version if available
          if (response) {
            // Fetch updated version in background
            fetch(event.request).then(fetchResponse => {
              caches.open(CACHE_NAME).then(cache => {
                cache.put(event.request, fetchResponse.clone());
              });
            });
            return response;
          }
          // If not in cache, fetch and cache
          return fetch(event.request).then(fetchResponse => {
            if (!fetchResponse || fetchResponse.status !== 200) {
              return fetchResponse;
            }
            const responseToCache = fetchResponse.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache);
            });
            return fetchResponse;
          });
        })
    );
  }
});

// Activate event - Clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
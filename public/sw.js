// Service Worker para cache de recursos críticos
const CACHE_NAME = 'dra-carla-v1';
const urlsToCache = [
  '/',
  '/src/index.css',
  '/lovable-uploads/729cc6a8-3563-45af-9e82-3581b91c7d7e.png',
  '/lovable-uploads/164bae76-428b-4fae-a600-ba61172b5dac.png',
  '/lovable-uploads/fef24f70-4659-453e-8fee-79dee34b6220.png'
];

// Install - cache recursos críticos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache opened');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate - limpar caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch - servir do cache, fallback para network
self.addEventListener('fetch', event => {
  // Cache-first para imagens
  if (event.request.url.includes('/lovable-uploads/') || 
      event.request.url.includes('.png') || 
      event.request.url.includes('.jpg') ||
      event.request.url.includes('.webp')) {
    
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          if (response) {
            return response;
          }
          return fetch(event.request).then(response => {
            // Não cachear respostas ruins
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clonar e cachear a resposta
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          });
        })
    );
    return;
  }
  
  // Network-first para outros recursos
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Cachear recursos CSS e JS
        if (event.request.url.includes('.css') || event.request.url.includes('.js')) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
        }
        return response;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});

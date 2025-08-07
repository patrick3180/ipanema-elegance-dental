// Service Worker v2 - Cache otimizado
const CACHE_NAME = 'dra-carla-v2'; // Incrementar versão para forçar update
const urlsToCache = [
  '/',
  '/src/index.css',
  // APENAS WebP - remover PNG antigo do cache
  '/lovable-uploads/729cc6a8-3563-45af-9e82-3581b91c7d7e.webp',
  '/lovable-uploads/164bae76-428b-4fae-a600-ba61172b5dac.png',
  '/lovable-uploads/fef24f70-4659-453e-8fee-79dee34b6220.png'
];

// Lista de arquivos para NÃO cachear (PNG antigo)
const doNotCache = [
  '/lovable-uploads/729cc6a8-3563-45af-9e82-3581b91c7d7e.png'
];

// Install - cache recursos críticos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache opened v2');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate - limpar caches antigos incluindo PNG
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
    }).then(() => {
      // Limpar especificamente o PNG antigo de todos os caches
      return caches.open(CACHE_NAME).then(cache => {
        return cache.delete('/lovable-uploads/729cc6a8-3563-45af-9e82-3581b91c7d7e.png');
      });
    }).then(() => self.clients.claim())
  );
});

// Fetch - servir do cache, mas bloquear PNG antigo
self.addEventListener('fetch', event => {
  const url = event.request.url;
  
  // Bloquear completamente o PNG antigo
  if (doNotCache.some(blocked => url.includes(blocked))) {
    event.respondWith(
      new Response('', { status: 404, statusText: 'Not Found' })
    );
    return;
  }
  
  // Cache-first para imagens WebP
  if (url.includes('.webp') || url.includes('.jpg')) {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          if (response) {
            return response;
          }
          return fetch(event.request).then(response => {
            if (!response || response.status !== 200) {
              return response;
            }
            
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

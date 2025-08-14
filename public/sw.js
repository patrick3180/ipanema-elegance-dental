// EMERGENCY SERVICE WORKER v4 - Ultra Aggressive Caching
const CACHE_NAME = 'emergency-cache-v4';
const LANDING_CACHE = 'emergency-landing-v4';
const STATIC_CACHE = 'emergency-static-v4';

// Critical landing page resources
const landingResources = [
  '/',
  '/lp/clareamento-dental',
  '/lp/consulta-inicial',
  '/src/index.css',
  '/lovable-uploads/RIT08058-vertical-doutora-site.webp', // Consulta inicial hero
  '/lovable-uploads/a1389f08-ef82-4c41-abe2-f8ed05848f80.png', // Clareamento hero
  '/lovable-uploads/729cc6a8-3563-45af-9e82-3581b91c7d7e.webp',
  '/lovable-uploads/164bae76-428b-4fae-a600-ba61172b5dac.png',
  '/lovable-uploads/fef24f70-4659-453e-8fee-79dee34b6220.png'
];

// Assets to cache with different strategies
const staticAssets = ['/src/index.css'];
const imageAssets = ['.webp', '.jpg', '.png'];

// Deprecated assets to remove
const doNotCache = [
  '/lovable-uploads/729cc6a8-3563-45af-9e82-3581b91c7d7e.png'
];

// Install - cache critical landing page resources
self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then(cache => {
        console.log('Main cache opened v3');
        return cache.addAll(['/']);
      }),
      caches.open(LANDING_CACHE).then(cache => {
        console.log('Landing cache opened');
        return cache.addAll(landingResources);
      })
    ]).then(() => self.skipWaiting())
  );
});

// Activate - clean old caches and deprecated assets
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME && cacheName !== LANDING_CACHE) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Remove deprecated assets from all caches
      return Promise.all([
        caches.open(CACHE_NAME),
        caches.open(LANDING_CACHE)
      ]).then(([mainCache, landingCache]) => {
        return Promise.all(
          doNotCache.map(asset => {
            return Promise.all([
              mainCache.delete(asset),
              landingCache.delete(asset)
            ]);
          })
        );
      });
    }).then(() => self.clients.claim())
  );
});

// Fetch - optimized caching strategies
self.addEventListener('fetch', event => {
  const url = event.request.url;
  const request = event.request;
  
  // Block deprecated assets
  if (doNotCache.some(blocked => url.includes(blocked))) {
    event.respondWith(
      new Response('', { status: 410, statusText: 'Gone' })
    );
    return;
  }
  
  // Landing pages - Cache First
  if (url.includes('/lp/clareamento-dental') || url.includes('/lp/consulta-inicial')) {
    event.respondWith(
      caches.match(request, { cacheName: LANDING_CACHE })
        .then(response => {
          if (response) {
            return response;
          }
          return fetch(request).then(fetchResponse => {
            if (fetchResponse.status === 200) {
              caches.open(LANDING_CACHE).then(cache => {
                cache.put(request, fetchResponse.clone());
              });
            }
            return fetchResponse;
          });
        })
        .catch(() => caches.match(request))
    );
    return;
  }
  
  // Images - Cache First with performance headers
  if (imageAssets.some(ext => url.includes(ext))) {
    event.respondWith(
      caches.match(request)
        .then(response => {
          if (response) {
            return response;
          }
          
          return fetch(request).then(fetchResponse => {
            if (!fetchResponse || fetchResponse.status !== 200) {
              return fetchResponse;
            }
            
            // Clone and cache with performance headers
            const responseToCache = fetchResponse.clone();
            const headers = new Headers(responseToCache.headers);
            headers.set('Cache-Control', 'public, max-age=31536000, immutable');
            
            const optimizedResponse = new Response(responseToCache.body, {
              status: responseToCache.status,
              statusText: responseToCache.statusText,
              headers: headers
            });
            
            caches.open(LANDING_CACHE).then(cache => {
              cache.put(request, optimizedResponse.clone());
            });
            
            return optimizedResponse;
          });
        })
    );
    return;
  }
  
  // CSS/JS Assets - EMERGENCY Cache First Strategy
  if (url.includes('/assets/') || staticAssets.some(asset => url.includes(asset))) {
    event.respondWith(
      caches.match(request)
        .then(response => {
          if (response) {
            return response;
          }
          
          return fetch(request).then(fetchResponse => {
            if (fetchResponse.status === 200) {
              // Add aggressive cache headers
              const headers = new Headers(fetchResponse.headers);
              headers.set('Cache-Control', 'public, max-age=31536000, immutable');
              
              const optimizedResponse = new Response(fetchResponse.body, {
                status: fetchResponse.status,
                statusText: fetchResponse.statusText,
                headers: headers
              });
              
              caches.open(STATIC_CACHE).then(cache => {
                cache.put(request, optimizedResponse.clone());
              });
              
              return optimizedResponse;
            }
            return fetchResponse;
          });
        })
        .catch(() => caches.match(request))
    );
    return;
  }
  
  // Default - Network First
  event.respondWith(
    fetch(request)
      .then(response => {
        if (response.status === 200 && request.method === 'GET') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => caches.match(request))
  );
});

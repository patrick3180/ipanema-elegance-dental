// Service Worker for Phase 1 Performance Optimizations
const CACHE_NAME = 'dental-performance-v1';
const STATIC_CACHE_NAME = 'dental-static-v1';

// Critical resources to cache immediately
const CRITICAL_RESOURCES = [
  '/',
  '/servicos',
  '/sobre',
  '/contato',
  '/index.css',
  '/manifest.json'
];

// Static assets to cache
const STATIC_ASSETS = [
  // Add other static assets as needed
];

// Install event - cache critical resources
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker');
  
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then((cache) => {
        console.log('[SW] Caching critical resources');
        return cache.addAll(CRITICAL_RESOURCES);
      }),
      caches.open(STATIC_CACHE_NAME).then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
    ])
  );
  
  // Force activation
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE_NAME;
          })
          .map((cacheName) => {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          })
      );
    })
  );
  
  // Take control of all clients
  event.waitUntil(clients.claim());
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip external requests (except fonts and images)
  if (url.origin !== location.origin && 
      !url.hostname.includes('fonts.googleapis.com') &&
      !url.hostname.includes('fonts.gstatic.com') &&
      !url.hostname.includes('images.ctfassets.net')) {
    return;
  }

  event.respondWith(
    (async () => {
      try {
        // Strategy 1: Cache first for static assets
        if (isStaticAsset(url.pathname)) {
          const cachedResponse = await caches.match(request);
          if (cachedResponse) {
            return cachedResponse;
          }
          
          const networkResponse = await fetch(request);
          if (networkResponse.ok) {
            const cache = await caches.open(STATIC_CACHE_NAME);
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        }

        // Strategy 2: Network first for HTML pages
        if (isHTMLRequest(request)) {
          try {
            const networkResponse = await fetch(request);
            if (networkResponse.ok) {
              const cache = await caches.open(CACHE_NAME);
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          } catch (error) {
            console.log('[SW] Network failed, falling back to cache');
            const cachedResponse = await caches.match(request);
            if (cachedResponse) {
              return cachedResponse;
            }
            throw error;
          }
        }

        // Strategy 3: Cache first for images and fonts
        if (isImageOrFont(url.pathname)) {
          const cachedResponse = await caches.match(request);
          if (cachedResponse) {
            return cachedResponse;
          }
          
          const networkResponse = await fetch(request);
          if (networkResponse.ok) {
            const cache = await caches.open(STATIC_CACHE_NAME);
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        }

        // Default: network first
        return await fetch(request);
        
      } catch (error) {
        console.error('[SW] Fetch failed:', error);
        throw error;
      }
    })()
  );
});

// Helper functions
function isStaticAsset(pathname) {
  return pathname.includes('/assets/') || 
         pathname.endsWith('.css') || 
         pathname.endsWith('.js') ||
         pathname.endsWith('.json');
}

function isHTMLRequest(request) {
  return request.headers.get('accept')?.includes('text/html');
}

function isImageOrFont(pathname) {
  return /\.(png|jpg|jpeg|gif|webp|svg|woff|woff2|ttf|eot)$/i.test(pathname);
}

// Background sync for analytics
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Implement background sync for analytics or other tasks
  console.log('[SW] Background sync triggered');
}

// Performance monitoring
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CACHE_PERFORMANCE') {
    measureCachePerformance();
  }
});

async function measureCachePerformance() {
  const cacheNames = await caches.keys();
  const performance = {};
  
  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    performance[cacheName] = keys.length;
  }
  
  console.log('[SW] Cache performance:', performance);
}
// Enhanced Service Worker for Core Web Vitals Optimization
const CACHE_NAME = 'dra-carla-v2';
const STATIC_CACHE = 'static-cache-v2';
const IMAGE_CACHE = 'image-cache-v2';
const API_CACHE = 'api-cache-v1';

const urlsToCache = [
  '/',
  '/src/index.css',
  '/lovable-uploads/729cc6a8-3563-45af-9e82-3581b91c7d7e.png',
  '/lovable-uploads/164bae76-428b-4fae-a600-ba61172b5dac.png'
];

const CACHE_STRATEGIES = {
  images: { name: IMAGE_CACHE, maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
  static: { name: STATIC_CACHE, maxAge: 7 * 24 * 60 * 60 * 1000 }, // 7 days
  api: { name: API_CACHE, maxAge: 60 * 60 * 1000 } // 1 hour
};

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

// Enhanced fetch event with multiple caching strategies
self.addEventListener('fetch', function(event) {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests and chrome-extension requests
  if (request.method !== 'GET' || url.protocol === 'chrome-extension:') return;

  // Handle different resource types with specific strategies
  if (request.destination === 'image' || url.pathname.includes('/lovable-uploads/')) {
    event.respondWith(handleImageRequest(request));
  } else if (url.pathname.endsWith('.css') || url.pathname.endsWith('.js')) {
    event.respondWith(handleStaticRequest(request));
  } else if (url.hostname.includes('ctfassets.net') || url.pathname.includes('/api/')) {
    event.respondWith(handleAPIRequest(request));
  }
});

// Image caching with stale-while-revalidate
async function handleImageRequest(request) {
  const cache = await caches.open(CACHE_STRATEGIES.images.name);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    // Return cached version immediately
    fetch(request).then(response => {
      if (response.ok) {
        cache.put(request, response.clone());
      }
    }).catch(() => {});
    return cachedResponse;
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    // Return offline fallback for images
    return new Response('<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f0f0f0"/><text x="50%" y="50%" text-anchor="middle" dy=".3em">Image unavailable</text></svg>', {
      headers: { 'Content-Type': 'image/svg+xml' }
    });
  }
}

// Static resources with cache-first strategy
async function handleStaticRequest(request) {
  const cache = await caches.open(CACHE_STRATEGIES.static.name);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    return cachedResponse || new Response('Resource unavailable', { status: 503 });
  }
}

// API requests with network-first strategy
async function handleAPIRequest(request) {
  const cache = await caches.open(CACHE_STRATEGIES.api.name);

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cachedResponse = await cache.match(request);
    return cachedResponse || new Response('Service unavailable', { status: 503 });
  }
}

// Enhanced activate event - Clean up old caches and take control
self.addEventListener('activate', function(event) {
  const currentCaches = [CACHE_NAME, STATIC_CACHE, IMAGE_CACHE, API_CACHE];
  
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (!currentCaches.includes(cacheName)) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Take control of all pages immediately
      return self.clients.claim();
    })
  );
});
// Enhanced Service Worker for aggressive performance optimization
const CACHE_NAME = 'dental-clinic-v3';
const STATIC_CACHE = 'static-v3';
const DYNAMIC_CACHE = 'dynamic-v3';
const IMAGE_CACHE = 'images-v3';
const API_CACHE = 'api-v3';

// Critical resources to cache immediately
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/src/index.css',
  '/lovable-uploads/729cc6a8-3563-45af-9e82-3581b91c7d7e.png',
  '/lovable-uploads/164bae76-428b-4fae-a600-ba61172b5dac.png'
];

// Contentful and external domains to cache aggressively
const CACHEABLE_DOMAINS = [
  'cdn.contentful.com',
  'images.ctfassets.net',
  'fonts.googleapis.com',
  'fonts.gstatic.com'
];

// Cache strategies for different resource types
const CACHE_STRATEGIES = {
  CACHE_FIRST: 'cache-first',
  NETWORK_FIRST: 'network-first', 
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate'
};

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('Service Worker: Caching critical resources');
        return cache.addAll(STATIC_ASSETS);
      })
      .catch(err => console.log('Service Worker: Error caching resources', err))
  );
  self.skipWaiting();
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
  } else if (CACHEABLE_DOMAINS.some(domain => url.hostname.includes(domain))) {
    event.respondWith(handleAPIRequest(request));
  } else if (request.destination === 'document') {
    event.respondWith(handleDocumentRequest(request));
  }
});

// Image caching with stale-while-revalidate
async function handleImageRequest(request) {
  try {
    const cache = await caches.open(IMAGE_CACHE);
    const cached = await cache.match(request);
    
    if (cached) {
      // Return cached image and update in background
      fetchAndCache(request, cache);
      return cached;
    }
    
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    return new Response('<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f0f0f0"/><text x="50%" y="50%" text-anchor="middle" dy=".3em">Image unavailable</text></svg>', {
      headers: { 'Content-Type': 'image/svg+xml' }
    });
  }
}

// Static assets with cache-first strategy
async function handleStaticRequest(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cached = await cache.match(request);
  
  if (cached) return cached;
  
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    return new Response('Asset not found', { status: 404 });
  }
}

// Contentful API caching with stale-while-revalidate
async function handleAPIRequest(request) {
  try {
    const cache = await caches.open(DYNAMIC_CACHE);
    const cached = await cache.match(request);
    
    // Always try to update in background
    const networkPromise = fetch(request).then(response => {
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    });

    // Return cached version immediately if available
    if (cached) {
      // Update cache in background
      networkPromise.catch(() => {});
      return cached;
    }

    // Wait for network if no cache
    return await networkPromise;
  } catch (error) {
    const cache = await caches.open(DYNAMIC_CACHE);
    const cached = await cache.match(request);
    return cached || new Response('Network error', { status: 503 });
  }
}

// Document requests with network-first strategy
async function handleDocumentRequest(request) {
  try {
    const response = await fetch(request);
    const cache = await caches.open(DYNAMIC_CACHE);
    cache.put(request, response.clone());
    return response;
  } catch (error) {
    const cache = await caches.open(DYNAMIC_CACHE);
    const cached = await cache.match(request);
    return cached || new Response('Page unavailable', { status: 503 });
  }
}

// Background fetch and cache utility
async function fetchAndCache(request, cache) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
  } catch (error) {
    // Silently fail for background updates
  }
}

// Enhanced activate event - Clean up old caches and take control
self.addEventListener('activate', function(event) {
  const currentCaches = [CACHE_NAME, STATIC_CACHE, IMAGE_CACHE, DYNAMIC_CACHE, API_CACHE];
  
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

// Handle messages from main thread
self.addEventListener('message', (event) => {
  if (event.data.type === 'ENABLE_AGGRESSIVE_CACHE') {
    console.log('Aggressive caching enabled');
  }
});
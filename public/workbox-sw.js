// Enhanced Workbox Service Worker with advanced features
importScripts('https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js');

if (workbox) {
  console.log('Workbox loaded successfully');
  
  // Configure workbox
  workbox.setConfig({
    debug: false
  });

  // Skip waiting and claim clients
  workbox.core.skipWaiting();
  workbox.core.clientsClaim();

  // Precache static assets
  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);

  // Runtime caching strategies
  
  // Cache page navigations with network first
  workbox.routing.registerRoute(
    ({ request }) => request.mode === 'navigate',
    new workbox.strategies.NetworkFirst({
      cacheName: 'pages-cache',
      plugins: [
        new workbox.cacheableResponse.CacheableResponsePlugin({
          statuses: [0, 200]
        }),
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 50,
          maxAgeSeconds: 24 * 60 * 60 // 24 hours
        })
      ]
    })
  );

  // Cache images with cache first strategy
  workbox.routing.registerRoute(
    ({ request }) => request.destination === 'image',
    new workbox.strategies.CacheFirst({
      cacheName: 'images-cache',
      plugins: [
        new workbox.cacheableResponse.CacheableResponsePlugin({
          statuses: [0, 200]
        }),
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 100,
          maxAgeSeconds: 7 * 24 * 60 * 60 // 7 days
        })
      ]
    })
  );

  // Cache Contentful assets with stale while revalidate
  workbox.routing.registerRoute(
    ({ url }) => url.hostname === 'images.ctfassets.net' || url.hostname === 'cdn.contentful.com',
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'contentful-cache',
      plugins: [
        new workbox.cacheableResponse.CacheableResponsePlugin({
          statuses: [0, 200]
        }),
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
        })
      ]
    })
  );

  // Cache Google Fonts with cache first
  workbox.routing.registerRoute(
    ({ url }) => url.origin === 'https://fonts.googleapis.com' || url.origin === 'https://fonts.gstatic.com',
    new workbox.strategies.CacheFirst({
      cacheName: 'google-fonts',
      plugins: [
        new workbox.cacheableResponse.CacheableResponsePlugin({
          statuses: [0, 200]
        }),
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 30,
          maxAgeSeconds: 365 * 24 * 60 * 60 // 1 year
        })
      ]
    })
  );

  // Cache API responses with network first
  workbox.routing.registerRoute(
    ({ url }) => url.pathname.startsWith('/api/'),
    new workbox.strategies.NetworkFirst({
      cacheName: 'api-cache',
      plugins: [
        new workbox.cacheableResponse.CacheableResponsePlugin({
          statuses: [0, 200]
        }),
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 // 1 hour
        })
      ]
    })
  );

  // Background sync for form submissions
  const bgSyncPlugin = new workbox.backgroundSync.BackgroundSyncPlugin('form-sync', {
    maxRetentionTime: 24 * 60 // 24 hours
  });

  // Store for background sync queue
  let backgroundSyncQueue = [];

  // Listen for messages from main thread
  self.addEventListener('message', (event) => {
    const { type, data, config } = event.data;

    switch (type) {
      case 'WORKBOX_CONFIG':
        console.log('Workbox configuration received:', config);
        break;
        
      case 'BACKGROUND_SYNC':
        // Add to background sync queue
        backgroundSyncQueue.push(data);
        console.log('Added to background sync queue:', data);
        
        // Try to sync immediately if online
        if (navigator.onLine) {
          processSyncQueue();
        }
        break;
        
      case 'RETRY_SYNC':
        if (navigator.onLine) {
          processSyncQueue();
        }
        break;
    }
  });

  // Process background sync queue
  async function processSyncQueue() {
    while (backgroundSyncQueue.length > 0) {
      const item = backgroundSyncQueue.shift();
      try {
        const response = await fetch(item.url, {
          method: item.method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(item.data)
        });
        
        if (response.ok) {
          console.log('Background sync successful:', item);
        } else {
          // Re-add to queue if failed
          backgroundSyncQueue.unshift(item);
          break;
        }
      } catch (error) {
        console.error('Background sync failed:', error);
        // Re-add to queue for retry
        backgroundSyncQueue.unshift(item);
        break;
      }
    }
  }

  // Offline fallback
  workbox.routing.setCatchHandler(({ event }) => {
    switch (event.request.destination) {
      case 'document':
        return caches.match('/offline.html') || Response.error();
        
      case 'image':
        return new Response('<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f0f0f0"/><text x="50%" y="50%" text-anchor="middle" dy=".3em">Offline</text></svg>', {
          headers: { 'Content-Type': 'image/svg+xml' }
        });
        
      default:
        return Response.error();
    }
  });

  // Advanced cache invalidation
  self.addEventListener('activate', (event) => {
    event.waitUntil(
      (async () => {
        // Clean up old caches
        const cacheNames = await caches.keys();
        const oldCaches = cacheNames.filter(name => 
          name.startsWith('workbox-') && !name.includes('v3')
        );
        
        await Promise.all(oldCaches.map(name => caches.delete(name)));
        console.log('Old caches cleaned up');
      })()
    );
  });

} else {
  console.log('Workbox failed to load');
}
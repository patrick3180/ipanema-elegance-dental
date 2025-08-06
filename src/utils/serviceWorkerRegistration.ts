// Service Worker Registration for Performance Optimization

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  window.location.hostname === '[::1]' ||
  window.location.hostname.match(
    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
  )
);

export function register() {
  if ('serviceWorker' in navigator) {
    const publicUrl = new URL(import.meta.env.BASE_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${import.meta.env.BASE_URL}sw.js`;

      if (isLocalhost) {
        checkValidServiceWorker(swUrl);
      } else {
        registerValidSW(swUrl);
      }
    });
  }
}

function registerValidSW(swUrl: string) {
  // Try Phase 1 optimized service worker first
  const phase1SwUrl = swUrl.replace('sw.js', 'sw-phase1.js');
  
  navigator.serviceWorker
    .register(phase1SwUrl)
    .then(registration => {
      console.log('✅ Phase 1 SW registered: ', registration);
      
      // Message the service worker to measure cache performance
      if (registration.active) {
        registration.active.postMessage({ type: 'CACHE_PERFORMANCE' });
      }
      
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              console.log('🔄 New optimized content available; please refresh.');
            } else {
              console.log('✅ Optimized content cached for offline use.');
            }
          }
        };
      };
    })
    .catch(error => {
      console.log('⚠️ Phase 1 SW failed, falling back to basic SW:', error);
      
      // Fallback to basic service worker
      navigator.serviceWorker
        .register(swUrl)
        .then(registration => {
          console.log('✅ Fallback SW registered: ', registration);
        })
        .catch(fallbackError => {
          console.error('❌ SW registration failed completely: ', fallbackError);
        });
    });
}

function checkValidServiceWorker(swUrl: string) {
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' },
  })
    .then(response => {
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        registerValidSW(swUrl);
      }
    })
    .catch(() => {
      console.log('No internet connection found. App is running in offline mode.');
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then(registration => {
        registration.unregister();
      })
      .catch(error => {
        console.error(error.message);
      });
  }
}
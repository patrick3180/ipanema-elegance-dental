import { useEffect } from 'react';

interface WorkboxServiceWorkerProps {
  enableOfflineFirst?: boolean;
  enableBackgroundSync?: boolean;
  enableRuntimeCaching?: boolean;
}

const WorkboxServiceWorker = ({
  enableOfflineFirst = true,
  enableBackgroundSync = true,
  enableRuntimeCaching = true
}: WorkboxServiceWorkerProps) => {
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      registerWorkboxSW();
    }
  }, []);

  const registerWorkboxSW = async () => {
    try {
      const registration = await navigator.serviceWorker.register('/workbox-sw.js');
      console.log('Workbox SW registered successfully');

      // Send configuration to service worker
      if (registration.active) {
        registration.active.postMessage({
          type: 'WORKBOX_CONFIG',
          config: {
            enableOfflineFirst,
            enableBackgroundSync,
            enableRuntimeCaching
          }
        });
      }

      // Listen for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content available, notify user
              showUpdateNotification();
            }
          });
        }
      });

      // Background sync for form submissions
      if (enableBackgroundSync) {
        setupBackgroundSync();
      }

    } catch (error) {
      console.error('Workbox SW registration failed:', error);
    }
  };

  const showUpdateNotification = () => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('App Updated', {
        body: 'New content is available. Refresh to update.',
        icon: '/favicon.ico'
      });
    } else {
      // Fallback to console or custom UI notification
      console.log('New app version available');
    }
  };

  const setupBackgroundSync = () => {
    // Register background sync for form submissions
    window.addEventListener('online', () => {
      // Retry failed requests when back online
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
          type: 'RETRY_SYNC'
        });
      }
    });

    // Intercept form submissions for background sync
    document.addEventListener('submit', (event) => {
      const form = event.target as HTMLFormElement;
      if (form.dataset.backgroundSync === 'true') {
        event.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Store for background sync
        if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
          navigator.serviceWorker.controller.postMessage({
            type: 'BACKGROUND_SYNC',
            data: {
              url: form.action,
              method: form.method,
              data
            }
          });
        }
      }
    });
  };

  return null;
};

export default WorkboxServiceWorker;
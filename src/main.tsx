
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { HelmetProvider } from 'react-helmet-async'

// Initialize dataLayer for Google Tag Manager and Google Ads
window.dataLayer = window.dataLayer || [];
function gtag(...args: any[]) {
  window.dataLayer.push(args);
}

// Make gtag globally available
window.gtag = gtag;

// Initialize GCLID capture on app start
import { captureGCLID, getGCLIDDebugInfo } from './utils/gclid';
import './utils/gclidDebug'; // Initialize debug system
captureGCLID();

// Log initial GCLID debug info
console.log('🔍 GCLID Debug Info on app start:', getGCLIDDebugInfo());
console.log('🛠️ GCLID Debug system loaded. Type "gclidDebug.help()" in console for help.');

// Initialize enhanced redirect middleware
import('./middleware/redirectMiddleware');

// Initialize SEO monitoring
console.log('🚀 SEO Monitoring Initialized');
console.log('📊 Access SEO stats with: window.seoMonitor.getStats()');
console.log('🔍 View redirect events with: window.seoMonitor.getEvents("redirect")');

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);

// Register service worker for performance optimization
if (import.meta.env.PROD) {
  import('./utils/serviceWorkerRegistration').then(({ register }) => {
    register();
  });
}

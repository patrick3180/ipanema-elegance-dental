
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

// Phase 1 Emergency Recovery: Disable all middleware and service workers
// import('./middleware/redirectMiddleware');

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);

// Phase 1: Disable service worker registration
// if (import.meta.env.PROD) {
//   import('./utils/serviceWorkerRegistration').then(({ register }) => {
//     register();
//   });
// }

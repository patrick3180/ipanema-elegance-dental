
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

// Self-hosted fonts (replaces Google Fonts CDN - saves 200-400ms)
import '@fontsource/playfair-display/400.css';
import '@fontsource/playfair-display/600.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';

import './index.css'

// Initialize dataLayer for Google Tag Manager and Google Ads
window.dataLayer = window.dataLayer || [];
function gtag(...args: any[]) {
  window.dataLayer.push(args);
}
window.gtag = gtag;

// GCLID capture — must run before React hydrates so quick WhatsApp clicks preserve attribution
import { captureGCLID } from './utils/gclid';
captureGCLID();

createRoot(document.getElementById("root")!).render(
  <App />
);

// Register service worker for performance optimization
if (import.meta.env.PROD) {
  import('./utils/serviceWorkerRegistration').then(({ register }) => {
    register();
  });
}

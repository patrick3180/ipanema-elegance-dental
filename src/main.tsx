
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

// Initialize SEO monitoring
console.log('🚀 SEO Monitoring Initialized');
console.log('To enable detailed SEO monitoring, run: localStorage.setItem("seo-monitoring", "enabled")');

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);

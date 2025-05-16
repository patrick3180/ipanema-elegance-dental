
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { HelmetProvider } from 'react-helmet-async'

// Initialize dataLayer for Google Tag Manager
window.dataLayer = window.dataLayer || [];
function gtag(...args: any[]) {
  window.dataLayer.push(args);
}

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);

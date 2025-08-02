
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

// Initialize enhanced redirect middleware
import('./middleware/redirectMiddleware');

// Route interception for SEO files
const interceptSEORoutes = () => {
  const currentPath = window.location.pathname;
  
  if (currentPath === '/robots.txt') {
    import('./api/robots').then(({ handleRobotsRequest }) => {
      const response = handleRobotsRequest();
      response.text().then(content => {
        document.open();
        document.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>robots.txt</title>
</head>
<body>
  <pre>${content}</pre>
</body>
</html>`);
        document.close();
      });
    });
    return;
  }
  
  if (currentPath === '/sitemap.xml') {
    import('./api/sitemap').then(({ handleSitemapRequest }) => {
      handleSitemapRequest().then(response => {
        response.text().then(content => {
          document.open();
          document.write(content);
          document.close();
        });
      });
    });
    return;
  }
};

// Check for SEO routes on initial load
interceptSEORoutes();

// Initialize SEO monitoring
console.log('🚀 SEO Monitoring Initialized');
console.log('📊 Access SEO stats with: window.seoMonitor.getStats()');
console.log('🔍 View redirect events with: window.seoMonitor.getEvents("redirect")');

// Only render React app for non-SEO routes
if (!window.location.pathname.match(/\/(robots\.txt|sitemap\.xml)$/)) {
  createRoot(document.getElementById("root")!).render(
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );
}

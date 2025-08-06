import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Enable code splitting and tree shaking
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Enhanced vendor chunks for better caching
          if (id.includes('node_modules')) {
            if (id.includes('react') && !id.includes('react-router')) {
              return 'vendor-react';
            }
            if (id.includes('react-router-dom')) {
              return 'vendor-router';
            }
            if (id.includes('@radix-ui')) {
              return 'vendor-radix';
            }
            if (id.includes('contentful')) {
              return 'vendor-contentful';
            }
            if (id.includes('@tanstack/react-query')) {
              return 'vendor-query';
            }
            if (id.includes('workbox')) {
              return 'vendor-workbox';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            if (id.includes('recharts')) {
              return 'vendor-charts';
            }
            return 'vendor-misc';
          }
          
          // Granular feature-based chunks
          if (id.includes('/components/performance/')) {
            return 'features-performance';
          }
          if (id.includes('/components/blog/')) {
            return 'features-blog';
          }
          if (id.includes('/pages/') && id.includes('Blog')) {
            return 'features-blog';
          }
          if (id.includes('/components/treatment/') || id.includes('pages/') && 
              (id.includes('Lentes') || id.includes('Clareamento') || id.includes('Implantes'))) {
            return 'features-treatment';
          }
          if (id.includes('/components/seo/') || id.includes('SEO')) {
            return 'features-seo';
          }
          if (id.includes('/pages/Index') || id.includes('Hero') || id.includes('AboutSection')) {
            return 'app-home';
          }
          if (id.includes('/pages/')) {
            return 'app-pages';
          }
        },
      },
    },
    // Conditional minification with fallback
    minify: mode === 'production' ? 'terser' : false,
    terserOptions: mode === 'production' ? {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log'],
      },
      mangle: {
        safari10: true,
      },
    } : undefined,
    // Optimize CSS
    cssCodeSplit: true,
    // Set chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Enable source maps for development
    sourcemap: mode === 'development',
  },
  // Enable gzip compression
  preview: {
    headers: {
      'Cache-Control': 'public, max-age=31536000',
    },
  },
}));

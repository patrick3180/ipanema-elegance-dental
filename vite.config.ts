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
      // Fix lodash default export issues for Contentful SDK
      'lodash/isString': 'lodash/isString.js',
      'lodash/isPlainObject': 'lodash/isPlainObject.js',
      'lodash/throttle': 'lodash/throttle.js',
    },
  },
  define: {
    global: 'globalThis',
    'process.env': 'import.meta.env',
    'process': 'globalThis.process'
  },
  build: {
    // Configurações otimizadas para produção
    target: 'es2020',
    cssCodeSplit: false, // CSS inline para landing page
    chunkSizeWarningLimit: 800,
    assetsInlineLimit: 8192,
    
    rollupOptions: {
      output: {
        // Micro-chunking function for emergency mobile optimization
        manualChunks(id: string) {
          // Essential React core only (highest priority)
          if (id.includes('react') || id.includes('react-dom')) {
            return 'react-core';
          }
          
          // Critical landing components (load immediately)
          if (id.includes('react-helmet-async')) {
            return 'landing-critical';
          }
          
          // Defer everything else into micro-chunks
          if (id.includes('react-router-dom')) {
            return 'router';
          }
          if (id.includes('@radix-ui/react-accordion')) {
            return 'ui-minimal';
          }
          if (id.includes('@radix-ui/react-collapsible') || id.includes('@radix-ui/react-dialog')) {
            return 'ui-extended';
          }
          if (id.includes('lucide-react')) {
            return 'icons';
          }
          if (id.includes('@/utils/gclid')) {
            return 'tracking';
          }
          if (id.includes('@tanstack/react-query')) {
            return 'query';
          }
          if (id.includes('class-variance-authority') || id.includes('clsx') || id.includes('tailwind-merge')) {
            return 'utils';
          }
          
          // Everything else goes to vendor
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        
        // Nomes determinísticos para melhor cache
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      },
    },
    
    // Minificação agressiva
    minify: mode === 'production' ? 'terser' : false,
    terserOptions: mode === 'production' ? {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.warn'],
        unsafe_proto: true,
      },
      mangle: {
        safari10: true,
      },
    } : undefined,
    
    sourcemap: false,
  },
  
  preview: {
    headers: {
      'Cache-Control': 'public, max-age=31536000',
    },
  },
  
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'process',
      'contentful',
      'react-helmet-async',
      'react-fast-compare',
      // Include lodash modules to fix Contentful SDK imports
      'lodash/isString',
      'lodash/isPlainObject', 
      'lodash/throttle',
      'lodash/isFunction',
      'lodash/isNumber'
    ],
    exclude: [
      'react-router-dom',
      '@tanstack/react-query',
      'sonner',
      '@radix-ui/react-accordion',
      '@radix-ui/react-tabs',
      'lucide-react'
    ]
  },
}))
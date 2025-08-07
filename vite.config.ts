import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'es2015',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1500,
    
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Homepage crítico - bundle mínimo
          if (id.includes('pages/Index') || 
              id.includes('components/Hero') || 
              id.includes('components/Header')) {
            return 'critical';
          }
          
          // React essencial
          if (id.includes('react') && !id.includes('router')) {
            return 'react-core';
          }
          
          // Router separado (lazy load)
          if (id.includes('react-router')) {
            return 'router';
          }
          
          // Radix UI em chunks menores
          if (id.includes('@radix-ui/react-dialog') || 
              id.includes('@radix-ui/react-toast')) {
            return 'ui-essential';
          }
          
          if (id.includes('@radix-ui')) {
            return 'ui-extra';
          }
          
          // Contentful apenas quando necessário
          if (id.includes('contentful')) {
            return 'contentful';
          }
          
          // Charts e icons lazy
          if (id.includes('recharts')) {
            return 'charts';
          }
          
          if (id.includes('lucide-react')) {
            return 'icons';
          }
          
          // Todo o resto
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
      
      // Remover código morto agressivamente
      treeshake: {
        preset: 'recommended',
        moduleSideEffects: false,
      },
    },
    
    // Minificação máxima
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
        passes: 3,
        unsafe: true,
        unsafe_comps: true,
        unsafe_math: true,
        unsafe_methods: true,
        unsafe_proto: true,
        unsafe_regexp: true,
      },
      mangle: {
        safari10: true,
        properties: {
          regex: /^_/,
        },
      },
      format: {
        comments: false,
        ascii_only: true,
      },
    },
    
    // Desabilitar source maps em produção
    sourcemap: false,
  },
  
  // Otimização de dependências
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: [
      '@radix-ui/react-accordion',
      '@radix-ui/react-alert-dialog', 
      '@radix-ui/react-checkbox',
      '@radix-ui/react-collapsible',
      'recharts',
      'contentful'
    ],
  },
}))

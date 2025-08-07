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
        manualChunks: {
          // Mantendo a estrutura original mas otimizada
          'vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'contentful': ['contentful'],
          // Agrupando Radix UI para reduzir requests
          'ui-core': [
            '@radix-ui/react-dialog', 
            '@radix-ui/react-dropdown-menu', 
            '@radix-ui/react-toast',
            '@radix-ui/react-slot',
            '@radix-ui/react-label'
          ],
          // Outros componentes UI em chunk separado
          'ui-extra': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-alert-dialog',
            '@radix-ui/react-avatar',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-collapsible'
          ],
          'query': ['@tanstack/react-query'],
          'charts': ['recharts'],
          'icons': ['lucide-react'],
          'utils': ['class-variance-authority', 'clsx', 'tailwind-merge'],
        },
      },
    },
    // Minificação mantida como estava
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
    // Adicionar target para melhor compatibilidade
    target: 'es2015',
  },
  // Enable gzip compression
  preview: {
    headers: {
      'Cache-Control': 'public, max-age=31536000',
    },
  },
  // Otimização de dependências
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu'
    ],
  },
}))

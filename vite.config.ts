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
  define: {
    global: 'globalThis',
    'process.env': 'import.meta.env'
  },
  build: {
    // Configurações otimizadas para produção
    target: 'es2020',
    cssCodeSplit: true, // Split CSS para melhor cache
    chunkSizeWarningLimit: 600,
    assetsInlineLimit: 4096, // Inline apenas assets pequenos
    
    rollupOptions: {
      output: {
        // Bundle splitting otimizado para landing page - LCP crítico
        manualChunks: {
          // Critical chunks para LCP
          'landing-critical': ['react', 'react-dom', 'react-helmet-async'],
          'landing-hero': ['@/components/landing/clareamento/ClareamentoHero'],
          'landing-header': ['@/components/landing/clareamento/ClareamentoHeader'],
          
          // Consulta inicial critical chunks
          'consulta-critical': ['@/components/landing/consulta/ConsultaInicialHero', '@/components/landing/consulta/ConsultaInicialHeader'],
          'consulta-problem': ['@/components/landing/consulta/ConsultaInicialProblem'],
          'consulta-guide': ['@/components/landing/consulta/ConsultaInicialGuide'],
          
          // Lazy chunks para componentes below-the-fold  
          'landing-lazy-social': ['@/components/landing/clareamento/ClareamentoSocialProof', '@/components/landing/consulta/ConsultaInicialSocialProof'],
          'landing-lazy-faq': ['@/components/landing/clareamento/ClareamentoFAQ', '@/components/landing/consulta/ConsultaInicialFAQ'],
          'landing-lazy-footer': ['@/components/landing/clareamento/ClareamentoFooter'],
          
          // UI chunks otimizados
          'landing-icons': ['lucide-react'],
          'landing-ui': ['@radix-ui/react-accordion', '@radix-ui/react-collapsible'],
          
          // Tracking e performance separados
          'tracking': ['@/utils/gclid'],
          'performance': ['@/hooks/useCriticalImagePreload', '@/components/performance/CriticalResourcePreloader'],
          
          // Chunks para outras páginas (contentful só carrega quando necessário)
          'vendor': ['react-router-dom'],
          'ui-core': [
            '@radix-ui/react-dialog', 
            '@radix-ui/react-dropdown-menu', 
            '@radix-ui/react-toast',
            '@radix-ui/react-slot',
            '@radix-ui/react-label'
          ],
          'ui-extra': [
            '@radix-ui/react-alert-dialog',
            '@radix-ui/react-avatar',
            '@radix-ui/react-checkbox'
          ],
          'query': ['@tanstack/react-query'],
          'charts': ['recharts'],
          'utils': ['class-variance-authority', 'clsx', 'tailwind-merge'],
        },
        
        // Nomes determinísticos para melhor cache
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      },
    },
    
    // Minificação ultra agressiva para PageSpeed 90+
    minify: mode === 'production' ? 'terser' : false,
    terserOptions: mode === 'production' ? {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.warn', 'console.debug'],
        unsafe_proto: true,
        unsafe_math: true,
        unsafe_methods: true,
        passes: 3, // Multiple passes for better compression
        toplevel: true,
        pure_getters: true,
        unsafe_comps: true,
      },
      mangle: {
        safari10: true,
        toplevel: true,
        properties: false, // Don't mangle properties to avoid breaking
      },
      format: {
        comments: false, // Remove all comments
      }
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
      'react/jsx-runtime',
      'react-dom/client',
      'react-helmet-async',
      'lucide-react'
    ],
    exclude: [
      // Contentful will be loaded dynamically when needed
    ]
  },
}))
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Plugin: carrega CSS externo de forma assíncrona (não render-blocking)
// Só aplica em produção. Critical CSS inline em index.html garante que
// a homepage renderiza imediatamente enquanto o CSS completo carrega.
function asyncCSSPlugin(): Plugin {
  return {
    name: 'vite-plugin-async-css',
    enforce: 'post',
    apply: 'build',
    transformIndexHtml(html: string) {
      // Transforma <link rel="stylesheet" ...href="/assets/...css">
      // em versão non-blocking com media="print" + onload
      return html.replace(
        /<link rel="stylesheet" crossorigin href="(\/assets\/[^"]+\.css)">/g,
        '<link rel="stylesheet" href="$1" media="print" onload="this.media=\'all\'">\n    <noscript><link rel="stylesheet" href="$1"></noscript>'
      );
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    asyncCSSPlugin(),
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
        // Bundle splitting otimizado para landing page - LCP crítico.
        // Forma-função (Rollup 4 / Vite 5+): chunka APENAS módulos realmente
        // presentes no graph. A forma-objeto antiga tentava forçar pacotes
        // Radix v1 (com `exports` ESM estrito) como entry points e quebrava
        // o build com `Could not resolve entry module "@radix-ui/react-dialog"`.
        manualChunks(id: string) {
          // ───────────── Source chunks (componentes locais) ─────────────
          // English Landing Pages components (isolate to prevent unused JS)
          if (id.includes('/components/en/lp/')) return 'en-landing-bundle';

          // Hero/header críticos para LCP das LPs principais
          if (id.includes('/components/landing/clareamento/ClareamentoHero')) return 'landing-hero';

          if (id.includes('/components/landing/clareamento/ClareamentoHeader')) return 'landing-header';
          if (id.includes('/components/landing/clareamento/ClareamentoSocialProof') ||
              id.includes('/components/landing/consulta/ConsultaInicialSocialProof')) return 'landing-lazy-social';
          if (id.includes('/components/landing/clareamento/ClareamentoFAQ') ||
              id.includes('/components/landing/consulta/ConsultaInicialFAQ')) return 'landing-lazy-faq';
          if (id.includes('/components/landing/clareamento/ClareamentoFooter')) return 'landing-lazy-footer';

          // Consulta inicial
          if (id.includes('/components/landing/consulta/ConsultaInicialHero') ||
              id.includes('/components/landing/consulta/ConsultaInicialHeader')) return 'consulta-critical';
          if (id.includes('/components/landing/consulta/ConsultaInicialProblem')) return 'consulta-problem';
          if (id.includes('/components/landing/consulta/ConsultaInicialGuide')) return 'consulta-guide';

          // Tracking & performance utils
          if (id.includes('/utils/gclid')) return 'tracking';
          if (id.includes('/hooks/useCriticalImagePreload') ||
              id.includes('/components/performance/CriticalResourcePreloader')) return 'performance';

          // ───────────── Vendor chunks (node_modules) ─────────────
          if (id.includes('node_modules')) {
            // Critical-path React
            if (id.includes('/react-helmet-async/') ||
                id.match(/[\\/]node_modules[\\/](react|react-dom)[\\/]/)) return 'landing-critical';

            // Routing
            if (id.includes('/react-router-dom/') || id.includes('/react-router/')) return 'vendor';

            // Ícones — lucide é GRANDE, isolar em chunk próprio
            if (id.includes('/lucide-react/')) return 'landing-icons';

            // Radix — separado em duas tranches por frequência de uso
            if (id.includes('/@radix-ui/react-accordion/') ||
                id.includes('/@radix-ui/react-collapsible/')) return 'landing-ui';
            if (id.includes('/@radix-ui/react-dialog/') ||
                id.includes('/@radix-ui/react-dropdown-menu/') ||
                id.includes('/@radix-ui/react-toast/') ||
                id.includes('/@radix-ui/react-slot/') ||
                id.includes('/@radix-ui/react-label/')) return 'ui-core';
            if (id.includes('/@radix-ui/react-alert-dialog/') ||
                id.includes('/@radix-ui/react-avatar/') ||
                id.includes('/@radix-ui/react-checkbox/')) return 'ui-extra';

            // Data layer
            if (id.includes('/@tanstack/react-query/')) return 'query';

            // Charts (heavy, raramente usado)
            if (id.includes('/recharts/')) return 'charts';

            // Utils de className
            if (id.includes('/class-variance-authority/') ||
                id.includes('/clsx/') ||
                id.includes('/tailwind-merge/')) return 'utils';
          }
          // Sem retorno = Rollup decide (default chunk)
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
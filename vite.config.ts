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
    // Configurações críticas para reduzir LCP
    target: 'es2015',
    cssCodeSplit: true,
    minify: 'terser',
    
    rollupOptions: {
      output: {
        // Manual chunks otimizado - separa apenas o essencial
        manualChunks: (id) => {
          // React e React DOM sempre juntos (crítico)
          if (id.includes('react') && !id.includes('router')) {
            return 'react-core';
          }
          
          // Router separado (carrega sob demanda)
          if (id.includes('react-router')) {
            return 'router';
          }
          
          // Radix UI em chunk separado (pesado)
          if (id.includes('@radix-ui')) {
            return 'radix-ui';
          }
          
          // Contentful separado (apenas quando necessário)
          if (id.includes('contentful')) {
            return 'contentful';
          }
          
          // Outras libs pesadas
          if (id.includes('recharts')) {
            return 'charts';
          }
          
          // Todo o resto vai para vendor
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        
        // Otimizar nomes dos chunks
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/').pop() : 'chunk';
          return `assets/js/${facadeModuleId}-[hash].js`;
        },
        
        // Assets organizados
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/woff|woff2|eot|ttf|otf/i.test(ext)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
      },
    },
    
    // Configurações do Terser para melhor minificação
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
        passes: 2,
      },
      mangle: {
        safari10: true,
      },
      format: {
        comments: false,
      },
    },
    
    // Limite de chunk warning aumentado (Radix UI é pesado)
    chunkSizeWarningLimit: 1500,
    
    // Melhorar source maps em dev
    sourcemap: mode === 'development' ? 'inline' : false,
    
    // Reportar tamanho comprimido
    reportCompressedSize: true,
  },
  
  // Otimizações adicionais
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['@radix-ui/*'], // Evita pré-bundle do Radix
  },
  
  // CSS otimizado
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
}))

import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'url';

// Migração Astro — site completo (Fases 0-4)
// Saída 100% estática; formato 'directory' gera /<rota>/index.html,
// que a Vercel serve como /<rota> (mesmo comportamento do cleanUrls atual).
export default defineConfig({
  site: 'https://dracarlachristoph.com',
  output: 'static',
  build: {
    format: 'directory',
  },
  trailingSlash: 'ignore',
  vite: {
    resolve: {
      alias: {
        // Permite importar os configs de LP do app React (src/config/*.ts usam '@/...')
        '@': fileURLToPath(new URL('../src', import.meta.url)),
      },
    },
  },
});

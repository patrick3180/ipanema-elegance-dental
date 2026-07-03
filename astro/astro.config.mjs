import { defineConfig } from 'astro/config';

// Migração Astro — Fase 1 (blog piloto)
// Saída 100% estática; formato 'directory' gera /blog/<slug>/index.html,
// que a Vercel serve como /blog/<slug> (mesmo comportamento do cleanUrls atual).
export default defineConfig({
  site: 'https://dracarlachristoph.com',
  output: 'static',
  build: {
    format: 'directory',
  },
  trailingSlash: 'ignore',
});

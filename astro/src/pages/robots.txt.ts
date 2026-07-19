/**
 * robots.txt ESTÁTICO — gerado no build (jul/2026).
 *
 * Antes vinha de `api/robots.js` (Vercel Function) via rewrite. Como o conteúdo é
 * 100% fixo, uma função serverless por requisição não se justificava.
 *
 * ⚠️ Este é o ÚNICO robots.txt válido. Existe um `../public/robots.txt` legado (era
 * do app React) com conteúdo DIFERENTE e pior — libera o CCBot e não conhece
 * Google-Extended/ClaudeBot. Ele é excluído de propósito pelo `copy-assets.mjs`
 * (EXCLUDE) para não sobrescrever esta rota. Não apague essa exclusão.
 */
import type { APIRoute } from 'astro';

const body = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /assets/*.map

Sitemap: https://dracarlachristoph.com/sitemap.xml

# AI Search bots allowed for AI Search Optimization (Pilar 3)
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

# Block scraper bots
User-agent: CCBot
Disallow: /
`;

export const GET: APIRoute = () =>
  new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });

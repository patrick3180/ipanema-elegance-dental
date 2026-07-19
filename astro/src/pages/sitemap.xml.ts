/**
 * Sitemap ESTÁTICO — gerado no build (jul/2026).
 *
 * ANTES: `api/sitemap.js` era uma Vercel Function que chamava o Contentful a CADA
 * cache-miss. Se o Contentful demorasse ou falhasse, o `catch` devolvia um sitemap
 * de FALLBACK com apenas 2 URLs. Se o Googlebot buscasse justamente nessa janela,
 * o GSC registrava "Erro temporário de processamento" e o site aparecia com 2 URLs.
 *
 * AGORA: o XML é gerado no build (o Astro já lê o Contentful aqui mesmo) e servido
 * como arquivo estático pelo CDN. Zero dependência de runtime, zero risco de fallback.
 * Se o Contentful falhar durante o build, o build inteiro falha e a Vercel MANTÉM o
 * deploy anterior no ar (deploy atômico) — o sitemap bom continua servido.
 *
 * As rotas estáticas são derivadas dos ARQUIVOS DE PÁGINA reais, não de uma lista
 * escrita à mão: foi uma lista desatualizada que colocou `/termos-de-uso` (404) no
 * sitemap e fez o Google rastrear um erro. Página nova = entra sozinha.
 */
import type { APIRoute } from 'astro';
import { getBlogData, resolveSlug } from '../lib/contentful';

const BASE = 'https://dracarlachristoph.com';

/** Prioridade/frequência por rota. Mantém exatamente os valores que já estavam no ar. */
const META: Record<string, { priority: string; changefreq: string }> = {
  '/': { priority: '1.0', changefreq: 'weekly' },
  '/servicos': { priority: '0.9', changefreq: 'monthly' },
  '/blog': { priority: '0.8', changefreq: 'daily' },
  '/lentes-de-contato-dental-e-facetas-de-resina': { priority: '0.9', changefreq: 'monthly' },
  '/clareamento-dental': { priority: '0.9', changefreq: 'monthly' },
  '/protese-dentaria': { priority: '0.9', changefreq: 'monthly' },
  '/implantes-dentarios': { priority: '0.9', changefreq: 'monthly' },
  '/ortodontia': { priority: '0.9', changefreq: 'monthly' },
  '/clinica-geral-e-prevencao': { priority: '0.8', changefreq: 'monthly' },
  '/restauracoes-esteticas': { priority: '0.8', changefreq: 'monthly' },
  '/tratamento-de-canal': { priority: '0.8', changefreq: 'monthly' },
  '/saude-da-gengiva': { priority: '0.8', changefreq: 'monthly' },
  '/sobre': { priority: '0.6', changefreq: 'monthly' },
  '/contato': { priority: '0.7', changefreq: 'monthly' },
  '/politica-de-privacidade': { priority: '0.3', changefreq: 'yearly' },
  '/en': { priority: '0.8', changefreq: 'monthly' },
  '/en/about': { priority: '0.5', changefreq: 'monthly' },
  '/en/contact': { priority: '0.6', changefreq: 'monthly' },
};
/** Demais páginas EN (serviços) e qualquer página nova não mapeada. */
const DEFAULT_META = { priority: '0.7', changefreq: 'monthly' };

/**
 * Converte o caminho do arquivo de página na rota pública.
 * `import.meta.glob` devolve as chaves RELATIVAS a este arquivo (`./sobre.astro`),
 * não caminhos absolutos — o `./` precisa cair antes de qualquer teste de prefixo,
 * senão `startsWith('lp/')` falha e as LPs (noindex) vazam para o sitemap.
 */
function fileToRoute(file: string): string | null {
  const rel = file
    .replace(/^.*\/src\/pages\//, '')
    .replace(/^\.\//, '')
    .replace(/\.astro$/, '');
  if (rel.includes('[')) return null; // rota dinâmica (/blog/[slug]) — tratada à parte
  if (rel === '404') return null;
  // LPs são noindex/nofollow (Google Ads) — NUNCA entram no sitemap.
  if (rel === 'lp' || rel.startsWith('lp/') || rel.startsWith('en/lp/')) return null;
  if (rel === 'index') return '/';
  return '/' + rel.replace(/\/index$/, '');
}

const xmlEscape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const iso = (d: string | undefined, fallback: string) => {
  if (!d) return fallback;
  const parsed = new Date(d);
  return isNaN(parsed.getTime()) ? fallback : parsed.toISOString().split('T')[0];
};

export const GET: APIRoute = async () => {
  const today = new Date().toISOString().split('T')[0];

  // 1) Páginas estáticas — enumeradas a partir dos arquivos reais em src/pages/
  const staticRoutes = Object.keys(import.meta.glob('./**/*.astro'))
    .map(fileToRoute)
    .filter((r): r is string => r !== null)
    .sort((a, b) => (a === '/' ? -1 : b === '/' ? 1 : a.localeCompare(b)));

  const staticEntries = staticRoutes.map((route) => ({
    loc: BASE + route,
    lastmod: today,
    ...(META[route] ?? DEFAULT_META),
  }));

  // 2) Posts do blog — lidos do Contentful no build (mesmo fetch que gera as páginas)
  const { posts } = await getBlogData();
  const blogEntries = posts
    .map((post) => {
      const slug = resolveSlug(post);
      if (!slug || slug.length < 3) return null;
      return {
        loc: `${BASE}/blog/${slug}`,
        lastmod: iso(post.sys?.updatedAt, today),
        priority: '0.7',
        changefreq: 'weekly',
      };
    })
    .filter((e): e is NonNullable<typeof e> => e !== null);

  const all = [...staticEntries, ...blogEntries];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all
  .map(
    (p) => `  <url>
    <loc>${xmlEscape(p.loc)}</loc>
    <lastmod>${p.lastmod}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};

/**
 * QA automatizado — duplo-check de fim de etapa (skill astro-migration-carla §4-bis).
 * Roda contra astro/dist após o build: valida SEO, imagens, links, tracking,
 * CTAs WhatsApp e noindex em TODAS as páginas geradas.
 *
 * Uso: node qa-check.mjs   (depois de `npm run build`)
 * Sai com código 1 se houver falhas.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const here = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(here, 'dist');
const PUB = path.join(here, 'public');

// ── coleta todas as páginas html do build ──
function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p, out);
    else if (name.endsWith('.html')) out.push(p);
  }
  return out;
}
// Ignora HTMLs que são ASSETS copiados de public/ (previews, verificação Google,
// link-in-bio /links) — não são páginas geradas pelo Astro.
const pages = walk(DIST).filter((f) => {
  const rel = path.relative(DIST, f);
  return !fs.existsSync(path.join(PUB, rel));
});
const routeOf = (f) =>
  '/' + path.relative(DIST, f).replace(/\\/g, '/').replace(/index\.html$/, '').replace(/\/$/, '') || '/';

// rotas existentes no build (para validar links internos)
const builtRoutes = new Set(pages.map((f) => routeOf(f) || '/'));
builtRoutes.add('/');
// rotas servidas fora do Astro (functions/rewrites/estático) — não são 404
const EXTERNAL_ROUTES = new Set(['/go/whatsapp', '/sitemap.xml', '/robots.txt', '/links', '/gone', '/api/send-gclid']);
// redirects 301 do vercel.json: um link para a origem NÃO é quebrado (Vercel redireciona)
try {
  const vercel = JSON.parse(fs.readFileSync(path.join(here, '..', 'vercel.json'), 'utf8'));
  for (const r of vercel.redirects ?? []) {
    if (r.source && !r.source.includes(':') && !r.source.includes('*')) EXTERNAL_ROUTES.add(r.source.replace(/\/$/, ''));
  }
} catch {}
// rotas Navigate do App.tsx que virarão 301 no cutover (PATTERNS.md §6)
for (const nav of ['/diferenciais', '/lentes-de-contato-dental-e-facetas-de-porcelana', '/en/porcelain-veneers', '/lp/profilaxia-dental-ipanema']) {
  EXTERNAL_ROUTES.add(nav);
}

const failures = [];
const warns = [];
let checked = 0;

for (const file of pages) {
  const route = routeOf(file) || '/';
  const html = fs.readFileSync(file, 'utf8');
  const isLP = /^\/(en\/)?lp\//.test(route);
  const fail = (msg) => failures.push(`${route} — ${msg}`);
  const warn = (msg) => warns.push(`${route} — ${msg}`);
  checked++;

  // 2. SEO
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
  if (!title.trim()) fail('sem <title>');
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  if (!desc.trim()) fail('sem meta description');
  if (desc.length > 175) warn(`description longa (${desc.length})`);
  const canonical = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] || '';
  if (!canonical) fail('sem canonical');
  else if (!isLP) {
    const expected = 'https://dracarlachristoph.com' + (route === '/' ? '/' : route);
    if (canonical !== expected && canonical !== expected.replace(/\/$/, '')) fail(`canonical divergente: ${canonical}`);
  }
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s === 0) fail('sem <h1>');
  if (h1s > 1) warn(`${h1s} <h1> na página`);
  if (!html.includes('application/ld+json')) fail('sem JSON-LD schema');
  else {
    for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
      try { JSON.parse(m[1]); } catch { fail('JSON-LD inválido (não parseia)'); }
    }
  }

  // 8. noindex
  const hasNoindex = /<meta name="robots" content="noindex/.test(html);
  if (isLP && !hasNoindex) fail('LP SEM noindex (regra inviolável!)');
  if (!isLP && hasNoindex) fail('página normal COM noindex (perderia indexação!)');

  // 3. imagens: alt + dimensões + arquivo local existe
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    const tag = m[0];
    const src = (tag.match(/src="([^"]*)"/) || [])[1] || '';
    const alt = tag.match(/alt="([^"]*)"/);
    if (!alt || !alt[1].trim()) fail(`img sem alt: ${src.slice(0, 80)}`);
    if (!/width="\d+"/.test(tag) || !/height="\d+"/.test(tag)) warn(`img sem width/height: ${src.slice(0, 80)}`);
    if (src.startsWith('/') && !src.startsWith('//')) {
      const local = path.join(PUB, src.split('?')[0]);
      const inDist = path.join(DIST, src.split('?')[0]);
      if (!fs.existsSync(local) && !fs.existsSync(inDist)) fail(`img local inexistente: ${src.slice(0, 100)}`);
    }
  }

  // 4. links internos íntegros
  for (const m of html.matchAll(/<a\b[^>]*href="(\/[^"#?]*)[^"]*"/g)) {
    const href = m[1].replace(/\/$/, '') || '/';
    if (href.startsWith('/lovable-uploads') || href.startsWith('/fonts')) continue;
    if (EXTERNAL_ROUTES.has(href)) continue;
    if (!builtRoutes.has(href)) fail(`link interno quebrado: ${href}`);
  }

  // 5-6. tags funcionais + GCLID
  if (!html.includes('GTM-WZRDNBKQ')) fail('sem GTM');
  if (!html.includes("localStorage.setItem('gclid'")) fail('sem captura de GCLID no boot');
  if (!html.includes('/api/send-gclid')) fail('sem webhook GCLID (/api/send-gclid)');
  if (!html.includes('AW-16894364517/OQZvCMXV0foZEOqP7vY9')) fail('sem conversion ID nos handlers');

  // 7. CTAs WhatsApp
  const waLinks = [...html.matchAll(/<a\b[^>]*href="(https:\/\/wa\.me\/[^"]*)"[^>]*>/g)];
  if (waLinks.length === 0) warn('página sem nenhum CTA wa.me');
  for (const [tag, href] of waLinks.map((m) => [m[0], m[1]])) {
    if (!href.includes('5521993304045')) fail(`wa.me com número errado: ${href.slice(0, 60)}`);
    if (!tag.includes('js-wa-cta')) fail(`CTA wa.me sem class js-wa-cta (sem tracking): ${href.slice(0, 60)}`);
    if (!tag.includes('target="_blank"')) fail(`CTA wa.me sem target=_blank: ${href.slice(0, 60)}`);
  }
  // proibições de compliance (CRO §1.3): "avaliação" como CTA/convite de agendamento.
  // Uso clínico/diagnóstico ("avaliar a saúde bucal", "avaliar o caso") é permitido;
  // "17 avaliações" (Google) também. Bloqueia só os padrões de agendamento.
  if (/avalia[çc][ãa]o gratuita|avalia[çc][ãa]o sem compromisso/i.test(html)) fail('compliance: "avaliação gratuita/sem compromisso"');
  if (/Vamos Avaliar Juntos/i.test(html)) fail('compliance: CTA "Vamos Avaliar Juntos" (usar "consulta")');
  if (/Agende\s+(sua|a)\s+avalia[çc][ãa]o/i.test(html)) fail('compliance: "Agende sua avaliação" (usar "consulta")');
  if (/Marcar\s+avalia[çc][ãa]o|agendar\s+avalia[çc][ãa]o/i.test(html)) fail('compliance: agendar/marcar "avaliação" (usar "consulta")');
}

console.log(`\n══════════ QA duplo-check — ${checked} páginas ══════════`);
if (warns.length) {
  console.log(`\n⚠️  Avisos (${warns.length}):`);
  warns.slice(0, 40).forEach((w) => console.log('  ⚠ ' + w));
  if (warns.length > 40) console.log(`  ... +${warns.length - 40}`);
}
if (failures.length) {
  console.log(`\n❌ FALHAS (${failures.length}):`);
  failures.forEach((f) => console.log('  ✗ ' + f));
  process.exit(1);
} else {
  console.log('\n✅ TODAS as páginas passaram nos checks obrigatórios.');
}

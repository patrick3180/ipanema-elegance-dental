/**
 * Blog Pre-rendering Script — v2 (SPA-shell + full content)
 *
 * O QUE MUDOU (Jul/2026 — fix de indexação/AI Search):
 * A versão antiga gerava uma PÁGINA ESTÁTICA AUTÔNOMA por post, SEM o app React,
 * com o corpo do artigo TRUNCADO em 1500 caracteres e um botão "Ver artigo completo"
 * que apontava para a própria URL (loop). Resultado: Googlebot e crawlers de IA
 * (que NÃO executam JS) só viam ~230 palavras → "Rastreada, mas não indexada".
 *
 * Esta versão espelha o padrão que JÁ FUNCIONA em generate-static-meta.cjs:
 *   1. Parte do SHELL real do SPA (dist/index.html) — com #root + bundles JS + GTM.
 *   2. Injeta o ARTIGO COMPLETO (rich text → HTML semântico, sem truncar) dentro
 *      do <div id="root">, como fallback para crawlers.
 *   3. Injeta title/description/canonical/OG/JSON-LD por post no <head>.
 *   4. O React carrega por cima e renderiza a versão interativa para usuários reais.
 *
 * ⚠️ ORDEM DE BUILD: este script precisa rodar ANTES de generate-static-meta.cjs
 *    (que sobrescreve dist/index.html com a home). Ver buildCommand no vercel.json:
 *    vite build → generate-blog-html.js → generate-static-meta.cjs
 *
 * Usage: node scripts/generate-blog-html.js   (após `vite build`)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pathToFileURL } from 'url';
import dotenv from 'dotenv';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const SPACE_ID = process.env.VITE_CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.VITE_CONTENTFUL_ACCESS_TOKEN;
const BASE_URL = 'https://dracarlachristoph.com';
const OG_FALLBACK = BASE_URL + '/lovable-uploads/doutora-em-pe-jaleco.webp';

// ============================================================
// HELPERS
// ============================================================

function escapeHtml(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Otimiza URL de imagem do Contentful (webp, largura, qualidade)
function optimizeContentfulImg(url, w = 800) {
  if (!url) return '';
  let full = url.startsWith('//') ? 'https:' + url : url;
  if (full.includes('ctfassets.net')) {
    const sep = full.includes('?') ? '&' : '?';
    full = `${full}${sep}w=${w}&fm=webp&q=80`;
  }
  return full;
}

// Slug a partir do campo ou derivado do título
function resolveSlug(post) {
  let slug = post.fields?.slug;
  if (!slug && post.fields?.titulo) {
    slug = post.fields.titulo
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .replace(/--+/g, '-');
  }
  return slug || '';
}

// ------------------------------------------------------------
// Rich text (Contentful) → HTML semântico.
// Espelha src/services/contentful/transformers.ts (mesmas regras),
// mas sem classes Tailwind (o fallback é substituído pelo React;
// o que importa para crawlers é a estrutura semântica: h2/p/ul/li).
// ------------------------------------------------------------
function buildRichTextOptions(assetMap) {
  return {
    renderMark: {
      [MARKS.BOLD]: (t) => `<strong>${t}</strong>`,
      [MARKS.ITALIC]: (t) => `<em>${t}</em>`,
      [MARKS.UNDERLINE]: (t) => `<u>${t}</u>`,
      [MARKS.CODE]: (t) => `<code>${t}</code>`,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, next) => `<p>${next(node.content)}</p>`,
      [BLOCKS.HEADING_1]: (node, next) => `<h2>${next(node.content)}</h2>`, // H1 já é o título do post
      [BLOCKS.HEADING_2]: (node, next) => `<h2>${next(node.content)}</h2>`,
      [BLOCKS.HEADING_3]: (node, next) => `<h3>${next(node.content)}</h3>`,
      [BLOCKS.HEADING_4]: (node, next) => `<h4>${next(node.content)}</h4>`,
      [BLOCKS.HEADING_5]: (node, next) => `<h5>${next(node.content)}</h5>`,
      [BLOCKS.HEADING_6]: (node, next) => `<h6>${next(node.content)}</h6>`,
      [BLOCKS.UL_LIST]: (node, next) => `<ul>${next(node.content)}</ul>`,
      [BLOCKS.OL_LIST]: (node, next) => `<ol>${next(node.content)}</ol>`,
      [BLOCKS.LIST_ITEM]: (node, next) => `<li>${next(node.content)}</li>`,
      [BLOCKS.QUOTE]: (node, next) => `<blockquote>${next(node.content)}</blockquote>`,
      [BLOCKS.HR]: () => '<hr/>',
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const id = node.data?.target?.sys?.id;
        const asset = (id && assetMap.get(id)) || node.data?.target;
        const file = asset?.fields?.file;
        const url = file?.url;
        if (!url) return '';
        const title = asset.fields.title || 'Imagem do artigo';
        const src = optimizeContentfulImg(url, 800);
        return `<figure><img src="${escapeHtml(src)}" alt="${escapeHtml(title)}" loading="lazy" decoding="async" /></figure>`;
      },
      [INLINES.HYPERLINK]: (node, next) => {
        const url = node.data?.uri || '#';
        return `<a href="${escapeHtml(url)}" rel="noopener">${next(node.content)}</a>`;
      },
      [INLINES.ENTRY_HYPERLINK]: (node, next) => `${next(node.content)}`,
    },
  };
}

function renderRichText(doc, assetMap) {
  try {
    if (!doc || !doc.nodeType) return '';
    return documentToHtmlString(doc, buildRichTextOptions(assetMap));
  } catch (e) {
    console.warn('  ⚠️  rich text render falhou:', e.message);
    return '';
  }
}

// ============================================================
// GERAÇÃO DA PÁGINA DO POST (shell do SPA + fallback completo)
// ============================================================

/**
 * @param post        entry do Contentful
 * @param shellHtml   conteúdo pristino de dist/index.html (com #root vazio + JS)
 * @param assetMap    Map(assetId → asset) para imagens embutidas
 * @param related     [{slug, title}] outros posts, para links internos
 */
export function buildBlogPostPage(post, shellHtml, assetMap, related = []) {
  const f = post.fields || {};
  const slug = resolveSlug(post);
  const title = f.titulo || f.title || 'Artigo';
  const excerpt = f.resumo || f.excerpt || '';
  const metaDesc = (f.metaDescription || excerpt || '').substring(0, 160);
  const author = f.autor || f.author || 'Dra. Carla Christoph';
  const category = f.categoria || 'Odontologia';
  const date = post.sys?.createdAt || new Date().toISOString();
  const lastUpdated = f.lastUpdated || f.publishDate || date;

  const contentHtml = renderRichText(f.conteudo || f.content, assetMap);

  // Imagem principal: o campo é `featuredImage` (link p/ Asset), resolvido via includes.Asset
  // (REST cru NÃO inlina links). Fallbacks: nome legado `imagemPrincipal` e campo já resolvido.
  const imgRef = f.featuredImage || f.imagemPrincipal;
  let rawImg = imgRef?.fields?.file?.url || '';
  if (!rawImg && imgRef?.sys?.id) {
    rawImg = assetMap.get(imgRef.sys.id)?.fields?.file?.url || '';
  }
  const heroImg = rawImg ? optimizeContentfulImg(rawImg, 800) : '';
  const ogImg = rawImg ? (rawImg.startsWith('//') ? 'https:' + rawImg : rawImg) : OG_FALLBACK;

  // ── AI Search fields ──
  const quickAnswer = f.quickAnswerBox || f.quickAnswerBoquickAnswerBoxx || '';
  const keyTakeaways = Array.isArray(f.keyTakeaways) ? f.keyTakeaways : [];
  const faqStructured = Array.isArray(f.faqStructured) ? f.faqStructured : [];
  const peopleAlsoAsk = f.peopleAlsoAsk?.questions || (Array.isArray(f.peopleAlsoAsk) ? f.peopleAlsoAsk : []);

  const canonical = `${BASE_URL}/blog/${slug}`;

  // ────────────────────────────────────────────────────────
  // <head> — replaces + extra tags (espelha generate-static-meta.cjs)
  // ────────────────────────────────────────────────────────
  let html = shellHtml;

  // Remove preloads de imagem da HOME (o hero da home não é o LCP do post)
  html = html.replace(/<link rel="preload" as="image"[^>]*>/g, '');
  // Preload da imagem do post (LCP)
  const heroPreload = heroImg
    ? `<link rel="preload" as="image" href="${escapeHtml(heroImg)}" fetchpriority="high" />`
    : '';

  // title / description / og
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)} | Blog Dra. Carla Christoph</title>`);
  html = html.replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${escapeHtml(metaDesc)}"`);
  html = html.replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${escapeHtml(title)}" />`);
  html = html.replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${escapeHtml(metaDesc)}" />`);
  html = html.replace(/<meta property="og:type" content="[^"]*" \/>/, `<meta property="og:type" content="article" />`);

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: excerpt,
    image: ogImg,
    datePublished: date,
    dateModified: lastUpdated,
    author: {
      '@type': 'Person',
      name: author,
      jobTitle: 'Dentista Especialista em Prótese Dentária e Implantodontia',
      hasCredential: {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'CRO-RJ',
        recognizedBy: { '@type': 'Organization', name: 'Conselho Regional de Odontologia do Rio de Janeiro' },
        identifier: '27.509',
      },
      worksFor: {
        '@type': 'Dentist',
        name: 'Dra. Carla Christoph',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Rua Visconde de Pirajá, 550 - Sala 1107',
          addressLocality: 'Ipanema',
          addressRegion: 'RJ',
          postalCode: '22410-901',
          addressCountry: 'BR',
        },
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'Dra. Carla Christoph',
      logo: { '@type': 'ImageObject', url: BASE_URL + '/lovable-uploads/logo.png' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    articleSection: category,
    inLanguage: 'pt-BR',
  };

  const faqSchema = faqStructured.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqStructured.map((q) => ({
          '@type': 'Question',
          name: q.name || q.question || '',
          acceptedAnswer: { '@type': 'Answer', text: (q.acceptedAnswer && q.acceptedAnswer.text) || '' },
        })),
      }
    : null;

  const extraTags = [
    heroPreload,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${escapeHtml(ogImg)}" />`,
    `<meta property="og:site_name" content="Dra. Carla Christoph" />`,
    `<meta property="og:locale" content="pt_BR" />`,
    `<meta property="article:published_time" content="${date}" />`,
    `<meta property="article:author" content="${escapeHtml(author)}" />`,
    `<meta property="article:section" content="${escapeHtml(category)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(metaDesc)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(ogImg)}" />`,
    `<script type="application/ld+json">${JSON.stringify(blogPostingSchema)}</script>`,
    faqSchema ? `<script type="application/ld+json">${JSON.stringify(faqSchema)}</script>` : '',
  ].filter(Boolean);

  html = html.replace('</head>', '    ' + extraTags.join('\n    ') + '\n  </head>');

  // ────────────────────────────────────────────────────────
  // Fallback dentro do #root (conteúdo COMPLETO para crawlers)
  // ────────────────────────────────────────────────────────
  const dateBr = new Date(date).toLocaleDateString('pt-BR');

  const heroImgHtml = heroImg
    ? `<img src="${escapeHtml(heroImg)}" alt="${escapeHtml(title)}" width="800" height="450" style="width:100%;height:auto;border-radius:8px;margin:20px 0" fetchpriority="high" decoding="async" />`
    : '';

  const quickAnswerHtml = quickAnswer
    ? `<aside aria-label="Resposta rápida" style="background:#f7f4ee;border-left:4px solid #c4a46a;padding:16px 20px;margin:20px 0;border-radius:4px"><h2 style="margin-top:0">Resposta rápida</h2><p>${escapeHtml(quickAnswer)}</p></aside>`
    : '';

  const keyTakeawaysHtml = keyTakeaways.length
    ? `<section aria-label="Pontos-chave" style="background:#fafafa;padding:16px 20px;margin:20px 0;border-radius:4px"><h2>Pontos-chave</h2><ul>${keyTakeaways.map((k) => `<li>${escapeHtml(k)}</li>`).join('')}</ul></section>`
    : '';

  const faqHtml = faqStructured.length
    ? `<section aria-label="Perguntas frequentes" style="margin:32px 0"><h2>Perguntas frequentes</h2>${faqStructured
        .map(
          (q) =>
            `<details><summary>${escapeHtml(q.name || q.question || '')}</summary><p>${escapeHtml(
              (q.acceptedAnswer && q.acceptedAnswer.text) || ''
            )}</p></details>`
        )
        .join('')}</section>`
    : '';

  const paaHtml = peopleAlsoAsk.length
    ? `<section aria-label="As pessoas também perguntam" style="margin:24px 0"><h2>As pessoas também perguntam</h2><ul>${peopleAlsoAsk
        .map((q) => `<li>${escapeHtml(q)}</li>`)
        .join('')}</ul></section>`
    : '';

  // Links internos (resolve "posts órfãos": crawler encontra outros posts no HTML)
  const relatedHtml = related.length
    ? `<nav aria-label="Leia também" style="margin:32px 0;padding-top:24px;border-top:1px solid #eee"><h2>Leia também</h2><ul>${related
        .map((r) => `<li><a href="${BASE_URL}/blog/${r.slug}">${escapeHtml(r.title)}</a></li>`)
        .join('')}</ul></nav>`
    : '';

  const fallback = `
    <header style="padding:14px 16px;border-bottom:1px solid #eee">
      <nav>
        <a href="/" style="font-weight:bold;color:#553c6b;text-decoration:none">Dra. Carla Christoph</a> |
        <a href="/servicos">Tratamentos</a> |
        <a href="/sobre">Sobre</a> |
        <a href="/blog">Blog</a> |
        <a href="/contato">Contato</a>
      </nav>
    </header>
    <main style="max-width:760px;margin:0 auto;padding:24px 16px;font-family:Montserrat,system-ui,sans-serif;line-height:1.7;color:#333">
      <nav aria-label="breadcrumb" style="font-size:.85rem;margin-bottom:16px;color:#666">
        <a href="/">Início</a> &rsaquo; <a href="/blog">Blog</a> &rsaquo; ${escapeHtml(title)}
      </nav>
      <article>
        <h1 style="color:#381F47;line-height:1.2">${escapeHtml(title)}</h1>
        <p style="color:#666;font-size:.9rem;border-bottom:1px solid #eee;padding-bottom:12px">Por ${escapeHtml(
          author
        )} &bull; ${dateBr} &bull; ${escapeHtml(category)}</p>
        ${heroImgHtml}
        ${excerpt ? `<p style="font-size:1.1em;color:#555;font-style:italic;border-left:4px solid #c4a46a;padding-left:16px;margin:20px 0">${escapeHtml(excerpt)}</p>` : ''}
        ${quickAnswerHtml}
        ${keyTakeawaysHtml}
        <div class="post-content">
          ${contentHtml}
        </div>
        ${faqHtml}
        ${paaHtml}
      </article>
      ${relatedHtml}
    </main>
    <footer style="padding:24px 16px;border-top:1px solid #eee;text-align:center;color:#666;font-size:.9em">
      <p><strong>Dra. Carla Christoph</strong> &mdash; CRO-RJ 27.509 &bull; Especialista em Prótese e Implantodontia</p>
      <p>Rua Visconde de Piraj&aacute;, 550 - Sala 1107, Ipanema, Rio de Janeiro</p>
      <p><a href="https://wa.me/5521993304045">Agendar consulta pelo WhatsApp</a></p>
    </footer>`;

  html = html.replace('<div id="root"></div>', '<div id="root">' + fallback + '</div>');

  return html;
}

/**
 * Índice /blog — lista TODOS os posts como links no HTML cru.
 * Resolve os "posts órfãos" (Falha D): antes o /blog só montava a lista via JS,
 * então o crawler não via link nenhum para os posts (só o sitemap os conhecia).
 */
export function buildBlogIndexPage(posts, shellHtml) {
  const title = 'Blog Dra. Carla Christoph | Dicas de Saúde Bucal em Ipanema';
  const description =
    'Blog de odontologia da Dra. Carla Christoph. Dicas de saúde bucal, artigos informativos e novidades sobre tratamentos dentários em Ipanema.';
  const canonical = `${BASE_URL}/blog`;

  const meta = posts
    .map((p) => ({
      slug: resolveSlug(p),
      title: p.fields?.titulo || p.fields?.title || '',
      excerpt: p.fields?.resumo || p.fields?.excerpt || '',
    }))
    .filter((m) => m.slug && m.title);

  let html = shellHtml;
  html = html.replace(/<link rel="preload" as="image"[^>]*>/g, '');
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${escapeHtml(description)}"`);
  html = html.replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${escapeHtml(title)}" />`);
  html = html.replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${escapeHtml(description)}" />`);

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: title,
    description,
    url: canonical,
    inLanguage: 'pt-BR',
    publisher: { '@type': 'Organization', name: 'Dra. Carla Christoph' },
    blogPost: meta.slice(0, 60).map((m) => ({
      '@type': 'BlogPosting',
      headline: m.title,
      url: `${BASE_URL}/blog/${m.slug}`,
    })),
  };

  const extra = [
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${OG_FALLBACK}" />`,
    `<script type="application/ld+json">${JSON.stringify(blogSchema)}</script>`,
  ];
  html = html.replace('</head>', '    ' + extra.join('\n    ') + '\n  </head>');

  const items = meta
    .map(
      (m) =>
        `<li style="margin-bottom:14px"><a href="/blog/${m.slug}" style="font-weight:600;color:#381F47">${escapeHtml(
          m.title
        )}</a>${m.excerpt ? `<br/><span style="color:#666;font-size:.9em">${escapeHtml(m.excerpt.substring(0, 140))}</span>` : ''}</li>`
    )
    .join('\n        ');

  const fallback = `
    <header style="padding:14px 16px;border-bottom:1px solid #eee">
      <nav>
        <a href="/" style="font-weight:bold;color:#553c6b;text-decoration:none">Dra. Carla Christoph</a> |
        <a href="/servicos">Tratamentos</a> |
        <a href="/sobre">Sobre</a> |
        <a href="/blog">Blog</a> |
        <a href="/contato">Contato</a>
      </nav>
    </header>
    <main style="max-width:800px;margin:0 auto;padding:24px 16px;font-family:Montserrat,system-ui,sans-serif;line-height:1.6;color:#333">
      <h1 style="color:#381F47">Blog — Dicas de Saúde Bucal</h1>
      <p>Artigos sobre saúde bucal, tratamentos odontológicos e prevenção pela Dra. Carla Christoph, especialista em Ipanema, Rio de Janeiro.</p>
      <ul style="list-style:none;padding:0">
        ${items}
      </ul>
    </main>
    <footer style="padding:24px 16px;border-top:1px solid #eee;text-align:center;color:#666;font-size:.9em">
      <p><strong>Dra. Carla Christoph</strong> &mdash; CRO-RJ 27.509</p>
      <p><a href="https://wa.me/5521993304045">Agendar consulta pelo WhatsApp</a></p>
    </footer>`;

  html = html.replace('<div id="root"></div>', '<div id="root">' + fallback + '</div>');
  return html;
}

// ============================================================
// FETCH + MAIN
// ============================================================

async function fetchBlogPosts() {
  try {
    const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?content_type=blogCarla&limit=200&access_token=${ACCESS_TOKEN}&include=2`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Contentful API error: ${response.status}`);
    const data = await response.json();
    return { items: data.items || [], assets: data.includes?.Asset || [] };
  } catch (error) {
    console.error('❌ Error fetching blog posts:', error.message);
    return { items: [], assets: [] };
  }
}

async function generateStaticBlogPages() {
  console.log('🚀 Blog pre-rendering v2 (SPA-shell + conteúdo completo)...\n');

  const distDir = path.join(__dirname, '..', 'dist');
  const shellPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(shellPath)) {
    console.error('❌ dist/index.html não encontrado. Rode `vite build` antes deste script.');
    process.exit(1);
  }
  const shellHtml = fs.readFileSync(shellPath, 'utf-8');
  if (!shellHtml.includes('<div id="root"></div>')) {
    console.error('❌ dist/index.html não tem <div id="root"></div> vazio.');
    console.error('   Este script DEVE rodar ANTES de generate-static-meta.cjs (que injeta a home no #root).');
    process.exit(1);
  }

  const { items: posts, assets } = await fetchBlogPosts();
  if (posts.length === 0) {
    console.log('⚠️  Nenhum post encontrado. Verifique as credenciais do Contentful.');
    return;
  }
  console.log(`📝 ${posts.length} posts encontrados, ${assets.length} assets.\n`);

  const assetMap = new Map();
  assets.forEach((a) => a?.sys?.id && assetMap.set(a.sys.id, a));

  // Índice de posts para links internos ("Leia também")
  const allMeta = posts
    .map((p) => ({ slug: resolveSlug(p), title: p.fields?.titulo || p.fields?.title || '' }))
    .filter((m) => m.slug && m.title);

  const blogDir = path.join(distDir, 'blog');
  if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir, { recursive: true });

  let ok = 0;
  let err = 0;

  posts.forEach((post, i) => {
    try {
      const slug = resolveSlug(post);
      if (!slug || slug.length < 3) {
        console.log('⏭️  Post sem slug válido, pulando.');
        err++;
        return;
      }
      // 4 posts seguintes (circular) como "Leia também"
      const related = [];
      for (let k = 1; k <= 4 && k < allMeta.length; k++) {
        const cand = allMeta[(i + k) % allMeta.length];
        if (cand.slug !== slug) related.push(cand);
      }

      const html = buildBlogPostPage(post, shellHtml, assetMap, related);

      const postDir = path.join(blogDir, slug);
      if (!fs.existsSync(postDir)) fs.mkdirSync(postDir, { recursive: true });
      fs.writeFileSync(path.join(postDir, 'index.html'), html, 'utf-8');

      console.log(`✅ /blog/${slug}`);
      ok++;
    } catch (error) {
      console.error('❌ Erro no post:', error.message);
      err++;
    }
  });

  // Índice /blog com todos os links (resolve posts órfãos)
  try {
    const indexHtml = buildBlogIndexPage(posts, shellHtml);
    fs.writeFileSync(path.join(blogDir, 'index.html'), indexHtml, 'utf-8');
    console.log(`✅ /blog (índice com ${allMeta.length} links)`);
  } catch (error) {
    console.error('❌ Erro no índice /blog:', error.message);
  }

  console.log(`\n✨ Concluído: ${ok} posts + índice, ${err} erros.`);
}

// Auto-run apenas quando executado diretamente (permite import para testes)
const isDirectRun = import.meta.url === pathToFileURL(process.argv[1] || '').href;
if (isDirectRun) {
  generateStaticBlogPages().catch(console.error);
}

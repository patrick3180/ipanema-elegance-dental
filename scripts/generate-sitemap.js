// scripts/generate-sitemap.js
// Gera sitemap.xml estático para public/
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// ES module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carregar .env
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const baseUrl = 'https://dracarlachristoph.com';
const today = new Date().toISOString().split('T')[0];

// Função para buscar posts do blog via Contentful
async function getBlogPosts() {
  try {
    const spaceId = process.env.VITE_CONTENTFUL_SPACE_ID;
    const accessToken = process.env.VITE_CONTENTFUL_ACCESS_TOKEN;

    if (!spaceId || !accessToken) {
      console.warn('⚠️ Contentful credentials missing. Skipping blog posts.');
      return [];
    }

    const url = `https://cdn.contentful.com/spaces/${spaceId}/environments/master/entries?content_type=blogCarla&limit=100`;

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      console.error('❌ Contentful API error:', response.status);
      return [];
    }

    const data = await response.json();
    console.log(`✅ Found ${data.items.length} blog posts from Contentful`);
    return data.items || [];
  } catch (error) {
    console.error('❌ Error fetching blog posts:', error.message);
    return [];
  }
}

// Páginas principais (alta prioridade)
const mainPages = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/servicos', priority: '0.9', changefreq: 'monthly' },
  { url: '/blog', priority: '0.8', changefreq: 'daily' },
  { url: '/sobre', priority: '0.7', changefreq: 'monthly' },
  { url: '/contato', priority: '0.7', changefreq: 'monthly' },
];

// Service pages (9 páginas de tratamento - prioridade máxima para SEO orgânico)
const servicePages = [
  { url: '/lentes-de-contato-dental-e-facetas-de-resina', priority: '0.9', changefreq: 'monthly' },
  { url: '/clareamento-dental', priority: '0.9', changefreq: 'monthly' },
  { url: '/implantes-dentarios', priority: '0.9', changefreq: 'monthly' },
  { url: '/protese-dentaria', priority: '0.9', changefreq: 'monthly' },
  { url: '/ortodontia', priority: '0.9', changefreq: 'monthly' },
  { url: '/saude-da-gengiva', priority: '0.9', changefreq: 'monthly' },
  { url: '/tratamento-de-canal', priority: '0.9', changefreq: 'monthly' },
  { url: '/restauracoes-esteticas', priority: '0.9', changefreq: 'monthly' },
  { url: '/clinica-geral-e-prevencao', priority: '0.9', changefreq: 'monthly' },
];

// Landing pages removidas do sitemap — SEO focado em service pages
// LPs são exclusivas para tráfego pago (Google Ads) e já possuem noindex

// English micro-site pages (SEO-indexable, excluindo LPs noindex)
const englishPages = [
  { url: '/en', priority: '0.9', changefreq: 'weekly' },
  { url: '/en/about', priority: '0.7', changefreq: 'monthly' },
  { url: '/en/contact', priority: '0.7', changefreq: 'monthly' },
  { url: '/en/dental-implants', priority: '0.9', changefreq: 'monthly' },
  { url: '/en/veneers-and-lenses', priority: '0.9', changefreq: 'monthly' },
  { url: '/en/general-dentistry', priority: '0.9', changefreq: 'monthly' },
  { url: '/en/dental-emergency', priority: '0.9', changefreq: 'monthly' },
  { url: '/en/dental-prosthetics', priority: '0.9', changefreq: 'monthly' },
  { url: '/en/teeth-whitening', priority: '0.9', changefreq: 'monthly' },
  { url: '/en/aesthetic-restorations', priority: '0.9', changefreq: 'monthly' },
  { url: '/en/orthodontics', priority: '0.9', changefreq: 'monthly' },
  { url: '/en/root-canal', priority: '0.9', changefreq: 'monthly' },
  { url: '/en/gum-health', priority: '0.9', changefreq: 'monthly' },
];
// English LPs NÃO incluídas — possuem noindex, nofollow (Google Ads only)
// /en/lp/cosmetic-dentistry, /en/lp/dental-implants, /en/lp/dental-emergency, /en/lp/general-consultation

// Páginas legais (baixa prioridade)
const legalPages = [
  { url: '/politica-de-privacidade', priority: '0.3', changefreq: 'yearly' },
  { url: '/termos-de-uso', priority: '0.3', changefreq: 'yearly' },
];

async function generateSitemap() {
  console.log('🚀 Generating sitemap.xml...\n');

  // Buscar posts do blog
  const blogPosts = await getBlogPosts();

  // Gerar URLs dos posts do blog
  const blogUrls = blogPosts.map(post => {
    let slug = '';

    if (post.fields?.slug) {
      slug = post.fields.slug;
    } else if (post.fields?.titulo) {
      slug = post.fields.titulo
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }

    if (!slug) return null;

    const updatedAt = post.sys?.updatedAt
      ? new Date(post.sys.updatedAt).toISOString().split('T')[0]
      : today;

    return {
      url: `/blog/${slug}`,
      lastmod: updatedAt,
      priority: '0.7',
      changefreq: 'weekly'
    };
  }).filter(item => item !== null);

  const allUrls = [
    ...mainPages,
    ...servicePages,
    ...englishPages,
    ...blogUrls,
    ...legalPages,
  ];

  // Gerar XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod || today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  // Salvar em public/sitemap.xml
  const publicDir = path.resolve(__dirname, '../public');
  const sitemapPath = path.join(publicDir, 'sitemap.xml');

  fs.writeFileSync(sitemapPath, sitemap, 'utf-8');

  console.log(`\n✅ Sitemap generated successfully!\n`);
  console.log(`📊 Statistics:`);
  console.log(`   - Main pages: ${mainPages.length}`);
  console.log(`   - Service pages: ${servicePages.length}`);
  console.log(`   - English pages: ${englishPages.length}`);
  console.log(`   - Landing pages: 0 (removed from sitemap)`);
  console.log(`   - Blog posts: ${blogUrls.length}`);
  console.log(`   - Legal pages: ${legalPages.length}`);
  console.log(`   - Total URLs: ${allUrls.length}\n`);
  console.log(`📍 File saved at: ${sitemapPath}\n`);
  console.log(`🔗 Next steps:`);
  console.log(`   1. Commit and push to production`);
  console.log(`   2. Submit to Google Search Console: https://search.google.com/search-console`);
  console.log(`   3. URL to submit: ${baseUrl}/sitemap.xml\n`);
}

// Executar
generateSitemap().catch(error => {
  console.error('❌ Error generating sitemap:', error);
  process.exit(1);
});

/**
 * Blog Pre-rendering Script
 *
 * Generates static HTML snapshots of blog posts for better SEO and AI discoverability.
 *
 * Usage:
 * 1. Run after build: node scripts/generate-blog-html.js
 * 2. This creates static HTML files in dist/blog/ folder
 *
 * Benefits:
 * - Google and other crawlers can index content immediately
 * - AI bots (ChatGPT, Perplexity, Claude) can read full content
 * - Faster initial page load
 * - Better SEO ranking
 */


import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Contentful configuration from environment variables
const SPACE_ID = process.env.VITE_CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.VITE_CONTENTFUL_ACCESS_TOKEN;
const BASE_URL = 'https://dracarlachristoph.com';

// Helper to extract plain text from Contentful rich text
function extractPlainTextFromRichText(richText) {
  if (!richText || typeof richText === 'string') return richText || '';
  if (!richText.content || !Array.isArray(richText.content)) return '';

  function extractTextFromNode(node) {
    if (!node) return '';
    if (node.nodeType === 'text') return node.value || '';
    if (node.content && Array.isArray(node.content)) {
      return node.content.map(extractTextFromNode).join(' ');
    }
    return '';
  }

  return richText.content.map(extractTextFromNode).join('\n\n').trim();
}

// HTML template for blog posts
const generateBlogPostHTML = (post) => {
  const title = post.fields?.titulo || post.fields?.title || 'Blog Post';
  const excerpt = post.fields?.resumo || post.fields?.excerpt || '';
  const content = extractPlainTextFromRichText(post.fields?.conteudo || post.fields?.content) || '';
  const imageUrl = post.fields?.imagemPrincipal?.fields?.file?.url || '';
  const author = post.fields?.autor || 'Dra. Carla Christoph';
  const date = post.sys?.createdAt || new Date().toISOString();
  const lastUpdated = post.fields?.lastUpdated || post.fields?.publishDate || date;
  const category = post.fields?.categoria || 'Odontologia';

  // AI Search fields — entram no HTML estático para Google/Perplexity/ChatGPT verem direto
  const quickAnswerBox = post.fields?.quickAnswerBox || post.fields?.quickAnswerBoquickAnswerBoxx || '';
  const keyTakeaways = Array.isArray(post.fields?.keyTakeaways) ? post.fields.keyTakeaways : [];
  const faqStructured = Array.isArray(post.fields?.faqStructured) ? post.fields.faqStructured : [];
  const peopleAlsoAsk = post.fields?.peopleAlsoAsk?.questions || [];

  // FAQ schema JSON-LD (gerado dinamicamente)
  const faqSchemaScript = faqStructured.length ? `
  <script type="application/ld+json">
  ${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqStructured.map(f => ({
      "@type": "Question",
      "name": f.name || f.question || '',
      "acceptedAnswer": { "@type": "Answer", "text": (f.acceptedAnswer && f.acceptedAnswer.text) || '' },
    })),
  })}
  </script>` : '';

  // HTML blocks para AI Search (visível para crawlers, ranqueia em featured snippets)
  const quickAnswerHtml = quickAnswerBox ? `
      <aside class="quick-answer" aria-label="Resposta rápida">
        <h2>Resposta rápida</h2>
        <p>${quickAnswerBox.replace(/</g, '&lt;')}</p>
      </aside>` : '';

  const keyTakeawaysHtml = keyTakeaways.length ? `
      <section class="key-takeaways" aria-label="Pontos-chave">
        <h2>Pontos-chave</h2>
        <ul>${keyTakeaways.map(k => `<li>${String(k).replace(/</g, '&lt;')}</li>`).join('')}</ul>
      </section>` : '';

  const faqHtml = faqStructured.length ? `
      <section class="faq" aria-label="Perguntas frequentes">
        <h2>Perguntas frequentes</h2>
        ${faqStructured.map(f => `
          <details>
            <summary>${(f.name || f.question || '').replace(/</g, '&lt;')}</summary>
            <p>${((f.acceptedAnswer && f.acceptedAnswer.text) || '').replace(/</g, '&lt;')}</p>
          </details>`).join('')}
      </section>` : '';

  const paaHtml = peopleAlsoAsk.length ? `
      <section class="people-also-ask" aria-label="As pessoas também perguntam">
        <h2>As pessoas também perguntam</h2>
        <ul>${peopleAlsoAsk.map(q => `<li>${String(q).replace(/</g, '&lt;')}</li>`).join('')}</ul>
      </section>` : '';

  let slug = post.fields?.slug;
  if (!slug && post.fields?.titulo) {
    slug = post.fields.titulo
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .replace(/--+/g, '-');
  }

  // Optimize Contentful image URL for mobile LCP
  const optimizedImageUrl = imageUrl
    ? `https:${imageUrl}?w=800&fm=webp&q=80`
    : '';
  const fullImageUrl = imageUrl ? 'https:' + imageUrl : '';

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} | Blog Dra. Carla Christoph</title>
  <meta name="description" content="${excerpt.substring(0, 160)}" />
  <meta name="author" content="${author}" />
  <link rel="canonical" href="${BASE_URL}/blog/${slug}" />

  <!-- LCP Optimization: preconnect + preload hero image -->
  <link rel="preconnect" href="https://images.ctfassets.net" crossorigin />
  ${optimizedImageUrl ? `<link rel="preload" as="image" href="${optimizedImageUrl}" fetchpriority="high" />` : ''}

  <!-- Open Graph -->
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${excerpt.substring(0, 160)}" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="${BASE_URL}/blog/${slug}" />
  <meta property="og:image" content="${fullImageUrl}" />
  <meta property="article:published_time" content="${date}" />
  <meta property="article:author" content="${author}" />
  <meta property="article:section" content="${category}" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${excerpt.substring(0, 160)}" />
  <meta name="twitter:image" content="${fullImageUrl}" />

  <!-- Schema.org BlogPosting -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "${title}",
    "description": "${excerpt.replace(/"/g, '\\"')}",
    "image": "${imageUrl ? 'https:' + imageUrl : ''}",
    "datePublished": "${date}",
    "dateModified": "${lastUpdated}",
    "author": {
      "@type": "Person",
      "name": "${author}",
      "jobTitle": "Dentista Especialista em Prótese Dental",
      "hasCredential": {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "CRO-RJ",
        "recognizedBy": {
          "@type": "Organization",
          "name": "Conselho Regional de Odontologia do Rio de Janeiro"
        },
        "identifier": "27.509"
      },
      "worksFor": {
        "@type": "Dentist",
        "name": "Clínica Dra. Carla Christoph",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Rua Visconde de Pirajá, 550 - Sala 1107",
          "addressLocality": "Ipanema",
          "addressRegion": "RJ",
          "postalCode": "22410-901",
          "addressCountry": "BR"
        }
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "Clínica Dra. Carla Christoph",
      "logo": {
        "@type": "ImageObject",
        "url": "${BASE_URL}/lovable-uploads/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "${BASE_URL}/blog/${slug}"
    },
    "articleSection": "${category}",
    "inLanguage": "pt-BR"
  }
  </script>
  ${faqSchemaScript}

  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      background: #f5f5f5;
    }
    .container {
      background: white;
      padding: 40px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    h1 {
      color: #553c6b;
      margin-bottom: 16px;
    }
    .meta {
      color: #666;
      font-size: 0.9em;
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 1px solid #eee;
    }
    img {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      margin: 24px 0;
    }
    .excerpt {
      font-size: 1.1em;
      color: #555;
      font-style: italic;
      margin: 24px 0;
      padding-left: 20px;
      border-left: 4px solid #c4a46a;
    }
    .content {
      margin-top: 32px;
    }
    .loading {
      text-align: center;
      padding: 40px;
      color: #999;
    }
    .quick-answer {
      background: #f7f4ee;
      border-left: 4px solid #c4a46a;
      padding: 20px 24px;
      margin: 24px 0;
      border-radius: 4px;
    }
    .quick-answer h2 {
      margin: 0 0 12px 0;
      font-size: 1.05em;
      color: #553c6b;
    }
    .quick-answer p { margin: 0; color: #333; }
    .key-takeaways, .people-also-ask {
      background: #fafafa;
      padding: 20px 24px;
      margin: 24px 0;
      border-radius: 4px;
    }
    .key-takeaways h2, .people-also-ask h2, .faq h2 {
      font-size: 1.1em;
      color: #553c6b;
      margin: 0 0 12px 0;
    }
    .key-takeaways ul, .people-also-ask ul { margin: 0; padding-left: 20px; }
    .faq { margin: 32px 0; }
    .faq details {
      border-bottom: 1px solid #eee;
      padding: 12px 0;
    }
    .faq summary {
      cursor: pointer;
      font-weight: 600;
      color: #553c6b;
    }
    .faq details p { margin: 8px 0 0 0; color: #333; }
  </style>
</head>
<body>
  <div class="container">
    <article>
      <h1>${title}</h1>
      <div class="meta">
        Por ${author} • ${new Date(date).toLocaleDateString('pt-BR')} • ${category}
      </div>
      ${optimizedImageUrl ? `<img src="${optimizedImageUrl}" alt="${title}" width="800" height="450" loading="eager" fetchpriority="high" decoding="async" style="aspect-ratio:16/9;object-fit:cover" />` : ''}
      <div class="excerpt">${excerpt}</div>
      ${quickAnswerHtml}
      ${keyTakeawaysHtml}
      <div class="content">
        ${content.substring(0, 1500)}${content.length > 1500 ? '...' : ''}
      </div>
      ${faqHtml}
      ${paaHtml}
    </article>
    <div style="margin-top: 32px; padding: 24px; background: #f9f9f9; border-radius: 8px; text-align: center;">
      <p style="margin: 0 0 16px 0; font-size: 1.1em;">Leia o artigo completo com imagens e recursos interativos:</p>
      <a href="${BASE_URL}/blog/${slug}" style="display: inline-block; padding: 12px 24px; background: #553c6b; color: white; text-decoration: none; border-radius: 6px; font-weight: 600;">Ver artigo completo no site</a>
    </div>
  </div>
</body>
</html>`;
};

async function fetchBlogPosts() {
  try {
    const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?content_type=blogCarla&limit=200&access_token=${ACCESS_TOKEN}&include=2`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Contentful API error: ${response.status}`);
    }

    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('❌ Error fetching blog posts:', error.message);
    return [];
  }
}

async function generateStaticBlogPages() {
  console.log('🚀 Starting blog pre-rendering...\n');

  // Fetch all blog posts
  const posts = await fetchBlogPosts();

  if (posts.length === 0) {
    console.log('⚠️  No blog posts found. Check Contentful configuration.');
    return;
  }

  console.log(`📝 Found ${posts.length} blog posts\n`);

  // Create dist/blog directory if it doesn't exist
  const distBlogDir = path.join(__dirname, '..', 'dist', 'blog');
  if (!fs.existsSync(distBlogDir)) {
    fs.mkdirSync(distBlogDir, { recursive: true });
  }

  let successCount = 0;
  let errorCount = 0;

  // Generate HTML for each post
  for (const post of posts) {
    try {
      let slug = post.fields?.slug;

      if (!slug && post.fields?.titulo) {
        slug = post.fields.titulo
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')
          .replace(/--+/g, '-');
      }

      if (!slug || slug.length < 3) {
        console.log(`⏭️  Skipping post without valid slug`);
        errorCount++;
        continue;
      }

      const html = generateBlogPostHTML(post);
      const title = post.fields?.titulo || 'Untitled';

      // Create directory for this post
      const postDir = path.join(distBlogDir, slug);
      if (!fs.existsSync(postDir)) {
        fs.mkdirSync(postDir, { recursive: true });
      }

      // Write index.html
      const htmlPath = path.join(postDir, 'index.html');
      fs.writeFileSync(htmlPath, html, 'utf-8');

      console.log(`✅ Generated: /blog/${slug}/ - "${title}"`);
      successCount++;

    } catch (error) {
      console.error(`❌ Error generating post:`, error.message);
      errorCount++;
    }
  }

  console.log(`\n✨ Pre-rendering complete!`);
  console.log(`   ✅ Success: ${successCount} pages`);
  console.log(`   ❌ Errors: ${errorCount} pages`);
  console.log(`\n💡 Next steps:`);
  console.log(`   1. Deploy dist/ folder to production`);
  console.log(`   2. Test with: curl -I ${BASE_URL}/blog/[slug]/`);
  console.log(`   3. Verify in Google Search Console`);
  console.log(`\n📊 Expected impact:`);
  console.log(`   • 100% content visibility for crawlers`);
  console.log(`   • Faster Google indexing`);
  console.log(`   • Better AI bot comprehension (ChatGPT, Perplexity, Claude)`);
  console.log(`   • Improved SEO ranking for blog posts`);
}

generateStaticBlogPages().catch(console.error);

const fs = require('fs');

// Load data
const data = JSON.parse(fs.readFileSync('contentful_posts.json', 'utf8'));
const posts = data.items.filter(item => item.sys.contentType?.sys?.id === 'blogCarla');

// BRAND.md banned words (from BRAND.md section 5)
const bannedWords = [
  'sorriso perfeito',
  'transforme seu sorriso',
  'premium',
  'excelência',
  'humanizado',
  'tecnologia de ponta',
  'profissionais altamente qualificados',
  'solução definitiva',
  'resultados excepcionais',
  '100% natural',
  'atendimento personalizado',
  'materiais de alta qualidade',
  'agende agora',
  'não perca',
  'recomendo',
  'incrível',
  'perfeita'
];

// Service pages mapping
const servicePages = {
  'implantes': '/implantes-dentarios',
  'clareamento': '/clareamento-dental',
  'lentes': '/lentes-de-contato-dental-e-facetas',
  'facetas': '/lentes-de-contato-dental-e-facetas',
  'prótese': '/protese-dentaria',
  'ortodontia': '/ortodontia',
  'canal': '/tratamento-de-canal',
  'restaurações': '/restauracoes-esteticas',
  'gengiva': '/saude-da-gengiva',
  'periodontite': '/saude-da-gengiva',
  'prevenção': '/clinica-geral-e-prevencao'
};

// GA4 traffic data (from PILAR-5-GA4-ANALYSIS.md)
const ga4Data = {
  '/blog/carie-oculta': { views: 45, engagement: null, conversion: 0 },
  '/blog/probioticos': { views: 15, engagement: 99, conversion: 28.57 },
  '/blog/periodontite': { views: 28, engagement: null, conversion: 0 },
  '/blog/mau-halito': { views: 26, engagement: 154, conversion: 0 },
  '/blog/jejum-intermitente-e-saude-bucal': { views: 19, engagement: 542, conversion: 0 },
  '/blog/emergencia-dente-quebrou': { views: 22, engagement: null, conversion: 0 },
  '/blog/dente-trincado': { views: 29, engagement: null, conversion: 0 },
  '/blog/alimentos-com-amido': { views: 26, engagement: null, conversion: 0 }
};

// Helper function to extract text from Rich Text content
function extractTextFromRichText(content) {
  if (!content) return '';

  let text = '';

  function traverse(node) {
    if (node.nodeType === 'text') {
      text += node.value + ' ';
    }
    if (node.content) {
      node.content.forEach(traverse);
    }
  }

  traverse(content);
  return text.toLowerCase();
}

// Helper function to count internal links
function countInternalLinks(content) {
  if (!content) return { total: 0, servicePages: [], blogPosts: 0, other: 0 };

  let servicePageLinks = [];
  let blogPostLinks = 0;
  let otherLinks = 0;

  function traverse(node) {
    if (node.nodeType === 'hyperlink') {
      const url = node.data?.uri || '';

      // Check if it's a service page link
      for (const [key, path] of Object.entries(servicePages)) {
        if (url.includes(path)) {
          servicePageLinks.push(path);
          return;
        }
      }

      // Check if it's a blog link
      if (url.includes('/blog/')) {
        blogPostLinks++;
        return;
      }

      // Other internal links
      if (url.includes('dracarlachristoph.com') || url.startsWith('/')) {
        otherLinks++;
      }
    }

    if (node.content) {
      node.content.forEach(traverse);
    }
  }

  traverse(content);

  return {
    total: servicePageLinks.length + blogPostLinks + otherLinks,
    servicePages: [...new Set(servicePageLinks)], // unique service pages
    blogPosts: blogPostLinks,
    other: otherLinks
  };
}

// Helper function to check brand violations
function checkBrandViolations(text) {
  const violations = [];

  bannedWords.forEach(word => {
    if (text.includes(word.toLowerCase())) {
      violations.push(word);
    }
  });

  return violations;
}

// Analyze each post
const analysis = posts.map((post, idx) => {
  const fields = post.fields;
  const slug = `/blog/${fields.slug}`;
  const contentText = extractTextFromRichText(fields.content);
  const fullText = (fields.title + ' ' + fields.excerpt + ' ' + contentText).toLowerCase();

  // Brand compliance
  const violations = checkBrandViolations(fullText);
  const brandScore = violations.length === 0 ? 100 : Math.max(0, 100 - (violations.length * 20));

  // Internal links
  const links = countInternalLinks(fields.content);

  // Service alignment
  let alignedService = null;
  let alignmentScore = 0;

  for (const [keyword, path] of Object.entries(servicePages)) {
    if (fullText.includes(keyword)) {
      alignedService = path;
      // Check if post actually links to this service
      if (links.servicePages.includes(path)) {
        alignmentScore = 100;
      } else {
        alignmentScore = 50; // mentions service but doesn't link
      }
      break;
    }
  }

  // Content quality
  const wordCount = contentText.split(/\s+/).length;
  const hasQuickAnswer = !!fields.quickAnswerBoquickAnswerBoxx;
  const hasFAQs = !!fields.faqStructured;
  const hasKeyTakeaways = !!fields.keyTakeaways;
  const hasFeaturedImage = !!fields.featuredImage;

  let qualityScore = 0;
  if (wordCount > 1000) qualityScore += 30;
  else if (wordCount > 500) qualityScore += 20;
  else qualityScore += 10;

  if (hasQuickAnswer) qualityScore += 20;
  if (hasFAQs) qualityScore += 20;
  if (hasKeyTakeaways) qualityScore += 15;
  if (hasFeaturedImage) qualityScore += 15;

  // SEO score
  const metaLength = fields.metaDescription?.length || 0;
  const hasMeta = metaLength >= 120 && metaLength <= 160;
  const titleLength = fields.title?.length || 0;
  const hasGoodTitle = titleLength >= 30 && titleLength <= 70;

  let seoScore = 0;
  if (hasMeta) seoScore += 40;
  else if (metaLength > 0) seoScore += 20;

  if (hasGoodTitle) seoScore += 30;
  else if (titleLength > 0) seoScore += 15;

  if (hasQuickAnswer) seoScore += 15; // for AI Search
  if (hasFAQs) seoScore += 15; // for FAQPage schema

  // Advanced features score
  let featuresScore = 0;
  if (hasQuickAnswer) featuresScore += 25;
  if (hasKeyTakeaways) featuresScore += 25;
  if (hasFAQs) featuresScore += 25;
  if (hasFeaturedImage) featuresScore += 25;

  // GA4 data
  const ga4 = ga4Data[slug] || null;

  // Overall score
  const overallScore = Math.round((brandScore + alignmentScore + qualityScore + seoScore + featuresScore) / 5);

  return {
    idx: idx + 1,
    title: fields.title,
    slug: fields.slug,
    url: slug,
    category: fields.category || 'Uncategorized',
    publishDate: fields.publishDate,

    // Metrics
    wordCount,
    metaLength,

    // Features
    hasQuickAnswer,
    hasKeyTakeaways,
    hasFAQs,
    hasFeaturedImage,

    // Brand compliance
    brandScore,
    violations,

    // Service alignment
    alignedService,
    alignmentScore,

    // Internal links
    linksTotal: links.total,
    linksToServices: links.servicePages,
    linksToBlog: links.blogPosts,
    linksOther: links.other,

    // Scores
    qualityScore,
    seoScore,
    featuresScore,
    overallScore,

    // GA4 data
    ga4Views: ga4?.views || 0,
    ga4Engagement: ga4?.engagement || 0,
    ga4Conversion: ga4?.conversion || 0
  };
});

// Sort by overall score descending
analysis.sort((a, b) => b.overallScore - a.overallScore);

// Output results
console.log('='.repeat(80));
console.log('PILAR 10 — BLOG CONTENT ANALYSIS (REAL DATA FROM CONTENTFUL)');
console.log('='.repeat(80));
console.log(`\nTotal posts analyzed: ${analysis.length}`);
console.log(`Analysis date: ${new Date().toISOString().split('T')[0]}`);

// Statistics
const stats = {
  avgWordCount: Math.round(analysis.reduce((sum, p) => sum + p.wordCount, 0) / analysis.length),
  postsWithQuickAnswer: analysis.filter(p => p.hasQuickAnswer).length,
  postsWithFAQs: analysis.filter(p => p.hasFAQs).length,
  postsWithKeyTakeaways: analysis.filter(p => p.hasKeyTakeaways).length,
  postsWithFeaturedImage: analysis.filter(p => p.hasFeaturedImage).length,
  postsWithBrandViolations: analysis.filter(p => p.violations.length > 0).length,
  postsWithZeroServiceLinks: analysis.filter(p => p.linksToServices.length === 0).length,
  postsWithGA4Data: analysis.filter(p => p.ga4Views > 0).length,
  avgOverallScore: Math.round(analysis.reduce((sum, p) => sum + p.overallScore, 0) / analysis.length)
};

console.log('\n' + '='.repeat(80));
console.log('EXECUTIVE SUMMARY');
console.log('='.repeat(80));
console.log(`Average word count: ${stats.avgWordCount} words`);
console.log(`Average overall score: ${stats.avgOverallScore}/100`);
console.log(`\nAdvanced features usage:`);
console.log(`  - Quick Answer: ${stats.postsWithQuickAnswer}/${analysis.length} (${Math.round(stats.postsWithQuickAnswer/analysis.length*100)}%)`);
console.log(`  - FAQs: ${stats.postsWithFAQs}/${analysis.length} (${Math.round(stats.postsWithFAQs/analysis.length*100)}%)`);
console.log(`  - Key Takeaways: ${stats.postsWithKeyTakeaways}/${analysis.length} (${Math.round(stats.postsWithKeyTakeaways/analysis.length*100)}%)`);
console.log(`  - Featured Image: ${stats.postsWithFeaturedImage}/${analysis.length} (${Math.round(stats.postsWithFeaturedImage/analysis.length*100)}%)`);
console.log(`\nCritical issues:`);
console.log(`  - Brand violations: ${stats.postsWithBrandViolations} posts`);
console.log(`  - Zero service links: ${stats.postsWithZeroServiceLinks} posts`);
console.log(`  - Posts with GA4 data: ${stats.postsWithGA4Data}/${analysis.length}`);

// Top 10 posts by score
console.log('\n' + '='.repeat(80));
console.log('TOP 10 POSTS BY OVERALL SCORE');
console.log('='.repeat(80));
analysis.slice(0, 10).forEach(p => {
  console.log(`\n${p.idx}. ${p.title}`);
  console.log(`   Slug: /blog/${p.slug}`);
  console.log(`   Score: ${p.overallScore}/100 | Brand: ${p.brandScore} | Service: ${p.alignmentScore} | Quality: ${p.qualityScore} | SEO: ${p.seoScore}`);
  console.log(`   Words: ${p.wordCount} | Links to services: ${p.linksToServices.length} | GA4 views: ${p.ga4Views}`);
  if (p.violations.length > 0) {
    console.log(`   ⚠️  Brand violations: ${p.violations.join(', ')}`);
  }
});

// Bottom 10 posts
console.log('\n' + '='.repeat(80));
console.log('BOTTOM 10 POSTS BY OVERALL SCORE');
console.log('='.repeat(80));
analysis.slice(-10).reverse().forEach(p => {
  console.log(`\n${p.idx}. ${p.title}`);
  console.log(`   Slug: /blog/${p.slug}`);
  console.log(`   Score: ${p.overallScore}/100 | Brand: ${p.brandScore} | Service: ${p.alignmentScore} | Quality: ${p.qualityScore} | SEO: ${p.seoScore}`);
  console.log(`   Words: ${p.wordCount} | Links to services: ${p.linksToServices.length}`);
  if (p.violations.length > 0) {
    console.log(`   ⚠️  Brand violations: ${p.violations.join(', ')}`);
  }
});

// Posts with high traffic but zero links
console.log('\n' + '='.repeat(80));
console.log('HIGH TRAFFIC POSTS WITH ZERO SERVICE LINKS');
console.log('='.repeat(80));
const highTrafficNoLinks = analysis
  .filter(p => p.ga4Views >= 20 && p.linksToServices.length === 0)
  .sort((a, b) => b.ga4Views - a.ga4Views);

if (highTrafficNoLinks.length > 0) {
  highTrafficNoLinks.forEach(p => {
    console.log(`\n• ${p.title}`);
    console.log(`  URL: /blog/${p.slug}`);
    console.log(`  GA4 views: ${p.ga4Views} | Engagement: ${p.ga4Engagement}s | Conversion: ${p.ga4Conversion}%`);
    console.log(`  Aligned service: ${p.alignedService || 'NONE'}`);
    console.log(`  Recommendation: ${p.alignedService ? `Add link to ${p.alignedService}` : 'No clear service alignment - consider rewrite or delete'}`);
  });
} else {
  console.log('None found (all high-traffic posts have service links)');
}

// Posts with brand violations
console.log('\n' + '='.repeat(80));
console.log('POSTS WITH BRAND VIOLATIONS');
console.log('='.repeat(80));
const postsWithViolations = analysis.filter(p => p.violations.length > 0);

if (postsWithViolations.length > 0) {
  postsWithViolations.forEach(p => {
    console.log(`\n• ${p.title}`);
    console.log(`  Violations: ${p.violations.join(', ')}`);
  });
} else {
  console.log('✅ No brand violations found!');
}

// Write full JSON report
fs.writeFileSync('blog_analysis_report.json', JSON.stringify(analysis, null, 2));
console.log('\n' + '='.repeat(80));
console.log('Full analysis saved to: blog_analysis_report.json');
console.log('='.repeat(80));

/**
 * Static Pre-rendering Script (Sprint 5 — AI Search Optimization)
 *
 * Generates static HTML pages with:
 * 1. Correct meta tags (title, description, OG, Twitter, canonical)
 * 2. JSON-LD schemas (MedicalProcedure, FAQPage, Dentist) in <head>
 * 3. Semantic fallback content in <div id="root"> for AI bots/crawlers
 *
 * AI bots (ChatGPT, Perplexity, Claude, Google) cannot execute JavaScript,
 * so they see an empty <div id="root"></div> in a React SPA. This script
 * injects real content that crawlers can read, while React replaces it
 * when JS loads for real users.
 *
 * NOTE: FAQ data here mirrors the React components. If FAQs change in
 * the .tsx files, update this script too.
 *
 * Usage: node scripts/generate-static-meta.cjs (runs after vite build)
 */

const fs = require('fs');
const path = require('path');

// ============================================================
// SHARED CONSTANTS
// ============================================================

const BASE_URL = 'https://dracarlachristoph.com';
const OG_IMAGE = BASE_URL + '/lovable-uploads/doutora-em-pe-jaleco.webp';

const PROVIDER = {
  '@type': 'Dentist',
  'name': 'Dra. Carla Christoph',
  'telephone': '+5521993304045',
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': 'Rua Visconde de Pirajá, 550 - Sala 1107',
    'addressLocality': 'Ipanema',
    'addressRegion': 'RJ',
    'postalCode': '22410-901',
    'addressCountry': 'BR'
  }
};

// ============================================================
// HELPER FUNCTIONS
// ============================================================

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function generateMedicalProcedureSchema(data, routePath) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    'name': data.procedure.name,
    'description': data.procedure.description,
    'procedureType': 'Dental',
    'url': BASE_URL + routePath,
    'provider': data.provider || PROVIDER
  };
  return JSON.stringify(schema);
}

function generateFAQPageSchema(faqs) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(f => ({
      '@type': 'Question',
      'name': f.q,
      'acceptedAnswer': { '@type': 'Answer', 'text': f.a }
    }))
  };
  return JSON.stringify(schema);
}

function generateDentistSchema() {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    'name': 'Dra. Carla Christoph',
    'description': 'Dentista especialista em Prótese Dental e Reabilitação Oral em Ipanema, Rio de Janeiro. Mais de 20 anos de experiência.',
    'telephone': '+5521993304045',
    'url': BASE_URL,
    'image': BASE_URL + '/lovable-uploads/dra-carla-jaleco-bracos-cruzados.webp',
    'priceRange': '$$$',
    'address': PROVIDER.address,
    'openingHoursSpecification': [
      { '@type': 'OpeningHoursSpecification', 'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], 'opens': '09:00', 'closes': '19:00' }
    ],
    'hasCredential': { '@type': 'EducationalOccupationalCredential', 'credentialCategory': 'CRO-RJ', 'recognizedBy': { '@type': 'Organization', 'name': 'CRO-RJ' }, 'identifier': '27.509' },
    'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '5.0', 'reviewCount': '16', 'bestRating': '5' },
    'availableLanguage': ['pt-BR', 'en']
  });
}

function generateFallbackHTML(data, routePath) {
  const faqsHtml = (data.faqs || []).slice(0, 6).map(f =>
    `<dt>${escapeHtml(f.q)}</dt><dd>${escapeHtml(f.a)}</dd>`
  ).join('\n          ');

  return `<header style="padding:16px 0;border-bottom:1px solid #eee">
      <nav>
        <a href="/" style="font-weight:bold;color:#553c6b;text-decoration:none">Dra. Carla Christoph</a> |
        <a href="/servicos">Tratamentos</a> |
        <a href="/sobre">Sobre</a> |
        <a href="/blog">Blog</a> |
        <a href="/contato">Contato</a>
      </nav>
    </header>
    <main style="max-width:800px;margin:0 auto;padding:24px 16px;font-family:system-ui,sans-serif;line-height:1.6;color:#333">
      <nav aria-label="breadcrumb"><a href="/">Inicio</a> &gt; <a href="/servicos">Tratamentos</a> &gt; ${escapeHtml(data.h1)}</nav>
      <h1>${escapeHtml(data.h1)}</h1>
      <p>${escapeHtml(data.quickAnswer || data.description)}</p>
      ${data.faqs && data.faqs.length > 0 ? `<section>
        <h2>Perguntas Frequentes</h2>
        <dl>
          ${faqsHtml}
        </dl>
      </section>` : ''}
    </main>
    <footer style="padding:24px 16px;border-top:1px solid #eee;text-align:center;color:#666;font-size:0.9em">
      <p><strong>Dra. Carla Christoph</strong> — CRO-RJ 27.509</p>
      <p>Rua Visconde de Piraj&aacute;, 550 - Sala 1107, Ipanema, Rio de Janeiro</p>
      <p>Tel: (21) 99330-4045 | Seg-Sex 9h-19h, S&aacute;b 9h-14h</p>
      <p><a href="https://wa.me/5521993304045">Agendar pelo WhatsApp</a></p>
    </footer>`;
}

function generateInfoFallbackHTML(data) {
  return `<header style="padding:16px 0;border-bottom:1px solid #eee">
      <nav>
        <a href="/" style="font-weight:bold;color:#553c6b;text-decoration:none">Dra. Carla Christoph</a> |
        <a href="/servicos">Tratamentos</a> |
        <a href="/sobre">Sobre</a> |
        <a href="/blog">Blog</a> |
        <a href="/contato">Contato</a>
      </nav>
    </header>
    <main style="max-width:800px;margin:0 auto;padding:24px 16px;font-family:system-ui,sans-serif;line-height:1.6;color:#333">
      <h1>${escapeHtml(data.h1 || data.title)}</h1>
      <p>${escapeHtml(data.summary || data.description)}</p>
    </main>
    <footer style="padding:24px 16px;border-top:1px solid #eee;text-align:center;color:#666;font-size:0.9em">
      <p><strong>Dra. Carla Christoph</strong> — CRO-RJ 27.509</p>
      <p>Rua Visconde de Piraj&aacute;, 550 - Sala 1107, Ipanema, Rio de Janeiro</p>
      <p>Tel: (21) 99330-4045 | <a href="https://wa.me/5521993304045">WhatsApp</a></p>
    </footer>`;
}

// ────────────────────────────────────────────────────────────────
// SPRINT 3 — CLS FIX: Rewritten LP fallback to match React layout
// ────────────────────────────────────────────────────────────────
// PROBLEM: The old fallback used a simple <header border-bottom> + <main max-width:800px>
// layout, but React renders a <header position:fixed> + <section min-height:100vh> layout.
// When React hydrated and replaced the fallback, everything shifted → CLS ~0.408.
//
// FIX: The new fallback mirrors the React ConsultaInicial template's CSS:
// - Header: position:fixed, top:0, z-index:50, white background, shadow
// - Hero: min-height:100vh, padding-top:90px, background:#FAF7F2
// - Image: same aspect-ratio and max-width as React
// - CTA button: same colors (#381F47) and sizing as React
//
// ROLLBACK: To revert, rename generateLPFallbackHTML_ORIGINAL_PRE_SPRINT3
//           back to generateLPFallbackHTML and delete the new version.
// ────────────────────────────────────────────────────────────────

/**
 * PRESERVED FOR ROLLBACK — Original function before Sprint 3 CLS fix.
 * To rollback: rename this to generateLPFallbackHTML, delete the new one.
 */
function generateLPFallbackHTML_ORIGINAL_PRE_SPRINT3(c, lang) {
  const isEn = lang === 'en';
  const L = {
    treatments: isEn ? 'Treatments' : 'Tratamentos',
    about: isEn ? 'About' : 'Sobre',
    contact: isEn ? 'Contact' : 'Contato',
    benefits: isEn ? 'Benefits' : 'Benefícios',
    howItWorks: isEn ? 'How it works' : 'Como funciona',
    testimonials: isEn ? 'Patient stories' : 'Pacientes contam',
    faq: isEn ? 'Frequently Asked Questions' : 'Perguntas Frequentes',
    hours: isEn ? 'Mon&ndash;Fri 9 AM&ndash;7 PM &bull; Sat 9 AM&ndash;2 PM' : 'Seg&ndash;Sex 9h&ndash;19h &bull; S&aacute;b 9h&ndash;14h',
    addr: isEn ? 'Rua Visconde de Piraj&aacute; 550, Suite 1107, Ipanema, Rio de Janeiro' : 'Rua Visconde de Piraj&aacute;, 550 - Sala 1107, Ipanema, Rio de Janeiro',
    whatsApp: isEn ? 'WhatsApp' : 'WhatsApp',
    homeLink: isEn ? '/en' : '/',
    servicesLink: isEn ? '/en' : '/servicos',
    aboutLink: isEn ? '/en/about' : '/sobre',
    contactLink: isEn ? '/en/contact' : '/contato',
  };
  const waNumber = c.whatsappNumber || '5521993304045';
  const waMsg = encodeURIComponent(c.whatsappMessage || '');
  const waHref = 'https://wa.me/' + waNumber + (waMsg ? '?text=' + waMsg : '');
  const benefitsHtml = (c.benefits || []).map(b => '<li>' + escapeHtml(b) + '</li>').join('\n          ');
  const problemsHtml = (c.problems || []).map(p => '<li>' + escapeHtml(p) + '</li>').join('\n          ');
  const stepsHtml = (c.steps || []).map(s =>
    '<li><strong>' + escapeHtml(s.title) + '.</strong> ' + escapeHtml(s.description) + '</li>'
  ).join('\n          ');
  const testimonialsHtml = (c.testimonials || []).map(t =>
    '<blockquote><p>' + escapeHtml(t.text) + '</p><cite>&mdash; ' + escapeHtml(t.name) + '</cite></blockquote>'
  ).join('\n        ');
  const faqsHtml = (c.faqs || []).map(f =>
    '<dt>' + escapeHtml(f.q) + '</dt><dd>' + escapeHtml(f.a) + '</dd>'
  ).join('\n          ');
  const deriveAvifPaths = (webpSrc) => {
    if (!webpSrc) return null;
    const base = webpSrc.replace(/\.webp$/, '');
    return { mobile: `${base}-480.avif`, desktop: `${base}-1024.avif` };
  };
  const avifPaths = c.backgroundImage ? deriveAvifPaths(c.backgroundImage) : null;
  let heroImageHtml = '';
  if (c.backgroundImage) {
    if (avifPaths) {
      heroImageHtml = `
      <div style="margin:24px 0;text-align:center;aspect-ratio:760/996;max-width:380px;margin-left:auto;margin-right:auto">
        <picture>
          <source srcset="${avifPaths.mobile} 480w, ${avifPaths.desktop} 1024w" sizes="(max-width:767px) 100vw, (min-width:768px) 50vw, 40vw" type="image/avif" />
          <img src="${c.backgroundImage}" alt="${escapeHtml(c.h1)}" style="width:100%;height:auto;border-radius:12px;box-shadow:0 8px 24px rgba(0,0,0,0.08)" width="760" height="996" fetchpriority="high" decoding="async" />
        </picture>
      </div>`;
    } else {
      heroImageHtml = `
      <div style="margin:24px 0;text-align:center;max-width:380px;margin-left:auto;margin-right:auto">
        <img src="${c.backgroundImage}" alt="${escapeHtml(c.h1)}" style="width:100%;height:auto;border-radius:12px;box-shadow:0 8px 24px rgba(0,0,0,0.08)" fetchpriority="high" decoding="async" />
      </div>`;
    }
  }
  const ctaButtonText = c.ctaText || (isEn ? 'Book via WhatsApp' : 'Agendar pelo WhatsApp');
  return `<header style="padding:16px 0;border-bottom:1px solid #eee">
      <nav>
        <a href="${L.homeLink}" style="font-weight:bold;color:#553c6b;text-decoration:none">Dra. Carla Christoph</a> |
        <a href="${L.servicesLink}">${L.treatments}</a> |
        <a href="${L.aboutLink}">${L.about}</a> |
        <a href="${L.contactLink}">${L.contact}</a>
      </nav>
    </header>
    <main style="max-width:800px;margin:0 auto;padding:24px 16px;font-family:system-ui,sans-serif;line-height:1.6;color:#333">
      <h1>${escapeHtml(c.h1)}</h1>
      <p>${escapeHtml(c.subhead)}</p>
      ${heroImageHtml}
      <p><a href="${waHref}" style="display:inline-block;padding:12px 24px;background:#25D366;color:#fff;text-decoration:none;border-radius:6px;font-weight:600">${escapeHtml(ctaButtonText)}</a></p>
      ${benefitsHtml ? `<section><h2>${L.benefits}</h2><ul>${benefitsHtml}</ul></section>` : ''}
      ${problemsHtml ? `<section><h2>${escapeHtml(c.problemTitle || (isEn ? 'Common situations' : 'Situa&ccedil;&otilde;es comuns'))}</h2><ul>${problemsHtml}</ul></section>` : ''}
      ${stepsHtml ? `<section><h2>${escapeHtml(c.guideTitle || L.howItWorks)}</h2><ol>${stepsHtml}</ol></section>` : ''}
      ${testimonialsHtml ? `<section><h2>${escapeHtml(c.testimonialsTitle || L.testimonials)}</h2>${testimonialsHtml}</section>` : ''}
      ${faqsHtml ? `<section><h2>${escapeHtml(c.faqTitle || L.faq)}</h2><dl>${faqsHtml}</dl></section>` : ''}
      <section>
        <h2>${escapeHtml(c.ctaTitle || (isEn ? 'Ready to book?' : 'Pronto para agendar?'))}</h2>
        ${c.ctaSubtitle ? '<p>' + escapeHtml(c.ctaSubtitle) + '</p>' : ''}
        <p><a href="${waHref}" style="display:inline-block;padding:12px 24px;background:#25D366;color:#fff;text-decoration:none;border-radius:6px;font-weight:600">${escapeHtml(ctaButtonText)}</a></p>
      </section>
    </main>
    <footer style="padding:24px 16px;border-top:1px solid #eee;text-align:center;color:#666;font-size:0.9em">
      <p><strong>Dra. Carla Christoph</strong> &mdash; CRO-RJ 27.509</p>
      <p>${L.addr}</p>
      <p>Tel: (21) 99330-4045 | <a href="${waHref}">${L.whatsApp}</a></p>
      <p>${L.hours}</p>
    </footer>`;
}

/**
 * SPRINT 3 — CLS-safe LP fallback HTML.
 *
 * Mirrors the React ConsultaInicial template layout to prevent CLS when
 * React hydrates and replaces this content. The above-the-fold section
 * (header + hero) uses the SAME CSS properties as the React components:
 * - ConsultaInicialHeader: position:fixed, white bg, shadow, z-50
 * - ConsultaInicialHero: min-height:100vh, padding-top:90px, bg:#FAF7F2
 *
 * Below-the-fold content stays semantic (simple HTML) since it's outside
 * the viewport at initial paint and doesn't contribute to CLS.
 */
function generateLPFallbackHTML(c, lang) {
  const isEn = lang === 'en';
  const L = {
    benefits: isEn ? 'Benefits' : 'Benefícios',
    howItWorks: isEn ? 'How it works' : 'Como funciona',
    testimonials: isEn ? 'Patient stories' : 'Pacientes contam',
    faq: isEn ? 'Frequently Asked Questions' : 'Perguntas Frequentes',
    hours: isEn ? 'Mon&ndash;Fri 9 AM&ndash;7 PM &bull; Sat 9 AM&ndash;2 PM' : 'Seg&ndash;Sex 9h&ndash;19h &bull; S&aacute;b 9h&ndash;14h',
    addr: isEn ? 'Rua Visconde de Piraj&aacute; 550, Suite 1107, Ipanema, Rio de Janeiro' : 'Rua Visconde de Piraj&aacute;, 550 - Sala 1107, Ipanema, Rio de Janeiro',
    whatsApp: isEn ? 'WhatsApp 24h' : 'WhatsApp 24h',
    privateLabel: isEn ? 'Private Care' : 'Atendimento Particular',
    location: 'Ipanema',
  };

  const waNumber = c.whatsappNumber || '5521993304045';
  const waMsg = encodeURIComponent(c.whatsappMessage || '');
  const waHref = 'https://wa.me/' + waNumber + (waMsg ? '?text=' + waMsg : '');
  const ctaButtonText = c.ctaText || (isEn ? 'Book via WhatsApp' : 'Agendar pelo WhatsApp');

  // ── Hero image (same dimensions/aspect as React UltraOptimizedPicture) ──
  const deriveAvifPaths = (webpSrc) => {
    if (!webpSrc) return null;
    const base = webpSrc.replace(/\.webp$/, '');
    return { mobile: `${base}-480.avif`, desktop: `${base}-1024.avif` };
  };
  const avifPaths = c.backgroundImage ? deriveAvifPaths(c.backgroundImage) : null;
  let heroImageHtml = '';
  if (c.backgroundImage) {
    // Match React's image container: rounded corners, shadow, responsive sizing
    const imgStyle = 'width:100%;height:auto;border-radius:0.5rem;box-shadow:0 20px 25px -5px rgba(0,0,0,0.1)';
    if (avifPaths) {
      heroImageHtml = `
        <div style="flex:1;min-width:0;text-align:center">
          <picture>
            <source srcset="${avifPaths.mobile} 480w, ${avifPaths.desktop} 1024w" sizes="(max-width:767px) 100vw, (min-width:768px) 50vw, 40vw" type="image/avif" />
            <img src="${c.backgroundImage}" alt="${escapeHtml(c.h1)}" style="${imgStyle}" width="760" height="996" fetchpriority="high" decoding="async" />
          </picture>
        </div>`;
    } else {
      heroImageHtml = `
        <div style="flex:1;min-width:0;text-align:center">
          <img src="${c.backgroundImage}" alt="${escapeHtml(c.h1)}" style="${imgStyle}" fetchpriority="high" decoding="async" />
        </div>`;
    }
  }

  // ── Benefits list as inline badges (matches React's Check icon + text layout) ──
  const benefitsBadges = (c.benefits || []).map(b =>
    `<span style="display:inline-flex;align-items:center;gap:6px;background:rgba(56,31,71,0.08);padding:6px 14px;border-radius:9999px;font-size:0.875rem;color:#381F47;white-space:nowrap">✓ ${escapeHtml(b)}</span>`
  ).join('\n            ');

  // ── Below-fold content (simple semantic HTML — outside viewport, no CLS impact) ──
  const problemsHtml = (c.problems || []).map(p => '<li>' + escapeHtml(p) + '</li>').join('');
  const stepsHtml = (c.steps || []).map(s =>
    '<li><strong>' + escapeHtml(s.title) + '.</strong> ' + escapeHtml(s.description) + '</li>'
  ).join('');
  const testimonialsHtml = (c.testimonials || []).map(t =>
    '<blockquote><p>' + escapeHtml(t.text) + '</p><cite>&mdash; ' + escapeHtml(t.name) + '</cite></blockquote>'
  ).join('');
  const faqsHtml = (c.faqs || []).map(f =>
    '<dt>' + escapeHtml(f.q) + '</dt><dd>' + escapeHtml(f.a) + '</dd>'
  ).join('');

  // ══════════════════════════════════════════════════════════════
  // ABOVE-THE-FOLD: Must be pixel-perfect match with React layout
  // ══════════════════════════════════════════════════════════════
  return `<header style="position:fixed;top:0;left:0;right:0;z-index:50;background:#fff;box-shadow:0 1px 3px 0 rgba(0,0,0,0.1)">
      <div style="max-width:1200px;margin:0 auto;padding:12px 16px;display:flex;justify-content:space-between;align-items:center">
        <div>
          <span style="font-size:1.125rem;font-weight:700;color:#381F47;font-family:system-ui,sans-serif">Dra. Carla Christoph</span><br/>
          <span style="font-size:0.75rem;color:#6b7280">CRO-RJ 27509</span>
        </div>
        <div style="display:none"></div>
        <a href="${waHref}" style="background:#25D366;color:#fff;padding:8px 16px;border-radius:8px;text-decoration:none;font-weight:500;font-size:0.875rem;display:inline-flex;align-items:center;gap:8px" aria-label="${L.whatsApp}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
          <span>${L.whatsApp}</span>
        </a>
      </div>
    </header>
    <section style="min-height:100vh;display:flex;align-items:center;background:#FAF7F2;padding-top:90px;padding-bottom:4rem">
      <div style="max-width:1200px;margin:0 auto;padding:0 1rem;display:flex;flex-direction:column;gap:3rem;width:100%">
        <div style="flex:1;min-width:0">
          <h1 style="font-size:clamp(1.875rem,5vw,3rem);font-weight:700;line-height:1.2;margin:0 0 1rem;color:#381F47;font-family:Georgia,serif">${escapeHtml(c.h1)}</h1>
          <p style="font-size:clamp(1.125rem,2.5vw,1.25rem);margin:0 0 1.5rem;color:#333;line-height:1.6">${escapeHtml(c.subhead)}</p>
          ${benefitsBadges ? `<div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:1.5rem">${benefitsBadges}</div>` : ''}
          <a href="${waHref}" style="background:#381F47;color:#fff;padding:1rem 2rem;border-radius:0.5rem;font-weight:600;display:inline-flex;align-items:center;gap:0.75rem;font-size:1.125rem;text-decoration:none;box-shadow:0 4px 6px -1px rgba(0,0,0,0.1);border:none">${escapeHtml(ctaButtonText)}</a>
        </div>
        ${heroImageHtml}
      </div>
    </section>
    <main style="max-width:800px;margin:0 auto;padding:24px 16px;font-family:system-ui,sans-serif;line-height:1.6;color:#333">
      ${problemsHtml ? `<section><h2>${escapeHtml(c.problemTitle || (isEn ? 'Common situations' : 'Situa&ccedil;&otilde;es comuns'))}</h2><ul>${problemsHtml}</ul></section>` : ''}
      ${stepsHtml ? `<section><h2>${escapeHtml(c.guideTitle || L.howItWorks)}</h2><ol>${stepsHtml}</ol></section>` : ''}
      ${testimonialsHtml ? `<section><h2>${escapeHtml(c.testimonialsTitle || L.testimonials)}</h2>${testimonialsHtml}</section>` : ''}
      ${faqsHtml ? `<section><h2>${escapeHtml(c.faqTitle || L.faq)}</h2><dl>${faqsHtml}</dl></section>` : ''}
      <section>
        <h2>${escapeHtml(c.ctaTitle || (isEn ? 'Ready to book?' : 'Pronto para agendar?'))}</h2>
        ${c.ctaSubtitle ? '<p>' + escapeHtml(c.ctaSubtitle) + '</p>' : ''}
        <p><a href="${waHref}" style="display:inline-block;padding:12px 24px;background:#25D366;color:#fff;text-decoration:none;border-radius:6px;font-weight:600">${escapeHtml(ctaButtonText)}</a></p>
      </section>
    </main>
    <footer style="padding:24px 16px;border-top:1px solid #eee;text-align:center;color:#666;font-size:0.9em">
      <p><strong>Dra. Carla Christoph</strong> &mdash; CRO-RJ 27.509</p>
      <p>${L.addr}</p>
      <p>Tel: (21) 99330-4045 | <a href="${waHref}">${L.whatsApp}</a></p>
      <p>${L.hours}</p>
    </footer>`;
}

// ============================================================
// SERVICE PAGES — Full content + schemas + fallback
// ============================================================

const servicePages = {
  '/implantes-dentarios': {
    title: 'Implantes Dentários em Ipanema | Dra. Carla Christoph',
    description: 'Implantes dentários em Ipanema com planejamento digital 3D e técnicas minimamente invasivas. Mais de 20 anos de experiência. CRO-RJ 27.509.',
    h1: 'Implantes Dentários e Reabilitação Oral',
    quickAnswer: 'Implantes dentários são raízes artificiais de titânio biocompatível instaladas no osso para substituir dentes perdidos. Na clínica da Dra. Carla Christoph em Ipanema, realizamos planejamento digital 3D com scanner intraoral, técnicas minimamente invasivas e próteses personalizadas. Com mais de 20 anos de experiência (CRO-RJ 27.509), oferecemos desde implantes unitários até reabilitações completas como All-on-4 e protocolo fixo, com tratamentos que duram de 3 a 6 meses conforme o caso.',
    procedure: { name: 'Implante Dentário', description: 'Instalação de implantes de titânio biocompatível no osso maxilar para substituição de dentes perdidos, com planejamento digital 3D e técnicas minimamente invasivas' },
    faqs: [
      { q: 'O que são implantes dentários?', a: 'São pinos de titânio biocompatível instalados cirurgicamente no osso da mandíbula ou maxila, substituindo a raiz do dente perdido. Sobre estes pinos, fixamos coroas, pontes ou próteses completas, restaurando função mastigatória, estética e fonética.' },
      { q: 'O procedimento é doloroso?', a: 'A cirurgia é realizada sob anestesia local, sem dor durante o procedimento. O pós-operatório é geralmente tranquilo, com desconforto leve controlado por medicação. A maioria dos pacientes retorna às atividades normais em 2 a 3 dias.' },
      { q: 'Quanto tempo dura o tratamento completo?', a: 'O tempo varia conforme o caso. Em média, de 4 a 6 meses desde a instalação do implante até a prótese definitiva, incluindo o período de osseointegração (3 a 6 meses). Em casos com carga imediata selecionados, a prótese provisória é instalada conforme planejamento.' },
      { q: 'Qualquer pessoa pode colocar implantes?', a: 'A maioria dos adultos saudáveis é candidata. Avaliamos saúde geral, quantidade e qualidade óssea, hábitos (tabagismo) e condições sistêmicas (diabetes controlado). Em casos de osso insuficiente, enxertos ósseos podem viabilizar o tratamento.' },
      { q: 'Quanto tempo duram os implantes?', a: 'Com higiene adequada e manutenções regulares, implantes podem durar décadas ou a vida toda. Estudos mostram taxa de sucesso acima de 95% em 10 anos. A coroa protética pode precisar ser substituída após 10 a 15 anos dependendo do desgaste.' },
      { q: 'Como é a manutenção dos implantes?', a: 'Higienização rigorosa com escova, fio dental e escovas interdentais específicas. Retornos semestrais para controle profissional, radiografias periódicas e avaliação da saúde peri-implantar. Evitar sobrecarga excessiva e trauma.' },
      { q: 'Existe rejeição de implantes?', a: 'O titânio é biocompatível e não causa rejeição imunológica. Falhas ocorrem por infecção, sobrecarga precoce, tabagismo ou higiene inadequada, não por rejeição. Taxa de sucesso é superior a 95% quando protocolos são seguidos.' },
      { q: 'Posso fazer se tiver pouco osso?', a: 'Sim. Técnicas de enxerto ósseo (autógeno, biomaterial) ou levantamento de seio maxilar podem aumentar volume ósseo. Implantes curtos ou angulados também são alternativas. Os exames de imagem permitem planejar a melhor solução para cada caso.' },
      { q: 'Qual a diferença entre implante e prótese?', a: 'O implante é o pino de titânio fixado no osso (substitui a raiz). A prótese é a parte visível (coroa, ponte ou dentadura) que se conecta ao implante. O conjunto completo restaura função e estética.' },
      { q: 'Fumantes podem fazer implantes?', a: 'Sim, mas o tabagismo reduz a taxa de sucesso (de 95% para aproximadamente 85%) por prejudicar cicatrização e osseointegração. Recomendamos parar de fumar pelo menos 2 semanas antes da cirurgia e durante a cicatrização. Avaliação individual é essencial.' },
      { q: 'Diabéticos podem colocar implantes?', a: 'Sim, desde que o diabetes esteja controlado (hemoglobina glicada abaixo de 7%). Avaliação médica prévia é importante. O controle glicêmico adequado garante cicatrização normal e taxa de sucesso equivalente a não-diabéticos.' },
      { q: 'Vocês atendem convênios odontológicos?', a: 'Nosso atendimento é particular, o que nos permite dedicar o tempo necessário a cada paciente e utilizar somente materiais de primeira linha. Na primeira consulta, apresentamos um orçamento detalhado e transparente.' }
    ]
  },

  '/clareamento-dental': {
    title: 'Clareamento Dental em Ipanema | Dra. Carla Christoph',
    description: 'Clareamento dental profissional em Ipanema com a Dra. Carla Christoph. Técnicas seguras para um sorriso mais branco. CRO-RJ 27.509. Agende sua avaliação!',
    h1: 'Clareamento Dental Profissional',
    quickAnswer: 'Clareamento dental é um procedimento estético que clareia os dentes usando gel à base de peróxido. No consultório da Dra. Carla Christoph em Ipanema, oferecemos técnicas de consultório (1-3 sessões de 60-90 minutos) e caseiro supervisionado. Com mais de 20 anos de experiência (CRO-RJ 27.509), trabalhamos com protocolos personalizados que clareiam de 4 a 9 tons com segurança, preservando a saúde dos dentes e gengivas. O tratamento dura de 7 a 21 dias conforme a modalidade escolhida.',
    procedure: { name: 'Clareamento Dental Profissional', description: 'Procedimento estético para clareamento dos dentes com gel de peróxido em consultório ou com moldeiras caseiras supervisionadas' },
    faqs: [
      { q: 'Qual a diferença entre as modalidades?', a: 'O clareamento de consultório utiliza gel de maior concentração (35-37%), com resultados em 1-3 sessões. O caseiro usa concentração menor (10-20%), aplicada gradualmente em 14-21 dias com moldeiras personalizadas. O combinado inicia em consultório e mantém resultado com aplicações caseiras. A indicação depende da análise individual.' },
      { q: 'O clareamento causa sensibilidade?', a: 'Sensibilidade temporária pode ocorrer, mas protocolos modernos minimizam esse desconforto. Utilizamos dessensibilizantes, ajustamos concentrações conforme necessário e aplicamos laser terapêutico quando indicado. A maioria dos pacientes relata pouco ou nenhum desconforto.' },
      { q: 'Quanto tempo dura o resultado?', a: 'Com cuidados adequados, os resultados mantêm-se por 2-3 anos. A durabilidade varia conforme hábitos alimentares e higiene. Protocolo de manutenção com sessões anuais prolonga significativamente os resultados.' },
      { q: 'Posso fazer clareamento com restaurações?', a: 'Sim, mas apenas dentes naturais respondem ao clareamento. Restaurações e próteses mantêm sua cor original. Analisamos seu caso para determinar a melhor estratégia, considerando se há necessidade de substituição posterior das restaurações visíveis.' },
      { q: 'O clareamento é seguro para o esmalte?', a: 'Quando realizado com protocolos adequados, não causa danos ao esmalte. Os géis modernos têm pH balanceado e não provocam desmineralização. Utilizamos produtos com agentes remineralizantes que preservam a integridade dental.' },
      { q: 'Quais cuidados após o clareamento?', a: 'Nas primeiras 48 horas, evitar alimentos e bebidas pigmentados. Manter higiene oral adequada com escovação após refeições. Uso de canudos para bebidas escuras. Consultas semestrais para manutenção profissional.' },
      { q: 'Clareamento funciona em todos os tipos de manchas?', a: 'A eficácia varia conforme o tipo de mancha. Manchas por alimentos e idade respondem muito bem. Manchas por medicamentos têm resposta variável. Na avaliação, analisamos seu caso específico e estabelecemos expectativas realistas.' },
      { q: 'Clareamento e limpeza são diferentes?', a: 'Sim. A limpeza remove tártaro e manchas superficiais, devolvendo a cor natural. O clareamento altera quimicamente a cor interna do dente, clareando além da cor natural. Frequentemente realizamos limpeza antes do clareamento para otimizar resultados.' },
      { q: 'Produtos de farmácia têm o mesmo efeito?', a: 'Produtos sem prescrição contêm concentrações muito baixas devido a regulamentação, oferecendo resultados limitados. O clareamento profissional usa concentrações terapêuticas sob supervisão, garantindo eficácia superior e segurança.' },
      { q: 'Como é feita a escolha da modalidade?', a: 'Na consulta de avaliação, analiso suas características individuais, tipo de mancha, sensibilidade prévia, rotina e expectativas. A indicação considera todos esses fatores para definir o protocolo mais adequado ao seu caso.' }
    ]
  },

  '/lentes-de-contato-dental-e-facetas-de-resina': {
    title: 'Lentes de Contato Dental e Facetas de Resina em Ipanema | Dra. Carla Christoph',
    description: 'Lentes de contato dental e facetas de resina em Ipanema com Dra. Carla Christoph. Test Drive do Sorriso exclusivo. 20+ anos de experiência. CRO-RJ 27.509.',
    h1: 'Lentes de Contato Dental e Facetas — Test Drive do Sorriso',
    quickAnswer: 'Lentes de contato dental são lâminas ultrafinas de porcelana (0,2-0,5mm) aplicadas sobre os dentes com preparo mínimo, ideais para mudanças estéticas duradouras. Facetas de resina são restaurações mais espessas (0,7-1,5mm) feitas diretamente no consultório. No consultório da Dra. Carla Christoph em Ipanema, oferecemos Test Drive do Sorriso (mock-up) para você visualizar o resultado antes. Lentes duram 15-20 anos e não mancham; facetas duram 5-8 anos. O tratamento leva de 2-3 consultas (15-20 dias) para lentes e 1-2 consultas para facetas.',
    procedure: { name: 'Lentes de Contato Dental e Facetas', description: 'Aplicação de lâminas ultrafinas de porcelana ou facetas de resina para correção estética dental com preparo mínimo e Test Drive do Sorriso' },
    faqs: [
      { q: 'Qual a diferença entre lente de contato dental e faceta de resina?', a: 'Lentes de contato dental são lâminas ultrafinas de porcelana (0,2-0,5mm) que exigem preparo mínimo do dente, ideais para mudanças estéticas duradouras com máxima naturalidade. Facetas de resina são restaurações mais espessas (0,7-1,5mm) feitas diretamente no consultório, com custo mais acessível. Lentes duram 15-20 anos e não mancham, enquanto facetas de resina duram 5-8 anos e podem necessitar polimento periódico.' },
      { q: 'É necessário desgastar muito os meus dentes?', a: 'Não. A filosofia do consultório é a máxima preservação da estrutura dentária. Para lentes, o preparo é mínimo (0,1-0,3mm quando necessário), limitado ao esmalte superficial. Para facetas de resina, o preparo também é conservador.' },
      { q: 'Quanto tempo dura o tratamento completo?', a: 'Lentes de contato dental: 2-3 consultas em 15-20 dias. Primeira consulta para planejamento e moldagem digital, segunda para aprovação do Test Drive do Sorriso, terceira para cimentação. Facetas de resina: 1-2 consultas, pois são confeccionadas diretamente no consultório.' },
      { q: 'O tratamento para melhorar a estética do sorriso dói?', a: 'Não. Todos os procedimentos estéticos são realizados com o máximo de conforto, utilizando anestesia local sempre que necessário. A cimentação das lentes é um processo delicado que não causa dor.' },
      { q: 'O que é o Test Drive do Sorriso (mock-up)?', a: 'É uma técnica onde criamos seu novo sorriso com resina provisória não adesiva diretamente na sua boca, sem desgastar os dentes. Você pode se olhar no espelho, tirar fotos, vídeos, falar, sorrir. Ajustamos juntos até ficar do seu jeito. Só depois de você aprovar 100% é que partimos para o tratamento definitivo.' },
      { q: 'As lentes podem parecer artificiais?', a: 'Quando bem executadas por uma especialista, absolutamente não. Usamos cerâmicas de última geração que mimetizam perfeitamente a beleza do dente natural. O segredo está na análise facial completa, estratificação de cor personalizada e proporções individualizadas.' },
      { q: 'Posso fazer lentes mesmo tendo os dentes tortos?', a: 'Sim, desde que o desalinhamento seja leve. Lentes podem corrigir pequenos desalinhamentos, giros e espaços. Porém, em casos de apinhamento severo ou problemas de mordida significativos, pode ser necessário ortodontia prévia.' },
      { q: 'Preciso fazer em todos os dentes?', a: 'Não necessariamente. Muitos casos envolvem apenas os dentes anteriores superiores (4 a 10 dentes). Na avaliação, analiso seu sorriso para determinar quantos dentes precisam ser incluídos para um resultado harmonioso.' },
      { q: 'Qual o investimento para lentes de contato dental e facetas em Ipanema?', a: 'O investimento varia conforme o número de dentes tratados, complexidade do caso e tipo de material escolhido. Lentes de contato dental requerem maior investimento devido ao material cerâmico importado e durabilidade superior (15-20 anos). Facetas de resina oferecem custo-benefício acessível com resultado imediato. Oferecemos planos de pagamento facilitados.' },
      { q: 'Lentes podem manchar com café, vinho ou cigarro?', a: 'A cerâmica utilizada nas lentes não mancha. Diferente das facetas de resina, o material cerâmico é impermeável e mantém o brilho e cor originais permanentemente. Apenas os dentes naturais adjacentes requerem atenção.' },
      { q: 'Como é a manutenção das lentes e facetas?', a: 'Lentes de cerâmica: higiene oral normal (escova, fio dental, enxaguante), evitar morder objetos duros, uso de placa miorrelaxante se necessário. Retornos semestrais. Facetas de resina: mesmos cuidados, mais polimento profissional a cada 6 meses.' },
      { q: 'Como funciona a consulta de planejamento?', a: 'É uma conversa aprofundada para entendermos seus desejos e expectativas. Realizamos escaneamento digital com iTero 3D e uma análise completa do seu sorriso e face. Juntos, definimos o melhor plano de tratamento, explicando os prós e contras de cada opção.' }
    ]
  },

  '/lentes-de-contato-dental-e-facetas-de-porcelana': {
    title: 'Lentes de Contato Dental e Facetas em Ipanema | Dra. Carla Christoph',
    description: 'Lentes de contato dental e facetas de porcelana em Ipanema com Dra. Carla Christoph. Resultados naturais e duradouros. CRO-RJ 27.509.',
    h1: 'Lentes de Contato Dental e Facetas — Test Drive do Sorriso',
    quickAnswer: 'Lentes de contato dental são lâminas ultrafinas de porcelana (0,2-0,5mm) aplicadas sobre os dentes com preparo mínimo, ideais para mudanças estéticas duradouras. Facetas de resina são restaurações mais espessas (0,7-1,5mm) feitas diretamente no consultório. No consultório da Dra. Carla Christoph em Ipanema, oferecemos Test Drive do Sorriso (mock-up) para você visualizar o resultado antes. Lentes duram 15-20 anos e não mancham; facetas duram 5-8 anos. O tratamento leva de 2-3 consultas (15-20 dias) para lentes e 1-2 consultas para facetas.',
    procedure: { name: 'Lentes de Contato Dental e Facetas de Porcelana', description: 'Aplicação de lâminas ultrafinas de porcelana para correção estética dental com preparo mínimo e resultado natural duradouro' },
    faqs: [
      { q: 'Qual a diferença entre lente de contato dental e faceta de resina?', a: 'Lentes de contato dental são lâminas ultrafinas de porcelana (0,2-0,5mm) que exigem preparo mínimo do dente, ideais para mudanças estéticas duradouras com máxima naturalidade. Facetas de resina são restaurações mais espessas (0,7-1,5mm) feitas diretamente no consultório, com custo mais acessível. Lentes duram 15-20 anos e não mancham, enquanto facetas de resina duram 5-8 anos e podem necessitar polimento periódico.' },
      { q: 'É necessário desgastar muito os meus dentes?', a: 'Não. A filosofia do consultório é a máxima preservação da estrutura dentária. Para lentes, o preparo é mínimo (0,1-0,3mm quando necessário), limitado ao esmalte superficial.' },
      { q: 'O que é o Test Drive do Sorriso (mock-up)?', a: 'É uma técnica onde criamos seu novo sorriso com resina provisória não adesiva diretamente na sua boca, sem desgastar os dentes. Você pode se olhar no espelho, tirar fotos, vídeos, falar, sorrir. Ajustamos juntos até ficar do seu jeito.' },
      { q: 'As lentes podem parecer artificiais?', a: 'Quando bem executadas por uma especialista, absolutamente não. Usamos cerâmicas de última geração que mimetizam perfeitamente a beleza do dente natural.' },
      { q: 'Quanto tempo dura o tratamento completo?', a: 'Lentes de contato dental: 2-3 consultas em 15-20 dias. Facetas de resina: 1-2 consultas, pois são confeccionadas diretamente no consultório.' },
      { q: 'Como é a manutenção das lentes e facetas?', a: 'Lentes de cerâmica: higiene oral normal, evitar morder objetos duros, retornos semestrais. Facetas de resina: mesmos cuidados mais polimento profissional a cada 6 meses.' }
    ]
  },

  '/protese-dentaria': {
    title: 'Prótese Dentária em Ipanema | Dra. Carla Christoph',
    description: 'Prótese dentária fixa e removível em Ipanema. Especialista em reabilitação oral com mais de 20 anos de experiência. Dra. Carla Christoph. CRO-RJ 27.509.',
    h1: 'Prótese Dentária e Reabilitação Oral',
    quickAnswer: 'Prótese dentária é uma estrutura artificial que substitui dentes perdidos, restaurando função mastigatória e estética. Na clínica da Dra. Carla Christoph em Ipanema, oferecemos coroas, pontes e próteses sobre implante em porcelana de alta translucidez. Com mais de 20 anos de experiência (CRO-RJ 27.509) em reabilitação oral, trabalhamos com cerâmicas E-max e zircônia que duram de 15 a 20 anos. O tratamento varia conforme a complexidade, incluindo planejamento, moldagens digitais e próteses provisórias para você nunca ficar sem dentes.',
    procedure: { name: 'Prótese Dentária', description: 'Reabilitação oral com coroas, pontes e próteses sobre implante em porcelana de alta translucidez para substituição de dentes perdidos' },
    faqs: [
      { q: 'Qual tipo de prótese é melhor para meu caso?', a: 'Cada caso é único e requer avaliação individualizada. A escolha depende de fatores como quantidade de dentes perdidos, condição óssea, saúde gengival, expectativas estéticas e estilo de vida. Durante a consulta de planejamento, analisamos todos esses aspectos para indicar a solução ideal para você.' },
      { q: 'Quanto tempo dura uma prótese bem feita?', a: 'Com materiais de qualidade e cuidados adequados, uma coroa ou ponte pode durar de 15 a 20 anos. Próteses sobre implante tendem a durar ainda mais, podendo ultrapassar 20 anos. A longevidade depende da higiene oral, visitas regulares ao dentista e cuidados diários.' },
      { q: 'Prótese sobre implante vale o investimento?', a: 'Para muitos pacientes, sim. A prótese sobre implante oferece vantagens únicas: preservação óssea total, não desgasta dentes vizinhos, maior durabilidade e sensação natural. Considerando a longevidade e qualidade de vida proporcionada, representa custo-benefício a longo prazo.' },
      { q: 'Como é a manutenção das próteses?', a: 'Próteses fixas (coroas, pontes, sobre implante) são higienizadas como dentes naturais, com escovação e fio dental. Próteses removíveis devem ser retiradas para limpeza com produtos específicos. Visitas semestrais ao dentista são essenciais para manutenção profissional.' },
      { q: 'Vou ficar sem dentes durante o tratamento?', a: 'Nunca! Sempre providenciamos uma prótese provisória para que você mantenha estética e função durante todo o tratamento. Nosso compromisso é com seu conforto e vida social.' },
      { q: 'Prótese pode parecer natural?', a: 'Absolutamente! Utilizamos técnicas como estratificação de cerâmica, caracterização individualizada e ajuste de cor personalizado. O resultado são dentes que imitam perfeitamente a natureza, com translucidez, textura e aparência indistinguíveis dos dentes naturais.' },
      { q: 'Qual a diferença entre porcelana e resina?', a: 'A porcelana (cerâmica) oferece superior estética, durabilidade e resistência a manchas. É nossa escolha para casos de longa duração. A resina pode ser usada em provisórios ou situações específicas.' },
      { q: 'É possível fazer prótese com pouco osso?', a: 'Sim! Para próteses convencionais (não sobre implante), a quantidade óssea não é limitante. Para próteses sobre implante, técnicas como enxerto ósseo ou implantes zigomáticos podem viabilizar o tratamento mesmo com pouco osso.' },
      { q: 'Quando trocar uma prótese antiga?', a: 'Sinais de que é hora de trocar: desgaste visível, mudança de cor, infiltrações, desadaptação, desconforto ao mastigar ou problemas gengivais ao redor da prótese. Uma avaliação profissional pode determinar o momento ideal.' },
      { q: 'O procedimento é doloroso?', a: 'Os procedimentos são realizados com anestesia local eficaz e técnicas que priorizam o conforto. A maioria dos pacientes relata menos desconforto do que esperavam.' },
      { q: 'Qual a vantagem de um especialista?', a: 'O especialista tem formação específica de 2-3 anos em prótese, domina técnicas avançadas, trabalha com os melhores laboratórios e tem experiência em casos complexos. Isso se traduz em próteses com melhor adaptação, estética superior e maior durabilidade.' },
      { q: 'Prótese fixa ou removível: como escolher?', a: 'A prótese fixa oferece maior conforto, segurança e sensação natural, mas requer condições específicas. A removível é uma opção quando não há suporte para fixa. Avaliamos todos os fatores para indicar a melhor solução.' }
    ]
  },

  '/restauracoes-esteticas': {
    title: 'Restaurações Estéticas em Ipanema | Dra. Carla Christoph',
    description: 'Restauração dental estética em Ipanema com resina nanoparticulada. Tratamento de cáries, dentes quebrados e trincados. Resultado natural e duradouro. Dra. Carla Christoph CRO-RJ 27.509.',
    h1: 'Restaurações Estéticas em Ipanema',
    quickAnswer: 'Restaurações estéticas são tratamentos que recuperam dentes comprometidos por cáries, fraturas ou trincas usando resinas nanoparticuladas ou cerâmicas de última geração. Na clínica da Dra. Carla Christoph em Ipanema (CRO-RJ 27.509), utilizamos materiais de última geração com estratificação de cor que reproduzem perfeitamente a translucidez natural dos dentes. O tratamento é conservador, preservando ao máximo a estrutura dentária, e o resultado é indistinguível dos dentes naturais. Com 20+ anos de experiência, realizamos desde pequenas restaurações até reconstruções complexas em uma ou poucas sessões.',
    procedure: { name: 'Restauração Dental Estética', description: 'Restauração dental estética com resina nanoparticulada para tratamento de cáries, fraturas e trincas com resultado natural' },
    faqs: [
      { q: 'O que é uma restauração dental estética?', a: 'É um procedimento que reconstrói dentes comprometidos por cáries, fraturas ou trincas utilizando materiais de última geração (resina composta ou porcelana) que mimetizam perfeitamente a cor, brilho e textura dos dentes naturais. Diferente das antigas obturações escuras de amálgama, as restaurações estéticas são praticamente invisíveis.' },
      { q: 'Quando uma restauração é necessária?', a: 'Restaurações são indicadas em diversas situações: presença de cáries, fraturas dentais por trauma ou desgaste, trincas que causam sensibilidade, substituição de restaurações antigas escurecidas, correção de formato ou fechamento de pequenos espaços, e reconstrução após tratamento de canal.' },
      { q: 'Qual material é usado nas restaurações estéticas?', a: 'Utilizamos resinas compostas de última geração com nanotecnologia, que oferecem alta resistência, estética natural e durabilidade. Para casos que exigem máxima longevidade, indicamos porcelanas ou resinas laboratoriais (inlay/onlay).' },
      { q: 'Fazer restauração dói?', a: 'Não. Utilizamos anestesia local com técnica confortável. A maioria dos pacientes relata não sentir desconforto durante o procedimento. Após o término do efeito anestésico, pode haver sensibilidade leve por 24-48h, facilmente controlada com analgésicos comuns.' },
      { q: 'Quanto tempo dura uma restauração estética?', a: 'Restaurações diretas em resina duram de 5 a 8 anos em média. Restaurações indiretas (inlay/onlay de porcelana) duram 12 a 15 anos ou mais. Fatores que prolongam a vida útil: boa higiene oral, check-ups regulares e uso de placa para bruxismo quando indicado.' },
      { q: 'Posso trocar minhas restaurações antigas escuras?', a: 'Sim! A substituição de restaurações antigas de amálgama por restaurações estéticas em resina é um dos procedimentos mais procurados. Além do benefício estético, eliminamos o risco de microinfiltrações comuns em restaurações antigas.' },
      { q: 'Restauração em resina mancha com o tempo?', a: 'As resinas compostas modernas apresentam estabilidade de cor. Com cuidados adequados (boa higiene, polimentos periódicos e moderação no consumo de alimentos muito pigmentados como café, vinho tinto e açaí), as restaurações mantêm sua cor original por muitos anos.' },
      { q: 'Qual a diferença entre restauração e obturação?', a: 'Na prática odontológica moderna, os termos são sinônimos — ambos se referem ao preenchimento de uma cavidade dental. Obturação é um termo mais antigo, frequentemente associado às restaurações em amálgama. Restauração é o termo técnico correto e mais abrangente.' }
    ]
  },

  '/tratamento-de-canal': {
    title: 'Tratamento de Canal em Ipanema | Dra. Carla Christoph',
    description: 'Tratamento de canal (endodontia) em Ipanema sem dor. Técnicas modernas e atendimento humanizado. Dra. Carla Christoph. CRO-RJ 27.509.',
    h1: 'Tratamento de Canal em Ipanema',
    quickAnswer: 'Tratamento de canal (endodontia) remove a polpa infectada do dente, aliviando a dor e salvando o dente da extração. No consultório da Dra. Carla Christoph em Ipanema (CRO-RJ 27.509), o tratamento é realizado com endodontista especializado e finalizado pela Dra. Carla. O procedimento é confortável com anestesia moderna, geralmente completado em 1-2 sessões. Após o canal, recomenda-se restauração adequada ou coroa para proteger o dente, que pode durar muitos anos com os cuidados corretos.',
    procedure: { name: 'Tratamento de Canal (Endodontia)', description: 'Tratamento endodôntico com acompanhamento completo e finalização restauradora' },
    faqs: [
      { q: 'Tratamento de canal dói?', a: 'Com a anestesia atual, o procedimento é confortável e bem tolerado. O que costuma causar dor é a infecção que levou à necessidade do canal. O tratamento justamente alivia essa dor. No pós-operatório, pode haver sensibilidade leve por alguns dias, controlada com medicação simples.' },
      { q: 'Quantas sessões são necessárias?', a: 'Na maioria dos casos, 1 a 2 sessões. Depende da complexidade do caso — dentes com mais canais ou infecções mais extensas podem precisar de sessões adicionais. O endodontista avalia e informa antes de iniciar.' },
      { q: 'O dente fica frágil depois do canal?', a: 'O dente perde a nutrição interna, o que pode torná-lo mais suscetível a fraturas ao longo do tempo. Por isso a restauração adequada é fundamental. Dependendo do caso, a Dra. Carla pode indicar uma coroa para proteger o dente de forma duradoura.' },
      { q: 'O dente escurece depois do canal?', a: 'Pode acontecer com o tempo, mas não é regra. Quando ocorre, existem opções para resolver — desde clareamento interno até faceta ou coroa. A Dra. Carla avalia a melhor solução durante o acompanhamento.' },
      { q: 'Qual a alternativa ao tratamento de canal?', a: 'A alternativa seria a extração do dente. Mas sempre que possível, preservar o dente natural é a melhor escolha — evita a necessidade de implante ou prótese e mantém a estrutura original da boca.' },
      { q: 'Vocês atendem convênios?', a: 'Nosso atendimento é particular, o que nos permite dedicar o tempo necessário a cada caso e trabalhar com profissionais parceiros selecionados. Na consulta, apresentamos o planejamento completo.' }
    ]
  },

  '/saude-da-gengiva': {
    title: 'Tratamento de Gengiva em Ipanema | Dra. Carla Christoph',
    description: 'Tratamento periodontal e saúde da gengiva em Ipanema. Prevenção e tratamento de gengivite e periodontite. Dra. Carla Christoph. CRO-RJ 27.509.',
    h1: 'Saúde da Gengiva em Ipanema',
    quickAnswer: 'Saúde da gengiva (periodontia) trata doenças gengivais como gengivite e periodontite, que causam sangramento, retração e mau hálito. No consultório da Dra. Carla Christoph em Ipanema (CRO-RJ 27.509), realizamos avaliação periodontal, limpeza profissional e tratamento das bolsas gengivais. Gengivite é reversível; periodontite é controlável com tratamento e manutenções periódicas. Para pacientes de baixo risco, recomenda-se limpeza a cada 6 meses; em casos de doença periodontal, a cada 3-4 meses para manter estabilidade.',
    procedure: { name: 'Tratamento Periodontal (Saúde da Gengiva)', description: 'Diagnóstico e tratamento de doenças gengivais com acompanhamento integrado ao plano de tratamento completo' },
    faqs: [
      { q: 'Gengiva que sangra ao escovar é normal?', a: 'Não. Sangramento gengival é sinal de inflamação, mesmo que não doa. Pode ser gengivite (reversível) ou periodontite (mais avançada). Vale procurar avaliação para identificar a causa e tratar antes que progrida.' },
      { q: 'Periodontite tem cura?', a: 'Periodontite é controlável, mas não é curável no sentido de desaparecer sozinha. Com tratamento adequado e manutenção periódica, é possível estabilizar a doença e evitar que progrida. A disciplina nas consultas de manutenção é fundamental.' },
      { q: 'Posso fazer lentes ou implantes se tenho problema gengival?', a: 'Primeiro é necessário tratar a gengiva. Lentes, facetas e implantes exigem uma base gengival saudável para funcionar bem e durar. A Dra. Carla integra o tratamento periodontal ao planejamento do caso — um passo de cada vez.' },
      { q: 'Retração gengival tem tratamento?', a: 'Depende da causa e da extensão. Em alguns casos, procedimentos de enxerto gengival podem cobrir a raiz exposta. Em outros, o objetivo é estabilizar a situação e evitar que progrida. A avaliação clínica define a melhor abordagem.' },
      { q: 'Com que frequência devo fazer limpeza no dentista?', a: 'Para a maioria das pessoas, a cada 6 meses. Pacientes com histórico de doença periodontal podem precisar de intervalos menores — a cada 3 ou 4 meses. A frequência ideal é definida individualmente.' },
      { q: 'Mau hálito pode ser problema gengival?', a: 'Sim. Mau hálito persistente (halitose) é frequentemente associado a doença periodontal — bactérias acumuladas em bolsas gengivais produzem compostos com odor. Se o mau hálito não melhora com higiene oral cuidadosa, vale investigar.' }
    ]
  },

  '/ortodontia': {
    title: 'Ortodontia em Ipanema | Dr. Bruno Neves & Dra. Carla Christoph',
    description: 'Ortodontia especializada em Ipanema com Dr. Bruno Neves e Dra. Carla Christoph. Aparelhos fixos, estéticos e alinhadores invisíveis.',
    h1: 'Ortodontia Moderna em Ipanema',
    quickAnswer: 'Ortodontia é a especialidade que corrige a posição dos dentes e maxilares usando aparelhos fixos ou alinhadores invisíveis como Invisalign. No consultório da Dra. Carla Christoph, o tratamento é realizado pelo Dr. Bruno Moreira das Neves, ortodontista especialista com doutorado pela UERJ. A Dra. Carla acompanha toda a jornada do paciente, garantindo atendimento integrado. Utilizamos scanner iTero Element 5D para planejamento digital preciso e oferecemos Invisalign, aparelho estético e tradicional, com tratamentos durando de 6 a 24 meses conforme o caso.',
    procedure: { name: 'Tratamento Ortodôntico', description: 'Correção do posicionamento dos dentes e maxilares usando aparelhos ortodônticos ou alinhadores invisíveis' },
    provider: [
      { '@type': 'Dentist', 'name': 'Dra. Carla Christoph', 'identifier': 'CRO-RJ 27.509', 'description': 'Responsável pelo consultório e acompanhamento integral' },
      { '@type': 'Dentist', 'name': 'Dr. Bruno Moreira das Neves', 'identifier': 'CRO-RJ 41.684', 'description': 'Ortodontista especialista, Doutor pela UERJ' }
    ],
    faqs: [
      { q: 'Como funciona o tratamento ortodôntico no consultório da Dra. Carla?', a: 'O consultório da Dra. Carla Christoph oferece tratamento ortodôntico especializado através do Dr. Bruno Moreira das Neves, ortodontista com doutorado pela UERJ. A Dra. Carla acompanha toda a jornada do paciente, garantindo atendimento integrado e personalizado.' },
      { q: 'Quanto tempo dura o tratamento com Invisalign?', a: 'O tratamento com Invisalign geralmente dura entre 6 a 18 meses para casos simples a moderados, podendo estender-se até 24 meses em casos complexos. Com o scanner iTero Element 5D, conseguimos simular digitalmente o resultado e estimar com precisão o tempo necessário.' },
      { q: 'Qual a idade ideal para começar o tratamento ortodôntico?', a: 'A primeira avaliação ortodôntica é recomendada aos 7 anos para identificar problemas precocemente. Para aparelho fixo, a idade ideal é entre 11-14 anos. Adultos de qualquer idade podem fazer ortodontia — temos pacientes acima de 60 anos.' },
      { q: 'O tratamento ortodôntico dói?', a: 'É normal sentir pressão leve nos primeiros 2-3 dias após colocar um novo alinhador ou após ajustes do aparelho fixo. Essa sensação indica que os dentes estão se movendo conforme planejado. O desconforto é temporário e facilmente controlado.' },
      { q: 'Posso comer de tudo com aparelho ortodôntico?', a: 'Com Invisalign, você remove os alinhadores para comer, podendo desfrutar de qualquer alimento sem restrições. Com aparelho fixo, deve-se evitar alimentos duros e pegajosos e cortar alimentos em pedaços menores.' },
      { q: 'Como funciona o scanner iTero Element 5D?', a: 'O scanner iTero elimina a necessidade das desconfortáveis moldagens com massa. Em poucos minutos, criamos um modelo 3D ultra-preciso dos seus dentes. Você visualiza imediatamente uma simulação do resultado esperado.' },
      { q: 'Qual a diferença entre aparelho estético e tradicional?', a: 'O aparelho estético usa brackets de safira ou porcelana transparentes, sendo muito mais discreto que o tradicional metálico. Ambos têm a mesma eficácia, mas o estético oferece melhor aparência durante o tratamento.' },
      { q: 'O que é contenção e por que é importante?', a: 'A contenção é fundamental para manter os resultados após o tratamento. Oferecemos contenção fixa (fio colado atrás dos dentes) e/ou removível. O uso correto da contenção garante que seus dentes permaneçam alinhados permanentemente.' },
      { q: 'O Invisalign funciona para casos complexos?', a: 'Sim! O Invisalign evoluiu muito e hoje trata desde casos simples até complexos, incluindo mordidas cruzadas, sobremordidas, apinhamento severo e espaçamentos.' },
      { q: 'Como é o acompanhamento durante o tratamento?', a: 'Realizamos consultas regulares (mensais para aparelho fixo, a cada 6-8 semanas para Invisalign) para monitorar progresso e fazer ajustes necessários. A Dra. Carla e o Dr. Bruno trabalham em conjunto.' },
      { q: 'Qual o investimento para o tratamento ortodôntico?', a: 'O investimento varia conforme o tipo de aparelho e complexidade do caso. Oferecemos planos de pagamento facilitados e condições especiais. Fazemos orçamento personalizado durante a consulta de avaliação.' },
      { q: 'Posso trocar de aparelho fixo para Invisalign durante o tratamento?', a: 'Sim, é possível fazer a transição. O Dr. Bruno avaliará seu caso, fará novo planejamento digital e determinará o melhor momento para a mudança.' }
    ]
  },

  '/clinica-geral-e-prevencao': {
    title: 'Clínica Geral e Prevenção em Ipanema | Dra. Carla Christoph',
    description: 'Clínica geral odontológica e prevenção em Ipanema. Check-up dental, limpeza profissional e cuidados preventivos. Dra. Carla Christoph.',
    h1: 'Clínica Geral e Prevenção Odontológica',
    quickAnswer: 'Clínica geral e prevenção odontológica oferece check-up completo para manter a saúde bucal e evitar problemas futuros. Na clínica da Dra. Carla Christoph em Ipanema (CRO-RJ 27.509), o check-up inclui exame clínico detalhado, limpeza profissional com ultrassom, scanner digital 3D e avaliação de risco personalizada. Com 20+ anos de experiência, criamos protocolos preventivos individualizados. Recomenda-se consultas a cada 6-8 meses para baixo risco e 3-4 meses para alto risco. Prevenir é sempre mais econômico e confortável do que tratar problemas avançados.',
    procedure: { name: 'Consulta de Prevenção e Check-up Dental', description: 'Check-up odontológico completo com limpeza profissional, scanner digital 3D e protocolo preventivo individualizado' },
    faqs: [
      { q: 'O que está incluído no check-up preventivo?', a: 'O check-up completo inclui exame clínico detalhado, limpeza profissional (profilaxia), avaliação de risco de cáries e doenças gengivais, orientação personalizada de higiene e, quando necessário, solicitação de radiografias.' },
      { q: 'Com que frequência devo fazer consultas preventivas?', a: 'A frequência varia conforme seu perfil de risco. Pacientes de baixo risco podem vir a cada 6-8 meses, enquanto quem tem maior predisposição a cáries ou problemas gengivais deve retornar a cada 3-4 meses.' },
      { q: 'A limpeza profissional dói?', a: 'A limpeza com ultrassom é muito confortável. A maioria dos pacientes relata apenas uma leve sensação de vibração. Em casos de muita sensibilidade, podemos usar anestesia tópica para garantir seu conforto total.' },
      { q: 'Por que prevenir é mais econômico que tratar?', a: 'Uma consulta preventiva custa uma fração do valor de tratamentos como canal, implantes ou enxertos gengivais. Além disso, você evita dor, desconforto e tempo longe do trabalho.' },
      { q: 'Scanner digital 3D substitui as moldagens tradicionais?', a: 'Sim! O scanner captura imagens digitais precisas da sua boca em poucos minutos, sem aquele desconforto das moldeiras com massa. É mais rápido, mais preciso e muito mais confortável.' },
      { q: 'Como vocês identificam cáries no estágio inicial?', a: 'Além do exame clínico, usamos câmeras de alta definição com magnificação e, quando necessário, radiografias digitais. Conseguimos identificar lesões de cárie ainda reversíveis, que podem ser tratadas apenas com aplicação de flúor.' },
      { q: 'O que fazer para prevenir mau hálito?', a: 'Primeiro identificamos a causa — que em 90% dos casos está na boca (língua, gengiva ou dentes). Depois criamos um protocolo específico que pode incluir limpeza profissional, tratamento gengival e orientação sobre limpeza da língua.' },
      { q: 'Aplicação de flúor é só para crianças?', a: 'Não! Adultos com alto risco de cáries, sensibilidade dental, boca seca ou exposição de raízes também se beneficiam muito da aplicação profissional de flúor.' },
      { q: 'Qual a diferença entre limpeza em casa e profissional?', a: 'A escovação e fio dental diários removem a placa bacteriana fresca. Mas o tártaro (placa mineralizada) só pode ser removido com instrumentos profissionais. Além disso, conseguimos limpar áreas que você não alcança em casa.' },
      { q: 'Quando devo procurar prevenção e não tratamento?', a: 'Sempre que não houver dor ou problema ativo! Se faz mais de 6 meses desde sua última consulta, se percebe sangramento gengival, mau hálito ou sensibilidade, é hora de uma avaliação preventiva.' }
    ]
  }
};

// ============================================================
// INFO PAGES — Meta + light fallback (no procedure schemas)
// ============================================================

const infoPages = {
  '/sobre': {
    title: 'Sobre Dra. Carla Christoph | Dentista Especialista em Ipanema',
    description: 'Conheça a Dra. Carla Christoph, dentista especialista em Ipanema com mais de 20 anos de experiência em prótese dental, implantes e reabilitação oral estética.',
    h1: 'Dra. Carla Christoph — Dentista Especialista em Ipanema',
    summary: 'Dra. Carla Christoph é dentista especialista em Prótese Dental e Reabilitação Oral em Ipanema, Rio de Janeiro. Com mais de 20 anos de experiência (CRO-RJ 27.509), oferece tratamentos como implantes dentários, lentes de contato dental, próteses, clareamento e restaurações estéticas. Consultório na Rua Visconde de Pirajá, 550 - Sala 1107, Ipanema. Atendimento de segunda a sexta das 9h às 19h e sábado das 9h às 14h.'
  },
  '/servicos': {
    title: 'Tratamentos Odontológicos em Ipanema | Dra. Carla Christoph',
    description: 'Conheça todos os tratamentos odontológicos oferecidos pela Dra. Carla Christoph em Ipanema: implantes, clareamento, lentes de contato dental, próteses e mais.',
    h1: 'Tratamentos Odontológicos em Ipanema',
    summary: 'A Dra. Carla Christoph oferece tratamentos completos em Ipanema: implantes dentários, lentes de contato dental e facetas, prótese dentária, clareamento dental, restaurações estéticas, tratamento de canal, saúde da gengiva, clínica geral e prevenção, e ortodontia com Dr. Bruno Neves. Mais de 20 anos de experiência, CRO-RJ 27.509.'
  },
  '/blog': {
    title: 'Blog Dra. Carla Christoph | Dicas de Saúde Bucal em Ipanema',
    description: 'Blog de odontologia da Dra. Carla Christoph. Dicas de saúde bucal, artigos informativos e novidades sobre tratamentos dentários.',
    h1: 'Blog — Dicas de Saúde Bucal',
    summary: 'Artigos informativos sobre saúde bucal, tratamentos odontológicos e dicas de prevenção pela Dra. Carla Christoph, dentista especialista em Ipanema, Rio de Janeiro.'
  },
  '/contato': {
    title: 'Contato | Dra. Carla Christoph - Dentista em Ipanema',
    description: 'Entre em contato com a Dra. Carla Christoph. Consultório em Ipanema, Rio de Janeiro. Agende sua consulta pelo WhatsApp.',
    h1: 'Contato — Agende sua Consulta',
    summary: 'Consultório da Dra. Carla Christoph: Rua Visconde de Pirajá, 550 - Sala 1107, Ipanema, Rio de Janeiro. Telefone: (21) 99330-4045. Horário: segunda a sexta das 9h às 19h, sábado das 9h às 14h. Agende pelo WhatsApp.'
  },
  '/diferenciais': {
    title: 'Diferenciais | Dra. Carla Christoph - Dentista em Ipanema',
    description: 'Conheça os diferenciais da Dra. Carla Christoph: mais de 20 anos de experiência, atendimento individualizado e scanner digital 3D em Ipanema.',
    h1: 'Diferenciais da Dra. Carla Christoph',
    summary: 'Os diferenciais da Dra. Carla Christoph incluem mais de 20 anos de experiência como especialista em Prótese Dental (CRO-RJ 27.509), scanner digital iTero 3D, planejamento personalizado, consultório em Ipanema com ambiente acolhedor, e acompanhamento completo de cada paciente.'
  }
};

// ============================================================
// ENGLISH MICRO-SITE — Meta + fallback (English content)
// ============================================================

const englishPages = {
  '/en': {
    title: 'Dentist in Ipanema, Rio de Janeiro | Dra. Carla Christoph',
    description: 'Cosmetic and restorative dentistry in Ipanema, Rio de Janeiro. Dental implants, porcelain veneers, teeth whitening. Personalized 1-hour appointments. CRO-RJ 27.509.',
    h1: 'Dentist in Ipanema — Dra. Carla Christoph',
    summary: 'Dra. Carla Christoph is a dental specialist in Ipanema, Rio de Janeiro, offering cosmetic and restorative dentistry including dental implants, porcelain veneers, teeth whitening, and general dental care. Office at Rua Visconde de Pirajá, 550 - Suite 1107, Ipanema. Monday to Friday 9 AM to 7 PM. CRO-RJ 27.509.'
  },
  '/en/about': {
    title: 'About Dra. Carla Christoph | Dentist in Ipanema, Rio de Janeiro',
    description: 'Meet Dra. Carla Christoph: dental prosthetics and implantology specialist in Ipanema with 20+ years of experience. CRO-RJ 27.509.',
    h1: 'About Dra. Carla Christoph',
    summary: 'Dra. Carla Christoph is a dental specialist in Prosthetic Dentistry and Oral Rehabilitation based in Ipanema, Rio de Janeiro. With over 20 years of experience (CRO-RJ 27.509), she provides personalized care with a minimum of 1 hour per appointment.'
  },
  '/en/contact': {
    title: 'Contact | Dra. Carla Christoph - Dentist in Ipanema',
    description: 'Contact Dra. Carla Christoph in Ipanema. Book via WhatsApp or visit our office at Rua Visconde de Pirajá, 550 - Suite 1107.',
    h1: 'Contact Dra. Carla Christoph',
    summary: 'Office: Rua Visconde de Pirajá, 550 - Suite 1107, Ipanema, Rio de Janeiro. Phone: +55 21 99330-4045. Hours: Monday-Friday 9 AM-7 PM (GMT-3). WhatsApp available 24/7.'
  },
  '/en/dental-implants': {
    title: 'Dental Implants in Ipanema | Dra. Carla Christoph, Rio de Janeiro',
    description: 'Dental implant placement with 3D digital planning in Ipanema. Biocompatible titanium implants, minimally invasive techniques. Dra. Carla Christoph, CRO-RJ 27.509.',
    h1: 'Dental Implants in Ipanema',
    summary: 'Dental implant treatment in Ipanema, Rio de Janeiro by Dra. Carla Christoph. Biocompatible titanium implants with 3D digital planning, minimally invasive techniques, and personalized care. Single teeth, multiple teeth, and full-mouth rehabilitation available.'
  },
  '/en/porcelain-veneers': {
    title: 'Porcelain Veneers in Ipanema | Dra. Carla Christoph, Rio de Janeiro',
    description: 'Porcelain veneers and dental laminates in Ipanema. Smile Test Drive preview, minimal preparation, natural results. Dra. Carla Christoph, CRO-RJ 27.509.',
    h1: 'Porcelain Veneers in Ipanema',
    summary: 'Porcelain veneer treatment in Ipanema, Rio de Janeiro by Dra. Carla Christoph. Ultra-thin ceramic laminates for a natural, beautiful smile. Exclusive Smile Test Drive preview system. Minimal tooth preparation with lasting results.'
  },
  '/en/general-dentistry': {
    title: 'General Dentistry in Ipanema | Dra. Carla Christoph, Rio de Janeiro',
    description: 'Comprehensive dental checkups, cleanings, and preventive care in Ipanema. 3D digital scanner, personalized treatment plans. Dra. Carla Christoph.',
    h1: 'General Dentistry & Prevention in Ipanema',
    summary: 'General dentistry and preventive care in Ipanema, Rio de Janeiro. Dental checkups, professional cleanings, teeth whitening, and personalized prevention protocols. 3D digital scanner for accurate diagnosis.'
  },
  '/en/dental-emergency': {
    title: 'Dental Emergency in Ipanema | Dra. Carla Christoph, Rio de Janeiro',
    description: 'Dental emergency in Ipanema? Toothache, broken tooth, lost filling — contact us via WhatsApp for same-day urgent dental care. Dra. Carla Christoph.',
    h1: 'Dental Emergency in Ipanema',
    summary: 'Urgent dental care in Ipanema, Rio de Janeiro. Same-day appointments for toothache, broken teeth, lost crowns, dental abscesses. Contact via WhatsApp for immediate assistance. Monday-Friday 9 AM-7 PM.'
  },
  '/en/dental-prosthetics': {
    title: 'Dental Prosthetics in Ipanema | Dr. Carla Christoph, Rio de Janeiro',
    description: 'Fixed and removable dental prosthetics in Ipanema. Crowns, bridges, All-on-4 implant-supported dentures. 20+ years of expertise. Dr. Carla Christoph, CRO-RJ 27.509.',
    h1: 'Dental Prosthetics & Oral Rehabilitation in Ipanema',
    summary: 'Dental prosthetics and oral rehabilitation in Ipanema, Rio de Janeiro by Dr. Carla Christoph. Crowns, bridges, implant-supported prosthetics, removable dentures, All-on-4 and All-on-6 protocols. E-max and zirconia ceramics with 15-20 year durability. 20+ years of experience, CRO-RJ 27.509.'
  },
  '/en/teeth-whitening': {
    title: 'Teeth Whitening in Ipanema | Dr. Carla Christoph, Rio de Janeiro',
    description: 'Professional teeth whitening in Ipanema. In-office, at-home, and combined protocols. Safe, effective results up to 9 shades whiter. Dr. Carla Christoph, CRO-RJ 27.509.',
    h1: 'Professional Teeth Whitening in Ipanema',
    summary: 'Professional teeth whitening in Ipanema, Rio de Janeiro by Dr. Carla Christoph. In-office whitening (1-3 sessions), at-home with custom trays, and combined protocols. Results up to 9 shades whiter with pH-balanced gels. Safe, effective, and long-lasting. CRO-RJ 27.509.'
  },
  '/en/veneers-and-lenses': {
    title: 'Veneers & Contact Lenses in Ipanema | Dr. Carla Christoph, Rio de Janeiro',
    description: 'Porcelain veneers, contact lenses, and composite bonding in Ipanema. Smile Test Drive preview with iTero scanner. Dr. Carla Christoph, CRO-RJ 27.509.',
    h1: 'Veneers & Contact Lenses — Smile Test Drive',
    summary: 'Porcelain veneers, dental contact lenses, and composite bonding in Ipanema, Rio de Janeiro by Dr. Carla Christoph. Ultra-thin ceramic laminates (0.2-0.5mm) with minimal preparation. Exclusive Smile Test Drive digital preview with iTero 5D scanner. 15-20 year durability. CRO-RJ 27.509.'
  },
  '/en/orthodontics': {
    title: 'Orthodontics in Ipanema | Dr. Bruno Neves & Dr. Carla Christoph, Rio de Janeiro',
    description: 'Invisalign, ceramic braces, and traditional orthodontics in Ipanema. iTero 5D digital scanner for precise treatment planning. Dr. Bruno Neves & Dr. Carla Christoph.',
    h1: 'Modern Orthodontics in Ipanema',
    summary: 'Orthodontic treatment in Ipanema, Rio de Janeiro. Invisalign clear aligners, ceramic braces, and traditional braces with Dr. Bruno Moreira das Neves (orthodontist, PhD UERJ) and Dr. Carla Christoph. iTero Element 5D digital scanner for precise planning. 6-24 month treatment duration.'
  },
  '/en/root-canal': {
    title: 'Root Canal Treatment in Ipanema | Dr. Carla Christoph, Rio de Janeiro',
    description: 'Pain-free root canal treatment in Ipanema with modern techniques. Save your natural tooth with expert endodontic care. Dr. Carla Christoph, CRO-RJ 27.509.',
    h1: 'Root Canal Treatment in Ipanema',
    summary: 'Root canal treatment (endodontics) in Ipanema, Rio de Janeiro by Dr. Carla Christoph. Modern pain-free techniques with specialist endodontist. Save your natural tooth from extraction. Completed in 1-2 sessions. CRO-RJ 27.509.'
  },
  '/en/gum-health': {
    title: 'Gum Health & Periodontics in Ipanema | Dr. Carla Christoph, Rio de Janeiro',
    description: 'Periodontal treatment and gum health in Ipanema. Prevention and treatment of gingivitis and periodontitis. Dr. Carla Christoph, CRO-RJ 27.509.',
    h1: 'Gum Health & Periodontal Treatment in Ipanema',
    summary: 'Periodontal treatment and gum health in Ipanema, Rio de Janeiro by Dr. Carla Christoph. Diagnosis and treatment of gingivitis and periodontitis. Professional cleanings every 3-6 months. Integrated care with implant and prosthetic planning. CRO-RJ 27.509.'
  },
  '/en/aesthetic-restorations': {
    title: 'Aesthetic Dental Restorations in Ipanema | Dr. Carla Christoph, Rio de Janeiro',
    description: 'Aesthetic dental restorations in Ipanema. Tooth-colored fillings, composite bonding, inlays and onlays. Natural results. Dr. Carla Christoph, CRO-RJ 27.509.',
    h1: 'Aesthetic Dental Restorations in Ipanema',
    summary: 'Aesthetic dental restorations in Ipanema, Rio de Janeiro by Dr. Carla Christoph. Tooth-colored composite fillings with nano-particle technology, ceramic inlays/onlays, and amalgam replacement. Natural-looking results indistinguishable from natural teeth. 20+ years of experience, CRO-RJ 27.509.'
  }
};

// ============================================================
// LANDING PAGES — noindex + rich fallback HTML (Google Ads QS post-click)
// Content lives in `landingPageContent` (below).
// ============================================================

const landingPages = {
  '/lp/limpeza-dental-ipanema': {
    title: 'Limpeza Dental em Ipanema | Dra. Carla Christoph',
    description: 'Agende sua limpeza dental em Ipanema com a Dra. Carla Christoph. Atendimento individualizado e scanner digital 3D.',
  },
  '/lp/profilaxia-dental-ipanema': {
    title: 'Profilaxia Dental em Ipanema | Dra. Carla Christoph',
    description: 'Profilaxia dental profissional em Ipanema. Prevenção e cuidado com sua saúde bucal. Dra. Carla Christoph.',
  },
  '/lp/estetica-dental-ipanema': {
    title: 'Estética Dental em Ipanema | Dra. Carla Christoph',
    description: 'Tratamentos de estética dental em Ipanema. Conquiste o sorriso que você merece com a Dra. Carla Christoph.',
  },
  '/lp/saude-gengival-ipanema': {
    title: 'Saúde Gengival em Ipanema | Dra. Carla Christoph',
    description: 'Tratamento gengival especializado em Ipanema. Cuide da saúde da sua gengiva. Dra. Carla Christoph.',
  },
  '/lp/clareamento-dental': {
    title: 'Clareamento Dental em Ipanema | Dra. Carla Christoph',
    description: 'Clareamento dental profissional em Ipanema. Sorriso mais branco com segurança. Dra. Carla Christoph.',
  },
  '/lp/consulta-inicial': {
    title: 'Consulta Inicial | Dra. Carla Christoph - Dentista em Ipanema',
    description: 'Agende sua primeira consulta com a Dra. Carla Christoph em Ipanema. Avaliação completa e plano de tratamento personalizado.',
  },
  '/lp/ortodontia-ipanema': {
    title: 'Ortodontia em Ipanema | Dr. Bruno Neves & Dra. Carla Christoph',
    description: 'Ortodontia especializada em Ipanema. Aparelhos fixos, estéticos e alinhadores. Dr. Bruno Neves e Dra. Carla Christoph.',
  },
  '/lp/dor-de-dente-urgencia-ipanema': {
    title: 'Dor de Dente Urgência em Ipanema | Dra. Carla Christoph',
    description: 'Atendimento de urgência para dor de dente em Ipanema. Alívio rápido com a Dra. Carla Christoph.',
  },
  '/lp/dente-quebrado-urgencia-ipanema': {
    title: 'Dente Quebrado Urgência em Ipanema | Dra. Carla Christoph',
    description: 'Quebrou um dente? Atendimento de urgência em Ipanema com a Dra. Carla Christoph.',
  },
  '/lp/emergencia-odontologica-ipanema': {
    title: 'Emergência Odontológica em Ipanema | Dra. Carla Christoph',
    description: 'Emergência odontológica em Ipanema. Atendimento rápido e humanizado. Dra. Carla Christoph.',
  },
  '/lp/especialista-protese-ipanema': {
    title: 'Especialista em Prótese Dentária em Ipanema | Dra. Carla Christoph',
    description: 'Especialista em prótese dentária em Ipanema. Mais de 20 anos de experiência em reabilitação oral. Dra. Carla Christoph.',
  },
  '/lp/implantes-dentarios-ipanema': {
    title: 'Implantes Dentários em Ipanema | Dra. Carla Christoph',
    description: 'Implantes dentários em Ipanema com scanner digital 3D. Reabilitação oral especializada. Dra. Carla Christoph.',
  },
  '/lp/lentes-porcelana-ipanema': {
    title: 'Lentes de Porcelana em Ipanema | Dra. Carla Christoph',
    description: 'Lentes de porcelana e facetas em Ipanema. Resultado natural e duradouro. Dra. Carla Christoph.',
  },
  '/lp/lentes-profissional-ipanema': {
    title: 'Lentes de Contato Dental Porcelana Ipanema | Estética do Sorriso',
    description: 'Lentes de porcelana em Ipanema com resultado natural e duradouro. Planejamento digital com iTero Element 5D e Test Drive do Sorriso. Dra. Carla Christoph.',
  },
  '/lp/facetas-resina-ipanema': {
    title: 'Facetas de Resina em Ipanema | Dra. Carla Christoph',
    description: 'Facetas de resina direta em Ipanema. Transforme seu sorriso em uma única sessão com a Dra. Carla Christoph.',
  },

  // English landing pages (Google Ads — noindex)
  '/en/lp/cosmetic-dentistry': {
    title: 'Cosmetic Dentistry in Ipanema | Dr. Carla Christoph, Rio de Janeiro',
    description: 'Porcelain veneers, composite bonding & smile makeovers in Ipanema. Personalized 1-hour appointments with Dr. Carla Christoph. CRO-RJ 27.509.',
  },
  '/en/lp/dental-implants': {
    title: 'Dental Implants in Ipanema | Dr. Carla Christoph, Rio de Janeiro',
    description: 'Dental implant placement with 3D digital planning in Ipanema. Biocompatible titanium implants, minimally invasive techniques. Dr. Carla Christoph, CRO-RJ 27.509.',
  },
  '/en/lp/dental-emergency': {
    title: 'Dental Emergency in Ipanema | Dr. Carla Christoph, Rio de Janeiro',
    description: 'Dental emergency in Ipanema? Toothache, broken tooth, lost filling — contact us via WhatsApp for same-day urgent dental care. Dr. Carla Christoph.',
  },
  '/en/lp/general-consultation': {
    title: 'General Dental Consultation in Ipanema | Dr. Carla Christoph, Rio de Janeiro',
    description: 'Book your first dental consultation in Ipanema. Comprehensive evaluation with 3D digital scanner. Personalized treatment plan. Dr. Carla Christoph, CRO-RJ 27.509.',
  },
};

// ============================================================
// LANDING PAGE CONTENT — Mirrors src/config/*Config.ts for fallback HTML
// NOTE: If you edit copy in a LP config .ts file, also update the matching
// entry here so the build-time fallback HTML stays in sync. Crawler/QS bot
// reads this content when JS is disabled.
// ============================================================

const landingPageContent = {
  '/lp/consulta-inicial': {
    h1: 'Cada Caso É Único — Sua Consulta Também Deveria Ser',
    subhead: 'Mínimo de 1 hora dedicada ao seu caso. Histórico completo, exame minucioso, explicação clara e plano de tratamento individualizado — sem pressa e sem surpresas.',
    benefits: ['Mínimo de 1h dedicada ao seu caso', 'Exame + limpeza inclusos na consulta', 'Plano de tratamento sem surpresas', 'WhatsApp 24h para dúvidas'],
    problemTitle: 'Você se Identifica com Alguma Dessas Situações?',
    problems: [
      'Faz tempo que não vai ao dentista e sente que pode ter problemas se acumulando.',
      'Já saiu de consultas sem entender o diagnóstico porque tudo foi rápido demais.',
      'Quer um profissional que ouça primeiro e explique tudo antes de propor qualquer tratamento.',
      'Prefere prevenir do que remediar e busca acompanhamento regular com quem conhece seu histórico.'
    ],
    guideTitle: 'Como Funciona a Consulta com a Dra. Carla Christoph',
    steps: [
      { title: 'Conversa Inicial', description: 'Ouvimos seu histórico, suas queixas e o que você espera. Sem formulário apressado — uma conversa de verdade.' },
      { title: 'Exame Clínico Completo', description: 'Avaliação detalhada dos dentes, gengiva, mordida e articulação. Radiografias quando necessário. Inclui profilaxia (limpeza profissional).' },
      { title: 'Explicação do Diagnóstico', description: 'Mostramos o que foi encontrado, explicamos cada ponto e respondemos todas as suas dúvidas — com calma.' },
      { title: 'Plano de Tratamento Individualizado', description: 'Se houver necessidade de tratamento, apresentamos as opções com valores transparentes. Você decide no seu tempo.' }
    ],
    testimonialsTitle: 'O Que Nossos Pacientes Contam Sobre a Consulta',
    testimonials: [
      { name: 'Ricardo M. — Ipanema', text: 'A consulta durou mais de uma hora. Ela explicou cada detalhe do exame, mostrou as radiografias e só depois falou sobre tratamento. Nunca tinha sido atendido assim.' },
      { name: 'Claudia F. — Leblon', text: 'Tinha mudado de dentista várias vezes. Aqui, pela primeira vez, senti que alguém realmente ouviu o que eu tinha para dizer antes de começar a examinar.' },
      { name: 'André S. — Copacabana', text: 'O que me impressionou foi a transparência. Ela explicou o que precisava ser feito, o que podia esperar e o que era prioridade. Sem pressão nenhuma.' }
    ],
    faqTitle: 'Dúvidas Sobre a Consulta Inicial',
    faqs: [
      { q: 'Por que a consulta dura no mínimo 1 hora?', a: 'Porque um diagnóstico bem feito exige tempo. Precisamos ouvir seu histórico, examinar com atenção, explicar os achados e discutir opções — tudo isso sem pressa. É assim que evitamos diagnósticos superficiais.' },
      { q: 'O que está incluído na consulta?', a: 'Anamnese completa, exame clínico detalhado, avaliação periodontal, análise da mordida, radiografias quando necessário e profilaxia (limpeza profissional). Tudo explicado passo a passo.' },
      { q: 'Posso ir apenas para uma segunda opinião?', a: 'Sim. Muitos pacientes nos procuram para uma avaliação independente. A consulta segue o mesmo formato completo — com exame clínico, diagnóstico detalhado e nossa visão sobre o caso.' },
      { q: 'Por que o atendimento é particular?', a: 'O formato particular nos permite dedicar o tempo que cada caso exige, usar materiais selecionados e manter um número reduzido de pacientes por dia. É o que garante a qualidade do atendimento.' },
      { q: 'Como funciona o agendamento?', a: 'Pelo WhatsApp, que funciona 24 horas. Você envia mensagem, escolhemos juntos o melhor horário e confirmamos. Respondemos inclusive nos fins de semana.' },
      { q: 'Vocês atendem emergências?', a: 'Nosso atendimento é em horário de consultório, mas nos empenhamos em acomodar urgências. Entre em contato pelo WhatsApp e buscamos uma solução.' }
    ],
    ctaTitle: 'Pronto para uma Consulta Diferente?',
    ctaSubtitle: 'Agende sua consulta e descubra como é ser atendido com tempo, atenção e transparência.',
    ctaText: 'Agendar Minha Consulta',
    whatsappNumber: '5521993304045',
    whatsappMessage: 'Olá! Vi sobre a consulta odontológica personalizada e gostaria de agendar minha consulta com a Dra. Carla Christoph.'
  },

  '/lp/limpeza-dental-ipanema': {
    h1: 'Tártaro e Sensibilidade? Limpeza com Ultrassom em Ipanema',
    subhead: 'Profilaxia com ultrassom em consulta sem pressa. Remoção de tártaro, placa bacteriana e manchas. Dra. Carla Christoph, 20+ anos de experiência.',
    benefits: ['Limpeza com ultrassom — confortável', 'Consulta sem pressa', 'WhatsApp 24h', '20+ anos de experiência'],
    problemTitle: 'Há Quanto Tempo Você Não Faz uma Limpeza Profissional?',
    problems: [
      'Tártaro acumulado que a escovação não remove.',
      'Gengiva que sangra ao escovar ou ao passar o fio dental.',
      'Manchas de café, chá ou cigarro nos dentes.',
      'Mau hálito persistente mesmo com boa higiene.',
      'Sensação de dentes ásperos ou sujos mesmo após escovar.',
      'Faz mais de 6 meses que não faz uma limpeza profissional.'
    ],
    guideTitle: 'Como é a Limpeza no Consultório',
    steps: [
      { title: 'Análise', description: 'Exame da condição dos dentes e gengiva. Identificação de áreas de acúmulo e verificação geral.' },
      { title: 'Remoção de Tártaro com Ultrassom', description: 'O ultrassom remove tártaro e placa endurecida com vibração — mais confortável que a raspagem manual tradicional.' },
      { title: 'Polimento', description: 'Polimento dos dentes para remover manchas superficiais e deixar a superfície lisa, dificultando novo acúmulo.' },
      { title: 'Orientação Personalizada', description: 'Dicas de escovação e uso do fio dental para o seu caso específico. Definição do intervalo ideal para a próxima limpeza.' }
    ],
    testimonialsTitle: 'O Que Nossos Pacientes Contam',
    testimonials: [
      { name: 'Patricia M. — Ipanema', text: 'A limpeza foi mais tranquila do que eu esperava. O ultrassom é confortável e saí com sensação de dentes novos.' },
      { name: 'Gustavo R. — Leblon', text: 'Fazia 2 anos sem ir ao dentista. Além da limpeza, a Dra. Carla identificou uma cárie inicial que nem doía ainda. Valeu pela prevenção.' },
      { name: 'Carla F. — Copacabana', text: 'Faço limpeza a cada 6 meses no consultório. O que me fez ficar é o tempo que dedicam — nunca sinto que foi corrido.' }
    ],
    faqTitle: 'Dúvidas sobre Limpeza Dental',
    faqs: [
      { q: 'Limpeza dental dói?', a: 'Com ultrassom, o desconforto é mínimo. Pode haver sensibilidade em áreas com muito tártaro acumulado, mas é passageiro.' },
      { q: 'De quanto em quanto tempo devo fazer limpeza?', a: 'Para a maioria das pessoas, a cada 6 meses. Quem tem histórico de gengivite ou acúmulo rápido de tártaro pode precisar a cada 3-4 meses.' },
      { q: 'Limpeza clareia os dentes?', a: 'Remove manchas superficiais (café, chá), o que pode dar a impressão de dentes mais claros. Mas limpeza não substitui clareamento — são procedimentos diferentes.' },
      { q: 'Quanto tempo leva?', a: 'Em torno de 40-60 minutos, dependendo da quantidade de tártaro e da condição da gengiva.' },
      { q: 'Vocês atendem convênios?', a: 'Nosso atendimento é particular, o que nos permite dedicar tempo adequado a cada consulta.' }
    ],
    ctaTitle: 'Sua Boca Merece esse Cuidado',
    ctaSubtitle: 'Agende sua limpeza profissional pelo WhatsApp.',
    ctaText: 'Agendar Minha Limpeza',
    whatsappNumber: '5521993304045',
    whatsappMessage: 'Olá! Vi o site e gostaria de agendar uma limpeza dental profissional.'
  },

  '/lp/profilaxia-dental-ipanema': {
    h1: 'Profilaxia Dental em Ipanema — Prevenção que Funciona',
    subhead: 'Limpeza profissional completa com análise detalhada. Prevenir é mais simples, mais rápido e custa menos do que tratar.',
    benefits: ['Limpeza completa com ultrassom', 'Análise preventiva incluída', 'WhatsApp 24h', '20+ anos de experiência'],
    problemTitle: 'Prevenção é o Investimento Mais Inteligente em Saúde Bucal',
    problems: [
      'Faz tempo que não vai ao dentista para uma revisão.',
      'Gengiva que sangra — sinal de inflamação que precisa de atenção.',
      'Sensibilidade em algum dente que não sabe a causa.',
      'Acúmulo de tártaro visível, especialmente nos dentes de baixo.',
      'Quer manter a saúde bucal em dia mas não sabe a frequência ideal.',
      'Prefere prevenir do que tratar problemas mais complexos depois.'
    ],
    guideTitle: 'O Que Inclui a Profilaxia',
    steps: [
      { title: 'Exame Clínico', description: 'Análise de dentes, gengiva e mucosa. Identificação de problemas em estágio inicial — cáries, gengivite, desgaste.' },
      { title: 'Remoção de Tártaro e Placa', description: 'Limpeza com ultrassom e instrumentos adequados. Remoção do que a escovação diária não alcança.' },
      { title: 'Polimento e Aplicação de Flúor', description: 'Polimento para remover manchas. Aplicação de flúor quando indicado para fortalecer o esmalte.' },
      { title: 'Plano Preventivo', description: 'Orientações personalizadas de higiene e definição do intervalo ideal para o próximo retorno.' }
    ],
    testimonialsTitle: 'O Que Nossos Pacientes Contam',
    testimonials: [
      { name: 'Fernanda L. — Ipanema', text: 'Faço profilaxia a cada 6 meses. A Dra. Carla sempre identifica coisas que eu nem sentia. Prefiro prevenir do que remediar.' },
      { name: 'Lucas T. — Leblon', text: 'Fui para a profilaxia de rotina e a Dra. Carla identificou uma cárie inicial que nem doía. Resolveu na hora com uma restauração pequena. Se esperasse, seria um canal.' },
      { name: 'Ana Maria B. — Copacabana', text: 'O que valorizo é que ela não faz só a limpeza — ela examina tudo com calma. Saio sabendo exatamente como está minha boca.' }
    ],
    faqTitle: 'Dúvidas sobre Profilaxia',
    faqs: [
      { q: 'Profilaxia e limpeza são a mesma coisa?', a: 'Na prática, sim. Profilaxia é o termo técnico para a limpeza profissional preventiva. Inclui remoção de tártaro, polimento e, quando indicado, aplicação de flúor.' },
      { q: 'Com que frequência devo fazer?', a: 'Para a maioria das pessoas, a cada 6 meses. Quem tem propensão a gengivite ou acúmulo rápido de tártaro pode precisar a cada 3-4 meses.' },
      { q: 'Mesmo sem dor preciso ir ao dentista?', a: 'Sim. A maioria dos problemas dentários não dói no início — cáries iniciais, gengivite, desgaste. Quando começa a doer, o tratamento tende a ser mais complexo.' },
      { q: 'Vocês atendem convênios?', a: 'Nosso atendimento é particular, o que nos permite dedicar tempo à análise completa, não apenas à limpeza.' }
    ],
    ctaTitle: 'Prevenção é o Melhor Tratamento',
    ctaSubtitle: 'Agende sua profilaxia e mantenha sua saúde bucal em dia.',
    ctaText: 'Agendar Minha Profilaxia',
    whatsappNumber: '5521993304045',
    whatsappMessage: 'Olá! Vi o site e gostaria de agendar uma profilaxia dental.'
  },

  '/lp/estetica-dental-ipanema': {
    h1: 'Não Sabe se Precisa de Lentes, Clareamento ou Facetas? Descubra na Consulta',
    subhead: 'Clareamento, lentes, restaurações, facetas. A Dra. Carla Christoph avalia o caso completo e indica o caminho mais adequado para o resultado que você busca.',
    benefits: ['Visão integrada de estética dental', 'Test Drive do Sorriso disponível', 'WhatsApp 24h', '20+ anos em estética dental'],
    problemTitle: 'Quer Melhorar Seu Sorriso mas Não Sabe por Onde Começar?',
    problems: [
      'Insatisfação com a cor dos dentes — amarelados ou manchados.',
      'Dentes com formato irregular, lascados ou desalinhados.',
      'Restaurações antigas escurecidas que destoam do sorriso.',
      'Vontade de melhorar mas receio de ficar artificial.',
      'Já pesquisou sobre vários tratamentos e não sabe qual é indicado.',
      'Quer uma opinião profissional antes de tomar qualquer decisão.'
    ],
    guideTitle: 'Como a Dra. Carla Christoph Avalia Seu Caso',
    steps: [
      { title: 'Conversa e Análise', description: 'Entendemos o que te incomoda e o que você espera. Analisamos dentes, gengiva e harmonia facial.' },
      { title: 'Diagnóstico das Opções', description: 'Apresentamos as possibilidades — clareamento, lentes, restaurações, facetas — com prós e contras de cada uma para o seu caso.' },
      { title: 'Simulação quando indicado', description: 'Em casos de lentes e facetas, o Test Drive do Sorriso permite que você visualize o resultado antes de começar.' },
      { title: 'Você Decide o Caminho', description: 'Sem pressão. Você sai da consulta com informação clara para tomar a decisão no seu tempo.' }
    ],
    testimonialsTitle: 'O Que Nossos Pacientes Contam',
    testimonials: [
      { name: 'Marina P. — Ipanema', text: 'Queria mudar meu sorriso mas não sabia se era caso de lentes ou clareamento. A Dra. Carla avaliou e indicou clareamento + 4 restaurações. Ficou natural e bonito.' },
      { name: 'Fernanda G. — Leblon', text: 'Achava que precisava de lentes em todos os dentes. Na consulta, ela mostrou que só 4 dentes precisavam. Economizei e o resultado ficou harmonioso.' },
      { name: 'Thiago R. — Copacabana', text: 'O Test Drive do Sorriso me convenceu. Pude ver como ficaria antes de decidir. Sem surpresas.' }
    ],
    faqTitle: 'Dúvidas sobre Estética Dental',
    faqs: [
      { q: 'Qual tratamento estético é indicado para mim?', a: 'Depende do caso. Dentes amarelados podem precisar de clareamento. Dentes com forma irregular podem precisar de lentes ou facetas. Restaurações antigas podem ser trocadas. A consulta define o melhor caminho.' },
      { q: 'Lentes de porcelana ficam artificiais?', a: 'Com planejamento adequado, não. A porcelana moderna reproduz a translucidez natural do dente. O objetivo é que ninguém perceba — só notem que o sorriso está bonito.' },
      { q: 'Posso combinar tratamentos?', a: 'Sim, é comum. Muitos pacientes combinam clareamento + restaurações, ou lentes nos dentes da frente + coroa em um dente posterior. A visão integrada é justamente o diferencial da consulta.' },
      { q: 'O resultado é permanente?', a: 'Lentes e facetas de porcelana duram 15-20 anos. Clareamento é duradouro mas pode precisar de manutenção. Restaurações em resina duram em média 7-10 anos. Depende do tratamento.' },
      { q: 'Vocês atendem convênios?', a: 'Nosso atendimento é particular, o que nos permite dedicar tempo ao planejamento e trabalhar com materiais selecionados.' }
    ],
    ctaTitle: 'Quer Saber o que Faz Sentido para Seu Sorriso?',
    ctaSubtitle: 'Na consulta, analisamos seu caso, mostramos as opções e o tempo previsto — você decide o ritmo.',
    ctaText: 'Agendar Consulta Estética',
    whatsappNumber: '5521993304045',
    whatsappMessage: 'Olá! Vi o site e gostaria de agendar uma consulta para avaliar e melhorar meu sorriso.'
  },

  '/lp/saude-gengival-ipanema': {
    h1: 'Saúde da Gengiva em Ipanema — Sangramento e Retração Merecem Atenção',
    subhead: 'Gengiva que sangra não é normal. Tratamento periodontal com acompanhamento individualizado. Dra. Carla Christoph coordena a jornada completa do seu tratamento.',
    benefits: ['Tratamento integrado com periodontista', 'Acompanhamento contínuo pela Dra. Carla', 'WhatsApp 24h', '20+ anos de experiência'],
    problemTitle: 'Sinais na Gengiva que Você Não Deveria Ignorar',
    problems: [
      'Gengiva que sangra ao escovar ou ao usar fio dental.',
      'Gengivas vermelhas, inchadas ou sensíveis ao toque.',
      'Mau hálito persistente mesmo com boa higiene.',
      'Gengiva retraída — dentes parecem "mais longos" do que antes.',
      'Receio de que o problema evolua e afete os dentes.',
      'Quer tratar a gengiva para depois investir em estética ou implantes.'
    ],
    guideTitle: 'Como Cuidamos da Sua Gengiva',
    steps: [
      { title: 'Consulta Detalhada', description: 'Exame clínico da gengiva, sondagem periodontal e radiografias quando necessário para identificar o estágio do problema.' },
      { title: 'Tratamento Periodontal', description: 'Limpeza profunda e tratamento com periodontista especializado quando indicado. Controle da inflamação e infecção.' },
      { title: 'Reavaliação', description: 'Após o tratamento, avaliamos a resposta da gengiva e definimos os próximos passos — manutenção ou tratamentos complementares.' },
      { title: 'Manutenção Periódica', description: 'Consultas regulares para manter o controle e prevenir recidivas. A frequência é definida individualmente.' }
    ],
    testimonialsTitle: 'O Que Nossos Pacientes Contam',
    testimonials: [
      { name: 'Sandra M. — Ipanema', text: 'Minha gengiva sangrava há anos e eu achava que era normal. Depois do tratamento, parou completamente. Deveria ter procurado antes.' },
      { name: 'Roberto F. — Leblon', text: 'Queria fazer implante mas a gengiva não estava saudável. A Dra. Carla tratou primeiro a gengiva e depois fez o implante. Resultado seguro.' },
      { name: 'Claudia V. — Copacabana', text: 'O acompanhamento é o diferencial. A Dra. Carla não faz só a limpeza — ela monitora a evolução a cada consulta.' }
    ],
    faqTitle: 'Dúvidas sobre Saúde Gengival',
    faqs: [
      { q: 'Gengiva que sangra ao escovar é normal?', a: 'Não. Sangramento é sinal de inflamação. Pode ser gengivite (reversível) ou periodontite (mais avançada).' },
      { q: 'Periodontite tem cura?', a: 'É controlável com tratamento e manutenção periódica. Uma vez controlada, o objetivo é manter a estabilidade e evitar que progrida.' },
      { q: 'Posso fazer lentes ou implantes se tenho problema gengival?', a: 'Primeiro tratamos a gengiva. Lentes e implantes precisam de base gengival saudável para funcionar e durar. A Dra. Carla integra o tratamento periodontal ao plano geral do caso.' },
      { q: 'Mau hálito pode ser problema gengival?', a: 'Sim. Halitose persistente é frequentemente ligada a doença periodontal. Bactérias acumuladas em bolsas gengivais produzem compostos com odor. Tratar a gengiva costuma resolver.' },
      { q: 'Vocês atendem convênios?', a: 'Nosso atendimento é particular, o que nos permite acompanhar cada caso com o tempo e a atenção necessários.' }
    ],
    ctaTitle: 'Gengiva Saudável é a Base de Tudo',
    ctaSubtitle: 'Agende uma consulta gengival. Tratamento precoce faz toda a diferença.',
    ctaText: 'Agendar Consulta Gengival',
    whatsappNumber: '5521993304045',
    whatsappMessage: 'Olá! Vi o site e gostaria de agendar uma consulta para cuidar da saúde da minha gengiva.'
  },

  '/lp/clareamento-dental': {
    h1: 'Dentes Amarelados? Clareamento com Resultado Natural em Ipanema',
    subhead: 'Protocolos personalizados para uma cor natural, sem aparência artificial. Mais de 20 anos de experiência em estética dental.',
    benefits: ['Protocolo personalizado por caso', 'Resultado natural, sem "dente de chiclete"', 'WhatsApp 24h', '20+ anos de experiência'],
    problemTitle: 'Você se identifica com alguma dessas situações?',
    problems: [
      'Dentes amarelados por café, vinho ou chá — o escurecimento é gradual e você só percebe quando compara com uma foto antiga.',
      'Clareamento caseiro que não funciona — fitas, géis de farmácia ou receitas da internet com resultados fracos, irregulares ou que desaparecem em semanas.',
      'Medo de sensibilidade — já ouviu que clareamento dá muita dor, mas com protocolo individualizado e acompanhamento profissional, isso é controlável.',
      'Medo de ficar artificial — não querer dentes "branco azulejo". O objetivo é recuperar a cor natural, não exagerar.'
    ],
    guideTitle: 'Como a Dra. Carla Christoph Conduz o Clareamento',
    steps: [
      { title: 'Consulta e Diagnóstico', description: 'Análise da causa do escurecimento, condição dos dentes e gengiva. Definição do protocolo mais adequado para o seu caso.' },
      { title: 'Preparação Cuidadosa', description: 'Proteção dos tecidos gengivais e análise da sensibilidade para garantir segurança e conforto durante o procedimento.' },
      { title: 'Aplicação Profissional', description: 'Clareamento de consultório (sessão de 45-60 min) ou moldeiras para clareamento caseiro supervisionado — depende do caso. Utilizamos somente géis clareadores de primeira linha.' },
      { title: 'Acompanhamento dos Resultados', description: 'Monitoramento do progresso e orientações para manutenção. A cor estabiliza ao longo de 2 semanas após o término.' }
    ],
    testimonialsTitle: 'O Que Nossos Pacientes Contam',
    testimonials: [
      { name: 'Juliana M. — Leblon', text: 'Fiz o clareamento antes do meu casamento. Estava com medo de ficar artificial, mas ficou tão natural que ninguém percebeu que era clareamento — só elogiaram o sorriso.' },
      { name: 'Ricardo T. — Ipanema', text: 'Tomei café a vida inteira e meus dentes foram amarelando sem eu perceber. Depois do clareamento, minha filha disse que eu parecia 10 anos mais novo.' },
      { name: 'Beatriz A. — Copacabana', text: 'Já tinha tentado clareamento de farmácia duas vezes sem resultado. Na clínica foi completamente diferente — resultado uniforme e sem a sensibilidade que eu esperava.' }
    ],
    faqTitle: 'Dúvidas Sobre Clareamento Dental',
    faqs: [
      { q: 'Clareamento dental estraga o esmalte?', a: 'Não. O clareamento profissional supervisionado não causa danos ao esmalte. O gel clareador age nos pigmentos internos do dente sem comprometer a estrutura.' },
      { q: 'Clareamento caseiro de farmácia funciona?', a: 'Produtos de farmácia têm concentração muito baixa de agente clareador. O resultado é limitado, irregular e temporário. O clareamento profissional usa concentração adequada com supervisão, o que dá resultado uniforme e duradouro.' },
      { q: 'Quanto tempo dura o resultado do clareamento?', a: 'Em média 2 a 3 anos, dependendo dos hábitos alimentares. Café, vinho e chá escurecem os dentes gradualmente. Manutenções periódicas são simples e mantêm o resultado.' },
      { q: 'Clareamento dá muita sensibilidade?', a: 'Pode haver sensibilidade leve e temporária durante o tratamento, que dura de 24 a 48 horas. Com protocolo personalizado e dessensibilizante, a maioria dos pacientes relata desconforto mínimo.' },
      { q: 'Posso fazer clareamento se tenho restaurações?', a: 'As restaurações existentes não clareiam — mantêm a cor original. Após o clareamento, avaliamos se alguma restauração precisa ser trocada para ficar na mesma cor dos dentes clareados.' },
      { q: 'Clareamento funciona em todas as manchas?', a: 'Manchas por café, chá, vinho e tabaco respondem muito bem. Manchas internas por medicamento (tetraciclina) ou flúor têm resposta variável — nesses casos, avaliamos alternativas como lentes de porcelana.' },
      { q: 'Já tenho dentes sensíveis. Posso fazer clareamento?', a: 'Sim, com adaptações no protocolo. Em pacientes com sensibilidade prévia, usamos géis em concentrações menores ao longo de mais sessões, aplicamos dessensibilizante antes e após cada aplicação, e indicamos pasta dental específica para sensibilidade durante o tratamento. Em alguns casos, fazemos uma fase preparatória só com dessensibilizante por uma semana antes de iniciar.' },
      { q: 'Como aliviar a sensibilidade durante e após o clareamento?', a: 'Algumas medidas funcionam bem: usar pasta dental para sensibilidade nos dias do tratamento, evitar alimentos muito frios ou ácidos nas primeiras 48 horas, aplicar gel dessensibilizante (que fornecemos quando indicado) e tomar analgésico simples se houver desconforto. Avise sempre que sentir incômodo — ajustamos o protocolo na hora.' },
      { q: 'A sensibilidade do clareamento pode ser permanente?', a: 'Não. A sensibilidade causada pelo clareamento é sempre transitória — passa em até 48 horas após cada aplicação e desaparece completamente quando o tratamento termina. O efeito é reversível porque o gel não causa lesão ao esmalte ou à dentina, apenas abre temporariamente os canais que conectam o exterior do dente à polpa.' }
    ],
    ctaTitle: 'Quer Saber Qual Clareamento é Indicado para Você?',
    ctaSubtitle: 'O clareamento é um dos tratamentos mais simples da odontologia estética. Uma consulta inicial mostra qual protocolo é indicado para a cor e o tipo dos seus dentes.',
    ctaText: 'Agendar Minha Consulta',
    whatsappNumber: '5521993304045',
    whatsappMessage: 'Olá! Vi sobre clareamento dental e gostaria de agendar uma consulta para saber qual protocolo é indicado para mim.'
  },

  '/lp/ortodontia-ipanema': {
    h1: 'Ortodontia Conduzida por Doutor em Ortodontia pela UERJ',
    subhead: 'Dr. Bruno, Doutor em Ortodontia pela UERJ e Professor no IOPUC-Rio, planeja cada caso com escaneamento digital iTero Element 5D. Opções de alinhadores Invisalign, aparelho estético e convencional.',
    benefits: ['Doutor em Ortodontia (UERJ)', 'Escaneamento digital com iTero Element 5D', 'Invisalign, estético e convencional', 'WhatsApp 24h'],
    problemTitle: 'Dentes Desalinhados Afetam Mais do que a Estética',
    problems: [
      'Dentes "encavalados" que dificultam a escovação e acumulam tártaro.',
      'Mordida desalinhada que causa desconforto ou dor na articulação (ATM).',
      'Espaços entre os dentes que incomodam esteticamente.',
      'Evitar sorrir abertamente por causa da posição dos dentes.',
      'Ser adulto e achar que "passou da idade" para usar aparelho.',
      'Querer um tratamento discreto que não interfira na rotina profissional.'
    ],
    guideTitle: 'Como Funciona o Tratamento Ortodôntico com o Dr. Bruno',
    steps: [
      { title: 'Diagnóstico com iTero Element 5D', description: 'Escaneamento digital da boca — sem massinha de moldagem. O modelo 3D permite diagnóstico preciso e planejamento computadorizado do tratamento.' },
      { title: 'Planejamento e Simulação', description: 'Dr. Bruno planeja cada movimento dos dentes digitalmente. Você visualiza uma simulação do resultado antes de começar.' },
      { title: 'Escolha do Aparelho', description: 'Definição da melhor opção para o seu caso: alinhadores Invisalign, aparelho fixo estético (transparente) ou convencional. A indicação é clínica, não comercial.' },
      { title: 'Acompanhamento até a Contenção', description: 'Consultas regulares para ajustes e monitoramento da evolução. Ao final, instalação da contenção para manter o resultado.' }
    ],
    testimonialsTitle: 'O Que Nossos Pacientes Contam',
    testimonials: [
      { name: 'Fernanda L. — Ipanema', text: 'Fiz com Invisalign e no trabalho ninguém notava que eu estava em tratamento. O planejamento digital me mostrou como ficaria antes de começar — isso me deu segurança.' },
      { name: 'Lucas G. — Leblon', text: 'Tinha um caso complexo de mordida e o Dr. Bruno explicou cada etapa com calma. O iTero Element 5D substituiu a moldagem — muito mais confortável. O resultado ficou como o planejado.' },
      { name: 'Mariana P. — Copacabana', text: 'Comecei o tratamento aos 35 anos. O aparelho estético foi discreto e o acompanhamento do Dr. Bruno foi atencioso do início à contenção.' }
    ],
    faqTitle: 'Dúvidas Sobre Tratamento Ortodôntico',
    faqs: [
      { q: 'Quem é o ortodontista responsável?', a: 'Dr. Bruno, Doutor em Ortodontia pela UERJ, Mestre em Clínica Odontológica pela UFF e Professor de Pós-Graduação em Ortodontia no IOPUC-Rio. Todo o tratamento é conduzido por ele, dentro do consultório da Dra. Carla Christoph.' },
      { q: 'Adulto pode usar aparelho ortodôntico?', a: 'Sim. Não há limite de idade para ortodontia. O que importa é a condição dos dentes e do osso. Muitos dos nossos pacientes iniciam o tratamento após os 30 ou 40 anos.' },
      { q: 'Invisalign funciona para casos complexos?', a: 'Em muitos casos, sim. O Invisalign evoluiu e hoje trata desde casos simples até os mais complexos. A análise com iTero Element 5D define se é a melhor opção para o seu caso específico.' },
      { q: 'O tratamento ortodôntico dói?', a: 'É normal sentir pressão nos dentes nos primeiros dias após a instalação ou ajustes. A sensação é temporária e controlável com analgésicos simples. A maioria dos pacientes se adapta rapidamente.' },
      { q: 'Quanto tempo dura o tratamento?', a: 'Varia conforme a complexidade. Casos simples podem levar de 6 a 12 meses; casos mais complexos, de 18 a 30 meses. O planejamento digital permite estimar a duração com mais precisão.' },
      { q: 'Preciso usar contenção depois?', a: 'Sim. A contenção é parte essencial do tratamento — é o que mantém os dentes na posição corrigida. Pode ser fixa (colada atrás dos dentes) ou removível, dependendo do caso.' }
    ],
    ctaTitle: 'Quer Saber Qual Tratamento Ortodôntico é Indicado para Você?',
    ctaSubtitle: 'Na consulta, o Dr. Bruno analisa seu caso com escaneamento digital iTero Element 5D e apresenta as opções mais adequadas.',
    ctaText: 'Agendar Minha Consulta',
    whatsappNumber: '5521993304045',
    whatsappMessage: 'Olá! Vi o site e gostaria de agendar uma consulta de planejamento para tratamento ortodôntico.'
  },

  '/lp/dor-de-dente-urgencia-ipanema': {
    h1: 'Dor de Dente em Ipanema? Atendimento Prioritário',
    subhead: 'Encaixe prioritário em dias úteis para diagnosticar a causa e dar alívio o quanto antes. WhatsApp responde 24h para orientação.',
    benefits: ['WhatsApp 24h — orientação imediata', 'Encaixe prioritário na agenda', 'Diagnóstico preciso da causa', '20+ anos de experiência'],
    problemTitle: 'Dor de Dente Não É para Aguentar',
    problems: [
      'Dor ao morder ou mastigar — pulsante, latejante.',
      'Dor que piora com bebida quente ou gelada.',
      'Dor que acorda de madrugada e não passa com analgésico.',
      'Inchaço no rosto ou na gengiva perto do dente que dói.',
      'Sensação de pressão ou pulsação dentro do dente.',
      'Não sabe a causa — só sabe que precisa resolver.'
    ],
    guideTitle: 'Do Alívio ao Tratamento Definitivo',
    steps: [
      { title: 'Contato pelo WhatsApp', description: 'Descreva a dor. Orientamos os primeiros cuidados (o que tomar, o que evitar) enquanto agenda o encaixe.' },
      { title: 'Diagnóstico da Causa', description: 'Exame clínico e radiografia para identificar a origem exata da dor — cárie, fratura, infecção, problema gengival.' },
      { title: 'Alívio Imediato', description: 'Tratamento para eliminar a dor. Pode ser medicação, drenagem de abscesso, restauração ou encaminhamento para canal.' },
      { title: 'Tratamento Definitivo', description: 'Com a dor resolvida, planejamos o tratamento da causa para evitar recorrência.' }
    ],
    testimonialsTitle: 'Quem Precisou, Conta',
    testimonials: [
      { name: 'Felipe G. — Ipanema', text: 'Estava com uma dor que não me deixava dormir. Consegui encaixe no dia seguinte. A Dra. Carla identificou a infecção, resolveu a urgência e depois planejou o restante.' },
      { name: 'Laura M. — Leblon', text: 'Tomei analgésico por 3 dias antes de ligar. Me arrependo de não ter ido antes — a solução foi simples quando diagnosticada.' },
      { name: 'Roberto C. — Copacabana', text: 'Achei que ia precisar de canal. A Dra. Carla avaliou com calma e na verdade era só uma restauração infiltrada. Resolveu na hora.' }
    ],
    faqTitle: 'Dúvidas sobre Dor de Dente',
    faqs: [
      { q: 'Posso tomar analgésico enquanto espero a consulta?', a: 'Sim. Analgésicos comuns (dipirona, paracetamol, ibuprofeno) podem aliviar temporariamente. Evite aspirina se houver sangramento. Na dúvida, pergunte pelo WhatsApp antes de medicar.' },
      { q: 'Dor de dente sempre significa canal?', a: 'Não. A dor pode ter várias causas — cárie, restauração infiltrada, fratura, problema gengival. Muitas vezes a solução é mais simples do que canal. O diagnóstico correto é fundamental.' },
      { q: 'E se a dor passar sozinha?', a: 'Dor que passa sozinha não significa que o problema foi resolvido. Pode significar que o nervo do dente morreu, o que é pior. Se teve dor intensa que desapareceu repentinamente, procure um profissional.' },
      { q: 'Vocês atendem convênios?', a: 'Nosso atendimento é particular. Na consulta de urgência, diagnosticamos a causa e apresentamos as opções de tratamento.' }
    ],
    ctaTitle: 'Não Aguente a Dor — Procure Atendimento',
    ctaSubtitle: 'Mande mensagem pelo WhatsApp. Respondemos 24h e buscamos o encaixe o quanto antes em dias úteis.',
    ctaText: 'Pedir Encaixe pelo WhatsApp',
    whatsappNumber: '5521993304045',
    whatsappMessage: 'Olá! Estou com uma dor de dente forte e gostaria de tentar um encaixe no consultório o quanto antes.'
  },

  '/lp/dente-quebrado-urgencia-ipanema': {
    h1: 'Dente Quebrado? Restauração com Resultado Natural em Ipanema',
    subhead: 'Encaixe prioritário para resolver rápido. A Dra. Carla Christoph restaura dentes fraturados com materiais que reproduzem a aparência natural do dente original.',
    benefits: ['WhatsApp 24h — resposta imediata', 'Encaixe prioritário na agenda', 'Restauração com resultado natural', '20+ anos de experiência em estética'],
    problemTitle: 'Dente Quebrou — E Agora?',
    problems: [
      'Dente quebrou e preciso resolver o mais rápido possível.',
      'Bordas cortantes que machucam a língua ou a bochecha.',
      'Sensibilidade ao frio, calor ou ao morder.',
      'Não sei se preciso de restauração simples ou tratamento mais complexo.',
      'Preciso resolver antes de um compromisso próximo.',
      'Tenho medo de que o problema piore se não tratar logo.'
    ],
    guideTitle: 'Do Contato à Restauração — Rápido e com Resultado',
    steps: [
      { title: 'WhatsApp Imediato', description: 'Mande uma foto do dente e descreva o que aconteceu. Orientamos sobre cuidados imediatos (guardar o fragmento, evitar morder do lado afetado).' },
      { title: 'Encaixe Prioritário', description: 'Fraturas dentais têm prioridade na agenda. Faremos o possível para atender no mesmo dia.' },
      { title: 'Diagnóstico e Radiografia', description: 'Exame da extensão da fratura — se atingiu só o esmalte, se chegou à dentina ou se comprometeu o nervo. Define o tipo de tratamento.' },
      { title: 'Restauração', description: 'Restauração direta em resina (casos simples) ou planejamento de coroa/faceta (casos mais extensos). O objetivo é resultado natural e funcional.' }
    ],
    testimonialsTitle: 'Quem Já Passou por Isso',
    testimonials: [
      { name: 'Ana Clara R. — Ipanema', text: 'Quebrei o dente da frente mordendo uma azeitona. Consegui atendimento no dia seguinte. A restauração ficou tão natural que eu mesma esqueço qual dente foi.' },
      { name: 'Pedro H. — Leblon', text: 'Meu filho quebrou o dente num treino. A Dra. Carla encaixou no mesmo dia e restaurou com calma. Ele saiu sorrindo.' },
      { name: 'Carla M. — Copacabana', text: 'Tinha um evento em 2 dias e lascou meu dente. Mandei foto no WhatsApp e resolveram rápido. Fui ao evento tranquila.' }
    ],
    faqTitle: 'Dúvidas sobre Dente Quebrado',
    faqs: [
      { q: 'Quebrei o dente — o que faço agora?', a: 'Se encontrou o fragmento, guarde em leite ou soro. Evite morder do lado afetado. Entre em contato pelo WhatsApp com uma foto e orientaremos os próximos passos.' },
      { q: 'Dá para colar o pedaço que quebrou?', a: 'Em alguns casos, sim — especialmente se o fragmento estiver íntegro e for guardado corretamente. A análise clínica define se a colagem é viável ou se a restauração direta é a melhor opção.' },
      { q: 'A restauração fica visível?', a: 'Com resinas e cerâmicas atuais, a restauração reproduz a cor, translucidez e textura do dente natural. O objetivo é que seja imperceptível.' },
      { q: 'E se a fratura for grande?', a: 'Fraturas mais extensas podem precisar de coroa ou, em casos raros, tratamento de canal antes da restauração. A radiografia na consulta define a extensão e o melhor caminho.' },
      { q: 'Vocês atendem convênios?', a: 'Nosso atendimento é particular. Na consulta de urgência, resolvemos o problema e apresentamos as opções.' }
    ],
    ctaTitle: 'Não Espere — Quanto Antes, Mais Simples',
    ctaSubtitle: 'Mande foto do dente pelo WhatsApp. Respondemos 24h e encaixamos o mais rápido possível.',
    ctaText: 'Falar no WhatsApp Agora',
    whatsappNumber: '5521993304045',
    whatsappMessage: 'Olá! Quebrei meu dente e preciso de atendimento urgente.'
  },

  '/lp/emergencia-odontologica-ipanema': {
    h1: 'Emergência Odontológica em Ipanema — Encaixe Prioritário',
    subhead: 'Dente quebrado, dor aguda, prótese solta ou inchaço. Entre em contato pelo WhatsApp e resolveremos o mais rápido possível.',
    benefits: ['WhatsApp 24h — resposta imediata', 'Encaixe prioritário na agenda', 'Diagnóstico e resolução no mesmo dia', '20+ anos de experiência'],
    problemTitle: 'Imprevistos Dentais Não Esperam',
    problems: [
      'Dente que quebrou ou lascou — precisa de restauração urgente.',
      'Dor de dente intensa que não passa com analgésico.',
      'Lente, faceta ou coroa que soltou — precisa cimentar.',
      'Inchaço ou abscesso na gengiva.',
      'Prótese que soltou ou quebrou.',
      'Não sabe se é urgência — quer orientação rápida.'
    ],
    guideTitle: 'Como Funciona o Atendimento de Emergência',
    steps: [
      { title: 'WhatsApp Imediato', description: 'Descreva o que aconteceu. Nossa equipe responde 24h e orienta os primeiros cuidados enquanto agenda o encaixe.' },
      { title: 'Encaixe Prioritário', description: 'Urgências têm preferência na agenda. Na maioria dos casos, conseguimos atender no mesmo dia.' },
      { title: 'Diagnóstico e Tratamento', description: 'Avaliação completa, radiografia se necessário, e resolução imediata — restauração, cimentação, alívio da dor.' },
      { title: 'Orientação de Continuidade', description: 'Você sai com o problema resolvido e um plano claro para tratamento definitivo, se necessário.' }
    ],
    testimonialsTitle: 'Quem Precisou, Conta',
    testimonials: [
      { name: 'Renata S. — Ipanema', text: 'Soltou minha lente num sábado. Mandei mensagem no WhatsApp e na segunda cedo já estava no consultório. Resolveu na hora.' },
      { name: 'Marcos T. — Leblon', text: 'Acordei com dor forte num dente. Consegui encaixe no mesmo dia. A Dra. Carla diagnosticou, resolveu a urgência e planejou o tratamento definitivo.' },
      { name: 'Ana Clara R. — Copacabana', text: 'Quebrei o dente da frente num acidente. O atendimento foi rápido e a restauração ficou natural. Ninguém percebe.' }
    ],
    faqTitle: 'Dúvidas sobre Emergências',
    faqs: [
      { q: 'Vocês atendem no mesmo dia?', a: 'Nos esforçamos para isso. Entre em contato pelo WhatsApp descrevendo a situação e faremos o possível para encaixar no primeiro horário disponível.' },
      { q: 'Como saber se é emergência?', a: 'Se há dor intensa, sangramento que não para, dente quebrado visível, inchaço ou prótese solta — é emergência. Na dúvida, mande mensagem no WhatsApp e orientamos.' },
      { q: 'O atendimento de emergência resolve de vez?', a: 'Depende do caso. Muitas vezes sim (restauração, cimentação). Em casos mais complexos, resolvemos a urgência e planejamos o tratamento definitivo para uma consulta seguinte.' },
      { q: 'Vocês atendem convênios?', a: 'Nosso atendimento é particular. Na consulta de emergência, resolvemos o problema imediato e apresentamos as opções para continuidade.' }
    ],
    ctaTitle: 'Precisa de Atendimento Agora?',
    ctaSubtitle: 'Mande mensagem pelo WhatsApp. Respondemos 24h e encaixamos o mais rápido possível.',
    ctaText: 'Falar no WhatsApp Agora',
    whatsappNumber: '5521993304045',
    whatsappMessage: 'Olá! Tive uma emergência odontológica e preciso de atendimento prioritário. Podem me ajudar?'
  },

  '/lp/especialista-protese-ipanema': {
    h1: 'Sua Prótese Pode Funcionar Como Dentes de Verdade',
    subhead: 'Especialista em Prótese Dentária com mais de 20 anos. Cada caso é planejado em detalhes — para o resultado ficar natural e durar.',
    benefits: ['Especialista em Prótese Dentária', 'Planejamento digital com iTero Element 5D', 'WhatsApp 24h', '20+ anos de experiência (8 na Marinha)'],
    problemTitle: 'Quando o Caso Precisa de um Olhar Especializado',
    problems: [
      'Tratamentos anteriores que não deram certo ou já estão falhando.',
      'Prótese antiga que não se adapta bem — solta, machuca ou limita a alimentação.',
      'Múltiplos dentes ausentes e dúvida sobre a melhor solução.',
      'Dentes muito desgastados ou com muitas restaurações antigas comprometidas.',
      'Insegurança para sorrir ou comer em público por causa da condição dos dentes.',
      'Sensação de que o caso é complexo demais e precisa de alguém com experiência específica.'
    ],
    guideTitle: 'A Abordagem da Especialista em Prótese',
    steps: [
      { title: 'Consulta de Planejamento', description: 'Análise clínica completa, fotografias, radiografias e escaneamento digital com iTero Element 5D. Entendemos o histórico e definimos os objetivos do tratamento.' },
      { title: 'Projeto Protético Digital', description: 'Com base nos dados coletados, a Dra. Carla projeta a reabilitação — tipo de prótese, materiais, sequência de etapas. Tudo definido antes de começar.' },
      { title: 'Execução por Etapas', description: 'O tratamento segue o cronograma planejado. Cada etapa é executada com precisão, usando somente materiais de primeira linha e provas intermediárias para garantir o ajuste.' },
      { title: 'Acompanhamento de Longo Prazo', description: 'Após a entrega, consultas de acompanhamento garantem que a prótese se mantenha funcional e confortável ao longo dos anos.' }
    ],
    testimonialsTitle: 'O Que Nossos Pacientes Contam Sobre o Tratamento',
    testimonials: [
      { name: 'Maria Helena R. — Ipanema', text: 'Já tinha passado por outros dentistas sem resolver. A Dra. Carla fez um planejamento completo e hoje como de tudo com segurança. O processo foi longo, mas cada etapa fez sentido.' },
      { name: 'João Carlos A. — Leblon', text: 'O que me deu confiança foi o planejamento. Ela mostrou o projeto antes de começar e explicou cada etapa. O resultado ficou natural — ninguém percebe que é prótese.' },
      { name: 'Beatriz L. — Copacabana', text: 'Usava prótese removível há anos. Depois do tratamento com a Dra. Carla, tenho dentes fixos novamente. A diferença na qualidade de vida é enorme.' }
    ],
    faqTitle: 'Dúvidas Sobre Prótese e Reabilitação Oral',
    faqs: [
      { q: 'Qual a diferença entre um dentista generalista e uma especialista em prótese?', a: 'A especialista tem formação avançada em reabilitação oral — planejamento de casos complexos, domínio de materiais e técnicas específicas. Isso faz diferença principalmente em casos com múltiplas ausências ou desgaste severo.' },
      { q: 'Quanto tempo dura uma prótese bem feita?', a: 'Com materiais adequados, técnica precisa e acompanhamento regular, uma prótese fixa em porcelana pode durar 15 a 20 anos ou mais. A longevidade depende também dos cuidados do paciente.' },
      { q: 'Prótese fixa ou removível — como saber qual é melhor para mim?', a: 'Depende da condição dos dentes remanescentes, da quantidade de osso disponível e do caso como um todo. A análise clínica e os exames definem a indicação. A Dra. Carla apresenta as opções com prós e contras de cada uma.' },
      { q: 'É possível trocar uma prótese antiga por uma nova?', a: 'Sim. Próteses antigas podem ser substituídas por soluções mais modernas, com melhor estética e função. A análise determina o que é viável para o seu caso.' },
      { q: 'Vocês atendem convênios?', a: 'Nosso atendimento é particular, o que nos permite dedicar o tempo necessário ao planejamento e trabalhar com materiais selecionados. Na consulta, apresentamos o plano completo com valores transparentes.' }
    ],
    ctaTitle: 'Seu Caso Merece Atenção Especializada',
    ctaSubtitle: 'Agende sua consulta de planejamento. A análise detalhada é o primeiro passo para um tratamento seguro e bem conduzido.',
    ctaText: 'Agendar Minha Consulta',
    whatsappNumber: '5521993304045',
    whatsappMessage: 'Olá! Vi sobre prótese e reabilitação e gostaria de agendar uma consulta para entender o que é possível no meu caso.'
  },

  '/lp/implantes-dentarios-ipanema': {
    h1: 'Volte a Comer e Sorrir com Dentes Fixos',
    subhead: 'Implantes com planejamento digital individualizado. Especialista em Implantodontia com mais de 20 anos de experiência.',
    benefits: ['Especialista em Implantodontia', 'Planejamento com tomografia digital', 'WhatsApp 24h', '20+ anos de experiência'],
    problemTitle: 'Você se identifica com alguma dessas situações?',
    problems: [
      'Dificuldade para mastigar — evitar alimentos mais firmes, cortar tudo em pedaços pequenos ou mastigar só de um lado.',
      'Insegurança com o espaço do dente perdido — evitar sorrir abertamente, cobrir a boca ao falar ou sentir desconforto em fotos.',
      'Prótese removível que incomoda — solta, machuca a gengiva, acumula alimento ou limita o que você pode comer.',
      'Perda óssea avançando — cada mês sem o dente, o osso da região continua sendo reabsorvido, o que pode dificultar o implante no futuro.'
    ],
    guideTitle: 'Como a Dra. Carla Christoph Planeja Seu Tratamento com Implantes',
    steps: [
      { title: 'Consulta e Tomografia', description: 'Análise clínica detalhada e tomografia computadorizada para mapear a estrutura óssea com precisão.' },
      { title: 'Planejamento Digital do Caso', description: 'Definição da posição, angulação e tipo de implante mais adequado — tudo planejado antes da cirurgia.' },
      { title: 'Cirurgia de Instalação', description: 'Procedimento com anestesia local, de forma tranquila. Na maioria dos casos, o pós é mais simples do que se imagina.' },
      { title: 'Cicatrização e Integração', description: 'O implante se integra ao osso ao longo de alguns meses. Durante esse período, você pode usar uma prótese provisória.' },
      { title: 'Prótese Definitiva pela Dra. Carla', description: 'Moldagem digital e confecção da coroa ou prótese final — com materiais de primeira linha selecionados individualmente para cada caso.' }
    ],
    testimonialsTitle: 'O Que Nossos Pacientes Contam Sobre o Tratamento',
    testimonials: [
      { name: 'Roberto S. — Copacabana', text: 'Passei anos com prótese removível e já tinha me conformado. Depois do implante, voltei a comer de tudo — parece que recuperei algo que achei que tinha perdido.' },
      { name: 'Márcia L. — Ipanema', text: 'Tinha muito medo da cirurgia, mas foi mais tranquilo do que arrancar um dente. O que mais me surpreendeu foi o acompanhamento — a Dra. Carla estava presente em cada etapa.' },
      { name: 'Paulo H. — Leblon', text: 'Fiz a reabilitação completa, arcada superior inteira. Demorou alguns meses, mas hoje tenho dentes fixos e como qualquer coisa sem pensar duas vezes.' }
    ],
    faqTitle: 'Dúvidas Sobre Implantes Dentários',
    faqs: [
      { q: 'Implante dentário dói muito?', a: 'A cirurgia é feita com anestesia local e a maioria dos pacientes relata menos desconforto do que em uma extração. O pós-operatório costuma ser controlado com medicação simples por poucos dias.' },
      { q: 'Implante dentário pode ser rejeitado pelo corpo?', a: 'Implantes de titânio têm taxa de sucesso superior a 95%. O titânio é biocompatível — o osso se integra a ele naturalmente. Rejeição verdadeira é extremamente rara.' },
      { q: 'Quanto tempo leva do início ao dente definitivo?', a: 'O tempo total varia de 3 a 8 meses, dependendo da necessidade de enxerto ósseo e da região. Durante esse período, você não fica sem dente — usamos provisórios enquanto o implante se integra ao osso.' },
      { q: 'Existe idade máxima para colocar implante?', a: 'Não existe limite de idade. O que avaliamos é a saúde geral e a qualidade óssea do paciente. Pessoas com 70, 80 anos fazem implantes com sucesso rotineiramente.' },
      { q: 'Implante ou prótese removível — qual é melhor?', a: 'O implante é fixo, preserva o osso, não machuca a gengiva e permite mastigar normalmente. A prótese removível é uma alternativa quando o implante não é possível, mas tem limitações funcionais e de conforto.' },
      { q: 'Preciso fazer enxerto ósseo antes do implante?', a: 'Depende do volume de osso disponível. A análise com tomografia e planejamento digital mostra exatamente se há necessidade. Quando necessário, o enxerto é feito antes ou junto com o implante.' }
    ],
    ctaTitle: 'A Perda Óssea é Progressiva',
    ctaSubtitle: 'Quanto mais cedo o diagnóstico, menos complexo tende a ser o procedimento.',
    ctaText: 'Agendar Consulta de Planejamento',
    whatsappNumber: '5521993304045',
    whatsappMessage: 'Olá! Vi sobre implantes dentários e gostaria de agendar uma consulta para entender o tratamento no meu caso.'
  },

  '/lp/lentes-porcelana-ipanema': {
    h1: 'Escondendo o Sorriso? Lentes de Porcelana com Test Drive — Visualize na Própria Boca',
    subhead: 'Lentes de porcelana que respeitam a individualidade do seu rosto. Com planejamento digital e Test Drive do Sorriso — uma aplicação de resina não-adesiva — você visualiza e aprova o resultado antes de começar.',
    benefits: ['Test Drive do Sorriso antes de começar', 'Resultado natural que combina com seu rosto', 'WhatsApp 24h', '20+ anos em estética dental'],
    problemTitle: 'Você se identifica com alguma dessas situações?',
    problems: [
      'Evitar sorrir de boca aberta em fotos, tapar a boca com a mão ou deletar fotos por causa dos dentes.',
      'Dentes com manchas internas, escurecimento por medicamento na infância ou cor irregular que nenhum clareamento consegue uniformizar.',
      'Dentes com tamanhos diferentes, pequenos espaços, bordas irregulares ou leves desalinhamentos que incomodam esteticamente.',
      'Receio de ficar com aspecto artificial — branco demais ou todos iguais. Querer melhorar sem que pareça que fez alguma coisa.'
    ],
    guideTitle: 'Como Funciona o Tratamento com a Dra. Carla Christoph',
    steps: [
      { title: 'Consulta e Análise Facial', description: 'Conversa sobre suas expectativas. Análise facial, fotografias e escaneamento digital para entender o que combina com você.' },
      { title: 'Test Drive do Sorriso', description: 'Você experimenta um modelo provisório na sua boca antes de iniciar. Vê, sente e aprova. Se não gostar, ajustamos até ficar do seu jeito.' },
      { title: 'Confecção das Lentes', description: 'Com o projeto aprovado, cada lente é confeccionada em porcelana de alta translucidez — somente materiais de primeira linha. Reproduz a cor e o brilho dos dentes naturais.' },
      { title: 'Aplicação e Finalização', description: 'As lentes são cimentadas com precisão. O processo é confortável e o resultado é imediato — você sai sorrindo.' }
    ],
    testimonialsTitle: 'O Que Nossas Pacientes Contam',
    testimonials: [
      { name: 'Fernanda R. — Ipanema', text: 'Eu tinha pavor de ficar com aquele sorriso todo igual, artificial. A Dra. Carla fez questão de ajustar dente por dente. Ninguém percebe que são lentes — só elogiam o sorriso.' },
      { name: 'Cristina M. — Leblon', text: 'Fiz o Test Drive antes e vi exatamente como ia ficar. Isso me deu segurança para seguir. O resultado ficou tão natural que minha irmã quis fazer também.' },
      { name: 'André L. — Barra da Tijuca', text: 'Sempre tive os dentes manchados desde criança por causa de antibiótico. Nenhum clareamento resolvia. Com as lentes, finalmente tenho um sorriso que não preciso esconder.' }
    ],
    faqTitle: 'Dúvidas Sobre Lentes de Porcelana',
    faqs: [
      { q: 'Lente de contato dental dura quanto tempo?', a: 'Lentes de porcelana bem cuidadas duram em média 15 a 20 anos. A durabilidade depende dos hábitos do paciente — ranger os dentes e morder objetos duros são os principais fatores que reduzem a vida útil.' },
      { q: 'Qual a diferença entre lente de contato e faceta de porcelana?', a: 'A lente é mais fina (0,3 a 0,5mm) e exige pouco ou nenhum desgaste do dente. A faceta é levemente mais espessa e indicada quando há necessidade de correções maiores. Na consulta, avaliamos qual é a melhor opção para o seu caso.' },
      { q: 'Lente de porcelana estraga o dente?', a: 'Não. Na maioria dos casos, o preparo é mínimo ou até inexistente. O dente natural é preservado ao máximo. A porcelana é colada sobre o esmalte de forma permanente e segura.' },
      { q: 'Como funciona o Test Drive do Sorriso?', a: 'Antes de fazer qualquer desgaste, montamos uma simulação em resina sobre os seus dentes para você ver, tocar e aprovar o resultado. Se quiser ajustar formato, tamanho ou proporção, fazemos na hora.' },
      { q: 'Posso fazer lentes só nos dentes da frente?', a: 'Sim, a maioria dos casos envolve de 6 a 10 dentes superiores — os que aparecem no sorriso. A quantidade exata depende da largura do seu sorriso e do resultado desejado.' },
      { q: 'Dentes com restauração antiga podem receber lentes?', a: 'Depende do tamanho e estado da restauração. Em muitos casos, a lente pode cobrir e substituir restaurações escurecidas. Avaliamos caso a caso na consulta.' }
    ],
    ctaTitle: 'Cada Lente é Planejada Individualmente',
    ctaSubtitle: 'Nem todos os casos se beneficiam de lentes. Na consulta, vemos se é a melhor opção para o seu sorriso.',
    ctaText: 'Agendar Minha Consulta',
    whatsappNumber: '5521993304045',
    whatsappMessage: 'Olá! Vi o site sobre lentes de porcelana e gostaria de agendar uma consulta para renovar meu sorriso.'
  },

  '/lp/lentes-profissional-ipanema': {
    h1: 'Lentes de Porcelana em Ipanema — Resultado Natural que Dura mais de 15 Anos',
    subhead: 'Porcelana de alta translucidez, planejamento digital com iTero Element 5D e Test Drive do Sorriso antes de começar. Dra. Carla Christoph, especialista com mais de 20 anos em estética dental.',
    benefits: ['Porcelana de alta translucidez', 'Test Drive do Sorriso antes de começar', 'WhatsApp 24h', '20+ anos em estética dental'],
    problemTitle: 'Você se identifica com alguma dessas situações?',
    problems: [
      'Evitar sorrir de boca aberta em fotos, tapar a boca com a mão ou deletar fotos por causa dos dentes.',
      'Dentes com manchas internas, escurecimento por medicamento na infância ou cor irregular que nenhum clareamento consegue uniformizar.',
      'Dentes com tamanhos diferentes, pequenos espaços, bordas irregulares ou leves desalinhamentos que incomodam esteticamente.',
      'Receio de ficar com aspecto artificial — branco demais ou todos iguais. Querer melhorar sem que pareça que fez alguma coisa.'
    ],
    guideTitle: 'Como a Dra. Carla Christoph Planeja Suas Lentes',
    steps: [
      { title: 'Consulta e Análise Facial', description: 'Conversa sobre suas expectativas. Análise facial, fotografias e escaneamento digital para entender o que combina com o seu rosto.' },
      { title: 'Test Drive do Sorriso', description: 'Você experimenta um modelo provisório na boca antes de iniciar. Vê, sente e aprova. Se não gostar, ajustamos até ficar do seu jeito.' },
      { title: 'Confecção em Laboratório', description: 'Com o projeto aprovado, cada lente é confeccionada em porcelana de alta translucidez — o material que mais se aproxima da aparência natural dos dentes.' },
      { title: 'Cimentação e Resultado', description: 'As lentes são cimentadas com precisão pela Dra. Carla. Somente materiais de primeira linha são utilizados. Você sai sorrindo.' }
    ],
    testimonialsTitle: 'O Que Nossas Pacientes Contam',
    testimonials: [
      { name: 'Fernanda R. — Ipanema', text: 'Eu tinha pavor de ficar com aquele sorriso todo igual, artificial. A Dra. Carla fez questão de ajustar dente por dente. Ninguém percebe que são lentes — só elogiam o sorriso.' },
      { name: 'Cristina M. — Leblon', text: 'Fiz o Test Drive antes e vi exatamente como ia ficar. Isso me deu segurança para seguir. O resultado ficou tão natural que minha irmã quis fazer também.' },
      { name: 'André L. — Barra da Tijuca', text: 'Sempre tive os dentes manchados desde criança por causa de antibiótico. Nenhum clareamento resolvia. Com as lentes, finalmente tenho um sorriso que não preciso esconder.' }
    ],
    faqTitle: 'Dúvidas Frequentes sobre Lentes de Porcelana',
    faqs: [
      { q: 'Lente de contato dental dura quanto tempo?', a: 'Lentes de porcelana bem cuidadas duram em média 15 a 20 anos. A durabilidade depende dos hábitos do paciente — ranger os dentes e morder objetos duros são os principais fatores que reduzem a vida útil.' },
      { q: 'Qual a diferença entre lente de contato e faceta de porcelana?', a: 'A lente é mais fina (0,3 a 0,5mm) e exige pouco ou nenhum desgaste do dente. A faceta é levemente mais espessa e indicada quando há necessidade de correções maiores. Na consulta, avaliamos qual é a melhor opção para o seu caso.' },
      { q: 'Lente de porcelana estraga o dente?', a: 'Não. Na maioria dos casos, o preparo é mínimo ou até inexistente. O dente natural é preservado ao máximo. A porcelana é colada sobre o esmalte de forma permanente e segura.' },
      { q: 'Como funciona o Test Drive do Sorriso?', a: 'Antes de fazer qualquer desgaste, montamos uma simulação em resina sobre os seus dentes para você ver, tocar e aprovar o resultado. Se quiser ajustar formato, tamanho ou proporção, fazemos na hora.' },
      { q: 'Posso fazer lentes só nos dentes da frente?', a: 'Sim, a maioria dos casos envolve de 6 a 10 dentes superiores — os que aparecem no sorriso. A quantidade exata depende da largura do seu sorriso e do resultado desejado.' },
      { q: 'Dentes com restauração antiga podem receber lentes?', a: 'Depende do tamanho e estado da restauração. Em muitos casos, a lente pode cobrir e substituir restaurações escurecidas. Avaliamos caso a caso na consulta.' }
    ],
    ctaTitle: 'Quer Ver Como Seu Sorriso Pode Ficar?',
    ctaSubtitle: 'Agende sua consulta e faça o Test Drive do Sorriso antes de tomar qualquer decisão.',
    ctaText: 'Agendar Consulta com Test Drive',
    whatsappNumber: '5521993304045',
    whatsappMessage: 'Olá! Vi o site sobre lentes de porcelana e gostaria de agendar uma consulta para renovar meu sorriso.'
  },

  '/lp/facetas-resina-ipanema': {
    h1: 'Insatisfação com o Sorriso? Facetas de Resina em Ipanema — Resultado no Mesmo Dia',
    subhead: 'Facetas esculpidas diretamente no dente pela Dra. Carla Christoph. Você acompanha e aprova cada etapa antes de finalizar — sem pressa e sem surpresas.',
    benefits: ['Resultado no mesmo dia — uma única sessão', 'Procedimento minimamente invasivo', 'WhatsApp 24h — tire dúvidas agora', '20+ anos de experiência em estética dental'],
    problemTitle: 'Você Se Identifica com Alguma Dessas Situações?',
    problems: [
      'Um evento importante está se aproximando e você quer um sorriso mais bonito nas fotos.',
      'Seus dentes têm manchas, lascas ou espaços que te incomodam no dia a dia.',
      'Você quer melhorar a estética do sorriso, mas sem o investimento das lentes de porcelana no momento.',
      'Prefere um tratamento minimamente invasivo, que preserve ao máximo a estrutura dos seus dentes.',
      'Quer acompanhar e aprovar o resultado durante o procedimento — sem surpresas.',
      'Busca um atendimento com profissional experiente, em clínica especializada em Ipanema.'
    ],
    guideTitle: 'Como Funciona o Processo com a Dra. Carla Christoph',
    steps: [
      { title: 'Conversa Inicial', description: 'Mande uma mensagem no WhatsApp. Nós iremos entender o que te incomoda, tirar suas dúvidas e agendar um horário para você.' },
      { title: 'Consulta e Planejamento', description: 'Na consulta, a Dra. Carla examina seus dentes, ouve com atenção o que você deseja e explica o que é possível alcançar com as facetas de resina no seu caso — com total transparência.' },
      { title: 'Test Drive do Sorriso', description: 'Caso tenha dúvidas sobre o resultado, a Dra. Carla pode aplicar uma resina removível para que você visualize e aprove o resultado final antes de colocar a resina definitiva.' },
      { title: 'Escultura com Aprovação em Tempo Real', description: 'As facetas são esculpidas dente a dente, diretamente na sua boca. Você acompanha cada etapa e aprova o resultado antes de finalizar.' },
      { title: 'Acabamento e Polimento', description: 'A sessão termina com acabamento de alta precisão e polimento com brilho natural. Você sai no mesmo dia com o sorriso pronto e orientações claras de cuidados.' }
    ],
    testimonialsTitle: 'A Felicidade de um Sorriso Renovado no Mesmo Dia',
    testimonials: [
      { name: 'Camila R. — Ipanema', text: 'Tinha um casamento em duas semanas e estava infeliz com meus dentes. A Dra. Carla fez as facetas de resina em uma sessão. Me senti muito mais confiante nas fotos.' },
      { name: 'Pedro N. — Leblon', text: 'O processo de ver como ia ficar antes de fazer me deu muita segurança. O resultado ficou natural, ninguém diz que é resina.' },
      { name: 'Sofia L. — Copacabana', text: 'Eu queria fazer pequenos ajustes e o processo foi bem mais simples do que eu imaginava. O resultado ficou delicado e natural — exatamente como eu queria.' }
    ],
    faqTitle: 'Dúvidas Comuns sobre Facetas de Resina',
    faqs: [
      { q: 'Qual a durabilidade das facetas de resina?', a: 'Com os devidos cuidados e manutenções anuais (polimento), as facetas de resina compostas nanoparticuladas podem durar em média de 5 a 7 anos, mantendo a estética e o brilho.' },
      { q: 'A resina mancha com o tempo?', a: 'Resinas de alta performance, como as que utilizamos, têm alta resistência a manchas. No entanto, cuidados com alimentos muito pigmentados e o polimento anual são importantes para manter a cor estável por mais tempo.' },
      { q: 'Qual a principal diferença para a porcelana?', a: 'A resina é uma solução mais rápida (feita em 1 dia) e com um investimento mais acessível. A porcelana, feita em laboratório, oferece maior durabilidade (15+ anos) e resistência total a manchas, sendo um investimento a longo prazo.' },
      { q: 'Como saberei como ficará o resultado final?', a: 'Antes de qualquer trabalho definitivo, a Dra. Carla pode aplicar uma resina removível para que você visualize e aprove o resultado. Uma vez que esteja tudo aprovado, ela faz o trabalho com a resina definitiva, de alta performance.' },
      { q: 'Como funciona o agendamento?', a: 'Envie uma mensagem pelo WhatsApp descrevendo o que você deseja e nós iremos encontrar o melhor horário para você. A consulta com a Dra. Carla é feita sem pressa.' },
      { q: 'O atendimento é particular?', a: 'Sim. O atendimento da Dra. Carla é particular, o que permite dedicar tempo real ao seu caso e usar materiais de primeira linha. Emitimos recibo para solicitação de reembolso ao seu convênio, caso o seu plano permita.' }
    ],
    ctaTitle: 'Seu Sorriso Merece essa Atenção',
    ctaSubtitle: 'Mande uma mensagem no WhatsApp e converse com a equipe da Dra. Carla sobre as suas facetas. Consulta individual com tempo dedicado ao seu caso e resultado no mesmo dia.',
    ctaText: 'Quero Falar Sobre Minhas Facetas',
    whatsappNumber: '5521993304045',
    whatsappMessage: 'Olá! Vi no site sobre facetas de resina e gostaria de agendar uma consulta com a Dra. Carla.'
  },

  '/en/lp/cosmetic-dentistry': {
    h1: 'Regain Confidence in Your Smile — in Ipanema, Rio de Janeiro',
    subhead: 'Cosmetic dentistry by Dr. Carla Christoph — specialist in prosthodontics with 20+ years in Ipanema. Same dentist from start to finish.',
    benefits: ['20+ years of cosmetic dentistry experience', 'Digital smile planning with iTero 5D scanner', 'Same dentist from start to finish', 'Minimum 1-hour appointments — no rushed procedures', 'Smile Test Drive — try your new smile before committing', 'We reply in your language via WhatsApp'],
    problemTitle: 'Does any of this sound familiar?',
    problems: [
      'Stained or discolored teeth from years of coffee, wine, or tea — the yellowing happens so gradually you only notice when you see an old photo.',
      'Chipped, worn, or uneven teeth that make you self-conscious in photos or meetings — you have learned to smile with your lips closed.',
      'Old dental work that looks obvious — dark metal edges, bulky crowns, or fillings that do not match your natural teeth.',
      'Fear of overtreatment abroad — you want honest, conservative dentistry, not unnecessary procedures.'
    ],
    guideTitle: 'How Dr. Carla Christoph Approaches Cosmetic Dentistry',
    steps: [
      { title: 'Digital Assessment', description: 'Full examination with iTero Element 5D scanner — 3D digital impressions with no gooey molds. We identify the exact issues and discuss realistic options.' },
      { title: 'Smile Test Drive', description: 'For veneers and smile design cases, Dr. Carla applies non-adherent resin directly on your teeth so you can see, feel, and approve the final shape in your own mouth — before any permanent work begins.' },
      { title: 'Precise Treatment', description: 'Whether porcelain veneers, professional whitening, or composite bonding — each procedure is performed with magnification and meticulous attention to detail.' },
      { title: 'Follow-Up & Care', description: 'Digital records are shared via WhatsApp. If you return home, we continue monitoring remotely. Your treatment does not end when you leave the chair.' }
    ],
    testimonialsTitle: 'What Our Patients Say',
    testimonials: [
      { name: 'Gerald G. — United Kingdom', text: 'Excellent dentist, very gentle, calm and will explain the process with you. The office space is very clean. The outcome was brilliant.' },
      { name: 'Haley H. — International Patient', text: 'Amazing experience! Had pain and she completely resolved my problem and fixed a chipped tooth! My new tooth looks great.' },
      { name: 'Marina P. — Ipanema', text: 'I wanted to change my smile but did not know if I needed veneers or whitening. Dr. Carla evaluated everything and recommended whitening plus 4 restorations. It turned out natural and beautiful.' }
    ],
    faqTitle: 'Common Questions from International Patients',
    faqs: [
      { q: 'Is it safe to get dental work done in Brazil?', a: 'Absolutely. Brazilian dentistry is world-renowned for its quality. Dr. Carla Christoph is registered with CRO-RJ (27.509) and uses only FDA-approved materials and CE-marked equipment, including the iTero Element 5D digital scanner.' },
      { q: 'How many appointments will I need for veneers?', a: 'Porcelain veneers typically require 2-3 appointments over 7-10 days. The first visit includes the digital scan, smile design, and tooth preparation. The final visit is for bonding the veneers.' },
      { q: 'Do you accept international insurance?', a: 'We provide detailed invoices with procedure codes that most international insurance providers accept for reimbursement. Payment is made directly to the clinic, and you submit the documentation to your insurer.' },
      { q: 'What if I have a problem after I return home?', a: 'We maintain contact via WhatsApp after your treatment. If any issue arises, we can consult remotely with photos and video.' },
      { q: 'Can I get a virtual consultation before traveling?', a: 'Yes. Send us photos and a description of what you would like to improve via WhatsApp. Dr. Carla will review your case and provide an initial assessment with estimated timeline and investment.' }
    ],
    ctaTitle: 'Ready to Improve Your Smile in Ipanema?',
    ctaSubtitle: 'Send us a message on WhatsApp with a photo of your smile. Dr. Carla will personally review your case and respond — in your language.',
    ctaText: 'Book Your Consultation',
    whatsappNumber: '5521993304045',
    whatsappMessage: "Hello! I'm interested in cosmetic dentistry with Dr. Carla Christoph. Can you help me?"
  },

  '/en/lp/dental-implants': {
    h1: 'Replace Missing Teeth with Confidence — in Ipanema, Rio de Janeiro',
    subhead: 'Dental implants by Dr. Carla Christoph — specialist in prosthodontics and implant dentistry with 20+ years in Ipanema. 3D digital planning for predictable, lasting results.',
    benefits: ['Specialist in implant dentistry — 20+ years of experience', '3D digital planning with iTero 5D scanner', 'Same dentist from planning to final prosthesis', 'Minimum 1-hour appointments — no rushed procedures', 'Internationally recognized implant brands', 'We reply in your language via WhatsApp'],
    problemTitle: 'Does any of this sound familiar?',
    problems: [
      'You avoid certain foods because chewing is painful or your denture loosens — meals that used to be enjoyable now feel like a challenge.',
      'You feel self-conscious about gaps in your smile — you have stopped smiling in photos or cover your mouth when laughing.',
      'Your removable denture requires daily adhesive and still slips when you speak — you have adapted, but it is exhausting.',
      'You have been told you need bone grafting and are unsure if implants are even possible — you want an honest, realistic assessment.'
    ],
    guideTitle: 'How Dr. Carla Christoph Approaches Dental Implants',
    steps: [
      { title: 'Digital Assessment & Planning', description: 'Full examination with iTero Element 5D scanner and imaging analysis. We evaluate bone quality, quantity, and overall health to determine the best implant strategy for your case.' },
      { title: 'Implant Placement', description: 'Minimally invasive surgery under local anesthesia. The titanium implant is precisely positioned based on digital planning. Provisional prosthesis provided when indicated.' },
      { title: 'Osseointegration Period', description: '3 to 6 months for the implant to fuse with your jawbone. You wear a provisional prosthesis during this time. Dr. Carla monitors healing via periodic check-ups.' },
      { title: 'Final Prosthesis & Follow-Up', description: 'Digital impression for your definitive ceramic crown, bridge, or full-arch prosthesis. Natural color, shape, and function restored. Remote follow-up available via WhatsApp after you return home.' }
    ],
    testimonialsTitle: 'What Our Patients Say',
    testimonials: [
      { name: 'Gerald G. — United Kingdom', text: 'Excellent dentist, very gentle, calm and will explain the process with you. The office space is very clean. The outcome was brilliant.' },
      { name: 'Haley H. — International Patient', text: 'Amazing experience! Had pain and she completely resolved my problem and fixed a chipped tooth!' },
      { name: 'Marina P. — Ipanema', text: 'I needed a full rehabilitation with implants and prosthetics. Dr. Carla planned everything digitally and the result exceeded my expectations.' }
    ],
    faqTitle: 'Common Questions About Dental Implants',
    faqs: [
      { q: 'Is it safe to get dental implants in Brazil?', a: 'Absolutely. Brazilian implant dentistry is world-renowned. Dr. Carla Christoph is registered with CRO-RJ (27.509), uses internationally recognized implant brands with FDA clearance, and follows strict sterilization protocols that meet international standards.' },
      { q: 'How many appointments will I need?', a: 'The initial evaluation and implant placement typically require 2-3 visits over a few days. After the osseointegration period (3-6 months), you will return for 2-3 more visits for the final prosthesis.' },
      { q: 'Is the implant procedure painful?', a: 'The surgery is performed under local anesthesia — you feel no pain during the procedure. Post-operative recovery is generally smooth, with mild discomfort managed by medication.' },
      { q: 'Can I get implants if I have limited bone?', a: 'Yes. Bone grafting techniques or sinus lift procedures can increase bone volume when needed. Short or angled implants are also alternatives. Imaging analysis during your evaluation determines the best approach.' },
      { q: 'What if I have a problem after I return home?', a: 'We maintain contact via WhatsApp after your treatment. If any issue arises, we consult remotely with photos and video.' },
      { q: 'Can I get a virtual consultation before traveling?', a: 'Yes. Send us photos and X-rays via WhatsApp. Dr. Carla will review your case and provide an initial assessment with estimated timeline and treatment plan.' }
    ],
    ctaTitle: 'Ready to Restore Your Smile with Dental Implants?',
    ctaSubtitle: 'Send us a message on WhatsApp with your X-rays or a photo. Dr. Carla will personally review your case and respond — in your language.',
    ctaText: 'Book Your Implant Consultation',
    whatsappNumber: '5521993304045',
    whatsappMessage: "Hello! I'm interested in dental implants with Dr. Carla Christoph. Can you help me?"
  },

  '/en/lp/dental-emergency': {
    h1: 'Dental Emergency in Rio? Same-Day Care in Ipanema',
    subhead: 'Toothache, broken tooth, or lost crown while traveling? Dr. Carla Christoph sees emergency patients during business hours — Mon-Fri, 9 AM-6 PM. WhatsApp monitored around the clock.',
    benefits: ['Same-day emergency appointments when available', 'WhatsApp monitored around the clock — we respond quickly', '20+ years of clinical experience in Ipanema', 'Private practice — no waiting rooms, no rushed care', 'Digital X-rays and iTero 5D scanner on-site', 'We reply in your language'],
    problemTitle: 'What happened?',
    problems: [
      'You have a severe toothache that will not go away — throbbing pain that is keeping you from eating, sleeping, or enjoying your trip.',
      'You broke or chipped a tooth from an accident or biting something hard — the exposed area is sharp, sensitive, or painful.',
      'A crown or filling came loose — the tooth underneath is exposed and sensitive, and you are not sure if it can be re-cemented.',
      'You notice swelling, pus, or a bump on your gums — this may indicate a dental abscess that requires prompt treatment to prevent the infection from spreading.'
    ],
    guideTitle: 'What to Do Right Now',
    steps: [
      { title: 'Message Us on WhatsApp', description: 'Describe your situation and send a photo if possible. We monitor messages around the clock and will respond with guidance and an appointment time.' },
      { title: 'Manage Your Pain', description: 'Take an over-the-counter painkiller (ibuprofen, paracetamol). Apply a cold compress to the outside of your cheek if there is swelling. Avoid very hot or cold foods.' },
      { title: 'Save Any Broken Pieces', description: 'If a tooth broke, save the fragments. If a crown came loose, keep it — it may be re-cemented. If a tooth was knocked out, keep it in milk and contact us immediately.' },
      { title: 'Come to Our Office', description: 'We will see you as soon as possible during business hours. Dr. Carla will examine your situation, take digital X-rays, and provide immediate treatment or a clear plan.' }
    ],
    testimonialsTitle: 'What Our Patients Say',
    testimonials: [
      { name: 'Haley H. — International Patient', text: 'Amazing experience! Had pain and she completely resolved my problem and fixed a chipped tooth! My new tooth looks great. I am super happy with her services!' },
      { name: 'Gerald G. — United Kingdom', text: 'Excellent dentist, very gentle, calm and will explain the process with you. The office space is very clean. I had 2 sensitive teeth and she managed to rectify that for me.' }
    ],
    faqTitle: 'Common Questions About Dental Emergencies',
    faqs: [
      { q: 'What should I do if I have a dental emergency in Ipanema?', a: 'Contact us via WhatsApp immediately. We accommodate emergency patients during business hours (Monday-Friday, 9 AM-6 PM). Describe your situation and we will prioritize your appointment.' },
      { q: 'Can I be seen the same day?', a: 'We do our best to accommodate dental emergencies on the same day. Contact us as early as possible to improve your chances of same-day care.' },
      { q: 'What if my emergency happens after hours or on a weekend?', a: 'Send us a WhatsApp message describing your situation. Our team monitors messages around the clock and will respond with guidance and schedule your appointment for the earliest available time.' },
      { q: "I'm visiting Rio as a tourist. Can you help?", a: 'Absolutely. We regularly see patients visiting Rio de Janeiro who need urgent dental care. We communicate in English, Spanish, and Portuguese. Contact us via WhatsApp and we will do our best to fit you in quickly.' },
      { q: 'How much does emergency treatment cost?', a: 'The cost depends on the type of treatment needed. We provide transparent pricing before any procedure begins. As a private practice, we do not accept insurance, but we ensure you receive dedicated, unhurried care.' },
      { q: 'What types of emergencies do you treat?', a: 'We treat severe toothaches, broken or chipped teeth, lost crowns and fillings, dental abscesses, knocked-out teeth, and post-operative complications.' }
    ],
    ctaTitle: 'Do not Wait — Get Help Now',
    ctaSubtitle: 'Dental emergencies can worsen quickly. Send us a WhatsApp message and we will do our best to see you as soon as possible.',
    ctaText: 'WhatsApp Now',
    whatsappNumber: '5521993304045',
    whatsappMessage: 'Hello! I have a dental emergency and need to be seen as soon as possible.'
  },

  '/en/lp/general-consultation': {
    h1: 'Your Dentist in Ipanema — Checkups, Cleaning & Preventive Care',
    subhead: 'Comprehensive dental exams with 3D digital scanning, professional cleaning, and personalized care plans — all in a private practice that dedicates a minimum of 1 full hour to every appointment.',
    benefits: ['1-hour minimum appointments — never rushed', 'iTero Element 5D digital scanner — no traditional molds', '20+ years of clinical experience in Ipanema', 'Private practice — personalized, one-on-one attention', 'Fluent in English, Portuguese & Spanish', 'Transparent pricing — no surprises'],
    problemTitle: 'Why Patients Put Off Checkups',
    problems: [
      'I just do not have time for the dentist. — We respect your schedule. Appointments are punctual, efficient, and completed within 1 hour — including cleaning and exam.',
      'Nothing hurts, so I must be fine. — Most dental problems are painless in the early stages. Cavities, gum disease, and even cracks develop silently until they become expensive to treat.',
      'I had a bad experience before. — We hear this often. Dr. Carla explains every step before proceeding and creates a calm, unhurried environment with no pressure.',
      'I am only in Rio temporarily — can I even see a dentist? — Absolutely. Many of our patients are expats, digital nomads, and tourists. We communicate in your language and provide all documentation you need.'
    ],
    guideTitle: 'What to Expect at Your Appointment',
    steps: [
      { title: '3D Digital Scan', description: 'We begin with a full intraoral scan using the iTero Element 5D — capturing a precise 3D model of your teeth, gums, and bite alignment without radiation or discomfort.' },
      { title: 'Clinical Examination', description: 'Dr. Carla performs a thorough inspection of each tooth, checking for cavities, cracks, gum recession, and early signs of oral conditions.' },
      { title: 'Professional Cleaning', description: 'Ultrasonic scaling removes tartar and plaque — especially in areas brushing and flossing cannot reach — followed by polishing for a smooth, fresh feel.' },
      { title: 'Prevention Plan', description: 'Based on the findings, we create a personalized plan: recommended visit schedule, any needed treatments with clear pricing, and oral hygiene guidance.' }
    ],
    testimonialsTitle: 'What Our Patients Say',
    testimonials: [
      { name: 'Gerald G. — United Kingdom', text: 'Excellent dentist, very gentle, calm and will explain the process with you. The office space is very clean. I had 2 sensitive teeth and she managed to rectify that for me.' },
      { name: 'Haley H. — International Patient', text: 'Amazing experience! Had pain and she completely resolved my problem and fixed a chipped tooth! My new tooth looks great.' }
    ],
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What does a dental checkup include?', a: 'A comprehensive exam including clinical inspection, digital 3D scan with the iTero Element 5D, risk assessment for cavities and gum disease, professional cleaning (scaling and polishing), and personalized oral hygiene guidance.' },
      { q: 'How often should I schedule a checkup?', a: 'For most adults, every 6 months is recommended. Patients with a history of gum disease or higher cavity risk may benefit from visits every 3-4 months.' },
      { q: 'Does dental cleaning hurt?', a: 'Ultrasonic cleaning is very comfortable — most patients describe only a mild vibration. For very sensitive areas, we can apply topical numbing gel.' },
      { q: 'Do you accept dental insurance?', a: 'We are a private practice. This allows us to dedicate proper time to each patient and use only high-quality materials. We provide clear, detailed cost estimates before any treatment begins.' },
      { q: 'What should I bring to my first appointment?', a: 'Bring any recent dental X-rays or records you may have and a list of medications you are currently taking. If you do not have any of these, no worries — we will gather everything we need during your visit.' },
      { q: 'How long does a checkup appointment take?', a: 'We dedicate a minimum of 1 hour for every checkup. This ensures time for a thorough examination, unhurried cleaning, and a proper discussion of findings and any treatment options.' }
    ],
    ctaTitle: 'Due for a Checkup?',
    ctaSubtitle: 'Prevention is the most intelligent investment in oral health. Book your exam and cleaning — we will take the time to explain everything we find.',
    ctaText: 'Book on WhatsApp',
    whatsappNumber: '5521993304045',
    whatsappMessage: "Hello! I'd like to book a dental checkup with Dr. Carla Christoph."
  }
};

// ============================================================
// PAGE GENERATOR
// ============================================================

const ROUTE_HERO_MAP = {
  '/lp/consulta-inicial': '/lovable-uploads/RIT08058-vertical-doutora-site',
  '/en/lp/general-consultation': '/lovable-uploads/dra-carla-jaleco-bracos-cruzados',
  '/lp/especialista-protese-ipanema': '/lovable-uploads/dra-carla-jaleco-bracos-cruzados',
  '/lp/facetas-resina-ipanema': '/lovable-uploads/dra-carla-jaleco-bracos-cruzados',
  '/lp/clareamento-dental': '/lovable-uploads/doutora-em-pe-jaleco',
  '/lp/limpeza-dental-ipanema': '/lovable-uploads/vertical-de-jaleco',
  '/lp/profilaxia-dental-ipanema': '/lovable-uploads/vertical-de-jaleco',
  '/lp/saude-gengival-ipanema': '/lovable-uploads/dra-carla-jaleco-bracos-cruzados',
  '/lp/ortodontia-ipanema': '/lovable-uploads/DrBruno_site',
  '/lp/implantes-dentarios-ipanema': '/lovable-uploads/dra-carla-jaleco-bracos-cruzados',
  '/lp/dor-de-dente-urgencia-ipanema': '/lovable-uploads/dra-carla-jaleco-bracos-cruzados',
  '/lp/dente-quebrado-urgencia-ipanema': '/lovable-uploads/dra-carla-jaleco-bracos-cruzados',
  '/lp/emergencia-odontologica-ipanema': '/lovable-uploads/dra-carla-jaleco-bracos-cruzados',
  '/en/lp/cosmetic-dentistry': '/lovable-uploads/dra-carla-jaleco-bracos-cruzados',
  '/en/lp/dental-implants': '/lovable-uploads/dra-carla-jaleco-bracos-cruzados',
  '/en/lp/dental-emergency': '/lovable-uploads/dra-carla-jaleco-bracos-cruzados',
  '/lp/lentes-porcelana-ipanema': '/lovable-uploads/dra-carla-jaleco-bracos-cruzados',
  '/lp/lentes-profissional-ipanema': '/lovable-uploads/dra-carla-jaleco-bracos-cruzados',
};


function generatePage(routePath, meta, options = {}) {
  const { noindex = false, schemas = [], fallbackContent = '', lang = 'pt-BR' } = options;
  let html = indexHtml;

  const fullUrl = BASE_URL + routePath;

  // Replace LCP hero preload based on route
  const heroImageBase = ROUTE_HERO_MAP[routePath];
  if (heroImageBase) {
    const specificPreload = `<!-- Hero image preload responsivo (LCP element) -->
  <link rel="preload" as="image" type="image/avif"
    imagesrcset="${heroImageBase}-480.avif 480w, ${heroImageBase}-1024.avif 1024w"
    imagesizes="(max-width:767px) 100vw, (min-width:768px) 50vw, 40vw" fetchpriority="high" />`;
    
    html = html.replace(
      /<!-- Hero image preload responsivo \(LCP element\) -->\s*<link rel="preload" as="image" type="image\/avif"[\s\S]*?\/>/,
      specificPreload
    );
  } else if (routePath !== '/') {
    // Remove hero preload for non-home pages to save bandwidth
    html = html.replace(
      /<!-- Hero image preload responsivo \(LCP element\) -->\s*<link rel="preload" as="image" type="image\/avif"[\s\S]*?\/>/,
      ''
    );
  } else {
    // Sprint 5: Home page — inject custom preload matching Hero.tsx <picture> sizes
    // Home hero files use 560w/800w/840w pattern (NOT the 480/1024 pattern of LPs)
    const homePreload = `<!-- Hero image preload responsivo (LCP element) -->
  <link rel="preload" as="image" type="image/avif"
    imagesrcset="/lovable-uploads/hero-560w.avif 560w, /lovable-uploads/hero-800w.avif 800w, /lovable-uploads/hero-840w.avif 840w"
    imagesizes="(max-width: 640px) 280px, (max-width: 768px) 320px, (max-width: 1024px) 400px, 460px" fetchpriority="high" />`;
    // Try to replace existing preload first, otherwise inject before </head>
    const preloadRegex = /<!-- Hero image preload responsivo \(LCP element\) -->\s*<link rel="preload" as="image" type="image\/avif"[\s\S]*?\/>/;
    if (preloadRegex.test(html)) {
      html = html.replace(preloadRegex, homePreload);
    } else {
      html = html.replace('</head>', homePreload + '\n</head>');
    }
  }

  // Replace title
  html = html.replace(
    /<title>.*?<\/title>/,
    '<title>' + meta.title + '</title>'
  );

  // Replace meta description
  html = html.replace(
    /<meta name="description" content="[^"]*"/,
    '<meta name="description" content="' + meta.description + '"'
  );

  // Replace existing OG tags
  html = html.replace(
    /<meta property="og:title" content="[^"]*" \/>/,
    '<meta property="og:title" content="' + meta.title + '" />'
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*" \/>/,
    '<meta property="og:description" content="' + meta.description + '" />'
  );

  // Build extra tags
  const extraTags = [
    '<meta property="og:url" content="' + fullUrl + '" />',
    '<meta property="og:image" content="' + OG_IMAGE + '" />',
    '<meta property="og:site_name" content="Dra. Carla Christoph" />',
    '<meta property="og:locale" content="' + (lang === 'en' ? 'en_US' : 'pt_BR') + '" />',
    '<meta name="twitter:card" content="summary_large_image" />',
    '<meta name="twitter:title" content="' + meta.title + '" />',
    '<meta name="twitter:description" content="' + meta.description + '" />',
    '<meta name="twitter:image" content="' + OG_IMAGE + '" />',
    '<link rel="canonical" href="' + fullUrl + '" />',
  ];

  if (noindex) {
    extraTags.push('<meta name="robots" content="noindex, nofollow" />');
  }

  // Add JSON-LD schemas
  for (const schema of schemas) {
    extraTags.push('<script type="application/ld+json">' + schema + '</script>');
  }

  html = html.replace('</head>', '    ' + extraTags.join('\n    ') + '\n  </head>');

  // Inject fallback content into <div id="root">
  if (fallbackContent) {
    html = html.replace(
      '<div id="root"></div>',
      '<div id="root">' + fallbackContent + '</div>'
    );
  }

  // Sprint 8: Filter modulepreloads to remove unused chunks on specific routes
  const isEnRoute = routePath.startsWith('/en');
  if (!isEnRoute) {
    // Remove English LP chunks from Portuguese pages and Homepage
    html = html.replace(/<link rel="modulepreload"[^>]*?href="[^"]*?en-landing-bundle[^"]*?"[^>]*?>\s*/gi, '');
  }
  
  if (routePath === '/') {
    // Homepage does not use any LP chunks (Portuguese or English)
    html = html.replace(/<link rel="modulepreload"[^>]*?href="[^"]*?en-landing-bundle[^"]*?"[^>]*?>\s*/gi, '');
    html = html.replace(/<link rel="modulepreload"[^>]*?href="[^"]*?consulta-critical[^"]*?"[^>]*?>\s*/gi, '');
    html = html.replace(/<link rel="modulepreload"[^>]*?href="[^"]*?landing-hero[^"]*?"[^>]*?>\s*/gi, '');
    html = html.replace(/<link rel="modulepreload"[^>]*?href="[^"]*?landing-header[^"]*?"[^>]*?>\s*/gi, '');
    html = html.replace(/<link rel="modulepreload"[^>]*?href="[^"]*?landing-lazy-[^"]*?"[^>]*?>\s*/gi, '');
  }

  return html;
}

// ============================================================
// MAIN EXECUTION
// ============================================================

const distDir = path.join(__dirname, '..', 'dist');
const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

let count = 0;

// 1. Service pages (full schemas + fallback content)
for (const [routePath, data] of Object.entries(servicePages)) {
  // NOTE: FAQPage schema intentionally NOT included here.
  // Each service page .tsx already renders FAQPage via React Helmet.
  // Including it here too caused Google to flag 14 "FAQPage duplicated" errors.
  // See: GSC audit report 04/Mar/2026
  const schemas = [
    generateMedicalProcedureSchema(data, routePath),
    generateDentistSchema()
  ];
  const fallbackContent = generateFallbackHTML(data, routePath);

  const filePath = path.join(distDir, routePath + '.html');
  const fileDir = path.dirname(filePath);
  fs.mkdirSync(fileDir, { recursive: true });
  fs.writeFileSync(filePath, generatePage(routePath, data, { schemas, fallbackContent }));
  count++;
  console.log('Generated (service + schemas): ' + routePath + '.html');
}

// 2. Info pages (Dentist schema + light fallback)
for (const [routePath, data] of Object.entries(infoPages)) {
  const schemas = [generateDentistSchema()];
  const fallbackContent = generateInfoFallbackHTML(data);

  const filePath = path.join(distDir, routePath + '.html');
  const fileDir = path.dirname(filePath);
  fs.mkdirSync(fileDir, { recursive: true });
  fs.writeFileSync(filePath, generatePage(routePath, data, { schemas, fallbackContent }));
  count++;
  console.log('Generated (info + schema): ' + routePath + '.html');
}

// 3. English pages (Dentist schema + fallback, lang=en)
for (const [routePath, data] of Object.entries(englishPages)) {
  const schemas = [generateDentistSchema()];
  const fallbackContent = generateInfoFallbackHTML(data);

  const filePath = path.join(distDir, routePath + '.html');
  const fileDir = path.dirname(filePath);
  fs.mkdirSync(fileDir, { recursive: true });
  fs.writeFileSync(filePath, generatePage(routePath, data, { schemas, fallbackContent, lang: 'en' }));
  count++;
  console.log('Generated (english): ' + routePath + '.html');
}

// 4. Landing pages (noindex + rich fallback HTML for QS crawler)
for (const [routePath, meta] of Object.entries(landingPages)) {
  const filePath = path.join(distDir, routePath + '.html');
  const fileDir = path.dirname(filePath);
  fs.mkdirSync(fileDir, { recursive: true });

  const isEn = routePath.startsWith('/en/');
  const lang = isEn ? 'en' : 'pt-BR';
  const content = landingPageContent[routePath];
  const fallbackContent = content ? generateLPFallbackHTML(content, lang) : '';

  fs.writeFileSync(filePath, generatePage(routePath, meta, { noindex: true, fallbackContent, lang }));
  count++;
  console.log('Generated (LP ' + (fallbackContent ? 'full' : 'meta-only') + '): ' + routePath + '.html');
}

console.log('\nDone! Generated ' + count + ' static HTML files.');
console.log('  - ' + Object.keys(servicePages).length + ' service pages (with schemas + fallback content)');
console.log('  - ' + Object.keys(infoPages).length + ' info pages (with Dentist schema + fallback)');
console.log('  - ' + Object.keys(englishPages).length + ' english pages (lang=en, Dentist schema + fallback)');
console.log('  - ' + Object.keys(landingPages).length + ' landing pages (noindex + fallback HTML)');

// 5. Update dist/index.html (Home page fallback content for faster FCP/LCP)
// Sprint 6: Rewritten to match React layout (Header.tsx fixed + Hero.tsx full-viewport grid)
// ORIGINAL (pre-Sprint 6) used border-bottom header + max-width:800px — caused layout shift
console.log('\nUpdating dist/index.html for static Home LCP optimization...');
const homeFallback = `
<header style="position:fixed;top:0;left:0;right:0;z-index:60;background:#FAF7F2;padding:12px 24px;box-shadow:0 1px 3px 0 rgba(0,0,0,.1);font-family:system-ui,sans-serif">
  <a href="/" style="font-weight:bold;color:#381F47;text-decoration:none;font-size:1.1em">Dra. Carla Christoph</a>
</header>
<style>
  .fallback-hero-grid {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    align-items: center;
    width: 100%;
  }
  .fallback-image-wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  .fallback-image-container {
    width: 280px;
    height: 420px;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 8px 30px rgba(74,45,94,0.08);
    -webkit-mask-image: linear-gradient(to left, black 60%, transparent 100%), linear-gradient(to bottom, black 65%, transparent 100%);
    mask-image: linear-gradient(to left, black 60%, transparent 100%), linear-gradient(to bottom, black 65%, transparent 100%);
    -webkit-mask-composite: source-in;
    mask-composite: intersect;
  }
  .fallback-image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
  }
  @media (min-width: 640px) {
    .fallback-image-container {
      width: 320px;
      height: 480px;
    }
  }
  @media (min-width: 768px) {
    .fallback-image-container {
      width: 400px;
      height: 560px;
    }
  }
  @media (min-width: 1024px) {
    .fallback-hero-grid {
      grid-template-columns: 1.1fr 0.9fr;
      gap: 3rem;
    }
    .fallback-image-wrapper {
      justify-content: flex-end;
    }
    .fallback-image-container {
      width: 460px;
      height: 640px;
    }
  }
</style>
<section style="min-height:100vh;padding-top:112px;padding-bottom:4rem;display:flex;align-items:center;background:#FAF7F2;font-family:system-ui,sans-serif">
  <div class="fallback-hero-grid">
    <div>
      <p style="font-size:.75rem;text-transform:uppercase;letter-spacing:.2em;color:#B3955F;margin-bottom:1rem;font-weight:500">Especialista em Prótese e Implantodontia</p>
      <h1 style="font-size:clamp(1.875rem,5vw,3rem);font-weight:700;line-height:1.2;color:#381F47;margin-bottom:1.5rem;font-family:serif">Dentista em Ipanema Especializada em Reabilitação Oral e <span style="color:#B3955F">Estética Natural</span></h1>
      <p style="font-size:1.125rem;color:#333;margin-bottom:2rem;line-height:1.6;max-width:32rem">Para quem busca tratamento odontológico sem pressa, com mínimo desconforto e com resultado que parece natural</p>
      <div style="display:flex;flex-wrap:wrap;gap:.75rem;margin-bottom:2.5rem">
        <span style="font-size:.75rem;text-transform:uppercase;letter-spacing:.15em;color:#B3955F;font-weight:500">● 20+ anos em Ipanema</span>
        <span style="font-size:.75rem;text-transform:uppercase;letter-spacing:.15em;color:#B3955F;font-weight:500">● CRO-RJ 27.509</span>
        <span style="font-size:.75rem;text-transform:uppercase;letter-spacing:.15em;color:#B3955F;font-weight:500">● 1h+ por consulta</span>
      </div>
      <a href="https://wa.me/5521993304045?text=Ol%C3%A1!%20Vi%20o%20site%20e%20gostaria%20de%20agendar%20uma%20consulta." style="display:inline-block;padding:1rem 2rem;background:#B3955F;color:#fff;text-decoration:none;border-radius:.375rem;font-weight:500;font-size:1rem;box-shadow:0 4px 6px -1px rgba(0,0,0,.1)">Agendar minha consulta</a>
    </div>
    <div class="fallback-image-wrapper">
      <div class="fallback-image-container">
        <picture>
          <source srcset="/lovable-uploads/hero-560w.avif 560w, /lovable-uploads/hero-800w.avif 800w, /lovable-uploads/hero-840w.avif 840w" sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, (max-width: 1024px) 400px, 460px" type="image/avif" />
          <source srcset="/lovable-uploads/hero-560w.webp 560w, /lovable-uploads/hero-800w.webp 800w, /lovable-uploads/hero-840w.webp 840w" sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, (max-width: 1024px) 400px, 460px" type="image/webp" />
          <img src="/lovable-uploads/729cc6a8-3563-45af-9e82-3581b91c7d7e.png" alt="Dra. Carla Christoph, dentista especialista em Ipanema" width="460" height="640" fetchpriority="high" decoding="async" />
        </picture>
      </div>
    </div>
  </div>
</section>
`;

const updatedHomeHtml = indexHtml.replace('<div id="root"></div>', '<div id="root">' + homeFallback + '</div>');
fs.writeFileSync(path.join(distDir, 'index.html'), updatedHomeHtml);
console.log('✅ Success: Inlined Home LCP hero in dist/index.html (Sprint 6 layout)');



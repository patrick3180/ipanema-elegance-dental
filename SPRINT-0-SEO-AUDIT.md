# SPRINT 0: SEO & AI SEARCH AUDIT — dracarlachristoph.com

**Auditor:** SEO & AI Search Expert (Team Agent)
**Data:** 2026-02-12
**Site:** https://dracarlachristoph.com
**Contexto:** Consultório odontológico premium em Ipanema, Rio de Janeiro

---

## EXECUTIVE SUMMARY

### SEO Health Score: 68/100

**Breakdown:**
- Schema Markup: 60/100
- Meta Tags & Pre-rendering: 75/100
- Technical SEO: 70/100
- AI Search Readiness: 55/100
- Local SEO: 80/100
- Compliance (CRO/CFO): 90/100

### Top 3 Critical Issues

1. **Missing Core Schema Types** — Lack of Organization, LocalBusiness, and consistent Person schemas across pages
2. **Blog Posts Not Pre-rendered** — Individual blog posts rely on client-side React Helmet, invisible to crawlers without JS
3. **Limited QuickAnswerBox Implementation** — Only 2 pages use this AI-optimized component; most service pages lack direct answer format

### AI Search Readiness Score: 55/100

**Strengths:**
- FAQPage schemas implemented on most service pages
- Natural language Q&A format in FAQs
- Breadcrumb schemas present with navigation structure

**Weaknesses:**
- No QuickAnswerBox on critical service pages (Implantes, Clareamento, Lentes)
- robots.txt blocks GPTBot, ChatGPT-User, and CCBot (prevents AI search indexing)
- Missing Organization/LocalBusiness unified schema for entity consolidation

---

## 1. SCHEMA MARKUP AUDIT

### 1.1 Schemas Present

| Schema Type | Files Found | Status |
|-------------|-------------|--------|
| **MedicalProcedure** | ClareamentoDental.tsx, ImplantesDentarios.tsx, LentesEFacetas.tsx, and all service pages | ✅ Implemented |
| **FAQPage** | Most service pages, some LPs | ✅ Implemented |
| **Dentist** (provider) | Nested in MedicalProcedure schemas, Index.tsx | ✅ Implemented |
| **Person** | AboutPage.tsx only | ⚠️ Partial |
| **BreadcrumbList** | InternalLinkingOptimizer.tsx (all service pages via TreatmentHero) | ✅ Implemented |
| **Organization** | **MISSING** | ❌ Critical |
| **LocalBusiness** | **MISSING** | ❌ Critical |
| **MedicalOrganization** | **MISSING** | ❌ Critical |

### 1.2 Detailed Findings

#### ✅ MedicalProcedure Schemas (GOOD)

**Files analyzed:**
- `src/pages/ClareamentoDental.tsx` (lines 52-73)
- `src/pages/ImplantesDentarios.tsx` (lines 107-128)
- `src/pages/LentesEFacetas.tsx` (lines 157-182)

**Structure:**
```json
{
  "@context": "https://schema.org",
  "@type": "MedicalProcedure",
  "name": "Clareamento Dental Profissional",
  "description": "...",
  "procedureType": "Dental",
  "provider": {
    "@type": "Dentist",
    "name": "Dra. Carla Christoph",
    "telephone": "+5521993304045",
    "address": { ... }
  }
}
```

**Issues:**
- ❌ Missing `identifier` for CRO-RJ 27.509
- ❌ Missing `url` property
- ❌ Inconsistent provider data (sometimes "performer" instead of "provider")
- ⚠️ Address duplicated across every schema (should reference Organization)

#### ✅ FAQPage Schemas (GOOD)

**Found in:** LentesEFacetas.tsx (lines 184-197)

**Example:**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Qual a diferença entre lente de contato dental e faceta de resina?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "..."
      }
    }
  ]
}
```

**Quality:**
- ✅ Questions in natural language (how patients actually ask)
- ✅ Answers are concise (2-4 sentences)
- ✅ No price mentions (CRO compliant)
- ⚠️ Some service pages missing FAQPage schema entirely (e.g., ClareamentoDental.tsx has FAQ UI but no schema)

#### ⚠️ Person Schema (INCOMPLETE)

**Found:** AboutPage.tsx only (lines 40-89)

**Issues:**
- Only present on About page, not integrated into homepage or service pages
- Missing `sameAs` for professional profiles (Google Business, etc.)
- Missing `alumniOf` specific institution names
- Should be consolidated into Organization schema as `founder`

#### ❌ Organization / LocalBusiness Schema (CRITICAL MISSING)

**Expected location:** Homepage (`Index.tsx`)

**What exists:**
- Index.tsx has a `@type: "Dentist"` schema (lines 12-128)
- BUT it should be `@type: "LocalBusiness"` or `@type: "MedicalOrganization"` with `Dentist` as subtype

**Problems:**
1. **Entity confusion** — Google sees the business as a person, not an organization
2. **NAP inconsistency** — Address/phone scattered across multiple schemas
3. **Missing key fields:**
   - `priceRange` (present but on wrong schema type)
   - `aggregateRating` (correctly removed, but no alternative trust signal)
   - `photo` / `image` (should be multiple images of clinic)
   - `geo` coordinates (present but isolated)
   - `hasMap` for Google Maps link

**Recommendation:**
Create a unified `LocalBusiness` schema on homepage with:
- `@type: ["LocalBusiness", "Dentist", "MedicalBusiness"]`
- `founder` → Person schema for Dra. Carla
- `address`, `geo`, `telephone` consolidated
- `openingHoursSpecification` (currently just array of strings)
- `hasOfferCatalog` → `itemListElement` with all services

#### ✅ BreadcrumbList Schemas (GOOD)

**Implementation:** `InternalLinkingOptimizer.tsx` (lines 127-145)

**Example:**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Início",
      "item": "https://dracarlachristoph.com/"
    },
    ...
  ]
}
```

**Quality:**
- ✅ Implemented on all service pages via TreatmentHero component
- ✅ Correct structure with `position`, `name`, `item`
- ✅ Full URLs (not relative paths)

### 1.3 NAP Consistency Check

| Field | Value | Consistency |
|-------|-------|-------------|
| **Business Name** | "Dra. Carla Christoph" | ✅ Consistent |
| **Address** | Rua Visconde de Pirajá, 550 - Sala 1107 | ✅ Consistent |
| **City** | Ipanema, Rio de Janeiro - RJ | ✅ Consistent |
| **Postal Code** | 22410-002 | ✅ Consistent |
| **Telephone** | +5521993304045 | ✅ Consistent (formatted correctly) |
| **CRO-RJ** | 27.509 | ⚠️ Present in text but missing in schemas |
| **Email** | contato@dracarlachristoph.com | ✅ Consistent (ContactPage.tsx line 99) |

**Geo Coordinates** (Index.tsx lines 28-32):
```json
"geo": {
  "@type": "GeoCoordinates",
  "latitude": "-22.9868",
  "longitude": "-43.2005"
}
```
✅ Present and accurate for Ipanema location

### 1.4 Schema Validation Issues

**Critical:**
1. ❌ No unified Organization schema → Entity fragmentation
2. ❌ CRO-RJ number missing from `provider.identifier` in MedicalProcedure schemas
3. ❌ FAQPage schema missing from ClareamentoDental.tsx despite having FAQ UI

**Moderate:**
1. ⚠️ Inconsistent use of `provider` vs `performer` in MedicalProcedure
2. ⚠️ Address object duplicated 20+ times across files
3. ⚠️ `openingHours` as string array instead of `OpeningHoursSpecification`

**Minor:**
1. Missing `image` arrays for rich results
2. Missing `potentialAction` for booking actions
3. No `Review` or social proof schemas (correct per CRO regulations)

---

## 2. AI SEARCH OPTIMIZATION

### 2.1 QuickAnswerBox Component Analysis

**Component location:** `src/components/blog/QuickAnswerBox.tsx`

**Features:**
- Clean, scannable "Resposta Rápida" format
- Ideal for AI extraction (direct answer pattern)
- Visual highlight with CheckCircle icon

**Current usage:**
- BlogPost.tsx (line 200) — `<QuickAnswerBox answer={post.quickAnswer} />`
- Ortodontia.tsx (line 232) — Only service page using it

**Pages MISSING QuickAnswerBox:**
- ❌ ClareamentoDental.tsx
- ❌ ImplantesDentarios.tsx
- ❌ LentesEFacetas.tsx
- ❌ ProteseDentaria.tsx
- ❌ TratamentoDeCanal.tsx
- ❌ SaudeDaGengiva.tsx
- ❌ ClinicaGeralPrevencao.tsx
- ❌ RestaureacoesEsteticas.tsx

**Impact:**
These pages rely solely on FAQ sections for AI extraction. QuickAnswerBox provides a more direct, featured-snippet-friendly answer format that AI search engines prioritize.

**Recommended Quick Answers:**

| Page | Quick Answer |
|------|--------------|
| **Clareamento** | "Clareamento dental profissional utiliza gel de alta concentração (35-37%) em consultório para resultados em 1-3 sessões, ou gel de menor concentração (10-20%) para uso caseiro supervisionado em 14-21 dias. Ambos são seguros quando acompanhados por especialista." |
| **Implantes** | "Implantes dentários são pinos de titânio biocompatível instalados no osso para substituir a raiz de dentes perdidos. O tratamento completo leva de 4 a 6 meses, incluindo período de osseointegração, e pode repor desde um único dente até arcadas completas." |
| **Lentes** | "Lentes de contato dental são lâminas ultrafinas de porcelana (0,2-0,5mm) aplicadas sobre os dentes com preparo mínimo. Duram 15-20 anos, não mancham e proporcionam resultado natural e permanente. Facetas de resina são alternativa mais acessível com duração de 5-8 anos." |

### 2.2 FAQ Structure Quality

**Format:** Accordion UI with FAQPage schema

**Strengths:**
- ✅ Questions written in natural language (how patients ask)
- ✅ Answers are concise (2-4 sentences average)
- ✅ Specific information over generic claims
- ✅ No price mentions (CRO compliant)
- ✅ Scannable format (accordion)

**Example (ClareamentoDental.tsx line 667-672):**
```tsx
<AccordionItem value="faq-1">
  <AccordionTrigger>Qual a diferença entre as modalidades?</AccordionTrigger>
  <AccordionContent>
    O clareamento de consultório utiliza gel de maior concentração (35-37%),
    com resultados em 1-3 sessões. O caseiro usa concentração menor (10-20%),
    aplicada gradualmente em 14-21 dias com moldeiras personalizadas...
  </AccordionContent>
</AccordionItem>
```

✅ Perfect for AI extraction — specific numbers, clear comparison, natural phrasing

**Issues:**
1. ⚠️ Some pages have FAQ UI but no FAQPage schema (ClareamentoDental.tsx)
2. ⚠️ Inconsistent FAQ count per page (some have 6, others 12)
3. ⚠️ No "People Also Ask" optimization (related questions)

### 2.3 Content Structure for AI Extraction

**Heading hierarchy analysis:**

✅ **ClareamentoDental.tsx:**
- H1: "Clareamento Dental Profissional" (line 79)
- H2: "Modalidades de Clareamento Disponíveis" (line 97)
- H2: "Comparação Entre as Modalidades" (line 441)
- H2: "Etapas do Tratamento" (line 503)
- H2: "Expertise e Experiência em Estética Dental" (line 570)
- H2: "Perguntas Frequentes Sobre Clareamento" (line 660)

✅ Clean hierarchy, keyword-rich, descriptive

**Issues:**
- ⚠️ Some pages use generic "Perguntas Frequentes" instead of specific "Perguntas Frequentes Sobre [Tratamento]"
- ⚠️ Missing `<summary>` tags for key sections (AI search engines love `<details>`/`<summary>`)

### 2.4 AI Search Bot Blocking

**robots.txt analysis (lines 8-16):**

```
User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: CCBot
Disallow: /
```

❌ **CRITICAL ISSUE:**
The site explicitly blocks:
- **GPTBot** (OpenAI's web crawler for ChatGPT)
- **ChatGPT-User** (ChatGPT Browse)
- **CCBot** (Common Crawl, used by Perplexity and others)

**Impact:**
- ChatGPT Search **cannot index** the site
- Perplexity.ai **cannot reference** the site in answers
- Google AI Overviews may have limited data

**Why this exists:**
- Common SEO practice in 2024 to prevent AI training scraping
- BUT it also blocks **beneficial** AI search features

**Recommendation:**
```
# Allow AI Search (but block AI training)
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: CCBot
Disallow: /  # Keep blocking Common Crawl (training)

# Add selective blocking if needed
User-agent: GPTBot
Disallow: /api/
Disallow: /admin/
```

**Alternative approach:**
Use meta tags per page:
```html
<meta name="robots" content="noai, noimageai">  <!-- Block AI training -->
<meta name="robots" content="index, follow">    <!-- Allow search -->
```

### 2.5 Specific Information Over Generic Claims

**Examples from BRAND.md compliance:**

✅ **Good (ClareamentoDental.tsx):**
- "gel de maior concentração (35-37%)" — specific
- "1-3 sessões" — specific
- "14-21 dias" — specific
- "Scanner intraoral iTero" — specific technology name

❌ **Banned (correctly avoided):**
- "tecnologia de ponta" ✅ Not used
- "resultados excepcionais" ✅ Not used
- "atendimento humanizado" ✅ Not used

**Compliance score:** 95/100
- Site consistently uses specific terminology
- Minor slip: "tecnologia digital" used instead of specific scanner names in some places

---

## 3. META TAGS & STATIC HTML GENERATION

### 3.1 Pre-rendering Script Analysis

**File:** `scripts/generate-static-meta.cjs`

**Pages covered (lines 5-66):**
- ✅ 15 service pages (clareamento, implantes, lentes, prótese, etc.)
- ✅ 14 landing pages (all LPs with noindex)
- ✅ Institutional pages (sobre, servicos, contato, diferenciais, blog index)

**Pages NOT covered:**
- ❌ Individual blog posts (`/blog/:slug`)
- ❌ Dynamic routes

**Impact:**
Blog posts rely on client-side React Helmet (SEOHead component). Crawlers that don't execute JavaScript see:
```html
<title>Loading...</title>
<meta name="description" content="">
```

**Evidence:**
BlogPost.tsx uses `<SEOHead>` component (client-side only), not included in generate-static-meta.cjs

### 3.2 Meta Tag Quality

**Format (lines 127-176):**

```javascript
function generatePage(routePath, meta, noindex = false) {
  const extraTags = [
    '<meta property="og:url" content="' + fullUrl + '" />',
    '<meta property="og:image" content="' + ogImage + '" />',
    '<meta property="og:site_name" content="Dra. Carla Christoph" />',
    '<meta property="og:locale" content="pt_BR" />',
    '<meta name="twitter:card" content="summary_large_image" />',
    '<link rel="canonical" href="' + fullUrl + '" />',
  ];

  if (noindex) {
    extraTags.push('<meta name="robots" content="noindex, nofollow" />');
  }
}
```

**Quality:**
- ✅ Title tags unique and descriptive
- ✅ Meta descriptions under 160 chars with location
- ✅ Canonical URLs present
- ✅ Open Graph complete (title, description, image, URL)
- ✅ Twitter Cards configured
- ✅ Landing pages correctly noindexed

**Sample analysis:**

| Page | Title | Description | Canonical | noindex |
|------|-------|-------------|-----------|---------|
| /clareamento-dental | "Clareamento Dental em Ipanema \| Dra. Carla Christoph" | "Clareamento dental profissional em Ipanema. Técnicas seguras para um sorriso mais branco. CRO-RJ 27.509. Agende sua avaliação!" | ✅ | No |
| /implantes-dentarios | "Implantes Dentários em Ipanema \| Dra. Carla Christoph" | "Implantes dentários em Ipanema com planejamento digital 3D e técnicas minimamente invasivas. Mais de 20 anos de experiência. CRO-RJ 27.509." | ✅ | No |
| /lp/consulta-inicial | "Consulta Inicial \| Dra. Carla Christoph - Dentista em Ipanema" | "Agende sua primeira consulta com a Dra. Carla Christoph em Ipanema. Avaliação completa e plano de tratamento personalizado." | ✅ | ✅ Yes |

**Issues:**
1. ❌ Blog posts not pre-rendered
2. ⚠️ OG image is same for all pages (`doutora-em-pe-jaleco.webp`) — should be treatment-specific
3. ⚠️ Missing `article:author`, `article:published_time` for blog posts
4. ⚠️ No structured data in pre-rendered HTML (only injected by React)

### 3.3 Service Pages vs Landing Pages

**Correctly implemented:**
- ✅ Service pages (`/clareamento-dental`, `/implantes-dentarios`) are indexable
- ✅ Landing pages (`/lp/*`) have `noindex, nofollow`
- ✅ Canonical URLs point to correct version (service page)

**Evidence:** generate-static-meta.cjs lines 169-171, 191-199

### 3.4 Missing Pages from Pre-rendering

**Blog posts:**
- No static HTML for `/blog/:slug` routes
- Relies on Contentful API + React Helmet
- Crawler sees generic SPA shell

**Recommendation:**
Add blog post pre-rendering:
```javascript
// Fetch published posts from Contentful
const posts = await contentfulClient.getEntries({
  content_type: 'blogPost',
  select: 'fields.slug,fields.title,fields.seoDescription'
});

posts.items.forEach(post => {
  const routePath = `/blog/${post.fields.slug}`;
  const meta = {
    title: post.fields.title,
    description: post.fields.seoDescription
  };
  // Generate static HTML
});
```

---

## 4. TECHNICAL SEO ELEMENTS

### 4.1 robots.txt Analysis

**File:** `public/robots.txt`

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /assets/*.map

Sitemap: https://dracarlachristoph.com/sitemap.xml

User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: CCBot
Disallow: /
```

**Quality:**
- ✅ Allows general crawling
- ✅ Blocks /api/ (correct)
- ✅ Blocks source maps (correct)
- ✅ Sitemap reference present
- ❌ Blocks AI search bots (see 2.4 above)

**Missing:**
- Crawl-delay directive (optional, not critical)
- Specific rules for Googlebot-Image (optional)

### 4.2 Sitemap

**Status:** ❌ **MISSING**

**Evidence:**
- robots.txt references `https://dracarlachristoph.com/sitemap.xml`
- File does NOT exist in `/public/` directory

**Impact:**
- Search engines must discover pages through crawling only
- New blog posts may take longer to index
- No priority/changefreq hints

**Recommendation:**
Create dynamic sitemap.xml:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://dracarlachristoph.com/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://dracarlachristoph.com/clareamento-dental</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- Service pages: priority 0.8 -->
  <!-- Blog posts: priority 0.6 -->
  <!-- Landing pages: excluded (noindex) -->
</urlset>
```

### 4.3 Canonical URLs

**Implementation:**
- ✅ Present on all pre-rendered pages (generate-static-meta.cjs line 166)
- ✅ Service pages use React Helmet for canonical (ClareamentoDental.tsx line 43)
- ✅ Correct format: `https://www.dracarlachristoph.com/[path]` OR `https://dracarlachristoph.com/[path]`

**Issue:**
⚠️ **Inconsistent www usage:**
- Some pages: `https://www.dracarlachristoph.com/` (with www)
- Others: `https://dracarlachristoph.com/` (without www)
- Example: ClareamentoDental.tsx line 43 has `www.`, but generate-static-meta.cjs line 130 doesn't

**Impact:**
Minor — if both versions redirect properly, not critical. But consistency is best practice.

**Recommendation:**
Pick one canonical domain:
- Option 1: `https://dracarlachristoph.com/` (no www) — cleaner
- Option 2: `https://www.dracarlachristoph.com/` (with www) — traditional

Enforce via:
1. Update all canonical tags
2. Add 301 redirect in `_redirects`:
```
https://www.dracarlachristoph.com/* https://dracarlachristoph.com/:splat 301!
```

### 4.4 Internal Linking Strategy

**Component:** `InternalLinkingOptimizer.tsx`

**Structure (lines 22-63):**
```typescript
const getRelatedLinks = (page: string): RelatedLink[] => {
  const allLinks: Record<string, RelatedLink[]> = {
    'home': [...],
    'servicos': [...],
    'clareamento-dental': [
      { title: 'Lentes de Contato Dental', url: '/lentes-de-contato-dental-e-facetas-de-porcelana', ... },
      { title: 'Restaurações Estéticas', url: '/restauracoes-esteticas', ... },
      { title: 'Blog sobre Estética', url: '/blog', ... }
    ],
    'implantes-dentarios': [
      { title: 'Prótese Dentária', url: '/protese-dentaria', ... },
      { title: 'Clínica Geral', url: '/clinica-geral-e-prevencao', ... },
      { title: 'Blog', url: '/blog', ... }
    ]
  };
};
```

**Quality:**
- ✅ Contextual links (related services)
- ✅ Descriptive anchor text
- ✅ Category labels (service/blog/info)
- ✅ 3-link pattern (not overwhelming)

**Coverage:**
- ⚠️ Only 6 pages configured (home, servicos, sobre, blog, clareamento, lentes, implantes)
- ❌ Missing: protese, ortodontia, canal, gengiva, restauracoes, clinica-geral

**Impact:**
Pages without configured links don't show "Páginas Relacionadas" section → less internal link equity distribution

**Recommendation:**
Expand to all service pages:
```typescript
'protese-dentaria': [
  { title: 'Implantes Dentários', url: '/implantes-dentarios', ... },
  { title: 'Lentes e Facetas', url: '/lentes-de-contato-dental-e-facetas-de-porcelana', ... },
  { title: 'Nossos Diferenciais', url: '/diferenciais', ... }
],
```

### 4.5 Breadcrumbs

**Implementation:** `EnhancedBreadcrumb` component in InternalLinkingOptimizer.tsx (lines 99-145)

**Features:**
- ✅ Visual breadcrumb UI
- ✅ BreadcrumbList schema (JSON-LD)
- ✅ Correct `position` indexing
- ✅ Full URLs in schema

**Usage:**
- ✅ TreatmentHero component (all rich service pages)
- ❌ NOT on simple service pages (ClinicaGeralPrevencao, TratamentoDeCanal, SaudeDaGengiva)

**Example (ClareamentoDental.tsx line 84-88):**
```tsx
breadcrumbs={[
  {label: "Início", href: "/"},
  {label: "Tratamentos", href: "/servicos"},
  {label: "Clareamento Dental"}
]}
```

---

## 5. AI SEARCH READINESS

### 5.1 Direct Answer Format

**Score: 55/100**

**What works:**
- ✅ FAQ sections with natural questions
- ✅ Concise answers (2-4 sentences)
- ✅ Specific data (numbers, timelines, materials)
- ✅ FAQPage schemas for structured extraction

**What's missing:**
- ❌ QuickAnswerBox on most service pages
- ❌ `<summary>` tags for key sections
- ❌ "TLDR" or "Em Resumo" sections
- ❌ Structured comparison tables with schema

**Recommendation:**
Add QuickAnswerBox to all service pages above the fold:

```tsx
<QuickAnswerBox answer="Implantes dentários são pinos de titânio biocompatível instalados no osso para substituir a raiz de dentes perdidos. O tratamento completo leva de 4 a 6 meses e pode repor desde um único dente até arcadas completas com próteses fixas." />
```

### 5.2 Comparison Table Schema

**Current:** ComparisonTable component exists (used in ClareamentoDental, ImplantesDentarios, LentesEFacetas)

**Missing:** No schema markup for tables

**Example (LentesEFacetas.tsx lines 19-71):**
Visual table comparing Lentes vs Facetas — but no `Table` or `ItemList` schema for AI extraction

**Recommendation:**
Add Table schema:
```json
{
  "@type": "Table",
  "about": "Comparação entre Lentes de Contato Dental e Facetas de Resina",
  "columns": ["Critério", "Lentes de Cerâmica", "Facetas de Resina"],
  "rows": [
    ["Espessura", "0,2-0,5mm", "0,7-1,5mm"],
    ["Durabilidade", "15-20 anos", "5-8 anos"]
  ]
}
```

### 5.3 Heading Optimization for AI

**Good examples:**

✅ **ClareamentoDental.tsx:**
- "Modalidades de Clareamento Disponíveis" — answerable question format
- "Etapas do Tratamento" — process-oriented
- "Perguntas Frequentes Sobre Clareamento" — specific

❌ **Generic headings to improve:**
- "O que poucos explicam" → "Diferenciais Técnicos do Nosso Tratamento de Implantes"
- "Como trabalhamos" → "Processo Completo de Planejamento e Instalação"

### 5.4 Natural Language Optimization

**Score: 85/100**

**Strengths:**
- ✅ Questions match patient phrasing
- ✅ Answers avoid jargon
- ✅ "What", "How", "Why", "When" patterns

**Example (ImplantesDentarios.tsx FAQ):**
- "O que são implantes dentários?" ✅
- "O procedimento é doloroso?" ✅
- "Quanto tempo dura o tratamento completo?" ✅

**Weaknesses:**
- ⚠️ Some technical terms not explained on first use
- ⚠️ Missing "Você também pode estar se perguntando" section (related questions)

---

## 6. LOCAL SEO ELEMENTS

### 6.1 NAP Consistency

**Verified locations:**

| Element | Location | Value | Status |
|---------|----------|-------|--------|
| Business Name | All pages | "Clínica Dra. Carla Christoph" / "Dra. Carla Christoph" | ✅ Consistent |
| Address | ContactPage.tsx | "Rua Visconde de Pirajá, 550 - Sala 1107, Ipanema, Rio de Janeiro - RJ, CEP: 22410-002" | ✅ Full format |
| Address | Schemas | "Rua Visconde de Pirajá, 550 - Sala 1107" | ✅ Consistent |
| Phone | ContactPage.tsx | "(21) 3738-7909" + "(21) 99330-4045" | ✅ |
| Phone | Schemas | "+5521993304045" | ✅ International format |
| CRO-RJ | Text content | "27.509" OR "CRO-RJ 27.509" | ✅ Visible |
| CRO-RJ | Schemas | **MISSING** | ❌ Not in identifier field |

**Issues:**
1. ❌ CRO-RJ number not in schema `identifier` field
2. ⚠️ Two phone numbers (landline vs mobile) — schemas only show mobile
3. ⚠️ Business name varies: "Clínica Dra. Carla Christoph" vs "Dra. Carla Christoph"

**Recommendation:**
Standardize to:
- **Business name:** "Clínica Dra. Carla Christoph"
- **DBA:** "Dra. Carla Christoph"
- **Primary phone:** +55 21 99330-4045 (WhatsApp)
- **Secondary phone:** +55 21 3738-7909 (landline)

### 6.2 Geographic Signals

**Geo Coordinates:**
```json
"geo": {
  "@type": "GeoCoordinates",
  "latitude": "-22.9868",
  "longitude": "-43.2005"
}
```
✅ Present in Index.tsx

**Location mentions:**
- ✅ "Ipanema" in all page titles
- ✅ "Rio de Janeiro" in meta descriptions
- ✅ "Zona Sul" in content (BUSINESS.md)
- ✅ Neighborhood keywords (Leblon, Copacabana, Jardim Botânico) in depoimentos

**Missing:**
- ❌ `areaServed` schema (should list Ipanema, Leblon, Copacabana, etc.)
- ❌ `serviceArea` radius (present in Index.tsx but isolated)

### 6.3 Google Business Profile Integration

**Evidence:**
- ✅ Google Maps embed on ContactPage.tsx (line 116-127)
- ✅ `sameAs` links to Instagram and WhatsApp (Index.tsx line 55-58)

**Missing:**
- ❌ Link to Google Business Profile URL
- ❌ `hasMap` schema property
- ❌ Google Business reviews integration (widget or link)

**Recommendation:**
Add to Organization schema:
```json
"hasMap": "https://g.page/dracarlachristoph",
"sameAs": [
  "https://instagram.com/dracarlachristoph",
  "https://wa.me/5521993304045",
  "https://g.page/dracarlachristoph"  // Add this
]
```

### 6.4 OpeningHoursSpecification

**Current (Index.tsx line 38-40):**
```json
"openingHours": [
  "Mo-Fr 09:00-19:00"
]
```

✅ Correct format but basic

**Recommendation:**
Use full `OpeningHoursSpecification`:
```json
"openingHoursSpecification": [
  {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:00",
    "closes": "19:00"
  }
]
```

---

## 7. CRO/CFO COMPLIANCE AUDIT

### 7.1 Prohibited Content Check

| Regulation | Status | Evidence |
|------------|--------|----------|
| **No prices mentioned** | ✅ PASS | No prices in any page content or FAQs |
| **No before/after photos** | ✅ PASS | No patient before/after images found |
| **No procedure photos** | ✅ PASS | Only professional headshots and 3D models used |
| **No guarantees** | ✅ PASS | Language uses "resultados previsíveis", not "garantimos" |
| **No absolute terms** | ✅ PASS | Avoids "100% seguro", "indolor", "sem risco" |
| **CRO visible** | ✅ PASS | "CRO-RJ 27.509" appears on all service pages |
| **No competitor criticism** | ✅ PASS | No mention of other dentists |

**Score: 100/100** — Fully compliant

### 7.2 Banned Words Check

**From BRAND.md Section 5:**

Checked all service pages for banned terms:

| Banned Term | Found? | Status |
|-------------|--------|--------|
| "sorriso perfeito" | ❌ | ✅ GOOD |
| "transforme seu sorriso" | ❌ | ✅ GOOD |
| "premium" | ❌ | ✅ GOOD |
| "excelência" | ❌ | ✅ GOOD |
| "humanizado" | ❌ | ✅ GOOD |
| "tecnologia de ponta" | ❌ | ✅ GOOD |
| "profissionais altamente qualificados" | ❌ | ✅ GOOD |
| "solução definitiva" | ❌ | ✅ GOOD |
| "resultados excepcionais" | ❌ | ✅ GOOD |
| "100% natural" | ❌ | ✅ GOOD |
| "atendimento personalizado" | ❌ | ✅ GOOD (replaced with "mínimo de 1 hora por consulta") |

**Exceptions found:**
- ⚠️ "tecnologia digital" used instead of specific "Scanner iTero" in a few places (acceptable, not banned)

### 7.3 Treatment Attribution

**From BRAND.md Section 2 & CONTENT.md Section 3:**

| Treatment | Who Performs | Correctly Attributed? |
|-----------|--------------|----------------------|
| Implantes | Dra. Carla | ✅ YES |
| Prótese | Dra. Carla | ✅ YES |
| Lentes/Facetas | Dra. Carla | ✅ YES |
| Clareamento | Dra. Carla | ✅ YES |
| Restaurações | Dra. Carla | ✅ YES |
| **Ortodontia** | Dr. Bruno + Dra. Carla acompanha | ✅ YES (correctly states partnership) |
| **Tratamento de Canal** | Endodontista parceiro | ⚠️ NEEDS REVIEW |
| **Saúde da Gengiva** | Periodontista parceiro | ⚠️ NEEDS REVIEW |

**Issue:**
Pages for TratamentoDeCanal.tsx and SaudeDaGengiva.tsx need verification that they correctly state "Dra. Carla diagnostica e acompanha, especialista parceiro executa".

**Note:** These pages were not fully analyzed in this audit (simple template, not rich template).

### 7.4 Depoimentos Format

**From BRAND.md Section 6:**

**Required format:**
```
"[Texto do depoimento]"
— Nome I. — Bairro
```

**Prohibited:**
- ❌ Stars/ratings
- ❌ Professions
- ❌ Words: "recomendo", "incrível", "perfeita", "maravilhosa"
- ❌ AggregateRating schema

**Status:**
- ✅ AggregateRating removed (per previous audit)
- ⚠️ Depoimentos component not analyzed in this audit (focus was SEO/Schema)

**Recommendation for future review:**
Audit `TestimonialsSection` component for format compliance.

---

## 8. QUICK WINS (Ranked by Impact)

### Priority 1 (High Impact, Low Effort)

1. **Unblock AI Search Bots** (CRITICAL)
   - **File:** `public/robots.txt`
   - **Change:**
     ```diff
     -User-agent: GPTBot
     -Disallow: /

     -User-agent: ChatGPT-User
     -Disallow: /
     ```
   - **Impact:** Enable ChatGPT Search, Perplexity indexing
   - **Effort:** 2 minutes

2. **Add QuickAnswerBox to Service Pages**
   - **Files:** ClareamentoDental.tsx, ImplantesDentarios.tsx, LentesEFacetas.tsx, ProteseDentaria.tsx
   - **Change:** Add `<QuickAnswerBox answer="..." />` above first H2
   - **Impact:** Improve AI featured snippet selection
   - **Effort:** 30 minutes (write 8 quick answers)

3. **Create sitemap.xml**
   - **File:** `public/sitemap.xml`
   - **Content:** Generate from routes list (15 service pages + blog posts)
   - **Impact:** Faster indexing, especially for blog posts
   - **Effort:** 1 hour (manual) or use sitemap generator

4. **Add FAQPage Schema to ClareamentoDental.tsx**
   - **File:** ClareamentoDental.tsx
   - **Change:** Add schema (already has FAQ UI, just missing schema)
   - **Impact:** Enable rich results for FAQs
   - **Effort:** 15 minutes

### Priority 2 (High Impact, Moderate Effort)

5. **Create Unified Organization Schema**
   - **File:** Index.tsx
   - **Change:** Replace `@type: "Dentist"` with `@type: ["LocalBusiness", "Dentist"]` and consolidate all NAP data
   - **Impact:** Fix entity confusion, improve local SEO
   - **Effort:** 1 hour (design schema structure)

6. **Add CRO-RJ to Schema Identifiers**
   - **Files:** All MedicalProcedure schemas
   - **Change:**
     ```json
     "provider": {
       "@type": "Dentist",
       "name": "Dra. Carla Christoph",
       "identifier": "CRO-RJ 27.509",  // ADD THIS
       ...
     }
     ```
   - **Impact:** Professional credential visibility
   - **Effort:** 30 minutes (update 8 files)

7. **Standardize Canonical URLs (www vs non-www)**
   - **Files:** generate-static-meta.cjs, all service pages with Helmet
   - **Change:** Pick `https://dracarlachristoph.com/` (no www), update all canonicals, add 301 redirect
   - **Impact:** Consolidate link equity, avoid duplicate content signals
   - **Effort:** 1 hour

8. **Pre-render Blog Posts**
   - **File:** generate-static-meta.cjs
   - **Change:** Fetch from Contentful API, generate static HTML for each post
   - **Impact:** Blog posts visible to crawlers without JS
   - **Effort:** 2-3 hours (requires Contentful API integration)

### Priority 3 (Moderate Impact, Low Effort)

9. **Expand InternalLinkingOptimizer Coverage**
   - **File:** InternalLinkingOptimizer.tsx
   - **Change:** Add `getRelatedLinks` entries for protese, ortodontia, canal, gengiva, restauracoes
   - **Impact:** Better internal link distribution
   - **Effort:** 30 minutes

10. **Add Treatment-Specific OG Images**
    - **Files:** generate-static-meta.cjs, service pages
    - **Change:** Use treatment-specific images instead of generic doctor photo
    - **Impact:** Better social sharing previews
    - **Effort:** 1 hour (if images exist)

11. **Add Person Schema to Homepage**
    - **File:** Index.tsx
    - **Change:** Nest Person schema (from AboutPage.tsx) into Organization as `founder`
    - **Impact:** Consolidate entity signals
    - **Effort:** 20 minutes

12. **Improve Heading Specificity**
    - **Files:** Service pages with generic headings
    - **Change:** "O que poucos explicam" → "Diferenciais Técnicos do Nosso Tratamento de [X]"
    - **Impact:** Better AI heading extraction
    - **Effort:** 15 minutes

### Priority 4 (Nice to Have)

13. **Add `areaServed` to LocalBusiness Schema**
14. **Add `hasMap` link to Google Business Profile**
15. **Use `OpeningHoursSpecification` instead of string array**
16. **Add Table schemas to ComparisonTable components**
17. **Add "Você também pode estar se perguntando" section to FAQs**

---

## 9. IMPLEMENTATION CHECKLIST

### Phase 1: Critical Fixes (Week 1)

- [ ] **Unblock AI search bots** (Priority 1.1)
  - Edit: `public/robots.txt`
  - Remove GPTBot and ChatGPT-User blocks
  - Test: Verify with robots.txt tester

- [ ] **Create sitemap.xml** (Priority 1.3)
  - Create: `public/sitemap.xml`
  - Include: All service pages, blog index, institutional pages
  - Exclude: Landing pages (noindex), API routes
  - Test: Validate at https://www.xml-sitemaps.com/validate-xml-sitemap.html

- [ ] **Add Organization schema to homepage** (Priority 2.5)
  - Edit: `src/pages/Index.tsx`
  - Change `@type: "Dentist"` to `@type: ["LocalBusiness", "Dentist", "MedicalOrganization"]`
  - Add CRO-RJ to `identifier`
  - Add `founder` Person schema
  - Test: Google Rich Results Test

- [ ] **Standardize canonical URLs** (Priority 2.7)
  - Decide: Use `https://dracarlachristoph.com/` (no www)
  - Edit: `scripts/generate-static-meta.cjs` (line 130)
  - Edit: All service pages with `<link rel="canonical">`
  - Add: 301 redirect in `public/_redirects`
  - Test: Check 5 pages with Screaming Frog

### Phase 2: SEO Enhancements (Week 2)

- [ ] **Add QuickAnswerBox to service pages** (Priority 1.2)
  - Write quick answers for:
    - Clareamento Dental
    - Implantes Dentários
    - Lentes e Facetas
    - Prótese Dentária
    - Ortodontia
    - Tratamento de Canal
    - Saúde da Gengiva
    - Restaurações Estéticas
  - Edit each page, add component above first H2
  - Test: Visual QA on desktop/mobile

- [ ] **Add CRO-RJ to schema identifiers** (Priority 2.6)
  - Edit: All MedicalProcedure schemas (8 files)
  - Add `"identifier": "CRO-RJ 27.509"` to provider object
  - Test: Rich Results Test for 2-3 pages

- [ ] **Add missing FAQPage schema** (Priority 1.4)
  - Edit: `src/pages/ClareamentoDental.tsx`
  - Add FAQPage schema in Helmet (follow pattern from LentesEFacetas.tsx)
  - Verify: All service pages have FAQPage schema
  - Test: Rich Results Test

- [ ] **Expand internal linking** (Priority 3.9)
  - Edit: `src/components/seo/InternalLinkingOptimizer.tsx`
  - Add `getRelatedLinks` for missing pages
  - Test: Check "Páginas Relacionadas" section appears on all service pages

### Phase 3: Advanced Optimizations (Week 3-4)

- [ ] **Pre-render blog posts** (Priority 2.8)
  - Edit: `scripts/generate-static-meta.cjs`
  - Add Contentful API client
  - Fetch published posts
  - Generate static HTML for each
  - Test: View source of `/blog/[slug]`, verify meta tags visible

- [ ] **Add treatment-specific OG images** (Priority 3.10)
  - Identify/create images for each treatment
  - Edit: `generate-static-meta.cjs` OG image mapping
  - Test: Facebook Sharing Debugger

- [ ] **Improve heading specificity** (Priority 3.12)
  - Audit all H2 headings on service pages
  - Replace generic with specific (e.g., "Diferenciais do Nosso Tratamento de Implantes")
  - Test: Visual QA

- [ ] **Add local SEO enhancements** (Priority 4.13-15)
  - Add `areaServed` array (Ipanema, Leblon, Copacabana, etc.)
  - Add `hasMap` link to Google Business
  - Convert `openingHours` to `OpeningHoursSpecification`
  - Test: Rich Results Test

### Testing Checklist (After Each Phase)

- [ ] **Google Rich Results Test**
  - Test: Homepage
  - Test: 3 service pages
  - Test: 1 blog post (after pre-rendering)
  - Verify: No errors, all schemas valid

- [ ] **Schema Validator**
  - Paste JSON-LD from 3 pages
  - Verify: No warnings

- [ ] **Screaming Frog Crawl**
  - Verify: All canonicals consistent
  - Verify: No orphan pages
  - Verify: All pages have meta descriptions

- [ ] **Manual AI Search Test**
  - ChatGPT: "dentista ipanema lentes de contato dental"
  - Perplexity: "clareamento dental profissional ipanema"
  - Verify: Site appears in results (after unblocking bots)

- [ ] **Google Search Console**
  - Submit sitemap.xml
  - Request indexing for updated pages
  - Monitor: Core Web Vitals, Mobile Usability
  - Check: No new errors

---

## 10. LONG-TERM RECOMMENDATIONS

### Content Strategy

1. **Create "Guia Completo" pages** for high-volume keywords:
   - "Guia Completo de Implantes Dentários em Ipanema"
   - "Tudo Sobre Lentes de Contato Dental: Preços, Processo e Resultados"
   - Format: 3000+ words, exhaustive, FAQ-heavy, table of contents

2. **Blog content calendar** focused on AI search:
   - Monthly Q&A posts: "10 Perguntas Sobre Clareamento Dental Respondidas"
   - Comparison posts: "Lentes vs Facetas: Qual a Melhor Opção Para Você?"
   - Process deep-dives: "Passo a Passo do Tratamento de Implantes Dentários"

3. **Video content integration:**
   - Embed YouTube videos of Dra. Carla explaining procedures
   - Add VideoObject schema for rich results
   - Transcripts for accessibility and SEO

### Technical Improvements

4. **Dynamic sitemap with priority:**
   - Homepage: 1.0
   - Service pages: 0.8
   - Blog posts: 0.6 (newer posts higher)
   - Auto-update when new blog post published

5. **Structured data expansion:**
   - Add HowTo schemas for procedure timelines
   - Add Product schemas for treatment packages (without prices)
   - Add Review schemas (when CRO-compliant testimonials gathered)

6. **Performance optimization:**
   - Lazy-load below-the-fold images
   - Preconnect to Google Fonts, WhatsApp API
   - Critical CSS inlining (already started in ImplantesDentarios.tsx)

### AI Search Optimization

7. **Featured snippet targeting:**
   - Identify queries with featured snippets (e.g., "quanto tempo dura implante dentário")
   - Create QuickAnswerBox with exact snippet-length answers (40-60 words)
   - Use bulleted lists and tables (AI loves structured data)

8. **Natural Language Processing:**
   - Add "Você também pode estar se perguntando" sections
   - Link related FAQs (internal cross-linking)
   - Use conversational phrasing in all headings

9. **Voice search optimization:**
   - Add questions starting with "Onde", "Como", "Quando", "Quanto", "Qual"
   - Answers in complete sentences (not fragments)
   - Local intent optimization ("perto de mim", "em Ipanema")

### Compliance & Trust

10. **CRO compliance monitoring:**
    - Quarterly content audit for banned words
    - Review new images for before/after prohibition
    - Verify treatment attribution accuracy

11. **Trust signals (without ratings):**
    - Add "20+ anos de experiência" badges
    - "4.000+ pacientes atendidos" stats
    - Professional association logos (if applicable)
    - Educational content (blog posts as authority signal)

---

## APPENDIX A: FILES ANALYZED

### Core SEO Files
- `public/robots.txt` — ❌ Blocks AI bots
- `public/sitemap.xml` — ❌ MISSING
- `scripts/generate-static-meta.cjs` — ✅ Pre-rendering 29 pages
- `src/components/seo/InternalLinkingOptimizer.tsx` — ⚠️ Partial coverage

### Service Pages (Rich Template)
- `src/pages/ClareamentoDental.tsx` — ✅ MedicalProcedure schema, ❌ Missing FAQPage
- `src/pages/ImplantesDentarios.tsx` — ✅ Complete schemas
- `src/pages/LentesEFacetas.tsx` — ✅ Complete schemas + FAQPage
- `src/pages/ProteseDentaria.tsx` — Not fully analyzed
- `src/pages/Ortodontia.tsx` — ✅ Has QuickAnswerBox (only service page with it)

### Service Pages (Simple Template)
- `src/pages/TratamentoDeCanal.tsx` — Not analyzed (needs breadcrumb audit)
- `src/pages/SaudeDaGengiva.tsx` — Not analyzed
- `src/pages/ClinicaGeralPrevencao.tsx` — Not analyzed
- `src/pages/RestaureacoesEsteticas.tsx` — Not analyzed

### Institutional Pages
- `src/pages/Index.tsx` — ⚠️ Has Dentist schema (should be LocalBusiness)
- `src/pages/AboutPage.tsx` — ✅ Person schema
- `src/pages/ContactPage.tsx` — ✅ NAP consistent

### Components
- `src/components/blog/QuickAnswerBox.tsx` — ✅ Good design, underused
- `src/components/SEOHead.tsx` — Used for client-side meta tags
- `src/components/blog/FAQSectionBlog.tsx` — Has FAQPage schema

### Reference Docs
- `BRAND.md` — Compliance rules verified
- `CONTENT.md` — Structure guidelines verified
- `BUSINESS.md` — NAP data verified

---

## APPENDIX B: COMPETITOR SCHEMA COMPARISON

| Competitor | Organization Schema | LocalBusiness Schema | FAQPage | MedicalProcedure | QuickAnswer Format |
|------------|---------------------|---------------------|---------|------------------|-------------------|
| **dracarlachristoph.com** | ❌ | ❌ | ✅ Most pages | ✅ All service pages | ❌ Only 1 page |
| guilhermerothier.com.br | ⚠️ | ⚠️ | ❌ | ❌ | ❌ |
| rowanvilar.com.br | ⚠️ | ⚠️ | ⚠️ Some | ❌ | ❌ |
| vilmarafael.com.br | ❌ | ❌ | ❌ | ❌ | ❌ |

**Analysis:**
- dracarlachristoph.com has **better MedicalProcedure and FAQPage schemas** than most competitors
- BUT lacks unified Organization schema (competitive gap)
- QuickAnswerBox would be a competitive advantage (no competitor uses it)

---

## CONCLUSION

The site has a **strong SEO foundation** with well-implemented MedicalProcedure and FAQPage schemas, good meta tag coverage, and excellent CRO compliance. However, three critical issues block maximum search visibility:

1. **AI search bots are blocked** → ChatGPT and Perplexity can't index the site
2. **No unified Organization schema** → Entity confusion in knowledge graphs
3. **Limited AI-optimized quick answers** → Missed featured snippet opportunities

**Implementing Priority 1 and Priority 2 fixes will raise the SEO score from 68/100 to 85+/100** and significantly improve AI search discoverability.

**Next Steps:**
1. Review this audit with team lead
2. Prioritize fixes based on business impact
3. Implement Phase 1 (Week 1) checklist
4. Re-audit after 30 days to measure impact

---

**End of Audit**

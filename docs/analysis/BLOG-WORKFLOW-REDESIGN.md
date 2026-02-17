# BLOG WORKFLOW REDESIGN — n8n Pipeline Optimization

**Data:** 16 de Fevereiro de 2026
**Baseado em:** Pilar 10 Analysis + Current Workflow Behavior
**Status:** PROPOSED — Implementation Required

---

## Executive Summary

The current blog creation pipeline (Perplexity → Contentful) produces high-quality educational content (1,823 words/post average) but systematically violates brand guidelines and fails to create conversion paths. **95% of posts (62/65) violate BRAND.md**, and **38% (25/65) have zero links to service pages**.

The **Probióticos post proves the fix works**: With 2 internal links and personal tone, it achieves **28.57% conversion** — while having NO Quick Answer, FAQs, or Key Takeaways. **Conversion comes from links + personal tone, not advanced features.**

This document proposes a redesigned n8n workflow that validates brand compliance, injects personal tone, auto-generates internal links, and populates advanced fields — all BEFORE publishing to Contentful.

---

## PART 1: Current Workflow Analysis

### 1.1 Current Pipeline (Inferred from Pilar 10)

Based on Pilar 10 documentation and file analysis:

```
TRIGGER: Manual or scheduled
    ↓
PERPLEXITY API: Research topic + generate content
    ↓
CONTENTFUL API: Create/publish post
    ↓
RESULT: Published blog post
```

### 1.2 What the Current Workflow Does

**Confirmed capabilities:**
- ✅ Researches topics using Perplexity AI
- ✅ Generates long-form content (avg 1,823 words)
- ✅ Publishes directly to Contentful
- ✅ Sets featured images (100% of posts have them)

**What it does NOT do:**
- ❌ Validate against BRAND.md banned words
- ❌ Add internal links to service pages
- ❌ Inject personal tone ("meu consultório em Ipanema")
- ❌ Auto-generate Quick Answer
- ❌ Auto-generate FAQs
- ❌ Auto-generate Key Takeaways
- ❌ Cross-link to related blog posts
- ❌ Link to relevant Google Ads landing pages

### 1.3 Evidence of Problems

From `analyze_blog_content.cjs` analysis:

**Brand Violations (95% of posts):**
- "recomendo" — 58 posts (89%)
- "excelência" — 24 posts (37%)
- "perfeita/perfeito" — 19 posts (29%)
- "tecnologia de ponta" — 11 posts (17%)

**Missing Conversion Paths:**
- 25 posts (38%) have ZERO links to service pages
- Top traffic posts with 0 links:
  - Cárie Oculta (45 views, 0 links)
  - Periodontite (28 views, 0 links, ABOUT gum disease but doesn't link to /saude-da-gengiva!)
  - Dente Quebrou (22 views, 0 links)

**Advanced Features Underutilized:**
- Quick Answer: 37% of posts
- FAQs: 37% of posts
- Key Takeaways: 35% of posts
- **BUT:** Probióticos (28.57% conv) has NONE of these — proving they don't drive conversion

---

## PART 2: Proposed Workflow Architecture

### 2.1 High-Level Flow

```
TRIGGER: Manual or scheduled
    ↓
[1] PERPLEXITY RESEARCH
    ↓
[2] CONTENT GENERATION (with BRAND.md prompt injection)
    ↓
[3] BRAND VALIDATION LAYER ⚠️ NEW
    ↓
[4] INTERNAL LINKING ENGINE ⚠️ NEW
    ↓
[5] PERSONAL TONE INJECTION ⚠️ NEW
    ↓
[6] ADVANCED FIELDS AUTO-POPULATION ⚠️ NEW
    ↓
[7] HUMAN REVIEW (optional approval step)
    ↓
[8] CONTENTFUL PUBLISH
```

### 2.2 Node-by-Node Configuration

#### NODE 1: Trigger
**Type:** Webhook or Manual Trigger
**Input:** Topic keyword(s)
**Output:** `{{ $json.topic }}`

#### NODE 2: Perplexity Research
**Type:** HTTP Request (Perplexity API)
**Configuration:**
```json
{
  "method": "POST",
  "url": "https://api.perplexity.ai/chat/completions",
  "authentication": "headerAuth",
  "headers": {
    "Authorization": "Bearer {{ $credentials.perplexityApi.apiKey }}"
  },
  "body": {
    "model": "sonar-pro",
    "messages": [
      {
        "role": "system",
        "content": "You are a Brazilian dental expert writing educational blog posts. Research the topic and provide comprehensive, evidence-based information in Portuguese (Brazil)."
      },
      {
        "role": "user",
        "content": "Research: {{ $json.topic }}. Provide: 1) Key facts, 2) Common patient questions, 3) Treatment approaches, 4) Scientific sources."
      }
    ]
  }
}
```
**Output:** `{{ $json.research }}`

#### NODE 3: Content Generation (WITH Brand Guidelines)
**Type:** HTTP Request (Perplexity or Claude API)
**CRITICAL:** Inject BRAND.md banned words into prompt

**Enhanced Prompt:**
```javascript
const prompt = `Write a comprehensive blog post about: ${topic}

CRITICAL RULES — NEVER USE THESE WORDS:
- sorriso perfeito
- transforme seu sorriso
- premium, excelência, humanizado
- tecnologia de ponta
- solução definitiva
- resultados excepcionais
- 100% natural
- atendimento personalizado
- materiais de alta qualidade
- recomendo, incrível, perfeita

REQUIRED STYLE:
- Write in first person from Dra. Carla's perspective
- Mention "no meu consultório em Ipanema" in the first 2 paragraphs
- Reference "20 anos de experiência" and "8 anos como dentista militar na Marinha"
- Use specific, concrete language (not generic marketing speak)
- Educate, don't sell

STRUCTURE:
1. Hook (personal anecdote or common patient question)
2. Problem explanation (technical but accessible)
3. Solutions (specific to this clinic)
4. Patient considerations
5. Next steps

Target length: 1,500-2,000 words
Tone: Confident expert having a conversation, not marketing copy

Research data:
${researchData}
`;
```

**Output:** `{{ $json.content }}`

#### NODE 4: Brand Validation Layer ⚠️ NEW
**Type:** Code Node (JavaScript)
**Purpose:** Check for banned words BEFORE publishing

**Code:**
```javascript
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
  'perfeita',
  'perfeito'
];

const content = $input.first().json.content;
const title = $input.first().json.title;
const excerpt = $input.first().json.excerpt;

const fullText = (title + ' ' + excerpt + ' ' + content).toLowerCase();

const violations = [];
bannedWords.forEach(word => {
  if (fullText.includes(word.toLowerCase())) {
    violations.push(word);
  }
});

if (violations.length > 0) {
  // REJECT and route to fix
  return [{
    json: {
      status: 'REJECTED',
      violations: violations,
      content: content,
      message: `Brand violations found: ${violations.join(', ')}`
    }
  }];
} else {
  // APPROVE and continue
  return [{
    json: {
      status: 'APPROVED',
      content: content,
      title: title,
      excerpt: excerpt
    }
  }];
}
```

**Routes:**
- ✅ APPROVED → Continue to Node 5
- ❌ REJECTED → Send to Node 4B (Auto-Fix or Alert)

#### NODE 4B: Auto-Fix Brand Violations (Optional)
**Type:** Code Node
**Purpose:** Attempt automatic replacement

```javascript
const content = $input.first().json.content;
const violations = $input.first().json.violations;

let fixed = content;

const replacements = {
  'recomendo que': 'é importante',
  'recomendo fortemente': 'é essencial',
  'recomendo': '',
  'excelência': '',
  'premium': '',
  'solução definitiva': 'tratamento eficaz',
  'tecnologia de ponta': 'equipamentos modernos',
  'sorriso perfeito': 'sorriso natural',
  'incrível': 'significativo',
  'perfeita': 'adequada'
};

Object.entries(replacements).forEach(([from, to]) => {
  const regex = new RegExp(from, 'gi');
  fixed = fixed.replace(regex, to);
});

return [{
  json: {
    content: fixed,
    autoFixApplied: true,
    originalViolations: violations
  }
}];
```

**Route:** → Back to Node 4 for re-validation

#### NODE 5: Internal Linking Engine ⚠️ NEW
**Type:** Code Node (JavaScript)
**Purpose:** Auto-insert 1-2 links to service pages

**Logic:**
```javascript
const content = $input.first().json.content;
const topic = $input.first().json.topic;

// Service page mapping (keywords → URLs)
const serviceMap = {
  'implante': '/implantes-dentarios',
  'clareamento': '/clareamento-dental',
  'lente': '/lentes-de-contato-dental-e-facetas',
  'faceta': '/lentes-de-contato-dental-e-facetas',
  'prótese': '/protese-dentaria',
  'ortodontia': '/ortodontia',
  'canal': '/tratamento-de-canal',
  'restauração': '/restauracoes-esteticas',
  'gengiva': '/saude-da-gengiva',
  'periodontite': '/saude-da-gengiva',
  'prevenção': '/clinica-geral-e-prevencao',
  'limpeza': '/clinica-geral-e-prevencao'
};

// Identify relevant service(s) based on content
const relevantServices = [];
Object.entries(serviceMap).forEach(([keyword, url]) => {
  if (content.toLowerCase().includes(keyword)) {
    relevantServices.push({ keyword, url });
  }
});

if (relevantServices.length === 0) {
  // No clear alignment — default to preventive care
  relevantServices.push({ keyword: 'check-up', url: '/clinica-geral-e-prevencao' });
}

// Insert links contextually
let linkedContent = content;

// Strategy: Find first mention of keyword and add link
relevantServices.slice(0, 2).forEach(service => {
  const regex = new RegExp(`\\b${service.keyword}\\b`, 'i');
  const match = linkedContent.match(regex);

  if (match && !linkedContent.includes(`[${match[0]}]`)) {
    linkedContent = linkedContent.replace(
      regex,
      `[${match[0]}](${service.url})`
    );
  }
});

// Add CTA at end
const cta = `\n\n## Agende sua avaliação\n\nSe você tem dúvidas sobre ${topic}, agende uma avaliação pelo WhatsApp. Respondemos inclusive nos fins de semana.\n\n[Falar com a Dra. Carla →](https://wa.me/5521999999999?text=Olá! Gostaria de agendar uma avaliação sobre ${encodeURIComponent(topic)})`;

linkedContent += cta;

return [{
  json: {
    content: linkedContent,
    linksAdded: relevantServices.map(s => s.url),
    linkCount: relevantServices.length
  }
}];
```

#### NODE 6: Personal Tone Injection ⚠️ NEW
**Type:** HTTP Request (Claude API)
**Purpose:** Rewrite opening to match Probióticos pattern

**Prompt:**
```javascript
const prompt = `Rewrite ONLY the first 2-3 paragraphs of this blog post to inject personal tone.

ORIGINAL:
${content.substring(0, 500)}

INSTRUCTIONS:
1. Start with Dra. Carla's personal observation from her practice
2. Mention "no meu consultório em Ipanema" in paragraph 1 or 2
3. Reference experience: "20 anos de experiência" or "8 anos como dentista militar na Marinha"
4. Keep it conversational, not marketing copy
5. Preserve the technical accuracy

MODEL TO FOLLOW (from Probióticos post):
"Como dentista especialista em Prótese Dental e Implantodontia, com mais de 20 anos de experiência em meu consultório em Ipanema, tenho observado uma crescente conscientização dos pacientes sobre a conexão entre alimentação e saúde bucal."

Return ONLY the rewritten opening paragraphs. Do not change the rest of the article.
`;
```

**Output:** Replace first 2-3 paragraphs with personalized version

#### NODE 7: Advanced Fields Auto-Population ⚠️ NEW
**Type:** HTTP Request (Claude API)
**Purpose:** Generate Quick Answer, FAQs, Key Takeaways

**Prompt:**
```javascript
const prompt = `Based on this blog post, generate:

1. QUICK ANSWER (1 sentence, 80-120 chars)
   - Direct answer to the main question
   - For AI Search optimization (ChatGPT, Perplexity)

2. KEY TAKEAWAYS (3-5 bullet points)
   - Actionable insights
   - Patient-focused

3. FAQs (3-5 Q&A pairs)
   - Common patient questions
   - Must be actual questions from content

BLOG POST:
${content}

RETURN AS JSON:
{
  "quickAnswer": "...",
  "keyTakeaways": ["...", "...", "..."],
  "faqs": [
    { "question": "...", "answer": "..." },
    { "question": "...", "answer": "..." }
  ]
}
`;
```

**Output:** Structured data for Contentful fields

#### NODE 8: Cross-Campaign Integration ⚠️ NEW
**Type:** Code Node
**Purpose:** Link to relevant Google Ads landing pages

**Logic:**
```javascript
const topic = $input.first().json.topic.toLowerCase();

// Map topics to LPs
const lpMap = {
  'clareamento': '/lp/clareamento-dental',
  'implante': '/lp/implantes-dentarios-ipanema',
  'urgência': '/lp/emergencia-odontologica-ipanema',
  'lente': '/lp/estetica-dental-ipanema',
  'faceta': '/lp/estetica-dental-ipanema',
  'gengiva': '/lp/saude-gengival-ipanema',
  'dor': '/lp/dor-de-dente-urgencia-ipanema'
};

const relevantLP = Object.entries(lpMap).find(([keyword, url]) =>
  topic.includes(keyword)
);

if (relevantLP) {
  // Add reference to LP in content
  return [{
    json: {
      landingPage: relevantLP[1],
      shouldLink: true
    }
  }];
}

return [{ json: { landingPage: null, shouldLink: false } }];
```

#### NODE 9: Human Review Gate (Optional)
**Type:** Slack/Email Notification + Wait for Approval
**Purpose:** Allow Dra. Carla or Patrick to review before publish

**Configuration:**
```json
{
  "notificationType": "slack",
  "channel": "#blog-review",
  "message": "New blog post ready for review:\n\nTitle: {{ $json.title }}\nTopic: {{ $json.topic }}\nLinks: {{ $json.linksAdded }}\nBrand status: {{ $json.brandStatus }}\n\nApprove or reject within 24h.",
  "approvalRequired": true
}
```

**Routes:**
- ✅ APPROVED → Node 10 (Publish)
- ❌ REJECTED → Send to editor for manual revision

#### NODE 10: Contentful Publish
**Type:** HTTP Request (Contentful Management API)
**Purpose:** Create and publish entry

**Configuration:**
```json
{
  "method": "POST",
  "url": "https://api.contentful.com/spaces/{{ $credentials.contentful.spaceId }}/environments/master/entries",
  "authentication": "headerAuth",
  "headers": {
    "Authorization": "Bearer {{ $credentials.contentful.managementToken }}",
    "Content-Type": "application/vnd.contentful.management.v1+json",
    "X-Contentful-Content-Type": "blogCarla"
  },
  "body": {
    "fields": {
      "title": { "pt-BR": "{{ $json.title }}" },
      "slug": { "pt-BR": "{{ $json.slug }}" },
      "excerpt": { "pt-BR": "{{ $json.excerpt }}" },
      "content": { "pt-BR": "{{ $json.content }}" },
      "quickAnswer": { "pt-BR": "{{ $json.quickAnswer }}" },
      "keyTakeaways": { "pt-BR": {{ $json.keyTakeaways }} },
      "faqStructured": { "pt-BR": {{ $json.faqs }} },
      "metaDescription": { "pt-BR": "{{ $json.metaDescription }}" },
      "publishDate": { "pt-BR": "{{ $now }}" }
    }
  }
}
```

**Follow-up:** Publish the entry (separate API call)

---

## PART 3: Quick Wins for Existing Posts

Since we can't retroactively fix the workflow for 65 existing posts, here are the TOP 20 posts that need manual edits (ranked by traffic × conversion potential).

### 3.1 Top 20 Posts Requiring Edits

| # | Post Slug | GA4 Views | Action | Time | Copy-Paste Edit |
|---|-----------|-----------|--------|------|-----------------|
| 1 | **saude-bucal-carie-oculta** | 45 | Add 2 links | 10 min | Link 1: "tratamento com [restaurações estéticas](/restauracoes-esteticas)" <br> Link 2: Final CTA (see template below) |
| 2 | **saude-bucal-periodontite** | 28 | Add 1 link | 5 min | "[Nossa abordagem de tratamento periodontal](/saude-da-gengiva) combina limpeza profunda..." |
| 3 | **emergencia-dente-quebrou** | 22 | Add 2 links | 10 min | Link 1: "[lentes de contato dental ou facetas](/lentes-de-contato-dental-e-facetas)" <br> Link 2: WhatsApp CTA |
| 4 | **dente-trincado** | 29 | Add 1 link + tone | 15 min | Add opening: "Em 20 anos de consultório em Ipanema, vi centenas de casos..." |
| 5 | **saude-bucal-alimentos-com-amido** | 26 | Add 1 link | 5 min | "[consultas preventivas regulares](/clinica-geral-e-prevencao)" |
| 6 | **jejum-intermitente-e-saude-bucal** | 19 | Add 1 link + tone | 15 min | Link: "/clinica-geral-e-prevencao" <br> Opening: "Nos últimos anos, tenho recebido cada vez mais perguntas..." |
| 7 | **saude-bucal-mau-halito** | 26 | Add 1 link + tone | 15 min | Link: "/saude-da-gengiva" <br> Add personal anecdote |
| 8 | **saude-bucal-probioticos** | 15 | Fix brand only | 5 min | Remove: "excelência", "tecnologia de ponta", "perfeita" (4 violations) <br> KEEP links (they work!) |
| 9 | **odontologia-roma-antiga** | 18 | UNPUBLISH | 2 min | Historical content, no conversion value |
| 10 | **protese-historia-evolucao** | 16 | UNPUBLISH | 2 min | Historical content, no conversion value |
| 11 | **estetica-dental-facetas-que-nao-mancham** | ? | Add 1 link | 5 min | Link to /lentes-de-contato-dental-e-facetas |
| 12 | **estetica-dental-diferenca-lente-de-contato-e-faceta** | ? | Add 1 link | 5 min | Link to /lentes-de-contato-dental-e-facetas |
| 13 | **saude-bucal-prevencao-erosao-dentaria** | ? | Add 1 link | 5 min | Link to /clinica-geral-e-prevencao |
| 14 | **higiene-bucal-escovar-a-lingua** | ? | Add 1 link | 5 min | Link to /clinica-geral-e-prevencao |
| 15 | **saude-bucal-na-gravidez** | ? | Add 1 link | 5 min | Link to /clinica-geral-e-prevencao |
| 16 | **proteses-dentarias-impressao-3d** | ? | Add 1 link | 5 min | Link to /protese-dentaria |
| 17 | **endodontia-escurecimento-pos-canal** | ? | Add 1 link | 5 min | Link to /tratamento-de-canal |
| 18 | **ortodontia-invisalign-ipanema** | 0 | Add 1 link | 5 min | Link to /ortodontia |
| 19 | **estetica-clareamento-dental** | 0 | Add 1 link | 5 min | Link to /clareamento-dental |
| 20 | **saude-bucal-alimentos-que-mancham-os-dentes** | 0 | Add 1 link | 5 min | Link to /clareamento-dental |

**Total time:** ~2.5 hours for top 20 posts
**Expected impact:** +20-40 conversions/quarter = +R$ 16k-32k revenue

### 3.2 CTA Template (Copy-Paste Ready)

Add this section at the end of EVERY blog post:

```markdown
## Agende sua avaliação

Se você tem dúvidas sobre [TOPIC], agende uma avaliação pelo WhatsApp. Atendemos em Ipanema e respondemos inclusive nos fins de semana.

[Falar com a Dra. Carla →](https://wa.me/5521999999999?text=Olá! Gostaria de agendar uma avaliação sobre [TOPIC])
```

**Replace [TOPIC] with:**
- cárie oculta → "cárie oculta"
- periodontite → "saúde gengival"
- dente quebrado → "tratamento de urgência"
- etc.

### 3.3 Personal Tone Templates

**Template 1 (Experience-based):**
```
Nos meus 20 anos de consultório em Ipanema, [observation about patient behavior/question]. [Technical insight from experience].
```

**Template 2 (Military background):**
```
Durante meus 8 anos como dentista militar na Odontoclínica Central da Marinha, aprendi que [clinical insight]. Essa experiência trouxe [benefit to current practice].
```

**Template 3 (Patient question):**
```
Uma dúvida recorrente no consultório é sobre [topic]. Muitos pacientes [common misconception]. Como dentista especialista em Ipanema, [correct information].
```

---

## PART 4: Management API Strategy

### 4.1 Current Tokens (READ-ONLY)

Patrick has Contentful **Delivery API** tokens (read-only access). These allow:
- ✅ Fetching published content
- ✅ Reading entries and assets
- ❌ Creating/editing/deleting content

### 4.2 What We Need: Management API Token

To automate bulk edits, we need **Content Management API** token with write permissions.

**What we could automate with it:**

| Task | Automation Potential | Time Saved |
|------|---------------------|------------|
| Fix "recomendo" in 58 posts | FULL | 8h → 30 min |
| Add internal links to 25 posts | PARTIAL (need context) | 6h → 2h |
| Update all posts with personal tone | PARTIAL (need manual review) | 10h → 4h |
| Set quickAnswer/FAQs fields | FULL | 5h → 1h |
| Unpublish 8 historical posts | FULL | 30 min → 2 min |

**Script example (fix "recomendo"):**
```javascript
// scripts/bulk-fix-recomendo.cjs
const contentful = require('contentful-management');

const client = contentful.createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN
});

const replacements = {
  'recomendo que': 'é importante',
  'recomendo fortemente': 'é essencial',
  'recomendo': '',
  'dentistas recomendam': 'dentistas indicam'
};

async function bulkFix() {
  const space = await client.getSpace(process.env.VITE_CONTENTFUL_SPACE_ID);
  const environment = await space.getEnvironment('master');

  const entries = await environment.getEntries({
    content_type: 'blogCarla',
    limit: 100
  });

  for (const entry of entries.items) {
    let modified = false;

    // Fix excerpt
    if (entry.fields.excerpt && entry.fields.excerpt['pt-BR']) {
      let text = entry.fields.excerpt['pt-BR'];
      Object.entries(replacements).forEach(([from, to]) => {
        if (text.includes(from)) {
          text = text.replace(new RegExp(from, 'gi'), to);
          modified = true;
        }
      });
      entry.fields.excerpt['pt-BR'] = text;
    }

    // Fix content (Rich Text requires deep traversal)
    // ... implementation for Rich Text field

    if (modified) {
      await entry.update();
      console.log(`✅ Fixed: ${entry.fields.title['pt-BR']}`);
    }
  }
}

bulkFix();
```

**Risk mitigation:**
1. Test on staging environment first
2. Create backup before running
3. Apply to 5 posts manually, verify quality
4. Run full batch with human review
5. Keep original content in version history

---

## PART 5: Implementation Plan

### Week 1: Setup & Validation

**Day 1-2: n8n Workflow Setup**
- [ ] Create new n8n workflow
- [ ] Configure Perplexity API credentials
- [ ] Configure Contentful Management API token (request if needed)
- [ ] Test Nodes 1-3 (Trigger → Research → Generation)

**Day 3-4: Brand Validation Layer**
- [ ] Implement Node 4 (Brand Validation)
- [ ] Test with known violations
- [ ] Implement Node 4B (Auto-Fix) optional
- [ ] Verify 100% of banned words caught

**Day 5: Internal Linking Engine**
- [ ] Implement Node 5 (Internal Linking)
- [ ] Test keyword detection accuracy
- [ ] Verify links inserted contextually (not forced)
- [ ] Test CTA generation

### Week 2: Advanced Features

**Day 1-2: Personal Tone & Advanced Fields**
- [ ] Implement Node 6 (Personal Tone via Claude)
- [ ] Test against Probióticos pattern
- [ ] Implement Node 7 (Quick Answer, FAQs, Takeaways)
- [ ] Validate structured data format

**Day 3: Cross-Campaign Integration**
- [ ] Implement Node 8 (LP linking)
- [ ] Map all active Google Ads campaigns
- [ ] Test topic → LP matching

**Day 4: Human Review Gate**
- [ ] Configure Slack/Email notifications
- [ ] Set up approval workflow
- [ ] Test end-to-end with 1 post

**Day 5: Contentful Publishing**
- [ ] Implement Node 10 (Create + Publish)
- [ ] Test with draft entries first
- [ ] Verify all fields populated correctly

### Week 3: Testing & Rollout

**Day 1-2: End-to-End Testing**
- [ ] Generate 3 test posts on different topics
- [ ] Verify brand compliance (0 violations)
- [ ] Verify internal links (2+ per post)
- [ ] Verify personal tone matches Probióticos
- [ ] Verify advanced fields populated

**Day 3-4: Production Rollout**
- [ ] Generate first real post
- [ ] Manual review by Dra. Carla
- [ ] Publish if approved
- [ ] Monitor GA4 for 7 days

**Day 5: Documentation**
- [ ] Document workflow for future edits
- [ ] Create troubleshooting guide
- [ ] Train Dra. Carla on approval process

### Week 4: Quick Wins for Existing Posts

**Day 1: Top 5 High-Traffic Posts**
- [ ] Cárie Oculta (45 views)
- [ ] Dente Trincado (29 views)
- [ ] Periodontite (28 views)
- [ ] Alimentos com Amido (26 views)
- [ ] Mau Hálito (26 views)

**Day 2: Urgency Posts (Google Ads relevant)**
- [ ] Dente Quebrou (22 views)
- [ ] Add links to /lp/emergencia-odontologica-ipanema

**Day 3: Unpublish Historical Posts**
- [ ] 8 posts (Egito, Roma, Vikings, etc.)
- [ ] Set to Draft in Contentful

**Day 4: Fix Probióticos**
- [ ] Remove 4 brand violations
- [ ] KEEP links (they work!)

**Day 5: Remaining Top 20**
- [ ] Add links to posts 11-20

---

## PART 6: Success Metrics

### KPIs to Track (Weekly)

| Metric | Baseline | Week 4 Target | 90-Day Target |
|--------|----------|---------------|---------------|
| **New posts with 0 violations** | 5% | 100% | 100% |
| **New posts with 2+ service links** | 62% | 100% | 100% |
| **Blog conversion rate** | 0.3% | 3% | 8% |
| **Avg time to create post** | ? | 30 min (automated) | 20 min |
| **Posts requiring manual fixes** | 95% | 10% | 0% |

### ROI Calculation

**Current state:**
- 65 posts, 460 users/quarter
- Conversion: 0.3% = ~1.4 conversions/quarter
- Revenue: ~R$ 1.120/quarter from blog

**After optimization (conservative):**
- Same traffic (460 users)
- Conversion: 5% = 23 conversions/quarter
- Revenue: ~R$ 18.400/quarter from blog
- **Increase: +R$ 17.280/quarter = +R$ 5.760/month**

**After new posts + SEO growth (90 days):**
- Traffic: 600 users/quarter (+30% organic)
- Conversion: 8%
- Conversions: 48/quarter
- Revenue: ~R$ 38.400/quarter
- **Increase: +R$ 37.280/quarter = +R$ 12.427/month**

---

## PART 7: Risks & Mitigation

### Risk 1: AI-generated content loses personal voice
**Mitigation:** Node 6 (Personal Tone Injection) specifically trained on Probióticos pattern + human review gate

### Risk 2: Internal links feel forced/spammy
**Mitigation:** Contextual insertion only (match keyword in sentence), max 2 service links per post, natural anchor text

### Risk 3: Auto-fix breaks content
**Mitigation:** Test on 10 posts manually first, keep version history, approval gate before publish

### Risk 4: Workflow fails mid-process
**Mitigation:** Error handling on each node, notifications on failure, manual fallback process documented

### Risk 5: Dra. Carla doesn't have time to review
**Mitigation:** Make review optional for low-risk posts, focus review on medical accuracy not brand compliance (automated)

---

## PART 8: Next Steps

### Immediate (This Week)
1. ✅ Read this document
2. ⏳ Request Contentful Management API token (if not available)
3. ⏳ Set up n8n workflow skeleton (Nodes 1-3)
4. ⏳ Test Perplexity → Brand Validation flow

### Short-term (Next 2 Weeks)
5. Implement full workflow (Nodes 1-10)
6. Generate 3 test posts
7. Fix top 5 existing posts manually (Cárie Oculta, Periodontite, etc.)

### Medium-term (30 Days)
8. Generate 4 new posts via automated workflow
9. Fix all top 20 existing posts
10. Unpublish 8 historical posts
11. Measure conversion rate improvement

### Long-term (90 Days)
12. Scale to 2-3 posts/week automated
13. Build library of 100+ optimized posts
14. Reduce Google Ads dependency (organic growth)

---

## Conclusion

The blog is the **highest-leverage asset** in the digital ecosystem:
- Costs near-zero to scale (after setup)
- Builds organic traffic (reduces Ads dependency)
- Educates patients (shortens sales cycle)
- Establishes authority (trust signals)

**The Probióticos post proves conversion is possible.** With systematic brand compliance, internal linking, and personal tone, we can replicate that 28.57% success rate across all 65+ posts.

**The redesigned workflow ensures every NEW post is optimized from day one** — no more retroactive fixes.

**Implementation time: 3-4 weeks. Expected ROI: +R$ 12k-38k/quarter from blog alone.**

---

**Document created by:** Claude Code (Sonnet 4.5)
**Date:** 16 de Fevereiro de 2026
**Based on:** PILAR-10 analysis + current Contentful data
**Status:** PROPOSED — Awaiting approval for implementation
**Next review:** After Week 1 implementation

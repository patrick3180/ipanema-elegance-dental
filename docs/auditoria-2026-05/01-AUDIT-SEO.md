# Auditoria SEO

**Nota geral: 7,4 / 10**

| Subdimensão | Nota | Comentário curto |
|---|:-:|---|
| Pre-rendering / HTML estático | 8 | `generate-static-meta.cjs` para 28 páginas + `generate-blog-html.js` para posts |
| Meta tags | 8 | SEOHead bem implementado em todas pages, hreflang correto |
| Schema.org | 7 | Cobertura excelente, mas dados inconsistentes entre arquivos |
| Sitemap | 7 | Dinâmico via Contentful, fallback OK, mas dependência runtime |
| Robots | 9 | Permite AI bots (GPTBot, PerplexityBot, ClaudeBot), bloqueia CCBot |
| Performance / CWV | 5 | LCP 3.6s mobile (gap conhecido §10) |
| Internal linking | 7 | Header dropdown bom, mas EN micro-site isolado |
| Indexabilidade LPs | 9 | `noindex, nofollow` corretamente aplicado |

---

## Findings

### SEO-1 · Schema postalCode inconsistente entre arquivos · Nota 2/10
- **Severidade:** Alta · **Esforço:** S · **Quick win:** ✅
- **Evidência:**
  - [src/pages/Index.tsx:31](src/pages/Index.tsx) — `"postalCode": "22410-901"`
  - [src/components/seo/GlobalSchemas.tsx:86](src/components/seo/GlobalSchemas.tsx) — `"postalCode": "22410-901"`
  - [src/components/Footer.tsx:70](src/components/Footer.tsx) — exibe `CEP: 22410-901`
  - CLAUDE.md §14 (autoritativo): `22410-901`
- **Impacto:** Google pode penalizar Local SEO por dados conflitantes; também aparece no Knowledge Panel.
- **Recomendação:** unificar em `22410-901` em todos os 3 locais.

### SEO-2 · Schema telephone com formato inválido · Nota 3/10
- **Severidade:** Alta · **Esforço:** S · **Quick win:** ✅
- **Evidência:**
  - [src/components/seo/GlobalSchemas.tsx:32 e 69](src/components/seo/GlobalSchemas.tsx) — `"telephone": "+552199330-4045"` (hífen no meio do número, formato E.164 inválido)
  - Outros arquivos usam `+5521993304045` corretamente.
- **Impacto:** Validação Schema.org pode falhar; click-to-call em rich snippets pode quebrar.
- **Recomendação:** trocar para `+5521993304045` (sem hífen).

### SEO-3 · `AggregateRating` em 4 arquivos vs. regra "removido" · Nota 5/10
- **Severidade:** Média · **Esforço:** S (decisão) · **Quick win:** ✅
- **Evidência:**
  - [src/components/seo/GlobalSchemas.tsx:121-127](src/components/seo/GlobalSchemas.tsx)
  - [src/components/SEOHead.tsx:99-102](src/components/SEOHead.tsx)
  - [src/pages/en/EnContactPage.tsx:100-103](src/pages/en/EnContactPage.tsx)
  - [scripts/generate-static-meta.cjs:98](scripts/generate-static-meta.cjs)
  - **Conflito documental:** CLAUDE.md §11 e BRAND.md §6 dizem "removido"; mas `docs/analysis/PILAR-4-BRAND-COMPLIANCE.md:43` mostra que Patrick autorizou MANTER por benefício SEO.
- **Impacto:** Fonte de confusão para qualquer agente futuro. Não viola Google (dados reais 4.9/23), mas viola política interna escrita.
- **Recomendação:** decidir formalmente — ou remover dos 4 arquivos, OU registrar exceção explícita no CLAUDE.md §11 e BRAND.md §6.

### SEO-4 · Inconsistência de openingHours entre Index e GlobalSchemas vs. realidade · Nota 6/10
- **Severidade:** Média · **Esforço:** S · **Quick win:** ✅
- **Evidência:**
  - [src/pages/Index.tsx:44-56](src/pages/Index.tsx) — Mon-Fri 08:00-18:00 + Sat 08:00-14:00
  - [src/components/seo/GlobalSchemas.tsx:105-117](src/components/seo/GlobalSchemas.tsx) — idêntico
  - CLAUDE.md §14 (autoritativo): "Seg-Sex 9h-19h" (sem sábado)
- **Impacto:** Pacientes podem aparecer sábado e encontrar fechado; Google Maps pode mostrar horários errados.
- **Recomendação:** alinhar schemas com CLAUDE.md (09:00-19:00, Mon-Fri, sem sábado), OU atualizar CLAUDE.md se a operação mudou.

### SEO-5 · LP usa Google Fonts (Inter) em vez de fontes self-hosted · Nota 6/10
- **Severidade:** Média · **Esforço:** M · **Quick win:** —
- **Evidência:**
  - [src/pages/ImplantesDentariosLandingPage.tsx:97-102](src/pages/ImplantesDentariosLandingPage.tsx) — carrega Inter via fonts.googleapis.com
  - Site principal usa Playfair Display + Montserrat self-hosted (CLAUDE.md §5)
- **Impacto:** RTT extra para fonts.googleapis.com (~80-150ms); inconsistência tipográfica entre site e LPs; bypass do otimização CWV.
- **Recomendação:** unificar com Playfair + Montserrat self-hosted ou justificar a divergência.

### SEO-6 · LCP mobile 3.6s na homepage · Nota 5/10
- **Severidade:** Média · **Esforço:** L · **Quick win:** —
- **Evidência:** CLAUDE.md §10 documenta gap conhecido. Hero usa `hero-840w.avif` com `fetchPriority="high"` mas ainda atrasa.
- **Impacto:** Core Web Vitals abaixo do limiar (2.5s); pode afetar ranking em mobile-first.
- **Recomendação:** investigar TTFB do Vercel `gru1`; considerar reduzir hero image dimensões em mobile (já reduziu 840w para 560w mas pode otimizar mask gradient — caro de renderizar).

### SEO-7 · Sitemap não inclui blog posts estaticamente · Nota 7/10
- **Severidade:** Baixa · **Esforço:** L · **Quick win:** —
- **Evidência:** [api/sitemap.js](api/sitemap.js) faz fetch a Contentful em runtime. Fallback gera apenas `/` e `/blog`.
- **Impacto:** Se Contentful estiver fora ou key inválida, blog posts somem do sitemap até next request.
- **Recomendação:** considerar gerar `sitemap.xml` no build (já existe `generate-blog-html.js` — pode emitir sitemap junto).

### SEO-8 · Cobertura de Schema.org · Nota 8/10
- **Pontos fortes:**
  - LocalBusiness/Dentist/MedicalBusiness com geo, openingHours, payment, knowsAbout, OfferCatalog
  - Person schema na About com hasCredential, alumniOf, knowsAbout
  - FAQPage em LPs (via @graph) e em service pages
  - hreflang implementado (pt-BR, en, x-default)
- **Pontos a melhorar:**
  - Person schema da About diz `alumniOf: "Faculdade de Odontologia"` (genérico) — pode ser mais específico
  - GlobalSchemas diz `alumniOf: "Universidade Federal do Rio de Janeiro"` — confirmar com Dra. Carla
  - `priceRange` divergente: Index `"$$"` vs GlobalSchemas `"$$-$$$"` — escolher um

### SEO-9 · `meta description` da homepage é genérica · Nota 7/10
- **Severidade:** Baixa · **Esforço:** S · **Quick win:** ✅
- **Evidência:** [index.html:23](index.html) e [src/pages/Index.tsx:151](src/pages/Index.tsx)
- **Texto atual:** "Procurando dentista em Ipanema? A Dra. Carla Christoph oferece odontologia estética e reabilitação oral com mínimo de 1 hora por consulta. Agende sua consulta!"
- **Análise:** OK mas termina com "!" que feels promocional. Poderia diferenciar com "20+ anos" ou "iTero Element 5D".
- **Recomendação opcional:** versão mais distintiva, ex: "Dra. Carla Christoph, especialista em prótese e implantodontia em Ipanema. 20+ anos, mínimo 1h por consulta, planejamento digital com iTero Element 5D."

### SEO-10 · Robots.txt bem feito · Nota 9/10
- Permite GPTBot, ChatGPT-User, Google-Extended, PerplexityBot, ClaudeBot
- Bloqueia CCBot (scraper)
- Aponta sitemap correto
- Bloqueia `/api/` e `*.map`

---

## Resumo Quick Wins SEO (todos esforço S)

1. SEO-1: unificar postalCode em `22410-901` — 3 arquivos
2. SEO-2: corrigir telephone para `+5521993304045` — 1 arquivo
3. SEO-3: decidir AggregateRating (remover ou documentar exceção) — 4 arquivos + 2 docs
4. SEO-4: alinhar openingHours com realidade — 2 arquivos + verificar com Dra. Carla
5. SEO-9: revisar meta description da homepage (opcional)

# TECH.md — Arquitetura Técnica e Estado Atual do Site

**Site:** https://dracarlachristoph.com  
**Última atualização:** Fevereiro 2026  
**Uso:** Mapa descritivo do estado atual. Quem for trabalhar no site lê este documento para entender o que existe, onde está, e como funciona — podendo então evoluir com conhecimento de causa.

---

## 1. Stack Tecnológico

| Camada | Tecnologia | Detalhes |
|--------|-----------|---------|
| Framework | React 18 + TypeScript | SPA (Single Page Application) |
| Build | Vite | Via Lovable platform |
| Estilização | Tailwind CSS | Com design tokens customizados |
| Roteamento | React Router DOM | Client-side routing |
| CMS (Blog) | Contentful | Headless CMS, API REST |
| Hosting | Vercel | Com API routes serverless (`/api/`) |
| Plataforma de desenvolvimento | Lovable | Alterações via prompts — não há git workflow tradicional |
| Domínio canônico | `dracarlachristoph.com` | Sem `www` |

---

## 2. Design System Atual

### 2.1 Paleta de Cores

Definida em `tailwind.config.ts` e `src/index.css`:

| Token | Hex | Uso |
|-------|-----|-----|
| `dental-purple` | `#381F47` | Títulos, backgrounds nobres, footer, foreground principal |
| `dental-gold` | `#B3955F` | Botões CTA, acentos, badges, destaques |
| `dental-gold-dark` | (variação mais escura do gold) | Subtítulos de credenciais |
| `dental-beige` | CSS var `--background` → HSL `51 22% 76%` (~`#CFCBB4`) | Background principal do site |
| `dental-gray` | `#6B6B6B` | Texto secundário, corpo de texto (contraste 5.4:1) |
| WhatsApp green | `#25D366` / hover `#1ea952` | Botões de WhatsApp |

**CSS Variables (`:root` em `src/index.css`):**
```css
--background: 51 22% 76%;       /* dental-beige */
--foreground: 252 42% 20%;      /* dental-purple */
--primary: 43 33% 54%;          /* copper gold */
--secondary: 0 0% 50%;          /* neutral gray */
--radius: 0.5rem;
```

### 2.2 Tipografia

| Uso | Fonte | Peso | Carregamento |
|-----|-------|------|-------------|
| Headings (h1–h6) | Playfair Display | 400 | Self-hosted WOFF2, `font-display: swap` |
| Body text | Montserrat | 400, 500 | Self-hosted WOFF2, `font-display: swap` |

Fontes servidas de `/fonts/` (não CDN), declaradas em `src/index.css` via `@font-face`.

Classes Tailwind aplicadas:
- `font-display` → Playfair Display (headings)
- `font-sans` → Montserrat (body, via Tailwind default override)

### 2.3 Classes Utilitárias Customizadas

Definidas em `src/index.css`:

| Classe | Uso |
|--------|-----|
| `section-spacing` | Espaçamento padrão entre seções |
| `container-custom` | Container centralizado com padding |
| `heading-xl` | H1 principal (hero) |
| `heading-lg` | H2 de seções |
| `heading-md` | H3 subseções |
| `shadow-soft` | Sombra suave em cards |
| `shadow-elegant` | Sombra mais pronunciada |
| `shadow-gold` | Sombra com tom gold |
| `bg-gradient-purple-soft` | Gradiente suave com dental-purple |

### 2.4 Componentes Visuais Recorrentes

| Componente | Onde aparece | Localização |
|-----------|-------------|-------------|
| `TreatmentHero` | Service pages ricas (Lentes, Prótese, Clareamento) | `src/components/` |
| `ServiceBreadcrumb` | Todas as service pages | `src/components/ServiceBreadcrumb.tsx` |
| `ProcessTimeline` | Passos do tratamento | `src/components/` |
| `QuickAnswerBox` | Resposta rápida SEO (AI Search) | `src/components/` |
| `SectionDivider` | Separação visual entre seções | `src/components/` |
| Accordion (FAQ) | Todas as service pages e LPs | shadcn/ui Accordion |
| `FloatingWhatsApp` | Landing pages (mobile) | `src/components/landing/FloatingWhatsApp.tsx` |
| `WhatsAppWidget` | Service pages e homepage | `src/components/WhatsAppWidget.tsx` |
| `OptimizedImage` | Imagens com lazy loading | `src/components/performance/` |
| `UltraOptimizedPicture` | Heroes de LPs (máxima performance) | `src/components/performance/` |
| `SEOHead` | Meta tags em pages com helmet | `src/components/seo/SEOHead.tsx` |
| `PageLayout` | Wrapper padrão PT (header + footer) | `src/components/PageLayout.tsx` |
| `EnPageLayout` | Wrapper EN (EnHeader + EnFooter) | `src/components/en/EnPageLayout.tsx` |
| `EnHeader` | Header inglês com nav + lang switch | `src/components/en/EnHeader.tsx` |
| `EnFooter` | Footer inglês com lang switch | `src/components/en/EnFooter.tsx` |
| `InternalLinkingOptimizer` | Links relacionados automáticos | `src/components/seo/InternalLinkingOptimizer.tsx` |

---

## 3. Estrutura de Pastas (Principais)

```
src/
├── components/
│   ├── landing/           # Componentes de landing pages
│   │   ├── consulta/      # Componentes compartilhados (ConsultaInicial*)
│   │   ├── clareamento/   # Componentes específicos de clareamento
│   │   └── FloatingWhatsApp.tsx
│   ├── performance/       # OptimizedImage, UltraOptimizedPicture
│   ├── seo/               # SEOHead, InternalLinkingOptimizer, SitemapUpdater
│   └── [componentes gerais]
├── config/                # Configs de landing pages (um arquivo por LP)
│   ├── clareamentoConfig.ts
│   ├── consultaInicialConfig.ts
│   ├── limpezaDentalConfig.ts
│   ├── lentesPorcelanaAcolhedorConfig.ts
│   ├── lentesPorcelanaProfissionalConfig.ts
│   ├── esteticaSorrisoGenericaConfig.ts
│   └── [outros configs de LP]
├── pages/                 # Uma page por rota
│   ├── Index.tsx          # Homepage
│   ├── AboutPage.tsx      # /sobre
│   ├── ContactPage.tsx    # /contato
│   ├── ServicesPage.tsx   # /servicos
│   ├── ServiceDetail.tsx  # Template simples de serviço
│   ├── ClareamentoDental.tsx    # Service page rica
│   ├── LentesEFacetas.tsx       # Service page rica
│   ├── ProteseDentaria.tsx      # Service page rica
│   ├── ImplantesDentarios.tsx   # Service page rica
│   ├── RestaureacoesEsteticas.tsx
│   ├── TratamentoDeCanal.tsx
│   ├── ClinicaGeralPrevencao.tsx
│   ├── SaudeDaGengiva.tsx
│   ├── Ortodontia.tsx
│   ├── LPLentesPorcelana.tsx    # Landing page
│   ├── [outras LPs]
│   ├── BlogPost.tsx
│   └── en/                      # English micro-site (7 pages)
│       ├── EnHomePage.tsx        # /en
│       ├── EnAboutPage.tsx       # /en/about
│       ├── EnContactPage.tsx     # /en/contact
│       ├── EnDentalImplantsPage.tsx     # /en/dental-implants
│       ├── EnPorcelainVeneersPage.tsx   # /en/porcelain-veneers
│       ├── EnGeneralDentistryPage.tsx   # /en/general-dentistry
│       └── EnDentalEmergencyPage.tsx    # /en/dental-emergency
├── types/
│   └── LandingPageConfig.ts  # Interface TypeScript das configs de LP
├── utils/
│   ├── gclid.ts           # Captura e envio de GCLID
│   ├── urlRedirects.ts    # Mapa de redirects de URLs antigas
│   └── sitemapGenerator.ts
├── index.css              # Tailwind + custom CSS + font-face
└── App.tsx                # Router principal
scripts/
└── generate-static-meta.cjs  # Geração build-time de HTMLs estáticos para meta tags
api/
├── contact.js             # Formulário → Web3Forms (atualmente desativado, WhatsApp é suficiente)
├── sitemap.js             # Sitemap dinâmico com Contentful
└── sitemap-edge.js        # Versão edge do sitemap
```

---

## 4. Tipos de Página

O site tem **4 categorias** de página com arquiteturas distintas:

### 4.1 Service Pages Ricas

Páginas com layout completo e customizado, com seções múltiplas:

| Rota | Arquivo | Características |
|------|---------|----------------|
| `/clareamento-dental` | `ClareamentoDental.tsx` | TreatmentHero, bio, FAQ com Schema, timeline |
| `/lentes-de-contato-dental-e-facetas-de-resina` | `LentesEFacetas.tsx` | Layout mais elaborado do site |
| `/protese-dentaria` | `ProteseDentaria.tsx` | TreatmentHero, bio, processo |
| `/implantes-dentarios` | `ImplantesDentarios.tsx` | Template rico |
| `/ortodontia` | `Ortodontia.tsx` | Dois profissionais (Dra. Carla + Dr. Bruno) |

### 4.2 Service Pages Simples

Usam estrutura mais enxuta ou template compartilhado:

| Rota | Arquivo |
|------|---------|
| `/restauracoes-esteticas` | `RestaureacoesEsteticas.tsx` |
| `/tratamento-de-canal` | `TratamentoDeCanal.tsx` |
| `/clinica-geral-e-prevencao` | `ClinicaGeralPrevencao.tsx` |
| `/saude-da-gengiva` | `SaudeDaGengiva.tsx` |

### 4.3 Landing Pages (Google Ads)

Todas as LPs seguem a mesma arquitetura:
1. **Config file** em `src/config/[nome]Config.ts` — implementa `LandingPageConfig` interface
2. **Page file** em `src/pages/LP[Nome].tsx` — monta os componentes compartilhados com dados do config
3. **Componentes compartilhados** em `src/components/landing/consulta/`:
   - `ConsultaInicialHeader`
   - `ConsultaInicialHero` (com `UltraOptimizedPicture`)
   - `ConsultaInicialProblem`
   - `ConsultaInicialGuide`
   - `ConsultaInicialSocialProof`
   - `ConsultaInicialFAQ`
   - `ConsultaInicialCTA`
   - `ClareamentoFooter`
   - `FloatingWhatsApp`

**Interface `LandingPageConfig`** (em `src/types/LandingPageConfig.ts`):
```typescript
{
  campaign: string;
  messageMatch: { adGroup: string; keyword: string; };
  whatsapp: { number: string; message: string; };
  hero: { headline, subheadline, ctaText, backgroundImage?, videoUrl? };
  benefits: string[];
  problem: { title, description, problems: string[] };
  guide: { title, subtitle, steps: Array<{ number, title, description }> };
  socialProof: { title, testimonials[], stats?[] };
  faq: { title, questions: Array<{ question, answer }> };
  cta: { title, subtitle, buttonText, urgency? };
  contact: { whatsappNumber, whatsappMessage, doctorName, clinicName };
  seo: { title, description, keywords? };
  tracking: { gtagId?, gtmId?, facebookPixelId? };
}
```

**LPs existentes (13 total):**

| Rota | Config File | Campanha |
|------|-------------|----------|
| `/lp/limpeza-dental-ipanema` | `limpezaDentalConfig.ts` | limpeza-dental-premium |
| `/lp/profilaxia-dental-ipanema` | (compartilha com limpeza ou similar) | profilaxia |
| `/lp/estetica-dental-ipanema` | `esteticaSorrisoGenericaConfig.ts` | Lentes de Contato - Zona Sul |
| `/lp/saude-gengival-ipanema` | (config próprio) | saúde gengival |
| `/lp/clareamento-dental` | `clareamentoConfig.ts` | clareamento |
| `/lp/consulta-inicial` | `consultaInicialConfig.ts` | consulta-inicial-premium |
| `/lp/ortodontia-ipanema` | (config próprio) | ortodontia |
| `/lp/dor-de-dente-urgencia-ipanema` | (config próprio) | urgência dor |
| `/lp/dente-quebrado-urgencia-ipanema` | (config próprio) | urgência quebrado |
| `/lp/emergencia-odontologica-ipanema` | (config próprio) | emergência |
| `/lp/especialista-protese-ipanema` | (config próprio) | prótese |
| `/lp/implantes-dentarios-ipanema` | (config próprio) | implantes |
| `/lp/lentes-porcelana-ipanema` | `lentesPorcelanaAcolhedorConfig.ts` | Lentes de Contato - Zona Sul |

Todas as LPs têm `<meta name="robots" content="noindex, nofollow" />`.

### 4.4 Páginas Institucionais

| Rota | Arquivo | Status |
|------|---------|--------|
| `/` | `Index.tsx` | ✅ Ativa — homepage com seções (hero, serviços, depoimentos, contato) |
| `/sobre` | `AboutPage.tsx` | ✅ Ativa (reativada na Fase 3) |
| `/contato` | `ContactPage.tsx` | ✅ Ativa (reativada na Fase 3) |
| `/servicos` | `ServicesPage.tsx` | ✅ Ativa — grid de cards com links para service pages |
| `/blog` | Blog index (Contentful) | ✅ Ativa |
| `/blog/:slug` | `BlogPost.tsx` (Contentful) | ✅ Ativa |
| `/politica-de-privacidade` | Página legal | ✅ Ativa |
| `/termos-de-uso` | Página legal | ✅ Ativa |

---

## 5. SEO e Pre-rendering

### Problema Fundamental

Como React SPA, o conteúdo é renderizado client-side. Crawlers que não executam JavaScript não veem o conteúdo real.

### Solução Atual: `generate-static-meta.cjs`

Script de build que gera arquivos HTML estáticos em `/dist/` com meta tags corretas para cada rota.

**Localização:** `scripts/generate-static-meta.cjs`

**O que gera para cada página:**
- `<title>`
- `<meta name="description">`
- Open Graph tags (`og:title`, `og:description`, `og:type`, `og:url`, `og:image`)
- Canonical URL
- `noindex` para landing pages

**Limitação conhecida:** Blog posts individuais (`/blog/:slug`) **não têm** HTML estático — meta tags dependem de React Helmet rodando no client.

### Structured Data (JSON-LD)

Cada service page inclui Schema.org via `<script type="application/ld+json">` no Helmet:
- `MedicalProcedure` para tratamentos
- `FAQPage` para seções de FAQ
- `Dentist` / `Person` para profissionais
- `LocalBusiness` na homepage
- `WebSite` com `SearchAction` via `SitemapUpdater.tsx`

### Sitemap

Gerado dinamicamente via API serverless: `api/sitemap.js` e `api/sitemap-edge.js`.
- Inclui páginas estáticas + posts do Contentful
- Se Contentful falhar, retorna fallback com apenas 2 URLs
- **Ponto de atenção:** dependência runtime do Contentful

### Redirects

Mapa extenso de redirects em `src/utils/urlRedirects.ts`:
- URLs antigas com trailing slash
- URLs WordPress
- URLs de serviços antigos
- Redirect de `/lentes-de-contato-dental-e-facetas-de-porcelana` → `/lentes-de-contato-dental-e-facetas-de-resina`

---

## 6. Performance (Estado Atual)

### Problemas Conhecidos

| Problema | Impacto | Status |
|----------|---------|--------|
| FCP 3.1s na homepage mobile | Core Web Vitals | ⚠️ Não resolvido |
| LCP 3.6s na homepage mobile | Core Web Vitals | ⚠️ Não resolvido |
| Imagem hero não otimizada | LCP | ⚠️ Não resolvido |
| Service worker pode cachear scripts de tracking | Tracking accuracy | ⚠️ Não verificado |

### Otimizações Já Implementadas

- Fontes self-hosted com `font-display: swap`
- Imagens em WebP
- Componentes de LP carregados com `React.lazy()` + `Suspense`
- `UltraOptimizedPicture` para heroes de LP
- `OptimizedImage` com lazy loading para demais imagens
- `ContentfulBlockerForNonBlogPages` — evita chamadas desnecessárias ao Contentful fora do blog

---

## 7. Problemas Técnicos Conhecidos (Não Resolvidos)

| # | Problema | Contexto |
|---|----------|----------|
| 1 | Blog posts sem HTML estático | Meta tags dependem de JS (React Helmet) |
| 2 | Sitemap com dependência runtime do Contentful | Falha no Contentful = sitemap incompleto |
| 3 | FCP/LCP lentos no mobile | Hero image da homepage |
| 4 | Service worker vs tracking | Possível cache de scripts de analytics |
| 5 | Redundância service pages vs LPs | Mesmo tratamento com duas URLs (orgânica + paid) |
| 6 | `min-height` wrapper causando whitespace | Em algumas pages, excesso de espaço branco |

---

## 8. Ambiente de Desenvolvimento

### Lovable Platform

O site é desenvolvido via **Lovable** — uma plataforma que aceita prompts em linguagem natural e aplica mudanças no código.

**Implicações:**
- Não há git workflow tradicional (branch, PR, merge)
- Mudanças são feitas via "prompts Lovable"
- O repositório é acessível via GitHub (Lovable faz commits automáticos)
- Cada prompt gera um ou mais commits
- **Regra de segurança:** Cada prompt deve especificar claramente o que NÃO deve ser alterado, para evitar efeitos colaterais

### Deploy

- **Hosting:** Vercel
- **Deploy:** Automático a partir do repositório
- **Domínio:** `dracarlachristoph.com` (sem www)
- **API routes:** `/api/` (serverless functions no Vercel)

# CLAUDE.md — Central Brain do Projeto

**Site:** https://dracarlachristoph.com
**Consultório:** Dra. Carla Christoph — Dentista Especialista em Ipanema
**Última atualização:** Abril 2026
**Propósito:** Documento único e autoritativo para qualquer agente (Claude Code, Antigravity, Lovable) que trabalhe neste projeto. Leia inteiro antes de qualquer ação.

---

## 0. Hierarquia de Documentos

Este projeto possui documentação modular. O CLAUDE.md é o ponto de entrada — ele sintetiza e aponta para os documentos especializados:

| Documento | Escopo | Quando Ler |
|-----------|--------|------------|
| **CLAUDE.md** (este) | Visão 360°, regras invioláveis, contexto rápido | **Sempre — primeiro** |
| [BRAND.md](BRAND.md) | Tom de voz, palavras banidas, posicionamento, depoimentos | Antes de escrever qualquer conteúdo |
| [TECH.md](TECH.md) | Stack, design system, componentes, pastas, SEO técnico | Antes de qualquer alteração de código |
| [BUSINESS.md](BUSINESS.md) | Números do negócio, público-alvo, concorrência, automações | Decisões estratégicas |
| [CONTENT.md](CONTENT.md) | Templates de páginas, funil, regras de SEO, checklists | Criar/editar páginas |
| [TRACKING.md](TRACKING.md) | GTM, GCLID, dataLayer, conversões, pipeline de atribuição | Qualquer trabalho com CTAs/tracking |
| [PROJECT-STATUS.md](PROJECT-STATUS.md) | Pilares da revisão 360°, sprints, findings | Planejamento e priorização |
| [REDESIGN-TRACKER.md](REDESIGN-TRACKER.md) | Fases do redesign v2, log de decisões | Trabalho no redesign |

---

## 1. Regras Invioláveis (NUNCA QUEBRAR)

### 1.1 Regulamentação CRO/CFO
- ❌ **NUNCA mencionar preços** — proibido pelo CRO em qualquer canal
- ❌ **NUNCA usar fotos antes/depois** — regulamentação proíbe
- ❌ **NUNCA usar fotos de procedimentos** (bocas abertas, instrumentos)
- ❌ **NUNCA garantir resultados** — "sorriso perfeito", "100% seguro", "indolor"
- ❌ **NUNCA criticar outros dentistas** — nem implicitamente
- ✅ CRO-RJ 27.509 **sempre visível** em materiais de marketing

### 1.2 Palavras e Frases BANIDAS
Estas **jamais** devem aparecer em conteúdo do site:

| ❌ Banido | ✅ Usar em vez disso |
|----------|---------------------|
| "sorriso perfeito" | "sorriso que combina com você" |
| "transforme seu sorriso" | "recupere a confiança no seu sorriso" |
| "premium" | **nunca** — mostrar, não dizer |
| "excelência" | remover completamente |
| "humanizado" | "tempo para ouvir, explicar e planejar" |
| "tecnologia de ponta" | nomear: "scanner iTero Element 5D" |
| "profissionais altamente qualificados" | "Especialista em Prótese e Implantodontia" |
| "solução definitiva" | "reabilitação permanente" |
| "resultados excepcionais" | "resultados naturais e previsíveis" |
| "100% natural" | "natural ao ponto de passar despercebido" |
| "atendimento personalizado" | "mínimo de 1 hora por consulta" |
| "materiais de alta qualidade" | nomear o material real |
| "agende agora" / "não perca" | "agende sua consulta pelo WhatsApp" |
| "avaliação" (em CTAs e agendamento) | "consulta" — ver regra de disambiguação abaixo |

**Princípio**: Se uma frase poderia ser usada por qualquer dentista do Brasil, ela é genérica demais.

### 1.3 Disambiguação: "Avaliação" vs. "Consulta"

> ⚠️ **REGRA INVIOLÁVEL — Abril 2026**

A palavra **"avaliação"** causa confusão real: pacientes chegam ao consultório acreditando que a primeira visita é **gratuita**. Isso acontece porque "avaliação" tem dois significados no ecossistema:

| Contexto | Significado Real | Custo |
|----------|-----------------|-------|
| "Agende sua avaliação" (CTA) | Consulta inicial completa (exame + limpeza + plano) | R$ 600 (NÃO mencionar no site) |
| "Avaliação periodontal" (clínico) | Análise diagnóstica dentro de um procedimento | Incluso ou gratuito para pacientes ativos |

**Regras:**
- ✅ **"Consulta"** — usar em CTAs, botões, mensagens WhatsApp, convites para agendamento
- ✅ **"Avaliação"** — usar APENAS em contexto técnico/diagnóstico (ex: "avaliação periodontal", "avaliação tomográfica", "avaliação do caso")
- ❌ **NUNCA** usar "avaliação" quando o significado real é "consulta com custo"
- ❌ **NUNCA** usar "avaliação gratuita", "avaliação sem compromisso"

**Exemplos:**
| ❌ Errado | ✅ Correto |
|-----------|------------|
| "Agende sua avaliação" | "Agende sua consulta" |
| "Avaliação completa" (CTA) | "Consulta completa" |
| "Marcar avaliação" (WhatsApp) | "Marcar consulta" / "agendar consulta" |
| "Avaliação periodontal" (clínico) | ✅ Manter — é técnico |
| "Avaliação Google" (review) | ✅ Manter — é outro contexto |

### 1.4 Atribuição de Tratamentos — Quem Faz o Quê

**CRÍTICO:** A Dra. Carla NÃO faz canal nem periodontia. Nunca afirmar que ela faz.

| Tratamento | Quem Executa | Papel da Dra. Carla |
|-----------|-------------|---------------------|
| Implantes | **Dra. Carla** (Implantodontia) | Executa |
| Prótese | **Dra. Carla** (Prótese Dentária) | Executa |
| Lentes/Facetas | **Dra. Carla** | Executa |
| Clareamento | **Dra. Carla** | Executa |
| Restaurações | **Dra. Carla** | Executa |
| Clínica Geral | **Dra. Carla** | Executa |
| Ortodontia | **Dr. Bruno** (CRO-RJ 41.684) | Acompanha jornada |
| Canal | Endodontista parceiro | Diagnóstico + finalização |
| Gengiva | Periodontista parceiro | Diagnóstico + manutenção |

- Dr. Bruno = **"Dr. Bruno"** (sem sobrenome "Christoph" — ele NÃO é da família)
- Dr. Bruno = Doutor em Ortodontia pela UERJ, Professor IOPUC-Rio

### 1.5 Tracking — Regras de Segurança
- GTM **só carrega** via `index.html` — nunca em componentes React
- GCLID usa **localStorage** — nunca sessionStorage
- Toda ação de WhatsApp DEVE: disparar `dataLayer.push` + `gtag conversion` + `sendGCLIDToWebhook()`
- Conversion ID: `AW-16894364517/OQZvCMXV0foZEOqP7vY9` — nunca mudar sem atualizar todos os pontos
- Delay do GTM: **2 segundos** — não aumentar sem justificativa

---

## 2. Identidade da Marca (Resumo)

### Essência
**Luxo silenciosa**. O posicionamento é premium, mas a comunicação NUNCA se autodeclara como tal. O paciente percebe a qualidade pela experiência.

### Pilares
1. **Tempo** — Mínimo 1h por consulta, sem pressa
2. **Individualização** — Cada caso é único, sem protocolo padrão
3. **Materiais de primeira linha** — Nomear sempre (ex: "porcelana de alta translucidez")
4. **Transparência** — Paciente sai entendendo tudo
5. **Jornada completa** — Mesmo com parceiros, Dra. Carla acompanha e finaliza

### Tom de Voz
Profissional experiente conversando com paciente. **Seguro, direto, acolhedor, específico, sem pressa, respeitoso.**

### Bio Canônica
Usar em todas as páginas:
> **Dra. Carla Christoph** — CRO-RJ 27.509
> Especialista em Prótese Dentária e Implantodontia
>
> Com mais de duas décadas em Ipanema, a Dra. Carla construiu sua reputação tratando cada paciente de forma individual, com tempo e atenção. Sua formação inclui 8 anos como dentista militar na Odontoclínica Central da Marinha, experiência que trouxe disciplina e precisão para sua prática clínica.

Cada service page adiciona uma **frase contextual** — ver `BRAND.md` Seção 1.

### Depoimentos — Formato Obrigatório
```
"[Texto do depoimento — tom conversacional, fato concreto]"
— Nome I. — Bairro
```
- ❌ Sem estrelas, sem profissão, sem "recomendo"/"incrível"/"perfeita"
- ✅ Bairros: Ipanema, Leblon, Copacabana, Jardim Botânico, Lagoa, Gávea, Humaitá, Botafogo, Barra

---

## 3. Stack Tecnológico

| Camada | Tecnologia | Notas |
|--------|-----------|-------|
| Framework | React 18 + TypeScript | SPA |
| Build | Vite 5 + SWC | `asyncCSSPlugin` + terser 3-pass |
| Estilização | Tailwind CSS 3 | Tokens em `tailwind.config.ts` + `src/index.css` |
| UI Components | shadcn/ui + Radix | Accordion, Dialog, Toast, etc. |
| Roteamento | React Router DOM 6 | Client-side, lazy loading via `React.lazy` |
| CMS | Contentful | Blog posts via REST API |
| State | TanStack Query | Para dados Contentful |
| Hosting | Vercel | Região `gru1` (São Paulo) |
| Domínio | `dracarlachristoph.com` | Sem www |
| Plataforma dev | Lovable + IDE local | Commits automáticos + manuais |
| Pre-rendering | `generate-static-meta.cjs` + `generate-blog-html.js` | Build-time HTML com meta tags |

### Scripts Importantes
```bash
npm run dev          # Dev server (porta 8080)
npm run build        # Build produção
npm run build:full   # Build + blog HTML + sitemap
```

### Build Command (Vercel)
```bash
npm run build && node scripts/generate-static-meta.cjs && node scripts/generate-blog-html.js
```

### Variáveis de Ambiente (`.env`)
```
VITE_CONTENTFUL_SPACE_ID=...
VITE_CONTENTFUL_ACCESS_TOKEN=...
```

---

## 4. Arquitetura de Páginas

### 4.1 Mapa de Rotas

```
/ ......................... Homepage (10 seções)
/sobre .................... Institucional — Sobre
/contato .................. Institucional — Contato
/servicos ................. Hub de serviços (grid)
/blog ..................... Blog index (Contentful)
/blog/:slug ............... Blog post (Contentful)

SERVICE PAGES (SEO — indexáveis):
/clareamento-dental
/implantes-dentarios
/lentes-de-contato-dental-e-facetas-de-resina
/protese-dentaria
/ortodontia
/restauracoes-esteticas
/tratamento-de-canal
/clinica-geral-e-prevencao
/saude-da-gengiva

LANDING PAGES (Google Ads — noindex):
/lp/consulta-inicial
/lp/clareamento-dental
/lp/lentes-porcelana-ipanema
/lp/lentes-profissional-ipanema
/lp/facetas-resina-ipanema
/lp/implantes-dentarios-ipanema
/lp/especialista-protese-ipanema
/lp/ortodontia-ipanema
/lp/limpeza-dental-ipanema
/lp/estetica-dental-ipanema
/lp/saude-gengival-ipanema
/lp/dor-de-dente-urgencia-ipanema
/lp/dente-quebrado-urgencia-ipanema
/lp/emergencia-odontologica-ipanema

ENGLISH MICRO-SITE:
/en .................. English Home
/en/about ............ About
/en/contact .......... Contact
/en/dental-implants
/en/porcelain-veneers
/en/general-dentistry
/en/dental-emergency

ENGLISH LANDING PAGES (Google Ads — noindex):
/en/lp/cosmetic-dentistry
```

### 4.2 Estrutura de Pastas Crítica

```
src/
├── App.tsx                    # Router principal (todas as rotas)
├── index.css                  # Tailwind + @font-face + custom utilities
├── components/
│   ├── Hero.tsx               # Hero da homepage
│   ├── Header.tsx             # Header com dropdown de Tratamentos
│   ├── Footer.tsx             # Footer global
│   ├── PageLayout.tsx         # Wrapper PT (Header + Footer)
│   ├── treatment/
│   │   └── TreatmentHero.tsx  # Hero das service pages ricas
│   ├── landing/
│   │   ├── consulta/          # Componentes compartilhados de LP
│   │   ├── clareamento/       # Componentes específicos de clareamento
│   │   └── FloatingWhatsApp.tsx
│   ├── performance/           # OptimizedImage, UltraOptimizedPicture
│   ├── seo/                   # SEOHead, InternalLinkingOptimizer, GlobalSchemas
│   ├── en/                    # EnHeader, EnFooter, EnPageLayout
│   └── ui/                    # shadcn/ui components
├── config/                    # Configs de LP (LandingPageConfig interface)
├── pages/                     # Uma page por rota
│   ├── en/                    # English micro-site pages
│   └── [service pages, LPs, etc.]
├── utils/
│   ├── gclid.ts               # Captura e envio de GCLID
│   └── urlRedirects.ts        # Mapa de redirects
├── hooks/
│   └── useScrollReveal.ts     # IntersectionObserver para animações
├── services/
│   └── contentful/            # Client Contentful
├── types/
│   └── LandingPageConfig.ts   # Interface das configs de LP
└── layouts/
    └── BlogLayout.tsx         # Layout com Query scope para blog

scripts/
├── generate-static-meta.cjs  # Pre-rendering HTML (28 páginas + 88 FAQs)
└── generate-blog-html.js     # Pre-rendering blog posts (65+)

api/
├── sitemap.js                 # Sitemap dinâmico (Contentful)
└── robots.js                  # robots.txt (permite AI bots)
```

---

## 5. Design System

### Cores
| Token | Valor | Uso |
|-------|-------|-----|
| `dental-purple` | `#381F47` | Títulos, backgrounds nobres, footer |
| `dental-gold` | `#B3955F` | CTAs, acentos, badges |
| `dental-beige` | HSL `51 22% 76%` (~`#CFCBB4`) | Background principal |
| `dental-gray` | `#6B6B6B` | Texto secundário |
| WhatsApp green | `#25D366` | Botões WhatsApp |

### Tipografia
- **Headings:** Playfair Display (400, 600) — self-hosted WOFF2
- **Body:** Montserrat (400, 500) — self-hosted WOFF2
- Classe `font-display` → Playfair, `font-sans` → Montserrat

### Classes Customizadas
| Classe | Uso |
|--------|-----|
| `bg-gradient-purple-soft` | Gradiente suave dental-purple |
| `shadow-elegant` | Sombra pronunciada em heroes |
| `shadow-soft` | Sombra suave em cards |
| `heading-xl/lg/md` | Hierarquia de headings |
| `section-spacing` | Espaçamento padrão entre seções |

⚠️ **CUIDADO com `index.css`**: Há definições de gradientes e sombras em `@layer utilities` que são críticas para a identidade visual. Qualquer alteração deve considerar a **especificidade** das classes — este foi o bug mais sério encontrado no redesign v2.

---

## 6. Landing Pages — Arquitetura

### Padrão de Criação
1. **Config**: `src/config/[nome]Config.ts` implementa `LandingPageConfig`
2. **Page**: `src/pages/LP[Nome].tsx` monta componentes com dados do config
3. **Componentes**: em `src/components/landing/consulta/` (compartilhados)
4. **Rota**: adicionar em `App.tsx`
5. **Meta tags**: adicionar em `scripts/generate-static-meta.cjs`

### Interface LandingPageConfig (campos obrigatórios)
```typescript
{
  campaign: string;
  messageMatch: { adGroup, keyword };
  whatsapp: { number, message };
  hero: { headline, subheadline, ctaText };
  benefits: string[];
  problem: { title, description, problems[] };
  guide: { title, subtitle, steps[] };
  socialProof: { title, testimonials[], stats[] };
  faq: { title, questions[] };
  cta: { title, subtitle, buttonText };
  seo: { title, description };
  tracking: { gtagId?, gtmId? };
}
```

### Regras de LP
- **noindex, nofollow** obrigatório
- Headline = message match com keyword do Google Ads
- Sem navegação do site (LP é isolada)
- `captureGCLID()` no `useEffect`
- Cada CTA chama `sendGCLIDToWebhook()` com label único

---

## 7. SEO — Estado e Decisões

### Pre-rendering (Crítico)
O site é SPA. Sem pre-rendering, crawlers não veem conteúdo.

- `generate-static-meta.cjs`: 28 páginas estáticas + 88 FAQs + Schema JSON-LD (build-time)
- `generate-blog-html.js`: 65+ blog posts com BlogPosting schema (build-time)
- **Limitação**: Blog posts individuais sem HTML estático nativo (depende do script)

### Schema.org Implementado
- `LocalBusiness` + `Dentist` na homepage
- `MedicalProcedure` + `FAQPage` em service pages
- `BlogPosting` em posts
- `WebSite` com `SearchAction`
- **NUNCA** usar `AggregateRating` fabricado

### Sitemap
- Gerado dinamicamente: `api/sitemap.js`
- Inclui páginas estáticas + posts Contentful
- Dependência runtime do Contentful (fallback se falhar)

### AI Bots
- `robots.js` permite GPTBot, PerplexityBot, ClaudeBot, Google-Extended

---

## 8. Git & Deploy

### Branches
| Branch | Propósito | Status |
|--------|----------|--------|
| `main` | Produção | ✅ Ativo — deploy automático Vercel |
| `redesign/v2` | Redesign layout | Mergeado em main (hash: `f7cf2ce`) |

### Deploy — Workflow Obrigatório
> ⚠️ **TODA alteração para produção deve ser feita via `git push` para o GitHub.**
> O GitHub dispara automaticamente o deploy no Vercel. Nunca fazer deploy manual.

1. `git add .` → `git commit -m "descrição"` → `git push origin main`
2. Vercel detecta o push e faz build + deploy automático
3. Verificar em https://vercel.com se o deploy passou

- **Vercel** com deploy automático de `main`
- Região: `gru1` (São Paulo)
- **Rollback de emergência**: `git revert -m 1 f7cf2ce`

### Vercel Config Crítico
- `cleanUrls: true` — URLs sem extensão
- Redirects: `/lp/profilaxia` → `/lp/limpeza`, URLs antigas WordPress
- Rewrites: `/sitemap.xml` → `/api/sitemap`, catch-all → `/index.html`
- Security headers: X-Frame-Options, X-Content-Type-Options, etc.
- Cache imutável: `/fonts/*` e `/lovable-uploads/*` (1 ano)

---

## 9. Automações e Integrações

### WhatsApp 24h (N8N)
- Fluxo humanizado que responde fora do horário
- Isso é **REAL** e pode ser comunicado
- Número: +55 21 99330-4045

### Blog Pipeline
```
Perplexity (pesquisa) → N8N (processamento) → Revisão Dra. Carla → Contentful
```

### GCLID Pipeline (Atribuição Offline)
```
Google Ads click → Frontend captura GCLID →
WhatsApp click → Webhook N8N → Supabase →
Upload manual ao Google Ads (cada 15 dias)
```

### Sofia (Assistente WhatsApp)
- Versão atual: V2.1
- Workflow N8N com knowledge base
- Integrada com Z-API para WhatsApp Business
- Funcionalidades: atendimento 24h, birthday greetings, recall, Google Reviews

---

## 10. Performance — Estado Atual

### Implementado ✅
- Fontes self-hosted WOFF2 + `font-display: swap`
- Imagens WebP + lazy loading (`OptimizedImage`, `UltraOptimizedPicture`)
- `React.lazy()` + `Suspense` em todas as pages
- `ContentfulBlockerForNonBlogPages` — evita chamadas desnecessárias
- Async CSS plugin (non-blocking em produção)
- Terser ultra-agressivo (3 passes, drop_console)
- Manual chunks otimizados no Vite (LCP-first)

### Problemas Conhecidos ⚠️
| Problema | Impacto | Status |
|----------|---------|--------|
| FCP 3.1s / LCP 3.6s homepage mobile | Core Web Vitals | ⚠️ Não resolvido |
| Blog posts sem HTML estático nativo | SEO | ⚠️ Mitigado com script |
| Sitemap com dependência runtime Contentful | Confiabilidade | ⚠️ Fallback implementado |
| iOS converte 2.4x mais que Android | UX mobile | ⚠️ Investigar |

---

## 11. Decisões Consolidadas (NÃO REVISITAR)

Estas decisões já foram tomadas e aprovadas:

| Decisão | Razão |
|---------|-------|
| Fotos antes/depois = ❌ | CRO proíbe |
| Formulário de contato = ❌ Removido | WhatsApp é suficiente |
| Preços = ❌ Nunca | CRO proíbe |
| Emergência fora de `/servicos` | Existe só como LP para demanda ociosa |
| Clínica Geral = template simples | Decisão deliberada |
| Dr. Bruno = "Dr. Bruno" | Sem sobrenome Christoph |
| Canal/Periodontia = parceiros | Dra. Carla coordena, não executa |
| Blog formato Q&A | Melhor para AI Search |
| `AggregateRating` = ❌ Removido | Era fabricado |
| GTM delay = 2 segundos | Reduzido de 8s (perdia conversões) |
| GCLID em localStorage | sessionStorage causava perda de dados |
| Scanner = "iTero Element 5D" | Nome correto e diferenciador |
| Sem "consulta sem compromisso" | Posicionamento premium/particular |
| "Avaliação" → "Consulta" em CTAs | Pacientes confundiam com serviço gratuito (Auditoria Abril/2026) |
| Conversion ID único = `AW-16894364517/OQZvCMXV0foZEOqP7vY9` | IDs customizados (`/LP_limpeza_*`) não existem no Google Ads → não contavam (Auditoria Maio/2026) |
| English LPs capturam GCLID + tracking completo | Validado via grep — auditor anterior se enganou ao reportar gap (Maio/2026) |
| AI Max — Final URL expansion OFF na Clínica Geral | Estava redirecionando tráfego paid para `/` (homepage), bypassando as 4 LPs corretas dos ad groups (Maio/2026) |

---

## 12. Erros Comuns (NÃO COMETER!)

### ❌ Sugerir o que JÁ EXISTE
- Landing pages: 15+ já existem
- Schema markup: já implementado em todas as pages
- Badge reviews: já está no Header.tsx
- Blog CTA: BlogCTA.tsx já criado
- **SEMPRE verificar** com grep/busca antes de sugerir

### ❌ Usar dados financeiros errados
- Google Ads: **~R$ 9k/mês** (NÃO R$ 1M)
- Ticket médio: **R$ 800-1.000**
- BigQuery tinha valores inflacionados por agregação

### ❌ Ignorar especificidade do CSS
- Alterações em `index.css` podem quebrar gradientes/sombras em produção
- O bug mais crítico do redesign v2 foi exatamente isto
- Sempre testar visualmente após editar CSS global

### ❌ Esquecer tracking em novos CTAs
- Copier um handler existente e ajustar o label
- Nunca criar CTA sem: dataLayer.push + gtag + sendGCLIDToWebhook

### ❌ Alterar sem verificar impacto
- Cada mudança no Lovable deve especificar **o que NÃO alterar**
- Commits no Lovable são automáticos — sem PR review

---

## 13. Projetos e Sistemas Relacionados

| Sistema | Propósito | Status |
|---------|----------|--------|
| **Web App de Gestão** (Supabase) | Gestão clínica: pacientes, financeiro, recalls | Em desenvolvimento ativo |
| **Sofia V2.1** (N8N + Z-API) | Assistente WhatsApp: atendimento, reviews, birthday | Produção |
| **Google Ads** (AW-16894364517) | Campanhas Pesquisa — 6 ativas | Produção |
| **Contentful** | CMS headless para blog | Produção |
| **N8N** (selfhosted) | Automações: blog pipeline, GCLID, Sofia | Produção |
| **Supabase** | Database para web app + edge functions | Produção |

---

## 14. Contatos e Dados do Consultório

| Dado | Valor |
|------|-------|
| Profissional | Dra. Carla Christoph |
| CRO-RJ | 27.509 |
| Especialidades | Prótese Dentária, Implantodontia |
| Endereço | Rua Visconde de Pirajá, 550 — Sala 1107, Ipanema, RJ |
| CEP | 22410-002 |
| WhatsApp | +55 21 99330-4045 |
| Email | contato@dracarlachristoph.com |
| Instagram | @dracarlachristoph |
| Horário | Seg-Sex 9h-19h |
| Convênios | ❌ Não — 100% particular |

---

## 15. Checklist Rápido — Antes de Qualquer Mudança

```
□ Li este CLAUDE.md por completo
□ Verifiquei se o que vou implementar já não existe (grep/busca)
□ Verifiquei BRAND.md para palavras banidas se vou escrever copy
□ Verifiquei TRACKING.md se vou criar/editar CTAs
□ Não estou mencionando preços, garantindo resultados, ou usando fotos proibidas
□ Atribuição de tratamentos está correta (Dra. Carla vs. parceiros)
□ Dr. Bruno = "Dr. Bruno" (sem Christoph)
□ Novo CTA tem: dataLayer.push + gtag + sendGCLIDToWebhook
□ Nenhum CTA usa "avaliação" — usar "consulta" (ver Seção 1.3)
□ Testei visualmente se mexi no CSS global
□ Meta tags e Schema.org estão presentes se criei página nova
□ noindex/nofollow se for landing page
```

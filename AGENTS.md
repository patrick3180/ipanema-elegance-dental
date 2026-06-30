# AGENTS.md — Central Brain do Projeto (Antigravity / Gemini)
#
# ⚠️  SINCRONIZAÇÃO OBRIGATÓRIA:
# Este arquivo é uma cópia otimizada do CLAUDE.md para o Antigravity IDE (Gemini).
# Os DOIS arquivos devem estar SEMPRE sincronizados:
#   • CLAUDE.md  → usado pelo Claude Code / Claude CLI
#   • AGENTS.md  → usado pelo Antigravity IDE / Gemini
#
# Nota: Caso sua versão legada ou customizada do Antigravity/Claude procure por 'claude.umd' ou 'agents.umd',
# estes são os arquivos canônicos correspondentes (CLAUDE.md e AGENTS.md) e devem ser mantidos sempre em sync.
#
# Se alterar um, atualize o outro imediatamente.
# Última sincronização: 2026-06-17 (Sprint 8b / V4)
#

**Site:** https://dracarlachristoph.com
**Consultório:** Dra. Carla Christoph — Dentista Especialista em Ipanema
**Última atualização:** Junho 2026 (Sprint 8b / V4 — Performance)
**Propósito:** Documento único e autoritativo para qualquer agente que trabalhe neste projeto. Leia inteiro antes de qualquer ação.

---

## 0. Hierarquia de Documentos

Este projeto possui documentação modular. O CLAUDE.md é o ponto de entrada — ele sintetiza e aponta para os documentos especializados:

| Documento | Escopo | Quando Ler |
|-----------|--------|------------|
| **CLAUDE.md** (este) / **AGENTS.md** | Visão 360°, regras invioláveis, contexto rápido | **Sempre — primeiro** |
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
| "materiais de alta qualidade" | nomear o material real (ver exceção abaixo) |
| "agende agora" / "não perca" | "agende sua consulta pelo WhatsApp" |
| "avaliação" (em CTAs e agendamento) | "consulta" — ver regra de disambiguação abaixo |

**Princípio**: Se uma frase poderia ser usada por qualquer dentista do Brasil, ela é genérica demais.

**Exceções autorizadas (Maio/2026):**

- **Clareamento — "materiais de alta qualidade":** o gel clareador varia conforme o caso e a preferência da Dra. Carla. Para LPs/seções de clareamento, expressões como "Materiais de Alta Qualidade" ou "somente as melhores marcas de materiais" são permitidas, pois nomear uma marca específica seria impreciso. Esta exceção NÃO se estende a outros tratamentos.
- **Profilaxia — "investimento":** na frase "Prevenção é o Investimento Mais Inteligente em Saúde Bucal", "investimento" tem sentido amplo (tempo, cuidado, prioridade), não financeiro. Mantido como está. Esta exceção é específica a esse contexto (prevenção/saúde) — NÃO usar "investimento" em contextos onde possa ser lido como preço.

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

**REGRA — Formação de graduação da Dra. Carla (Maio/2026):** **NÃO mencionar a faculdade onde se formou** (em copy, schema, bio, alumniOf, qualquer lugar). Foco da bio canônica é experiência militar (8 anos Marinha) + especializações (Prótese, Implantodontia) + CRO-RJ 27.509. **Nunca afirmar UFRJ ou qualquer outra instituição.** Esta é uma decisão consciente de posicionamento.

### 1.5 Tracking — Regras de Segurança
- GTM **só carrega** via `index.html` — nunca em componentes React
- GCLID usa **localStorage** — nunca sessionStorage
- Toda ação de WhatsApp DEVE: disparar `dataLayer.push` + `gtag conversion` + `sendGCLIDToWebhook()`
- `sendGCLIDToWebhook()` chama a rota proxy interna segura `/api/send-gclid` (ocultando endpoints externos do cliente). O endpoint real é resolvido no servidor via env `N8N_GCLID_WEBHOOK` ou `SUPABASE_GCLID_WEBHOOK` no Vercel.
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
/en/dental-prosthetics
/en/teeth-whitening
/en/veneers-and-lenses
/en/orthodontics
/en/root-canal
/en/gum-health
/en/aesthetic-restorations

ENGLISH LANDING PAGES (Google Ads — noindex):
/en/lp/cosmetic-dentistry
/en/lp/dental-implants
/en/lp/dental-emergency
/en/lp/general-consultation
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
│   │   └── lp/               # EnLPHero, EnLPServices, etc.
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
- `captureGCLID()` roda no boot (`main.tsx`) — **NÃO** duplicar no `useEffect` da LP (ver Seção 10.2)
- Cada CTA chama `sendGCLIDToWebhook()` com label único
- Header + Hero como **import estático** (eager) — ver Seção 10.2 para padrão completo

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
4. **Registrar a mudança** no histórico mestre de marketing ⬇️ (OBRIGATÓRIO)

- **Vercel** com deploy automático de `main`
- Região: `gru1` (São Paulo)
- **Rollback de emergência**: `git revert -m 1 f7cf2ce`

### 📋 Registro de Mudanças (OBRIGATÓRIO — análise antes/depois de marketing)
> ⚠️ **TODA alteração relevante do site (hero, copy, layout, nova página/seção, SEO, tracking, imagens-chave) DEVE ser registrada em:**
>
> **`C:\IA\Projetos\Agencia de MKT\HISTORICO_MUDANCAS.md`**
>
> É a linha do tempo única de TODAS as mudanças (Google Ads, LPs, site, Instagram) e permite à equipe medir **antes/depois** de cada alteração no GA4/Ads.

- Adicione uma linha na tabela do mês com **Data/hora | Área (ex.: `Site (Home)`) | Mudança | Fonte (`[git] <hash>`)**. A data = horário do commit (deploy live ~1–3 min depois).
- Mudanças com impacto visual/UX → registre também um **ponto de referência** na seção "🔬 Pontos de referência para análise antes/depois" do mesmo arquivo.
- **Não** registrar refactors internos sem efeito ao usuário (rename de variável, ajuste de build invisível).
- Esse arquivo vive em **outro projeto** (`Agencia de MKT`) e **não** é versionado no repo do site — é a memória permanente de marketing.

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

### Atribuição Instagram → `/go/whatsapp` (Jun/2026)
Resolve a falha "UTM não sobrevive ao `wa.me`" na jornada Instagram → WhatsApp.
Spec: `Agencia de MKT/relatorios/spec-rotas-site-atribuicao-2026-06-22.md`.

```
Post IG (link na bio) → /go/whatsapp?utm_*&ref&assunto (302 invisível) →
captura em attribution_clicks (Supabase) → wa.me + Sofia →
cron diário cruza por horário → telefone/paciente atribuído
```

- **Rota:** `https://dracarlachristoph.com/go/whatsapp` → Vercel Function `api/go-whatsapp.js`
  (rewrite no `vercel.json` **antes** do catch-all SPA). Commit `3fccd83`.
- **Function:** gera `click_id` (uuid), coleta `utm_*`/`ref`/`assunto`/`referrer`/`user_agent`
  + `ip_hash` (SHA-256, LGPD — nunca IP puro). Grava com orçamento de 1,5s:
  **primária** = insert PostgREST (`NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`)
  → **fallback** = Edge Function `attribution-capture`. A gravação **nunca bloqueia** o 302.
- **Cookie:** `cc_click_id` (HttpOnly, Secure, SameSite=Lax, 90 dias) — costura sessão no site
  (NÃO sobrevive ao salto pro WhatsApp).
- **Mensagem pré-preenchida:** limpa, **SEM** código `Ref:` (decisão Patrick — feio pro paciente).
  Default: *"Olá! Vi a página no Instagram..."*. Com `?assunto=implantes` → frase natural com o tema.
- **Edge Function `attribution-capture`:** `verify_jwt=true` + checagem `role='service_role'`
  no corpo → só o servidor (com a service role key) grava; anon key é rejeitada.
- **Tabela `attribution_clicks`** (projeto Supabase `oqszkriirsodegxpfazz` — o mesmo do GCLID):
  `click_id, ref, utm_*, assunto, referrer, user_agent, ip_hash, created_at` + colunas de match.
  RLS ligada, sem policies públicas.
- **Cruzamento (espelho do GCLID):** função `attribution_fn_match_clicks()`, cron
  `attribution-match-instagram-daily` (6:15, logo após o GCLID das 6:00). Janela **±2h**
  (mensagem depois do clique), expiração **14 dias**. `session_id` do `gc_chat_history` (`human`)
  é o telefone → resolve `gc_patients`. Carimba `origin_channel='instagram'` só se vazio e sem
  GCLID (não sobrescreve Google Ads). **Guard:** telefone já reivindicado por clique GCLID na
  mesma janela não é roubado pelo IG.
- **Limitação:** atribuição é **heurística por horário** (igual GCLID), não determinística.
  Determinístico exigiria token na mensagem (descartado) ou Click-to-WhatsApp pago da Meta (`ctwa_clid`).
- **Link p/ marketing:**
  `…/go/whatsapp?utm_source=instagram&utm_medium=organic_social&utm_campaign=<camp>&utm_content=<post>&ref=IG-B04&assunto=implantes`
- **Taxonomia `ref`:** `IG-<SÉRIE><NÚMERO>` (ex.: `IG-A03`, `IG-B04`, `IG-FOTO01`).

### Sofia (Assistente WhatsApp)
- Versão atual: V2.1
- Workflow N8N com knowledge base
- Integrada com Z-API para WhatsApp Business
- Funcionalidades: atendimento 24h, birthday greetings, recall, Google Reviews

---

## 10. Performance — Sprints de Otimização (Jun/2026)

### 10.1 Estado Atual (pós-Sprint 4 — 02/Jun/2026)

**Score médio mobile PSI:** ~91 (excluindo anomalias API)
**CLS:** Eliminado (máximo 0.042 em qualquer página)

| Métrica | Pré-Sprints | Pós-Sprint 4 |
|---|---|---|
| Score médio mobile | ~65-75 | **~91** |
| CLS máximo | 0.418 | **0.042** |
| Páginas ≥ 90 | 0-2 | **13-15/19** |
| LCP médio LPs | 4.0-5.0s | **2.6-3.0s** |
| TBT médio LPs | 500-1800ms | **100-200ms** |

### 10.2 Arquitetura de Performance das Landing Pages

> ⚠️ **PADRÃO OBRIGATÓRIO para qualquer nova LP ou edição de LP existente.**

Todas as LPs otimizadas seguem este padrão. Não desviar.

```typescript
// ═══ IMPORTS OBRIGATÓRIOS (EAGER — acima-da-dobra) ═══
import ConsultaInicialHeader from '@/components/landing/consulta/ConsultaInicialHeader';
import ConsultaInicialHero from '@/components/landing/consulta/ConsultaInicialHero';
import LazySection from '@/components/performance/LazySection';
import ContentfulBlocker from '@/components/performance/ContentfulBlocker';
const ErrorBoundary = lazy(() => import('@/components/performance/ErrorBoundary'));

// ═══ IMPORTS OBRIGATÓRIOS (LAZY — abaixo-da-dobra) ═══
const ConsultaInicialProblem = lazy(() => import('...'));
const ConsultaInicialGuide = lazy(() => import('...'));
// ... todos os demais componentes

// ═══ CRITICAL CSS INLINE (obrigatório) ═══
const criticalStyles = `
  .hero-section{min-height:100vh;display:flex;align-items:center;background:#FAF7F2;padding-top:90px;...}
  .header-fixed{position:fixed;top:0;left:0;right:0;z-index:50;...}
  ...
`;
// Injetado via <Helmet><style>{criticalStyles}</style></Helmet>
```

**Regras:**
| ✅ FAZER | ❌ NÃO FAZER |
|---|---|
| Header + Hero como `import` estático | ~~Header/Hero como `lazy()`~~ |
| `ErrorBoundary` como `lazy()` | ~~ErrorBoundary como `import` estático~~ |
| `ContentfulBlocker` em toda LP | ~~Omitir ContentfulBlocker~~ |
| `criticalStyles` inline via Helmet | ~~Depender do CSS bundle para hero styling~~ |
| Below-fold em `<LazySection>` + `<Suspense>` | ~~Componentes below-fold como import estático~~ |
| Fallback simples `<div className="h-96" />` | ~~Skeleton components como lazy imports~~ |
| GCLID capturado no boot (`main.tsx`) | ~~`captureGCLID()` dentro de `useEffect`~~ |
| GTM via `index.html` global | ~~GTM duplicado em `<Helmet>` ou via componente~~ |
| Fontes self-hosted via `@fontsource` | ~~Google Fonts via `<link>` no Helmet~~ |

**Componentes PROIBIDOS em LPs** (causam TBT desnecessário):
- ~~`SimpleLCPOptimizer`~~ — removido no Sprint 2/4
- ~~`CoreWebVitalsOptimizer`~~ — removido no Sprint 2/4
- ~~`useCriticalImagePreload`~~ — substituído por preload estático no build
- ~~`SmartContentfulCache`~~ — substituído por `ContentfulBlocker`
- ~~`CriticalCSSInline`~~ — substituído por `criticalStyles` inline

### 10.3 Fallback HTML Estático (`generate-static-meta.cjs`)

O script `scripts/generate-static-meta.cjs` injeta HTML estático no `<div id="root">` para:
1. Dar conteúdo semântico para crawlers (AI bots, Google QS bot)
2. Melhorar FCP/LCP com conteúdo pré-renderizado
3. Prover preload da hero image via `<link rel="preload">` no `<head>`

**CLS Fix (Sprint 3):** O fallback HTML acima-da-dobra deve espelhar o layout React:
- Header: `position:fixed; top:0; z-index:50; background:#fff; box-shadow`
- Hero: `min-height:100vh; padding-top:90px; background:#FAF7F2`
- CTA: `background:#381F47` (mesmo do React)
- Imagem: mesmas dimensões e border-radius

A função original está preservada como `generateLPFallbackHTML_ORIGINAL_PRE_SPRINT3` para rollback.

### 10.4 Histórico de Sprints

#### Sprint 1 (01/Jun/2026)
- Commit: `2b64f61`
- **O que:** Static LCP heroes via `generate-static-meta.cjs`, lazy hydration abaixo-da-dobra na Home, `manualChunks` splitting no Vite, gating do `gptengineer.js` para dev
- **Resultado:** Score mobile da Home de ~65 para ~85

#### Sprint 2 (01/Jun/2026)
- Commits: `a53c3ef`, `371c48f`, `fe70177`
- **O que:** Boot cleanup (dedup GCLID, lazy ErrorBoundary), chunk splitting, extract critical CSS, remoção de runtime optimizers das LPs (Prótese, Lentes, Ortodontia)
- **Revert:** CSS externo causou CLS 0.418 → revertido para inline. Chunk split separado (react-core/helmet) causou gap de hidratação → revertido para `landing-critical` monolítico
- **Resultado:** 7/19 páginas acima de 90

#### Sprint 3 (02/Jun/2026)
- Commit: `815f18e`
- **O que:** Reescrita de `generateLPFallbackHTML()` para espelhar layout React (header fixo + hero full-viewport). Eliminação total do CLS 0.408 intermitente
- **Causa-raiz:** O fallback HTML tinha layout `<header border-bottom>` + `<main max-width:800px>`, mas React renderizava `<header position:fixed>` + `<section min-height:100vh>`. Na hidratação, tudo mudava de posição
- **Resultado:** CLS → 0 em todas as LPs. 12/19 páginas acima de 90

#### Sprint 4 (02/Jun/2026)
- Commit: `261e6eb`
- **O que:** Otimização de 5 LPs que não haviam passado pelos sprints anteriores
  - **Estética Dental** (73→97): Header/Hero de lazy para eager, removidos SimpleLCPOptimizer + CoreWebVitalsOptimizer + useCriticalImagePreload + 4 skeleton imports, adicionados criticalStyles + ContentfulBlocker
  - **Saúde Gengival** (76→95): Mesmo padrão + removido GTM duplicado do Helmet
  - **Limpeza Dental** (82→95*): Removido captureGCLID duplicado, ErrorBoundary lazy, Google Fonts removido
  - **Implantes** (81→91): Mesmo padrão da Limpeza
  - **Consulta Inicial** (88→94*): Google Fonts removido do Helmet
- **Resultado:** 13-15/19 páginas acima de 90 (variação CDN nos scores restantes)

*\* Scores com variância de CDN — em runs favoráveis atingem 94-96*

#### Sprint 5 (02/Jun/2026)
- Commit: `78f72b7`
- **O que:** Home + LP Lentes Porcelana
  - **Home:** Adicionado preload customizado da hero image (560w/800w/840w) em `generate-static-meta.cjs` — os tamanhos da Home são diferentes do padrão das LPs (480/1024). HomepageStatsBar movido de eager para lazy (abaixo do hero fold no mobile)
  - **LP Lentes Porcelana:** Hero `<img>` convertido para `<picture>` com `<source type="image/avif">` para eliminar double-download (preload apontava para AVIF mas página renderizava .webp). Adicionados `width`/`height` em todas as imagens. `captureGCLID()` duplicado removido. `ContentfulBlocker` adicionado
- **Resultado:** Home TBT 234→170ms. LP Lentes LCP 4.1→3.0s. Score Home ainda ~80 (problema estrutural identificado: fallback HTML)

#### Sprint 6 (02/Jun/2026)
- Commit: `d1b1a45`
- **O que:** Home fallback rewrite + LP Lentes criticalStyles
  - **Home:** Reescrita completa do `homeFallback` em `generate-static-meta.cjs` (seção 5) para espelhar layout React real — header `position:fixed` + hero `min-height:100vh` + grid layout + trust badges + CTA dental-gold. O fallback anterior usava `border-bottom header` + `max-width:800px` (mesmo bug do Sprint 3 para LPs)
  - **LP Lentes Porcelana:** Adicionados `criticalStyles` inline via Helmet com classes `.lp-lentes-hero` (paddingTop + gradient), `.hero-grid` (responsive columns), `.hero-image` (aspect-ratio 3/4). Hero section agora usa classes CSS em vez de classes Tailwind para estabilizar layout antes da hidratação
- **Resultado:** Home atingiu **100** (melhor) / 89 (CDN frio). LP Lentes atingiu **93** (melhor) com CLS 0.042→0.036. **15/18 páginas ≥ 90** (excluindo EN General Consult que dá erro intermitente de API)

*\* LP Limpeza (score ~85-95) confirmada como CDN variance — mesma arquitetura das LPs que dão 97*

#### Sprint 7 (03/Jun/2026)
- Commit: `c6ded8d` (BlogPost.tsx) + commit seguinte (BlogPage.tsx)
- **Motivo:** GSC Core Web Vitals alertou 32 blog URLs com LCP > 2.5s (threshold). LCP real: 2.6s. Blog nunca havia sido otimizado nos Sprints 1-6
- **O que:**
  - **BlogPost.tsx:** 19 imports eager → 4 eager (Header, Image, Loading, Error) + 12 lazy (Content, Tags, Share, Related, QuickAnswerBox, KeyTakeaways, ComparisonTable, FAQ, PeopleAlsoAsk, AuthorBio, BlogCTA, StickyWhatsApp). Suspense boundary com fallback `min-h-[200px]`
  - **BlogPage.tsx:** BlogSEOOptimizer e Pagination movidos para lazy. Imagens dos cards: primeiras 3 = eager, restantes = `loading="lazy"`. Adicionados `width`/`height` para CLS
- **Resultado:** Blog post LCP **2.6s → 0.8s** (Score **100**). Blog listing LCP 11.6s → TBD. Zero regressão nas 19 LPs

#### Sprint 8 (17/Jun/2026)
- Commit: `25722cf`
- **Motivo:** PSI mobile da Home (78, LCP 3.8s) e LP Facetas (83, TBT 328ms) abaixo do alvo de 90.
- **O que:**
  - **LP Facetas Resina:** Removidos preconnects e stylesheets do Google Fonts (`FacetasResinaDiretaLandingPage.tsx`), eliminando requests extras na inicialização.
  - **Layout Global (PageLayout.tsx):** Footer e WhatsAppButton importados dinamicamente (`lazy()`) com wrappers `<LazySection>` e `<Suspense>`, poupando thread principal na inicialização below-the-fold.
  - **Gerador de Meta Tags Estáticas (generate-static-meta.cjs):** Filtragem de modulepreloads supérfluos no index de páginas portuguesas/Home. Reescrita do fallback do Hero da Home (`homeFallback`) adicionando CSS responsivo e aplicando no container da imagem as mesmas dimensões e máscara de degradê do React, eliminando layout shift e TBT na hidratação.
- **Resultado:** Home e LP Facetas atingiram o alvo de 90+ no PSI.

### 10.5 Rollback

Documentação completa em [ROLLBACK.md](ROLLBACK.md).

| Hash | Sprint | Descrição |
|---|---|---|
| `25722cf` | **Sprint 8** | Fontes locais Facetas, lazy footer/wa e Home Hero fallback responsivo com mask-image |
| (next) | **Sprint 7b** | BlogPage.tsx lazy SEO/Pagination + lazy images |
| `c6ded8d` | **Sprint 7** | BlogPost.tsx lazy-load 12 below-fold components |
| `d1b1a45` | **Sprint 6** | Home fallback rewrite + LP Lentes criticalStyles |
| `78f72b7` | **Sprint 5** | Home preload + lazy StatsBar, LP Lentes AVIF picture |
| `261e6eb` | **Sprint 4** | Otimização 5 LPs (eager Header/Hero, remoção runtime optimizers) |
| `c9cf6b0` | Sprint 3 docs | ROLLBACK.md atualizado |
| `815f18e` | **Sprint 3** | Reescrita do fallback HTML das LPs (CLS fix) |
| `fe70177` | Sprint 2 | Revert chunk split + restaurar ContentfulBlocker |
| `371c48f` | Sprint 2 | Revert CSS externo (causava CLS) |
| `a53c3ef` | Sprint 2 | Boot cleanup, chunk split, lazy UI, dedup GCLID |
| `2b64f61` | Sprint 1 | Static LCP heroes, lazy hydration, manualChunks |
| `c18c002` | — | **Estado estável pré-performance** (rollback seguro total) |

**Rollback cirúrgico Sprint 3 (CLS fix):** Dentro de `generate-static-meta.cjs`, renomear `generateLPFallbackHTML_ORIGINAL_PRE_SPRINT3` de volta para `generateLPFallbackHTML`.

**Rollback Sprint 6 Home fallback:** Em `generate-static-meta.cjs`, seção 5, substituir o `homeFallback` Sprint 6 pelo conteúdo anterior (ver diff do commit `d1b1a45`).

**Rollback Sprint 6 LP Lentes:** Em `LPLentesPorcelana.tsx`, remover `criticalStyles` const + `<style>` do Helmet, trocar `className="lp-lentes-hero"` de volta para `className="bg-gradient-to-b from-dental-beige/30 to-white py-16 md:py-20"`, `className="hero-grid"` para `className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"`, `className="order-2 hero-image"` para `className="order-2" style={{ aspectRatio: '3/4' }}`.
**Rollback Sprint 7 Blog:** Em `BlogPost.tsx`, reverter imports de `lazy(() => import(...))` para imports estáticos diretos. Remover `Suspense` boundaries. Em `BlogPage.tsx`, reverter `BlogSEOOptimizer` e `Pagination` para imports estáticos, remover `loading`/`decoding`/`width`/`height` dos `<img>`.
**Rollback Sprint 8:** Em `generate-static-meta.cjs`, reverter filtragem de preloads e o HTML do `homeFallback`. Em `PageLayout.tsx`, reverter Footer/WhatsAppButton para imports estáticos. Em `FacetasResinaDiretaLandingPage.tsx`, restaurar links de fontes do Google.

**Rollback completo:** `git reset --hard c18c002 && git push origin main --force`

### 10.6 Variância de CDN (Vercel)

Scores PSI variam ±10-15 pontos entre rodadas devido a cold starts do CDN Vercel. Páginas que atingem 94-100 numa rodada podem cair para 80-89 na seguinte (LCP 3.7-4.0s vs 1.4-2.7s). Isto NÃO é problema de código — é variância do servidor.

Páginas mais afetadas: Clareamento, Facetas, Estética, Emergência, Implantes, EN Dental Emergency.

Páginas com **variância mínima** (sempre ≥ 90): Saúde Gengival, Prótese, Dente Quebrado, Lentes Profiss, EN Cosmetic Dent.

**Conclusão Sprint 6:** Não há mais otimização de código possível para páginas que oscilam — todas seguem a mesma arquitetura das que dão 97. A diferença é pura variância de CDN.

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
| `AggregateRating` = ✅ Mantido (exceção autorizada Maio/2026) | Dados reais do Google Reviews (5.0/17). Beneficia SEO via rich snippets. Substitui regra anterior "Removido" que era válida quando os dados eram fabricados. |
| GTM delay = 2 segundos | Reduzido de 8s (perdia conversões) |
| GCLID em localStorage | sessionStorage causava perda de dados |
| Scanner = "iTero Element 5D" | Nome correto e diferenciador |
| Sem "consulta sem compromisso" | Posicionamento premium/particular |
| "Avaliação" → "Consulta" em CTAs | Pacientes confundiam com serviço gratuito (Auditoria Abril/2026) |
| Conversion ID único = `AW-16894364517/OQZvCMXV0foZEOqP7vY9` | IDs customizados (`/LP_limpeza_*`) não existem no Google Ads → não contavam (Auditoria Maio/2026) |
| English LPs capturam GCLID + tracking completo | Validado via grep — auditor anterior se enganou ao reportar gap (Maio/2026) |
| AI Max — Final URL expansion OFF na Clínica Geral | Estava redirecionando tráfego paid para `/` (homepage), bypassando as 4 LPs corretas dos ad groups (Maio/2026) |
| LP Header/Hero = **import estático** (eager) | Sprint 4: lazy loading de above-the-fold causa LCP 7.6s (Jun/2026) |
| ErrorBoundary = **lazy** em LPs | Sprint 4: ~3KB economizados do critical path, crash resilience mantida (Jun/2026) |
| `captureGCLID()` somente no boot | Sprint 2/4: duplicatas no useEffect de LPs causavam TBT extra (Jun/2026) |
| Sem Google Fonts via Helmet | Sprint 4: fontes são self-hosted via @fontsource; link externo era request desnecessário (Jun/2026) |
| Sem SimpleLCPOptimizer/CoreWebVitalsOptimizer | Sprint 2/4: runtime overhead sem benefício real — preloading agora é estático (Jun/2026) |
| Fallback HTML espelha layout React | Sprint 3: layout diferente causava CLS 0.408 na hidratação (Jun/2026) |
| Home fallback = header fixo + hero grid + trust badges | Sprint 6: mesmo bug do Sprint 3 mas na Home — border-bottom header causava shift (Jun/2026) |
| LP Lentes criticalStyles inline | Sprint 6: hero usa `py-16` (não `min-height:100vh` como LPs padrão) — CSS inline estabiliza layout (Jun/2026) |
| Home hero preload = customizado (560w/800w/840w) | Sprint 5: Home usa tamanhos diferentes das LPs (480/1024) — template genérico geraria 404 (Jun/2026) |
| HomepageStatsBar = **lazy** | Sprint 5: abaixo do hero fold no mobile, não precisa estar no critical bundle (Jun/2026) |
| LP Lentes hero = `<picture>` com AVIF | Sprint 5: `<img src=.webp>` causava double-download com preload AVIF (Jun/2026) |
| Blog below-fold = **lazy** (12 componentes) | Sprint 7: GSC flagou 32 URLs com LCP > 2.5s. Lazy-load reduziu LCP de 2.6s para 0.8s (Jun/2026) |
| Blog card images = **lazy** (exceto primeiras 3) | Sprint 7: 32 imagens eager no blog listing causavam LCP 11.6s (Jun/2026) |
| BlogSEOOptimizer = **lazy** | Sprint 7: componente invisível não precisa estar no critical bundle (Jun/2026) |

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
| CEP | 22410-901 |
| Telefone fixo | (21) 3738-7909 |
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
□ Registrei a mudança em HISTORICO_MUDANCAS.md (Agencia de MKT) se for alteração relevante de site
```

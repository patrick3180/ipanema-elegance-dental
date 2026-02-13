# PLANO DE REVISÃO COMPLETA — Dra. Carla Christoph
**Site:** https://dracarlachristoph.com
**Data:** Fevereiro 2026
**Objetivo:** Auditoria e otimização completa para maximizar conversões e autoridade

---

## Visão Geral

### Contexto Estratégico
- **Posicionamento:** Marca de luxo silenciosa — premium sem se autodeclarar
- **Público-alvo:** Classe média alta, Zona Sul RJ (Ipanema, Leblon, Jardim Botânico)
- **Conversão principal:** WhatsApp para agendamento
- **Ticket médio:** ~R$ 1.000
- **Meta mensal:** R$ 25.000+

### Princípios Orientadores
1. **Mostrar, não dizer** — Qualidade percebida pela experiência
2. **Tempo e atenção** — Mínimo 1h por consulta é o diferencial
3. **Específico > Genérico** — Nomear tecnologias reais (iTero, Test Drive)
4. **Jornada completa** — Dra. Carla acompanha mesmo tratamentos de parceiros

---

## 🤖 AGENT TEAMS — Execução Paralela

**Status:** ✅ HABILITADO (`CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`)

### Estrutura do Time Sugerida

```
TEAM LEAD (Patrick + Claude coordenando)
├── Data Analyst Agent
│   ├── Análise Google Ads (via MCP ou Supabase)
│   ├── Análise Google Analytics 4
│   ├── Identificação de páginas/keywords top performers
│   └── Métricas de conversão e engajamento
│
├── Competitive Intelligence Agent
│   ├── Scraping de concorrentes (Rothier, Rowan Vilar, etc.)
│   ├── Gap analysis de conteúdo
│   ├── Benchmark de CTAs e copy
│   └── Análise de posicionamento SEO
│
├── Frontend & Performance Specialist
│   ├── Core Web Vitals optimization
│   ├── Arquitetura frontend e code quality
│   ├── Bundle size e lazy loading
│   └── Mobile performance
│
├── SEO & AI Search Expert
│   ├── On-page SEO audit
│   ├── AI Search optimization (Schema, Quick Answers)
│   ├── Keyword research e gap analysis
│   └── Technical SEO (sitemap, redirects, canonical)
│
└── UX & Conversion Optimizer
    ├── Customer journey mapping
    ├── Psicologia de conversão (público premium)
    ├── CTA optimization
    └── A/B test setup
```

### Vantagens da Abordagem em Time
- ⚡ **5x mais rápido** — trabalho paralelo em todas as frentes
- 🎯 **Especialização** — cada agente foca em sua expertise
- 💬 **Comunicação** — agentes compartilham insights entre si
- 📊 **Data-Driven** — Data Analyst informa todos os outros agentes

### Skills Instaladas para o Time
- ✅ `paid-ads` — análise de Google Ads
- ✅ `analytics-tracking` — setup e análise de tracking
- ✅ `page-cro` — otimização de conversão por página
- ✅ `ab-test-setup` — configuração de testes A/B
- ✅ `seo-audit` — auditoria completa de SEO
- ✅ `competitor-alternatives` — análise de concorrentes
- ✅ `copywriting` — otimização de textos e CTAs
- ✅ `marketing-psychology` — psicologia aplicada ao público-alvo
- ✅ `ui-ux-pro-max` — análise avançada de UX
- ✅ `frontend-design` — design e interfaces
- ✅ `webapp-testing` — testes de qualidade

---

## FASE 0: DATA ANALYSIS — Fundação Estratégica
**Prioridade:** 🔴 CRÍTICA (executar PRIMEIRO)
**Impacto:** MUITO ALTO (informa todas as outras fases)
**Esforço:** Médio
**Responsável:** Data Analyst Agent

### 0.1 Análise Google Ads (Supabase + MCP)

**Fontes de Dados:**
- ✅ Dados históricos no Supabase (atualizados diariamente)
- ✅ Acesso direto via MCP Google Ads (opcional, para dados real-time)

**Métricas Críticas a Analisar:**

**Por Campanha/Grupo de Anúncios:**
- [ ] CPA (Custo por Aquisição) — identificar campanhas mais eficientes
- [ ] Taxa de conversão por campanha
- [ ] Impressions vs Clicks vs Conversions (funil completo)
- [ ] Quality Score por keyword
- [ ] Search Terms reais (queries dos usuários)
- [ ] Horários/dias com melhor performance

**Por Landing Page:**
- [ ] LPs com maior taxa de conversão
- [ ] LPs com maior bounce rate (otimizar primeiro)
- [ ] Tempo médio em página
- [ ] CTR do CTA primário (WhatsApp)

**Por Keyword:**
- [ ] Keywords que convertem acima da média
- [ ] Keywords com baixo CPA
- [ ] Long-tail keywords ocultas (search terms)
- [ ] Negative keywords a adicionar

**Deliverable:**
- Relatório de Top/Bottom Performers
- Recomendações de redistribuição de budget
- Keywords para priorizar no SEO orgânico

### 0.2 Análise Google Analytics 4 (Supabase)

**Jornadas de Usuário:**
- [ ] Páginas mais visitadas (top 20)
- [ ] Sequências de páginas que levam a conversão
- [ ] Drop-off points (onde usuários desistem)
- [ ] Tempo médio por página (identificar conteúdo engajador)

**Comportamento por Dispositivo:**
- [ ] Mobile vs Desktop (conversão, bounce, tempo)
- [ ] Tamanhos de tela mais comuns
- [ ] Browsers mais usados

**Engajamento:**
- [ ] Scroll depth por página
- [ ] Clicks em elementos (FAQ accordions, links internos)
- [ ] Páginas com > 3 min de tempo (conteúdo valioso)

**Conversões:**
- [ ] Funil completo: Pageview → CTA Click → WhatsApp
- [ ] Taxa de conversão por fonte de tráfego (Ads vs Orgânico vs Direto)
- [ ] Assistências (páginas que não convertem diretamente mas ajudam)

**Deliverable:**
- Heatmap de páginas críticas (top converters + top drop-offs)
- Recomendações de otimização baseadas em dados reais
- Páginas a priorizar na revisão de conteúdo

### 0.3 Cross-Analysis (Ads + Analytics)

**Insights Combinados:**
- [ ] Keywords do Ads que geram tráfego orgânico (duplicação de esforço?)
- [ ] LPs com alto gasto mas baixa conversão (otimizar urgente)
- [ ] Tratamentos/serviços com alta demanda (Ads) mas baixo conteúdo orgânico (oportunidade SEO)
- [ ] Horários de pico de conversão (otimizar budget do Ads)

**Ferramentas:**
- SQL queries no Supabase
- Google Ads MCP (se configurado)
- GA4 API ou dados exportados
- BigQuery (se houver integração)

**Deliverable:**
- Dashboard consolidado com KPIs principais
- Top 10 oportunidades de otimização (ordenadas por impacto)

---

## FASE 0.5: COMPETITIVE INTELLIGENCE
**Prioridade:** 🟠 ALTA (executar em paralelo com Fase 0)
**Impacto:** Alto (posicionamento estratégico)
**Esforço:** Médio
**Responsável:** Competitive Intelligence Agent

### 0.5.1 Análise de Concorrentes Diretos

**Concorrentes (BUSINESS.md):**
1. Dr. Guilherme Rothier — https://www.guilhermerothier.com.br/
2. Rowan Vilar — https://rowanvilar.com.br/
3. Jamil Dentista — https://jamildentista.com.br/
4. Vilma Rafael — https://www.walmira.com.br/
5. Dra. Karina Glatthardt — https://drakarinaglatthardt.com.br/

**Análise por Concorrente:**

**A. Conteúdo e Estrutura**
- [ ] Tratamentos cobertos (vs Dra. Carla)
- [ ] Profundidade de conteúdo (FAQ, explicações, processo)
- [ ] Páginas especiais (blog, casos, depoimentos)
- [ ] Gaps de conteúdo (o que eles NÃO têm)

**B. SEO e Palavras-Chave**
- [ ] Keywords principais que eles ranqueiam
- [ ] Meta titles e descriptions (estratégia)
- [ ] Schema markup implementado
- [ ] Backlinks principais (autoridade)

**C. UX e Conversão**
- [ ] CTAs principais (copy, posicionamento)
- [ ] Jornada do usuário (quantos cliques até agendar)
- [ ] Formulários vs WhatsApp vs Telefone
- [ ] Prova social (depoimentos, stats, badges)

**D. Design e Branding**
- [ ] Paleta de cores e identidade visual
- [ ] Tom de voz (formal vs acolhedor vs técnico)
- [ ] Fotos (profissionais vs stock vs antes/depois)
- [ ] Mobile experience

**E. Diferenciais Comunicados**
- [ ] O que cada um destaca como único
- [ ] Tecnologias mencionadas
- [ ] Credenciais exibidas

### 0.5.2 Gap Analysis

**Oportunidades Identificadas:**
- [ ] Tratamentos/keywords que ninguém cobre bem (oceano azul)
- [ ] Páginas fracas dos concorrentes (onde podemos dominar)
- [ ] CTAs genéricos (onde podemos ser mais específicos)
- [ ] Falta de educação (FAQ rasas, sem processo claro)

**Ameaças:**
- [ ] Concorrentes com melhor SEO em keywords estratégicas
- [ ] Sites com melhor performance mobile
- [ ] Conteúdo mais profundo ou recente

### 0.5.3 Best Practices a Adotar

**O que funciona (copiar com melhoria):**
- [ ] Estruturas de conteúdo eficazes
- [ ] CTAs que convertem
- [ ] Seções de FAQ bem formuladas
- [ ] Diferenciais bem comunicados

**Ferramentas:**
- Manual review (navegação real)
- Screaming Frog (crawling de sites)
- Ahrefs/Semrush (keywords e backlinks)
- SimilarWeb (tráfego e fontes)

**Deliverable:**
- Matriz competitiva (5 concorrentes vs Dra. Carla)
- Top 10 oportunidades de diferenciação
- Recomendações de copy/CTAs baseadas em benchmarks

---

## FASE 1: AUDITORIA TÉCNICA E PERFORMANCE
**Prioridade:** 🔴 CRÍTICA
**Impacto:** Alto (SEO, UX, Conversão)
**Esforço:** Médio

### 1.1 Core Web Vitals (Mobile)
**Problemas Conhecidos:**
- FCP: 3.1s (meta: <1.8s)
- LCP: 3.6s (meta: <2.5s)
- Imagem hero da homepage não otimizada

**Ações:**
- [ ] Otimizar imagem hero da homepage (WebP, srcset, lazy load above fold)
- [ ] Implementar preload para fontes críticas
- [ ] Analisar bundle size — identificar componentes pesados
- [ ] Testar service worker — verificar se não está cacheando scripts de tracking
- [ ] Implementar resource hints (dns-prefetch, preconnect) para GTM, Contentful

**Ferramentas:**
- PageSpeed Insights
- Lighthouse CI
- WebPageTest
- Chrome DevTools Performance

**Deliverable:** Relatório de performance + implementação de otimizações

---

### 1.2 Arquitetura Frontend
**Áreas de Análise:**

**1.2.1 Code Quality**
- [ ] Auditoria de componentes React — identificar re-renders desnecessários
- [ ] Revisar uso de `React.lazy()` e code splitting
- [ ] Verificar consistência de patterns (hooks, props, types)
- [ ] Analisar bundle splitting — landing pages podem ter bundles separados

**1.2.2 Design System**
- [ ] Validar uso consistente de tokens (dental-purple, dental-gold, dental-beige)
- [ ] Auditoria de classes Tailwind — identificar duplicações
- [ ] Verificar responsividade em breakpoints críticos (mobile, tablet, desktop)
- [ ] Garantir acessibilidade (contraste, ARIA labels)

**1.2.3 Component Library**
- [ ] Documentar componentes reutilizáveis (TreatmentHero, ProcessTimeline, etc.)
- [ ] Identificar componentes que podem ser consolidados
- [ ] Validar props e types de cada componente

**Ferramentas:**
- React DevTools Profiler
- ESLint + TypeScript strict mode
- Tailwind CSS IntelliSense

**Deliverable:** Refatoração de componentes + guia de padrões

---

### 1.3 Pre-rendering e SEO Técnico
**Problemas Conhecidos:**
- Blog posts sem HTML estático (meta tags client-side)
- Sitemap com dependência runtime do Contentful

**Ações:**
- [ ] Extender `generate-static-meta.cjs` para incluir blog posts
- [ ] Implementar fallback robusto no sitemap (não depender 100% do Contentful)
- [ ] Validar canonical URLs em todas as páginas
- [ ] Verificar Schema.org JSON-LD (MedicalProcedure, FAQPage, LocalBusiness)
- [ ] Testar rendering em crawlers que não executam JS

**Ferramentas:**
- Google Search Console
- Rich Results Test
- Screaming Frog SEO Spider
- Puppeteer para testar HTML estático

**Deliverable:** HTML estático completo + sitemap resiliente

---

### 1.4 Segurança e Compliance
**Áreas:**

**1.4.1 Segurança**
- [ ] Validar headers de segurança (CSP, X-Frame-Options, HSTS)
- [ ] Verificar HTTPS em todos os recursos (imagens, scripts)
- [ ] Auditoria de dependências vulneráveis (npm audit)
- [ ] Validar sanitização de inputs (WhatsApp message, GCLID)

**1.4.2 LGPD e Privacidade**
- [ ] Revisar política de privacidade (cookies, tracking, dados pessoais)
- [ ] Validar consentimento de cookies (GTM, GA4)
- [ ] Garantir anonimização de dados no Google Analytics

**1.4.3 Regulamentação CRO/CFO**
- [ ] Validar que nenhuma página menciona preço (PROIBIDO)
- [ ] Verificar ausência de fotos antes/depois (PROIBIDO)
- [ ] Confirmar CRO-RJ 27.509 visível em materiais de marketing
- [ ] Garantir que Dr. Bruno é referenciado corretamente (sem sobrenome Christoph)

**Ferramentas:**
- Mozilla Observatory
- SecurityHeaders.com
- npm audit
- Manual review de compliance

**Deliverable:** Relatório de segurança + checklist de compliance CRO

---

## FASE 2: SEO E AI SEARCH OPTIMIZATION
**Prioridade:** 🟠 ALTA
**Impacto:** Alto (Tráfego orgânico, autoridade)
**Esforço:** Alto

### 2.1 SEO Tradicional (Google, Bing)

**2.1.1 On-Page SEO**
- [ ] Auditoria de meta tags (title, description) — 30+ páginas
- [ ] Validar H1 único e descritivo em cada página
- [ ] Otimizar internal linking (componente `InternalLinkingOptimizer`)
- [ ] Garantir alt text em todas as imagens
- [ ] Revisar URL structure (clean, descritivas)

**2.1.2 Content SEO**
- [ ] Keyword research para Zona Sul RJ (Ipanema, Leblon, Jardim Botânico)
- [ ] Gap analysis — tratamentos/keywords não cobertos
- [ ] Otimizar densidade de keywords (sem keyword stuffing)
- [ ] Adicionar variações de long-tail keywords

**2.1.3 Technical SEO**
- [ ] Corrigir soft 404s (se existirem)
- [ ] Validar redirects 301 de URLs antigas
- [ ] Verificar canonicalization
- [ ] Testar mobile-friendliness (Mobile-First Indexing)
- [ ] Validar robots.txt e sitemap.xml

**Ferramentas:**
- Google Search Console
- Ahrefs ou Semrush
- Screaming Frog
- Google Keyword Planner

**Deliverable:** Relatório SEO + roadmap de otimizações

---

### 2.2 AI Search Optimization (SGE, Perplexity, ChatGPT)

**Conceito:** AI Search privilegia conteúdo estruturado, direto e com schema markup.

**2.2.1 Structured Data Enhancement**
- [ ] Expandir Schema.org — adicionar `Physician`, `MedicalOrganization`
- [ ] Implementar `HowTo` schema para processos de tratamento
- [ ] Adicionar `VideoObject` schema (se houver vídeos)
- [ ] Garantir `FAQPage` em todas as service pages com FAQ

**2.2.2 Quick Answer Boxes**
- [ ] Validar que todas as service pages têm `QuickAnswerBox`
- [ ] Otimizar para resposta direta (featured snippets)
- [ ] Formato: "O que é [tratamento]?" → resposta em 2-3 frases

**2.2.3 Content Format para AI**
- [ ] Priorizar formato Q&A no blog (já em uso — validar)
- [ ] Adicionar listas, bullets e tabelas (AI parsers adoram)
- [ ] Garantir hierarquia clara de headings (H2, H3)
- [ ] Incluir definições concisas no início de cada seção

**2.2.4 E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)**
- [ ] Destacar credenciais da Dra. Carla (20+ anos, Marinha, CRO)
- [ ] Adicionar byline em blog posts
- [ ] Incluir links para fontes autoritativas (quando aplicável)
- [ ] Garantir informações de contato completas e consistentes

**Ferramentas:**
- Google Rich Results Test
- Schema Markup Validator
- Perplexity manual testing
- ChatGPT search testing

**Deliverable:** Schema markup expandido + content audit para AI

---

## FASE 3: EXPERIÊNCIA DO USUÁRIO (UX)
**Prioridade:** 🟠 ALTA
**Impacto:** Alto (Conversão, engajamento)
**Esforço:** Médio-Alto

### 3.1 Customer Journey Mapping

**3.1.1 Topo do Funil (Descoberta)**
- [ ] Blog → Service page flow (links internos)
- [ ] Landing page → conversão direta (sem navegação)
- [ ] Homepage → serviços relevantes

**3.1.2 Meio do Funil (Consideração)**
- [ ] Service page → Bio da especialista (credibilidade)
- [ ] Depoimentos → prova social (formato correto: Nome I. — Bairro)
- [ ] FAQ → objeções respondidas

**3.1.3 Fundo do Funil (Conversão)**
- [ ] CTA WhatsApp → mensagem pré-formatada contextual
- [ ] Floating WhatsApp (mobile) → sempre visível
- [ ] Página de contato → mapa, horários, endereço

**Ações:**
- [ ] Mapear jornadas completas para cada persona
- [ ] Identificar friction points (onde o usuário pode desistir)
- [ ] Otimizar CTAs — posição, copy, cor
- [ ] Garantir consistência de mensagem em cada etapa

**Ferramentas:**
- Hotjar (heatmaps, session recordings)
- Google Analytics 4 (behavior flow)
- User testing (5-8 usuários do público-alvo)

**Deliverable:** Mapa de jornada + recomendações de UX

---

### 3.2 Mobile Experience

**Problemas Conhecidos:**
- FCP/LCP lentos
- Floating WhatsApp pode cobrir conteúdo

**Ações:**
- [ ] Testar em dispositivos reais (iPhone, Samsung, Xiaomi)
- [ ] Validar touch targets (mínimo 48x48px)
- [ ] Verificar scroll behavior (smooth, sem janks)
- [ ] Testar formulários em mobile (teclado, autocomplete)
- [ ] Garantir que CTAs são acessíveis sem zoom

**Ferramentas:**
- BrowserStack
- Chrome DevTools Device Mode
- Real device testing

**Deliverable:** Relatório de mobile UX + fixes

---

### 3.3 Acessibilidade (WCAG 2.1 AA)

**Ações:**
- [ ] Validar contraste de cores (dental-gray vs dental-beige = 5.4:1 ✅)
- [ ] Testar navegação por teclado (Tab, Enter, Esc)
- [ ] Adicionar ARIA labels onde necessário
- [ ] Garantir alt text descritivo em imagens
- [ ] Testar com screen readers (NVDA, JAWS)
- [ ] Validar focus indicators

**Ferramentas:**
- WAVE Web Accessibility Tool
- axe DevTools
- Lighthouse Accessibility audit

**Deliverable:** Relatório de acessibilidade + correções

---

## FASE 4: QUALIDADE VISUAL E BRAND CONSISTENCY
**Prioridade:** 🟡 MÉDIA
**Impacto:** Médio (Percepção de qualidade)
**Esforço:** Médio

### 4.1 Design System Audit

**4.1.1 Paleta de Cores**
- [ ] Validar uso consistente de dental-purple, dental-gold, dental-beige
- [ ] Verificar uso de variações (dental-gold-dark)
- [ ] Garantir que WhatsApp green está consistente (#25D366)

**4.1.2 Tipografia**
- [ ] Confirmar Playfair Display para headings (todos os níveis)
- [ ] Confirmar Montserrat para body (400, 500)
- [ ] Validar hierarquia visual (tamanhos, weights)
- [ ] Checar line-height e letter-spacing

**4.1.3 Espaçamento e Layout**
- [ ] Validar uso de `section-spacing`, `container-custom`
- [ ] Verificar whitespace — não deve haver excesso
- [ ] Garantir grid consistente (12-col)

**4.1.4 Componentes Visuais**
- [ ] Validar shadows (shadow-soft, shadow-elegant, shadow-gold)
- [ ] Verificar borders e border-radius (--radius: 0.5rem)
- [ ] Garantir consistência de buttons (tamanho, padding, hover states)

**Ferramentas:**
- Figma (se houver design source)
- Chrome DevTools (computed styles)
- Manual review

**Deliverable:** Guia de estilos atualizado + correções

---

### 4.2 Imagens e Assets

**4.2.1 Qualidade**
- [ ] Validar resolução de todas as fotos (desktop 2x, mobile 1.5x)
- [ ] Verificar compressão (WebP, qualidade 80-85%)
- [ ] Garantir lazy loading (exceto above fold)

**4.2.2 Consistência**
- [ ] Fotos da Dra. Carla — mesma sessão, mesmo tom
- [ ] Consultório — iluminação e ângulo consistentes
- [ ] Scanner iTero — destacar tecnologia

**4.2.3 Compliance**
- [ ] Confirmar ausência de fotos antes/depois (PROIBIDO)
- [ ] Confirmar ausência de fotos de procedimentos (PROIBIDO)
- [ ] Validar que fotos stock foram removidas

**Deliverable:** Asset library otimizada

---

### 4.3 Brand Voice Compliance

**Ações:**
- [ ] Revisar TODAS as páginas contra palavras banidas (BRAND.md Seção 5)
- [ ] Validar bio canônica + frase contextual em cada service page
- [ ] Verificar tom de voz — seguro, direto, acolhedor (BRAND.md Seção 4)
- [ ] Garantir que depoimentos seguem formato correto (Nome I. — Bairro)

**Palavras Banidas (sample):**
- ❌ "sorriso perfeito", "transforme seu sorriso", "premium", "excelência"
- ❌ "humanizado", "tecnologia de ponta", "profissionais altamente qualificados"
- ✅ Substituir por fatos específicos

**Ferramentas:**
- Regex search (grep, VS Code)
- Manual review

**Deliverable:** Conteúdo revisado e alinhado ao brand

---

## FASE 5: CONVERSÃO E PSICOLOGIA DO USUÁRIO
**Prioridade:** 🔴 CRÍTICA
**Impacto:** MUITO ALTO (ROI direto)
**Esforço:** Alto

### 5.1 Análise de Funil de Conversão

**5.1.1 Métricas Atuais**
- [ ] Mapear taxa de conversão por página (GA4)
- [ ] Identificar páginas com alto bounce rate
- [ ] Analisar drop-off points (onde usuários saem)
- [ ] Medir tempo em página vs conversão

**5.1.2 Benchmarking**
- [ ] Comparar com concorrentes diretos (Rothier, Rowan Vilar, etc.)
- [ ] Identificar gaps de conteúdo ou UX
- [ ] Analisar CTAs de concorrentes

**Ferramentas:**
- Google Analytics 4
- Hotjar Funnels
- Similarweb

**Deliverable:** Relatório de funil + oportunidades

---

### 5.2 Psicologia de Conversão (Público-Alvo Específico)

**Perfil Psicológico do Público:**
- **Classe média alta:** Valoriza qualidade > preço
- **Zona Sul RJ:** Sofisticado, bem-informado, exigente
- **Pain points:** Falta de tempo, histórico de mau atendimento, medo de resultado artificial

**5.2.1 Princípios Psicológicos Aplicados**

**A. Escassez e Exclusividade**
- [ ] Comunicar "mínimo 1h por consulta" (escassez de tempo = qualidade)
- [ ] Destacar "atendimento 100% particular" (sem diluição de convênio)
- [ ] Enfatizar "20+ anos em Ipanema" (exclusividade de localização)

**B. Prova Social (Social Proof)**
- [ ] Validar qualidade de depoimentos — específicos, críveis
- [ ] Adicionar stats: "4.000+ pacientes atendidos", "20+ anos"
- [ ] Incluir badges de especialidades (Prótese, Implantodontia)

**C. Autoridade (Authority)**
- [ ] Destacar formação militar (8 anos Marinha) — disciplina, precisão
- [ ] CRO-RJ 27.509 sempre visível
- [ ] Nomear tecnologias (iTero Element 5D, Test Drive do Sorriso)

**D. Reciprocidade (Reciprocity)**
- [ ] Blog educativo — dar valor antes de pedir conversão
- [ ] FAQ detalhadas — responder dúvidas honestamente
- [ ] QuickAnswerBox — resposta direta, sem gatekeeping

**E. Consistência e Compromisso**
- [ ] Jornada do paciente descrita em passos claros (ProcessTimeline)
- [ ] Transparência de processo — "o que esperar" em cada tratamento
- [ ] Sem promessas exageradas — expectativas realistas

**F. Aversão à Perda (Loss Aversion)**
- [ ] Destacar o que o paciente perde ao NÃO tratar (saúde, função, estética)
- [ ] Evitar urgência falsa ("agende agora ou perca!") — não condiz com premium
- [ ] Focar em "recuperar confiança" vs "perder oportunidade"

**G. Efeito de Ancoragem (Anchoring)**
- [ ] Apresentar opções de tratamento do mais completo ao básico
- [ ] Destacar valor do tratamento completo (jornada integrada)
- [ ] Sem mencionar preço (proibido CRO), mas ancoragem por qualidade

**5.2.2 Ações por Página**

**Homepage:**
- [ ] Hero: Headline que comunica valor único (tempo, atenção, experiência)
- [ ] Above fold: CTA primário (WhatsApp) + benefício claro
- [ ] Social proof: Depoimentos above fold (ao menos 1)
- [ ] Trust signals: CRO, especialidades, tecnologia

**Service Pages:**
- [ ] Seção empática: Reconhecer dor/preocupação do paciente
- [ ] Seção educativa: Explicar tratamento sem jargão excessivo
- [ ] Bio da especialista: Autoridade + frase contextual ao tratamento
- [ ] ProcessTimeline: Reduzir ansiedade com transparência
- [ ] FAQ: Responder objeções reais (sem preço)
- [ ] CTA: Contextualizado ao tratamento ("Agende avaliação de lentes")

**Landing Pages:**
- [ ] Hero: Message match perfeito com keyword do anúncio
- [ ] Problema: Específico ao tratamento (não genérico)
- [ ] Guia: 4 passos claros (reduzir fricção cognitiva)
- [ ] Prova social: 2-3 depoimentos + stats
- [ ] CTA: Urgência sutil (WhatsApp 24h) sem agressividade

**Deliverable:** Playbook de conversão + implementações

---

### 5.3 CTA Optimization

**5.3.1 Copy dos CTAs**
- [ ] Revisar todos os CTAs — devem ser orientados à ação e benefício
- [ ] Evitar genéricos ("Saiba mais", "Clique aqui")
- [ ] Usar verbos específicos ("Agende sua avaliação", "Fale com a Dra. Carla")

**Exemplos de Otimização:**
- ❌ "Entre em contato"
- ✅ "Agende sua avaliação pelo WhatsApp"

- ❌ "Saiba mais sobre implantes"
- ✅ "Avalie seu caso de implante com especialista"

**5.3.2 Posicionamento**
- [ ] Validar CTA above the fold em TODAS as páginas
- [ ] Floating WhatsApp (mobile) — sempre acessível
- [ ] CTA de fechamento (bottom) — após educação completa
- [ ] CTAs intermediários em service pages longas

**5.3.3 Design**
- [ ] Validar contraste de botões (dental-gold vs background)
- [ ] Garantir tamanho de touch target (mínimo 48x48px mobile)
- [ ] Hover states claros (feedback visual)
- [ ] WhatsApp green (#25D366) consistente

**Deliverable:** CTAs otimizados + testes A/B sugeridos

---

### 5.4 WhatsApp Flow Optimization

**5.4.1 Mensagens Pré-Formatadas**
- [ ] Validar que cada CTA tem mensagem contextual única
- [ ] Garantir que a mensagem identifica a origem ("Vi o site sobre lentes")
- [ ] Incluir pedido específico ("Gostaria de agendar avaliação")

**Exemplo:**
```
Olá! Vi o site sobre lentes de contato dental. Gostaria de agendar uma avaliação com a Dra. Carla.
```

**5.4.2 Resposta Inicial (N8N Automation)**
- [ ] Validar que o fluxo N8N 24h está humanizado
- [ ] Confirmar que a resposta menciona que é fora do horário (se for)
- [ ] Garantir que promete resposta em horário comercial

**Deliverable:** WhatsApp flow otimizado

---

## FASE 6: TRACKING E ATRIBUIÇÃO
**Prioridade:** 🔴 CRÍTICA
**Impacto:** Alto (Dados para otimização)
**Esforço:** Baixo-Médio

### 6.1 Validação de Tracking Existente

**6.1.1 Google Tag Manager**
- [ ] Confirmar que GTM carrega APENAS via index.html (delay de 2s)
- [ ] Validar tags ativas: GA4, WhatsApp Click, Agendar Tratamento
- [ ] Testar triggers em todas as páginas

**6.1.2 Google Ads Conversion**
- [ ] Verificar evento de conversão (AW-16894364517/OQZvCMXV0foZEOqP7vY9)
- [ ] Validar que TODOS os CTAs disparam conversão
- [ ] Confirmar event_callback funciona

**6.1.3 GCLID Pipeline**
- [ ] Testar captura de GCLID em cada LP
- [ ] Validar envio para webhook N8N
- [ ] Confirmar armazenamento em Supabase
- [ ] Verificar labels únicos por CTA

**Ações:**
- [ ] Testar jornada completa: Ads → LP → WhatsApp → Webhook
- [ ] Validar localStorage (não sessionStorage)
- [ ] Confirmar que labels são descritivos e únicos

**Ferramentas:**
- Google Tag Assistant
- GTM Preview Mode
- Network tab (DevTools)

**Deliverable:** Relatório de tracking + correções

---

### 6.2 Novos Eventos e Métricas

**6.2.1 Micro-Conversões**
- [ ] Implementar tracking de scroll depth (25%, 50%, 75%, 100%)
- [ ] Rastrear clicks em links internos (service pages → blog)
- [ ] Medir tempo de permanência em seções críticas (bio, FAQ)
- [ ] Rastrear plays de vídeo (se houver)

**6.2.2 Engagement Metrics**
- [ ] Clicks em telefone (além de WhatsApp)
- [ ] Expansão de accordions (FAQ)
- [ ] Hover sobre badges de especialidade
- [ ] Clicks em "páginas relacionadas"

**Deliverable:** Eventos implementados + dashboard GA4

---

### 6.3 Dashboard de Performance

**Métricas Chave (KPIs):**
- Taxa de conversão por página (WhatsApp clicks / pageviews)
- Custo por conversão (Google Ads)
- Valor por conversão (upload offline via GCLID)
- ROAS (Return on Ad Spend)
- Taxa de bounce por fonte de tráfego
- Páginas mais visitadas (top 10)
- Keywords que mais convertem

**Ações:**
- [ ] Criar dashboard no Google Analytics 4
- [ ] Configurar alertas para quedas de conversão
- [ ] Relatório mensal automatizado

**Deliverable:** Dashboard configurado + template de relatório

---

## FASE 7: CONTEÚDO E SEO DE LONGO PRAZO
**Prioridade:** 🟡 MÉDIA
**Impacto:** Médio-Alto (Autoridade, tráfego orgânico)
**Esforço:** Contínuo

### 7.1 Content Gap Analysis

**Ações:**
- [ ] Identificar keywords/tratamentos não cobertos
- [ ] Analisar "People Also Ask" no Google para cada tratamento
- [ ] Pesquisar termos relacionados (Ahrefs, Semrush)
- [ ] Mapear perguntas frequentes de pacientes reais (feedback Dra. Carla)

**Oportunidades:**
- [ ] Criar service pages para tratamentos secundários
- [ ] Expandir FAQ com perguntas long-tail
- [ ] Adicionar conteúdo sobre cuidados pós-tratamento

**Deliverable:** Roadmap de conteúdo (6 meses)

---

### 7.2 Blog Pipeline Enhancement

**7.2.1 Processo Atual**
- Perplexity (pesquisa/draft) → Revisão Dra. Carla → Contentful → Site

**7.2.2 Otimizações**
- [ ] Priorizar formato Q&A (já em uso — validar)
- [ ] Incluir links internos para service pages (estratégia de internal linking)
- [ ] Adicionar imagens relevantes (otimizadas, alt text)
- [ ] Implementar schema `BlogPosting` + `Author`
- [ ] Gerar HTML estático para blog posts (fix de SEO técnico)

**7.2.3 Calendário Editorial**
- [ ] Definir frequência (ex: 2 posts/mês)
- [ ] Planejar temas por sazonalidade (ex: clareamento antes de festas)
- [ ] Alinhar com campanhas de Google Ads

**Deliverable:** Pipeline otimizado + calendário editorial

---

### 7.3 Link Building e Autoridade

**Estratégias:**
- [ ] Parcerias locais (Ipanema, Zona Sul) — guest posts, menções
- [ ] Diretórios odontológicos (CRO-RJ, associações)
- [ ] Press releases para marcos (20 anos, novas tecnologias)
- [ ] Participação em eventos locais (menções online)

**Nota:** Evitar backlinks de baixa qualidade (spam). Qualidade > quantidade.

**Deliverable:** Estratégia de link building (3-6 meses)

---

## CRONOGRAMA SUGERIDO — Com Agent Teams

### 🎯 Sprint 0 (Semana 1): DATA-DRIVEN FOUNDATION
**Execução em paralelo com Agent Teams**

**Data Analyst Agent:**
- Fase 0.1: Análise Google Ads (Supabase)
- Fase 0.2: Análise Google Analytics 4
- Fase 0.3: Cross-analysis (Ads + Analytics)

**Competitive Intelligence Agent (paralelo):**
- Fase 0.5.1: Análise de 5 concorrentes
- Fase 0.5.2: Gap analysis
- Fase 0.5.3: Best practices identificadas

**Deliverable:**
- Relatório consolidado de dados
- Top 20 oportunidades priorizadas por impacto
- Benchmark competitivo completo

---

### Sprint 1 (Semanas 2-3): Fundação Técnica + SEO
**Execução em paralelo**

**Frontend & Performance Specialist:**
- Fase 1.1: Core Web Vitals (FCP, LCP)
- Fase 1.3: Pre-rendering (blog posts)
- Fase 6.1: Validação de tracking

**SEO & AI Search Expert (paralelo):**
- Fase 2.1: On-page SEO (baseado em insights de data)
- Fase 2.2: AI Search optimization (Schema markup)
- Fase 1.4: Segurança e compliance CRO

**Inputs:** Usa insights da Fase 0 para priorizar páginas

---

### Sprint 2 (Semanas 4-5): UX e Conversão Data-Driven
**Execução em paralelo**

**UX & Conversion Optimizer:**
- Fase 3.1: Customer journey mapping
- Fase 3.2: Mobile experience
- Fase 5.1: Análise de funil (usando dados reais da Fase 0)

**Frontend Specialist (paralelo):**
- Implementação de fixes de performance identificados no Sprint 1

**Inputs:**
- Heatmap de páginas críticas (Fase 0.2)
- Jornadas de conversão do GA4 (Fase 0.2)

---

### Sprint 3 (Semanas 6-7): Psicologia & CTAs
**Foco em conversão**

**UX & Conversion Optimizer:**
- Fase 5.2: Psicologia do usuário (público premium)
- Fase 5.3: CTA optimization (baseado em benchmarks de concorrentes)
- Fase 5.4: WhatsApp flow optimization

**Data Analyst (validação):**
- Setup de A/B tests para CTAs novos
- Tracking de variações

**Inputs:**
- Best practices de concorrentes (Fase 0.5)
- Páginas com baixa conversão (Fase 0.2)

---

### Sprint 4 (Semanas 8-9): Refinamento Visual
**Alinhamento de marca**

**Frontend & Design:**
- Fase 4.1: Design system audit
- Fase 4.2: Imagens e assets
- Fase 4.3: Brand voice compliance (revisão de TODAS as páginas)

**SEO Expert (paralelo):**
- Implementação de schema markup avançado
- Otimização de FAQs baseadas em search terms reais (Fase 0.1)

---

### Sprint 5 (Semanas 10-11): Tracking Avançado
**Métricas e atribuição**

**Data Analyst + Frontend:**
- Fase 6.2: Novos eventos (micro-conversões)
- Fase 6.3: Dashboard consolidado
- Validação de GCLID pipeline

**Todos os Agentes:**
- Review final de suas áreas
- Correções de bugs/issues identificados

---

### Sprint 6 (Semanas 12-13): Conteúdo de Longo Prazo
**SEO sustentável**

**SEO & Content:**
- Fase 7.1: Content gap analysis (baseado em keywords da Fase 0)
- Fase 7.2: Blog pipeline optimization
- Calendário editorial trimestral

**Competitive Intelligence (revisit):**
- Fase 7.3: Estratégia de link building
- Parcerias locais e diretórios

---

### Contínuo (Mês 4+):
- **Fase 7.2:** Blog publishing (2 posts/mês)
- **Fase 7.3:** Link building ativo
- **Fase 1.2:** Refatoração de frontend (conforme necessário)
- **Monitoramento:** Dashboard semanal de KPIs
- **A/B Testing:** Iteração contínua baseada em dados

---

### Workload por Agent (6 sprints)

| Agent | Sprint 0 | Sprint 1 | Sprint 2 | Sprint 3 | Sprint 4 | Sprint 5 | Sprint 6 |
|-------|----------|----------|----------|----------|----------|----------|----------|
| Data Analyst | 🔴 Lead | — | 🟡 Support | 🟡 Support | — | 🔴 Lead | 🟡 Support |
| Competitive Intel | 🔴 Lead | — | — | 🟡 Input | — | — | 🔴 Lead |
| Frontend & Perf | — | 🔴 Lead | 🟡 Support | — | 🔴 Lead | 🟡 Support | — |
| SEO & AI Search | — | 🔴 Lead | — | — | 🟡 Support | — | 🔴 Lead |
| UX & Conversion | — | — | 🔴 Lead | 🔴 Lead | — | — | —|

---

## MÉTRICAS DE SUCESSO

### Técnicas
- [ ] FCP < 1.8s (mobile)
- [ ] LCP < 2.5s (mobile)
- [ ] CLS < 0.1
- [ ] 100% das páginas com HTML estático
- [ ] 0 vulnerabilidades críticas (npm audit)

### SEO
- [ ] +20% tráfego orgânico (3 meses)
- [ ] +15 keywords em top 10 (Google)
- [ ] 100% de Schema.org implementado
- [ ] Featured snippet em ao menos 3 queries

### UX
- [ ] -10% bounce rate (homepage)
- [ ] +20% tempo médio em página (service pages)
- [ ] 100% WCAG 2.1 AA compliance

### Conversão
- [ ] +25% taxa de conversão (WhatsApp clicks / pageviews)
- [ ] -20% custo por conversão (Google Ads)
- [ ] +30% valor médio por conversão
- [ ] Meta de faturamento: R$ 25.000+/mês

---

## FERRAMENTAS E RECURSOS

### Performance e Técnico
- PageSpeed Insights
- Lighthouse CI
- WebPageTest
- Chrome DevTools
- npm audit

### SEO
- Google Search Console
- Ahrefs ou Semrush
- Screaming Frog SEO Spider
- Google Keyword Planner
- Schema Markup Validator

### UX e Analytics
- Google Analytics 4
- Hotjar (heatmaps, recordings)
- BrowserStack (device testing)
- WAVE (acessibilidade)

### Design
- Figma (se necessário)
- Adobe XD (alternativa)

### Tracking
- Google Tag Manager
- Google Tag Assistant
- Network tab (DevTools)

---

## NOTAS FINAIS

### Princípios de Execução
1. **Dados > Intuição** — Toda decisão baseada em métricas
2. **Incremental > Big Bang** — Mudanças testáveis e reversíveis
3. **Mobile First** — Maioria do tráfego é mobile
4. **User-Centric** — Foco na jornada do paciente, não na tecnologia
5. **Brand Consistency** — Toda mudança deve respeitar BRAND.md

### Riscos e Mitigações
| Risco | Mitigação |
|-------|-----------|
| Mudanças quebrarem tracking | Testar em ambiente de staging antes de prod |
| Otimizações prejudicarem conversão | A/B testing sempre que possível |
| Conflito com regulamentação CRO | Revisar com Dra. Carla antes de publicar |
| Performance piorar com novas features | Lighthouse CI em pipeline de deploy |

### Próximos Passos
1. **Aprovação do plano** — Revisar com Patrick e Dra. Carla
2. **Priorização de sprints** — Ajustar cronograma conforme recursos
3. **Setup de ferramentas** — Hotjar, Ahrefs, etc.
4. **Kick-off do Sprint 1** — Core Web Vitals + Tracking

---

**Documento criado por:** Claude Code
**Última atualização:** Fevereiro 2026

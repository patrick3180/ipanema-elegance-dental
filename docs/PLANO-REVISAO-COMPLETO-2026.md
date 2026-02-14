# PLANO DE REVISÃO COMPLETO — FUNIL DE MARKETING
**Consultório:** Dra. Carla Christoph — Dentista Especialista em Ipanema  
**Data de Criação:** 13 de Fevereiro de 2026  
**Status:** 🔜 PLANEJAMENTO E BRAINSTORM  
**Responsável:** Patrick + Equipe de Marketing + IA  

---

## 📋 ÍNDICE

1. [Visão Geral & Contexto](#visão-geral--contexto)
2. [Situação Atual](#situação-atual)
3. [Pilares da Revisão](#pilares-da-revisão)
4. [Cronograma e Fases](#cronograma-e-fases)
5. [Responsabilidades](#responsabilidades)
6. [Métricas de Sucesso](#métricas-de-sucesso)

---

## 📊 VISÃO GERAL & CONTEXTO

### Objetivo Principal

**Executar revisão profunda de 360° do funil de marketing do consultório**, garantindo que cada elemento do site, conteúdo, design e estratégia de ads esteja:
- ✅ Tecnicamente otimizado
- ✅ Alinhado com brand guidelines
- ✅ Ranqueando bem em busca orgânica AND AI Search
- ✅ Convertendo eficientemente
- ✅ Refletindo psicologia de marketing de alto nível
- ✅ Legal e regulatoriamente em conformidade

### Situação Base

**Google Ads Performance:**
- Spend mensal: ~R$ 9.000/mês (~R$ 27.000/90 dias)
- Ticket médio por paciente: R$ 800–1.000
- Campanhas: 6 ativas + 1 pausada
- Conversões registradas: ~19,747 (nota: números agregados/inflacionados pelo BigQuery — precisa validação)
- Melhor campanha: Urgências (mais eficiente — 4.5x melhor que Lentes)
- Pior campanha: Lentes (menos eficiente, CTR 1.63%) — **4.5x pior**
- **Nota:** Valores absolutos de cost/conv do BigQuery estavam sendo somados incorretamente. Rankings relativos entre campanhas são válidos.

**GA4 Performance (90 dias):**
- Tráfego dominado por homepage (257 views)
- Blog contribui significativamente (5 of top 10 pages)
- Mobile é mayoría do tráfego
- Engagement varia bastante por página

**Stack Técnico:**
- React 18 + TypeScript (SPA)
- Tailwind CSS + design system próprio
- Contentful (blog)
- Vercel + Lovable (plataforma de dev)
- GTM + GA4 + Google Ads com GCLID offline

---

## 🎯 SITUAÇÃO ATUAL

### O Que Está Funcionando Bem ✅

1. **Urgências odontológicas** — campanha mais eficiente (R$ 23.73/conversão, 2.30% CTR)
2. **Blog drive traffic** — 5 das 10 páginas top são posts
3. **Brand guidelines muito claros** — 5 documentos com regras rigorosas
4. **Tracking robusto** — GTM + GA4 + GCLID offline conversion pipeline
5. **Homepage design** — 39.66s avg engagement, clara liderança em tráfego
6. **Processo de design** — Design system com Tailwind, mobile-responsive

### Problemas Identificados ⚠️

1. **Lentes de Contato** — pior performance (R$ 107/conversão, 1.63% CTR)
2. **Prótese** — alta fricção (R$ 91.61/conversão)
3. **Implantes** — underperforming (R$ 96.51/conversão)
4. **Quality Scores baixos** — em keywords de prótese (QS 0-1)
5. **Performance mobile** — FCP 3.1s, LCP 3.6s na homepage
6. **Blog posts sem pre-rendering** — meta tags dependem de client-side React
7. **Redundância SEO** — service pages vs landing pages mesmos tópicos, URLs diferentes
8. **AI Search não otimizado** — FAQ schemas nem sempre presentes, QuickAnswer boxes limitadas

### Oportunidades Não Exploradas 🚀

1. **AI Search leadership** — dominar "Perplexity e outras AIs" para dental em Ipanema
2. **Design da hero section** — homepage é mais visitada, design pode ser elevado
3. **Test Drive do Sorriso** — unique differentiator, não explorado o suficiente
4. **iTero Element 5D** — tecnologia premium, pode ser USP mais forte
5. **Psicologia de conversão** — falta análise de "dor vs aspiração" por setor
6. **Landing pages by persona** — hoje genéricas, poderiam ser ultrapersonalizadas
7. **Message match** — nem todos os ads têm copy que casa com LP
8. **Content strategy** — blog poderia ter mais integração com sales funnel
9. **WhatsApp automation** — 24h responder mas pode ser mais inteligente
10. **Micro-conversions** — PDF guides, quiz do "qual tratamento preciso", calculadora

---

## 🔍 PILARES DA REVISÃO

### Pilar 1: REVISÃO TÉCNICA

**Escopo:**
- Auditoria de performance (FCP, LCP, CLS, TTFB)
- Validação de schemas JSON-LD (MedicalProcedure, FAQPage, LocalBusiness)
- Pre-rendering e meta tag strategy
- Lazy loading, imagens otimizadas
- Mobile responsividade (viewport, touch, landscape)
- Compatibilidade de navegadores
- Accessibilidade (WCAG 2.1 AA)
- Security: headers (CSP, HSTS), HTTPS, sanitização

**Deliverables:**
- [ ] Relatório de performance (Web Vitals baseline)
- [ ] Checklist técnico por página
- [ ] Recomendações de otimização (quick wins + longo prazo)
- [ ] Roadmap de performance

**Responsável:** Patrick + IA  
**Timeline:** 1 semana

---

### Pilar 2: SEO (Busca Orgânica)

**Escopo:**
- Auditoria de keywords das service pages vs. Google Ads keywords
- Gaps entre o que temos organicamente vs. o que gastamos em ads
- Schema markup completeness (todas as service pages têm FAQPage + MedicalProcedure?)
- Internal linking strategy (estamos linkando certo?)
- Content depth — service pages têm profundidade o suficiente?
- Canonicalization — duplicates (www vs. non-www, etc.)
- Sitemap accuracy
- Mobile-first indexing compatibility
- Robots.txt compliance
- Structured data validation

**Deliverables:**
- [ ] Keyword mapping: Service Pages vs. Ads vs. Blog
- [ ] Ranking data atual (GSC data)
- [ ] Gaps e oportunidades de keywords long-tail
- [ ] SEO improvement roadmap
- [ ] Schema completeness audit

**Responsável:** Patrick + IA  
**Timeline:** 1-2 semanas

---

### Pilar 3: AI SEARCH OPTIMIZATION

**Escopo:**
- Análise: como Perplexity, ChatGPT, Google Gemini citam Dra. Carla?
- Estratégia para aparecer em AI results (featured snippets, citations)
- Quick Answer Boxes em cada service page
- FAQ estruturação para AI extraction
- Blog posts Q&A format optimization
- Entity recognition (Dra. Carla como autoridade em implantes, prótese, lentes)
- Brand mentions e building

**Deliverables:**
- [ ] AI Search ranking audit (onde aparecemos nas AIs?)
- [ ] Perplexity research report
- [ ] Quick Answer Box template + rollout
- [ ] Blog Q&A format guide
- [ ] AI Search content strategy (12 meses)

**Responsável:** IA + Patrick  
**Timeline:** 2 semanas

---

### Pilar 4: BRAND COMPLIANCE & CONTEÚDO

**Escopo:**
- Auditoria de conformidade com BRAND.md (tom, voice, palavras banidas)
- Verificação de regras CRO (CRO-RJ visível?, preços mencionados?, fotos antes/depois?)
- Restrições legais: garantias, termos absolutos (indolor, 100% seguro)
- Bio canônica: todas as pages usam a bio correta?
- Frases contextuais: cada service page tem a frase contextual certa?
- Depoimentos: formato correto (Nome I. — Bairro, sem estrelas)?
- Copy tone: genérico vs. específico?
- Atribuição de tratamentos: Dra. Carla vs. parceiros?

**Deliverables:**
- [ ] Relatório de conformidade (página por página)
- [ ] Lista de páginas que precisam revisão de copy
- [ ] Recomendações de reescrita
- [ ] Checklist de validação para futuro

**Responsável:** Patrick + Dra. Carla (review final)  
**Timeline:** 2 semanas

---

### Pilar 5: GOOGLE ANALYTICS & DATA

**Escopo:**

#### 5.1 Tráfego & Comportamento
- Páginas com maior tráfego: são as que mais importam (revenue-wise)?
- Bounce rate por página: onde os usuários abandonam?
- Time on page vs. conversão: há correlação?
- Device performance: mobile vs. desktop, qual converte mais?
- Traffic sources: Google organic vs. paid vs. direct, qual é melhor?
- Geo data: além de Zona Sul, temos tráfego de onde?

#### 5.2 Funnel Analysis
- Top of funnel: blog posts levam a service pages?
- Mid-funnel: service pages levam a WhatsApp?
- Bottom of funnel: WhatsApp clicks → telefone → agendamento
- Dropoff analysis: em qual ponto perdem pacientes?

#### 5.3 Micro-Conversions
- Form submissions (se houver)
- File downloads
- Video engagement
- Scroll depth
- WhatsApp clicks (tracked via GTM)

#### 5.4 Segmentation
- Por tratamento (clareamento vs. implantes vs. lentes)
- Por localização (Ipanema vs. outros bairros)
- Por device (mobile vs. desktop)
- Por traffic source (ads vs. organic)

**Deliverables:**
- [ ] GA4 analysis report: top pages, traffic sources, funnel
- [ ] Opportunity map: páginas com tráfego alto mas baixa conversão
- [ ] Device performance analysis
- [ ] Geo analysis: onde crescer?
- [ ] Micro-conversion tracking recommendations

**Responsável:** Patrick + IA (análise de dados)  
**Timeline:** 1-2 semanas

---

### Pilar 6: GOOGLE ADS & PAID STRATEGY

**Escopo:**

#### 6.1 Performance Campaigns
- Análise campanha por campanha
- CTR, CPC, Cost/Conversion, Conversion Rate
- Quality Score analysis (alguns keywords com QS 0-1)
- Budget allocation: é ótima?

#### 6.2 Keyword Audit
- Keywords top performers: emergência (R$ 7.04/conv), restauração (R$ 24.79/conv)
- Keywords underperformers: prótese especialista (R$ 186/conv), lentes (R$ 107/conv)
- Negative keywords: estão sendo usadas?
- Long-tail opportunities: keywords baixo volume, alto ROI

#### 6.3 Ad Copy & Message Match
- Relevância de copy vs. LP (message match)
- Callouts e extensions: setas usando todas?
- Ad strength score
- A/B testing: há testes rodando?

#### 6.4 Landing Page Relevance
- LP existe para cada keyword cluster?
- Message match: copy do ad bate com headline da LP?
- Relevância: LP responde à intenção de busca?
- Load time: LP carrega rápido (Google mede)?
- CTA clarity: botão WhatsApp é claro?

#### 6.5 Conversion Tracking Quality
- GCLID pipeline está capturando tudo?
- Offline conversions (faturamento) sendo sincronizados?
- Attribution model: Linear vs. Last-Click vs. Time Decay?
- Perda de conversões: quantas sessões não são rastreadas?

#### 6.6 Budget & ROAS
- Spend atual: ~R$ 9.000/mês (~R$ 108k/ano)
- Ticket médio: R$ 800–1.000 por paciente
- Revenue estimado: precisa ser validado com dados reais de faturamento
- ROAS por campanha
- Target CPA: qual deveria ser? (idealmente < ticket médio)
- Budget shifts: quem deveria crescer? Quem deveria diminuir?

**Deliverables:**
- [ ] Google Ads comprehensive audit report
- [ ] Keyword opportunity ranking (expand, optimize, pause)
- [ ] LP relevance audit per campaign
- [ ] Message match assessment
- [ ] Budget reallocation recommendation
- [ ] 90-day optimization plan (quick wins + strategic)
- [ ] ROAS analysis e target setting

**Responsável:** Patrick (ou Google Ads specialist) + IA  
**Timeline:** 2 semanas

---

### Pilar 7: DESIGN & UX REVIEW

**Escopo:**

#### 7.1 Hero Section (Homepage)
- Design visual: alinha com brand identity (dental-purple, dental-gold)?
- Imagem da Dra. Carla: impacto, quality, profissionalismo?
- Headline: comunica a proposta de valor ("20 anos em Ipanema")?
- Subheadline: clareza da diferença competitiva (1h mínimo, Test Drive)?
- CTA button: visibilidade, cor, copy?
- Hierarchy: o que o olho vê primeiro?

#### 7.2 Service Pages Design
- Consistência de layout (TreatmentHero, bio box, FAQ, CTA)
- Imagens: qualidade, relevância, otimização?
- Typography: Playfair + Montserrat aplicadas corretamente?
- Spacing: seções têm respiro visual?
- Calls-to-action: número, posição, copy?
- Accessible colors: contraste (texto vs. background)?

#### 7.3 Landing Pages Design
- Urgência visual (scarcity, timer, testimonials?)
- Problem section: design conecta com a dor?
- Solution section: visual clarity?
- Testimonials: fotos, nomes, bairros — credibilidade?
- CTA final: destacado o suficiente?
- Floating WhatsApp: mobile UX?

#### 7.4 Mobile Experience
- Responsividade: testar em diferentes sizes
- Touch targets: botões têm 48px+ de padding?
- Viewport: viewport meta tag configurado?
- Performance: mobile não carrega mais lento?
- Teste em iPhone SE, iPhone 14, Samsung S21, pixel

#### 7.5 Brand Consistency
- Cores: dental-purple, dental-gold são usados corretamente?
- Fonts: Playfair vs. Montserrat — sempre consistently?
- Buttons: WhatsApp green, OK? Hover states bons?
- Icons: style, size, color consistent?
- Spacing: margin/padding padrão em uso?

**Deliverables:**
- [ ] Design audit report (hero, service pages, LPs)
- [ ] Mobile UX test results
- [ ] Brand consistency checklist
- [ ] Design improvement recommendations
- [ ] Mockups de hero redesign (opcional: A/B test)

**Responsável:** Patrick (Front-end skills) + IA (visual strategy)  
**Timeline:** 2 semanas

---

### Pilar 8: MARKETING PSYCHOLOGY & POSITIONING

**Escopo:**

#### 8.1 Positioning Analysis
- **Estamos posicionados como "Luxo Silencioso"?** Análise qualitativa vs. competidores
- Mensagem de tempo (1h mínimo) — está sendo comunicada com força?
- Individualização vs. "protocolo padrão" — copy diferencia?
- Materiais premium — nomeação específica (iTero, Test Drive, cerâmica alta translucidez)?
- **Jornada completa** — novo paciente sente que a Dra. acompanha tudo?

#### 8.2 Pain vs. Aspiration
Para cada serviço, analisar:
- **Pain (situação atual):** "tenho dentes amarelados, criei insegurança há 10 anos"
- **Fear (resistência):** "clareamento dói", "implante é caro", "lentes são irreversíveis"
- **Aspiration (sonho):** "quero sorrir com confiança", "quero dentes que pareçam reais"
- **Outcome (resultado):** "resultado natural que passa despercebido"

**Design thinking:** cada página target a pain/aspiration certo?

#### 8.3 Psychological Triggers (Cialdini)

| Trigger | Uso Atual | Potencial |
|---------|-----------|-----------|
| **Reciprocidade** | Consultoria grátis? | Could offer checklist, quiz |
| **Escassez** | Slots limitados? | Communal urgency? "book now"? |
| **Autoridade** | 20 anos, CRO-RJ, Marinha | Amplificar: prêmios, associações? |
| **Consenso Social** | Depoimentos (38 tracking) | Mais depoimentos, "4.000+ pacientes"? |
| **Simpatia** | Bio acolhedora ("sem pressa") | Pessoalização de LPs por persona? |
| **Compromisso** | Nenhum (WhatsApp é primeiro contato) | Could warm-up with micro-commitment |

**Análise:** Qual trigger está underutilized?

#### 8.4 Messaging Framework (StoryBrand)

Para cada serviço:
1. **O Herói (paciente):** "Você quer sorrir com confiança"
2. **O Vilão (problema):** "Seus dentes amarelados criam insegurança"
3. **O Guia (Dra. Carla):** "em 20 anos, já ajudei 4.000+ a recuperar a confiança"
4. **O Plano:** Consulta 1h → Escaneamento iTero → Simulação Test Drive → Tratamento
5. **O Resultado (final):** "Sorriso natural que você merecia"

**Análise:** cada LP segue este framework? Copy alinha?

#### 8.5 Tone & Voice Audit
- CTA copy: genérica ("agende agora") vs. específica ("reserve seu Test Drive")?
- Seções de "problema": dramatizam ou reconhecem?
- Testimonials: parecem falsos ou reais?
- Bio: profissional demais ou acolhedora?

**Análise:** conformidade com BRAND.md Seção 4 (Tom de Voz)

**Deliverables:**
- [ ] Positioning analysis vs. competitors
- [ ] Pain/Aspiration mapping (por serviço)
- [ ] Psychological triggers assessment
- [ ] Messaging framework audit + rewrite templates
- [ ] Tone of voice compliance audit
- [ ] Recommendations para copy, CTAs, testimonials

**Responsável:** IA + Patrick (brand strategy)  
**Timeline:** 2 semanas

---

### Pilar 9: LANDING PAGE OPTIMIZATION

**Escopo:**

#### 9.1 LP Portfolio Analysis
- Temos 13 LPs — todas sendo utilizadas?
- Cada LP tem uma campanha de Ads dedicada?
- Historical performance: qual LP converte melhor?
- Quick win: pausar LPs de baixo ROAS?

#### 9.2 Message Match Audit
Para cada LP:
- Headline bate com copy do anúncio?
- Keywords do Ad Group aparecem na LP?
- Primeiro parágrafo responde à hesitação do searcher?
- CTA é relevante à intenção ("Lentes Porcelana" → "descubra o Test Drive")?

#### 9.3 Landing Page Elements Quality

| Elemento | Verificação |
|----------|------------|
| Headline | Relevante? Específico? |
| Subheadline | Clarifica o benefício? |
| Benefits | 4 bullets realmente diferenciadores? |
| Problem section | Conecta com a dor do paciente? |
| Guide section | 4 passos são claros e lógicos? |
| Testimonials | Tom real? Nome+bairro OK? Sem stars? |
| FAQ | Responde objections? Sem preço? |
| CTA button | Color, text, positioning? |
| Form/Friction | Se houver form, 3 fields max? |
| Mobile | Resposta no mobile? Floating WhatsApp visível? |

#### 9.4 Conversion Rate Benchmarking
- Benchmark: típico para dental is 3-8% whatsapp clicks
- Nossas LPs: qual é o conversion rate?
- Comparison: qual LP tem melhor CR? Por quê?

#### 9.5 A/B Testing Gaps
- Há A/B testes rodando?
- Headline v2 vs. v1?
- CTA color/text variations?
- Testimonial placement?
- Video vs. without?

**Deliverables:**
- [ ] LP portfolio performance analysis
- [ ] Message match audit (LP vs. Ad copy)
- [ ] LP quality scorecard (benchmark cada LP)
- [ ] A/B testing recommendations
- [ ] Top 3 LPs para optimization (quick wins)
- [ ] LP template best-practices update

**Responsável:** Patrick + IA  
**Timeline:** 2 semanas

---

### Pilar 10: CONTEÚDO E BLOG STRATEGY

**Escopo:**

#### 10.1 Blog Audit
- Posts atuais: quantos, tópico, performance (views, time on page)?
- **Obs:** Blog drive 5/10 top pages — lembrar que "Jejum Intermitente" teve 542.65s avg!
- Q&A format: quantos posts estão em Q&A? Deveriam ser mais?
- Internal linking: links dentro de posts para service pages?
- Meta tags: HTML estático pre-renderizado? (TECH.md nota: blog posts não têm!)

#### 10.2 Content Gaps
- Buscar no Google: "clareamento dental ipanema", "implante dentário lentes de contato", etc.
- Há gaps entre searcher queries e posts que temos?
- Long-tail keywords não cobertos?
- Seasonal queries (ex: "clareamento para festas")?

#### 10.3 SEO Content Strategy
- Blog posts devem rankear em Google para long-tail keywords
- Cada post deve linkar para uma service page relevante
- FAQ em posts deve estar em Q&A formato (AI Search friendly)
- Regularidade: qual frequência de publicação será sustentável?

#### 10.4 TopicalAuthority
- Temos autoridade em "clareamento"? Quantos posts?
- Temos autoridade em "implantes"? Quantos posts?
- Lentes/facetas: cobertura suficiente?
- Períodontia: como posicionar parceria com periodontista?

**Deliverables:**
- [ ] Blog audit report (posts, performance, gaps)
- [ ] Content gap analysis (vs. Google search volume)
- [ ] Blog SEO strategy
- [ ] Content calendar (12 meses)
- [ ] Q&A format guidelines para blog
- [ ] Internal linking audit + improvement plan

**Responsável:** IA (content strategy) + Patrick (publication)  
**Timeline:** 2-3 semanas

---

## 📅 CRONOGRAMA E FASES

### Fase 1: DISCOVER & ANALYZE (Semanas 1-3)
Executar todos os 10 pilares em profundidade, gerar relatórios detalhados.

**Semana 1:**
- [ ] Pilar 1 (Técnico) — Draft
- [ ] Pilar 5 (GA4) — Análise base
- [ ] Pilar 6 (Google Ads) — Relatório gerencial

**Semana 2:**
- [ ] Pilar 2 (SEO) — Keyword mapping
- [ ] Pilar 3 (AI Search) — Competitive analysis
- [ ] Pilar 7 (Design) — Hero section deep-dive
- [ ] Pilar 4 (Brand Compliance) — Spot check

**Semana 3:**
- [ ] Pilar 8 (Psychology) — Positioning document
- [ ] Pilar 9 (Landing Pages) — Performance audit
- [ ] Pilar 10 (Blog) — Content gap analysis
- [ ] Consolidate findings → **SUMMARY DOCUMENT** (síntese de 20-30 páginas)

### Fase 2: BRAINSTORM & ALIGN (Semana 4)
Workshop interno:
- Dra. Carla review findings
- Patrick + IA discussão de prioridades
- Define quick wins vs. strategic initiatives
- Validates budget/resources needed

**Outputs:**
- [ ] Prioritized opportunities list
- [ ] Implementation roadmap (3 meses)
- [ ] Resource allocation (horas/orçamento)
- [ ] Risk assessment & dependencies

### Fase 3: EXECUTE (Meses 2-3)
Implementar changes in sprints (1-2 semanas cada).

**Sprint Example:**
- Sprint 3A (Semana 5-6): Quick wins técnicos (schemas, performance)
- Sprint 3B (Semana 7-8): Google Ads optimization (keyword, message match)
- Sprint 3C (Semana 9-10): Copy rewrite (brand compliance, psychology)
- Sprint 3D (Semana 11-12): Design improvements (hero, mobile, LPs)

### Fase 4: MEASURE & ITERATE (Contínuo)
- Weekly dashboards (GA4, Google Ads, blog metrics)
- Monthly reviews (ROAS, cost/conversão, tráfego orgânico)
- Quarterly strategy refresh (ajustar à luz de novos dados)

---

## 👥 RESPONSABILIDADES

| Função | Responsabilidades | Horas/Semana |
|--------|-------------------|-------------|
| **Patrick (Estratégia)** | Oversight geral, Google Ads, Design, GA4 análise | 20-25h |
| **IA (Análise & Conteúdo)** | Pilar análise, copywriting, SEO strategy, blog | 25-30h |
| **Dra. Carla (Validação)** | Brand voice review, positioning approval, final sign-off | 5-10h |

---

## 📊 MÉTRICAS DE SUCESSO

### Métricas de Curto Prazo (3 meses)

| Métrica | Baseline | Target | Impacto |
|---------|----------|--------|--------|
| **Cost/Conversion (Google Ads)** | R$ 39-107 (média) | R$ 35-85 | -15% ao -20% |
| **Homepage CTR (Google)?** | ? | +50% | +tráfego orgânico |
| **WhatsApp conversão rate** | ~4-5%? | 6-8% | +leads |
| **Blog traffic contribution** | 5/10 top pages (50%) | 6/10 (60%) | +organic |
| **Mobile Core Web Vitals** | FCP 3.1s / LCP 3.6s | FCP <2.5s / LCP <2.0s | +SEO ranking |
| **Brand compliance** | ? | 100% de páginas compliant | +confiança |

### Métricas de Médio Prazo (6 meses)

| Métrica | Target |
|---------|--------|
| **Organic traffic growth** | +40% YoY |
| **Featured snippets** | +10 keywords (AI Search visible) |
| **Google Ads ROAS** | +25% (ou manter spend, +25% conversões) |
| **Blog authority** | +50K monthly organic impression (blog keywords) |
| **Design NPS** | 8/10 (site usability) |

### Métricas de Longo Prazo (12 meses)

| Métrica | Target |
|--------|--------|
| **Revenue from organic + paid** | +50% YoY |
| **Brand searches** | +100% (awareness) |
| **Repeat visitors** | +25% |
| **AI Search leadership** | Aparecer em TOP 3 para "dentista especialista Ipanema" em Perplexity |

---

## 📝 DOCUMENTAÇÃO E RASTREAMENTO

Todos os findings, decisões e mudanças serão documentados em:

1. **Este arquivo** (PLANO-REVISAO-COMPLETO-2026.md) — Atualizado semanalmente
2. **Status files por Pilar** — Um doc por pilar com deep-dives
3. **Git commits** — Descritivos, taggeados com #ScanCarla2026
4. **Lovable prompts** — Documentados com contexto
5. **Meeting notes** — Weekly sync Dra. Carla + Patrick + IA

---

## 🚀 PRÓXIMOS PASSOS IMEDIATOS

1. **Hoje:** Criar estrutura de análise paralelizada
2. **Semana 1:** Iniciar coleta de dados (GA4 exports, Google Ads snapshots, Perplexity research)
3. **Semana 1-2:** Brainstorm de oportunidades (reunião com Dra. Carla)
4. **Semana 3:** Consolidar findings em documento de síntese
5. **Semana 4:** Validação e aprovação de roadmap

---

**Criado em:** 13 de Februário 2026, 14:45  
**Última atualização:** 13 de Fevereiro 2026

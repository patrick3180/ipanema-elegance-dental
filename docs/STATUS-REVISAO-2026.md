# STATUS DE PROJETO — REVISÃO COMPLETA 2026

**Projeto:** Revisão 360° do Funil de Marketing  
**Duração:** 12 semanas  
**Data de Início:** 13 de Fevereiro de 2026  
**Status Geral:** 🔜 DISCOVERY PHASE  
**Próximo Milestone:** Síntese de Findings (Fim da Semana 3)  

---

## 📊 PROGRESS SUMMARY (Atual — 13 Fev 2026)

```
FASE 1: DISCOVER & ANALYZE (Semanas 1-3)
─────────────────────────────────────────
Pilar 1 (Técnico):    [██████████] 100% ✅ COMPLETO
Pilar 5 (GA4):        [██████████] 100% ✅ COMPLETO
Pilar 6 (Google Ads): [██████████] 100% ✅ COMPLETO
Pilar 2 (SEO):        [░░░░░░░░░░] 0%
Pilar 3 (AI Search):  [░░░░░░░░░░] 0%
Pilar 4 (Brand):      [░░░░░░░░░░] 0%
Pilar 7 (Design):     [░░░░░░░░░░] 0%
Pilar 8 (Psychology): [░░░░░░░░░░] 0%
Pilar 9 (LPs):        [░░░░░░░░░░] 0%
Pilar 10 (Blog):      [░░░░░░░░░░] 0%
─────────────────────────────────────────
TOTAL: [███░░░░░░░] 30% (Fase 1)

Fase 2-4: [░░░░░░░░░░] 0%
═════════════════════════════════════════
PROJECT OVERALL: [███░░░░░░░░░░░░░░░░░░░░] 15%
```

---

## 🎯 PILARES STATUS DETALHADO

### Pilar 1: REVISÃO TÉCNICA
**Status:** ✅ COMPLETO
**Owner:** Patrick + IA
**Relatório:** `docs/analysis/PILAR-1-REVISAO-TECNICA.md`
**Score:** 72/100 (potencial 85+ com quick wins)

| Task | Status | Notes |
|------|--------|-------|
| Performance baseline (FCP, LCP, CLS) | ✅ DONE | Estimativa via código: FCP ~1.5-2.5s, LCP ~2.0-3.5s |
| Schema validation (all pages) | ✅ DONE | FAQPage AUSENTE em ImplantesDentarios e ClareamentoDental |
| Pre-rendering audit | ✅ DONE | Blog posts dependem de client-side rendering |
| Mobile responsividade | ✅ DONE | Score 85/100, Tailwind responsive OK |
| Image optimization audit | ✅ DONE | WebP OK, lazy loading OK, hero preloads OK |
| Security headers | ✅ DONE | AUSENTES no vercel.json - problema crítico |
| Relatório técnico | ✅ DONE | 9 quick wins + 9 ações médio prazo identificadas |

**Principais findings:**
- robots.txt API BLOQUEIA AI bots (conflito com arquivo estático)
- FAQPage schema ausente em 2 páginas de serviço (oportunidade de Featured Snippets)
- og:image com URL relativa em Implantes + ausente em Clareamento
- reviewCount inconsistente (23 vs 127)
- Security headers completamente ausentes

---

### Pilar 2: SEO (Busca Orgânica)
**Status:** 🔴 NOT STARTED  
**Owner:** Patrick + IA  
**Timeline:** Semana 2  

| Task | Status | Notes |
|------|--------|-------|
| Keyword audit (service pages vs. ads) | ⏳ PENDING | Mapear keywords em GSC vs. Google Ads |
| GSC data export | ⏳ PENDING | Impressions, CTR, avg position por página |
| Internal linking audit | ⏳ PENDING | Mapear links entre páginas |
| Canonicalization check | ⏳ PENDING | www vs. non-www, duplicates |
| Sitemap validation | ⏳ PENDING | Testar /api/sitemap.js, completeness |
| Content depth assessment | ⏳ PENDING | Word count, H1-H6 structure por página |
| Schema completeness | ⏳ PENDING | FAQPage, MedicalProcedure, LocalBusiness |
| Relatório de SEO | ⏳ PENDING | Gaps, oportunidades, roadmap |

**Deadlines:**
- [ ] Keyword mapping: 21 de Feb
- [ ] Final relatório: 24 de Feb

---

### Pilar 3: AI SEARCH OPTIMIZATION
**Status:** 🔴 NOT STARTED  
**Owner:** IA + Patrick  
**Timeline:** Semana 2  

| Task | Status | Notes |
|------|--------|-------|
| Perplexity competitive research | ⏳ PENDING | Query: "dentista ipanema", "implante rio" |
| ChatGPT/Gemini research | ⏳ PENDING | Verificar citações de Dra. Carla |
| Featured snippet audit | ⏳ PENDING | Quais páginas podem ter snippets? |
| Quick Answer Box design | ⏳ PENDING | Template para cada service page |
| Blog Q&A format guide | ⏳ PENDING | Strutctura para futuras posts |
| AI Search strategy document | ⏳ PENDING | 12-month plan |
| Relatório AI Search | ⏳ PENDING | Current state + recommendations |

**Deadlines:**
- [ ] Perplexity/LLM research: 20 de Feb
- [ ] Final relatório: 24 de Feb

---

### Pilar 4: BRAND COMPLIANCE & CONTEÚDO
**Status:** 🟡 IN PROGRESS (SPOT CHECKS)  
**Owner:** Patrick + Dra. Carla (review)  
**Timeline:** Semana 2-3  

| Task | Status | Notes |
|------|--------|-------|
| Auditoria de tone (BRAND.md Seção 4) | ⏳ PENDING | Cada page: genérica vs. específica? |
| Palavras banidas (BRAND.md Seção 5) | ⏳ PENDING | grep de "sorriso perfeito", "premium", "excelência" |
| Bio canônica conformidade | ⏳ PENDING | Todas as service pages usam bio correta? |
| Frases contextuais (BRAND.md Seção 1) | ⏳ PENDING | Cada service page tem frase contextual? |
| Depoimentos formato | ⏳ PENDING | Nome I. — Bairro, sem stars? |
| CRO-RJ visibilidade | ⏳ PENDING | CRO-RJ 27.509 em todas as LPs? |
| Menção de preços | ⏳ PENDING | Alguma página menciona preço? (PROIBIDO) |
| Fotos antes/depois | ⏳ PENDING | Alguma página tem fotos proibidas? |
| Atribuição de tratamentos | ⏳ PENDING | Dra. Carla vs. parceiros (canal, gengiva)? |
| Relatório de conformidade | ⏳ PENDING | Página por página, recomendações |

**Deadlines:**
- [ ] Spot checks: 20 de Feb
- [ ] Full audit: 27 de Feb

---

### Pilar 5: GOOGLE ANALYTICS & DATA
**Status:** ✅ COMPLETO (atualizado com CSV fresco)
**Owner:** Patrick + IA
**Relatório:** `docs/analysis/PILAR-5-GA4-ANALYSIS.md`

| Task | Status | Notes |
|------|--------|-------|
| GA4 data export | ✅ DONE | CSV 30 dias (14 Jan - 12 Fev) + BigQuery 90 dias |
| Top pages analysis | ✅ DONE | Homepage 559 views, Prótese #2 (189 views!) |
| Device performance | ✅ DONE | Mobile 81%, iOS 2,21% conv, Android 0,91% |
| Traffic source comparison | ✅ DONE | Ads 71%, Orgânico 17,5%, Direto 7,8% |
| Funnel analysis | ✅ DONE | Blog quase zero conversão, Probióticos exceção (28,57%) |
| Landing pages analysis | ✅ DONE | LPs APARECEM no GA4, 7 LPs com dados reais |
| Relatório GA4 | ✅ DONE | 6 oportunidades + 5 quick wins |

**Principais findings:**
- 952 usuários em 30 dias, 81% mobile
- iOS converte 2,4x mais que Android (problema de UX Android?)
- Blog traz tráfego mas NÃO converte (exceto Probióticos: 28,57%!)
- LP Saúde Gengival tem engagement excepcional (212s)
- Apenas 38 cliques WhatsApp em 90 dias no GA4 (possível subtracking)
- ChatGPT já aparece como fonte de tráfego (1 visita)

---

### Pilar 6: GOOGLE ADS & PAID STRATEGY
**Status:** ✅ COMPLETO
**Owner:** Patrick + IA
**Relatório:** `docs/analysis/PILAR-6-GOOGLE-ADS-AUDIT.md`

| Task | Status | Notes |
|------|--------|-------|
| Campaign performance ranking | ✅ DONE | Urgências #1, Lentes #6 (4,5x pior) |
| Top keywords audit | ✅ DONE | "emergência dentista" R$7,04/conv (melhor), "especialista prótese" R$186/conv (pior) |
| Quality Score analysis | ✅ DONE | 4 keywords QS 0 na Prótese — CRÍTICO |
| Budget allocation analysis | ✅ DONE | Urgências recebe MENOS (7%) sendo a MELHOR |
| LP relevance audit | ✅ DONE | 14 LPs mapeadas com campanhas associadas |
| ROAS estimation | ✅ DONE | Urgências 5,9x, Implantes possivelmente 58,7x (ticket alto) |
| Relatório Google Ads | ✅ DONE | Plano 90 dias + quick wins + realocação de budget |

**Principais findings:**
- Urgências recebe apenas 7,1% do budget sendo 4,5x mais eficiente
- Prótese tem 4 keywords com QS ZERO — paga prêmio de 50-400% no CPC
- Lentes precisa de Test Drive do Sorriso no ad copy
- Proposta: Urgências de R$639 → R$1.800/mês (+182%)
- Quick wins em Google Ads podem ser feitos em 45 minutos

---

### Pilar 7: DESIGN & UX REVIEW
**Status:** 🔴 NOT STARTED  
**Owner:** Patrick (Front-end) + IA  
**Timeline:** Semana 2-3  

| Task | Status | Notes |
|------|--------|-------|
| Hero section analysis (homepage) | ⏳ PENDING | Imagem Dra., headline, CTA, hierarchy |
| Service pages design consistency | ⏳ PENDING | TreatmentHero, bio box, FAQ, CTA layout |
| Landing pages design audit | ⏳ PENDING | Urgência visual, problem/solution, CTA |
| Mobile UX test (5 devices) | ⏳ PENDING | Responsividade, touch targets, viewport |
| Color/typography consistency | ⏳ PENDING | Dental-purple, dental-gold, Playfair/Montserrat |
| Button/CTA accessibility | ⏳ PENDING | Color contrast, size, hover states |
| Image optimization | ⏳ PENDING | WebP, lazy loading, responsive |
| Hero redesign mockup | ⏳ PENDING | Opcional: A/B test candidate |
| Relatório Design | ⏳ PENDING | Recommendations + mockups |

**Deadlines:**
- [ ] Initial audit: 21 de Feb
- [ ] Mockups/recommendations: 27 de Feb

---

### Pilar 8: MARKETING PSYCHOLOGY & POSITIONING
**Status:** 🔴 NOT STARTED  
**Owner:** IA + Patrick  
**Timeline:** Semana 2-3  

| Task | Status | Notes |
|------|--------|-------|
| Positioning vs. competitors analysis | ⏳ PENDING | "Luxo silencioso" positioning audit |
| Pain/Aspiration mapping (por serviço) | ⏳ PENDING | Clareamento: pain = amarelado, aspiration = confiança |
| Psychological triggers assessment | ⏳ PENDING | Cialdini 6 principles (reciprocity, scarcity, authority, consensus, sympathy, commitment) |
| StoryBrand framework audit | ⏳ PENDING | Hero/problem/guide/plan/outcome — cada página? |
| Tone of voice compliance | ⏳ PENDING | Genérica vs. específica? Copy bate com brand? |
| Messaging for each service | ⏳ PENDING | Clareamento, Implantes, Lentes, Prótese, etc. |
| Copy optimization recommendations | ⏳ PENDING | Headlines, CTAs, testimonials |
| Relatório Psychology | ⏳ PENDING | Framework + rewrite templates |

**Deadlines:**
- [ ] Positioning analysis: 22 de Feb
- [ ] Messaging framework: 26 de Feb
- [ ] Final relatório: 28 de Feb

---

### Pilar 9: LANDING PAGE OPTIMIZATION
**Status:** 🔴 NOT STARTED  
**Owner:** Patrick + IA  
**Timeline:** Semana 2-3  

| Task | Status | Notes |
|------|--------|-------|
| LP portfolio analysis (13 LPs) | ⏳ PENDING | Quais estão ativos? Performance? |
| Message match audit | ⏳ PENDING | Ad copy vs. LP headline — alinhadas? |
| LP quality scorecard | ⏳ PENDING | Cada LP: headline, benefits, problem, CTA, mobile |
| Problem section deep-dive | ⏳ PENDING | Conecta com dor do paciente? |
| Conversion rate benchmarking | ⏳ PENDING | Current CR? vs. 3-8% benchmark? |
| Testimonials quality | ⏳ PENDING | Tom real? Bairro correto? Sem profissão? |
| CTA color/copy testing | ⏳ PENDING | Qual cor funciona? "Agende" vs. "Saiba Mais"? |
| Mobile LP UX (floating WhatsApp) | ⏳ PENDING | Visible? Usable? |
| A/B testing recommendations | ⏳ PENDING | Quais elementos testar? |
| LP optimization document | ⏳ PENDING | Top 3 LPs para quick wins |

**Deadlines:**
- [ ] Portfolio analysis: 20 de Feb
- [ ] Quality scoring: 25 de Feb
- [ ] Recommendations: 28 de Feb

---

### Pilar 10: CONTEÚDO & BLOG STRATEGY
**Status:** 🔴 NOT STARTED  
**Owner:** IA + Patrick  
**Timeline:** Semana 3  

| Task | Status | Notes |
|------|--------|-------|
| Blog audit (# posts, topics, performance) | ⏳ PENDING | Nossos posts: quais tópicos? Views/page? |
| Q&A format assessment | ⏳ PENDING | Quantos posts usam Q&A? Deveria ser mais? |
| Internal linking audit | ⏳ PENDING | Posts linkam para service pages? |
| Meta tags audit | ⏳ PENDING | HTML estático ou client-side (React Helmet)? |
| Content gap analysis | ⏳ PENDING | Google search volume vs. posts coverage |
| Long-tail keyword opportunities | ⏳ PENDING | "clareamento para festas", "implante + gengivoplastia" |
| Topical authority assessment | ⏳ PENDING | Autoridade em clareamento? Implantes? Lentes? |
| Blog SEO strategy | ⏳ PENDING | Posting frequency, keyword targets, internal linking |
| Blog pre-rendering plan | ⏳ PENDING | Meta tags para /blog/:slug |
| Content calendar (12 months) | ⏳ PENDING | Tópicos mensais, keywords, linking strategy |
| Relatório Blog & Content | ⏳ PENDING | Gaps + strategy + calendar |

**Deadlines:**
- [ ] Audit & gap analysis: 24 de Feb
- [ ] Content strategy: 28 de Feb
- [ ] Calendar ready: 03 de Mar

---

## 📋 PRÓXIMAS AÇÕES (Atualizado 13 Fev 2026)

### ✅ CONCLUÍDO HOJE (13 Fev)
- [x] Pilares 1, 5, 6 — relatórios completos gerados
- [x] Dados financeiros corrigidos em todos os docs (R$ 9k/mês)
- [x] PROJECT-STATUS.md recriado
- [x] GA4 CSV integrado no relatório do Pilar 5
- [x] MEMORY.md atualizado

---

### 🔴 AÇÕES PARA PATRICK (Manual — Google Ads Dashboard)

**URGENTE — Fazer esta semana (45 min no Google Ads):**
1. [ ] **Pausar 3 keywords de Prótese com QS 0** (5 min)
   - "especialista em prótese dentária" (EXACT) — R$ 186/conv
   - "consultório prótese dentária" (PHRASE) — R$ 99/conv
   - "Prótese Copacabana" (PHRASE) — R$ 99/conv
2. [ ] **Verificar se Urgências está limitada por budget** (5 min)
3. [ ] **Adicionar negative keywords** em todas as campanhas (15 min)
   - Lentes: "lente de contato ocular", "gelatinosa", "de grau"
   - Geral: nomes de cidades fora da ZS, "convênio", "SUS", "gratuito"
4. [ ] **Revisar Search Terms Report de Lentes** (últimos 30 dias) (15 min)

**IMPORTANTE — Fazer semana que vem:**
5. [ ] **Rodar PageSpeed Insights** real em 3 URLs:
   - https://www.dracarla.com.br
   - https://www.dracarla.com.br/implantes-dentarios
   - https://www.dracarla.com.br/protese-dentaria
6. [ ] **Testar UX no Android** — abrir site em 2-3 dispositivos Android, testar botão WhatsApp
7. [ ] **Confirmar domínio primário** — dracarla.com.br vs dracarlachristoph.com (redirect 301 configurado?)

---

### 🤖 AÇÕES PARA IA (Próxima Sessão)

**QUICK WINS TÉCNICOS (implementar no código):**
1. [ ] Corrigir og:image em ImplantesDentarios.tsx (URL absoluta)
2. [ ] Adicionar og:image em ClareamentoDental.tsx
3. [ ] Adicionar FAQPage schema em ImplantesDentarios.tsx (12 FAQs)
4. [ ] Adicionar FAQPage schema em ClareamentoDental.tsx (10 FAQs)
5. [ ] Unificar reviewCount (23 vs 127) nos schemas
6. [ ] Corrigir api/robots.js para permitir AI bots
7. [ ] Adicionar security headers no vercel.json
8. [ ] Unificar horários de funcionamento nos schemas
9. [ ] Adicionar CTA WhatsApp nos posts de blog (componente reutilizável)

**DISCOVERY — Continuar Pilares:**
10. [ ] Pilar 2 (SEO): Keyword mapping, GSC analysis, internal linking
11. [ ] Pilar 3 (AI Search): Perplexity/ChatGPT research
12. [ ] Pilar 4 (Brand Compliance): Tone audit, palavras banidas
13. [ ] Pilar 8 (Psychology): Pain/aspiration mapping por serviço

---

### 📅 TIMELINE ATUALIZADA

```
SEMANA 1 (13-19 Fev) — AGORA
├── ✅ Pilares 1, 5, 6 COMPLETOS
├── 🔴 Patrick: Quick wins no Google Ads (45 min)
├── 🔴 Patrick: PageSpeed Insights + Android test
└── 🤖 IA: Quick wins técnicos (código)

SEMANA 2 (20-26 Fev)
├── 🤖 IA: Pilares 2, 3, 4, 8 (discovery em paralelo)
├── 🤖 IA: Pilar 7 (Design audit)
├── 🔴 Patrick: Escalar budget Urgências (+20%)
└── 📊 Friday sync: Review semana 1-2

SEMANA 3 (27 Fev - 5 Mar)
├── 🤖 IA: Pilares 9, 10 (LPs + Blog strategy)
├── 🤖 IA: Consolidar todos os findings
├── 🔴 Patrick: Testar novo ad copy Lentes ("Test Drive")
└── 📊 Summary document PRONTO

SEMANA 4 (6-12 Mar) — BRAINSTORM
├── 🗓️ Reunião com Dra. Carla (1.5h)
├── Priorizar oportunidades
└── Definir sprint roadmap de execução
```

---

## 📅 TIMELINE VISUAL

```
FEB 2026
─────────────────────────────────────────────────────
Semana 1 (13-19)
└─ Pilar 1, 5, 6 (TECH, GA4, ADS)
   ├─ Mon: Setup
   ├─ Tue-Wed: Analysis
   ├─ Thu-Fri: Draft reports

Semana 2 (20-26)
└─ Pilar 2, 3, 4, 7, 8 (SEO, AI, BRAND, DESIGN, PSYCH)
   ├─ Mon-Tue: SEO + AI Research
   ├─ Wed: Brand compliance
   ├─ Wed-Thu: Design + Mobile
   └─ Thu-Fri: Psychology + Messaging

Semana 3 (27-05 MAR)
└─ Pilar 9, 10, Consolidation, BRAINSTORM
   ├─ Mon-Tue: LP Optimization
   ├─ Wed: Blog Strategy
   ├─ Thu: Meeting com Dra. Carla
   └─ Fri: Summary document READY

MAR 2026
─────────────────────────────────────────────────────
Semana 4 (06-12)
└─ BRAINSTORM & ALIGN: Prioritize, Plan roadmap

Semanas 5-12 (13-05 APR... até 31 MAY)
└─ EXECUTE: Implementação em sprints semanais

MAY-JUN
└─ MEASURE & ITERATE: Acompanhamento contínuo
```

---

## 🎯 SUCCESS METRICS (Rastreamento em Tempo Real)

| Métrica | Baseline | Target | Status | ETA |
|---------|----------|--------|--------|-----|
| Cost/Conversion (Google Ads) | R$ 61 (média) | R$ 49-52 | ❓ | Mar 31 |
| Homepage FCP | 3.1s | <2.5s | ❓ | Mar 15 |
| Blog traffic % | 50% | 60% | ❓ | Apr 30 |
| LPs conversion rate | ? | 6-8% | ❓ | Apr 15 |
| Google Ads ROAS | ? | +25% | ❓ | May 31 |

---

## 📝 OBSERVAÇÕES & NOTAS

### Dados Financeiros Corretos (Validados 13/02/2026)
- **Google Ads mensal:** ~R$ 9.000/mês (~R$ 27k/90 dias)
- **Ticket médio paciente:** R$ 800–1.000
- **Nota:** Valores do BigQuery estavam inflacionados (soma incorreta). Rankings relativos entre campanhas permanecem válidos.

### Coisas Funcionando Bem ✅
- Urgências campanha é a mais eficiente (4.5x melhor que Lentes)
- Blog drives tráfego (Jejum Intermitente: 542.65s engagement!)
- Brand guidelines muito claros (BRAND.md é referência)
- Tracking robusto (GTM + GCLID pipeline)

### Pontos de Atenção ⚠️
- Lentes campanha: 4.5x pior que Urgências — **PRIORITY FIX**
- Prótese keywords: QS 0-1 — precisa message match audit
- Blog posts: sem HTML estático pre-renderizado (client-side React Helmet only)
- Mobile performance: FCP/LCP não estão do nível ideal

### Dependências
- Acesso continuado a Lovable para fazer changes
- Dra. Carla disponibilidade para validação (semana 4 + iterações)
- Dados de BigQuery/Contentful para análises (Patrick tem acesso)

---

**Criado:** 13 de Fevereiro 2026, 15:00  
**Última atualização:** 13 de Fevereiro 2026  
**Próximo sync:** 20 de Fevereiro (Fim de Semana 1)

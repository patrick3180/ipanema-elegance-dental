# PROJECT STATUS - Dra. Carla Christoph Website Optimization

**Última Atualização:** 2026-02-13
**Projeto:** Otimização e Marketing Digital para dracarlachristoph.com
**Responsável:** Patrick + Claude Code

---

## 📋 COMO USAR ESTE ARQUIVO

**Este é o arquivo MESTRE do projeto.** Qualquer LLM/agente que começar a trabalhar DEVE ler este arquivo PRIMEIRO.

**Estrutura de Documentação:**
```
/
├── PROJECT-STATUS.md           ← VOCÊ ESTÁ AQUI (arquivo mestre)
├── PLANO-REVISAO-COMPLETA.md  ← Plano estratégico de 13 semanas
├── README.md                    ← Informações técnicas do projeto
│
├── /docs/
│   ├── /sprints/               ← Documentação de cada sprint
│   ├── /analysis/              ← Análises de dados (BigQuery, competitors)
│   ├── /guides/                ← Guias técnicos (SEO, sitemap, etc.)
│   └── /archive/               ← Documentos antigos/obsoletos
│
├── BRAND.md                    ← Diretrizes de marca (CRÍTICO - ler antes de escrever)
├── BUSINESS.md                 ← Contexto de negócio
├── CONTENT.md                  ← Regras de conteúdo e SEO
├── TECH.md                     ← Arquitetura técnica
└── TRACKING.md                 ← Sistema de tracking (GCLID, GA4, Ads)
```

---

## 🎯 ESTADO ATUAL DO PROJETO

### Sprint Atual: **FASE 0 CONCLUÍDA → Aguardando Sprint 3**

**Última Sessão:** 2026-02-13
**Status:** ✅ Análise de dados BigQuery completa, aguardando decisões do cliente

### Progresso Geral

| Fase | Status | Completo | Próximo Passo |
|------|--------|----------|---------------|
| **Sprint 0** | ✅ COMPLETO | 16/20 itens | Revisar itens #14-20 |
| **Sprint 1** | ✅ COMPLETO | 100% | - |
| **Sprint 2** | ✅ COMPLETO | 100% | - |
| **FASE 0** | ✅ COMPLETO | 100% | Validar análise BigQuery |
| **Sprint 3** | ⏳ PLANEJADO | 0% | Aguardando definição de prioridades |

---

## ✅ O QUE JÁ FOI IMPLEMENTADO

### Performance & SEO (100% completo)

- ✅ **React Query** (blog only) - FCP -16%
- ✅ **WebP/AVIF images** (68 arquivos) - LCP -50%
- ✅ **Self-hosted fonts** (Montserrat, Playfair Display)
- ✅ **AI Search bots** desbloqueados (robots.txt)
- ✅ **Schema markup completo:**
  - Organization schema
  - LocalBusiness schema
  - FAQPage schema
  - Breadcrumb schema
- ✅ **QuickAnswerBox** em 10 páginas (AI Search optimization)
- ✅ **Sitemap.xml** gerado e atualizado
- ✅ **URLs canônicas** implementadas
- ✅ **Blog pre-rendering** (static HTML)

### UI/UX & Conversão (100% completo)

- ✅ **Google 5-star rating badge** no header (4.9 ⭐, 23 reviews)
- ✅ **CTAs aprimoradas** (luxo silencioso, consultivas)
- ✅ **FAQ sections** completas (10-12 perguntas em 6 páginas)
- ✅ **Remoção de clichês** ("transformar sorriso", etc.)
- ✅ **Test Drive do Sorriso** como headline #1

### Páginas Existentes

**Service Pages (9):**
1. Clareamento Dental
2. Implantes Dentários
3. Lentes e Facetas
4. Prótese Dentária
5. Ortodontia
6. Saúde da Gengiva
7. Tratamento de Canal
8. Restaurações Estéticas
9. Clínica Geral e Prevenção

**Landing Pages (14+):**
1. Lentes de Contato Porcelana
2. Implantes Dentários
3. Clareamento
4. Emergência Odontológica
5. Especialista Prótese
6. Ortodontia
7. Dor de Dente
8. Dente Quebrado
9. Facetas Resina Direta
10. Estética do Sorriso
11. Saúde Gengival
12. Limpeza Dental
13. Profilaxia
14. Consulta Inicial

---

## 📊 ÚLTIMA ANÁLISE DE DADOS (FASE 0 - 2026-02-13)

### Dados BigQuery - Google Ads (90 dias)

**Campanhas Ativas:** 7
- Clínica Geral - Zona Sul (melhor volume)
- Urgências Odontológicas (melhor ROI: R$ 23.73/conversão) ⭐
- Prótese Dental
- Clareamento Dental
- Implantes Dentários
- Lentes de Contato (pior ROI: R$ 107.17/conversão) ⚠️

**Total Gasto:** R$ 1,041,825.60 (90 dias)

**Keywords Top Performers:**
- emergency/urgência keywords (R$ 7-30/conversão)
- local geo keywords (R$ 32-37/conversão)
- restauração dental (R$ 24.79/conversão)

**Keywords Problem:**
- "especialista em prótese dentária" (R$ 186/conversão - PAUSAR)
- "clareamento dental ipanema" (CPC R$ 66.42 - ABSURDO)
- Quality Score 0-1 em várias keywords de prótese

### Dados GA4 (90 dias)

**Top 5 Páginas:**
1. Homepage - 257 views, 39.66s engajamento
2. Blog: Cárie Oculta - 45 views
3. /servicos - 36 views
4. Lentes/Facetas - 34 views
5. Blog: Jejum Intermitente - 25 views, **542s engajamento** ⭐

**WhatsApp Conversions:** 38 eventos trackados (90 dias)

**Insights:**
- Blog posts estão funcionando (5 dos top 10 são blog)
- Mobile domina tráfego
- Engagement time muito bom em posts técnicos/health

### Análise Competitiva (5 competitors)

**Forças Únicas da Dra. Carla:**
- ✅ Test Drive do Sorriso (nenhum competitor tem)
- ✅ iTero Element 5D scanner (específico)
- ✅ 1 hora mínima de consulta (quantificado)
- ✅ 20+ anos em Ipanema (longest tenure)
- ✅ Background militar (trust signal único)

**Fraquezas vs. Competitors:**
- ❌ Reviews: Tem 23, competitors têm 15-50+
- ❌ Testimonials: Poucos vs. 6-10+ detalhados dos competitors
- ❌ International training claims: 0 vs. competitors destacam
- ❌ Blog volume: Baixo vs. competitors mais ativos

**Arquivo completo:** `docs/sprints/SPRINT-0-COMPETITIVE-ANALYSIS.md`

---

## 🎯 OPORTUNIDADES IDENTIFICADAS (Aguardando Decisão)

### Top 6 Oportunidades do BigQuery

| # | Oportunidade | Esforço | ROI | Status |
|---|--------------|---------|-----|--------|
| 1 | Realocação Budget Google Ads | 30min | Médio | ⏸️ Depois de #6 |
| 2 | **Keywords: Pausar ruins** | **20min** | **Altíssimo** | ✅ **FAZER JÁ** |
| 3 | Quality Score (Prótese) | 4-5h | Alto | ⏸️ Não prioritário |
| 4 | Blog Content (escalar) | 1-2h/sem | Médio-Alto | 🤔 Se tem tempo |
| 5 | **Social Proof (reviews)** | **30min** | **Alto** | ✅ **FAZER JÁ** |
| 6 | **Landing Pages Optimization** | **10-12h** | **Altíssimo** | ✅ **PRIORIDADE #1** |

**Nota:** Campanha de Urgências será escalada apenas em Março (decisão do cliente).

**Detalhes completos:** `docs/analysis/FASE-0-OPORTUNIDADES-DETALHADAS.md`

---

## 📁 DOCUMENTAÇÃO IMPORTANTE

### DEVE LER ANTES DE COMEÇAR

1. **PROJECT-STATUS.md** (este arquivo) - Status geral
2. **PLANO-REVISAO-COMPLETA.md** - Estratégia de 13 semanas, 6 sprints
3. **BRAND.md** - ⚠️ CRÍTICO: palavras banidas, tom de voz, posicionamento
4. **BUSINESS.md** - Contexto do negócio, target, diferenciais
5. **CONTENT.md** - Regras de conteúdo, SEO, compliance CRO/CFO

### Documentação Técnica

- **TECH.md** - Arquitetura (React, Vite, Tailwind, Contentful)
- **TRACKING.md** - GCLID tracking, GA4, Google Ads setup
- **README.md** - Setup do projeto

### Sprints & Análises

- **docs/sprints/SPRINT-2-STATUS.md** - Último sprint concluído
- **docs/sprints/SPRINT-3-PLAN.md** - Próximo sprint (planejado)
- **docs/analysis/FASE-0-DATA-ANALYSIS-EXECUTIVE-SUMMARY.md** - Análise BigQuery
- **docs/analysis/FASE-0-OPORTUNIDADES-DETALHADAS.md** - 6 oportunidades detalhadas

### Guias Técnicos

- **docs/guides/BLOG-SEO-SETUP.md** - Como otimizar blog posts
- **docs/guides/SITEMAP_SUBMISSION_GUIDE.md** - Submissão de sitemap
- **docs/guides/SOFT_404_RESOLUTION_GUIDE.md** - Resolver erros 404

---

## 🚫 ARMADILHAS COMUNS (Leia Isso!)

### ERROS QUE JÁ ACONTECERAM

1. **❌ Sugerir "criar landing pages"**
   - **ERRADO:** Landing pages JÁ EXISTEM (14+)
   - **CORRETO:** "Otimizar landing pages existentes"

2. **❌ Sugerir "implementar badge de reviews"**
   - **ERRADO:** Badge JÁ ESTÁ no Header.tsx
   - **CORRETO:** "Atualizar review count se desatualizado"

3. **❌ Sugerir "implementar Schema markup"**
   - **ERRADO:** Schemas JÁ ESTÃO completos (Organization, LocalBusiness, FAQ)
   - **CORRETO:** "Adicionar schema X específico que falta"

4. **❌ Ignorar BRAND.md**
   - **ERRADO:** Usar palavras banidas ("transformar", "excelência", "referência")
   - **CORRETO:** Ler BRAND.md Section 5 antes de escrever QUALQUER conteúdo

5. **❌ Não verificar o que já existe**
   - **ERRADO:** Fazer recomendações sem ler sprints anteriores
   - **CORRETO:** LER este arquivo + Sprints 0-2 ANTES de qualquer sugestão

### REGRAS OBRIGATÓRIAS

✅ **SEMPRE ler PROJECT-STATUS.md primeiro**
✅ **SEMPRE verificar o que JÁ foi implementado** (seção "O QUE JÁ FOI IMPLEMENTADO")
✅ **SEMPRE ler BRAND.md** antes de escrever conteúdo
✅ **SEMPRE usar Glob/Grep** para verificar se componente/página já existe
✅ **NUNCA** fazer recomendações genéricas sem dados

---

## 🔄 WORKFLOW RECOMENDADO

### Para Qualquer Nova Tarefa:

**FASE 1: CONTEXTO (15-30 min)**
1. ✅ Ler PROJECT-STATUS.md (este arquivo)
2. ✅ Ler seção relevante do PLANO-REVISAO-COMPLETA.md
3. ✅ Ler docs/sprints/ para ver o que JÁ foi feito
4. ✅ Ler BRAND.md se for criar/editar conteúdo

**FASE 2: INVESTIGAÇÃO (10-20 min)**
1. ✅ Usar Glob para ver quais páginas/componentes JÁ EXISTEM
2. ✅ Usar Grep para verificar implementações existentes
3. ✅ Ler código dos componentes relevantes

**FASE 3: PROPOSTA**
1. ✅ Apresentar o que JÁ existe vs. o que falta
2. ✅ Explicar esforço, impacto, ROI de cada ação
3. ✅ Perguntar ao cliente qual prioridade

**FASE 4: EXECUÇÃO**
1. ✅ Implementar conforme aprovado
2. ✅ Atualizar PROJECT-STATUS.md
3. ✅ Documentar no sprint atual

---

## 📞 DECISÕES PENDENTES (Aguardando Patrick)

### Sprint 3 - Próximas Ações

**Cliente precisa decidir:**

1. **Keywords Google Ads (#2):**
   - ✅ Posso pausar 3 keywords ruins agora? (20 min)
   - ✅ Adicionar negative keywords? (20 min)

2. **Landing Pages Optimization (#6):**
   - ✅ Começar com Lentes + Implantes? (4-6h)
   - ✅ Fazer todas 6 páginas em Sprint 3? (10-12h)

3. **Reviews (#5):**
   - ✅ Verificar badge no código? (30 min)
   - ✅ Iniciar campanha de coleta? (2-3h setup)

4. **Blog Content (#4):**
   - ✅ Claude escreve 1 post/semana, Patrick revisa? (1-2h/semana)
   - ✅ Ou deixar para depois?

5. **Priorização:**
   - ✅ Fazer #2 + #5 + #6 agora? (quick wins + alto impacto)
   - ✅ Ou escolher outra combinação?

6. **Urgências Odontológicas:**
   - ✅ CONFIRMADO: Deixar para Março (não mexer em budget agora)

---

## 📈 MÉTRICAS DE SUCESSO

### Targets do Projeto

**Revenue:**
- **Atual:** ~R$ 25k/mês
- **Target:** R$ 50-75k/mês (Sprint 6)
- **Incremental:** +R$ 150-300k/mês conforme Top 20 implementado

**Performance:**
- **FCP:** 3.1s → <1.8s ✅ (já atingido: -16%)
- **LCP:** 3.6s → <2.5s ✅ (já atingido: -50%)
- **CLS:** Target <0.1 (a medir)

**Conversões:**
- **Atual:** ~1,390/mês (estimativa de 530 em 14 dias)
- **Target:** +20-30% (1,670-1,807/mês)

**SEO:**
- **AI Search:** 0% → 100% ✅ (já atingido)
- **Reviews:** 23 → 50+ (target Sprint 4-5)
- **Blog posts:** 8-10 → 30+ (target Sprint 5-6)

---

## 🔧 SETUP TÉCNICO

### Tecnologias

- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS
- **CMS:** Contentful
- **Analytics:** Google Analytics 4
- **Ads:** Google Ads (AW-16894364517)
- **Tracking:** GTM (GTM-WZRDNBKQ) + n8n + Supabase
- **Deployment:** Lovable (auto-deploy on push)

### Dados

- **BigQuery:** make-para-carla (datasets: analytics_477782713, clinica_dra_carla_ads)
- **Supabase:** oqszkriirsodegxpfazz (GCLID tracking, offline conversions)

### Acesso

- **Service Account:** agente-claude-code-site-carla@make-para-carla.iam.gserviceaccount.com
- **Credentials:** bigquery-credentials.json (no repositório)

---

## 📝 PRÓXIMA SESSÃO - O QUE FAZER

### Se Você é um Novo LLM/Agente:

1. ✅ **LER este arquivo TODO** (você está aqui)
2. ✅ **Perguntar ao Patrick:** "Qual a prioridade para hoje?"
3. ✅ **Verificar decisões pendentes** (seção acima)
4. ✅ **Seguir workflow recomendado** (seção "WORKFLOW RECOMENDADO")

### Se Patrick Disser "Continue de Onde Parou":

1. ✅ Ler seção "DECISÕES PENDENTES"
2. ✅ Ler última análise: `docs/analysis/FASE-0-OPORTUNIDADES-DETALHADAS.md`
3. ✅ Perguntar quais das 6 oportunidades ele quer implementar

### Se Patrick Disser "Vamos Fazer Sprint 3":

1. ✅ Ler `docs/sprints/SPRINT-3-PLAN.md`
2. ✅ Confirmar prioridades com Patrick
3. ✅ Implementar conforme planejado
4. ✅ Atualizar este arquivo ao concluir

---

## 🗂️ CHANGELOG DESTE ARQUIVO

**2026-02-13 - 13:30:**
- ✅ Arquivo criado
- ✅ Estrutura de documentação organizada
- ✅ Movidos arquivos para docs/{sprints,analysis,guides}
- ✅ Consolidado status de Sprints 0-2
- ✅ Documentado FASE 0 (BigQuery analysis)
- ✅ Listado armadilhas comuns e erros já cometidos
- ✅ Definido workflow recomendado

---

**Última atualização:** 2026-02-13 13:30
**Próxima atualização:** Quando Sprint 3 iniciar ou quando houver mudanças significativas no status

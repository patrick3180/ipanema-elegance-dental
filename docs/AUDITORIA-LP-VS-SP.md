# Auditoria LP vs SP — Plano de Melhoria das Landing Pages

## Contexto

As Landing Pages (LPs) são o **carro-chefe** do tráfego pago. Nos últimos 90 dias, as 7 LPs principais receberam **~1.200 cliques pagos totalizando ~R$11.000 em investimento** (consolidado `.com` + `.com.br`). Enquanto os Service Pages (SPs) têm entre 25KB e 90KB de conteúdo rico, as LPs têm apenas 9-14KB — uma diferença de **3-7x** na profundidade de conteúdo.

> [!IMPORTANT]
> O objetivo NÃO é transformar LPs em SPs. É elevar as LPs para que elas combinem a **profundidade educacional** dos SPs com a **estrutura de conversão** que já funciona.

---

## Dados de Performance — 90 Dias (BigQuery)

### Ranking por Investimento + Cliques

| # | Landing Page | Cliques | Custo (R$) | CPC | CTR | Campanha |
|---|---|---|---|---|---|---|
| 1 | `/lp/consulta-inicial` | **398** | **R$4.591** | R$11,54 | 4,70% | Clínica Geral |
| 2 | `/lp/especialista-protese-ipanema` | **260** | **R$2.174** | R$8,39 | 4,59% | Prótese Dental |
| 3 | `/lp/clareamento-dental` | **139** | **R$1.117** | R$8,88 | 4,31% | Clareamento |
| 4 | `/lp/implantes-dentarios-ipanema` | **108** | **R$1.243** | R$10,10 | 3,58% | Implantes |
| 5 | `/lp/emergencia-odontologica-ipanema` | **97** | **R$790** | R$8,88 | 3,17% | Urgências |
| 6 | `/lp/facetas-resina-ipanema` | **79** | **R$792** | R$9,63 | 4,55% | Lentes de Contato |
| 7 | `/lp/limpeza-dental-ipanema` | **70** | **R$667** | R$9,53 | 6,45% | Clínica Geral |
| 8 | `/lp/dente-quebrado-urgencia-ipanema` | **57** | **R$601** | R$11,31 | 5,77% | Urgências |
| 9 | `/lp/saude-gengival-ipanema` | **34** | **R$95** | R$2,93 | 4,26% | Clínica Geral |
| 10 | `/lp/dor-de-dente-urgencia-ipanema` | **31** | **R$105** | R$3,53 | 4,88% | Urgências |

> *Observação: Cliques consolidados `.com` + `.com.br` + `www.`*

### GA4 — Engajamento (Scroll Rate)

| Página | Page Views | Scroll Rate |
|---|---|---|
| Consulta Inicial | 10 | 60% |
| Especialista Prótese | 17 | **52,9%** |
| Facetas Resina | 10 | **50%** |
| Limpeza Dental | 19 | 21,1% ⚠️ |
| Implantes (SP) | 21 | **66,7%** |
| Tratamento Canal (SP) | 14 | **64,3%** |

> [!WARNING]
> A LP de **Limpeza Dental** tem scroll rate de apenas **21%** — os visitantes saem antes de ver o conteúdo. As SPs de Implantes e Tratamento de Canal mantêm 64-67% de scroll.

---

## Comparativo LP vs SP — Gap por Arquivo

| Par LP → SP | LP (KB) | SP (KB) | Ratio | Gap Crítico |
|---|---|---|---|---|
| Consulta Inicial → ClinicaGeralPrevencao | 6,3KB* | **36,4KB** | 1:5,8 | Falta de conteúdo educacional |
| Especialista Prótese → ProteseDentaria | 13,8KB | **50,8KB** | 1:3,7 | Conteúdo bom, falta tipos de prótese |
| Implantes → ImplantesDentarios | 13,2KB | **53,6KB** | 1:4,1 | Falta comparativo tipos de implante |
| Facetas Resina → LentesEFacetas | 9,7KB | **89,8KB** | 1:9,3 | Maior gap — LP muito enxuta |
| Limpeza Dental → ClinicaGeralPrevencao | 11,1KB | **36,4KB** | 1:3,3 | Falta contexto preventivo |
| Emergência → (sem SP dedicado) | 12,8KB | — | — | LP é o conteúdo principal |
| Clareamento → ClareamentoDental | — | **52,6KB** | — | LP sem arquivo próprio (usa template) |

> *A LP "Consulta Inicial" usa o `LandingPageTemplate.tsx` genérico de 6,3KB*

---

## Análise Visual — Gaps Identificados

### O que FUNCIONA (manter)
- ✅ Estrutura clara: Hero → Benefícios → Processo → FAQ → Depoimentos → CTA final
- ✅ CTAs bem posicionados com texto específico por serviço
- ✅ Trust badges (CRO-RJ, Atendimento Particular, Ipanema)
- ✅ Bullet points de benefícios no hero
- ✅ Layout mobile responsivo
- ✅ WhatsApp 24h como diferencial

### O que FALTA (gaps vs SPs)

| Gap | Impacto | Presente na SP? | LPs Afetadas |
|---|---|---|---|
| **Imagens do consultório / equipamento** | Alto — construção de confiança | ✅ SPs têm sections visuais ricas | Todas |
| **Comparativo antes/depois** | Alto — prova social visual | ✅ LentesEFacetas tem galeria | Facetas, Clareamento, Implantes |
| **Seção "Quem é a Dra. Carla"** | Alto — autoridade e conexão | ✅ SPs têm bio extensa + foto | Todas (parcial) |
| **Tipos/modalidades do tratamento** | Médio — profundidade | ✅ SPs têm 3-6 tipos detalhados | Implantes, Prótese, Facetas |
| **Razões para agir agora (urgência)** | Médio — conversão | ❌ | Todas |
| **Preços/investimento transparente** | Médio — reduz ansiedade | ❌ SPs também não têm | Todas |
| **Schema markup LocalBusiness** | Baixo — SEO | ✅ SPs têm | Todas |
| **StatsBar (20+ anos, 4000+ pacientes)** | Médio — credibilidade | ✅ SPs têm | Todas (verificar) |
| **Micro-animações de entrada** | Baixo — premium feel | ✅ SPs têm | Todas |

---

## Plano de Melhoria — 4 Fases

### Fase 1: Quick Wins de Alto Impacto (Prioridade 🔴)
**LPs:** Consulta Inicial, Especialista Prótese, Implantes (top 3 spend)

Para cada LP:
1. **Adicionar seção "Conheça a Dra. Carla"** — foto + mini-bio + credenciais (reutilizar da SP)
2. **Adicionar StatsBar** se ainda não presente (20+ anos, 4000+ pacientes, CRO-RJ, 4.9★ Google)
3. **Headline A/B copy** — testar variações com foco em dor vs aspiração
4. **Adicionar microinterações CSS** — fade-in nas seções ao scroll (já implementado nas SPs)

### Fase 2: Conteúdo Educacional (Prioridade 🟡)
**LPs:** Facetas Resina, Clareamento, Limpeza Dental

Para cada LP:
1. **Seção "Tipos de tratamento"** resumida (2-3 cards vs 4-6 da SP)
2. **Mini-galeria visual** — 2-3 imagens do consultório/equipamento
3. **Expandir FAQ** — adicionar perguntas sobre preço, dor, tempo, e "vale a pena?"
4. **Seção "Por que agir agora?"** — anchoring temporal com linguagem de urgência suave

### Fase 3: Urgência e Conversão (Prioridade 🟢)
**LPs:** Emergência, Dor de Dente, Dente Quebrado

1. **Reforçar urgência** — "Encaixe em até 2h", "Hoje mesmo"
2. **Adicionar social proof de atendimento rápido** — "Último encaixe: há 3 horas"
3. **Simplificar processo** — reduzir steps para máximo 3
4. **CTA duplo** — WhatsApp + Telefone direto

### Fase 4: Polish e Otimização (Prioridade 🔵)
**Todas as LPs:**

1. **Schema markup** — MedicalBusiness + Service + FAQ schema
2. **exit-intent popup** — "Antes de sair: agendamento leva 30 segundos"
3. **Speed optimization** — lazy-load images, preconnect
4. **Viewport-height hero** — garantir que hero + CTA cabem na primeira tela sem scroll

---

## Ordem de Execução Proposta

A execução será em pares (LP vs SP correspondente):

| Ordem | LP | Motivo |
|---|---|---|
| 1º | `/lp/consulta-inicial` | Maior spend (R$4.591), LP mais enxuta (6.3KB) |
| 2º | `/lp/especialista-protese-ipanema` | 2° maior spend, alto potencial |
| 3º | `/lp/implantes-dentarios-ipanema` | 3° maior spend, CPC alto (R$10,10) |
| 4º | `/lp/facetas-resina-ipanema` | Maior gap de conteúdo (1:9.3) |
| 5º | `/lp/clareamento-dental` | Bom tráfego, oportunidade estética |
| 6º | `/lp/limpeza-dental-ipanema` | Scroll rate mais baixo (21%) |
| 7º | `/lp/emergencia-odontologica-ipanema` + dor/dente | Urgência — abordagem diferente |

> [!IMPORTANT]
> **Importante:** A LP de Facetas Resina pode já ter recebido melhorias parciais na sessão anterior (conversa `bc98ce99`). Precisamos verificar o estado atual antes de trabalhar nela.

---

## Métricas de Sucesso

| Métrica | Baseline Atual | Meta Pós-Melhoria |
|---|---|---|
| Scroll Rate médio | ~35% | >55% |
| Tempo na página | — | +30% |
| CPC (via QS improvement) | R$9,50 médio | <R$8,00 |
| Tamanho médio LP | ~11KB | ~20-25KB |

---

## User Review Required

> [!IMPORTANT]
> 1. **Concordância com a ordem de priorização?** O critério foi spend descrescente.
> 2. **A LP de Facetas Resina já foi atualizada?** A conversa anterior (`bc98ce99`) parece ter iniciado trabalho nela.
> 3. **Quer que eu comece executando a Fase 1 na LP de Consulta Inicial** (a mais acessada e a mais enxuta)?
> 4. **Imagens:** Tenho autonomia para criar/gerar imagens do consultório ou precisa fornecer fotos reais?

---

## Verification Plan

### Para cada LP melhorada:
1. `npx tsc --noEmit` — zero errors
2. Browser visual check (screenshots comparativas antes/depois)
3. Lighthouse mobile score
4. Verificar schema com Rich Results Test
5. Monitorar BigQuery nas 2 semanas seguintes para medir impacto em scroll rate e CPC

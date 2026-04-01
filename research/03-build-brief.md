# PHASE 4: Build Brief — Dra. Carla Christoph Website Redesign

> Documento de direção para reconstrução do site
> Data: 01/04/2026
> Revisão: v2.0 — incorporando feedback do cliente + análise das 16 Landing Pages
> Status: ✅ APROVADO PELO CLIENTE (01/04/2026)

---

## 🎯 Objetivo

Reconstruir o site institucional da Dra. Carla Christoph mantendo sua posição de liderança técnica e visual, fechando os gaps viáveis identificados na análise competitiva, e maximizando a conversão das 16 landing pages que recebem todo o tráfego pago (Google Ads).

---

## 1. Positioning Statement

> **"A clínica da Dra. Carla Christoph é a referência em odontologia premium em Ipanema, combinando 20+ anos de experiência clínica com tecnologia de ponta (iTero Element 5D) e atendimento verdadeiramente humanizado — o único consultório da região com atendimento bilíngue e biblioteca de conteúdo com 44+ artigos de educação do paciente."**

### Princípios Inegociáveis (definidos pelo cliente)
- **Atendimento 100% particular** — todas as consultas são cobradas. Não existe "avaliação cortesia" ou "consulta sem compromisso". Isso não é um gap, é posicionamento premium deliberado.
- **Sem fotos de bocas reais** — Decisão consciente por respeito à privacidade dos pacientes. Muitos pacientes não gostam de ver (ou ter) fotos das suas bocas. O site usa apenas ilustrações e fotos profissionais.
- **Sem programa preventivo formal** — A prevenção faz parte do atendimento, mas não será empacotada como "programa" com tiers. Diferente da concorrência (Vilma Rafael).
- **Referência estilística: Mariana Wolf** — Das concorrentes analisadas, a mais próxima em estilo e abordagem pessoal.

---

## 2. Brand Identity (PRESERVE)

### Cores — Manter Intactas
| Token | Hex | Motivo |
|-------|-----|--------|
| `dental-purple` | `#381F47` | **Paleta ÚNICA no mercado**. Nenhum concorrente usa roxo. Todos usam azul ou verde. |
| `dental-gold` | `#B3955F` | Transmite premium, sofisticação. Combina perfeitamente com o roxo. |
| `dental-beige` | `hsl(39, 25%, 85%)` | Background quente e acolhedor. Marca a diferença do Branco genérico. |

### Tipografia — Manter Intacta
- **Playfair Display** (headings): Serifada clássica, elegância literária
- **Montserrat** (body): Sans-serif moderna, legibilidade perfeita

### Tom de Voz — Evolução Sutil
- ✅ Manter: Humanizada, acolhedora, técnica-acessível
- 🆕 Adicionar: Mais dados quantificados nos stats (X+ tratamentos, etc.)
- 🆕 Especificar: "Scanner intraoral" → "**Scanner Intraoral iTero Element 5D**" sempre que mencionado
- ❌ NÃO usar: "consulta sem compromisso", "avaliação cortesia", "avaliação gratuita"

---

## 3. Decisões Estratégicas (Feedback do Cliente)

### ✅ FAZER — Gap a Fechar

| Iniciativa | Ação | Canal |
|-----------|------|-------|
| **Volume de Reviews Google** | Fluxo automático pós-consulta: ao enviar nota fiscal/recibo via WhatsApp, incluir link para avaliação no Google | Web app de gestão do consultório |
| **Destaque Tecnológico** | Trocar "scanner intraoral" por "**iTero Element 5D**" em todas as menções (site + LPs) | Ajuste fino de copy |

### ❌ NÃO FAZER — Deliberadamente Descartado

| Sugestão Original | Motivo da Rejeição |
|-------------------|-------------------|
| Galeria de Casos Clínicos (antes/depois) | Respeito à privacidade. Muitos pacientes não querem fotos de suas bocas. Decisão consciente. |
| Programa Preventivo (tipo "Cuidar") | Não é objetivo do consultório formalizar tiers de prevenção. |
| "Consulta sem compromisso" / "Avaliação cortesia" | Posicionamento premium. Todas as consultas são cobradas. |

---

## 4. Inventário de Landing Pages (16 LPs — principal canal de conversão)

> **DESCOBERTA CRÍTICA:** O maior fluxo de tráfego do consultório vem das LPs via Google Ads, não do site institucional. Qualquer estratégia de conversão deve priorizar essas páginas.

### Mapeamento Completo

| # | LP | Config File | Campaign | Keyword Focus |
|---|-------|-----------|----------|---------------|
| 1 | Clareamento Dental | `clareamentoConfig.ts` | clareamento_dental_ipanema | clareamento dental ipanema |
| 2 | Lentes de Porcelana (Acolhedor) | `lentesPorcelanaAcolhedorConfig.ts` | Pesquisa - Lentes de Contato - Zona Sul | lentes de contato dental |
| 3 | Lentes de Porcelana (Profissional) | `lentesPorcelanaProfissionalConfig.ts` | lentes-porcelana-ipanema | lentes de porcelana dental |
| 4 | Facetas de Resina | `facetasResinaDiretaConfig.ts` | Pesquisa - Lentes de Contato - Zona Sul | facetas de resina |
| 5 | Implantes Dentários | `implantesDentariosConfig.ts` | Pesquisa - Implantes Dentários - Zona Sul | implantes dentarios |
| 6 | Especialista em Prótese | `especialistaProteseConfig.ts` | especialista-protese-ipanema | especialista em protese dentaria |
| 7 | Emergência Odontológica | `emergenciaOdontologicaConfig.ts` | emergencia-odontologica-ipanema | emergencia odontologica ipanema |
| 8 | Dor de Dente | `dorDeDenteConfig.ts` | dor-de-dente-ipanema | dor de dente ipanema |
| 9 | Dente Quebrado | `denteQuebradoConfig.ts` | dente-quebrado-ipanema | dente quebrado |
| 10 | Consulta Inicial | `consultaInicialConfig.ts` | consulta-inicial | primeira consulta dentista |
| 11 | Limpeza Dental | `limpezaDentalConfig.ts` | limpeza-dental | limpeza dental ipanema |
| 12 | Profilaxia | `profilaxiaConfig.ts` | profilaxia | profilaxia dental |
| 13 | Ortodontia | `ortodontiaConfig.ts` | ortodontia | ortodontia ipanema |
| 14 | Estética do Sorriso | `esteticaSorrisoGenericaConfig.ts` | estetica-sorriso | estetica dental ipanema |
| 15 | Saúde Gengival | `saudeGengivalConfig.ts` | saude-gengival | saude gengival |
| 16 | LP Lentes Porcelana (Legacy) | `LPLentesPorcelana.tsx` | — | — |

### Arquitetura Técnica das LPs (EXCELENTE — manter)

A infraestrutura de LPs já é de **nível enterprise**:

- ✅ **Template configurável** (`LandingPageTemplate.tsx`) — DRY, um componente para 16 LPs
- ✅ **Config-driven** (`LandingPageConfig.ts`) — hero, benefits, problem, guide, socialProof, FAQ, CTA, SEO, tracking
- ✅ **Message Match** para Google Ads Quality Score
- ✅ **WhatsApp com mensagem pré-formatada** por serviço
- ✅ **Scroll depth tracking** (25/50/75/100%) via dataLayer
- ✅ **GTM + Google Ads tags** em todas
- ✅ **`noindex, nofollow`** — correto para tráfego pago exclusivo
- ✅ **FloatingWhatsApp** mobile
- ✅ **FAQ com Schema.org** potencial

### Diagnóstico de Qualidade das LPs

#### Pontos Fortes
1. **Copy empática e sofisticada** — Problem sections descrevem dores reais, não genéricas
2. **Test Drive do Sorriso** — Diferencial exclusivo mencionado em Lentes e Facetas
3. **Depoimentos contextualizados** — Com nome, bairro e história específica
4. **Transparência** — FAQ aborda preço de forma elegante ("particular, emitimos recibo para reembolso")
5. **CRO sólido** — Urgência sutil, stats bar, múltiplos CTAs, WhatsApp flutuante

#### Oportunidades de Melhoria Identificadas
1. **iTero Element 5D** — Nenhuma LP menciona o scanner por nome. Todas dizem "scanner digital" ou "escaneamento digital". Ajuste simples em todas as configs.
2. **Stats repetitivos** — Todas usam exatamente os mesmos 4 stats ("20+ anos", "4.000+ pacientes", "24h WhatsApp", + 1 variável). Diversificar por serviço.
3. **Imagem hero única** — Quase todas usam `dra-carla-jaleco-bracos-cruzados.webp`. Idealmente, cada LP teria uma foto contextual ou ângulo diferente.
4. **DoctorBio section ausente** — Presente em algumas LPs otimizadas recentemente, mas não no template padrão. Adicionar mini-bio em todas.
5. **StatsBar como componente no template** — Já existe como config, mas pode ser renderizado como barra visual premium.
6. **Schema.org FAQPage** — As LPs têm FAQ excelente, mas talvez sem o Schema markup. Adicionar (mesmo com noindex, melhora Quality Score).

---

## 5. Arquitetura de Páginas do Site Institucional

### Páginas Essenciais (14 pages — manter)
1. **Homepage** — Hero com foto, proof points, serviços, depoimentos, blog preview
2. **Sobre a Dra. Carla** — Bio, formação, filosofia, equipe
3. **Implantes Dentários** — Serviço page com FAQ
4. **Prótese Dentária** — Cerâmicas premium (E-max, Zirconia)
5. **Lentes de Contato e Facetas** — Tipos, FAQ, Test Drive
6. **Clareamento Dental** — Tipos, resultado esperado, FAQ
7. **Clinica Geral e Prevenção** — Check-up, profilaxia
8. **Ortodontia** — Invisalign e convencional
9. **Saúde da Gengiva** — Periodontia
10. **Tratamento de Canal** — Endodontia moderna
11. **Restaurações Estéticas** — Resina composta, cerâmica
12. **Emergências Dentárias** — Atendimento de urgência
13. **Blog** — 44+ artigos (Contentful CMS)
14. **Contato** — Mapa, formulário, horários

### Página Nova Recomendada (1 página)
15. **Nossa Tecnologia** — **iTero Element 5D**, sistemas digitais, equipamentos nomeados com foto
    > *Justificativa: O Rothier ganha diferenciação por nomear tecnologias (CAD-CAM/CEREC, Laser LiteTouch™, microscopia). Uma página dedicada posiciona a Dra. Carla no mesmo nível sem necessidade de investir em mais equipamentos — apenas comunicar o que já tem.*

### ~~Páginas Descartadas~~
- ~~Casos Clínicos~~ — descartado por decisão do cliente
- ~~Programa Cuidar~~ — descartado por decisão do cliente

### Landing Pages (16 existentes — manter e otimizar)
- Ver seção 4 acima para inventário completo

### Versão em Inglês (DIFERENCIAL EXCLUSIVO)
- Manter e expandir tradução de TODAS as páginas
- Keywords: "english speaking dentist ipanema", "dentist near copacabana"

---

## 6. Homepage Blueprint

### Estrutura Recomendada (de topo ao rodapé):

1. **Navbar** — Logo | Sobre | Tratamentos (dropdown) | Blog | Depoimentos | Contato | 🇺🇸 EN | CTA WhatsApp
2. **Hero Section**
   - Badge: "ESPECIALISTA EM PRÓTESE E IMPLANTODONTIA"
   - H1: "Dentista em Ipanema Especializada em Reabilitação Oral e Estética Natural"
   - Sub: "Para quem busca tratamento odontológico sem pressa, sem dor desnecessária e com resultado que parece natural"
   - Foto: Dra. Carla (formato profissional, AVIF)
   - Stats bar: "20+ ANOS" | "4.000+ TRATAMENTOS" | "4.9★ GOOGLE" | "CRO-RJ 27.509"
   - CTAs: "Agendar consulta (WhatsApp 24h)" + "Conheça os tratamentos"
3. **Serviços (grid)** — Cards com ícone + título + 1 frase + link
4. **Por que a Dra. Carla?** — 3-4 diferenciais com ícone + título + parágrafo
5. **Tecnologia** (destaque) — iTero Element 5D + 1-2 equipamentos com foto + nome
6. **Depoimentos** — Carousel com estrelas + nome + bairro
7. **Blog Preview** — 3 últimos artigos com thumbnail + título + data
8. **CTA Final** — "Comece sua transformação — fale conosco pelo WhatsApp"
9. **Footer** — Info, mapa, horários, redes sociais

---

## 7. Technical Requirements

### Manter:
- React SPA (Vite)
- Tailwind CSS + shadcn/ui
- Contentful CMS (blog)
- Self-hosted fonts (Playfair Display, Montserrat)
- AVIF images com responsive srcsets
- Critical CSS inline
- Service Worker (PWA)
- GTM lazy-loaded
- LP template configurável via `LandingPageConfig`

### Melhorar:
- Pre-rendering SSR/SSG para melhor SEO crawling (site institucional)
- Schema.org LocalBusiness em TODAS as páginas
- Schema.org MedicalOrganization com médicos e serviços
- Schema.org FAQPage em todas as LPs e páginas de serviço
- Open Graph completo em cada página
- Canonical URLs explícitas
- Breadcrumb navigation
- Sitemap atualizado automaticamente

### Ajuste Imediato (pré-build):
- Trocar "scanner intraoral" / "scanner digital" → "**iTero Element 5D**" em TODAS as 16 configs de LP e páginas de serviço

---

## 8. CRO (Conversion Rate Optimization)

### CTAs por página:
| Página | CTA Primário | CTA Secundário |
|--------|-------------|---------------|
| Home | "Agendar consulta (WhatsApp)" | "Ver tratamentos" |
| Serviço | "Conversar sobre [serviço]" | "Ver outros tratamentos" |
| Blog | "Agendar consulta" | — |
| Contato | "WhatsApp" | Formulário |
| LP (Ads) | WhatsApp com msg contextual | — |

### Elementos de Conversão:
- ✅ WhatsApp floating sempre visível
- ✅ Mensagem pré-formatada por contexto
- ✅ Barra de stats no hero (prova social)
- ✅ Depoimentos com nome real e bairro
- ✅ FAQ em todas as LPs (já existe)
- 🆕 DoctorBio section em LPs (mini autoridade)
- ❌ ~~"Consulta sem compromisso"~~ — REMOVIDA. Posicionamento premium.
- ❌ ~~Exit-intent popup~~ — Não combina com a marca premium/acolhedora

---

## 9. Content Strategy

### Blog (manter ritmo):
- 1+ post/semana (já faz)
- Adicionar Schema.org Article
- Adicionar tabela de conteúdos
- Otimizar para featured snippets

### Novos Conteúdos Sugeridos:
- "Guia Completo: Como Escolher um Dentista em Ipanema" (compra keywords)
- "O que esperar da primeira consulta" (reduz ansiedade)
- "Quanto custa um implante dentário em 2026?" (keyword de alta busca)
- "Emergency Dental Care in Ipanema — English Guide" (diferencial exclusivo)

### Fluxo de Reviews (novo — integrado ao web app):
1. Paciente finaliza consulta
2. Web app (MyTasks) envia nota fiscal / recibo via WhatsApp
3. Junto com o recibo, enviar mensagem com link Google Reviews
4. Mensagem gentil, tipo: "Obrigada pela confiança! Se puder, sua avaliação no Google ajuda muito outros pacientes que buscam um dentista de confiança. [link]"

> *Nota: O fluxo será implementado no web app padrão de gestão do consultório, não no MyTasks.*

---

## 10. KPIs de Sucesso

| Métrica | Atual | Meta 6 meses | Meta 12 meses |
|---------|-------|-------------|--------------|
| Google Reviews | 23 | 60+ | 100+ |
| LP Conversion Rate | baseline | +15% | +30% |
| Organic Traffic | baseline | +30% | +70% |
| Average Position (keywords) | ? | Top 5 para serviços | Top 3 |
| WhatsApp Conversions | baseline | +20% | +40% |
| Page Speed (mobile) | bom | 95+ LH | 95+ LH |
| Blog articles | 44 | 60+ | 80+ |

---

## 11. Timeline Estimado

| Fase | Descrição | Duração |
|------|-----------|---------|
| 1 | Aprovação do Brief | 1-2 dias |
| 2 | Ajuste "Aetero Element 5D" em todas as LPs + serviços | 1 dia |
| 3 | Design system (tokens, componentes) | 2-3 dias |
| 4 | Homepage rebuild | 3-5 dias |
| 5 | Páginas de serviço (9 páginas) | 5-7 dias |
| 6 | Página "Nossa Tecnologia" | 1-2 dias |
| 7 | LP template melhorias (DoctorBio, stats variados, Schema FAQ) | 2-3 dias |
| 8 | Blog integration + optimizations | 2-3 dias |
| 9 | SEO Schema + Meta tags | 1-2 dias |
| 10 | Testing + QA + Performance | 2-3 dias |
| **TOTAL** | | **~3-4 semanas** |

---

## ⚠️ CHECKPOINT: APROVAÇÃO NECESSÁRIA

> **Antes de prosseguir para a construção do site (Phase 5), este Build Brief precisa da sua aprovação explícita.**
>
> Este Brief v2.0 incorpora:
> - ✅ Remoção de "consulta sem compromisso" e "avaliação gratuita"
> - ✅ Remoção de "Casos Clínicos" / galeria de antes/depois
> - ✅ Remoção de "Programa Cuidar"
> - ✅ Inclusão de "Aetero Element 5D" como nome específico do scanner
> - ✅ Análise completa das 16 Landing Pages
> - ✅ Priorização das LPs como principal canal de conversão
> - ✅ Fluxo de Google Reviews via web app (MyTasks)
>
> **✅ APROVADO em 01/04/2026**
> 
> Phase 5 (Build) será iniciada sob demanda — nenhuma alteração no código sem pedido explícito do cliente.

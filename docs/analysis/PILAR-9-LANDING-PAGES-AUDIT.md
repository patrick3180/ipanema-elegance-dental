# PILAR 9 — Landing Pages Audit

**Data:** 16 de Fevereiro de 2026
**Fase:** Discovery & Analyze
**Escopo:** 14 landing pages ativas (rotas em App.tsx)
**Metodologia:** Auditoria manual de código (page components + config files) cruzada com dados de PILAR-6 (Google Ads), PILAR-8 (Psychology) e BRAND.md

---

## Score Médio Global: 71/100

| Categoria | Peso | Média |
|-----------|:----:|:-----:|
| **Estrutura** (componentes, performance, schemas) | 20 pts | 15.4 |
| **Mensagem** (headline, copy, BRAND.md compliance) | 20 pts | 14.1 |
| **Conversão** (CTAs, urgência, prova social, FAQ) | 30 pts | 20.6 |
| **Ads Match** (keyword↔headline, campaign↔LP coerência) | 30 pts | 21.1 |
| **TOTAL** | **100** | **71.2** |

---

## Tabela Comparativa — 14 LPs x 4 Categorias

| # | Landing Page | Rota | Estrutura /20 | Mensagem /20 | Conversão /30 | Ads Match /30 | **TOTAL /100** |
|---|---|---|:---:|:---:|:---:|:---:|:---:|
| 1 | Dor de Dente | /lp/dor-de-dente-urgencia-ipanema | 17 | 14 | 27 | 28 | **86** |
| 2 | Dente Quebrado | /lp/dente-quebrado-urgencia-ipanema | 17 | 14 | 27 | 28 | **86** |
| 3 | Emergência | /lp/emergencia-odontologica-ipanema | 17 | 15 | 26 | 27 | **85** |
| 4 | Implantes | /lp/implantes-dentarios-ipanema | 18 | 16 | 24 | 25 | **83** |
| 5 | Consulta Inicial | /lp/consulta-inicial | 18 | 16 | 22 | 24 | **80** |
| 6 | Ortodontia | /lp/ortodontia-ipanema | 18 | 16 | 21 | 23 | **78** |
| 7 | Esp. Prótese | /lp/especialista-protese-ipanema | 16 | 15 | 21 | 22 | **74** |
| 8 | Saúde Gengival | /lp/saude-gengival-ipanema | 15 | 16 | 22 | 18 | **71** |
| 9 | Clareamento | /lp/clareamento-dental | 16 | 15 | 19 | 20 | **70** |
| 10 | Lentes Porcelana | /lp/lentes-porcelana-ipanema | 16 | 14 | 18 | 18 | **66** |
| 11 | Estética Sorriso | /lp/estetica-dental-ipanema | 15 | 13 | 17 | 18 | **63** |
| 12 | Limpeza Dental | /lp/limpeza-dental-ipanema | 14 | 12 | 16 | 17 | **59** |
| 13 | Profilaxia | /lp/profilaxia-dental-ipanema | 14 | 12 | 16 | 16 | **58** |
| 14 | Facetas Resina | /lp/facetas-resina-ipanema | 15 | 10 | 17 | 16 | **58** |

---

## Ranking (Melhor → Pior)

### Tier 1 — Alto Desempenho (80+)
1. **Dor de Dente** — 86/100
2. **Dente Quebrado** — 86/100
3. **Emergência Odontológica** — 85/100
4. **Implantes Dentários** — 83/100
5. **Consulta Inicial** — 80/100

### Tier 2 — Bom, com Oportunidades (70-79)
6. **Ortodontia** — 78/100
7. **Especialista Prótese** — 74/100
8. **Saúde Gengival** — 71/100
9. **Clareamento** — 70/100

### Tier 3 — Abaixo do Potencial (<70)
10. **Lentes de Porcelana** — 66/100
11. **Estética Sorriso** — 63/100
12. **Limpeza Dental** — 59/100
13. **Profilaxia** — 58/100
14. **Facetas Resina** — 58/100

---

## Top 3 LPs Modelo (Replicar Estrutura)

### 1. Dor de Dente / Dente Quebrado (86/100)

**Por que funcionam:**
- Headline endereça a DOR EXATA do momento ("Dor de Dente?", "Dente Quebrado?")
- CTA com urgência ética ("Dor ignorada hoje vira tratamento mais complexo amanhã")
- 6 problemas que o paciente reconhece imediatamente
- Message match alto — keyword "dor de dente urgencia" → headline "Dor de Dente em Ipanema? Atendimento Prioritário"
- Benefício concreto no hero: "Encaixe Prioritário", "WhatsApp 24h"
- Campanha Urgências é 4.5x mais eficiente (R$ 23,73/conv vs média R$ 65+)

**O que replicar:**
- Headline = dor/problema + solução imediata + localização
- CTA com consequência de NÃO agir (urgência ética, não fabricada)
- 6 problemas específicos que geram identificação
- Benefícios concretos (não genéricos)

**Ressalvas (corrigir):**
- `clinicName: "Clínica Odontológica Premium Ipanema"` — "Premium" é palavra banida (BRAND.md Seção 5)

---

### 2. Implantes Dentários (83/100)

**Por que funciona:**
- Headline emocional + funcional: "Recupere a Segurança de um Sorriso Fixo"
- CTA com urgência médica real: "A perda óssea é progressiva — cada mês conta"
- 5 guide steps (mais detalhado que as demais)
- Imagem otimizada com AVIF + WebP + srcset (melhor performance de imagens entre todas as LPs)
- Schema JSON-LD com MedicalProcedure + hasOfferCatalog
- 6 FAQs cobrindo objeções de preço, dor e tempo

**O que replicar:**
- Urgência médica REAL como argumento ético
- Guide section detalhado (5 steps vs 4 na maioria)
- Otimização de imagens com formatos modernos
- FAQs que cobrem as 3 principais objeções (preço, dor, tempo)

---

### 3. Consulta Inicial (80/100)

**Por que funciona:**
- Posicionamento diferenciador: "Uma Consulta com Tempo para Ouvir, Examinar e Explicar"
- Keyword catch-all "dentista ipanema" — captura buscas genéricas
- LazySection com IntersectionObserver (melhor performance de carregamento)
- ContentfulBlocker evita Contentful degradar performance
- 6 problemas amplos que capturam diferentes dores
- Sem urgência forçada (compatível com intent de busca informacional)

**O que replicar:**
- Posicionamento que se diferencia do "mais do mesmo"
- Headline que comunica COMO é a experiência (não só o QUE faz)
- LazySection + IntersectionObserver em vez de Suspense puro
- Adequar urgência ao intent (busca informacional ≠ urgência)

---

## Top 5 LPs com Maior Oportunidade de Melhoria

### 1. Lentes de Porcelana (66/100) — PRIORIDADE ALTA

**Campanha associada:** Lentes de Contato (R$ 107,17/conv — PIOR campanha)

**Problemas encontrados:**
- **Zero urgência no CTA** — CTA emocional "Descubra o que Faz Sentido para Você" sem consequência de não agir
- **Headline genérica** — "Sinta-se à Vontade para Sorrir — De Verdade" não endereça dor concreta
- **Testimonials duplicados** com `lentesPorcelanaProfissionalConfig.ts` (variante não-roteada)
- **Problems duplicados** com a variante profissional
- **Sem diferenciação clara** de Facetas e Estética Sorriso (3 LPs competindo)
- **Campanha mais cara:** R$ 107,17/conv vs R$ 23,73 das Urgências

**Recomendações:**
1. Reescrever headline endereçando dor específica ("Cansou de esconder o sorriso em fotos?")
2. Adicionar urgência ética no CTA ("Cor e forma dos dentes mudam com o tempo — avalie agora")
3. Diferenciar claramente de Facetas Resina (posicionar como solução definitiva 15-20 anos)
4. Consolidar ou diferenciar testimonials das 3 LPs estéticas
5. Considerar consolidação com Estética Sorriso (reduzir diluição de tráfego)

**Impacto estimado:** ALTO — campanha com maior gasto e menor eficiência

---

### 2. Facetas Resina (58/100) — PRIORIDADE ALTA

**Campanha associada:** Lentes de Contato - Zona Sul (compartilhada)

**Problemas encontrados:**
- **Violação BRAND.md:** Testimonial usa "incrível" (palavra banida)
- **Testimonials sem bairro:** "Camila R.", "Bruno M." — BRAND.md exige "Nome — Bairro"
- **Guide subtitle genérica:** "Nosso grande diferencial" (vazio, não específico)
- **Headline promete "Mesmo Dia"** mas guide step 4 diz "normalmente em sessão única ou duas" — contradição
- **Sem urgência ética** no CTA
- **Nenhuma diferenciação clara** vs Lentes de Porcelana na headline
- **Campanha compartilhada** — impossível medir performance isolada

**Recomendações:**
1. Corrigir violações BRAND.md (remover "incrível", adicionar bairro nos testimonials)
2. Resolver contradição "mesmo dia" vs "uma ou duas sessões"
3. Posicionar claramente como alternativa acessível e reversível vs lentes
4. Adicionar urgência ética ("Restaurações antigas escurecidas pioram com o tempo")
5. Considerar campaign tracking separado para medir ROI individual

**Impacto estimado:** ALTO — compliance + diferenciação

---

### 3. Limpeza Dental (59/100) — PRIORIDADE MÉDIA

**Campanha associada:** limpeza-dental-premium

**Problemas encontrados:**
- **Headline 100% descritiva:** "Limpeza Dental Profissional em Ipanema" — zero emoção, zero dor
- **Page view title usa "Premium"** (BRAND.md violação)
- **Sem urgência no CTA**
- **Near-duplicate de Profilaxia** — público busca os dois termos para o mesmo serviço
- **Performance inferior:** Usa Suspense simples (sem LazySection/IntersectionObserver)
- **Nenhum diferenciador** vs Profilaxia LP

**Recomendações:**
1. Consolidar Limpeza + Profilaxia em uma única LP (eliminar canibalização)
2. Reescrever headline endereçando consequência ("Tártaro e placa bacteriana: quanto mais acumula, mais complexo o tratamento")
3. Adicionar urgência ética no CTA
4. Remover "Premium" do page_view title
5. Migrar para LazySection pattern

**Impacto estimado:** MÉDIO — baixo ticket, mas oportunidade de consolidação

---

### 4. Profilaxia (58/100) — PRIORIDADE MÉDIA

**Campanha associada:** profilaxia-dental

**Problemas encontrados:**
- **clinicName usa "Premium"** (BRAND.md violação)
- **Apenas 4 FAQs** (mínimo do dataset — menos conteúdo para SEO/AI bots)
- **Headline genérica:** "Prevenção que Funciona" — poderia ser qualquer dentista
- **Sem urgência no CTA**
- **Near-duplicate de Limpeza Dental**
- **Performance:** Não usa LazySection, não tem CriticalCSSInline, não tem ContentfulBlocker

**Recomendações:**
1. Consolidar com Limpeza Dental (ver item 3)
2. Se mantiver separada: diferenciar ("Profilaxia = prevenção programada" vs "Limpeza = tratamento pontual")
3. Corrigir "Premium" no clinicName
4. Expandir FAQs para pelo menos 6
5. Migrar para LazySection + CriticalCSSInline pattern

**Impacto estimado:** MÉDIO — consolidação com Limpeza é o maior ganho

---

### 5. Estética Sorriso Genérica (63/100) — PRIORIDADE MÉDIA

**Campanha associada:** Lentes de Contato - Zona Sul (compartilhada)

**Problemas encontrados:**
- **Catch-all sem foco:** "Sorriso que Combina com Você" — tenta atender todos, não convence ninguém
- **Compete com 3 LPs específicas** (Lentes, Facetas, Clareamento) pelo mesmo público
- **Guide genérica:** 4 steps que poderiam estar em qualquer LP
- **Testimonials genéricos** — não especificam qual tratamento fizeram
- **Campaign compartilhada** com Lentes e Facetas — diluição total

**Recomendações:**
1. Redefinir papel: esta LP deve ser o FUNIL DE TRIAGEM para quem não sabe o que precisa
2. Headline: "Não Sabe se Precisa de Lentes, Clareamento ou Facetas? Descubra na Avaliação"
3. Problema: focar na CONFUSÃO do paciente (já está parcialmente — amplificar)
4. Guide: 4 steps → 1) Avaliação 2) Diagnóstico das opções 3) Simulação 4) Decisão informada
5. CTA: "Agende a Avaliação — Descubra o que Faz Sentido" (já similar — adicionar urgência)
6. Considerar redirecionar Google Ads para LPs específicas e manter esta apenas para orgânico/direto

**Impacto estimado:** MÉDIO — clareza de posicionamento

---

## Análise por Dimensão

### Estrutura (Média: 15.4/20)

**Componentes utilizados — 3 famílias:**

| Família | LPs que usam | Contagem |
|---------|-------------|:--------:|
| **ConsultaInicial*** | Dor de Dente, Dente Quebrado, Emergência, Implantes, Consulta Inicial, Ortodontia, Protese, Lentes, Limpeza, Profilaxia, Estética, Facetas | 12 |
| **Clareamento*** | Clareamento | 1 |
| **Generic Template** | Saúde Gengival | 1 |

> *ConsultaInicial = ConsultaInicialHeader, ConsultaInicialHero, ConsultaInicialProblem, ConsultaInicialGuide, ConsultaInicialSocialProof, ConsultaInicialFAQ, ConsultaInicialCTA
> *Clareamento = ClareamentoProblem, ClareamentoGuide, ClareamentoCTA, ClareamentoSocialProof, ClareamentoFAQ

**Performance patterns encontrados:**

| Feature | LPs que têm | LPs sem |
|---------|:-----------:|:-------:|
| LazySection + IntersectionObserver | Consulta Inicial, Ortodontia | 12 restantes |
| CriticalCSSInline | Consulta Inicial, Ortodontia, Implantes, 3 Urgências | 8 restantes |
| ContentfulBlocker | Consulta Inicial, Ortodontia | 12 restantes |
| HeroImagePreloader / useCriticalImagePreload | Todas | 0 |
| CoreWebVitalsMonitor | Implantes, Clareamento | 12 restantes |
| ErrorBoundary | Todas | 0 |
| Skeleton components (SocialProofSkeleton, FAQSkeleton) | Profilaxia, Implantes, Clareamento | 11 restantes |
| AVIF image format | Implantes, Profilaxia | 12 restantes |

**Schemas JSON-LD:**

Todas as 14 LPs têm schema `Dentist` inline. Variações:
- Implantes: tem `hasOfferCatalog` com `MedicalProcedure`
- Profilaxia: tem `hasOfferCatalog` com `MedicalProcedure`
- Ortodontia: nome inclui "Dr. Bruno Neves & Dra. Carla Christoph"
- Demais: schema básico `Dentist` com address e telephone

**Nota:** Schemas mais ricos (FAQPage, MedicalProcedure standalone) estão no `generate-static-meta.cjs` (Sprint 5), não nos componentes React. O pre-rendering adiciona schemas ao HTML estático servido para bots.

---

### Mensagem (Média: 14.1/20)

**Headlines classificadas por tipo:**

| Tipo | Headlines | Contagem |
|------|-----------|:--------:|
| **Dor + Solução** | "Dor de Dente? Atendimento Prioritário", "Dente Quebrado? Restauração Natural", "Emergência? Encaixe Prioritário" | 3 |
| **Emocional + Benefício** | "Recupere a Segurança de um Sorriso Fixo", "Sinta-se à Vontade para Sorrir" | 2 |
| **Experiência diferenciada** | "Uma Consulta com Tempo para Ouvir, Examinar e Explicar" | 1 |
| **Credencial + Autoridade** | "Ortodontia Conduzida por Doutor em Ortodontia pela UERJ", "Reabilitação com Especialista" | 2 |
| **Descritivo genérico** | "Limpeza Dental Profissional em Ipanema", "Profilaxia que Funciona", "Clareamento que Respeita a Naturalidade" | 3 |
| **Promessa + Velocidade** | "Resultado no Mesmo Dia" (Facetas) | 1 |
| **Catch-all** | "Sorriso que Combina com Você", "Saúde da Gengiva Merece Atenção" | 2 |

**Violações BRAND.md encontradas:**

| LP | Violação | Severidade |
|----|----------|:----------:|
| Facetas Resina | Testimonial usa "incrível" | ALTA |
| Facetas Resina | Nomes sem bairro ("Camila R." sem localidade) | MÉDIA |
| Dor de Dente | clinicName "Premium Ipanema" | MÉDIA |
| Dente Quebrado | clinicName "Premium Ipanema" | MÉDIA |
| Profilaxia | clinicName "Premium Ipanema" | MÉDIA |
| Limpeza Dental | page_view title com "Premium" | MÉDIA |
| Facetas Resina | Guide subtitle genérica "Nosso grande diferencial" | BAIXA |

**Total:** 7 violações em 5 LPs

---

### Conversão (Média: 20.6/30)

**CTA urgency analysis:**

| LP | Tem Urgência no CTA? | Tipo de Urgência |
|----|-----------------------|------------------|
| Dor de Dente | SIM | Consequência médica ("vira tratamento mais complexo") |
| Dente Quebrado | SIM | Consequência médica ("fratura não tratada pode complicar") |
| Emergência | SIM | Consequência temporal ("quanto antes, mais simples") |
| Implantes | SIM | Consequência médica ("perda óssea é progressiva") |
| Consulta Inicial | NAO | -- |
| Ortodontia | NAO | -- |
| Protese | NAO | -- |
| Saúde Gengival | NAO (mas tem no problem description) | Urgência implícita no problem text |
| Clareamento | NAO | -- |
| Lentes | NAO | -- |
| Estética Sorriso | CAMPO EXISTE mas vazio | -- |
| Limpeza | NAO | -- |
| Profilaxia | NAO | -- |
| Facetas | NAO | -- |

**Resultado:** Apenas 4/14 LPs (29%) têm urgência ética no CTA. As 4 com urgência são as 4 melhores do ranking.

**Correlação direta:** LPs com urgência ética → top 4 do ranking → campanha mais eficiente (R$ 23,73/conv)

**Elementos de conversão por LP:**

| Elemento | Presente em | Ausente em |
|----------|:-----------:|:----------:|
| FloatingWhatsApp | 14/14 | 0 |
| FAQ section | 14/14 | 0 |
| SocialProof/testimonials | 14/14 | 0 |
| Stats (números sociais) | 14/14 | 0 |
| GCLID capture | 14/14 | 0 |
| dataLayer page_view | 14/14 | 0 |
| Scroll depth tracking | 14/14 | 0 |
| CTA urgency copy | 4/14 | 10/14 |
| Multiple CTA touchpoints | 14/14 (Header + CTA section + FloatingWhatsApp) | 0 |

---

### Ads Match (Média: 21.1/30)

**Campaign → LP mapping com performance (dados PILAR-6):**

| Campanha Google Ads | LPs associadas | CPA estimado | Match Score |
|---------------------|----------------|:------------:|:-----------:|
| Urgências | Dor de Dente, Dente Quebrado, Emergência | R$ 23,73 | 28/30 |
| Implantes | Implantes | R$ 96,51 | 25/30 |
| Clínica Geral | Consulta Inicial, Saúde Gengival | ~R$ 50-70* | 22/30 |
| Ortodontia | Ortodontia | ~R$ 60-80* | 23/30 |
| Lentes de Contato | Lentes, Facetas, Estética | R$ 107,17 | 17/30 |
| Clareamento | Clareamento | ~R$ 70-90* | 20/30 |
| Prótese | Protese | R$ 65,50 | 22/30 |
| Limpeza/Profilaxia | Limpeza, Profilaxia | sem dados | 16/30 |

> *Estimativas baseadas em rankings relativos do PILAR-6 (valores absolutos em revalidação)

**Problema principal de Ads Match:**
- Campanha "Lentes de Contato" direciona para 3 LPs diferentes (Lentes, Facetas, Estética) — diluição
- Keyword "estetica dental" cai na LP catch-all (Estética Sorriso) que não converte
- Limpeza e Profilaxia são LPs separadas para o mesmo intent de busca

---

## Achados Estruturais Importantes

### 1. LP não-roteada descoberta

`LentesDeContatoEmPorcelanaProfissionalLandingPage.tsx` existe como arquivo mas **não tem rota em App.tsx**. Usa `lentesPorcelanaProfissionalConfig.ts` que compartilha testimonials e problems com a versão "acolhedora". Possível A/B test abandonado ou variante não-lançada.

**Recomendação:** Decidir se mantém como teste A/B futuro ou remove para evitar confusão.

### 2. 3 famílias de componentes

12 LPs usam componentes `ConsultaInicial*`, 1 usa `Clareamento*`, 1 usa `Generic Template`. A inconsistência dificulta manutenção e padronização.

**Recomendação:** Migrar para componentes genéricos (familia Template) com config-driven rendering, como já faz SaudeGengival.

### 3. Footer compartilhado incorreto

Todas as LPs usam `ClareamentoFooter` — um componente nomeado para Clareamento que serve de footer universal. Funciona mas o nome confunde.

**Recomendação:** Renomear para `LandingFooter` ou `SharedLPFooter`.

### 4. Canibalização Limpeza × Profilaxia

Duas LPs quase idênticas (mesmo ticket, mesmo intent, mesma estrutura) competindo pelo mesmo tráfego.

**Recomendação:** Consolidar em uma LP "Limpeza e Prevenção Dental" com redirect 301 da segunda.

### 5. Diluição Lentes × Facetas × Estética

3 LPs competindo pelo mesmo cluster de keywords "estética dental", com a campanha "Lentes" (a mais cara) direcionando para 3 destinos. O paciente que busca "lentes de contato dental" e cai na LP "Estética Sorriso" genérica não converte.

**Recomendação:**
- LP Lentes = quem pesquisa especificamente lentes
- LP Facetas = quem pesquisa facetas de resina
- LP Estética = funil de triagem para quem não sabe (manter, mas não enviar Ads para ela)

---

## Template Ideal — Estrutura Recomendada para Todas as LPs

Baseado na análise das LPs Tier 1 (80+ pontos), o template ideal é:

### Estrutura de Seções

```
1. HEADER
   - Logo + CRO 27.509 + Telefone/WhatsApp
   - Botão WhatsApp sempre visível

2. HERO (above the fold)
   - Headline: [DOR/PROBLEMA] + [SOLUÇÃO] + [LOCALIZAÇÃO]
     Formato: "Dor de Dente em Ipanema? Atendimento Prioritário"
     NÃO: "Limpeza Dental Profissional em Ipanema" (descritivo)
   - Subheadline: 1-2 frases que validam a dor e posicionam a Dra. Carla
   - 3-4 benefícios concretos (não genéricos)
   - CTA primário → WhatsApp
   - Imagem da Dra. Carla (WebP + AVIF, srcset responsivo)

3. PROBLEM (identificação)
   - Título que espelha o que o paciente sente
   - 6 problemas específicos (não genéricos)
   - Formato: situação reconhecível, não lista de sintomas

4. GUIDE (3 passos)
   - Posicionar Dra. Carla como guia, não herói
   - 4 steps (padrão atual) — manter
   - Cada step: número + título + descrição concreta

5. SOCIAL PROOF
   - 3 testimonials com nome + bairro (BRAND.md: "Marina P. — Ipanema")
   - 4 stats (anos, pacientes, tecnologia, disponibilidade)
   - Testimonials ESPECÍFICOS ao tratamento (não genéricos)

6. FAQ
   - Mínimo 6 perguntas
   - Cobrir objeções: preço, dor, tempo, durabilidade
   - Perguntas que o paciente realmente faz (não marketing)

7. CTA FINAL
   - Título com call-to-action claro
   - Subtítulo com urgência ÉTICA (consequência de não agir)
     OBRIGATÓRIO: toda LP deve ter urgência ética no CTA
   - Botão WhatsApp com texto de ação

8. FOOTER (LandingFooter)
   - CRO, endereço, horários, serviços

9. FLOATING WHATSAPP
   - Sempre presente (mobile + desktop)
```

### Checklist de Qualidade por LP

- [ ] Headline endereça DOR específica (não descritiva)
- [ ] Subheadline valida a dor e posiciona o profissional
- [ ] 4+ benefícios CONCRETOS no hero
- [ ] 6 problemas no Problem section
- [ ] 4 guide steps com Dra. Carla como guia
- [ ] 3 testimonials com nome + bairro
- [ ] 6+ FAQs cobrindo objeções
- [ ] CTA com urgência ÉTICA
- [ ] Zero palavras banidas BRAND.md
- [ ] LazySection + IntersectionObserver (performance)
- [ ] CriticalCSSInline (performance)
- [ ] AVIF + WebP images com srcset
- [ ] Schema JSON-LD (Dentist + MedicalProcedure)
- [ ] GCLID capture + dataLayer page_view
- [ ] Scroll depth tracking
- [ ] Message match: keyword da campanha → headline da LP

### Config File Pattern

Todas as LPs devem seguir o `LandingPageConfig` type com campos obrigatórios:

```typescript
{
  campaign: string,           // nome da campanha Google Ads
  messageMatch: {
    adGroup: string,          // ad group associado
    keyword: string           // keyword principal
  },
  whatsapp: { number, message },
  hero: {
    headline: string,         // DOR + SOLUÇÃO + LOCAL
    subheadline: string,      // validação + posicionamento
    ctaText: string,          // ação clara
    backgroundImage: string   // WebP, com AVIF variant
  },
  benefits: string[],         // 4 itens, concretos
  problem: {
    title: string,
    description: string,
    problems: string[]        // 6 itens
  },
  guide: {
    title: string,
    subtitle: string,         // credencial da Dra. Carla
    steps: Step[]             // 4 steps
  },
  socialProof: {
    title: string,
    testimonials: Testimonial[], // 3 com nome + bairro
    stats: Stat[]                // 4 números
  },
  faq: {
    title: string,
    questions: FAQ[]          // 6+ perguntas
  },
  cta: {
    title: string,
    subtitle: string,
    buttonText: string,
    urgency: string           // OBRIGATÓRIO — consequência ética
  },
  seo: { title, description, keywords },
  tracking: { gtagId, gtmId }
}
```

---

## Plano de Ação — Quick Wins

### Sprint 6 ou posterior (prioridade de correções)

| # | Ação | LPs afetadas | Esforço |
|---|------|:------------:|:-------:|
| 1 | Corrigir violações BRAND.md (7 ocorrências) | 5 LPs | 30 min |
| 2 | Adicionar urgência ética no CTA das 10 LPs sem | 10 LPs | 2h |
| 3 | Consolidar Limpeza + Profilaxia | 2 → 1 LP | 1h |
| 4 | Reescrever headline descritivas para DOR+SOLUÇÃO | 5 LPs | 1h |
| 5 | Expandir FAQs das LPs com <6 perguntas | 4 LPs | 1h |
| 6 | Migrar todas LPs para LazySection pattern | 12 LPs | 2h |
| 7 | Adicionar AVIF variants para hero images | 12 LPs | 1h |
| 8 | Renomear ClareamentoFooter → LandingFooter | 14 LPs | 30 min |
| 9 | Decidir sobre LP Lentes Profissional (rota ou delete) | 1 LP | 15 min |
| 10 | Separar tracking da campanha Lentes (3 LPs → 3 campaigns) | 3 LPs | 30 min (Google Ads) |

**Esforço total estimado:** ~9-10h de implementação

---

## Metodologia de Scoring

### Estrutura (20 pontos)
- Componentes corretos e completos: 5 pts
- Performance (LazySection, CriticalCSS, AVIF, skeletons): 5 pts
- Schema JSON-LD rico: 5 pts
- ErrorBoundary, GCLID, scroll tracking, dataLayer: 5 pts

### Mensagem (20 pontos)
- Headline endereça dor específica: 5 pts
- Copy alinhada com BRAND.md (zero violações): 5 pts
- Testimonials completos (nome + bairro + tratamento específico): 5 pts
- FAQs cobrem objeções reais (preço, dor, tempo, durabilidade): 5 pts

### Conversão (30 pontos)
- CTA com urgência ética: 10 pts
- Problem section com 6+ problemas específicos: 5 pts
- Guide section posiciona profissional como guia: 5 pts
- SocialProof com stats concretos: 5 pts
- Múltiplos touchpoints de conversão: 5 pts

### Ads Match (30 pontos)
- Keyword → headline alignment: 10 pts
- Campaign → LP 1:1 (sem diluição): 10 pts
- Message match fields corretos: 5 pts
- CPA relativo da campanha: 5 pts

---

## Referências Cruzadas

- **PILAR-6 (Google Ads):** [docs/analysis/PILAR-6-GOOGLE-ADS-AUDIT.md](PILAR-6-GOOGLE-ADS-AUDIT.md) — dados de CPA por campanha
- **PILAR-8 (Psychology):** [docs/analysis/PILAR-8-MARKETING-PSYCHOLOGY.md](PILAR-8-MARKETING-PSYCHOLOGY.md) — LPs score 82/100, SPs 62/100
- **PILAR-4 (Brand):** [docs/analysis/PILAR-4-BRAND-COMPLIANCE.md](PILAR-4-BRAND-COMPLIANCE.md) — Sprint 3 corrigiu 62 violações, mas 7 novas encontradas nas configs

---

## STATUS UPDATE — 18/02/2026 (Sprint 9)

**Itens resolvidos:**
- [x] Corrigir 7 violações BRAND.md (Phase 2: "Premium" removido de 3 configs, Facetas corrigidas)
- [x] Implementar urgência ética em 10 LPs (campo `urgency` adicionado em 10 configs)
- [x] Reescrever 4 headlines descritivas (Limpeza, Clareamento, Estética, Lentes)
- [x] Padronizar performance: LazySection em todas as 16 LPs
- [x] Renomear ClareamentoFooter → LandingFooter (16 LPs)
- [x] Card asymmetry fix (3+1 → 2×2 para 4 itens)
- [x] AVIF hero image variants geradas (5 imagens × 3 tamanhos)

**Itens pendentes:**
- [ ] Consolidar Limpeza + Profilaxia (redirect 301)

**Score atualizado:** 71/100 → ~79/100 (estimativa com urgência, headlines, LazySection + AVIF)

---

*Relatório gerado por análise manual de código: 14 page components + 15 config files + cruzamento com Pilares 4, 6 e 8.*


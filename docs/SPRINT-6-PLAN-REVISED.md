# SPRINT 6 — PSYCHOLOGY & CONVERSÃO
## Plano Revisado (Aprovado para Execução)

**Data:** 16 de Fevereiro de 2026
**Base:** Replicar modelo da página "Saúde da Gengiva" (score 85/100, 212s engagement)
**Impacto estimado:** +15-25% conversão
**Esforço:** ~1.5-2 dias

---

## AÇÕES APROVADAS (19 total)

### CATEGORIA 1: SEÇÕES EMPÁTICAS (Alta Prioridade)

**#1** — **Adicionar seção empática em Implantes Dentários**
- **Onde:** Após o Hero, antes das Modalidades (similar à linha 174-192 de SaudeDaGengiva.tsx)
- **Conteúdo:** Descrever situações emocionais reais:
  - "Você evita certos alimentos duros por medo de machucar a gengiva?"
  - "Sente insegurança com prótese móvel que solta ao falar?"
  - "Percebe perda óssea progressiva e teme que piore?"
- **Objetivo:** Criar identificação emocional antes de apresentar soluções técnicas
- **Impacto estimado:** +10-15% em tempo na página, +5-8% conversão
- **Arquivo:** `src/pages/ImplantesDentarios.tsx`

**#2** — **Adicionar seção empática em Clareamento Dental**
- **Onde:** Após Hero, antes das 3 modalidades
- **Conteúdo:** Substituir headline genérico ("Clareamento Dental Profissional") por:
  - "Seu sorriso pede um clareamento? Descubra a modalidade certa para o seu caso"
  - Parágrafo empático sobre constrangimento com dentes amarelados
- **Objetivo:** Transformar página técnica em conversa com paciente ansioso
- **Impacto estimado:** +8-12% conversão
- **Arquivo:** `src/pages/ClareamentoDental.tsx`

**#3** — **Adicionar seção empática em Ortodontia**
- **Onde:** Após Hero, antes da tabela comparativa
- **Conteúdo:** Reposicionar para adultos de Zona Sul:
  - "Você acha que 'já passou da idade' para alinhar os dentes?"
  - "Profissionais que querem Invisalign discreto para não atrapalhar reuniões"
  - Vergonha de dentes tortos em contexto profissional
- **Objetivo:** Direcionar para público premium adulto (não adolescentes)
- **Impacto estimado:** +12-18% conversão
- **Arquivo:** `src/pages/Ortodontia.tsx`

**#4** — **Mover seção empática existente em Restaurações para o Hero**
- **Onde:** A seção empática já existe (linhas ~28), mas está abaixo do fold
- **Ação:** Integrar ao subheadline do Hero
- **Conteúdo atual:** "Você já passou pela frustração de esconder o sorriso ao notar um dente quebrado, manchado ou com aquela restauração escura que denuncia o tratamento?"
- **Objetivo:** Impacto emocional imediato no primeiro scroll
- **Impacto estimado:** +5-8% conversão
- **Arquivo:** `src/pages/RestaureacoesEsteticas.tsx`

---

### CATEGORIA 2: MÚLTIPLOS CTAs (Alta Prioridade)

**#5** — **Adicionar CTA intermediário em Implantes após seção de Modalidades**
- **Onde:** Após os 4 accordions de modalidades (Implante Unitário, Múltiplos, Prótese sobre Implante, All-on-4)
- **Copy:** "Quer saber qual modalidade se encaixa no seu caso? Agende uma avaliação"
- **Design:** Botão WhatsApp verde com ícone, centralizado
- **Tracking:** `event_label: 'CTA Implantes - Pós Modalidades'`
- **Arquivo:** `src/pages/ImplantesDentarios.tsx`

**#6** — **Adicionar CTA intermediário em Lentes/Facetas após Test Drive**
- **Onde:** Logo após a seção do Test Drive do Sorriso (momento de máxima empolgação)
- **Copy:** "Quer fazer seu Test Drive do Sorriso? Agende sua primeira consulta"
- **Design:** Botão WhatsApp verde destacado
- **Tracking:** `event_label: 'CTA Lentes - Pós Test Drive'`
- **Arquivo:** `src/pages/LentesEFacetas.tsx`

**#7** — **Adicionar CTA intermediário em Clareamento após comparação de modalidades**
- **Onde:** Após a comparação das 3 modalidades (Consultório, Caseiro, Combinado)
- **Copy:** "Não sabe qual modalidade escolher? Vamos avaliar juntos"
- **Design:** Botão WhatsApp verde
- **Tracking:** `event_label: 'CTA Clareamento - Pós Modalidades'`
- **Arquivo:** `src/pages/ClareamentoDental.tsx`

**#8** — **Adicionar CTA intermediário em Canal após seção de Situações**
- **Onde:** Após os 3 cards de situações (Dor, Inchaço, Escurecimento)
- **Copy:** "Está com um desses sintomas? Agende uma avaliação de urgência"
- **Design:** Botão WhatsApp verde com ênfase em urgência
- **Tracking:** `event_label: 'CTA Canal - Pós Situações'`
- **Arquivo:** `src/pages/TratamentoDeCanal.tsx`

**~~#9~~** — **REMOVIDO** ❌
- **Motivo:** "Sem compromisso" é proibido — clínica premium não oferece consulta gratuita
- **Aprendizado:** Tempo da Dra. Carla é valioso, não usar linguagem de commodity

---

### CATEGORIA 3: URGÊNCIA ÉTICA (Média Prioridade)

**#10** — **Adicionar urgência ética em Canal**
- **Onde:** Na seção empática existente (que já desmistifica o medo)
- **Conteúdo adicional:** "Adiar o tratamento pode levar a infecção que se espalha para outras áreas, podendo exigir extração do dente"
- **Tom:** Informativo, não assustador (urgência médica real, não manipulação)
- **Arquivo:** `src/pages/TratamentoDeCanal.tsx`

**#11** — **Adicionar urgência ética em Saúde da Gengiva**
- **Onde:** Na seção empática existente (linha ~182)
- **Conteúdo adicional:** "Periodontite leva de 2-5 anos para evoluir de gengivite, mas uma vez instalada, a perda óssea é irreversível"
- **Objetivo:** Quantificar tempo (atualmente falta essa informação)
- **Arquivo:** `src/pages/SaudeDaGengiva.tsx`

**#12** — **Adicionar urgência ética em Implantes**
- **Onde:** Na nova seção empática (ver #1)
- **Conteúdo:** "Perda óssea acelera após extração — quanto mais tempo sem dente, mais osso perde, podendo exigir enxerto"
- **Tom:** Consequência médica real, linguagem clara
- **Arquivo:** `src/pages/ImplantesDentarios.tsx`

---

### CATEGORIA 4: HOMEPAGE HERO (Média Prioridade)

**#13** — **Reformular headline da Homepage** (Score atual: 48/100)
- **Atual:** "Odontologia Especializada em Ipanema" (genérico, não endereça dor nem aspiração)
- **✅ APROVADO — Proposta 2:** "Dentista em Ipanema Especializada em Reabilitação Oral e Estética Natural"
- **Objetivo:** Conectar emocionalmente logo no primeiro segundo
- **Arquivo:** `src/pages/Index.tsx`

**#14** — **Adicionar subheadline emocional na Homepage**
- **Onde:** Abaixo do H1, antes do CTA
- **Conteúdo:** "Para quem busca tratamento odontológico sem pressa, sem dor desnecessária e com resultado que parece natural"
- **Objetivo:** Endereçar as 3 maiores dores do público premium (tempo, medo, artificialidade)
- **Arquivo:** `src/pages/Index.tsx`

---

### CATEGORIA 5: CORREÇÕES BRAND.MD (Alta Prioridade — Quick Win)

**#15** — **Corrigir "materiais de alta qualidade" em Prótese**
- **Problema:** Genérico demais (violação implícita do BRAND.md Seção 5)
- **Correção:** Substituir por nomes reais: "cerâmica e.max e zircônia"
- **Arquivo:** `src/pages/ProteseDentaria.tsx`

**#16** — **Corrigir "materiais de excelência" em Restaurações**
- **Problema:** Palavra "excelência" é banida pelo BRAND.md
- **Correção:** Substituir por "resinas compostas nanoparticuladas"
- **Arquivo:** `src/pages/RestaureacoesEsteticas.tsx`

**#17** — **Corrigir "Transforme a forma como você se vê" em Lentes/Facetas**
- **Problema:** Palavra "transforme" é banida pelo BRAND.md
- **Correção:** "Mude a forma como você se vê ao sorrir"
- **Arquivo:** `src/pages/LentesEFacetas.tsx`

---

### CATEGORIA 6: TRUST SIGNALS (Média-Baixa Prioridade)

**#18** — **Adicionar stats das LPs nas Service Pages**
- **O quê:** Seção de stats (20+ anos, 4000+ pacientes, 24h WhatsApp)
- **Onde:** Após a seção empática, antes das modalidades
- **Por quê:** Existem nas LPs mas não nas SPs — números concretos reduzem incerteza
- **Arquivos:** Todas as 9 service pages

**#19** — **~~Reviews do Google~~ → PAUSADO** ⏸️
- **Status:** Aguardar até atingir ~50+ reviews no Google
- **Atual:** 23 reviews (reviewCount corrigido em GlobalSchemas.tsx e SEOHead.tsx)
- **Próximo passo:** Quando atingir 50+, adicionar menção nas service pages
- **Nota:** Não adicionar por enquanto para evitar número baixo causar efeito negativo

**#20** — **Criar seção de Testimonials específicos por tratamento**
- **Problema:** 3 testimonials genéricos só na homepage
- **✅ APROVADO:** Usar depoimentos estáticos das LPs (que já existem)
- **Ação:** Adicionar 2-3 depoimentos específicos em cada SP usando componente reutilizável
- **Fonte:** Depoimentos das landing pages (conteúdo já validado)
- **Quando tiver mais reviews Google:** Substituir por reviews reais
- **Arquivos:** Todas as 9 service pages

---

## CORREÇÕES CRÍTICAS APLICADAS (Antes do Sprint 6)

**FIX-1** — **reviewCount corrigido de 127 → 23** ✅ DEPLOYED
- **Problema:** Informação falsa nos schemas (127 reviews vs 23 reais)
- **Arquivos corrigidos:**
  - `src/components/seo/GlobalSchemas.tsx`
  - `src/components/SEOHead.tsx`
- **Commit:** `b6e0f21`
- **Impacto:** Evita problemas éticos/legais com informação falsa

---

## RESUMO EXECUTIVO

**Total de ações:** 19 (era 20, #9 removida)

**Distribuição por prioridade:**
- **ALTA:** 12 ações (#1-8, #15-17, #20)
- **MÉDIA:** 5 ações (#10-14)
- **PAUSADA:** 1 ação (#19 - aguardar mais reviews)
- **REMOVIDA:** 1 ação (#9 - "sem compromisso" proibido)

**Categorias:**
1. Seções Empáticas: 4 ações — ALTA PRIORIDADE
2. Múltiplos CTAs: 4 ações (era 5, #9 removida) — ALTA PRIORIDADE
3. Urgência Ética: 3 ações — MÉDIA PRIORIDADE
4. Homepage Hero: 2 ações — MÉDIA PRIORIDADE
5. Correções BRAND.md: 3 ações — ALTA PRIORIDADE (Quick Win)
6. Trust Signals: 2 ações (#18, #20) + 1 pausada (#19)

**Impacto estimado geral:** +15-25% conversão (conforme Pilar 8)
**Esforço:** ~1.5-2 dias de implementação
**Arquivos afetados:** 9 service pages + homepage

---

## ORDEM DE EXECUÇÃO RECOMENDADA

### Fase 1: Quick Wins (30 min)
- #15, #16, #17 (correções BRAND.md)

### Fase 2: Homepage (45 min)
- #13, #14 (hero + subheadline)

### Fase 3: Seções Empáticas (2-3h)
- #1 (Implantes)
- #2 (Clareamento)
- #3 (Ortodontia)
- #4 (Restaurações - mover existente)

### Fase 4: CTAs Intermediários (2h)
- #5 (Implantes)
- #6 (Lentes)
- #7 (Clareamento)
- #8 (Canal)

### Fase 5: Urgência Ética (1h)
- #10 (Canal)
- #11 (Gengiva)
- #12 (Implantes)

### Fase 6: Trust Signals (2-3h)
- #18 (Stats das LPs)
- #20 (Testimonials das LPs)

---

**Status:** ✅ APROVADO PARA EXECUÇÃO
**Próximo passo:** Iniciar implementação por Fase 1 (Quick Wins)
**Documentação:** Este plano será referência durante toda execução

---

**Changelog:**
- 16/02/2026 14:00 - Plano inicial criado (20 ações)
- 16/02/2026 15:30 - Revisado com feedback Patrick:
  - #9 removida (proibido "sem compromisso")
  - #13 confirmado com Proposta 2
  - #19 pausada (aguardar mais reviews Google)
  - #20 confirmado com depoimentos LPs
  - FIX-1 aplicado (reviewCount 127→23)

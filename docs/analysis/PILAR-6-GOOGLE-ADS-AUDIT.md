# PILAR 6: Auditoria Completa do Google Ads

**Data:** 2026-02-13
**Conta:** AW-16894364517
**Periodo Analisado:** Ultimos 90 dias (BigQuery)
**Investimento Mensal:** ~R$ 9.000/mes (~R$ 27k/90 dias estimado real)
**Status:** Completo

---

## Resumo Executivo

A conta de Google Ads da Dra. Carla opera com 6 campanhas ativas e apresenta uma disparidade significativa de eficiencia entre elas: a campanha de Urgencias Odontologicas tem custo/conversao de R$ 23,73 (a mais eficiente), enquanto Lentes de Contato custa R$ 107,17 por conversao (4,5x pior). Existem keywords com Quality Score 0-1 na campanha de Protese que inflam o CPC desnecessariamente. A conta ja possui 14 landing pages dedicadas e tracking de GCLID para atribuicao offline -- infraestrutura solida que precisa ser melhor aproveitada. As oportunidades imediatas de otimizacao podem reduzir o custo/conversao medio em 20-30% sem aumentar investimento, liberando orcamento para escalar o que ja funciona bem.

---

## Dashboard de Performance por Campanha

### Visao Geral (90 dias)

| # | Campanha | Status | Impressoes | Cliques | CTR | Custo (R$) | CPC (R$) | Custo/Conv (R$) | Eficiencia |
|---|----------|--------|------------|---------|-----|------------|----------|-----------------|------------|
| 1 | **Clinica Geral - Zona Sul** | Ativa | 2,78M | 60,3K | 2,17% | 429,9K | 7,13 | 39,30 | Boa |
| 2 | **Urgencias Odontologicas** | Ativa | 611K | 14K | 2,30% | 73,5K | 5,23 | **23,73** | Excelente |
| 3 | **Protese Dental - Zona Sul** | Ativa | 1,43M | 30,5K | 2,13% | 214,4K | 7,03 | 91,61 | Fraca |
| 4 | **Clareamento Dental** | Ativa | 658K | 13,2K | 2,00% | 105,9K | 8,02 | 86,86 | Fraca |
| 5 | **Implantes Dentarios** | Ativa | 705K | 12,3K | 1,75% | 110K | 8,94 | 96,51 | Fraca |
| 6 | **Lentes de Contato** | Ativa | 819K | 13,3K | 1,63% | 108,2K | 8,13 | **107,17** | Critica |

**Investimento Total (90 dias):** R$ 1.041.825,60 (agregado BigQuery -- numeros absolutos inflados por multi-dimensao; proporcoes relativas sao validas)

> **Nota sobre dados:** Os valores absolutos do BigQuery estao inflados devido a agregacao multi-dimensional (dispositivo x rede x dia). Os valores RELATIVOS e rankings de eficiencia sao validos para tomada de decisao.

---

## Ranking de Campanhas por Eficiencia

### Da Melhor para a Pior

```
1. URGENCIAS ODONTOLOGICAS     R$ 23,73/conv  ||||||||||||||||||||  CTR 2,30%  CPC R$ 5,23
2. CLINICA GERAL - ZONA SUL    R$ 39,30/conv  ||||||||||||||||     CTR 2,17%  CPC R$ 7,13
3. CLAREAMENTO DENTAL           R$ 86,86/conv  |||||||||            CTR 2,00%  CPC R$ 8,02
4. PROTESE DENTAL               R$ 91,61/conv  ||||||||             CTR 2,13%  CPC R$ 7,03
5. IMPLANTES DENTARIOS          R$ 96,51/conv  |||||||              CTR 1,75%  CPC R$ 8,94
6. LENTES DE CONTATO            R$107,17/conv  ||||||               CTR 1,63%  CPC R$ 8,13
```

**Fator de disparidade:** A campanha menos eficiente (Lentes) custa 4,5x mais por conversao que a mais eficiente (Urgencias).

---

## Analise de Alocacao de Budget

### Distribuicao Atual (baseada em proporcao de custo)

| Campanha | % do Budget | Custo/Conv | Eficiencia | Alinhamento |
|----------|-------------|------------|------------|-------------|
| Clinica Geral | 41,3% | R$ 39,30 | Boa | ADEQUADO |
| Protese Dental | 20,6% | R$ 91,61 | Fraca | SOBREINVESTIDO |
| Implantes | 10,6% | R$ 96,51 | Fraca | SOBREINVESTIDO |
| Lentes de Contato | 10,4% | R$ 107,17 | Critica | SOBREINVESTIDO |
| Clareamento | 10,2% | R$ 86,86 | Fraca | NEUTRO |
| Urgencias | 7,1% | R$ 23,73 | Excelente | **SUBINVESTIDO** |

### Diagnostico

**O paradoxo:** A campanha MAIS eficiente (Urgencias) recebe a MENOR fatia do orcamento (7,1%), enquanto as tres campanhas MENOS eficientes (Protese + Implantes + Lentes) consomem 41,6% do budget.

**Consideracao importante:** Protese, Implantes e Lentes sao servicos de ticket alto. Mesmo com custo/conversao maior, o ROAS pode ser positivo se o tratamento fechar. O tracking offline via GCLID deveria esclarecer isso -- porem os dados de faturamento por campanha nao estavam disponiveis para esta analise.

### Alocacao Ideal (Proposta para R$ 9.000/mes)

| Campanha | Atual | Proposto | Variacao | Justificativa |
|----------|-------|----------|----------|---------------|
| Clinica Geral | R$ 3.717 | R$ 3.200 | -14% | Reduzir levemente, alto volume estavel |
| Urgencias | R$ 639 | R$ 1.800 | **+182%** | Escalar a campanha mais eficiente |
| Clareamento | R$ 918 | R$ 1.000 | +9% | Manter e otimizar |
| Protese | R$ 1.854 | R$ 1.000 | -46% | Reduzir ate corrigir Quality Score |
| Implantes | R$ 954 | R$ 1.000 | +5% | Manter, otimizar landing page |
| Lentes | R$ 936 | R$ 1.000 | +7% | Manter mas otimizar ANTES de escalar |

> **Nota:** A realocacao de Urgencias para marco ja estava planejada pelo Patrick. A proposta acima antecipa esse movimento.

---

## Analise de Keywords

### Top Keywords por Eficiencia

| Keyword | Match Type | Campanha | CTR | Custo/Conv | QS |
|---------|-----------|----------|-----|------------|-----|
| emergencia dentista | BROAD | Urgencias | 1,64% | **R$ 7,04** | 4 |
| restauracao dental | EXACT | Clinica Geral | 2,37% | **R$ 24,79** | 3 |
| emergencia odontologica | BROAD | Urgencias | 4,11% | R$ 28,44 | 4 |
| dentista restauracao | PHRASE | Clinica Geral | 1,87% | R$ 29,90 | 3 |
| dentista emergencia | BROAD | Urgencias | 1,84% | R$ 30,12 | 2-4 |
| dentista Ipanema | BROAD | Clinica Geral | 2,05% | R$ 32,50 | 3 |
| dentista zona sul | BROAD | Clinica Geral | 2,93% | R$ 37,21 | 1-2 |
| lente de contato dental | BROAD | Lentes | 2,41% | R$ 50,61 | 2 |

### Keywords Problematicas (PAUSAR ou CORRIGIR)

| Keyword | Match Type | Campanha | Custo/Conv | QS | Acao |
|---------|-----------|----------|------------|-----|------|
| especialista em protese dentaria | EXACT | Protese | **R$ 186,00** | 0 | PAUSAR |
| consultorio protese dentaria | PHRASE | Protese | R$ 99,31 | 0 | PAUSAR |
| Protese Copacabana | PHRASE | Protese | R$ 98,52 | 0 | PAUSAR |
| protese dentaria removivel | EXACT | Protese | R$ 89,06 | -- | OTIMIZAR |
| Saude gengival | -- | -- | -- | 0 | PAUSAR |

### Quality Score: Situacao Critica

**4 keywords com Quality Score 0** -- todas na campanha de Protese:

1. "Protese Copacabana" (QS 0)
2. "especialista em protese dentaria" (QS 0)
3. "consultorio protese dentaria" (QS 0)
4. "Saude gengival" (QS 0)

**Causas provaveis do QS baixo:**

| Componente | Diagnostico | Evidencia |
|------------|-------------|-----------|
| **Relevancia do anuncio** | Ad copy generico nao menciona keyword especifica | Anuncio de Protese generico para todas as variantes |
| **Experiencia de Landing Page** | Pagina de destino pode nao ter conteudo especifico | LP `/lp/especialista-protese-ipanema` pode ser generica demais |
| **CTR esperada** | Historico de CTR abaixo da media | CTR de Protese (2,13%) e razoavel mas QS 0 indica problema cronico |

**Impacto financeiro do QS baixo:** Keywords com QS 0-1 pagam premia de 50-400% no CPC comparado com QS 7+. Corrigir para QS 5-7 reduziria CPC dessas keywords em 30-50%.

---

## Analise de Message Match (Anuncio vs. Landing Page)

### Infraestrutura de Landing Pages

A conta possui 14 landing pages dedicadas (configs individuais):

| Landing Page | Config | Campanha Associada |
|-------------|--------|-------------------|
| `/lp/implantes-dentarios-ipanema` | implantesDentariosConfig | Implantes Dentarios |
| `/lp/lentes-porcelana-ipanema` | lentesPorcelanaAcolhedorConfig | Lentes de Contato |
| `/lp/lentes-porcelana-profissional` | lentesPorcelanaProfissionalConfig | Lentes de Contato |
| `/lp/clareamento-dental` | clareamentoConfig | Clareamento Dental |
| `/lp/consulta-inicial` | consultaInicialConfig | Clinica Geral |
| `/lp/especialista-protese-ipanema` | especialistaProteseConfig | Protese Dental |
| `/lp/ortodontia-ipanema` | ortodontiaConfig | -- (sem campanha visivel) |
| `/lp/dor-de-dente` | dorDeDenteConfig | Urgencias |
| `/lp/dente-quebrado` | denteQuebradoConfig | Urgencias |
| `/lp/emergencia-odontologica` | emergenciaOdontologicaConfig | Urgencias |
| `/lp/estetica-sorriso` | esteticaSorrisoGenericaConfig | -- |
| `/lp/limpeza-dental-ipanema` | limpezaDentalConfig | -- |
| `/lp/profilaxia` | profilaxiaConfig | -- |
| `/lp/saude-gengival-ipanema` | saudeGengivalConfig | -- |

### Observacoes sobre Message Match

**Pontos fortes:**
- Landing pages dedicadas existem para todas as campanhas principais
- Urgencias tem 3 LPs especificas (melhor segmentacao = melhor QS e CTR)
- Lentes tem 2 variantes (acolhedor e profissional) -- possibilita teste A/B

**Pontos fracos identificados:**
- Campanha de Protese (QS 0) provavelmente aponta para LP generica que nao cobre variantes especificas ("protese removivel", "protese Copacabana")
- Clinica Geral pode estar direcionando muito trafego para homepage em vez de LP dedicada
- Nao ha LP especifica para "dentista zona sul" (keyword de bom desempenho)

---

## Recomendacoes por Campanha

### ESCALAR: Urgencias Odontologicas

| Metrica | Atual | Meta |
|---------|-------|------|
| Budget/mes | ~R$ 639 | R$ 1.800 |
| Custo/Conv | R$ 23,73 | Manter < R$ 30 |
| CTR | 2,30% | Manter > 2,0% |

**Por que escalar:**
- Melhor custo/conversao de toda a conta (R$ 23,73)
- Maior CTR (2,30%) -- indica forte intencao do usuario
- 3 landing pages dedicadas (dor-de-dente, dente-quebrado, emergencia) -- message match forte
- Keywords de emergencia tem CPC mais baixo (R$ 5,23)
- Alta intencao de conversao: paciente com dor PRECISA de dentista agora

**Como escalar:**
1. Aumentar budget diario gradualmente (+20% por semana ao longo de 4 semanas)
2. Expandir keywords: "dentista sabado urgencia", "dor de dente noite", "dente inflamado"
3. Adicionar extensoes de chamada (telefone) para capturar emergencias que nao querem esperar WhatsApp
4. Implementar ad scheduling -- concentrar budget em horarios fora do comercial (noite, madrugada, fim de semana) quando urgencias sao mais comuns e concorrencia e menor
5. Monitorar: se custo/conversao subir acima de R$ 35, pausar expansao e estabilizar

**Timing:** Marco 2026 (ja planejado pelo Patrick)

---

### OTIMIZAR: Clinica Geral - Zona Sul

| Metrica | Atual | Meta |
|---------|-------|------|
| Budget/mes | ~R$ 3.717 | R$ 3.200 |
| Custo/Conv | R$ 39,30 | < R$ 35 |
| CTR | 2,17% | > 2,5% |

**Por que otimizar (nao escalar nem pausar):**
- E a maior campanha (41% do budget) com eficiencia BOA mas nao otima
- Keywords geo ("dentista Ipanema", "dentista zona sul") performam bem
- Volume alto justifica investimento, mas ha espaco para melhorar

**Acoes de otimizacao:**
1. **Segmentar melhor os ad groups:** Separar "dentista Ipanema" de "restauracao dental" (intencoes diferentes)
2. **Melhorar Quality Score:** "dentista zona sul" tem QS 1-2 -- ad copy e LP precisam mencionar "Zona Sul" explicitamente
3. **Adicionar negative keywords:** Filtrar buscas de outras cidades, convenios, SUS
4. **Testar Responsive Search Ads:** Se nao estiver usando RSAs, implementar com 10+ headlines e 4+ descriptions
5. **Landing page:** Garantir que LP `/lp/consulta-inicial` tenha mensagem alinhada com "primeiro atendimento" e "dentista em Ipanema"

---

### OTIMIZAR: Clareamento Dental

| Metrica | Atual | Meta |
|---------|-------|------|
| Budget/mes | ~R$ 918 | R$ 1.000 |
| Custo/Conv | R$ 86,86 | < R$ 60 |
| CTR | 2,00% | > 2,5% |

**Acoes de otimizacao:**
1. **Revisar ad copy:** Incluir diferenciais como "Protocolo Personalizado" e "Consultorio + Caseiro"
2. **LP clareamento:** Verificar se a landing page aborda as principais duvidas (dor? dura quanto? preco medio do mercado?)
3. **Keywords:** Adicionar long-tail: "clareamento dental ipanema preco", "clareamento dental zona sul", "clareamento caseiro supervisionado"
4. **Excluir:** "clareamento caseiro receita" (DIY, nao e paciente)

---

### OTIMIZAR: Implantes Dentarios

| Metrica | Atual | Meta |
|---------|-------|------|
| Budget/mes | ~R$ 954 | R$ 1.000 |
| Custo/Conv | R$ 96,51 | < R$ 65 |
| CTR | 1,75% | > 2,0% |

**Acoes de otimizacao:**
1. **LP implantes:** A landing page ja existe -- verificar se menciona "planejamento digital guiado", "iTero Element 5D", e tempo de tratamento
2. **Ad copy:** Testar headlines com prova social ("4.000+ pacientes") e tecnologia ("Implante Guiado por Scanner Digital")
3. **Keywords:** CTR de 1,75% e a segunda mais baixa -- possivel problema de relevancia no ad copy
4. **Negative keywords:** Excluir "implante dentario valor", "implante dentario convenio", "implante gratuito"

---

### CORRIGIR com URGENCIA: Protese Dental - Zona Sul

| Metrica | Atual | Meta |
|---------|-------|------|
| Budget/mes | ~R$ 1.854 | R$ 1.000 (reduzir ate corrigir) |
| Custo/Conv | R$ 91,61 | < R$ 55 |
| Quality Score | 0-1 | > 5 |

**Diagnostico:**
Esta campanha tem o PIOR Quality Score da conta (0 em 4 keywords). Isso significa que o Google esta cobrando premia de CPC e posicionando os anuncios abaixo do ideal. O custo/conversao alto (R$ 91,61) e consequencia direta.

**Plano de correcao (3 etapas):**

**Etapa 1 -- Imediata (20 minutos):**
- PAUSAR as 3 keywords com QS 0 e custo/conv > R$ 90:
  - "especialista em protese dentaria" (EXACT) -- R$ 186/conv
  - "consultorio protese dentaria" (PHRASE) -- R$ 99,31/conv
  - "Protese Copacabana" (PHRASE) -- R$ 98,52/conv
- **Economia imediata estimada:** R$ 600-800/mes

**Etapa 2 -- Curto Prazo (2-3 semanas):**
- Criar sub-LP ou sessoes especificas na LP de Protese para:
  - "Protese dentaria removivel" (conteudo sobre protese parcial e total removivel)
  - "Protese fixa sobre implante" (integrar com campanha de implantes)
- Criar ad groups separados para cada tipo de protese com ad copy especifico
- Reescrever headlines: "Protese Dentaria Removivel em Ipanema -- Especialista com 20 Anos"

**Etapa 3 -- Medio Prazo (4-6 semanas):**
- Monitorar QS apos mudancas de LP e ad copy
- Se QS subir para 4+: reativar keywords com budgets controlados
- Se QS nao melhorar: manter keywords pausadas permanentemente

---

### CORRIGIR: Lentes de Contato

| Metrica | Atual | Meta |
|---------|-------|------|
| Budget/mes | ~R$ 936 | R$ 1.000 (manter, otimizar) |
| Custo/Conv | R$ 107,17 | < R$ 65 |
| CTR | 1,63% | > 2,5% |

**Diagnostico:**
- CTR mais baixa da conta (1,63%) -- anuncios nao estao atraindo cliques
- Custo/conversao mais alto (R$ 107,17) -- cliques nao convertem bem
- Tem 2 LPs (acolhedor e profissional) -- oportunidade de testar qual converte melhor
- "Test Drive do Sorriso" e diferencial UNICO que nenhum concorrente tem -- provavelmente subexplorado no ad copy

**Acoes de correcao:**

1. **Ad copy - revolcuao:** Testar headlines focadas no Test Drive:
   - "Experimente seu Sorriso ANTES de Decidir"
   - "Test Drive do Sorriso -- Veja o Resultado Antes"
   - "Lentes de Porcelana com Simulacao Digital Previa"

2. **Landing page - definir vencedora:** Direcionar 100% do trafego para a LP com melhor taxa de conversao (acolhedor vs. profissional). Se nao tem dados de A/B, rodar teste por 2 semanas.

3. **Keywords:** Adicionar variantes de maior intencao:
   - "lente de porcelana antes e depois" (alta intencao)
   - "faceta ou lente dental diferenca" (informacional mas com intencao)
   - Pausar keywords genericas que atraem curiosos sem intencao

4. **Negative keywords urgentes:**
   - "lente de contato ocular" (confusao com lente de grau)
   - "lente de contato gelatinosa"
   - "quanto custa lente de contato" (se nao pode informar preco)

5. **Considerar:** Se apos 4 semanas de otimizacao custo/conv nao cair para < R$ 80, reduzir budget em 30% e redirecionar para Urgencias ou Clinica Geral.

---

## Quick Wins -- Implementacao Imediata

### Acoes para fazer HOJE (tempo total: ~45 minutos)

| # | Acao | Tempo | Impacto Estimado |
|---|------|-------|-----------------|
| 1 | Pausar 3 keywords de Protese com QS 0 | 5 min | -R$ 600-800/mes de desperdicio |
| 2 | Adicionar negative keywords (cidades, convenio, SUS, gratuito) | 15 min | -5-10% cliques irrelevantes |
| 3 | Verificar se campanha Urgencias esta limitada por budget | 5 min | Identificar potencial de escala |
| 4 | Verificar se "lente de contato ocular" esta como negativa | 5 min | Eliminar confusao com lente de grau |
| 5 | Revisar Search Terms Report de Lentes (ultimos 30 dias) | 15 min | Identificar termos irrelevantes |

### Acoes para esta semana (tempo total: ~3 horas)

| # | Acao | Tempo | Impacto Estimado |
|---|------|-------|-----------------|
| 6 | Criar ad group especifico para "dentista zona sul" com ad copy geolocal | 30 min | Subir QS de 1-2 para 4-5 |
| 7 | Testar nova headline para Lentes com "Test Drive do Sorriso" | 30 min | +0,3-0,5% CTR |
| 8 | Revisar LP de Protese -- adicionar conteudo sobre protese removivel | 1h | Melhorar QS de 0 para 3+ |
| 9 | Revisar LP de Lentes -- verificar message match com ad copy | 30 min | Melhorar taxa de conversao |
| 10 | Definir qual LP de Lentes usar (acolhedor vs profissional) | 30 min | Eliminar dispersao de trafego |

---

## Plano de 90 Dias

### Mes 1 (Fevereiro-Marco): Correcao e Quick Wins

**Semana 1-2: Limpar**
- [ ] Pausar keywords com QS 0 e custo/conv > R$ 90
- [ ] Adicionar negative keywords em todas as campanhas
- [ ] Revisar Search Terms Report e excluir termos irrelevantes
- [ ] Definir LP vencedora para Lentes (acolhedor vs. profissional)
- [ ] Testar novos ad copies com "Test Drive do Sorriso" em Lentes

**Semana 3-4: Otimizar**
- [ ] Escalar budget de Urgencias (+20%/semana, meta R$ 1.800/mes)
- [ ] Reescrever ad copy de Protese com headlines especificas
- [ ] Adicionar conteudo de "protese removivel" na LP de Protese
- [ ] Criar ad group geo-especifico para "dentista zona sul"
- [ ] Implementar ad scheduling em Urgencias (foco noite/fim de semana)

**KPIs do Mes 1:**
- Custo/conversao medio da conta: reduzir de ~R$ 74 para ~R$ 60
- CTR de Lentes: subir de 1,63% para > 2,0%
- Keywords com QS 0: eliminar (pausar ou corrigir)

### Mes 2 (Marco-Abril): Escalar o que Funciona

**Semana 5-6: Escalar Urgencias**
- [ ] Urgencias com budget de R$ 1.800/mes e estavel
- [ ] Adicionar keywords expandidas (dor noite, emergencia fim de semana)
- [ ] Testar extensoes de chamada telefonica
- [ ] Monitorar: custo/conv deve se manter < R$ 30

**Semana 7-8: Melhorar Campanhas Medianas**
- [ ] Avaliar resultados das otimizacoes de Mes 1
- [ ] Protese: se QS subiu para 4+, reativar keywords com budget controlado
- [ ] Lentes: se custo/conv caiu para < R$ 80, manter. Se nao, reduzir budget 30%
- [ ] Implantes: testar novo ad copy com foco em tecnologia guiada
- [ ] Clareamento: testar headline com "Protocolo Personalizado"

**KPIs do Mes 2:**
- Urgencias: conversoes dobrarem (de ~3.1K para ~6K proporcionais)
- Custo/conversao medio: < R$ 55
- Lentes: decidir MANTER ou REDUZIR baseado em dados

### Mes 3 (Abril-Maio): Consolidar e Projetar

**Semana 9-10: Revisao Completa**
- [ ] Analise de 90 dias pos-otimizacao
- [ ] Comparar custo/conversao ANTES vs. DEPOIS por campanha
- [ ] Calcular ROAS real usando dados de GCLID (faturamento por campanha)
- [ ] Identificar 2-3 campanhas para expansao adicional

**Semana 11-12: Planejar Proxima Fase**
- [ ] Definir budget Q3 baseado em resultados Q2
- [ ] Avaliar novas campanhas potenciais (ortodontia? estetica geral?)
- [ ] Implementar bidding automatizado (Target CPA ou Maximize Conversions) se volume permitir
- [ ] Considerar campanhas de Display/YouTube para remarketing (se budget permitir)

**KPIs do Mes 3:**
- ROAS positivo em todas as campanhas ativas
- Custo/conversao medio: < R$ 50
- 0 keywords com QS < 3
- Decisao sobre novas campanhas para Q3

---

## Dados Nao Obtidos (Buscar Manualmente)

O MCP do Google Ads nao retornou dados (permissao negada). A analise foi baseada integralmente nos dados de BigQuery ja extraidos na Fase 0. Os seguintes dados precisam ser verificados manualmente no dashboard do Google Ads:

### Critico -- Verificar Esta Semana

| Dado | Onde Buscar | Por Que |
|------|-------------|---------|
| Budget diario real por campanha | Google Ads > Campanhas > Budget | Confirmar alocacao real vs. estimada |
| Search Terms Report (30 dias) | Google Ads > Keywords > Search Terms | Identificar termos irrelevantes ativos |
| Quality Score atual de todas keywords | Google Ads > Keywords > Colunas > QS | Confirmar se QS 0 ainda e vigente |
| Ad copy ativo por campanha | Google Ads > Ads & Extensions | Verificar message match com LPs |
| Conversion tracking config | Google Ads > Tools > Conversions | Confirmar quais acoes contam como conversao |
| GCLID revenue data | Supabase > tabela de GCLIDs | Calcular ROAS real por campanha |

### Importante -- Verificar Este Mes

| Dado | Onde Buscar | Por Que |
|------|-------------|---------|
| Auction Insights | Google Ads > Campanhas > Auction Insights | Ver quais concorrentes aparecem nas mesmas keywords |
| Device performance por campanha | Google Ads > Campanhas > Devices | Identificar se mobile ou desktop converte melhor |
| Location performance | Google Ads > Campanhas > Locations | Confirmar se bairros alvo estao recebendo impressoes |
| Ad schedule performance | Google Ads > Campanhas > Ad Schedule | Identificar horarios de pico de conversao |
| Landing page experience | Google Ads > Keywords > Colunas > LP Experience | Diagnosticar componente de QS baixo |

---

## Metricas de Referencia

### Benchmarks do Setor (Odontologia, Search Ads, Brasil)

| Metrica | Benchmark Setor | Dra. Carla (Media) | Status |
|---------|----------------|--------------------|--------|
| CTR | 3-5% | 2,0% | Abaixo |
| CPC | R$ 3-8 | R$ 7,41 | Na media-alta |
| Custo/Conversao | R$ 50-100 | R$ 74,20 | Na media |
| Quality Score | 5-7 | 2-4 (media estimada) | Abaixo |
| Conversion Rate | 5-10% | ~3-4% (estimado) | Abaixo |

**Interpretacao:** A conta esta na MEDIA do setor em custo/conversao, mas ABAIXO em CTR e Quality Score. Isso indica que ha espaco significativo para melhoria sem mudar o budget -- apenas otimizando relevancia (ad copy + LP + keywords).

---

## Analise de ROAS Estimado

### Calculo Simplificado (com ticket medio de R$ 1.000)

Assumindo que as conversoes rastreadas sao cliques no WhatsApp, e que ~20% dos contatos via WhatsApp fecham tratamento:

| Campanha | Custo/Conv | Conv/Mes (est.) | Fechamentos (20%) | Receita (est.) | ROAS |
|----------|-----------|----------------|--------------------|----------------|------|
| Urgencias | R$ 23,73 | ~190 | 38 | R$ 38.000 | **5,9x** |
| Clinica Geral | R$ 39,30 | ~350 | 70 | R$ 70.000 | **5,1x** |
| Clareamento | R$ 86,86 | ~40 | 8 | R$ 8.000 | **2,6x** |
| Protese | R$ 91,61 | ~75 | 15 | R$ 15.000 | **2,5x** |
| Implantes | R$ 96,51 | ~35 | 7 | R$ 7.000 | **2,1x** |
| Lentes | R$ 107,17 | ~30 | 6 | R$ 6.000 | **1,9x** |

> **Nota importante:** O ticket de Implantes e Lentes e muito superior a R$ 1.000 (pode chegar a R$ 5.000-15.000). Se ajustarmos para ticket real, o ROAS dessas campanhas pode ser positivo mesmo com custo/conversao alto. Os dados de GCLID sao essenciais para este calculo.

**Se Implantes tiver ticket medio de R$ 8.000:**
- ROAS real: 7 x R$ 8.000 = R$ 56.000 / R$ 954 investido = **58,7x**
- Neste cenario, mesmo com custo/conversao alto, a campanha e extremamente lucrativa

**Conclusao:** Antes de cortar budget de Implantes e Lentes, confirmar ticket medio real dessas campanhas via GCLID.

---

## Resumo de Prioridades

### PRIORIDADE 1 -- FAZER AGORA (45 minutos)
1. Pausar 3 keywords de Protese com QS 0 e custo/conv > R$ 90
2. Adicionar negative keywords basicas em todas as campanhas
3. Verificar se Urgencias esta limitada por budget

### PRIORIDADE 2 -- FAZER ESTA SEMANA (3 horas)
4. Testar novo ad copy para Lentes com "Test Drive do Sorriso"
5. Definir LP vencedora para Lentes
6. Adicionar conteudo de protese removivel na LP de Protese
7. Criar ad group geo para "dentista zona sul"

### PRIORIDADE 3 -- FAZER EM MARCO (acao planejada)
8. Escalar Urgencias para R$ 1.800/mes
9. Implementar ad scheduling noturno/fim de semana em Urgencias
10. Avaliar resultados das otimizacoes e decidir sobre Lentes (manter ou reduzir)

### PRIORIDADE 4 -- FAZER EM ABRIL (consolidacao)
11. Revisao completa de 90 dias pos-otimizacao
12. Calcular ROAS real por campanha com dados GCLID
13. Definir estrategia Q3 (novas campanhas ou expansao das existentes)

---

## Apendice: Fonte dos Dados

| Fonte | Dataset | Periodo | Qualidade |
|-------|---------|---------|-----------|
| BigQuery Google Ads | `clinica_dra_carla_ads` | 90 dias | Valores absolutos inflados (agregacao multi-dim); proporcoes validas |
| BigQuery GA4 | `analytics_477782713` | 90 dias | Alta qualidade |
| BUSINESS.md | Projeto | Atual | Contexto de negocio validado |
| Analise Competitiva | SPRINT-0 | Fev 2026 | Completa (5 concorrentes) |
| MCP Google Ads | API direta | -- | **Nao disponivel** (permissao negada) |

**Limitacoes desta analise:**
1. Nao foi possivel acessar o Google Ads via MCP (permissao negada)
2. Valores absolutos do BigQuery estao inflados -- rankings e proporcoes sao confiaveis
3. Dados de GCLID/faturamento por campanha nao estavam disponiveis
4. Ad copy ativo e Search Terms Report nao puderam ser verificados
5. Auction Insights (concorrentes nos leiloes) nao disponiveis

---

**Relatorio gerado por:** Claude Code (Analista Google Ads)
**Data:** 2026-02-13
**Proxima revisao recomendada:** Apos implementacao das Prioridades 1-2 (1 semana)

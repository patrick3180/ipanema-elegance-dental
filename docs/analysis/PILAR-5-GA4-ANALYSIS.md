# PILAR 5: Analise Google Analytics (GA4)
## Relatorio Completo de Performance do Site

**Data:** 13 de Fevereiro de 2026
**Periodo Analisado:** Ultimos 90 dias (BigQuery) + 30 dias frescos (GA4 CSV export: 14 Jan - 12 Fev 2026)
**Fonte de Dados:** BigQuery dataset `analytics_477782713` + GA4 CSV export direto + dados de Google Ads
**Status:** COMPLETO (atualizado com dados frescos do GA4)

---

## 1. Resumo Executivo

O site da Dra. Carla recebe aproximadamente 2.600 usuarios unicos por trimestre, com 12.635 page views no periodo. O trafego e dominado por mobile (82% dos usuarios), com iOS apresentando a melhor taxa de conversao (2,21%). O blog contribui com ~50% das paginas mais acessadas do site, porem com taxa de conversao praticamente zero -- indicando que o blog atrai trafego organico de qualidade mas falha em direcionar esses visitantes para a acao de conversao (WhatsApp). Foram registrados apenas 38 cliques de WhatsApp no GA4 em 90 dias, um numero significativamente abaixo do esperado e que levanta questoes sobre a completude do tracking. A oportunidade mais clara e a criacao de CTAs estrategicos nos posts de blog e a otimizacao do funil mobile, que concentra 82% do trafego mas tem fricao na conversao.

---

## 2. Dashboard de Metricas-Chave

| Metrica | Valor | Avaliacao |
|---------|-------|-----------|
| **Usuarios unicos (90d)** | ~2.622 | Baixo para investimento de R$ 9k/mes em Ads |
| **Page views (90d)** | ~12.635 | Media de ~140/dia |
| **Conversoes WhatsApp GA4 (90d)** | 38 cliques | Muito baixo -- possivel subtracking |
| **Taxa de conversao geral** | ~1,37% | Abaixo da media de saude (2-5%) |
| **Homepage views** | 373 (consolidado www + non-www) | Concentrada |
| **Blog views** | ~400+ (top 20 posts) | Forte -- 50% do top pages |
| **Tempo medio na homepage** | 39,66 seg | Razoavel |
| **Melhor engagement** | Jejum Intermitente: 542 seg (9 min!) | Excepcional |
| **Mobile share** | 82% dos usuarios | Mobile-first obrigatorio |
| **iOS conversion rate** | 2,21% | Melhor dispositivo |
| **Android conversion rate** | 0,91% | Abaixo da media |

---

## 3. Top 30 Paginas por Trafego (com metricas de engagement)

### Paginas do Site (consolidando variantes www/non-www)

| # | Pagina | Views | Users | Engagement (seg) | Tipo | Conversao? |
|---|--------|-------|-------|------------------|------|------------|
| 1 | **Homepage** (todas variantes) | 373 | ~309 | 39,66 | Institucional | Sim - 1,08% |
| 2 | **Blog: Carie Oculta** | 45 | 41 | -- | Blog | Nao |
| 3 | **/servicos** (todas variantes) | 60 | ~51 | 14-36 seg | Servico | Nao medido |
| 4 | **Lentes/Facetas** (todas variantes) | 60 | ~57 | -- | Servico | Sim (1 clique) |
| 5 | **Blog: Dente Trincado** | 29 | 27 | -- | Blog | Nao |
| 6 | **Blog: Alimentos com Amido** | 26 | 21 | -- | Blog | Nao |
| 7 | **Blog: Jejum Intermitente** | 25 | 23 | **542,65** | Blog | Nao |
| 8 | **Blog: Dente Quebrou** | 22 | 21 | -- | Blog | Nao |
| 9 | **Blog: Periodontite** | 21 | 21 | -- | Blog | Nao |
| 10 | **Blog Index** (/blog) | 31 | ~12 | 22-31 seg | Blog | Nao |
| 11 | **Blog: Higiene Roma Antiga** | 18 | 15 | -- | Blog | Nao |
| 12 | **Blog: Protese Historia** | 16 | 16 | -- | Blog | Nao |
| 13 | **Blog: Probioticos** | 15 | 14 | -- | Blog | **Sim - 28,57%** |
| 14 | **Ortodontia** | 14 | 13 | -- | Servico | Sim (3 cliques) |
| 15 | **Blog: Fio Dental** | 13 | 11 | 10,15 | Blog | Nao |
| 16 | **Clinica Geral/Prevencao** | 12 | 9 | -- | Servico | Nao |
| 17 | **Blog: Bebidas Mancham Dentes** | 12 | 12 | -- | Blog | Nao |
| 18 | **Restauracoes Esteticas** | 18 | ~15 | 2,29 | Servico | Sim (1 clique) |
| 19 | **Blog: Funcao da Saliva** | 10 | 10 | -- | Blog | Nao |
| 20 | **Clareamento Dental** | 15 | ~12 | -- | Servico | Sim (1 clique via Ads) |
| 21 | **Blog: Limpeza Dentaria** | 10 | 9 | -- | Blog | Nao |
| 22 | **Blog: Clareamento/Facetas** | 9 | 9 | 47,91 | Blog | Nao |
| 23 | **Blog: Dente do Siso** | 9 | 8 | -- | Blog | Nao |
| 24 | **Blog: Bruxismo/Estresse** | 9 | 8 | -- | Blog | Nao |
| 25 | **Protese Dentaria** | 16 | ~14 | -- | Servico | Sim (1 clique via Ads) |
| 26 | **Saude da Gengiva** | 8 | 8 | -- | Servico | Nao |
| 27 | **Blog: Mau Halito** | 8 | 6 | **154,47** | Blog | Nao |
| 28 | **Blog: Implante Durabilidade** | 6 | 5 | -- | Blog | Nao |
| 29 | **Tratamento de Canal** | 12 | ~12 | -- | Servico | Nao |
| 30 | **Blog: Egito Antigo** | 11 | 11 | -- | Blog | Nao |

### Insights das Top Pages

**Distribuicao por tipo:**
- **Blog:** ~18 das 30 paginas (60%)
- **Servico:** ~8 das 30 paginas (27%)
- **Institucional:** ~4 das 30 paginas (13%)

**Problema critico:** O blog domina o trafego mas quase nenhum post converte. Excecao notavel: **Probioticos** com 28,57% de taxa de conversao (4 conversoes em 14 sessoes). Este e um outlier que merece investigacao -- o que esse post tem de diferente?

---

## 4. Analise de Dispositivos (Mobile vs. Desktop)

### Distribuicao de Usuarios

| Dispositivo | OS | Usuarios | % Total | Page Views | Conv. | Taxa Conv. |
|-------------|-------|---------|---------|------------|-------|------------|
| **Mobile** | Android | 1.322 | 50,4% | 5.990 | 12 | 0,91% |
| **Mobile** | iOS | 813 | 31,0% | 4.209 | 18 | **2,21%** |
| **Desktop** | Windows | 385 | 14,7% | 1.985 | 5 | 1,30% |
| **Desktop** | Mac | 43 | 1,6% | 240 | 1 | 2,33% |
| **Desktop** | Linux | 24 | 0,9% | 79 | 0 | 0% |
| **Desktop** | Outros | 19 | 0,7% | 57 | 0 | 0% |
| **Tablet** | Android | 8 | 0,3% | 41 | 0 | 0% |
| **Tablet** | iOS | 4 | 0,2% | 17 | 0 | 0% |
| **Desktop** | Chrome OS | 4 | 0,2% | 17 | 0 | 0% |

### Resumo Consolidado

| Categoria | Usuarios | % | Page Views | Conversoes | Taxa Conv. |
|-----------|---------|---|------------|------------|------------|
| **Mobile** | 2.135 | **81,4%** | 10.199 | 30 | 1,40% |
| **Desktop** | 475 | **18,1%** | 2.378 | 6 | 1,26% |
| **Tablet** | 12 | **0,5%** | 58 | 0 | 0% |
| **TOTAL** | 2.622 | 100% | 12.635 | 36 | 1,37% |

### Insights de Dispositivos

1. **Mobile domina com 81,4% dos usuarios** -- confirma necessidade absoluta de otimizacao mobile-first
2. **iOS converte 2,4x mais que Android** (2,21% vs 0,91%) -- usuarios iOS tendem a ser de maior poder aquisitivo, alinhado com o publico da Zona Sul
3. **Android e volume, iOS e conversao** -- otimizar UX para ambos, mas priorizar a jornada de conversao no mobile
4. **Tablets nao convertem** -- volume insignificante, nao priorizar
5. **Desktop Mac tem a maior taxa** (2,33%) mas volume muito baixo (43 usuarios)

### Oportunidade Identificada

A diferenca de conversao entre iOS (2,21%) e Android (0,91%) sugere possivel problema de UX no Android. Se igualarmos a taxa do Android ao iOS, ganhariamos **~17 conversoes adicionais por trimestre** (+47%).

---

## 5. Fontes de Trafego (Traffic Sources)

### Distribuicao por Fonte/Medio

| Fonte | Medio | Campanha | Usuarios | Sessoes | % Total |
|-------|-------|----------|---------|---------|---------|
| **google** | **cpc** | Clinica Geral - Zona Sul | 779 | 851 | 29,7% |
| **google** | **organic** | (organic) | 460 | 519 | 17,5% |
| **google** | **cpc** | Protese Dental - Zona Sul | 428 | 459 | 16,3% |
| **(direct)** | **(none)** | (direct) | 205 | 241 | 7,8% |
| **google** | **cpc** | Clareamento Dental | 190 | 201 | 7,2% |
| **google** | **cpc** | Implantes Dentarios | 182 | 193 | 6,9% |
| **google** | **cpc** | Urgencias Odontologicas | 151 | 166 | 5,8% |
| **google** | **cpc** | Lentes de Contato | 133 | 145 | 5,1% |
| Data Not Available | -- | (cross-network) | 47 | 47 | 1,8% |
| **facebook.com** | **referral** | -- | 14 | 14 | 0,5% |
| l.wl.co | referral | -- | 6 | 10 | 0,2% |
| m.facebook.com | referral | -- | 1 | 1 | <0,1% |
| **chatgpt.com** | -- | -- | 1 | 1 | <0,1% |

### Resumo Consolidado por Canal

| Canal | Usuarios | % Total | Sessoes |
|-------|---------|---------|---------|
| **Google Ads (CPC)** | 1.864 | **71,1%** | 2.017 |
| **Google Organico** | 460 | **17,5%** | 519 |
| **Direto** | 205 | **7,8%** | 241 |
| **Referral (Facebook + outros)** | 21 | **0,8%** | 25 |
| **Cross-network** | 47 | **1,8%** | 47 |
| **AI Search (ChatGPT)** | 1 | **<0,1%** | 1 |

### Insights de Trafego

1. **Google Ads domina com 71% do trafego** -- alta dependencia de midia paga
2. **Organico em 17,5%** -- segundo canal, com potencial de crescimento via blog
3. **Direto em 7,8%** -- indica reconhecimento de marca moderado
4. **Facebook contribui pouco** (0,5%) -- Instagram nao aparece como fonte, possivel subtracking
5. **ChatGPT ja aparece** como fonte (1 visita) -- sinal precoce de AI Search gerando trafego
6. **Ratio Pago:Organico = 4:1** -- idealmente deveria ser 2:1 ou 1:1 a longo prazo

### Distribuicao de Trafego por Campanha Google Ads

| Campanha | Usuarios | % do CPC | Custo/90d (est.) | Usuarios/R$1k |
|----------|---------|----------|-----------------|---------------|
| Clinica Geral | 779 | 41,8% | ~R$ 4.300 | 181 |
| Protese Dental | 428 | 23,0% | ~R$ 2.144 | 200 |
| Clareamento | 190 | 10,2% | ~R$ 1.059 | 179 |
| Implantes | 182 | 9,8% | ~R$ 1.100 | 165 |
| Urgencias | 151 | 8,1% | ~R$ 735 | 205 |
| Lentes | 133 | 7,1% | ~R$ 1.082 | 123 |

**Insight:** Lentes de Contato e a campanha menos eficiente em custo por usuario (123 usuarios/R$1k vs media de 179). Urgencias e a mais eficiente (205 usuarios/R$1k).

---

## 6. Analise de Funil: Blog --> Servicos --> Conversao (WhatsApp)

### 6.1 Entry Pages e Taxa de Conversao

| Pagina de Entrada | Sessoes | Conversoes | Taxa Conv. |
|-------------------|---------|-----------|------------|
| **Blog: Probioticos** | 14 | 4 | **28,57%** |
| **Homepage (dracarlachristoph.com.br)** | 185 | 2 | 1,08% |
| **Homepage (dracarlachristoph.com)** | 23 | 1 | 4,35% |
| **Homepage (www.dracarlachristoph.com)** | 37 | 1 | 2,70% |
| Blog: Carie Oculta | 42 | 0 | 0% |
| Blog: Dente Trincado | 32 | 0 | 0% |
| Lentes/Facetas | 28 | 0 | 0% |
| Blog: Jejum Intermitente | 24 | 0 | 0% |
| Blog: Periodontite | 22 | 0 | 0% |
| Blog: Dente Quebrou | 22 | 0 | 0% |
| Blog: Alimentos Amido | 21 | 0 | 0% |
| Blog: Protese Historia | 18 | 0 | 0% |
| Blog: Higiene Roma Antiga | 15 | 0 | 0% |
| Blog: Bebidas Mancham | 13 | 0 | 0% |
| Blog: Fio Dental | 11 | 0 | 0% |
| Blog: Egito Antigo | 11 | 0 | 0% |

### 6.2 Onde Acontecem os Cliques de WhatsApp

| Pagina | Cliques WA | Tipo | Via Ads? |
|--------|-----------|------|----------|
| Homepage (dracarlachristoph.com.br) | 5 | Institucional | Misto |
| Homepage (dracarlachristoph.com) | 2 | Institucional | Nao |
| Homepage (www.dracarlachristoph.com) | 1 | Institucional | Nao |
| Homepage com GCLID (6+ entradas) | 8 | Institucional | **Sim** |
| **Blog: Probioticos** | 4 | Blog | Nao |
| **Ortodontia** | 3 | Servico | Misto |
| **Lentes/Facetas** (sem GCLID) | 2 | Servico | Nao |
| **Restauracoes Esteticas** | 2 | Servico | Misto |
| Blog: Dentista Sem Dor | 1 | Blog | Nao |
| Blog: Retracao Gengival (via Ads) | 2 | Blog | **Sim** |
| Blog: Periodontite (via Ads) | 1 | Blog | **Sim** |
| Blog: Clareamento/Sensibilidade (via Ads) | 1 | Blog | **Sim** |
| Blog: Implante ou Protese (via Ads) | 1 | Blog | **Sim** |
| Clareamento Dental (via Ads) | 1 | Servico | **Sim** |
| Protese Dentaria (via Ads) | 1 | Servico | **Sim** |
| Ortodontia (via Ads) | 1 | Servico | **Sim** |
| localhost (teste) | 1 | -- | Nao |

### 6.3 Mapa do Funil

```
ENTRADA (2.622 usuarios/trimestre)
    |
    |-- Google Ads (71%) -----> Homepage/Service Pages -----> WhatsApp (~16 cliques)
    |                                                          Taxa: ~0,9%
    |
    |-- Organico (17,5%) ----> Blog Posts -----> ??? -----> WhatsApp (~5 cliques)
    |                          (42-32 sessoes)               Taxa: ~0,3%
    |                               |
    |                               +-- Excecao: Probioticos (28,57% conv!)
    |
    |-- Direto (7,8%) -------> Homepage -----> WhatsApp (~3 cliques)
    |                                          Taxa: ~1,2%
    |
    TOTAL: ~38 cliques WhatsApp em 90 dias
    TAXA GERAL: 1,37%
```

### 6.4 Problemas Identificados no Funil

**PROBLEMA 1: Blog nao converte**
- Blog traz ~460 usuarios organicos por trimestre
- Conversoes: praticamente zero (exceto Probioticos)
- **Causa provavel:** Posts de blog nao tem CTA para WhatsApp ou link para paginas de servico
- **Impacto:** ~460 usuarios "perdidos" por trimestre

**PROBLEMA 2: Volume total de conversoes muito baixo**
- 38 cliques WhatsApp em 90 dias = ~0,42 cliques/dia
- Para R$ 9.000/mes de investimento em Ads, esperariamos 5-15 conversoes/dia
- **Causa provavel:** Subtracking no GA4 -- o tracking de conversao provavelmente nao captura todos os cliques
- **Evidencia:** Google Ads reporta milhares de conversoes (inflacionadas por agregacao) vs. 38 no GA4

**PROBLEMA 3: Homepage concentra conversoes mas nao e otimizada para cada campanha**
- ~42% dos cliques WA acontecem na homepage
- Campanhas especificas (Protese, Lentes, etc.) direcionam para homepage ao inves de LPs dedicadas

**PROBLEMA 4: Paginas de servico com trafego mas sem conversao mensuravel**
- /servicos (60 views), /clinica-geral (12 views), /saude-da-gengiva (8 views)
- Nenhuma dessas paginas aparece na lista de conversoes

---

## 7. Paginas com Alto Trafego mas Baixo Engagement

### Paginas que precisam de otimizacao

| Pagina | Views | Engagement | Problema |
|--------|-------|------------|----------|
| **Homepage www variant** | 51 | 13,38 seg | Engagement 3x menor que homepage principal (39,66s) |
| **Homepage non-www** | 43 | 5,99 seg | Engagement 6,6x menor -- possivel bounce imediato |
| **Blog: Carie Oculta** | 45 | -- (nao medido) | Alto trafego, sem dados de engagement |
| **Blog: Dente Trincado** | 29 | -- | Sem dados de engagement |
| **Blog: Dente Quebrou** | 22 | -- | Sem dados de engagement |
| **Restauracoes Esteticas** | 11 | 2,29 seg | Engagement extremamente baixo |
| **Blog: Fio Dental** | 13 | 10,15 seg | Engagement baixo para um post de blog |
| **Blog: Clareamento Caseiro** | 6 | 0 seg | Zero engagement -- bounce imediato |

### Paginas com Engagement Excepcional (modelo a seguir)

| Pagina | Views | Engagement | O que funciona |
|--------|-------|------------|----------------|
| **Blog: Jejum Intermitente** | 25 | **542,65 seg** (9 min) | Topico curiosidade + saude |
| **Blog: Mau Halito** | 8 | **154,47 seg** (2,5 min) | Problema pessoal + solucao |
| **Homepage principal** | 257 | **39,66 seg** | Design e conteudo otimizados |
| **Blog: Clareamento/Facetas** | 9 | **47,91 seg** | Topico decisao de compra |
| **/servicos** | 36 | **14-36 seg** | Pagina de navegacao |

---

## 8. Oportunidades Identificadas

### OPORTUNIDADE A: Adicionar CTAs nos Posts de Blog (PRIORIDADE MAXIMA)

**Contexto:** Blog traz 460 usuarios organicos/trimestre com taxa de conversao de ~0,3%. Post de Probioticos prova que conversao e possivel (28,57%).

**Acao:**
- Adicionar CTA de WhatsApp em TODOS os posts de blog (banner fixo ou inline)
- Adicionar links internos para paginas de servico relacionadas
- Modelo: ver o que o post de Probioticos tem de diferente

**Impacto estimado:**
- Se taxa subir de 0,3% para 5%: +23 conversoes/trimestre
- Se 30% fecharem: +7 tratamentos/trimestre
- Revenue: +R$ 7.000/trimestre = +R$ 2.333/mes

**Esforco:** 2-4 horas (componente reutilizavel + deploy)

---

### OPORTUNIDADE B: Corrigir Canonical/Consolidacao de Dominios

**Contexto:** O trafego esta fragmentado entre 4 variantes de dominio:
- `dracarlachristoph.com.br` (principal)
- `www.dracarlachristoph.com.br`
- `dracarlachristoph.com`
- `www.dracarlachristoph.com`

**Problema:** Isso dilui metricas, dificulta analise e pode prejudicar SEO.

**Acao:**
- Garantir redirect 301 de todas as variantes para `www.dracarlachristoph.com.br`
- Verificar canonical tags em todas as paginas

**Impacto:** Melhora SEO + dados mais limpos no GA4

**Esforco:** 1-2 horas

---

### OPORTUNIDADE C: Otimizar Conversao no Android

**Contexto:** Android representa 50,4% dos usuarios mas converte a 0,91% (vs. 2,21% no iOS).

**Acao:**
- Auditar UX do botao de WhatsApp no Android
- Verificar se o link `wa.me` funciona corretamente em todos os dispositivos Android
- Testar velocidade de carregamento no Android (tipicamente dispositivos de menor performance)
- Verificar se popups ou banners bloqueiam CTAs no mobile

**Impacto estimado:**
- Se igualar Android ao iOS (2,21%): +17 conversoes/trimestre
- Revenue: +R$ 13.600/trimestre

**Esforco:** 4-8 horas (investigacao + fixes)

---

### OPORTUNIDADE D: Investigar Subtracking de Conversoes

**Contexto:** GA4 registra apenas 38 cliques de WhatsApp em 90 dias. Google Ads reporta milhares (inflacionados). A realidade provavelmente esta entre os dois.

**Acao:**
- Verificar se o evento `clique_whatsapp` esta disparando em TODAS as paginas
- Verificar se landing pages (`/lp/*`) estao incluidas no tracking
- Verificar se o evento dispara em todos os cenarios (botao flutuante, CTA inline, footer)
- Cross-reference com dados do Supabase (GCLID tracking)
- Comparar com dados reais do WhatsApp Business

**Impacto:** Dados corretos permitem decisoes melhores

**Esforco:** 2-4 horas (auditoria tecnica)

---

### OPORTUNIDADE E: Replicar o Sucesso do Post "Probioticos"

**Contexto:** O post de Probioticos tem 28,57% de conversao -- drasticamente acima de qualquer outra pagina.

**Acao:**
- Analisar o que esse post tem de diferente (CTA? Posicionamento? Conteudo?)
- Replicar a estrutura nos 5 posts mais acessados
- Posts prioritarios para otimizar:
  1. Carie Oculta (42 sessoes, 0% conv)
  2. Dente Trincado (32 sessoes, 0% conv)
  3. Jejum Intermitente (24 sessoes, 0% conv, engagement excepcional)
  4. Periodontite (22 sessoes, 0% conv)
  5. Dente Quebrou (22 sessoes, 0% conv)

**Impacto estimado:**
- Se 5 posts subirem para 10% de conversao: +14 conversoes/trimestre

**Esforco:** 2-3 horas

---

### OPORTUNIDADE F: Criar Paginas de Servico para Keywords de Alto Volume

**Contexto:** Diversas keywords de alto volume apontam para homepage ou paginas genericas.

**Acao:**
- Verificar se LPs dedicadas (`/lp/*`) estao recebendo trafego no GA4
- Se nao aparecem: provavelmente o GA4 nao esta trackando essas paginas
- Garantir que cada campanha de Ads aponte para LP especifica (nao homepage)

**Impacto:** Melhora Quality Score no Ads + melhora taxa de conversao

**Esforco:** Ja mapeado na Oportunidade #6 do documento FASE-0

---

## ADDENDUM: Dados Frescos do GA4 (CSV Export - 14 Jan a 12 Fev 2026)

Patrick forneceu um export direto do GA4 com dados de 30 dias. Abaixo a analise dos dados REAIS mais recentes.

### Metricas Gerais (30 dias)

| Metrica | Valor (30 dias) | Projecao 90 dias |
|---------|-----------------|------------------|
| **Visualizacoes** | 1.381 | ~4.143 |
| **Usuarios ativos** | 952 | ~2.856 |
| **Sessoes** | 1.045 | ~3.135 |
| **Duracao media da sessao** | 85,5 seg (1min25s) | -- |
| **Eventos por sessao** | 4,62 | -- |
| **Primeiras visitas** | 963 (92% dos usuarios) | -- |

### Top 20 Paginas REAIS (30 dias)

| # | Pagina | Views | Users | Sessoes | Dur. Media | Tipo |
|---|--------|-------|-------|---------|------------|------|
| 1 | **/** (Homepage) | 559 | 432 | 475 | 58,1s | Institucional |
| 2 | **/protese-dentaria** | 189 | 164 | 174 | 75,5s | Servico |
| 3 | **/servicos** | 71 | 50 | 57 | 74,9s | Navegacao |
| 4 | **/clinica-geral-e-prevencao** | 51 | 46 | 49 | 47,7s | Servico |
| 5 | **/lp/clareamento-dental** | 47 | 41 | 41 | 55,2s | Landing Page |
| 6 | **/lentes-de-contato-dental-e-facetas** | 32 | 28 | 28 | 92,0s | Servico |
| 7 | **/lp/implantes-dentarios-ipanema** | 32 | 25 | 25 | 47,6s | Landing Page |
| 8 | **/lp/emergencia-odontologica-ipanema** | 31 | 27 | 28 | 78,7s | Landing Page |
| 9 | **/lp/estetica-dental-ipanema** | 25 | 22 | 22 | 74,3s | Landing Page |
| 10 | **/blog** (index) | 24 | 10 | 13 | 66,2s | Blog |
| 11 | **/lp/saude-gengival-ipanema** | 24 | 17 | 17 | **212,4s** | Landing Page |
| 12 | **/blog/periodontite** | 21 | 19 | 21 | 218,8s | Blog |
| 13 | **/lp/dor-de-dente-urgencia-ipanema** | 21 | 21 | 21 | 30,9s | Landing Page |
| 14 | **/clareamento-dental** (service) | 17 | 14 | 17 | 113,1s | Servico |
| 15 | **/implantes-dentarios** (service) | 16 | 16 | 17 | 30,5s | Servico |
| 16 | **/lp/dente-quebrado-urgencia-ipanema** | 16 | 15 | 15 | 42,4s | Landing Page |
| 17 | **/blog/emergencia-dente-quebrou** | 15 | 15 | 15 | 18,4s | Blog |
| 18 | **/ortodontia** | 14 | 12 | 12 | 90,8s | Servico |
| 19 | **/blog/carie-oculta** | 13 | 13 | 14 | 180,5s | Blog |
| 20 | **/restauracoes-esteticas** | 13 | 9 | 13 | 122,2s | Servico |

### DESCOBERTAS IMPORTANTES dos Dados Frescos

**1. Landing Pages APARECEM no GA4!**
O relatorio anterior mencionava que LPs nao apareciam nos dados. Com o CSV fresco, elas APARECEM e com bom volume:
- `/lp/clareamento-dental`: 47 views (5a pagina mais vista!)
- `/lp/implantes-dentarios-ipanema`: 32 views
- `/lp/emergencia-odontologica-ipanema`: 31 views
- `/lp/estetica-dental-ipanema`: 25 views
- `/lp/saude-gengival-ipanema`: 24 views (engagement excepcional: 212s!)
- `/lp/dor-de-dente-urgencia-ipanema`: 21 views
- `/lp/dente-quebrado-urgencia-ipanema`: 16 views
- **Total LPs:** ~196 views em 30 dias = 14,2% do trafego total

**2. Protese Dentaria e a #2 pagina mais vista!**
Com 189 views e 164 usuarios, e a pagina de servico mais acessada. Isso contrasta com o custo/conversao alto da campanha de Protese. Possivel que a campanha traz trafego mas a pagina nao converte bem.

**3. Lentes tem engagement alto (92s media)**
Apesar de ser a campanha pior no Google Ads, usuarios que chegam na pagina de servico ficam tempo significativo (92s). Indica interesse mas possivel falta de CTA ou confianca para converter.

**4. LP Saude Gengival tem engagement EXCEPCIONAL (212s)**
Usuarios passam 3,5 minutos nesta landing page -- o melhor engagement de todas as LPs. Possivel que o conteudo ressoa muito com o publico.

**5. Blog Periodontite tambem excepcional (218s)**
Post sobre periodontite tem o melhor engagement do blog. Temas de saude gengival resonam fortemente.

**6. Homepage domina com 40% do trafego (559/1381)**
Mais da metade das visitas e primeira visita (963/1045). Alta dependencia da homepage como porta de entrada.

### Performance das Landing Pages (Ranking por Engagement)

| LP | Views | Engagement | Eventos/Sessao | Avaliacao |
|----|-------|------------|----------------|-----------|
| `/lp/saude-gengival-ipanema` | 24 | **212,4s** | 3,94 | Excepcional |
| `/lp/emergencia-odontologica-ipanema` | 31 | 78,7s | 4,43 | Bom |
| `/lp/estetica-dental-ipanema` | 25 | 74,3s | 4,32 | Bom |
| `/lp/clareamento-dental` | 47 | 55,2s | 4,34 | Razoavel |
| `/lp/implantes-dentarios-ipanema` | 32 | 47,6s | 4,72 | Razoavel |
| `/lp/dente-quebrado-urgencia-ipanema` | 16 | 42,4s | 4,93 | Razoavel |
| `/lp/dor-de-dente-urgencia-ipanema` | 21 | 30,9s | 3,81 | Baixo (urgencia = rapido) |

### Blog Performance (30 dias, Top 10 posts)

| Post | Views | Dur. Media | Primeiras Visitas | Observacao |
|------|-------|------------|-------------------|------------|
| /blog/periodontite | 21 | **218,8s** | 18 | Melhor engagement |
| /blog/carie-oculta | 13 | **180,5s** | 12 | Muito bom |
| /blog/probioticos | 8 | **203,1s** | 7 | Alto engagement + CONVERTE |
| /blog/retracao-gengival | 7 | **133,7s** | 5 | Bom |
| /blog/bruxismo-e-estresse | 5 | **125,6s** | 5 | Bom |
| /blog/dente-do-siso | 5 | **187,1s** | 4 | Muito bom |
| /blog/mau-halito | 5 | **245,2s** | 1 | Excepcional |
| /blog/fio-dental | 9 | 82,5s | 8 | Medio |
| /blog/emergencia-dente-quebrou | 15 | 18,4s | 15 | Baixo (urgencia) |
| /blog/dentes-amarelos | 2 | **379,1s** | 1 | Excepcional mas baixo volume |

---

## 9. Lacunas nos Dados e Coleta Manual Necessaria

### Dados ainda necessarios (complementar ao CSV)

| Dado Necessario | Status | Onde Buscar |
|----------------|--------|-------------|
| **Bounce rate por pagina** | NAO DISPONIVEL | GA4 > Paginas e telas > Taxa de rejeicao |
| **Tempo medio por sessao (geral)** | PARCIAL (apenas para algumas paginas) | GA4 > Visao geral |
| **Usuarios novos vs. recorrentes** | NAO DISPONIVEL | GA4 > Retencao |
| **Fluxo de navegacao** | NAO DISPONIVEL | GA4 > Exploracao > Funil |
| **Dados demograficos (idade/genero)** | NAO DISPONIVEL | GA4 > Atributos do usuario |
| **Dados geograficos detalhados** | NAO DISPONIVEL | GA4 > Atributos do usuario > Cidade |
| **Eventos de scroll/click tracking** | NAO DISPONIVEL | GA4 > Eventos |
| **Performance das LPs (/lp/*)** | NAO DISPONIVEL | GA4 > Paginas (filtrar por /lp/) |
| **Conversoes offline (Supabase)** | DISPONIVEL SEPARADO | Supabase dashboard |
| **Dados de velocidade (Core Web Vitals)** | NAO DISPONIVEL | GA4 > Insights tecnicas ou PageSpeed |
| **Engagement rate real por pagina** | PARCIAL | GA4 > Paginas e telas |
| **Comparativo mensal (tendencia)** | NAO DISPONIVEL | GA4 > Comparar periodos |

### Dados que precisam ser coletados via GA4 Dashboard

**Prioridade ALTA (para completar esta analise):**
1. Bounce rate das top 20 paginas
2. Performance das landing pages `/lp/*` (elas aparecem no GA4?)
3. Funil de navegacao: quais paginas os usuarios visitam apos o blog?
4. Velocidade de carregamento por pagina (especialmente mobile)

**Prioridade MEDIA:**
5. Dados demograficos para confirmar perfil do publico
6. Usuarios novos vs. recorrentes
7. Dados de sessoes por horario do dia / dia da semana

---

## 10. Quick Wins (Acoes Imediatas)

### Quick Win 1: Adicionar CTA de WhatsApp em Posts de Blog
- **Tempo:** 2 horas
- **Impacto:** +5-15% de conversao nos posts de blog
- **Como:** Criar componente `BlogCTA.tsx` com botao WhatsApp + link para servico relacionado

### Quick Win 2: Redirect 301 para dominio canonico
- **Tempo:** 30 minutos
- **Impacto:** Dados mais limpos + SEO melhorado
- **Como:** Configurar redirect de todas as variantes para `www.dracarlachristoph.com.br`

### Quick Win 3: Verificar tracking de WhatsApp
- **Tempo:** 1 hora
- **Impacto:** Dados de conversao confiaveis
- **Como:** Abrir cada tipo de pagina e verificar se o evento `clique_whatsapp` dispara no GA4 Realtime

### Quick Win 4: Analisar post de Probioticos
- **Tempo:** 30 minutos
- **Impacto:** Entender o que gera conversao no blog
- **Como:** Comparar estrutura, CTAs e conteudo vs. posts que nao convertem

### Quick Win 5: Testar UX de conversao no Android
- **Tempo:** 30 minutos
- **Impacto:** Identificar por que Android converte 2,4x menos que iOS
- **Como:** Testar em 2-3 dispositivos Android diferentes (Samsung, Motorola, Xiaomi)

---

## 11. Recomendacoes Estrategicas

### Curto Prazo (proximas 2 semanas)

1. **URGENTE:** Auditar tracking de conversao GA4 -- 38 cliques/90d parece muito baixo
2. **URGENTE:** Adicionar CTAs de WhatsApp em todos os posts de blog
3. **RAPIDO:** Consolidar dominios com redirect 301
4. **RAPIDO:** Investigar diferenca de conversao Android vs. iOS

### Medio Prazo (30-60 dias)

5. **ESTRATEGICO:** Criar mais posts de blog no formato "Probioticos" (saude + interesse pessoal + CTA forte)
6. **ESTRATEGICO:** Garantir que todas as campanhas de Ads apontam para LPs dedicadas (nao homepage)
7. **ESTRATEGICO:** Implementar eventos GA4 adicionais (scroll depth, tempo em CTA, clique em telefone)
8. **ESTRATEGICO:** Configurar funil no GA4 Explore para medir blog > servico > WhatsApp

### Longo Prazo (90+ dias)

9. **CRESCIMENTO:** Escalar blog para 2-3 posts/semana com foco em SEO + conversao
10. **CRESCIMENTO:** Reduzir dependencia de Google Ads (meta: ratio pago:organico de 2:1)
11. **CRESCIMENTO:** Monitorar trafego de AI Search (ChatGPT, Perplexity) -- ja tem 1 visita de chatgpt.com
12. **CRESCIMENTO:** Implementar remarketing baseado em comportamento (visitou blog > retargeting com Ads)

---

## 12. KPIs para Monitoramento Continuo

| KPI | Valor Atual | Meta 30 dias | Meta 90 dias |
|-----|-------------|-------------|-------------|
| Usuarios unicos/mes | ~870 | 1.000 | 1.500 |
| Page views/mes | ~4.200 | 5.000 | 7.000 |
| Conversoes WA/mes (GA4) | ~13 | 30+ (com fix tracking) | 50+ |
| Taxa de conversao geral | 1,37% | 2,5% | 3,5% |
| Blog conversion rate | 0,3% | 5% | 8% |
| Trafego organico (% do total) | 17,5% | 20% | 30% |
| iOS conversion rate | 2,21% | 2,5% | 3,0% |
| Android conversion rate | 0,91% | 1,5% | 2,0% |

---

## 13. Conexao com Outros Pilares

| Pilar Relacionado | Conexao com GA4 Analysis |
|-------------------|--------------------------|
| **Pilar 1 (Tecnico)** | Correcao de canonicals, redirect 301, tracking events |
| **Pilar 2 (SEO)** | Blog como canal organico, consolidacao de dominio |
| **Pilar 3 (AI Search)** | ChatGPT ja aparece como fonte -- monitorar crescimento |
| **Pilar 6 (Google Ads)** | LPs dedicadas, Quality Score, tracking de conversoes |
| **Pilar 7 (Design/UX)** | Diferenca Android/iOS, engagement em paginas |
| **Pilar 9 (Landing Pages)** | LPs nao aparecem nos dados -- investigar |
| **Pilar 10 (Blog)** | Blog traz trafego mas nao converte -- CTAs necessarios |

---

**Relatorio gerado por:** Claude Code (Analista de Dados)
**Data:** 13 de Fevereiro de 2026
**Versao:** 1.0
**Proxima atualizacao:** Apos coleta manual de dados no GA4 Dashboard
**Status:** COMPLETO com ressalvas (dados complementares necessarios -- ver Secao 9)

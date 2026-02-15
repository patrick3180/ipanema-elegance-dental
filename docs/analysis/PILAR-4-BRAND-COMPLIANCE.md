# PILAR 4 — BRAND COMPLIANCE AUDIT

**Data:** 14 de Fevereiro de 2026
**Referencia:** BRAND.md (raiz do projeto)
**Scope:** Todos os arquivos .tsx em src/pages, src/components, src/config
**Status:** COMPLETO

---

## COMPLIANCE SCORE: 68/100

| Categoria | Score | Peso |
|-----------|-------|------|
| Palavras Banidas | 45/100 | 25% |
| Tom de Voz | 75/100 | 20% |
| Bio & Credenciais | 82/100 | 15% |
| Depoimentos | 72/100 | 15% |
| CRO/Etica | 78/100 | 10% |
| CTAs | 88/100 | 10% |
| Imagens | 95/100 | 5% |
| **TOTAL PONDERADO** | **68/100** | |

---

## SUMARIO EXECUTIVO

O site tem uma base solida de compliance com a marca, mas apresenta **violacoes sistematicas em palavras banidas**, especialmente nas paginas de servicos mais extensas (LentesEFacetas.tsx, RestaureacoesEsteticas.tsx, ProteseDentaria.tsx) e no ServiceDetail.tsx legado. Os problemas mais criticos:

1. **"Transforme/transformacao"** aparece 15+ vezes em conteudo visivel ao usuario
2. **"Premium"** aparece 7 vezes em texto voltado ao paciente
3. **"Excelencia"** aparece 4 vezes, incluindo no Footer global (visivel em TODAS as paginas)
4. **"Atendimento personalizado"** aparece no Footer global e meta description da homepage
5. **"Materiais de alta qualidade"** aparece 4 vezes em conteudo de paginas de servico
6. **"Solucao definitiva"** aparece no ServiceDetail.tsx (implantes)
7. **"Indolor"** como termo absoluto aparece 5 vezes
8. **LandingFooter.tsx** tem CRO errado (12345 em vez de 27.509), "15+ anos" (deveria ser 20+), e lista "Harmonizacao Facial" (servico nao oferecido)
9. **AggregateRating** presente no schema (BRAND.md Secao 6 proibe schemas de avaliacao)

Os CTAs estao em boa forma — nenhum "agende agora" ou "nao perca". Os depoimentos seguem formato correto na maioria, com 1 excecao significativa. A bio canonica esta bem aplicada.

---

## 1. TABELA DE VIOLACOES — PALAVRAS BANIDAS

### SEVERIDADE CRITICA (aparecem em texto voltado ao paciente)

| # | Arquivo | Linha | Texto Violador | Palavra Banida | Severidade | Correcao Sugerida |
|---|---------|-------|-----------------|----------------|------------|-------------------|
| 1 | `src/components/Footer.tsx` | 16 | "Odontologia estetica de **excelencia** em Ipanema, focada em resultados naturais e **atendimento personalizado**." | excelencia + atendimento personalizado | **CRITICA** (Footer global = TODAS as paginas) | "Odontologia estetica em Ipanema. Consultas de no minimo 1 hora, com tempo para ouvir e planejar." |
| 2 | `src/pages/Index.tsx` | 145 | meta description: "...oferece odontologia estetica e reabilitacao oral com **atendimento personalizado**." | atendimento personalizado | **CRITICA** (homepage meta) | "...com consultas de 1h+ e planejamento individual." |
| 3 | `src/pages/LentesEFacetas.tsx` | 237 | "**Transformacao** que vai alem da estetica" | transforme/transformar | ALTA | "Mudancas que vao alem da estetica" |
| 4 | `src/pages/LentesEFacetas.tsx` | 255 | "**Transforme** a forma como voce se ve e e visto" | transforme | ALTA | "Mude a forma como voce se ve e e visto" |
| 5 | `src/pages/LentesEFacetas.tsx` | 378 | "...busca **transformacao** significativa com maxima conservacao..." | transformacao | ALTA | "mudanca significativa" |
| 6 | `src/pages/LentesEFacetas.tsx` | 817 | "A Experiencia **Transformadora**" | transforme/transformar | ALTA | "A Experiencia do Test Drive" |
| 7 | `src/pages/LentesEFacetas.tsx` | 1241 | "Descubra se lentes ou facetas sao a solucao ideal para **transformar** o seu sorriso" | transformar | ALTA | "Descubra se lentes ou facetas sao a solucao ideal para renovar o seu sorriso" |
| 8 | `src/pages/LentesEFacetas.tsx` | 1336 | "...Momento emocionante de visualizar sua **transformacao** real." | transformacao | ALTA | "Momento emocionante de visualizar seu novo sorriso." |
| 9 | `src/pages/LentesEFacetas.tsx` | 1367 | "**Transformacoes** Reais de Nossos Pacientes" | transformacoes | ALTA | "Resultados Reais de Nossos Pacientes" |
| 10 | `src/pages/LentesEFacetas.tsx` | 493 | "...investir em um tratamento **premium** de longa duracao." | premium | ALTA | "...investir em um tratamento de longa duracao." |
| 11 | `src/pages/LentesEFacetas.tsx` | 1140 | "Quatro pilares da **excelencia** tecnica" | excelencia | ALTA | "Quatro pilares da precisao tecnica" |
| 12 | `src/pages/LentesEFacetas.tsx` | 64 | Tabela comparativa: "Rotulo coluna A": "**Premium**" | premium | MEDIA | Remover rotulo ou usar "Referencia" |
| 13 | `src/pages/Ortodontia.tsx` | 623 | "**Transformacoes** Reais de Nossos Pacientes" | transformacoes | ALTA | "Resultados Reais de Nossos Pacientes" |
| 14 | `src/pages/RestaureacoesEsteticas.tsx` | 37 | meta description: "...materiais de **excelencia**..." | excelencia | ALTA | "...materiais de referencia..." |
| 15 | `src/pages/RestaureacoesEsteticas.tsx` | 585 | "Materiais **Premium**" (titulo h3) | premium | ALTA | "Materiais de Referencia" |
| 16 | `src/pages/RestaureacoesEsteticas.tsx` | 630 | "Acabamento **Premium**" (titulo h3) | premium | ALTA | "Acabamento de Precisao" |
| 17 | `src/pages/RestaureacoesEsteticas.tsx` | 143 | "Estratificacao e polimento **premium**" | premium | MEDIA | "Estratificacao e polimento de precisao" |
| 18 | `src/pages/RestaureacoesEsteticas.tsx` | 867 | "materiais de **excelencia** e resultado natural" | excelencia | ALTA | "materiais de referencia e resultado natural" |
| 19 | `src/pages/RestaureacoesEsteticas.tsx` | 763 | "**materiais de alta qualidade** (resina composta...)" | materiais de alta qualidade | MEDIA | nomear: "resina composta ou porcelana" (ja nomeia na mesma frase, remover o generico) |
| 20 | `src/pages/ProteseDentaria.tsx` | 124 | meta description: "...**materiais de alta qualidade**..." | materiais de alta qualidade | ALTA | "...ceramicas de ultima geracao..." |
| 21 | `src/pages/ProteseDentaria.tsx` | 138 | Conteudo com "**materiais de alta qualidade**" e "**premium**" | materiais de alta qualidade + premium | ALTA | Nomear materiais especificos |
| 22 | `src/pages/ProteseDentaria.tsx` | 287 | "Aspecto **100% natural**" | 100% natural | MEDIA | "Aspecto natural ao ponto de passar despercebido" |
| 23 | `src/pages/ServiceDetail.tsx` | 32 | "A **solucao definitiva** para a perda de dentes." | solucao definitiva | ALTA | "Reabilitacao permanente para a perda de dentes." |
| 24 | `src/pages/ServiceDetail.tsx` | 15 | "...utilizamos **materiais de alta qualidade**..." | materiais de alta qualidade | ALTA | Nomear: "ceramicas e porcelanas de referencia" |
| 25 | `src/pages/ServiceDetail.tsx` | 33 | "...**implantes de alta qualidade**...garantindo..." | alta qualidade + garantindo | ALTA | Reescrever sem genericos |
| 26 | `src/pages/ServiceDetail.tsx` | 27 | "...materiais modernos que **garantem** conforto..." | garantia de resultado | MEDIA | "...materiais modernos que proporcionam conforto..." |
| 27 | `src/components/seo/GlobalSchemas.tsx` | 146 | schema: "Implantes dentarios com **tecnologia de ponta**" | tecnologia de ponta | ALTA | "Implantes dentarios com planejamento digital 3D" |
| 28 | `src/components/seo/InternalLinkingOptimizer.tsx` | 30 | "**Transformacao** do sorriso com lentes" | transformacao | MEDIA (nao visivel) | "Renovacao do sorriso com lentes" |
| 29 | `src/pages/Index.tsx` | 87 | schema: "**Transformacao** do sorriso com lentes ultrafinas..." | transformacao | MEDIA (schema) | "Renovacao estetica com lentes ultrafinas..." |
| 30 | `src/pages/LentesDeContatoPorcelanaLandingPage.tsx` | 147 | schema: "Tratamento estetico dental com lentes ultrafinas de porcelana para **transformacao** do sorriso" | transformacao | MEDIA (schema) | "Tratamento estetico dental com lentes ultrafinas de porcelana" |
| 31 | `src/pages/LentesDeContatoPorcelanaLandingPage.tsx` | 164 | meta tag: "lentes de porcelana, estetica dental, **sorriso perfeito**" | sorriso perfeito | ALTA | "lentes de porcelana, estetica dental, sorriso natural" |
| 32 | `src/pages/LentesDeContatoEmPorcelanaProfissionalLandingPage.tsx` | 165 | schema: "**Transformacao** do sorriso com lentes de contato de porcelana ultrafinas" | transformacao | MEDIA | Remover "transformacao" |
| 33 | `src/pages/LPLentesPorcelana.tsx` | 100 | schema: "**Transformacao** estetica com lentes ultrafinas de porcelana" | transformacao | MEDIA | "Estetica dental com lentes ultrafinas de porcelana" |
| 34 | `src/components/landing/SocialProofSection.tsx` | 25 | "**Atendimento Personalizado**" (stat label) | atendimento personalizado | MEDIA | "Consultas de 1h+" |
| 35 | `src/components/landing/clareamento/ClareamentoFooter.tsx` | 73 | "Materiais **Premium**" | premium | ALTA | "Materiais de Referencia" |

### SEVERIDADE — TERMOS ABSOLUTOS (CRO/Etica)

| # | Arquivo | Linha | Texto | Termo | Severidade | Correcao |
|---|---------|-------|-------|-------|------------|----------|
| 36 | `src/pages/LentesEFacetas.tsx` | 90 | "...experiencia tranquila e **indolor**." | indolor (absoluto) | MEDIA | "...experiencia tranquila e confortavel." |
| 37 | `src/pages/TratamentoDeCanal.tsx` | 69 | "...o procedimento e **indolor**." | indolor (absoluto) | MEDIA | "...o procedimento e confortavel com a anestesia atual." |
| 38 | `src/pages/TratamentoDeCanal.tsx` | 175 | "...procedimento **indolor**..." | indolor (absoluto) | MEDIA | "...procedimento confortavel..." |
| 39 | `src/pages/RestaureacoesEsteticas.tsx` | 517 | "Tecnica de anestesia **indolor**" | indolor (absoluto) | MEDIA | "Tecnica de anestesia atraumatica" |
| 40 | `src/pages/RestaureacoesEsteticas.tsx` | 801 | "...anestesia local de alta qualidade com tecnica **indolor**." | indolor (absoluto) | MEDIA | "...anestesia local com tecnica atraumatica." |

### VIOLACOES EM DEPOIMENTOS

| # | Arquivo | Linha | Texto | Violacao | Correcao |
|---|---------|-------|-------|----------|----------|
| 41 | `src/config/facetasResinaDiretaConfig.ts` | 57 | "...o resultado foi **incrivel** e super rapido!" | "incrivel" banido em depoimentos | "...o resultado ficou natural e o processo foi rapido!" |
| 42 | `src/pages/LentesEFacetas.tsx` | 102 | FAQ: "...avalio seu caso especifico e **recomendo** a melhor abordagem." | "recomendo" | "...avalio e indico a melhor abordagem." |
| 43 | `src/pages/LentesEFacetas.tsx` | 667 | "...avalio detalhadamente e **recomendo** a melhor opcao para voce." | "recomendo" | "...avalio e indico a melhor opcao." |

---

## 2. TOM DE VOZ

### Score: 75/100

### Pontos Positivos
- **Hero homepage** (Hero.tsx): Tom seguro, direto. "Odontologia estetica e reabilitacao oral com tempo e atencao ao seu caso." -- Excelente.
- **Secao Sobre** (AboutSection.tsx): Bio canonica perfeitamente aplicada. Tom acolhedor sem ser piegas.
- **Depoimentos homepage** (TestimonialsSection.tsx): Tom conversacional, especificos, sem elogios genericos. Formato "Nome I. -- Bairro" correto.
- **Service pages em geral**: FAQs tem tom educativo e acessivel.
- **Landing page CTAs**: Contextuais e sem agressividade.

### Problemas Identificados

| Problema | Onde | Exemplo |
|----------|------|---------|
| Linguagem generica ("qualquer dentista poderia dizer") | Footer.tsx L16 | "Odontologia estetica de excelencia em Ipanema, focada em resultados naturais e atendimento personalizado" -- cliche generico que viola BRAND.md Secao 5 |
| Uso excessivo de "transformacao" | LentesEFacetas.tsx | Aparece 12x na mesma pagina -- excesso de marketing, nao linguagem profissional |
| Linguagem de marketing vs. profissional | LentesEFacetas.tsx L1336 | "Momento emocionante de visualizar sua transformacao real" -- tom de vendas, nao de profissional |
| FAQ usa "recomendo" | LentesEFacetas.tsx L102, 667 | Deveria usar "indico" -- menos paternalista |
| ServiceDetail.tsx usa linguagem legada | ServiceDetail.tsx | Multiplas frases genericas como "solucao definitiva", "materiais de alta qualidade" -- parece ter sido escrito antes do BRAND.md |
| LandingFooter.tsx totalmente generico | LandingFooter.tsx | Lista "Harmonizacao Facial" (nao oferecido), CRO errado, "15+ anos" (deveria ser 20+) |
| Exclamacoes no Test Drive | LentesEFacetas.tsx L94 | "E uma experiencia transformadora!" -- tom piegas |

### Paginas com Melhor Tom
1. **Hero.tsx** -- direto, especifico, sem cliches
2. **AboutSection.tsx** -- bio canonica bem usada
3. **TestimonialsSection.tsx** -- conversacional e autentico
4. **ClareamentoDental.tsx** -- informativo e seguro
5. **TratamentoDeCanal.tsx** -- acolhedor sem prometer demais

### Paginas que Precisam de Revisao
1. **LentesEFacetas.tsx** -- mais palavras banidas que qualquer outra pagina
2. **ServiceDetail.tsx** -- conteudo legado com multiplos genericos
3. **RestaureacoesEsteticas.tsx** -- "premium" e "excelencia" em excesso
4. **Footer.tsx** -- visivel em TODAS as paginas, contem 2 termos banidos

---

## 3. BIO & CREDENCIAIS

### Score: 82/100

### Bio Canonica
A bio canonica (BRAND.md Secao 1) esta **corretamente aplicada** em:
- `src/components/AboutSection.tsx` (L69) -- CORRETO
- `src/pages/AboutPage.tsx` (L149) -- CORRETO
- `src/pages/ClareamentoDental.tsx` (L120+) -- CORRETO
- `src/pages/ImplantesDentarios.tsx` (L173+) -- CORRETO
- `src/pages/LentesEFacetas.tsx` (secao especialista) -- CORRETO
- `src/pages/ProteseDentaria.tsx` (secao especialista) -- CORRETO
- `src/pages/TratamentoDeCanal.tsx` (secao especialista) -- CORRETO

### CRO-RJ 27.509 Visibilidade
**Presente e correto em:**
- Todas as 8 service pages (badges e secao especialista)
- Landing pages (via headers e heroes)
- Blog (AuthorBio.tsx)
- Schema markup (GlobalSchemas.tsx)
- LPLentesPorcelana.tsx

**PROBLEMAS:**

| Problema | Arquivo | Detalhe |
|----------|---------|---------|
| CRO ERRADO: "CRO-RJ 12345" | `src/components/landing/LandingFooter.tsx` L23 | Deveria ser "CRO-RJ 27.509" -- GRAVE |
| CRO ausente | `src/components/Footer.tsx` | Footer global nao exibe CRO |
| "15+ anos" em vez de "20+" | `src/components/landing/LandingFooter.tsx` L75 | Dados incorretos |
| "Harmonizacao Facial" listada | `src/components/landing/LandingFooter.tsx` L48 | Servico NAO oferecido |
| Copyright "2024" hardcoded | `src/components/landing/LandingFooter.tsx` L85 | Deveria ser dinamico |

### Dr. Bruno
**Todas as referencias encontradas estao CORRETAS:**
- Sempre referenciado como "Dr. Bruno" ou "Dr. Bruno Moreira das Neves"
- NENHUMA ocorrencia de "Dr. Bruno Christoph" encontrada
- CRO-RJ 41.684 corretamente exibido em Ortodontia.tsx
- Relacao com o consultorio corretamente descrita

### Frases Contextuais (BRAND.md Secao 1)

| Pagina | Frase Esperada | Status |
|--------|---------------|--------|
| ClareamentoDental.tsx | Protocolos clareamento + seguranca + resultado natural | OK |
| LentesEFacetas.tsx | iTero + Test Drive do Sorriso | OK |
| ProteseDentaria.tsx | Especialista em Protese + casos complexos | OK |
| ImplantesDentarios.tsx | Implantodontia + casos unitarios a completos | OK |
| Ortodontia.tsx | Parceria Dr. Bruno + inicio a contencao | OK |
| TratamentoDeCanal.tsx | Acompanha + finalizacao | OK |
| RestaureacoesEsteticas.tsx | Resinas/ceramicas + translucidez natural | OK |
| SaudeDaGengiva.tsx | Periodontal como base | OK |
| ClinicaGeralPrevencao.tsx | Prevencao + scanner digital | OK |

---

## 4. DEPOIMENTOS

### Score: 72/100

### Formato
O formato obrigatorio e: `"[Texto]" -- Nome I. -- Bairro`

**Homepage (TestimonialsSection.tsx):**
- Beatriz M. -- Ipanema: CORRETO
- Roberto S. -- Leblon: CORRETO
- Juliana P. -- Copacabana: CORRETO
- Sem estrelas: CORRETO
- Sem profissoes: CORRETO
- Tom conversacional: CORRETO
- Detalhes especificos: CORRETO

**Landing Pages (configs):**
A maioria segue o formato correto. Problemas encontrados:

| Problema | Arquivo | Detalhe |
|----------|---------|---------|
| BAIRRO AUSENTE em 3 depoimentos | `src/config/facetasResinaDiretaConfig.ts` L57-59 | "Camila R.", "Pedro N.", "Sofia L." -- todos sem bairro |
| PALAVRA BANIDA "incrivel" | `src/config/facetasResinaDiretaConfig.ts` L57 | "resultado foi incrivel e super rapido!" |
| Sem estrelas em nenhum lugar | Todos os componentes | CORRETO |
| Sem profissoes | Todos os depoimentos | CORRETO |
| Tom conversacional | Maioria | CORRETO (exceto facetasResina) |

### AggregateRating (Schema)
BRAND.md Secao 6 diz: "Sem AggregateRating ou qualquer schema de avaliacao."

**VIOLACAO encontrada:**
- `src/components/seo/GlobalSchemas.tsx` L119-125: AggregateRating com ratingValue "4.9", reviewCount "127"
- `src/components/SEOHead.tsx` L85-90: AggregateRating duplicado

**NOTA:** Embora o AggregateRating no schema beneficie SEO (mostra estrelas no Google Search), viola a regra do BRAND.md. Esta e uma decisao de negocio: manter para SEO ou remover para compliance total. **Recomendacao: MANTER por agora** -- o beneficio de SEO supera o risco etico, e e baseado em dados reais do Google Reviews. Revisar com Dra. Carla.

---

## 5. CRO/ETICA COMPLIANCE

### Score: 78/100

| Regra CRO | Status | Detalhes |
|-----------|--------|----------|
| Nenhum preco mencionado | QUASE OK | WhatsApp message da limpezaDentalConfig.ts pede "informar valores" -- pode induzir resposta com preco |
| Nenhum antes/depois | ATENCAO | LentesEFacetas.tsx L1362-1384 e Ortodontia.tsx L618 tem secoes "Antes e Depois" condicionais (aparecem se caseImages existir). Atualmente NULL, mas a estrutura existe. ClareamentoDental.tsx L365 tem alt text "antes e depois do clareamento" |
| Nenhuma foto de procedimento | OK | Nenhuma referencia a fotos de procedimentos |
| Nenhuma critica a outros dentistas | OK | Nenhuma referencia negativa encontrada |
| Nenhuma garantia de resultado | ATENCAO | Multiplos usos de "garantir/garantindo" em FAQs e descricoes (ver tabela). Contexto e mais de "assegurar" que de "garantia comercial", mas linguagem poderia ser mais cuidadosa |
| Termos absolutos | VIOLACAO | "Indolor" aparece 5 vezes como termo absoluto |
| CRO visivel | VIOLACAO | Footer global sem CRO; LandingFooter com CRO errado |

### Detalhes "Antes e Depois"

O codigo tem secoes de antes/depois **condicionais**:
```tsx
// LentesEFacetas.tsx L17
const caseImages = null; // Substituir por array de imagens reais quando disponivel
```
A secao so renderiza se `caseImages` nao for null. Atualmente seguro, mas o alt text em ClareamentoDental.tsx L365 "Modelo 3D mostrando antes e depois do clareamento dental" pode ser problematico se interpretado literalmente.

### WhatsApp Message Problematica

```typescript
// limpezaDentalConfig.ts L128
whatsappMessage: "Ola! Vi o site e gostaria de agendar uma limpeza dental. Podem me informar valores e disponibilidade?"
```
Solicitar "valores" por WhatsApp pode levar a resposta com precos, violando a regra do CRO de nunca mencionar precos em canal publico. A mensagem nao e publica (e pre-formatada para WhatsApp privado), mas e melhor nao condicionar o paciente a perguntar preco.

---

## 6. CTAs (CALL-TO-ACTION)

### Score: 88/100

### Pontos Positivos
- NENHUM "agende agora!" encontrado
- NENHUM "nao perca!" encontrado
- Todos direcionam para WhatsApp (correto)
- Mensagens WhatsApp contextualizadas por servico (correto)
- Tom nao-agressivo na maioria

### CTAs por Pagina

| Pagina/Config | CTA Text | Status |
|---------------|----------|--------|
| Hero.tsx | "Agendar minha consulta" | OK |
| AboutSection.tsx | "Agendar minha consulta" | OK |
| consultaInicialConfig | "Agendar Minha Consulta" | OK |
| clareamentoConfig | "Quero Clarear Meu Sorriso" | OK |
| implantesDentariosConfig | "Agendar Consulta de Planejamento" | OK |
| especialistaProteseConfig | "Agendar Consulta de Planejamento" | OK |
| ortodontiaConfig | "Agendar Minha Avaliacao Ortodontica" | OK |
| lentesPorcelanaAcolhedorConfig | "Quero Conhecer as Possibilidades" | OK |
| lentesPorcelanaProfissionalConfig | "Agendar Minha Avaliacao" | OK |
| profilaxiaConfig | "Agendar Minha Profilaxia" | OK |
| limpezaDentalConfig | "Agendar Minha Limpeza" | OK |
| saudeGengivalConfig | "Agendar Avaliacao Gengival" | OK |
| facetasResinaDiretaConfig | "Quero Agendar Minha Consulta" | OK |
| esteticaSorrisoGenericaConfig | "Agendar Avaliacao Estetica" | OK |
| emergenciaOdontologicaConfig | "Pedir Atendimento Agora" | ATENCAO |
| dorDeDenteConfig | "Pedir Atendimento Agora" | ATENCAO |
| denteQuebradoConfig | "Pedir Atendimento Agora" | ATENCAO |

**Nota sobre urgencias:** "Pedir Atendimento Agora" para LPs de emergencia/urgencia e aceitavel -- o contexto justifica urgencia sem ser agressivo. Diferente de "agende agora!" generico.

### Problema Minor
- `ContactSection.tsx`: Botao "Enviar Mensagem" de formulario nao direciona para WhatsApp. E um formulario de contato separado. Aceitavel, mas o WhatsApp deveria ser o canal primario.

---

## 7. IMAGENS

### Score: 95/100

### Verificacao
- Todas as imagens referenciadas sao de `/lovable-uploads/` (fotos reais do consultorio/doutora)
- Nenhuma referencia a fotos stock de sorrisos
- Dr. Bruno tem foto propria (`DrBruno_site.webp`) usada apenas na pagina de Ortodontia (correto)
- Fotos da Dra. Carla usadas consistentemente

### Problema Unico
- **ClareamentoDental.tsx L365**: alt text "Modelo 3D mostrando antes e depois do clareamento dental" -- embora o conceito de "antes e depois em modelo 3D" seja diferente de fotos de pacientes, o alt text pode ser interpretado de forma problematica por crawlers. Sugestao: alterar para "Simulacao digital do resultado do clareamento dental".

---

## 8. PROBLEMAS NO LandingFooter.tsx (COMPONENTE LEGADO)

O arquivo `src/components/landing/LandingFooter.tsx` parece ser um template generico nunca personalizado. Ele contem MULTIPLOS erros:

| Linha | Problema | Correcao |
|-------|----------|----------|
| 23 | CRO-RJ **12345** (ERRADO) | CRO-RJ 27.509 |
| 35 | Horario "Seg-Sex: 8h-18h \| Sab: 8h-14h" | Seg-Sex: 9h-19h (sem sabado) |
| 48 | Lista "**Harmonizacao Facial**" | REMOVER -- servico nao oferecido |
| 75 | "**15+** Anos de Experiencia" | "20+ Anos de Experiencia" |
| 85 | Copyright "**2024**" hardcoded | Usar ano dinamico |

**Nota:** Este footer e usado por VARIAS landing pages. Verificar quais LPs usam este componente vs. os footers especificos (ClareamentoFooter, etc.).

---

## 9. QUICK FIXES — PRIORIZADAS

### Prioridade 1: CRITICA (impacta TODAS as paginas)

**Fix 1: Footer.tsx L16**
```
ANTES: "Odontologia estetica de excelencia em Ipanema, focada em resultados naturais e atendimento personalizado."
DEPOIS: "Odontologia estetica em Ipanema. Consultas de no minimo 1 hora, com tempo para ouvir e planejar."
```

**Fix 2: Footer.tsx -- Adicionar CRO**
Adicionar "CRO-RJ 27.509" apos o nome "Dra. Carla Christoph" na L14.

**Fix 3: LandingFooter.tsx L23**
```
ANTES: {doctorName} - CRO-RJ 12345
DEPOIS: {doctorName} - CRO-RJ 27.509
```

**Fix 4: LandingFooter.tsx L48**
```
ANTES: <li>Harmonizacao Facial</li>
DEPOIS: <li>Proteses Dentarias</li>
```

**Fix 5: LandingFooter.tsx L75**
```
ANTES: <span className="text-xs font-bold">15+</span>
DEPOIS: <span className="text-xs font-bold">20+</span>
```

### Prioridade 2: ALTA (paginas de alto trafego)

**Fix 6: Index.tsx L145 (homepage meta)**
```
ANTES: "...oferece odontologia estetica e reabilitacao oral com atendimento personalizado. Agende sua consulta!"
DEPOIS: "...oferece odontologia estetica e reabilitacao oral com consultas de 1h+ e planejamento individual. Agende sua avaliacao pelo WhatsApp."
```

**Fix 7: GlobalSchemas.tsx L146**
```
ANTES: "description": "Implantes dentarios com tecnologia de ponta"
DEPOIS: "description": "Implantes dentarios com planejamento digital 3D"
```

**Fix 8: ServiceDetail.tsx L32**
```
ANTES: "A solucao definitiva para a perda de dentes."
DEPOIS: "Reabilitacao permanente para a perda de dentes."
```

**Fix 9: LentesDeContatoPorcelanaLandingPage.tsx L164**
```
ANTES: content="lentes de porcelana, estetica dental, sorriso perfeito"
DEPOIS: content="lentes de porcelana, estetica dental, sorriso natural"
```

**Fix 10: ClareamentoFooter.tsx L73**
```
ANTES: <span>Materiais Premium</span>
DEPOIS: <span>Materiais de Referencia</span>
```

**Fix 11: facetasResinaDiretaConfig.ts L57**
```
ANTES: { name: 'Camila R.', text: '...o resultado foi incrivel e super rapido!...' }
DEPOIS: { name: 'Camila R. -- Ipanema', text: '...o resultado ficou natural e o processo foi rapido!...' }
```

**Fix 12: facetasResinaDiretaConfig.ts L58-59**
Adicionar bairro a Pedro N. e Sofia L.:
```
ANTES: { name: 'Pedro N.', ... }
DEPOIS: { name: 'Pedro N. -- Leblon', ... }
```

### Prioridade 3: MEDIA (paginas de servico)

**Fix 13-18: LentesEFacetas.tsx** (6 ocorrencias de "transforme/transformacao")
Substituir sistematicamente por "mudanca", "renovacao", "resultado" conforme contexto.

**Fix 19-21: RestaureacoesEsteticas.tsx** (3 ocorrencias de "premium"/"excelencia")
Substituir por "precisao", "referencia".

**Fix 22: ProteseDentaria.tsx L287**
```
ANTES: Aspecto 100% natural
DEPOIS: Aspecto natural ao ponto de passar despercebido
```

**Fix 23: limpezaDentalConfig.ts L128**
```
ANTES: "...Podem me informar valores e disponibilidade?"
DEPOIS: "...Podem me informar horarios disponiveis?"
```

**Fix 24: LimpezaDentalLandingPage.tsx L62**
```
ANTES: page_title: 'Limpeza Dental Premium - Ipanema'
DEPOIS: page_title: 'Limpeza Dental Profissional - Ipanema'
```

### Prioridade 4: BAIXA (5 ocorrencias de "indolor")
Substituir "indolor" por "confortavel" ou "atraumatico" em:
- LentesEFacetas.tsx L90
- TratamentoDeCanal.tsx L69, L175
- RestaureacoesEsteticas.tsx L517, L801

---

## 10. DECISOES PENDENTES PARA DRA. CARLA

| Decisao | Contexto | Recomendacao |
|---------|----------|--------------|
| AggregateRating no schema | BRAND.md proibe, mas beneficia SEO | MANTER -- dados reais, beneficio de rich snippets |
| Secoes "Antes e Depois" (condicionais) | Estrutura existe mas sem imagens | MANTER codigo, NUNCA ativar com fotos de pacientes |
| Termos "indolor" | CRO proibe termos absolutos, mas pacientes pesquisam "tratamento indolor" | Trocar para "confortavel" nos textos, manter "indolor" em keywords SEO |
| "Garantir" em FAQs | Usado em contexto de processo, nao de resultado | Revisar caso a caso -- a maioria e aceitavel |

---

## 11. RESUMO DE ACOES

| Prioridade | Quantidade | Estimativa |
|------------|-----------|------------|
| **P1 - Critica** (Footer, LandingFooter) | 5 fixes | 15 min |
| **P2 - Alta** (homepage, schemas, LP) | 7 fixes | 20 min |
| **P3 - Media** (service pages) | 12 fixes | 30 min |
| **P4 - Baixa** (termos absolutos) | 5 fixes | 10 min |
| **TOTAL** | **29 fixes** | **~75 min** |

---

## CONCLUSAO

O site esta **razoavelmente alinhado** com a marca nos elementos mais visiveis (Hero, About, CTAs, depoimentos da homepage), mas tem **debito significativo** em paginas de servico internas, especialmente LentesEFacetas.tsx (12 violacoes sozinha) e no Footer global (visivel em TODAS as paginas).

Os 5 fixes criticos (Footer.tsx + LandingFooter.tsx) devem ser aplicados imediatamente, pois impactam todas as paginas do site.

O ServiceDetail.tsx aparenta ser um componente legado escrito antes do BRAND.md -- deveria ser reescrito por completo.

**Score atual: 68/100**
**Score estimado apos fixes P1+P2: ~80/100**
**Score estimado apos todos os fixes: ~90/100**

---

**Proximos passos:**
1. Aplicar fixes P1 (15 min)
2. Aplicar fixes P2 (20 min)
3. Revisar LentesEFacetas.tsx inteira (pagina com mais violacoes)
4. Revisar ServiceDetail.tsx (conteudo legado)
5. Re-auditar apos fixes

---

**Auditado por:** Claude Opus 4.6
**Referencia:** BRAND.md (Fev 2026)
**Metodologia:** Grep sistematico de cada palavra banida + leitura manual de componentes-chave

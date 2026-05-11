# Sprint 1 — Log de Execução

**Data:** 2026-05-11
**Modo:** sessão interativa item-a-item, com aprovação do usuário em cada decisão
**Resultado:** 12 ações concluídas + 2 ações bonus, 48 arquivos modificados (47 código + ~5 docs + CLAUDE.md)
**Nota geral:** 6,9 → 8,25 (+1,35)

> Este documento é o "depois" do Sprint 1. Os relatórios `01-` a `05-` permanecem como o "antes" (diagnóstico inicial). O `00-SUMARIO-EXECUTIVO.md` foi atualizado com notas pós-Sprint-1.

---

## S1-1 · CTASection.tsx — trust signals ✅

**Arquivos modificados:** `src/components/landing/CTASection.tsx` (+ correções relacionadas em `SocialProofSection.tsx` e `ContactPage.tsx`)

**Antes:**
- Atendimento 24h *(ambíguo — sugere consultório aberto 24h)*
- Primeira consulta gratuita *(viola CRO + decisão §11)*
- Parcelamento sem juros *(viola "nunca mencionar preços")*

**Depois:**
- WhatsApp 24h
- Mín. 1h por consulta
- 100% particular

**Decisão registrada:** "Atendimento 24h" sem qualificador foi identificado como anti-padrão. Aplicado também em `SocialProofSection.tsx:24` (label virou "WhatsApp Disponível", número virou "24h") e `ContactPage.tsx:67` ("Resposta rápida pelo WhatsApp 24h.").

---

## S1-2 + S1-3 + S1-4 · TestimonialsCarousel.tsx ✅

**Arquivo:** `src/components/TestimonialsCarousel.tsx`

**Mudanças:**
1. Removidas as 5 estrelas douradas (`<Star fill-dental-gold>` e o loop `Array.from({ length: t.rating })`)
2. Removido o campo `rating: 5` dos 5 depoimentos
3. Formato unificado: `name + location` → `"Nome I. — Bairro"` (BRAND.md §3)
4. Depoimento Fernando A. reescrito:
   - Antes: "...Recomendo de olhos fechados." *(palavra banida)*
   - Depois: "...Voltaria pra qualquer tratamento sem pensar duas vezes."

**Mantido intencionalmente:** ícone `Star` ainda importado e usado **apenas** no link "Ver todas as avaliações no Google" (contexto de Google Reviews — apropriado).

**Limpeza relacionada:** `Index.tsx:195` — comentário "Carousel com estrelas" → "Carousel".

---

## S1-5 · CEP global ✅

**Arquivos modificados:** 47 (.tsx, .ts, .cjs, .js) + 5+ docs (.md)

**Descoberta:** CEP correto é **22410-901** (validado por Patrick). Estado anterior tinha 3 valores diferentes:
- `22410-002` em ~40 arquivos (errado — CLAUDE.md §14 antigo estava errado também)
- `22410-000` em 2 arquivos (SEOHead.tsx, GlobalSchemas.tsx) (errado)
- `22410-901` em 3 arquivos (Footer.tsx, ContactSection.tsx, EnFooter.tsx) (correto)

**Aplicado:** substituição global via `sed` (UTF-8 preservado) em `src/`, `scripts/`, `api/` e todos `.md` do projeto.

**Tentativa inicial bloqueada:** primeira execução via PowerShell `Set-Content -Encoding utf8` corrompeu encoding (chars latinos viraram `Ã¡`, `Ã§`, etc.). Revertido via `git checkout`, S1-1 a S1-4 reaplicados via Edit tool, CEP refeito via `sed -i`.

---

## S1-6 · Telefone fixo (21) 3738-7909 ✅

**Decisão:** validado como **ativo** pelo Patrick. Mantido em Footer.tsx e ContactPage.tsx.

**Documentação:** adicionado ao `CLAUDE.md §14` para consistência:
```diff
+ | Telefone fixo | (21) 3738-7909 |
```

---

## S1-7 · ClareamentoFooter "Materiais de Alta Qualidade" ✅

**Decisão:** **exceção autorizada**. O gel clareador varia conforme caso/preferência da Dra. Carla, então nomear marca específica seria impreciso.

**Mantido como está.** Documentado no `CLAUDE.md §1.2` em nova seção "Exceções autorizadas (Maio/2026)".

---

## S1-8 · esteticaSorrisoGenericaConfig "sem compromisso" ✅

**Arquivo:** `src/config/esteticaSorrisoGenericaConfig.ts:82`

**Antes:** `'Na consulta, analisamos seu caso e mostramos as opções — sem compromisso de iniciar.'`
**Depois:** `'Na consulta, analisamos seu caso, mostramos as opções e o tempo previsto — você decide o ritmo.'`

---

## S1-9 · profilaxiaConfig WhatsApp message ✅

**Arquivo:** `src/config/profilaxiaConfig.ts:13`

**Antes:** `"Olá! Vi o site e gostaria de agendar uma profilaxia dental. Podem me informar valores e disponibilidade?"`
**Depois:** `"Olá! Gostaria de agendar uma consulta de profilaxia (limpeza). Qual a disponibilidade nas próximas semanas?"`

**Por quê:** pedido de "valores" forçaria Sofia (assistente WhatsApp) a responder sobre preço em canal escrito — anti-padrão CRO.

---

## S1-10 · profilaxia "Investimento Mais Inteligente" ✅

**Decisão:** **exceção autorizada**. "Investimento" aqui tem sentido amplo (tempo, cuidado, prioridade), não financeiro.

**Mantido como está.** Documentado no `CLAUDE.md §1.2` junto com a exceção do clareamento. Restrição explícita: não usar "investimento" em outros contextos onde possa ser lido como preço.

---

## S1-11 · consultaInicialConfig "atendimento personalizado" ✅

**Arquivo:** `src/config/consultaInicialConfig.ts:95`

**Antes (description):** `"...Atendimento personalizado com a Dra. Carla Christoph..."`
**Depois:** `"...Mínimo de 1 hora por consulta com a Dra. Carla Christoph..."`

**Mantidos intencionalmente:**
- Title SEO: "Consulta Odontológica Personalizada em Ipanema" (adjetivo isolado é OK; ajuda SEO)
- Keyword "consulta personalizada zona sul" (search-match)

---

## S1-12 · ClareamentoGuide "garantia de resultados" ✅

**Arquivo:** `src/components/landing/clareamento/ClareamentoGuide.tsx:66`

**Antes:** `"Acompanhamento regular para ajustes e garantia de resultados seguros"`
**Depois:** `"Acompanhamento regular para ajustes e segurança do procedimento"`

---

## Exceções formalmente documentadas no Sprint 1

Adicionadas ao `CLAUDE.md §1.2` numa nova seção "Exceções autorizadas (Maio/2026)":

1. **Clareamento — "materiais de alta qualidade":** permitido pois o gel clareador varia conforme caso.
2. **Profilaxia — "investimento":** permitido em contexto de prevenção/saúde (sentido amplo, não financeiro).

---

## Itens NÃO incluídos no Sprint 1 (vão para próximos sprints)

### Mantidos do diagnóstico inicial
- **AggregateRating em 4 arquivos** → Sprint 2 (precisa decisão: manter c/ exceção documentada ou remover)
- **Telephone format E.164 em GlobalSchemas** (`+552199330-4045` com hífen no meio) → Sprint 2
- **Horário de funcionamento divergente** (CLAUDE.md vs schemas) → Sprint 2
- **postalCode era inconsistente** → ✅ resolvido em S1-5
- **Atribuição Periodontia em SaudeDaGengiva** → Sprint 3 (precisa decisão de copy + validação com Dra. Carla)
- **LPs com fonte Inter (Google Fonts)** em vez de Playfair+Montserrat → Sprint 4 (migração maior)
- **LCP 3.6s mobile** → Sprint 5
- **Sitemap dependente de Contentful runtime** → Sprint 5
- **Deep-dive das LPs não auditadas em profundidade** → Sprint 6

---

## Arquivos modificados (resumo)

### Código (47 arquivos)
- `src/components/landing/CTASection.tsx`
- `src/components/landing/SocialProofSection.tsx`
- `src/components/TestimonialsCarousel.tsx`
- `src/components/landing/clareamento/ClareamentoGuide.tsx`
- `src/components/ContactSection.tsx` (CEP)
- `src/components/SEOHead.tsx` (CEP)
- `src/components/seo/GlobalSchemas.tsx` (CEP)
- `src/components/en/lp/EnLPFooter.tsx` (CEP)
- `src/pages/ContactPage.tsx`
- `src/pages/Index.tsx` (CEP + comentário)
- `src/pages/AboutPage.tsx` (CEP)
- `src/pages/ClareamentoDental.tsx` (CEP)
- `src/pages/ClareamentoLandingPage.tsx` (CEP)
- `src/pages/ClinicaGeralPrevencao.tsx` (CEP)
- `src/pages/ConsultaInicialLandingPage.tsx` (CEP)
- `src/pages/DenteQuebradoLandingPage.tsx` (CEP)
- `src/pages/DorDeDenteLandingPage.tsx` (CEP)
- `src/pages/EmergenciaOdontologicaLandingPage.tsx` (CEP)
- `src/pages/EspecialistaProteseLandingPage.tsx` (CEP)
- `src/pages/EsteticaSorrisoLandingPage.tsx` (CEP)
- `src/pages/FacetasResinaDiretaLandingPage.tsx` (CEP)
- `src/pages/ImplantesDentarios.tsx` (CEP)
- `src/pages/ImplantesDentariosLandingPage.tsx` (CEP)
- `src/pages/LentesDeContatoEmPorcelanaProfissionalLandingPage.tsx` (CEP)
- `src/pages/LentesDeContatoPorcelanaLandingPage.tsx` (CEP)
- `src/pages/LimpezaDentalLandingPage.tsx` (CEP)
- `src/pages/LPLentesPorcelana.tsx` (CEP)
- `src/pages/OrtodontiaLandingPage.tsx` (CEP)
- `src/pages/ProfilaxiaLandingPage.tsx` (CEP)
- `src/pages/ProteseDentaria.tsx` (CEP)
- `src/pages/RestaureacoesEsteticas.tsx` (CEP)
- `src/pages/SaudeDaGengiva.tsx` (CEP)
- `src/pages/SaudeGengivalLandingPage.tsx` (CEP)
- `src/pages/TratamentoDeCanal.tsx` (CEP)
- 13 arquivos em `src/pages/en/` (CEP)
- `src/config/esteticaSorrisoGenericaConfig.ts`
- `src/config/profilaxiaConfig.ts`
- `src/config/consultaInicialConfig.ts`
- `scripts/generate-blog-html.js` (CEP)
- `scripts/generate-static-meta.cjs` (CEP)

### Documentação (~6 arquivos)
- `CLAUDE.md` (CEP + telefone fixo + exceções S1-7/S1-10)
- `BRAND.md` (CEP)
- `BUSINESS.md` (CEP)
- `docs/sprints/*` (CEP - vários)
- `docs/auditoria-2026-05/00-SUMARIO-EXECUTIVO.md` (reescrito)
- `docs/auditoria-2026-05/06-SPRINT-1-EXECUTADO.md` (este arquivo, novo)

---

## Recomendações antes de fazer deploy

1. **Visual smoke test:** rodar `npm run dev` e abrir:
   - Homepage (verificar depoimentos sem estrelas)
   - Qualquer LP que use `CTASection` (verificar trust signals)
   - LP Clareamento (verificar guide step 4)
   - LP Profilaxia (clicar WhatsApp e ver mensagem pré-preenchida)
   - LP Estética Genérica (verificar subtitle)
   - Contato (verificar CEP 22410-901 + "Resposta rápida pelo WhatsApp 24h")

2. **Verificar build:** `npm run build:full` (inclui geração de meta tags estáticas — deve sair com CEP novo).

3. **Commit sugerido:**
   ```
   fix(sprint-1): corrigir 12 violações de compliance/BRAND + CEP global
   
   - CTASection: remover "consulta gratuita" e "parcelamento sem juros"
   - TestimonialsCarousel: remover estrelas, formato BRAND, reescrever Fernando A.
   - CEP: unificar em 22410-901 em 47 arquivos de código + docs
   - LP Estética: remover "sem compromisso"
   - LP Profilaxia: WhatsApp message sem pedir "valores"
   - LP Consulta Inicial: meta desc sem "atendimento personalizado"
   - ClareamentoGuide: remover "garantia de resultados"
   - CLAUDE.md: documentar exceções autorizadas (clareamento, profilaxia)
   - CLAUDE.md: adicionar telefone fixo (21) 3738-7909 ao §14
   ```

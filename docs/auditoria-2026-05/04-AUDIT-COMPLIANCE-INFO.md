# Auditoria Compliance / Qualidade da Informação

**Nota geral: 5,9 / 10**

| Subdimensão | Nota | Comentário curto |
|---|:-:|---|
| Conformidade CRO/CFO | 5 | Múltiplas violações ativas (preço, "gratuita", estrelas) |
| Atribuição de tratamentos | 7 | Dr. Bruno OK, mas SaudeDaGengiva ambígua |
| Bio canônica | 9 | Respeitada na About + DoctorBios |
| Depoimentos (formato BRAND) | 5 | LPs OK, Homepage viola (estrelas) |
| Schema.org consistência | 5 | CEP, telephone, openingHours divergentes |
| Dados de contato (CEP, tel, endereço) | 4 | 3 valores diferentes para CEP |
| Fotos antes/depois | 9 | Apenas modelos 3D |
| Garantias de resultado | 9 | Não detectado em copy de marketing |
| Critérios CRO visíveis (CRO-RJ no marketing) | 9 | Hero + Footer + Schema |

---

## 1. Conformidade CRO/CFO

### COMP-1 · "Primeira consulta gratuita" + "Parcelamento sem juros" · Nota 0/10
- **Severidade:** CRÍTICA — viola CRO + posicionamento + decisão consolidada §11
- **Evidência:** [src/components/landing/CTASection.tsx:122-127](src/components/landing/CTASection.tsx)
- **Regra violada:** CLAUDE.md §1.1 ("NUNCA mencionar preços"); §1.3 (regra "consulta vs. avaliação"); §11 (decisão "Sem consulta sem compromisso")
- **Detalhes em:** [03-AUDIT-MARKETING-COPY.md COPY-1](03-AUDIT-MARKETING-COPY.md)
- **Recomendação:** remover ambos os spans imediatamente.

### COMP-2 · WhatsApp message pré-preenchida pede "valores" · Nota 3/10
- **Severidade:** Média
- **Evidência:** [src/config/profilaxiaConfig.ts:13](src/config/profilaxiaConfig.ts)
- **Regra violada:** indireta — força Sofia (assistente) a responder sobre preço em canal escrito
- **Detalhes em:** COPY-4
- **Recomendação:** reescrever message para "agendar consulta + disponibilidade".

### COMP-3 · Preços/valores em keywords SEO de LP · Nota 7/10
- **Severidade:** Baixa (não user-facing)
- **Evidência:** [src/config/lentesPorcelanaProfissionalConfig.ts:103](src/config/lentesPorcelanaProfissionalConfig.ts) — keyword `'lentes de porcelana preço'`; [src/config/implantesDentariosConfig.ts:102](src/config/implantesDentariosConfig.ts) — `'preço implante dentário'`
- **Análise:** keywords técnicas para SEO/Google Ads — não aparecem na página. Aceitável tecnicamente, MAS atrai tráfego que busca preço, criando desalinhamento de expectativa.
- **Recomendação:** considerar negative keywords no Google Ads para "preço" / "barato".

### COMP-4 · Fotos antes/depois (regra §1.1) · Nota 9/10
- **Análise:** todas as referências a "antes e depois" são para modelos 3D (renderings) — não fotos de pacientes:
  - [src/pages/ClareamentoDental.tsx:404](src/pages/ClareamentoDental.tsx) — "Modelo 3D mostrando antes e depois do clareamento"
  - [src/pages/en/EnTeethWhiteningPage.tsx:314](src/pages/en/EnTeethWhiteningPage.tsx) — "3D model showing before and after"
  - [src/components/TreatmentPageTemplate.tsx:104](src/components/TreatmentPageTemplate.tsx) — "Antes e depois do clareamento — comparação de resultados" (alt-text — verificar se imagem é 3D)
- **Pendência:** [src/pages/LentesEFacetas.tsx:1340-1362](src/pages/LentesEFacetas.tsx) — bloco "Casos Antes e Depois (Condicional)" com tipo `BeforeAfterCase[]`. Se condicional/vazio, OK; se houver casos populados, pode ser violação.
- **Recomendação:** confirmar que `beforeAfterCases` sempre vazio em produção, ou remover o componente para evitar uso futuro indevido.

### COMP-5 · Garantia de resultados · Nota 9/10
- **Análise:** termo "garantir" aparece ~25x mas em contextos legítimos:
  - "garantir conforto" (técnico)
  - "garantir adaptação" (procedimento)
  - "garantia de resultados seguros" — [ClareamentoGuide.tsx:66](src/components/landing/clareamento/ClareamentoGuide.tsx) — borderline; "garantia de resultados" é forte
- **Recomendação:** trocar para "acompanhamento regular para ajustes e segurança contínua".

### COMP-6 · CRO-RJ visível em materiais · Nota 9/10
- ✅ Hero ([Hero.tsx:68](src/components/Hero.tsx))
- ✅ Footer ([Footer.tsx:16](src/components/Footer.tsx))
- ✅ About ([AboutPage.tsx:154](src/pages/AboutPage.tsx))
- ✅ HomepageStatsBar (com formatação a melhorar — UX-5)
- ✅ Schema (LocalBusiness identifier + Person hasCredential)

### COMP-7 · "atendimento personalizado" em meta description · Nota 7/10
- **Severidade:** Baixa
- **Evidência:** [src/config/consultaInicialConfig.ts:95](src/config/consultaInicialConfig.ts) — meta description LP Consulta Inicial
- **Regra:** CLAUDE.md §1.2 — palavra banida (preferir "mínimo de 1 hora por consulta")
- **Recomendação:** trocar por algo concreto, ex: "Consulta odontológica sem pressa em Ipanema. Mínimo de 1 hora por consulta com a Dra. Carla Christoph..."

---

## 2. Atribuição de Tratamentos

### COMP-8 · Atribuição de Periodontia ambígua · Nota 5/10
- **Severidade:** Alta
- **Evidência:** [src/pages/SaudeDaGengiva.tsx:137](src/pages/SaudeDaGengiva.tsx) — "a Dra. Carla reavalia"
- **Conflito:** CLAUDE.md §1.4 — "Gengiva: Periodontista parceiro · Diagnóstico + manutenção" (não diz que Dra. Carla executa)
- **Risco regulatório:** se Dra. Carla NÃO tem especialidade formal em Periodontia mas a página sugere que ela trata, viola normas CRO sobre divulgação de especialidade não registrada.
- **Recomendação:** revisar SaudeDaGengiva e SaudeGengivalLandingPage. Linguagem deve ser ou "a Dra. Carla coordena com a periodontista parceira" ou "a periodontista parceira reavalia, e a Dra. Carla acompanha o resultado estético".

### COMP-9 · Atribuição de Canal · Nota 7/10
- **Análise:** TratamentoDeCanal.tsx existe como service page. CLAUDE.md §1.4 diz "Canal: Endodontista parceiro · Diagnóstico + finalização".
- **Pendência:** verificar se TratamentoDeCanal.tsx menciona explicitamente que canal é executado por endodontista parceiro. Não foi auditado em profundidade.
- **Recomendação:** sprint de validação dedicado a Canal + Periodontia.

### COMP-10 · Dr. Bruno corretamente sem "Christoph" · Nota 9/10
- ✅ [src/pages/Ortodontia.tsx](src/pages/Ortodontia.tsx) usa "Dr. Bruno Moreira das Neves" e "Dr. Bruno Moreira"
- ✅ Grep por "Bruno Christoph" = 0 ocorrências

### COMP-11 · Atribuição CRO de Dr. Bruno · Nota 8/10
- **Análise:** CLAUDE.md §1.4 cita "CRO-RJ 41.684" para Dr. Bruno. Verificar se aparece em algum lugar do site (como CRO da Dra. Carla aparece).
- **Recomendação:** se Dr. Bruno é mencionado como executor, seu CRO deve estar visível na seção que o cita (boa prática + compliance CRO).

---

## 3. Schema.org / Dados Estruturados

### COMP-12 · `AggregateRating` em conflito documental · Nota 5/10
- Já documentado em [01-AUDIT-SEO.md SEO-3](01-AUDIT-SEO.md)
- **Resumo:** decisão ativa = MANTER (Patrick autorizou), mas CLAUDE.md §11 + BRAND.md §6 dizem "removido". Fonte de confusão.
- **Recomendação:** atualizar CLAUDE.md §11 com nota explícita, ex:
  > | `AggregateRating` (revisão Maio/2026) | Mantido — dados reais do Google (4.9, 23 reviews) — exceção autorizada por benefício SEO |

### COMP-13 · Dados de contato divergentes (CEP) · Nota 1/10
- **Severidade:** Alta · **Esforço:** S · **Quick win:** ✅
- 3 valores conflitantes — ver SEO-1
- **Risco:** confusão para Google Maps + Knowledge Panel; pacientes podem entrar com CEP errado em apps GPS

### COMP-14 · Telephone format inválido em GlobalSchemas · Nota 3/10
- Ver SEO-2

### COMP-15 · Horário de funcionamento ambíguo · Nota 5/10
- Schema diz Mon-Fri 8-18 + Sat 8-14
- CLAUDE.md §14 diz "Seg-Sex 9h-19h"
- **Recomendação:** alinhar (e confirmar com Dra. Carla qual é o real).

---

## 4. Depoimentos (formato BRAND.md)

### COMP-16 · Depoimentos da Homepage com estrelas e "Recomendo" · Nota 3/10
- Ver UX-3 e COPY-10
- **Resumo:**
  - 5 estrelas douradas por depoimento (BRAND.md §3 proíbe)
  - "Recomendo de olhos fechados" (palavra banida)
  - Formato `name + location` separados (em vez de "Nome I. — Bairro")

### COMP-17 · Depoimentos de LPs estão no formato correto · Nota 9/10
- ✅ [implantesDentariosConfig.ts:56-60](src/config/implantesDentariosConfig.ts) — `name: "Roberto S. — Copacabana"`
- ✅ Tom conversacional, fato concreto
- ✅ Sem estrelas (porque o componente da LP não renderiza)

---

## 5. Bio canônica

### COMP-18 · Bio canônica respeitada · Nota 9/10
- **Evidência:** [src/pages/AboutPage.tsx:154](src/pages/AboutPage.tsx) replica BRAND.md §1 exatamente: CRO-RJ, especialidades, 8 anos Marinha, "tempo e atenção"
- **Variações por contexto:** OK (cada service page adiciona frase contextual)

---

## Conformidade contra Checklist CLAUDE.md §15

| Item do checklist | Status |
|---|:-:|
| Li este CLAUDE.md por completo | ✅ (auditoria) |
| Verifiquei com grep o que já existe | ✅ |
| Verifiquei BRAND.md para palavras banidas | ✅ |
| Verifiquei TRACKING.md (CTAs/dataLayer) | ✅ |
| Não menciona preços, garante resultados, ou usa fotos proibidas | ❌ "gratuita", "parcelamento", "valores" — ver COMP-1, 2 |
| Atribuição de tratamentos correta | ⚠️ SaudeDaGengiva ambígua (COMP-8) |
| Dr. Bruno = "Dr. Bruno" (sem Christoph) | ✅ |
| Novo CTA tem dataLayer + gtag + sendGCLIDToWebhook | ✅ (verificado em Hero, About, etc.) |
| Nenhum CTA usa "avaliação" — usar "consulta" | ✅ Conforme |
| CSS global testado | (não aplicável a auditoria) |
| Meta tags + Schema.org presentes | ✅ |
| noindex/nofollow nas LPs | ✅ |

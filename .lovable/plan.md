

## Plano: Garantir noindex, nofollow em todas as Landing Pages

### Resumo

Das 15 landing pages listadas (incluindo o template), o cenario atual e:

**Ja tem `noindex, nofollow` (nenhuma acao necessaria):**
- `LandingPageTemplate.tsx` (linha 90) - OK

**Tem `robots` com `index, follow` (trocar para `noindex, nofollow`):**
- `ClareamentoLandingPage.tsx` (linha 88)
- `ConsultaInicialLandingPage.tsx` (linha 98)
- `OrtodontiaLandingPage.tsx` (linha 98)
- `ImplantesDentariosLandingPage.tsx` (linha 86)
- `ProfilaxiaLandingPage.tsx` (linha 109)
- `EspecialistaProteseLandingPage.tsx` (linha 135)
- `LentesDeContatoPorcelanaLandingPage.tsx` (linha 194)

**Nao tem tag `robots` (adicionar `<meta name="robots" content="noindex, nofollow" />`):**
- `LimpezaDentalLandingPage.tsx`
- `DorDeDenteLandingPage.tsx`
- `DenteQuebradoLandingPage.tsx`
- `EmergenciaOdontologicaLandingPage.tsx`
- `EsteticaSorrisoLandingPage.tsx`
- `SaudeGengivalLandingPage.tsx`
- `LPLentesPorcelana.tsx`

Nota: `FacetasResinaDiretaLandingPage.tsx` nao foi listada pelo usuario, mas tambem nao tem a tag. Sera ignorada conforme solicitado.

### Alteracoes

**Grupo 1 - Trocar valor existente (7 arquivos):**
Substituir o conteudo da meta tag robots existente por `noindex, nofollow`. Tambem remover `googlebot` index/follow se presente (caso de `LentesDeContatoPorcelanaLandingPage.tsx` linha 195).

**Grupo 2 - Adicionar tag (7 arquivos):**
Inserir `<meta name="robots" content="noindex, nofollow" />` logo apos a tag `<meta name="description">` ou `<meta name="keywords">` dentro do `<Helmet>`, sem alterar mais nada.

### Detalhes Tecnicos

| Arquivo | Acao | Linha |
|---------|------|-------|
| ClareamentoLandingPage.tsx | Trocar `index, follow` | 88 |
| ConsultaInicialLandingPage.tsx | Trocar `index, follow` | 98 |
| OrtodontiaLandingPage.tsx | Trocar `index, follow` | 98 |
| ImplantesDentariosLandingPage.tsx | Trocar `index, follow` | 86 |
| ProfilaxiaLandingPage.tsx | Trocar valor longo | 109 |
| EspecialistaProteseLandingPage.tsx | Trocar valor longo | 135 |
| LentesDeContatoPorcelanaLandingPage.tsx | Trocar valor longo + remover googlebot | 194-195 |
| LimpezaDentalLandingPage.tsx | Adicionar apos description | ~122 |
| DorDeDenteLandingPage.tsx | Adicionar apos description | ~110 |
| DenteQuebradoLandingPage.tsx | Adicionar apos description | ~110 |
| EmergenciaOdontologicaLandingPage.tsx | Adicionar apos description | ~110 |
| EsteticaSorrisoLandingPage.tsx | Adicionar apos description | ~123 |
| SaudeGengivalLandingPage.tsx | Adicionar apos description | ~134 |
| LPLentesPorcelana.tsx | Adicionar apos description | ~39 |

Nenhuma outra alteracao sera feita nos arquivos.


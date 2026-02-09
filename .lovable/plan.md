

## Padronizar telefone e endereco nos schemas JSON-LD

### Resumo
20 arquivos contem structured data JSON-LD com telefone e/ou endereco inconsistentes. Todos serao padronizados para:

- **Telefone**: `"+5521993304045"`
- **Endereco completo**:
```text
"streetAddress": "Rua Visconde de Pirajá, 550 - Sala 1107"
"addressLocality": "Ipanema"
"addressRegion": "RJ"
"postalCode": "22410-002"
"addressCountry": "BR"
```

### Arquivos e alteracoes

#### Grupo 1 -- Telefone incorreto + endereco incompleto (precisa corrigir ambos)

| # | Arquivo | Telefone atual | Endereco faltando |
|---|---------|---------------|-------------------|
| 1 | `Index.tsx` (L33, L20-25) | `"+55 21 99330-4045"` | streetAddress errado, postalCode ok mas addressLocality errado |
| 2 | `EspecialistaProteseLandingPage.tsx` (L153, L154-160) | `"+55 21 99330-4045"` | Sem sala/postalCode |
| 3 | `LentesDeContatoPorcelanaLandingPage.tsx` (L156, L157-163) | `"+55 21 99330-4045"` | addressLocality e streetAddress invertidos |
| 4 | `LentesDeContatoEmPorcelanaProfissionalLandingPage.tsx` (L197, L198-204) | `"+55 21 99330-4045"` | Sem sala/postalCode |
| 5 | `SaudeGengivalLandingPage.tsx` (L105, L106-111) | `"+55 21 99330-4045"` | Sem streetAddress/postalCode |
| 6 | `FacetasResinaDiretaLandingPage.tsx` (L74, L75-80) | `"+55-21-99330-4045"` | Sem streetAddress/postalCode |
| 7 | `LPLentesPorcelana.tsx` (L62, L63-68) | `"+55-21-99330-4045"` | Sem streetAddress/postalCode |
| 8 | `ClareamentoDental.tsx` (L62, L63-68) | `"+55-21-99330-4045"` | Sem streetAddress/postalCode |
| 9 | `ProteseDentaria.tsx` (L104, L105-110) | `"+55-21-99330-4045"` | Sem streetAddress/postalCode |
| 10 | `EsteticaSorrisoLandingPage.tsx` (L94, L96-101) | `config.whatsapp.number` (sem +) | Sem streetAddress/postalCode |

#### Grupo 2 -- Telefone ok, endereco incompleto

| # | Arquivo | Telefone | Endereco faltando |
|---|---------|----------|-------------------|
| 11 | `ProfilaxiaLandingPage.tsx` (L188, L182-187) | OK | Sem streetAddress/postalCode |
| 12 | `ImplantesDentariosLandingPage.tsx` (L157, L159-164) | OK | Sem streetAddress/postalCode, addressRegion="Rio de Janeiro" |
| 13 | `ConsultaInicialLandingPage.tsx` (L137, L138-143) | OK | Sem streetAddress/postalCode, addressRegion="Rio de Janeiro" |
| 14 | `OrtodontiaLandingPage.tsx` (L137, L138-143) | OK | Sem streetAddress/postalCode, addressRegion="Rio de Janeiro" |

#### Grupo 3 -- Telefone dinamico (config), endereco incompleto

| # | Arquivo | Telefone atual | Endereco faltando |
|---|---------|---------------|-------------------|
| 15 | `DorDeDenteLandingPage.tsx` (L196, L190-195) | `` `+${config.whatsapp.number}` `` | Sem streetAddress/postalCode |
| 16 | `EmergenciaOdontologicaLandingPage.tsx` (L196, L190-195) | `` `+${config.whatsapp.number}` `` | Sem streetAddress/postalCode |
| 17 | `DenteQuebradoLandingPage.tsx` (L196, L190-195) | `` `+${config.whatsapp.number}` `` | Sem streetAddress/postalCode |
| 18 | `LimpezaDentalLandingPage.tsx` (L221, L215-220) | `` `+${config.whatsapp.number}` `` | Sem streetAddress/postalCode |

#### Grupo 4 -- Sem telefone, endereco incompleto

| # | Arquivo | Observacao |
|---|---------|-----------|
| 19 | `ImplantesDentarios.tsx` (L118-123) | Sem telephone, endereco incompleto |
| 20 | `AboutPage.tsx` (L58-63) | Sem telephone, addressLocality="Ipanema, Rio de Janeiro" |

### Detalhes tecnicos

**Para cada arquivo:**
1. Substituir o valor de `"telephone"` por `"+5521993304045"` (string fixa, sem template literals)
2. Substituir o bloco `"address"` inteiro pelo endereco padrao completo com 5 campos
3. Nos arquivos sem `"telephone"` (ImplantesDentarios, AboutPage), apenas corrigir o endereco

**Excecoes:**
- `EsteticaSorrisoLandingPage.tsx`: substituir `config.whatsapp.number` por string fixa `"+5521993304045"`
- `DorDeDente/Emergencia/DenteQuebrado/LimpezaDental`: substituir template literal por string fixa
- `Index.tsx`: corrigir tambem `addressLocality` de "Rio de Janeiro" para "Ipanema" e `streetAddress` de "Rua Visconde de Pirajá, Ipanema" para o formato completo

### O que NAO muda
- Nenhuma logica, componente ou estilo
- Nenhum outro campo do structured data (geo, openingHours, offers, etc.)
- Nenhum arquivo fora de `src/pages/`

### Risco
Zero. Apenas strings dentro de objetos JSON em JSX.


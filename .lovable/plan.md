
## Remover AggregateRating fabricado

### Problema
Tres arquivos contem `aggregateRating` no structured data (JSON-LD) sem base em avaliacoes reais verificaveis. Isso pode gerar penalizacao do Google por dados estruturados enganosos.

### Arquivos afetados (3)

**1. `src/pages/LentesDeContatoPorcelanaLandingPage.tsx`** (linhas 170-175)
- Remover a virgula apos `"priceRange": "$$$"` e o bloco `aggregateRating` inteiro
- O objeto fecha direto apos `"priceRange": "$$$"`

**2. `src/pages/Index.tsx`** (linhas 58-65)
- Remover a virgula no final do array `sameAs` (linha 58) e o bloco `aggregateRating` inteiro (linhas 59-65)
- A propriedade `sameAs` fica seguida diretamente por `"hasOfferCatalog"`

**3. `src/pages/EspecialistaProteseLandingPage.tsx`** (linhas 171-176)
- Remover a virgula apos `"openingHours"` e o bloco `aggregateRating` inteiro
- O objeto fecha direto apos `"openingHours": "Mo-Fr 08:00-18:00"`

### O que NAO muda
- Nenhum outro structured data e alterado
- Nenhum componente React e modificado
- Nenhum estilo ou rota e afetado

### Risco
Zero. Apenas remove trechos de JSON dentro de strings template.

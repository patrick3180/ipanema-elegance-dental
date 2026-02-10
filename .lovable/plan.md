

## Restaurar rota da LP Facetas de Resina

### Problema
O arquivo `src/pages/FacetasResinaDiretaLandingPage.tsx` existe e foi recentemente migrado para os componentes `ConsultaInicial*`, mas nao possui rota no `App.tsx`. A pagina nunca foi adicionada ao router, entao acessar `/lp/facetas-resina-ipanema` redireciona para home (catch-all).

### Correcao

**Arquivo: `src/App.tsx`**

1. Adicionar o lazy import junto com as outras landing pages (apos linha 35):
```typescript
const FacetasResinaDiretaLandingPage = lazy(() => import("./pages/FacetasResinaDiretaLandingPage"));
```

2. Adicionar a rota junto com as outras LPs (apos a rota de `LPLentesPorcelana`, linha 113):
```tsx
<Route path="/lp/facetas-resina-ipanema" element={<FacetasResinaDiretaLandingPage />} />
```

### O que NAO muda
- Nenhum outro arquivo e alterado
- Nenhum config, componente ou rota existente e modificado
- O componente `FacetasResinaDiretaLandingPage.tsx` permanece intacto


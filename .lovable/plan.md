

## Adicionar rota ao generate-static-meta.cjs

Adicionar a entrada `/lentes-de-contato-dental-e-facetas-de-porcelana` ao objeto `routes` no arquivo `scripts/generate-static-meta.cjs`, logo apos a entrada existente de `/lentes-de-contato-dental-e-facetas-de-resina`.

### Alteracao

**Arquivo:** `scripts/generate-static-meta.cjs`

Adicionar ao objeto `routes`:
```js
'/lentes-de-contato-dental-e-facetas-de-porcelana': {
  title: 'Lentes de Contato Dental e Facetas em Ipanema | Dra. Carla Christoph',
  description: 'Lentes de contato dental e facetas em Ipanema. Transforme seu sorriso com a Dra. Carla Christoph. Resultados naturais e duradouros.',
},
```

### O que NAO muda
- Nenhuma outra rota, landing page ou logica do script
- Nenhum outro arquivo


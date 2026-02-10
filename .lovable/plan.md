
## Corrigir imagens quebradas nos cards de implantes

### Diagnostico
As imagens dos 4 cards de modalidades na pagina `/implantes-dentarios` usam nomes de arquivo com **espacos** (ex: `Implante unitario.webp`, `Ponte Implante.webp`, `all in 4.webp`, `Overdenture com clips de retencao.webp`). No preview do Lovable elas funcionam, mas em producao os espacos nos nomes podem causar falhas dependendo de como o CDN codifica as URLs.

A solucao e **adicionar loading="eager" e tratamento de erro** nas imagens dos cards, e garantir que as URLs estejam corretamente encodadas. Alternativamente, podemos renomear os arquivos para nomes sem espacos (mais robusto).

### Solucao: Renomear arquivos + atualizar referencias

**Abordagem mais robusta:** Copiar os 4 arquivos com nomes sem espacos e atualizar as referencias no codigo.

#### Arquivos a renomear (copiar com novo nome)
| Arquivo atual | Novo nome |
|---|---|
| `Implante unitario.webp` | `implante-unitario.webp` |
| `Ponte Implante.webp` | `ponte-implante.webp` |
| `all in 4.webp` | `all-in-4.webp` |
| `Overdenture com clips de retenção.webp` | `overdenture-clips-retencao.webp` |

#### Arquivo a editar
**`src/pages/ImplantesDentarios.tsx`** — Atualizar os 4 `src` das imagens:
- Linha 167: `/lovable-uploads/Implante unitario.webp` → `/lovable-uploads/implante-unitario.webp`
- Linha 218: `/lovable-uploads/Ponte Implante.webp` → `/lovable-uploads/ponte-implante.webp`
- Linha 269: `/lovable-uploads/all in 4.webp` → `/lovable-uploads/all-in-4.webp`
- Linha 320: `/lovable-uploads/Overdenture com clips de retenção.webp` → `/lovable-uploads/overdenture-clips-retencao.webp`

### O que NAO muda
- Nenhum outro arquivo ou componente
- Layout, gradientes e texto dos cards permanecem identicos
- Nenhuma outra imagem do projeto e afetada

### Por que isso resolve
Nomes de arquivo com espacos e caracteres especiais (como `ç`) dependem de URL encoding correto. Ao usar nomes kebab-case sem acentos, eliminamos essa dependencia e garantimos compatibilidade com qualquer CDN ou servidor.

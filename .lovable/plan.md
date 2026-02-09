

## Correcao: HTMLs estaticos nao servidos pelo Vercel

### Problema
O Vercel ignora os subdiretorios `dist/implantes-dentarios/index.html` por causa do rewrite catch-all, servindo sempre o `dist/index.html` raiz.

### Alteracoes (2 arquivos)

**1. `scripts/generate-static-meta.js`**
Trocar a logica de escrita de subdiretorios para arquivos `.html` na raiz do `dist`:
- De: `dist/implantes-dentarios/index.html`
- Para: `dist/implantes-dentarios.html`
- Para rotas com subpath (`/lp/consulta-inicial`): `dist/lp/consulta-inicial.html`

A alteracao e feita nos dois loops (paginas organicas e landing pages), substituindo:
```text
const dirPath = path.join(distDir, routePath);
fs.mkdirSync(dirPath, { recursive: true });
fs.writeFileSync(path.join(dirPath, 'index.html'), ...);
```
Por:
```text
const filePath = path.join(distDir, routePath + '.html');
const fileDir = path.dirname(filePath);
fs.mkdirSync(fileDir, { recursive: true });
fs.writeFileSync(filePath, ...);
```

**2. `vercel.json`**
Adicionar `"cleanUrls": true` ao objeto raiz. Isso faz o Vercel servir `implantes-dentarios.html` quando o usuario acessa `/implantes-dentarios`. Nenhuma outra propriedade e alterada.

### Resultado
- Crawlers e bots receberao as meta tags corretas por rota
- URLs continuam limpas (sem `.html`)
- Nenhum componente React, rota ou estilo e alterado

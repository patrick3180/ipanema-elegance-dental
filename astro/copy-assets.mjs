/**
 * Copia os assets estáticos do site atual (../public) para astro/public.
 * Roda antes do build (npm run build). NÃO copia:
 *  - sitemap.xml / robots.txt — agora são ROTAS do Astro (src/pages/sitemap.xml.ts
 *    e src/pages/robots.txt.ts). As cópias em ../public são legado do app React e
 *    estão DESATUALIZADAS; se fossem copiadas, colidiriam com as rotas. Manter no
 *    EXCLUDE.
 * Os diretórios copiados são gitignorados (a fonte da verdade é ../public).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const here = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(here, '..', 'public');
const DST = path.join(here, 'public');

const EXCLUDE = new Set(['sitemap.xml', 'robots.txt']);

function copyRecursive(src, dst) {
  const st = fs.statSync(src);
  if (st.isDirectory()) {
    fs.mkdirSync(dst, { recursive: true });
    for (const name of fs.readdirSync(src)) {
      copyRecursive(path.join(src, name), path.join(dst, name));
    }
  } else {
    fs.mkdirSync(path.dirname(dst), { recursive: true });
    fs.copyFileSync(src, dst);
  }
}

let copied = 0;
for (const name of fs.readdirSync(SRC)) {
  if (EXCLUDE.has(name)) continue;
  copyRecursive(path.join(SRC, name), path.join(DST, name));
  copied++;
}
console.log(`[copy-assets] ${copied} itens copiados de ../public para ./public (excluídos: ${[...EXCLUDE].join(', ')})`);

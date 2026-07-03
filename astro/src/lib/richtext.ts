/**
 * Rich text (Contentful) → HTML — PORTADO de src/services/contentful/transformers.ts.
 * Mesmas regras de renderização; classes CSS semânticas (estilizadas no layout)
 * no lugar das classes Tailwind do React.
 */
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import type { ContentfulAsset } from './contentful';

function optimizeImg(url: string, w = 800): string {
  let full = url.startsWith('//') ? 'https:' + url : url;
  if (full.includes('ctfassets.net')) {
    const sep = full.includes('?') ? '&' : '?';
    full = `${full}${sep}w=${w}&fm=webp&q=80`;
  }
  return full;
}

export function richTextToHtml(doc: any, assetMap: Map<string, ContentfulAsset>): string {
  if (!doc || !doc.nodeType) return '';
  try {
    return documentToHtmlString(doc, {
      renderMark: {
        [MARKS.BOLD]: (t) => `<strong>${t}</strong>`,
        [MARKS.ITALIC]: (t) => `<em>${t}</em>`,
        [MARKS.UNDERLINE]: (t) => `<u>${t}</u>`,
        [MARKS.CODE]: (t) => `<code>${t}</code>`,
      },
      renderNode: {
        [BLOCKS.PARAGRAPH]: (node, next) => `<p>${next(node.content)}</p>`,
        // H1 já é o título do post — headings do corpo descem um nível
        [BLOCKS.HEADING_1]: (node, next) => `<h2>${next(node.content)}</h2>`,
        [BLOCKS.HEADING_2]: (node, next) => `<h2>${next(node.content)}</h2>`,
        [BLOCKS.HEADING_3]: (node, next) => `<h3>${next(node.content)}</h3>`,
        [BLOCKS.HEADING_4]: (node, next) => `<h4>${next(node.content)}</h4>`,
        [BLOCKS.HEADING_5]: (node, next) => `<h5>${next(node.content)}</h5>`,
        [BLOCKS.HEADING_6]: (node, next) => `<h6>${next(node.content)}</h6>`,
        [BLOCKS.UL_LIST]: (node, next) => `<ul>${next(node.content)}</ul>`,
        [BLOCKS.OL_LIST]: (node, next) => `<ol>${next(node.content)}</ol>`,
        [BLOCKS.LIST_ITEM]: (node, next) => `<li>${next(node.content)}</li>`,
        [BLOCKS.QUOTE]: (node, next) => `<blockquote>${next(node.content)}</blockquote>`,
        [BLOCKS.HR]: () => '<hr/>',
        [BLOCKS.EMBEDDED_ASSET]: (node) => {
          const id = node.data?.target?.sys?.id;
          const asset = (id && assetMap.get(id)) || node.data?.target;
          const url = asset?.fields?.file?.url;
          if (!url) return '';
          const title = asset.fields?.title || 'Imagem do artigo';
          return `<figure class="post-figure"><img src="${optimizeImg(url)}" alt="${String(title).replace(/"/g, '&quot;')}" loading="lazy" decoding="async" /></figure>`;
        },
        [INLINES.HYPERLINK]: (node, next) => {
          const url = node.data?.uri || '#';
          return `<a href="${String(url).replace(/"/g, '&quot;')}" rel="noopener">${next(node.content)}</a>`;
        },
        [INLINES.ENTRY_HYPERLINK]: (node, next) => `${next(node.content)}`,
      },
    });
  } catch {
    return '';
  }
}

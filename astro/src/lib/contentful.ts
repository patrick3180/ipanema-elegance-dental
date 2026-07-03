/**
 * Loader Contentful (build-time) — Fase 1 da migração Astro.
 * Lê os posts publicados via Content Delivery API (CDA) uma única vez por build.
 * Mesma query do site atual (generate-blog-html.js / api/sitemap.js).
 */

const SPACE_ID = import.meta.env.CONTENTFUL_SPACE_ID;
const CDA_TOKEN = import.meta.env.CONTENTFUL_CDA_TOKEN;

export interface ContentfulAsset {
  sys: { id: string };
  fields: { title?: string; description?: string; file?: { url: string } };
}

export interface BlogPostEntry {
  sys: { id: string; createdAt: string; updatedAt: string };
  fields: Record<string, any>;
}

export interface BlogData {
  posts: BlogPostEntry[];
  assetMap: Map<string, ContentfulAsset>;
}

let cache: BlogData | null = null;

export async function getBlogData(): Promise<BlogData> {
  if (cache) return cache;
  if (!SPACE_ID || !CDA_TOKEN) {
    throw new Error('CONTENTFUL_SPACE_ID / CONTENTFUL_CDA_TOKEN ausentes (astro/.env ou env da Vercel)');
  }
  const url =
    `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries` +
    `?content_type=blogCarla&limit=200&include=2&access_token=${CDA_TOKEN}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Contentful CDA error: ${res.status}`);
  const data = await res.json();

  const assetMap = new Map<string, ContentfulAsset>();
  for (const a of data.includes?.Asset ?? []) {
    if (a?.sys?.id) assetMap.set(a.sys.id, a);
  }
  cache = { posts: data.items ?? [], assetMap };
  return cache;
}

// ── Helpers de campos (dual-naming PT/EN + typo histórico) ──

export function resolveSlug(post: BlogPostEntry): string {
  let slug = post.fields?.slug;
  if (!slug && post.fields?.titulo) {
    slug = String(post.fields.titulo)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .replace(/--+/g, '-');
  }
  return slug || '';
}

export function postMeta(post: BlogPostEntry, assetMap: Map<string, ContentfulAsset>) {
  const f = post.fields ?? {};
  const imgRef = f.featuredImage || f.imagemPrincipal;
  let rawImg: string = imgRef?.fields?.file?.url || '';
  if (!rawImg && imgRef?.sys?.id) rawImg = assetMap.get(imgRef.sys.id)?.fields?.file?.url || '';
  const fullImg = rawImg ? (rawImg.startsWith('//') ? 'https:' + rawImg : rawImg) : '';

  return {
    slug: resolveSlug(post),
    title: f.titulo || f.title || 'Artigo',
    excerpt: f.resumo || f.excerpt || '',
    metaDescription: String(f.metaDescription || f.resumo || f.excerpt || '').substring(0, 160),
    author: f.autor || f.author || 'Dra. Carla Christoph',
    category: f.categoria || 'Odontologia',
    date: f.publishDate || f.dataDePublicacao || post.sys?.createdAt || '',
    lastUpdated: f.lastUpdated || f.publishDate || post.sys?.updatedAt || '',
    contentDoc: f.conteudo || f.content || null,
    imageUrl: fullImg,
    imageOptimized: fullImg && fullImg.includes('ctfassets.net') ? `${fullImg}?w=800&fm=webp&q=80` : fullImg,
    quickAnswer: f.quickAnswerBox || f.quickAnswerBoquickAnswerBoxx || '',
    keyTakeaways: (Array.isArray(f.keyTakeaways) ? f.keyTakeaways : []) as string[],
    faqStructured: (Array.isArray(f.faqStructured) ? f.faqStructured : []) as Array<{
      name?: string;
      question?: string;
      acceptedAnswer?: { text?: string };
    }>,
    peopleAlsoAsk: (f.peopleAlsoAsk?.questions || (Array.isArray(f.peopleAlsoAsk) ? f.peopleAlsoAsk : [])) as string[],
  };
}

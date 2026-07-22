/**
 * Loader Contentful (build-time) — Fase 1 da migração Astro.
 * Lê os posts publicados via Content Delivery API (CDA) uma única vez por build.
 * Mesma query do site atual (generate-blog-html.js / api/sitemap.js).
 */

// Credenciais Contentful (build-time). Aceita os nomes próprios do Astro (astro/.env local)
// E os que JÁ existem na Vercel do site atual (VITE_*), para o build de produção funcionar
// sem precisar criar env vars novas. VITE_CONTENTFUL_ACCESS_TOKEN é um token CDA (delivery).
// `import.meta.env` is supplied by Astro; the fallback also keeps pure helpers testable in Node.
const contentfulEnv = import.meta.env ?? {};
const SPACE_ID = contentfulEnv.CONTENTFUL_SPACE_ID || contentfulEnv.VITE_CONTENTFUL_SPACE_ID;
const CDA_TOKEN = contentfulEnv.CONTENTFUL_CDA_TOKEN || contentfulEnv.VITE_CONTENTFUL_ACCESS_TOKEN;

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
  entryMap: Map<string, any>; // entries linkadas (ex.: categoria) via includes.Entry
}

export interface ComparisonTableRow {
  criterion: string;
  values: string[];
}

export interface ComparisonTable {
  columns: string[];
  rows: ComparisonTableRow[];
}

/** `table: null` is the intentional, valid state for posts without a table. */
export type ComparisonTableNormalization =
  | { valid: true; table: ComparisonTable | null }
  | { valid: false; reason: string };

const FINANCIAL_CONTENT_RE = /(?:\br\$\s*\d|\b\d+(?:[.,]\d+)?\s*(?:reais|brl)\b|\bpre[cç]o\b|\bcusto\b|\bvalor\b|\binvestimento\b|\bfinanceir[oa]\b|\bparcel(?:a|amento)s?\b|\bor[çc]amento\b)/i;

function normalizedComparisonKey(value: unknown): string {
  return String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s+/g, ' ').trim();
}

function cell(value: unknown): string {
  return typeof value === 'string' || typeof value === 'number' ? String(value).trim() : '';
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function invalid(reason: string): ComparisonTableNormalization {
  return { valid: false, reason };
}

/** Accepts the current Contentful array, its old aliases, and the future canonical shape. */
export function normalizeComparisonTable(raw: unknown): ComparisonTableNormalization {
  if (raw == null || (Array.isArray(raw) && raw.length === 0)) return { valid: true, table: null };

  let columns: string[];
  let rows: ComparisonTableRow[];
  if (Array.isArray(raw)) {
    const [header, ...data] = raw;
    if (!isRecord(header)) return invalid('cabeçalho ausente ou inválido');
    const headerEntries = Object.entries(header);
    const criterionEntry = headerEntries.find(([key]) => ['criterio', 'criterion'].includes(normalizedComparisonKey(key)));
    // The currently stored shape has only option labels in its first object.
    const optionEntries = criterionEntry ? headerEntries.filter(([key]) => key !== criterionEntry[0]) : headerEntries;
    if (optionEntries.length < 2) return invalid('menos de duas opções comparáveis');
    columns = [criterionEntry ? cell(criterionEntry[1]) : 'Critério', ...optionEntries.map(([, value]) => cell(value))];
    if (data.length === 0) return invalid('sem linhas de dado');
    rows = [];
    for (let index = 0; index < data.length; index += 1) {
      if (!isRecord(data[index])) return invalid(`linha ${index + 1} não é objeto`);
      const source = data[index];
      const criterionKey = Object.keys(source).find((key) => ['criterio', 'criterion'].includes(normalizedComparisonKey(key)));
      if (!criterionKey) return invalid(`critério ausente na linha ${index + 1}`);
      const values = optionEntries.map(([key]) => cell(source[key]));
      rows.push({ criterion: cell(source[criterionKey]), values });
    }
  } else if (isRecord(raw)) {
    if (!Array.isArray(raw.columns) || !Array.isArray(raw.rows)) return invalid('formato de tabela desconhecido');
    columns = raw.columns.map(cell);
    rows = [];
    for (let index = 0; index < raw.rows.length; index += 1) {
      const source = raw.rows[index];
      if (!isRecord(source)) return invalid(`linha ${index + 1} não é objeto`);
      rows.push({ criterion: cell(source.criterion), values: Array.isArray(source.values) ? source.values.map(cell) : [] });
    }
  } else return invalid('formato de tabela desconhecido');

  if (columns.length < 3 || columns.some((value) => !value)) return invalid('cabeçalho de coluna vazio ou incompleto');
  const options = columns.slice(1).map(normalizedComparisonKey);
  if (new Set(options).size !== options.length) return invalid('opções duplicadas');
  if (rows.length < 1) return invalid('sem linhas de dado');
  const criteria = new Set<string>();
  for (let index = 0; index < rows.length; index += 1) {
    const row = rows[index];
    if (!row.criterion) return invalid(`critério vazio na linha ${index + 1}`);
    const criterion = normalizedComparisonKey(row.criterion);
    if (criteria.has(criterion)) return invalid('critérios duplicados');
    criteria.add(criterion);
    if (row.values.length !== options.length || row.values.some((value) => !value)) return invalid(`célula faltando na linha ${index + 1}`);
  }
  const allCells = [...columns, ...rows.flatMap((row) => [row.criterion, ...row.values])];
  if (allCells.some((value) => FINANCIAL_CONTENT_RE.test(value))) return invalid('conteúdo financeiro não permitido');
  return { valid: true, table: { columns, rows } };
}

const loggedComparisonTableFailures = new Set<string>();

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
  const entryMap = new Map<string, any>();
  for (const e of data.includes?.Entry ?? []) {
    if (e?.sys?.id) entryMap.set(e.sys.id, e);
  }
  cache = { posts: data.items ?? [], assetMap, entryMap };
  return cache;
}

// ── Helpers de campos (dual-naming PT/EN + typo histórico) ──

/**
 * Compliance CRO §1.3: "avaliação" NUNCA como CTA/convite de agendamento
 * (paciente confunde com serviço grátis). Normaliza APENAS a frase de
 * agendamento (agende/agendar/marque/marcar + [artigo] + avaliação → consulta),
 * preservando o uso clínico legítimo ("avaliar a saúde bucal", "avaliação
 * periodontal") e "avaliações" do Google. Aplicado em title/description/excerpt
 * vindos do Contentful — a fonte (Contentful) fica intacta.
 */
export function complianceCTA(text: string): string {
  return String(text || '').replace(
    /\b(agende|agendar|marque|marcar)(\s+(?:sua|uma|a|o)\s+)avalia[çc][ãa]o/gi,
    (_m, verb, mid) => `${verb}${mid}consulta`
  );
}

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

export function postMeta(
  post: BlogPostEntry,
  assetMap: Map<string, ContentfulAsset>,
  entryMap?: Map<string, any>
) {
  const f = post.fields ?? {};
  const comparisonTable = normalizeComparisonTable(f.comparisonTable);
  const slug = resolveSlug(post);
  if (!comparisonTable.valid && !loggedComparisonTableFailures.has(slug)) {
    loggedComparisonTableFailures.add(slug);
    console.warn(JSON.stringify({ event: 'comparison_table_invalid', slug, reason: comparisonTable.reason }));
  }
  const imgRef = f.featuredImage || f.imagemPrincipal;
  const imgAsset = imgRef?.fields ? imgRef : imgRef?.sys?.id ? assetMap.get(imgRef.sys.id) : null;
  const imgFile: any = imgAsset?.fields?.file || null;
  const rawImg: string = imgFile?.url || '';
  const fullImg = rawImg ? (rawImg.startsWith('//') ? 'https:' + rawImg : rawImg) : '';
  // Dimensões reais do asset (as featured do blog são 1024x1024) — evita crop/CLS
  const imgDims = imgFile?.details?.image || null;
  const imageWidth = 800;
  const imageHeight = imgDims?.width ? Math.round((800 * imgDims.height) / imgDims.width) : 800;

  // Categoria: o campo `category` é um LINK p/ entry (content type 'categoria', fields.name)
  const catRef = f.category || f.categoria;
  let categoryName = '';
  if (typeof catRef === 'string') categoryName = catRef;
  else if (catRef?.fields?.name) categoryName = catRef.fields.name;
  else if (catRef?.sys?.id && entryMap) categoryName = entryMap.get(catRef.sys.id)?.fields?.name || '';

  return {
    slug,
    title: complianceCTA(f.titulo || f.title || 'Artigo'),
    excerpt: complianceCTA(f.resumo || f.excerpt || ''),
    metaDescription: complianceCTA(String(f.metaDescription || f.resumo || f.excerpt || '')).substring(0, 160),
    author: f.autor || f.author || 'Dra. Carla Christoph',
    category: categoryName || 'Odontologia',
    date: f.publishDate || f.dataDePublicacao || post.sys?.createdAt || '',
    lastUpdated: f.lastUpdated || f.publishDate || post.sys?.updatedAt || '',
    contentDoc: f.conteudo || f.content || null,
    imageUrl: fullImg,
    imageOptimized: fullImg && fullImg.includes('ctfassets.net') ? `${fullImg}?w=800&fm=webp&q=80` : fullImg,
    imageWidth,
    imageHeight,
    quickAnswer: f.quickAnswerBox || f.quickAnswerBoquickAnswerBoxx || '',
    keyTakeaways: (Array.isArray(f.keyTakeaways) ? f.keyTakeaways : []) as string[],
    faqStructured: (Array.isArray(f.faqStructured) ? f.faqStructured : []) as Array<{
      name?: string;
      question?: string;
      acceptedAnswer?: { text?: string };
    }>,
    peopleAlsoAsk: (f.peopleAlsoAsk?.questions || (Array.isArray(f.peopleAlsoAsk) ? f.peopleAlsoAsk : [])) as string[],
    comparisonTable,
  };
}

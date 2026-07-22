import type { EditorialArchetype } from './contentful';

export type BlogModule = 'toc' | 'quickAnswer' | 'comparisonTable' | 'keyTakeaways' | 'content' | 'faq' | 'paa';

export interface BlogComposition {
  order: readonly BlogModule[];
  tocMode: 'current' | 'useful' | 'longGuide' | 'off';
  tableMode: 'phase0' | 'validated' | 'off';
  takeawaysMax: number | null;
  faqMax: number | null;
  paaMode: 'all' | 'selective' | 'off';
}

export const BLOG_COMPOSITIONS: Record<EditorialArchetype | 'legacyCurrent', BlogComposition> = {
  // This preserves the exact pre-Fase 2 DOM order. There is no TOC in the current Astro template.
  legacyCurrent: {
    order: ['comparisonTable', 'quickAnswer', 'keyTakeaways', 'content', 'faq', 'paa'],
    tocMode: 'off', tableMode: 'phase0', takeawaysMax: null, faqMax: null, paaMode: 'all',
  },
  decisao_entre_caminhos: {
    order: ['quickAnswer', 'comparisonTable', 'keyTakeaways', 'toc', 'content', 'faq'],
    tocMode: 'useful', tableMode: 'validated', takeawaysMax: null, faqMax: 4, paaMode: 'off',
  },
  jornada_clinica: {
    order: ['quickAnswer', 'toc', 'content', 'keyTakeaways', 'faq', 'paa'],
    tocMode: 'useful', tableMode: 'off', takeawaysMax: null, faqMax: null, paaMode: 'selective',
  },
  resposta_clinica_direta: {
    order: ['quickAnswer', 'content', 'keyTakeaways', 'faq'],
    tocMode: 'off', tableMode: 'off', takeawaysMax: 3, faqMax: 4, paaMode: 'off',
  },
  prevencao_na_pratica: {
    order: ['quickAnswer', 'keyTakeaways', 'toc', 'content', 'faq'],
    tocMode: 'longGuide', tableMode: 'off', takeawaysMax: null, faqMax: null, paaMode: 'off',
  },
};

export function resolveBlogComposition(archetypesEnabled: boolean, archetype: EditorialArchetype | null): BlogComposition {
  return archetypesEnabled && archetype ? BLOG_COMPOSITIONS[archetype] : BLOG_COMPOSITIONS.legacyCurrent;
}

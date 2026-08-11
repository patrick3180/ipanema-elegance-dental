/**
 * Perfil da Empresa no Google — FONTE ÚNICA do selo de avaliações.
 *
 * Todo selo "★ 5,0 (N avaliações)" e todo link "ver avaliações no Google"
 * do site sai daqui. Não repetir número nem URL em componente/página:
 * a contagem já derivou para 127 → 23 → 17 → 18 justamente por estar
 * copiada em ~20 arquivos.
 *
 * ── Como atualizar a contagem (a cada checagem manual) ────────────────
 * Abrir GOOGLE_REVIEWS_URL, ler o total ao lado das estrelas, atualizar
 * GOOGLE_REVIEW_COUNT e GOOGLE_REVIEWS_CHECKED_AT. O JSON-LD
 * (aggregateRating) usa o mesmo número — número inflado em rich snippet
 * é violação das diretrizes do Google.
 *
 * ── Por que a URL é essa ──────────────────────────────────────────────
 * A URL antiga (`/maps/place/Dra.+Carla+Christoph/@lat,lng,17z/`) só tinha
 * o NOME e as coordenadas. O nome não batia com o do perfil real
 * ("Dra. Carla Christoph - Reabilitação oral e estética"), então o Google
 * descartava o segmento e servia um mapa genérico do bairro — sem ficha,
 * sem avaliações.
 *
 * As URLs abaixo identificam o perfil pelo feature id
 * `0x9bd5070f90d87f:0x446370e6f29c86c4` (o mesmo do embed do mapa em
 * /contato), então independem do nome. O sufixo `!9m1!1b1` abre já na aba
 * "Avaliações". O CID é a segunda metade do feature id em decimal
 * (0x446370e6f29c86c4 = 4927906554488587972).
 */

/** Nota média — formato do schema.org e dos selos em inglês. */
export const GOOGLE_RATING = '5.0';

/** Nota média com vírgula decimal — formato dos selos das LPs em pt-BR. */
export const GOOGLE_RATING_PT = GOOGLE_RATING.replace('.', ',');

/** Total de avaliações no perfil. Conferido manualmente — ver cabeçalho. */
export const GOOGLE_REVIEW_COUNT = 21;

/** Data da última conferência da contagem (YYYY-MM-DD). */
export const GOOGLE_REVIEWS_CHECKED_AT = '2026-08-11';

/** Abre o perfil já na aba "Avaliações". Destino de todo selo/CTA de review. */
export const GOOGLE_REVIEWS_URL =
  'https://www.google.com/maps/place/Dra.+Carla+Christoph+-+Reabilita%C3%A7%C3%A3o+oral+e+est%C3%A9tica/data=!4m7!3m6!1s0x9bd5070f90d87f:0x446370e6f29c86c4!8m2!3d-22.9836633!4d-43.2116873!9m1!1b1';

/** Ficha do perfil (visão geral). Usado no `hasMap` dos schemas. */
export const GOOGLE_PROFILE_URL = 'https://www.google.com/maps?cid=4927906554488587972';

/** "21 avaliações" — texto pronto para o selo em pt-BR. */
export const GOOGLE_REVIEW_COUNT_PT = `${GOOGLE_REVIEW_COUNT} avaliações`;

/** "21 reviews" — texto pronto para o selo em inglês. */
export const GOOGLE_REVIEW_COUNT_EN = `${GOOGLE_REVIEW_COUNT} reviews`;

/** Bloco AggregateRating do schema.org, idêntico em todas as páginas. */
export const GOOGLE_AGGREGATE_RATING = {
  '@type': 'AggregateRating',
  ratingValue: GOOGLE_RATING,
  reviewCount: String(GOOGLE_REVIEW_COUNT),
  bestRating: '5',
} as const;

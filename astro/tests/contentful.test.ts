import assert from 'node:assert/strict';
import test from 'node:test';
import { normalizeComparisonTable, postMeta } from '../src/lib/contentful.ts';
import { BLOG_COMPOSITIONS, resolveBlogComposition } from '../src/lib/blogComposition.ts';

const current = [
  { 'Opção A': 'Resina', 'Opção B': 'Porcelana' },
  { 'Critério': 'Durabilidade', 'Opção A': '5 anos', 'Opção B': '15 anos' },
];

test('normaliza o array atual com chaves acentuadas', () => {
  assert.deepEqual(normalizeComparisonTable(current), { valid: true, table: { columns: ['Critério', 'Resina', 'Porcelana'], rows: [{ criterion: 'Durabilidade', values: ['5 anos', '15 anos'] }] } });
});

test('aceita apenas os quatro literais exatos de editorialArchetype', () => {
  const valid = ['decisao_entre_caminhos', 'jornada_clinica', 'resposta_clinica_direta', 'prevencao_na_pratica'];
  for (const editorialArchetype of valid) {
    const meta = postMeta({ sys: { id: editorialArchetype, createdAt: '', updatedAt: '' }, fields: { slug: editorialArchetype, editorialArchetype, editorialArchetypeReason: 'teste' } }, new Map());
    assert.equal(meta.editorialArchetype, editorialArchetype);
    assert.equal(meta.editorialArchetypeReason, 'teste');
  }
  for (const editorialArchetype of [undefined, null, '', ' decisao_entre_caminhos', 'decisao_entre_caminhos ', 'xyz', 1, {}]) {
    const meta = postMeta({ sys: { id: 'invalid', createdAt: '', updatedAt: '' }, fields: { slug: 'invalid', editorialArchetype } }, new Map());
    assert.equal(meta.editorialArchetype, null);
  }
});

test('resolve composição legado quando a flag está desligada ou o arquétipo é inválido', () => {
  assert.strictEqual(resolveBlogComposition(false, 'decisao_entre_caminhos'), BLOG_COMPOSITIONS.legacyCurrent);
  assert.strictEqual(resolveBlogComposition(true, null), BLOG_COMPOSITIONS.legacyCurrent);
  for (const composition of Object.values(BLOG_COMPOSITIONS)) {
    assert.equal(new Set(composition.order).size, composition.order.length);
    assert.equal(composition.order.filter((module) => module === 'content').length, 1);
  }
});

test('normaliza formato legado sem acento e Critério/Criterio', () => {
  const raw = [
    { Criterio: 'Critério', OpcaoA: 'A', OpcaoB: 'B' },
    { Criterio: 'Tempo', OpcaoA: 'Uma sessão', OpcaoB: 'Duas sessões' },
  ];
  assert.deepEqual(normalizeComparisonTable(raw), { valid: true, table: { columns: ['Critério', 'A', 'B'], rows: [{ criterion: 'Tempo', values: ['Uma sessão', 'Duas sessões'] }] } });
});

test('aceita o formato canônico futuro', () => {
  assert.equal(normalizeComparisonTable({ columns: ['Critério', 'A', 'B'], rows: [{ criterion: 'Tempo', values: ['1', '2'] }] }).valid, true);
});

test('invalida célula faltando, opção duplicada e critério duplicado', () => {
  assert.equal(normalizeComparisonTable([{ 'Critério': 'Critério', A: 'A', B: 'B' }, { 'Critério': 'Tempo', A: '', B: 'x' }]).valid, false);
  assert.equal(normalizeComparisonTable([{ 'Critério': 'Critério', A: 'Mesmo', B: 'mesmo' }, { 'Critério': 'Tempo', A: 'x', B: 'y' }]).valid, false);
  assert.equal(normalizeComparisonTable([...current, { 'Critério': 'Durabilidade', 'Opção A': 'x', 'Opção B': 'y' }]).valid, false);
});

test('invalida preço em qualquer célula e aceita ausência como estado normal', () => {
  assert.equal(normalizeComparisonTable([{ 'Critério': 'Critério', A: 'A', B: 'B' }, { 'Critério': 'Tempo', A: 'R$ 1.200', B: '2 sessões' }]).valid, false);
  assert.deepEqual(normalizeComparisonTable(undefined), { valid: true, table: null });
  assert.deepEqual(normalizeComparisonTable([]), { valid: true, table: null });
});

import assert from 'node:assert/strict';
import test from 'node:test';
import { normalizeComparisonTable } from '../src/lib/contentful.ts';

const current = [
  { 'Opção A': 'Resina', 'Opção B': 'Porcelana' },
  { 'Critério': 'Durabilidade', 'Opção A': '5 anos', 'Opção B': '15 anos' },
];

test('normaliza o array atual com chaves acentuadas', () => {
  assert.deepEqual(normalizeComparisonTable(current), { valid: true, table: { columns: ['Critério', 'Resina', 'Porcelana'], rows: [{ criterion: 'Durabilidade', values: ['5 anos', '15 anos'] }] } });
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

import assert from 'node:assert/strict';
import test from 'node:test';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CLINIC_GEO, CLINIC_ID, CLINIC_SAME_AS, PERSON, PERSON_ID } from '../src/lib/clinicIdentity.ts';

// Guarda a identidade do JSON-LD (estudo da homônima, 26/10/2026): até essa data
// as páginas tinham 7 coordenadas diferentes, WhatsApp como "perfil" e 4 grafias
// do nome do consultório. Página nova que copiar schema antigo cai aqui.

const PAGES = fileURLToPath(new URL('../src/pages/', import.meta.url));

function astroFiles(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) astroFiles(p, out);
    else if (name.endsWith('.astro')) out.push(p);
  }
  return out;
}

const files = astroFiles(PAGES).map((p) => ({ p, s: readFileSync(p, 'utf-8') }));

test('toda coordenada literal nas páginas é a do Perfil da Empresa no Google', () => {
  const wrong: string[] = [];
  for (const { p, s } of files) {
    for (const m of s.matchAll(/["']?(latitude|longitude)["']?\s*:\s*["']?(-?\d+\.\d+)/g)) {
      const expected = m[1] === 'latitude' ? CLINIC_GEO.latitude : CLINIC_GEO.longitude;
      if (Number(m[2]) !== expected) wrong.push(`${p}: ${m[1]} ${m[2]}`);
    }
  }
  assert.deepEqual(wrong, []);
});

test('sameAs nunca aponta para WhatsApp (não é perfil de identidade)', () => {
  const wrong = files.filter(({ s }) => /sameAs["']?\s*:\s*\[[^\]]*wa\.me/s.test(s)).map(({ p }) => p);
  assert.deepEqual(wrong, []);
  assert.ok(!CLINIC_SAME_AS.some((u) => u.includes('wa.me')));
});

test('nenhuma página usa as grafias antigas do nome do consultório', () => {
  const wrong = files
    .filter(({ s }) => /Clínica Dra\. Carla Christoph|Dr\. Carla Christoph — Dental Clinic/.test(s))
    .map(({ p }) => p);
  assert.deepEqual(wrong, []);
});

test('todo @id da raiz do site é o do consultório ou o da Dra. Carla', () => {
  const allowed = new Set([CLINIC_ID, PERSON_ID]);
  const wrong: string[] = [];
  for (const { p, s } of files) {
    for (const m of s.matchAll(/https:\/\/dracarlachristoph\.com\/#[\w-]+/g)) {
      if (!allowed.has(m[0])) wrong.push(`${p}: ${m[0]}`);
    }
  }
  assert.deepEqual(wrong, []);
});

test('a pessoa carrega o CRO e aponta para o consultório pelo @id', () => {
  assert.equal(PERSON['@id'], PERSON_ID);
  assert.equal(PERSON.identifier.value, '27.509');
  assert.equal(PERSON.worksFor['@id'], CLINIC_ID);
});

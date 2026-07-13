// hero-options-sheet.cjs — composto inline das 3 opções de hero (V1, real natural, real recepção)
const fs = require('fs'); const path = require('path'); const sharp = require('sharp');
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'drafts', 'hero-reals', '_hero-3options.png');
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const PANELS = [
  { img: path.join(ROOT, 'drafts', 'hero-nivelB', 'v1-beige-seamless.png'), label: 'NO AR · V1 (IA)', tag: '#B3955F' },
  { img: path.join(ROOT, 'drafts', 'hero-reals', 'RIT08461-crop.jpg'), label: 'OPÇÃO 1 · Real — luz natural', tag: '#381F47' },
  { img: path.join(ROOT, 'drafts', 'hero-reals', 'RIT08572-crop.jpg'), label: 'OPÇÃO 2 · Real — recepção', tag: '#381F47' },
];

async function b64(file) {
  const buf = await sharp(file).resize({ width: 560, withoutEnlargement: true }).jpeg({ quality: 86 }).toBuffer();
  return 'data:image/jpeg;base64,' + buf.toString('base64');
}

function panel(px, py, pw, ph, img, label, tag) {
  const cx = px + 32, cy = py + 32;
  const pbw = 210, pbh = 350, pbx = px + pw - 30 - pbw, pby = cy + (ph - 64 - pbh) / 2;
  const H1 = [['Dentista em', 0], ['Ipanema', 0], ['Reabilitação Oral', 0], ['& Estética Natural', 1]];
  let y = cy + 92;
  const h1 = H1.map(([t, g]) => { const yy = y; y += 34; return `<text x="${cx}" y="${yy}" font-family="Georgia,serif" font-size="26" font-weight="600" fill="${g ? '#B3955F' : '#381F47'}">${esc(t)}</text>`; }).join('');
  return `
    <rect x="${px - 4}" y="${py - 30}" width="${pw + 8}" height="24" rx="6" fill="${tag}"/>
    <text x="${px + 6}" y="${py - 13}" font-family="'Segoe UI',Arial,sans-serif" font-size="13" font-weight="700" fill="#fff">${esc(label)}</text>
    <rect x="${px}" y="${py}" width="${pw}" height="${ph}" rx="18" fill="url(#beige)" stroke="#C9BFA8" stroke-width="1.2"/>
    <text x="${cx}" y="${cy + 34}" font-family="'Segoe UI',Arial,sans-serif" font-size="11" letter-spacing="2" font-weight="600" fill="#B3955F">ESPECIALISTA · PRÓTESE &amp; IMPLANTE</text>
    ${h1}
    <text x="${cx}" y="${cy + 250}" font-family="'Segoe UI',Arial,sans-serif" font-size="11.5" letter-spacing="1" font-weight="600" fill="#B3955F">●  20+ ANOS   ●  CRO-RJ 27.509</text>
    <rect x="${cx}" y="${cy + 274}" width="210" height="48" rx="8" fill="#B3955F"/>
    <text x="${cx + 20}" y="${cy + 298}" font-family="'Segoe UI',Arial,sans-serif" font-size="14" font-weight="600" fill="#fff">Agendar minha consulta</text>
    <text x="${cx + 20}" y="${cy + 314}" font-family="'Segoe UI',Arial,sans-serif" font-size="10" fill="#F3EBD9">WhatsApp 24h</text>
    <clipPath id="cp-${px}"><rect x="${pbx}" y="${pby}" width="${pbw}" height="${pbh}" rx="6"/></clipPath>
    <image href="${img}" x="${pbx}" y="${pby}" width="${pbw}" height="${pbh}" preserveAspectRatio="xMidYMin slice" clip-path="url(#cp-${px})"/>
    <rect x="${pbx}" y="${pby}" width="${pbw}" height="${pbh}" fill="url(#feather)"/>`;
}

(async () => {
  const imgs = await Promise.all(PANELS.map(p => b64(p.img)));
  const pw = 548, ph = 660, gap = 26, mx = 24, pyTop = 116;
  const W = mx * 2 + pw * 3 + gap * 2, H = pyTop + ph + 36;
  const beige = '#E2D9C7';
  let panels = '';
  PANELS.forEach((p, i) => { panels += panel(mx + i * (pw + gap), pyTop, pw, ph, imgs[i], p.label, p.tag); });
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <defs>
      <linearGradient id="beige" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E8DFCD"/><stop offset="1" stop-color="#DBD1BE"/></linearGradient>
      <linearGradient id="feather" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${beige}" stop-opacity="0.9"/><stop offset="0.1" stop-color="${beige}" stop-opacity="0"/></linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="#FAF8F3"/>
    <text x="${W / 2}" y="46" text-anchor="middle" font-family="'Segoe UI',Arial,sans-serif" font-size="22" font-weight="700" fill="#381F47">Hero — 3 opções (mesmo layout, só muda a foto)</text>
    <text x="${W / 2}" y="72" text-anchor="middle" font-family="'Segoe UI',Arial,sans-serif" font-size="13" fill="#7A7363">Versão interativa local: http://localhost:8080/hero-options.html</text>
    ${panels}
  </svg>`;
  await sharp(Buffer.from(svg)).png().toFile(OUT);
  console.log('OK →', path.relative(ROOT, OUT));
})();

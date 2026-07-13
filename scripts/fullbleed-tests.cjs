// fullbleed-tests.cjs — gera 3 mocks full-bleed empilhados p/ comparacao
const fs = require('fs'); const path = require('path'); const sharp = require('sharp');
const ROOT = path.resolve(__dirname, '..');
const IN = path.join(ROOT, 'drafts', 'fotos-ensaio');
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const HW = 1280, HH = 560;

const ITEMS = [
  {
    file: 'RIT08461.jpg', label: 'A · RIT08461 refinada (headline curto + véu forte)',
    extract: null, position: 'center', scrimStrong: true,
    eyebrow: 'DENTISTA EM IPANEMA · ESPECIALISTA EM PRÓTESE',
    h1: [['Reabilitação Oral e', 0], ['Estética Natural', 1]],
  },
  {
    file: 'RIT08572.jpg', label: 'B · RIT08572 (recepção / marca — reenquadrada, headline curto)',
    extract: null, position: 'top', scrimStrong: true,
    eyebrow: 'ESPECIALISTA EM PRÓTESE E IMPLANTODONTIA',
    h1: [['Dentista em Ipanema', 0], ['Estética Natural', 1]],
  },
];

async function bg(it) {
  let buf = await sharp(path.join(IN, it.file)).rotate().toBuffer();
  if (it.extract) {
    const m = await sharp(buf).metadata();
    const left = Math.round(m.width * it.extract.l);
    const width = Math.min(m.width - left, Math.round(m.width * it.extract.w));
    buf = await sharp(buf).extract({ left, top: 0, width, height: m.height }).toBuffer();
  }
  return (await sharp(buf).resize(HW, HH, { fit: 'cover', position: it.position })
    .modulate({ brightness: 1.02, saturation: 1.04 }).jpeg({ quality: 82 }).toBuffer()).toString('base64');
}

function heroSVG(yOff, b64, it, idx) {
  const tx = 74;
  const nLines = it.h1.length;
  const blockH = 40 + nLines * 48 + 120;
  let y = yOff + (HH - blockH) / 2 + 40;
  const eyebrowY = y - 16;
  const h1 = it.h1.map(([t, g]) => { const yy = y + 16; y += 48; return `<text x="${tx}" y="${yy}" font-family="Georgia,'Times New Roman',serif" font-size="44" font-weight="600" fill="${g ? '#B3955F' : '#381F47'}">${esc(t)}</text>`; }).join('');
  const subY = y + 18, badgeY = y + 48, ctaY = y + 66;
  const scrim = it.scrimStrong
    ? `<stop offset="0" stop-color="#E2D9C7" stop-opacity="0.98"/><stop offset="0.34" stop-color="#E2D9C7" stop-opacity="0.88"/><stop offset="0.60" stop-color="#E2D9C7" stop-opacity="0"/>`
    : `<stop offset="0" stop-color="#E2D9C7" stop-opacity="0.92"/><stop offset="0.30" stop-color="#E2D9C7" stop-opacity="0.70"/><stop offset="0.54" stop-color="#E2D9C7" stop-opacity="0"/>`;
  return `
    <defs><linearGradient id="sc${idx}" x1="0" y1="0" x2="1" y2="0">${scrim}</linearGradient></defs>
    <rect x="-4" y="${yOff - 26}" width="${HW + 8}" height="22" rx="5" fill="#1c6b3a"/>
    <text x="6" y="${yOff - 10}" font-family="'Segoe UI',Arial,sans-serif" font-size="13" font-weight="700" fill="#fff">${esc(it.label)}</text>
    <clipPath id="cl${idx}"><rect x="0" y="${yOff}" width="${HW}" height="${HH}" rx="14"/></clipPath>
    <g clip-path="url(#cl${idx})">
      <image href="data:image/jpeg;base64,${b64}" x="0" y="${yOff}" width="${HW}" height="${HH}"/>
      <rect x="0" y="${yOff}" width="${HW}" height="${HH}" fill="url(#sc${idx})"/>
      <text x="${tx}" y="${eyebrowY}" font-family="'Segoe UI',Arial,sans-serif" font-size="13" letter-spacing="2.5" font-weight="600" fill="#8A7444">${esc(it.eyebrow)}</text>
      ${h1}
      <text x="${tx}" y="${subY}" font-family="'Segoe UI',Arial,sans-serif" font-size="14" fill="#5C5647">Tratamento sem pressa, com mínimo desconforto e resultado natural.</text>
      <text x="${tx}" y="${badgeY}" font-family="'Segoe UI',Arial,sans-serif" font-size="12" letter-spacing="1.5" font-weight="600" fill="#8A7444">●  20+ ANOS    ●  CRO-RJ 27.509</text>
      <rect x="${tx}" y="${ctaY}" width="248" height="54" rx="9" fill="#B3955F"/>
      <text x="${tx + 24}" y="${ctaY + 27}" font-family="'Segoe UI',Arial,sans-serif" font-size="15" font-weight="600" fill="#fff">Agendar minha consulta</text>
      <text x="${tx + 24}" y="${ctaY + 45}" font-family="'Segoe UI',Arial,sans-serif" font-size="10.5" fill="#F3EBD9">WhatsApp 24h</text>
    </g>`;
}

(async () => {
  const gap = 54, top = 40;
  const W = HW, H = top + ITEMS.length * (HH + gap);
  let body = '';
  for (let i = 0; i < ITEMS.length; i++) {
    const b64 = await bg(ITEMS[i]);
    body += heroSVG(top + i * (HH + gap), b64, ITEMS[i], i);
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><rect width="${W}" height="${H}" fill="#FAF8F3"/>${body}</svg>`;
  await sharp(Buffer.from(svg)).png().toFile(path.join(ROOT, 'drafts', 'hero-reals', '_fullbleed-tests.png'));
  console.log('OK → drafts/hero-reals/_fullbleed-tests.png');
})();

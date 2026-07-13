// mobile-order.cjs — compara ordem no mobile: FOTO primeiro vs TEXTO primeiro
const fs = require('fs'); const path = require('path'); const sharp = require('sharp');
const ROOT = path.resolve(__dirname, '..');
const VCROP = path.join(ROOT, 'drafts', 'hero-reals', 'RIT08461-crop.jpg');
const OUT = path.join(ROOT, 'drafts', 'hero-reals', '_mobile-order.png');
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function textBlock(x, y) {
  let yy = y;
  const L = [];
  L.push(`<text x="${x}" y="${yy}" font-family="'Segoe UI',Arial,sans-serif" font-size="11" letter-spacing="2" font-weight="600" fill="#8A7444">DENTISTA EM IPANEMA · PRÓTESE</text>`); yy += 40;
  L.push(`<text x="${x}" y="${yy}" font-family="Georgia,serif" font-size="30" font-weight="600" fill="#381F47">Reabilitação Oral e</text>`); yy += 34;
  L.push(`<text x="${x}" y="${yy}" font-family="Georgia,serif" font-size="30" font-weight="600" fill="#B3955F">Estética Natural</text>`); yy += 36;
  L.push(`<text x="${x}" y="${yy}" font-family="'Segoe UI',Arial,sans-serif" font-size="13" fill="#5C5647">Tratamento sem pressa, com resultado natural.</text>`); yy += 34;
  L.push(`<text x="${x}" y="${yy}" font-family="'Segoe UI',Arial,sans-serif" font-size="11" letter-spacing="1" font-weight="600" fill="#8A7444">● 20+ ANOS   ● CRO-RJ 27.509</text>`); yy += 18;
  L.push(`<rect x="${x}" y="${yy}" width="240" height="54" rx="9" fill="#B3955F"/>
    <text x="${x + 22}" y="${yy + 32}" font-family="'Segoe UI',Arial,sans-serif" font-size="15" font-weight="600" fill="#fff">Agendar minha consulta</text>`);
  return L.join('');
}

(async () => {
  const PW = 384, PH = 760, photoH = 360;
  const banner = (await sharp(VCROP).resize(PW, photoH, { fit: 'cover', position: 'top' }).modulate({ brightness: 1.02, saturation: 1.04 }).jpeg({ quality: 84 }).toBuffer()).toString('base64');

  // FOTO primeiro: foto (0..360) + texto (bege) embaixo
  const photoFirst = `
    <rect x="0" y="0" width="${PW}" height="${PH}" rx="20" fill="#E4DBCA"/>
    <clipPath id="c1"><rect x="0" y="0" width="${PW}" height="${photoH}" rx="20"/></clipPath>
    <image href="data:image/jpeg;base64,${banner}" x="0" y="0" width="${PW}" height="${photoH}" clip-path="url(#c1)"/>
    ${textBlock(28, photoH + 50)}`;

  // TEXTO primeiro: texto (bege) em cima + foto embaixo
  const textFirst = `
    <rect x="0" y="0" width="${PW}" height="${PH}" rx="20" fill="#E4DBCA"/>
    ${textBlock(28, 70)}
    <clipPath id="c2"><rect x="0" y="${PH - photoH}" width="${PW}" height="${photoH}" rx="20"/></clipPath>
    <image href="data:image/jpeg;base64,${banner}" x="0" y="${PH - photoH}" width="${PW}" height="${photoH}" clip-path="url(#c2)"/>`;

  const MW = 28 + PW + 44 + PW + 28, MH = 132 + PH + 28;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${MW}" height="${MH}" viewBox="0 0 ${MW} ${MH}">
    <rect width="${MW}" height="${MH}" fill="#FAF8F3"/>
    <text x="${MW / 2}" y="42" text-anchor="middle" font-family="'Segoe UI',Arial,sans-serif" font-size="21" font-weight="700" fill="#381F47">Mobile — ordem foto/texto</text>
    <text x="${28 + PW / 2}" y="92" text-anchor="middle" font-family="'Segoe UI',Arial,sans-serif" font-size="15" font-weight="700" fill="#1c6b3a">A · FOTO primeiro (editorial/marca)</text>
    <text x="${28 + PW + 44 + PW / 2}" y="92" text-anchor="middle" font-family="'Segoe UI',Arial,sans-serif" font-size="15" font-weight="700" fill="#7A7363">B · TEXTO primeiro (como hoje)</text>
    <line x1="0" y1="${112 + PH * 0.0}" x2="${MW}" y2="${112}" stroke="none"/>
    <g transform="translate(28,118)">${photoFirst}</g>
    <g transform="translate(${28 + PW + 44},118)">${textFirst}</g>
    <text x="${28 + PW / 2}" y="${118 + photoH - 8}" text-anchor="middle" font-family="'Segoe UI',Arial,sans-serif" font-size="11" fill="#fff" opacity="0.85">↑ acima da dobra</text>
  </svg>`;
  await sharp(Buffer.from(svg)).png().toFile(OUT);
  console.log('OK → _mobile-order.png');
})();

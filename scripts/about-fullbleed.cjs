// about-fullbleed.cjs — mock da pagina SOBRE em full-bleed com a foto da recepcao (RIT08572)
// 2 variantes: A) texto a esquerda  B) texto embaixo (mantem Dra.+logo livres)
const fs = require('fs'); const path = require('path'); const sharp = require('sharp');
const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'drafts', 'fotos-ensaio', 'RIT08572.jpg');
const OUT = path.join(ROOT, 'drafts', 'hero-reals', '_about-fullbleed.png');
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const W = 1440, H = 600;

function copy(tx, topY, opts = {}) {
  const fill = opts.light ? '#FFFFFF' : '#381F47';
  const gold = '#C9A95f';
  let y = topY;
  const eyebrowFill = opts.light ? '#E9D9B0' : '#8A7444';
  const subFill = opts.light ? '#F0E9DA' : '#5C5647';
  const L = [];
  L.push(`<text x="${tx}" y="${y}" font-family="'Segoe UI',Arial,sans-serif" font-size="13" letter-spacing="2.5" font-weight="600" fill="${eyebrowFill}">ESPECIALISTA EM PRÓTESE E IMPLANTODONTIA · CRO-RJ 27.509</text>`); y += 54;
  L.push(`<text x="${tx}" y="${y}" font-family="Georgia,serif" font-size="44" font-weight="600" fill="${fill}">Dra. Carla Christoph</text>`); y += 50;
  L.push(`<text x="${tx}" y="${y}" font-family="Georgia,serif" font-size="44" font-weight="600" fill="${gold}">dentista especialista em Ipanema</text>`); y += 44;
  L.push(`<text x="${tx}" y="${y}" font-family="'Segoe UI',Arial,sans-serif" font-size="16" fill="${subFill}">Mais de 20 anos dedicados à reabilitação oral e estética dental.</text>`); y += 40;
  L.push(`<rect x="${tx}" y="${y}" width="232" height="54" rx="9" fill="#B3955F"/><text x="${tx + 22}" y="${y + 33}" font-family="'Segoe UI',Arial,sans-serif" font-size="15" font-weight="600" fill="#fff">Agendar consulta</text>`);
  return L.join('');
}

(async () => {
  const bg = (await sharp(SRC).rotate().resize(W, H, { fit: 'cover', position: 'top' }).modulate({ brightness: 1.02, saturation: 1.04 }).jpeg({ quality: 84 }).toBuffer()).toString('base64');

  // A) texto esquerda + scrim bege a esquerda
  const A = `
    <defs><linearGradient id="scA" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#E4DBCA" stop-opacity="0.98"/><stop offset="0.36" stop-color="#E4DBCA" stop-opacity="0.9"/><stop offset="0.55" stop-color="#E4DBCA" stop-opacity="0"/></linearGradient></defs>
    <image href="data:image/jpeg;base64,${bg}" x="0" y="0" width="${W}" height="${H}"/>
    <rect x="0" y="0" width="${W}" height="${H}" fill="url(#scA)"/>
    ${copy(74, 210)}`;

  // B) texto embaixo + scrim subindo de baixo (mantem Dra.+logo no topo)
  const B = `
    <defs><linearGradient id="scB" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0" stop-color="#2A1838" stop-opacity="0.92"/><stop offset="0.42" stop-color="#2A1838" stop-opacity="0.62"/><stop offset="0.72" stop-color="#2A1838" stop-opacity="0"/></linearGradient></defs>
    <image href="data:image/jpeg;base64,${bg}" x="0" y="0" width="${W}" height="${H}"/>
    <rect x="0" y="0" width="${W}" height="${H}" fill="url(#scB)"/>
    ${copy(74, 330, { light: true })}`;

  const gap = 56, top = 96;
  const TW = W, TH = top + H * 2 + gap + 40;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${TW}" height="${TH}" viewBox="0 0 ${TW} ${TH}">
    <rect width="${TW}" height="${TH}" fill="#FAF8F3"/>
    <text x="${TW / 2}" y="40" text-anchor="middle" font-family="'Segoe UI',Arial,sans-serif" font-size="21" font-weight="700" fill="#381F47">Sobre — full-bleed com a foto da recepção (RIT08572)</text>
    <text x="20" y="${top - 12}" font-family="'Segoe UI',Arial,sans-serif" font-size="14" font-weight="700" fill="#1c6b3a">A · Texto à esquerda (véu bege)</text>
    <g transform="translate(0,${top})"><clipPath id="cA"><rect x="0" y="0" width="${W}" height="${H}" rx="14"/></clipPath><g clip-path="url(#cA)">${A}</g></g>
    <text x="20" y="${top + H + gap - 12}" font-family="'Segoe UI',Arial,sans-serif" font-size="14" font-weight="700" fill="#1c6b3a">B · Texto embaixo (mantém Dra. + logo livres no topo)</text>
    <g transform="translate(0,${top + H + gap})"><clipPath id="cB"><rect x="0" y="0" width="${W}" height="${H}" rx="14"/></clipPath><g clip-path="url(#cB)">${B}</g></g>
  </svg>`;
  await sharp(Buffer.from(svg)).png().toFile(OUT);
  console.log('OK →', path.relative(ROOT, OUT));
})();

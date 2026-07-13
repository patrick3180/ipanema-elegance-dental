// hero-fullbleed.cjs — versao full-bleed (foto como background do hero, estilo Harley Street)
// Gera: imagem web p/ a pagina local + composto inline p/ revisao de contraste.
const fs = require('fs'); const path = require('path'); const sharp = require('sharp');
const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'drafts', 'fotos-ensaio', 'RIT08461.jpg');
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

(async () => {
  // 1) imagem web (full landscape, retoque leve) para a pagina local
  await sharp(SRC).rotate().resize({ width: 1900 })
    .modulate({ brightness: 1.02, saturation: 1.04 }).sharpen({ sigma: 0.5 })
    .webp({ quality: 80 }).toFile(path.join(ROOT, 'public', 'lovable-uploads', 'hero-real-natural-full.webp'));
  console.log('✓ public/lovable-uploads/hero-real-natural-full.webp');

  // 2) composto inline p/ revisao
  const photo = 'data:image/jpeg;base64,' + (await sharp(SRC).rotate()
    .modulate({ brightness: 1.02, saturation: 1.04 }).resize({ width: 1400 }).jpeg({ quality: 84 }).toBuffer()).toString('base64');

  const W = 1440, H = 780, tx = 96;
  const H1 = [['Dentista em Ipanema', 0], ['Especializada em', 0], ['Reabilitação Oral e', 0], ['Estética Natural', 1]];
  let y = 326; const h1 = H1.map(([t, g]) => { const yy = y; y += 50; return `<text x="${tx}" y="${yy}" font-family="Georgia,'Times New Roman',serif" font-size="42" font-weight="600" fill="${g ? '#B3955F' : '#381F47'}">${esc(t)}</text>`; }).join('');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <defs>
      <linearGradient id="scrim" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#E2D9C7" stop-opacity="0.96"/>
        <stop offset="0.30" stop-color="#E2D9C7" stop-opacity="0.84"/>
        <stop offset="0.58" stop-color="#E2D9C7" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <image href="${photo}" x="0" y="0" width="${W}" height="${H}" preserveAspectRatio="xMaxYMid slice"/>
    <rect x="0" y="0" width="${W}" height="${H}" fill="url(#scrim)"/>
    <text x="${tx}" y="282" font-family="'Segoe UI',Arial,sans-serif" font-size="13" letter-spacing="3" font-weight="600" fill="#B3955F">ESPECIALISTA EM PRÓTESE E IMPLANTODONTIA</text>
    ${h1}
    <text x="${tx}" y="580" font-family="'Segoe UI',Arial,sans-serif" font-size="14" fill="#5C5647">Tratamento sem pressa, com mínimo desconforto e resultado natural.</text>
    <text x="${tx}" y="624" font-family="'Segoe UI',Arial,sans-serif" font-size="12" letter-spacing="1.5" font-weight="600" fill="#8A7444">●  20+ ANOS    ●  CRO-RJ 27.509    ●  1H+ / CONSULTA</text>
    <rect x="${tx}" y="648" width="252" height="58" rx="9" fill="#B3955F"/>
    <text x="${tx + 26}" y="676" font-family="'Segoe UI',Arial,sans-serif" font-size="16" font-weight="600" fill="#FFFFFF">Agendar minha consulta</text>
    <text x="${tx + 26}" y="695" font-family="'Segoe UI',Arial,sans-serif" font-size="11" fill="#F3EBD9">WhatsApp 24h</text>
  </svg>`;
  await sharp(Buffer.from(svg)).png().toFile(path.join(ROOT, 'drafts', 'hero-reals', '_hero-fullbleed.png'));
  console.log('✓ drafts/hero-reals/_hero-fullbleed.png');
})();

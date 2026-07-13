// fullbleed-final.cjs — full-bleed A reenquadrada (cabeça + mãos) + mais nevoa,
// e mocks de DESKTOP e MOBILE. Gera tambem a imagem de fundo p/ a pagina local.
const fs = require('fs'); const path = require('path'); const sharp = require('sharp');
const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'drafts', 'fotos-ensaio', 'RIT08461.jpg');
const VCROP = path.join(ROOT, 'drafts', 'hero-reals', 'RIT08461-crop.jpg'); // crop vertical (dela)
const OUTDIR = path.join(ROOT, 'drafts', 'hero-reals');
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// scrim FORTE (mais nevoa) — esquerda
const SCRIM = `<stop offset="0" stop-color="#E4DBCA" stop-opacity="0.99"/><stop offset="0.34" stop-color="#E4DBCA" stop-opacity="0.95"/><stop offset="0.50" stop-color="#E4DBCA" stop-opacity="0.55"/><stop offset="0.70" stop-color="#E4DBCA" stop-opacity="0"/>`;

async function reframedBg(W, H) {
  // reduz o enquadramento: pega quase toda a altura (cabeça no topo + braços/mãos)
  const m = await sharp(SRC).rotate().metadata();
  const targetRatio = W / H;
  let cropH = Math.round(m.width / targetRatio);
  cropH = Math.min(cropH, m.height);
  const top = Math.min(40, m.height - cropH); // pequeno headroom
  let buf = await sharp(SRC).rotate().extract({ left: 0, top, width: m.width, height: cropH }).toBuffer();
  return sharp(buf).resize(W, H, { fit: 'cover', position: 'top' }).modulate({ brightness: 1.02, saturation: 1.04 }).sharpen({ sigma: 0.5 });
}

function textBlock(tx, topY) {
  let y = topY;
  const eyebrow = `<text x="${tx}" y="${y}" font-family="'Segoe UI',Arial,sans-serif" font-size="13" letter-spacing="2.5" font-weight="600" fill="#8A7444">ESPECIALISTA EM PRÓTESE E IMPLANTODONTIA</text>`;
  y += 52;
  const h1lines = [['Dentista em Ipanema', 0], ['especializada em', 0], ['reabilitação oral e', 0], ['estética natural', 1]];
  const h1 = h1lines.map(([t, g]) => { const yy = y; y += 48; return `<text x="${tx}" y="${yy}" font-family="Georgia,'Times New Roman',serif" font-size="42" font-weight="600" fill="${g ? '#B3955F' : '#381F47'}">${t}</text>`; }).join('');
  y += 8;
  const sub1 = `<text x="${tx}" y="${y}" font-family="'Segoe UI',Arial,sans-serif" font-size="15" fill="#5C5647">No mínimo uma hora por consulta. Tempo para ouvir,</text>`; y += 23;
  const sub2 = `<text x="${tx}" y="${y}" font-family="'Segoe UI',Arial,sans-serif" font-size="15" fill="#5C5647">examinar e planejar cada caso.</text>`; y += 38;
  const b1 = `<text x="${tx}" y="${y}" font-family="'Segoe UI',Arial,sans-serif" font-size="12" letter-spacing="1.2" font-weight="600" fill="#8A7444">●  20+ ANOS EM IPANEMA       ●  CRO-RJ 27.509</text>`; y += 22;
  const b2 = `<text x="${tx}" y="${y}" font-family="'Segoe UI',Arial,sans-serif" font-size="12" letter-spacing="1.2" font-weight="600" fill="#8A7444">●  DO PLANO À FINALIZAÇÃO</text>`; y += 20;
  const cta = `<rect x="${tx}" y="${y}" width="252" height="56" rx="9" fill="#B3955F"/>
    <text x="${tx + 24}" y="${y + 28}" font-family="'Segoe UI',Arial,sans-serif" font-size="16" font-weight="600" fill="#fff">Agendar minha consulta</text>
    <text x="${tx + 24}" y="${y + 46}" font-family="'Segoe UI',Arial,sans-serif" font-size="11" fill="#F3EBD9">WhatsApp 24h</text>`;
  return eyebrow + h1 + sub1 + sub2 + b1 + b2 + cta;
}

(async () => {
  const W = 1480, H = 752;
  // imagem de fundo p/ a pagina local (reenquadrada)
  await (await reframedBg(1600, Math.round(1600 * H / W))).webp({ quality: 80 }).toFile(path.join(ROOT, 'public', 'lovable-uploads', 'hero-fullbleed-a.webp'));
  console.log('✓ public/lovable-uploads/hero-fullbleed-a.webp');

  // ---- DESKTOP MOCK ----
  const bgBuf = await (await reframedBg(W, H)).jpeg({ quality: 84 }).toBuffer();
  const bg64 = bgBuf.toString('base64');
  const dsvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <defs><linearGradient id="sc" x1="0" y1="0" x2="1" y2="0">${SCRIM}</linearGradient></defs>
    <image href="data:image/jpeg;base64,${bg64}" x="0" y="0" width="${W}" height="${H}"/>
    <rect x="0" y="0" width="${W}" height="${H}" fill="url(#sc)"/>
    ${textBlock(80, 192)}
  </svg>`;
  await sharp(Buffer.from(dsvg)).png().toFile(path.join(OUTDIR, '_fb-desktop.png'));
  console.log('✓ _fb-desktop.png');

  // ---- MOBILE MOCKS (2 abordagens) ----
  const PW = 384, PH = 760;
  // A) STACKED: foto em cima (dela) + texto em bege embaixo
  const bannerBuf = await sharp(VCROP).resize(PW, 360, { fit: 'cover', position: 'top' }).modulate({ brightness: 1.02, saturation: 1.04 }).jpeg({ quality: 84 }).toBuffer();
  const banner64 = bannerBuf.toString('base64');
  let my = 360 + 52;
  const stacked = `
    <rect x="0" y="0" width="${PW}" height="${PH}" rx="20" fill="#E4DBCA"/>
    <clipPath id="cb"><rect x="0" y="0" width="${PW}" height="360" rx="20"/></clipPath>
    <image href="data:image/jpeg;base64,${banner64}" x="0" y="0" width="${PW}" height="360" clip-path="url(#cb)"/>
    <text x="28" y="${my}" font-family="'Segoe UI',Arial,sans-serif" font-size="11" letter-spacing="2" font-weight="600" fill="#8A7444">DENTISTA EM IPANEMA · PRÓTESE</text>
    <text x="28" y="${my += 40}" font-family="Georgia,serif" font-size="30" font-weight="600" fill="#381F47">Reabilitação Oral e</text>
    <text x="28" y="${my += 34}" font-family="Georgia,serif" font-size="30" font-weight="600" fill="#B3955F">Estética Natural</text>
    <text x="28" y="${my += 36}" font-family="'Segoe UI',Arial,sans-serif" font-size="13" fill="#5C5647">Tratamento sem pressa, com resultado natural.</text>
    <text x="28" y="${my += 34}" font-family="'Segoe UI',Arial,sans-serif" font-size="11" letter-spacing="1" font-weight="600" fill="#8A7444">● 20+ ANOS   ● CRO-RJ 27.509</text>
    <rect x="28" y="${my += 18}" width="240" height="54" rx="9" fill="#B3955F"/>
    <text x="50" y="${my + 32}" font-family="'Segoe UI',Arial,sans-serif" font-size="15" font-weight="600" fill="#fff">Agendar minha consulta</text>`;
  // B) IMMERSIVE: foto full + scrim de baixo + texto embaixo
  const immBuf = await sharp(VCROP).resize(PW, PH, { fit: 'cover', position: 'top' }).modulate({ brightness: 1.02, saturation: 1.04 }).jpeg({ quality: 84 }).toBuffer();
  const imm64 = immBuf.toString('base64');
  let iy = 470;
  const immersive = `
    <defs><linearGradient id="scb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E4DBCA" stop-opacity="0"/><stop offset="0.42" stop-color="#E4DBCA" stop-opacity="0.85"/><stop offset="0.6" stop-color="#E4DBCA" stop-opacity="0.97"/></linearGradient></defs>
    <clipPath id="ci"><rect x="0" y="0" width="${PW}" height="${PH}" rx="20"/></clipPath>
    <g clip-path="url(#ci)">
      <image href="data:image/jpeg;base64,${imm64}" x="0" y="0" width="${PW}" height="${PH}"/>
      <rect x="0" y="0" width="${PW}" height="${PH}" fill="url(#scb)"/>
      <text x="28" y="${iy}" font-family="'Segoe UI',Arial,sans-serif" font-size="11" letter-spacing="2" font-weight="600" fill="#8A7444">DENTISTA EM IPANEMA · PRÓTESE</text>
      <text x="28" y="${iy += 40}" font-family="Georgia,serif" font-size="30" font-weight="600" fill="#381F47">Reabilitação Oral e</text>
      <text x="28" y="${iy += 34}" font-family="Georgia,serif" font-size="30" font-weight="600" fill="#B3955F">Estética Natural</text>
      <text x="28" y="${iy += 36}" font-family="'Segoe UI',Arial,sans-serif" font-size="13" fill="#5C5647">Tratamento sem pressa, com resultado natural.</text>
      <rect x="28" y="${iy += 16}" width="240" height="54" rx="9" fill="#B3955F"/>
      <text x="50" y="${iy + 32}" font-family="'Segoe UI',Arial,sans-serif" font-size="15" font-weight="600" fill="#fff">Agendar minha consulta</text>
    </g>`;
  const MW = 28 + PW + 40 + PW + 28, MH = 120 + PH + 28;
  const msvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${MW}" height="${MH}" viewBox="0 0 ${MW} ${MH}">
    <rect width="${MW}" height="${MH}" fill="#FAF8F3"/>
    <text x="${MW / 2}" y="40" text-anchor="middle" font-family="'Segoe UI',Arial,sans-serif" font-size="20" font-weight="700" fill="#381F47">Mobile (390px) — 2 tratamentos</text>
    <text x="${28 + PW / 2}" y="92" text-anchor="middle" font-family="'Segoe UI',Arial,sans-serif" font-size="15" font-weight="700" fill="#1c6b3a">RECOMENDADO · Foto em cima + texto</text>
    <text x="${28 + PW + 40 + PW / 2}" y="92" text-anchor="middle" font-family="'Segoe UI',Arial,sans-serif" font-size="15" font-weight="700" fill="#7A7363">Alternativa · Imersiva (scrim embaixo)</text>
    <g transform="translate(28,110)">${stacked}</g>
    <g transform="translate(${28 + PW + 40},110)">${immersive}</g>
  </svg>`;
  await sharp(Buffer.from(msvg)).png().toFile(path.join(OUTDIR, '_fb-mobile.png'));
  console.log('✓ _fb-mobile.png');
})();

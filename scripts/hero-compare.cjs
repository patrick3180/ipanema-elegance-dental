// hero-compare.cjs — gera um comparativo "ANTES vs DEPOIS" do hero, fiel às
// fotos e cores reais da marca. Rasteriza um SVG via sharp (o preview_screenshot
// está indisponível neste ambiente).
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.resolve(__dirname, '..');
const SRC_ATUAL = path.join(ROOT, 'public', 'lovable-uploads', '729cc6a8-3563-45af-9e82-3581b91c7d7e.png');
const SRC_V1 = path.join(ROOT, 'drafts', 'hero-nivelB', 'v1-beige-seamless.png');
const OUT = path.join(ROOT, 'drafts', 'hero-nivelB', 'compare-antes-depois.png');

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

async function b64(file) {
  const buf = await sharp(file).resize({ width: 620, withoutEnlargement: true }).jpeg({ quality: 86 }).toBuffer();
  return 'data:image/jpeg;base64,' + buf.toString('base64');
}

function panel(px, py, pw, ph, img, mode, label) {
  const cx = px + 44, cy = py + 44;
  // foto à direita
  const pbw = 290, pbh = 450;
  const pbx = px + pw - 44 - pbw;
  const pby = cy + (ph - 88 - pbh) / 2;

  // overlay de "fade para o bege" — replica o tratamento de borda
  let fades = '';
  if (mode === 'antes') {
    // dissolve forte: esquerda 42% + base 38% (como o mask atual 60%/65% intersect)
    fades = `
      <rect x="${pbx}" y="${pby}" width="${pbw}" height="${pbh}" fill="url(#fadeLeft)"/>
      <rect x="${pbx}" y="${pby}" width="${pbw}" height="${pbh}" fill="url(#fadeBottom)"/>`;
  } else {
    // feather sutil só na base
    fades = `<rect x="${pbx}" y="${pby}" width="${pbw}" height="${pbh}" fill="url(#fadeSoft)"/>`;
  }

  const H1 = [
    { t: 'Dentista em Ipanema', gold: false },
    { t: 'Especializada em', gold: false },
    { t: 'Reabilitação Oral e', gold: false },
    { t: 'Estética Natural', gold: true },
  ];
  let h1y = cy + 96;
  const h1svg = H1.map(l => {
    const y = h1y; h1y += 42;
    return `<text x="${cx}" y="${y}" font-family="Georgia, 'Times New Roman', serif" font-size="33" font-weight="600" fill="${l.gold ? '#B3955F' : '#381F47'}">${esc(l.t)}</text>`;
  }).join('');

  return `
  <g>
    <text x="${px + 6}" y="${py - 14}" font-family="'Segoe UI', Arial, sans-serif" font-size="20" font-weight="700" fill="#381F47">${esc(label)}</text>
    <rect x="${px}" y="${py}" width="${pw}" height="${ph}" rx="22" fill="url(#beige)" stroke="#C9BFA8" stroke-width="1.5"/>
    <text x="${cx}" y="${cy + 44}" font-family="'Segoe UI', Arial, sans-serif" font-size="13" letter-spacing="2.5" font-weight="600" fill="#B3955F">ESPECIALISTA EM PRÓTESE E IMPLANTODONTIA</text>
    ${h1svg}
    <text x="${cx}" y="${cy + 290}" font-family="'Segoe UI', Arial, sans-serif" font-size="15" fill="#5C5647">Tratamento sem pressa, com mínimo desconforto</text>
    <text x="${cx}" y="${cy + 312}" font-family="'Segoe UI', Arial, sans-serif" font-size="15" fill="#5C5647">e um resultado que parece natural.</text>
    <text x="${cx}" y="${cy + 360}" font-family="'Segoe UI', Arial, sans-serif" font-size="12.5" letter-spacing="1.5" font-weight="600" fill="#B3955F">●  20+ ANOS    ●  CRO-RJ 27.509    ●  1H+ / CONSULTA</text>
    <rect x="${cx}" y="${cy + 388}" width="250" height="56" rx="9" fill="#B3955F"/>
    <text x="${cx + 24}" y="${cy + 414}" font-family="'Segoe UI', Arial, sans-serif" font-size="16" font-weight="600" fill="#FFFFFF">Agendar minha consulta</text>
    <text x="${cx + 24}" y="${cy + 432}" font-family="'Segoe UI', Arial, sans-serif" font-size="11" fill="#F3EBD9">WhatsApp 24h</text>

    <clipPath id="clip-${mode}"><rect x="${pbx}" y="${pby}" width="${pbw}" height="${pbh}" rx="6"/></clipPath>
    <image href="${img}" x="${pbx}" y="${pby}" width="${pbw}" height="${pbh}" preserveAspectRatio="xMidYMin slice" clip-path="url(#clip-${mode})"/>
    ${fades}
  </g>`;
}

(async () => {
  const [imgAtual, imgV1] = await Promise.all([b64(SRC_ATUAL), b64(SRC_V1)]);

  const W = 1712, H = 904;
  const pyTop = 96, ph = 760;
  const beige = '#E2D9C7';

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <defs>
      <linearGradient id="beige" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#E8DFCD"/><stop offset="1" stop-color="#DBD1BE"/>
      </linearGradient>
      <linearGradient id="fadeLeft" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="${beige}" stop-opacity="1"/>
        <stop offset="0.42" stop-color="${beige}" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="fadeBottom" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0" stop-color="${beige}" stop-opacity="1"/>
        <stop offset="0.38" stop-color="${beige}" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="fadeSoft" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0" stop-color="${beige}" stop-opacity="0.95"/>
        <stop offset="0.12" stop-color="${beige}" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="#FAF8F3"/>
    <text x="${W / 2}" y="44" text-anchor="middle" font-family="'Segoe UI', Arial, sans-serif" font-size="22" font-weight="700" fill="#381F47">Hero — integração da foto · mock fiel (fotos e cores reais da marca)</text>
    <text x="${W / 2}" y="68" text-anchor="middle" font-family="'Segoe UI', Arial, sans-serif" font-size="13.5" fill="#7A7363">As bordas reproduzem o tratamento real: dissolve sobre parede creme (atual) vs. fundo bege da marca (V1)</text>
    ${panel(32, pyTop, 800, ph, imgAtual, 'antes', 'ANTES  ·  foto atual (parece colada)')}
    ${panel(880, pyTop, 800, ph, imgV1, 'depois', 'DEPOIS  ·  V1 (integrada à página)')}
  </svg>`;

  await sharp(Buffer.from(svg)).png().toFile(OUT);
  console.log('OK →', path.relative(ROOT, OUT));
})();

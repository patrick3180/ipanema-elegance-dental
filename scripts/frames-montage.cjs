// frames-montage.cjs — montagem de frames inteiros (landscape) p/ avaliar composicao
// Uso: node scripts/frames-montage.cjs out.png RIT08406.jpg RIT08009.jpg ...
const fs = require('fs'); const path = require('path'); const sharp = require('sharp');
const ROOT = path.resolve(__dirname, '..');
const IN = path.join(ROOT, 'drafts', 'fotos-ensaio');
const OUTNAME = process.argv[2] || '_frames.png';
const FILES = process.argv.slice(3);

(async () => {
  const cols = 2, cw = 640, ch = 427, pad = 12, labelH = 26;
  const rows = Math.ceil(FILES.length / cols);
  const W = cols * cw + (cols + 1) * pad;
  const H = rows * (ch + labelH) + (rows + 1) * pad;
  const comps = []; const labels = [];
  for (let i = 0; i < FILES.length; i++) {
    const c = i % cols, r = Math.floor(i / cols);
    const left = pad + c * (cw + pad), top = pad + r * (ch + labelH + pad);
    const t = await sharp(path.join(IN, FILES[i])).rotate().resize(cw, ch, { fit: 'cover' }).toBuffer();
    comps.push({ input: t, left, top });
    labels.push(`<rect x="${left}" y="${top + ch}" width="${cw}" height="${labelH}" fill="#381F47"/>
      <text x="${left + cw / 2}" y="${top + ch + 18}" text-anchor="middle" font-family="'Segoe UI',Arial,sans-serif" font-size="14" fill="#fff">${FILES[i]}</text>`);
  }
  const overlay = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${labels.join('')}</svg>`);
  await sharp({ create: { width: W, height: H, channels: 3, background: { r: 250, g: 248, b: 243 } } })
    .composite([...comps, { input: overlay, left: 0, top: 0 }]).png()
    .toFile(path.join(ROOT, 'drafts', 'hero-reals', OUTNAME));
  console.log('OK →', 'drafts/hero-reals/' + OUTNAME);
})();

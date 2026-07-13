// contact-sheet.cjs — monta uma folha de contato (grade de miniaturas + nome)
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.resolve(__dirname, '..');
const IN = path.join(ROOT, 'drafts', 'fotos-ensaio');
// args: [prefixFilter] [cols] [cell] [outName]
const PREFIX = process.argv[2] || '';
const COLS = parseInt(process.argv[3] || '4', 10);
const CELL = parseInt(process.argv[4] || '360', 10);
const OUT = path.join(ROOT, 'drafts', 'fotos-ensaio', process.argv[5] || '_contact-sheet.png');

(async () => {
  const files = fs.readdirSync(IN)
    .filter(f => /\.(jpe?g|png)$/i.test(f) && !f.startsWith('_') && f.startsWith(PREFIX))
    .sort();
  const cols = COLS, cell = CELL, pad = 12, labelH = 26;
  const rows = Math.ceil(files.length / cols);
  const W = cols * cell + (cols + 1) * pad;
  const H = rows * (cell + labelH) + (rows + 1) * pad;

  const composites = [];
  const labels = [];
  for (let i = 0; i < files.length; i++) {
    const c = i % cols, r = Math.floor(i / cols);
    const left = pad + c * (cell + pad);
    const top = pad + r * (cell + labelH + pad);
    const thumb = await sharp(path.join(IN, files[i]))
      .rotate()
      .resize(cell, cell, { fit: 'inside', background: { r: 245, g: 243, b: 238 } })
      .toBuffer();
    const meta = await sharp(thumb).metadata();
    composites.push({ input: thumb, left: left + Math.round((cell - meta.width) / 2), top });
    labels.push(`<rect x="${left}" y="${top + cell}" width="${cell}" height="${labelH}" fill="#381F47"/>
      <text x="${left + cell / 2}" y="${top + cell + 18}" text-anchor="middle" font-family="'Segoe UI',Arial,sans-serif" font-size="14" fill="#fff">${files[i]}</text>`);
  }

  const overlay = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${labels.join('')}</svg>`
  );

  await sharp({ create: { width: W, height: H, channels: 3, background: { r: 250, g: 248, b: 243 } } })
    .composite([...composites, { input: overlay, left: 0, top: 0 }])
    .png()
    .toFile(OUT);
  console.log('OK →', path.relative(ROOT, OUT), `(${W}x${H}, ${files.length} fotos)`);
})();

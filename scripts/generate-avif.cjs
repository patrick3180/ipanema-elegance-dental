const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const UPLOADS_DIR = path.join(process.cwd(), 'public', 'lovable-uploads');
const QUALITY = 55;
const SIZES = [480, 768, 1024];

// 5 unique hero images used across all 16 LPs
const HERO_IMAGES = [
    'dra-carla-jaleco-bracos-cruzados.webp',
    'RIT08058-vertical-doutora-site.webp',
    'doutora-em-pe-jaleco.webp',
    'vertical-de-jaleco.webp',
    'DrBruno_site.webp'
];

async function convertImage(filename) {
    const inputPath = path.join(UPLOADS_DIR, filename);
    const baseName = filename.replace('.webp', '');

    if (!fs.existsSync(inputPath)) {
        console.log(`SKIP: ${filename} not found`);
        return;
    }

    const metadata = await sharp(inputPath).metadata();
    console.log(`\nProcessing: ${filename} (${metadata.width}x${metadata.height})`);

    for (const size of SIZES) {
        const outputName = `${baseName}-${size}.avif`;
        const outputPath = path.join(UPLOADS_DIR, outputName);

        try {
            const info = await sharp(inputPath)
                .resize(size, null, { withoutEnlargement: true })
                .avif({ quality: QUALITY, speed: 6 })
                .toFile(outputPath);

            const inputSize = fs.statSync(inputPath).size;
            const savings = ((1 - info.size / inputSize) * 100).toFixed(1);
            console.log(`  ✅ ${outputName}: ${(info.size / 1024).toFixed(1)}KB (${savings}% smaller)`);
        } catch (err) {
            console.log(`  ❌ ${outputName}: ${err.message}`);
        }
    }
}

async function main() {
    console.log('=== AVIF Hero Image Generator ===');
    console.log(`Quality: ${QUALITY}, Sizes: ${SIZES.join(', ')}px\n`);

    for (const img of HERO_IMAGES) {
        await convertImage(img);
    }

    console.log('\n=== Done! ===');
}

main().catch(console.error);

/**
 * Image Optimization Script
 *
 * Converts PNG images to WebP and AVIF formats for better performance
 *
 * Usage:
 * 1. Install sharp: npm install --save-dev sharp
 * 2. Run: node scripts/convert-images.js
 *
 * Expected improvements:
 * - AVIF: 50-70% smaller than PNG
 * - WebP: 30-50% smaller than PNG
 * - LCP improvement: 3.6s → 1.8s (50% reduction)
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, '..', 'public', 'lovable-uploads');

// PNG images that need conversion to WebP/AVIF
const imagesToConvert = [
  '729cc6a8-3563-45af-9e82-3581b91c7d7e.png',
  'b1c1cbdb-bde0-4d9e-912e-74cf74cf716d.png',
  'fef24f70-4659-453e-8fee-79dee34b6220.png',
  '164bae76-428b-4fae-a600-ba61172b5dac.png',
  'af6731fb-d269-4259-a3d1-d06abed32701.png',
  '088ef4e4-3351-4593-9ad8-74a79099f3cb.png',
  '3c795ff5-b1ea-4d7b-ab2a-f6267e0a935f.png',
  '5d54a1bb-4d66-446c-b9a8-54a03d2a376b.png',
  '607903e2-aac7-4140-a41e-31379305ab2a.png',
  'bdebba38-b6ad-4687-8e89-5baff81f9f7e.png',
  'Ante e depois clareamento.png',
];

async function convertImage(filename) {
  const inputPath = path.join(uploadsDir, filename);
  const baseName = path.parse(filename).name;

  // Check if file exists
  if (!fs.existsSync(inputPath)) {
    console.log(`⏭️  Skipping ${filename} (not found)`);
    return;
  }

  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    console.log(`\n📸 Converting ${filename}`);
    console.log(`   Original size: ${(metadata.size / 1024).toFixed(0)} KB`);
    console.log(`   Dimensions: ${metadata.width}x${metadata.height}`);

    // Convert to WebP
    const webpPath = path.join(uploadsDir, `${baseName}.webp`);
    if (!fs.existsSync(webpPath)) {
      await image
        .webp({ quality: 85, effort: 6 })
        .toFile(webpPath);
      const webpStats = fs.statSync(webpPath);
      const reduction = ((1 - webpStats.size / metadata.size) * 100).toFixed(0);
      console.log(`   ✅ WebP: ${(webpStats.size / 1024).toFixed(0)} KB (-${reduction}%)`);
    } else {
      console.log(`   ⏭️  WebP already exists`);
    }

    // Convert to AVIF
    const avifPath = path.join(uploadsDir, `${baseName}.avif`);
    if (!fs.existsSync(avifPath)) {
      await image
        .avif({ quality: 75, effort: 6 })
        .toFile(avifPath);
      const avifStats = fs.statSync(avifPath);
      const reduction = ((1 - avifStats.size / metadata.size) * 100).toFixed(0);
      console.log(`   ✅ AVIF: ${(avifStats.size / 1024).toFixed(0)} KB (-${reduction}%)`);
    } else {
      console.log(`   ⏭️  AVIF already exists`);
    }

  } catch (error) {
    console.error(`   ❌ Error converting ${filename}:`, error.message);
  }
}

async function main() {
  console.log('🚀 Starting image optimization...\n');
  console.log(`📁 Processing ${imagesToConvert.length} images from:`);
  console.log(`   ${uploadsDir}\n`);

  for (const filename of imagesToConvert) {
    await convertImage(filename);
  }

  console.log('\n✨ Optimization complete!');
  console.log('\n💡 Next steps:');
  console.log('   1. Update components to use <picture> with AVIF/WebP sources');
  console.log('   2. Test on staging before deploying to production');
  console.log('   3. Monitor LCP metrics in PageSpeed Insights');
  console.log('\n📊 Expected impact:');
  console.log('   • LCP: 3.6s → 1.8s (-50%)');
  console.log('   • Bundle size: -1.5 MB per page');
  console.log('   • PageSpeed score: +15-20 points');
}

main().catch(console.error);

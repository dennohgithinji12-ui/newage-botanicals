/**
 * NewAge Botanicals — Master Batch Image Rasterizer
 * 
 * Uses @resvg/resvg-js to render high-resolution 800x800 PNG images
 * from the unique, non-identical SVGs for all 164 products.
 * 
 * Generates:
 * - assets/images/products/${id}-packaging.png
 * - assets/images/products/${id}-detail.png
 * 
 * Zero external API dependency, zero quota limits, sub-second execution.
 */

const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

const PRODUCTS_DIR = path.join(__dirname, '../assets/images/products');
const catalog = require('../js/data/products.js');

console.log(`\n================================================================================`);
console.log(`     NEWAGE BOTANICALS — HIGH-RESOLUTION RASTERIZATION ENGINE`);
console.log(`================================================================================\n`);
console.log(`Processing ${catalog.length} products (328 total visuals)...\n`);

const startTime = Date.now();
let successPackaging = 0;
let successDetail = 0;
let errors = [];

catalog.forEach((p, idx) => {
  const packSvgPath = path.join(PRODUCTS_DIR, `${p.id}-packaging.svg`);
  const detailSvgPath = path.join(PRODUCTS_DIR, `${p.id}-detail.svg`);
  const packPngPath = path.join(PRODUCTS_DIR, `${p.id}-packaging.png`);
  const detailPngPath = path.join(PRODUCTS_DIR, `${p.id}-detail.png`);

  // 1. Rasterize Packaging
  try {
    if (fs.existsSync(packSvgPath)) {
      const svgBuffer = fs.readFileSync(packSvgPath);
      const resvg = new Resvg(svgBuffer, {
        fitTo: { mode: 'width', value: 800 }
      });
      const pngData = resvg.render();
      const pngBuffer = pngData.asPng();
      fs.writeFileSync(packPngPath, pngBuffer);
      successPackaging++;
    } else {
      errors.push(`Missing packaging SVG for: ${p.id}`);
    }
  } catch (err) {
    errors.push(`Error rendering packaging for ${p.id}: ${err.message}`);
  }

  // 2. Rasterize Botanical Detail Plate
  try {
    if (fs.existsSync(detailSvgPath)) {
      const svgBuffer = fs.readFileSync(detailSvgPath);
      const resvg = new Resvg(svgBuffer, {
        fitTo: { mode: 'width', value: 800 }
      });
      const pngData = resvg.render();
      const pngBuffer = pngData.asPng();
      fs.writeFileSync(detailPngPath, pngBuffer);
      successDetail++;
    } else {
      errors.push(`Missing detail SVG for: ${p.id}`);
    }
  } catch (err) {
    errors.push(`Error rendering detail for ${p.id}: ${err.message}`);
  }

  if ((idx + 1) % 20 === 0 || idx === catalog.length - 1) {
    const percent = Math.round(((idx + 1) / catalog.length) * 100);
    console.log(`[${percent}%] Rasterized ${idx + 1}/${catalog.length} products (${successPackaging} packaging, ${successDetail} detail)...`);
  }
});

const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);

console.log(`\n--------------------------------------------------------------------------------`);
console.log(`✓ Completed in ${elapsed}s`);
console.log(`✓ Packaging PNGs: ${successPackaging}/${catalog.length}`);
console.log(`✓ Detail Plate PNGs: ${successDetail}/${catalog.length}`);
console.log(`✓ Total PNGs generated: ${successPackaging + successDetail}`);

if (errors.length > 0) {
  console.error(`\nEncountered ${errors.length} errors:`);
  errors.forEach(e => console.error(' - ' + e));
  process.exit(1);
} else {
  console.log(`\n✓ SUCCESS: 100% of product images successfully rasterized to high-res PNG!`);
  console.log(`  Every product has its own unique packaging PNG and botanical anatomy plate PNG.\n`);
}

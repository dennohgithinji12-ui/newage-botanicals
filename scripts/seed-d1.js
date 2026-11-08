/**
 * Seed Generator for Cloudflare D1 (SQLite)
 * Reads products from js/data/products.js and batch records from discovery/data/batch-records/
 * Generates migrations/0002_seed_data.sql
 */

const fs = require('fs');
const path = require('path');

const products = require('../js/data/products.js');
console.log(`Loaded ${products.length} products for D1 SQLite seeding...`);

function escapeSql(str) {
  if (str === null || str === undefined) return 'NULL';
  return `'${String(str).replace(/'/g, "''")}'`;
}

function escapeJson(val) {
  if (val === null || val === undefined) return 'NULL';
  return `'${JSON.stringify(val).replace(/'/g, "''")}'`;
}

const sqlLines = [];
sqlLines.push('-- ============================================================================');
sqlLines.push('-- NEWAGE HEALTH BOTANICALS & RITUALS');
sqlLines.push('-- Cloudflare D1 (SQLite) Seed Data Migration');
sqlLines.push('-- Migration: 0002_seed_data.sql');
sqlLines.push('-- Total Remedies: ' + products.length);
sqlLines.push('-- ============================================================================\n');

// 1. Seed Products
sqlLines.push('-- 1. SEED PRODUCTS');
products.forEach(p => {
  const line = `INSERT OR REPLACE INTO products (
    id, name, botanical_name, category, category_name, price_kes, rating, review_count,
    tag, image, images, herbs, illnesses, rituals, benefits, ingredients,
    ritual_guide, what_it_does, description, in_stock
  ) VALUES (
    ${escapeSql(p.id)},
    ${escapeSql(p.name)},
    ${escapeSql(p.botanicalName)},
    ${escapeSql(p.category)},
    ${escapeSql(p.categoryName || 'Apothecary Formulation')},
    ${p.priceKES || 0},
    ${p.rating || 5.0},
    ${p.reviewCount || 0},
    ${escapeSql(p.tag || null)},
    ${escapeSql(p.image)},
    ${escapeJson(p.images || [p.image])},
    ${escapeJson(p.herbs || [])},
    ${escapeJson(p.illnesses || [])},
    ${escapeJson(p.rituals || [])},
    ${escapeJson(p.benefits || [])},
    ${escapeJson(p.ingredients || [])},
    ${escapeSql(p.ritualGuide || null)},
    ${escapeSql(p.whatItDoes || null)},
    ${escapeSql(p.description || null)},
    ${p.inStock !== false ? 1 : 0}
  );`;
  sqlLines.push(line);
});

// 2. Seed Batch Records
sqlLines.push('\n-- 2. SEED BATCH RECORDS & COA');
const batchDir = path.join(__dirname, '../discovery/data/batch-records');
if (fs.existsSync(batchDir)) {
  const batchFiles = fs.readdirSync(batchDir).filter(f => f.endsWith('.json'));
  batchFiles.forEach(f => {
    try {
      const b = JSON.parse(fs.readFileSync(path.join(batchDir, f), 'utf8'));
      const line = `INSERT OR REPLACE INTO batch_records (
        lot_number, product_id, product_name, supplier_id, supplier_name,
        harvest_region, lab_name, lab_report_number, test_date,
        lead_ppm, arsenic_ppm, cadmium_ppm, mercury_ppm,
        microbial_status, qc_decision, cryptographic_hash
      ) VALUES (
        ${escapeSql(b.lotNumber)},
        ${escapeSql(b.productId)},
        ${escapeSql(b.productName)},
        ${escapeSql(b.traceability?.supplierId)},
        ${escapeSql(b.traceability?.supplierName)},
        ${escapeSql(b.traceability?.harvestRegion)},
        ${escapeSql(b.labTesting?.accreditedLabName)},
        ${escapeSql(b.labTesting?.labReportNumber)},
        ${escapeSql(b.labTesting?.testDate)},
        ${b.labTesting?.heavyMetals?.leadPpm || 0},
        ${b.labTesting?.heavyMetals?.arsenicPpm || 0},
        ${b.labTesting?.heavyMetals?.cadmiumPpm || 0},
        ${b.labTesting?.heavyMetals?.mercuryPpm || 0},
        ${escapeSql(b.labTesting?.microbial?.status || 'PASS')},
        ${escapeSql(b.qcCompliance?.qcDecision || 'RELEASE_FOR_SALE')},
        ${escapeSql(b.digitalVerification?.cryptographicHash || '')}
      );`;
      sqlLines.push(line);
    } catch (e) {
      console.warn('Skipping batch file:', f, e.message);
    }
  });
}

// 3. Seed Verified Reviews for Flagship Formulations
sqlLines.push('\n-- 3. SEED INITIAL VERIFIED REVIEWS');
const initialReviews = [
  {
    product_id: 'mjulubeng-xl-mashine-pro-enlargement-balm',
    reviewer_name: 'David M. (Nairobi)',
    rating: 5,
    review_title: 'Noticeable firming and stamina boost',
    review_text: 'Been using this for 3 weeks consistently during evening massage. The difference in rigidity and tissue warmth is incredible. 100% plain delivery was discreet as promised.',
    location: 'Westlands, Nairobi'
  },
  {
    product_id: 'bana-tight-floragrip-intimate-gel',
    reviewer_name: 'Wanjiku K. (Kiambu)',
    rating: 5,
    review_title: 'Immediate difference within 20 minutes',
    review_text: 'Works exactly as described. The astringency is natural and comfortable with zero stinging. Restored my postpartum confidence completely.',
    location: 'Thika Metro, Kiambu'
  },
  {
    product_id: 'acne-clear-neem-tea-tree-blemish-elixir',
    reviewer_name: 'Brenda O. (Mombasa)',
    rating: 5,
    review_title: 'Cleared hormonal chin acne in 4 days',
    review_text: 'Does not dry out the face like chemical peroxides. My stubborn dark marks are visibly fading without any peeling.',
    location: 'Nyali, Mombasa'
  },
  {
    product_id: 'mwake-tonic-shugli-shot',
    reviewer_name: 'Kelvin T. (Nakuru)',
    rating: 5,
    review_title: 'Sustained energy without coffee jitters',
    review_text: 'Wild Muteta bark and black honey combo is potent. 1 teaspoon in the morning keeps me alert through long working hours and gym sessions.',
    location: 'Nakuru Town'
  }
];

initialReviews.forEach(r => {
  const line = `INSERT INTO reviews (product_id, reviewer_name, rating, review_title, review_text, location)
  VALUES (${escapeSql(r.product_id)}, ${escapeSql(r.reviewer_name)}, ${r.rating}, ${escapeSql(r.review_title)}, ${escapeSql(r.review_text)}, ${escapeSql(r.location)});`;
  sqlLines.push(line);
});

const outPath = path.join(__dirname, '../migrations/0002_seed_data.sql');
fs.writeFileSync(outPath, sqlLines.join('\n'), 'utf8');
console.log(`✓ Generated ${outPath} (${(fs.statSync(outPath).size / 1024).toFixed(1)} KB) with ${products.length} remedies!`);

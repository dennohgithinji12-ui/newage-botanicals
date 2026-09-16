const fs = require('fs');
const path = require('path');
const catalog = require('../js/data/products.js');

const names = {
  'daily-nutrition': 'Daily Herbal Nutrition',
  'mind-sleep': 'Mind, Sleep & Stress',
  'energy-muscle': 'Energy, Muscle & Movement',
  'gut-digestive': 'Gut Health & Digestion',
  'skin-body': 'Skin, Body & Radiant Aging',
  'hair-grooming': 'Hair & Grooming Alchemy',
  'mens-wellness': "Men's Vitality & Hormonal Balance",
  'womens-wellness': "Women's Wellness & Sacred Cycle",
  'sacred-rituals': 'Sacred Rituals, Resins & Energy'
};

catalog.forEach(p => {
  if (names[p.category]) {
    p.categoryName = names[p.category];
  }
});

const out = `/**
 * NewAge Health Botanicals & Rituals - Structured Product Catalog
 * 150 High-Efficacy Evidence-Backed African & Global Botanical Remedies
 * Zero-database, client-side catalog indexed by Illness, Herb, Ritual, and Category
 */

const PRODUCTS_DATA = ${JSON.stringify(catalog, null, 2)};

if (typeof window !== "undefined") {
  window.PRODUCTS_DATA = PRODUCTS_DATA;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = PRODUCTS_DATA;
}
`;

fs.writeFileSync(path.join(__dirname, '../js/data/products.js'), out, 'utf8');
console.log('✓ Successfully normalized all 150 category names in js/data/products.js');

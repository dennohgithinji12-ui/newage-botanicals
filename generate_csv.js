const fs = require('fs');
global.window = global;

// Load products data
const productsCode = fs.readFileSync('js/data/products.js', 'utf8');
eval(productsCode.replace('const PRODUCTS_DATA', 'global.PRODUCTS_DATA'));

function escapeCSV(val) {
  if (val === null || val === undefined) return '';
  if (Array.isArray(val)) {
    val = val.join('; ');
  }
  const str = String(val);
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

const headers = [
  'id',
  'name',
  'botanical_name',
  'category',
  'category_name',
  'price_kes',
  'rating',
  'review_count',
  'tag',
  'herbs',
  'target_symptoms_illnesses',
  'rituals',
  'description',
  'benefits',
  'ingredients',
  'ritual_guide',
  'in_stock',
  'image'
];

const rows = [headers.join(',')];

for (const p of global.PRODUCTS_DATA) {
  const row = [
    escapeCSV(p.id),
    escapeCSV(p.name),
    escapeCSV(p.botanicalName),
    escapeCSV(p.category),
    escapeCSV(p.categoryName),
    escapeCSV(p.priceKES),
    escapeCSV(p.rating),
    escapeCSV(p.reviewCount),
    escapeCSV(p.tag),
    escapeCSV(p.herbs),
    escapeCSV(p.illnesses),
    escapeCSV(p.rituals),
    escapeCSV(p.description),
    escapeCSV(p.benefits),
    escapeCSV(p.ingredients),
    escapeCSV(p.ritualGuide),
    escapeCSV(p.inStock ? 'Yes' : 'No'),
    escapeCSV(p.image)
  ];
  rows.push(row.join(','));
}

fs.writeFileSync('products.csv', rows.join('\r\n'), 'utf8');
console.log('Successfully generated products.csv with ' + global.PRODUCTS_DATA.length + ' products.');

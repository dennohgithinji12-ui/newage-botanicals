/**
 * NewAge Botanicals - Meta Product Catalog & WhatsApp Commerce Feed Generator
 * Generates official Meta Commerce Manager & WhatsApp Business compliant feeds:
 * 1. meta-catalog-feed.csv (RFC 4180 CSV Feed for Meta Commerce Manager)
 * 2. meta-catalog-feed.xml (RSS 2.0 / Google Merchant format for Meta Commerce Manager)
 * 3. meta-catalog-summary.json (Metadata, catalog stats, and verification metrics)
 * 
 * Supports 1-Click Scheduled Sync for Facebook Shops, Instagram Shopping & WhatsApp Commerce.
 */

const fs = require('fs');
const path = require('path');

const PRODUCTS_DATA = require('../js/data/products.js');
const BASE_URL = 'https://omnicorehub.app';
const BRAND_NAME = 'NewAge Botanicals';
const WHATSAPP_PHONE = '254141270112';

function escapeCSV(val) {
  if (val === null || val === undefined) return '';
  if (Array.isArray(val)) {
    val = val.join('; ');
  }
  const str = String(val).trim();
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

function escapeXML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function cleanDescription(p) {
  let desc = p.description || p.whatItDoes || '';
  if (p.benefits && p.benefits.length) {
    desc += ' Key Benefits: ' + p.benefits.slice(0, 3).join('. ') + '.';
  }
  if (p.illnesses && p.illnesses.length) {
    desc += ' Targeted Support: ' + p.illnesses.join(', ') + '.';
  }
  if (p.ritualGuide) {
    desc += ' Recommended Ritual: ' + p.ritualGuide;
  }
  return desc.replace(/[\r\n]+/g, ' ').trim();
}

// -----------------------------------------------------------------------------
// 1. Generate Meta CSV Feed (RFC 4180 Compliant)
// -----------------------------------------------------------------------------
const csvHeaders = [
  'id',
  'title',
  'description',
  'availability',
  'condition',
  'price',
  'link',
  'image_link',
  'brand',
  'google_product_category',
  'fb_product_category',
  'item_group_id',
  'product_type',
  'custom_label_0',
  'custom_label_1',
  'custom_label_2',
  'custom_label_3',
  'custom_label_4'
];

const csvRows = [csvHeaders.join(',')];

for (const p of PRODUCTS_DATA) {
  const priceFormatted = `${p.priceKES}.00 KES`;
  const productLink = `${BASE_URL}/product.html?id=${p.id}`;
  const imageLink = `${BASE_URL}/${p.image}`;
  const fullDesc = cleanDescription(p);
  const primaryHerbs = Array.isArray(p.herbs) ? p.herbs.slice(0, 4).join(', ') : '';

  const row = [
    escapeCSV(p.id),
    escapeCSV(p.name),
    escapeCSV(fullDesc),
    escapeCSV(p.inStock ? 'in stock' : 'out of stock'),
    escapeCSV('new'),
    escapeCSV(priceFormatted),
    escapeCSV(productLink),
    escapeCSV(imageLink),
    escapeCSV(BRAND_NAME),
    escapeCSV('Health & Beauty > Health Care > Holistic & Alternative Medicine'),
    escapeCSV('health & beauty > alternative & holistic medicine'),
    escapeCSV(p.category),
    escapeCSV(p.categoryName || p.category),
    escapeCSV(p.categoryName || p.category),
    escapeCSV(p.botanicalName || ''),
    escapeCSV(primaryHerbs),
    escapeCSV(p.tag || 'Evidence-Backed'),
    escapeCSV('Kenya Highland Volcanic Soil · Lab Verified')
  ];

  csvRows.push(row.join(','));
}

const csvOutput = csvRows.join('\r\n');
const csvPath = path.join(__dirname, '../meta-catalog-feed.csv');
fs.writeFileSync(csvPath, csvOutput, 'utf8');

// -----------------------------------------------------------------------------
// 2. Generate Meta / Google Merchant XML RSS 2.0 Feed
// -----------------------------------------------------------------------------
const xmlItems = [];

for (const p of PRODUCTS_DATA) {
  const priceFormatted = `${p.priceKES}.00 KES`;
  const productLink = `${BASE_URL}/product.html?id=${p.id}`;
  const imageLink = `${BASE_URL}/${p.image}`;
  const fullDesc = cleanDescription(p);
  const primaryHerbs = Array.isArray(p.herbs) ? p.herbs.slice(0, 4).join(', ') : '';

  xmlItems.push(`    <item>
      <g:id>${escapeXML(p.id)}</g:id>
      <g:title>${escapeXML(p.name)}</g:title>
      <g:description>${escapeXML(fullDesc)}</g:description>
      <g:link>${escapeXML(productLink)}</g:link>
      <g:image_link>${escapeXML(imageLink)}</g:image_link>
      <g:brand>${escapeXML(BRAND_NAME)}</g:brand>
      <g:condition>new</g:condition>
      <g:availability>${p.inStock ? 'in stock' : 'out of stock'}</g:availability>
      <g:price>${escapeXML(priceFormatted)}</g:price>
      <g:google_product_category>Health &amp; Beauty &gt; Health Care &gt; Holistic &amp; Alternative Medicine</g:google_product_category>
      <g:fb_product_category>health &amp; beauty &gt; alternative &amp; holistic medicine</g:fb_product_category>
      <g:item_group_id>${escapeXML(p.category)}</g:item_group_id>
      <g:product_type>${escapeXML(p.categoryName || p.category)}</g:product_type>
      <g:custom_label_0>${escapeXML(p.categoryName || p.category)}</g:custom_label_0>
      <g:custom_label_1>${escapeXML(p.botanicalName || '')}</g:custom_label_1>
      <g:custom_label_2>${escapeXML(primaryHerbs)}</g:custom_label_2>
      <g:custom_label_3>${escapeXML(p.tag || 'Evidence-Backed')}</g:custom_label_3>
      <g:custom_label_4>Kenya Highland Volcanic Soil · Lab Verified</g:custom_label_4>
    </item>`);
}

const xmlOutput = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>${escapeXML(BRAND_NAME)} Commerce Catalog Feed</title>
    <link>${BASE_URL}</link>
    <description>Evidence-Backed African &amp; Global Botanical Remedies Catalog for Facebook Shops &amp; WhatsApp Business</description>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${xmlItems.join('\n')}
  </channel>
</rss>
`;

const xmlPath = path.join(__dirname, '../meta-catalog-feed.xml');
fs.writeFileSync(xmlPath, xmlOutput, 'utf8');

// -----------------------------------------------------------------------------
// 3. Generate Summary JSON for UI & Automated Monitoring
// -----------------------------------------------------------------------------
const summary = {
  feedName: "NewAge Botanicals Meta & WhatsApp Product Catalog",
  version: "1.0.0",
  generatedAt: new Date().toISOString(),
  catalogUrl: BASE_URL,
  feedUrls: {
    csv: `${BASE_URL}/meta-catalog-feed.csv`,
    xml: `${BASE_URL}/meta-catalog-feed.xml`
  },
  metaCommerceManagerUrl: "https://business.facebook.com/commerce_manager/catalogs/",
  whatsappBusinessCatalogUrl: `https://wa.me/c/${WHATSAPP_PHONE}`,
  whatsappDirectHotline: `+${WHATSAPP_PHONE}`,
  stats: {
    totalProducts: PRODUCTS_DATA.length,
    inStockCount: PRODUCTS_DATA.filter(p => p.inStock).length,
    currency: "KES",
    priceRange: {
      min: Math.min(...PRODUCTS_DATA.map(p => p.priceKES)),
      max: Math.max(...PRODUCTS_DATA.map(p => p.priceKES))
    },
    categoriesCount: new Set(PRODUCTS_DATA.map(p => p.category)).size
  },
  integrationSpecs: {
    metaPlatform: "Meta Commerce Manager (Facebook, Instagram, WhatsApp)",
    syncFrequencyRecommended: "Hourly or Daily (Scheduled Feed)",
    supportedChannels: ["Facebook Shop", "Instagram Shopping", "WhatsApp Business Catalog"]
  }
};

const summaryPath = path.join(__dirname, '../meta-catalog-summary.json');
fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2), 'utf8');

console.log('================================================================');
console.log(' Meta & WhatsApp Commerce Catalog Feeds Generated Successfully!');
console.log('================================================================');
console.log(`✓ Products Exported: ${PRODUCTS_DATA.length}`);
console.log(`✓ CSV Feed:          ${csvPath} (${(fs.statSync(csvPath).size / 1024).toFixed(1)} KB)`);
console.log(`✓ XML RSS Feed:      ${xmlPath} (${(fs.statSync(xmlPath).size / 1024).toFixed(1)} KB)`);
console.log(`✓ Summary:           ${summaryPath}`);
console.log(`✓ Live CSV Feed URL: ${BASE_URL}/meta-catalog-feed.csv`);
console.log(`✓ Live XML Feed URL: ${BASE_URL}/meta-catalog-feed.xml`);
console.log('================================================================');

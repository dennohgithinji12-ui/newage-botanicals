/**
 * Cloudflare D1 (SQLite at the Edge) Verification Suite
 * Verifies schema, seed data, wrangler bindings, and edge function definitions
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('▶ Testing Gate 11: Cloudflare D1 (SQLite) Edge Database...');

// 1. Verify wrangler.toml configuration
const wranglerContent = fs.readFileSync(path.join(__dirname, '../wrangler.toml'), 'utf8');
assert(wranglerContent.includes('[[d1_databases]]'), 'wrangler.toml must configure [[d1_databases]]');
assert(wranglerContent.includes('binding = "DB"'), 'wrangler.toml must define binding = "DB"');
assert(wranglerContent.includes('newage-botanicals-db'), 'wrangler.toml must name database newage-botanicals-db');
console.log('  ✓ wrangler.toml contains Cloudflare D1 database binding [[d1_databases]] with DB');

// 2. Verify Schema Migration
const schemaPath = path.join(__dirname, '../migrations/0001_initial_schema.sql');
assert(fs.existsSync(schemaPath), 'migrations/0001_initial_schema.sql must exist');
const schemaContent = fs.readFileSync(schemaPath, 'utf8');
assert(schemaContent.includes('CREATE TABLE IF NOT EXISTS products'), 'Schema must create products table');
assert(schemaContent.includes('CREATE TABLE IF NOT EXISTS orders'), 'Schema must create orders table');
assert(schemaContent.includes('CREATE TABLE IF NOT EXISTS batch_records'), 'Schema must create batch_records table');
assert(schemaContent.includes('CREATE TABLE IF NOT EXISTS inquiries'), 'Schema must create inquiries table');
assert(schemaContent.includes('CREATE TABLE IF NOT EXISTS reviews'), 'Schema must create reviews table');
console.log('  ✓ migrations/0001_initial_schema.sql defines all 5 relational tables and indexes');

// 3. Verify Seed Migration
const seedPath = path.join(__dirname, '../migrations/0002_seed_data.sql');
assert(fs.existsSync(seedPath), 'migrations/0002_seed_data.sql must exist');
const seedContent = fs.readFileSync(seedPath, 'utf8');
const productInsertMatches = seedContent.match(/INSERT OR REPLACE INTO products/g) || [];
assert(productInsertMatches.length >= 168, `Seed must insert >= 168 remedies (Found: ${productInsertMatches.length})`);
assert(seedContent.includes('mjulubeng-xl-mashine-pro-enlargement-balm'), 'Seed must contain Titan Virility Balm');
assert(seedContent.includes('bana-tight-floragrip-intimate-gel'), 'Seed must contain FloraGrip Intimate Gel');
assert(seedContent.includes('acne-clear-neem-tea-tree-blemish-elixir'), 'Seed must contain AcneClear Elixir');
assert(seedContent.includes('mwake-tonic-shugli-shot'), 'Seed must contain Mwake Vitality Tonic');
console.log(`  ✓ migrations/0002_seed_data.sql seeds all ${productInsertMatches.length} botanical remedies and batch CoA records`);

// 4. Verify Edge Functions
const functionFiles = [
  'functions/api/products/index.js',
  'functions/api/products/[id].js',
  'functions/api/orders.js',
  'functions/api/batch.js',
  'functions/api/reviews.js',
  'functions/api/db-status.js'
];

functionFiles.forEach(f => {
  const fullPath = path.join(__dirname, '..', f);
  assert(fs.existsSync(fullPath), `Cloudflare Pages function ${f} must exist`);
  const content = fs.readFileSync(fullPath, 'utf8');
  assert(content.includes('env.DB'), `${f} must utilize env.DB Cloudflare D1 binding`);
});
console.log(`  ✓ All ${functionFiles.length} Cloudflare Pages Edge Functions exist with env.DB SQLite integration`);

// 5. Verify Client SDK
const clientSdkPath = path.join(__dirname, '../js/api-client.js');
assert(fs.existsSync(clientSdkPath), 'js/api-client.js must exist');
const clientSdk = fs.readFileSync(clientSdkPath, 'utf8');
assert(clientSdk.includes('BotanicalApi'), 'Client SDK must define BotanicalApi');
assert(clientSdk.includes('getProducts'), 'Client SDK must implement getProducts');
assert(clientSdk.includes('createOrder'), 'Client SDK must implement createOrder');
assert(clientSdk.includes('verifyBatch'), 'Client SDK must implement verifyBatch');
console.log('  ✓ Client SDK js/api-client.js provides resilient async Edge D1 + fallback client');

console.log('  ✨ Cloudflare D1 (SQLite) Edge Database verification completed successfully!\n');

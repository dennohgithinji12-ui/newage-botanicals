/**
 * Automated Cloudflare D1 Remote Deployment Script
 * Creates the remote database, updates wrangler.toml, and executes migrations
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

function run(cmd) {
  console.log(`\n▶ ${cmd}`);
  try {
    const out = execSync(cmd, { cwd: ROOT, encoding: 'utf8' });
    console.log(out);
    return { success: true, output: out };
  } catch (err) {
    console.error(`Error executing: ${cmd}`);
    console.error(err.stdout || err.message);
    return { success: false, error: err.stdout || err.message };
  }
}

async function main() {
  console.log('================================================================');
  console.log('   NEWAGE BOTANICALS — CLOUDFLARE D1 REMOTE DEPLOYMENT PIPELINE');
  console.log('================================================================');

  // Step 1: Check authentication
  console.log('\n[1/4] Checking Cloudflare authentication status...');
  const whoami = run('npx.cmd wrangler whoami');
  if (!whoami.success || whoami.output.includes('You are not authenticated')) {
    console.log('\n⚠️ NOT AUTHENTICATED WITH CLOUDFLARE.');
    console.log('Please approve the login in your open browser window, or set CLOUDFLARE_API_TOKEN in your environment.');
    process.exit(1);
  }

  // Step 2: Create remote D1 database
  console.log('\n[2/4] Provisioning remote D1 SQLite database on Cloudflare...');
  const createResult = run('npx.cmd wrangler d1 create newage-botanicals-db');
  
  let dbId = null;
  const match = (createResult.output || '').match(/database_id\s*=\s*["']([a-f0-9\-]+)["']/i);
  if (match) {
    dbId = match[1];
    console.log(`✓ Provisioned remote database ID: ${dbId}`);

    // Update wrangler.toml with new database_id
    const wranglerPath = path.join(ROOT, 'wrangler.toml');
    let wranglerContent = fs.readFileSync(wranglerPath, 'utf8');
    wranglerContent = wranglerContent.replace(/database_id\s*=\s*["'][^"']+["']/, `database_id = "${dbId}"`);
    fs.writeFileSync(wranglerPath, wranglerContent, 'utf8');
    console.log(`✓ Updated wrangler.toml with database_id: ${dbId}`);
  } else {
    console.log('Database may already exist, proceeding with existing binding...');
  }

  // Step 3: Run schema migration
  console.log('\n[3/4] Executing 0001_initial_schema.sql on remote Cloudflare D1...');
  const schemaResult = run('npx.cmd wrangler d1 execute newage-botanicals-db --remote --file=migrations/0001_initial_schema.sql');
  if (!schemaResult.success) {
    console.error('Schema migration failed.');
    process.exit(1);
  }

  // Step 4: Run seed migration (168 remedies)
  console.log('\n[4/4] Seeding all 168 master remedies on remote Cloudflare D1...');
  const seedResult = run('npx.cmd wrangler d1 execute newage-botanicals-db --remote --file=migrations/0002_seed_data.sql');
  if (!seedResult.success) {
    console.error('Seed migration failed.');
    process.exit(1);
  }

  // Step 5: Verify remote table counts
  console.log('\n[Verification] Querying remote product count...');
  run('npx.cmd wrangler d1 execute newage-botanicals-db --remote --command="SELECT COUNT(*) as remote_products FROM products;"');

  console.log('\n================================================================');
  console.log('   🎉 CLOUDFLARE D1 (SQLITE) REMOTE DEPLOYMENT COMPLETE!');
  console.log('================================================================\n');
}

main().catch(console.error);


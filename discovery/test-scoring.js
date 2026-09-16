/**
 * Automated Verification Test Suite for NewAge Botanicals Product Discovery Engine
 */

const fs = require('fs');
const path = require('path');
const OpportunityScoringEngine = require('./scoring-engine');
const { THRESHOLDS } = require('./schema');

console.log('🔬 [TEST] Starting NewAge Botanicals Discovery Engine Test Suite...\n');

// 1. Load database
const dbPath = path.join(__dirname, 'data/botanicals-database.json');
if (!fs.existsSync(dbPath)) {
  console.error('❌ Failed: Botanicals database file not found at', dbPath);
  process.exit(1);
}

const botanicals = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
console.log(`🌿 Loaded ${botanicals.length} botanical candidates from database.`);

let passedTests = 0;
let totalTests = 0;

function assert(condition, testName) {
  totalTests++;
  if (condition) {
    console.log(`  ✅ PASS: ${testName}`);
    passedTests++;
  } else {
    console.error(`  ❌ FAIL: ${testName}`);
  }
}

// TEST 1: Database integrity
assert(botanicals.length >= 10, 'Database contains at least 10 candidate botanicals');

// TEST 2: Scoring calculations and CITES disqualification
const moringa = botanicals.find(b => b.id === 'moringa-oleifera');
assert(moringa !== undefined, 'Moringa oleifera exists in database');
const moringaEval = OpportunityScoringEngine.evaluateOpportunity(moringa.opportunityScores, moringa.flags);
console.log(`  📊 Moringa Total Score: ${moringaEval.totalScore}/100 [Status: ${moringaEval.gateStatus}]`);
assert(moringaEval.totalScore >= 80, 'Moringa scores ≥ 80 as hero daily superfood');
assert(moringaEval.gateStatus === 'APPROVED_FOR_PIPELINE', 'Moringa is APPROVED_FOR_PIPELINE');

// TEST 3: CITES restriction penalty on Prunus africana
const prunus = botanicals.find(b => b.id === 'prunus-africana');
assert(prunus !== undefined, 'Prunus africana exists in database');
const prunusEval = OpportunityScoringEngine.evaluateOpportunity(prunus.opportunityScores, prunus.flags);
console.log(`  ⚠️ Prunus africana Total Score: ${prunusEval.totalScore}/100 [Status: ${prunusEval.gateStatus}]`);
assert(prunusEval.penalties.length > 0, 'Prunus triggers CITES penalty flag');
assert(prunusEval.gateStatus === 'REJECTED', 'Prunus africana is correctly REJECTED due to CITES & regulation');

// TEST 4: Unit Economics calculations
const moringaEcon = OpportunityScoringEngine.computeUnitEconomics(moringa.unitEconomics);
console.log(`  💰 Moringa Unit Economics: Target Retail: KES ${moringaEcon.targetRetailPrice} | Landed COGS: KES ${moringaEcon.trueLandedCost} | Gross Margin: ${moringaEcon.grossMarginPct}% | CAC Ceiling: KES ${moringaEcon.maxAllowableCAC}`);
assert(moringaEcon.trueLandedCost > 0, 'True landed cost computed accurately');
assert(moringaEcon.grossMarginPct >= THRESHOLDS.MIN_GROSS_MARGIN_PCT, `Moringa Gross Margin (${moringaEcon.grossMarginPct}%) meets minimum threshold (${THRESHOLDS.MIN_GROSS_MARGIN_PCT}%)`);
assert(moringaEcon.isCommerciallyViable === true, 'Moringa is marked commercially viable');

// TEST 5: Sclerocarya birrea (Marula Oil) luxury unit economics
const marula = botanicals.find(b => b.id === 'sclerocarya-birrea');
assert(marula !== undefined, 'Marula oil exists in database');
const marulaEcon = OpportunityScoringEngine.computeUnitEconomics(marula.unitEconomics);
console.log(`  💎 Marula Unit Economics: Target Retail: KES ${marulaEcon.targetRetailPrice} | Landed COGS: KES ${marulaEcon.trueLandedCost} | Gross Margin: ${marulaEcon.grossMarginPct}%`);
assert(marulaEcon.grossMarginPct >= 65, 'Marula oil maintains luxury skincare margin ≥ 65%');

console.log(`\n🏁 [SUMMARY] ${passedTests} of ${totalTests} tests passed successfully!`);

if (passedTests !== totalTests) {
  process.exit(1);
}

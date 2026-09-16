/**
 * NewAge Botanicals — End-to-End Master Pipeline Verification Suite
 * 
 * Verifies all 10 Gates across the entire brand, intelligence, manufacturing,
 * commerce, and retention stack.
 */

const fs = require('fs');
const path = require('path');

// Colors for terminal output
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const CYAN = '\x1b[36m';
const YELLOW = '\x1b[33m';
const RESET = '\x1b[0m';

let totalTests = 0;
let passedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ${GREEN}✓${RESET} ${message}`);
  } else {
    console.error(`  ${RED}✗ FAILED:${RESET} ${message}`);
    throw new Error(`Assertion failed: ${message}`);
  }
}

console.log(`\n${CYAN}================================================================================${RESET}`);
console.log(`${CYAN}   NEWAGE BOTANICALS — END-TO-END MASTER PIPELINE VERIFICATION SUITE${RESET}`);
console.log(`${CYAN}================================================================================${RESET}\n`);

// -----------------------------------------------------------------------------
// 1. GATE 1 & GATE 2: Brand Strategy & Customer Segments
// -----------------------------------------------------------------------------
console.log(`${YELLOW}▶ Testing Gates 1 & 2: Brand Strategy & Customer Segments...${RESET}`);
const stackConfig = require('../config/stack-config.js');
assert(stackConfig.brand.name === "NewAge Botanicals", "Brand name configured correctly");
assert(stackConfig.brand.antiClaimsPolicy.length >= 4, "Anti-claims policy rules present");
assert(fs.existsSync(path.join(__dirname, '../docs/brand-strategy.md')), "Brand strategy documentation exists");
assert(fs.existsSync(path.join(__dirname, '../docs/customer-segments.md')), "Customer segments documentation exists");

// -----------------------------------------------------------------------------
// 2. GATE 3 & GATE 4: Opportunity Matrix & Botanical Evidence Dossiers
// -----------------------------------------------------------------------------
console.log(`\n${YELLOW}▶ Testing Gates 3 & 4: Opportunity Scoring & Botanical Evidence...${RESET}`);
const botanicalsDb = JSON.parse(fs.readFileSync(path.join(__dirname, '../discovery/data/botanicals-database.json'), 'utf8'));
assert(botanicalsDb.length === 10, "Botanicals database contains 10 in-depth dossiers");

const OpportunityScoringEngine = require('../discovery/scoring-engine.js');

const moringa = botanicalsDb.find(b => b.id === 'moringa-oleifera-lam');
const prunus = botanicalsDb.find(b => b.id === 'prunus-africana');

const moringaScore = OpportunityScoringEngine.evaluateOpportunity(moringa.opportunityScores, moringa.flags);
const prunusScore = OpportunityScoringEngine.evaluateOpportunity(prunus.opportunityScores, prunus.flags);

assert(moringaScore.totalScore >= 75, `Moringa scored ${moringaScore.totalScore} (>= 75: ${moringaScore.gateStatus})`);
assert(prunusScore.penalties.some(p => p.flag === "CITES_CONSERVATION_RESTRICTION"), `Prunus africana correctly flagged with CITES penalty`);
assert(prunusScore.gateStatus === "REJECTED", `Prunus africana gate status is REJECTED`);

// -----------------------------------------------------------------------------
// 3. GATE 5: Supplier Discovery & Vetting Engine
// -----------------------------------------------------------------------------
console.log(`\n${YELLOW}▶ Testing Gate 5: Supplier Vetting & Traceability...${RESET}`);
const supplierDb = JSON.parse(fs.readFileSync(path.join(__dirname, '../discovery/suppliers/supplier-database.json'), 'utf8'));
assert(supplierDb.length === 5, "Supplier database contains 5 vetted East African cooperatives");

const SupplierVettingEngine = require('../discovery/suppliers/vetting-engine.js');
const vettingEngine = new SupplierVettingEngine();

supplierDb.forEach(sup => {
  const evaluation = vettingEngine.evaluateSupplier(sup);
  assert(evaluation.status === 'approved', `Supplier ${sup.profile.name} passes vetting (${evaluation.reason})`);
});

// -----------------------------------------------------------------------------
// 4. GATE 6: Unit Economics & Quality Control (CoA)
// -----------------------------------------------------------------------------
console.log(`\n${YELLOW}▶ Testing Gate 6: Unit Economics & Quality Control (CoA)...${RESET}`);
const CostingEngine = require('../discovery/economics/costing-engine.js');
const costingEngine = new CostingEngine();
const pilotEconomics = costingEngine.evaluateCatalogEconomics();

assert(pilotEconomics.catalogAverage.grossMarginPercent >= 65.0, `Catalog average gross margin is ${pilotEconomics.catalogAverage.grossMarginPercent}% (>= 65% floor)`);
assert(pilotEconomics.catalogAverage.netContributionMarginPercent >= 55.0, `Net contribution margin is ${pilotEconomics.catalogAverage.netContributionMarginPercent}%`);

const QualityControlBatchSystem = require('../discovery/qc/batch-records.js');
const qcSystem = new QualityControlBatchSystem();
const batchReport = qcSystem.generateAllPilotBatchRecords();
assert(batchReport.totalBatches === 5, "Generated 5 hero batch records");
assert(batchReport.allPassed === true, "All 5 batches passed ICP-MS heavy metals and microbial assays");

// -----------------------------------------------------------------------------
// 5. GATE 7: Packaging & Botanical Atlas QR Bridge
// -----------------------------------------------------------------------------
console.log(`\n${YELLOW}▶ Testing Gate 7: Packaging & QR Authenticity Bridge...${RESET}`);
const BotanicalAtlasQRBridge = require('../branding/packaging/qr-bridge.js');
const qrBridge = new BotanicalAtlasQRBridge();

const moringaQr = qrBridge.generateBatchQrPayload("NAB-2026-MOR-001");
assert(moringaQr.directUrl.includes("NAB-2026-MOR-001"), "QR Direct URL encodes lot number correctly");
assert(moringaQr.svgBadge.includes("<svg"), "Vector SVG authenticity QR badge generated");

const verification = qrBridge.verifyLot("NAB-2026-MOR-001", moringaQr.shortHash);
assert(verification.verified === true, "Cryptographic hash match verified for lot NAB-2026-MOR-001");

// -----------------------------------------------------------------------------
// 6. GATE 8: 150 Master Products Catalog & Storefront Integration
// -----------------------------------------------------------------------------
console.log(`\n${YELLOW}▶ Testing Gate 8: Master Products Catalog & Commerce...${RESET}`);
const productsData = require('../js/data/products.js');
assert(productsData.length >= 150, `Catalog contains >= 150 botanical remedies (Found: ${productsData.length})`);

// Validate every product's fields
const requiredCategories = [
  'daily-nutrition', 'mind-sleep', 'energy-muscle', 'gut-digestive',
  'skin-body', 'hair-grooming', 'mens-wellness', 'womens-wellness', 'sacred-rituals'
];

const foundCategories = new Set();
const seenIds = new Set();

productsData.forEach((p, idx) => {
  assert(!seenIds.has(p.id), `Unique product ID for item #${idx + 1}: ${p.id}`);
  seenIds.add(p.id);
  assert(p.name && p.name.length > 3, `Valid product name: ${p.name}`);
  assert(p.botanicalName && p.botanicalName.length > 3, `Valid botanical binomial: ${p.botanicalName}`);
  assert(typeof p.priceKES === 'number' && p.priceKES >= 800, `Valid retail price for ${p.id}: KES ${p.priceKES}`);
  assert(p.benefits && p.benefits.length >= 2, `Sufficient benefits listed for ${p.id}`);
  assert(p.illnesses && p.illnesses.length >= 1, `Targeted ailments listed for ${p.id}`);
  foundCategories.add(p.category);
});

assert(foundCategories.size >= 9, `All categories represented in master catalog (${foundCategories.size} found)`);

// Check CSV export
const csvContent = fs.readFileSync(path.join(__dirname, '../products.csv'), 'utf8');
const csvLines = csvContent.trim().split('\n');
assert(csvLines.length >= 151, `Products CSV has >= 151 lines (Found: ${csvLines.length})`);

// Check client-side Batch Registry
const { batchVerifier } = require('../js/data/batch-registry.js');
assert(batchVerifier.getAllBatches().length === 5, "Batch registry contains 5 hero lots");
const foundBatch = batchVerifier.lookup("NAB-2026-TUR-001");
assert(foundBatch && foundBatch.productName.includes("Turmeric"), "Batch verifier resolved Turmeric lot correctly");

// Check AI Herbalist retrieval logic
const AIHerbalistController = require('../js/ai-herbalist.js');
const aiHerbalist = new AIHerbalistController();
const retrieved = aiHerbalist.buildCatalogContext("sleep and insomnia");
assert(retrieved.length > 0 && retrieved.length <= 25, `Dynamic retrieval returned ${retrieved.length} relevant remedies for sleep query`);

// -----------------------------------------------------------------------------
// 7. GATE 9: Audience Building, Google Flow & WhatsApp Commerce
// -----------------------------------------------------------------------------
console.log(`\n${YELLOW}▶ Testing Gate 9: Audience Building & WhatsApp Commerce...${RESET}`);
const contentCalendar = JSON.parse(fs.readFileSync(path.join(__dirname, '../marketing/content-calendar-30days.json'), 'utf8'));
const calendarEntries = contentCalendar.schedule || contentCalendar.days;
assert(calendarEntries.length === 30, `30-Day Video Content Calendar has exactly 30 scheduled entries`);

const { advisoryEngine } = require('../marketing/whatsapp-advisory-engine.js');
const waResponse = advisoryEngine.handleInquiry("Amina", "I have severe insomnia and work stress");
assert(waResponse.recommendedProduct.includes("Sleep") || waResponse.message.includes("Sleep"), "WhatsApp advisor recommended sleep formulation for insomnia inquiry");

// -----------------------------------------------------------------------------
// 8. GATE 10: Launch, First 100 Customers & Retention Loop
// -----------------------------------------------------------------------------
console.log(`\n${YELLOW}▶ Testing Gate 10: First 100 Customers & Retention Loop...${RESET}`);
const { consumptionCycleEngine } = require('../retention/consumption-cycle-engine.js');
const schedule = consumptionCycleEngine.generateSchedule({
  orderId: "NAB-TEST-001",
  customerName: "Test User",
  productName: "Pure Wildcrafted Moringa Leaf Powder",
  lotNumber: "NAB-2026-MOR-001",
  channelPreference: "WhatsApp"
});
assert(schedule.touchpoints.length === 6, `Consumption cycle generated 6 touchpoints across 30 days (Day 0, 2, 7, 14, 21, 30)`);

const { feedbackIntelligenceLoop } = require('../retention/feedback-intelligence-loop.js');
const feedbackTelemetry = feedbackIntelligenceLoop.analyzeCohortReviews();
assert(feedbackTelemetry.nps >= 80, `Cohort NPS is +${feedbackTelemetry.nps} (Promoter benchmark met)`);
assert(feedbackTelemetry.newCandidateIntakeQueue.length > 0, "Retention feedback successfully piped into Gate 3 intake queue");

// -----------------------------------------------------------------------------
// SUITE COMPLETION
// -----------------------------------------------------------------------------
console.log(`\n${GREEN}================================================================================${RESET}`);
console.log(`${GREEN}   ALL ${passedTests}/${totalTests} TESTS PASSED SUCCESSFULLY!${RESET}`);
console.log(`${GREEN}   NEWAGE BOTANICALS MASTER PIPELINE IS 100% OPERATIONAL.${RESET}`);
console.log(`${GREEN}================================================================================\n`);

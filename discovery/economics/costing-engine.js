/**
 * NewAge Botanicals — True Landed Cost & Unit Economics Engine (Gate 6)
 * 
 * Computes exact landed costs across raw harvest, processing, lab testing,
 * primary/secondary packaging, labor, fulfillment, and Paystack gateway fees.
 * Determines Gross Margin %, Net Contribution Margin, and CAC Ceiling.
 */

const fs = require('fs');
const path = require('path');

// Benchmark operational rates in Kenya (KES)
const BENCHMARKS = {
  // Certified 3rd-party lab assays per batch (KEBS accredited lab ICP-MS + Micro)
  labTestingCostPerBatchKES: 25000, // Heavy metals + Aerobic Plate + E.coli/Salmonella + Pesticide screen
  
  // Fulfillment & dispatch packaging per order
  domesticFulfillmentKES: 120, // Outer shipper box, paper tape, eco-fill, handling
  
  // Paystack Transaction Fees (Kenya)
  paystackLocalRate: 0.015,     // 1.5%
  paystackLocalFixedKES: 3,     // KES 3 flat per transaction
  paystackIntlRate: 0.029,      // 2.9% for international card
  
  // Target financial thresholds
  minimumGrossMarginPercent: 65.0,
  targetGrossMarginPercent: 75.0,
  targetMarketingSpendRatio: 0.35 // Max 35% of revenue allocated to paid CAC
};

// Component cost lookup table per SKU category (KES)
const COMPONENT_COSTS = {
  "NAB-SKU-MOR-250": {
    rawCostPerUnitKES: 130,       // 250g moringa from Rift Valley Botanicals (@ KES 520/kg)
    processingMillingKES: 35,     // Ultra-fine shade milling & sieving
    primaryPackagingKES: 45,      // Matte dark green barrier pouch with airtight zip
    secondaryPackagingKES: 35,    // Kraft exterior sleeve with debossed gold crest
    assemblyLaborKES: 30          // Filling, heat-sealing, lot-labeling
  },
  "NAB-SKU-BAO-200": {
    rawCostPerUnitKES: 120,       // 200g baobab pulp from Kilifi (@ KES 600/kg)
    processingMillingKES: 30,     // Mechanical desiccation & sifting
    primaryPackagingKES: 45,      // Airtight nitrogen-flushed pouch
    secondaryPackagingKES: 45,    // Unbleached rigid cardboard cylinder
    assemblyLaborKES: 30          // Manual filling, seal inspection
  },
  "NAB-SKU-MAR-050": {
    rawCostPerUnitKES: 210,       // 50ml virgin marula oil from Kitui (@ KES 4,200/L)
    processingMillingKES: 40,     // Cold-press hydraulic filtration & nitrogen sparging
    primaryPackagingKES: 155,     // Biophotonic violet UV glass bottle + bamboo/glass pipette
    secondaryPackagingKES: 70,    // Rigid textured gift box with gold foil lettering
    assemblyLaborKES: 45          // Sterile dropper assembly, tamper band heat-shrink
  },
  "NAB-SKU-TUR-100": {
    rawCostPerUnitKES: 95,        // 100g turmeric/ginger/pepper blend (@ KES 950/kg)
    processingMillingKES: 35,     // Precision dry blending & micronizing
    primaryPackagingKES: 95,      // Amber glass apothecary jar + aluminum lid
    secondaryPackagingKES: 40,    // Debossed unbleached kraft carton
    assemblyLaborKES: 35          // Jar filling, induction seal, outer box packing
  },
  "NAB-SKU-HIB-150": {
    rawCostPerUnitKES: 110,       // 150g hibiscus & lemongrass (@ KES 733/kg)
    processingMillingKES: 25,     // Calyx inspection, destemming, aromatic blending
    primaryPackagingKES: 40,      // Triple-ply freshness pouch with aroma valve
    secondaryPackagingKES: 30,    // Gold foil debossed band wrap
    assemblyLaborKES: 30          // Precision pouch filling, heat-sealing
  }
};

class CostingEngine {
  constructor(formulationsPath) {
    const defaultPath = path.join(__dirname, '../products/product-formulations.json');
    this.formulationsPath = formulationsPath || defaultPath;
    this.formulations = JSON.parse(fs.readFileSync(this.formulationsPath, 'utf8'));
  }

  /**
   * Calculate true landed cost and margins for a specific SKU and batch size.
   * @param {Object} product - Product formulation object
   * @param {number} batchSize - Batch unit volume (e.g., 100, 500, 2500)
   */
  calculateUnitEconomics(product, batchSize = 500) {
    const sku = product.sku;
    const components = COMPONENT_COSTS[sku] || {
      rawCostPerUnitKES: 150,
      processingMillingKES: 40,
      primaryPackagingKES: 60,
      secondaryPackagingKES: 40,
      assemblyLaborKES: 35
    };

    // Scale discounts on materials for larger batch runs
    const volumeDiscount = batchSize >= 2500 ? 0.85 : batchSize >= 500 ? 0.93 : 1.0;

    const rawCost = Math.round(components.rawCostPerUnitKES * volumeDiscount);
    const processingCost = Math.round(components.processingMillingKES * volumeDiscount);
    const primaryPkgCost = Math.round(components.primaryPackagingKES * volumeDiscount);
    const secondaryPkgCost = Math.round(components.secondaryPackagingKES * volumeDiscount);
    const assemblyCost = Math.round(components.assemblyLaborKES * (batchSize >= 1000 ? 0.85 : 1.0));

    // Lab testing is fixed per batch; amortized across unit volume
    const amortizedLabTestCost = Math.round((BENCHMARKS.labTestingCostPerBatchKES / batchSize) * 10) / 10;

    // Total Landed COGS per unit
    const landedCOGS = Math.round((rawCost + processingCost + primaryPkgCost + secondaryPkgCost + assemblyCost + amortizedLabTestCost) * 100) / 100;

    const retailKES = product.pricing.recommendedRetailPrice;
    const grossMarginKES = Math.round((retailKES - landedCOGS) * 100) / 100;
    const grossMarginPercent = Math.round((grossMarginKES / retailKES) * 10000) / 100;

    // Payment Processing Fee (Paystack Local: 1.5% + KES 3)
    const paystackFee = Math.round((retailKES * BENCHMARKS.paystackLocalRate + BENCHMARKS.paystackLocalFixedKES) * 100) / 100;

    // Domestic Fulfillment Packing & Dispatch
    const fulfillmentCost = BENCHMARKS.domesticFulfillmentKES;

    // Net Contribution Margin per unit before paid ad spend
    const contributionMarginKES = Math.round((retailKES - landedCOGS - paystackFee - fulfillmentCost) * 100) / 100;
    const contributionMarginPercent = Math.round((contributionMarginKES / retailKES) * 10000) / 100;

    // Maximum Allowable CAC (Break-even Customer Acquisition Cost)
    const maxAllowableCAC = contributionMarginKES;

    // Target Recommended CAC (allocating 35% of retail price or conservative contribution)
    const targetRecommendedCAC = Math.round(Math.min(retailKES * BENCHMARKS.targetMarketingSpendRatio, contributionMarginKES * 0.55));

    // Gate 6 Status Check
    const passesMarginThreshold = grossMarginPercent >= BENCHMARKS.minimumGrossMarginPercent;
    const passesTargetMargin = grossMarginPercent >= BENCHMARKS.targetGrossMarginPercent;

    return {
      sku: product.sku,
      productName: product.name,
      batchSize,
      costBreakdownKES: {
        rawIngredient: rawCost,
        processingExtraction: processingCost,
        primaryPackaging: primaryPkgCost,
        secondaryPackaging: secondaryPkgCost,
        assemblyLabor: assemblyCost,
        amortizedLabAssay: amortizedLabTestCost,
        totalLandedCOGS: landedCOGS
      },
      commercialsKES: {
        retailPrice: retailKES,
        grossMarginKES,
        grossMarginPercent,
        fulfillmentCost,
        paystackFee,
        netContributionMarginKES: contributionMarginKES,
        netContributionMarginPercent: contributionMarginPercent,
        maxAllowableCAC,
        targetRecommendedCAC
      },
      status: {
        passesMarginThreshold,
        passesTargetMargin,
        statusLabel: passesTargetMargin ? "OPTIMAL_MARGIN" : passesMarginThreshold ? "ACCEPTABLE_MARGIN" : "BELOW_MARGIN_FLOOR"
      }
    };
  }

  /**
   * Run economic analysis across the entire launch catalog for multiple batch tiers.
   */
  generateCatalogEconomicsReport() {
    const batchTiers = [100, 500, 2500];
    const report = {
      generatedAt: new Date().toISOString(),
      benchmarkAssumptions: BENCHMARKS,
      catalogSummary: [],
      tierComparison: {}
    };

    batchTiers.forEach(tier => {
      report.tierComparison[`batch_${tier}`] = this.formulations.map(product => 
        this.calculateUnitEconomics(product, tier)
      );
    });

    // Primary Launch Batch (500 units) summary
    const launchTier = report.tierComparison["batch_500"];
    const avgGrossMargin = Math.round(launchTier.reduce((acc, p) => acc + p.commercialsKES.grossMarginPercent, 0) / launchTier.length * 10) / 10;
    const avgContribution = Math.round(launchTier.reduce((acc, p) => acc + p.commercialsKES.netContributionMarginPercent, 0) / launchTier.length * 10) / 10;

    report.catalogSummary = {
      productCount: this.formulations.length,
      standardLaunchBatchUnitsPerSKU: 500,
      totalLaunchBatchUnits: this.formulations.length * 500,
      averageGrossMarginPercent: avgGrossMargin,
      averageNetContributionMarginPercent: avgContribution,
      allPassMinimumFloor: launchTier.every(p => p.status.passesMarginThreshold)
    };

    return report;
  }

  /**
   * Evaluates catalog economics and returns catalogAverage summary metrics.
   */
  evaluateCatalogEconomics() {
    const report = this.generateCatalogEconomicsReport();
    return {
      report,
      catalogAverage: {
        grossMarginPercent: report.catalogSummary.averageGrossMarginPercent,
        netContributionMarginPercent: report.catalogSummary.averageNetContributionMarginPercent
      }
    };
  }
}

// CLI Execution & Export
if (require.main === module) {
  const engine = new CostingEngine();
  const report = engine.generateCatalogEconomicsReport();

  console.log("\n================================================================================");
  console.log("             NEWAGE BOTANICALS — TRUE LANDED COST & UNIT ECONOMICS");
  console.log("================================================================================\n");

  console.log(`Evaluated ${report.catalogSummary.productCount} Hero Launch SKUs (Launch Tier: 500 units/SKU)\n`);
  console.log(`Average Gross Margin: ${report.catalogSummary.averageGrossMarginPercent}% (Target: ≥75%)`);
  console.log(`Average Contribution Margin: ${report.catalogSummary.averageNetContributionMarginPercent}%`);
  console.log(`All Products Clear Margin Floor (≥65%): ${report.catalogSummary.allPassMinimumFloor ? 'YES ✓' : 'NO ✗'}\n`);

  console.log("--------------------------------------------------------------------------------");
  console.log("SKU               RETAIL (KES)  LANDED COGS  GROSS MARGIN %  NET CONTRIB  TARGET CAC");
  console.log("--------------------------------------------------------------------------------");

  report.tierComparison.batch_500.forEach(item => {
    const c = item.commercialsKES;
    const b = item.costBreakdownKES;
    console.log(
      `${item.sku.padEnd(18)} ` +
      `KES ${c.retailPrice.toString().padStart(5)}   ` +
      `KES ${b.totalLandedCOGS.toString().padStart(6)}   ` +
      `${c.grossMarginPercent.toFixed(1).padStart(7)}%       ` +
      `KES ${c.netContributionMarginKES.toString().padStart(5)}   ` +
      `KES ${c.targetRecommendedCAC.toString().padStart(5)}`
    );
  });
  console.log("--------------------------------------------------------------------------------\n");

  // Save report to discovery data
  const outputPath = path.join(__dirname, '../data/unit-economics-report.json');
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
  console.log(`✓ Full unit economics report saved to: ${outputPath}\n`);
}

module.exports = CostingEngine;

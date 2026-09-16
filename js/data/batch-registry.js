/**
 * NewAge Botanicals — Official Batch & Certificate of Analysis (CoA) Registry
 * 
 * Cryptographically verifiable, soil-to-shelf traceability dataset for all
 * manufactured batches. Bridges physical packaging QR codes to live lab assays.
 */

const BATCH_REGISTRY = [
  {
    lotNumber: "NAB-2026-MOR-001",
    sku: "NAB-SKU-MOR-250",
    productId: "moringa-powder-organic",
    productName: "Pure Wildcrafted Moringa Leaf Powder",
    botanicalName: "Moringa oleifera",
    batchSizeUnits: 500,
    netWeightPerUnit: "250g / 8.8 oz",
    manufactureDate: "2026-09-13",
    bestBeforeDate: "2028-09-02",
    originTraceability: {
      supplierId: "sup-001",
      supplierName: "Rift Valley Botanicals",
      harvestRegion: "Nanyuki, Laikipia County, Kenya (Highland Volcanic Soil)",
      rawBatchRef: "RM-984917"
    },
    labTesting: {
      accreditedLabName: "SGS Kenya Phytochemical Laboratory",
      labReportNumber: "LAB-REPORT-342622",
      testDate: "2026-09-13",
      heavyMetals: {
        leadPpm: 1.1,
        leadLimitPpm: 3.0,
        arsenicPpm: 0.35,
        arsenicLimitPpm: 1.5,
        cadmiumPpm: 0.08,
        cadmiumLimitPpm: 0.5,
        mercuryPpm: 0.02,
        mercuryLimitPpm: 0.1
      },
      microbiology: {
        tamcCfuPerG: 1200,
        tymcCfuPerG: 80,
        eColi: "absent",
        salmonella: "absent"
      },
      activePhytochemicalAssay: {
        marker: "Vitamin C & Bioavailable Iron",
        measuredValue: "210mg/100g Vitamin C, 28.4mg/100g Iron",
        standardSpecification: "≥ 180mg Vitamin C"
      },
      moisturePercentage: 5.2
    },
    complianceEvaluation: {
      passed: true,
      qcDecision: "RELEASE_FOR_SALE",
      evaluatedAt: "2026-09-13T13:09:44.916Z"
    },
    digitalVerification: {
      cryptographicHash: "96fc2c5939f4831bddd252ff100d719a18d70579f68a194e946feb68db7c0b89",
      shortHash: "96fc2c5939f4831b",
      atlasVerificationUrl: "https://omnicorehub.app/atlas?sku=moringa-powder-organic&lot=NAB-2026-MOR-001&verify=96fc2c5939f4831b"
    }
  },
  {
    lotNumber: "NAB-2026-BAO-001",
    sku: "NAB-SKU-BAO-200",
    productId: "baobab-fruit-powder",
    productName: "Sacred Baobab Prebiotic Fruit Powder",
    botanicalName: "Adansonia digitata",
    batchSizeUnits: 500,
    netWeightPerUnit: "200g / 7.0 oz",
    manufactureDate: "2026-09-13",
    bestBeforeDate: "2028-09-02",
    originTraceability: {
      supplierId: "sup-002",
      supplierName: "Baobab Swahili Coast Coop",
      harvestRegion: "Kilifi & Kwale Coastal Lowlands, Kenya",
      rawBatchRef: "RM-984920"
    },
    labTesting: {
      accreditedLabName: "KEBS National Metrology & Analytical Lab",
      labReportNumber: "LAB-REPORT-920014",
      testDate: "2026-09-13",
      heavyMetals: {
        leadPpm: 0.6,
        leadLimitPpm: 3.0,
        arsenicPpm: 0.15,
        arsenicLimitPpm: 1.5,
        cadmiumPpm: 0.04,
        cadmiumLimitPpm: 0.5,
        mercuryPpm: 0.01,
        mercuryLimitPpm: 0.1
      },
      microbiology: {
        tamcCfuPerG: 850,
        tymcCfuPerG: 45,
        eColi: "absent",
        salmonella: "absent"
      },
      activePhytochemicalAssay: {
        marker: "Soluble Dietary Prebiotic Fiber",
        measuredValue: "54.2% Prebiotic Pectin",
        standardSpecification: "≥ 50% Soluble Fiber"
      },
      moisturePercentage: 6.8
    },
    complianceEvaluation: {
      passed: true,
      qcDecision: "RELEASE_FOR_SALE",
      evaluatedAt: "2026-09-13T13:09:44.920Z"
    },
    digitalVerification: {
      cryptographicHash: "4048ccd2a96163033ff7ae2d1e7506871b2d675ed3ca1e767b736e62f6559c25",
      shortHash: "4048ccd2a9616303",
      atlasVerificationUrl: "https://omnicorehub.app/atlas?sku=baobab-fruit-powder&lot=NAB-2026-BAO-001&verify=4048ccd2a9616303"
    }
  },
  {
    lotNumber: "NAB-2026-MAR-001",
    sku: "NAB-SKU-MAR-050",
    productId: "marula-facial-elixir",
    productName: "Cold-Pressed High-Altitude Marula Glow Elixir",
    botanicalName: "Sclerocarya birrea",
    batchSizeUnits: 500,
    netWeightPerUnit: "50ml / 1.7 fl oz",
    manufactureDate: "2026-09-13",
    bestBeforeDate: "2028-09-02",
    originTraceability: {
      supplierId: "sup-004",
      supplierName: "Savannah Harvest Oils",
      harvestRegion: "Kitui County, Semi-Arid Eastern Kenya",
      rawBatchRef: "RM-984923"
    },
    labTesting: {
      accreditedLabName: "AfriCert Analytical Laboratories",
      labReportNumber: "LAB-REPORT-972179",
      testDate: "2026-09-13",
      heavyMetals: {
        leadPpm: 0.05,
        leadLimitPpm: 3.0,
        arsenicPpm: 0.02,
        arsenicLimitPpm: 1.5,
        cadmiumPpm: 0.01,
        cadmiumLimitPpm: 0.5,
        mercuryPpm: 0.005,
        mercuryLimitPpm: 0.1
      },
      microbiology: {
        tamcCfuPerG: 10,
        tymcCfuPerG: 0,
        eColi: "absent",
        salmonella: "absent"
      },
      activePhytochemicalAssay: {
        marker: "Oleic Acid (Omega-9)",
        measuredValue: "74.8% Oleic Acid, Peroxide Value 2.4 meq/kg",
        standardSpecification: "≥ 70% Oleic Acid"
      },
      moisturePercentage: 0.1
    },
    complianceEvaluation: {
      passed: true,
      qcDecision: "RELEASE_FOR_SALE",
      evaluatedAt: "2026-09-13T13:09:44.923Z"
    },
    digitalVerification: {
      cryptographicHash: "da591519035d13f7219d3d2febb9ad3c7da0432f26e1e644f8add84b007e9627",
      shortHash: "da591519035d13f7",
      atlasVerificationUrl: "https://omnicorehub.app/atlas?sku=marula-facial-elixir&lot=NAB-2026-MAR-001&verify=da591519035d13f7"
    }
  },
  {
    lotNumber: "NAB-2026-TUR-001",
    sku: "NAB-SKU-TUR-100",
    productId: "turmeric-ginger-golden-blend",
    productName: "Highland Volcanic Turmeric & Wild Ginger Elixir",
    botanicalName: "Curcuma longa & Zingiber officinale",
    batchSizeUnits: 500,
    netWeightPerUnit: "100g / 3.5 oz",
    manufactureDate: "2026-09-13",
    bestBeforeDate: "2028-09-02",
    originTraceability: {
      supplierId: "sup-005",
      supplierName: "Mount Kenya Highland Herbs",
      harvestRegion: "Meru & Tharaka Nithi, Volcanic Foothills of Mount Kenya",
      rawBatchRef: "RM-984925"
    },
    labTesting: {
      accreditedLabName: "SGS Kenya Phytochemical Laboratory",
      labReportNumber: "LAB-REPORT-758857",
      testDate: "2026-09-13",
      heavyMetals: {
        leadPpm: 0.9,
        leadLimitPpm: 3.0,
        arsenicPpm: 0.22,
        arsenicLimitPpm: 1.5,
        cadmiumPpm: 0.07,
        cadmiumLimitPpm: 0.5,
        mercuryPpm: 0.03,
        mercuryLimitPpm: 0.1
      },
      microbiology: {
        tamcCfuPerG: 2100,
        tymcCfuPerG: 110,
        eColi: "absent",
        salmonella: "absent"
      },
      activePhytochemicalAssay: {
        marker: "Curcuminoids & Gingerols",
        measuredValue: "5.8% Curcuminoids, 2.1% 6-Gingerol",
        standardSpecification: "≥ 5.2% Curcuminoids"
      },
      moisturePercentage: 6.4
    },
    complianceEvaluation: {
      passed: true,
      qcDecision: "RELEASE_FOR_SALE",
      evaluatedAt: "2026-09-13T13:09:44.925Z"
    },
    digitalVerification: {
      cryptographicHash: "20c7ed6e6f81ddcf75d175f7985adef48a95e520ca9cb6c2a538b4404fe0d9a0",
      shortHash: "20c7ed6e6f81ddcf",
      atlasVerificationUrl: "https://omnicorehub.app/atlas?sku=turmeric-ginger-golden-blend&lot=NAB-2026-TUR-001&verify=20c7ed6e6f81ddcf"
    }
  },
  {
    lotNumber: "NAB-2026-HIB-001",
    sku: "NAB-SKU-HIB-150",
    productId: "hibiscus-ruby-infusion",
    productName: "Wild Kenyan Ruby Hibiscus & Lemongrass Tisane",
    botanicalName: "Hibiscus sabdariffa & Cymbopogon citratus",
    batchSizeUnits: 500,
    netWeightPerUnit: "150g / 5.3 oz",
    manufactureDate: "2026-09-13",
    bestBeforeDate: "2028-09-02",
    originTraceability: {
      supplierId: "sup-003",
      supplierName: "Taita Hills Herbal Collective",
      harvestRegion: "Taita Taveta Hills & Tsavo Borderland, Kenya",
      rawBatchRef: "RM-984926"
    },
    labTesting: {
      accreditedLabName: "KEBS National Metrology & Analytical Lab",
      labReportNumber: "LAB-REPORT-862352",
      testDate: "2026-09-13",
      heavyMetals: {
        leadPpm: 0.8,
        leadLimitPpm: 3.0,
        arsenicPpm: 0.18,
        arsenicLimitPpm: 1.5,
        cadmiumPpm: 0.05,
        cadmiumLimitPpm: 0.5,
        mercuryPpm: 0.02,
        mercuryLimitPpm: 0.1
      },
      microbiology: {
        tamcCfuPerG: 1400,
        tymcCfuPerG: 95,
        eColi: "absent",
        salmonella: "absent"
      },
      activePhytochemicalAssay: {
        marker: "Total Anthocyanins",
        measuredValue: "2.3% Anthocyanin calyx content",
        standardSpecification: "≥ 1.8% Anthocyanins"
      },
      moisturePercentage: 7.1
    },
    complianceEvaluation: {
      passed: true,
      qcDecision: "RELEASE_FOR_SALE",
      evaluatedAt: "2026-09-13T13:09:44.926Z"
    },
    digitalVerification: {
      cryptographicHash: "0d781b00ff8186f189097c61c77b4c9f50f3571c296ab7d393e5ff443f95e0d4",
      shortHash: "0d781b00ff8186f1",
      atlasVerificationUrl: "https://omnicorehub.app/atlas?sku=hibiscus-ruby-infusion&lot=NAB-2026-HIB-001&verify=0d781b00ff8186f1"
    }
  }
];

class BatchVerifier {
  constructor() {
    this.batches = BATCH_REGISTRY;
  }

  getAllBatches() {
    return this.batches;
  }

  lookup(lotOrQuery) {
    if (!lotOrQuery || typeof lotOrQuery !== "string") return null;
    const clean = lotOrQuery.trim().toUpperCase();

    // Exact lot number match
    let match = this.batches.find(b => b.lotNumber.toUpperCase() === clean);
    if (match) return match;

    // Partial lot number or product match
    const q = lotOrQuery.trim().toLowerCase();
    match = this.batches.find(b => 
      b.lotNumber.toLowerCase().includes(q) ||
      b.sku.toLowerCase().includes(q) ||
      b.productId.toLowerCase().includes(q) ||
      b.productName.toLowerCase().includes(q) ||
      b.botanicalName.toLowerCase().includes(q) ||
      b.digitalVerification.shortHash.toLowerCase().startsWith(q)
    );

    return match || null;
  }
}

// Browser & Node export
const batchVerifier = new BatchVerifier();

if (typeof module !== "undefined" && module.exports) {
  module.exports = { BATCH_REGISTRY, BatchVerifier, batchVerifier };
}
if (typeof window !== "undefined") {
  window.BATCH_REGISTRY = BATCH_REGISTRY;
  window.batchVerifier = batchVerifier;
}

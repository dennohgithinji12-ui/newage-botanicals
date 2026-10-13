/**
 * NewAge Botanicals — Unified Technology Stack Configuration
 * Wires together:
 * - Intelligence: Gemini (Analysis, Formulation, Clinical Claim Verification)
 * - Research: NotebookLM (Evidence Dossier Synthesis, Ethnobotany Ingestion)
 * - Connectivity: MCP (Model Context Protocol Tool Integration)
 * - Operational Database: Local JSON / MongoDB Schema Adapter
 * - Website: Antigravity Web Application & Botanical Atlas
 * - Brand: Pomelli Brand System & Claims Framework
 * - Visual/Video: Google Flow Visual Production Engine
 * - Payments: Paystack (Multi-currency, Cards, M-Pesa, Mobile Money)
 * - Communication: WhatsApp Conversational Commerce & Advisory
 */

const STACK_CONFIG = {
  brand: {
    name: "NewAge Botanicals",
    tagline: "Modern Botanical Wellness · Evidence-Grounded · Culturally Rooted",
    positioning: "Modern botanical wellness, grounded in traditional knowledge and evidence-aware research.",
    tone: ["Scientific", "Luxurious", "Transparent", "Culturally Respectful", "Grounded"],
    antiClaimsPolicy: [
      "Never claim to cure, treat, or prevent chronic clinical diseases.",
      "Strictly separate Traditional Knowledge from Empirical Clinical Evidence.",
      "Every health statement must link to a verified Botanical Dossier citation.",
      "Zero 'miracle cure' marketing language."
    ],
    visualSystem: {
      designPhilosophy: "African Botanical Luxury + Modern Laboratory Cleanliness",
      palette: {
        primaryDeepGreen: "#0F281E",     // Forest canopy / deep herbal reserve
        secondarySage: "#2E5A44",        // Botanical leaf / scientific calm
        accentGold: "#C49A45",           // Earth gold / premium botanical resin
        neutralClay: "#F4EFEA",          // Raw linen / clean parchment
        surfaceCard: "#FFFFFF",
        textCharcoal: "#1A2421",
        textMuted: "#60726B",
        borderSoft: "rgba(15, 40, 30, 0.12)"
      },
      typography: {
        headings: "'Playfair Display', Georgia, serif",
        body: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        mono: "'JetBrains Mono', 'SF Mono', monospace"
      }
    }
  },

  intelligence: {
    provider: "Gemini",
    models: {
      discoveryScoring: "gemini-1.5-pro",
      clinicalAnalysis: "gemini-1.5-pro",
      customerInteraction: "gemini-1.5-flash",
      visualPrompting: "gemini-1.5-flash"
    },
    systemRules: [
      "Verify phytochemical constituents against standard pharmacopeias.",
      "Enforce safety contraindications (pregnancy, lactation, hepatic/renal conditions, drug interactions).",
      "Calculate 11-factor opportunity viability with strict cutoffs."
    ]
  },

  research: {
    provider: "NotebookLM",
    vaultPaths: {
      sources: "research/notebooklm/sources/",
      notes: "research/notebooklm/notes/",
      ingested: "research/notebooklm/ingested/",
      guide: "research/notebooklm/NOTEBOOKLM_GUIDE.md"
    },
    evidenceGrades: {
      GRADE_A: "Double-blind, placebo-controlled human randomized trials (RCTs)",
      GRADE_B: "Human clinical trials (non-blinded, open label, or cohort studies)",
      GRADE_C: "In-vivo animal studies & mechanistic pharmacology",
      GRADE_D: "In-vitro cellular assays & isolated phytochemical testing",
      GRADE_E: "Well-documented indigenous ethnobotanical traditional usage only"
    }
  },

  connectivity: {
    protocol: "MCP (Model Context Protocol)",
    servers: {
      notebooklm: {
        type: "local-file-vault",
        status: "connected",
        notesDirectory: "research/notebooklm/notes/",
        configPath: "config/notebooklm-config.json"
      },
      dataStore: {
        type: "json-mongodb-adapter",
        status: "active",
        path: "discovery/data/"
      }
    }
  },

  operationalDatabase: {
    activeEngine: "json-store", // Production target: MongoDB
    collections: {
      botanicals: "discovery/data/botanicals-database.json",
      scorecards: "discovery/data/opportunity-scorecards.json",
      unitEconomics: "discovery/data/unit-economics.json",
      graduatedProducts: "discovery/data/graduated-products.json"
    }
  },

  videoProduction: {
    provider: "Google Flow",
    formats: [
      { id: "plant-of-the-week", name: "Plant of the Week", targetSeconds: 45 },
      { id: "myth-vs-evidence", name: "Botanical Myth vs Clinical Evidence", targetSeconds: 60 },
      { id: "farm-to-ritual", name: "Traceable Journey: Soil to Self", targetSeconds: 50 },
      { id: "inside-the-leaf", name: "Phytochemical Deep Dive", targetSeconds: 40 }
    ],
    aspectRatios: ["9:16", "16:9"]
  },

  payments: {
    provider: "Paystack",
    publicKey: "pk_live_6a8b869ee1a3230aeddc2ec02504b461c9ba2ab6",
    baseCurrency: "KES",
    supportedCurrencies: ["KES", "USD", "NGN", "GHS", "ZAR"],
    channels: ["mobile_money", "card", "bank", "ussd", "qr"]
  },

  metaPixel: {
    id: "1453582713300853",
    events: ["PageView", "ViewContent", "AddToCart", "InitiateCheckout", "Purchase", "Contact"]
  },

  customerChannels: {
    whatsapp: {
      number: "+254141270112",
      defaultInquiryMessage: "Hello NewAge Botanicals, I would like guidance on your evidence-backed botanical catalog.",
      orderAssistanceMessage: "Hello, I am inquiring about my recent botanical order."
    },
    socials: {
      handle: "@newagebotanicals",
      instagram: "https://instagram.com/newagebotanicals",
      tiktok: "https://tiktok.com/@newagebotanicals",
      twitter: "https://twitter.com/newagebotanicals",
      facebook: "https://facebook.com/newagebotanicals"
    }
  },

  gates: {
    1: { id: "brand_strategy", name: "Brand Strategy & Positioning", status: "completed" },
    2: { id: "customer_research", name: "Customer Research & Segments", status: "completed" },
    3: { id: "opportunity_database", name: "Product Opportunity Database", status: "completed" },
    4: { id: "botanical_evidence", name: "Botanical Evidence Dossiers", status: "completed" },
    5: { id: "supplier_shortlist", name: "Supplier Discovery & Traceability", status: "completed" },
    6: { id: "mvp_economics", name: "Product MVP & Unit Economics", status: "completed" },
    7: { id: "packaging_atlas_bridge", name: "Packaging & Atlas Link", status: "completed" },
    8: { id: "commerce_website", name: "Website & Paystack/WhatsApp Commerce (150 SKUs)", status: "completed" },
    9: { id: "audience_prelaunch", name: "Pre-Launch Acquisition & Google Flow", status: "completed" },
    10: { id: "launch_intelligence_loop", name: "Launch, 100 Customers & Retention Loop", status: "completed" }
  }
};

// Export for Node.js environments and browser environments
if (typeof module !== "undefined" && module.exports) {
  module.exports = STACK_CONFIG;
}
if (typeof window !== "undefined") {
  window.STACK_CONFIG = STACK_CONFIG;
}

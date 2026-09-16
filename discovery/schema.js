/**
 * NewAge Botanicals — Product Discovery Engine Schema
 * Defines the contract for Botanical Dossiers, 11-Factor Opportunity Scorecards,
 * Unit Economics, and Quality Specifications.
 */

const EVIDENCE_GRADES = {
  GRADE_A: { code: "GRADE_A", label: "Grade A: Double-Blind Placebo RCTs", weight: 1.0 },
  GRADE_B: { code: "GRADE_B", label: "Grade B: Human Clinical & Cohort Trials", weight: 0.85 },
  GRADE_C: { code: "GRADE_C", label: "Grade C: Animal In-Vivo & Pharmacology", weight: 0.65 },
  GRADE_D: { code: "GRADE_D", label: "Grade D: In-Vitro & Phytochemical Assays", weight: 0.45 },
  GRADE_E: { code: "GRADE_E", label: "Grade E: Ethnobotanical Folklore Only", weight: 0.25 }
};

const CRITERIA_WEIGHTS = {
  demand: 0.12,            // 12% - Customer search volume & willingness to pay
  competition: 0.08,       // 8%  - Market overcrowding & competitor defensibility
  differentiation: 0.10,   // 10% - Unique African provenance & distinct mechanism
  evidence: 0.14,          // 14% - Scientific literature & clinical substantiation
  safety: 0.12,            // 12% - Low adverse effects & manageable contraindications
  regulation: 0.08,        // 8%  - Legal compliance (KEBS / FDA / EFSA / CITES)
  sourcing: 0.09,          // 9%  - Reliable supply chain, ethical wildcraft/farming
  quality: 0.07,           // 7%  - Batch standardization & testing feasibility
  margin: 0.10,            // 10% - Gross contribution margin ≥65%
  repeatPurchase: 0.05,    // 5%  - Natural consumption cycle (30-day replenishment)
  contentPotential: 0.05   // 5%  - Storytelling, video hook, educational intrigue
};

const THRESHOLDS = {
  MIN_PASSING_SCORE: 75,       // ≥75 moves to Gate 4 & 5
  CONDITIONAL_SCORE: 65,       // 65-74 requires additional research / reformulating
  REJECT_BELOW: 65,            // <65 dropped from immediate pipeline
  MIN_GROSS_MARGIN_PCT: 60,    // Hard floor for viable DTC commerce
  TARGET_GROSS_MARGIN_PCT: 75  // Target for sustainable paid customer acquisition
};

module.exports = {
  EVIDENCE_GRADES,
  CRITERIA_WEIGHTS,
  THRESHOLDS
};

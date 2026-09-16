/**
 * NewAge Botanicals — 11-Factor Opportunity Scoring & Unit Economics Engine
 * Evaluates candidate botanicals against quantitative and qualitative criteria
 * Computes Landed Cost, Gross Margin %, CAC Ceiling, and Gate Status.
 */

const { CRITERIA_WEIGHTS, THRESHOLDS, EVIDENCE_GRADES } = require('./schema');

class OpportunityScoringEngine {
  /**
   * Evaluates an 11-criteria candidate scorecard (each factor 1-10)
   * @param {Object} scores
   * @param {Object} flags (citesRestricted, safetyBlackbox, legalBan, unstandardized)
   */
  static evaluateOpportunity(scores, flags = {}) {
    let rawWeightedSum = 0;
    const factorBreakdown = {};

    for (const [key, weight] of Object.entries(CRITERIA_WEIGHTS)) {
      const val = Number(scores[key]) || 5; // default 5 if not provided
      const normalized = Math.max(1, Math.min(10, val));
      const factorWeighted = normalized * 10 * weight; // 1-10 scaled to 10-100 * weight
      rawWeightedSum += factorWeighted;

      factorBreakdown[key] = {
        raw: normalized,
        weight: weight,
        weightedContribution: Math.round(factorWeighted * 10) / 10
      };
    }

    let finalScore = Math.round(rawWeightedSum);
    const penalties = [];

    // Critical disqualifiers & safety red flags
    if (flags.citesRestricted) {
      finalScore -= 35;
      penalties.push({
        flag: "CITES_CONSERVATION_RESTRICTION",
        penalty: -35,
        reason: "Species listed on CITES Appendix I or II. Commercial wild harvesting heavily restricted or illegal."
      });
    }

    if (flags.safetyBlackbox || scores.safety <= 3) {
      finalScore -= 25;
      penalties.push({
        flag: "SEVERE_TOXICITY_RISK",
        penalty: -25,
        reason: "Severe hepatic, renal, or systemic toxicity reported at physiological doses."
      });
    }

    if (flags.legalBan || scores.regulation <= 2) {
      finalScore -= 40;
      penalties.push({
        flag: "REGULATORY_DISQUALIFICATION",
        penalty: -40,
        reason: "Controlled substance or prohibited botanical under KEBS / FDA / EFSA rules."
      });
    }

    finalScore = Math.max(0, Math.min(100, finalScore));

    // Determine Gate status
    let gateStatus = "REJECTED";
    let recommendation = "Drop candidate. Does not meet commercial or safety threshold.";

    if (finalScore >= THRESHOLDS.MIN_PASSING_SCORE && penalties.length === 0) {
      gateStatus = "APPROVED_FOR_PIPELINE";
      recommendation = "Candidate approved. Advance to Gate 4 (Evidence Dossier) and Gate 5 (Supplier Verification).";
    } else if (finalScore >= THRESHOLDS.CONDITIONAL_SCORE && !flags.citesRestricted && !flags.legalBan) {
      gateStatus = "CONDITIONAL";
      recommendation = "Hold for formulation review. Requires specialized standardized extract or clinical trial data.";
    }

    return {
      totalScore: finalScore,
      gateStatus,
      recommendation,
      penalties,
      factorBreakdown
    };
  }

  /**
   * Computes True Landed Unit Economics & Commercial Feasibility
   * @param {Object} econ
   */
  static computeUnitEconomics(econ) {
    const batchUnits = Number(econ.batchUnits) || 500;
    const rawHarvestPerUnit = Number(econ.rawHarvestPerUnit) || 200; // in KES
    const processingPerUnit = Number(econ.processingPerUnit) || 120;
    const labTestingBatchTotal = Number(econ.labTestingBatchTotal) || 45000; // CoA heavy metals + microbiology + HPLC
    const labTestingPerUnit = labTestingBatchTotal / batchUnits;
    const primaryPackaging = Number(econ.primaryPackaging) || 150; // amber glass jar or foil barrier pouch
    const secondaryPackaging = Number(econ.secondaryPackaging) || 80;  // label, seal, outer carton
    const directLaborPerUnit = Number(econ.directLaborPerUnit) || 50;
    const fulfillmentPerUnit = Number(econ.fulfillmentPerUnit) || 100; // storage & pick/pack allocation
    const targetRetailPrice = Number(econ.targetRetailPrice) || 1800; // KES

    // Payment processing fee (Paystack standard: 1.5% domestic)
    const paymentFeeRate = Number(econ.paymentFeeRate) || 0.015;
    const paymentFee = targetRetailPrice * paymentFeeRate;

    // True Landed Cost (COGS)
    const trueLandedCost = Math.round(
      rawHarvestPerUnit +
      processingPerUnit +
      labTestingPerUnit +
      primaryPackaging +
      secondaryPackaging +
      directLaborPerUnit +
      fulfillmentPerUnit +
      paymentFee
    );

    const grossProfit = targetRetailPrice - trueLandedCost;
    const grossMarginPct = Math.round((grossProfit / targetRetailPrice) * 1000) / 10;

    // Commercial sustainability guidelines:
    // For paid marketing scale: 35% of revenue can be allocated to Customer Acquisition Cost (CAC)
    const maxAllowableCAC = Math.max(0, Math.round(targetRetailPrice * 0.35));
    const netContributionPerUnit = grossProfit - maxAllowableCAC;

    const isCommerciallyViable = grossMarginPct >= THRESHOLDS.MIN_GROSS_MARGIN_PCT;

    return {
      batchUnits,
      targetRetailPrice,
      costBreakdown: {
        rawHarvest: rawHarvestPerUnit,
        processing: processingPerUnit,
        labTestingPerUnit: Math.round(labTestingPerUnit),
        primaryPackaging,
        secondaryPackaging,
        directLabor: directLaborPerUnit,
        fulfillment: fulfillmentPerUnit,
        paymentFee: Math.round(paymentFee)
      },
      trueLandedCost,
      grossProfit,
      grossMarginPct,
      maxAllowableCAC,
      netContributionPerUnit,
      isCommerciallyViable,
      commercialStatus: isCommerciallyViable
        ? (grossMarginPct >= THRESHOLDS.TARGET_GROSS_MARGIN_PCT ? "HIGH_MARGIN_HERO" : "ACCEPTABLE_CORE")
        : "MARGIN_DEFICIENT_UNVIABLE"
    };
  }
}

module.exports = OpportunityScoringEngine;

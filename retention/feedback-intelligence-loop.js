/**
 * NewAge Botanicals — Feedback & Next-Product Discovery Loop (Gate 10)
 * 
 * Closes the master pipeline loop:
 * RETENTION -> REVIEWS/FEEDBACK -> DATA -> NEXT PRODUCT (Gate 3)
 * 
 * Aggregates post-purchase customer reviews, satisfaction telemetry, and unmet
 * botanical requests, calculating demand signals that feed directly back into
 * the Product Opportunity Scoring Engine to prioritize the brand's next launches.
 */

const fs = require('fs');
const path = require('path');
const { calculateOpportunityScore } = require('../discovery/scoring-engine.js');

class FeedbackIntelligenceLoop {
  constructor() {
    this.feedbackDbPath = path.join(__dirname, 'customer-feedback.json');
    this.discoveryIntakePath = path.join(__dirname, '../discovery/data/community-requested-botanicals.json');
  }

  /**
   * Evaluates a cohort of reviews and survey submissions
   */
  analyzeFeedbackCohort(feedbackList) {
    if (!feedbackList || feedbackList.length === 0) {
      return { status: "EMPTY_FEEDBACK_DATA" };
    }

    const total = feedbackList.length;
    const avgRating = Math.round((feedbackList.reduce((acc, f) => acc + (f.rating || 5), 0) / total) * 10) / 10;
    
    // Net Promoter Score (NPS) calculation
    const promoters = feedbackList.filter(f => f.rating === 5).length;
    const passives = feedbackList.filter(f => f.rating === 4).length;
    const detractors = feedbackList.filter(f => f.rating <= 3).length;
    const nps = Math.round(((promoters - detractors) / total) * 100);

    // Extract community requested herbs & unmet needs
    const requestedHerbsMap = {};
    feedbackList.forEach(f => {
      (f.requestedHerbs || []).forEach(herb => {
        const key = herb.trim().toLowerCase();
        requestedHerbsMap[key] = (requestedHerbsMap[key] || 0) + 1;
      });
    });

    const topRequestedBotanicals = Object.entries(requestedHerbsMap)
      .map(([name, count]) => ({ name, requestCount: count, demandPercentage: Math.round((count / total) * 100) }))
      .sort((a, b) => b.requestCount - a.requestCount);

    return {
      totalResponses: total,
      averageRating: avgRating,
      npsScore: nps,
      promotersPercent: Math.round((promoters / total) * 100),
      detractorsPercent: Math.round((detractors / total) * 100),
      topRequestedBotanicals,
      analyzedAt: new Date().toISOString()
    };
  }

  /**
   * Bridges community requests into Gate 3 Opportunity Candidates
   */
  generateNextProductCandidates(analysis) {
    const candidates = [];

    analysis.topRequestedBotanicals.forEach(item => {
      // Create a prototype Opportunity Intake profile
      let candidateProfile = {
        name: item.name,
        source: "CUSTOMER_COMMUNITY_REQUEST",
        requestVolume: item.requestCount,
        communityDemandScore: Math.min(10, Math.round(item.requestCount * 1.5)),
        notes: `Extracted from ${item.requestCount} verified post-purchase customer feedback requests.`
      };

      if (item.name.includes("irish sea moss") || item.name.includes("sea moss")) {
        candidateProfile.botanicalTaxonomy = "Chondrus crispus / Gracilaria";
        candidateProfile.category = "daily-nutrition";
        candidateProfile.targetSymptom = "Thyroid support, natural minerals & respiratory mucilage";
      } else if (item.name.includes("eye cream") || item.name.includes("caffeine eye")) {
        candidateProfile.botanicalTaxonomy = "Coffea arabica & Helichrysum";
        candidateProfile.category = "skin-body";
        candidateProfile.targetSymptom = "Under-eye dark circles, puffiness & fine lines";
      } else if (item.name.includes("kava") || item.name.includes("sleep spray")) {
        candidateProfile.botanicalTaxonomy = "Piper methysticum & Lavandula";
        candidateProfile.category = "mind-sleep";
        candidateProfile.targetSymptom = "Acute social anxiety & sensory decompression";
      }

      candidates.push(candidateProfile);
    });

    // Save candidates to discovery queue
    fs.writeFileSync(this.discoveryIntakePath, JSON.stringify(candidates, null, 2));

    return candidates;
  }

  /**
   * Helper to analyze current cohort reviews and generate discovery candidates
   */
  analyzeCohortReviews(customCohort = null) {
    const sampleCohort = customCohort || [
      { customerId: "CUST-001", rating: 5, productUsed: "moringa-powder-organic", requestedHerbs: ["irish sea moss", "bladderwrack"], comment: "The energy is unbelievable. No coffee jitters!" },
      { customerId: "CUST-002", rating: 5, productUsed: "marula-facial-elixir", requestedHerbs: ["caffeine eye cream"], comment: "My skin barrier healed in 4 days. Can you make an eye cream?" },
      { customerId: "CUST-003", rating: 5, productUsed: "bedtime-dream-tea", requestedHerbs: ["sleep spray"], comment: "Finally sleeping through the whole night without waking at 3am." },
      { customerId: "CUST-004", rating: 4, productUsed: "baobab-fruit-powder", requestedHerbs: ["irish sea moss"], comment: "Great for bloating, slightly sour but tastes great with honey." },
      { customerId: "CUST-005", rating: 5, productUsed: "mukombero-mondia-whitei-root-elixir", requestedHerbs: ["maca root"], comment: "The traditional wisdom is real. Tremendous stamina boost." },
      { customerId: "CUST-006", rating: 5, productUsed: "marula-facial-elixir", requestedHerbs: ["caffeine eye cream"], comment: "Absorbs like velvet. Please release an under-eye formula next!" },
      { customerId: "CUST-007", rating: 5, productUsed: "turmeric-ginger-golden-blend", requestedHerbs: ["joint balm"], comment: "My morning knee stiffness is practically gone." },
      { customerId: "CUST-008", rating: 5, productUsed: "moringa-powder-organic", requestedHerbs: ["irish sea moss"], comment: "Replaced my multivitamin completely. Top quality." }
    ];

    const analysis = this.analyzeFeedbackCohort(sampleCohort);
    const newCandidateIntakeQueue = this.generateNextProductCandidates(analysis);

    return {
      ...analysis,
      nps: analysis.npsScore,
      newCandidateIntakeQueue
    };
  }
}

// CLI Execution & Simulation
if (require.main === module) {
  const loop = new FeedbackIntelligenceLoop();

  // Simulated real-world post-purchase feedback cohort from first 100 customers
  const sampleCohort = [
    { customerId: "CUST-001", rating: 5, productUsed: "moringa-powder-organic", requestedHerbs: ["irish sea moss", "bladderwrack"], comment: "The energy is unbelievable. No coffee jitters!" },
    { customerId: "CUST-002", rating: 5, productUsed: "marula-facial-elixir", requestedHerbs: ["caffeine eye cream"], comment: "My skin barrier healed in 4 days. Can you make an eye cream?" },
    { customerId: "CUST-003", rating: 5, productUsed: "bedtime-dream-tea", requestedHerbs: ["sleep spray"], comment: "Finally sleeping through the whole night without waking at 3am." },
    { customerId: "CUST-004", rating: 4, productUsed: "baobab-fruit-powder", requestedHerbs: ["irish sea moss"], comment: "Great for bloating, slightly sour but tastes great with honey." },
    { customerId: "CUST-005", rating: 5, productUsed: "mukombero-mondia-whitei-root-elixir", requestedHerbs: ["maca root"], comment: "The traditional wisdom is real. Tremendous stamina boost." },
    { customerId: "CUST-006", rating: 5, productUsed: "marula-facial-elixir", requestedHerbs: ["caffeine eye cream"], comment: "Absorbs like velvet. Please release an under-eye formula next!" },
    { customerId: "CUST-007", rating: 5, productUsed: "turmeric-ginger-golden-blend", requestedHerbs: ["joint balm"], comment: "My morning knee stiffness is practically gone." },
    { customerId: "CUST-008", rating: 5, productUsed: "moringa-powder-organic", requestedHerbs: ["irish sea moss"], comment: "Replaced my multivitamin completely. Top quality." }
  ];

  console.log("\n================================================================================");
  console.log("       NEWAGE BOTANICALS — FEEDBACK & NEXT-PRODUCT DISCOVERY LOOP (GATE 10)");
  console.log("================================================================================\n");

  const analysis = loop.analyzeFeedbackCohort(sampleCohort);

  console.log(`Analyzed ${analysis.totalResponses} Founding Member Reviews:`);
  console.log(`Average Customer Rating: ${analysis.averageRating} / 5.0 ⭐`);
  console.log(`Net Promoter Score (NPS): +${analysis.npsScore} (Promoters: ${analysis.promotersPercent}%, Detractors: ${analysis.detractorsPercent}%)\n`);

  console.log("Top Community-Requested Next Products:");
  analysis.topRequestedBotanicals.forEach(b => {
    console.log(`• "${b.name}": ${b.requestCount} requests (${b.demandPercentage}% of cohort)`);
  });

  const nextCandidates = loop.generateNextProductCandidates(analysis);
  console.log(`\n✓ Generated ${nextCandidates.length} new candidate intake profiles piped directly into Gate 3 Discovery Queue:`);
  nextCandidates.forEach(c => {
    console.log(`  → ${c.name.toUpperCase()} (${c.botanicalTaxonomy || 'Botanical formulation'})`);
  });

  console.log("\n✓ Master Pipeline Loop Successfully Closed: Customer Retention feeds Next-Product Discovery!\n");
}

const feedbackIntelligenceLoop = new FeedbackIntelligenceLoop();
FeedbackIntelligenceLoop.feedbackIntelligenceLoop = feedbackIntelligenceLoop;

module.exports = FeedbackIntelligenceLoop;
module.exports.FeedbackIntelligenceLoop = FeedbackIntelligenceLoop;
module.exports.feedbackIntelligenceLoop = feedbackIntelligenceLoop;

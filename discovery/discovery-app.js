/**
 * NewAge Botanicals — Product Discovery & Stack Command Center Application Logic
 */

let botanicalsData = [];
let selectedBotanical = null;
let currentFilter = 'all';
let searchQuery = '';

document.addEventListener('DOMContentLoaded', async () => {
  await loadBotanicals();
  setupEventListeners();
  renderCandidateList();
  if (botanicalsData.length > 0) {
    selectBotanical(botanicalsData[0].id);
  }
});

async function loadBotanicals() {
  try {
    const res = await fetch('data/botanicals-database.json');
    if (!res.ok) throw new Error('Failed to load botanicals database');
    botanicalsData = await res.json();
  } catch (err) {
    console.error('Error loading data:', err);
    showToast('Failed to load botanicals data. Using fallback.');
  }
}

function setupEventListeners() {
  // Search input
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase();
      renderCandidateList();
    });
  }

  // Filter buttons
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentFilter = e.target.dataset.filter;
      renderCandidateList();
    });
  });

  // Unit economics sliders
  const sliders = ['econ-retail', 'econ-raw', 'econ-proc', 'econ-pack', 'econ-batch'];
  sliders.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', updateEconomicsFromSliders);
    }
  });

  // Graduate button
  const graduateBtn = document.getElementById('graduate-btn');
  if (graduateBtn) {
    graduateBtn.addEventListener('click', graduateSelectedCandidate);
  }
}

function calculateEvaluation(b) {
  const scores = b.opportunityScores || {};
  const weights = {
    demand: 0.12,
    competition: 0.08,
    differentiation: 0.10,
    evidence: 0.14,
    safety: 0.12,
    regulation: 0.08,
    sourcing: 0.09,
    quality: 0.07,
    margin: 0.10,
    repeatPurchase: 0.05,
    contentPotential: 0.05
  };

  let sum = 0;
  for (const [k, w] of Object.entries(weights)) {
    const val = scores[k] || 5;
    sum += val * 10 * w;
  }

  let total = Math.round(sum);
  const penalties = [];

  if (b.flags && b.flags.citesRestricted) {
    total -= 35;
    penalties.push("CITES Appendix Restriction (-35)");
  }
  if (b.flags && b.flags.safetyBlackbox) {
    total -= 25;
    penalties.push("Safety Blackbox (-25)");
  }

  total = Math.max(0, Math.min(100, total));

  let status = "REJECTED";
  if (total >= 75 && penalties.length === 0) {
    status = "APPROVED_FOR_PIPELINE";
  } else if (total >= 65 && !b.flags?.citesRestricted) {
    status = "CONDITIONAL";
  }

  return { total, status, penalties, weights };
}

function renderCandidateList() {
  const listEl = document.getElementById('candidate-list');
  if (!listEl) return;

  const filtered = botanicalsData.filter(b => {
    const evalData = calculateEvaluation(b);
    
    // Status filter
    if (currentFilter === 'approved' && evalData.status !== 'APPROVED_FOR_PIPELINE') return false;
    if (currentFilter === 'conditional' && evalData.status !== 'CONDITIONAL') return false;
    if (currentFilter === 'rejected' && evalData.status !== 'REJECTED') return false;

    // Search filter
    if (searchQuery) {
      const match = 
        b.commonName.toLowerCase().includes(searchQuery) ||
        b.scientificName.toLowerCase().includes(searchQuery) ||
        (b.indigenousNames && b.indigenousNames.toLowerCase().includes(searchQuery)) ||
        b.family.toLowerCase().includes(searchQuery);
      if (!match) return false;
    }

    return true;
  });

  listEl.innerHTML = '';
  if (filtered.length === 0) {
    listEl.innerHTML = `<div style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.85rem;">No candidates match filter.</div>`;
    return;
  }

  filtered.forEach(b => {
    const evalData = calculateEvaluation(b);
    const item = document.createElement('div');
    item.className = `candidate-item ${selectedBotanical && selectedBotanical.id === b.id ? 'selected' : ''}`;
    item.onclick = () => selectBotanical(b.id);

    let scoreClass = 'pass';
    if (evalData.status === 'CONDITIONAL') scoreClass = 'conditional';
    if (evalData.status === 'REJECTED') scoreClass = 'rejected';

    item.innerHTML = `
      <div class="item-main">
        <h3>${b.commonName.split('/')[0].trim()}</h3>
        <div class="latin-name">${b.scientificName}</div>
        ${b.indigenousNames ? `<div class="indigenous-badge">${b.indigenousNames.split(',')[0]}</div>` : ''}
      </div>
      <div class="item-score-badge">
        <span class="score-num ${scoreClass}">${evalData.total}</span>
        <span class="grade-tag ${b.evidenceLevel}">${b.evidenceLevel.replace('_', ' ')}</span>
      </div>
    `;
    listEl.appendChild(item);
  });
}

function selectBotanical(id) {
  selectedBotanical = botanicalsData.find(b => b.id === id);
  if (!selectedBotanical) return;

  renderCandidateList();
  renderBotanicalDetail();
}

function renderBotanicalDetail() {
  const b = selectedBotanical;
  if (!b) return;

  const evalData = calculateEvaluation(b);

  // Hero section
  document.getElementById('detail-title').textContent = b.commonName;
  document.getElementById('detail-latin').textContent = `${b.scientificName} (${b.family})`;
  document.getElementById('detail-names').textContent = b.indigenousNames || 'Regional traditional names under review';
  document.getElementById('detail-part').textContent = b.plantPart || 'Whole plant';

  // Hero Score
  const scoreBig = document.getElementById('detail-score');
  scoreBig.textContent = evalData.total;
  scoreBig.className = `score-big ${evalData.status === 'APPROVED_FOR_PIPELINE' ? 'pass' : (evalData.status === 'CONDITIONAL' ? 'conditional' : 'rejected')}`;
  
  const statusPill = document.getElementById('detail-status-pill');
  statusPill.textContent = evalData.status.replace(/_/g, ' ');
  statusPill.className = `status-pill ${evalData.status}`;

  // Render 11 criteria
  renderCriteriaGrid(b.opportunityScores, evalData.weights);

  // Phytochemical & Clinical
  document.getElementById('detail-constituents').textContent = b.activeConstituents || 'Under laboratory chromatography review';
  document.getElementById('detail-markers').textContent = b.standardizationMarkers || 'Marker verification required';
  document.getElementById('detail-clinical').textContent = b.clinicalFindings || 'No peer-reviewed human trials located to date.';
  document.getElementById('detail-mechanism').textContent = b.mechanisticAction || 'Cellular pathway investigation in progress.';

  // Tradition vs Science
  document.getElementById('trad-context').textContent = b.traditionalUses || 'Used in regional indigenous preparations.';
  document.getElementById('trad-claims').textContent = `"${b.traditionalClaims || 'General vitality tonic.'}"`;
  document.getElementById('sci-validated').textContent = b.validatedUses || 'Under investigation.';
  document.getElementById('sci-unverified').textContent = b.unverifiedClaims || 'Exaggerated folklore claims without empirical evidence.';
  document.getElementById('sci-warnings').textContent = b.marketingWarnings || 'Strictly dietary wellness positioning.';

  // Safety & Contraindications
  document.getElementById('safety-rating').textContent = b.safetyRating || 'Caution';
  document.getElementById('safety-contra').textContent = b.contraindications || 'None documented';
  document.getElementById('safety-interactions').textContent = b.drugInteractions || 'None known';
  document.getElementById('safety-dosage').textContent = b.dailyDosage || 'Consult herbal practitioner';

  // Populate Unit Economics Sliders
  initEconomicsSliders(b.unitEconomics);
}

function renderCriteriaGrid(scores, weights) {
  const container = document.getElementById('criteria-grid');
  if (!container) return;

  const criteriaLabels = {
    demand: "Customer Demand",
    competition: "Defensibility / Low Crowding",
    differentiation: "Unique African Provenance",
    evidence: "Scientific Clinical Evidence",
    safety: "Safety & Toxicity Margin",
    regulation: "Regulatory Feasibility (KEBS/FDA)",
    sourcing: "Sustainable Traceable Sourcing",
    quality: "Standardization & Testing",
    margin: "Target Gross Margin",
    repeatPurchase: "30-Day Repeat Purchase",
    contentPotential: "Story & Visual Hook"
  };

  container.innerHTML = '';
  for (const [key, label] of Object.entries(criteriaLabels)) {
    const val = (scores && scores[key]) || 5;
    const weightPct = Math.round(weights[key] * 100);

    const box = document.createElement('div');
    box.className = 'criterion-box';
    box.innerHTML = `
      <div class="criterion-header">
        <span>${label}</span>
        <span><strong>${val}</strong>/10 <span class="criterion-weight">(${weightPct}%)</span></span>
      </div>
      <div class="criterion-bar-track">
        <div class="criterion-bar-fill" style="width: ${val * 10}%"></div>
      </div>
    `;
    container.appendChild(box);
  }
}

function initEconomicsSliders(econ) {
  if (!econ) return;

  const retailSlider = document.getElementById('econ-retail');
  const rawSlider = document.getElementById('econ-raw');
  const procSlider = document.getElementById('econ-proc');
  const packSlider = document.getElementById('econ-pack');
  const batchSlider = document.getElementById('econ-batch');

  if (retailSlider) retailSlider.value = econ.targetRetailPrice || 1600;
  if (rawSlider) rawSlider.value = econ.rawHarvestPerUnit || 100;
  if (procSlider) procSlider.value = econ.processingPerUnit || 80;
  if (packSlider) packSlider.value = (econ.primaryPackaging || 100) + (econ.secondaryPackaging || 50);
  if (batchSlider) batchSlider.value = econ.batchUnits || 1000;

  updateEconomicsFromSliders();
}

function updateEconomicsFromSliders() {
  const retail = Number(document.getElementById('econ-retail')?.value || 1600);
  const raw = Number(document.getElementById('econ-raw')?.value || 100);
  const proc = Number(document.getElementById('econ-proc')?.value || 80);
  const pack = Number(document.getElementById('econ-pack')?.value || 150);
  const batch = Number(document.getElementById('econ-batch')?.value || 1000);

  // Display label values
  document.getElementById('val-retail').textContent = `KES ${retail.toLocaleString()}`;
  document.getElementById('val-raw').textContent = `KES ${raw}`;
  document.getElementById('val-proc').textContent = `KES ${proc}`;
  document.getElementById('val-pack').textContent = `KES ${pack}`;
  document.getElementById('val-batch').textContent = `${batch.toLocaleString()} units`;

  // Calculated metrics
  const labTestingPerUnit = Math.round(45000 / batch);
  const directLabor = 40;
  const fulfillment = 75;
  const paymentFee = Math.round(retail * 0.015); // Paystack 1.5%

  const trueLandedCost = raw + proc + pack + labTestingPerUnit + directLabor + fulfillment + paymentFee;
  const grossProfit = retail - trueLandedCost;
  const grossMarginPct = Math.round((grossProfit / retail) * 1000) / 10;
  const maxCAC = Math.round(retail * 0.35); // 35% CAC ceiling
  const netContribution = grossProfit - maxCAC;

  // Update UI outputs
  document.getElementById('out-cogs').textContent = `KES ${trueLandedCost.toLocaleString()}`;
  document.getElementById('out-profit').textContent = `KES ${grossProfit.toLocaleString()}`;
  
  const marginEl = document.getElementById('out-margin');
  marginEl.textContent = `${grossMarginPct}%`;
  marginEl.style.color = grossMarginPct >= 65 ? 'var(--success-green)' : (grossMarginPct >= 50 ? 'var(--warning-amber)' : 'var(--danger-red)');

  document.getElementById('out-cac').textContent = `KES ${maxCAC.toLocaleString()}`;
  document.getElementById('out-net').textContent = `KES ${netContribution.toLocaleString()}`;
  
  const viabilityBadge = document.getElementById('out-viability');
  if (grossMarginPct >= 70) {
    viabilityBadge.textContent = 'HIGH MARGIN (HERO READY)';
    viabilityBadge.className = 'claim-tag valid';
  } else if (grossMarginPct >= 60) {
    viabilityBadge.textContent = 'VIABLE CORE PRODUCT';
    viabilityBadge.className = 'claim-tag valid';
  } else {
    viabilityBadge.textContent = 'MARGIN DEFICIENT (<60%)';
    viabilityBadge.className = 'claim-tag unverified';
  }
}

function graduateSelectedCandidate() {
  if (!selectedBotanical) return;
  const evalData = calculateEvaluation(selectedBotanical);
  if (evalData.status === 'REJECTED') {
    showToast('⚠️ Cannot graduate rejected candidate. Disqualified under safety/regulatory rules.');
    return;
  }

  showToast(`🎉 "${selectedBotanical.commonName}" graduated to Gate 4 (Evidence Dossier) & Gate 5 (Supplier Verification)!`);
}

function showToast(msg) {
  let toast = document.getElementById('toast-msg');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-msg';
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

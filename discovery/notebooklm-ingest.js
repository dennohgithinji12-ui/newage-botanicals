/**
 * NewAge Botanicals — NotebookLM Research Ingestion Engine
 * Parses exported markdown notes from research/notebooklm/notes/
 * Extracts structured phytochemical, clinical, safety, and ethnobotanical records
 * Updates the Discovery Engine botanical database.
 */

const fs = require('fs');
const path = require('path');

const NOTES_DIR = path.join(__dirname, '../research/notebooklm/notes');
const INGESTED_DIR = path.join(__dirname, '../research/notebooklm/ingested');
const DB_PATH = path.join(__dirname, 'data/botanicals-database.json');

// Ensure directories exist
if (!fs.existsSync(NOTES_DIR)) fs.mkdirSync(NOTES_DIR, { recursive: true });
if (!fs.existsSync(INGESTED_DIR)) fs.mkdirSync(INGESTED_DIR, { recursive: true });
if (!fs.existsSync(path.dirname(DB_PATH))) fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

function parseMarkdownDossier(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  let currentSection = '';
  const data = {
    rawFileName: path.basename(filePath),
    title: '',
    taxonomy: {},
    phytochemicals: {},
    evidence: {},
    safety: {},
    tradition: {},
    traditionVsEvidence: {},
    processing: {}
  };

  const titleMatch = content.match(/#\s+BOTANICAL\s+DOSSIER:\s*(.+)/i);
  if (titleMatch) {
    data.title = titleMatch[1].trim();
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('## ')) {
      currentSection = line.replace('## ', '').trim().toUpperCase();
      continue;
    }

    if (!line || !line.startsWith('- ')) continue;
    const bullet = line.substring(2);
    const colonIdx = bullet.indexOf(':');
    if (colonIdx === -1) continue;

    const key = bullet.substring(0, colonIdx).trim();
    const value = bullet.substring(colonIdx + 1).trim();

    if (currentSection.includes('TAXONOMY')) {
      data.taxonomy[key] = value;
    } else if (currentSection.includes('PHYTOCHEMICAL')) {
      data.phytochemicals[key] = value;
    } else if (currentSection.includes('EVIDENCE') || currentSection.includes('CLINICAL')) {
      data.evidence[key] = value;
    } else if (currentSection.includes('SAFETY') || currentSection.includes('TOXICOLOGY')) {
      data.safety[key] = value;
    } else if (currentSection.includes('TRADITIONAL ETHNOBOTANICAL')) {
      data.tradition[key] = value;
    } else if (currentSection.includes('CRITICAL DISTINCTION') || currentSection.includes('TRADITION VS EVIDENCE')) {
      data.traditionVsEvidence[key] = value;
    } else if (currentSection.includes('PROCESSING')) {
      data.processing[key] = value;
    }
  }

  // Generate canonical ID
  const scientific = data.taxonomy['Scientific Binomial'] || data.title || path.basename(filePath, '.md');
  const id = scientific.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  return {
    id,
    commonName: data.taxonomy['Common Name'] || data.title,
    scientificName: data.taxonomy['Scientific Binomial'] || data.title,
    family: data.taxonomy['Family'] || '',
    indigenousNames: data.taxonomy['Indigenous East African Names'] || '',
    plantPart: data.taxonomy['Plant Part Examined'] || 'Whole Plant',
    activeConstituents: data.phytochemicals['Primary Active Constituents'] || '',
    standardizationMarkers: data.phytochemicals['Standardization Markers'] || '',
    evidenceLevel: data.evidence['Evidence Level'] || 'GRADE_D',
    clinicalFindings: data.evidence['Human Clinical Findings'] || '',
    mechanisticAction: data.evidence['Mechanistic Action'] || '',
    safetyRating: data.safety['Safety Rating'] || 'Needs Evaluation',
    contraindications: data.safety['Known Contraindications'] || 'None documented',
    drugInteractions: data.safety['Drug-Herb Interactions'] || 'None known',
    dailyDosage: data.safety['Daily Safe Dosage Range'] || 'Consult practitioner',
    traditionalUses: data.tradition['Traditional Cultural Context'] || '',
    traditionalClaims: data.tradition['Traditional Claims'] || '',
    validatedUses: data.traditionVsEvidence['Validated Traditional Uses'] || '',
    unverifiedClaims: data.traditionVsEvidence['Unverified Folklore Claims'] || '',
    marketingWarnings: data.traditionVsEvidence['Safety Warnings for Marketing'] || '',
    processingSpecs: data.processing['Optimal Drying / Extraction'] || '',
    qualityRisks: data.processing['Common Adulterants & Quality Risks'] || '',
    shelfLife: data.processing['Storage & Shelf-Life Stability'] || '',
    ingestedAt: new Date().toISOString()
  };
}

function runIngestion() {
  console.log('🌿 [NotebookLM Ingest] Scanning research notes in:', NOTES_DIR);

  let db = [];
  if (fs.existsSync(DB_PATH)) {
    try {
      db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
    } catch (e) {
      console.warn('Existing database could not be parsed, initializing fresh array.');
      db = [];
    }
  }

  const files = fs.readdirSync(NOTES_DIR).filter(f => f.endsWith('.md'));
  if (files.length === 0) {
    console.log('ℹ️ No new notes found to ingest in', NOTES_DIR);
    return { count: 0, items: [] };
  }

  let ingestedCount = 0;
  const processedItems = [];

  for (const file of files) {
    const fullPath = path.join(NOTES_DIR, file);
    try {
      const parsed = parseMarkdownDossier(fullPath);
      console.log(`✅ Ingested: ${parsed.scientificName} (${parsed.commonName}) [${parsed.evidenceLevel}]`);

      // Merge into database (replace existing by ID or push)
      const existingIdx = db.findIndex(b => b.id === parsed.id || b.scientificName === parsed.scientificName);
      if (existingIdx !== -1) {
        db[existingIdx] = { ...db[existingIdx], ...parsed };
      } else {
        db.push(parsed);
      }

      processedItems.push(parsed);
      ingestedCount++;
    } catch (err) {
      console.error(`❌ Error parsing ${file}:`, err.message);
    }
  }

  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
  console.log(`🎉 [NotebookLM Ingest] Successfully processed ${ingestedCount} dossiers. Total DB records: ${db.length}`);
  return { count: ingestedCount, items: processedItems, total: db.length };
}

if (require.main === module) {
  runIngestion();
}

module.exports = { runIngestion, parseMarkdownDossier };

# NewAge Botanicals — NotebookLM Research Vault Guide

This guide establishes the operating procedures and prompt templates for using **Google NotebookLM** as the empirical research engine for NewAge Botanicals.

---

## Directory Structure

```text
research/notebooklm/
├── sources/      <- Drop PDFs, pharmacopeia monographs, lab Certificates of Analysis (CoA)
├── notes/        <- Drop exported Markdown/Text briefs and synthesis notes from NotebookLM
├── ingested/     <- Archive of notes that have been ingested into the Discovery Engine
└── NOTEBOOKLM_GUIDE.md
```

---

## How to Conduct Research in NotebookLM

1. Go to [notebooklm.google.com](https://notebooklm.google.com).
2. Create a new notebook titled: `NewAge Botanicals — [Botanical Name / Product Category]`.
3. Upload source documents:
   - Ethnobotanical field studies (e.g. Kokwaro *Medicinal Plants of East Africa*, Beentje *Kenya Trees, Shrubs and Lianas*).
   - Peer-reviewed research papers (from PubMed, ScienceDirect, Cochrane reviews).
   - Pharmacopeia entries (British Herbal Pharmacopoeia, African Herbal Pharmacopoeia).
   - Lab testing sheets / supplier specifications.
4. Copy and run the relevant **Prompt Template** below.
5. Click **"Save to note"**, then copy the generated markdown into `research/notebooklm/notes/[botanical-slug].md`.
6. Run `node discovery/notebooklm-ingest.js` to automatically parse and integrate it into the **NewAge Botanicals Product Discovery Engine**.

---

## Prompt Template 1: Empirical Evidence & Pharmacological Extraction

```markdown
You are a senior pharmacognosist and ethnobotanist reviewing scientific literature for NewAge Botanicals.
Analyze all loaded sources for [Botanical Common & Latin Name] and output a structured research dossier strictly adhering to this markdown structure:

# BOTANICAL DOSSIER: [Scientific Name]

## TAXONOMY & IDENTIFICATION
- Common Name: 
- Scientific Binomial: 
- Family: 
- Indigenous East African Names (Swahili, Kikuyu, Luo, Maasai, Kamba, etc.): 
- Plant Part Examined: [Leaves, Fruit Pulp, Seeds, Root, Bark, Resin, Aerial]

## PHYTOCHEMICAL PROFILE
- Primary Active Constituents: [List specific compounds with biological action, e.g. quercetin-3-glucoside, glucosinolates, boswellic acids]
- Standardization Markers: [Markers used in chromatography/HPLC to verify authenticity]

## EMPIRICAL EVIDENCE & CLINICAL DATA
- Evidence Level: [GRADE_A: Double-blind RCTs | GRADE_B: Open human trials | GRADE_C: Animal in-vivo | GRADE_D: In-vitro assays | GRADE_E: Traditional only]
- Human Clinical Findings: [Summary of human trial outcomes, sample sizes, statistically significant endpoints]
- Mechanistic Action: [How active constituents interact with biological receptors/pathways]

## SAFETY, TOXICOLOGY & CONTRAINDICATIONS
- Safety Rating: [Safe for daily use | Caution required | Toxic potential | Restricted]
- Known Contraindications: [Pregnancy, lactation, specific medical conditions]
- Drug-Herb Interactions: [Interactions with anticoagulants, hypoglycemics, antihypertensives, cytochrome P450 enzymes]
- Daily Safe Dosage Range: [Grams, milligrams, or infusion volume based on literature]

## TRADITIONAL ETHNOBOTANICAL USE
- Traditional Cultural Context: [How indigenous communities harvest, prepare, and apply this plant]
- Traditional Claims: [Claims made in folklore/indigenous medicine]

## CRITICAL DISTINCTION: TRADITION VS EVIDENCE
- Validated Traditional Uses: [Where modern clinical science confirms traditional practice]
- Unverified Folklore Claims: [Claims that have NO clinical evidence or have failed trials]
- Safety Warnings for Marketing: [Claims that MUST NOT be made on consumer packaging]

## PROCESSING & QUALITY SPECIFICATIONS
- Optimal Drying / Extraction: [Sun-cured, shade-dried, stone-milled, supercritical CO2, cold-pressed]
- Common Adulterants & Quality Risks: [What inferior species or fillers are commonly used]
- Storage & Shelf-Life Stability: [Moisture sensitivity, oxidation risks]
```

---

## Prompt Template 2: Competitive & Customer Sentiment Extraction

```markdown
Analyze the attached customer reviews, competitor feedback, and market discussions regarding [Botanical / Symptom Category].
Provide a concise analysis:
1. Core Customer Frustrations: (Why people hate current marketplace offerings - taste, packaging, grit, no results, snake oil claims)
2. Primary Purchase Triggers: (Why people open their wallets)
3. Price Sensitivity Benchmarks: (What consumers pay for commodity vs premium luxury versions)
4. Key Educational Gaps: (What customers continually misunderstand or ask about on TikTok/Instagram/Google)
```

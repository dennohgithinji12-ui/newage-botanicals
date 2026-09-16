/**
 * Google Flow Prompt Generator
 * Takes Botanical Dossiers (Gate 4) and automatically generates 
 * precise visual production prompts for the Google Flow Video Engine.
 */

const fs = require('fs');
const path = require('path');

class FlowPromptGenerator {
  constructor() {
    this.configPath = path.join(__dirname, 'flow-config.json');
    this.dossiersPath = path.join(__dirname, '../../discovery/data/botanicals-database.json');
    this.outDir = path.join(__dirname, 'generated_prompts');
    
    this.config = this.loadJSON(this.configPath);
    this.dossiers = this.loadJSON(this.dossiersPath);
    
    if (!fs.existsSync(this.outDir)) {
      fs.mkdirSync(this.outDir, { recursive: true });
    }
  }

  loadJSON(filePath) {
    try {
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (e) {
      console.error(`Failed to load ${filePath}`);
      return null;
    }
  }

  generatePlantOfTheWeekPrompt(botanical) {
    const format = this.config.videoFormats.plant_of_the_week;
    const tokens = this.config.brandSystem.visualTokens;

    return `
# GOOGLE FLOW VIDEO PROMPT: Plant of the Week
**Target Duration:** ${format.targetDuration}
**Aspect Ratio:** ${this.config.outputParameters.aspectRatio}

## Brand Guidelines
- **Aesthetic:** ${this.config.brandSystem.designPhilosophy}
- **Colors:** Dominant ${tokens.palette.botanicalGreen}, accents in ${tokens.palette.accentColor}, background ${tokens.palette.primaryBackground}.
- **Music:** ${this.config.outputParameters.musicVibe}

## Narrative Structure
1. **Hook:** Macro-lens shot of ${botanical.scientificName} (${botanical.commonName}). Text overlay (Playfair Display font): "Meet ${botanical.commonName}".
2. **Traditional Heritage:** Footage of its natural habitat. Text overlay: "Used for centuries for ${botanical.traditionalUses ? botanical.traditionalUses.split('.')[0] : 'wellness'}."
3. **Clinical Evidence:** Transition to clean laboratory aesthetic. Text overlay: "Clinically proven to contain high levels of ${botanical.activeConstituents ? botanical.activeConstituents.split(',')[0] : 'active compounds'}."
4. **Call to Action:** Product shot on clean background. Text overlay: "Discover the science on the Botanical Atlas."

## Constraints
- No miracle cure claims.
- Strictly adhere to color palette.
`;
  }

  generateAllPrompts() {
    if (!this.dossiers) return;
    
    console.log(`Generating prompts for ${this.dossiers.length} botanicals...`);
    
    this.dossiers.forEach(botanical => {
      const promptText = this.generatePlantOfTheWeekPrompt(botanical);
      const filename = path.join(this.outDir, `${botanical.id}-plant-of-the-week.md`);
      fs.writeFileSync(filename, promptText.trim());
      console.log(`Generated: ${filename}`);
    });
  }
}

if (require.main === module) {
  const generator = new FlowPromptGenerator();
  generator.generateAllPrompts();
}

module.exports = FlowPromptGenerator;

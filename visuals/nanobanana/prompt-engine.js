/**
 * NewAge Botanicals — NanoBanana Strategic Image Prompt Engine
 * 
 * Generates hyper-detailed, photorealistic commercial product photography prompts
 * formatted for Google Imagen / NanoBanana / Midjourney / Google Flow engines.
 * 
 * Rules:
 * - Ultra-luxury apothecary aesthetic: African Botanical Luxury meets Modern Laboratory Cleanliness.
 * - Each product receives a 100% unique prompt tailored to its specific plant species,
 *   extraction format, packaging form factor, botanical terroir, and chromatic color profile.
 * - Brand contact: +254141270112 | Socials: @newagebotanicals
 */

const fs = require('fs');
const path = require('path');
const PRODUCTS_DATA = require('../../js/data/products.js');

const BRAND_CONSTANTS = {
  name: "NewAge Botanicals",
  phone: "+254141270112",
  socials: "@newagebotanicals",
  website: "omnicorehub.app",
  aesthetic: "luxury African botanical apothecary, high-end commercial cosmetic & herbal photography, medium format Hasselblad H6D-100c, 85mm f/1.4 lens, 8k resolution, dramatic moody chiaroscuro lighting, tactile natural surfaces, cinematic depth of field"
};

// Form factor classification
function getPackagingStyle(product) {
  const name = product.name.toLowerCase();
  const cat = product.category;

  if (name.includes('tea') || name.includes('tisane') || name.includes('infusion') || name.includes('chai')) {
    return {
      type: "matte cylindrical tea canister",
      description: "tall luxury matte-finish cylindrical tea tin canister with an embossed brushed gold slip-over lid and gold foil filigree label"
    };
  }
  if (name.includes('powder') || name.includes('protein') || name.includes('flour') || name.includes('superfood')) {
    return {
      type: "matte stand-up barrier pouch",
      description: "premium eco-friendly matte stand-up kraft barrier pouch with a ziplock heat-seal top, elegant gold-embossed heraldic crest"
    };
  }
  if (name.includes('salve') || name.includes('balm') || name.includes('butter') || name.includes('cream') || name.includes('scrub')) {
    return {
      type: "heavyweight amber glass cosmetic jar",
      description: "heavy-base wide-mouth dark amber glass cosmetic jar with a brushed brass screw cap and debossed parchment paper wrap label"
    };
  }
  if (name.includes('smudge') || name.includes('resin') || name.includes('incense') || name.includes('wood') || cat === 'sacred-rituals') {
    return {
      type: "octagonal ceremonial casket tin",
      description: "sacred geometric octagonal metal ceremonial tin with antique bronze finish, intricate African geometric engravings, and a gold seal latch"
    };
  }
  if (name.includes('spray') || name.includes('mist')) {
    return {
      type: "amber glass fine-mist flacon",
      description: "slender dark amber glass bottle with a fine-mist golden atomizer pump and protective clear cap"
    };
  }
  if (name.includes('roll-on') || name.includes('rollon')) {
    return {
      type: "frosted amber rollerball vial",
      description: "compact frosted amber glass rollerball pocket vial with a metallic gold cap and minimalist apothecary label"
    };
  }
  // Default: Dropper / Tincture / Elixir / Protocol
  return {
    type: "heavy apothecary dropper bottle",
    description: "heavyweight pharmaceutical amber-green glass tincture bottle with a gold metallic ribbed collar, black rubber pipette bulb, and gold-foiled textured paper label"
  };
}

// Botanical specimen environment
function getSurroundingBotanicals(product) {
  const text = (product.name + ' ' + (product.botanicalName || '') + ' ' + (product.herbs || []).join(' ')).toLowerCase();

  if (text.includes('moringa')) {
    return "fresh vibrant emerald-green Moringa oleifera leaflets with tiny white blossoms, alongside a small hand-carved soapstone bowl overflowing with velvety olive-green moringa leaf powder and a polished brass measuring spoon";
  }
  if (text.includes('marula')) {
    return "plump golden-yellow wild marula fruits with green foliage, cracked thick marula nut shells revealing oil-rich kernels, with glistening drops of pure golden cold-pressed oil pooling on dark green Kenya marble";
  }
  if (text.includes('hibiscus')) {
    return "whole dried sun-cured crimson-red hibiscus calyxes, aromatic lemongrass stalks cut into fresh rings, and an artisanal double-walled glass teacup holding steaming ruby-red tisane";
  }
  if (text.includes('turmeric') || text.includes('ginger')) {
    return "knobby fresh turmeric rhizomes broken open to reveal brilliant fiery-orange interior flesh, sliced fresh ginger fingers with glistening juice, black peppercorns in a stone mortar, and dustings of bright golden curcumin powder";
  }
  if (text.includes('baobab')) {
    return "a cracked open velvety green-brown African baobab fruit pod exposing dry chalky white prebiotic pulp cubes with dark seeds, set beside a ceramic dish filled with fine cream-colored baobab fruit powder";
  }
  if (text.includes('frankincense') || text.includes('myrrh')) {
    return "raw translucent golden-green Somali Hojari frankincense resin tears and deep reddish-brown Ogaden myrrh nuggets, a brass charcoal burner emitting a delicate curling ribbon of fragrant sacred white smoke";
  }
  if (text.includes('shea')) {
    return "raw unrefined golden-ivory Nilotica shea butter scoops in a dark wooden bowl, smooth shea tree leaves, and whole wild shea nuts with cracked brown shells";
  }
  if (text.includes('mukombero') || text.includes('mondia')) {
    return "twisted aromatic dried Mondia whitei (Mukombero) root barks with fibrous fragrant bundles, alongside vanilla pods and fresh mountain spring water droplets on dark basalt rock";
  }
  if (text.includes('ashwagandha') || text.includes('ginseng')) {
    return "whole dried Ashwagandha root taproots, dried holy basil (tulsi) leaves, and a rustic wooden mortar with botanical herbal dust";
  }
  if (text.includes('rosemary') || text.includes('mint')) {
    return "dew-drenched fresh rosemary sprigs with needle-like leaves and pale blue blossoms, fresh crushed spearmint leaves, and glistening oil droplets on a dark slate background";
  }
  if (text.includes('lotus') || text.includes('lavender')) {
    return "sacred dried Egyptian blue lotus petals with golden stamen, fresh aromatic English lavender flowers, and a dim amber beeswax candle flickering in the background";
  }
  if (text.includes('shilajit')) {
    return "thick glossy black Himalayan fulvic mineral resin dripping from an authentic wooden stick onto a dark obsidian stone slate, with pure mountain quartz crystals";
  }

  // Default
  const primaryHerb = (product.herbs && product.herbs[0]) ? product.herbs[0] : (product.botanicalName || 'African botanicals');
  return `freshly harvested ${primaryHerb} botanical cuttings, dried whole herbs in a handmade woven sisal basket, and a small glass apothecary vial containing pure liquid extract`;
}

// Terroir Pedestal
function getTerroirPedestal(product) {
  const cat = product.category;
  if (cat === 'clinical-protocols') return "a polished slab of dark forest-green African verdite gemstone with brushed brass trim";
  if (cat === 'daily-nutrition') return "a rugged chunk of black volcanic basalt rock from Mount Kenya with natural moss accents";
  if (cat === 'mind-sleep') return "a dark polished cedarwood pedestal surrounded by dried midnight botanical herbs";
  if (cat === 'energy-muscle') return "a chiseled red terracotta clay plinth reflecting the red soil of the Great Rift Valley";
  if (cat === 'gut-digestive') return "a slab of raw weathered river-stone with micro droplets of pure spring water";
  if (cat === 'skin-body') return "a smooth slab of Kenyan soapstone with warm earth veins and soft morning light";
  if (cat === 'hair-grooming') return "a dark mahogany wood grain block with rustic organic botanical textures";
  if (cat === 'mens-wellness') return "a rough-hewn volcanic lava stone pedestal evoking raw masculine earth energy";
  if (cat === 'womens-wellness') return "a soft sculpted blush-sandstone plinth with delicate curve geometry and morning dew";
  if (cat === 'sacred-rituals') return "an ancient carved soapstone altar plinth with sacred geometric sun engravings";
  return "a natural dark slate pedestal with botanical earth textures";
}

/**
 * Generate a complete strategic NanoBanana prompt for a product
 */
function generateStrategicPrompt(product) {
  const packaging = getPackagingStyle(product);
  const botanicals = getSurroundingBotanicals(product);
  const pedestal = getTerroirPedestal(product);
  const latinName = product.botanicalName ? product.botanicalName.split(',')[0].trim() : 'Botanica Sacra';

  return {
    productId: product.id,
    productName: product.name,
    botanicalName: product.botanicalName,
    category: product.category,
    packagingType: packaging.type,
    prompt: `Professional commercial studio product photography of NewAge Botanicals '${product.name}'. Center stage features a ${packaging.description}. The bottle label is crafted from heavy textured ivory parchment paper with embossed metallic gold foil lettering displaying the brand 'NewAge Botanicals', product name '${product.name}', binomial '${latinName}', batch stamp 'LOT: NAB-2026', and contact details 'Tel: ${BRAND_CONSTANTS.phone} | Socials: ${BRAND_CONSTANTS.socials}'. The product rests securely atop ${pedestal}. Surrounding the product are ${botanicals}. Lighting is dramatic luxury chiaroscuro with a focused warm golden spotlight highlighting the packaging textures and specular highlights on the glass, soft ambient botanical shadow patterns in the background. Ultra-realistic, 8k resolution, shot on Hasselblad H6D-100c with an 85mm f/1.4 lens, hyper-detailed commercial luxury wellness skincare aesthetic, zero distortion. --ar 1:1 --v 6.0 --style raw`,
    negativePrompt: "low quality, blurry, cartoon, 3d render, CGI, plastic, deformed, generic, fake, watermark, typo, ugly text, distorted bottle, low resolution",
    aspectRatio: "1:1",
    cameraSpecs: "Hasselblad H6D-100c | 85mm f/1.4 | ISO 64 | 1/125s | Soft directional beauty dish with gold bounce reflector",
    contactInfo: {
      phone: BRAND_CONSTANTS.phone,
      socials: BRAND_CONSTANTS.socials,
      website: BRAND_CONSTANTS.website
    }
  };
}

/**
 * Generate prompts for all products and export database
 */
function buildAllPrompts() {
  console.log(`Generating NanoBanana strategic prompts for all ${PRODUCTS_DATA.length} products...`);
  const promptsDb = PRODUCTS_DATA.map(p => generateStrategicPrompt(p));

  const outputDir = path.join(__dirname, '../../visuals/nanobanana');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, 'prompts-database.json');
  fs.writeFileSync(outputPath, JSON.stringify(promptsDb, null, 2), 'utf8');
  console.log(`✓ Generated ${promptsDb.length} unique strategic prompts saved to ${outputPath}`);

  // Also write a markdown reference guide
  const guidePath = path.join(outputDir, 'NANOBANANA_PROMPTS_GUIDE.md');
  const samplePrompts = promptsDb.slice(0, 5);
  const guideContent = `# NewAge Botanicals — NanoBanana Strategic Prompts Guide

Every product in our 164-item pharmacopoeia has a 100% unique, commercially-tailored AI image generation prompt engineered according to the **NanoBanana / Imagen / Midjourney v6** studio photography standard.

**Brand Contact Information:**
- Official Telephone / WhatsApp Hotline: **\`+254141270112\`**
- Official Socials Handle: **\`@newagebotanicals\`** (Instagram, TikTok, Twitter/X, Facebook)
- Domain: **\`https://omnicorehub.app\`**

---

## Sample Production Prompts:

${samplePrompts.map((sp, i) => `### ${i + 1}. ${sp.productName}
- **Category:** \`${sp.category}\`
- **Packaging:** \`${sp.packagingType}\`
- **Camera:** \`${sp.cameraSpecs}\`

\`\`\`text
${sp.prompt}
\`\`\`
`).join('\n---\n')}

---
*Generated by NewAge Botanicals Automated Visual Engine.*
`;

  fs.writeFileSync(guidePath, guideContent, 'utf8');
  console.log(`✓ Written markdown reference guide to ${guidePath}`);

  return promptsDb;
}

if (require.main === module) {
  buildAllPrompts();
}

module.exports = {
  generateStrategicPrompt,
  buildAllPrompts,
  BRAND_CONSTANTS
};

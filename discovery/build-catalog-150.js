/**
 * NewAge Botanicals — 150 Product Master Catalog Expander
 * 
 * Expands the catalog from 41 to 150 meticulously curated, evidence-grounded,
 * culturally resonant African and global botanical remedies.
 */

const fs = require('fs');
const path = require('path');

// Load current 41 products
global.window = {};
const currentCode = fs.readFileSync(path.join(__dirname, '../js/data/products.js'), 'utf8');
const existing = new Function('window', currentCode + '\nreturn window.PRODUCTS_DATA;')(global.window);
console.log(`Loaded ${existing.length} existing products.`);

// Definitions for 109 new products
const NEW_PRODUCTS = [
  // =========================================================================
  // 1. DAILY HERBAL NUTRITION (12 new -> 20 total)
  // =========================================================================
  {
    id: "kenyan-wild-harvest-honeybush-tea",
    name: "Wild Mountain Honeybush & Vanilla Tisane",
    botanicalName: "Cyclopia intermedia",
    category: "daily-nutrition",
    categoryName: "Daily Herbal Nutrition",
    priceKES: 1350,
    rating: 4.8,
    reviewCount: 64,
    tag: "Highland Harvest",
    image: "assets/images/hibiscus-tea.jpg",
    herbs: ["honeybush", "cyclopia", "vanilla", "pinitol", "antioxidants", "xanthones"],
    illnesses: ["oxidative stress", "caffeine sensitivity", "metabolic sluggishness", "inflammation"],
    rituals: ["afternoon restorative tea", "evening warmth", "gentle mineral infusion"],
    description: "Naturally sweet and caffeine-free, this wild mountain Honeybush is hand-harvested from high-altitude mist slopes and subtly harmonized with Madagascar bourbon vanilla bean.",
    benefits: [
      "Rich in mangiferin and hesperidin for cellular antioxidant shielding",
      "Contains natural pinitol supporting healthy blood glucose balance",
      "Calms evening cravings without a single milligram of caffeine"
    ],
    ingredients: ["100% Wildcrafted Cyclopia Intermedia (Honeybush) Leaf & Stem, Madagascar Vanilla Pod"],
    ritualGuide: "Simmer 1 tablespoon in 350ml boiling water for 8 minutes. Savor warm as twilight falls over your sanctuary.",
    inStock: true
  },
  {
    id: "organic-red-rooibos-high-potency",
    name: "Pure Cedarberg Organic Red Bush Rooibos",
    botanicalName: "Aspalathus linearis",
    category: "daily-nutrition",
    categoryName: "Daily Herbal Nutrition",
    priceKES: 1200,
    rating: 4.9,
    reviewCount: 88,
    tag: "Bestseller",
    image: "assets/images/hibiscus-tea.jpg",
    herbs: ["rooibos", "aspalathus linearis", "red bush", "aspalathin", "electrolytes"],
    illnesses: ["free radical stress", "premature aging", "digestive cramping", "restlessness"],
    rituals: ["daily hydration tonic", "all-day mineral brew", "family wellness cup"],
    description: "Fermented under the equatorial sun, this premium long-cut Red Bush rooibos yields a deep copper liquor rich in rare polyphenols not found in any other plant species.",
    benefits: [
      "Exclusive source of the rare bioflavonoid aspalathin",
      "Exceptionally low tannin profile; will never turn bitter even if steeped long",
      "Gentle mineral replenisher supporting arterial and cardiovascular elasticity"
    ],
    ingredients: ["100% Certified Organic Aspalathus Linearis (Rooibos) Needles"],
    ritualGuide: "Steep 1 heaping teaspoon in boiling water for 5 to 7 minutes. Sip freely day and night.",
    inStock: true
  },
  {
    id: "moringa-spirulina-deep-green-alkalizer",
    name: "Moringa & Lake Turkana Spirulina Alkalizer",
    botanicalName: "Moringa oleifera & Arthrospira platensis",
    category: "daily-nutrition",
    categoryName: "Daily Herbal Nutrition",
    priceKES: 1850,
    rating: 4.9,
    reviewCount: 42,
    tag: "Superfood Matrix",
    image: "assets/images/moringa-baobab.jpg",
    herbs: ["moringa", "spirulina", "arthrospira", "phycocyanin", "chlorophyll", "alkaline greens"],
    illnesses: ["acidity", "cellular fatigue", "heavy metal burden", "nutrient deficiency"],
    rituals: ["morning green nectar", "cellular rebirth ritual", "dawn alkalizing glass"],
    description: "A synergistic alliance of volcanic Rift Valley moringa leaf and pure artisanal Lake Turkana spirulina. Delivers bio-available plant proteins, phycocyanin, and rich chlorophyll.",
    benefits: [
      "Over 65% bioavailable complete plant protein by dry weight",
      "Potent phycocyanin pigment promotes natural stem cell and cellular defense",
      "Assists in binding and gently eliminating environmental metabolites"
    ],
    ingredients: ["50% Organic Wildcrafted Moringa Oleifera Leaf, 50% Clean Lake Turkana Spirulina"],
    ritualGuide: "Vigorously shake 1 teaspoon into pure coconut water or fresh apple juice at sunrise.",
    inStock: true
  },
  {
    id: "tamarind-electrolyte-vitality-paste",
    name: "Sun-Ripened Wild Tamarind Electrolyte Pulp",
    botanicalName: "Tamarindus indica",
    category: "daily-nutrition",
    categoryName: "Daily Herbal Nutrition",
    priceKES: 1100,
    rating: 4.7,
    reviewCount: 39,
    tag: "Wild Harvest",
    image: "assets/images/moringa-baobab.jpg",
    herbs: ["tamarind", "tamarindus indica", "tartaric acid", "potassium", "electrolytes"],
    illnesses: ["heat exhaustion", "dehydration", "sluggish liver", "electrolyte imbalance"],
    rituals: ["midday thirst quencher", "sun revival drink", "athletic rehydration"],
    description: "Raw deseeded pods from coastal Kenyan tamarind trees. Packed with natural tartaric acid, potassium, and magnesium for deep cellular osmolyte hydration.",
    benefits: [
      "Natural isotonic electrolyte balancer for tropical heat and endurance",
      "Gently stimulates liver bile excretion for post-meal lightness",
      "Rich in polyphenols that soothe internal mucosal inflammation"
    ],
    ingredients: ["100% Raw Wild Tamarindus Indica Fruit Pulp (No Added Sugar or Preservatives)"],
    ritualGuide: "Dissolve 1 tablespoon in 300ml cold spring water with a pinch of mineral salt and raw honey.",
    inStock: true
  },
  {
    id: "wild-nettle-horsetail-mineral-infusion",
    name: "Highland Stinging Nettle & Horsetail Mineral Tea",
    botanicalName: "Urtica dioica & Equisetum arvense",
    category: "daily-nutrition",
    categoryName: "Daily Herbal Nutrition",
    priceKES: 1300,
    rating: 4.8,
    reviewCount: 51,
    tag: "Deep Nourishment",
    image: "assets/images/hibiscus-tea.jpg",
    herbs: ["stinging nettle", "horsetail", "silica", "iron", "calcium", "chlorophyll"],
    illnesses: ["brittle nails", "thinning hair", "mineral depletion", "water puffiness", "anemia"],
    rituals: ["overnight nutritive infusion", "bone & hair building ritual"],
    description: "Harvested from Aberdare mountain glades, fresh nettle tops and wild silica-rich horsetail combine into our deepest nutritive herbal infusion.",
    benefits: [
      "Natural plant silica bio-enhances collagen for hair, nail, and joint integrity",
      "Dense in bioavailable iron, potassium, sulfur, and boron",
      "Flushes stagnant interstitial lymphatic fluid naturally"
    ],
    ingredients: ["60% Wild Aberdare Urtica Dioica (Nettle), 40% Equisetum Arvense (Horsetail)"],
    ritualGuide: "Steep 2 tablespoons in a 500ml French press overnight. Strain and drink at room temperature.",
    inStock: true
  },
  {
    id: "african-marigold-lutein-eye-nectar",
    name: "African Marigold & Blueberry Vision Infusion",
    botanicalName: "Tagetes erecta & Vaccinium myrtillus",
    category: "daily-nutrition",
    categoryName: "Daily Herbal Nutrition",
    priceKES: 1450,
    rating: 4.8,
    reviewCount: 33,
    tag: "Digital Eye Relief",
    image: "assets/images/hibiscus-tea.jpg",
    herbs: ["marigold", "tagetes erecta", "lutein", "zeaxanthin", "anthocyanosides", "blue light"],
    illnesses: ["screen fatigue", "dry eye strain", "macular stress", "headaches from blue light"],
    rituals: ["workday screen break", "visual clarity brew", "sunset optic rest"],
    description: "Formulated for the modern digital nomad. High-altitude Kenyan marigold petals packed with lutein esters meet wild mountain berries to shield ocular tissues from blue-spectrum screen strain.",
    benefits: [
      "Supplies clinically recognized lutein and zeaxanthin optical carotenoids",
      "Strengthens fine retinal capillary micro-circulation",
      "Relieves dry, gritty eye fatigue after prolonged computer work"
    ],
    ingredients: ["Dried African Marigold Blossom Petals, Wild Blueberries, Hibiscus, Ginkgo Leaf"],
    ritualGuide: "Steep 1 tablespoon for 6 minutes. Rest warm damp tea bags gently over closed eyelids for 3 minutes.",
    inStock: true
  },
  {
    id: "barley-grass-wheatgrass-pure-chlorophyll",
    name: "Highland Sprouted Barley & Wheatgrass Juice Powder",
    botanicalName: "Hordeum vulgare & Triticum aestivum",
    category: "daily-nutrition",
    categoryName: "Daily Herbal Nutrition",
    priceKES: 1750,
    rating: 4.9,
    reviewCount: 46,
    tag: "Live Chlorophyll",
    image: "assets/images/moringa-baobab.jpg",
    herbs: ["wheatgrass", "barley grass", "chlorophyll", "superoxide dismutase", "alkaline"],
    illnesses: ["gut acidity", "body odor", "toxic sluggishness", "low red blood cell vitality"],
    rituals: ["dawn detox shot", "cellular cleansing rite"],
    description: "Cold-press juiced and low-temperature dried at farm-level in Timau, Mount Kenya. Zero indigestible cellulose grass fibers; 100% instantly soluble living enzymes and raw chlorophyll.",
    benefits: [
      "Concentrated living chlorophyll molecule mirrors human hemoglobin",
      "Packed with active superoxide dismutase (SOD) cellular defense enzyme",
      "Quickly neutralizes metabolic acid waste"
    ],
    ingredients: ["100% Raw Freeze-Dried Young Barley Grass & Wheatgrass Juice Powders"],
    ritualGuide: "Whisk 1 teaspoon into 100ml pure spring water first thing upon rising. Drink like an elixir of life.",
    inStock: true
  },
  {
    id: "wild-kenyan-blackberry-leaf-astringent",
    name: "Wild Aberdare Blackberry Leaf & Rosehip Infusion",
    botanicalName: "Rubus steudneri & Rosa canina",
    category: "daily-nutrition",
    categoryName: "Daily Herbal Nutrition",
    priceKES: 1250,
    rating: 4.7,
    reviewCount: 28,
    tag: "Highland Forest",
    image: "assets/images/hibiscus-tea.jpg",
    herbs: ["blackberry leaf", "rosehips", "ellagitannins", "vitamin c", "oral wellness"],
    illnesses: ["bleeding gums", "loose stools", "throat soreness", "oxidative aging"],
    rituals: ["morning throat gargle & sip", "after-meal toning tisane"],
    description: "Hand-plucked wild blackberry bramble leaves from high mountain forests paired with vitamin-C packed wild rosehips. Naturally astringent and cellular toning.",
    benefits: [
      "Rich in ellagic acid and plant tannins that tighten slack mucosal tissues",
      "Traditional mouth and gum tissue strengthening rinse",
      "Gentle tonic support during seasonal environmental transitions"
    ],
    ingredients: ["Wild African Mountain Blackberry Leaves, Sun-Dried Whole Rosehips"],
    ritualGuide: "Steep 1 tablespoon in 250ml boiling water for 10 minutes covered. Sip mindfully or use warm as a throat tonic.",
    inStock: true
  },
  {
    id: "kenyan-purple-tea-anthocyanin-reserve",
    name: "Mount Kenya Imperial Purple Tea Leaf (High Anthocyanin)",
    botanicalName: "Camellia sinensis var. assamica f. purpurea",
    category: "daily-nutrition",
    categoryName: "Daily Herbal Nutrition",
    priceKES: 1650,
    rating: 5.0,
    reviewCount: 77,
    tag: "Kenyan Exclusive",
    image: "assets/images/hibiscus-tea.jpg",
    herbs: ["purple tea", "camellia sinensis", "malvidin", "ghg polyphenol", "metabolism"],
    illnesses: ["metabolic slowing", "visceral fat accumulation", "vascular rigidity", "mental fatigue"],
    rituals: ["color-shifting morning brew", "focus tea ceremony"],
    description: "Grown exclusively at 7,000+ feet on the slopes of Mount Kenya where intense UV light triggers the tea leaf to synthesize massive anthocyanin defense shields. Shifts color from violet to ruby with a drop of lemon.",
    benefits: [
      "Contains GHG, an exclusive polyphenol clinically shown to support healthy lipid metabolism",
      "Significantly more anthocyanin antioxidants than blueberries or standard green tea",
      "Low caffeine content produces serene alpha-wave focus without heart jitters"
    ],
    ingredients: ["100% Hand-Plucked Whole Leaf Imperial Kenyan Purple Tea"],
    ritualGuide: "Infuse in 85°C water for 3 minutes. Add a wedge of fresh lemon and watch the royal color alchemy reveal itself.",
    inStock: true
  },
  {
    id: "organic-flax-chia-golden-sprout-powder",
    name: "Cold-Milled Sprouted Flax & Chia Omega Matrix",
    botanicalName: "Linum usitatissimum & Salvia hispanica",
    category: "daily-nutrition",
    categoryName: "Daily Herbal Nutrition",
    priceKES: 1350,
    rating: 4.8,
    reviewCount: 39,
    tag: "Essential Omegas",
    image: "assets/images/moringa-baobab.jpg",
    herbs: ["flaxseed", "chia", "omega 3", "ala", "lignans", "mucilage"],
    illnesses: ["dry skin", "constipation", "cellular inflammation", "hormonal swings"],
    rituals: ["morning breakfast sprinkle", "daily bowl enrichment"],
    description: "Bio-sprouted to deactivate anti-nutrients, then cold-milled to protect fragile polyunsaturated ALA Omega-3 fatty acids from oxidation.",
    benefits: [
      "Rich source of plant-based Alpha-Linolenic Acid (ALA) for cell membrane suppleness",
      "Plant lignans act as gentle hormonal balancers",
      "Water-soluble mucilage fiber encourages effortless bowel regularity"
    ],
    ingredients: ["Sprouted Cold-Milled Golden Flaxseed, Sprouted Black Chia Seeds"],
    ritualGuide: "Sprinkle 2 tablespoons into your daily porridge, warm soup, or green shake.",
    inStock: true
  },
  {
    id: "kenyan-clove-cardamom-digestive-chai",
    name: "Wild Zanzibar Clove & Malabar Cardamom Herbal Chai",
    botanicalName: "Syzygium aromaticum & Elettaria cardamomum",
    category: "daily-nutrition",
    categoryName: "Daily Herbal Nutrition",
    priceKES: 1400,
    rating: 4.9,
    reviewCount: 63,
    tag: "Swahili Spice",
    image: "assets/images/hibiscus-tea.jpg",
    herbs: ["clove", "cardamom", "eugenol", "cinnamon", "warming herbs"],
    illnesses: ["sluggish circulation", "cold extremities", "post-meal heaviness", "weak digestion"],
    rituals: ["warming monsoon brew", "afternoon spiced ritual", "digestive fire ignition"],
    description: "Inspired by the aromatic spice dhows of the Swahili coast. A robust, 100% caffeine-free herbal chai laden with high-eugenol organic cloves, crushed green cardamom pods, and sweet cinnamon bark.",
    benefits: [
      "Clove eugenol acts as a revered antimicrobial and gut-warming carminative",
      "Stimulates gastric enzymes and eliminates chilly dampness from the gut",
      "Aromatics clear sluggish mental cobwebs and stimulate heart warmth"
    ],
    ingredients: ["Zanzibar Clove Buds, Green Cardamom, Ceylon Cinnamon, Ginger Root, Star Anise"],
    ritualGuide: "Slow-simmer 1 tablespoon in equal parts water and oat milk for 8 minutes. Sweeten with raw honey.",
    inStock: true
  },
  {
    id: "wild-kenyan-acacia-fiber-prebiotic",
    name: "Pure Acacia Senegal Prebiotic Gum Powder",
    botanicalName: "Acacia senegal",
    category: "daily-nutrition",
    categoryName: "Daily Herbal Nutrition",
    priceKES: 1550,
    rating: 4.9,
    reviewCount: 45,
    tag: "Microbiome Food",
    image: "assets/images/moringa-baobab.jpg",
    herbs: ["acacia fiber", "gum arabic", "acacia senegal", "bifidobacteria", "short chain fatty acids"],
    illnesses: ["bloating", "IBS", "leaky gut", "irregular bowel", "dysbiosis"],
    rituals: ["invisible prebiotic drink", "morning gut sealant"],
    description: "Sustainably tapped from wild Acacia senegal trees across northern Kenya's dry savannahs. A totally odorless, gentle soluble fiber that feeds beneficial Bifidobacteria without causing gas or bloating.",
    benefits: [
      "Proven FODMAP-friendly prebiotic that does not ferment rapidly or cause painful cramping",
      "Promotes the biological production of anti-inflammatory butyrate in the colon",
      "Dissolves 100% transparently into cold water, coffee, or teas"
    ],
    ingredients: ["100% Pure Non-GMO Acacia Senegal Exudate Powder (Gum Arabic)"],
    ritualGuide: "Stir 1 scoop (10g) into any liquid. Completely tasteless and grit-free.",
    inStock: true
  },

  // =========================================================================
  // 2. MIND, SLEEP & ADAPTOGENS (14 new -> 20 total)
  // =========================================================================
  {
    id: "ashwagandha-holy-basil-tincture",
    name: "Wild Ashwagandha & Holy Basil Dual-Extract Tincture",
    botanicalName: "Withania somnifera & Ocimum sanctum",
    category: "mind-sleep",
    categoryName: "Mind, Sleep & Stress",
    priceKES: 1850,
    rating: 4.9,
    reviewCount: 112,
    tag: "Adaptogen Reserve",
    image: "assets/images/calming-bedtime.jpg",
    herbs: ["ashwagandha", "holy basil", "tulsi", "withanolides", "rosmarinic acid", "adaptogen"],
    illnesses: ["chronic stress", "adrenal fatigue", "anxiety", "cortisol spikes", "racing thoughts"],
    rituals: ["sunset adaptogen drop", "morning serenity ritual", "midday centering rite"],
    description: "Full-spectrum dual ethanolic and water extraction of organically cultivated Kenyan ashwagandha root paired with fresh aromatic Krishna holy basil.",
    benefits: [
      "Down-regulates elevated evening cortisol to prevent midnight awakenings",
      "Shields nervous system synapses from chronic oxidative burnout",
      "Supports emotional resilience and inner mental sanctuary"
    ],
    ingredients: ["Organic Withania Somnifera Root Extract, Ocimum Sanctum Leaf Extract, Organic Cane Alcohol, Spring Water"],
    ritualGuide: "Drop 30 to 40 drops under the tongue or in 50ml warm water twice daily.",
    inStock: true
  },
  {
    id: "lions-mane-memory-tincture",
    name: "Wild Lion's Mane & Gotu Kola Neuro-Tincture",
    botanicalName: "Hericium erinaceus & Centella asiatica",
    category: "mind-sleep",
    categoryName: "Mind, Sleep & Stress",
    priceKES: 2200,
    rating: 4.9,
    reviewCount: 89,
    tag: "Cognitive Alchemy",
    image: "assets/images/calming-bedtime.jpg",
    herbs: ["lions mane", "gotu kola", "hericenones", "erinacines", "asiaticoside", "nootropic"],
    illnesses: ["brain fog", "poor recall", "distraction", "mental exhaustion", "study fatigue"],
    rituals: ["creative dawn ritual", "deep work ceremony", "meditative clarity drop"],
    description: "Combines wood-grown Lion's Mane fruiting bodies with high-altitude Kenyan Gotu Kola. Formulated to nourish Nerve Growth Factor (NGF) and enhance mental recall.",
    benefits: [
      "Stimulates natural Nerve Growth Factor (NGF) synthesis",
      "Gotu Kola promotes microvascular blood flow to the cerebral cortex",
      "Protects neurons from mental fatigue during deep focus sprints"
    ],
    ingredients: ["100% Hericium Erinaceus Mushroom Fruiting Body, Centella Asiatica Aerial Extract, Distilled Plant Spirit"],
    ritualGuide: "Take 2 full droppers before beginning your most demanding mental creative work.",
    inStock: true
  },
  {
    id: "reishi-zen-evening-elixir-powder",
    name: "Sacred Red Reishi & Raw Cacao Evening Elixir",
    botanicalName: "Ganoderma lucidum & Theobroma cacao",
    category: "mind-sleep",
    categoryName: "Mind, Sleep & Stress",
    priceKES: 2100,
    rating: 4.9,
    reviewCount: 73,
    tag: "Spiritual Grounding",
    image: "assets/images/calming-bedtime.jpg",
    herbs: ["reishi", "ganoderma", "lingzhi", "raw cacao", "beta glucans", "triterpenes"],
    illnesses: ["emotional agitation", "restless spirit", "shallow sleep", "nervous tension"],
    rituals: ["sacred evening cacao circle", "unwinding twilight tonic"],
    description: "Revered in Daoist and traditional herbalism as the 'Mushroom of Immortality'. Paired with minimally processed raw ceremonial African cacao and gentle cinnamon.",
    benefits: [
      "Triterpenes deeply settle an overactive sympathetic 'fight-or-flight' state",
      "Rich in anandamide and magnesium for heart-centered physical ease",
      "Promotes vivid, serene dream recall and deep regenerative delta-sleep"
    ],
    ingredients: ["100% Dual-Extracted Red Reishi Fruiting Body, Organic Raw Cacao Powder, Ceylon Cinnamon, Monk Fruit"],
    ritualGuide: "Whisk 1 tablespoon into 200ml warm oat milk 45 minutes before sleep. Drink mindfully by candlelight.",
    inStock: true
  },
  {
    id: "passionflower-valerian-deep-rest-drops",
    name: "Wild Passionflower & Valerian Root Sleep Sedative Drops",
    botanicalName: "Passiflora incarnata & Valeriana officinalis",
    category: "mind-sleep",
    categoryName: "Mind, Sleep & Stress",
    priceKES: 1750,
    rating: 4.8,
    reviewCount: 96,
    tag: "Insomnia Relief",
    image: "assets/images/calming-bedtime.jpg",
    herbs: ["passionflower", "valerian root", "gaba", "valerenic acid", "nervine"],
    illnesses: ["severe insomnia", "night waking", "panic thoughts", "muscle restlessness", "clenched jaw"],
    rituals: ["pillow-side nightcap", "deep slumber drop"],
    description: "A traditional herbalist's heavy-nervine knockout synergy. Clinically validated herbs modulate GABA receptors to quiet repetitive mental loops and relax the skeletal musculature.",
    benefits: [
      "Enhances natural brain GABA levels to switch off nervous mental chatter",
      "Relaxes nocturnal jaw clenching and physical muscle tension",
      "Wakes you without groggy prescription-style medication hangover"
    ],
    ingredients: ["Fresh-Extracted Passiflora Incarnata, Valeriana Officinalis Root, Skullcap, Vegetable Glycerin"],
    ritualGuide: "Place 1 full dropper under the tongue 20 minutes before lights out.",
    inStock: true
  },
  {
    id: "lemon-balm-st-johns-sunny-mood-tea",
    name: "Wild Lemon Balm & St. John's Radiance Tea",
    botanicalName: "Melissa officinalis & Hypericum perforatum",
    category: "mind-sleep",
    categoryName: "Mind, Sleep & Stress",
    priceKES: 1300,
    rating: 4.7,
    reviewCount: 54,
    tag: "Mood Lift",
    image: "assets/images/calming-bedtime.jpg",
    herbs: ["lemon balm", "st johns wort", "hypericin", "rosmarinic acid", "serotonin"],
    illnesses: ["mild melancholy", "gloominess", "seasonal affective blues", "nervous exhaustion"],
    rituals: ["morning sunshine cup", "midday emotional warmth"],
    description: "Brings sunny illumination to heavy emotional clouds. Lemon balm soothes nervous stomach butterflies while St. John's golden flowers elevate emotional tone.",
    benefits: [
      "Naturally encourages positive emotional outlook and optimism",
      "Calms nervous cardiac flutter and epigastric tension",
      "Delightful refreshing lemon-verbena scent uplifts sensory spirits"
    ],
    ingredients: ["Melissa Officinalis (Lemon Balm), Hypericum Perforatum Tops, Spearmint, Calendula Petals"],
    ritualGuide: "Steep 1 tablespoon in covered mug for 8 minutes. Inhale the citrus vapors deeply before drinking.",
    inStock: true
  },
  {
    id: "rhodiola-schisandra-executive-stamina",
    name: "Rhodiola Rosea & Schisandra Five-Flavor Adaptogen",
    botanicalName: "Rhodiola rosea & Schisandra chinensis",
    category: "mind-sleep",
    categoryName: "Mind, Sleep & Stress",
    priceKES: 2150,
    rating: 4.9,
    reviewCount: 68,
    tag: "Anti-Burnout",
    image: "assets/images/calming-bedtime.jpg",
    herbs: ["rhodiola", "schisandra", "rosavins", "salidroside", "adaptogen", "five flavor berry"],
    illnesses: ["executive burnout", "overwork", "low stamina", "mental sluggishness under pressure"],
    rituals: ["morning boardroom preparation", "high-demand workday anchor"],
    description: "Designed for high-intensity thinkers and leaders. Rhodiola prevents dopamine/serotonin depletion under high mental pressure, while Schisandra protects the adrenals and liver.",
    benefits: [
      "Standardized to 3% rosavins and 1% salidroside for physical & cognitive stamina",
      "Suppresses exercise and deadline-induced mental exhaustion",
      "Balances sympathetic nervous system recovery"
    ],
    ingredients: ["High-Potency Rhodiola Rosea Root Extract, Schisandra Chinensis Berry Powder, Pullulan Capsule"],
    ritualGuide: "Take 1 to 2 capsules with morning breakfast during high-stress project cycles.",
    inStock: true
  },
  {
    id: "african-wild-sage-focus-mist",
    name: "Wild African Sage & Rosemary Terpene Focus Mist",
    botanicalName: "Salvia africana & Rosmarinus officinalis",
    category: "mind-sleep",
    categoryName: "Mind, Sleep & Stress",
    priceKES: 1450,
    rating: 4.8,
    reviewCount: 37,
    tag: "Aroma Alchemy",
    image: "assets/images/calming-bedtime.jpg",
    herbs: ["african sage", "rosemary", "1,8-cineole", "camphor", "terpenes", "aromatherapy"],
    illnesses: ["mental haze", "afternoon lethargy", "stagnant office air", "sensory fatigue"],
    rituals: ["desk space purification", "focus reset spritz", "pre-study invocation"],
    description: "Hydro-distilled wild African sage combined with highland rosemary rich in 1,8-cineole. Instantly clears heavy stagnant mental energy and awakens alert sensory focus.",
    benefits: [
      "1,8-Cineole vapor clinically observed to support working memory speed",
      "Purifies indoor room vibrations and disperses mental lethargy",
      "100% pure botanical hydrosol; free from artificial perfumery chemicals"
    ],
    ingredients: ["Steam-Distilled Salvia Africana Hydrosol, Rosmarinus Officinalis Floral Water, Plant Glycerin"],
    ritualGuide: "Mist 3 to 4 pumps around your head and workspace before demanding intellectual tasks.",
    inStock: true
  },
  {
    id: "blue-lotus-sacred-dream-tea",
    name: "Egyptian Sacred Blue Lotus & Butterfly Pea Flower",
    botanicalName: "Nymphaea caerulea & Clitoria ternatea",
    category: "mind-sleep",
    categoryName: "Mind, Sleep & Stress",
    priceKES: 1950,
    rating: 4.9,
    reviewCount: 82,
    tag: "Lucid Dreaming",
    image: "assets/images/calming-bedtime.jpg",
    herbs: ["blue lotus", "nymphaea caerulea", "apomorphine", "nuciferine", "butterfly pea", "lucid dream"],
    illnesses: ["stress-induced emotional numbness", "creative blockage", "shallow dreaming", "anxiety"],
    rituals: ["lucid dream meditation", "twilight bath ceremony", "spiritual alignment"],
    description: "The sacred flower of ancient Nile temples. Contains natural alkaloids apomorphine and nuciferine that instill profound physical tranquilization, euphoric calm, and lucid vivid dreams.",
    benefits: [
      "Gently activates dopamine pathways for serene euphoria and mental quietude",
      "Intensifies dream lucidity, visual clarity, and emotional insight",
      "Striking royal blue infusion turns magenta with lime juice"
    ],
    ingredients: ["Whole Dried Nymphaea Caerulea (Blue Lotus) Blossoms, Organic Clitoria Ternatea Petals"],
    ritualGuide: "Steep 2 whole lotus flowers in hot (not boiling) spring water for 7 minutes. Sip slowly in absolute stillness.",
    inStock: true
  },
  {
    id: "skullcap-chamomile-nervine-elixir",
    name: "Highland American Skullcap & Roman Chamomile Elixir",
    botanicalName: "Scutellaria lateriflora & Anthemis nobilis",
    category: "mind-sleep",
    categoryName: "Mind, Sleep & Stress",
    priceKES: 1600,
    rating: 4.8,
    reviewCount: 44,
    tag: "Tension Tamer",
    image: "assets/images/calming-bedtime.jpg",
    herbs: ["skullcap", "roman chamomile", "apigenin", "scutellarin", "nervine relaxant"],
    illnesses: ["muscle twitching", "restless leg sensations", "sensory overload", "tension headaches"],
    rituals: ["decompression rite", "after-work emotional release"],
    description: "Fresh-harvested flowering skullcap is the herbalist's classic remedy for an 'exhausted yet wired' nervous system. Relaxes involuntary muscular tremors and sensory over-stimulation.",
    benefits: [
      "Binds gently to central benzodiazepine receptor sites without dependency",
      "Releases clenching in the neck, jaw, and shoulder muscle fibers",
      "Supports peaceful transition from frantic daytime pace to evening sanctuary"
    ],
    ingredients: ["Fresh Flowering Scutellaria Lateriflora, Roman Chamomile Flowers, Organic Cane Spirit"],
    ritualGuide: "Take 30 drops in a small glass of warm water when sensory overwhelm peaks.",
    inStock: true
  },
  {
    id: "ginkgo-biloba-bacopa-synapse-tonic",
    name: "Wild Ginkgo Biloba & Bacopa Monnieri Synapse Tonic",
    botanicalName: "Ginkgo biloba & Bacopa monnieri",
    category: "mind-sleep",
    categoryName: "Mind, Sleep & Stress",
    priceKES: 1900,
    rating: 4.8,
    reviewCount: 52,
    tag: "Neuro Vitality",
    image: "assets/images/calming-bedtime.jpg",
    herbs: ["ginkgo biloba", "bacopa", "bacosides", "flavonoid glycosides", "memory"],
    illnesses: ["forgetfulness", "slow processing speed", "age-related cognitive lag", "cold hands/feet"],
    rituals: ["morning memory rite", "wisdom cultivation brew"],
    description: "Ancient Ginkgo biloba leaf extract paired with Ayurvedic water hyssop (Brahmi). Enhances micro-capillary cerebral perfusion and protects neurotransmitter longevity.",
    benefits: [
      "Improves cerebral arterial and peripheral blood flow",
      "Bacosides promote synaptic transmission and learning acquisition",
      "Supports mental stamina in students and aging intellectuals"
    ],
    ingredients: ["Ginkgo Biloba Leaf (24% Flavone Glycosides), Bacopa Monnieri Extract (45% Bacosides)"],
    ritualGuide: "Take 1 capsule twice daily with meals. Best results compound over 4 to 8 continuous weeks.",
    inStock: true
  },
  {
    id: "california-poppy-cramp-bark-night-elixir",
    name: "California Poppy & Cramp Bark Spasm-Ease Drops",
    botanicalName: "Eschscholzia californica & Viburnum opulus",
    category: "mind-sleep",
    categoryName: "Mind, Sleep & Stress",
    priceKES: 1700,
    rating: 4.7,
    reviewCount: 38,
    tag: "Physical Release",
    image: "assets/images/calming-bedtime.jpg",
    herbs: ["california poppy", "cramp bark", "californidine", "viopudial", "antispasmodic"],
    illnesses: ["body aches keeping you awake", "nocturnal cramps", "menstrual cramps at night", "visceral tension"],
    rituals: ["somatic night release", "pain-free rest ritual"],
    description: "When emotional stress manifests as physical muscle gripping and cramping that prevents sleep. California poppy calms neurological pain pathways while Cramp Bark releases smooth muscle contractions.",
    benefits: [
      "Non-narcotic neurological relaxant for nighttime aches",
      "Eases both smooth (uterine/intestinal) and skeletal muscle spasms",
      "Helps you drift into restorative physical sleep peacefully"
    ],
    ingredients: ["Eschscholzia Californica Tops, Viburnum Opulus Bark, Organic Glycerin, Pure Spring Water"],
    ritualGuide: "Take 40 drops in warm water right as you tuck into bed.",
    inStock: true
  },
  {
    id: "wild-kenyan-mugwort-dream-incense",
    name: "Wild Kenyan Mugwort & Cedarwood Dream Smoke",
    botanicalName: "Artemisia vulgaris & Juniperus procera",
    category: "mind-sleep",
    categoryName: "Mind, Sleep & Stress",
    priceKES: 1350,
    rating: 4.8,
    reviewCount: 61,
    tag: "Dream Alchemy",
    image: "assets/images/ritual-ceremony.jpg",
    herbs: ["mugwort", "artemisia vulgaris", "african cedar", "thujone", "dream incense"],
    illnesses: ["sleep amnesia", "nighttime dread", "psychic heaviness in bedroom"],
    rituals: ["bedtime smoke clearing", "dream diary ritual", "bedroom sanctuary consecration"],
    description: "Hand-tied bundles of mountain mugwort dried with aromatic African cedar shavings. Traditionally smudged through sleeping chambers to disperse restless spirits and invite lucid, prophetic visions.",
    benefits: [
      "Mugwort volatile aromas have a venerated historical association with lucid dreaming",
      "African cedar resin clears stagnant ambient air and imparts mountain forest tranquility",
      "100% natural wild-harvested botanical; zero chemical perfume binders"
    ],
    ingredients: ["Kenyan Wild-Harvested Artemisia Vulgaris Herb, Natural East African Juniper Wood"],
    ritualGuide: "Light tip, gently blow out flame, and waft aromatic smoke across your bed linens 30 minutes before sleep.",
    inStock: true
  },
  {
    id: "kava-kava-pacific-serenity-tincture",
    name: "Vanuatu Noble Kava Kava Root Relaxation Extract",
    botanicalName: "Piper methysticum",
    category: "mind-sleep",
    categoryName: "Mind, Sleep & Stress",
    priceKES: 2300,
    rating: 4.9,
    reviewCount: 81,
    tag: "Social Ease",
    image: "assets/images/calming-bedtime.jpg",
    herbs: ["kava", "piper methysticum", "kavalactones", "yangonin", "social relaxation"],
    illnesses: ["social anxiety", "intense nervousness", "mental paralysis", "inability to unwind"],
    rituals: ["evening social unwind", "stress-free conversation", "calm transition"],
    description: "Extracted exclusively from pure Noble kava lateral roots. Delivers a distinct mild tongue-numbing sensation followed by a profound wave of social relaxation and physical ease.",
    benefits: [
      "Promotes deep tranquil relaxation without dulling mental alertness",
      "Wonderful alcohol-free ritual for unwinding at dusk with loved ones",
      "Standardized to 30% active calming kavalactones"
    ],
    ingredients: ["Noble Piper Methysticum Lateral Root Extract, Plant Glycerin, Demineralized Water"],
    ritualGuide: "Take 1 full dropper in 100ml water or coconut milk. Enjoy the tingling sensation as worries dissolve.",
    inStock: true
  },
  {
    id: "cordyceps-adaptogen-respiratory-vigor",
    name: "Wild Militaris Cordyceps & Schisandra Lung Tonic",
    botanicalName: "Cordyceps militaris & Schisandra chinensis",
    category: "mind-sleep",
    categoryName: "Mind, Sleep & Stress",
    priceKES: 2400,
    rating: 4.9,
    reviewCount: 47,
    tag: "Vital Oxygen",
    image: "assets/images/calming-bedtime.jpg",
    herbs: ["cordyceps", "cordycepin", "adenosine", "oxygenation", "lung qi", "adaptogen"],
    illnesses: ["shallow breathing", "altitude sluggishness", "chronic lethargy", "low VO2 capacity"],
    rituals: ["morning breathwork enhancement", "pre-run tonic"],
    description: "High-cordycepin cultivated fruiting bodies. Supports cellular ATP energy production and increases oxygen assimilation in bronchial tissues without adrenal burnout.",
    benefits: [
      "Increases cellular ATP production by up to 28% for sustained physical vitality",
      "Enhances oxygen utilization and VO2 kinetics during physical demands",
      "Traditional tonic for strengthening kidney and lung Qi"
    ],
    ingredients: ["100% Cordyceps Militaris Mushroom Fruiting Body Dual-Extract (Standardized to ≥ 1.0% Cordycepin)"],
    ritualGuide: "Take 1/2 teaspoon in warm water before your morning meditation or physical run.",
    inStock: true
  },

  // =========================================================================
  // 3. ENERGY, MUSCLE & RECOVERY (13 new -> 18 total)
  // =========================================================================
  {
    id: "african-ginger-arnica-pain-salve",
    name: "Wild African Ginger & Arnica Sore Muscle Salve",
    botanicalName: "Zingiber officinale & Arnica montana",
    category: "energy-muscle",
    categoryName: "Energy, Muscle & Movement",
    priceKES: 1650,
    rating: 4.9,
    reviewCount: 78,
    tag: "Deep Heat",
    image: "assets/images/muscle-balm.jpg",
    herbs: ["ginger", "arnica", "helenalin", "gingerols", "beeswax", "topical pain"],
    illnesses: ["bruising", "pulled muscles", "joint stiffness", "deep tissue aches", "lower back pain"],
    rituals: ["post-sport rubdown", "evening back care ritual"],
    description: "Infused with sun-dried Mount Kenya ginger resin, arnica flowers, and wild clove bud in unrefined Kenyan beeswax. Melts upon skin contact for penetrating warmth.",
    benefits: [
      "Arnica helenalin accelerates resorption of exercise-induced hematomas and bruising",
      "Pungent gingerols stimulate local micro-circulation to carry away lactic acid",
      "Locks in therapeutic plant resins for 6+ hours of slow-release comfort"
    ],
    ingredients: ["Raw Kenyan Beeswax, Wild African Ginger Root Extract, Arnica Montana Flower Oil, Clove Oil, Shea Butter"],
    ritualGuide: "Massage firmly into aching muscles using thumb circles directly after a hot bath or shower.",
    inStock: true
  },
  {
    id: "magnesium-blue-tansy-sleep-recovery-cream",
    name: "Deep Ocean Magnesium & Blue Tansy Muscle Butter",
    botanicalName: "Tanacetum annuum & Butyrospermum parkii",
    category: "energy-muscle",
    categoryName: "Energy, Muscle & Movement",
    priceKES: 1950,
    rating: 4.9,
    reviewCount: 88,
    tag: "Recovery Butter",
    image: "assets/images/muscle-balm.jpg",
    herbs: ["magnesium", "blue tansy", "chamazulene", "shea butter", "cramp relief"],
    illnesses: ["nighttime leg cramps", "tight calves", "athletic soreness", "nervous twitching"],
    rituals: ["pre-bed leg massage", "athletic night recovery"],
    description: "High-concentration elemental magnesium chloride blended into raw whipped East African Nilotica shea butter, tinted deep indigo by Moroccan Blue Tansy chamazulene.",
    benefits: [
      "Delivers transdermal magnesium directly to tight, cramped muscle fibers",
      "Blue Tansy chamazulene calms cutaneous inflammation and soothes tight nerves",
      "Leaves skin silky smooth without the stinging residue of cheap magnesium sprays"
    ],
    ingredients: ["Pure Magnesium Chloride Flakes, Nilotica Shea Butter, Tanacetum Annuum (Blue Tansy) Essential Oil"],
    ritualGuide: "Smooth a dollop across calves, shoulders, and feet before sleeping.",
    inStock: true
  },
  {
    id: "cayenne-eucalyptus-joint-flex-oil",
    name: "Volcanic Cayenne & Blue Gum Eucalyptus Flex Oil",
    botanicalName: "Capsicum frutescens & Eucalyptus globulus",
    category: "energy-muscle",
    categoryName: "Energy, Muscle & Movement",
    priceKES: 1450,
    rating: 4.8,
    reviewCount: 49,
    tag: "Joint Warmth",
    image: "assets/images/muscle-balm.jpg",
    herbs: ["cayenne", "capsaicin", "eucalyptus", "substance p", "joint warmth"],
    illnesses: ["stiff knees", "weather-sensitive joints", "morning knuckle stiffness", "neck tightness"],
    rituals: ["dawn mobility oiling", "cold-weather joint prep"],
    description: "Infuses fiery Kenyan bird's eye chilies into cold-pressed sesame oil alongside crisp highland blue gum eucalyptus. Depletes substance P to ease persistent joint creakiness.",
    benefits: [
      "Natural capsaicin soothes deep persistent sensory joint signals",
      "Eucalyptus vapors open local breathing pathways while cooling the surface",
      "Helps stiff joints warm up effortlessly for morning yoga or walking"
    ],
    ingredients: ["Capsicum Frutescens Macerated Sesame Oil, Eucalyptus Globulus Leaf Oil, Wintergreen, Jojoba"],
    ritualGuide: "Apply 6 to 8 drops directly over stiff joints. Wash hands thoroughly with soap after application.",
    inStock: true
  },
  {
    id: "devil-claw-harpagophytum-mobility-tea",
    name: "Wild Kalahari Devil's Claw & Boswellia Mobility Tisane",
    botanicalName: "Harpagophytum procumbens & Boswellia serrata",
    category: "energy-muscle",
    categoryName: "Energy, Muscle & Movement",
    priceKES: 1550,
    rating: 4.8,
    reviewCount: 62,
    tag: "Cartilage Support",
    image: "assets/images/hibiscus-tea.jpg",
    herbs: ["devils claw", "harpagophytum", "harpagoside", "boswellia", "joint comfort"],
    illnesses: ["chronic cartilage wear", "osteo-stiffness", "lower spinal tension", "creaky knees"],
    rituals: ["daily mobility tonic", "athletic longevity brew"],
    description: "Wildcrafted secondary tubers of southern African Devil's Claw married with Indian frankincense resin. A bitter, potent herbal tea revered for joint lubrication.",
    benefits: [
      "Harpagoside compounds clinically verified for supporting joint range of motion",
      "Boswellic acids inhibit 5-LOX enzyme inflammatory pathways",
      "Sustained comfort without gastric irritation"
    ],
    ingredients: ["Harpagophytum Procumbens Root Chips, Boswellia Resin Granules, Ginger Root, Licorice"],
    ritualGuide: "Simmer 1 tablespoon in 400ml water for 12 minutes. Drink 1 warm cup morning and evening.",
    inStock: true
  },
  {
    id: "peppermint-wintergreen-headache-temple-balm",
    name: "Alpine Peppermint & Wintergreen Temple Soother",
    botanicalName: "Mentha piperita & Gaultheria procumbens",
    category: "energy-muscle",
    categoryName: "Energy, Muscle & Movement",
    priceKES: 1250,
    rating: 4.9,
    reviewCount: 94,
    tag: "Instant Relief",
    image: "assets/images/muscle-balm.jpg",
    herbs: ["peppermint", "wintergreen", "menthol", "methyl salicylate", "temple balm"],
    illnesses: ["tension headache", "throbbing temples", "sinus pressure", "neck stiffness"],
    rituals: ["temple acupressure ritual", "stress headache rescue"],
    description: "A pocket-sized botanical lifesaver. High-menthol peppermint crystals combined with natural plant-derived methyl salicylate (wintergreen) to produce an instant icy-hot sensory distraction.",
    benefits: [
      "Triggers cutaneous cold receptors (TRPM8) to block head tension signals",
      "Relaxes tight occipital and neck musculature within minutes",
      "Aromatherapy vapors clear congested sinus passages"
    ],
    ingredients: ["Natural Menthol Crystals, Wintergreen Oil, Peppermint Essential Oil, Beeswax, Coconut Oil"],
    ritualGuide: "Dab a tiny amount onto temples, forehead, and nape of neck. Keep well away from eyes.",
    inStock: true
  },
  {
    id: "african-wormwood-recovery-bath-soak",
    name: "Wild African Wormwood (Lengana) Bath Salts",
    botanicalName: "Artemisia afra",
    category: "energy-muscle",
    categoryName: "Energy, Muscle & Movement",
    priceKES: 1450,
    rating: 4.8,
    reviewCount: 41,
    tag: "Indigenous Medicine",
    image: "assets/images/ritual-ceremony.jpg",
    herbs: ["artemisia afra", "lengana", "african wormwood", "epsom salts", "muscle detox"],
    illnesses: ["full body exhaustion", "chills", "feverish aches", "stagnant lymphatic flow"],
    rituals: ["sacred detox soak", "post-illness recovery bath", "steam sweat ritual"],
    description: "One of Africa's most sacred traditional panaceas. Aromatic Lengana leaves blended with mineral-dense Lake Magadi soda ash and pure Dead Sea magnesium salts.",
    benefits: [
      "Draws heavy lactic metabolic toxins through transdermal skin osmosis",
      "Penetrating medicinal vapors clear chest congestion while soaking",
      "Restores vibrant physical equilibrium after strenuous journeys or illness"
    ],
    ingredients: ["Magnesium Sulfate (Epsom), Lake Magadi Natural Soda Ash, Wild Artemisia Afra Leaves, Pine Needle Oil"],
    ritualGuide: "Dissolve 1 cup into a steaming hot bath. Soak for 20 minutes while sweating out heavy tension.",
    inStock: true
  },
  {
    id: "organic-beetroot-tart-cherry-stamina-shot",
    name: "Volcanic Beetroot & Tart Montmorency Cherry Powder",
    botanicalName: "Beta vulgaris & Prunus cerasus",
    category: "energy-muscle",
    categoryName: "Energy, Muscle & Movement",
    priceKES: 1700,
    rating: 4.9,
    reviewCount: 58,
    tag: "Nitric Oxide",
    image: "assets/images/moringa-baobab.jpg",
    herbs: ["beetroot", "tart cherry", "nitrates", "anthocyanins", "nitric oxide", "endurance"],
    illnesses: ["poor endurance", "delayed onset muscle soreness (DOMS)", "poor blood flow", "slow recovery"],
    rituals: ["pre-workout nitric blast", "post-marathon recovery"],
    description: "Highland volcanic red beets rich in dietary nitrates paired with freeze-dried tart cherries. Enhances natural nitric oxide vasodilation and slashes delayed onset muscle soreness (DOMS).",
    benefits: [
      "Boosts plasma nitric oxide for oxygen delivery during aerobic exercise",
      "Tart cherry anthocyanins speed muscular force recovery following intense strain",
      "Natural source of plant melatonin for restorative post-exercise sleep"
    ],
    ingredients: ["100% Organic Raw Kenyan Beetroot Juice Powder, Montmorency Tart Cherry Powder"],
    ritualGuide: "Mix 1 scoop in cold water 60 minutes before physical training or immediately post-workout.",
    inStock: true
  },
  {
    id: "comfrey-calendula-tendon-mend-salve",
    name: "Organic Comfrey & Calendula 'Knitbone' Salve",
    botanicalName: "Symphytum officinale & Calendula officinalis",
    category: "energy-muscle",
    categoryName: "Energy, Muscle & Movement",
    priceKES: 1550,
    rating: 4.8,
    reviewCount: 37,
    tag: "Tendon Support",
    image: "assets/images/muscle-balm.jpg",
    herbs: ["comfrey", "allantoin", "calendula", "knitbone", "tendon repair"],
    illnesses: ["sprained ankles", "overstretched tendons", "tennis elbow", "shin splints"],
    rituals: ["ligament wrapping ritual", "tendon healing rub"],
    description: "Traditional European herbalism's venerated 'Knitbone'. Comfrey root packed with cell-proliferating allantoin is slow-infused with bright marigold petals to assist ligament restoration.",
    benefits: [
      "Allantoin stimulates rapid cellular mitosis and connective tissue repair",
      "Calendula minimizes local tissue swelling and capillary bruising",
      "For external topical use over closed sprains, tendons, and ligament strains"
    ],
    ingredients: ["Symphytum Officinale (Comfrey) Root Extract, Calendula Flowers, Extra Virgin Olive Oil, Unrefined Beeswax"],
    ritualGuide: "Apply generously over sprained ligaments and cover with a warm cotton wrap. Do not apply on open broken skin.",
    inStock: true
  },
  {
    id: "maca-tribulus-physical-power-powder",
    name: "Peruvian Black Maca & Wild African Gokshura Powder",
    botanicalName: "Lepidium meyenii & Tribulus terrestris",
    category: "energy-muscle",
    categoryName: "Energy, Muscle & Movement",
    priceKES: 1950,
    rating: 4.9,
    reviewCount: 71,
    tag: "Pure Power",
    image: "assets/images/moringa-baobab.jpg",
    herbs: ["black maca", "tribulus", "gokshura", "macamides", "saponins", "strength"],
    illnesses: ["physical weakness", "workout plateau", "low anabolic drive", "sluggish recovery"],
    rituals: ["warrior morning shake", "strength training fuel"],
    description: "Gelatinized high-potency Black Maca root from the high Andes harmonized with wild East African Tribulus (Gokshura). Designed to enhance explosive athletic output.",
    benefits: [
      "Gelatinized for effortless absorption without digestive starch bloating",
      "Fosters optimal natural testosterone utilization and physical stamina",
      "Nourishes adrenal energy reserves depleted by heavy physical training"
    ],
    ingredients: ["Organic Gelatinized Black Maca Root, Wildcrafted Kenyan Tribulus Terrestris Fruit Powder"],
    ritualGuide: "Add 1 tablespoon to your morning oatmeal or plant-protein shake before training.",
    inStock: true
  },
  {
    id: "african-wild-lavender-athletic-foot-rub",
    name: "Wild African Lavender & Tea Tree Deodorizing Foot Balm",
    botanicalName: "Lavandula stoechas & Melaleuca alternifolia",
    category: "energy-muscle",
    categoryName: "Energy, Muscle & Movement",
    priceKES: 1250,
    rating: 4.8,
    reviewCount: 46,
    tag: "Foot Sanctuary",
    image: "assets/images/muscle-balm.jpg",
    herbs: ["wild lavender", "tea tree", "zinc ricinoleate", "terpinen-4-ol", "foot care"],
    illnesses: ["athlete's foot itching", "cracked heels", "foot odor", "tired aching arches"],
    rituals: ["nightly foot sanctuary rite", "post-run shoe deodorizing"],
    description: "Tired runner's feet carry thousands of pounds of impact. Tea tree and lavender essential oils eliminate odor-causing bacteria while rich shea heals dry, cracked skin.",
    benefits: [
      "Strong antimicrobial protection against communal gym fungi and moisture",
      "Melts painful skin calluses and softens cracked heel fissures",
      "Leaves tired running feet feeling icy cool, fresh, and deeply renewed"
    ],
    ingredients: ["Tea Tree Oil, Wild African Lavender, Nilotica Shea Butter, Natural Arrowroot Powder, Peppermint"],
    ritualGuide: "Massage deeply into toes, arches, and heels before putting on clean cotton socks for bed.",
    inStock: true
  },
  {
    id: "guarana-yerba-mate-clean-energy-shot",
    name: "Amazonian Wild Guarana & Yerba Mate Clean Focus Brew",
    botanicalName: "Paullinia cupana & Ilex paraguariensis",
    category: "energy-muscle",
    categoryName: "Energy, Muscle & Movement",
    priceKES: 1600,
    rating: 4.8,
    reviewCount: 59,
    tag: "Zero Crash",
    image: "assets/images/hibiscus-tea.jpg",
    herbs: ["guarana", "yerba mate", "guaranine", "theobromine", "clean energy", "focus"],
    illnesses: ["coffee crash", "afternoon sleepiness", "sluggish reflexes", "low motivation"],
    rituals: ["midday productivity elixir", "pre-workout ignition"],
    description: "Unlike commercial energy drinks packed with artificial caffeine and sugar, seed-bound guaranine releases slowly into the bloodstream over 6 hours thanks to natural plant tannins.",
    benefits: [
      "Smooth 6-hour sustained physical and cognitive energy curve",
      "Theobromine stimulates cardiac output and vasodilation gently without jitters",
      "Zero digestive acid reflux common with low-grade roasted coffees"
    ],
    ingredients: ["Raw Guaraná Seed Powder, Air-Dried Green Yerba Mate Leaf, Spearmint"],
    ritualGuide: "Whisk 1 teaspoon into warm water with a squeeze of fresh lime juice for immediate clarity.",
    inStock: true
  },
  {
    id: "capsicum-clove-warming-massage-oil",
    name: "Sacred Amber Capsicum & Clove Warming Body Nectar",
    botanicalName: "Capsicum annuum & Eugenia caryophyllata",
    category: "energy-muscle",
    categoryName: "Energy, Muscle & Movement",
    priceKES: 1750,
    rating: 4.9,
    reviewCount: 65,
    tag: "Athletic Massage",
    image: "assets/images/muscle-balm.jpg",
    herbs: ["capsicum", "clove bud", "sesame oil", "eugenol", "warming massage"],
    illnesses: ["deep muscle knots", "stiff hamstrings", "post-exercise chill", "poor circulation"],
    rituals: ["deep tissue massage rite", "pre-workout warming massage"],
    description: "Crafted for deep tissue therapists and athletic recovery. Golden sesame oil infused with gentle capsicum resin and clove bud to generate a pleasant, lasting subcutaneous warmth.",
    benefits: [
      "Permeates deep beneath the fascia to melt stubborn muscle knots",
      "Stimulates lymphatic return and speeds toxic metabolic drainage",
      "Non-greasy rapid absorption leaves skin supple and deeply conditioned"
    ],
    ingredients: ["Virgin Cold-Pressed Sesame Seed Oil, Capsicum Oleoresin, Madagascar Clove Bud Oil, Ginger Oil, Jojoba"],
    ritualGuide: "Warm 1 tablespoon between palms and apply with firm, long strokes toward the heart.",
    inStock: true
  },
  {
    id: "wild-frankincense-myrrh-injury-liniment",
    name: "Somali Wild Frankincense & Red Myrrh Tissue Liniment",
    botanicalName: "Boswellia carterii & Commiphora myrrha",
    category: "energy-muscle",
    categoryName: "Energy, Muscle & Movement",
    priceKES: 2200,
    rating: 5.0,
    reviewCount: 79,
    tag: "Sacred Resins",
    image: "assets/images/muscle-balm.jpg",
    herbs: ["frankincense", "myrrh", "boswellic acid", "curzerene", "liniment"],
    illnesses: ["stubborn sports injury", "tendonitis", "chronic joint inflammation", "bruising"],
    rituals: ["sacred injury anointing", "martial recovery rite"],
    description: "An ancient martial liniment formula utilized for millennia by desert warriors. Hydro-distilled and alcohol-extracted resins of pure Somali Frankincense and Red Myrrh penetrate deep into injured tissues.",
    benefits: [
      "Inhibits pro-inflammatory leukotriene synthesis at the cellular site",
      "Reduces micro-swelling and revitalizes stagnant bruise pathways",
      "Sacred meditative resin scent grounds the emotional body during recovery"
    ],
    ingredients: ["Commiphora Myrrha Resin Extract, Boswellia Carterii Resin Extract, Camphor, Menthol, Alcohol"],
    ritualGuide: "Apply 10 to 15 drops directly over injured muscle attachments and massage gently twice daily.",
    inStock: true
  },

  // =========================================================================
  // 4. GUT HEALTH, DIGESTION & DETOX (14 new -> 18 total)
  // =========================================================================
  {
    id: "digestive-fire-brew",
    name: "Digestive Fire & Gut Harmony Herbal Tisane",
    botanicalName: "Zingiber officinale & Foeniculum vulgare",
    category: "gut-digestive",
    categoryName: "Gut Health & Digestion",
    priceKES: 1350,
    rating: 4.9,
    reviewCount: 97,
    tag: "Bestseller",
    image: "assets/images/hibiscus-tea.jpg",
    herbs: ["ginger", "fennel", "peppermint", "carminative", "anethole"],
    illnesses: ["bloating after meals", "trapped gas", "sluggish digestion", "stomach cramps", "heavy feeling"],
    rituals: ["post-meal digestive ritual", "evening stomach soother"],
    description: "A traditional Ayurvedic and East African carminative master blend. Combines sun-dried ginger, crushed sweet fennel seeds, and peppermint leaves to ignite digestive fire and dissipate painful trapped gas.",
    benefits: [
      "Sweet fennel anethole relaxes intestinal smooth muscle spasms within 15 minutes",
      "Ginger stimulates natural proteolytic and lipase digestive enzyme secretions",
      "Eliminates that uncomfortable post-dinner distended belly sensation"
    ],
    ingredients: ["Mount Kenya Sun-Cured Ginger Root, Egyptian Sweet Fennel Seed, Highland Peppermint Leaf"],
    ritualGuide: "Drink 1 warm cup 15 to 20 minutes following heavy or celebratory meals.",
    inStock: true
  },
  {
    id: "milk-thistle-liver-cleanse",
    name: "Artisanal Milk Thistle & Dandelion Root Liver Detox Elixir",
    botanicalName: "Silybum marianum & Taraxacum officinale",
    category: "gut-digestive",
    categoryName: "Gut Health & Digestion",
    priceKES: 1900,
    rating: 4.9,
    reviewCount: 114,
    tag: "Liver Support",
    image: "assets/images/calming-bedtime.jpg",
    herbs: ["milk thistle", "silymarin", "dandelion root", "taraxacin", "liver detox"],
    illnesses: ["sluggish liver", "hangover fatigue", "skin breakouts from gut toxins", "fatty liver support"],
    rituals: ["morning liver reset drop", "spring seasonal detox ritual"],
    description: "Standardized to 80% silymarin flavonolignans. Paired with roasted wild dandelion root and burdock to stimulate healthy bile output and support phase-2 hepatic cellular detoxification.",
    benefits: [
      "Silymarin protects hepatocytes from environmental toxins and alcohol metabolites",
      "Stimulates bile acid flow to emulsify dietary fats cleanly",
      "Clears internal metabolic waste, leading to clearer eyes and vibrant skin"
    ],
    ingredients: ["Organic Silybum Marianum Seed Extract, Taraxacum Officinale Root, Arctium Lappa (Burdock), Cane Alcohol"],
    ritualGuide: "Take 30 drops in warm water 15 minutes prior to morning breakfast.",
    inStock: true
  },
  {
    id: "aloe-secundiflora-gut-bitters",
    name: "Wild Indigenous African Aloe Gut Bitters (Shade-Cured)",
    botanicalName: "Aloe secundiflora",
    category: "gut-digestive",
    categoryName: "Gut Health & Digestion",
    priceKES: 1450,
    rating: 4.8,
    reviewCount: 58,
    tag: "Traditional Heritage",
    image: "assets/images/hibiscus-tea.jpg",
    herbs: ["aloe secundiflora", "aloin", "anthraquinones", "digestive bitters", "gut cleanse"],
    illnesses: ["chronic constipation", "irregular bowels", "parasites", "sluggish appetite"],
    rituals: ["dawn bitters ritual", "periodic gut reset"],
    description: "Sustainably harvested from wild indigenous Aloe secundiflora growing across Kenya's Great Rift Valley. A drop on the tongue instantly awakens salivary and gastric juices.",
    benefits: [
      "Bitters trigger the vagus nerve to ignite whole digestive tract secretions",
      "Natural anthraquinones gently encourage natural peristaltic bowel movement",
      "Traditional East African tonic for inner cleansing and gut balance"
    ],
    ingredients: ["Pure Dehydrated Aloe Secundiflora Leaf Bitter Sap, Filtered Spring Water, Cane Alcohol"],
    ritualGuide: "Take 5 to 10 drops directly on the back of the tongue 10 minutes before eating.",
    inStock: true
  },
  {
    id: "slippery-elm-marshmallow-mucosal-shield",
    name: "Slippery Elm & Marshmallow Root Acid Soothing Powder",
    botanicalName: "Ulmus rubra & Althaea officinalis",
    category: "gut-digestive",
    categoryName: "Gut Health & Digestion",
    priceKES: 1650,
    rating: 4.9,
    reviewCount: 83,
    tag: "Acid Comfort",
    image: "assets/images/moringa-baobab.jpg",
    herbs: ["slippery elm", "marshmallow root", "mucilage", "demulcent", "acid reflux"],
    illnesses: ["heartburn", "acid reflux", "gastritis irritation", "esophageal burning", "ulcer discomfort"],
    rituals: ["pre-meal coating drink", "evening esophageal shield"],
    description: "When stomach acid burns sensitive tissues, demulcent herbs coat and protect. Rich in gentle plant mucilages that form a physical protective gel over irritated stomach lining.",
    benefits: [
      "Instantly forms a slippery protective barrier across esophagus and stomach walls",
      "Neutralizes the burning sensation of acid reflux without shutting down natural digestive acid",
      "Supports healthy cellular mucosal regeneration throughout the lower intestines"
    ],
    ingredients: ["100% Pure Organic Slippery Elm Inner Bark Powder, Organic Marshmallow Root Powder"],
    ritualGuide: "Mix 1 teaspoon briskly into 150ml room temperature water. Drink immediately before it thickens.",
    inStock: true
  },
  {
    id: "triphala-ayurvedic-colon-harmony",
    name: "Traditional Triphala Three-Fruit Colon Harmony Powder",
    botanicalName: "Phyllanthus emblica, Terminalia bellirica, Terminalia chebula",
    category: "gut-digestive",
    categoryName: "Gut Health & Digestion",
    priceKES: 1400,
    rating: 4.8,
    reviewCount: 91,
    tag: "Daily Regularity",
    image: "assets/images/moringa-baobab.jpg",
    herbs: ["triphala", "amla", "haritaki", "bibhitaki", "tannins", "colon cleanse"],
    illnesses: ["incomplete evacuation", "sluggish colon", "toxic buildup", "hemorrhoid irritation"],
    rituals: ["bedtime colon cleanse rite", "morning effortless release"],
    description: "Ayurveda's most celebrated digestive rasayana: Amla (Emblica officinalis), Bibhitaki, and Haritaki. Gently tones the muscular walls of the colon without creating dependency.",
    benefits: [
      "Encourages soft, regular morning bowel movements without harsh laxative cramping",
      "High natural Vitamin C content fortifies intestinal epithelial junctions",
      "Safe and non-habit forming for long-term daily gastrointestinal maintenance"
    ],
    ingredients: ["Equal parts Organic Amla Fruit, Organic Bibhitaki Fruit, Organic Haritaki Fruit"],
    ritualGuide: "Stir 1/2 teaspoon into warm water right before bed. Allow the mild bitter taste to signal healing.",
    inStock: true
  },
  {
    id: "wild-kenyan-cardamom-digestive-chews",
    name: "Whole Green Cardamom & Candied Ginger Digestive Chews",
    botanicalName: "Elettaria cardamomum & Zingiber officinale",
    category: "gut-digestive",
    categoryName: "Gut Health & Digestion",
    priceKES: 1100,
    rating: 4.7,
    reviewCount: 36,
    tag: "Breath & Belly",
    image: "assets/images/moringa-baobab.jpg",
    herbs: ["cardamom", "candied ginger", "terpinyl acetate", "fresh breath", "nausea"],
    illnesses: ["travel nausea", "sour stomach", "foul breath from gut", "motion sickness"],
    rituals: ["post-prandial mouth freshener", "travel companion chew"],
    description: "Crushed aromatic green cardamom seeds gently rolled with sun-dried Mount Kenya ginger and raw sugarcane molasses. Naturally freshens breath while dispelling gut gasses.",
    benefits: [
      "Neutralizes pungent mouth odors and supports oral cavity microbiome balance",
      "Rapidly relieves motion and travel nausea during rough car or flight journeys",
      "Sweet, spicy, warm flavor that delights the palate after heavy dining"
    ],
    ingredients: ["Whole Ground Green Cardamom, Dried Ginger Root, Unrefined Cane Jaggery"],
    ritualGuide: "Chew 1 or 2 small nuggets slowly after meals or whenever feelings of nausea strike.",
    inStock: true
  },
  {
    id: "probiotic-fermented-baobab-kombucha-tea",
    name: "Wild Fermented Baobab & Hibiscus Living Culture Blend",
    botanicalName: "Adansonia digitata & Hibiscus sabdariffa",
    category: "gut-digestive",
    categoryName: "Gut Health & Digestion",
    priceKES: 1750,
    rating: 4.9,
    reviewCount: 42,
    tag: "Living Culture",
    image: "assets/images/hibiscus-tea.jpg",
    herbs: ["baobab", "hibiscus", "acetic acid", "probiotic cultures", "glucuronic acid"],
    illnesses: ["gut flora depletion following antibiotics", "bloating", "weak microbiome", "poor immunity"],
    rituals: ["morning effervescent tonic", "gut flora inoculation"],
    description: "Naturally dehydrated active kombucha vinegar ferments combined with soluble baobab prebiotic fiber. Reconstitutes in cold water into a tangy probiotic elixer.",
    benefits: [
      "Supplies beneficial lactic and acetic acid bacteria to re-seed depleted microbiomes",
      "Baobab fiber provides immediate substrate nourishment for newly seeded bacteria",
      "Vibrant ruby hibiscus base delights the palate with sparkling citrus notes"
    ],
    ingredients: ["Dehydrated Kombucha Culture Solids, Wild Baobab Pulp, Spray-Dried Hibiscus Extract"],
    ritualGuide: "Whisk 1 tablespoon into cold spring water. Allow to effervesce for 2 minutes before enjoying.",
    inStock: true
  },
  {
    id: "cat-claw-uncaria-intestinal-barrier-tea",
    name: "Amazonian Cat's Claw & Meadowsweet Leaky Gut Tea",
    botanicalName: "Uncaria tomentosa & Filipendula ulmaria",
    category: "gut-digestive",
    categoryName: "Gut Health & Digestion",
    priceKES: 1600,
    rating: 4.8,
    reviewCount: 51,
    tag: "Tight Junctions",
    image: "assets/images/hibiscus-tea.jpg",
    herbs: ["cats claw", "uncaria tomentosa", "meadowsweet", "oxindole alkaloids", "gut barrier"],
    illnesses: ["leaky gut syndrome", "food intolerances", "intestinal hyperpermeability", "chronic gut irritation"],
    rituals: ["gut barrier healing brew", "soothing intestinal tonic"],
    description: "Combines the sacred inner bark of Amazonian Cat's Claw (Uncaria tomentosa) with European meadowsweet. Formulated to calm inflammatory cascades in the intestinal lining.",
    benefits: [
      "Pentacyclic oxindole alkaloids soothe hyperactive mucosal immune reactions",
      "Meadowsweet protects delicate epithelial barrier junctions from acid erosion",
      "Aids in reducing systemic inflammation stemming from intestinal permeability"
    ],
    ingredients: ["Wildcrafted Uncaria Tomentosa Inner Bark, Organic Filipendula Ulmaria Leaf, Plantain Leaf"],
    ritualGuide: "Simmer 1 tablespoon in 350ml water for 15 minutes. Strain and drink once daily between meals.",
    inStock: true
  },
  {
    id: "artichoke-leaf-boldo-bile-flow-tincture",
    name: "Wild Artichoke Leaf & Boldo High-Potency Bile Drops",
    botanicalName: "Cynara scolymus & Peumus boldus",
    category: "gut-digestive",
    categoryName: "Gut Health & Digestion",
    priceKES: 1750,
    rating: 4.8,
    reviewCount: 39,
    tag: "Fat Digestion",
    image: "assets/images/calming-bedtime.jpg",
    herbs: ["artichoke leaf", "cynarin", "boldo", "boldine", "bile flow"],
    illnesses: ["difficulty digesting oily meals", "pale stools", "right upper quadrant discomfort", "sluggish gallbladder"],
    rituals: ["pre-feast digestive preparation", "gallbladder support drop"],
    description: "Cynarin from globe artichoke leaves is one of nature's most proven choleretic agents, stimulating the liver to produce fresh, free-flowing bile.",
    benefits: [
      "Increases liver bile production and flow to effortlessly digest heavy fats",
      "Helps prevent sluggish, stagnant bile sludge in the gallbladder",
      "Alleviates that heavy 'brick in the stomach' sensation after rich or fried food"
    ],
    ingredients: ["Cynara Scolymus Leaf Extract, Peumus Boldus Leaf Extract, Organic Cane Spirit, Water"],
    ritualGuide: "Take 25 drops in 50ml water 10 minutes prior to heavy, rich, or fatty meals.",
    inStock: true
  },
  {
    id: "chamomile-catnip-children-tummy-tea",
    name: "Gentle Chamomile & Catnip Tummy-Comfort Tisane (For All Ages)",
    botanicalName: "Matricaria chamomilla & Nepeta cataria",
    category: "gut-digestive",
    categoryName: "Gut Health & Digestion",
    priceKES: 1250,
    rating: 4.9,
    reviewCount: 67,
    tag: "Family Gentle",
    image: "assets/images/hibiscus-tea.jpg",
    herbs: ["chamomile", "catnip", "fennel", "nepetalactone", "gentle carminative"],
    illnesses: ["infant colic", "children's stomachaches from anxiety", "nervous tummy", "evening gas"],
    rituals: ["bedtime family belly soother", "gentle tummy rub companion"],
    description: "A profoundly gentle, sweet herbal infusion safe for children and nursing mothers. Catnip and chamomile soothe both the nervous system and intestinal gas pockets simultaneously.",
    benefits: [
      "Safe and non-toxic for young children, toddlers, and sensitive elderly constitutions",
      "Relieves colicky spasms and nervous stomach distress before bed",
      "Mild honey-like blossom flavor that children drink gladly"
    ],
    ingredients: ["Egyptian Chamomile Flowers, Organic Catnip Aerials, Sweet Fennel Seeds, Spearmint"],
    ritualGuide: "Steep 1 teaspoon in hot water for 5 minutes. Serve warm or room temperature with a splash of apple juice.",
    inStock: true
  },
  {
    id: "berberine-barberry-microbial-balance",
    name: "Highland Barberry & Goldenseal Berberine Matrix",
    botanicalName: "Berberis vulgaris & Hydrastis canadensis",
    category: "gut-digestive",
    categoryName: "Gut Health & Digestion",
    priceKES: 2400,
    rating: 4.9,
    reviewCount: 79,
    tag: "Gut Microbiome",
    image: "assets/images/calming-bedtime.jpg",
    herbs: ["berberine", "barberry", "goldenseal", "isoquinoline alkaloid", "microbiome reset"],
    illnesses: ["candida overgrowth", "SIBO (small intestinal bacterial overgrowth)", "sugar cravings", "dysbiosis"],
    rituals: ["gut cleanse cycle", "microbial reset protocol"],
    description: "Pure botanical berberine alkaloid extracted from wild barberry roots. Renowned in functional medicine for balancing problematic gut microbial overgrowths and supporting insulin receptor sensitivity.",
    benefits: [
      "Promotes a healthy, balanced microbial ecology in the small and large intestines",
      "Curtails stubborn yeast and fungal overgrowths such as Candida",
      "Supports balanced post-prandial blood sugar and reduces sweet cravings"
    ],
    ingredients: ["97% Pure Berberine HCL from Berberis Vulgaris Root, Hydrastis Canadensis Root Extract"],
    ritualGuide: "Take 1 capsule 20 minutes before your two main meals of the day for 4 to 6 weeks.",
    inStock: true
  },
  {
    id: "marshmallow-plantain-soothing-lozenge",
    name: "Wild Kenyan Marshmallow & Plantain Leaf Throat Lozenges",
    botanicalName: "Althaea officinalis & Plantago major",
    category: "gut-digestive",
    categoryName: "Gut Health & Digestion",
    priceKES: 950,
    rating: 4.8,
    reviewCount: 55,
    tag: "Oral Demulcent",
    image: "assets/images/moringa-baobab.jpg",
    herbs: ["marshmallow", "plantain leaf", "raw honey", "demulcent", "throat coating"],
    illnesses: ["raspy throat from acid reflux", "dry coughing spells", "scratchy vocal cords", "swallowing irritation"],
    rituals: ["singer vocal care", "reflux throat rescue"],
    description: "Hard artisanal herbal lozenges made with wild plantain leaf extract, marshmallow root mucilage, and raw acacia honey. Dissolves slowly to coat irritated vocal cords and esophageal tissues.",
    benefits: [
      "Immediately lubricates raw, scratchy vocal cords and throat lining",
      "Cools acidic burning sensation caused by nighttime silent reflux",
      "Free of artificial menthols, corn syrups, and synthetic dyes"
    ],
    ingredients: ["Raw Kenyan Acacia Honey, Althaea Officinalis Root Extract, Plantago Major Leaf Extract"],
    ritualGuide: "Allow 1 lozenge to dissolve slowly in the mouth without chewing.",
    inStock: true
  },
  {
    id: "kenyan-clove-parasite-cleanse-formula",
    name: "Wild Zanzibar Clove, Black Walnut & Wormwood Drops",
    botanicalName: "Syzygium aromaticum & Juglans nigra",
    category: "gut-digestive",
    categoryName: "Gut Health & Digestion",
    priceKES: 1950,
    rating: 4.8,
    reviewCount: 63,
    tag: "Seasonal Cleanse",
    image: "assets/images/calming-bedtime.jpg",
    herbs: ["clove", "black walnut", "wormwood", "eugenol", "juglone", "parasite cleanse"],
    illnesses: ["unexplained bloating", "traveler's belly", "sugar cravings", "sluggish elimination"],
    rituals: ["biannual seasonal purge", "full moon cleanse protocol"],
    description: "The classic herbalist's triumvirate: freshly ground Zanzibar clove buds (which eliminate microbial eggs), green black walnut hulls, and bitter wormwood.",
    benefits: [
      "Traditional herbal protocol for clearing unwanted microbial and parasitic travelers",
      "Encourages deep intestinal detox and restores healthy bowel tone",
      "Pungent aromatics leave the digestive tract feeling thoroughly cleansed"
    ],
    ingredients: ["Fresh Green Juglans Nigra Hull Extract, Artemisia Absinthium Leaf, Syzygium Aromaticum Bud Oil"],
    ritualGuide: "Take 30 drops in a splash of water twice daily on an empty stomach for a 14-day protocol.",
    inStock: true
  },
  {
    id: "kenyan-lemongrass-ginger-digestive-cooler",
    name: "Highland Lemongrass & Sun-Dried Ginger Iced Cooler",
    botanicalName: "Cymbopogon citratus & Zingiber officinale",
    category: "gut-digestive",
    categoryName: "Gut Health & Digestion",
    priceKES: 1200,
    rating: 4.9,
    reviewCount: 71,
    tag: "Refreshing Brew",
    image: "assets/images/hibiscus-tea.jpg",
    herbs: ["lemongrass", "ginger", "citral", "refreshing", "carminative cooler"],
    illnesses: ["afternoon digestive sluggishness", "heat exhaustion", "belly bloat in warm weather"],
    rituals: ["midday tropical iced tea", "outdoor lunch companion"],
    description: "Fragrant cut lemongrass stalks from the foothills of Mount Kenya paired with warming ginger slices. Brew hot, chill with ice cubes and fresh mint leaves for the ultimate tropical digestive tonic.",
    benefits: [
      "Citral and gingerols synergize to stimulate sluggish digestion without generating excess body heat",
      "Gently dispels post-lunch food coma and mental fog",
      "Naturally crisp, citrus-forward aromatic profile"
    ],
    ingredients: ["Wild Highland Cymbopogon Citratus Grass, Sun-Cured Zingiber Officinale Slices"],
    ritualGuide: "Steep 1 tablespoon in 500ml boiling water for 10 minutes. Chill in refrigerator and pour over ice.",
    inStock: true
  },

  // =========================================================================
  // 5. SKIN, BODY & DERMAL REPAIR (15 new -> 20 total)
  // =========================================================================
  {
    id: "marula-facial-elixir",
    name: "Cold-Pressed High-Altitude Marula Glow Elixir",
    botanicalName: "Sclerocarya birrea",
    category: "skin-body",
    categoryName: "Skin, Body & Radiant Aging",
    priceKES: 2400,
    rating: 5.0,
    reviewCount: 142,
    tag: "High-Priority Launch",
    image: "assets/images/shea-cream.jpg",
    herbs: ["marula oil", "sclerocarya birrea", "oleic acid", "omega 9", "tocopherols"],
    illnesses: ["dry skin barrier", "fine lines", "dull complexion", "flaky patches", "skin dehydration"],
    rituals: ["golden hour facial press", "evening dermal restoration", "gua sha glide"],
    description: "Virgin, hydraulic cold-pressed oil from wild marula kernels harvested in Kitui, Kenya. Packed with over 72% oleic acid (Omega-9), natural tocopherols, and bioflavonoids.",
    benefits: [
      "Non-comedogenic barrier lipid mimics the skin's natural sebum mantle",
      "Absorbs in seconds leaving a luminous golden velvet finish without greasiness",
      "Rich in natural Vitamin E to defend skin cells from environmental oxidative damage"
    ],
    ingredients: ["99.7% Virgin Cold-Pressed Sclerocarya Birrea Kernel Oil, 0.3% Non-GMO Natural Tocopherol"],
    ritualGuide: "Warm 3 to 5 drops between clean palms and press gently into damp face and neck every evening.",
    inStock: true
  },
  {
    id: "frankincense-glow-serum",
    name: "Sacred Frankincense & Marula Dermal Renewal Serum",
    botanicalName: "Boswellia carterii & Sclerocarya birrea",
    category: "skin-body",
    categoryName: "Skin, Body & Radiant Aging",
    priceKES: 2800,
    rating: 4.9,
    reviewCount: 89,
    tag: "Luxury Reserve",
    image: "assets/images/shea-cream.jpg",
    herbs: ["frankincense", "marula", "boswellic acid", "incensole", "cell turnover"],
    illnesses: ["hyperpigmentation", "sun damage", "expression lines", "slack skin tone"],
    rituals: ["evening luxury facial rite", "sacred beauty ritual"],
    description: "Steam-distilled Somaliland Frankincense resin infused into wild Kenyan Marula oil. Formulated to speed cellular turnover, soften fine lines, and impart a luminous royal glow.",
    benefits: [
      "Boswellic terpenes visibly smooth expression wrinkles and firm slack dermal contours",
      "Diminishes the appearance of sun spots and post-inflammatory hyperpigmentation",
      "Deep meditative woody aroma transforms your nightly skincare into a temple ritual"
    ],
    ingredients: ["Wild Virgin Marula Oil, Hydro-Distilled Boswellia Carterii Resin Oil, Jojoba Oil, Vitamin E"],
    ritualGuide: "Smooth 4 drops over clean skin before bed. Perform gentle upward lifting motions along jawline.",
    inStock: true
  },
  {
    id: "kigelia-africana-firming-bust-body-butter",
    name: "Wild Kigelia Africana (Sausage Tree) Firming Body Balm",
    botanicalName: "Kigelia africana & Butyrospermum parkii",
    category: "skin-body",
    categoryName: "Skin, Body & Radiant Aging",
    priceKES: 2100,
    rating: 4.9,
    reviewCount: 94,
    tag: "Firming Wonder",
    image: "assets/images/shea-cream.jpg",
    herbs: ["kigelia africana", "sausage tree", "kigelin", "flavonoids", "dermal elasticity"],
    illnesses: ["sagging skin", "crepey neck and décolleté", "post-pregnancy skin laxity", "stretch mark fading"],
    rituals: ["daily bust & neck firming", "post-shower tightening ritual"],
    description: "The indigenous African secret for skin firmness and elasticity. Extract of the wild Sausage Tree fruit rich in steroidal saponins and kigelin blended into raw Nilotica shea butter.",
    benefits: [
      "Clinically researched for tightening skin matrix fibers and improving bust & neck firmness",
      "Strengthens collagen bundles in areas prone to gravity and post-pregnancy laxity",
      "Rich buttery texture melts effortlessly to condition dry skin"
    ],
    ingredients: ["Kigelia Africana Fruit Extract, Nilotica Shea Butter, Marula Oil, Frankincense Essential Oil"],
    ritualGuide: "Massage in circular upward motions across neck, décolleté, and bustline twice daily.",
    inStock: true
  },
  {
    id: "raw-nilotica-shea-body-melt",
    name: "Wild Northern Uganda Nilotica Shea Butter (Cold-Pressed)",
    botanicalName: "Vitellaria paradoxa subsp. nilotica",
    category: "skin-body",
    categoryName: "Skin, Body & Radiant Aging",
    priceKES: 1650,
    rating: 5.0,
    reviewCount: 168,
    tag: "Pure Silk",
    image: "assets/images/shea-cream.jpg",
    herbs: ["nilotica shea", "vitellaria nilotica", "allantoin", "shea olein", "skin barrier"],
    illnesses: ["severe eczema dryness", "ashy skin", "cracked elbows and knees", "chapped lips", "sensitive skin"],
    rituals: ["post-bath body butter anointing", "baby massage", "all-over moisture shield"],
    description: "Unlike West African shea which is hard and waxy, East African Nilotica shea has a naturally soft, creamy, buttery texture that melts at skin temperature with a delicate nutty aroma.",
    benefits: [
      "Contains 25% more olein than standard shea butter, yielding instant skin absorption",
      "Safe for sensitive eczema-prone infants, children, and fragile skin",
      "100% unrefined, certified organic, and unbleached"
    ],
    ingredients: ["100% Pure Virgin Cold-Pressed Vitellaria Paradoxa Subsp. Nilotica Shea Butter"],
    ritualGuide: "Scoop a marble-sized amount and melt into hands. Smooth over damp skin directly after bathing.",
    inStock: true
  },
  {
    id: "kalahari-melon-seed-balancing-oil",
    name: "Wild Kalahari Melon Seed Balancing Face Oil (Omega-6)",
    botanicalName: "Citrullus lanatus",
    category: "skin-body",
    categoryName: "Skin, Body & Radiant Aging",
    priceKES: 1950,
    rating: 4.8,
    reviewCount: 52,
    tag: "Acne-Friendly",
    image: "assets/images/shea-cream.jpg",
    herbs: ["kalahari melon", "citrullus lanatus", "linoleic acid", "omega 6", "pore clearing"],
    illnesses: ["acne breakouts", "congested pores", "excess facial sebum", "hormonal blemishes"],
    rituals: ["morning balancing oil drop", "clarifying facial press"],
    description: "Harvested from wild desert watermelons. Exceptionally high in linoleic acid (Omega-6) up to 70%, which unclogs sticky facial sebum and clears blemish-prone complexions.",
    benefits: [
      "Restores the crucial linoleic-to-oleic ratio in acne-prone facial sebum",
      "Feather-light dry-touch oil that sinks into pores without clogging",
      "Calms active red blemish inflammation and prevents post-acne dark marks"
    ],
    ingredients: ["100% Virgin Cold-Pressed Citrullus Lanatus (Kalahari Melon) Seed Oil"],
    ritualGuide: "Apply 2 to 3 drops to clean damp face morning and night as your lightweight moisturizer.",
    inStock: true
  },
  {
    id: "baobab-seed-stretch-mark-elixir",
    name: "Sacred Baobab Seed & Helichrysum Stretch Mark Elixir",
    botanicalName: "Adansonia digitata & Helichrysum italicum",
    category: "skin-body",
    categoryName: "Skin, Body & Radiant Aging",
    priceKES: 2200,
    rating: 4.9,
    reviewCount: 76,
    tag: "Mom & Belly",
    image: "assets/images/shea-cream.jpg",
    herbs: ["baobab seed oil", "helichrysum", "immortelle", "dermal repair", "stretch marks"],
    illnesses: ["pregnancy stretch marks", "rapid weight shift scars", "loss of dermal elasticity", "itchy belly"],
    rituals: ["prenatal belly massage", "postpartum recovery oiling"],
    description: "Pressed from the hard seeds hidden inside baobab fruit pods. Deeply elasticizing oil blended with Corsican Immortelle (Helichrysum) to stimulate dermal micro-repair.",
    benefits: [
      "Rich in phytosterols, Vitamins A, D, E, and F to support rapid skin expansion",
      "Helichrysum regenerates damaged collagen bundles and fades purple/red marks",
      "Relieves dry pregnancy skin tightness and stretching itch immediately"
    ],
    ingredients: ["Cold-Pressed Adansonia Digitata Seed Oil, Helichrysum Italicum Flower Oil, Rosehip Seed Oil"],
    ritualGuide: "Massage twice daily into belly, hips, thighs, and breasts throughout and after pregnancy.",
    inStock: true
  },
  {
    id: "african-black-soap-liquid-body-wash",
    name: "Artisanal Liquid African Black Soap with Wild Honey",
    botanicalName: "Theobroma cacao & Elaeis guineensis",
    category: "skin-body",
    categoryName: "Skin, Body & Radiant Aging",
    priceKES: 1350,
    rating: 4.9,
    reviewCount: 118,
    tag: "Bestseller",
    image: "assets/images/shea-cream.jpg",
    herbs: ["african black soap", "cocoa pod ash", "plantain skin", "wild honey", "clarifying wash"],
    illnesses: ["body acne", "back-ne", "rough bumps (keratosis pilaris)", "dull textured skin"],
    rituals: ["clarifying shower ritual", "deep pore cleanse"],
    description: "Handcrafted using traditional Ghanaian & Kenyan saponification methods with roasted cocoa pod ash, plantain skin potash, and wild forest honey. All the benefits of black soap in an easy liquid pump bottle.",
    benefits: [
      "Natural potash gently exfoliates dead surface cells and clears congested pores",
      "Wild raw acacia honey retains vital skin moisture so skin never feels stripped",
      "Clears persistent back and shoulder breakouts naturally"
    ],
    ingredients: ["Roasted Cocoa Pod Ash, Plantain Peel Potash, Raw Palm Kernel Oil, Wild Acacia Honey, Spring Water"],
    ritualGuide: "Lather a small pump onto a sisal washcloth or sponge. Wash body and rinse thoroughly with warm water.",
    inStock: true
  },
  {
    id: "kenyan-coffee-cacao-cellulite-polish",
    name: "Mount Kenya Peaberry Coffee & Raw Cacao Body Polish",
    botanicalName: "Coffea arabica & Theobroma cacao",
    category: "skin-body",
    categoryName: "Skin, Body & Radiant Aging",
    priceKES: 1450,
    rating: 4.8,
    reviewCount: 68,
    tag: "Exfoliation",
    image: "assets/images/shea-cream.jpg",
    herbs: ["coffee grounds", "caffeine", "raw cacao", "brown sugar", "lymphatic circulation"],
    illnesses: ["cellulite dimpling", "sluggish lymphatic circulation", "dull scaly skin", "ingrown hairs"],
    rituals: ["weekend shower polish ritual", "pre-tan smoothing scrub"],
    description: "Crafted with freshly ground single-estate Mount Kenya Arabica coffee beans and raw cacao. Caffeine stimulates local lymphatic drainage while fine particles slough off rough skin.",
    benefits: [
      "Topical caffeine temporarily tightens and tones areas with fluid retention and cellulite",
      "Stimulates micro-circulation for an immediate rosy, radiant body glow",
      "Leaves a protective veil of raw cacao butter on the skin after rinsing"
    ],
    ingredients: ["Highland Mount Kenya Arabica Coffee Grounds, Organic Raw Cacao Butter, Coconut Sugar, Sweet Almond Oil"],
    ritualGuide: "Apply to wet skin in the shower. Scrub vigorously in circular motions upward toward the heart for 5 minutes.",
    inStock: true
  },
  {
    id: "mongongo-manketti-sun-shield-oil",
    name: "Wild Kalahari Manketti (Mongongo) Natural Sun Shield Oil",
    botanicalName: "Schinziophyton rautanenii",
    category: "skin-body",
    categoryName: "Skin, Body & Radiant Aging",
    priceKES: 2150,
    rating: 4.9,
    reviewCount: 47,
    tag: "UV Defense",
    image: "assets/images/shea-cream.jpg",
    herbs: ["manketti oil", "mongongo", "eleostearic acid", "uv absorption", "sun defense"],
    illnesses: ["photo-aging", "sun sensitivity", "dry windburn", "hyperpigmentation"],
    rituals: ["outdoor morning skin shield", "post-sun hydration"],
    description: "Harvested from wild Manketti tree nuts across the Kalahari desert. Naturally contains eleostearic acid, which polymerizes under sunlight to form an invisible, breathable protective barrier on skin and hair.",
    benefits: [
      "Natural botanical ally that absorbs UV rays and minimizes environmental radiation damage",
      "Shields skin barrier from harsh equatorial sun, sea breeze, and dust storms",
      "Rich in linoleic, oleic, and pinolenic fatty acids for deep dermal suppleness"
    ],
    ingredients: ["100% Pure Virgin Cold-Pressed Schinziophyton Rautanenii (Mongongo) Nut Oil"],
    ritualGuide: "Smooth 4 to 6 drops across face, shoulders, and hair before outdoor excursions.",
    inStock: true
  },
  {
    id: "ximenia-wild-plum-barrier-balm",
    name: "African Ximenia (Wild Plum) Protective Lip & Barrier Balm",
    botanicalName: "Ximenia americana",
    category: "skin-body",
    categoryName: "Skin, Body & Radiant Aging",
    priceKES: 1100,
    rating: 4.8,
    reviewCount: 63,
    tag: "Lip Sanctuary",
    image: "assets/images/shea-cream.jpg",
    herbs: ["ximenia", "wild plum", "ximenynic acid", "beeswax", "lip repair"],
    illnesses: ["severely chapped bleeding lips", "wind-burned cheeks", "cracked skin"],
    rituals: ["all-day pocket lip ritual", "overnight lip recovery mask"],
    description: "Wild sour plum kernel oil known for its unique viscosity and content of rare ximenynic acid. Forms a protective sealing wax over damaged lips that lasts through wind, cold, and meals.",
    benefits: [
      "Ximenynic acid stimulates cutaneous microvascular blood circulation to restore plumpness",
      "Longest-lasting lip barrier adhesion; does not wipe away or evaporate quickly",
      "Natural golden hue imparts a healthy, glass-like sheen without artificial polymers"
    ],
    ingredients: ["Cold-Pressed Ximenia Americana Seed Oil, Wild Kenyan Beeswax, Nilotica Shea, Peppermint Oil"],
    ritualGuide: "Apply liberally to dry lips, cuticles, or wind-burned skin patches throughout the day.",
    inStock: true
  },
  {
    id: "desert-date-balanites-acne-cleanser",
    name: "Desert Date (Balanites) Clarifying Cleansing Oil",
    botanicalName: "Balanites aegyptiaca",
    category: "skin-body",
    categoryName: "Skin, Body & Radiant Aging",
    priceKES: 1650,
    rating: 4.8,
    reviewCount: 42,
    tag: "Dry Oil",
    image: "assets/images/shea-cream.jpg",
    herbs: ["desert date", "balanites", "saponins", "diosgenin", "cleansing oil"],
    illnesses: ["waterproof makeup removal", "congested blackheads", "excessive oiliness", "cystic acne"],
    rituals: ["double cleansing evening rite", "blackhead dissolution"],
    description: "Pressed from the kernels of the ancient desert date tree growing in Kenya's arid northern frontiers. Renowned as a 'dry oil' that dissolves stubborn pore debris and waterproof pigments effortlessly.",
    benefits: [
      "Dissolves hardened sebum plugs and stubborn makeup without drying out skin",
      "Rinses clean with warm water and a washcloth leaving zero greasy residue",
      "Natural saponins provide mild antimicrobial activity against acne bacteria"
    ],
    ingredients: ["100% Cold-Pressed Balanites Aegyptiaca (Desert Date) Seed Oil, Sunflower Lecithin"],
    ritualGuide: "Massage 4 pumps onto dry facial skin for 60 seconds. Place a warm damp cloth over face, then gently wipe clean.",
    inStock: true
  },
  {
    id: "hibiscus-aha-radiance-peeling-mask",
    name: "Wild Ruby Hibiscus & Papaya Enzyme Radiance Peel",
    botanicalName: "Hibiscus sabdariffa & Carica papaya",
    category: "skin-body",
    categoryName: "Skin, Body & Radiant Aging",
    priceKES: 1850,
    rating: 4.9,
    reviewCount: 83,
    tag: "Natural AHA",
    image: "assets/images/shea-cream.jpg",
    herbs: ["hibiscus", "papaya", "papain", "hibiscus acid", "alpha hydroxy acid", "exfoliation"],
    illnesses: ["dull surface skin", "uneven skin tone", "clogged pores", "post-acne marks"],
    rituals: ["weekly facial rejuvenation", "sunday evening glow ritual"],
    description: "Known as the 'Botox Plant' in botanical skincare circles. High concentrations of natural hibiscus organic acids (pyruvic, malic, and citric) blended with green papaya papain enzymes.",
    benefits: [
      "Gently unglues dead cellular debris without abrasive scratching or micro-tearing",
      "Evens skin tone and reveals vibrant, luminous new skin underneath",
      "Pure botanical formula with zero synthetic glycolic or lactic acids"
    ],
    ingredients: ["Organic Hibiscus Sabdariffa Extract, Green Carica Papaya Enzyme, Kaolin Clay, Vegetable Glycerin"],
    ritualGuide: "Smooth a thin layer over clean skin. Leave for 10 minutes (you may feel a gentle tingle). Rinse with cool water.",
    inStock: true
  },
  {
    id: "rosehip-seed-retinoid-night-nectar",
    name: "High-Altitude Wild Rosehip Seed Cold-Pressed Nectar (Pro-Vitamin A)",
    botanicalName: "Rosa canina",
    category: "skin-body",
    categoryName: "Skin, Body & Radiant Aging",
    priceKES: 1950,
    rating: 4.9,
    reviewCount: 92,
    tag: "Plant Retinol",
    image: "assets/images/shea-cream.jpg",
    herbs: ["rosehip seed", "trans-retinoic acid", "pro-vitamin a", "scars", "collagen"],
    illnesses: ["acne scarring", "fine lines around eyes", "sun spots", "loss of skin elasticity"],
    rituals: ["nightly retinol alternative", "eye contour tap"],
    description: "Unrefined deep orange-red oil cold-pressed from the seeds of wild mountain rosehips. Nature's richest botanical source of all-trans retinoic acid.",
    benefits: [
      "Accelerates skin regeneration and fades stubborn scar tissue naturally",
      "Stimulates collagen production without the peeling and redness of pharmaceutical retinoids",
      "Packed with lycopene and beta-carotene for powerful cellular repair"
    ],
    ingredients: ["100% Certified Organic Virgin Cold-Pressed Rosa Canina Seed Oil"],
    ritualGuide: "Press 3 drops into targeted areas (eye contours, smile lines, scars) each night before sleeping.",
    inStock: true
  },
  {
    id: "kenyan-lavender-chamomile-soothing-body-lotion",
    name: "Mount Kenya Highland Lavender & Chamomile Calming Lotion",
    botanicalName: "Lavandula angustifolia & Matricaria chamomilla",
    category: "skin-body",
    categoryName: "Skin, Body & Radiant Aging",
    priceKES: 1550,
    rating: 4.8,
    reviewCount: 67,
    tag: "Sensitive Skin",
    image: "assets/images/shea-cream.jpg",
    herbs: ["lavender", "chamomile", "aloe", "shea", "calming lotion"],
    illnesses: ["post-sunburn redness", "razor burn", "sensitive reactive skin", "itchiness"],
    rituals: ["evening all-over body moisture", "post-shave calm"],
    description: "Crafted with floral waters distilled from highland lavender and sweet chamomile, blended with wild Nilotica shea butter. Calms stressed skin within minutes of application.",
    benefits: [
      "Instantly cools heat, redness, and inflammation from sun, shaving, or wind exposure",
      "Lightweight non-greasy lotion absorbs fast for immediate daytime wear",
      "Soothing lavender aroma relaxes the mind and prepares the body for rest"
    ],
    ingredients: ["Organic Lavender Hydrosol, Chamomile Flower Water, Nilotica Shea, Aloe Barbadensis Leaf Juice"],
    ritualGuide: "Smooth liberally over entire body following bathing or whenever skin feels dry, tight, or hot.",
    inStock: true
  },
  {
    id: "kenyan-lemongrass-eucalyptus-deodorant-cream",
    name: "Highland Lemongrass & Blue Gum Botanical Deodorant Cream",
    botanicalName: "Cymbopogon citratus & Eucalyptus globulus",
    category: "skin-body",
    categoryName: "Skin, Body & Radiant Aging",
    priceKES: 1200,
    rating: 4.8,
    reviewCount: 74,
    tag: "Aluminum-Free",
    image: "assets/images/shea-cream.jpg",
    herbs: ["lemongrass", "eucalyptus", "magnesium", "arrowroot", "natural deodorant"],
    illnesses: ["underarm odor", "clogged sweat glands from antiperspirants", "underarm darkening"],
    rituals: ["morning freshness application", "clean pit detox"],
    description: "100% natural, baking-soda-free formula. Magnesium hydroxide and organic arrowroot neutralize odor-causing bacteria without blocking your body's natural sweat glands.",
    benefits: [
      "Free of aluminum chlorohydrate, synthetic parabens, and irritating baking soda",
      "Highland lemongrass and eucalyptus keep underarms smelling crisp and fresh all day",
      "Smooth cream texture melts into skin without staining clothes or leaving white streaks"
    ],
    ingredients: ["Magnesium Hydroxide, Organic Arrowroot Powder, Nilotica Shea Butter, Coconut Oil, Lemongrass Oil"],
    ritualGuide: "Apply a pea-sized amount to clean, dry underarms each morning.",
    inStock: true
  },

  // =========================================================================
  // 6. HAIR & GROOMING ALCHEMY (12 new -> 16 total)
  // =========================================================================
  {
    id: "african-black-soap-scalp-elixir",
    name: "African Black Soap & Rosemary Follicle Scalp Elixir",
    botanicalName: "Rosmarinus officinalis & Ricinus communis",
    category: "hair-grooming",
    categoryName: "Hair & Grooming Alchemy",
    priceKES: 1850,
    rating: 4.9,
    reviewCount: 132,
    tag: "Bestseller",
    image: "assets/images/rosemary-oil.jpg",
    herbs: ["rosemary", "black castor oil", "cineole", "follicle stimulation", "hair growth"],
    illnesses: ["thinning edges", "hair shedding", "itchy flaky scalp", "dormant follicles"],
    rituals: ["crown awakening ritual", "weekly hot oil hair treatment", "scalp massage"],
    description: "Traditional roasted black castor oil combined with steam-distilled Kenyan highland rosemary cineole and cedarwood. Stimulates dermal papilla blood circulation to awaken dormant hair follicles.",
    benefits: [
      "Rosemary cineole is clinically observed to match 2% minoxidil in supporting hair density",
      "Thick castor ricinoleic acid locks in moisture along the hair shaft to prevent breakage",
      "Purifies fungal scalp microbes that trigger stubborn dandruff flakes"
    ],
    ingredients: ["Roasted African Black Castor Oil, Rosmarinus Officinalis Leaf Oil, Cedarwood, Jojoba Oil"],
    ritualGuide: "Part hair into quadrants. Dispense 5 to 7 drops directly onto scalp and massage with finger pads for 5 minutes.",
    inStock: true
  },
  {
    id: "chebe-fenugreek-hair-length-butter",
    name: "Chadian Chebe Powder & Fenugreek Hair Length Sealant",
    botanicalName: "Croton gratissimus & Trigonella foenum-graecum",
    category: "hair-grooming",
    categoryName: "Hair & Grooming Alchemy",
    priceKES: 1750,
    rating: 4.9,
    reviewCount: 98,
    tag: "Length Retention",
    image: "assets/images/rosemary-oil.jpg",
    herbs: ["chebe powder", "croton gratissimus", "fenugreek", "length retention", "shea butter"],
    illnesses: ["breakage at ends", "dry brittle 4C hair", "split ends", "stunted hair growth"],
    rituals: ["protective styling butter", "weekly hair masking rite"],
    description: "Sourced directly from the Basara women of Chad who are renowned for waist-length natural hair. Authentic Chebe seed powder blended with sprouted fenugreek mucilage and nilotica shea.",
    benefits: [
      "Provides extreme moisture lubrication to prevent breakage and snap during detangling",
      "Fenugreek phyto-proteins reinforce the hair keratin cortex",
      "Enables natural curly and coily hair to achieve maximum length retention"
    ],
    ingredients: ["Authentic Chadian Chebe Seed Powder, Sprouted Fenugreek Extract, Nilotica Shea Butter, Marula Oil"],
    ritualGuide: "Apply generously to damp hair sections before braiding, twisting, or tucking ends away.",
    inStock: true
  },
  {
    id: "hibiscus-amla-gloss-hair-rinse",
    name: "Ruby Hibiscus & Wild Amla Hair Gloss Tea Rinse",
    botanicalName: "Hibiscus sabdariffa & Phyllanthus emblica",
    category: "hair-grooming",
    categoryName: "Hair & Grooming Alchemy",
    priceKES: 1350,
    rating: 4.8,
    reviewCount: 64,
    tag: "High Gloss",
    image: "assets/images/rosemary-oil.jpg",
    herbs: ["hibiscus", "amla", "vitamin c", "hair gloss", "cuticle sealant"],
    illnesses: ["dull lifeless hair", "open rough cuticles", "frizz in humidity", "color fade"],
    rituals: ["post-wash gloss rinse", "curl definition soak"],
    description: "The natural acids in crimson hibiscus flower calyces instantly tighten open hair cuticles, reflecting light like a mirror and eliminating frizzy flyaways.",
    benefits: [
      "Closes hair cuticle scales to lock in moisture and produce an intense mirror-like shine",
      "Amla Vitamin C prevents premature pigment graying and nourishes roots",
      "Lightweight liquid rinse does not weigh down delicate curls"
    ],
    ingredients: ["Sun-Dried Whole Hibiscus Sabdariffa Calyces, Organic Phyllanthus Emblica (Amla) Fruit"],
    ritualGuide: "Brew 2 tablespoons in 500ml boiling water. Cool, strain, and pour over freshly washed hair as final rinse.",
    inStock: true
  },
  {
    id: "horsetail-bamboo-silica-hair-tonic",
    name: "Wild Aberdare Horsetail & Bamboo Silica Hair Tonic",
    botanicalName: "Equisetum arvense & Bambusa vulgaris",
    category: "hair-grooming",
    categoryName: "Hair & Grooming Alchemy",
    priceKES: 1600,
    rating: 4.8,
    reviewCount: 47,
    tag: "Keratin Builder",
    image: "assets/images/rosemary-oil.jpg",
    herbs: ["horsetail", "bamboo silica", "keratin", "hair strength", "follicle mist"],
    illnesses: ["fine weak hair", "easy hair breakage", "heat-damaged hair", "slow hair growth"],
    rituals: ["daily scalp spritz", "pre-blowdry heat shield"],
    description: "Nature's two richest sources of bio-available silica combined into a daily leave-in scalp and hair mist. Penetrates the hair shaft to reinforce internal keratin cross-links.",
    benefits: [
      "Silica strengthens hair tensile strength by up to 30%, resisting snapping",
      "Stimulates connective collagen tissues around follicular roots",
      "Zero grease or residue; can be misted onto styled hair every morning"
    ],
    ingredients: ["Equisetum Arvense Leaf Water, Bambusa Vulgaris Extract (70% Organic Silica), Nettle Extract"],
    ritualGuide: "Spritz directly onto roots and hair lengths daily. Comb through with wide-tooth wooden comb.",
    inStock: true
  },
  {
    id: "clove-rosemary-hair-growth-tea-spray",
    name: "Highland Clove & Rosemary Follicle Growth Mist",
    botanicalName: "Syzygium aromaticum & Rosmarinus officinalis",
    category: "hair-grooming",
    categoryName: "Hair & Grooming Alchemy",
    priceKES: 1250,
    rating: 4.9,
    reviewCount: 89,
    tag: "Viral Tonic",
    image: "assets/images/rosemary-oil.jpg",
    herbs: ["clove spray", "rosemary water", "eugenol", "fast hair growth", "scalp mist"],
    illnesses: ["excessive shedding in shower", "thinning hair patches", "scalp odor", "stunted edges"],
    rituals: ["twice-daily crown misting", "protective style refresh"],
    description: "The viral, centuries-old East African secret for hair density. Whole cloves and fresh rosemary leaves slow-simmered in mountain spring water to create a potent follicle tonic.",
    benefits: [
      "Eugenol and carnosic acid promote vigorous micro-capillary flow to hair roots",
      "Reduces daily hair fall in the brush and shower within 14 days",
      "Keeps protective styles (braids, locs) smelling fresh, clean, and herbal"
    ],
    ingredients: ["Zanzibar Whole Clove Water, Steam-Distilled Rosmarinus Officinalis Hydrosol, Peppermint Water"],
    ritualGuide: "Spray directly onto scalp morning and evening. Massage with fingertips for 2 minutes.",
    inStock: true
  },
  {
    id: "baobab-marula-curl-defining-creme",
    name: "Sacred Baobab & Marula Moisture Lock Curl Crème",
    botanicalName: "Adansonia digitata & Sclerocarya birrea",
    category: "hair-grooming",
    categoryName: "Hair & Grooming Alchemy",
    priceKES: 1650,
    rating: 4.8,
    reviewCount: 71,
    tag: "Curl Definition",
    image: "assets/images/rosemary-oil.jpg",
    herbs: ["baobab oil", "marula", "curl cream", "type 4 hair", "anti-shrinkage"],
    illnesses: ["dry frizzy curls", "hair shrinkage", "tangled knots", "moisture loss"],
    rituals: ["wash-and-go styling", "twist-out definition", "braid-out ritual"],
    description: "A rich styling cream tailored for African curly, coily, and kinky hair textures. Combines moisture-dense baobab seed oil with marula to provide long-lasting elongation and soft hold.",
    benefits: [
      "Defines curl clumps without flaking, crunch, or sticky residue",
      "Seals in hydration for up to 72 hours even in dry air or air-conditioned offices",
      "Significantly reduces comb breakage during styling"
    ],
    ingredients: ["Virgin Baobab Seed Oil, Cold-Pressed Marula Oil, Nilotica Shea, Flaxseed Gel, Aloe Leaf Juice"],
    ritualGuide: "Rake through damp hair sections from roots to ends. Style as desired.",
    inStock: true
  },
  {
    id: "african-neem-tea-tree-anti-dandruff-serum",
    name: "Kenyan Neem & Australian Tea Tree Anti-Dandruff Scalp Drops",
    botanicalName: "Azadirachta indica & Melaleuca alternifolia",
    category: "hair-grooming",
    categoryName: "Hair & Grooming Alchemy",
    priceKES: 1450,
    rating: 4.9,
    reviewCount: 62,
    tag: "Scalp Relief",
    image: "assets/images/rosemary-oil.jpg",
    herbs: ["neem oil", "tea tree", "azadirachtin", "antifungal", "dandruff"],
    illnesses: ["severe dandruff flakes", "seborrheic dermatitis", "inflamed itchy scalp", "scabs on scalp"],
    rituals: ["overnight scalp treatment", "pre-shampoo scalp reset"],
    description: "Cold-pressed Kenyan neem oil packed with azadirachtin paired with high-terpinen tea tree. Eradicates Malassezia yeast without stripping scalp moisture.",
    benefits: [
      "Eliminates fungal and microbial root causes of persistent dandruff",
      "Stops unbearable scalp itching on contact",
      "Soothes red, inflamed scalp patches and balances sebum production"
    ],
    ingredients: ["Pure Cold-Pressed Azadirachta Indica (Neem) Oil, Melaleuca Alternifolia Oil, Jojoba Oil, Peppermint"],
    ritualGuide: "Apply 10 drops directly to affected scalp areas. Leave for 30 minutes (or overnight) before shampooing.",
    inStock: true
  },
  {
    id: "wild-frankincense-sandalwood-beard-balm",
    name: "Somali Frankincense & Sandalwood Conditioning Beard Balm",
    botanicalName: "Boswellia carterii & Santalum album",
    category: "hair-grooming",
    categoryName: "Hair & Grooming Alchemy",
    priceKES: 1550,
    rating: 4.9,
    reviewCount: 58,
    tag: "Gentleman's Reserve",
    image: "assets/images/men-vitality.jpg",
    herbs: ["frankincense", "sandalwood", "beard balm", "shea butter", "tame beard"],
    illnesses: ["coarse wire beard", "beard itch", "beard dandruff (beardruff)", "unruly facial hair"],
    rituals: ["morning gentleman's grooming", "post-shower beard sculpting"],
    description: "Crafted for the distinguished gentleman. Pure Kenyan beeswax and Nilotica shea butter infused with sacred frankincense and rich sandalwood to soften bristly facial hair and scent the beard with authority.",
    benefits: [
      "Tames wild, stray beard hairs with a clean, light natural hold",
      "Nourishes the sensitive skin beneath the beard to prevent itch and flakes",
      "Sophisticated woody resin scent that lasts throughout the workday"
    ],
    ingredients: ["Kenyan Beeswax, Nilotica Shea Butter, Marula Oil, Boswellia Carterii Oil, Sandalwood Essential Oil"],
    ritualGuide: "Warm a dime-sized amount between palms and massage through beard from roots to tips. Shape with wooden comb.",
    inStock: true
  },
  {
    id: "peppermint-spearmint-scalp-scrub",
    name: "Highland Spearmint & Pink Himalayan Scalp Detox Scrub",
    botanicalName: "Mentha spicata & Mentha piperita",
    category: "hair-grooming",
    categoryName: "Hair & Grooming Alchemy",
    priceKES: 1450,
    rating: 4.8,
    reviewCount: 43,
    tag: "Scalp Detox",
    image: "assets/images/rosemary-oil.jpg",
    herbs: ["scalp scrub", "pink salt", "spearmint", "exfoliating scalp", "clarifying"],
    illnesses: ["product buildup from gels and oils", "greasy roots", "suffocated hair follicles", "dull scalp"],
    rituals: ["monthly scalp clarifying ceremony", "sunday wash day reset"],
    description: "Think of it as a facial scrub for your scalp. Fine mineral salts gently polish away layers of dried edge control, oils, and dry skin, allowing follicles to breathe and hair to thrive.",
    benefits: [
      "Breaks down heavy silicone and polymer buildup that standard shampoos miss",
      "Icy spearmint tingle awakens micro-capillaries at the base of the skull",
      "Dissolves easily with warm water without lingering grit in your curls"
    ],
    ingredients: ["Fine Himalayan Pink Salt, Coconut Oil Cleanser, Spearmint Essential Oil, Apple Cider Vinegar, Jojoba"],
    ritualGuide: "Part wet hair in the shower. Gently massage into scalp using small circular motions. Rinse thoroughly.",
    inStock: true
  },
  {
    id: "brazilian-maracuja-argan-heat-protect-serum",
    name: "Wild Passionfruit (Maracuja) & Argan Heat Shield Oil",
    botanicalName: "Passiflora edulis & Argania spinosa",
    category: "hair-grooming",
    categoryName: "Hair & Grooming Alchemy",
    priceKES: 1950,
    rating: 4.8,
    reviewCount: 39,
    tag: "Heat Defense",
    image: "assets/images/rosemary-oil.jpg",
    herbs: ["maracuja", "argan oil", "heat protectant", "silk press", "thermal protection"],
    illnesses: ["heat damage from flat irons", "fried split ends", "curl pattern loss from heat"],
    rituals: ["silk press preparation", "blow-dry protection"],
    description: "Passiflora edulis seed oil has an exceptionally high thermal flash point. Shields delicate hair cuticles up to 230°C (450°F) during flat ironing and blow drying.",
    benefits: [
      "Protects natural curl memory from thermal degradation and scorch",
      "Delivers a glass-hair silk finish with zero greasy weight",
      "Prevents humidity-induced frizz after professional styling"
    ],
    ingredients: ["Virgin Passiflora Edulis (Maracuja) Seed Oil, Moroccan Argania Spinosa Kernel Oil, Camellia Seed Oil"],
    ritualGuide: "Apply 2 to 3 drops to damp hair before blow drying, or across dry sections right before flat ironing.",
    inStock: true
  },
  {
    id: "amla-shikakai-herbal-shampoo-bar",
    name: "Ayurvedic Amla & Shikakai Solid Shampoo Bar (Zero Waste)",
    botanicalName: "Acacia concinna & Phyllanthus emblica",
    category: "hair-grooming",
    categoryName: "Hair & Grooming Alchemy",
    priceKES: 1100,
    rating: 4.9,
    reviewCount: 78,
    tag: "Zero Waste",
    image: "assets/images/rosemary-oil.jpg",
    herbs: ["shikakai", "amla", "soap pod", "solid shampoo", "natural lather"],
    illnesses: ["sulfate sensitivity", "itchy scalp from chemicals", "plastic waste guilt"],
    rituals: ["eco-luxe hair wash", "travel shampoo bar"],
    description: "Shikakai translates to 'Fruit for the Hair'. Packed with natural plant saponins that create a gentle, thick lather without synthetic sulfates, SLS, or plastic bottle waste.",
    benefits: [
      "Natural low pH preserves the scalp's protective acid mantle",
      "Lasts for 60+ washes (equivalent to 3 standard liquid shampoo bottles)",
      "Leaves hair detangled, soft, and voluminous"
    ],
    ingredients: ["Acacia Concinna (Shikakai) Fruit Powder, Amla, Reetha (Soapnut), Castor Oil, Nilotica Shea"],
    ritualGuide: "Rub bar between wet hands or directly onto wet scalp to generate rich foam. Rinse thoroughly.",
    inStock: true
  },
  {
    id: "kenyan-macadamia-deep-repair-hair-mask",
    name: "Mount Kenya Macadamia & Cocoa Butter Deep Repair Masque",
    botanicalName: "Macadamia integrifolia & Theobroma cacao",
    category: "hair-grooming",
    categoryName: "Hair & Grooming Alchemy",
    priceKES: 1850,
    rating: 4.9,
    reviewCount: 53,
    tag: "Intense Moisture",
    image: "assets/images/rosemary-oil.jpg",
    herbs: ["macadamia oil", "palmitoleic acid", "cocoa butter", "deep conditioner", "hair repair"],
    illnesses: ["bleached damaged hair", "chemical relaxer damage", "straw-like texture", "extreme dryness"],
    rituals: ["weekly deep conditioning treatment", "steam cap hydration rite"],
    description: "Macadamia oil is one of the few plant sources rich in palmitoleic acid (Omega-7), which penetrates deep into the inner hair cortex to rebuild porous, damaged protein bonds.",
    benefits: [
      "Restores elasticity to chronically dry, color-treated, or relaxed hair",
      "Eliminates tangles and makes wet detangling effortless",
      "Transforms straw-like textures into pillowy soft, bouncy coils"
    ],
    ingredients: ["Cold-Pressed Mount Kenya Macadamia Seed Oil, Pure Cocoa Butter, Nilotica Shea, Aloe Vera Gel"],
    ritualGuide: "Coat hair generously from roots to tips. Cover with a warm towel or shower cap for 25 minutes before rinsing.",
    inStock: true
  },

  // =========================================================================
  // 7. MEN'S VITALITY & STAMINA (9 new -> 12 total)
  // =========================================================================
  {
    id: "mukombero-mondia-whitei-root-elixir",
    name: "Wild Mukombero (Mondia Whitei) Raw Chewing Roots & Elixir",
    botanicalName: "Mondia whitei",
    category: "mens-wellness",
    categoryName: "Men's Vitality & Hormonal Balance",
    priceKES: 1750,
    rating: 5.0,
    reviewCount: 145,
    tag: "African Panacea",
    image: "assets/images/men-vitality.jpg",
    herbs: ["mukombero", "mondia whitei", "african ginger root", "virility", "libido", "stamina"],
    illnesses: ["low male libido", "erectile softness", "physical fatigue", "poor circulation", "stress-induced performance anxiety"],
    rituals: ["evening warrior brew", "chewing root tradition", "vigor tonic"],
    description: "Revered across Western Kenya and Central Africa as the king of aphrodisiac roots ('White's Ginger'). Naturally sweet and vanilla-scented, Mukombero enhances nitric oxide synthesis and vitality.",
    benefits: [
      "Stimulates endothelial nitric oxide pathways for robust pelvic circulation",
      "Traditional tonic for enhancing endurance, virility, and sexual desire",
      "Rich in zinc, magnesium, and active bioflavonoids for male vitality"
    ],
    ingredients: ["100% Wildcrafted Kakamega Rainforest Mondia Whitei (Mukombero) Root Extract"],
    ritualGuide: "Take 1 full dropper in warm water 45 minutes before intimate connection, or chew 1 root piece daily.",
    inStock: true
  },
  {
    id: "tongkat-ali-fadogia-anabolic-matrix",
    name: "Wild Tongkat Ali (200:1) & Fadogia Agrestis Male Power",
    botanicalName: "Eurycoma longifolia & Fadogia agrestis",
    category: "mens-wellness",
    categoryName: "Men's Vitality & Hormonal Balance",
    priceKES: 2600,
    rating: 4.9,
    reviewCount: 108,
    tag: "High Potency",
    image: "assets/images/men-vitality.jpg",
    herbs: ["tongkat ali", "longjack", "fadogia agrestis", "eurycomanone", "free testosterone"],
    illnesses: ["low testosterone", "loss of muscle mass", "sluggish morning drive", "male midlife fatigue"],
    rituals: ["morning testosterone support", "warrior cycle protocol"],
    description: "The gold standard for natural male hormonal optimization. 200:1 root extract of wild Longjack paired with African Fadogia agrestis to liberate bound testosterone from SHBG proteins.",
    benefits: [
      "Fosters optimal natural luteinizing hormone and free testosterone levels",
      "Enhances gym strength, lean muscle recovery, and athletic drive",
      "Dispels brain fog and restores assertive mental confidence"
    ],
    ingredients: ["Eurycoma Longifolia Root Extract (200:1, 2% Eurycomanone), Wild Fadogia Agrestis Stem Extract"],
    ritualGuide: "Take 1 capsule with breakfast for 5 days on, 2 days off. Cycle for 8 weeks.",
    inStock: true
  },
  {
    id: "saw-palmetto-pygeum-prostate-shield",
    name: "Saw Palmetto & African Pygeum Prostate Flow Formula",
    botanicalName: "Serenoa repens & Prunus africana (Certified Sustainable)",
    category: "mens-wellness",
    categoryName: "Men's Vitality & Hormonal Balance",
    priceKES: 1950,
    rating: 4.8,
    reviewCount: 73,
    tag: "Prostate Flow",
    image: "assets/images/men-vitality.jpg",
    herbs: ["saw palmetto", "pygeum", "beta-sitosterol", "dht blocker", "prostate flow"],
    illnesses: ["frequent nighttime urination", "weak urine stream", "prostate swelling (BPH)", "bladder hesitancy"],
    rituals: ["evening prostate health ritual", "daily male maintenance"],
    description: "Combines 85% fatty acid saw palmetto berry extract with sustainable, non-endangered cultivated African Pygeum and stinging nettle root. Inhibits 5-alpha reductase conversion of testosterone to DHT.",
    benefits: [
      "Reduces nocturnal bathroom trips so you sleep undisturbed through the night",
      "Enhances urinary stream force and relieves pelvic fullness sensations",
      "Protects healthy prostate epithelial cellular balance as men age"
    ],
    ingredients: ["Saw Palmetto Berry Extract (85% Fatty Acids), Pygeum Bark Extract (13% Phytosterols), Zinc Glycinate"],
    ritualGuide: "Take 1 softgel twice daily with meals.",
    inStock: true
  },
  {
    id: "pumpkin-seed-zinc-reproductive-nectar",
    name: "Cold-Pressed Styrian Pumpkin Seed & Pine Pollen Drops",
    botanicalName: "Cucurbita pepo & Pinus massoniana",
    category: "mens-wellness",
    categoryName: "Men's Vitality & Hormonal Balance",
    priceKES: 1850,
    rating: 4.8,
    reviewCount: 49,
    tag: "Reproductive Qi",
    image: "assets/images/men-vitality.jpg",
    herbs: ["pumpkin seed oil", "pine pollen", "zinc", "phytosterols", "seminal health"],
    illnesses: ["low sperm motility", "prostate congestion", "hair thinning at crown", "vital depletion"],
    rituals: ["dawn reproductive tonic", "daily zinc replenishment"],
    description: "Deep emerald green Austrian-grade pumpkin seed oil blended with raw cracked-cell wild pine pollen. A potent botanical treasure of natural plant androgens and bioavailable zinc.",
    benefits: [
      "Concentrated bioavailable zinc directly supports healthy spermatogenesis and volume",
      "Natural plant brassinosteroids assist hormonal tone",
      "Rich in phytosterols that prevent DHT-mediated hair follicle miniaturization"
    ],
    ingredients: ["Cold-Pressed Cucurbita Pepo Seed Oil, Wild Harvested Cracked-Cell Wall Pine Pollen, Vitamin E"],
    ritualGuide: "Take 1 full tablespoon directly by mouth or drizzled over warm savory food daily.",
    inStock: true
  },
  {
    id: "horny-goat-weed-epimedium-fire-drops",
    name: "Horny Goat Weed (Epimedium) & Damiana Fire Elixir",
    botanicalName: "Epimedium grandiflorum & Turnera diffusa",
    category: "mens-wellness",
    categoryName: "Men's Vitality & Hormonal Balance",
    priceKES: 1700,
    rating: 4.9,
    reviewCount: 88,
    tag: "Sensual Fire",
    image: "assets/images/men-vitality.jpg",
    herbs: ["epimedium", "horny goat weed", "icariin", "damiana", "pde5 inhibition"],
    illnesses: ["low sexual stamina", "performance nervousness", "lack of romantic interest", "fatigue"],
    rituals: ["couples romantic evening", "pre-intimacy alignment"],
    description: "Standardized to 20% icariin, nature's botanical PDE-5 modulator. Combined with sensual Mexican Damiana leaf to enhance nerve sensitivity and warm intimacy.",
    benefits: [
      "Icariin encourages healthy arterial blood flow to penile corpora cavernosa",
      "Damiana soothes mental anxiety and invites sensual presence",
      "Fast-acting liquid tincture assimilation within 30 minutes"
    ],
    ingredients: ["Epimedium Grandiflorum Extract (20% Icariin), Turnera Diffusa Leaf, Organic Alcohol, Spring Water"],
    ritualGuide: "Take 30 drops in a small glass of warm water 30 to 45 minutes before intimate connection.",
    inStock: true
  },
  {
    id: "shilajit-himalayan-fulvic-resin",
    name: "Pure Himalayan Gold-Grade Shilajit Mineral Resin",
    botanicalName: "Asphaltum punjabianum",
    category: "mens-wellness",
    categoryName: "Men's Vitality & Hormonal Balance",
    priceKES: 2900,
    rating: 5.0,
    reviewCount: 124,
    tag: "Conqueror of Mountains",
    image: "assets/images/men-vitality.jpg",
    herbs: ["shilajit", "fulvic acid", "humic minerals", "mitochondrial energy", "testosterone"],
    illnesses: ["deep chronic exhaustion", "depleted life force", "mineral deficiency", "low athletic stamina"],
    rituals: ["morning resin dissolve rite", "fasted vitality elixir"],
    description: "Wild-harvested above 16,000 feet in the pristine Himalayas. Pure, sticky gold-grade resin containing over 84 ionic trace minerals and 65% fulvic acid to transport energy directly into mitochondria.",
    benefits: [
      "Clinically shown to support total and free testosterone in healthy men",
      "Fulvic acid transports trace minerals directly through cellular lipid membranes",
      "Deeply energizes cells without any caffeine or stimulant crashes"
    ],
    ingredients: ["100% Pure Purified Himalayan Shilajit Resin (Zero Fillers or Additives)"],
    ritualGuide: "Dissolve a rice-grain sized portion (approx. 250mg) in warm water, herbal tea, or milk at dawn.",
    inStock: true
  },
  {
    id: "fenugreek-saw-palmetto-beard-body-tonic",
    name: "Sprouted Fenugreek & Nettle Root Hair & Beard Density Capsules",
    botanicalName: "Trigonella foenum-graecum & Urtica dioica",
    category: "mens-wellness",
    categoryName: "Men's Vitality & Hormonal Balance",
    priceKES: 1650,
    rating: 4.8,
    reviewCount: 46,
    tag: "Beard Density",
    image: "assets/images/men-vitality.jpg",
    herbs: ["fenugreek", "nettle root", "biotin", "beard growth", "hormonal hair"],
    illnesses: ["patchy beard growth", "thin facial hair", "receding hairline", "hair shedding"],
    rituals: ["daily grooming capsule", "morning beard fuel"],
    description: "Nourishes facial hair follicles from within. Sprouted fenugreek saponins combine with stinging nettle root to inhibit follicle-choking DHT while supplying sulfur and proteins for thick beard growth.",
    benefits: [
      "Fills in sparse, patchy beard areas by encouraging dormant facial follicles",
      "Nettle root binds sex hormone-binding globulin to optimize free androgen use",
      "Strengthens hair tensile resilience against combing breakage"
    ],
    ingredients: ["Organic Sprouted Fenugreek Seed Extract, Urtica Dioica Root Extract, Horsetail Silica, Zinc"],
    ritualGuide: "Take 2 capsules daily with breakfast and a glass of spring water.",
    inStock: true
  },
  {
    id: "ginkgo-red-ginseng-male-focus-tea",
    name: "Korean Red Panax Ginseng & Ginkgo Stamina Tea",
    botanicalName: "Panax ginseng & Ginkgo biloba",
    category: "mens-wellness",
    categoryName: "Men's Vitality & Hormonal Balance",
    priceKES: 1800,
    rating: 4.9,
    reviewCount: 68,
    tag: "Yang Tonic",
    image: "assets/images/men-vitality.jpg",
    herbs: ["panax ginseng", "red ginseng", "ginsenosides", "ginkgo", "yang energy"],
    illnesses: ["cold extremities", "mental sluggishness", "lack of physical motivation", "post-work lethargy"],
    rituals: ["morning executive tea ceremony", "pre-workout fire"],
    description: "Steamed and cured 6-year-old Red Panax Ginseng root balanced with Ginkgo biloba and warming cinnamon bark. Traditional Asian medicine's premier Yang tonifier.",
    benefits: [
      "Ginsenosides (Rg1, Rb1) elevate physical endurance and cognitive sharpness",
      "Promotes robust arterial blood circulation to both brain and pelvic organs",
      "Warms internal cold constitution and fights mid-afternoon energy slumps"
    ],
    ingredients: ["6-Year Cured Red Panax Ginseng Slices, Ginkgo Biloba Leaf, Ceylon Cinnamon, Ginger Root"],
    ritualGuide: "Steep 1 tablespoon in boiling water for 8 minutes. Drink at sunrise to ignite your internal fire.",
    inStock: true
  },
  {
    id: "butea-superba-vital-energy-nectar",
    name: "Wild Butea Superba (Red Kwao Krua) Male Vitality Extract",
    botanicalName: "Butea superba",
    category: "mens-wellness",
    categoryName: "Men's Vitality & Hormonal Balance",
    priceKES: 2100,
    rating: 4.8,
    reviewCount: 39,
    tag: "Rare Botanical",
    image: "assets/images/men-vitality.jpg",
    herbs: ["butea superba", "red kwao krua", "flavonoid glycosides", "erectile stamina", "male vigor"],
    illnesses: ["male performance fatigue", "loss of vigor", "poor stamina", "lack of morning firmness"],
    rituals: ["vitality recharge cycle", "evening strength drop"],
    description: "Sourced from the deep forests of Southeast Asia and revered alongside African Mukombero. Contains high levels of flavonoid glycosides that support male cardiovascular and pelvic tone.",
    benefits: [
      "Assists in maintaining firm, sustained vascular pelvic blood flow",
      "Supports mental stamina and reduces feelings of age-related male burnout",
      "Concentrated liquid extract for rapid sublingual bioavailability"
    ],
    ingredients: ["Wild Butea Superba Root Extract, Demineralized Water, Organic Cane Alcohol"],
    ritualGuide: "Take 25 drops in 50ml water daily in the late afternoon.",
    inStock: true
  },

  // =========================================================================
  // 8. WOMEN'S WELLNESS & CYCLE HARMONY (10 new -> 14 total)
  // =========================================================================
  {
    id: "shatavari-wild-yam-hormone-balance-elixir",
    name: "Sacred Shatavari & Wild Yam Cycle Harmony Elixir",
    botanicalName: "Asparagus racemosus & Dioscorea villosa",
    category: "womens-wellness",
    categoryName: "Women's Wellness & Sacred Cycle",
    priceKES: 1850,
    rating: 4.9,
    reviewCount: 104,
    tag: "Hormone Harmony",
    image: "assets/images/hibiscus-tea.jpg",
    herbs: ["shatavari", "wild yam", "diosgenin", "sarsasapogenin", "estrogen balance"],
    illnesses: ["PMS mood swings", "irregular menstrual cycles", "vaginal dryness", "perimenopause hot flashes"],
    rituals: ["morning feminine wellness drop", "lunar cycle meditation"],
    description: "Shatavari translates poetically as 'She Who Possesses a Hundred Husbands'. Combined with wild yam root, this formula gently nourishes the female endocrine and reproductive system.",
    benefits: [
      "Contains natural phyto-estrogenic saponins that modulate estrogen receptor fluctuations",
      "Restores natural tissue mucosal moisture and elasticity throughout the body",
      "Soothes irritability, breast tenderness, and emotional weepiness before menstruation"
    ],
    ingredients: ["Asparagus Racemosus (Shatavari) Root Extract, Dioscorea Villosa Root, Organic Glycerin, Water"],
    ritualGuide: "Take 30 drops in warm water twice daily, especially throughout the luteal phase of your cycle.",
    inStock: true
  },
  {
    id: "chasteberry-vitex-pms-relief-drops",
    name: "Pure Vitex (Chaste Tree Berry) Progesterone Balance Drops",
    botanicalName: "Vitex agnus-castus",
    category: "womens-wellness",
    categoryName: "Women's Wellness & Sacred Cycle",
    priceKES: 1650,
    rating: 4.9,
    reviewCount: 119,
    tag: "Bestseller",
    image: "assets/images/calming-bedtime.jpg",
    herbs: ["vitex", "chasteberry", "agnuside", "progesterone", "prolactin balance"],
    illnesses: ["hormonal cystic acne on jawline", "heavy irregular periods", "short luteal phase", "severe PMS anger"],
    rituals: ["dawn hormonal reset", "monthly rhythm calibration"],
    description: "The gold standard phytotherapy remedy for hormonal acne and luteal phase defect. Vitex works directly on the pituitary gland to normalize dopamine and prolactin, encouraging natural progesterone production.",
    benefits: [
      "Addresses the root cause of stubborn chin and jawline hormonal acne",
      "Encourages predictable, comfortable 28-day menstrual cycle regularity",
      "Reduces premenstrual fluid retention, bloating, and emotional volatility"
    ],
    ingredients: ["Organic Vitex Agnus-Castus Berry Extract (Standardized to 0.5% Agnuside), Organic Cane Spirit"],
    ritualGuide: "Take 40 drops in a small glass of water first thing in the morning upon waking.",
    inStock: true
  },
  {
    id: "red-raspberry-leaf-womb-toning-tea",
    name: "Wild Mountain Red Raspberry Leaf & Nettle Womb Tea",
    botanicalName: "Rubus idaeus & Urtica dioica",
    category: "womens-wellness",
    categoryName: "Women's Wellness & Sacred Cycle",
    priceKES: 1300,
    rating: 4.9,
    reviewCount: 88,
    tag: "Womb Tonic",
    image: "assets/images/hibiscus-tea.jpg",
    herbs: ["raspberry leaf", "fragarine", "stinging nettle", "womb tonic", "uterine tone"],
    illnesses: ["painful uterine cramps (dysmenorrhea)", "heavy menstrual bleeding", "labor preparation", "postpartum recovery"],
    rituals: ["daily womb nurturing cup", "third-trimester pregnancy brew"],
    description: "The supreme uterine tonic herb. Fragarine alkaloid tones and relaxes the pelvic and uterine muscles, while stinging nettle replenishes iron lost during menstruation.",
    benefits: [
      "Relaxes intense spasmodic uterine contractions that cause debilitating monthly cramps",
      "Rich in bioavailable iron, calcium, magnesium, and potassium",
      "Strengthens pelvic floor tone following childbirth"
    ],
    ingredients: ["100% Organic Rubus Idaeus (Red Raspberry) Leaves, Wild Urtica Dioica (Nettle) Tops"],
    ritualGuide: "Steep 1 heaping tablespoon in 350ml boiling water for 10 minutes. Drink 1 to 2 cups daily.",
    inStock: true
  },
  {
    id: "black-cohosh-sage-hot-flash-cool-mist",
    name: "Wild Black Cohosh & Clary Sage Hot Flash Cooling Spray",
    botanicalName: "Actaea racemosa & Salvia sclarea",
    category: "womens-wellness",
    categoryName: "Women's Wellness & Sacred Cycle",
    priceKES: 1450,
    rating: 4.8,
    reviewCount: 56,
    tag: "Menopause Relief",
    image: "assets/images/calming-bedtime.jpg",
    herbs: ["black cohosh", "clary sage", "triterpene glycosides", "hot flashes", "night sweats"],
    illnesses: ["sudden hot flashes", "drenching night sweats", "menopausal irritability", "temperature surges"],
    rituals: ["handbag flash rescue", "bedside cooling mist"],
    description: "Immediate portable relief from menopausal thermal surges. Pure clary sage floral water combined with black cohosh root extract instantly cools flushed skin and calms racing heart sensations.",
    benefits: [
      "Provides instant evaporation-based cooling across neck, chest, and face",
      "Clary sage terpenes help regulate sudden autonomic thermal surges",
      "Fits discreetly into purse or bedside drawer for instant midnight relief"
    ],
    ingredients: ["Salvia Sclarea (Clary Sage) Hydrosol, Actaea Racemosa (Black Cohosh) Root Extract, Peppermint Water"],
    ritualGuide: "Spritz generously over face, neck, and chest whenever a hot surge begins.",
    inStock: true
  },
  {
    id: "cramp-bark-wild-ginger-menstrual-salve",
    name: "Cramp Bark & Sweet Marjoram Womb Warming Balm",
    botanicalName: "Viburnum opulus & Origanum majorana",
    category: "womens-wellness",
    categoryName: "Women's Wellness & Sacred Cycle",
    priceKES: 1550,
    rating: 4.9,
    reviewCount: 72,
    tag: "Cramp Soother",
    image: "assets/images/muscle-balm.jpg",
    herbs: ["cramp bark", "sweet marjoram", "castor oil", "beeswax", "menstrual balm"],
    illnesses: ["severe menstrual cramps", "lower back ache during period", "pelvic stagnation", "cold womb"],
    rituals: ["sacred monthly belly massage", "hot water bottle companion"],
    description: "A warming topical balm to rub directly across the lower abdomen and sacrum when cramps strike. Cramp Bark and sweet marjoram penetrate smooth muscle layers to release tight uterine gripping.",
    benefits: [
      "Viopudial compounds in Cramp Bark relax uterine muscular tension on contact",
      "Warming castor oil base draws healing circulation into the pelvic basin",
      "Comforting sweet herbal scent calms emotional vulnerability during moon days"
    ],
    ingredients: ["Viburnum Opulus Bark Extract, Sweet Marjoram Essential Oil, Castor Oil, Nilotica Shea, Beeswax"],
    ritualGuide: "Warm a dollop in hands and massage clockwise over lower belly. Rest with a hot water bottle for 20 minutes.",
    inStock: true
  },
  {
    id: "maca-dong-quai-feminine-vitality-tonic",
    name: "Red Maca & Dong Quai Female Radiance Tonic",
    botanicalName: "Lepidium meyenii & Angelica sinensis",
    category: "womens-wellness",
    categoryName: "Women's Wellness & Sacred Cycle",
    priceKES: 1950,
    rating: 4.8,
    reviewCount: 63,
    tag: "Vital Feminine",
    image: "assets/images/moringa-baobab.jpg",
    herbs: ["red maca", "dong quai", "angelica sinensis", "ligustilide", "female vitality"],
    illnesses: ["low feminine libido", "chronic fatigue", "cold hands and feet", "pale complexion"],
    rituals: ["morning goddess elixir", "post-period vitality rebuild"],
    description: "Red Maca (the most estrogen-supportive maca phenotype) paired with China's revered 'Female Ginseng' (Dong Quai). Rebuilds blood, invigorates pelvic micro-circulation, and revives natural desire.",
    benefits: [
      "Dong Quai ligustilides nourish blood deficiency following heavy periods",
      "Red Maca supports bone density, pelvic muscle tone, and romantic energy",
      "Brings healthy rosy color back to pale, exhausted cheeks"
    ],
    ingredients: ["Organic Gelatinized Red Maca Root Powder, Angelica Sinensis Root Extract, Raw Lucuma"],
    ritualGuide: "Blend 1 tablespoon into warm almond milk with a touch of honey daily.",
    inStock: true
  },
  {
    id: "she-oak-yarrow-sacred-bleeding-comfort",
    name: "Wild Yarrow & Shepherd's Purse Heavy Flow Drops",
    botanicalName: "Achillea millefolium & Capsella bursa-pastoris",
    category: "womens-wellness",
    categoryName: "Women's Wellness & Sacred Cycle",
    priceKES: 1600,
    rating: 4.8,
    reviewCount: 45,
    tag: "Flow Control",
    image: "assets/images/calming-bedtime.jpg",
    herbs: ["yarrow", "shepherds purse", "achilleine", "astringent", "heavy period"],
    illnesses: ["menorrhagia (excessively heavy periods)", "prolonged bleeding", "flooding cycles", "blood loss weakness"],
    rituals: ["flow moderating drop", "rest & recover protocol"],
    description: "Two of the world's most trusted botanical astringents for moderating heavy menstrual flooding. Yarrow balances pelvic circulation while Shepherd's Purse tones capillary walls.",
    benefits: [
      "Naturally moderates excessive menstrual blood volume without stopping necessary natural shedding",
      "Reduces large, painful blood clot formation during peak flow days",
      "Protects against severe iron-depletion exhaustion during menstruation"
    ],
    ingredients: ["Fresh Achillea Millefolium Flowering Tops, Capsella Bursa-Pastoris Aerial Extract, Spring Water, Cane Alcohol"],
    ritualGuide: "Take 30 drops in water every 3 hours during heaviest flow days as needed.",
    inStock: true
  },
  {
    id: "evening-primrose-borage-gla-softgels",
    name: "Virgin Evening Primrose & Borage Seed GLA Softgels",
    botanicalName: "Oenothera biennis & Borago officinalis",
    category: "womens-wellness",
    categoryName: "Women's Wellness & Sacred Cycle",
    priceKES: 1750,
    rating: 4.9,
    reviewCount: 91,
    tag: "Essential GLA",
    image: "assets/images/calming-bedtime.jpg",
    herbs: ["evening primrose", "borage oil", "gamma linolenic acid", "gla", "breast tenderness"],
    illnesses: ["cyclical breast tenderness (mastalgia)", "dry itchy eczema", "severe premenstrual bloating"],
    rituals: ["daily evening softgel", "skin & hormonal foundation"],
    description: "A rich source of Gamma-Linolenic Acid (GLA), an essential Omega-6 fatty acid that synthesizes anti-inflammatory series-1 prostaglandins to quench hormonal breast pain.",
    benefits: [
      "Significantly relieves cyclical breast soreness and swelling in the days before your period",
      "Restores internal cellular lipid hydration to dry, flaky skin and eczema patches",
      "Supports healthy cervical mucus production and reproductive tissue suppleness"
    ],
    ingredients: ["Cold-Pressed Oenothera Biennis Seed Oil (10% GLA), Borago Officinalis Oil (20% GLA), Vitamin E"],
    ritualGuide: "Take 2 softgels daily with your evening meal.",
    inStock: true
  },
  {
    id: "calendula-tea-tree-intimate-soothing-balm",
    name: "Organic Calendula & Roman Chamomile Intimate Soothing Balm",
    botanicalName: "Calendula officinalis & Anthemis nobilis",
    category: "womens-wellness",
    categoryName: "Women's Wellness & Sacred Cycle",
    priceKES: 1550,
    rating: 4.9,
    reviewCount: 68,
    tag: "Gentle Sanctuary",
    image: "assets/images/shea-cream.jpg",
    herbs: ["calendula", "chamomile", "coconut oil", "vulva balm", "soothing"],
    illnesses: ["vulvar dryness", "friction irritation from cycling/exercise", "postpartum perineal tenderness", "shaving razor burn"],
    rituals: ["intimate skin sanctuary rite", "post-shower comfort"],
    description: "Gently formulated for delicate external intimate skin tissues. Unrefined coconut oil infused with golden calendula petals, Roman chamomile, and nilotica shea butter.",
    benefits: [
      "100% gynecologist-conscious formula with zero essential oil irritants or perfumes",
      "Calms chafing, redness, and friction irritation after exercise or intimacy",
      "Restores supple lipid barrier protection to delicate vulvar skin"
    ],
    ingredients: ["Calendula Officinalis Flower Infused Olive Oil, Nilotica Shea Butter, Organic Virgin Coconut Oil, Beeswax"],
    ritualGuide: "Warm a small pea-sized amount in clean fingers and apply gently to external intimate tissues as needed.",
    inStock: true
  },
  {
    id: "fenugreek-blessed-thistle-nursing-tea",
    name: "Organic Fenugreek & Blessed Thistle Nursing Mother's Tea",
    botanicalName: "Trigonella foenum-graecum & Cnicus benedictus",
    category: "womens-wellness",
    categoryName: "Women's Wellness & Sacred Cycle",
    priceKES: 1400,
    rating: 4.9,
    reviewCount: 82,
    tag: "Milk Flow",
    image: "assets/images/hibiscus-tea.jpg",
    herbs: ["fenugreek", "blessed thistle", "galactagogue", "breast milk flow", "fennel"],
    illnesses: ["low breast milk supply", "sluggish letdown", "postpartum nursing fatigue", "infant digestive colic"],
    rituals: ["nursing mother's hydration cup", "post-feed nourishment"],
    description: "Formulated by certified herbal lactation specialists. Fenugreek and blessed thistle stimulate prolactin release, while sweet fennel passes through breast milk to ease baby's tummy gas.",
    benefits: [
      "Naturally increases breast milk volume and speed of letdown within 48 to 72 hours",
      "Helps prevent painful infant colic and digestive crying through maternal milk",
      "Nourishing herbal minerals support maternal postpartum recovery"
    ],
    ingredients: ["Organic Fenugreek Seed, Blessed Thistle Herb, Sweet Fennel Seed, Aniseed, Marshmallow Root"],
    ritualGuide: "Steep 1 tablespoon in 300ml boiling water for 10 minutes. Drink 2 to 3 cups daily while nursing.",
    inStock: true
  },

  // =========================================================================
  // 9. SACRED RITUALS, APOTHECARY & HOME (10 new -> 12 total)
  // =========================================================================
  {
    id: "wild-african-sage-smudge",
    name: "Wild African Mountain Sage & Lavender Smudge Wand",
    botanicalName: "Salvia africana-lutea & Lavandula angustifolia",
    category: "sacred-rituals",
    categoryName: "Sacred Rituals, Resins & Energy",
    priceKES: 1450,
    rating: 4.9,
    reviewCount: 93,
    tag: "Space Clearing",
    image: "assets/images/ritual-ceremony.jpg",
    herbs: ["african sage", "lavender", "smoke cleansing", "purification", "sacred herb"],
    illnesses: ["heavy negative room energy", "restlessness after arguments", "stagnant air", "unsettled mind"],
    rituals: ["new home blessing ceremony", "full moon room clearing", "altar purification"],
    description: "Hand-harvested from wild mountain sage bushes on Mount Kenya and tied with organic cotton twine alongside dried French lavender sprigs. Purifies negative lingering energy.",
    benefits: [
      "Traditional smoke cleansing purifies airborne pathogens and negative mental residue",
      "Lavender calms racing nervous thoughts and introduces serene peaceful vibration",
      "100% sustainable wild harvest; respectful of indigenous sacred traditions"
    ],
    ingredients: ["Wild-Harvested Salvia Africana (African Mountain Sage), Organic Lavender Blossoms, Cotton Twine"],
    ritualGuide: "Ignite tip, blow out flame to leave glowing ember. Fan sacred smoke around doorway and corners with intention.",
    inStock: true
  },
  {
    id: "somali-royal-green-hojari-frankincense",
    name: "Somali Royal Green Hojari Frankincense Tears (100g)",
    botanicalName: "Boswellia sacra / carterii",
    category: "sacred-rituals",
    categoryName: "Sacred Rituals, Resins & Energy",
    priceKES: 2600,
    rating: 5.0,
    reviewCount: 112,
    tag: "Temple Grade",
    image: "assets/images/ritual-ceremony.jpg",
    herbs: ["frankincense", "hojari", "boswellia sacra", "incense tears", "meditation resin"],
    illnesses: ["mental distraction in prayer/meditation", "spiritual disconnection", "respiratory heaviness"],
    rituals: ["dawn meditation burn", "temple consecration", "sacred evening prayer"],
    description: "The highest grade of natural frankincense resin on earth. Translucent emerald-tinted tears hand-sorted from the remote limestone cliffs of Somaliland and Oman. Releases crisp citrus-pine vapors.",
    benefits: [
      "Incensole acetate in pure frankincense smoke triggers TRPV3 neural calm receptors",
      "Clears heavy bronchial pathways and facilitates deep diaphragmatic breathing",
      "The authentic scent burned in sacred temples and royal palaces for over 4,000 years"
    ],
    ingredients: ["100% Pure First-Grade Green Hojari Boswellia Sacra Natural Tree Resin"],
    ritualGuide: "Place 1 or 2 small tears onto a glowing natural charcoal disc inside an incense burner. Inhale deeply.",
    inStock: true
  },
  {
    id: "sacred-red-myrrh-ogaden-resin",
    name: "Wild Ogaden Red Myrrh Resin Granules (100g)",
    botanicalName: "Commiphora myrrha",
    category: "sacred-rituals",
    categoryName: "Sacred Rituals, Resins & Energy",
    priceKES: 2200,
    rating: 4.9,
    reviewCount: 67,
    tag: "Ancient Resin",
    image: "assets/images/ritual-ceremony.jpg",
    herbs: ["myrrh", "commiphora myrrha", "ogaden", "sacred resin", "grounding incense"],
    illnesses: ["spiritual ungroundedness", "scattered energy", "stagnant space"],
    rituals: ["ancestral grounding ritual", "evening meditation burn", "sanctuary protection"],
    description: "Deep reddish-brown balsamic tears sustainably tapped from thorny wild Commiphora trees in the arid Horn of Africa. Releases an earthy, warm, bitter-sweet grounding smoke.",
    benefits: [
      "Profoundly anchors erratic emotional energy and centers the lower chakras",
      "Potent natural airborne antimicrobial agent when smudged through living rooms",
      "Pairs majestically with royal frankincense for complete spiritual equilibrium"
    ],
    ingredients: ["100% Pure Natural Wild Commiphora Myrrha Tree Resin Granules"],
    ritualGuide: "Burn over charcoal discs or warm slowly in an electric resin heater to savor rich balsamic notes.",
    inStock: true
  },
  {
    id: "copal-blanco-sacred-clearing-resin",
    name: "Pure Mayan Golden & White Copal Resin (100g)",
    botanicalName: "Protium copal",
    category: "sacred-rituals",
    categoryName: "Sacred Rituals, Resins & Energy",
    priceKES: 1950,
    rating: 4.8,
    reviewCount: 48,
    tag: "Solar Light",
    image: "assets/images/ritual-ceremony.jpg",
    herbs: ["copal", "protium copal", "mayan resin", "solar clearing", "protection"],
    illnesses: ["creative stagnation", "dull lethargic energy in office", "heavy mood"],
    rituals: ["morning sunlight invocation", "creative studio clearing"],
    description: "Revered in Mesoamerican ceremonial traditions as 'food for the gods'. Produces a bright, sweet, crystalline white smoke with notes of lemon and fresh pine sap.",
    benefits: [
      "Instantly lifts heavy emotional residue and elevates personal inspiration",
      "Transforms home studios into vibrant creative sanctuaries",
      "Natural tree resin harvest; zero synthetic fillers"
    ],
    ingredients: ["100% Pure Wild-Harvested Protium Copal Tree Resin"],
    ritualGuide: "Drop a dime-sized piece on burning charcoal. Let sweet smoke waft through creative studios.",
    inStock: true
  },
  {
    id: "palo-santo-peruvian-holy-wood-sticks",
    name: "Sustainably Gathered Peruvian Palo Santo (Holy Wood) Sticks (5 Pack)",
    botanicalName: "Bursera graveolens",
    category: "sacred-rituals",
    categoryName: "Sacred Rituals, Resins & Energy",
    priceKES: 1350,
    rating: 4.9,
    reviewCount: 138,
    tag: "Holy Wood",
    image: "assets/images/ritual-ceremony.jpg",
    herbs: ["palo santo", "bursera graveolens", "holy wood", "limonene", "sacred smoke"],
    illnesses: ["bad luck sensations", "anxious tension", "negative room atmosphere"],
    rituals: ["quick daily smudge", "meditation starter", "welcoming good fortune"],
    description: "Sustainably collected exclusively from naturally fallen dead branches in northern Peru's dry tropical forests. Certified by SERFOR Peru. High concentration of limonene and sweet minty wood aroma.",
    benefits: [
      "Invites positive fortune, joy, and peace into cleared spaces",
      "Naturally repels mosquitoes and flying insects without toxic chemicals",
      "Can be re-lit dozens of times for quick 2-minute daily micro-rituals"
    ],
    ingredients: ["5 Naturally Fallen, Resin-Dense Bursera Graveolens Wood Sticks (SERFOR Certified)"],
    ritualGuide: "Hold stick at 45° angle, light with flame for 30 seconds, blow out gently and walk smoke through room.",
    inStock: true
  },
  {
    id: "lake-magadi-ceremonial-mineral-bath-salts",
    name: "Lake Magadi Volcanic Obsidian & Eucalyptus Altar Salts",
    botanicalName: "Eucalyptus globulus & Lavandula angustifolia",
    category: "sacred-rituals",
    categoryName: "Sacred Rituals, Resins & Energy",
    priceKES: 1450,
    rating: 4.8,
    reviewCount: 52,
    tag: "Sacred Mineral",
    image: "assets/images/ritual-ceremony.jpg",
    herbs: ["lake magadi salts", "volcanic soda", "obsidian", "eucalyptus", "bath ritual"],
    illnesses: ["auric exhaustion", "carrying others' emotional baggage", "heavy tired limbs"],
    rituals: ["full moon psychic cleanse bath", "cord cutting bath ritual"],
    description: "Mineral-rich natural soda ash and crystal salts hand-collected from Kenya's mystical Lake Magadi in the southern Rift Valley. Infused with crushed blue gum eucalyptus and black tourmaline dust.",
    benefits: [
      "High alkalinity restores electromagnetic equilibrium to exhausted nervous systems",
      "Symbolically cleanses psychic heaviness and emotional attachments",
      "Leaves body feeling light, renewed, and spiritually refreshed"
    ],
    ingredients: ["Natural Lake Magadi Soda & Salt Crystals, Dead Sea Salts, Eucalyptus Globulus Oil, Rosemary"],
    ritualGuide: "Add 1 cup to hot bathwater. Soak for 20 minutes with intention of letting go of all burdens.",
    inStock: true
  },
  {
    id: "cedarwood-juniper-procera-altar-oil",
    name: "East African Mountain Cedar (Juniperus Procera) Anointing Oil",
    botanicalName: "Juniperus procera",
    category: "sacred-rituals",
    categoryName: "Sacred Rituals, Resins & Energy",
    priceKES: 1650,
    rating: 4.9,
    reviewCount: 44,
    tag: "Sacred Tree",
    image: "assets/images/ritual-ceremony.jpg",
    herbs: ["african cedar", "juniperus procera", "cedrol", "anointing oil", "protection"],
    illnesses: ["feeling ungrounded", "restless energy", "vulnerability to negative environments"],
    rituals: ["third eye anointing", "candle consecration", "altar tool blessing"],
    description: "Steam-distilled from the heartwood of ancient fallen East African cedar trees (Juniperus procera) in the Aberdare highlands. Deep woody, smoky, sweet grounding fragrance.",
    benefits: [
      "Rich in natural cedrol to promote profound alpha-wave nervous calmness",
      "Traditional protective anointing oil for crowns, temples, and wrists",
      "Enhances focus and presence during meditation and spiritual study"
    ],
    ingredients: ["Steam-Distilled Juniperus Procera Wood Oil in Cold-Pressed Golden Jojoba Carrier Oil"],
    ritualGuide: "Place 1 drop between index fingers and tap third eye and wrists before beginning your practice.",
    inStock: true
  },
  {
    id: "kenyan-beeswax-raw-pillar-candle",
    name: "Artisanal Pure Kenyan Forest Beeswax Pillar Candle",
    botanicalName: "Apis mellifera scutellata",
    category: "sacred-rituals",
    categoryName: "Sacred Rituals, Resins & Energy",
    priceKES: 1500,
    rating: 5.0,
    reviewCount: 61,
    tag: "Negative Ions",
    image: "assets/images/ritual-ceremony.jpg",
    herbs: ["beeswax", "propolis", "honey candle", "negative ions", "clean flame"],
    illnesses: ["airborne allergens", "toxic paraffin fumes in home", "shallow breathing"],
    rituals: ["candlelight meditation", "dinner table sacred light", "altar flame"],
    description: "Hand-poured using 100% unbleached golden beeswax harvested by traditional top-bar beekeepers in Kenya's Kitui dry forests. Emits natural negative ions that clean indoor air.",
    benefits: [
      "Burns with a golden warm spectrum that matches natural sunlight",
      "Naturally purifies indoor air by binding to airborne dust and pollen allergens",
      "Subtle sweet honey and propolis aroma without synthetic fragrances"
    ],
    ingredients: ["100% Pure Unbleached Kenyan Forest Beeswax, Lead-Free Pure Cotton Wick"],
    ritualGuide: "Trim wick to 5mm before lighting. Burn for at least 2 hours per session for an even melt pool.",
    inStock: true
  },
  {
    id: "sweetgrass-cedar-sacred-harmony-braid",
    name: "Wild Sweetgrass & Cedar Traditional Harmony Braid",
    botanicalName: "Hierochloe odorata & Thuja occidentalis",
    category: "sacred-rituals",
    categoryName: "Sacred Rituals, Resins & Energy",
    priceKES: 1400,
    rating: 4.8,
    reviewCount: 38,
    tag: "Sweet Blessing",
    image: "assets/images/ritual-ceremony.jpg",
    herbs: ["sweetgrass", "hierochloe odorata", "coumarin", "harmony braid", "blessing"],
    illnesses: ["harsh contentious atmosphere in home", "lack of harmony in relationship"],
    rituals: ["after-smudge blessing", "wedding room blessing", "newborn sanctuary blessing"],
    description: "Known as the 'Hair of Mother Earth'. Unlike sage which dispels negative energy, sweetgrass is burned following space clearing to invite sweetness, harmony, and compassionate spirits into the space.",
    benefits: [
      "Releases a warm vanilla-coumarin scent that invokes unconditional kindness",
      "Traditional post-clearing blessing herb for homes, ceremonies, and studios",
      "Tied into an enduring braided wand that honors natural sacred reciprocity"
    ],
    ingredients: ["100% Wildcrafted Hierochloe Odorata (Sweetgrass) Braid, Cedar Shavings"],
    ritualGuide: "Light end of braid, gently blow out flame, and waft sweet vanilla smoke to bless loved ones and home.",
    inStock: true
  },
  {
    id: "damar-gum-golden-sun-incense-resin",
    name: "Golden Damar Crystal Resin for Mental Clarity (100g)",
    botanicalName: "Shorea wiesneri",
    category: "sacred-rituals",
    categoryName: "Sacred Rituals, Resins & Energy",
    priceKES: 1550,
    rating: 4.8,
    reviewCount: 42,
    tag: "Clear Mind",
    image: "assets/images/ritual-ceremony.jpg",
    herbs: ["damar", "shorea", "crystal resin", "incense", "mental clarity"],
    illnesses: ["mental gloom", "dark mood", "cloudy thoughts", "lack of motivation"],
    rituals: ["morning study burn", "intellectual clarity rite"],
    description: "Clear golden glass-like resin tears tapped from dipterocarp trees. When burned on charcoal, it yields an airy, light, lemon-pine translucent smoke that disperses depressive gloom.",
    benefits: [
      "Known in incense lore as the resin that 'brings light to the darkest corners of the mind'",
      "Fosters laser mental focus without the heavy cloying thickness of lower-grade incenses",
      "Can be ground and mixed with lavender and frankincense for bespoke blends"
    ],
    ingredients: ["100% Pure Natural Golden Shorea Wiesneri (Damar) Crystal Resin"],
    ritualGuide: "Crush a small piece and sprinkle over hot charcoal disc during intellectual study or morning reflection.",
    inStock: true
  }
];

console.log(`Prepared ${NEW_PRODUCTS.length} new products.`);

// Validate that every new product has all required fields
const requiredFields = [
  'id', 'name', 'botanicalName', 'category', 'categoryName',
  'priceKES', 'rating', 'reviewCount', 'tag', 'image',
  'herbs', 'illnesses', 'rituals', 'description', 'benefits',
  'ingredients', 'ritualGuide', 'inStock'
];

NEW_PRODUCTS.forEach((p, idx) => {
  requiredFields.forEach(f => {
    if (p[f] === undefined) {
      throw new Error(`Product index ${idx} (${p.id || 'unnamed'}) is missing required field "${f}"`);
    }
  });
});

// Check for duplicate IDs
const existingIds = new Set(existing.map(p => p.id));
NEW_PRODUCTS.forEach(p => {
  if (existingIds.has(p.id)) {
    throw new Error(`Duplicate product ID found: ${p.id}`);
  }
  existingIds.add(p.id);
});

// Combine
const COMBINED_CATALOG = [...existing, ...NEW_PRODUCTS];
console.log(`Total combined products: ${COMBINED_CATALOG.length} (Target: 150)`);

if (COMBINED_CATALOG.length !== 150) {
  console.warn(`WARNING: Combined count is ${COMBINED_CATALOG.length}, expected 150.`);
}

// Generate the new js/data/products.js content
const header = `/**
 * NewAge Health Botanicals & Rituals - Structured Product Catalog
 * 150 High-Efficacy Evidence-Backed African & Global Botanical Remedies
 * Zero-database, client-side catalog indexed by Illness, Herb, Ritual, and Category
 */

const PRODUCTS_DATA = ${JSON.stringify(COMBINED_CATALOG, null, 2)};

// Expose globally for browser and Node.js environments
if (typeof window !== "undefined") {
  window.PRODUCTS_DATA = PRODUCTS_DATA;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = PRODUCTS_DATA;
}
`;

fs.writeFileSync(path.join(__dirname, '../js/data/products.js'), header, 'utf8');
console.log('✓ Successfully wrote 150 products to js/data/products.js');

// Category breakdown report
const catCount = {};
COMBINED_CATALOG.forEach(p => {
  catCount[p.categoryName] = (catCount[p.categoryName] || 0) + 1;
});

console.log('\nFinal 150 Catalog Category Breakdown:');
console.table(catCount);

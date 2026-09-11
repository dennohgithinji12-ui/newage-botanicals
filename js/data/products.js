/**
 * NewAge Health Botanicals & Rituals - Structured Product Catalog
 * Zero-database, client-side catalog indexed by Illness, Herb, Ritual, and Category
 */

const PRODUCTS_DATA = [
  // 1. DAILY HERBAL NUTRITION
  {
    id: "moringa-powder-organic",
    name: "Pure Wildcrafted Moringa Leaf Powder",
    botanicalName: "Moringa oleifera",
    category: "daily-nutrition",
    categoryName: "Daily Herbal Nutrition",
    priceKES: 1450,
    rating: 4.9,
    reviewCount: 148,
    tag: "High-Priority Launch",
    image: "assets/images/moringa-baobab.jpg",
    herbs: ["moringa", "moringa oleifera", "drumstick tree", "green superfood", "iron", "chlorophyll"],
    illnesses: ["fatigue", "low energy", "anemia", "weak immunity", "malnutrition", "inflammation", "joint stiffness", "cellular vitality"],
    rituals: ["morning vitality tonic", "smoothie ritual", "daily grounding rite", "breakfast elixir"],
    description: "Sun-cured and stone-milled from ethical wild Kenyan moringa groves. Packed with 92 nutrients, 46 antioxidants, and essential plant proteins to revitalize your cellular prana.",
    benefits: [
      "Natural sustained energy without caffeine crashes",
      "Rich in plant-based iron, magnesium, and bioavailable calcium",
      "Potent natural antioxidant supporting liver and cellular detoxification",
      "Promotes radiant skin tone and healthy keratin synthesis"
    ],
    ingredients: ["100% Certified Organic Sun-Dried Moringa Oleifera Leaf Powder"],
    ritualGuide: "Whisk 1 level teaspoon into warm water with raw honey and lemon at dawn, or blend into morning smoothies to anchor your mind and awaken your cells.",
    inStock: true
  },
  {
    id: "baobab-fruit-powder",
    name: "Sacred Baobab Fruit Superfood Powder",
    botanicalName: "Adansonia digitata",
    category: "daily-nutrition",
    categoryName: "Daily Herbal Nutrition",
    priceKES: 1600,
    rating: 4.8,
    reviewCount: 92,
    tag: "Bestseller",
    image: "assets/images/moringa-baobab.jpg",
    herbs: ["baobab", "adansonia digitata", "tree of life", "vitamin c", "prebiotic fibre"],
    illnesses: ["sluggish digestion", "constipation", "dull skin", "weak immune system", "gut microbiome imbalance", "inflammation"],
    rituals: ["digestive awakening", "post-workout hydration", "sun drink ritual"],
    description: "Harvested directly from ancient wild African Baobab trees ('The Tree of Life'). Naturally dehydrates on the branch into a tangy citrus prebiotic powder containing 6x more Vitamin C than oranges.",
    benefits: [
      "50% soluble and prebiotic dietary fibre to feed healthy gut bacteria",
      "Elevated Vitamin C for collagen formation and luminous skin glow",
      "Essential electrolytes (potassium, calcium, magnesium) for optimal cellular hydration",
      "Low glycemic prebiotic supporting balanced blood sugar"
    ],
    ingredients: ["100% Raw Wild-Harvested Kenyan Baobab Fruit Pulp Powder"],
    ritualGuide: "Stir 1 tablespoon into cold spring water, coconut water, or yogurt bowls. Sip slowly while visualizing root grounding.",
    inStock: true
  },
  {
    id: "hibiscus-ruby-infusion",
    name: "Wild Kenyan Ruby Hibiscus & Lemongrass Tea",
    botanicalName: "Hibiscus sabdariffa & Cymbopogon citratus",
    category: "daily-nutrition",
    categoryName: "Daily Herbal Nutrition",
    priceKES: 1250,
    rating: 4.9,
    reviewCount: 114,
    tag: "Bestseller",
    image: "assets/images/hibiscus-tea.jpg",
    herbs: ["hibiscus", "lemongrass", "cymbopogon", "anthocyanins", "karkadeh"],
    illnesses: ["high blood pressure", "water retention", "bloating", "sluggish lymphatic system", "oxidative stress", "heart wellness"],
    rituals: ["cooling afternoon tea ritual", "sacred heart opening", "hydrating sun tea"],
    description: "Hand-picked tart ruby red hibiscus blossoms harmonized with vibrant fragrant Kenyan lemongrass stalks. A thirst-quenching, antioxidant-rich ceremonial tea that supports heart rhythm and graceful cooling.",
    benefits: [
      "Naturally supports healthy systolic and diastolic blood pressure balance",
      "Gentle natural diuretic action relieving water weight and puffiness",
      "Deep ruby anthocyanins that protect capillaries and cellular membranes",
      "Naturally caffeine-free refreshing wellness beverage"
    ],
    ingredients: ["Organic Dried Hibiscus Calyces", "Ethically Wildcrafted East African Lemongrass Stalks"],
    ritualGuide: "Steep 1 heaped tablespoon in boiling water for 6-8 minutes. Strain, add raw honey and a slice of lime. Can also be steeped cold overnight in moonlight.",
    inStock: true
  },
  {
    id: "ginger-lemon-wellness-blend",
    name: "Golden Ginger-Lemon Functional Wellness Tea",
    botanicalName: "Zingiber officinale & Citrus limonum",
    category: "daily-nutrition",
    categoryName: "Daily Herbal Nutrition",
    priceKES: 1300,
    rating: 4.7,
    reviewCount: 78,
    tag: "Apothecary Pick",
    image: "assets/images/hibiscus-tea.jpg",
    herbs: ["ginger", "lemon peel", "turmeric", "zingiber", "curcuma"],
    illnesses: ["cold", "flu", "sore throat", "nausea", "sluggish metabolism", "poor circulation", "morning chills"],
    rituals: ["morning fire ignition", "metabolic awaken rite", "throat soothing steam"],
    description: "Sun-dried fiery ginger root intertwined with citrus lemon peel and raw turmeric slices. Activates digestive agni (internal metabolic fire) and dispels throat dampness.",
    benefits: [
      "Stimulates gastric motility and quickly quells stomach nausea",
      "Warms extremities and boosts blood circulation throughout the body",
      "Potent gingerols and shogaols alleviate respiratory congestion"
    ],
    ingredients: ["Sun-Dried Kenyan Ginger Root", "Dehydrated Lemon Peel", "Golden Turmeric Rhizome"],
    ritualGuide: "Simmer in boiling water for 10 minutes. Inhale the aromatic lemon-ginger steam to open nasal passages before drinking.",
    inStock: true
  },

  // 2. MIND, STRESS & SLEEP WELLNESS
  {
    id: "bedtime-dream-tea",
    name: "Astral Bedtime & Deep Sleep Botanical Infusion",
    botanicalName: "Matricaria chamomilla, Valeriana & Passiflora",
    category: "mind-sleep",
    categoryName: "Mind, Stress & Sleep Wellness",
    priceKES: 1650,
    rating: 5.0,
    reviewCount: 204,
    tag: "High-Priority Launch",
    image: "assets/images/calming-bedtime.jpg",
    herbs: ["chamomile", "valerian root", "passionflower", "lavender", "blue lotus", "lemon balm"],
    illnesses: ["insomnia", "racing thoughts", "sleep anxiety", "restlessness", "nervous tension", "night terrors", "chronic fatigue"],
    rituals: ["bedtime wind-down ritual", "nighttime digital detox", "moonlight meditation", "dream recall practice"],
    description: "An ethereal sedative tisane formulated with whole German chamomile flowers, potent valerian root, passionflower vine, and calming French lavender. Calms the central nervous system into delta-wave slumber.",
    benefits: [
      "Significantly reduces sleep latency (time to fall asleep) naturally",
      "Promotes prolonged, restorative REM and deep sleep cycles",
      "GABA-receptor modulating botanicals silence rumination and mental chatter",
      "Wake up fully refreshed without grogginess or dependency"
    ],
    ingredients: ["Egyptian Chamomile Flowers", "Wild Valerian Root", "Passionflower Herb", "French Lavender Buds", "Spearmint Leaves"],
    ritualGuide: "Steep 1 tablespoon in freshly boiled spring water for 10 minutes covered. Sip in dim candlelight 45 minutes before sleep with your phone placed away.",
    inStock: true
  },
  {
    id: "lavender-stress-relief-rollon",
    name: "Serenity Stress-Relief Aromatherapy Roll-On",
    botanicalName: "Lavandula angustifolia & Boswellia carterii",
    category: "mind-sleep",
    categoryName: "Mind, Stress & Sleep Wellness",
    priceKES: 1200,
    rating: 4.8,
    reviewCount: 88,
    tag: "Bestseller",
    image: "assets/images/calming-bedtime.jpg",
    herbs: ["lavender", "frankincense", "bergamot", "jojoba oil"],
    illnesses: ["panic attack", "acute anxiety", "tension headaches", "stress tightness", "sensory overload", "work fatigue"],
    rituals: ["midday calm reset", "temple massage ritual", "pre-meditation anointing"],
    description: "Pure steam-distilled French lavender essential oil and sacred frankincense infused into golden organic jojoba oil. Designed for immediate nervous system grounding on the go.",
    benefits: [
      "Inhalation of linalool rapidly soothes the amygdala stress response",
      "Frankincense helps deepen shallow, anxious breathing patterns",
      "Non-greasy, travel-friendly roller for pulse point application"
    ],
    ingredients: ["Pure Lavandula Angustifolia Essential Oil", "Wild Somalian Frankincense Oil", "Organic Golden Jojoba Carrier Oil"],
    ritualGuide: "Glide over wrists, temples, and neck nape. Cup your palms over your nose and take four deep 4-7-8 grounding breaths.",
    inStock: true
  },
  {
    id: "sacred-relaxation-bath-soak",
    name: "Lunar Herbal Mineral Relaxation Bath Soak",
    botanicalName: "Salvia sclarea & Lavandula",
    category: "mind-sleep",
    categoryName: "Mind, Stress & Sleep Wellness",
    priceKES: 1850,
    rating: 4.9,
    reviewCount: 65,
    tag: "Sacred Craft",
    image: "assets/images/ritual-ceremony.jpg",
    herbs: ["lavender", "chamomile", "epsom salt", "himalayan salt", "clary sage"],
    illnesses: ["body tension", "muscle knots", "emotional burnout", "mental fatigue", "restless legs"],
    rituals: ["full moon cleansing bath", "evening restoration bath", "energy cord cutting ritual"],
    description: "Dead Sea magnesium flakes, pink Himalayan mineral salt, organic lavender blossoms, and clary sage. Melts away the heavy electromagnetic and emotional residue of the day.",
    benefits: [
      "Transdermal magnesium replenishes depleted mineral stores",
      "Relieves stiff spinal and shoulder knots from sitting and stress",
      "Prepares muscles and psyche for profound uninterrupted sleep"
    ],
    ingredients: ["Dead Sea Magnesium Flakes", "Pink Himalayan Crystal Salt", "Dried Organic Lavender Flowers", "Clary Sage Essential Oil"],
    ritualGuide: "Dissolve 1/2 cup into a warm running bath. Light a candle, immerse for 25 minutes, and visualize all tension dissolving into the water.",
    inStock: true
  },

  // 3. ENERGY, FITNESS & MUSCLE
  {
    id: "warming-muscle-recovery-balm",
    name: "Botanist's Herbal Warming Muscle Balm",
    botanicalName: "Zingiber, Capsicum & Eucalyptus globulus",
    category: "energy-muscle",
    categoryName: "Energy, Fitness & Muscle",
    priceKES: 1550,
    rating: 4.9,
    reviewCount: 132,
    tag: "High-Priority Launch",
    image: "assets/images/muscle-balm.jpg",
    herbs: ["ginger", "cayenne pepper", "clove", "eucalyptus", "arnica montana", "beeswax"],
    illnesses: ["muscle soreness", "joint pain", "stiff neck", "lower back ache", "arthritis discomfort", "post-workout tightness", "cramping"],
    rituals: ["post-gym massage", "morning stiffness relief", "pre-stretch warming rub"],
    description: "A potent thermal botanical salve combining organic Kenyan ginger, warming cayenne resin, arnica montana extract, and clove bud oil in unrefined yellow beeswax.",
    benefits: [
      "Generates deep penetrating, comforting warmth to relax tight myofascial tissue",
      "Increases localized microcirculation to flush lactic acid from sore muscles",
      "Arnica montana relieves bruising, strains, and joint aches naturally",
      "Pleasant herbal aroma without harsh synthetic camphor smell"
    ],
    ingredients: ["Unrefined Organic Beeswax", "Arnica Montana Infused Sunflower Oil", "Cayenne Extract", "Kenyan Ginger Essential Oil", "Clove Bud Oil", "Eucalyptus Globulus Leaf Oil"],
    ritualGuide: "Scoop a nickel-sized amount with fingertips. Warm between palms and knead firmly into achy shoulders, lower back, or calves in circular motions.",
    inStock: true
  },
  {
    id: "sports-post-exercise-massage-oil",
    name: "Athletic Recovery Botanical Massage Oil",
    botanicalName: "Arnica montana & Mentha piperita",
    category: "energy-muscle",
    categoryName: "Energy, Fitness & Muscle",
    priceKES: 1750,
    rating: 4.8,
    reviewCount: 64,
    tag: "Apothecary Pick",
    image: "assets/images/muscle-balm.jpg",
    herbs: ["arnica", "peppermint", "rosemary", "black pepper", "sweet almond oil"],
    illnesses: ["delayed onset muscle soreness (DOMS)", "poor circulation", "leg heaviness", "athletic fatigue", "sprains"],
    rituals: ["post-run recovery ritual", "partner sports massage", "deep tissue release"],
    description: "Lightweight, rapid-absorbing botanical massage oil infused with wild arnica, cooling peppermint, and circulatory black pepper to revitalize exhausted limbs after physical exertion.",
    benefits: [
      "Relieves the burning sensation and heaviness of fatigued muscles",
      "Enhances lymphatic fluid return and speeds workout recovery",
      "Silky glide perfect for deep tissue sports massage therapy"
    ],
    ingredients: ["Sweet Almond Carrier Oil", "Arnica Montana Herb Extract", "Mentha Piperita Oil", "Rosmarinus Officinalis Leaf Oil", "Black Pepper Essential Oil"],
    ritualGuide: "Apply liberally to damp skin after hot shower or bath. Stroke firmly upwards toward the heart to aid lymphatic venous return.",
    inStock: true
  },
  {
    id: "natural-energy-vitality-powder",
    name: "Wild Adaptogen Plant Energy Powder",
    botanicalName: "Moringa, Baobab & Maca",
    category: "energy-muscle",
    categoryName: "Energy, Fitness & Muscle",
    priceKES: 1900,
    rating: 4.9,
    reviewCount: 77,
    tag: "High-Priority Launch",
    image: "assets/images/moringa-baobab.jpg",
    herbs: ["moringa", "baobab", "maca root", "spirulina", "cacao"],
    illnesses: ["chronic fatigue", "brain fog", "sluggish morning", "athletic burnout", "low stamina"],
    rituals: ["pre-workout botanical charge", "morning sun ignition", "creative focus booster"],
    description: "A synergistic blend of wild Kenyan moringa, high-potency baobab, raw Peruvian maca root, and ceremonial criollo cacao to ignite clean, jitter-free vitality and athletic endurance.",
    benefits: [
      "Provides sustained cellular stamina without heart palpitations or adrenal exhaustion",
      "Adaptogenic botanicals help physical body resist physical and mental stress",
      "High natural bioavailable iron, potassium, and plant polyphenols"
    ],
    ingredients: ["Organic Moringa Leaf Powder", "Wild Baobab Fruit Powder", "Gelatinized Maca Root", "Raw Organic Cacao Powder"],
    ritualGuide: "Blend 1 rounded scoop with almond milk or fresh coconut water 30 minutes before training or deep work sessions.",
    inStock: true
  },

  // 4. GUT & DIGESTIVE WELLNESS
  {
    id: "digestive-tea-blend",
    name: "Botanical Gut Harmony & Anti-Bloat Tea Blend",
    botanicalName: "Foeniculum vulgare, Mentha & Zingiber",
    category: "gut-digestive",
    categoryName: "Gut & Digestive Wellness",
    priceKES: 1400,
    rating: 4.9,
    reviewCount: 162,
    tag: "High-Priority Launch",
    image: "assets/images/hibiscus-tea.jpg",
    herbs: ["fennel", "peppermint", "ginger", "coriander seed", "licorice root"],
    illnesses: ["bloating", "acid reflux", "gas", "sluggish digestion", "stomach cramps", "gut inflammation", "ibs discomfort"],
    rituals: ["post-meal digestive rite", "tummy soothing ritual", "evening gut calm"],
    description: "A time-tested herbalist formulation of crushed sweet fennel seeds, crisp Egyptian peppermint, warming ginger, and licorice root. Alleviates post-meal abdominal distension and soothes the intestinal lining.",
    benefits: [
      "Relaxes intestinal smooth muscle to expel trapped gas and reduce bloating",
      "Supports healthy gastric acid secretion and digestive enzyme activity",
      "Licorice root coats and calms irritated mucous membranes from reflux",
      "Delightfully refreshing sweet herbal taste with no artificial sweeteners"
    ],
    ingredients: ["Organic Sweet Fennel Seeds", "Crisp Peppermint Leaves", "Crushed Ginger Rhizome", "Coriander Seeds", "DGL Licorice Root"],
    ritualGuide: "Steep 1 tablespoon in boiling water for 7 minutes immediately following heavy meals. Sip slowly while resting in an upright, relaxed posture.",
    inStock: true
  },
  {
    id: "peppermint-digestive-comfort",
    name: "Pure Egyptian Peppermint Comfort Tisane",
    botanicalName: "Mentha x piperita",
    category: "gut-digestive",
    categoryName: "Gut & Digestive Wellness",
    priceKES: 1150,
    rating: 4.8,
    reviewCount: 84,
    tag: "Apothecary Pick",
    image: "assets/images/hibiscus-tea.jpg",
    herbs: ["peppermint", "mentha piperita", "menthol"],
    illnesses: ["indigestion", "nausea", "stomach spasms", "headache", "halitosis", "sluggish gut"],
    rituals: ["cooling afternoon tonic", "mental clarity tea break", "stomach comfort sip"],
    description: "Whole dried peppermint leaves bursting with pure natural menthol essential oil. Offers immediate gastrointestinal antispasmodic comfort and crisp respiratory invigoration.",
    benefits: [
      "Natural antispasmodic effect on digestive tract muscles",
      "Cooling sensation soothes irritable bowel sensations and nausea",
      "Cleanses palate and freshens breath naturally"
    ],
    ingredients: ["100% Pure Organic Dried Peppermint Leaf Cut"],
    ritualGuide: "Steep for 5 minutes in freshly boiled water. Inhale the crisp vapor deeply before each soothing sip.",
    inStock: true
  },

  // 5. SKIN & BODY CONFIDENCE
  {
    id: "shea-butter-cream-calendula",
    name: "East African Whipped Shea & Calendula Cream",
    botanicalName: "Vitellaria nilotica & Calendula officinalis",
    category: "skin-body",
    categoryName: "Skin & Body Confidence",
    priceKES: 1650,
    rating: 5.0,
    reviewCount: 220,
    tag: "High-Priority Launch",
    image: "assets/images/shea-cream.jpg",
    herbs: ["shea butter", "calendula", "chamomile", "jojoba oil", "vitamin e"],
    illnesses: ["dry cracked skin", "eczema", "stretch marks", "skin irritation", "rough elbows", "sunburn", "scars"],
    rituals: ["body love anointing", "evening skin nourishment", "post-bath moisture seal"],
    description: "Rare East African Nilotica shea butter cold-whipped into a velvety cloud with organic calendula flower extract and soothing German chamomile. Rich in oleic acids for deep cellular skin nourishment.",
    benefits: [
      "Melts effortlessly at body temperature without waxy or gritty residue",
      "Intensely hydrates severely dry skin, cracked heels, and peeling cuticles",
      "Calendula speeds cellular regeneration and calms inflammatory eczema flareups",
      "Improves skin elasticity to diminish the appearance of new stretch marks"
    ],
    ingredients: ["Raw Nilotica East African Shea Butter", "Calendula Officinalis Flower Infused Oil", "Organic Golden Jojoba Oil", "Chamomile Essential Extract", "Tocopherol (Natural Vitamin E)"],
    ritualGuide: "Warm a dime-sized dollop between hands. Massage gently into damp skin after showering, speaking words of gratitude and reverence over your body.",
    inStock: true
  },
  {
    id: "aloe-vera-soothing-gel",
    name: "Pure Wildcrafted Aloe Vera Hydrating Gel",
    botanicalName: "Aloe barbadensis miller",
    category: "skin-body",
    categoryName: "Skin & Body Confidence",
    priceKES: 1350,
    rating: 4.8,
    reviewCount: 96,
    tag: "Bestseller",
    image: "assets/images/shea-cream.jpg",
    herbs: ["aloe vera", "aloe barbadensis", "tea tree", "witch hazel"],
    illnesses: ["sunburn", "acne breakouts", "skin inflammation", "razor bumps", "minor burns", "oily congested skin"],
    rituals: ["morning face hydration", "post-shave cooling soothing", "sun relief compress"],
    description: "Cold-pressed inner fillet aloe vera gel harvested from dry-climate Kenyan aloe farms. Quenches thirsty skin cells, alleviates heat inflammation, and soothes razor irritation without stickiness.",
    benefits: [
      "Instant cooling relief for sunburn, heat rash, and shaving irritation",
      "Lightweight non-comedogenic hydration suitable for acne-prone skin",
      "Accelerates natural tissue repair with acemannan polysaccharides"
    ],
    ingredients: ["99% Pure Organic Aloe Barbadensis Leaf Juice", "Plant Cellulose Thickener", "Natural Potassium Sorbate (Food Grade Preservation)"],
    ritualGuide: "Smooth a thin layer over cleansed skin or sunburned areas. Keep refrigerated for an ultra-refreshing cryogenic skin ritual.",
    inStock: true
  },
  {
    id: "scar-appearance-botanical-oil",
    name: "Regenerative Rosehip & Frankincense Scar Oil",
    botanicalName: "Rosa canina & Boswellia serrata",
    category: "skin-body",
    categoryName: "Skin & Body Confidence",
    priceKES: 1800,
    rating: 4.9,
    reviewCount: 71,
    tag: "Apothecary Pick",
    image: "assets/images/rosemary-oil.jpg",
    herbs: ["rosehip seed", "frankincense", "helichrysum", "vitamin e", "sea buckthorn"],
    illnesses: ["surgical scars", "acne scars", "hyperpigmentation", "stretch marks", "uneven skin tone", "fine lines"],
    rituals: ["sacred face and scar massage", "nightly skin rebirth ritual", "gentle scar healing therapy"],
    description: "Unrefined cold-pressed virgin rosehip seed oil infused with sacred Somali frankincense and everlasting helichrysum blossoms. Rich in trans-retinoic acid to fade stubborn dark spots and soften scar tissue.",
    benefits: [
      "Encourages healthy collagen alignment to soften raised fibrous scar tissue",
      "Fades hyperpigmentation and post-inflammatory acne marks",
      "Restores supple, even-toned radiance to traumatized skin"
    ],
    ingredients: ["Cold-Pressed Virgin Rosa Canina Seed Oil", "Wildcrafted Frankincense Resin Oil", "Helichrysum Italicum Flower Oil", "Sea Buckthorn Fruit Berry Extract"],
    ritualGuide: "Dispense 3-4 drops onto clean fingers. Press into scars or areas of pigmentation twice daily with mindful intention of healing.",
    inStock: true
  },

  // 6. HAIR & GROOMING
  {
    id: "rosemary-scalp-hair-oil",
    name: "Artisanal Rosemary & Castor Scalp Growth Elixir",
    botanicalName: "Rosmarinus officinalis & Ricinus communis",
    category: "hair-grooming",
    categoryName: "Hair & Grooming",
    priceKES: 1700,
    rating: 5.0,
    reviewCount: 310,
    tag: "High-Priority Launch",
    image: "assets/images/rosemary-oil.jpg",
    herbs: ["rosemary", "black castor oil", "jojoba", "peppermint", "fenugreek", "biotin"],
    illnesses: ["hair thinning", "scalp itchiness", "dandruff", "slow hair growth", "receding hairline", "dry brittle hair"],
    rituals: ["weekly scalp oiling ritual", "growth stimulation massage", "derma-roller scalp therapy"],
    description: "Clinical-grade organic rosemary essential oil blended into dark cold-pressed black castor oil, golden jojoba, and fenugreek seeds. Stimulates microcapillary blood flow directly to hair follicles.",
    benefits: [
      "Shown in herbalist studies to rival conventional minoxidil for hair thickness",
      "Reduces DHT accumulation on the scalp and slows follicle miniaturization",
      "Anti-fungal rosemary clears flaking dandruff and calms irritated scalp skin",
      "Strengthens hair shafts from root to tip, preventing premature breakage"
    ],
    ingredients: ["Pure Cineole-Rich Rosemary Essential Oil", "Black Castor Seed Oil", "Golden Jojoba Oil", "Fenugreek Seed Extract", "Peppermint Oil", "Vitamin E"],
    ritualGuide: "Part hair into sections. Apply 2-3 dropperfuls directly to the scalp. Massage deeply with fingertips for 5 minutes using circular motions. Leave for 1-3 hours or overnight before washing.",
    inStock: true
  },
  {
    id: "botanical-beard-conditioning-oil",
    name: "Cedarwood & Baobab Nourishing Beard Oil",
    botanicalName: "Cedrus atlantica & Adansonia digitata",
    category: "hair-grooming",
    categoryName: "Hair & Grooming",
    priceKES: 1450,
    rating: 4.8,
    reviewCount: 82,
    tag: "Bestseller",
    image: "assets/images/men-vitality.jpg",
    herbs: ["baobab oil", "cedarwood", "jojoba", "argan oil", "clove"],
    illnesses: ["beard itch", "beard dandruff (beardruff)", "patchy coarse beard", "dry facial hair", "ingrown hairs"],
    rituals: ["morning gentleman grooming", "beard comb ritual", "facial hair conditioning"],
    description: "A masculine grounding elixir crafted with ultra-absorbent wild baobab seed oil, Moroccan argan oil, and aromatic Atlas cedarwood. Tames coarse facial hair and hydrates the underlying skin.",
    benefits: [
      "Softens stubborn bristly whiskers without leaving an oily grease trail",
      "Stops underneath beard itching and eliminates flaking dry skin",
      "Subtle woody, spicy forest aroma that lasts throughout the day"
    ],
    ingredients: ["Virgin Kenyan Baobab Seed Oil", "Organic Moroccan Argan Oil", "Cold-Pressed Jojoba Oil", "Atlas Cedarwood Oil", "Clove Leaf Essential Oil"],
    ritualGuide: "Rub 4-6 drops into palms and distribute thoroughly through damp beard down to the skin roots. Comb through with a wooden beard comb.",
    inStock: true
  },

  // 7. MEN'S WELLNESS & INTIMATE CONFIDENCE
  {
    id: "mens-vitality-botanical-tea",
    name: "Lion's Root Men's Vitality & Stamina Tea",
    botanicalName: "Mondia whitei & Panax ginseng",
    category: "mens-wellness",
    categoryName: "Men's Wellness & Intimate Confidence",
    priceKES: 1650,
    rating: 4.9,
    reviewCount: 140,
    tag: "High-Priority Launch",
    image: "assets/images/men-vitality.jpg",
    herbs: ["mondia whitei (mukombero)", "ginseng", "ashwagandha", "tribulus", "horny goat weed", "ginger"],
    illnesses: ["low libido", "chronic fatigue", "low testosterone support", "performance anxiety", "physical stamina dip", "erectile vitality support"],
    rituals: ["morning masculine vigor tea", "pre-intimacy tonic", "workout endurance brew"],
    description: "Centuries-old African aphrodisiac Mondia Whitei (Mukombero root) synergized with Korean red ginseng and adaptogenic ashwagandha. Supports male hormonal health, physical vigor, and vitality.",
    benefits: [
      "Traditional East African root revered for enhancing male stamina and desire",
      "Supports healthy nitric oxide production and cardiovascular blood flow",
      "Adaptogens nourish adrenal glands to diminish stress-induced performance fatigue",
      "Earthy, sweet vanilla-like aroma natural to pure Mukombero root"
    ],
    ingredients: ["Ethically Harvested Kenyan Mondia Whitei Root", "Panax Red Ginseng", "Organic Ashwagandha Root", "Tribulus Terrestris", "Wild Ginger Slices"],
    ritualGuide: "Boil 1 generous tablespoon in water for 10-15 minutes. Drink warm in the early morning or 1 hour before intimacy to center masculine power.",
    inStock: true
  },
  {
    id: "couples-botanical-massage-oil",
    name: "Sacred Intimacy & Couples Warming Massage Oil",
    botanicalName: "Amyris balsamifera, Elettaria & Piper nigrum",
    category: "mens-wellness",
    categoryName: "Men's Wellness & Intimate Confidence",
    priceKES: 1950,
    rating: 5.0,
    reviewCount: 95,
    tag: "Sacred Craft",
    image: "assets/images/men-vitality.jpg",
    herbs: ["amyris", "cardamom", "black pepper", "ylang ylang", "sweet almond oil", "vitamin e"],
    illnesses: ["intimacy disconnection", "stress tension between partners", "low sensual awareness", "body insecurity"],
    rituals: ["sacred couples massage ritual", "tantric touch ceremony", "anniversary reconnection rite"],
    description: "An intoxicating sensory external massage oil featuring aphrodisiac West Indian sandalwood (amyris), warming green cardamom, erotic ylang-ylang, and golden sweet almond oil.",
    benefits: [
      "Subtle botanical thermal effect stimulates cutaneous nerve endings and intimacy",
      "Creates an exotic, warm sensual sanctuary of aroma and physical presence",
      "Leaves skin extraordinarily soft, conditioned, and touchable"
    ],
    ingredients: ["Cold-Pressed Sweet Almond Oil", "Virgin Coconut Oil", "Amyris Wood Oil", "Green Cardamom Seed Oil", "Madagascar Ylang Ylang Extra", "Black Pepper Fruit Oil"],
    ritualGuide: "Warm the amber bottle in a bowl of warm water. Dim the lights, take synchronous deep breaths together, and massage slowly into shoulders, back, and limbs.",
    inStock: true
  },

  // 8. WOMEN'S WELLNESS & INTIMATE CARE
  {
    id: "womens-hormonal-wellness-tea",
    name: "Goddess Cycle Hormonal Balance & Moon Tea",
    botanicalName: "Rubus idaeus, Vitex & Alchemilla",
    category: "womens-wellness",
    categoryName: "Women's Wellness & Intimate Care",
    priceKES: 1600,
    rating: 4.9,
    reviewCount: 188,
    tag: "High-Priority Launch",
    image: "assets/images/hibiscus-tea.jpg",
    herbs: ["red raspberry leaf", "chaste tree berry (vitex)", "lady's mantle", "nettle leaf", "rose petals"],
    illnesses: ["menstrual cramps", "pcos support", "irregular cycle", "pms mood swings", "heavy bleeding", "hormonal acne", "fertility preparation"],
    rituals: ["moon cycle tea ritual", "womb warming meditation", "sacred feminine self-care"],
    description: "Uterine tonic red raspberry leaf blended with chasteberry (vitex), organic stinging nettle, and fragrant Damascus rose petals. Restores rhythmic harmony to female endocrine and reproductive cycles.",
    benefits: [
      "Red raspberry leaf tones pelvic and uterine muscles, reducing severe cramping",
      "Vitex promotes healthy progesterone-to-estrogen balance across the cycle",
      "Nettle restores bioavailable iron lost during monthly menstruation",
      "Calms premenstrual irritability, water retention, and breast tenderness"
    ],
    ingredients: ["Organic Red Raspberry Leaves", "Chaste Tree Berries (Vitex Agnus-Castus)", "Wild Lady's Mantle", "Stinging Nettle Leaf", "Damask Rose Buds"],
    ritualGuide: "Steep 1 tablespoon covered for 10-15 minutes. Drink 1-2 cups daily, especially in the luteal and menstrual phases of your monthly cycle.",
    inStock: true
  },
  {
    id: "external-intimate-moisturizer",
    name: "Botanical Comfort External Intimate Moisturizer",
    botanicalName: "Cocos nucifera, Aloe & Calendula",
    category: "womens-wellness",
    categoryName: "Women's Wellness & Intimate Care",
    priceKES: 1750,
    rating: 4.8,
    reviewCount: 104,
    tag: "High-Priority Launch",
    image: "assets/images/shea-cream.jpg",
    herbs: ["calendula", "organic coconut oil", "shea butter", "aloe vera", "jojoba"],
    illnesses: ["external vulvar dryness", "post-intimacy chafing", "hormonal dryness", "postpartum discomfort", "cycling irritation"],
    rituals: ["daily intimate comfort care", "post-bath vulvar care", "gentle body grounding"],
    description: "Gynecologically formulated 100% natural external comfort balm. Hypoallergenic, free from fragrances, glycerin, or synthetic preservatives to soothe delicate external intimate skin.",
    benefits: [
      "Restores protective lipid barrier to prevent uncomfortable chafing and friction",
      "Soothes external tissue following child birth, menopause, or vigorous activity",
      "pH-respecting, plant-based and gentle enough for sensitive skin"
    ],
    ingredients: ["Fractionated Organic Coconut Oil", "Raw Nilotica Shea Butter", "Cold-Pressed Jojoba Oil", "CO2 Calendula Extract"],
    ritualGuide: "With clean hands, warm a small amount between fingers and apply externally to the vulvar tissue as needed for comfort.",
    inStock: true
  },

  // 9. SACRED RITUALS & HOLISTIC KITS
  {
    id: "sacred-smudge-wand-altar-kit",
    name: "Sacred Herbal Smudge Wand & Crystal Altar Kit",
    botanicalName: "Salvia apiana & Artemisia afra",
    category: "sacred-rituals",
    categoryName: "Sacred Rituals & Holistic Kits",
    priceKES: 2450,
    rating: 5.0,
    reviewCount: 119,
    tag: "Sacred Craft",
    image: "assets/images/ritual-ceremony.jpg",
    herbs: ["white sage", "african wormwood (artemisia afra / umhlonyane)", "cedar", "lavender", "quartz crystal"],
    illnesses: ["heavy negative energy", "stagnant home vibes", "spiritual heaviness", "unsettled sleep space", "mental fog"],
    rituals: ["home space cleansing ceremony", "aura smudging rite", "altar consecration", "new moon intention setting"],
    description: "Ethically wildcrafted African wormwood (Umhlonyane) bundled with mountain white sage, sweetgrass, aromatic cedar, a natural raw selenite wand, and an unrefined beeswax candle.",
    benefits: [
      "Traditional smoke medicine scientifically shown to clear airborne microbes and stagnant energy",
      "Purifies living spaces before meditation, creative projects, or sleep",
      "Connects the practitioner to ancient ancestral plant blessings and grounded focus"
    ],
    ingredients: ["Hand-Tied Herbal Smudge Wand (Sage, Umhlonyane, Cedar, Lavender)", "Raw Moroccan Selenite Crystal", "100% Pure Rolled Beeswax Candle", "Ceremonial Match Striker"],
    ritualGuide: "Light the tip of the herbal wand until embers glow. Gently wave the fragrant smoke in clockwise motions around room doorways and corners while reciting your blessings.",
    inStock: true
  },
  {
    id: "solstice-grounding-anointing-oil",
    name: "Astral Solstice Botanical Anointing Oil",
    botanicalName: "Commiphora myrrha & Boswellia carterii",
    category: "sacred-rituals",
    categoryName: "Sacred Rituals & Holistic Kits",
    priceKES: 2100,
    rating: 4.9,
    reviewCount: 76,
    tag: "Sacred Craft",
    image: "assets/images/ritual-ceremony.jpg",
    herbs: ["frankincense", "myrrh", "sandalwood", "black tourmaline infused", "golden jojoba"],
    illnesses: ["spiritual disconnection", "overthinking", "lack of grounding", "weak aura", "creative blocks"],
    rituals: ["third eye anointing", "crystal charging ritual", "prayer and meditation rite"],
    description: "Sun-infused during the solar zenith with holy Somalian frankincense tears, bitter red myrrh, and East African sandalwood, charged over raw black tourmaline crystals for deep energetic protection.",
    benefits: [
      "Deepens prayer, meditation, and intuitive dream recall",
      "Clears discordant emotional energy and protects the psychic perimeter",
      "Sublime ancient resin fragrance of ancient temples and sacred groves"
    ],
    ingredients: ["Organic Golden Jojoba Carrier Oil", "Pure Resin-Distilled Frankincense Oil", "Red Myrrh Oleoresin", "East African Sandalwood Extract", "Charged with Black Tourmaline"],
    ritualGuide: "Anoint 1 drop on the third eye between brows, palms, and soles of feet before prayer, meditation, or entering crowded environments.",
    inStock: true
  }
];

window.PRODUCTS_DATA = PRODUCTS_DATA;

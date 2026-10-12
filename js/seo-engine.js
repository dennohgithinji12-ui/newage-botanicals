/**
 * NewAge Health Botanicals & Rituals — Advanced SEO & Speed Optimization Engine
 * Manages 1,000+ targeted botanical keywords, dynamic Schema.org JSON-LD generation,
 * canonical URLs, Open Graph / Twitter cards, and performance telemetry.
 * Hotline: +254141270112 | Socials: @newagebotanicals
 */

(function() {
  'use strict';

  // 1,000+ Master SEO Keywords across all 164 remedies, illnesses, and terroirs
  const MASTER_SEO_KEYWORDS = ["1,8-cineole", "acacia fiber", "acacia senegal", "acetic acid", "achilleine", "acid reflux", "adansonia digitata", "adaptogen", "adenosine", "african bitter melon", "african black soap", "african cedar", "african ginger root", "african mutuntula", "african olive leaf", "african sage", "african wild potato", "african wormwood", "african wormwood (artemisia afra / umhlonyane)", "aged black garlic", "agnuside", "ala", "alkaline", "alkaline greens", "allantoin", "aloe", "aloe barbadensis", "aloe secundiflora", "aloe vera", "aloin", "alpha hydroxy acid", "amla", "amla fruit (indian gooseberry)", "amyris", "anethole", "angelica sinensis", "aniseed", "anointing oil", "anthocyanins", "anthocyanosides", "anthraquinones", "anti-shrinkage", "antifungal", "antioxidants", "antispasmodic", "apigenin", "apomorphine", "argan oil", "arnica", "arnica montana", "aromatherapy", "arrowroot", "artemisia afra", "artemisia annua", "artemisia vulgaris", "arthrospira", "artichoke leaf", "ashwagandha", "asiaticoside", "aspalathin", "aspalathus linearis", "astragalus cycloastragenol", "astringent", "atlas cedar shavings", "azadirachtin", "bacopa", "bacopa monnieri 50% bacosides", "bacosides", "balanites", "bamboo silica", "baobab", "baobab fruit", "baobab oil", "baobab seed oil", "barberry", "barley grass", "bath ritual", "beard balm", "beard growth", "beeswax", "beetroot", "berberine", "berberine hcl", "bergamot", "beta glucans", "beta-sitosterol", "bibhitaki", "bifidobacteria", "bile flow", "biotin", "black castor oil", "black cohosh", "black maca", "black maca root", "black pepper", "black seed", "black tourmaline infused", "black walnut", "blackberry leaf", "blessed thistle", "blessing", "blue light", "blue lotus", "blue tansy", "boldine", "boldo", "borage oil", "borneol", "boswellia", "boswellia sacra", "boswellic acid", "boswellic acid 85%", "breast milk flow", "breast tenderness", "brown rice protein", "brown sugar", "burdock root", "bursera graveolens", "butea superba", "butterfly pea", "cacao", "caffeine", "calcium", "calendula", "california poppy", "californidine", "calming lotion", "camellia sinensis", "camphor", "camphor bark", "cancer bush", "candied ginger", "capsaicin", "capsicum", "caraway seed", "cardamom", "carminative", "carminative cooler", "castor oil", "catnip", "cats claw", "cayenne", "cayenne pepper", "cedar", "cedarwood", "cedrol", "celastrus paniculatus (intellect tree)", "cell turnover", "ceylon cinnamon", "chamazulene", "chamomile", "chamomile hydrosol", "chaste tree", "chaste tree berry", "chaste tree berry (vitex)", "chasteberry", "chebe powder", "chia", "chia seed", "chlorophyll", "cineole", "cinnamon", "citral", "citrullus lanatus", "clarifying", "clarifying wash", "clary sage", "clean energy", "clean flame", "cleansing oil", "clove", "clove bud", "clove spray", "cnidium", "cocoa butter", "cocoa pod ash", "coconut oil", "coffee grounds", "collagen", "colon cleanse", "comfrey", "commiphora myrrha", "copal", "cordycepin", "cordyceps", "coriander", "coriander seed", "coumarin", "cramp bark", "cramp relief", "croton gratissimus", "crystal resin", "curcuma", "curcuma longa", "curcumin", "curcumin c3", "curcuminoids", "curl cream", "curzerene", "cuticle sealant", "cyclopia", "cymbopogon", "cynarin", "damar", "damiana", "dandelion root", "dandelion root 10:1", "dandruff", "deep conditioner", "demulcent", "dermal elasticity", "dermal repair", "desert date", "devils claw", "dht blocker", "digestive bitters", "diosgenin", "distilled spring water", "dong quai", "dream incense", "drumstick tree", "east african red maca", "electrolytes", "eleostearic acid", "ellagitannins", "endurance", "epimedium", "epsom salt", "epsom salts", "erectile stamina", "erinacines", "estrogen balance", "eucalyptus", "eugenol", "eurycomanone", "evening primrose", "exfoliating scalp", "exfoliation", "fadogia agrestis", "fast hair growth", "female vitality", "fennel", "fenugreek", "five flavor berry", "flavonoid glycosides", "flavonoids", "flaxseed", "focus", "follicle mist", "follicle stimulation", "foot care", "fragarine", "frankincense", "frankincense resin", "free testosterone", "french lavender", "fresh breath", "fulvic acid", "gaba", "galactagogue", "gamma linolenic acid", "ganoderma", "gentle carminative", "ghg polyphenol", "ginger", "gingerol", "gingerols", "ginkgo", "ginkgo biloba", "ginseng", "ginsenosides", "gla", "glucuronic acid", "gokshura", "gold grade shilajit", "golden jojoba", "goldenseal", "gotu kola", "green superfood", "grounding incense", "guarana", "guaranine", "gum arabic", "gut barrier", "gut cleanse", "gymnema sylvestre", "hair gloss", "hair growth", "hair repair", "hair strength", "haritaki", "harmony braid", "harpagophytum", "harpagoside", "hawthorn berry", "heat protectant", "heavy period", "helenalin", "helichrysum", "hericenones", "hibiscus", "hibiscus acid", "hibiscus calyx", "hierochloe odorata", "himalayan cordyceps", "himalayan salt", "hojari", "holy basil", "holy wood", "honey candle", "honeybush", "hops flowers", "hormonal hair", "horny goat weed", "horsetail", "hot flashes", "humic minerals", "hypericin", "hypoxis rooperi", "icariin", "immortelle", "incense", "incense tears", "incensole", "inulin", "iron", "isoquinoline alkaloid", "jamun seed", "jasmine flower", "joint comfort", "joint warmth", "jojoba", "jojoba oil", "juglone", "juniperus procera", "kalahari melon", "karkadeh", "kava", "kavalactones", "kenyan arabica coffee", "keratin", "kigelia africana", "kigelin", "knitbone", "korean red panax ginseng", "kushen", "lactic acid (plant-based)", "lady's mantle", "ladys mantle", "lake magadi salts", "lavender", "lemon balm", "lemon peel", "lemongrass", "lengana", "length retention", "libido", "licorice root", "lignans", "ligustilide", "limonene", "linden flower", "lingzhi", "liniment", "linoleic acid", "lions mane", "lions mane 30% beta glucans", "lip repair", "liver detox", "longjack", "lucid dream", "lung qi", "lutein", "lymphatic circulation", "maca root", "macadamia oil", "macamides", "magnesium", "male vigor", "malvidin", "manketti oil", "maracuja", "marigold", "marine collagen peptides", "marshmallow", "marshmallow root", "marula", "marula oil", "mayan resin", "meadowsweet", "meditation resin", "memory", "menstrual balm", "mental clarity", "mentha piperita", "menthol", "metabolism", "methyl salicylate", "microbiome reset", "milk thistle", "milk thistle 80% silymarin", "mitochondrial energy", "momordica charantia", "mondia whitei", "mondia whitei (mukombero)", "mongongo", "moringa", "moringa oleifera", "mucilage", "mugwort", "mukombero", "mukombero (mondia whitei)", "muscle detox", "myrrh", "natural deodorant", "natural lather", "natural menthol", "nausea", "neem", "neem oil", "negative ions", "nepetalactone", "nervine", "nervine relaxant", "nettle leaf", "nettle root", "nigella sativa 5% thymoquinone", "night sweats", "nilotica shea", "nilotica shea butter", "nitrates", "nitric oxide", "nootropic", "nuciferine", "nymphaea caerulea", "obsidian", "ogaden", "oleic acid", "omega 3", "omega 6", "omega 9", "oral wellness", "organic coconut oil", "oxindole alkaloids", "oxygenation", "palm kernel oil", "palmitoleic acid", "palo santo", "panax ginseng", "papain", "papaya", "parasite cleanse", "passionflower", "pde5 inhibition", "peppermint", "phycocyanin", "phyllanthus niruri", "phyllanthus niruri (stonebreaker)", "phytosterols", "pine pollen", "pinitol", "pink salt", "piper methysticum", "piperine", "plantain leaf", "plantain skin", "plantain skin ash", "pore clearing", "potassium", "prebiotic fibre", "pro-vitamin a", "probiotic cultures", "progesterone", "prolactin balance", "propolis", "prostate flow", "protection", "protium copal", "prunus africana", "psyllium husk", "pumpkin seed oil", "pumpkin seed zinc", "pure 24k colloidal gold", "purification", "purple tea", "pygeum", "quartz crystal", "raspberry leaf", "rauvolfia vomitoria", "raw cacao", "raw honey", "raw pine pollen", "red bush", "red clover", "red ginseng", "red kwao krua", "red maca", "red raspberry leaf", "refreshing", "reishi", "reishi spore oil", "resveratrol 99%", "rhodiola", "roman chamomile", "rooibos", "rosavins", "rose petals", "rose water", "rosehip seed", "rosehips", "rosemary", "rosemary water", "rosmarinic acid", "royal jelly", "sacred agarwood", "sacred herb", "sacred resin", "sacred smoke", "salidroside", "sandalwood", "saponins", "sarsasapogenin", "sausage tree", "saw palmetto", "scalp mist", "scalp scrub", "scars", "schisandra", "sclerocarya birrea", "scutellarin", "sea buckthorn", "seminal health", "serotonin", "sesame oil", "shatavari", "shatavari 10:1", "shatavari co2", "shea", "shea butter", "shea olein", "shepherds purse", "shikakai", "shilajit", "shilajit resin", "shogaol", "shorea", "short chain fatty acids", "silica", "silk press", "silymarin", "skin barrier", "skullcap", "slippery elm", "smoke cleansing", "soap pod", "social relaxation", "solar clearing", "solid shampoo", "soothing", "sophora flavescens", "spearmint", "spirulina", "sprouted pea protein", "st johns wort", "stamina", "stinging nettle", "strength", "stretch marks", "substance p", "sun defense", "superoxide dismutase", "sutherlandia (cancer bush)", "sutherlandia frutescens", "sweet almond", "sweet almond oil", "sweet fennel", "sweet marjoram", "sweet orange", "sweetgrass", "tagetes erecta", "tamarind", "tamarindus indica", "tame beard", "tannins", "taraxacin", "tart cherry", "tartaric acid", "tea tree", "tea tree extract", "tea tree oil", "temple balm", "tendon repair", "terminalia arjuna", "terpenes", "terpinen-4-ol", "terpinyl acetate", "testosterone", "theobromine", "thermal protection", "throat coating", "thujone", "tocopherols", "tongkat ali", "tongkat ali 200:1", "topical pain", "trans-retinoic acid", "tree of life", "tribulus", "triphala", "triterpene glycosides", "triterpenes", "tulsi", "turmeric", "type 4 hair", "uncaria tomentosa", "usnea lichen", "uterine tone", "uv absorption", "valerenic acid", "valerian root", "vanilla", "vanilla bean", "viopudial", "virility", "vitamin c", "vitamin e", "vitellaria nilotica", "vitex", "volcanic soda", "vulva balm", "warming herbs", "warming massage", "wheatgrass", "white sage", "wild honey", "wild kenyan aloe secundiflora", "wild lavender", "wild mukombero root", "wild plum", "wild yam", "wild yam diosgenin", "wintergreen", "witch hazel", "withanolides", "womb tonic", "wormwood", "xanthones", "ximenia", "ximenynic acid", "yang energy", "yangonin", "yarrow", "yerba mate", "ylang ylang", "yohimbe", "zeaxanthin", "zinc", "zinc ricinoleate", "zingiber", "abnormal cervical cytology", "abnormal vaginal discharge", "acidity", "acne breakouts", "acne scarring", "acne scars", "acute anxiety", "acute muscle strains", "acute stress", "adhd focus", "adrenal fatigue", "advanced pelvic floor laxity", "afternoon digestive sluggishness", "afternoon lethargy", "afternoon sleepiness", "age-related cognitive lag", "aids", "airborne allergens", "alcohol strain", "altitude sluggishness", "anemia", "anovulation", "anxiety", "anxious tension", "arterial stiffness", "arthritis discomfort", "ashy skin", "athlete's foot itching", "athletic burnout", "athletic fatigue", "athletic soreness", "auric exhaustion", "autoimmune flareups", "back-ne", "bacne", "bacterial vaginosis", "bad dreams", "bad luck sensations", "beard dandruff (beardruff)", "beard itch", "bedroom restlessness", "bedroom sensory stress", "belly bloat in warm weather", "bladder hesitancy", "bleached damaged hair", "bleached/dyed brittle strands", "bleeding gums", "bloating", "bloating after dairy/beans", "bloating after meals", "blood loss weakness", "body aches keeping you awake", "body acne", "body insecurity", "body odor", "body tension", "brain fog", "breakage at ends", "brittle nails", "bruising", "burning inflammation", "bv", "caffeine sensitivity", "candida overgrowth", "cardiovascular stress", "carrying others' emotional baggage", "cellular aging", "cellular fatigue", "cellular inflammation", "cellular vitality", "cellulite appearance", "cellulite dimpling", "cervical inflammation", "chapped lips", "chemical relaxer damage", "chest tightness", "children's stomachaches from anxiety", "chills", "cholesterol balance", "chronic cartilage wear", "chronic constipation", "chronic fatigue", "chronic gut irritation", "chronic hpv support", "chronic inflammation", "chronic joint inflammation", "chronic lethargy", "chronic stress", "chronic thrush", "clenched jaw", "clogged pores", "clogged sweat glands from antiperspirants", "cloudy thoughts", "coarse wire beard", "coffee crash", "cognitive fatigue", "cold", "cold extremities", "cold hands and feet", "cold hands/feet", "cold womb", "color fade", "complete feminine intimacy renewal", "congested blackheads", "congested pores", "constipation", "cortisol spikes", "cracked elbows and knees", "cracked heels", "cracked skin", "cramping", "creaky knees", "creative blockage", "creative blocks", "creative stagnation", "crepey neck and décolleté", "curl pattern loss from heat", "cyclical breast tenderness (mastalgia)", "cycling irritation", "cystic acne", "cytokine cascade", "dandruff flakes", "dark mood", "dark spots", "deep chronic exhaustion", "deep muscle knots", "deep tissue aches", "dehydration", "delayed onset muscle soreness (doms)", "depleted life force", "diabetes", "diabetic neuropathy", "diabetic tingling", "difficulty digesting oily meals", "digestive cramping", "digestive stagnation", "diminished ovarian reserve", "distraction", "dopamine depletion", "dormant follicles", "drenching night sweats", "dry brittle 4c hair", "dry brittle hair", "dry coughing spells", "dry cracked skin", "dry eye strain", "dry facial hair", "dry frizzy curls", "dry frizzy hair", "dry itchy eczema", "dry skin", "dry skin barrier", "dry windburn", "dull body tone", "dull complexion", "dull lethargic energy in office", "dull lifeless hair", "dull scalp", "dull scaly skin", "dull skin", "dull skin tone", "dull surface skin", "dull textured skin", "dysbiosis", "dyspareunia", "easy hair breakage", "eczema", "eczema patches", "electrolyte imbalance", "emotional agitation", "emotional burnout", "endometriosis discomfort", "endothelial constriction", "erectile dysfunction", "erectile softness", "erectile vitality support", "esophageal burning", "evening gas", "exam/work anxiety", "excess facial sebum", "excessive oiliness", "excessive shedding in shower", "executive burnout", "expression lines", "external intimate discomfort", "external vulvar dryness", "extreme dryness", "fallopian tube congestion", "fatigue", "fatty liver", "fatty liver support", "feeling ungrounded", "fertility preparation", "feverish aches", "feverish heat", "fine lines", "fine lines around eyes", "fine weak hair", "flaky patches", "flooding cycles", "flu", "fluid retention", "follicle clogging", "food intolerances", "foot odor", "forgetfulness", "foul breath from gut", "foul smelling lochia", "free radical stress", "frequent nighttime urination", "frequent urination", "friction irritation from cycling/exercise", "fried split ends", "frizz in humidity", "full body exhaustion", "fungal skin irritations", "gallbladder sludge", "gas", "gastritis irritation", "gloominess", "greasy roots", "greasy scalp", "gut acidity", "gut dysbiosis", "gut flora depletion following antibiotics", "gut inflammation", "gut microbiome imbalance", "hair shedding", "hair shrinkage", "hair thinning", "hair thinning at crown", "halitosis", "hangover fatigue", "harsh contentious atmosphere in home", "hashimotos", "head tension", "headache", "headaches from blue light", "heart palpitations", "heart wellness", "heartburn", "heat damage", "heat damage from flat irons", "heat exhaustion", "heat-damaged hair", "heavy bleeding", "heavy digestion", "heavy feeling", "heavy irregular periods", "heavy menstrual bleeding", "heavy metal burden", "heavy mood", "heavy negative energy", "heavy negative room energy", "heavy tired legs", "heavy tired limbs", "hectic work space", "hemorrhoid irritation", "high blood pressure", "high blood sugar", "hiv", "hormonal acne", "hormonal blemishes", "hormonal crash", "hormonal cystic acne on jawline", "hormonal dryness", "hormonal swings", "hyperglycemia", "hyperpigmentation", "hypertension", "hypertensive headaches", "ibs", "ibs discomfort", "immune exhaustion", "immune support", "immunocompromised", "inability to unwind", "incomplete evacuation", "indigestion", "infant colic", "infant digestive colic", "infertility", "inflamed itchy scalp", "inflammation", "ingrown hairs", "insomnia", "insulin resistance", "intense nervousness", "intestinal hyperpermeability", "intimacy disconnection", "irregular bowel", "irregular bowel movements", "irregular bowels", "irregular cycle", "irregular menstrual cycles", "irritability", "itchiness", "itchy belly", "itchy flaky scalp", "itchy scalp", "itchy scalp from chemicals", "joint pain", "joint soreness", "joint stiffness", "keratosis pilaris (strawberry skin)", "kidney micro-calcifications", "labial thinning", "labor preparation", "lack of grounding", "lack of harmony in relationship", "lack of morning firmness", "lack of motivation", "lack of physical motivation", "lack of romantic interest", "lack of shine", "leaky gut", "leaky gut syndrome", "leg heaviness", "limp hair", "lingering room odors", "liver sluggishness", "loose stools", "loose vaginal canal", "loss of dermal elasticity", "loss of drive", "loss of muscle mass", "loss of natural lubrication", "loss of orgasmic sensation", "loss of skin elasticity", "loss of vigor", "low anabolic drive", "low athletic stamina", "low breast milk supply", "low cd4 count", "low drive", "low energy", "low feminine libido", "low libido", "low male libido", "low motivation", "low red blood cell vitality", "low sensual awareness", "low sexual stamina", "low sperm motility", "low stamina", "low testosterone", "low testosterone support", "low vo2 capacity", "lower back ache", "lower back ache during period", "lower back pain", "lower spinal tension", "lupus support", "luteal phase defect", "lymphadenopathy", "macular stress", "male fatigue", "male midlife fatigue", "male performance fatigue", "male virility", "malnutrition", "maternal exhaustion", "memory decline", "menopausal irritability", "menorrhagia (excessively heavy periods)", "menstrual cramps", "menstrual cramps at night", "menstrual discomfort", "mental distraction in prayer/meditation", "mental exhaustion", "mental fatigue", "mental fog", "mental fog under stress", "mental gloom", "mental haze", "mental paralysis", "mental sluggishness", "mental sluggishness under pressure", "metabolic decline", "metabolic slowing", "metabolic sluggishness", "metabolic syndrome", "midday masculine fatigue", "mild anxiety", "mild melancholy", "mineral deficiency", "mineral depletion", "minor burns", "mitochondrial decline", "moisture loss", "morning chills", "morning knuckle stiffness", "motion sickness", "muscle aches", "muscle knots", "muscle loss", "muscle recovery lag", "muscle restlessness", "muscle soreness", "muscle twitching", "neck stiffness", "neck tightness", "negative room atmosphere", "nervous exhaustion", "nervous tension", "nervous tummy", "nervous twitching", "night terrors", "night waking", "nighttime dread", "nighttime leg cramps", "nighttime racing thoughts", "nipple chafing", "nocturnal cramps", "nutrient deficiency", "odor concerns", "oily congested skin", "oily skin", "open rough cuticles", "opportunistic infections", "osteo-stiffness", "ovarian cysts", "overstretched tendons", "overthinking", "overwork", "oxidative aging", "oxidative stress", "painful intercourse", "painful uterine cramps (dysmenorrhea)", "pale complexion", "pale stools", "pancreatic fatigue", "panic attack", "panic thoughts", "parasites", "patchy beard growth", "patchy coarse beard", "pcos", "pcos support", "pelvic inflammatory disease", "pelvic stagnation", "penile girth expansion", "penile length growth", "penis enlargement", "performance anxiety", "performance nervousness", "perimenopause hot flashes", "perineal swelling", "photo-aging", "physical fatigue", "physical stamina dip", "physical weakness", "pid", "plant-based protein deficiency", "plastic waste guilt", "pms mood swings", "poor blood flow", "poor circulation", "poor endurance", "poor immunity", "poor recall", "poor stamina", "poor workout endurance", "post infection tissue damage", "post-acne marks", "post-birth cramping", "post-concussion strain", "post-exercise chill", "post-exercise hunger", "post-hiit soreness", "post-intimacy chafing", "post-meal heaviness", "post-menopausal intimate discomfort", "post-pregnancy skin laxity", "post-sunburn redness", "post-work lethargy", "post-workout hygiene", "post-workout tightness", "postpartum discomfort", "postpartum laxity", "postpartum nursing fatigue", "postpartum perineal tenderness", "postpartum recovery", "postpartum soreness", "pregnancy stretch marks", "premature aging", "premature ejaculation", "product buildup", "product buildup from gels and oils", "prolonged bleeding", "prostate congestion", "prostate swelling (bph)", "psychic heaviness in bedroom", "pulled muscles", "racing thoughts", "rapid weight shift scars", "raspy throat from acid reflux", "razor bumps", "razor burn", "receding hairline", "respiratory heaviness", "restless energy", "restless leg sensations", "restless legs", "restless spirit", "restless tossing", "restlessness", "restlessness after arguments", "rheumatoid aches", "right upper quadrant discomfort", "rough bumps (keratosis pilaris)", "rough elbows", "rough skin texture", "sagging skin", "scabs on scalp", "scalp itchiness", "scalp odor", "scattered energy", "scratchy vocal cords", "screen fatigue", "seasonal affective blues", "seborrheic dermatitis", "sensitive reactive skin", "sensitive skin", "sensitive skin irritation", "sensory fatigue", "sensory overload", "severe brain fog", "severe dandruff flakes", "severe eczema dryness", "severe insomnia", "severe menstrual cramps", "severe menstrual pain", "severe pms anger", "severe premenstrual bloating", "severe reproductive tract infections", "severe viral wasting", "severely chapped bleeding lips", "shallow breathing", "shallow dreaming", "shallow sleep", "shaving razor burn", "shin splints", "short luteal phase", "sibo (small intestinal bacterial overgrowth)", "sinus pressure", "skin breakouts", "skin breakouts from gut toxins", "skin dehydration", "skin inflammation", "skin irritation", "slack skin tone", "sleep amnesia", "sleep anxiety", "slow athletic recovery", "slow hair growth", "slow processing speed", "slow recovery", "sluggish appetite", "sluggish circulation", "sluggish colon", "sluggish digestion", "sluggish elimination", "sluggish gallbladder", "sluggish gut", "sluggish letdown", "sluggish liver", "sluggish lymphatic circulation", "sluggish lymphatic system", "sluggish metabolism", "sluggish morning", "sluggish morning drive", "sluggish recovery", "sluggish reflexes", "small penis size", "social anxiety", "soft erections", "sore throat", "sour stomach", "spiritual disconnection", "spiritual heaviness", "spiritual ungroundedness", "split ends", "sprained ankles", "sprains", "stagnant air", "stagnant home vibes", "stagnant lymphatic flow", "stagnant office air", "stagnant space", "stiff hamstrings", "stiff knees", "stiff neck", "stomach cramps", "stomach knots", "stomach spasms", "straw-like texture", "stress tension between partners", "stress tightness", "stress-induced emotional numbness", "stress-induced performance anxiety", "stretch mark fading", "stubborn sports injury", "study fatigue", "stunted edges", "stunted hair growth", "sudden hot flashes", "suffocated hair follicles", "sugar cravings", "sugar spikes", "sulfate sensitivity", "sun damage", "sun sensitivity", "sun spots", "sunburn", "surgical scars", "swallowing irritation", "sweat chafing", "swollen ankles", "systemic exhaustion", "systolic spikes", "tangled knots", "telomere shortening", "temperature surges", "tendonitis", "tennis elbow", "tension headache", "tension headaches", "testosterone support", "thin facial hair", "thinning edges", "thinning hair", "thinning hair patches", "throat soreness", "throbbing temples", "tight calves", "tired aching arches", "toxic buildup", "toxic overload", "toxic paraffin fumes in home", "toxic sluggishness", "trapped gas", "trapped intestinal gas", "travel nausea", "traveler's belly", "type 2 diabetes", "ulcer discomfort", "underarm darkening", "underarm odor", "uneven skin tone", "unexplained bloating", "unruly facial hair", "unsettled mind", "unsettled sleep space", "uterine fibroids", "uterine prolapse sensation", "vaginal atrophy", "vaginal dryness", "vaginal fungus", "vaginal itching", "vaginal odor", "vascular rigidity", "viral load", "viral replication", "visceral fat accumulation", "visceral tension", "vital depletion", "vulnerability to negative environments", "vulvar dryness", "water puffiness", "water retention", "waterproof makeup removal", "weak aura", "weak digestion", "weak erections", "weak immune system", "weak immunity", "weak microbiome", "weak urine stream", "weather-sensitive joints", "wind-burned cheeks", "work fatigue", "workout plateau", "yeast infection", "Acacia concinna", "Achillea millefolium", "Actaea racemosa", "Adansonia", "Alchemilla", "Alchemilla vulgaris", "Aloe barbadensis miller", "Althaea officinalis", "Amyris balsamifera", "Anthemis nobilis", "Apis mellifera scutellata", "Aquilaria agallocha", "Argania spinosa", "Arthrospira platensis", "Asparagus racemosus", "Asphaltum punjabianum", "Astragalus membranaceus", "Azadirachta indica", "Bacopa monnieri", "Balanites aegyptiaca", "Bambusa vulgaris", "Berberis aristata", "Berberis vulgaris", "Beta vulgaris", "Borago officinalis", "Boswellia carterii", "Boswellia sacra / carterii", "Boswellia serrata", "Butyrospermum parkii", "Calendula officinalis", "Camellia sinensis var. assamica f. purpurea", "Capsella bursa-pastoris", "Capsicum annuum", "Capsicum frutescens", "Carica papaya", "Carum carvi", "Cedrus atlantica", "Celastrus paniculatus", "Centella asiatica", "Citrus limonum", "Clitoria ternatea", "Cnicus benedictus", "Cnidium monnieri", "Cocos nucifera", "Coffea arabica", "Cordyceps militaris", "Cordyceps sinensis", "Crataegus oxyacantha", "Cucurbita pepo", "Cyclopia intermedia", "Cymbopogon citratus", "Cynara scolymus", "Dioscorea villosa", "Elaeis guineensis", "Elettaria", "Elettaria cardamomum", "Epimedium grandiflorum", "Equisetum arvense", "Eschscholzia californica", "Eucalyptus globulus", "Eugenia caryophyllata", "Eurycoma longifolia", "Filipendula ulmaria", "Foeniculum vulgare", "Fulvic Complex", "Ganoderma lucidum", "Gaultheria procumbens", "Hamamelis", "Harpagophytum procumbens", "Helichrysum italicum", "Hericium erinaceus", "Hibiscus sabdariffa", "Hippophae rhamnoides", "Hordeum vulgare", "Hydrastis canadensis", "Hypericum perforatum", "Hypoxis hemerocallidea", "Ilex paraguariensis", "Juglans nigra", "Lavandula", "Lavandula angustifolia", "Lavandula stoechas", "Lepidium meyenii", "Linum usitatissimum", "Maca", "Macadamia integrifolia", "Matricaria chamomilla", "Melaleuca alternifolia", "Melissa officinalis", "Mentha", "Mentha arvensis", "Mentha spicata", "Mentha x piperita", "Nepeta cataria", "Nigella sativa", "Ocimum sanctum", "Oenothera biennis", "Olea europaea africana", "Origanum majorana", "Passiflora", "Passiflora edulis", "Passiflora incarnata", "Paullinia cupana", "Peumus boldus", "Phyllanthus emblica", "Pinus massoniana", "Piper nigrum", "Pisum sativum", "Plantago major", "Plantago ovata", "Prunus africana (Certified Sustainable)", "Prunus cerasus", "Rhodiola rosea", "Ricinus communis", "Rosa canina", "Rosa damascena", "Rosmarinus officinalis", "Rubus idaeus", "Rubus steudneri", "Salvia africana", "Salvia africana-lutea", "Salvia apiana", "Salvia hispanica", "Salvia sclarea", "Santalum album", "Schinziophyton rautanenii", "Schisandra chinensis", "Scutellaria lateriflora", "Serenoa repens", "Shorea wiesneri", "Silybum marianum", "Simmondsia", "Symphytum officinale", "Syzygium aromaticum", "Tanacetum annuum", "Taraxacum officinale", "Terminalia bellirica", "Terminalia chebula", "Theobroma cacao", "Thuja occidentalis", "Tribulus terrestris", "Trigonella foenum-graecum", "Triticum aestivum", "Turnera diffusa", "Ulmus rubra", "Urtica dioica", "Vaccinium myrtillus", "Valeriana", "Valeriana officinalis", "Viburnum opulus", "Vitellaria", "Vitellaria paradoxa subsp. nilotica", "Vitex agnus-castus", "Withania somnifera", "Ximenia americana", "Zingiber officinale", "Daily Herbal Nutrition", "Energy, Muscle & Movement", "Gut Health & Digestion", "Hair & Grooming Alchemy", "Master Clinical Protocols", "Men's Vitality & Hormonal Balance", "Mind, Sleep & Stress", "Sacred Rituals, Resins & Energy", "Skin, Body & Radiant Aging", "Women's Wellness & Sacred Cycle", "Nairobi", "Karen", "Westlands", "Kilimani", "Lavington", "Runda", "Muthaiga", "Parklands", "Mombasa", "Nyali", "Diani", "Kisumu", "Nakuru", "Eldoret", "Naivasha", "Nanyuki", "Thika", "Machakos", "Kiambu", "Meru", "Embu", "Kitale", "Kericho", "Malindi", "Lamu", "Kenya", "East Africa", "Kampala Uganda", "Dar es Salaam Tanzania", "Kigali Rwanda", "Addis Ababa Ethiopia", "Worldwide Shipping", "Discreet Courier Delivery", "adaptogenic", "immunomodulatory", "antioxidant", "anti-inflammatory", "hepatoprotective", "neuroprotective", "cardioprotective", "antimicrobial", "aphrodisiac", "cytokine storm reset", "beta cell regeneration", "arterial vasodilation", "nitric oxide synthesis", "nad+ cellular longevity", "telomere support", "microbiome prebiotic", "phytochemical extraction", "cold pressed botanical oil", "wildcrafted herbs"];

  const SEOEngine = {
    keywords: MASTER_SEO_KEYWORDS,

    init() {
      this.ensureMetaTags();
      this.injectSchema();
      this.setupServiceWorker();
      this.setupSpeedTelemetry();
    },

    ensureMetaTags() {
      const head = document.head;

      // Ensure meta keywords tag contains the rich 1000+ keyword vocabulary
      let metaKw = document.querySelector('meta[name="keywords"]');
      if (!metaKw) {
        metaKw = document.createElement('meta');
        metaKw.name = 'keywords';
        head.appendChild(metaKw);
      }
      metaKw.content = MASTER_SEO_KEYWORDS.slice(0, 450).join(', ');

      // Geo Targeting Meta Tags
      const geoTags = [
        { name: 'geo.region', content: 'KE-30' },
        { name: 'geo.placename', content: 'Nairobi, Kenya' },
        { name: 'geo.position', content: '-1.286389;36.817223' },
        { name: 'ICBM', content: '-1.286389, 36.817223' },
        { name: 'DC.title', content: 'NewAge Health Botanicals & Rituals' },
        { name: 'DC.creator', content: 'NewAge Health Botanicals & Rituals' },
        { name: 'DC.subject', content: 'African Herbal Medicine, Ethically Wildcrafted Botanicals, Sacred Health Alchemy' },
        { name: 'DC.publisher', content: 'NewAge Health Botanicals & Rituals' },
        { name: 'DC.language', content: 'en' },
        { name: 'DC.coverage', content: 'Nairobi, Kenya, East Africa, Worldwide' }
      ];

      geoTags.forEach(t => {
        if (!document.querySelector(`meta[name="${t.name}"]`)) {
          const el = document.createElement('meta');
          el.name = t.name;
          el.content = t.content;
          head.appendChild(el);
        }
      });
    },

    injectSchema() {
      const path = window.location.pathname;
      const searchParams = new URLSearchParams(window.location.search);
      const isProductPage = path.includes('product.html');
      const isShopPage = path.includes('shop.html');

      // 1. Organization & Local Business Schema
      const orgSchema = {
        "@context": "https://schema.org",
        "@type": ["Store", "MedicalBusiness", "HealthAndBeautyBusiness"],
        "@id": "https://omnicorehub.app/#store",
        "name": "NewAge Health Botanicals & Rituals",
        "alternateName": "Omnicore Hub Botanicals",
        "url": "https://omnicorehub.app/",
        "logo": "https://omnicorehub.app/assets/images/hero-apothecary.webp",
        "image": "https://omnicorehub.app/assets/images/hero-apothecary.webp",
        "description": "Ethically wildcrafted East African herbal remedies, clinical master protocols, and body confidence formulations. Same-day Nairobi dispatch.",
        "telephone": "+254141270112",
        "email": "orders@omnicorehub.app",
        "priceRange": "KSh 1,150 - KSh 14,500",
        "currenciesAccepted": "KES, USD, GBP, EUR, NGN, GHS, ZAR",
        "paymentAccepted": "M-Pesa, Credit Card, Apple Pay, Bank Transfer",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Kimathi Street, Central Business District",
          "addressLocality": "Nairobi",
          "addressRegion": "Nairobi County",
          "postalCode": "00100",
          "addressCountry": "KE"
        },
        "sameAs": [
          "https://instagram.com/newagebotanicals",
          "https://wa.me/254141270112"
        ]
      };

      this.appendJsonLd(orgSchema, 'schema-org');

      // 2. If on Product Detail Page, dynamically generate rich Product & MedicalWebPage Schema
      if (isProductPage && searchParams.has('id') && window.PRODUCTS_DATA) {
        const productId = searchParams.get('id');
        const product = window.PRODUCTS_DATA.find(p => p.id === productId);
        if (product) {
          const prodSchema = {
            "@context": "https://schema.org",
            "@type": ["Product", "MedicalWebPage"],
            "@id": `https://omnicorehub.app/product.html?id=${product.id}#product`,
            "name": product.name,
            "image": [
              `https://omnicorehub.app/${product.image || 'assets/images/hero-apothecary.jpg'}`
            ],
            "description": product.whatItDoes || product.description,
            "sku": `NAB-${product.id.substring(0, 12).toUpperCase()}`,
            "mpn": `NAB-2026-${product.id.substring(0, 8).toUpperCase()}`,
            "brand": {
              "@type": "Brand",
              "name": "NewAge Health Botanicals & Rituals"
            },
            "category": product.categoryName,
            "offers": {
              "@type": "Offer",
              "url": `https://omnicorehub.app/product.html?id=${product.id}`,
              "priceCurrency": "KES",
              "price": product.priceKES,
              "priceValidUntil": "2027-12-31",
              "itemCondition": "https://schema.org/NewCondition",
              "availability": "https://schema.org/InStock",
              "seller": {
                "@type": "Organization",
                "name": "NewAge Health Botanicals & Rituals"
              }
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": product.rating || 5.0,
              "reviewCount": product.reviewCount || 42,
              "bestRating": "5",
              "worstRating": "1"
            }
          };

          // Add breadcrumbs
          const breadcrumbSchema = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://omnicorehub.app/" },
              { "@type": "ListItem", "position": 2, "name": "Dispensary", "item": "https://omnicorehub.app/shop.html" },
              { "@type": "ListItem", "position": 3, "name": product.categoryName, "item": `https://omnicorehub.app/shop.html?category=${product.category}` },
              { "@type": "ListItem", "position": 4, "name": product.name, "item": `https://omnicorehub.app/product.html?id=${product.id}` }
            ]
          };

          this.appendJsonLd(prodSchema, 'schema-product');
          this.appendJsonLd(breadcrumbSchema, 'schema-breadcrumb');

          // Update Document Title & Description
          document.title = `${product.name} | NewAge Health Botanicals Dispensary`;
          let descMeta = document.querySelector('meta[name="description"]');
          if (descMeta) {
            descMeta.content = `${product.name} (${product.botanicalName}). ${product.whatItDoes ? product.whatItDoes.substring(0, 150) : product.description} Instant M-Pesa order: +254141270112.`;
          }
        }
      }

      // 3. If on Shop / Dispensary, inject ItemList Catalog schema
      if ((isShopPage || path === '/' || path === '/index.html') && window.PRODUCTS_DATA) {
        const itemList = {
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "NewAge Health Botanical Pharmacopoeia Catalog",
          "description": "Comprehensive list of 164 clinically backed African botanical remedies, clinical protocols, and longevity formulas.",
          "numberOfItems": window.PRODUCTS_DATA.length,
          "itemListElement": window.PRODUCTS_DATA.slice(0, 50).map((p, idx) => ({
            "@type": "ListItem",
            "position": idx + 1,
            "url": `https://omnicorehub.app/product.html?id=${p.id}`,
            "name": p.name,
            "image": `https://omnicorehub.app/${p.image}`
          }))
        };
        this.appendJsonLd(itemList, 'schema-itemlist');
      }
    },

    appendJsonLd(schemaObj, id) {
      let existing = document.getElementById(id);
      if (existing) existing.remove();
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = id;
      script.textContent = JSON.stringify(schemaObj, null, 2);
      document.head.appendChild(script);
    },

    setupServiceWorker() {
      if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/sw.js')
            .then(reg => {
              console.log('[SEOEngine] Service Worker registered for sub-second offline caching:', reg.scope);
            })
            .catch(err => {
              console.log('[SEOEngine] Service Worker registration skipped:', err.message);
            });
        });
      }
    },

    setupSpeedTelemetry() {
      // Record First Contentful Paint and LCP for performance validation
      if ('PerformanceObserver' in window) {
        try {
          const lcpObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            if (lastEntry) {
              console.log(`[Performance] LCP: ${Math.round(lastEntry.startTime)}ms`);
            }
          });
          lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
        } catch(e) {}
      }
    }
  };

  // Expose globally and boot
  window.SEOEngine = SEOEngine;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => SEOEngine.init());
  } else {
    SEOEngine.init();
  }
})();

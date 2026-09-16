/**
 * NewAge Health Botanicals & Rituals - AI Herbalist Consultation Engine
 * Dual-Engine Architecture:
 * 1. Ultra-Fast Intelligent Client-Side Botanical Pharmacopoeia (Zero Latency, 100% Offline-Resilient)
 * 2. Puter.js AI Integration (Strict 4s Race Timeout, Silent Fallback, No Intrusive Popups)
 * Grounded in local PRODUCTS_DATA herbal pharmacopoeia
 */

class AIHerbalistController {
  constructor() {
    this.isOpen = false;
    this.isThinking = false;
    this.isStreaming = false;
    this.messages = [];
    this.storageKey = "nah_ai_herbalist_history";
    this.panel = null;
    this.launcher = null;
    this.messagesList = null;
    this.inputField = null;
    this.clearConfirmBar = null;

    // Wait for DOM to be ready if running in browser
    if (typeof document !== "undefined") {
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => this.init());
      } else {
        this.init();
      }
    }
  }

  init() {
    this.panel = document.getElementById("aiHerbalistPanel");
    this.launcher = document.getElementById("aiHerbalistLauncher");
    this.messagesList = document.getElementById("aiMessagesList");
    this.inputField = document.getElementById("aiUserInput");
    this.clearConfirmBar = document.getElementById("aiClearConfirmBar");

    // Load conversation or seed with rich welcome
    const saved = this.loadHistory();
    if (saved && Array.isArray(saved) && saved.length > 0) {
      this.messages = saved;
    } else {
      this.messages = [
        {
          role: "assistant",
          content: "Greetings, seeker of wellness. 🌿 I am your **Sacred Herbal Alchemist**.\n\nShare with me your physical discomforts, health goals, or wellness questions (such as *insomnia, bloating, low vitality, hair thinning, or stress*), and I will consult our botanical pharmacopoeia to tailor a sacred remedy ritual for you.",
          productIds: ["moringa-powder-organic", "bedtime-dream-tea"],
          suggestions: [
            "What helps with restless sleep?",
            "I feel bloated after meals",
            "What boosts natural energy?"
          ]
        }
      ];
    }

    this.renderMessages();

    // Re-render recommendation prices whenever currency switches
    window.addEventListener("currencyChanged", () => {
      this.renderMessages();
    });
  }

  // =========================================================================
  // UI TOGGLE & CONTROLS
  // =========================================================================

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    if (!this.panel) return;
    this.isOpen = true;
    this.panel.classList.remove("closing");
    this.panel.style.display = "flex";
    this.panel.classList.add("open");
    if (this.launcher) this.launcher.classList.add("active");
    this.scrollToBottom();
    setTimeout(() => {
      if (this.inputField) this.inputField.focus();
    }, 150);

    // On-demand background load of Puter SDK only when user actually engages with chat
    this.loadPuterSDK();
  }

  loadPuterSDK() {
    if (window.puter || this._loadingPuter) return;
    this._loadingPuter = true;
    const script = document.createElement("script");
    script.src = "https://js.puter.com/v2/";
    script.async = true;
    document.head.appendChild(script);
  }

  close() {
    if (!this.panel) return;
    this.isOpen = false;
    this.panel.classList.add("closing");
    if (this.launcher) this.launcher.classList.remove("active");
    setTimeout(() => {
      if (!this.isOpen) {
        this.panel.classList.remove("open", "closing");
        this.panel.style.display = "none";
      }
    }, 240);
  }

  promptClearChat() {
    if (this.clearConfirmBar) {
      this.clearConfirmBar.style.display = "flex";
    } else if (confirm("Clear this herbal consultation and start fresh?")) {
      this.confirmClearChat();
    }
  }

  cancelClearChat() {
    if (this.clearConfirmBar) {
      this.clearConfirmBar.style.display = "none";
    }
  }

  confirmClearChat() {
    if (this.clearConfirmBar) {
      this.clearConfirmBar.style.display = "none";
    }
    localStorage.removeItem(this.storageKey);
    this.messages = [
      {
        role: "assistant",
        content: "The apothecary slate has been cleansed. 🍃 How may I guide your healing journey today?",
        productIds: [],
        suggestions: [
          "🌙 Deep Sleep & Rest",
          "🌿 Bloating & Digestion",
          "⚡ Fatigue & Vitality"
        ]
      }
    ];
    this.saveHistory();
    this.renderMessages();
  }

  loadHistory() {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey));
    } catch (e) {
      return null;
    }
  }

  saveHistory() {
    try {
      // Keep last 15 messages to prevent storage bloat
      const trimmed = this.messages.slice(-15);
      localStorage.setItem(this.storageKey, JSON.stringify(trimmed));
    } catch (e) {}
  }

  // =========================================================================
  // CHAT SUBMISSION & ORCHESTRATION
  // =========================================================================

  async handleUserSubmit(event) {
    if (event) event.preventDefault();
    if (!this.inputField || this.isThinking || this.isStreaming) return;

    const query = this.inputField.value.trim();
    if (!query) return;

    this.inputField.value = "";
    await this.sendQuery(query);
  }

  async sendQuickPrompt(promptText) {
    this.open();
    if (this.isThinking || this.isStreaming) return;
    await this.sendQuery(promptText);
  }

  async sendQuery(userText) {
    // Append user message
    this.messages.push({
      role: "user",
      content: userText
    });
    this.renderMessages();
    this.scrollToBottom();

    this.isThinking = true;
    this.showTypingIndicator();

    try {
      let aiResponseText = "";
      let matchedProductIds = [];
      let followUpSuggestions = [];

      // Attempt Puter AI with strict 4.5s race timeout
      let puterSuccess = false;
      if (window.puter && window.puter.ai && typeof window.puter.ai.chat === "function") {
        try {
          const systemPrompt = this.buildSystemPrompt(userText);
          const puterMessages = [
            { role: "system", content: systemPrompt },
            ...this.messages.slice(-6).map(m => ({
              role: m.role === "assistant" ? "assistant" : "user",
              content: m.content
            }))
          ];

          // 4.5 second race timeout so external API never hangs
          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Puter AI timeout")), 4500)
          );

          const puterPromise = window.puter.ai.chat(puterMessages, {
            model: "gpt-4o-mini"
          });

          const puterResult = await Promise.race([puterPromise, timeoutPromise]);

          if (typeof puterResult === "string") {
            aiResponseText = puterResult;
          } else if (puterResult?.message?.content) {
            aiResponseText = puterResult.message.content;
          } else if (puterResult?.text) {
            aiResponseText = puterResult.text;
          }

          if (aiResponseText && aiResponseText.trim().length > 10) {
            // Extract [PRODUCT: id] tokens
            const productRegex = /\[PRODUCT:\s*([a-zA-Z0-9-_]+)\]/g;
            let match;
            while ((match = productRegex.exec(aiResponseText)) !== null) {
              const id = match[1].trim();
              if (typeof PRODUCTS_DATA !== "undefined" && PRODUCTS_DATA.some(p => p.id === id) && !matchedProductIds.includes(id)) {
                matchedProductIds.push(id);
              }
            }
            // Clean out raw [PRODUCT: id] tokens
            aiResponseText = aiResponseText.replace(/\[PRODUCT:\s*[a-zA-Z0-9-_]+\]/g, "").trim();
            puterSuccess = true;
          }
        } catch (puterErr) {
          // Silent fallback - no popups or delays
          puterSuccess = false;
        }
      }

      // If Puter was not available, timed out, or had auth restrictions, use the rich local engine
      if (!puterSuccess) {
        const localConsultation = this.generateIntelligentConsultation(userText);
        aiResponseText = localConsultation.text;
        matchedProductIds = localConsultation.productIds;
        followUpSuggestions = localConsultation.suggestions;
      }

      // If no products matched by tokens, run botanical keyword matcher
      if (matchedProductIds.length === 0) {
        matchedProductIds = this.findMatchingProductIds(userText + " " + aiResponseText);
      }

      // Hide typing indicator before streaming text
      this.hideTypingIndicator();

      // Stream / Reveal message smoothly
      await this.streamAssistantResponse(aiResponseText, matchedProductIds.slice(0, 3), followUpSuggestions);

    } catch (err) {
      console.warn("AI Herbalist consultation fallback:", err);
      this.hideTypingIndicator();
      const fallback = this.generateIntelligentConsultation(userText);
      this.messages.push({
        role: "assistant",
        content: fallback.text,
        productIds: fallback.productIds,
        suggestions: fallback.suggestions
      });
      this.saveHistory();
      this.renderMessages();
      this.scrollToBottom();
    } finally {
      this.isThinking = false;
    }
  }

  // =========================================================================
  // PROGRESSIVE SMOOTH STREAMING EFFECT
  // =========================================================================

  async streamAssistantResponse(fullText, productIds, suggestions) {
    this.isStreaming = true;

    // Create an empty assistant message
    const msgObj = {
      role: "assistant",
      content: "",
      productIds: [],
      suggestions: []
    };
    this.messages.push(msgObj);
    const msgIndex = this.messages.length - 1;

    // Split text into word chunks for smooth typing effect
    const words = fullText.split(" ");
    let currentText = "";
    const chunkSize = 3; // words per frame
    const delay = 25; // ms per frame

    for (let i = 0; i < words.length; i += chunkSize) {
      const chunk = words.slice(i, i + chunkSize).join(" ");
      currentText += (currentText ? " " : "") + chunk;
      msgObj.content = currentText;

      // Fast update only the active message DOM node for peak rendering performance
      this.updateMessageContent(msgIndex, currentText);
      this.scrollToBottom();

      await new Promise(r => setTimeout(r, delay));
    }

    // Attach product cards and suggestions at conclusion of stream
    msgObj.content = fullText;
    msgObj.productIds = productIds;
    msgObj.suggestions = suggestions || [];

    this.isStreaming = false;
    this.saveHistory();
    this.renderMessages();
    this.scrollToBottom();
  }

  updateMessageContent(index, text) {
    const bubble = this.messagesList?.querySelector(`[data-index="${index}"] .ai-msg-text`);
    if (bubble) {
      bubble.innerHTML = this.formatMarkdown(text);
    } else {
      this.renderMessages();
    }
  }

  // =========================================================================
  // CATALOG CONTEXT & SYSTEM PROMPT
  // =========================================================================

  buildCatalogContext(query = "", asString = false) {
    const catalog = typeof PRODUCTS_DATA !== "undefined"
      ? PRODUCTS_DATA
      : (typeof require !== "undefined" ? require("./data/products.js") : []);
    if (!Array.isArray(catalog) || catalog.length === 0) {
      return asString ? "" : [];
    }

    let relevantProducts = [];
    if (query && query.trim()) {
      const matchedIds = this.findMatchingProductIds(query);
      const matchedSet = new Set(matchedIds);
      const topMatched = catalog.filter(p => matchedSet.has(p.id));
      
      // Also include high priority launch items
      const heroItems = catalog.filter(p => p.tag === "High-Priority Launch" && !matchedSet.has(p.id)).slice(0, 4);
      relevantProducts = [...topMatched, ...heroItems].slice(0, 25);
    }

    if (relevantProducts.length === 0) {
      // Return 2 top items per category for balanced context
      const categoryMap = {};
      catalog.forEach(p => {
        if (!categoryMap[p.category]) categoryMap[p.category] = [];
        if (categoryMap[p.category].length < 2) categoryMap[p.category].push(p);
      });
      relevantProducts = Object.values(categoryMap).flat().slice(0, 20);
    }

    const formattedLines = relevantProducts.map(p => {
      const illnesses = (p.illnesses || []).slice(0, 5).join(", ");
      const herbs = (p.herbs || []).slice(0, 4).join(", ");
      return `ID: ${p.id} | Name: "${p.name}" | Botanical: "${p.botanicalName}" | Category: ${p.categoryName} | Price: KSh ${p.priceKES} | Herbs: [${herbs}] | Helps With: [${illnesses}] | Ritual: "${p.ritualGuide || ''}"`;
    });

    if (asString) {
      return formattedLines.join("\n");
    }

    formattedLines.toString = function() {
      return this.join("\n");
    };

    return formattedLines;
  }

  buildSystemPrompt(query = "") {
    const catalog = this.buildCatalogContext(query);

    return `You are the Master Herbal Alchemist for "NewAge Botanicals", an evidence-grounded African botanical apothecary.
Your role: Compassionately diagnose wellness imbalances and recommend exact remedies from our apothecary catalog.

STRICT BRAND & REGULATORY POLICIES:
1. Anti-Claims Policy: NEVER claim to cure, treat, or prevent chronic clinical diseases (e.g. do NOT say "cures cancer/diabetes/hypertension"). Use supportive, grounding language ("supports healthy glucose balance", "nourishes vascular tone", "calms nocturnal tension").
2. Evidence Awareness: Strictly distinguish traditional African ethnobotanical wisdom from peer-reviewed human clinical trials.
3. Traceability & Testing: Every batch is tested by KEBS / SGS accredited laboratories for heavy metals (Lead, Arsenic, Cadmium, Mercury) and microbiological clearance, verifiable via the public Botanical Atlas.
4. Product Tags: Always tag recommended remedies using [PRODUCT: product-id] syntax so interactive purchasing cards render for the user.
5. Mindful Rituals: Detail exact steeping temperatures (e.g., 90°C), brewing duration, or topical application movements.
6. Tone: Poetic, respectful, scientifically literate, rooted in African botanical luxury. Keep replies concise and formatted with clean markdown.

CATALOG REFERENCE (Curated from 150 Remedies):
${catalog}`;
  }

  // =========================================================================
  // INTELLIGENT BOTANICAL CONSULTATION ENGINE (100% Reliable Offline Brain)
  // =========================================================================

  generateIntelligentConsultation(query) {
    const q = query.toLowerCase().trim();

    // 1. GREETINGS & CASUAL CONVERSATION
    if (/^(hi|hello|hey|greetings|jambo|habari|good morning|good afternoon|good evening|who are you|what can you do)/i.test(q) && q.length < 35) {
      return {
        text: `Greetings and sacred blessings. 🌿 I am your **Master Herbal Alchemist** at NewAge Botanicals.\n\nI listen to your body's whispers and translate them into therapeutic botanical remedies—drawn from Kenya's wild highlands and indigenous African phytotherapy.\n\n**How can I support your wellbeing today?** You may ask me about:\n- Restoring deep restorative sleep\n- Healing bloating, sluggish digestion, or gut harmony\n- Botanical hair growth elixirs & scalp nourishment\n- Sustained cellular energy without caffeine spikes\n- Sacred smudging and energetic cleansing rituals`,
        productIds: ["bedtime-dream-tea", "moringa-powder-organic"],
        suggestions: [
          "🌙 I have insomnia & racing thoughts",
          "🌿 I struggle with post-meal bloating",
          "✨ How can I boost hair growth?"
        ]
      };
    }

    // 2. STORE POLICIES & SHIPPING
    if (/(shipping|deliver|delivery|location|nairobi|kenya|dhl|wells fargo|pay|payment|mpesa|m-pesa|cost|price|order)/i.test(q) && !/(herb|tea|oil|remedy|sleep|ache|pain)/i.test(q)) {
      return {
        text: `Here is our apothecary's sacred fulfillment guide: 📦\n\n- **Nairobi Deliveries:** Same-day & Next-day courier dispatch (KSh 300 flat, or **FREE** on orders over KSh 5,000).\n- **Kenya Nationwide:** 24-48 hour secure delivery via Wells Fargo / G4S door-to-door.\n- **Worldwide Shipping:** Express international delivery via DHL Express (3-7 business days).\n- **Sacred Payments:** 100% secured via Paystack supporting **M-Pesa Express**, Visa, Mastercard, and Apple Pay.\n\nEvery order is packed in eco-conscious parchment with wild botanical protection herbs.`,
        productIds: ["moringa-powder-organic", "bedtime-dream-tea"],
        suggestions: [
          "What are your bestsellers?",
          "How do I brew herbal teas?",
          "What remedies do you recommend for fatigue?"
        ]
      };
    }

    // 2B. LAB TESTING, SAFETY & BOTANICAL ATLAS VERIFICATION
    if (/\b(tested|testing|lab|labs|assay|assays|heavy metals?|lead|arsenic|microbial|safety|coa|certificate of analysis|kebs|sgs|clinical evidence|scientific rigor|botanical atlas|lot\s*#|lot\s*number|nab-2026)\b/i.test(q) && !/testosterone/i.test(q)) {
      return {
        text: `At NewAge Botanicals, sacred tradition is authenticated by **empirical scientific rigor**: 🔬\n\n- **10-Gate Quality Pipeline:** Every harvest passes strict botanical identity testing, farm origin traceability, and 3rd-party certified lab assays.\n- **Heavy Metal Safety (ICP-MS):** Strictly tested for Lead (< 3.0 ppm), Arsenic (< 1.0 ppm), Cadmium (< 0.3 ppm), and Mercury (< 0.1 ppm).\n- **Microbiological Clearance:** Certified free of E. coli, Salmonella, and excessive plate counts per KEBS KS 229 & US FDA Botanical limits.\n- **Soil-to-Shelf QR Verification:** Every single product bottle and pouch features a dynamic batch QR code linking directly to its cryptographic Certificate of Analysis (CoA) in our live **Botanical Atlas**.\n\nYou can explore our comprehensive pharmacopoeial monographs and clinical trial dossiers directly in the **Discovery Hub** above!`,
        productIds: ["moringa-powder-organic", "marula-facial-elixir"],
        suggestions: [
          "What are the test results for Moringa?",
          "How do you test Marula oil?",
          "Tell me about the 10-Gate Quality System"
        ]
      };
    }

    // 2B-1. DIABETES, HIGH BLOOD SUGAR & PANCREATIC HEALTH
    if (/(diabetes|diabetic|sugar|blood sugar|glucose|insulin|pancreas|pancreatic|neuropathy|hba1c)/i.test(q)) {
      return {
        text: `Blood sugar stability and metabolic longevity rely on rejuvenating pancreatic beta-cells and clearing cellular insulin resistance:\n\n🌿 **Master Clinical Remedy:** **Glucofort-X Sacred Pancreatic & Blood Sugar Botanical Reversal Cure** (KES 10,000)\nFormulated with wild African Bitter Melon (*Momordica charantia*), Himalayan Gymnema sylvestre (the 'Sugar Destroyer'), and pharmaceutical-grade Berberine HCl 98%.\n\n✨ **What this medicine does:**\n- Stimulates endogenous insulin secretion and regenerates exhausted pancreatic islet cells.\n- Gymnemic acids naturally block excess sugar absorption in the small intestine.\n- Activates cellular AMPK pathways to reverse insulin resistance and alleviate diabetic foot numbness and tingling.\n\n**Morning Glycemic Protocol:**\n- Take 30 drops in 150ml lukewarm spring water 20 minutes before breakfast and dinner.\n- Pair with leafy greens and abundant daily hydration.`,
        productIds: ["glucofort-x-diabetes-pancreatic-cure", "moringa-powder-organic"],
        suggestions: [
          "How fast does Glucofort-X stabilize blood sugar?",
          "Can Glucofort-X help with diabetic neuropathy?",
          "How do I take it before meals?"
        ]
      };
    }

    // 2B-2. BLOOD PRESSURE, HYPERTENSION & ARTERIAL FLOW
    if (/(blood pressure|hypertension|hypertensive|high bp|systolic|arterial|palpitation|vascular|artery|heart pressure)/i.test(q)) {
      return {
        text: `Arterial health and blood pressure equilibrium require restoring vascular nitric oxide compliance and calming sympathetic autonomic tension:\n\n🌿 **Cardiovascular Master Cure:** **Hyperten-Arterial Master Shield & Blood Pressure Normalizing Cure** (KES 10,000)\nCrafted from indigenous African Snake Root (*Rauvolfia vomitoria*), wild Kenyan Olive leaf (*Olea africana* oleuropein), and aged Black Garlic allicin.\n\n✨ **What this medicine does:**\n- Safely normalizes elevated systolic and diastolic blood pressure without sudden drops or lethargy.\n- Dilates stiffened peripheral arteries and stimulates endothelial nitric oxide (eNOS).\n- Relieves morning occipital headaches, temporal throbbing, and distressing heart palpitations.\n\n**Cardiovascular Harmony Ritual:**\n- Place 25 drops sublingually under the tongue or in 100ml warm water at dawn and dusk.\n- Practice 5 minutes of mindful 4-second inhale, 6-second exhale calming breath.`,
        productIds: ["hyperten-arterial-blood-pressure-cure", "hibiscus-ruby-infusion"],
        suggestions: [
          "How does Hyperten-Arterial lower blood pressure?",
          "Is African Olive Leaf clinically proven for arteries?",
          "Can this remedy stop heart palpitations?"
        ]
      };
    }

    // 2B-3. HIV / AIDS VIRAL LOAD CONTROL & CD4 CELLULAR IMMUNE DEFENSE
    if (/(hiv|aids|cd4|viral load|retroviral|immune deficiency|opportunistic|wasting|immunocompromised)/i.test(q)) {
      return {
        text: `Deep immune defense and viral suppression depend on ancestral African phytosterols and antiviral phytochemical compounds:\n\n🌿 **Cellular Immune Shield:** **Immuno-Apex African Potato & Sutherlandia HIV/AIDS Viral Defense Complex** (KES 15,000)\nRooted in South African traditional medical wisdom, combining Wild African Potato (*Hypoxis rooperi* sterols & sterolins), Cancer Bush (*Sutherlandia frutescens* canavanine), and pure Artemisia annua.\n\n✨ **What this medicine does:**\n- Inhibits retroviral reverse transcriptase, supporting rapid viral load containment.\n- Stimulates bone marrow to elevate depleted CD4+ and CD8+ helper T-lymphocyte counts.\n- Quells chronic wasting syndrome, restoring healthy body weight, appetite, and cellular vitality.\n- Shields against chronic opportunistic infections and deep lymphatic congestion.\n\n**Immune Fortification Protocol:**\n- Stir 1 level scoop (5g) into warm bone broth, green juice, or herbal infusion twice daily.\n- Maintain consistent daily intake for 90 days for profound immune rejuvenation.`,
        productIds: ["immuno-apex-hiv-viral-defense-complex", "moringa-powder-organic"],
        suggestions: [
          "How does African Potato support CD4 count?",
          "Can Immuno-Apex be taken alongside routine diets?",
          "What herbs are in this viral defense complex?"
        ]
      };
    }

    // 2B-4. PENIS ENLARGEMENT, LIBIDO OIL & MALE VIRILITY
    if (/(penis|enlarge|enlargement|girth|shaft|libido oil|erectile|hard on|premature ejaculation|virility oil|manhood|small penis)/i.test(q)) {
      return {
        text: `Male tissue capacity, penile vascular engorgement, and boundless sexual virility are achieved through transdermal tissue expansion phytosterols:\n\n🌿 **Premier Virility Formula:** **Maximus Titan African Mukombero & Kigelia Penile Expansion & Libido Oil** (KES 15,000)\nInfused with wild Kenyan Mukombero (*Mondia whitei* root resin), Sausage Tree fruit (*Kigelia africana* tissue-plumping sterols), and Thai Butea superba flavonoids.\n\n✨ **What this medicine does:**\n- Stimulates cellular division and collagenous matrix plumping within the corpus cavernosum chambers for permanent gains in length and thick girth.\n- Floods penile tissues with oxygen-rich arterial flow for rock-hard, unyielding erections on demand.\n- Ignites intense raw libido, sexual stamina, and eliminates premature ejaculation.\n\n**Nightly Expansion Jelqing Ritual:**\n- Warm 6 to 8 drops between palms.\n- Massage along the entire penile shaft from base to glans using firm, milking jelqing strokes for 10 minutes before bed.\n- Leave overnight for maximum transdermal absorption.`,
        productIds: ["maximus-titan-penile-expansion-libido-oil", "mukombero-mondia-whitei-root-elixir"],
        suggestions: [
          "How do I perform the jelqing ritual with this oil?",
          "How long does it take to see visible girth expansion?",
          "Does Mukombero naturally boost libido?"
        ]
      };
    }

    // 2B-5. VAGINAL HEALTH, YONI TIGHTENING, YEAST & BV
    if (/(vagina|vaginal|yoni|yeast|bacterial vaginosis|bv|vaginal odor|itching|tightening|womb|intimate dryness|pelvic inflammatory|fibroid)/i.test(q)) {
      return {
        text: `Feminine intimate harmony and vaginal mucosal health require balancing the delicate acid mantle and rejuvenating pelvic musculature:\n\n🌸 **Purifying Detox:** **Sacred Yoni Flora Purifying Pearls & Tightening Infusion** (KES 5,000)\nEradicates recurrent BV, candidiasis, foul intimate odor, and abnormal discharge while naturally contracting loose vaginal canal walls.\n\n💧 **Intimate Hydration:** **Lotus Essence Vaginal pH Restorative & Mucosal Tightening Elixir** (KES 8,500)\nInfused with Shatavari and Sea Buckthorn Omega-7 to banish chronic vaginal dryness, mucosal atrophy, and painful intercourse.\n\n👑 **Complete Master Rebirth:** **Empress Sovereign Complete Vaginal & Womb Cellular Regeneration Master Cure** (KES 20,000)\nThe ultimate royal formulation for full vaginal, cervical, and pelvic floor restoration.\n\n**Sacred Yoni Care Ritual:**\n- Use Yoni Pearls for 48-72 hour deep cleansing to expel stagnant toxins.\n- Apply 3 drops of Lotus Essence nightly to maintain supple, lubricated mucosal elasticity.`,
        productIds: ["sacred-yoni-flora-purifying-pearls", "lotus-essence-vaginal-ph-tightening-elixir"],
        suggestions: [
          "How do I use the Yoni Detox Pearls?",
          "Which remedy is best for chronic vaginal dryness?",
          "Can this eliminate recurrent bacterial vaginosis (BV)?"
        ]
      };
    }

    // 2C. MEN'S VITALITY, STAMINA & TESTOSTERONE
    if (/(men|male|vitality|testosterone|libido|erect|stamina|prostate|mukombero|tongkat|mondia|shilajit)/i.test(q)) {
      return {
        text: `Male hormonal equilibrium and physical vigor depend on deep cellular nourishment, endothelial nitric oxide flow, and adrenal adaptogens:\n\n🌿 **Premier African Ally:** **Wild Mukombero (Mondia Whitei) Raw Chewing Roots & Elixir** (*Mondia whitei*)\nRevered across East Africa as the 'King of Roots'. Rich in natural vanilla-scented sterols that stimulate nitric oxide pathways, enhance pelvic vascular circulation, and dispel performance anxiety.\n\n✨ **Anabolic Synergy:** **Wild Tongkat Ali (200:1) & Fadogia Agrestis Male Power**\nClinically documented to liberate bound testosterone and elevate physical athletic endurance.\n\n👑 **Mineral Resin:** **Pure Himalayan Gold-Grade Shilajit Mineral Resin** restores 84 ionic trace minerals and mitochondrial ATP energy.\n\n**Morning Warrior Protocol:**\n- Dissolve a rice-grain portion of Shilajit in warm spring water at sunrise.\n- Take 30 drops of Mukombero elixir 45 minutes prior to peak physical or intimate demands.`,
        productIds: ["mukombero-mondia-whitei-root-elixir", "tongkat-ali-fadogia-anabolic-matrix"],
        suggestions: [
          "How do I use Mukombero root?",
          "Can I take Tongkat Ali daily?",
          "What helps with prostate health?"
        ]
      };
    }

    // 2D. WOMEN'S WELLNESS, CYCLE HARMONY & HORMONAL BALANCE
    if (/(women|female|period|cramp|pms|menstrual|cycle|fertility|estrogen|progesterone|womb|shatavari|vitex|hot flash|menopause)/i.test(q)) {
      return {
        text: `Feminine vitality follows the rhythm of the moon and the sacred balance between estrogen and progesterone throughout your cycle:\n\n🌿 **Hormonal Master Ally:** **Pure Vitex (Chaste Tree Berry) Progesterone Balance Drops** (*Vitex agnus-castus*)\nCalibrates the pituitary-hypothalamic axis to encourage natural progesterone synthesis, clearing jawline hormonal acne and relieving premenstrual mood distress.\n\n✨ **Womb Tonic:** **Wild Mountain Red Raspberry Leaf & Nettle Womb Tea** (*Rubus idaeus*)\nRich in fragarine alkaloid to tone uterine smooth muscle and eliminate debilitating menstrual cramps.\n\n🌸 **Nourishing Adaptogen:** **Sacred Shatavari & Wild Yam Cycle Harmony Elixir**\nRestores internal mucosal hydration and cushions menopausal thermal surges.\n\n**Sacred Moon Ritual:**\n- Drink 1 cup of warm Raspberry Leaf tea daily during your luteal and bleeding phases.\n- Take 30 drops of Vitex upon waking to support hormonal balance.`,
        productIds: ["chasteberry-vitex-pms-relief-drops", "red-raspberry-leaf-womb-toning-tea"],
        suggestions: [
          "How does Vitex help with hormonal acne?",
          "What tea is best for painful menstrual cramps?",
          "What remedies help with perimenopause?"
        ]
      };
    }

    // 2E. SACRED RITUALS, RESINS & ENERGETIC PURIFICATION
    if (/(smudge|sage|smoke|incense|frankincense|myrrh|palo santo|resin|altar|cleansing|energy|spiritual|negative energy)/i.test(q)) {
      return {
        text: `Smoke cleansing and resin burning are ancient aromatic technologies for clearing stagnant sensory vibrations and cultivating sacred presence:\n\n🌿 **Sacred Temple Incense:** **Somali Royal Green Hojari Frankincense Tears** (*Boswellia sacra*)\nTranslucent emerald-tinted tears tapped from remote Somaliland cliffs. Incensole acetate in pure frankincense smoke triggers neural TRPV3 calm receptors in the brain.\n\n✨ **Space Purification:** **Wild African Mountain Sage & Lavender Smudge Wand**\nWild mountain sage hand-harvested on Mount Kenya to clear lingering mental and environmental heaviness.\n\n🪵 **Ancestral Holy Wood:** **Sustainably Gathered Peruvian Palo Santo Sticks**\nReleases sweet mint-pine smoke to invite fortune, peace, and creative inspiration.\n\n**Consecration Ritual:**\n- Light the tip of the sage wand or place frankincense on a hot charcoal burner.\n- Waft aromatic smoke clockwise around the perimeter of your sanctuary with conscious intention.`,
        productIds: ["somali-royal-green-hojari-frankincense", "wild-african-sage-smudge"],
        suggestions: [
          "How do I burn Frankincense tears?",
          "What is the difference between Sage and Sweetgrass?",
          "How often should I smudge my room?"
        ]
      };
    }

    // 3. SLEEP, INSOMNIA & RACING THOUGHTS
    if (/(sleep|insomnia|wake up|racing thoughts|can't sleep|cant sleep|nightmare|restless|bedtime)/i.test(q)) {
      return {
        text: `Restless sleep is often an imbalance of the nervous system and an elevated evening cortisol rhythm. In our pharmacopoeia, we calm the restless spirit with relaxing nervine herbs:\n\n🌿 **Primary Ritual:** **Bedtime Dream & Lucid Serenity Tea** (*Matricaria chamomilla, Passiflora incarnata*)\nInfused with wild chamomile blossoms, passionflower, and organic valerian root to quiet mental chatter and encourage slow-wave, restorative REM rest.\n\n**Sacred Evening Ritual:**\n- Bring 250ml pure spring water to 90°C (just under boiling).\n- Steep 1 generous tablespoon for 8 to 10 minutes covered to trap the soothing volatile terpenes.\n- Sip 45 minutes before sleep in dim candlelight while breathing deeply from the abdomen.\n\n✨ **Complementary Ally:** **Ashwagandha & Holy Basil Adaptogen Tincture** taken at dusk gently down-regulates adrenal burnout.`,
        productIds: ["bedtime-dream-tea", "ashwagandha-holy-basil-tincture"],
        suggestions: [
          "How long should I steep Bedtime Tea?",
          "Can I combine Bedtime Tea with Ashwagandha?",
          "What herbs help with morning energy?"
        ]
      };
    }

    // 4. DIGESTION, BLOATING & GUT HEALTH
    if (/(bloat|digest|gut|stomach|acid|constipation|heartburn|gas|cramp|after meal)/i.test(q)) {
      return {
        text: `In traditional African phytotherapy, the digestive tract is the seat of sacred fire (*Agni*). When digestion is sluggish or bloated, warming carminatives and prebiotic fibers restore harmonious gut motility:\n\n🌿 **Primary Ritual:** **Digestive Fire & Gut Harmony Tisane** (*Zingiber officinale, Foeniculum vulgare*)\nA potent blend of sun-dried highland ginger, sweet fennel seeds, and cooling peppermint to relieve trapped gas, soothe intestinal spasms, and ignite digestive enzymes.\n\n✨ **Prebiotic Ally:** **Sacred Baobab Fruit Superfood Powder**\nHarvested from ancient Kenyan Baobab trees, this raw powder provides over 50% prebiotic soluble fiber to nourish beneficial gut microbiome bacteria.\n\n**Digestive Rite:**\n- Drink a warm cup of Digestive Fire Tisane 15 minutes after rich meals.\n- Whisk 1 tablespoon of Baobab into morning room-temperature water to support regular morning elimination.`,
        productIds: ["digestive-fire-brew", "baobab-fruit-powder"],
        suggestions: [
          "How often should I take Baobab powder?",
          "Can I drink Digestive Tisane cold?",
          "What helps with acid reflux?"
        ]
      };
    }

    // 5. HAIR GROWTH, THINNING, DANDRUFF & SCALP
    if (/(hair|scalp|thinning|growth|bald|edges|dandruff|itch|shedding)/i.test(q)) {
      return {
        text: `Healthy, crowning hair begins beneath the soil of your scalp. Follicular stagnation is often driven by micro-inflammation, dry scalp barrier, or poor micro-circulation:\n\n🌿 **Primary Botanical:** **African Black Soap & Rosemary Scalp Elixir** (*Rosmarinus officinalis, Ricinus communis*)\nCold-pressed Jamaican-style black castor oil, raw shea butter unsaponifiables, and steam-distilled rosemary cineole stimulate dermal papilla blood flow and awaken dormant follicles.\n\n**The Weekly Crown Ritual:**\n- Warm 5 to 7 drops of the Elixir between your palms.\n- Part hair into quadrants and massage firmly into the scalp using circular pad-of-finger motions for 5 minutes.\n- Leave as an overnight treatment or wrap with a warm damp cloth for 45 minutes before gentle washing.\n\n✨ **Nutritional Ally:** **Pure Wildcrafted Moringa Leaf Powder** supplies rich plant iron, zinc, and amino acids essential for keratin synthesis.`,
        productIds: ["african-black-soap-scalp-elixir", "moringa-powder-organic"],
        suggestions: [
          "How often should I oil my scalp?",
          "Can this help with thinning edges?",
          "Does Moringa help hair growth?"
        ]
      };
    }

    // 6. FATIGUE, ENERGY & VITALITY
    if (/(fatigue|tired|exhaust|energy|vitality|burnout|sluggish|boost|vital)/i.test(q)) {
      return {
        text: `True vitality is not nervous stimulation from excess caffeine—it is abundant cellular oxygenation and mitochondrial ATP production nourished by living greens:\n\n🌿 **Primary Superfood:** **Pure Wildcrafted Moringa Leaf Powder** (*Moringa oleifera*)\nKnown as the *Tree of Life*, our Kenyan highland moringa delivers 92 verified nutrients, 46 antioxidants, and bioavailable non-heme iron to combat midday exhaustion without a single caffeine crash.\n\n✨ **Cognitive Ally:** **Wild Lion's Mane & Gotu Kola Tincture**\nStimulates nerve growth factor (NGF), sharpens memory, and clears afternoon brain fog.\n\n**Morning Dawn Ritual:**\n- Whisk 1 level teaspoon of Moringa into warm water with raw honey and fresh lime juice first thing at dawn.\n- Take 2 dropperfuls of Lion's Mane sublingually before your morning creative or physical endeavors.`,
        productIds: ["moringa-powder-organic", "lions-mane-memory-tincture"],
        suggestions: [
          "How do I take Lion's Mane tincture?",
          "Can Moringa replace my morning coffee?",
          "What helps with afternoon brain fog?"
        ]
      };
    }

    // 7. STRESS, ANXIETY & NERVOUS SYSTEM
    if (/(stress|anxiety|anxious|nervous|calm|overwhelm|cortisol|panic|peace)/i.test(q)) {
      return {
        text: `When prolonged stress over-activates your sympathetic fight-or-flight pathway, adaptogenic herbs help recalibrate the hypothalamic-pituitary-adrenal (HPA) axis:\n\n🌿 **Primary Adaptogen:** **Ashwagandha & Holy Basil Adaptogen Tincture** (*Withania somnifera, Ocimum sanctum*)\nSynergistically balances circulating cortisol levels, shields the nervous system from oxidative tension, and fosters emotional equilibrium.\n\n✨ **Energetic Ally:** **Wild African Sage & Frankincense Smudge Wand**\nSmoke cleansing with wild sage purifies negative lingering energies and calms sensory overload.\n\n**Mindful Grounding Rite:**\n- Place 30 drops of the Ashwagandha tincture in a splash of warm water twice daily.\n- Pause, breathe in for 4 counts, hold for 4, and exhale for 6 counts while the adaptogens assimilate.`,
        productIds: ["ashwagandha-holy-basil-tincture", "wild-african-sage-smudge"],
        suggestions: [
          "When is the best time to take Ashwagandha?",
          "How do I smudge a room with sage?",
          "What tea calms the nervous system?"
        ]
      };
    }

    // 8. COOLING VS WARMING MUSCLE & ATHLETIC RECOVERY
    if (/(cooling|cryo|menthol|ice|sprain|swelling|shin splint|heavy legs)/i.test(q)) {
      return {
        text: `Acute athletic inflammation and burning post-workout soreness respond rapidly to botanical cryotherapy:\n\n🌿 **Targeted Topical:** **Arctic Recovery Botanical Cooling Muscle Gel** (*Mentha arvensis & Aloe barbadensis*)\nNatural menthol crystals trigger cellular TRPM8 cold-receptors to extinguish fiery muscle heat, soothe sprains, and rapidly reduce exercise-induced swelling.\n\n✨ **Pairing Recommendation:** Combine with **Athletic Recovery Botanical Massage Oil** for restorative deep tissue lymphatic drainage.\n\n**Recovery Ritual:**\n- Smooth liberally over hot, aching muscles immediately after strenuous exercise.\n- Elevate legs for 15 minutes to encourage venous return and cellular rejuvenation.`,
        productIds: ["cooling-muscle-menthol-gel", "sports-post-exercise-massage-oil"],
        suggestions: [
          "When should I use cooling gel vs warming balm?",
          "Can I apply this before a workout?",
          "Does it help with swollen ankles?"
        ]
      };
    }

    // 9. PLANT PROTEIN & POST-WORKOUT NUTRITION
    if (/(protein|muscle building|amino acid|post-workout shake|vegan protein|shake|shaker)/i.test(q)) {
      return {
        text: `True muscular repair requires complete, bioavailable plant amino acids fortified with anti-inflammatory greens:\n\n🌿 **Primary Nutrition:** **Baobab & Moringa Plant Protein Superfood Blend** (*Moringa, Adansonia & Pisum sativum*)\nDelivers 22g of clean sprouted plant protein, rich in natural BCAAs and fortified with prebiotic baobab fruit to eliminate the bloating common in conventional protein powders.\n\n✨ **Superfood Synergy:** **Pure Wildcrafted Moringa Leaf Powder** replenishes potassium, calcium, and magnesium lost through sweat.\n\n**Alchemical Recovery Shake:**\n- Shake 2 level scoops into cold coconut water or plant milk within 45 minutes of training.\n- Add 1 teaspoon of raw honey for optimal glycogen replenishment.`,
        productIds: ["wild-plant-protein-blend", "moringa-powder-organic"],
        suggestions: [
          "How much protein per serving?",
          "Is this easy to digest without bloating?",
          "Can I take this for breakfast?"
        ]
      };
    }

    // 10. TURMERIC & GINGER SYSTEMIC INFLAMMATION
    if (/(turmeric|curcumin|golden milk|golden blend|stiff joint|arthritis)/i.test(q)) {
      return {
        text: `The synergy between sun-cured turmeric and ginger is one of phytotherapy's most venerated alliances for quenching inflammatory cascades:\n\n🌿 **Sacred Golden Blend:** **Sun-Cured Golden Turmeric & Ginger Powder Blend** (*Curcuma longa & Zingiber officinale*)\nHigh-curcumin Kenyan volcanic turmeric combined with dried ginger root and black pepper piperine to enhance active bioavailability by up to 2000%.\n\n✨ **Topical Ally:** **Botanist's Herbal Warming Muscle Balm** penetrates directly into stiff knees, hands, or lower back.\n\n**Golden Milk Evening Rite:**\n- Simmer 1 teaspoon in warm coconut or oat milk with a dash of raw honey for 5 minutes.\n- Drink warm before bed to soothe persistent joint stiffness and support cellular longevity.`,
        productIds: ["turmeric-ginger-golden-blend", "warming-muscle-recovery-balm"],
        suggestions: [
          "How do I make golden milk?",
          "Why is black pepper included with turmeric?",
          "Can I drink this every day?"
        ]
      };
    }

    // 11. PAIN, SORE MUSCLES & JOINTS
    if (/(pain|sore|muscle|joint|arthritis|stiff|inflammation|ache|backache|sprain|workout)/i.test(q)) {
      return {
        text: `Musculoskeletal discomfort calls for deep penetrating plant oils that stimulate lymphatic drainage and inhibit pro-inflammatory prostaglandin pathways:\n\n🌿 **Primary Topical:** **Botanist's Herbal Warming Muscle Balm** (*Zingiber, Capsicum & Eucalyptus*)\nFormulated with wildcrafted ginger, cayenne resin, arnica montana extract, and clove bud oil in raw unrefined beeswax to melt tightness and ease joint aches.\n\n✨ **Cryo Ally for Acute Heat:** **Arctic Recovery Botanical Cooling Muscle Gel** offers instant icy relief for strained ligaments.\n\n**Application Ritual:**\n- Warm a marble-sized scoop between your palms until it melts into a rich therapeutic oil.\n- Massage with firm, sweeping strokes along muscle fibers toward the heart.\n- Best applied directly after a hot mineral bath or sauna session.`,
        productIds: ["warming-muscle-recovery-balm", "cooling-muscle-menthol-gel"],
        suggestions: [
          "Can I use warming balm every day?",
          "Is warming balm safe for lower back pain?",
          "What herbal teas reduce inflammation?"
        ]
      };
    }

    // 9. SKIN RADIANCE, AGING & GLOW
    if (/(skin|glow|wrinkle|aging|radiance|serum|complexion|hyperpigmentation|acne)/i.test(q)) {
      return {
        text: `Radiant, luminous skin is a reflection of both internal cellular hydration and topical barrier lipid nourishment:\n\n🌿 **Sacred Facial Elixir:** **Sacred Frankincense & Marula Glow Serum** (*Boswellia carterii, Sclerocarya birrea*)\nWild Kenyan Marula oil packed with Omegas 6 and 9 combined with steam-distilled Somaliland Frankincense resin to accelerate cellular turnover, soften fine lines, and impart a luminous golden veil.\n\n✨ **Internal Antioxidant Ally:** **Wild Kenyan Ruby Hibiscus & Lemongrass Tea**\nTeeming with anthocyanins and organic alpha-hydroxy acids to protect skin collagen from UV oxidation.\n\n**Golden Hour Ritual:**\n- Press 3 to 4 drops into damp, freshly cleansed facial skin each evening.\n- Gently smooth across cheeks, forehead, and décolletage in upward, lifting motions.`,
        productIds: ["frankincense-glow-serum", "hibiscus-ruby-infusion"],
        suggestions: [
          "Can Frankincense serum be used with acne-prone skin?",
          "How does Hibiscus tea help skin collagen?",
          "What is the best order for my skincare ritual?"
        ]
      };
    }

    // 10. COUGH, RESPIRATORY & THROAT
    if (/(cough|throat|cold|flu|lung|mucus|phlegm|bronchial|breath|respiratory)/i.test(q)) {
      return {
        text: `Respiratory balance relies on demulcent and expectorant botanicals that coat irritated mucous membranes while clearing stagnant bronchial pathways:\n\n🌿 **Sacred Elixir:** **Highland Wild Thyme & Mullein Throat Elixir** (*Thymus vulgaris, Verbascum thapsus*)\nTraditional Kenyan highland thyme combined with velvet mullein leaf to soothe raspy throats, liquefy stubborn mucus, and relax bronchial spasms.\n\n✨ **Immunity Ally:** **Pure Wildcrafted Moringa Leaf Powder**\nInfuses the immune system with natural Vitamin C, Vitamin A, and zinc to fortify your respiratory defenses.\n\n**Healing Ritual:**\n- Stir 1 tablespoon into a mug of warm spring water with fresh ginger and raw honey.\n- Inhale the fragrant thyme vapors deeply before each sip to clear nasal passages.`,
        productIds: ["throat-lung-elixir", "moringa-powder-organic"],
        suggestions: [
          "How often should I take the throat elixir?",
          "Can I drink this with lemon and honey?",
          "What herbs help build immune defense?"
        ]
      };
    }

    // 11. DETOX, LIVER & CLEANSING
    if (/(detox|liver|cleanse|hangover|toxin|sluggish liver|milk thistle)/i.test(q)) {
      return {
        text: `Your liver is the master alchemist of your internal biology, filtering over 1.4 liters of blood per minute. Heavy environmental stressors require hepatoprotective plant allies:\n\n🌿 **Primary Tonic:** **Liver Renewal & Milk Thistle Cleansing Elixir** (*Silybum marianum, Taraxacum officinale*)\nHigh-potency silymarin extracts paired with wild dandelion root to stimulate bile flow, promote phase-2 liver detoxification, and shield hepatocytes.\n\n✨ **Hydration Ally:** **Wild Kenyan Ruby Hibiscus & Lemongrass Tea**\nA refreshing, tart infusion that supports renal elimination and electrolyte balance.\n\n**Cleansing Ritual:**\n- Take 2 dropperfuls of Liver Renewal in room-temperature water 20 minutes before breakfast.\n- Drink at least 2.5 liters of structured spring water throughout the day.`,
        productIds: ["milk-thistle-liver-cleanse", "hibiscus-ruby-infusion"],
        suggestions: [
          "How long should a liver cleanse ritual last?",
          "Is Dandelion root gentle on the stomach?",
          "What foods support liver detox?"
        ]
      };
    }

    // 12. DYNAMIC CATALOG PRODUCT MATCHING (Fallback to best scored product)
    const matched = this.findMatchingProductIds(query);
    const primaryId = matched[0] || "moringa-powder-organic";
    const secondaryId = matched[1] || "bedtime-dream-tea";

    const p1 = PRODUCTS_DATA.find(p => p.id === primaryId);
    const p2 = PRODUCTS_DATA.find(p => p.id === secondaryId);

    let response = `In response to your inquiry regarding **${query}**, the botanical pharmacopoeia indicates that harmony can be gently cultivated by aligning with plant phytocompounds:\n\n`;

    if (p1) {
      response += `🌿 **Primary Botanical Ally:** **${p1.name}** (*${p1.botanicalName}*)\n${p1.description}\n\n**Mindful Preparation:** ${p1.ritualGuide || 'Whisk into warm water or steep mindfully with intention.'}\n\n`;
    }

    if (p2) {
      response += `✨ **Synergistic Partner:** **${p2.name}**\n${p2.description}\n\n`;
    }

    response += `*Drink abundant spring water, honor your natural rest rhythms, and allow the botanical prana to restore your vitality.*`;

    return {
      text: response,
      productIds: [primaryId, secondaryId],
      suggestions: [
        `How do I use ${p1 ? p1.name.split(" ")[0] : "this"}?`,
        "What are the benefits?",
        "How fast does shipping take?"
      ]
    };
  }

  findMatchingProductIds(text) {
    const catalog = typeof PRODUCTS_DATA !== "undefined"
      ? PRODUCTS_DATA
      : (typeof require !== "undefined" ? require("./data/products.js") : []);
    if (!text || !Array.isArray(catalog) || catalog.length === 0) return [];
    const lower = text.toLowerCase();
    const scored = catalog.map(product => {
      let score = 0;
      // Match by illness keywords
      (product.illnesses || []).forEach(ill => {
        if (lower.includes(ill.toLowerCase())) score += 6;
      });
      // Match by herbs
      (product.herbs || []).forEach(herb => {
        if (lower.includes(herb.toLowerCase())) score += 5;
      });
      // Match by name
      if (lower.includes(product.name.toLowerCase())) score += 10;
      // Match by category
      if (product.category && lower.includes(product.category.toLowerCase())) score += 3;
      return { id: product.id, score };
    });

    return scored
      .filter(s => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(s => s.id);
  }

  // =========================================================================
  // RENDERING & INTERACTIVE PRODUCT CARDS
  // =========================================================================

  renderMessages() {
    if (!this.messagesList) return;

    this.messagesList.innerHTML = this.messages.map((msg, msgIdx) => {
      const isUser = msg.role === "user";
      const formattedContent = this.formatMarkdown(msg.content);

      // Embedded product cards
      let cardsHtml = "";
      if (msg.productIds && msg.productIds.length > 0 && typeof PRODUCTS_DATA !== "undefined") {
        const products = msg.productIds
          .map(id => PRODUCTS_DATA.find(p => p.id === id))
          .filter(Boolean);

        if (products.length > 0) {
          cardsHtml = `
            <div class="ai-recommendations-wrap">
              <div class="ai-recs-title">🌿 Recommended Botanical Remedies:</div>
              <div class="ai-recs-grid">
                ${products.map(p => this.renderProductCard(p, msgIdx)).join("")}
              </div>
            </div>
          `;
        }
      }

      // Dynamic follow-up suggestion chips
      let suggestionsHtml = "";
      if (!isUser && msg.suggestions && msg.suggestions.length > 0 && msgIdx === this.messages.length - 1) {
        suggestionsHtml = `
          <div class="ai-suggestions-row">
            ${msg.suggestions.map(s => `
              <button class="ai-suggestion-chip" onclick="aiHerbalist.sendQuickPrompt('${this.escapeHtml(s)}')">
                <span>✦</span> ${s}
              </button>
            `).join("")}
          </div>
        `;
      }

      return `
        <div class="ai-message ${isUser ? 'ai-user' : 'ai-assistant'}" data-index="${msgIdx}">
          <div class="ai-msg-avatar">${isUser ? '👤' : '🍃'}</div>
          <div class="ai-msg-bubble">
            <div class="ai-msg-text">${formattedContent}</div>
            ${cardsHtml}
            ${suggestionsHtml}
          </div>
        </div>
      `;
    }).join("");
  }

  renderProductCard(product, msgIdx) {
    const formattedPrice = window.geoCurrency 
      ? window.geoCurrency.formatPrice(product.priceKES) 
      : `KSh ${product.priceKES.toLocaleString()}`;

    const btnId = `aiAddBtn_${msgIdx}_${product.id}`;

    // Check if item is already in cart
    const inCart = window.cart && window.cart.items
      ? window.cart.items.find(i => i.id === product.id)
      : null;

    const btnText = inCart ? `✓ In Basket (${inCart.quantity})` : `+ Basket`;
    const btnClass = inCart ? `ai-rec-btn ai-btn-add ai-btn-added` : `ai-rec-btn ai-btn-add`;

    return `
      <div class="ai-rec-card" data-product-id="${product.id}">
        <img src="${product.image}" alt="${product.name}" class="ai-rec-thumb" onerror="this.src='assets/images/hero-apothecary.jpg'">
        <div class="ai-rec-details">
          <div class="ai-rec-name">${product.name}</div>
          <div class="ai-rec-botanical">${product.botanicalName}</div>
          <div class="ai-rec-price">${formattedPrice}</div>
          <div class="ai-rec-actions">
            <button class="ai-rec-btn ai-btn-view" onclick="app.showQuickView('${product.id}')" title="Quick View Botanical Details">
              Details
            </button>
            <button class="${btnClass}" id="${btnId}" onclick="aiHerbalist.quickAddToCart('${product.id}', '${btnId}')" title="Add to Basket without leaving consultation">
              ${btnText}
            </button>
            <button class="ai-rec-btn ai-btn-cartlink" onclick="window.cart && window.cart.openDrawer()" title="View full basket">
              Basket ↗
            </button>
          </div>
        </div>
      </div>
    `;
  }

  quickAddToCart(productId, btnId) {
    if (window.cart) {
      // Add item silently without slamming the full cart drawer open
      window.cart.addItem(productId, 1, false);

      const btn = document.getElementById(btnId);
      if (btn) {
        btn.textContent = "✓ Added!";
        btn.classList.add("ai-btn-added");
        setTimeout(() => {
          const item = window.cart.items.find(i => i.id === productId);
          btn.textContent = item ? `✓ In Basket (${item.quantity})` : "+ Basket";
        }, 1500);
      }
    }
  }

  showTypingIndicator() {
    if (!this.messagesList) return;
    const existing = document.getElementById("aiTypingIndicator");
    if (existing) return;

    const el = document.createElement("div");
    el.id = "aiTypingIndicator";
    el.className = "ai-message ai-assistant ai-typing-row";
    el.innerHTML = `
      <div class="ai-msg-avatar">🍃</div>
      <div class="ai-msg-bubble ai-typing-bubble">
        <span class="ai-dot"></span>
        <span class="ai-dot"></span>
        <span class="ai-dot"></span>
        <span class="ai-typing-text">Consulting botanical pharmacopoeia...</span>
      </div>
    `;
    this.messagesList.appendChild(el);
    this.scrollToBottom();
  }

  hideTypingIndicator() {
    const el = document.getElementById("aiTypingIndicator");
    if (el) el.remove();
  }

  scrollToBottom() {
    if (!this.messagesList) return;
    setTimeout(() => {
      this.messagesList.scrollTo({
        top: this.messagesList.scrollHeight,
        behavior: "smooth"
      });
    }, 40);
  }

  // =========================================================================
  // ROBUST MARKDOWN PARSER
  // =========================================================================

  formatMarkdown(text) {
    if (!text) return "";

    // 1. Sanitize HTML
    let safe = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // 2. Bold text: **text**
    safe = safe.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

    // 3. Italics (without colliding with bullet points): *word* or _word_
    safe = safe.replace(/(^|[^\*\w])\*([^\*\n]+?)\*([^\*\w]|$)/g, "$1<em>$2</em>$3");
    safe = safe.replace(/(^|[^\w])_([^\_\n]+?)_([^\w]|$)/g, "$1<em>$2</em>$3");

    // 4. Split into block elements by double newlines
    const blocks = safe.split(/\n\s*\n/);

    const formattedBlocks = blocks.map(block => {
      const lines = block.trim().split("\n");

      // Check if this block is a bullet list (- item or * item)
      const isBulletList = lines.every(l => /^[\-\*•]\s+/.test(l.trim()));
      if (isBulletList) {
        const items = lines.map(l => `<li>${l.replace(/^[\-\*•]\s+/, "").trim()}</li>`).join("");
        return `<ul class="ai-list">${items}</ul>`;
      }

      // Check if this block is a numbered list (1. item)
      const isNumberedList = lines.every(l => /^\d+[\.\)]\s+/.test(l.trim()));
      if (isNumberedList) {
        const items = lines.map(l => `<li>${l.replace(/^\d+[\.\)]\s+/, "").trim()}</li>`).join("");
        return `<ol class="ai-list">${items}</ol>`;
      }

      // Check if block is a blockquote (> quote)
      if (lines.every(l => /^&gt;\s+/.test(l.trim()))) {
        const content = lines.map(l => l.replace(/^&gt;\s+/, "").trim()).join("<br>");
        return `<blockquote>${content}</blockquote>`;
      }

      // Regular paragraph
      return `<p>${lines.join("<br>")}</p>`;
    });

    return formattedBlocks.join("");
  }

  escapeHtml(str) {
    return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
  }
}

// Global instance
if (typeof window !== "undefined") {
  window.aiHerbalist = new AIHerbalistController();
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = AIHerbalistController;
}

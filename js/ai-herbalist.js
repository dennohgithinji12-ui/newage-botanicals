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

    // Wait for DOM to be ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.init());
    } else {
      this.init();
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
          const systemPrompt = this.buildSystemPrompt();
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

  buildCatalogContext() {
    if (typeof PRODUCTS_DATA === "undefined" || !Array.isArray(PRODUCTS_DATA)) {
      return "";
    }

    return PRODUCTS_DATA.map(p => {
      const illnesses = (p.illnesses || []).slice(0, 5).join(", ");
      const herbs = (p.herbs || []).slice(0, 4).join(", ");
      return `ID: ${p.id} | Name: "${p.name}" | Botanical: "${p.botanicalName}" | Category: ${p.categoryName} | Price: KSh ${p.priceKES} | Herbs: [${herbs}] | Helps With: [${illnesses}] | Ritual: "${p.ritualGuide || ''}"`;
    }).join("\n");
  }

  buildSystemPrompt() {
    const catalog = this.buildCatalogContext();

    return `You are the Master Herbal Alchemist for "NewAge Health Botanicals & Rituals", an East African botanical apothecary.
Your role: Compassionately diagnose wellness imbalances and recommend exact remedies from our apothecary catalog.

CATALOG REFERENCE:
${catalog}

RULES:
1. Tone: Calming, poetic, respectful, grounded in traditional African and global phytotherapy.
2. Product tags: Include [PRODUCT: product-id] for 1 to 2 products recommended.
3. Rituals: Detail exact brewing temperature, steeping time, or application methods.
4. Formatting: Use clean markdown bolding and bullet points. Keep answers concise.`;
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
    if (!text || typeof PRODUCTS_DATA === "undefined") return [];
    const lower = text.toLowerCase();
    const scored = PRODUCTS_DATA.map(product => {
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
window.aiHerbalist = new AIHerbalistController();

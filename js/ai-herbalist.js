/**
 * NewAge Health Botanicals & Rituals - AI Herbalist Consultation Engine
 * Powered by Puter.js (100% Free, Serverless, Zero-Backend AI)
 * Grounded in the local PRODUCTS_DATA herbal pharmacopoeia
 */

class AIHerbalistController {
  constructor() {
    this.isOpen = false;
    this.isThinking = false;
    this.messages = [];
    this.storageKey = "nah_ai_herbalist_history";
    this.panel = null;
    this.launcher = null;
    this.messagesList = null;
    this.inputField = null;

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

    // Load conversation or seed with welcome
    const saved = this.loadHistory();
    if (saved && saved.length > 0) {
      this.messages = saved;
    } else {
      this.messages = [
        {
          role: "assistant",
          content: "Greetings, seeker of wellness. 🌿 I am your **Sacred Herbal Alchemist**.\n\nShare with me your health aspirations, symptoms, or physical discomforts (such as *insomnia, bloating, sluggish energy, hair thinning, or muscle aches*), and I will consult our botanical pharmacopoeia to tailor a sacred remedy ritual for you.",
          productIds: ["moringa-powder-organic", "bedtime-dream-tea"]
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
    this.panel.style.display = "flex";
    this.panel.classList.add("open");
    if (this.launcher) this.launcher.classList.add("active");
    this.scrollToBottom();
    setTimeout(() => {
      if (this.inputField) this.inputField.focus();
    }, 150);
  }

  close() {
    if (!this.panel) return;
    this.isOpen = false;
    this.panel.classList.remove("open");
    if (this.launcher) this.launcher.classList.remove("active");
    setTimeout(() => {
      if (!this.isOpen) this.panel.style.display = "none";
    }, 250);
  }

  clearChat() {
    if (confirm("Would you like to clear this herbal consultation and start fresh?")) {
      localStorage.removeItem(this.storageKey);
      this.messages = [
        {
          role: "assistant",
          content: "The apothecary slate is cleared. 🍃 How may I guide your healing journey today?",
          productIds: []
        }
      ];
      this.saveHistory();
      this.renderMessages();
    }
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
      // Keep last 15 messages to prevent bloat
      const trimmed = this.messages.slice(-15);
      localStorage.setItem(this.storageKey, JSON.stringify(trimmed));
    } catch (e) {}
  }

  // =========================================================================
  // CATALOG CONTEXT & PROMPT COMPOSITION
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

    return `You are the Master Herbal Alchemist for "NewAge Health Botanicals & Rituals", a high-end East African and global botanical apothecary.
Your mission is to compassionately listen to customer ailments, diagnose wellness imbalances, and recommend exact remedies from our store catalog.

STORE CATALOG REFERENCE:
${catalog}

INSTRUCTIONS:
1. Tone: Respectful, calming, poetic yet scientifically grounded in plant biochemistry and traditional African/global phytotherapy.
2. Recommending Products: Whenever you recommend a product from the catalog, you MUST include its ID enclosed in brackets like: [PRODUCT: product-id]. For example: [PRODUCT: bedtime-dream-tea] or [PRODUCT: baobab-fruit-powder]. Recommend 1 to 3 products maximum per response so the user isn't overwhelmed.
3. Ritual Wisdom: Provide actionable brewing, application, or dosage instructions (e.g. water temperature, steeping time, time of day).
4. Safety & Disclaimer: If the inquiry involves severe medical conditions (pregnancy, heart disorders, chronic illness), gently advise consulting a healthcare professional alongside botanical care.
5. Format your response cleanly using markdown (bolding key terms, bullet points for rituals). Keep answers concise and readable on mobile devices.`;
  }

  // =========================================================================
  // CHAT SUBMISSION & PUTER AI HANDLING
  // =========================================================================

  async handleUserSubmit(event) {
    if (event) event.preventDefault();
    if (!this.inputField || this.isThinking) return;

    const query = this.inputField.value.trim();
    if (!query) return;

    this.inputField.value = "";
    await this.sendQuery(query);
  }

  async sendQuickPrompt(promptText) {
    this.open();
    if (this.isThinking) return;
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

      // Check if Puter.js is available in window
      if (window.puter && window.puter.ai && typeof window.puter.ai.chat === "function") {
        const systemPrompt = this.buildSystemPrompt();

        // Build conversation history for Puter
        const puterMessages = [
          { role: "system", content: systemPrompt },
          ...this.messages.slice(-6).map(m => ({
            role: m.role === "assistant" ? "assistant" : "user",
            content: m.content
          }))
        ];

        // Free Puter.js AI Call
        const puterResult = await window.puter.ai.chat(puterMessages, {
          model: "gpt-4o-mini"
        });

        if (typeof puterResult === "string") {
          aiResponseText = puterResult;
        } else if (puterResult?.message?.content) {
          aiResponseText = puterResult.message.content;
        } else if (puterResult?.text) {
          aiResponseText = puterResult.text;
        } else {
          aiResponseText = JSON.stringify(puterResult);
        }

        // Extract [PRODUCT: id] tokens
        const productRegex = /\[PRODUCT:\s*([a-zA-Z0-9-_]+)\]/g;
        let match;
        while ((match = productRegex.exec(aiResponseText)) !== null) {
          const id = match[1].trim();
          if (PRODUCTS_DATA.some(p => p.id === id) && !matchedProductIds.includes(id)) {
            matchedProductIds.push(id);
          }
        }
        // Clean out raw [PRODUCT: id] tokens from text for smooth reading
        aiResponseText = aiResponseText.replace(/\[PRODUCT:\s*[a-zA-Z0-9-_]+\]/g, "").trim();

      } else {
        // Local Fallback Alchemist (works 100% offline or if Puter script is blocked)
        const fallback = this.generateLocalFallback(userText);
        aiResponseText = fallback.text;
        matchedProductIds = fallback.productIds;
      }

      // If no product tags were matched by regex, automatically match based on text content
      if (matchedProductIds.length === 0) {
        matchedProductIds = this.findMatchingProductIds(userText + " " + aiResponseText);
      }

      this.messages.push({
        role: "assistant",
        content: aiResponseText,
        productIds: matchedProductIds.slice(0, 3)
      });

      this.saveHistory();
    } catch (err) {
      console.warn("Puter AI consultation fallback engaged:", err);
      // Fallback seamlessly so customer always gets an insightful answer
      const fallback = this.generateLocalFallback(userText);
      this.messages.push({
        role: "assistant",
        content: fallback.text,
        productIds: fallback.productIds
      });
      this.saveHistory();
    } finally {
      this.isThinking = false;
      this.hideTypingIndicator();
      this.renderMessages();
      this.scrollToBottom();
    }
  }

  // =========================================================================
  // CLIENT-SIDE LOCAL ALCHEMIST FALLBACK (Zero Failure Guarantee)
  // =========================================================================

  findMatchingProductIds(text) {
    if (!text || typeof PRODUCTS_DATA === "undefined") return [];
    const lower = text.toLowerCase();
    const scored = PRODUCTS_DATA.map(product => {
      let score = 0;
      // Match by illness
      (product.illnesses || []).forEach(ill => {
        if (lower.includes(ill.toLowerCase())) score += 5;
      });
      // Match by herbs
      (product.herbs || []).forEach(herb => {
        if (lower.includes(herb.toLowerCase())) score += 4;
      });
      // Match by name
      if (lower.includes(product.name.toLowerCase())) score += 8;
      // Match by category
      if (lower.includes(product.category.toLowerCase())) score += 2;
      return { id: product.id, score };
    });

    return scored
      .filter(s => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 2)
      .map(s => s.id);
  }

  generateLocalFallback(query) {
    const q = query.toLowerCase();
    let matched = this.findMatchingProductIds(query);

    if (matched.length === 0) {
      // Default to top versatile herbal essentials
      matched = ["moringa-powder-organic", "bedtime-dream-tea"];
    }

    const firstProduct = PRODUCTS_DATA.find(p => p.id === matched[0]);
    const secondProduct = matched[1] ? PRODUCTS_DATA.find(p => p.id === matched[1]) : null;

    let response = `Based on your wellness inquiry, the herbal pharmacopoeia reveals that harmony can be restored by nourishing the body's natural biorhythms.\n\n`;

    if (firstProduct) {
      response += `🌿 **Primary Recommendation:** **${firstProduct.name}** (*${firstProduct.botanicalName}*)\n${firstProduct.description}\n\n**Ritual Practice:** ${firstProduct.ritualGuide || 'Whisk into warm water or tea with mindful intention.'}\n\n`;
    }

    if (secondProduct) {
      response += `✨ **Synergistic Ally:** **${secondProduct.name}**\n${secondProduct.description}\n\n`;
    }

    response += `*Drink ample spring water, honor your resting cycles, and allow the botanical prana to align your vitality.*`;

    return {
      text: response,
      productIds: matched
    };
  }

  // =========================================================================
  // RENDERING & INTERACTIVE PRODUCT CARDS
  // =========================================================================

  renderMessages() {
    if (!this.messagesList) return;

    this.messagesList.innerHTML = this.messages.map((msg, idx) => {
      const isUser = msg.role === "user";
      const formattedContent = this.formatMarkdown(msg.content);

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
                ${products.map(p => this.renderProductCard(p)).join("")}
              </div>
            </div>
          `;
        }
      }

      return `
        <div class="ai-message ${isUser ? 'ai-user' : 'ai-assistant'}" data-index="${idx}">
          <div class="ai-msg-avatar">${isUser ? '👤' : '🍃'}</div>
          <div class="ai-msg-bubble">
            <div class="ai-msg-text">${formattedContent}</div>
            ${cardsHtml}
          </div>
        </div>
      `;
    }).join("");
  }

  renderProductCard(product) {
    const formattedPrice = window.geoCurrency 
      ? window.geoCurrency.formatPrice(product.priceKES) 
      : `KSh ${product.priceKES.toLocaleString()}`;

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
            <button class="ai-rec-btn ai-btn-add" id="aiAddBtn_${product.id}" onclick="aiHerbalist.quickAddToCart('${product.id}')" title="Add to Basket">
              + Basket
            </button>
          </div>
        </div>
      </div>
    `;
  }

  quickAddToCart(productId) {
    if (window.cart) {
      window.cart.addItem(productId, 1);
      const btn = document.getElementById(`aiAddBtn_${productId}`);
      if (btn) {
        btn.textContent = "✓ Added!";
        btn.style.background = "#00c389";
        btn.style.color = "#000";
        setTimeout(() => {
          btn.textContent = "+ Basket";
          btn.style.background = "";
          btn.style.color = "";
        }, 1800);
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
      this.messagesList.scrollTop = this.messagesList.scrollHeight;
    }, 50);
  }

  formatMarkdown(text) {
    if (!text) return "";
    let safe = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Bold
    safe = safe.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    // Italics
    safe = safe.replace(/\*(.*?)\*/g, "<em>$1</em>");
    // Line breaks to paragraphs
    safe = safe.split("\n\n").map(para => `<p>${para.replace(/\n/g, "<br>")}</p>`).join("");
    return safe;
  }
}

// Global instance
window.aiHerbalist = new AIHerbalistController();

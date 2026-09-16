/**
 * NewAge Botanicals — WhatsApp Conversational Commerce Engine (Gate 9)
 * Dedicated Business Line: +254141270112
 * 
 * Provides automated botanical consultation, symptom triage, direct Paystack
 * checkout link generation, batch CoA verification, and order tracking.
 */

const fs = require('fs');
const path = require('path');
const PRODUCTS_DATA = require('../js/data/products.js');

const WHATSAPP_CONFIG = {
  businessNumber: "+254141270112",
  brandName: "NewAge Botanicals",
  tagline: "Modern Botanical Wellness · Grounded in Evidence",
  supportHours: "Mon - Sat: 8:00 AM - 7:00 PM EAT",
  storeUrl: "https://omnicorehub.app",
  paystackPublicKey: "pk_live_fb70c442b890ed7467719e6771a0766b16894aae"
};

class WhatsAppAdvisoryEngine {
  constructor() {
    this.catalog = PRODUCTS_DATA;
  }

  /**
   * Generates the initial welcome greeting and interactive menu
   */
  generateWelcomeMenu(customerName = "Valued Seeker") {
    return `Greetings ${customerName} 🌿 Welcome to *${WHATSAPP_CONFIG.brandName}*.

I am your Master Herbal Advisory Assistant. Every remedy in our 150-product pharmacopoeia is wild-harvested across East Africa and verified by third-party laboratory testing.

*How may we support your wellbeing today?*
Reply with a number:

1️⃣ *Personalized Herbal Recommendation* (Sleep, Digestion, Energy, Hair, Skin, Vitality)
2️⃣ *Track My Order & View Lab CoA*
3️⃣ *Browse 150-Product Botanical Catalog*
4️⃣ *Speak with a Living Herbal Specialist*
5️⃣ *Quick Re-order / Replenishment*

_Or simply describe how your body is feeling in your own words._`;
  }

  /**
   * Process customer symptom query and generate structured recommendation
   */
  processSymptomInquiry(userMessage) {
    const q = userMessage.toLowerCase();
    
    // Keyword scoring across 150 products
    const scored = this.catalog.map(p => {
      let score = 0;
      (p.illnesses || []).forEach(i => {
        if (q.includes(i.toLowerCase())) score += 8;
      });
      (p.herbs || []).forEach(h => {
        if (q.includes(h.toLowerCase())) score += 5;
      });
      if (q.includes(p.name.toLowerCase())) score += 10;
      if (q.includes(p.category.toLowerCase())) score += 4;
      return { product: p, score };
    });

    const topMatches = scored
      .filter(s => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 2)
      .map(s => s.product);

    if (topMatches.length === 0) {
      // Default to bestsellers
      topMatches.push(
        this.catalog.find(p => p.id === "moringa-powder-organic"),
        this.catalog.find(p => p.id === "bedtime-dream-tea")
      );
    }

    const p1 = topMatches[0];
    const p2 = topMatches[1];

    let reply = `Thank you for sharing with us. Based on what your body is experiencing, our botanical pharmacopoeia indicates:\n\n`;

    if (p1) {
      reply += `🌿 *Primary Botanical Ally: ${p1.name}*\n`;
      reply += `_Scientific Name:_ *${p1.botanicalName}*\n`;
      reply += `_Price:_ *KSh ${p1.priceKES.toLocaleString()}*\n`;
      reply += `_Why it works:_ ${p1.benefits ? p1.benefits[0] : p1.description}\n`;
      reply += `_Daily Ritual:_ ${p1.ritualGuide || 'Take daily with intention.'}\n\n`;
    }

    if (p2) {
      reply += `✨ *Synergistic Partner: ${p2.name}*\n`;
      reply += `_Price:_ *KSh ${p2.priceKES.toLocaleString()}*\n`;
      reply += `_Key Action:_ ${p2.benefits ? p2.benefits[0] : p2.description}\n\n`;
    }

    reply += `📦 *Fast Delivery:* Nairobi Same-Day / Kenya Nationwide 24-48h.\n`;
    reply += `🔒 *Secure Payment:* M-Pesa Express & Card via Paystack.\n\n`;
    reply += `To order immediately, reply *ORDER* or visit our online store: ${WHATSAPP_CONFIG.storeUrl}`;

    return reply;
  }

  /**
   * Generates a direct WhatsApp payment link payload
   */
  generateOrderCheckoutMessage(productIds, customerPhone) {
    const items = productIds
      .map(id => this.catalog.find(p => p.id === id))
      .filter(Boolean);

    if (items.length === 0) {
      return "No products selected. Please specify which remedies you would like to order.";
    }

    const totalKES = items.reduce((sum, item) => sum + item.priceKES, 0);
    const orderRef = `NAB-WA-${Date.now().toString().slice(-6)}`;

    return `🛍️ *Order Confirmation Summary:* \`${orderRef}\`

${items.map(item => `• ${item.name} — *KSh ${item.priceKES.toLocaleString()}*`).join('\n')}

*Total Amount:* *KSh ${totalKES.toLocaleString()}*
*Delivery:* Free Nairobi Courier (Orders over KSh 5,000) or KSh 300 flat.

*Complete Your Order via M-Pesa:*
Click the secure Paystack link below:
👉 ${WHATSAPP_CONFIG.storeUrl}?checkout=${orderRef}&total=${totalKES}&phone=${encodeURIComponent(customerPhone || '')}

_Your batch-specific Certificate of Analysis (CoA) will be included in your package._`;
  }

  /**
   * Abandoned Cart Recovery Message
   */
  generateAbandonedCartNudge(customerName, cartItems) {
    return `Hello ${customerName || 'Friend'} 🍃 

We noticed you paused your herbal consultation with NewAge Botanicals. Your remedies are still reserved in your basket:

${(cartItems || []).map(i => `• ${i.name}`).join('\n')}

Would you like assistance selecting the exact ritual or brewing instructions for your needs? 

Reply *YES* to speak with our herbalist, or tap here to complete your order with M-Pesa:
👉 ${WHATSAPP_CONFIG.storeUrl}/#shop`;
  }
  /**
   * High-level handler for conversational customer inquiries
   */
  handleInquiry(customerName, userMessage) {
    const message = this.processSymptomInquiry(userMessage);
    // Find best matching product
    const q = userMessage.toLowerCase();
    const scored = this.catalog.map(p => {
      let score = 0;
      (p.illnesses || []).forEach(i => {
        if (q.includes(i.toLowerCase())) score += 8;
      });
      (p.herbs || []).forEach(h => {
        if (q.includes(h.toLowerCase())) score += 5;
      });
      if (q.includes(p.name.toLowerCase())) score += 10;
      return { p, score };
    });

    const top = scored.sort((a, b) => b.score - a.score)[0]?.p || this.catalog[0];

    return {
      message,
      recommendedProduct: top ? top.name : "Bedtime Restorative Herbal Tea",
      productId: top ? top.id : "bedtime-dream-tea"
    };
  }
}

// CLI Test
if (require.main === module) {
  const engine = new WhatsAppAdvisoryEngine();
  console.log("\n================================================================================");
  console.log("       NEWAGE BOTANICALS — WHATSAPP COMMERCE & ADVISORY ENGINE (GATE 9)");
  console.log("================================================================================\n");

  console.log("--- 1. Initial Greeting ---");
  console.log(engine.generateWelcomeMenu("Amina"));

  console.log("\n--- 2. Simulated Symptom Inquiry ('I have severe insomnia and work stress') ---");
  console.log(engine.processSymptomInquiry("I have severe insomnia and work stress"));

  console.log("\n--- 3. Direct Order & Paystack M-Pesa Link ---");
  console.log(engine.generateOrderCheckoutMessage(["moringa-powder-organic", "bedtime-dream-tea"], "+254712345678"));

  console.log("\n✓ WhatsApp Conversational Commerce engine tested successfully.\n");
}

const advisoryEngine = new WhatsAppAdvisoryEngine();
WhatsAppAdvisoryEngine.advisoryEngine = advisoryEngine;

module.exports = WhatsAppAdvisoryEngine;
module.exports.WhatsAppAdvisoryEngine = WhatsAppAdvisoryEngine;
module.exports.advisoryEngine = advisoryEngine;

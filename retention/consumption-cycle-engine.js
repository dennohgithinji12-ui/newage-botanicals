/**
 * NewAge Botanicals — Post-Purchase Consumption Cycle Engine (Gate 10)
 * 
 * Automates the post-purchase retention sequence across Day 0, Day 2, Day 7,
 * Day 14, Day 21, and Day 30 to maximize product usage, habit formation,
 * verified review collection, and repeat replenishments.
 */

const fs = require('fs');
const path = require('path');

class ConsumptionCycleEngine {
  constructor() {
    this.storeUrl = "https://omnicorehub.app";
    this.brandName = "NewAge Botanicals";
  }

  /**
   * Generates the entire 30-day retention notification queue for a customer order
   * @param {Object} order - Customer order data
   */
  generateRetentionSchedule(order) {
    const orderDate = new Date(order.orderDate || Date.now());
    const customerName = order.customerName || "Valued Seeker";
    const primaryProduct = order.items && order.items[0] ? order.items[0] : { name: "Botanical Remedy", id: "moringa-powder-organic" };
    const lotNumber = order.lotNumber || "NAB-2026-MOR-001";

    const addDays = (d, days) => new Date(d.getTime() + days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const milestones = [
      {
        day: 0,
        triggerDate: addDays(orderDate, 0),
        channel: "WhatsApp & Email",
        title: "Day 0: Order Confirmed & Sacred Unboxing Preparation",
        message: `Greetings ${customerName} 🌿 

Your order for *${primaryProduct.name}* (Lot: \`${lotNumber}\`) is safely secured at our Nairobi apothecary.

Before your courier arrives, you can inspect your batch's certified laboratory Certificate of Analysis (CoA) testing for heavy metals and purity:
👉 ${this.storeUrl}/atlas?lot=${lotNumber}

Prepare a quiet morning moment for your unboxing ritual.`
      },
      {
        day: 2,
        triggerDate: addDays(orderDate, 2),
        channel: "WhatsApp & SMS",
        title: "Day 2: Courier Arrival & Ritual Video Guide",
        message: `Your botanical parcel has been safely dispatched via courier 📦

*Your Sacred First Day Ritual:*
Watch our 60-second video on how to whisk and savor your ${primaryProduct.name} for maximum cellular absorption:
👉 ${this.storeUrl}/#ritual-guide

May this plant ally bring harmony and vigor to your sanctuary today.`
      },
      {
        day: 7,
        triggerDate: addDays(orderDate, 7),
        channel: "WhatsApp",
        title: "Day 7: First-Week Habit Check-In",
        message: `Hello ${customerName} 🍃 It has been 7 days since you welcomed ${primaryProduct.name} into your daily rhythm.

*How are your cells feeling?*
Most of our community begins to notice lighter digestion and clearer morning wakefulness around Day 7.

Reply directly to this message if you have any questions on brewing temperature, taste adjustments, or pairing with meals. We are here to support your journey.`
      },
      {
        day: 14,
        triggerDate: addDays(orderDate, 14),
        channel: "Email & WhatsApp",
        title: "Day 14: Cellular Compounding Education",
        message: `The Science of Botanical Compounding 🌱

Unlike synthetic stimulants that spike and crash, natural polyphenols and adaptogens work cumulatively. At Day 14, your cellular receptors have assimilated the plant compounds, supporting steady baseline homeostasis.

Keep your daily ritual consistent—the greatest benefits are unfolding right now.`
      },
      {
        day: 21,
        triggerDate: addDays(orderDate, 21),
        channel: "WhatsApp & Email",
        title: "Day 21: Review Collection & Reward Incentive",
        message: `${customerName}, your experience inspires our whole community 🌟

How has your energy and wellbeing transformed over the last 3 weeks? 

Share a 30-second video or photo review of your ritual and receive **KSh 500 in apothecary credit** toward your next order:
👉 ${this.storeUrl}/#reviews?order=${order.orderId || 'NAB-100'}`
      },
      {
        day: 30,
        triggerDate: addDays(orderDate, 30),
        channel: "WhatsApp & SMS",
        title: "Day 30: Smart Replenishment Trigger",
        message: `Time for your monthly replenishment 🌿

Your 30-day supply of *${primaryProduct.name}* is likely in its final servings. Keep your wellness momentum unbroken without missing a single morning.

*One-Click M-Pesa Reorder (10% Loyalty Discount):*
👉 ${this.storeUrl}?reorder=${primaryProduct.id}&discount=LOYAL10`
      }
    ];

    const touchpoints = milestones;
    return {
      orderId: order.orderId || "NAB-ORD-001",
      customerName,
      customerPhone: order.customerPhone || "+254700000000",
      orderDate: orderDate.toISOString().split('T')[0],
      milestones,
      touchpoints
    };
  }

  generateSchedule(order) {
    return this.generateRetentionSchedule(order);
  }
}

// CLI Execution & Test
if (require.main === module) {
  const engine = new ConsumptionCycleEngine();
  const sampleOrder = {
    orderId: "NAB-ORD-2026-001",
    customerName: "Wanjiku Muthoni",
    customerPhone: "+254722123456",
    orderDate: "2026-09-13",
    lotNumber: "NAB-2026-MOR-001",
    items: [
      { id: "moringa-powder-organic", name: "Pure Wildcrafted Moringa Leaf Powder", priceKES: 1450 }
    ]
  };

  const schedule = engine.generateRetentionSchedule(sampleOrder);

  console.log("\n================================================================================");
  console.log("       NEWAGE BOTANICALS — POST-PURCHASE RETENTION ENGINE (GATE 10)");
  console.log("================================================================================\n");

  console.log(`Generated 30-Day Retention Schedule for Order: ${schedule.orderId} (${schedule.customerName})\n`);

  schedule.milestones.forEach(m => {
    console.log(`[${m.triggerDate}] ${m.title}`);
    console.log(`Channel: ${m.channel}`);
    console.log(`Message Preview:\n${m.message.slice(0, 150)}...\n`);
  });

  const outputPath = path.join(__dirname, 'sample-retention-schedule.json');
  fs.writeFileSync(outputPath, JSON.stringify(schedule, null, 2));
  console.log(`✓ Sample 30-day retention schedule saved to: ${outputPath}\n`);
}

const consumptionCycleEngine = new ConsumptionCycleEngine();
ConsumptionCycleEngine.consumptionCycleEngine = consumptionCycleEngine;

module.exports = ConsumptionCycleEngine;
module.exports.ConsumptionCycleEngine = ConsumptionCycleEngine;
module.exports.consumptionCycleEngine = consumptionCycleEngine;

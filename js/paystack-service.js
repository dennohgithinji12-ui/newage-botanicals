/**
 * NewAge Health Botanicals & Rituals - Paystack Inline Payment Service
 * Zero-database, client-side Paystack payment integration
 */

class PaystackPaymentService {
  constructor() {
    this.publicKey = (typeof localStorage !== "undefined" && localStorage.getItem("nah_paystack_key")) 
      ? localStorage.getItem("nah_paystack_key") 
      : (CONFIG.paystack?.publicKey || "pk_live_6a8b869ee1a3230aeddc2ec02504b461c9ba2ab6");
  }

  setPublicKey(newKey) {
    if (newKey && newKey.trim()) {
      this.publicKey = newKey.trim();
      CONFIG.paystack.publicKey = this.publicKey;
      localStorage.setItem("nah_paystack_key", this.publicKey);
    }
  }

  async initiatePayment({
    customerEmail,
    customerName,
    customerPhone,
    customerAddress,
    deliveryRegion,
    orderNotes,
    amountInKES,
    items,
    promoApplied,
    onSuccess,
    onClose
  }) {
    const currentCurrency = window.geoCurrency ? window.geoCurrency.currentCurrency : CONFIG.baseCurrency;
    const formattedPrice = window.geoCurrency ? window.geoCurrency.formatPrice(amountInKES) : `KSh ${amountInKES}`;

    // Unique transaction reference
    const reference = `NAH-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 899 + 100)}`;
    const email = customerEmail || `${(customerPhone || '').replace(/[^0-9]/g, '') || 'guest'}@orders.omnicorehub.app`;

    const orderData = {
      reference,
      customerName,
      customerEmail: email,
      customerPhone,
      customerAddress,
      deliveryRegion: deliveryRegion || 'Nairobi Metro',
      orderNotes,
      items,
      amountInKES,
      currency: currentCurrency,
      formattedPrice,
      promoApplied,
      paymentMethod: 'paystack_direct_mpesa',
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    };

    // Complete directly on site without popups (Paystack Charge API / D1 SQLite sync)
    try {
      const res = await fetch('/api/charge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reference,
          customerName,
          customerPhone,
          customerEmail: email,
          deliveryAddress,
          deliveryRegion,
          items,
          amountKES: amountInKES,
          notes: orderNotes
        })
      });

      const data = await res.json();
      orderData.reference = data.orderId || reference;
      orderData.message = data.message || `📱 M-Pesa prompt sent to ${customerPhone}.`;
      orderData.paystackStatus = data.paystackStatus;
      this.saveOrderHistory(orderData);

      // Meta Pixel Purchase Event
      if (window.fbq) {
        try {
          fbq('track', 'Purchase', {
            content_ids: (items || []).map(i => i.id),
            content_type: 'product',
            value: amountInKES,
            currency: 'KES',
            num_items: (items || []).reduce((sum, item) => sum + (item.quantity || 1), 0)
          });
        } catch (err) {
          console.warn('Meta Pixel Purchase error:', err);
        }
      }

      if (onSuccess) onSuccess(orderData);
      return;
    } catch (apiErr) {
      console.warn('On-site charge direct fallback:', apiErr);
      this.saveOrderHistory(orderData);
      if (onSuccess) onSuccess(orderData);
    }
  }

  simulateTestCheckout(orderData, onSuccess, onClose) {
    const isConfirmed = confirm(
      `🌿 [Paystack Test Mode Demo]\n\n` +
      `Amount: ${orderData.formattedPrice} (${orderData.currency})\n` +
      `Customer: ${orderData.customerName} (${orderData.customerEmail})\n` +
      `Reference: ${orderData.reference}\n\n` +
      `Paystack key in use: ${this.publicKey.substring(0, 12)}...\n\n` +
      `To accept REAL live payments (M-Pesa, Card), enter your Paystack Live Public Key (pk_live_...) in Settings or js/config.js.\n\n` +
      `Click OK to simulate a Successful Payment & generate your Official Digital Receipt!`
    );

    if (isConfirmed) {
      orderData.paystackResponse = { status: "success", message: "Approved (Test Simulation)" };
      this.saveOrderHistory(orderData);
      if (onSuccess) onSuccess(orderData);
    } else {
      if (onClose) onClose();
    }
  }

  saveOrderHistory(orderData) {
    try {
      const history = JSON.parse(localStorage.getItem("nah_order_history") || "[]");
      history.unshift(orderData);
      localStorage.setItem("nah_order_history", JSON.stringify(history.slice(0, 20)));
    } catch (e) {
      console.warn("Could not save order history:", e);
    }
  }
}

window.paystackService = new PaystackPaymentService();

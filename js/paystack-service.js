/**
 * NewAge Health Botanicals & Rituals - Paystack Inline Payment Service
 * Zero-database, client-side Paystack payment integration
 */

class PaystackPaymentService {
  constructor() {
    this.publicKey = (typeof localStorage !== "undefined" && localStorage.getItem("nah_paystack_key")) 
      ? localStorage.getItem("nah_paystack_key") 
      : (CONFIG.paystack?.publicKey || "pk_test_51a2f4d6e8b09c12a7f9e8d4a3b2c1d0e8f7a6b5");
  }

  setPublicKey(newKey) {
    if (newKey && newKey.trim()) {
      this.publicKey = newKey.trim();
      CONFIG.paystack.publicKey = this.publicKey;
      localStorage.setItem("nah_paystack_key", this.publicKey);
    }
  }

  initiatePayment({
    customerEmail,
    customerName,
    customerPhone,
    customerAddress,
    orderNotes,
    amountInKES,
    items,
    promoApplied,
    onSuccess,
    onClose
  }) {
    const currentCurrency = window.geoCurrency ? window.geoCurrency.currentCurrency : CONFIG.baseCurrency;
    const currencyObj = CONFIG.currencies[currentCurrency] || CONFIG.currencies.KES;
    const amountInSubunits = window.geoCurrency ? window.geoCurrency.getPaystackAmount(amountInKES) : Math.round(amountInKES * 100);
    const formattedPrice = window.geoCurrency ? window.geoCurrency.formatPrice(amountInKES) : `KSh ${amountInKES}`;

    // Unique transaction reference
    const reference = `NAH-${Date.now()}-${Math.floor(Math.random() * 89999 + 10000)}`;

    const orderData = {
      reference,
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      orderNotes,
      items,
      amountInKES,
      currency: currentCurrency,
      formattedPrice,
      promoApplied,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    };

    // Dynamic SDK loader if not already available
    const ensurePaystackSDK = (callback) => {
      if (typeof PaystackPop !== "undefined" && typeof PaystackPop.setup === "function") {
        return callback(true);
      }
      const script = document.createElement("script");
      script.src = "https://js.paystack.co/v1/inline.js";
      script.async = true;
      script.onload = () => {
        callback(typeof PaystackPop !== "undefined" && typeof PaystackPop.setup === "function");
      };
      script.onerror = () => {
        callback(false);
      };
      document.head.appendChild(script);
    };

    ensurePaystackSDK((sdkReady) => {
      if (sdkReady) {
        try {
          const handler = PaystackPop.setup({
            key: this.publicKey,
            email: customerEmail,
            amount: amountInSubunits,
            currency: currentCurrency,
            channels: ['card', 'mobile_money', 'bank', 'ussd', 'qr'],
            ref: reference,
            metadata: {
              custom_fields: [
                { display_name: "Customer Name", variable_name: "customer_name", value: customerName },
                { display_name: "Phone Number", variable_name: "phone_number", value: customerPhone },
                { display_name: "Delivery Address", variable_name: "delivery_address", value: customerAddress },
                { display_name: "Items Count", variable_name: "items_count", value: items.length }
              ]
            },
            callback: (response) => {
              orderData.paystackResponse = response;
              orderData.reference = response.reference || reference;
              this.saveOrderHistory(orderData);
              if (onSuccess) onSuccess(orderData);
            },
            onClose: () => {
              if (onClose) onClose();
            }
          });

          handler.openIframe();
          return;
        } catch (err) {
          console.warn("Paystack Inline popup encountered an issue:", err);
        }
      }

      // Graceful fallback simulator (useful for testing, sandbox demo, or offline preview)
      this.simulateTestCheckout(orderData, onSuccess, onClose);
    });
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

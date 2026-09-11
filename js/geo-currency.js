/**
 * NewAge Health Botanicals & Rituals - Geolocation & Currency Engine
 * Automatically detects location via timezone & IP lookup, switches currency, and formats prices.
 */

class GeoCurrencyEngine {
  constructor() {
    this.currentCurrency = CONFIG.baseCurrency;
    this.detectedCountry = "Kenya";
    this.detectedCity = "";
    this.storageKey = "nah_user_currency";
    this.init();
  }

  async init() {
    // 1. Check if user already manually chose a currency in a previous visit
    const savedCurrency = localStorage.getItem(this.storageKey);
    if (savedCurrency && CONFIG.currencies[savedCurrency]) {
      this.setCurrency(savedCurrency, false);
      this.updateLocationBadge(`📍 Currency: ${savedCurrency} (Saved Choice)`);
    } else {
      // 2. Synchronous zero-latency detection via browser timezone/locale
      this.detectViaTimezone();
      // 3. Asynchronous refinement via IP Geolocation API
      this.detectViaIP();
    }
  }

  detectViaTimezone() {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (CONFIG.timezoneToCurrency[tz]) {
        const currency = CONFIG.timezoneToCurrency[tz];
        this.setCurrency(currency, false);
        this.updateLocationBadge(`📍 Detected: ${currency} (${tz.split('/')[1] || tz})`);
        return;
      }
      // Check prefix
      if (tz.startsWith("Africa/Nairobi")) this.setCurrency("KES", false);
      else if (tz.startsWith("Africa/Lagos")) this.setCurrency("NGN", false);
      else if (tz.startsWith("Africa/Accra")) this.setCurrency("GHS", false);
      else if (tz.startsWith("Africa/Johannesburg")) this.setCurrency("ZAR", false);
      else if (tz.startsWith("Europe/London")) this.setCurrency("GBP", false);
      else if (tz.startsWith("America/")) this.setCurrency("USD", false);
      else if (tz.startsWith("Europe/")) this.setCurrency("EUR", false);
      else this.setCurrency("KES", false); // Default for Kenyan herbal wellness
    } catch (e) {
      console.warn("Timezone detection fallback to KES:", e);
      this.setCurrency("KES", false);
    }
  }

  async detectViaIP() {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      // Free, lightweight, reliable IP geolocation endpoint
      const response = await fetch("https://ipapi.co/json/", { signal: controller.signal });
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        const countryCode = data.country_code;
        const countryName = data.country_name || countryCode;
        const currencyCode = data.currency;

        this.detectedCountry = countryName;
        this.detectedCity = data.city || "";

        // Only switch if user hasn't manually pinned a currency in this session
        if (!localStorage.getItem(this.storageKey)) {
          let matchedCurrency = CONFIG.countryCodeToCurrency[countryCode];
          if (!matchedCurrency && CONFIG.currencies[currencyCode]) {
            matchedCurrency = currencyCode;
          }
          if (matchedCurrency && CONFIG.currencies[matchedCurrency]) {
            this.setCurrency(matchedCurrency, false);
            this.updateLocationBadge(`📍 Detected: ${countryName} (${CONFIG.currencies[matchedCurrency].symbol})`);
          } else {
            this.updateLocationBadge(`📍 Welcome from ${countryName}`);
          }
        }
      }
    } catch (err) {
      // Silently ignore or rely on timezone detection
      // console.log("IP detection fallback active");
    }
  }

  setCurrency(currencyCode, isUserManualChoice = true) {
    if (!CONFIG.currencies[currencyCode]) return;
    this.currentCurrency = currencyCode;
    if (isUserManualChoice) {
      localStorage.setItem(this.storageKey, currencyCode);
      this.updateLocationBadge(`📍 Showing: ${currencyCode}`);
    }

    // Sync select dropdown if present
    const select = document.getElementById("currencySelector");
    if (select) select.value = currencyCode;

    // Dispatch global event for other components to re-render
    window.dispatchEvent(new CustomEvent("currencyChanged", {
      detail: { currency: currencyCode, currencyObj: CONFIG.currencies[currencyCode] }
    }));
  }

  updateLocationBadge(text) {
    const badge = document.getElementById("locationBadge");
    if (badge) {
      badge.textContent = text;
      badge.title = "Click to change currency";
    }
  }

  convertPrice(amountInKES) {
    const curr = CONFIG.currencies[this.currentCurrency] || CONFIG.currencies.KES;
    return amountInKES * curr.rateFromBase;
  }

  formatPrice(amountInKES) {
    const curr = CONFIG.currencies[this.currentCurrency] || CONFIG.currencies.KES;
    const converted = this.convertPrice(amountInKES);
    
    // Formatting rules:
    // KES, NGN -> no decimals (e.g. KSh 1,200, ₦15,000)
    // USD, GBP, EUR, GHS, ZAR -> 2 decimals (e.g. $9.50)
    let formatted;
    if (["KES", "NGN"].includes(this.currentCurrency)) {
      formatted = Math.round(converted).toLocaleString();
    } else {
      formatted = converted.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }

    return `${curr.symbol}${formatted}`;
  }

  getPaystackAmount(amountInKES) {
    const curr = CONFIG.currencies[this.currentCurrency] || CONFIG.currencies.KES;
    const converted = this.convertPrice(amountInKES);
    // Paystack requires integer in subunits (kobo / cents / pesewas)
    return Math.round(converted * curr.subunitMultiplier);
  }
}

window.geoCurrency = new GeoCurrencyEngine();

/**
 * NewAge Health Botanicals & Rituals - Global Configuration
 * Zero-database, client-side configuration
 */

const CONFIG = {
  storeName: "NewAge Health Botanicals & Rituals",
  tagline: "Sacred Earth Wisdom · Modern Holistic Herbal Alchemy",
  contact: {
    whatsapp: "+254700123456", // Customizable WhatsApp phone number
    email: "orders@newagebotanicals.co.ke",
    location: "Nairobi, Kenya & Global Shipping",
    hours: "Mon - Sat: 8:00 AM - 7:00 PM EAT"
  },
  paystack: {
    // Replace with your live Paystack public key (pk_live_...) or test key (pk_test_...)
    publicKey: "pk_test_51a2f4d6e8b09c12a7f9e8d4a3b2c1d0e8f7a6b5",
    testMode: true
  },
  // Base currency of the catalog is KES (Kenyan Shillings)
  baseCurrency: "KES",
  currencies: {
    KES: {
      code: "KES",
      symbol: "KSh ",
      name: "Kenyan Shilling",
      rateFromBase: 1.0,
      subunitMultiplier: 100, // cents
      flag: "🇰🇪"
    },
    NGN: {
      code: "NGN",
      symbol: "₦",
      name: "Nigerian Naira",
      rateFromBase: 12.5, // 1 KES ≈ 12.5 NGN
      subunitMultiplier: 100, // kobo
      flag: "🇳🇬"
    },
    GHS: {
      code: "GHS",
      symbol: "GH₵ ",
      name: "Ghanaian Cedi",
      rateFromBase: 0.12, // 1 KES ≈ 0.12 GHS
      subunitMultiplier: 100, // pesewas
      flag: "🇬🇭"
    },
    ZAR: {
      code: "ZAR",
      symbol: "R ",
      name: "South African Rand",
      rateFromBase: 0.14, // 1 KES ≈ 0.14 ZAR
      subunitMultiplier: 100, // cents
      flag: "🇿🇦"
    },
    USD: {
      code: "USD",
      symbol: "$",
      name: "US Dollar",
      rateFromBase: 0.0078, // 1 KES ≈ 0.0078 USD (e.g. 1000 KES ≈ $7.80)
      subunitMultiplier: 100, // cents
      flag: "🇺🇸"
    },
    GBP: {
      code: "GBP",
      symbol: "£",
      name: "British Pound",
      rateFromBase: 0.0061, // 1 KES ≈ 0.0061 GBP
      subunitMultiplier: 100, // pence
      flag: "🇬🇧"
    },
    EUR: {
      code: "EUR",
      symbol: "€",
      name: "Euro",
      rateFromBase: 0.0072, // 1 KES ≈ 0.0072 EUR
      subunitMultiplier: 100, // cents
      flag: "🇪🇺"
    }
  },
  // Timezone and Country mappings for automatic 0ms geolocation detection
  timezoneToCurrency: {
    "Africa/Nairobi": "KES",
    "Africa/Lagos": "NGN",
    "Africa/Accra": "GHS",
    "Africa/Johannesburg": "ZAR",
    "Europe/London": "GBP",
    "America/New_York": "USD",
    "America/Chicago": "USD",
    "America/Denver": "USD",
    "America/Los_Angeles": "USD",
    "Europe/Paris": "EUR",
    "Europe/Berlin": "EUR",
    "Europe/Amsterdam": "EUR",
    "Europe/Madrid": "EUR",
    "Europe/Rome": "EUR"
  },
  countryCodeToCurrency: {
    KE: "KES",
    NG: "NGN",
    GH: "GHS",
    ZA: "ZAR",
    US: "USD",
    CA: "USD",
    GB: "GBP",
    DE: "EUR",
    FR: "EUR",
    ES: "EUR",
    IT: "EUR",
    NL: "EUR"
  },
  promos: {
    KARIBU15: { discountPercent: 15, label: "Welcome Blessing (15% Off)" },
    NEWAGE10: { discountPercent: 10, label: "Botanical Club (10% Off)" },
    SOLSTICE: { discountPercent: 20, label: "Ritual Solstice (20% Off)" }
  },
  shipping: {
    standardRateKES: 350,
    freeThresholdKES: 4500
  }
};

window.CONFIG = CONFIG;

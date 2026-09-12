/**
 * NewAge Health Botanicals & Rituals - Shopping Cart & Checkout Engine
 * Zero-database, client-side cart persisted in localStorage
 */

class ShoppingCart {
  constructor() {
    this.storageKey = "nah_cart_items";
    this.promoStorageKey = "nah_active_promo";
    this.items = this.loadCart();
    this.activePromo = this.loadPromo();
    this.init();
  }

  init() {
    window.addEventListener("currencyChanged", () => {
      this.renderCartDrawer();
      this.updateHeaderBadge();
    });
  }

  loadCart() {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey)) || [];
    } catch (e) {
      return [];
    }
  }

  saveCart() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
    this.updateHeaderBadge();
    this.renderCartDrawer();
  }

  loadPromo() {
    try {
      const saved = localStorage.getItem(this.promoStorageKey);
      if (saved && CONFIG.promos[saved]) {
        return { code: saved, ...CONFIG.promos[saved] };
      }
    } catch (e) {}
    return null;
  }

  addItem(productId, quantity = 1, openDrawer = true) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return;

    const existing = this.items.find(item => item.id === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({
        id: productId,
        name: product.name,
        botanicalName: product.botanicalName,
        priceKES: product.priceKES,
        image: product.image,
        category: product.category,
        quantity: quantity
      });
    }

    this.saveCart();
    if (openDrawer) {
      this.openDrawer();
    }
    this.showToast(`🌿 Added "${product.name}" to your basket!`);
  }

  removeItem(productId) {
    this.items = this.items.filter(item => item.id !== productId);
    this.saveCart();
  }

  updateQuantity(productId, newQty) {
    if (newQty <= 0) {
      this.removeItem(productId);
      return;
    }
    const item = this.items.find(i => i.id === productId);
    if (item) {
      item.quantity = newQty;
      this.saveCart();
    }
  }

  clearCart() {
    this.items = [];
    this.saveCart();
  }

  applyPromo(code) {
    const cleanedCode = code.trim().toUpperCase();
    if (CONFIG.promos[cleanedCode]) {
      this.activePromo = { code: cleanedCode, ...CONFIG.promos[cleanedCode] };
      localStorage.setItem(this.promoStorageKey, cleanedCode);
      this.saveCart();
      this.showToast(`✨ Promo code "${cleanedCode}" applied successfully!`);
      return { success: true, message: `Promo applied: ${this.activePromo.label}` };
    } else {
      return { success: false, message: "Invalid promotional blessing code." };
    }
  }

  removePromo() {
    this.activePromo = null;
    localStorage.removeItem(this.promoStorageKey);
    this.saveCart();
  }

  getTotals() {
    const itemCount = this.items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotalKES = this.items.reduce((sum, item) => sum + (item.priceKES * item.quantity), 0);

    let discountKES = 0;
    if (this.activePromo && subtotalKES > 0) {
      discountKES = Math.round(subtotalKES * (this.activePromo.discountPercent / 100));
    }

    const discountedSubtotal = subtotalKES - discountKES;
    let shippingKES = 0;
    if (subtotalKES > 0) {
      shippingKES = subtotalKES >= CONFIG.shipping.freeThresholdKES ? 0 : CONFIG.shipping.standardRateKES;
    }

    const totalKES = Math.max(0, discountedSubtotal + shippingKES);

    return {
      itemCount,
      subtotalKES,
      discountKES,
      shippingKES,
      totalKES,
      isFreeShipping: shippingKES === 0 && subtotalKES > 0
    };
  }

  updateHeaderBadge() {
    const badge = document.getElementById("cartCountBadge");
    const count = this.items.reduce((sum, i) => sum + i.quantity, 0);
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? "inline-flex" : "none";
    }
  }

  renderCartDrawer() {
    const drawerList = document.getElementById("cartItemsList");
    const emptyNotice = document.getElementById("cartEmptyNotice");
    const cartFooter = document.getElementById("cartDrawerFooter");
    if (!drawerList) return;

    if (this.items.length === 0) {
      drawerList.innerHTML = "";
      if (emptyNotice) emptyNotice.style.display = "block";
      if (cartFooter) cartFooter.style.display = "none";
      return;
    }

    if (emptyNotice) emptyNotice.style.display = "none";
    if (cartFooter) cartFooter.style.display = "block";

    drawerList.innerHTML = this.items.map(item => {
      const itemTotalFormatted = window.geoCurrency ? window.geoCurrency.formatPrice(item.priceKES * item.quantity) : `KSh ${item.priceKES * item.quantity}`;
      const unitPriceFormatted = window.geoCurrency ? window.geoCurrency.formatPrice(item.priceKES) : `KSh ${item.priceKES}`;

      return `
        <div class="cart-item" data-id="${item.id}">
          <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.src='assets/images/hero-apothecary.jpg'">
          <div class="cart-item-info">
            <h4 class="cart-item-title">${item.name}</h4>
            <p class="cart-item-botanical">${item.botanicalName}</p>
            <div class="cart-item-price-row">
              <span class="cart-item-unit">${unitPriceFormatted} each</span>
              <strong class="cart-item-total">${itemTotalFormatted}</strong>
            </div>
            <div class="cart-item-controls">
              <div class="qty-stepper">
                <button class="qty-btn dec-btn" onclick="cart.updateQuantity('${item.id}', ${item.quantity - 1})" aria-label="Decrease quantity">−</button>
                <span class="qty-value">${item.quantity}</span>
                <button class="qty-btn inc-btn" onclick="cart.updateQuantity('${item.id}', ${item.quantity + 1})" aria-label="Increase quantity">+</button>
              </div>
              <button class="cart-remove-btn" onclick="cart.removeItem('${item.id}')" title="Remove item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                Remove
              </button>
            </div>
          </div>
        </div>
      `;
    }).join("");

    // Update totals
    const totals = this.getTotals();
    const subtotalEl = document.getElementById("cartSubtotalAmount");
    const discountRow = document.getElementById("cartDiscountRow");
    const discountEl = document.getElementById("cartDiscountAmount");
    const shippingEl = document.getElementById("cartShippingAmount");
    const totalEl = document.getElementById("cartTotalAmount");
    const promoTagContainer = document.getElementById("cartActivePromoTag");

    if (subtotalEl) subtotalEl.textContent = window.geoCurrency.formatPrice(totals.subtotalKES);
    
    if (discountRow && discountEl) {
      if (totals.discountKES > 0) {
        discountRow.style.display = "flex";
        discountEl.textContent = `-${window.geoCurrency.formatPrice(totals.discountKES)}`;
      } else {
        discountRow.style.display = "none";
      }
    }

    if (promoTagContainer) {
      if (this.activePromo) {
        promoTagContainer.innerHTML = `
          <span class="promo-badge">
            🏷️ ${this.activePromo.code} (${this.activePromo.discountPercent}% OFF)
            <button onclick="cart.removePromo()" class="promo-remove" title="Remove promo">&times;</button>
          </span>
        `;
      } else {
        promoTagContainer.innerHTML = "";
      }
    }

    if (shippingEl) {
      if (totals.isFreeShipping) {
        shippingEl.innerHTML = `<span class="free-shipping-badge">FREE (Blessing Threshold Met)</span>`;
      } else {
        shippingEl.textContent = window.geoCurrency.formatPrice(totals.shippingKES);
      }
    }

    if (totalEl) totalEl.textContent = window.geoCurrency.formatPrice(totals.totalKES);
  }

  openDrawer() {
    const drawer = document.getElementById("cartDrawer");
    const backdrop = document.getElementById("cartBackdrop");
    if (drawer && backdrop) {
      drawer.classList.add("open");
      backdrop.classList.add("open");
      document.body.classList.add("no-scroll");
    }
  }

  closeDrawer() {
    const drawer = document.getElementById("cartDrawer");
    const backdrop = document.getElementById("cartBackdrop");
    if (drawer && backdrop) {
      drawer.classList.remove("open");
      backdrop.classList.remove("open");
      document.body.classList.remove("no-scroll");
    }
  }

  generateWhatsAppOrderUrl() {
    if (this.items.length === 0) return null;
    const totals = this.getTotals();
    const curr = window.geoCurrency.currentCurrency;
    
    let message = `🌿 *ORDER INQUIRY - NEWAGE HEALTH BOTANICALS & RITUALS*\n\n`;
    message += `Hello Apothecary Team! I would like to place an order for the following herbal remedies:\n\n`;

    this.items.forEach((item, index) => {
      const price = window.geoCurrency.formatPrice(item.priceKES * item.quantity);
      message += `${index + 1}. *${item.name}* (x${item.quantity}) - ${price}\n`;
    });

    message += `\n--------------------------------\n`;
    message += `*Subtotal:* ${window.geoCurrency.formatPrice(totals.subtotalKES)}\n`;
    if (totals.discountKES > 0) {
      message += `*Promo (${this.activePromo.code}):* -${window.geoCurrency.formatPrice(totals.discountKES)}\n`;
    }
    message += `*Shipping:* ${totals.isFreeShipping ? "FREE" : window.geoCurrency.formatPrice(totals.shippingKES)}\n`;
    message += `*Total Order Value:* ${window.geoCurrency.formatPrice(totals.totalKES)} (${curr})\n`;
    message += `--------------------------------\n\n`;
    message += `Please confirm availability and delivery to my location!`;

    const cleanPhone = CONFIG.contact.whatsapp.replace(/[^0-9]/g, "");
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  }

  showToast(message) {
    let toast = document.getElementById("nahToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "nahToast";
      toast.className = "nah-toast";
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("visible");
    setTimeout(() => {
      toast.classList.remove("visible");
    }, 3200);
  }
}

window.cart = new ShoppingCart();

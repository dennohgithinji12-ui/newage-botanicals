/**
 * NewAge Health Botanicals & Rituals - Main Application Controller
 * High-performance, zero-database client-side application logic
 */

class ApothecaryApp {
  constructor() {
    this.currentCategory = "all";
    this.searchQuery = "";
    this.currentSort = "featured";
    this.timerSeconds = 600;
    this.timerInitialSeconds = 600;
    this.timerInterval = null;
    this.isTimerRunning = false;
    this.init();
  }

  init() {
    // Initial renders
    this.renderProducts();
    this.renderBlogPosts();
    this.renderPortfolios();

    // Listen to currency changes to refresh prices live
    window.addEventListener("currencyChanged", () => {
      this.renderProducts();
    });

    // Setup omnisearch live listener
    const searchInput = document.getElementById("omnisearchInput");
    const clearBtn = document.getElementById("searchClearBtn");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value.trim().toLowerCase();
        if (clearBtn) clearBtn.style.display = this.searchQuery ? "block" : "none";
        this.renderProducts();
      });
    }

    // Check URL parameters for search or category
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("category")) {
      this.filterByCategory(urlParams.get("category"));
    }
    if (urlParams.has("search")) {
      this.setSearchQuery(urlParams.get("search"));
    }
  }

  // =========================================================================
  // PRODUCT CATALOG RENDERING & FILTERING
  // =========================================================================

  getFilteredProducts() {
    let list = [...PRODUCTS_DATA];

    // 1. Category filter
    if (this.currentCategory !== "all") {
      list = list.filter(p => p.category === this.currentCategory);
    }

    // 2. Omnisearch filter (matches illness, herb, ritual, name, botanicalName, description)
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      list = list.filter(p => {
        const nameMatch = p.name.toLowerCase().includes(q);
        const botanicalMatch = p.botanicalName.toLowerCase().includes(q);
        const descMatch = p.description.toLowerCase().includes(q);
        
        // Herb array match
        const herbMatch = p.herbs && p.herbs.some(h => h.toLowerCase().includes(q));

        // Illness / Ailment array match
        const illnessMatch = p.illnesses && p.illnesses.some(ill => ill.toLowerCase().includes(q));

        // Ritual array match
        const ritualMatch = p.rituals && p.rituals.some(r => r.toLowerCase().includes(q));

        return nameMatch || botanicalMatch || descMatch || herbMatch || illnessMatch || ritualMatch;
      });
    }

    // 3. Sorting
    switch (this.currentSort) {
      case "price-asc":
        list.sort((a, b) => a.priceKES - b.priceKES);
        break;
      case "price-desc":
        list.sort((a, b) => b.priceKES - a.priceKES);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "featured":
      default:
        // Prioritize items with 'High-Priority Launch' or 'Bestseller' tag
        list.sort((a, b) => {
          const scoreA = a.tag === "High-Priority Launch" ? 2 : (a.tag === "Bestseller" ? 1 : 0);
          const scoreB = b.tag === "High-Priority Launch" ? 2 : (b.tag === "Bestseller" ? 1 : 0);
          return scoreB - scoreA;
        });
        break;
    }

    return list;
  }

  renderProducts() {
    const grid = document.getElementById("productsGrid");
    const countEl = document.getElementById("resultsCount");
    if (!grid) return;

    const filtered = this.getFilteredProducts();

    // Update result count label
    if (countEl) {
      if (this.searchQuery) {
        countEl.innerHTML = `Found <strong>${filtered.length}</strong> botanical remedies matching "<em>${this.searchQuery}</em>"`;
      } else if (this.currentCategory !== "all") {
        const catBtn = document.querySelector(`.cat-tab-btn[data-category="${this.currentCategory}"]`);
        const catName = catBtn ? catBtn.textContent.replace(/^[0-9.]+\s*/, '') : this.currentCategory;
        countEl.innerHTML = `Showing <strong>${filtered.length}</strong> products in <strong>${catName}</strong>`;
      } else {
        countEl.innerHTML = `Showing all <strong>${filtered.length}</strong> botanical remedies`;
      }
    }

    // Empty state
    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; background: rgba(14, 41, 27, 0.4); border-radius: 12px; border: 1px dashed var(--border-subtle);">
          <div style="font-size: 3rem; margin-bottom: 1rem;">🍃</div>
          <h3 style="font-family: var(--font-serif); color: var(--gold-glow); font-size: 1.5rem; margin-bottom: 0.5rem;">No remedies found matching your search</h3>
          <p style="color: var(--text-muted); max-width: 480px; margin: 0 auto 1.5rem;">
            Try searching for another illness (e.g. <em>insomnia, bloating, fatigue, hair</em>), herb (e.g. <em>moringa, rosemary, chamomile</em>), or reset filters.
          </p>
          <button class="btn-primary" onclick="app.clearSearch(); app.filterByCategory('all');">Reset Search & Shop All</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(product => {
      const formattedPrice = window.geoCurrency ? window.geoCurrency.formatPrice(product.priceKES) : `KSh ${product.priceKES}`;
      const basePriceKES = `KSh ${product.priceKES.toLocaleString()}`;

      // Pick top 2 illness tags and top 1 herb tag
      const illnessPills = (product.illnesses || []).slice(0, 2).map(ill => `<span class="card-pill">🎯 ${ill}</span>`).join("");
      const herbPill = (product.herbs || []).slice(0, 1).map(h => `<span class="card-pill">🌿 ${h}</span>`).join("");

      return `
        <article class="product-card" data-id="${product.id}">
          <div class="card-image-wrap">
            <picture>
              <source srcset="${product.image.replace('.jpg', '.webp')}" type="image/webp">
              <img src="${product.image}" alt="${product.name}" class="card-img" loading="lazy" decoding="async" width="380" height="280" onerror="this.src='assets/images/hero-apothecary.jpg'">
            </picture>
            ${product.tag ? `<span class="card-badge">${product.tag}</span>` : ""}
            <button class="quick-view-trigger" onclick="app.showQuickView('${product.id}')" title="Quick View Botanical Details" aria-label="Quick View ${product.name}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            </button>
          </div>

          <div class="card-body">
            <span class="card-cat-label">${product.categoryName}</span>
            <h3 class="card-title">${product.name}</h3>
            <p class="card-botanical">${product.botanicalName}</p>
            <p class="card-snippet">${product.description}</p>

            <div class="card-pill-cloud">
              ${illnessPills}
              ${herbPill}
            </div>

            <div class="card-footer">
              <div class="card-price-group">
                <span class="card-price">${formattedPrice}</span>
                ${window.geoCurrency && window.geoCurrency.currentCurrency !== "KES" ? `<span class="card-price-base">(${basePriceKES})</span>` : ""}
              </div>
              <button class="btn-add-cart" onclick="cart.addItem('${product.id}', 1)" aria-label="Add ${product.name} to basket">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                Add
              </button>
            </div>
          </div>
        </article>
      `;
    }).join("");
  }

  filterByCategory(categoryId) {
    this.currentCategory = categoryId;
    // Update active tab buttons
    document.querySelectorAll(".cat-tab-btn").forEach(btn => {
      if (btn.dataset.category === categoryId) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    this.renderProducts();
  }

  setSearchQuery(query) {
    const input = document.getElementById("omnisearchInput");
    const clearBtn = document.getElementById("searchClearBtn");
    if (input) {
      input.value = query;
      this.searchQuery = query.toLowerCase();
      if (clearBtn) clearBtn.style.display = "block";
      this.renderProducts();
      // Scroll to shop section
      const shopEl = document.getElementById("shop");
      if (shopEl) shopEl.scrollIntoView({ behavior: "smooth" });
    }
  }

  clearSearch() {
    const input = document.getElementById("omnisearchInput");
    const clearBtn = document.getElementById("searchClearBtn");
    if (input) {
      input.value = "";
      this.searchQuery = "";
      if (clearBtn) clearBtn.style.display = "none";
      this.renderProducts();
    }
  }

  sortProducts(sortOption) {
    this.currentSort = sortOption;
    this.renderProducts();
  }

  // =========================================================================
  // QUICK VIEW MODAL
  // =========================================================================

  showQuickView(productId) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById("quickViewModal");
    const titleEl = document.getElementById("qvTitle");
    const contentEl = document.getElementById("qvContent");
    if (!modal || !contentEl) return;

    titleEl.textContent = product.name;
    const formattedPrice = window.geoCurrency ? window.geoCurrency.formatPrice(product.priceKES) : `KSh ${product.priceKES}`;

    contentEl.innerHTML = `
      <div class="quickview-container">
        <div>
          <img src="${product.image}" alt="${product.name}" class="qv-image" onerror="this.src='assets/images/hero-apothecary.jpg'">
          <div style="margin-top: 1rem; display: flex; flex-wrap: wrap; gap: 0.4rem;">
            ${(product.herbs || []).map(h => `<span class="card-pill">🌿 Herb: ${h}</span>`).join("")}
          </div>
        </div>

        <div>
          <span style="font-size: 0.8rem; text-transform: uppercase; color: var(--gold-primary); letter-spacing: 0.1em;">${product.categoryName}</span>
          <h2 style="font-family: var(--font-serif); font-size: 1.8rem; color: var(--text-parchment); margin-bottom: 0.25rem;">${product.name}</h2>
          <p style="font-style: italic; color: var(--text-muted); margin-bottom: 1rem;">${product.botanicalName}</p>
          
          <div style="font-size: 1.6rem; font-weight: 700; color: var(--gold-glow); margin-bottom: 1.25rem;">
            ${formattedPrice}
          </div>

          <p style="font-size: 0.95rem; line-height: 1.6; color: var(--text-linen); margin-bottom: 1.25rem;">
            ${product.description}
          </p>

          <h4 style="font-family: var(--font-serif); color: var(--gold-primary); font-size: 1.05rem; margin-bottom: 0.5rem;">Targeted Ailments & Goals:</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.25rem;">
            ${(product.illnesses || []).map(ill => `<span class="card-pill" style="background: rgba(231, 111, 81, 0.15); border-color: rgba(231, 111, 81, 0.4); color: #f4a261;">🎯 ${ill}</span>`).join("")}
          </div>

          <h4 style="font-family: var(--font-serif); color: var(--gold-primary); font-size: 1.05rem; margin-bottom: 0.5rem;">Holistic Benefits:</h4>
          <ul style="padding-left: 1.25rem; font-size: 0.88rem; line-height: 1.6; color: var(--text-linen); margin-bottom: 1.25rem;">
            ${product.benefits.map(b => `<li>${b}</li>`).join("")}
          </ul>

          <h4 style="font-family: var(--font-serif); color: var(--gold-primary); font-size: 1.05rem; margin-bottom: 0.5rem;">Mindful Ritual Guide:</h4>
          <div style="background: rgba(14, 41, 27, 0.5); padding: 0.85rem 1rem; border-radius: 6px; border-left: 3px solid var(--gold-primary); font-size: 0.85rem; font-style: italic; margin-bottom: 1.5rem;">
            ${product.ritualGuide}
          </div>

          <div style="display: flex; gap: 1rem;">
            <button class="btn-primary" style="flex-grow: 1; justify-content: center;" onclick="cart.addItem('${product.id}', 1); document.getElementById('quickViewModal').close();">
              Add to Basket (${formattedPrice})
            </button>
            <button class="btn-secondary" onclick="document.getElementById('quickViewModal').close()">
              Close
            </button>
          </div>
        </div>
      </div>
    `;

    modal.showModal();
  }

  // =========================================================================
  // INTERACTIVE BREWING & INFUSION TIMER
  // =========================================================================

  selectRecipe(seconds, title, statusNote) {
    this.resetTimer();
    this.timerSeconds = seconds;
    this.timerInitialSeconds = seconds;
    const statusEl = document.getElementById("timerStatus");
    if (statusEl) statusEl.textContent = statusNote;
    this.updateTimerDisplay();

    // Highlight clicked recipe button
    document.querySelectorAll(".recipe-btn").forEach(btn => {
      if (btn.textContent.includes(title)) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }

  updateTimerDisplay() {
    const display = document.getElementById("timerDisplay");
    if (!display) return;
    const mins = Math.floor(this.timerSeconds / 60);
    const secs = this.timerSeconds % 60;
    display.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  toggleTimer() {
    const btn = document.getElementById("timerToggleBtn");
    const circle = document.getElementById("timerCircle");

    if (this.isTimerRunning) {
      // Pause
      clearInterval(this.timerInterval);
      this.isTimerRunning = false;
      if (btn) btn.textContent = "Resume Infusion";
      if (circle) circle.classList.remove("running");
    } else {
      // Start
      this.isTimerRunning = true;
      if (btn) btn.textContent = "Pause Infusion";
      if (circle) circle.classList.add("running");

      this.timerInterval = setInterval(() => {
        if (this.timerSeconds > 0) {
          this.timerSeconds--;
          this.updateTimerDisplay();
        } else {
          // Timer finished
          clearInterval(this.timerInterval);
          this.isTimerRunning = false;
          if (btn) btn.textContent = "Begin Infusion";
          if (circle) circle.classList.remove("running");
          this.playChimeSound();
          alert("✨ Blessed Infusion Ready! Your botanical tea is thoroughly steeped and rich in active plant essence.");
          this.resetTimer();
        }
      }, 1000);
    }
  }

  resetTimer() {
    clearInterval(this.timerInterval);
    this.isTimerRunning = false;
    this.timerSeconds = this.timerInitialSeconds;
    this.updateTimerDisplay();
    const btn = document.getElementById("timerToggleBtn");
    const circle = document.getElementById("timerCircle");
    if (btn) btn.textContent = "Begin Infusion";
    if (circle) circle.classList.remove("running");
  }

  playChimeSound() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(528, audioCtx.currentTime); // 528 Hz miracle tone
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.8);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 1.8);
    } catch (e) {}
  }

  // =========================================================================
  // HERBAL WISDOM BLOG / JOURNAL
  // =========================================================================

  renderBlogPosts() {
    const grid = document.getElementById("blogGrid");
    if (!grid) return;

    grid.innerHTML = BLOG_POSTS.map(post => `
      <article class="blog-card" onclick="app.readBlogPost('${post.id}')">
        <div class="blog-img-wrap">
          <picture>
            <source srcset="${post.image.replace('.jpg', '.webp')}" type="image/webp">
            <img src="${post.image}" alt="${post.title}" class="blog-img" loading="lazy" decoding="async" width="380" height="220" onerror="this.src='assets/images/hero-apothecary.jpg'">
          </picture>
        </div>
        <div class="blog-body">
          <div class="blog-meta-row">
            <span>${post.category}</span>
            <span>${post.readTime}</span>
          </div>
          <h3 class="blog-title">${post.title}</h3>
          <p class="blog-excerpt">${post.excerpt}</p>
          <div class="blog-read-link">
            Read Sacred Journal Entry
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </div>
        </div>
      </article>
    `).join("");
  }

  readBlogPost(postId) {
    const post = BLOG_POSTS.find(p => p.id === postId);
    if (!post) return;

    const modal = document.getElementById("blogModal");
    const contentEl = document.getElementById("blogModalContent");
    if (!modal || !contentEl) return;

    // Find related products
    const relatedProducts = (post.relatedProductIds || [])
      .map(id => PRODUCTS_DATA.find(p => p.id === id))
      .filter(Boolean);

    contentEl.innerHTML = `
      <img src="${post.image}" alt="${post.title}" style="width: 100%; max-height: 320px; object-fit: cover; border-radius: 10px; margin-bottom: 1.5rem; border: 1px solid var(--border-subtle);" onerror="this.src='assets/images/hero-apothecary.jpg'">
      
      <div style="display: flex; gap: 1rem; font-size: 0.82rem; color: var(--gold-primary); margin-bottom: 0.75rem;">
        <span>${post.category}</span> · <span>${post.date}</span> · <span>${post.readTime}</span>
      </div>

      <h1 style="font-family: var(--font-serif); font-size: 2.2rem; color: var(--text-parchment); line-height: 1.2; margin-bottom: 0.5rem;">${post.title}</h1>
      <p style="font-size: 1.1rem; font-style: italic; color: var(--gold-glow); margin-bottom: 1.5rem;">${post.subtitle}</p>
      
      <div style="font-size: 0.85rem; color: var(--text-muted); border-bottom: 1px solid var(--border-subtle); padding-bottom: 1rem; margin-bottom: 1.5rem;">
        Written by <strong>${post.author}</strong>
      </div>

      <div style="font-size: 1rem; line-height: 1.8; color: var(--text-linen); margin-bottom: 2rem;">
        ${post.content}
      </div>

      ${relatedProducts.length > 0 ? `
        <div style="border-top: 1px solid var(--border-subtle); padding-top: 1.5rem; margin-top: 2rem;">
          <h3 style="font-family: var(--font-serif); color: var(--gold-glow); margin-bottom: 1rem;">Featured Botanicals in this Article:</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem;">
            ${relatedProducts.map(p => `
              <div style="background: rgba(14, 41, 27, 0.6); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 0.75rem; display: flex; align-items: center; gap: 0.75rem;">
                <img src="${p.image}" alt="${p.name}" style="width: 50px; height: 50px; border-radius: 6px; object-fit: cover;">
                <div style="flex-grow: 1;">
                  <h4 style="font-size: 0.85rem; color: var(--text-parchment); line-height: 1.2;">${p.name}</h4>
                  <span style="font-size: 0.8rem; color: var(--gold-glow); font-weight: 700;">${window.geoCurrency ? window.geoCurrency.formatPrice(p.priceKES) : `KSh ${p.priceKES}`}</span>
                </div>
                <button class="btn-add-cart" style="padding: 0.35rem 0.65rem; font-size: 0.75rem;" onclick="cart.addItem('${p.id}', 1); cart.openDrawer(); document.getElementById('blogModal').close();">
                  + Add
                </button>
              </div>
            `).join("")}
          </div>
        </div>
      ` : ""}
    `;

    modal.showModal();
  }

  // =========================================================================
  // SACRED PORTFOLIOS & CASE STUDIES
  // =========================================================================

  renderPortfolios() {
    const grid = document.getElementById("portfolioGrid");
    if (!grid) return;

    grid.innerHTML = PORTFOLIOS_DATA.map(port => `
      <article class="portfolio-card" onclick="app.viewPortfolio('${port.id}')">
        <div class="portfolio-img-wrap">
          <picture>
            <source srcset="${port.image.replace('.jpg', '.webp')}" type="image/webp">
            <img src="${port.image}" alt="${port.title}" class="portfolio-img" loading="lazy" decoding="async" width="380" height="240" onerror="this.src='assets/images/hero-apothecary.jpg'">
          </picture>
        </div>
        <div class="portfolio-body">
          <span class="portfolio-cat">${port.category}</span>
          <h3 class="portfolio-title">${port.title}</h3>
          <p class="portfolio-summary">${port.summary}</p>
        </div>
      </article>
    `).join("");
  }

  viewPortfolio(portId) {
    const item = PORTFOLIOS_DATA.find(p => p.id === portId);
    if (!item) return;

    const modal = document.getElementById("portfolioModal");
    const contentEl = document.getElementById("portModalContent");
    if (!modal || !contentEl) return;

    contentEl.innerHTML = `
      <img src="${item.image}" alt="${item.title}" style="width: 100%; max-height: 300px; object-fit: cover; border-radius: 10px; margin-bottom: 1.5rem; border: 1px solid var(--border-subtle);">
      
      <span style="font-size: 0.78rem; text-transform: uppercase; color: var(--gold-primary); letter-spacing: 0.1em;">${item.category} · ${item.date}</span>
      <h2 style="font-family: var(--font-serif); font-size: 1.8rem; color: var(--text-parchment); margin-bottom: 1rem;">${item.title}</h2>

      <h4 style="font-family: var(--font-serif); color: var(--gold-glow); font-size: 1.1rem; margin-bottom: 0.5rem;">Sacred Botanicals Used:</h4>
      <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.5rem;">
        ${item.botanicalsUsed.map(b => `<span class="card-pill">🌿 ${b}</span>`).join("")}
      </div>

      <h4 style="font-family: var(--font-serif); color: var(--gold-glow); font-size: 1.1rem; margin-bottom: 0.5rem;">Ceremony & Case Narrative:</h4>
      <p style="font-size: 0.95rem; line-height: 1.7; color: var(--text-linen); margin-bottom: 1.5rem;">
        ${item.caseStory}
      </p>

      <div style="background: rgba(14, 41, 27, 0.7); border: 1px solid var(--border-active); padding: 1.25rem; border-radius: 8px; font-style: italic; margin-bottom: 1.5rem;">
        <p style="color: var(--gold-glow); margin-bottom: 0.5rem;">"${item.testimonial.quote}"</p>
        <div style="text-align: right; font-size: 0.85rem; color: var(--text-muted); font-style: normal;">
          — ${item.testimonial.client}
        </div>
      </div>

      <div style="display: flex; gap: 1rem;">
        <button class="btn-primary" style="flex-grow: 1; justify-content: center;" onclick="app.bookRitualConsultation('${item.title}'); document.getElementById('portfolioModal').close();">
          Inquire About This Ritual
        </button>
        <button class="btn-secondary" onclick="document.getElementById('portfolioModal').close()">
          Close
        </button>
      </div>
    `;

    modal.showModal();
  }

  bookRitualConsultation(ritualTitle) {
    const message = `Hello Apothecary Team! I was reading your portfolio archive on "${ritualTitle}" and would like to inquire about booking a custom ceremony or consultation.`;
    const cleanPhone = CONFIG.contact.whatsapp.replace(/[^0-9]/g, "");
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, "_blank");
  }

  // =========================================================================
  // CART PROMO & CHECKOUT MODALS
  // =========================================================================

  applyCartPromo() {
    const input = document.getElementById("cartPromoInput");
    if (!input || !input.value.trim()) return;
    const res = cart.applyPromo(input.value);
    input.value = "";
  }

  checkoutWhatsApp() {
    const url = cart.generateWhatsAppOrderUrl();
    if (url) {
      window.open(url, "_blank");
    } else {
      alert("Your basket is empty. Please add botanicals first.");
    }
  }

  openCheckoutModal() {
    if (cart.items.length === 0) {
      alert("Your basket is empty.");
      return;
    }
    const totals = cart.getTotals();
    const modal = document.getElementById("checkoutModal");
    const totalDisplay = document.getElementById("checkoutTotalDisplay");

    if (totalDisplay) {
      totalDisplay.textContent = window.geoCurrency ? window.geoCurrency.formatPrice(totals.totalKES) : `KSh ${totals.totalKES}`;
    }

    cart.closeDrawer();
    if (modal) modal.showModal();
  }

  processPaystackSubmit(e) {
    e.preventDefault();
    const name = document.getElementById("custName").value.trim();
    const email = document.getElementById("custEmail").value.trim();
    const phone = document.getElementById("custPhone").value.trim();
    const address = document.getElementById("custAddress").value.trim();
    const notes = document.getElementById("custNotes").value.trim();

    const totals = cart.getTotals();

    // Close details modal
    document.getElementById("checkoutModal").close();

    // Launch Paystack Inline
    window.paystackService.initiatePayment({
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      customerAddress: address,
      orderNotes: notes,
      amountInKES: totals.totalKES,
      items: [...cart.items],
      promoApplied: cart.activePromo ? cart.activePromo.code : null,
      onSuccess: (orderData) => {
        cart.clearCart();
        this.showDigitalReceipt(orderData);
      },
      onClose: () => {
        console.log("Paystack window dismissed.");
      }
    });
  }

  showDigitalReceipt(orderData) {
    const modal = document.getElementById("receiptModal");
    const content = document.getElementById("receiptModalContent");
    if (!modal || !content) return;

    content.innerHTML = `
      <div class="receipt-paper" id="printableReceiptArea">
        <div class="receipt-header">
          <div style="font-size: 1.5rem; margin-bottom: 0.25rem;">🌿</div>
          <div class="receipt-title">${CONFIG.storeName}</div>
          <div style="font-size: 0.75rem; color: #666;">Official Verified Transaction Receipt</div>
          <div style="font-size: 0.75rem; color: #666; margin-top: 0.35rem;">Ref: <strong>${orderData.reference}</strong></div>
          <div style="font-size: 0.75rem; color: #666;">Date: ${orderData.date}</div>
        </div>

        <div style="font-size: 0.8rem; margin-bottom: 1rem; border-bottom: 1px solid #eee; padding-bottom: 0.75rem;">
          <div><strong>Customer:</strong> ${orderData.customerName}</div>
          <div><strong>Email:</strong> ${orderData.customerEmail}</div>
          <div><strong>Phone:</strong> ${orderData.customerPhone}</div>
          <div><strong>Delivery:</strong> ${orderData.customerAddress}</div>
        </div>

        <table class="receipt-items-table" style="font-size: 0.85rem;">
          <thead>
            <tr style="border-bottom: 1px solid #333;">
              <th>Botanical Item</th>
              <th>Qty</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${orderData.items.map(item => `
              <tr>
                <td>${item.name}</td>
                <td>x${item.quantity}</td>
                <td>${window.geoCurrency ? window.geoCurrency.formatPrice(item.priceKES * item.quantity) : item.priceKES * item.quantity}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>

        <div style="border-top: 2px dashed #bbb; padding-top: 0.75rem; margin-bottom: 1rem; font-size: 0.95rem;">
          <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 1.15rem;">
            <span>TOTAL PAID:</span>
            <span>${orderData.formattedPrice} (${orderData.currency})</span>
          </div>
          <div style="font-size: 0.75rem; color: #28a745; margin-top: 0.35rem;">
            ✔ Paid via Paystack Inline Secure Gateway
          </div>
        </div>

        <div style="text-align: center; font-size: 0.75rem; color: #888;">
          May these holy botanicals bring deep restoration and strength to your spirit.<br>
          For delivery queries, contact orders@newagebotanicals.co.ke
        </div>
      </div>

      <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
        <button class="btn-primary" style="flex-grow: 1; justify-content: center;" onclick="window.print()">
          🖨️ Print / Save Receipt
        </button>
        <button class="btn-secondary" onclick="document.getElementById('receiptModal').close()">
          Done
        </button>
      </div>
    `;

    modal.showModal();
  }

  // =========================================================================
  // SETTINGS & OWNER ADMIN MODAL
  // =========================================================================

  openSettingsModal() {
    const modal = document.getElementById("settingsModal");
    if (modal) modal.showModal();
  }

  saveSettings() {
    const paystackKeyInput = document.getElementById("settingPaystackKey");
    const whatsAppInput = document.getElementById("settingWhatsApp");

    if (paystackKeyInput && paystackKeyInput.value.trim()) {
      window.paystackService.setPublicKey(paystackKeyInput.value.trim());
    }
    if (whatsAppInput && whatsAppInput.value.trim()) {
      CONFIG.contact.whatsapp = whatsAppInput.value.trim();
      localStorage.setItem("nah_whatsapp_number", CONFIG.contact.whatsapp);
    }

    alert("✨ Apothecary settings saved successfully to browser storage!");
    document.getElementById("settingsModal").close();
  }

  exportCatalogJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(PRODUCTS_DATA, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "newage_botanicals_catalog.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }

  contactWhatsAppGeneral() {
    const cleanPhone = CONFIG.contact.whatsapp.replace(/[^0-9]/g, "");
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent("Hello! I have a question regarding your herbal remedies and rituals.")}`, "_blank");
  }
}

window.app = new ApothecaryApp();

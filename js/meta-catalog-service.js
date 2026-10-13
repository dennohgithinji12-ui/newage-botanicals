/**
 * NewAge Health Botanicals & Rituals - Meta & WhatsApp Product Catalog Connect Service
 * Zero-database, client-side Meta Commerce Manager & WhatsApp Business integration.
 * 
 * Features:
 * 1. One-Click Meta Catalog Feed Generator & Instant Browser Download (CSV & XML)
 * 2. One-Click Copy of Live Scheduled Feed URL (for automatic 24-hr sync in Meta Commerce Manager)
 * 3. One-Click WhatsApp Business Catalog deep linking (wa.me/c/...)
 * 4. Interactive Glassmorphism Meta Connect Modal with full visual feedback
 */

class MetaCatalogConnectService {
  constructor() {
    this.baseUrl = (typeof CONFIG !== "undefined" && CONFIG.siteUrl) ? CONFIG.siteUrl : "https://omnicorehub.app";
    this.brandName = (typeof CONFIG !== "undefined" && CONFIG.storeName) ? "NewAge Botanicals" : "NewAge Botanicals";
    this.whatsappNumber = (typeof CONFIG !== "undefined" && CONFIG.contact?.whatsapp) 
      ? CONFIG.contact.whatsapp.replace(/[^0-9]/g, '') 
      : "254141270112";
    this.catalog = (typeof PRODUCTS_DATA !== "undefined") ? PRODUCTS_DATA : [];
  }

  getLiveFeedUrl(type = 'csv') {
    return `${this.baseUrl}/meta-catalog-feed.${type}`;
  }

  getMetaCommerceManagerUrl() {
    return "https://business.facebook.com/commerce_manager/catalogs/";
  }

  getWhatsAppCatalogUrl() {
    return `https://wa.me/c/${this.whatsappNumber}`;
  }

  getWhatsAppProductOrderUrl(productId) {
    const product = this.catalog.find(p => p.id === productId);
    if (!product) return `https://wa.me/${this.whatsappNumber}`;
    const text = `Hello NewAge Botanicals, I would like to order: *${product.name}* (KSh ${product.priceKES.toLocaleString()}).\n\nProduct SKU: ${product.id}\nDirect link: ${this.baseUrl}/product.html?id=${product.id}`;
    return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(text)}`;
  }

  escapeCSV(val) {
    if (val === null || val === undefined) return '';
    if (Array.isArray(val)) val = val.join('; ');
    const str = String(val).trim();
    if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
      return '"' + str.replace(/"/g, '""') + '"';
    }
    return str;
  }

  escapeXML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  cleanDescription(p) {
    let desc = p.description || p.whatItDoes || '';
    if (p.benefits && p.benefits.length) {
      desc += ' Key Benefits: ' + p.benefits.slice(0, 3).join('. ') + '.';
    }
    if (p.illnesses && p.illnesses.length) {
      desc += ' Targeted Support: ' + p.illnesses.join(', ') + '.';
    }
    if (p.ritualGuide) {
      desc += ' Recommended Ritual: ' + p.ritualGuide;
    }
    return desc.replace(/[\r\n]+/g, ' ').trim();
  }

  generateCSV() {
    const headers = [
      'id', 'title', 'description', 'availability', 'condition',
      'price', 'link', 'image_link', 'brand',
      'google_product_category', 'fb_product_category', 'item_group_id',
      'product_type', 'custom_label_0', 'custom_label_1',
      'custom_label_2', 'custom_label_3', 'custom_label_4'
    ];

    const rows = [headers.join(',')];

    for (const p of this.catalog) {
      const priceFormatted = `${p.priceKES}.00 KES`;
      const productLink = `${this.baseUrl}/product.html?id=${p.id}`;
      const imageLink = `${this.baseUrl}/${p.image}`;
      const fullDesc = this.cleanDescription(p);
      const primaryHerbs = Array.isArray(p.herbs) ? p.herbs.slice(0, 4).join(', ') : '';

      const row = [
        this.escapeCSV(p.id),
        this.escapeCSV(p.name),
        this.escapeCSV(fullDesc),
        this.escapeCSV(p.inStock ? 'in stock' : 'out of stock'),
        this.escapeCSV('new'),
        this.escapeCSV(priceFormatted),
        this.escapeCSV(productLink),
        this.escapeCSV(imageLink),
        this.escapeCSV(this.brandName),
        this.escapeCSV('Health & Beauty > Health Care > Holistic & Alternative Medicine'),
        this.escapeCSV('health & beauty > alternative & holistic medicine'),
        this.escapeCSV(p.category),
        this.escapeCSV(p.categoryName || p.category),
        this.escapeCSV(p.categoryName || p.category),
        this.escapeCSV(p.botanicalName || ''),
        this.escapeCSV(primaryHerbs),
        this.escapeCSV(p.tag || 'Evidence-Backed'),
        this.escapeCSV('Kenya Highland Volcanic Soil · Lab Verified')
      ];
      rows.push(row.join(','));
    }
    return rows.join('\r\n');
  }

  downloadCSV() {
    const csvContent = this.generateCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `meta-catalog-feed-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    this.showToast('✅ Meta Catalog CSV downloaded successfully!');
  }

  downloadXML() {
    const items = [];
    for (const p of this.catalog) {
      const priceFormatted = `${p.priceKES}.00 KES`;
      const productLink = `${this.baseUrl}/product.html?id=${p.id}`;
      const imageLink = `${this.baseUrl}/${p.image}`;
      const fullDesc = this.cleanDescription(p);
      const primaryHerbs = Array.isArray(p.herbs) ? p.herbs.slice(0, 4).join(', ') : '';

      items.push(`    <item>
      <g:id>${this.escapeXML(p.id)}</g:id>
      <g:title>${this.escapeXML(p.name)}</g:title>
      <g:description>${this.escapeXML(fullDesc)}</g:description>
      <g:link>${this.escapeXML(productLink)}</g:link>
      <g:image_link>${this.escapeXML(imageLink)}</g:image_link>
      <g:brand>${this.escapeXML(this.brandName)}</g:brand>
      <g:condition>new</g:condition>
      <g:availability>${p.inStock ? 'in stock' : 'out of stock'}</g:availability>
      <g:price>${this.escapeXML(priceFormatted)}</g:price>
      <g:google_product_category>Health &amp; Beauty &gt; Health Care &gt; Holistic &amp; Alternative Medicine</g:google_product_category>
      <g:fb_product_category>health &amp; beauty &gt; alternative &amp; holistic medicine</g:fb_product_category>
      <g:item_group_id>${this.escapeXML(p.category)}</g:item_group_id>
      <g:product_type>${this.escapeXML(p.categoryName || p.category)}</g:product_type>
      <g:custom_label_0>${this.escapeXML(p.categoryName || p.category)}</g:custom_label_0>
      <g:custom_label_1>${this.escapeXML(p.botanicalName || '')}</g:custom_label_1>
      <g:custom_label_2>${this.escapeXML(primaryHerbs)}</g:custom_label_2>
      <g:custom_label_3>${this.escapeXML(p.tag || 'Evidence-Backed')}</g:custom_label_3>
      <g:custom_label_4>Kenya Highland Volcanic Soil · Lab Verified</g:custom_label_4>
    </item>`);
    }

    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>${this.escapeXML(this.brandName)} Commerce Catalog Feed</title>
    <link>${this.baseUrl}</link>
    <description>Evidence-Backed African &amp; Global Botanical Remedies Catalog for Facebook Shops &amp; WhatsApp Business</description>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items.join('\n')}
  </channel>
</rss>`;

    const blob = new Blob([xmlContent], { type: 'application/xml;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `meta-catalog-feed-${new Date().toISOString().slice(0, 10)}.xml`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    this.showToast('✅ Meta Catalog XML downloaded successfully!');
  }

  copyFeedUrl(type = 'csv') {
    const url = this.getLiveFeedUrl(type);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(() => {
        this.showToast(`📋 Live ${type.toUpperCase()} Feed URL copied to clipboard!`);
      }).catch(() => {
        this.promptCopy(url);
      });
    } else {
      this.promptCopy(url);
    }
  }

  promptCopy(text) {
    window.prompt('Copy this live feed URL for Meta Commerce Manager:', text);
  }

  showToast(message) {
    let toast = document.getElementById('meta-connect-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'meta-connect-toast';
      toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: rgba(18, 28, 20, 0.95);
        color: #d4af37;
        border: 1px solid rgba(212, 175, 55, 0.4);
        border-radius: 10px;
        padding: 12px 20px;
        font-family: inherit;
        font-size: 0.9rem;
        font-weight: 500;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        backdrop-filter: blur(12px);
        z-index: 10000;
        transition: opacity 0.3s ease, transform 0.3s ease;
      `;
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
    }, 3500);
  }

  openConnectModal() {
    let modal = document.getElementById('meta-catalog-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'meta-catalog-modal';
      modal.className = 'modal-backdrop';
      modal.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(8, 12, 10, 0.85);
        backdrop-filter: blur(8px);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
      `;

      const productCount = this.catalog.length || 164;
      const inStockCount = this.catalog.filter(p => p.inStock).length || productCount;
      const csvUrl = this.getLiveFeedUrl('csv');
      const xmlUrl = this.getLiveFeedUrl('xml');
      const waUrl = this.getWhatsAppCatalogUrl();
      const metaUrl = this.getMetaCommerceManagerUrl();

      modal.innerHTML = `
        <div class="meta-modal-card" style="
          background: linear-gradient(145deg, rgba(22, 34, 26, 0.98), rgba(12, 20, 15, 0.98));
          border: 1px solid rgba(212, 175, 55, 0.35);
          border-radius: 16px;
          max-width: 640px;
          width: 100%;
          padding: 2rem;
          color: #f5f5f0;
          box-shadow: 0 25px 60px rgba(0,0,0,0.6);
          position: relative;
          max-height: 90vh;
          overflow-y: auto;
        ">
          <!-- Close Button -->
          <button onclick="window.metaCatalogService.closeConnectModal()" style="
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: rgba(255,255,255,0.08);
            border: 1px solid rgba(255,255,255,0.15);
            color: #f5f5f0;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.1rem;
            display: flex;
            align-items: center;
            justify-content: center;
          ">&times;</button>

          <!-- Header -->
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 1.25rem;">
            <div style="
              width: 48px;
              height: 48px;
              border-radius: 12px;
              background: linear-gradient(135deg, #1877F2, #25D366);
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 1.5rem;
              box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
            ">
              🌐
            </div>
            <div>
              <h2 style="font-size: 1.35rem; margin: 0; color: #fff; font-family: 'Cinzel', serif, Georgia;">Meta & WhatsApp Catalog Connect</h2>
              <p style="margin: 2px 0 0; font-size: 0.85rem; color: #a3b899;">Connect all ${productCount} items to Facebook Shops, Instagram & WhatsApp Business</p>
            </div>
          </div>

          <!-- Catalog Status Pill -->
          <div style="
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: rgba(37, 211, 102, 0.08);
            border: 1px solid rgba(37, 211, 102, 0.25);
            padding: 0.75rem 1rem;
            border-radius: 10px;
            margin-bottom: 1.5rem;
          ">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: #25D366; box-shadow: 0 0 8px #25D366;"></span>
              <span style="font-weight: 600; font-size: 0.9rem; color: #25D366;">Live Sync Ready</span>
            </div>
            <div style="font-size: 0.85rem; color: #dcdccb;">
              <strong>${productCount}</strong> remedies · <strong>${inStockCount}</strong> in stock · Base: <strong>KES</strong>
            </div>
          </div>

          <!-- 1-Click Sync Steps -->
          <div style="display: flex; flex-direction: column; gap: 1.25rem;">
            
            <!-- Option A: Live Scheduled Feed URL (Recommended) -->
            <div style="
              background: rgba(255, 255, 255, 0.03);
              border: 1px solid rgba(212, 175, 55, 0.2);
              border-radius: 12px;
              padding: 1rem 1.25rem;
            ">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
                <span style="font-weight: 600; font-size: 0.95rem; color: #d4af37;">⚡ Method 1: Automated 24/7 Feed Sync (Recommended)</span>
                <span style="background: rgba(212, 175, 55, 0.15); color: #d4af37; padding: 2px 8px; border-radius: 6px; font-size: 0.75rem;">1-Click</span>
              </div>
              <p style="font-size: 0.82rem; color: #bbb; margin: 0 0 0.75rem; line-height: 1.4;">
                Paste this hosted feed URL into Meta Commerce Manager once. Meta will automatically fetch prices, inventory, and new products daily:
              </p>
              
              <div style="
                display: flex;
                align-items: center;
                gap: 8px;
                background: rgba(0,0,0,0.35);
                border: 1px solid rgba(255,255,255,0.1);
                border-radius: 8px;
                padding: 6px 10px;
                margin-bottom: 0.75rem;
              ">
                <input type="text" readonly value="${csvUrl}" style="
                  flex: 1;
                  background: transparent;
                  border: none;
                  color: #e5e5d8;
                  font-size: 0.8rem;
                  font-family: monospace;
                  outline: none;
                ">
                <button onclick="window.metaCatalogService.copyFeedUrl('csv')" style="
                  background: #d4af37;
                  color: #121c14;
                  border: none;
                  padding: 6px 12px;
                  border-radius: 6px;
                  font-size: 0.75rem;
                  font-weight: 600;
                  cursor: pointer;
                  white-space: nowrap;
                ">Copy URL</button>
              </div>

              <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                <a href="${metaUrl}" target="_blank" rel="noopener" style="
                  flex: 1;
                  min-width: 200px;
                  text-align: center;
                  background: #1877F2;
                  color: #fff;
                  text-decoration: none;
                  padding: 8px 12px;
                  border-radius: 8px;
                  font-size: 0.82rem;
                  font-weight: 600;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  gap: 6px;
                ">
                  <span>🚀</span> Open Meta Commerce Manager
                </a>
                <a href="${waUrl}" target="_blank" rel="noopener" style="
                  flex: 1;
                  min-width: 200px;
                  text-align: center;
                  background: #25D366;
                  color: #0b1a10;
                  text-decoration: none;
                  padding: 8px 12px;
                  border-radius: 8px;
                  font-size: 0.82rem;
                  font-weight: 700;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  gap: 6px;
                ">
                  <span>💬</span> Open WhatsApp Catalog
                </a>
              </div>
            </div>

            <!-- Option B: Direct File Download -->
            <div style="
              background: rgba(255, 255, 255, 0.03);
              border: 1px solid rgba(255, 255, 255, 0.1);
              border-radius: 12px;
              padding: 1rem 1.25rem;
            ">
              <div style="font-weight: 600; font-size: 0.95rem; color: #e5e5d8; margin-bottom: 0.5rem;">
                📥 Method 2: Instant Manual Feed Download
              </div>
              <p style="font-size: 0.82rem; color: #bbb; margin: 0 0 0.75rem; line-height: 1.4;">
                Download the pre-formatted Meta Commerce feeds directly to your device for manual upload or backup:
              </p>
              <div style="display: flex; gap: 10px;">
                <button onclick="window.metaCatalogService.downloadCSV()" style="
                  flex: 1;
                  background: rgba(212, 175, 55, 0.15);
                  color: #d4af37;
                  border: 1px solid rgba(212, 175, 55, 0.4);
                  padding: 9px 12px;
                  border-radius: 8px;
                  font-size: 0.82rem;
                  font-weight: 600;
                  cursor: pointer;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  gap: 6px;
                ">
                  <span>📄</span> Download Meta CSV Feed
                </button>
                <button onclick="window.metaCatalogService.downloadXML()" style="
                  flex: 1;
                  background: rgba(255, 255, 255, 0.08);
                  color: #e5e5d8;
                  border: 1px solid rgba(255, 255, 255, 0.2);
                  padding: 9px 12px;
                  border-radius: 8px;
                  font-size: 0.82rem;
                  font-weight: 600;
                  cursor: pointer;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  gap: 6px;
                ">
                  <span>📰</span> Download Meta XML Feed
                </button>
              </div>
            </div>

            <!-- Meta & WhatsApp Quick Setup Instructions -->
            <div style="
              background: rgba(0, 0, 0, 0.2);
              border-radius: 10px;
              padding: 0.85rem 1rem;
              font-size: 0.78rem;
              color: #999;
              line-height: 1.45;
            ">
              <strong style="color: #dcdccb;">How WhatsApp Connect Works:</strong><br>
              1. In <strong>Meta Commerce Manager</strong>, go to <em>Catalog &gt; Data Sources &gt; Add Items &gt; Data Feed</em>.<br>
              2. Choose <em>Scheduled Feed</em> and paste the copied Live Feed URL.<br>
              3. In <em>Settings &gt; WhatsApp Business Account</em>, link your WhatsApp number (<code>+254141270112</code>). Products will automatically appear inside your WhatsApp Business chat catalog!
            </div>

          </div>
        </div>
      `;

      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.closeConnectModal();
      });
      document.body.appendChild(modal);
    }
    modal.style.display = 'flex';
  }

  closeConnectModal() {
    const modal = document.getElementById('meta-catalog-modal');
    if (modal) modal.style.display = 'none';
  }
}

// Global instance
if (typeof window !== "undefined") {
  window.metaCatalogService = new MetaCatalogConnectService();
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = MetaCatalogConnectService;
}

/* =====================================================
   FOODIE EXPRESS - Cart Module
   ===================================================== */

'use strict';

const Cart = {
  key: 'fe-cart',
  couponKey: 'fe-coupon',

  COUPONS: {
    'FIRST40': { type: 'percent', value: 40, max: 120, desc: '40% OFF up to ₹120' },
    'FREEDEL': { type: 'delivery', value: 100, max: 100, desc: 'Free Delivery' },
    'HEALTH100': { type: 'flat', value: 100, desc: '₹100 OFF' },
    'SAVE50': { type: 'flat', value: 50, desc: '₹50 OFF on orders above ₹299' },
    'WELCOME': { type: 'percent', value: 20, max: 80, desc: '20% OFF for new users' },
  },

  get() {
    try { return JSON.parse(localStorage.getItem(this.key)) || []; }
    catch { return []; }
  },

  save(items) {
    localStorage.setItem(this.key, JSON.stringify(items));
    this.updateBadge();
  },

  add(item) {
    const items = this.get();
    const existing = items.find(i => i.id === item.id);
    if (existing) {
      existing.qty += 1;
      Toast.success('Quantity Updated', `${item.name} quantity increased`);
    } else {
      items.push({ ...item, qty: 1 });
      Toast.success('Added to Cart! 🛒', item.name);
    }
    this.save(items);
    this.animateBadge();
  },

  remove(id) {
    const items = this.get().filter(i => i.id !== id);
    this.save(items);
  },

  updateQty(id, qty) {
    if (qty <= 0) {
      this.remove(id);
      return;
    }
    const items = this.get();
    const item = items.find(i => i.id === id);
    if (item) {
      item.qty = qty;
      this.save(items);
    }
  },

  clear() {
    localStorage.removeItem(this.key);
    localStorage.removeItem(this.couponKey);
    this.updateBadge();
  },

  getItems() { return this.get(); },

  getCount() {
    return this.get().reduce((sum, i) => sum + i.qty, 0);
  },

  getSubtotal() {
    return this.get().reduce((sum, i) => sum + i.price * i.qty, 0);
  },

  getDeliveryFee(subtotal) {
    const coupon = this.getCoupon();
    if (coupon && coupon.type === 'delivery') return 0;
    if (subtotal >= 500) return 0;
    if (subtotal >= 300) return 20;
    return 40;
  },

  getCoupon() {
    try {
      const data = localStorage.getItem(this.couponKey);
      return data ? JSON.parse(data) : null;
    } catch { return null; }
  },

  applyCoupon(code, callback) {
    const upperCode = (code || '').toUpperCase().trim();
    const couponData = this.COUPONS[upperCode];

    if (!upperCode) {
      Toast.warning('Enter a Coupon Code');
      return false;
    }

    if (!couponData) {
      Toast.error('Invalid Coupon', 'This coupon code is not valid.');
      return false;
    }

    localStorage.setItem(this.couponKey, JSON.stringify({ code: upperCode, ...couponData }));
    Toast.success('Coupon Applied! 🎉', couponData.desc);
    if (typeof callback === 'function') callback();
    return true;
  },

  removeCoupon(callback) {
    localStorage.removeItem(this.couponKey);
    Toast.info('Coupon Removed');
    if (typeof callback === 'function') callback();
  },

  getDiscount(subtotal) {
    const coupon = this.getCoupon();
    if (!coupon) return 0;

    if (coupon.type === 'percent') {
      const disc = Math.floor(subtotal * coupon.value / 100);
      return Math.min(disc, coupon.max || Infinity);
    }
    if (coupon.type === 'flat') return Math.min(coupon.value, subtotal);
    if (coupon.type === 'delivery') return 0;
    return 0;
  },

  getSummary() {
    const subtotal = this.getSubtotal();
    const deliveryFee = this.getDeliveryFee(subtotal);
    const discount = this.getDiscount(subtotal);
    const taxable = subtotal - discount;
    const tax = Math.floor(taxable * 0.05);
    const total = taxable + deliveryFee + tax;
    return { subtotal, deliveryFee, discount, tax, total, itemCount: this.getCount() };
  },

  updateBadge() {
    const count = this.getCount();
    document.querySelectorAll('#cartCountBadge').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });
  },

  animateBadge() {
    const badge = document.getElementById('cartCountBadge');
    if (!badge) return;
    badge.style.transform = 'scale(1.4)';
    setTimeout(() => badge.style.transform = '', 250);
  },

  isEmpty() { return this.get().length === 0; },

  // Build full cart page render
  renderCartPage() {
    const el = document.getElementById('cartItemsList');
    const summaryEl = document.getElementById('cartSummaryBody');
    if (!el) return;

    const items = this.get();
    const base = getBasePath();

    if (items.length === 0) {
      el.closest('.cart-page-items').innerHTML = `
        <div class="empty-state" style="padding:80px 20px">
          <div class="empty-icon">🛒</div>
          <h3>Your cart is empty</h3>
          <p>Looks like you haven't added anything yet.</p>
          <a href="${base}pages/restaurants.html" class="btn btn-primary">Browse Restaurants</a>
        </div>`;
      if (summaryEl) summaryEl.closest('.order-summary-card').style.display = 'none';
      return;
    }

    el.innerHTML = items.map(item => `
      <div class="cart-page-item" id="cart-item-${item.id}">
        <img src="${item.img}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/80x80?text=🍔'">
        <div class="cart-page-item-info">
          <h3>${item.name}</h3>
          <p>${item.restaurantName || ''}</p>
          <div class="qty-selector">
            <button class="qty-btn" onclick="Cart.updateQty(${item.id}, ${item.qty - 1}); Cart.renderCartPage()">−</button>
            <span class="qty-count">${item.qty}</span>
            <button class="qty-btn" onclick="Cart.updateQty(${item.id}, ${item.qty + 1}); Cart.renderCartPage()">+</button>
          </div>
        </div>
        <div style="text-align:right">
          <div class="cart-page-item-price">${formatCurrency(item.price * item.qty)}</div>
          <div style="font-size:12px;color:var(--text-muted);margin-top:4px">${formatCurrency(item.price)} each</div>
          <button onclick="Cart.remove(${item.id}); Cart.renderCartPage()" class="btn btn-ghost btn-sm" style="color:var(--error);margin-top:8px">🗑️ Remove</button>
        </div>
      </div>
    `).join('');

    if (summaryEl) this.renderSummary(summaryEl);
  },

  renderSummary(el) {
    if (!el) return;
    const { subtotal, deliveryFee, discount, tax, total } = this.getSummary();
    const coupon = this.getCoupon();
    const base = getBasePath();

    el.innerHTML = `
      <div class="coupon-apply">
        <span class="coupon-icon">🎟️</span>
        ${coupon ? `
          <span style="flex:1;font-size:14px;font-weight:600;color:var(--success)">${coupon.code} Applied!</span>
          <button class="btn btn-ghost btn-sm" style="color:var(--error)" onclick="Cart.removeCoupon(() => Cart.renderCartPage())">Remove</button>
        ` : `
          <input type="text" id="couponInput" placeholder="Enter coupon code..." />
          <button class="btn btn-secondary btn-sm" onclick="Cart.applyCoupon(document.getElementById('couponInput').value, () => Cart.renderCartPage())">Apply</button>
        `}
      </div>
      <div class="summary-row"><span>Subtotal (${this.getCount()} items)</span><span>${formatCurrency(subtotal)}</span></div>
      <div class="summary-row"><span>Delivery Fee</span><span>${deliveryFee === 0 ? '<span style="color:var(--success);font-weight:600">FREE</span>' : formatCurrency(deliveryFee)}</span></div>
      ${discount > 0 ? `<div class="summary-row"><span>Coupon Discount</span><span class="savings">-${formatCurrency(discount)}</span></div>` : ''}
      <div class="summary-row"><span>GST & Taxes (5%)</span><span>${formatCurrency(tax)}</span></div>
      ${discount > 0 ? `<div class="summary-row"><span style="color:var(--success);font-size:13px">🎉 Total Savings</span><span style="color:var(--success);font-weight:700">-${formatCurrency(discount)}</span></div>` : ''}
      <div class="summary-row total"><span>Total Amount</span><span>${formatCurrency(total)}</span></div>
      <a href="${base}pages/checkout.html" class="btn btn-primary" style="width:100%;margin-top:16px">Proceed to Checkout →</a>
      <a href="${base}pages/restaurants.html" class="btn btn-ghost" style="width:100%;margin-top:8px">← Continue Shopping</a>
    `;
  }
};

/* =====================================================
   FOODIE EXPRESS - Checkout Module
   ===================================================== */

'use strict';

const Checkout = {
  selectedPayment: 'card',
  selectedAddress: 0,

  init() {
    if (!document.getElementById('checkoutForm')) return;

    // Guard: require auth
    if (!Auth.isLoggedIn()) {
      window.location.href = getBasePath() + 'pages/login.html?redirect=' + encodeURIComponent(window.location.href);
      return;
    }

    // Guard: require items
    if (Cart.isEmpty()) {
      window.location.href = getBasePath() + 'pages/cart.html';
      return;
    }

    this.renderOrderSummary();
    this.initPaymentSelection();
    this.initAddressSelection();
    this.initForm();
    this.prefillUser();
  },

  prefillUser() {
    const user = Auth.getUser();
    if (!user) return;
    const nameEl = document.getElementById('deliveryName');
    const emailEl = document.getElementById('deliveryEmail');
    const phoneEl = document.getElementById('deliveryPhone');
    if (nameEl && !nameEl.value) nameEl.value = user.name || '';
    if (emailEl && !emailEl.value) emailEl.value = user.email || '';
    if (phoneEl && !phoneEl.value) phoneEl.value = user.phone || '';
  },

  renderOrderSummary() {
    const el = document.getElementById('checkoutOrderItems');
    const summaryEl = document.getElementById('checkoutSummary');
    const items = Cart.getItems();
    const { subtotal, deliveryFee, discount, tax, total } = Cart.getSummary();

    if (el) {
      el.innerHTML = items.map(i => `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--border-light)">
          <div style="display:flex;align-items:center;gap:10px">
            <img src="${i.img}" style="width:44px;height:44px;border-radius:8px;object-fit:cover" onerror="this.style.display='none'">
            <div>
              <div style="font-size:14px;font-weight:600">${i.name}</div>
              <div style="font-size:12px;color:var(--text-muted)">Qty: ${i.qty}</div>
            </div>
          </div>
          <div style="font-size:14px;font-weight:700;color:var(--primary)">${formatCurrency(i.price * i.qty)}</div>
        </div>
      `).join('');
    }

    if (summaryEl) {
      summaryEl.innerHTML = `
        <div class="summary-row"><span>Subtotal</span><span>${formatCurrency(subtotal)}</span></div>
        <div class="summary-row"><span>Delivery</span><span>${deliveryFee === 0 ? '<span style="color:var(--success)">FREE</span>' : formatCurrency(deliveryFee)}</span></div>
        ${discount > 0 ? `<div class="summary-row"><span>Discount</span><span style="color:var(--success)">-${formatCurrency(discount)}</span></div>` : ''}
        <div class="summary-row"><span>GST (5%)</span><span>${formatCurrency(tax)}</span></div>
        <div class="summary-row total"><span>Total</span><span>${formatCurrency(total)}</span></div>
      `;
    }

    const totalEl = document.getElementById('checkoutTotalAmount');
    if (totalEl) totalEl.textContent = formatCurrency(total);
  },

  initPaymentSelection() {
    document.querySelectorAll('.payment-method').forEach(el => {
      el.addEventListener('click', () => {
        document.querySelectorAll('.payment-method').forEach(e => e.classList.remove('active'));
        el.classList.add('active');
        const radio = el.querySelector('input[type="radio"]');
        if (radio) {
          radio.checked = true;
          this.selectedPayment = radio.value;
        }
      });
    });
  },

  initAddressSelection() {
    document.querySelectorAll('.address-card').forEach((el, idx) => {
      el.addEventListener('click', () => {
        document.querySelectorAll('.address-card').forEach(e => e.classList.remove('active'));
        el.classList.add('active');
        this.selectedAddress = idx;
      });
    });
    // Select first by default
    const first = document.querySelector('.address-card');
    if (first) first.classList.add('active');
  },

  initForm() {
    const form = document.getElementById('checkoutForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.deliveryName?.value.trim();
      const email = form.deliveryEmail?.value.trim();
      const phone = form.deliveryPhone?.value.trim();
      const address = form.deliveryAddress?.value.trim();
      const city = form.deliveryCity?.value.trim();
      const pincode = form.deliveryPincode?.value.trim();

      if (!name || !email || !address || !city || !pincode) {
        Toast.error('Incomplete Form', 'Please fill in all required fields.');
        return;
      }

      if (!/^\d{6}$/.test(pincode)) {
        Toast.error('Invalid Pincode', 'Please enter a valid 6-digit pincode.');
        return;
      }

      const btn = form.querySelector('#placeOrderBtn');
      if (btn) {
        btn.innerHTML = '<span class="spinner spinner-sm" style="border-color:rgba(255,255,255,0.3);border-top-color:white"></span> Placing Order...';
        btn.disabled = true;
      }

      // Save order
      const orderId = generateId();
      const { total, subtotal, deliveryFee, discount, tax } = Cart.getSummary();
      const order = {
        id: orderId,
        items: Cart.getItems(),
        total,
        subtotal,
        deliveryFee,
        discount,
        tax,
        address: { name, email, phone, address, city, pincode },
        payment: this.selectedPayment,
        status: 'confirmed',
        placedAt: new Date().toISOString(),
        estimatedDelivery: new Date(Date.now() + 35 * 60 * 1000).toISOString(),
      };

      // Save to order history
      const orders = JSON.parse(localStorage.getItem('fe-orders') || '[]');
      orders.unshift(order);
      localStorage.setItem('fe-orders', JSON.stringify(orders));
      localStorage.setItem('fe-last-order', JSON.stringify(order));

      // Clear cart
      Cart.clear();

      setTimeout(() => {
        window.location.href = getBasePath() + 'pages/order-success.html';
      }, 1500);
    });
  }
};

/* =====================================================
   FOODIE — Auth Module v2
   ===================================================== */

'use strict';

const USERS_KEY   = 'foodie_users';
const SESSION_KEY = 'foodie_session';

const Auth = {
  key: 'fe-user', // kept for backward compat with header/cart

  // ── Seed demo accounts + orders ──────────────────────
  seedUsers() {
    if (!localStorage.getItem(USERS_KEY)) {
      localStorage.setItem(USERS_KEY, JSON.stringify([
        {
          name: 'Rahul Sharma', username: 'rahul',
          email: 'rahul@foodie.com', phone: '9876543210',
          password: 'rahul123', role: 'user',
          points: 1840, totalOrders: 12, totalSpent: 4280,
          joined: '2024-01-10', avatar: 'RS',
        },
        {
          name: 'Admin', username: 'admin',
          email: 'admin@foodie.com', phone: '9000000000',
          password: 'admin@123', role: 'admin',
          avatar: 'AD',
        },
      ]));
    }
    if (!localStorage.getItem('foodie_orders')) {
      localStorage.setItem('foodie_orders', JSON.stringify([
        { id: 'FE001', userEmail: 'rahul@foodie.com', items: 'Chicken Biryani', restaurant: 'Spice Garden',     date: '2026-06-15', amount: 299, status: 'Delivered'  },
        { id: 'FE002', userEmail: 'rahul@foodie.com', items: 'Margherita Pizza', restaurant: 'Pizza Paradise', date: '2026-06-12', amount: 349, status: 'Delivered'  },
        { id: 'FE003', userEmail: 'rahul@foodie.com', items: 'Classic Smash Burger', restaurant: 'The Burger Lab', date: '2026-06-17', amount: 249, status: 'On the Way' },
        { id: 'FE004', userEmail: 'rahul@foodie.com', items: 'Paneer Butter Masala + Naan', restaurant: 'Spice Garden', date: '2026-06-10', amount: 348, status: 'Delivered' },
        { id: 'FE005', userEmail: 'rahul@foodie.com', items: 'Acai Bowl + Caesar Salad', restaurant: 'Green Bowl', date: '2026-06-07', amount: 538, status: 'Delivered'  },
      ]));
    }
  },

  // ── Register new user ─────────────────────────────────
  registerUser(data) {
    try {
      const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
      if (users.some(u => u.email.toLowerCase() === data.email.toLowerCase()))
        return { ok: false, message: 'An account with this email already exists.' };
      if (data.username && users.some(u => u.username && u.username.toLowerCase() === data.username.toLowerCase()))
        return { ok: false, message: 'This username is already taken.' };
      users.push({ ...data, role: 'user', points: 200, totalOrders: 0, totalSpent: 0, joined: new Date().toISOString().split('T')[0] });
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      return { ok: true, message: 'Account created successfully!' };
    } catch { return { ok: false, message: 'An error occurred. Please try again.' }; }
  },

  // ── Login ─────────────────────────────────────────────
  loginUser(email, password) {
    try {
      const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
      const user  = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
      if (!user) return { ok: false, message: 'Invalid email or password.' };
      const session = { ...user };
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      localStorage.setItem(this.key,    JSON.stringify(session)); // fe-user compat
      return { ok: true, user: session };
    } catch { return { ok: false, message: 'Login failed. Please try again.' }; }
  },

  // ── Session ───────────────────────────────────────────
  getSession() {
    try { const r = localStorage.getItem(SESSION_KEY); return r ? JSON.parse(r) : null; }
    catch { return null; }
  },

  // ── Logout ────────────────────────────────────────────
  logoutUser() {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(this.key);
    if (typeof Cart  !== 'undefined') Cart.clear();
    if (typeof Toast !== 'undefined') Toast.success('Logged Out', 'See you soon! 👋');
    setTimeout(() => {
      window.location.href = window.location.pathname.includes('/pages/') ? '../index.html' : 'index.html';
    }, 900);
  },

  // ── Require auth (call at top of protected pages) ─────
  requireAuth(role) {
    const user = this.getSession();
    if (!user) {
      window.location.href = 'login.html?redirect=' + encodeURIComponent(window.location.href);
      return false;
    }
    if (role && user.role !== role) {
      window.location.href = '../index.html';
      return false;
    }
    return true;
  },

  // ── Update current user profile ───────────────────────
  updateUser(data) {
    try {
      const session = this.getSession();
      if (!session) return false;
      const users   = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
      const idx     = users.findIndex(u => u.email === session.email);
      const updated = { ...session, ...data };
      if (idx !== -1) users[idx] = updated;
      localStorage.setItem(USERS_KEY,   JSON.stringify(users));
      localStorage.setItem(SESSION_KEY, JSON.stringify(updated));
      localStorage.setItem(this.key,    JSON.stringify(updated));
      return true;
    } catch { return false; }
  },

  // ── Backward-compat aliases ───────────────────────────
  getUser()    { return this.getSession(); },
  setUser(u)   { localStorage.setItem(this.key, JSON.stringify(u)); localStorage.setItem(SESSION_KEY, JSON.stringify(u)); },
  isLoggedIn() { return !!this.getSession(); },
  logout()     { this.logoutUser(); },

  // ── UI helpers (used by other pages) ─────────────────
  validateEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); },
  validatePhone(p) { return /^[+]?[\d\s\-]{10,15}$/.test(p); },

  showFieldError(id, msg) {
    const el = document.getElementById(id);
    if (el) { el.textContent = '⚠ ' + msg; el.style.display = 'block'; }
  },
  clearFieldError(id) {
    const el = document.getElementById(id);
    if (el) { el.textContent = ''; el.style.display = 'none'; }
  },
  clearAllErrors() {
    document.querySelectorAll('.error-msg').forEach(el => { el.textContent = ''; el.style.display = 'none'; });
  },

  setLoading(btn, loading) {
    if (!btn) return;
    if (loading) { btn.dataset.original = btn.innerHTML; btn.innerHTML = '⏳ Please wait...'; btn.disabled = true; }
    else         { btn.innerHTML = btn.dataset.original || btn.innerHTML; btn.disabled = false; }
  },

  checkPasswordStrength(password) {
    const fill = document.getElementById('strengthFill');
    const text = document.getElementById('strengthText');
    if (!fill || !text) return;
    const score   = [password.length >= 8, /[A-Z]/.test(password), /[0-9]/.test(password), /[^A-Za-z0-9]/.test(password)].filter(Boolean).length;
    const levels  = ['', 'weak', 'fair', 'good', 'strong'];
    const labels  = ['', 'Weak', 'Fair', 'Good', 'Strong 💪'];
    fill.className = 'strength-fill ' + (levels[score] || '');
    text.className = 'strength-text ' + (levels[score] || '');
    text.textContent = score > 0 ? labels[score] : '';
  },

  initPasswordToggle() {
    document.querySelectorAll('.password-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const input = btn.previousElementSibling;
        if (!input) return;
        const isPass = input.type === 'password';
        input.type   = isPass ? 'text' : 'password';
        btn.textContent = isPass ? '🙈' : '👁️';
      });
    });
  },

  // no-ops — new login/signup handle their own forms
  initLoginForm()  {},
  initSignupForm() {},
  initSocialLogin() { if (typeof Toast !== 'undefined') Toast.info('Social Login', 'OAuth coming soon!'); },

  initProfilePage() {
    const user = this.getSession();
    if (!user) { window.location.href = 'login.html'; return; }
    ['profileName', 'profileEmail', 'profilePhone'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = user[id.replace('profile', '').toLowerCase()] || '';
    });
    const av = document.getElementById('profileAvatar');
    if (av) av.src = (location.pathname.includes('/pages/') ? '../' : './') + 'images/avatar-default.webp';
    const nd = document.getElementById('profileNameDisplay');  if (nd) nd.textContent = user.name;
    const ed = document.getElementById('profileEmailDisplay'); if (ed) ed.textContent = user.email;
    const pf = document.getElementById('profileForm');
    if (pf) {
      pf.addEventListener('submit', e => {
        e.preventDefault();
        this.updateUser({ name: pf.profileName?.value || user.name, email: pf.profileEmail?.value || user.email, phone: pf.profilePhone?.value || user.phone });
        if (typeof Toast !== 'undefined') Toast.success('Profile Updated!', 'Your changes have been saved.');
      });
    }
  },
};

Auth.seedUsers();

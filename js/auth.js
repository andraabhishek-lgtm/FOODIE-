/* =====================================================
   FOODIE EXPRESS - Auth Module
   ===================================================== */

'use strict';

const Auth = {
  key: 'fe-user',
  sessionKey: 'fe-session',

  getUser() {
    try {
      const raw = localStorage.getItem(this.key);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  },

  setUser(user) {
    localStorage.setItem(this.key, JSON.stringify(user));
  },

  isLoggedIn() {
    return !!this.getUser();
  },

  logout() {
    localStorage.removeItem(this.key);
    Cart.clear();
    Toast.success('Logged Out', 'See you soon!');
    setTimeout(() => {
      const base = getBasePath();
      window.location.href = base + 'index.html';
    }, 1000);
  },

  requireAuth(redirectTo) {
    if (!this.isLoggedIn()) {
      const base = getBasePath();
      window.location.href = base + 'pages/login.html?redirect=' + encodeURIComponent(redirectTo || window.location.href);
      return false;
    }
    return true;
  },

  // Login form handler
  initLoginForm() {
    const form = document.getElementById('loginForm');
    if (!form) return;

    // Pre-fill redirect
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get('redirect');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.email.value.trim();
      const password = form.password.value;
      const remember = form.remember?.checked;

      if (!this.validateEmail(email)) {
        this.showFieldError('emailError', 'Please enter a valid email address');
        return;
      }

      if (password.length < 6) {
        this.showFieldError('passwordError', 'Password must be at least 6 characters');
        return;
      }

      // Simulate login
      const btnEl = form.querySelector('button[type="submit"]');
      this.setLoading(btnEl, true);

      setTimeout(() => {
        const user = {
          name: email.split('@')[0].replace(/\./g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
          email,
          phone: '+91 98765 43210',
          avatar: null,
          joinedAt: new Date().toISOString(),
          remember,
        };

        this.setUser(user);
        Toast.success('Welcome back! 👋', user.name);

        setTimeout(() => {
          if (redirect) {
            window.location.href = decodeURIComponent(redirect);
          } else {
            window.location.href = getBasePath() + 'index.html';
          }
        }, 800);
      }, 1200);
    });

    // Social login UI
    document.querySelectorAll('.social-login-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        Toast.info('Social Login', 'This feature is coming soon!');
      });
    });

    // Forgot password
    const forgotBtn = document.getElementById('forgotPassword');
    if (forgotBtn) {
      forgotBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const email = form.email.value.trim();
        if (!email || !this.validateEmail(email)) {
          Toast.warning('Enter your email first', 'We\'ll send a reset link.');
          return;
        }
        Toast.success('Reset Email Sent!', `Check ${email} for instructions.`);
      });
    }
  },

  // Signup form handler
  initSignupForm() {
    const form = document.getElementById('signupForm');
    if (!form) return;

    // Password strength meter
    const passInput = document.getElementById('signupPassword');
    if (passInput) {
      passInput.addEventListener('input', () => {
        this.checkPasswordStrength(passInput.value);
      });
    }

    // Confirm password
    const confirmInput = document.getElementById('confirmPassword');
    if (confirmInput) {
      confirmInput.addEventListener('input', () => {
        const pass = passInput?.value || '';
        if (confirmInput.value && confirmInput.value !== pass) {
          this.showFieldError('confirmPasswordError', 'Passwords do not match');
        } else {
          this.clearFieldError('confirmPasswordError');
        }
      });
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.fullName?.value.trim();
      const email = form.email?.value.trim();
      const phone = form.phone?.value.trim();
      const password = form.password?.value;
      const confirm = form.confirmPassword?.value;
      const terms = form.terms?.checked;

      let valid = true;

      if (!name || name.length < 2) {
        this.showFieldError('nameError', 'Please enter your full name'); valid = false;
      }
      if (!this.validateEmail(email)) {
        this.showFieldError('emailError', 'Please enter a valid email'); valid = false;
      }
      if (phone && !this.validatePhone(phone)) {
        this.showFieldError('phoneError', 'Please enter a valid phone number'); valid = false;
      }
      if (password.length < 8) {
        this.showFieldError('passwordError', 'Password must be at least 8 characters'); valid = false;
      }
      if (password !== confirm) {
        this.showFieldError('confirmPasswordError', 'Passwords do not match'); valid = false;
      }
      if (!terms) {
        Toast.warning('Accept Terms', 'Please accept the Terms & Conditions to continue.'); valid = false;
      }

      if (!valid) return;

      const btnEl = form.querySelector('button[type="submit"]');
      this.setLoading(btnEl, true);

      setTimeout(() => {
        const user = { name, email, phone, avatar: null, joinedAt: new Date().toISOString() };
        this.setUser(user);
        Toast.success('Account Created! 🎉', 'Welcome to FoodieExpress!');

        setTimeout(() => {
          window.location.href = getBasePath() + 'index.html';
        }, 800);
      }, 1500);
    });
  },

  checkPasswordStrength(password) {
    const fill = document.getElementById('strengthFill');
    const text = document.getElementById('strengthText');
    if (!fill || !text) return;

    const checks = [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[0-9]/.test(password),
      /[^A-Za-z0-9]/.test(password),
    ];
    const score = checks.filter(Boolean).length;

    const levels = ['', 'weak', 'fair', 'good', 'strong'];
    const labels = ['', 'Weak', 'Fair', 'Good', 'Strong 💪'];

    fill.className = 'strength-fill ' + (levels[score] || '');
    text.className = 'strength-text ' + (levels[score] || '');
    text.textContent = score > 0 ? labels[score] : '';
  },

  validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  validatePhone(phone) {
    return /^[+]?[\d\s\-]{10,15}$/.test(phone);
  },

  showFieldError(id, msg) {
    const el = document.getElementById(id);
    if (el) { el.textContent = '⚠ ' + msg; el.style.display = 'block'; }
  },

  clearFieldError(id) {
    const el = document.getElementById(id);
    if (el) { el.textContent = ''; el.style.display = 'none'; }
  },

  clearAllErrors() {
    document.querySelectorAll('.error-msg').forEach(el => {
      el.textContent = ''; el.style.display = 'none';
    });
  },

  setLoading(btn, loading) {
    if (!btn) return;
    if (loading) {
      btn.dataset.original = btn.innerHTML;
      btn.innerHTML = '<span class="spinner spinner-sm" style="border-color:rgba(255,255,255,0.3);border-top-color:white;width:18px;height:18px"></span> Please wait...';
      btn.disabled = true;
    } else {
      btn.innerHTML = btn.dataset.original || btn.innerHTML;
      btn.disabled = false;
    }
  },

  initPasswordToggle() {
    document.querySelectorAll('.password-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const input = btn.previousElementSibling;
        if (!input) return;
        const isPass = input.type === 'password';
        input.type = isPass ? 'text' : 'password';
        btn.textContent = isPass ? '🙈' : '👁️';
      });
    });
  },

  initProfilePage() {
    const user = this.getUser();
    if (!user) {
      window.location.href = getBasePath() + 'pages/login.html';
      return;
    }

    // Fill profile info
    ['profileName', 'profileEmail', 'profilePhone'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        const key = id.replace('profile', '').toLowerCase();
        el.value = user[key] || '';
      }
    });

    const avatarEl = document.getElementById('profileAvatar');
    if (avatarEl) {
      avatarEl.src = user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=FF6B35&color=fff&size=90`;
    }

    const nameDisplay = document.getElementById('profileNameDisplay');
    if (nameDisplay) nameDisplay.textContent = user.name;

    const emailDisplay = document.getElementById('profileEmailDisplay');
    if (emailDisplay) emailDisplay.textContent = user.email;

    // Profile update form
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
      profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const updated = {
          ...user,
          name: profileForm.profileName?.value || user.name,
          email: profileForm.profileEmail?.value || user.email,
          phone: profileForm.profilePhone?.value || user.phone,
        };
        this.setUser(updated);
        Toast.success('Profile Updated!', 'Your changes have been saved.');
      });
    }
  },
};

/* =====================================================
   FOODIE EXPRESS - Search & Filter Module
   ===================================================== */

'use strict';

const Search = {
  currentFilters: {
    category: 'all',
    rating: 0,
    maxDelivery: Infinity,
    sort: 'popularity',
    status: 'all',
    query: '',
    veg: false,
  },

  // Filter restaurants
  filterRestaurants(restaurants = RESTAURANTS, filters = {}) {
    const f = { ...this.currentFilters, ...filters };

    return restaurants
      .filter(r => {
        if (f.status !== 'all' && r.status !== f.status) return false;
        if (f.category !== 'all' && r.category !== f.category) return false;
        if (f.rating > 0 && r.rating < f.rating) return false;
        if (f.maxDelivery < Infinity) {
          const maxTime = parseInt(r.deliveryTime.split('-')[1] || r.deliveryTime);
          if (maxTime > f.maxDelivery) return false;
        }
        if (f.query) {
          const q = f.query.toLowerCase();
          if (!r.name.toLowerCase().includes(q) &&
              !r.cuisine.toLowerCase().includes(q) &&
              !r.tags.some(t => t.toLowerCase().includes(q))) return false;
        }
        return true;
      })
      .sort((a, b) => {
        switch (f.sort) {
          case 'rating': return b.rating - a.rating;
          case 'delivery-time': return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
          case 'price-low': return a.minOrder - b.minOrder;
          case 'price-high': return b.minOrder - a.minOrder;
          case 'distance': return parseFloat(a.distance) - parseFloat(b.distance);
          default: return b.featured - a.featured || b.rating - a.rating;
        }
      });
  },

  // Filter menu items
  filterMenuItems(items = MENU_ITEMS, options = {}) {
    const { query = '', category = 'all', vegOnly = false, restaurantId = null } = options;

    return items.filter(item => {
      if (restaurantId && item.restaurantId !== restaurantId) return false;
      if (vegOnly && !item.isVeg) return false;
      if (category !== 'all' && item.category.toLowerCase() !== category.toLowerCase()) return false;
      if (query) {
        const q = query.toLowerCase();
        if (!item.name.toLowerCase().includes(q) && !item.description.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  },

  // Init restaurant page filters
  initRestaurantFilters() {
    const grid = document.getElementById('restaurantsGrid');
    if (!grid) return;

    this.renderRestaurantGrid(RESTAURANTS);

    // Category filter chips
    document.querySelectorAll('[data-filter-cat]').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('[data-filter-cat]').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.currentFilters.category = chip.dataset.filterCat;
        this.applyRestaurantFilters();
      });
    });

    // Rating filter
    document.querySelectorAll('[data-filter-rating]').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('[data-filter-rating]').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.currentFilters.rating = parseFloat(chip.dataset.filterRating);
        this.applyRestaurantFilters();
      });
    });

    // Delivery time filter
    document.querySelectorAll('[data-filter-time]').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('[data-filter-time]').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.currentFilters.maxDelivery = parseInt(chip.dataset.filterTime) || Infinity;
        this.applyRestaurantFilters();
      });
    });

    // Status filter
    document.querySelectorAll('[data-filter-status]').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('[data-filter-status]').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.currentFilters.status = chip.dataset.filterStatus;
        this.applyRestaurantFilters();
      });
    });

    // Sort select
    const sortEl = document.getElementById('restaurantSort');
    if (sortEl) {
      sortEl.addEventListener('change', () => {
        this.currentFilters.sort = sortEl.value;
        this.applyRestaurantFilters();
      });
    }

    // Search input
    const searchEl = document.getElementById('restaurantSearch');
    if (searchEl) {
      searchEl.addEventListener('input', debounce(() => {
        this.currentFilters.query = searchEl.value.trim();
        this.applyRestaurantFilters();
      }, 300));
    }
  },

  applyRestaurantFilters() {
    const filtered = this.filterRestaurants();
    this.renderRestaurantGrid(filtered);

    const countEl = document.getElementById('restaurantCount');
    if (countEl) countEl.textContent = `${filtered.length} restaurant${filtered.length !== 1 ? 's' : ''} found`;
  },

  renderRestaurantGrid(restaurants) {
    const grid = document.getElementById('restaurantsGrid');
    if (!grid) return;

    if (restaurants.length === 0) {
      grid.innerHTML = `
        <div class="no-results" style="grid-column:1/-1">
          <div class="no-results-icon">🍽️</div>
          <h3>No restaurants found</h3>
          <p>Try adjusting your filters or search term</p>
        </div>`;
      return;
    }

    grid.innerHTML = restaurants.map(r => buildRestaurantCard(r)).join('');
    initScrollAnimations();
  },

  // Init menu page filters
  initMenuFilters(restaurantId) {
    const restaurantData = RESTAURANTS.find(r => r.id === restaurantId);
    const items = MENU_ITEMS.filter(m => m.restaurantId === restaurantId);

    // Get unique categories
    const categories = ['All', ...new Set(items.map(m => m.category))];

    const catNav = document.getElementById('menuCatNav');
    if (catNav) {
      catNav.innerHTML = categories.map((cat, i) => `
        <a class="menu-cat-link ${i === 0 ? 'active' : ''}" data-cat="${cat.toLowerCase()}" href="#menu-section-${cat.toLowerCase().replace(/\s+/g, '-')}">${cat}</a>
      `).join('');

      catNav.querySelectorAll('.menu-cat-link').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          catNav.querySelectorAll('.menu-cat-link').forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        });
      });
    }

    this.renderMenuItems(items, restaurantId);

    // Veg only toggle
    const vegToggle = document.getElementById('vegOnlyToggle');
    if (vegToggle) {
      vegToggle.addEventListener('change', () => {
        const filtered = this.filterMenuItems(items, { vegOnly: vegToggle.checked });
        this.renderMenuItems(filtered, restaurantId);
      });
    }

    // Search
    const menuSearch = document.getElementById('menuSearch');
    if (menuSearch) {
      menuSearch.addEventListener('input', debounce(() => {
        const filtered = this.filterMenuItems(items, {
          query: menuSearch.value,
          vegOnly: vegToggle?.checked || false
        });
        this.renderMenuItems(filtered, restaurantId);
      }, 250));
    }
  },

  renderMenuItems(items, restaurantId) {
    const container = document.getElementById('menuItemsContainer');
    if (!container) return;

    if (items.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🍽️</div>
          <h3>No items found</h3>
          <p>Try a different search or filter</p>
        </div>`;
      return;
    }

    // Group by category
    const grouped = items.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {});

    container.innerHTML = Object.entries(grouped).map(([cat, catItems]) => `
      <div class="menu-section" id="menu-section-${cat.toLowerCase().replace(/\s+/g, '-')}">
        <h2>${cat}</h2>
        <div class="menu-items-list">
          ${catItems.map(item => buildMenuItemCard(item)).join('')}
        </div>
      </div>
    `).join('');
  }
};

// ---- CARD BUILDERS ----

function buildRestaurantCard(r) {
  const base = getBasePath ? getBasePath() : './';
  const isWishlisted = Wishlist.has(r.id, 'restaurant');

  return `
  <div class="restaurant-card animate-on-scroll" onclick="window.location.href='${base}pages/menu.html?id=${r.id}'">
    <div class="restaurant-img-wrap">
      <img src="${r.img}" alt="${r.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/400x200?text=🍽️'">
      <div class="restaurant-img-overlay"></div>
      <span class="restaurant-status ${r.status}">${r.status === 'open' ? '🟢 Open' : '🔴 Closed'}</span>
      ${r.featured ? '<span class="restaurant-featured">⭐ Featured</span>' : ''}
      <button class="restaurant-wishlist ${isWishlisted ? 'active' : ''}"
        onclick="event.stopPropagation(); Wishlist.toggle(${r.id},'restaurant'); this.classList.toggle('active'); this.style.color=Wishlist.has(${r.id},'restaurant')?'var(--error)':''"
        style="${isWishlisted ? 'color:var(--error)' : ''}">
        ❤️
      </button>
    </div>
    <div class="restaurant-info">
      <h3 class="restaurant-name">${r.name}</h3>
      <p class="restaurant-cuisine">${r.cuisine}</p>
      <div class="restaurant-meta">
        <span class="rating">⭐ ${r.rating} <span style="font-weight:400;color:var(--text-muted)">(${r.ratingCount.toLocaleString()})</span></span>
        <span class="dot"></span>
        <span>🕐 ${r.deliveryTime} min</span>
        <span class="dot"></span>
        <span>📍 ${r.distance}</span>
      </div>
      <div class="restaurant-tags">
        ${r.tags.map(t => `<span class="restaurant-tag">${t}</span>`).join('')}
      </div>
      ${r.discount ? `<div class="restaurant-discount">🏷️ ${r.discount}</div>` : ''}
    </div>
  </div>`;
}

function buildMenuItemCard(item) {
  const inCart = Cart.get().find(c => c.id === item.id);
  const qty = inCart ? inCart.qty : 0;

  return `
  <div class="menu-item" id="menu-item-${item.id}">
    <div class="menu-item-main">
      <img class="menu-item-img" src="${item.img}" alt="${item.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/90x90?text=🍔'">
      <div>
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
          <div class="dish-type-indicator ${item.isVeg ? 'veg' : 'non-veg'}"></div>
          ${item.popular ? '<span class="badge badge-primary" style="font-size:10px">🔥 Popular</span>' : ''}
          ${item.isSpicy ? '<span style="font-size:12px">🌶️</span>' : ''}
        </div>
        <div class="menu-item-name">${item.name}</div>
        <div class="menu-item-desc">${item.description}</div>
        <div style="display:flex;align-items:center;gap:8px">
          <span class="menu-item-price">${formatCurrency(item.price)}</span>
          ${item.originalPrice ? `<span style="font-size:13px;text-decoration:line-through;color:var(--text-muted)">${formatCurrency(item.originalPrice)}</span>` : ''}
          <span style="font-size:12px;color:var(--text-muted)">⭐ ${item.rating}</span>
        </div>
      </div>
    </div>
    <div class="menu-item-action">
      ${qty > 0 ? `
        <div class="qty-selector" id="qty-selector-${item.id}">
          <button class="qty-btn" onclick="updateMenuItemQty(${item.id}, ${qty - 1})">−</button>
          <span class="qty-count">${qty}</span>
          <button class="qty-btn" onclick="updateMenuItemQty(${item.id}, ${qty + 1})">+</button>
        </div>
      ` : `
        <button class="btn btn-primary btn-sm" onclick="addMenuItemToCart(${item.id})" id="add-btn-${item.id}">
          + Add
        </button>
      `}
    </div>
  </div>`;
}

function addMenuItemToCart(itemId) {
  const item = MENU_ITEMS.find(m => m.id === itemId);
  if (!item) return;

  const restaurant = RESTAURANTS.find(r => r.id === item.restaurantId);
  Cart.add({
    id: item.id,
    name: item.name,
    price: item.price,
    img: item.img,
    restaurantId: item.restaurantId,
    restaurantName: restaurant?.name || '',
  });

  // Update UI
  const addBtn = document.getElementById(`add-btn-${itemId}`);
  if (addBtn) {
    addBtn.outerHTML = `
      <div class="qty-selector" id="qty-selector-${itemId}">
        <button class="qty-btn" onclick="updateMenuItemQty(${itemId}, 0)">−</button>
        <span class="qty-count">1</span>
        <button class="qty-btn" onclick="updateMenuItemQty(${itemId}, 2)">+</button>
      </div>`;
  }
}

function updateMenuItemQty(itemId, newQty) {
  Cart.updateQty(itemId, newQty);
  Cart.updateBadge();

  const selectorEl = document.getElementById(`qty-selector-${itemId}`);
  if (!selectorEl) return;

  if (newQty <= 0) {
    selectorEl.outerHTML = `<button class="btn btn-primary btn-sm" onclick="addMenuItemToCart(${itemId})" id="add-btn-${itemId}">+ Add</button>`;
  } else {
    const count = selectorEl.querySelector('.qty-count');
    if (count) count.textContent = newQty;

    const btns = selectorEl.querySelectorAll('.qty-btn');
    if (btns[0]) btns[0].setAttribute('onclick', `updateMenuItemQty(${itemId}, ${newQty - 1})`);
    if (btns[1]) btns[1].setAttribute('onclick', `updateMenuItemQty(${itemId}, ${newQty + 1})`);
  }
}

function buildDishCard(item) {
  const base = getBasePath ? getBasePath() : './';
  const restaurant = RESTAURANTS.find(r => r.id === item.restaurantId);

  return `
  <div class="dish-card animate-on-scroll">
    <div class="dish-img-wrap">
      <div class="dish-type-indicator ${item.isVeg ? 'veg' : 'non-veg'}"></div>
      <button class="dish-wishlist" onclick="event.stopPropagation(); Wishlist.toggle(${item.id},'food'); this.classList.toggle('active')" title="Add to wishlist">❤️</button>
      <img src="${item.img}" alt="${item.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/300x200?text=🍔'" style="width:100%;height:100%;object-fit:cover">
    </div>
    <div class="dish-info">
      <div class="dish-name">${item.name}</div>
      <div class="dish-restaurant">${restaurant?.name || ''}</div>
      <div style="font-size:12px;color:var(--text-muted);margin-bottom:6px;display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden">${item.description}</div>
      <div class="dish-footer">
        <div>
          <span class="dish-price">${formatCurrency(item.price)}</span>
          ${item.originalPrice ? `<span class="original">${formatCurrency(item.originalPrice)}</span>` : ''}
        </div>
        <button class="dish-add-btn" onclick="Cart.add({id:${item.id},name:'${item.name.replace(/'/g, "\\'")}',price:${item.price},img:'${item.img}',restaurantId:${item.restaurantId},restaurantName:'${(restaurant?.name || '').replace(/'/g, "\\'")}'})" title="Add to cart">+</button>
      </div>
    </div>
  </div>`;
}

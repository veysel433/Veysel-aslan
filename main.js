// main.js — Hanedan Sahaf Global JavaScript

/* ── State ── */
const AppState = {
  cart: JSON.parse(localStorage.getItem('hanedan_cart')) || [],
  wishlist: JSON.parse(localStorage.getItem('hanedan_wishlist')) || [],
  theme: localStorage.getItem('hanedan_theme') || 'light',
  searchDebounce: null
};

/* ── Utilities ── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
const formatPrice = (n) => new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(n);
const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

/* ── Toast ── */
function showToast(message, type = 'success', action = null) {
  let container = $('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  let icon = type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-exclamation-triangle';
  toast.innerHTML = `<i class="fa-solid ${icon}"></i><span>${message}</span>`;
  if (action) {
    const btn = document.createElement('button');
    btn.textContent = action.text;
    btn.style.cssText = 'background:rgba(255,255,255,0.2);border:none;color:#fff;padding:4px 12px;border-radius:4px;cursor:pointer;font-size:12px;margin-left:auto;';
    btn.onclick = () => { action.callback(); toast.remove(); };
    toast.appendChild(btn);
    toast.style.animation = 'slideInRight 0.3s ease, fadeOut 0.3s ease 5.7s forwards';
  }
  container.appendChild(toast);
  setTimeout(() => toast.remove(), action ? 6000 : 3000);
}

/* ── Theme ── */
function initTheme() {
  document.documentElement.setAttribute('data-theme', AppState.theme);
  const btn = $('#themeToggle');
  if (btn) btn.innerHTML = AppState.theme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
}
function toggleTheme() {
  AppState.theme = AppState.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('hanedan_theme', AppState.theme);
  document.documentElement.setAttribute('data-theme', AppState.theme);
  const btn = $('#themeToggle');
  if (btn) btn.innerHTML = AppState.theme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
}

/* ── Cart ── */
function saveCart() {
  localStorage.setItem('hanedan_cart', JSON.stringify(AppState.cart));
  updateCartBadge();
}
function addToCart(bookId, qty = 1) {
  const book = booksData.find(b => b.id === bookId);
  if (!book) return;
  const existing = AppState.cart.find(item => item.id === bookId);
  if (existing) {
    existing.qty = Math.min(existing.qty + qty, book.stock);
  } else {
    AppState.cart.push({ id: book.id, title: book.title, author: book.author, price: book.price, oldPrice: book.oldPrice, coverColor: book.coverColor, coverGradient: book.coverGradient, condition: book.condition, qty: Math.min(qty, book.stock) });
  }
  saveCart();
  showToast(`"${book.title}" sepete eklendi`);
}
function removeFromCart(bookId) {
  const item = AppState.cart.find(i => i.id === bookId);
  AppState.cart = AppState.cart.filter(i => i.id !== bookId);
  saveCart();
  showToast('Ürün sepetten çıkarıldı', 'warning', { text: 'Geri Al', callback: () => { AppState.cart.push(item); saveCart(); if (typeof renderCart === 'function') renderCart(); } });
  if (typeof renderCart === 'function') renderCart();
}
function updateCartQty(bookId, qty) {
  const item = AppState.cart.find(i => i.id === bookId);
  const book = booksData.find(b => b.id === bookId);
  if (!item || !book) return;
  if (qty < 1) { removeFromCart(bookId); return; }
  item.qty = Math.min(qty, book.stock);
  saveCart();
  if (typeof renderCart === 'function') renderCart();
}
function getCartTotal() {
  return AppState.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}
function getCartCount() {
  return AppState.cart.reduce((sum, item) => sum + item.qty, 0);
}
function updateCartBadge() {
  const badge = $('#cartBadge');
  if (badge) { badge.textContent = getCartCount(); badge.style.display = getCartCount() > 0 ? 'flex' : 'none'; }
}

/* ── Wishlist ── */
function saveWishlist() {
  localStorage.setItem('hanedan_wishlist', JSON.stringify(AppState.wishlist));
  updateWishlistBadge();
}
function toggleWishlist(bookId) {
  const idx = AppState.wishlist.indexOf(bookId);
  const book = booksData.find(b => b.id === bookId);
  if (idx > -1) {
    AppState.wishlist.splice(idx, 1);
    showToast('Favorilerden çıkarıldı', 'warning');
  } else {
    AppState.wishlist.push(bookId);
    showToast(`"${book.title}" favorilere eklendi`);
  }
  saveWishlist();
  document.querySelectorAll(`[data-wishlist="${bookId}"]`).forEach(el => el.classList.toggle('active', idx === -1));
}
function isInWishlist(bookId) { return AppState.wishlist.includes(bookId); }
function updateWishlistBadge() {
  const badge = $('#wishlistBadge');
  if (badge) { badge.textContent = AppState.wishlist.length; badge.style.display = AppState.wishlist.length > 0 ? 'flex' : 'none'; }
}

/* ── Search ── */
function initSearch() {
  const input = $('#searchInput');
  const results = $('#searchResults');
  if (!input) return;
  input.addEventListener('input', (e) => {
    clearTimeout(AppState.searchDebounce);
    AppState.searchDebounce = setTimeout(() => performSearch(e.target.value), 300);
  });
  input.addEventListener('focus', () => { if (input.value.trim().length > 1) results.classList.add('active'); });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-bar')) results.classList.remove('active');
  });
}
function performSearch(query) {
  const results = $('#searchResults');
  if (!results) return;
  if (query.trim().length < 2) { results.classList.remove('active'); return; }
  const filtered = booksData.filter(b => b.title.toLowerCase().includes(query.toLowerCase()) || b.author.toLowerCase().includes(query.toLowerCase())).slice(0, 6);
  if (filtered.length === 0) { results.innerHTML = '<div class="search-results__item" style="cursor:default"><span>Sonuç bulunamadı</span></div>'; }
  else {
    results.innerHTML = filtered.map(b => `
      <a href="product-detail.html?id=${b.id}" class="search-results__item">
        <div class="search-results__img" style="background:${b.coverGradient || b.coverColor}"></div>
        <div class="search-results__info">
          <div class="search-results__title">${b.title}</div>
          <div class="search-results__author">${b.author}</div>
        </div>
      </a>
    `).join('');
  }
  results.classList.add('active');
}

/* ── Navbar ── */
function initNavbar() {
  const navbar = $('#navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('navbar--scrolled', window.scrollY > 50);
  });
  const hamburger = $('#hamburger');
  const mobileMenu = $('#mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
  }
  const searchToggle = $('#searchToggle');
  const searchBar = $('#searchBar');
  if (searchToggle && searchBar) {
    searchToggle.addEventListener('click', () => {
      searchBar.classList.toggle('active');
      if (searchBar.classList.contains('active')) setTimeout(() => $('#searchInput')?.focus(), 100);
    });
  }
}

/* ── Scroll to Top ── */
function initScrollTop() {
  const btn = $('#scrollTop');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 500));
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ── Intersection Observer ── */
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('active'); observer.unobserve(entry.target); } });
  }, { threshold: 0.1 });
  $$('.reveal').forEach(el => observer.observe(el));
}

/* ── Stats Counter ── */
function initCounters() {
  const counters = $$('[data-counter]');
  if (!counters.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.counter);
        const suffix = el.dataset.suffix || '';
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        const update = () => {
          current += step;
          if (current < target) { el.textContent = Math.floor(current).toLocaleString('tr-TR') + suffix; requestAnimationFrame(update); }
          else { el.textContent = target.toLocaleString('tr-TR') + suffix; }
        };
        update();
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

/* ── Newsletter ── */
function initNewsletter() {
  const form = $('#newsletterForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    if (input.value && input.value.includes('@')) {
      showToast('Bülten aboneliğiniz başarıyla tamamlandı!');
      input.value = '';
    } else {
      showToast('Lütfen geçerli bir e-posta adresi girin.', 'error');
    }
  });
}

/* ── Quick View Modal ── */
function openQuickView(bookId) {
  const book = booksData.find(b => b.id === bookId);
  if (!book) return;
  let modal = $('#quickViewModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'quickViewModal';
    modal.className = 'modal-overlay';
    document.body.appendChild(modal);
  }
  modal.innerHTML = `
    <div class="modal">
      <div class="modal__header">
        <h3 class="modal__title">Hızlı Bakış</h3>
        <button class="modal__close" onclick="closeQuickView()"><i class="fa-solid fa-times"></i></button>
      </div>
      <div class="modal__body" style="display:grid;grid-template-columns:140px 1fr;gap:1.5rem;">
        <div style="aspect-ratio:2/3;border-radius:8px;overflow:hidden;background:${book.coverGradient || book.coverColor}"></div>
        <div>
          <h4 style="font-family:var(--font-heading);font-size:1.25rem;margin-bottom:0.5rem;">${book.title}</h4>
          <p style="color:var(--color-text-muted);margin-bottom:0.5rem;">${book.author}</p>
          <div class="stars" style="margin-bottom:0.5rem;">${renderStars(book.rating)}</div>
          <p style="font-size:0.875rem;color:var(--color-text-muted);margin-bottom:1rem;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;">${book.description}</p>
          <div style="display:flex;align-items:center;gap:1rem;">
            <span style="font-family:var(--font-heading);font-size:1.5rem;font-weight:700;color:var(--color-burgundy);">${formatPrice(book.price)}</span>
            ${book.oldPrice ? `<span style="text-decoration:line-through;color:var(--color-text-muted);">${formatPrice(book.oldPrice)}</span>` : ''}
          </div>
        </div>
      </div>
      <div class="modal__footer">
        <a href="product-detail.html?id=${book.id}" class="btn btn--ghost">Detayları Gör</a>
        <button class="btn btn--primary" onclick="addToCart(${book.id}); closeQuickView();"><i class="fa-solid fa-cart-plus"></i> Sepete Ekle</button>
      </div>
    </div>
  `;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeQuickView() {
  const modal = $('#quickViewModal');
  if (modal) { modal.classList.remove('active'); document.body.style.overflow = ''; }
}

/* ── Render Helpers ── */
function renderStars(rating) {
  let html = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) html += '<i class="fa-solid fa-star"></i>';
    else if (i - 0.5 <= rating) html += '<i class="fa-solid fa-star-half-stroke"></i>';
    else html += '<i class="fa-regular fa-star stars--empty"></i>';
  }
  return html;
}
function renderBookCard(book, listView = false) {
  const inWishlist = isInWishlist(book.id);
  return `
    <article class="book-card ${listView ? 'book-card--list' : ''}">
      <div class="book-card__img-wrap">
        <div class="book-card__img" style="background:${book.coverGradient || book.coverColor};display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.3);font-family:var(--font-heading);font-size:2rem;font-weight:700;">${book.title.charAt(0)}</div>
        <div class="book-card__overlay">
          <button class="book-card__quick" onclick="openQuickView(${book.id})">Hızlı Bakış</button>
        </div>
        <span class="badge badge--condition-${book.condition.toLowerCase().replace(/\s/g, '')} book-card__badge">${book.condition}</span>
      </div>
      <div class="book-card__content">
        <p class="book-card__author">${book.author}</p>
        <h3 class="book-card__title"><a href="product-detail.html?id=${book.id}">${book.title}</a></h3>
        <div class="book-card__meta">
          <span class="badge badge--category">${book.category}</span>
          <span class="book-card__rating"><span class="stars">${renderStars(book.rating)}</span> (${book.reviewCount})</span>
        </div>
        <div class="book-card__price-wrap">
          <div>
            ${book.oldPrice ? `<span class="book-card__old-price">${formatPrice(book.oldPrice)}</span>` : ''}
            <span class="book-card__price">${formatPrice(book.price)}</span>
          </div>
          <div class="book-card__actions">
            <button class="book-card__btn book-card__btn--cart" onclick="addToCart(${book.id})" aria-label="Sepete ekle"><i class="fa-solid fa-cart-plus"></i></button>
            <button class="book-card__btn book-card__btn--fav ${inWishlist ? 'active' : ''}" data-wishlist="${book.id}" onclick="toggleWishlist(${book.id})" aria-label="Favorilere ekle"><i class="fa-${inWishlist ? 'solid' : 'regular'} fa-heart"></i></button>
          </div>
        </div>
      </div>
    </article>
  `;
}

/* ── Mobile Filter Drawer ── */
function initMobileFilter() {
  const toggle = $('#filterToggle');
  const sidebar = $('#sidebar');
  const close = $('#filterClose');
  if (toggle && sidebar) {
    toggle.addEventListener('click', () => sidebar.classList.add('active'));
  }
  if (close && sidebar) {
    close.addEventListener('click', () => sidebar.classList.remove('active'));
  }
}

/* ── Initialize ── */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  initSearch();
  initScrollTop();
  initReveal();
  initCounters();
  initNewsletter();
  initMobileFilter();
  updateCartBadge();
  updateWishlistBadge();

  const themeBtn = $('#themeToggle');
  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

  // Close modal on overlay click
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) closeQuickView();
  });
});

// admin-panel.js — Hanedan Sahaf Yönetici Paneli

/* ── Demo Data ── */
let adminBooks = JSON.parse(JSON.stringify(booksData));
let adminCategories = JSON.parse(JSON.stringify(categoriesData));
let adminOrders = [
  { id: 'HS-24001', customer: 'Ahmet Yılmaz', email: 'ahmet@mail.com', date: '2024-03-15', amount: 320, payment: 'Kredi Kartı', status: 'delivered', items: [{title:'Nutuk',qty:1,price:320}] },
  { id: 'HS-24002', customer: 'Elif Kaya', email: 'elif@mail.com', date: '2024-03-14', amount: 185, payment: 'Havale', status: 'shipped', items: [{title:'İstanbul Hatırası',qty:1,price:185}] },
  { id: 'HS-24003', customer: 'Mehmet Demir', email: 'mehmet@mail.com', date: '2024-03-14', amount: 245, payment: 'Kredi Kartı', status: 'preparing', items: [{title:'Sapiens',qty:1,price:245}] },
  { id: 'HS-24004', customer: 'Ayşe Şahin', email: 'ayse@mail.com', date: '2024-03-13', amount: 95, payment: 'Kapıda Ödeme', status: 'new', items: [{title:'Kürk Mantolu Madonna',qty:1,price:95}] },
  { id: 'HS-24005', customer: 'Can Yıldız', email: 'can@mail.com', date: '2024-03-12', amount: 410, payment: 'Kredi Kartı', status: 'cancelled', items: [{title:'Suç ve Ceza',qty:1,price:210},{title:'Yeraltından Notlar',qty:1,price:110}] },
  { id: 'HS-24006', customer: 'Zeynep Aydın', email: 'zeynep@mail.com', date: '2024-03-11', amount: 165, payment: 'Havale', status: 'delivered', items: [{title:'Felsefenin Kısa Tarihi',qty:1,price:165}] },
  { id: 'HS-24007', customer: 'Burak Özdemir', email: 'burak@mail.com', date: '2024-03-10', amount: 290, payment: 'Kredi Kartı', status: 'shipped', items: [{title:'Osmanlı İmparatorluğu Tarihi',qty:1,price:290}] },
  { id: 'HS-24008', customer: 'Selin Arslan', email: 'selin@mail.com', date: '2024-03-09', amount: 130, payment: 'Kapıda Ödeme', status: 'preparing', items: [{title:'Şiirler',qty:1,price:130}] }
];
let adminCustomers = [
  { name: 'Ahmet Yılmaz', email: 'ahmet@mail.com', date: '2023-06-12', orders: 5, spent: 1240 },
  { name: 'Elif Kaya', email: 'elif@mail.com', date: '2023-08-20', orders: 3, spent: 680 },
  { name: 'Mehmet Demir', email: 'mehmet@mail.com', date: '2024-01-05', orders: 2, spent: 450 },
  { name: 'Ayşe Şahin', email: 'ayse@mail.com', date: '2024-02-14', orders: 1, spent: 95 },
  { name: 'Can Yıldız', email: 'can@mail.com', date: '2023-11-30', orders: 4, spent: 890 }
];
let adminReviews = [
  { id: 1, book: 'İstanbul Hatırası', user: 'Ahmet Y.', rating: 5, text: 'Harika bir kitap!', date: '2024-03-15', status: 'approved' },
  { id: 2, book: 'Sapiens', user: 'Elif K.', rating: 4, text: 'Çok bilgilendirici.', date: '2024-03-14', status: 'pending' },
  { id: 3, book: 'Kürk Mantolu Madonna', user: 'Mehmet D.', rating: 5, text: 'Klasik bir eser.', date: '2024-03-13', status: 'approved' },
  { id: 4, book: 'Nutuk', user: 'Ayşe Ş.', rating: 5, text: 'Herkesin okuması gerekir.', date: '2024-03-12', status: 'pending' },
  { id: 5, book: 'Tutunamayanlar', user: 'Can Y.', rating: 4, text: 'Zor ama güzel.', date: '2024-03-11', status: 'approved' }
];
let adminCoupons = [
  { code: 'HANEDAN10', type: 'percent', amount: 10, min: 100, expiry: '2024-12-31', limit: 100, used: 23, active: true },
  { code: 'KITAP50', type: 'fixed', amount: 50, min: 200, expiry: '2024-06-30', limit: 50, used: 12, active: true },
  { code: 'WELCOME', type: 'percent', amount: 15, min: 0, expiry: '2024-12-31', limit: 200, used: 89, active: false }
];
let currentOrderFilter = 'all';

/* ── Auth ── */
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const user = document.getElementById('loginUser').value;
  const pass = document.getElementById('loginPass').value;
  if (user === 'admin' && pass === 'hanedan2024') {
    document.getElementById('adminLogin').style.display = 'none';
    document.getElementById('adminPanel').classList.add('active');
    initAdmin();
  } else {
    const card = document.querySelector('.admin-login__card');
    card.classList.add('animate-shake');
    setTimeout(() => card.classList.remove('animate-shake'), 500);
    showToast('Kullanıcı adı veya şifre hatalı.', 'error');
  }
});
function logout() {
  document.getElementById('adminPanel').classList.remove('active');
  document.getElementById('adminLogin').style.display = 'flex';
  document.getElementById('loginForm').reset();
}

/* ── Navigation ── */
document.querySelectorAll('.admin-sidebar__link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const section = this.dataset.section;
    document.querySelectorAll('.admin-sidebar__link').forEach(l => l.classList.remove('active'));
    this.classList.add('active');
    document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
    document.getElementById('sec-' + section).classList.add('active');
    const titles = { dashboard: 'Dashboard', books: 'Kitap Yönetimi', orders: 'Sipariş Yönetimi', customers: 'Müşteri Yönetimi', categories: 'Kategori Yönetimi', reviews: 'Yorum Yönetimi', coupons: 'Kupon Yönetimi', reports: 'Raporlar', settings: 'Ayarlar' };
    document.getElementById('pageTitle').textContent = titles[section] || section;
    if (window.innerWidth <= 768) document.getElementById('adminSidebar').classList.remove('active');
  });
});
document.getElementById('sidebarToggle')?.addEventListener('click', () => {
  document.getElementById('adminSidebar').classList.toggle('active');
});

/* ── Dashboard ── */
function initAdmin() {
  updateDashboard();
  renderBooks();
  renderOrders();
  renderCustomers();
  renderCategories();
  renderReviews();
  renderCoupons();
  generateReport();
  populateCategorySelect();
}
function updateDashboard() {
  const totalSales = adminOrders.filter(o => o.status !== 'cancelled').reduce((s, o) => s + o.amount, 0);
  document.getElementById('dashSales').textContent = formatPrice(totalSales);
  document.getElementById('dashOrders').textContent = adminOrders.length;
  document.getElementById('dashBooks').textContent = adminBooks.length;
  document.getElementById('dashUsers').textContent = adminCustomers.length;
  drawSalesChart();
  renderRecentOrders();
  renderTopBooks();
  renderLowStock();
}
function drawSalesChart() {
  const canvas = document.getElementById('salesChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
  const w = rect.width, h = rect.height;
  const data = [1200, 1850, 1400, 2100, 1750, 2300, 1950];
  const labels = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];
  const max = Math.max(...data) * 1.1;
  const barW = (w - 80) / data.length * 0.6;
  const gap = (w - 80) / data.length;
  ctx.clearRect(0, 0, w, h);
  // Grid
  ctx.strokeStyle = '#D4C5B0'; ctx.lineWidth = 0.5;
  for (let i = 0; i <= 4; i++) {
    const y = h - 40 - (i / 4) * (h - 60);
    ctx.beginPath(); ctx.moveTo(40, y); ctx.lineTo(w - 20, y); ctx.stroke();
  }
  // Bars
  data.forEach((val, i) => {
    const x = 50 + i * gap;
    const barH = (val / max) * (h - 60);
    const y = h - 40 - barH;
    const grad = ctx.createLinearGradient(0, y, 0, h - 40);
    grad.addColorStop(0, '#C9A84C'); grad.addColorStop(1, '#D4B76A');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(x - barW / 2, y, barW, barH, 4);
    ctx.fill();
    // Label
    ctx.fillStyle = '#6B5B4F'; ctx.font = '12px Lato'; ctx.textAlign = 'center';
    ctx.fillText(labels[i], x, h - 20);
    // Value
    ctx.fillStyle = '#2C1810'; ctx.font = 'bold 11px Lato';
    ctx.fillText('₺' + (val / 1000).toFixed(1) + 'k', x, y - 8);
  });
}
function renderRecentOrders() {
  const tbody = document.getElementById('recentOrders');
  tbody.innerHTML = adminOrders.slice(0, 5).map(o => `
    <tr><td>${o.id}</td><td>${o.customer}</td><td>${formatPrice(o.amount)}</td><td>${statusBadge(o.status)}</td></tr>
  `).join('');
}
function renderTopBooks() {
  const sales = {};
  adminOrders.filter(o => o.status !== 'cancelled').forEach(o => {
    o.items.forEach(it => { sales[it.title] = (sales[it.title] || 0) + it.qty; });
  });
  const sorted = Object.entries(sales).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const tbody = document.getElementById('topBooks');
  tbody.innerHTML = sorted.map(([title, qty]) => {
    const book = adminBooks.find(b => b.title === title);
    return `<tr><td>${title}</td><td>${qty}</td><td>${formatPrice((book ? book.price : 0) * qty)}</td></tr>`;
  }).join('') || '<tr><td colspan="3" style="text-align:center;">Henüz satış verisi yok</td></tr>';
}
function renderLowStock() {
  const low = adminBooks.filter(b => b.stock <= 3);
  const tbody = document.getElementById('lowStock');
  tbody.innerHTML = low.map(b => `
    <tr><td>${b.title}</td><td style="color:var(--color-burgundy);font-weight:700;">${b.stock}</td><td>${b.category}</td><td>${b.stock === 0 ? '<span class="status-badge status-badge--cancelled">Tükendi</span>' : '<span class="status-badge status-badge--preparing">Kritik</span>'}</td></tr>
  `).join('') || '<tr><td colspan="4" style="text-align:center;">Düşük stok uyarısı yok</td></tr>';
}

/* ── Books ── */
function populateCategorySelect() {
  const sel = document.getElementById('bCategory');
  const filter = document.getElementById('bookFilterCat');
  sel.innerHTML = adminCategories.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
  filter.innerHTML = '<option value="">Tüm Kategoriler</option>' + adminCategories.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
}
function renderBooks() {
  const search = document.getElementById('bookSearch').value.toLowerCase();
  const cat = document.getElementById('bookFilterCat').value;
  let filtered = adminBooks;
  if (search) filtered = filtered.filter(b => b.title.toLowerCase().includes(search) || b.author.toLowerCase().includes(search));
  if (cat) filtered = filtered.filter(b => b.category === cat);
  const tbody = document.getElementById('booksTable');
  tbody.innerHTML = filtered.map(b => `
    <tr>
      <td><div class="admin-table__img" style="background:${b.coverGradient || b.coverColor};display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.4);font-family:var(--font-heading);font-size:0.625rem;font-weight:700;">${b.title.charAt(0)}</div></td>
      <td><strong>${b.title}</strong></td>
      <td>${b.author}</td>
      <td><span class="badge badge--category">${b.category}</span></td>
      <td>${formatPrice(b.price)}</td>
      <td>${b.stock}</td>
      <td><span class="badge badge--condition-${b.condition.toLowerCase().replace(/\s/g,'')}">${b.condition}</span></td>
      <td>
        <div class="admin-table__actions">
          <button class="admin-table__btn admin-table__btn--edit" onclick="editBook(${b.id})" aria-label="Düzenle"><i class="fa-solid fa-pen"></i></button>
          <button class="admin-table__btn admin-table__btn--delete" onclick="deleteBook(${b.id})" aria-label="Sil"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('');
}
document.getElementById('bookSearch').addEventListener('input', renderBooks);
document.getElementById('bookFilterCat').addEventListener('change', renderBooks);
function openBookDrawer(id) {
  document.getElementById('bookDrawer').classList.add('active');
  document.body.style.overflow = 'hidden';
  if (id) {
    const b = adminBooks.find(x => x.id === id);
    document.getElementById('bookDrawerTitle').textContent = 'Kitap Düzenle';
    document.getElementById('bookId').value = b.id;
    document.getElementById('bTitle').value = b.title;
    document.getElementById('bAuthor').value = b.author;
    document.getElementById('bPublisher').value = b.publisher;
    document.getElementById('bIsbn').value = b.isbn;
    document.getElementById('bCategory').value = b.category;
    document.getElementById('bCondition').value = b.condition;
    document.getElementById('bYear').value = b.year;
    document.getElementById('bPages').value = b.pages;
    document.getElementById('bLang').value = b.language;
    document.getElementById('bStock').value = b.stock;
    document.getElementById('bPrice').value = b.price;
    document.getElementById('bOldPrice').value = b.oldPrice || '';
    document.getElementById('bDesc').value = b.description;
    document.getElementById('bColor').value = b.coverGradient || b.coverColor;
  } else {
    document.getElementById('bookDrawerTitle').textContent = 'Yeni Kitap Ekle';
    document.getElementById('bookForm').reset();
    document.getElementById('bookId').value = '';
  }
}
function closeBookDrawer() {
  document.getElementById('bookDrawer').classList.remove('active');
  document.body.style.overflow = '';
}
function saveBook() {
  const id = document.getElementById('bookId').value;
  const book = {
    id: id ? parseInt(id) : Math.max(...adminBooks.map(b => b.id)) + 1,
    title: document.getElementById('bTitle').value,
    author: document.getElementById('bAuthor').value,
    publisher: document.getElementById('bPublisher').value,
    isbn: document.getElementById('bIsbn').value,
    category: document.getElementById('bCategory').value,
    condition: document.getElementById('bCondition').value,
    year: parseInt(document.getElementById('bYear').value) || 2024,
    pages: parseInt(document.getElementById('bPages').value) || 0,
    language: document.getElementById('bLang').value,
    stock: parseInt(document.getElementById('bStock').value) || 1,
    price: parseFloat(document.getElementById('bPrice').value) || 0,
    oldPrice: parseFloat(document.getElementById('bOldPrice').value) || null,
    description: document.getElementById('bDesc').value,
    coverColor: document.getElementById('bColor').value || '#2C1810',
    coverGradient: document.getElementById('bColor').value.includes('gradient') ? document.getElementById('bColor').value : null,
    rating: 0, reviewCount: 0
  };
  if (id) {
    const idx = adminBooks.findIndex(b => b.id === parseInt(id));
    adminBooks[idx] = { ...adminBooks[idx], ...book };
    showToast('Kitap güncellendi');
  } else {
    adminBooks.push(book);
    showToast('Kitap eklendi');
  }
  closeBookDrawer();
  renderBooks();
  updateDashboard();
}
function editBook(id) { openBookDrawer(id); }
function deleteBook(id) {
  if (!confirm('Bu kitabı silmek istediğinize emin misiniz?')) return;
  adminBooks = adminBooks.filter(b => b.id !== id);
  renderBooks();
  updateDashboard();
  showToast('Kitap silindi', 'warning');
}

/* ── Orders ── */
function renderOrders() {
  let filtered = currentOrderFilter === 'all' ? adminOrders : adminOrders.filter(o => o.status === currentOrderFilter);
  const tbody = document.getElementById('ordersTable');
  tbody.innerHTML = filtered.map(o => `
    <tr>
      <td><strong>${o.id}</strong></td>
      <td>${o.customer}</td>
      <td>${o.date}</td>
      <td>${formatPrice(o.amount)}</td>
      <td>${o.payment}</td>
      <td>${statusBadge(o.status)}</td>
      <td>
        <div class="admin-table__actions">
          <button class="admin-table__btn" onclick="viewOrder('${o.id}')" aria-label="Görüntüle"><i class="fa-solid fa-eye"></i></button>
          <button class="admin-table__btn admin-table__btn--edit" onclick="updateOrderStatus('${o.id}')" aria-label="Durum güncelle"><i class="fa-solid fa-rotate"></i></button>
        </div>
      </td>
    </tr>
  `).join('');
}
function filterOrders(status) {
  currentOrderFilter = status;
  document.querySelectorAll('[data-status]').forEach(b => b.classList.toggle('active', b.dataset.status === status));
  renderOrders();
}
function statusBadge(status) {
  const map = { new: 'Yeni', preparing: 'Hazırlanıyor', shipped: 'Kargoda', delivered: 'Teslim', cancelled: 'İptal' };
  return '<span class="status-badge status-badge--' + status + '">' + map[status] + '</span>';
}
function viewOrder(id) {
  const o = adminOrders.find(x => x.id === id);
  const body = document.getElementById('orderModalBody');
  body.innerHTML = `
    <div style="margin-bottom:var(--space-lg);"><strong>Sipariş No:</strong> ${o.id}<br><strong>Müşteri:</strong> ${o.customer}<br><strong>E-posta:</strong> ${o.email}<br><strong>Tarih:</strong> ${o.date}</div>
    <h4 style="font-family:var(--font-heading);margin-bottom:var(--space-md);">Ürünler</h4>
    <div style="display:flex;flex-direction:column;gap:var(--space-sm);margin-bottom:var(--space-lg);">
      ${o.items.map(it => '<div style="display:flex;justify-content:space-between;padding:var(--space-sm);background:var(--color-beige);border-radius:var(--radius-sm);"><span>' + it.title + ' x' + it.qty + '</span><span>' + formatPrice(it.price * it.qty) + '</span></div>').join('')}
    </div>
    <div style="display:flex;justify-content:space-between;font-weight:700;font-size:var(--font-size-lg);"><span>Toplam</span><span>${formatPrice(o.amount)}</span></div>
    <div style="margin-top:var(--space-lg);">
      <label style="font-weight:600;margin-bottom:var(--space-sm);display:block;">Durum Güncelle</label>
      <select class="form-select" id="orderStatusSelect" onchange="saveOrderStatus('${o.id}',this.value)">
        <option value="new" ${o.status==='new'?'selected':''}>Yeni</option>
        <option value="preparing" ${o.status==='preparing'?'selected':''}>Hazırlanıyor</option>
        <option value="shipped" ${o.status==='shipped'?'selected':''}>Kargoda</option>
        <option value="delivered" ${o.status==='delivered'?'selected':''}>Teslim</option>
        <option value="cancelled" ${o.status==='cancelled'?'selected':''}>İptal</option>
      </select>
    </div>
  `;
  document.getElementById('orderModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeOrderModal() {
  document.getElementById('orderModal').classList.remove('active');
  document.body.style.overflow = '';
}
function updateOrderStatus(id) { viewOrder(id); }
function saveOrderStatus(id, status) {
  const o = adminOrders.find(x => x.id === id);
  o.status = status;
  renderOrders();
  showToast('Sipariş durumu güncellendi');
}

/* ── Customers ── */
function renderCustomers() {
  const search = document.getElementById('customerSearch').value.toLowerCase();
  let filtered = adminCustomers;
  if (search) filtered = filtered.filter(c => c.name.toLowerCase().includes(search) || c.email.toLowerCase().includes(search));
  const tbody = document.getElementById('customersTable');
  tbody.innerHTML = filtered.map(c => `
    <tr><td><strong>${c.name}</strong></td><td>${c.email}</td><td>${c.date}</td><td>${c.orders}</td><td>${formatPrice(c.spent)}</td>
    <td><div class="admin-table__actions"><button class="admin-table__btn" aria-label="Görüntüle"><i class="fa-solid fa-eye"></i></button></div></td></tr>
  `).join('');
}
document.getElementById('customerSearch').addEventListener('input', renderCustomers);

/* ── Categories ── */
function renderCategories() {
  const tbody = document.getElementById('categoriesTable');
  tbody.innerHTML = adminCategories.map(c => {
    const count = adminBooks.filter(b => b.category === c.name).length;
    return `<tr><td><i class="fa-solid ${c.icon}" style="color:var(--color-accent);margin-right:var(--space-sm);"></i>${c.name}</td><td>${count}</td><td><span class="status-badge status-badge--delivered">Aktif</span></td>
    <td><div class="admin-table__actions"><button class="admin-table__btn admin-table__btn--delete" onclick="deleteCategory('${c.id}')" aria-label="Sil"><i class="fa-solid fa-trash"></i></button></div></td></tr>`;
  }).join('');
}
function openCategoryModal() { document.getElementById('categoryModal').classList.add('active'); document.body.style.overflow = 'hidden'; }
function closeCategoryModal() { document.getElementById('categoryModal').classList.remove('active'); document.body.style.overflow = ''; }
function saveCategory() {
  const name = document.getElementById('catName').value;
  const icon = document.getElementById('catIcon').value;
  if (!name) return;
  adminCategories.push({ id: name.toLowerCase().replace(/\s/g,''), name: name, icon: icon, count: 0, color: '#C9A84C' });
  closeCategoryModal();
  renderCategories();
  populateCategorySelect();
  showToast('Kategori eklendi');
}
function deleteCategory(id) {
  if (!confirm('Bu kategoriyi silmek istediğinize emin misiniz?')) return;
  adminCategories = adminCategories.filter(c => c.id !== id);
  renderCategories();
  populateCategorySelect();
}

/* ── Reviews ── */
function renderReviews() {
  const tbody = document.getElementById('reviewsTable');
  tbody.innerHTML = adminReviews.map(r => `
    <tr>
      <td><input type="checkbox" class="review-check" value="${r.id}"></td>
      <td>${r.book}</td><td>${r.user}</td><td><span class="stars">${renderStars(r.rating)}</span></td>
      <td>${r.text}</td><td>${r.date}</td>
      <td>${r.status === 'approved' ? '<span class="status-badge status-badge--delivered">Onaylı</span>' : '<span class="status-badge status-badge--preparing">Beklemede</span>'}</td>
      <td><div class="admin-table__actions">
        <button class="admin-table__btn" onclick="approveReview(${r.id})" aria-label="Onayla"><i class="fa-solid fa-check"></i></button>
        <button class="admin-table__btn admin-table__btn--delete" onclick="rejectReview(${r.id})" aria-label="Reddet"><i class="fa-solid fa-times"></i></button>
      </div></td>
    </tr>
  `).join('');
}
function toggleAllReviews() {
  const checked = document.getElementById('selectAllReviews').checked;
  document.querySelectorAll('.review-check').forEach(c => c.checked = checked);
}
function approveReview(id) {
  const r = adminReviews.find(x => x.id === id);
  if (r) r.status = 'approved';
  renderReviews();
  showToast('Yorum onaylandı');
}
function rejectReview(id) {
  adminReviews = adminReviews.filter(r => r.id !== id);
  renderReviews();
  showToast('Yorum reddedildi', 'warning');
}
function bulkApprove() {
  document.querySelectorAll('.review-check:checked').forEach(c => {
    const r = adminReviews.find(x => x.id === parseInt(c.value));
    if (r) r.status = 'approved';
  });
  renderReviews();
  showToast('Seçilen yorumlar onaylandı');
}
function bulkReject() {
  const ids = Array.from(document.querySelectorAll('.review-check:checked')).map(c => parseInt(c.value));
  adminReviews = adminReviews.filter(r => !ids.includes(r.id));
  renderReviews();
  showToast('Seçilen yorumlar reddedildi', 'warning');
}

/* ── Coupons ── */
function renderCoupons() {
  const tbody = document.getElementById('couponsTable');
  tbody.innerHTML = adminCoupons.map(c => `
    <tr>
      <td><strong>${c.code}</strong></td>
      <td>${c.type === 'percent' ? '%' + c.amount : formatPrice(c.amount)}</td>
      <td>${formatPrice(c.min)}</td>
      <td>${c.expiry}</td>
      <td>${c.used}/${c.limit}</td>
      <td><label class="toggle"><input type="checkbox" ${c.active ? 'checked' : ''} onchange="toggleCoupon('${c.code}',this.checked)"><span class="toggle__slider"></span></label></td>
      <td><div class="admin-table__actions"><button class="admin-table__btn admin-table__btn--delete" onclick="deleteCoupon('${c.code}')" aria-label="Sil"><i class="fa-solid fa-trash"></i></button></div></td>
    </tr>
  `).join('');
}
function openCouponModal() { document.getElementById('couponModal').classList.add('active'); document.body.style.overflow = 'hidden'; }
function closeCouponModal() { document.getElementById('couponModal').classList.remove('active'); document.body.style.overflow = ''; }
function saveCoupon() {
  const code = document.getElementById('cpCode').value.toUpperCase();
  if (!code) return;
  adminCoupons.push({
    code: code, type: document.getElementById('cpType').value,
    amount: parseFloat(document.getElementById('cpAmount').value) || 0,
    min: parseFloat(document.getElementById('cpMin').value) || 0,
    expiry: document.getElementById('cpExpiry').value,
    limit: parseInt(document.getElementById('cpLimit').value) || 100,
    used: 0, active: true
  });
  closeCouponModal();
  renderCoupons();
  showToast('Kupon eklendi');
}
function toggleCoupon(code, active) {
  const c = adminCoupons.find(x => x.code === code);
  if (c) c.active = active;
}
function deleteCoupon(code) {
  if (!confirm('Bu kuponu silmek istediğinize emin misiniz?')) return;
  adminCoupons = adminCoupons.filter(c => c.code !== code);
  renderCoupons();
}

/* ── Reports ── */
function generateReport() {
  const totalSales = adminOrders.filter(o => o.status !== 'cancelled').reduce((s, o) => s + o.amount, 0);
  const validOrders = adminOrders.filter(o => o.status !== 'cancelled');
  document.getElementById('repSales').textContent = formatPrice(totalSales);
  document.getElementById('repOrders').textContent = validOrders.length;
  document.getElementById('repAvg').textContent = validOrders.length ? formatPrice(totalSales / validOrders.length) : '₺0';
  document.getElementById('repNew').textContent = adminCustomers.filter(c => c.date.startsWith('2024')).length;
  drawReportLineChart();
  drawReportPieChart();
}
function drawReportLineChart() {
  const canvas = document.getElementById('reportLineChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr; canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
  const w = rect.width, h = rect.height;
  const data = [800, 1200, 950, 1400, 1100, 1600, 1300, 1800, 1500, 1900, 1700, 2100];
  const labels = ['Oca','Şub','Mar','Nis','May','Haz','Tem','Ağu','Eyl','Eki','Kas','Ara'];
  const max = Math.max(...data) * 1.1;
  ctx.clearRect(0, 0, w, h);
  // Grid
  ctx.strokeStyle = '#D4C5B0'; ctx.lineWidth = 0.5;
  for (let i = 0; i <= 4; i++) {
    const y = h - 40 - (i / 4) * (h - 60);
    ctx.beginPath(); ctx.moveTo(40, y); ctx.lineTo(w - 20, y); ctx.stroke();
  }
  // Line
  ctx.strokeStyle = '#C9A84C'; ctx.lineWidth = 3; ctx.lineJoin = 'round';
  ctx.beginPath();
  data.forEach((val, i) => {
    const x = 50 + (i / (data.length - 1)) * (w - 80);
    const y = h - 40 - (val / max) * (h - 60);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  });
  ctx.stroke();
  // Fill
  ctx.fillStyle = 'rgba(201,168,76,0.1)';
  ctx.beginPath();
  data.forEach((val, i) => {
    const x = 50 + (i / (data.length - 1)) * (w - 80);
    const y = h - 40 - (val / max) * (h - 60);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  });
  ctx.lineTo(50 + (w - 80), h - 40); ctx.lineTo(50, h - 40); ctx.closePath(); ctx.fill();
  // Points
  data.forEach((val, i) => {
    const x = 50 + (i / (data.length - 1)) * (w - 80);
    const y = h - 40 - (val / max) * (h - 60);
    ctx.fillStyle = '#C9A84C'; ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(x, y, 2, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#6B5B4F'; ctx.font = '11px Lato'; ctx.textAlign = 'center';
    ctx.fillText(labels[i], x, h - 20);
  });
}
function drawReportPieChart() {
  const container = document.getElementById('reportPieChart');
  if (!container) return;
  const catCounts = {};
  adminBooks.forEach(b => { catCounts[b.category] = (catCounts[b.category] || 0) + 1; });
  const total = Object.values(catCounts).reduce((a, b) => a + b, 0);
  const colors = ['#C9A84C', '#6B1F2A', '#1F618D', '#D35400', '#1B2631', '#5B2C6F', '#E74C3C', '#27AE60'];
  let currentAngle = 0;
  let svg = '<svg viewBox="0 0 200 200" width="200" height="200">';
  Object.entries(catCounts).forEach(([cat, count], i) => {
    const angle = (count / total) * 360;
    const x1 = 100 + 80 * Math.cos((currentAngle * Math.PI) / 180);
    const y1 = 100 + 80 * Math.sin((currentAngle * Math.PI) / 180);
    const x2 = 100 + 80 * Math.cos(((currentAngle + angle) * Math.PI) / 180);
    const y2 = 100 + 80 * Math.sin(((currentAngle + angle) * Math.PI) / 180);
    const largeArc = angle > 180 ? 1 : 0;
    svg += '<path d="M100,100 L' + x1 + ',' + y1 + ' A80,80 0 ' + largeArc + ',1 ' + x2 + ',' + y2 + ' Z" fill="' + colors[i % colors.length] + '" stroke="#fff" stroke-width="2"/>';
    currentAngle += angle;
  });
  svg += '</svg>';
  // Legend
  let legend = '<div style="display:flex;flex-direction:column;gap:var(--space-sm);margin-left:var(--space-xl);">';
  Object.entries(catCounts).forEach(([cat, count], i) => {
    legend += '<div style="display:flex;align-items:center;gap:var(--space-sm);font-size:var(--font-size-sm);"><span style="width:12px;height:12px;border-radius:2px;background:' + colors[i % colors.length] + ';"></span>' + cat + ' (' + count + ')</div>';
  });
  legend += '</div>';
  container.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;">' + svg + legend + '</div>';
}

/* ── Settings ── */
function saveSettings() {
  showToast('Ayarlar kaydedildi');
}

/* ── Modal close on overlay ── */
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
    document.body.style.overflow = '';
  }
});

/* ── Init ── */
if (document.getElementById('adminPanel').classList.contains('active')) {
  initAdmin();
}

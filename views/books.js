// ===== Book Tracker hub — สถานะ/ความคืบหน้า + รีวิว + เป้าหมายการอ่าน (data: data/books.data.js) =====
window.BooksView = (function () {
  const DATA = window.BOOKS_DATA || { goals: {}, books: [] };
  const BOOKS = DATA.books || [];
  const GOALS = DATA.goals || {};

  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const fmtDate = d => { if (!d) return ''; const [y, m, day] = d.split('-'); return `${day}/${m}/${y.slice(2)}`; };
  const S = p => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const STATUS_LABEL = { want: 'อยากอ่าน', reading: 'กำลังอ่าน', done: 'อ่านจบ' };

  // ── state ──
  let root, activeTab = 'overview', libFilter = 'all';
  const $ = id => root.querySelector('#' + id);
  const bookById = id => BOOKS.find(b => b.id === id);

  const TEMPLATE = `
  <div class="container bk">
    <div id="bk-overview" class="bk-pane active"></div>
    <div id="bk-library" class="bk-pane"></div>
    <div id="bk-reviews" class="bk-pane"></div>
    <nav class="tabbar">
      <button class="bk-tab tab-item active" data-tab="overview">${S('<path d="M3 12l9-8 9 8"/><path d="M5 10v10h14V10"/>')}<span>ภาพรวม</span></button>
      <button class="bk-tab tab-item" data-tab="library">${S('<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>')}<span>คลัง</span></button>
      <button class="bk-tab tab-item" data-tab="reviews">${S('<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>')}<span>รีวิว</span></button>
    </nav>
  </div>

  <div class="overlay" id="bkOverlay">
    <div class="modal">
      <div class="sheet-handle"></div>
      <div class="modal-head">
        <div><div class="modal-title" id="bkMTitle"></div><div class="modal-sub" id="bkMSub"></div></div>
        <button class="modal-close" id="bkMClose"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
      </div>
      <div class="modal-body" id="bkMBody"></div>
    </div>
  </div>`;

  function initials(title) { return esc((title || '?').trim().slice(0, 1).toUpperCase()); }
  function coverTile(b, cls) {
    const img = b.cover ? `<img src="${esc(b.cover)}" alt="" onerror="this.remove()">` : '';
    return `<div class="bk-tile ${cls || ''}">${img}<span>${initials(b.title)}</span></div>`;
  }
  // เนื้อในปก (fallback อักษรย่อ + img ถ้ามี) — parent ต้อง position:relative;overflow:hidden เอง
  // ลำดับ DOM สำคัญ: fallback ต้องมาก่อน img (positioned element หลังสุดจะทับด้านบน) กัน fallback บังรูปจริง
  function coverArtInner(b, fallbackSize) {
    const fallback = `<div class="bk-cover-fallback"${fallbackSize ? ` style="font-size:${fallbackSize}"` : ''}>${initials(b.title)}</div>`;
    const img = b.cover ? `<img src="${esc(b.cover)}" alt="" onerror="this.remove()">` : '';
    return `${fallback}${img}`;
  }
  // ปกใหญ่แบบชั้นหนังสือ (คลัง) — สัดส่วนปกจริง 2:3 + badge สถานะซ้อนมุมล่างซ้าย
  function coverArt(b) {
    const pctB = progressPct(b);
    let badge = '';
    if (b.status === 'done') badge = `<span class="bk-cover-badge done">อ่านจบ</span>`;
    else if (b.status === 'reading') badge = `<span class="bk-cover-badge">${pctB}%</span>`;
    return `<div class="bk-cover-wrap">${coverArtInner(b)}${badge}</div>`;
  }
  // ปกเล็กในฮีโร่ (แถบ "กำลังอ่านตอนนี้")
  function heroCoverThumb(b) {
    return `<div class="bk-hero-cover" data-id="${esc(b.id)}">${coverArtInner(b, '1rem')}<span class="pct">${progressPct(b)}%</span></div>`;
  }
  function stars(n) {
    n = n || 0;
    let out = '';
    for (let i = 1; i <= 5; i++) out += `<span class="bk-star${i <= n ? ' on' : ''}">&#9733;</span>`;
    return `<span class="bk-stars">${out}</span>`;
  }
  // format: "ebook" (progressPct ตรงๆ ไม่มีเลขหน้า) | "physical" (คำนวณจาก currentPage/totalPages)
  function progressPct(b) {
    if (b.format === 'ebook') return Math.max(0, Math.min(100, b.progressPct || 0));
    return b.totalPages > 0 ? Math.min(100, Math.round((b.currentPage || 0) / b.totalPages * 100)) : 0;
  }
  function progressLabel(b) {
    if (b.format === 'ebook') return 'e-book';
    if (b.totalPages) return `หน้า ${b.currentPage || 0}/${b.totalPages}`;
    return '';
  }

  // ── overview ──
  function renderOverview() {
    const year = String(new Date().getFullYear());
    const target = GOALS[year] || 0;
    const doneThisYear = BOOKS.filter(b => b.status === 'done' && b.finishDate && b.finishDate.slice(0, 4) === year).length;
    const pct = target > 0 ? Math.min(100, Math.round(doneThisYear / target * 100)) : 0;
    const reading = BOOKS.filter(b => b.status === 'reading');
    const doneAll = BOOKS.filter(b => b.status === 'done');
    const rated = doneAll.filter(b => b.rating);
    const avgRating = rated.length ? (rated.reduce((s, b) => s + b.rating, 0) / rated.length) : 0;

    const readingRows = reading.map(b => {
      const pctB = progressPct(b);
      return `<div class="bk-spot" data-id="${esc(b.id)}">
        <div class="bk-spot-cover">${coverArtInner(b, '1.4rem')}</div>
        <div class="bk-spot-body">
          <div class="bk-spot-title">${esc(b.title)}</div>
          <div class="bk-spot-sub">${esc(b.author)}${progressLabel(b) ? ' · ' + progressLabel(b) : ''}</div>
          <div class="bk-spot-pct">${pctB}%</div>
          <div class="bk-bar"><div class="bk-bar-fill" style="width:${pctB}%"></div></div>
        </div>
      </div>`;
    }).join('');

    const RC = 42, RCIRC = 2 * Math.PI * RC;
    const ringOff = target > 0 ? RCIRC * (1 - pct / 100) : RCIRC;

    $('bk-overview').innerHTML = `
      <div class="hero bk-hero">
        <div class="hero-eyebrow center">เป้าหมายปี ${year}</div>
        <div class="bk-goal-ring-wrap">
          <svg viewBox="0 0 100 100" class="bk-goal-ring">
            <circle cx="50" cy="50" r="${RC}" fill="none" stroke="rgba(255,255,255,.14)" stroke-width="8"/>
            <circle cx="50" cy="50" r="${RC}" fill="none" stroke="var(--accent-bright)" stroke-width="8" stroke-linecap="round"
              stroke-dasharray="${RCIRC.toFixed(1)}" stroke-dashoffset="${ringOff.toFixed(1)}" transform="rotate(-90 50 50)"/>
          </svg>
          <div class="bk-goal-ring-center"><b data-count="${doneThisYear}" data-cdec="0">${doneThisYear}</b><span>/ ${target || '–'} เล่ม</span></div>
        </div>
        <div class="hero-cap center">${target > 0 ? `${pct}% ของเป้าหมาย` : 'เล่มที่อ่านจบปีนี้ · ยังไม่ได้ตั้งเป้าหมาย'}</div>
        <div class="hero-split">
          <div class="hero-cell"><div class="hero-cell-lab">กำลังอ่าน</div><div class="hero-cell-val">${reading.length}</div></div>
          <div class="hero-cell"><div class="hero-cell-lab">อ่านจบทั้งหมด</div><div class="hero-cell-val">${doneAll.length}</div></div>
          <div class="hero-cell"><div class="hero-cell-lab">คะแนนเฉลี่ย</div><div class="hero-cell-val">${avgRating ? avgRating.toFixed(1) : '–'}</div></div>
        </div>
        ${reading.length ? `<div class="bk-hero-shelf-wrap">
          <div class="bk-hero-shelf-lab">กำลังอ่านตอนนี้</div>
          <div class="bk-hero-shelf">${reading.map(heroCoverThumb).join('')}</div>
        </div>` : ''}
      </div>

      <div class="card">
        <div class="section-title">กำลังอ่าน</div>
        ${readingRows || '<div class="empty">ยังไม่มีเล่มที่กำลังอ่าน</div>'}
      </div>`;
    if (window.UIFX) window.UIFX.countAll($('bk-overview'));
  }

  // ── library (ชั้นหนังสือ — grid ปกใหญ่) ──
  function renderLibrary() {
    const list = libFilter === 'all' ? BOOKS : BOOKS.filter(b => b.status === libFilter);
    const sorted = [...list].sort((a, b) => (b.dateAdded || '').localeCompare(a.dateAdded || ''));
    const cards = sorted.map(b => `
      <div class="bk-cover-card" data-id="${esc(b.id)}">
        ${coverArt(b)}
        <div class="bk-cover-title">${esc(b.title)}</div>
        <div class="bk-cover-author">${esc(b.author)}</div>
      </div>`).join('');
    $('bk-library').innerHTML = `
      <div class="bk-filters">
        <button class="bk-chipbtn${libFilter === 'all' ? ' on' : ''}" data-filt="all">ทั้งหมด</button>
        <button class="bk-chipbtn${libFilter === 'want' ? ' on' : ''}" data-filt="want">อยากอ่าน</button>
        <button class="bk-chipbtn${libFilter === 'reading' ? ' on' : ''}" data-filt="reading">กำลังอ่าน</button>
        <button class="bk-chipbtn${libFilter === 'done' ? ' on' : ''}" data-filt="done">อ่านจบ</button>
      </div>
      <div class="section-title">ทั้งหมดในคลัง (${sorted.length} เล่ม)</div>
      <div class="bk-shelf">${cards || '<div class="empty">ยังไม่มีหนังสือในคลัง</div>'}</div>`;
    root.querySelectorAll('[data-filt]').forEach(b => b.onclick = () => { libFilter = b.dataset.filt; renderLibrary(); });
  }

  // ── reviews ──
  function renderReviews() {
    const done = [...BOOKS].filter(b => b.status === 'done').sort((a, b) => (b.finishDate || '').localeCompare(a.finishDate || ''));
    const rows = done.map(b => `
      <div class="bk-review" data-id="${esc(b.id)}">
        ${coverTile(b, 'bk-tile-lg')}
        <div class="bk-review-body">
          <div class="bk-row-title">${esc(b.title)}</div>
          <div class="bk-row-sub">${esc(b.author)} · อ่านจบ ${fmtDate(b.finishDate)}</div>
          ${stars(b.rating)}
          ${b.review ? `<div class="bk-review-text">${esc(b.review)}</div>` : ''}
        </div>
      </div>`).join('');
    $('bk-reviews').innerHTML = `<div class="card bk-list">${rows || '<div class="empty">ยังไม่มีเล่มที่อ่านจบ</div>'}</div>`;
  }

  // ── book detail modal ──
  function openBook(id) {
    const b = bookById(id); if (!b) return;
    $('bkMTitle').textContent = b.title;
    $('bkMSub').textContent = [b.author, b.genre].filter(Boolean).join(' · ');
    const pctB = progressPct(b);
    $('bkMBody').innerHTML = `
      <span class="chip bk-chip-${b.status}">${STATUS_LABEL[b.status] || b.status}</span>
      ${b.status !== 'want' ? `<div class="bk-bar" style="margin-top:12px"><div class="bk-bar-fill" style="width:${pctB}%"></div></div><div class="bk-msub">${progressLabel(b) ? progressLabel(b) + ' · ' : ''}${pctB}%</div>` : ''}
      <div class="modal-sec-title">กำหนดเวลา</div>
      <div class="bk-msub">${b.startDate ? 'เริ่มอ่าน ' + fmtDate(b.startDate) : 'ยังไม่เริ่มอ่าน'}${b.finishDate ? ' · อ่านจบ ' + fmtDate(b.finishDate) : ''}</div>
      ${b.status === 'done' ? `<div class="modal-sec-title">คะแนน &amp; รีวิว</div>${stars(b.rating)}${b.review ? `<div class="bk-review-text">${esc(b.review)}</div>` : '<div class="empty">ยังไม่มีรีวิว</div>'}` : ''}`;
    $('bkOverlay').classList.add('active');
  }
  function closeModal() {
    const o = $('bkOverlay'); o.classList.add('closing');
    setTimeout(() => o.classList.remove('active', 'closing'), 300);
  }

  // ── tabs ──
  function switchTab(tab) {
    activeTab = tab;
    root.querySelectorAll('.bk-tab').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
    root.querySelectorAll('.bk-pane').forEach(p => p.classList.toggle('active', p.id === 'bk-' + tab));
    if (tab === 'overview') renderOverview();
    else if (tab === 'library') renderLibrary();
    else if (tab === 'reviews') renderReviews();
  }

  function wire() {
    root.querySelectorAll('.bk-tab').forEach(b => b.onclick = () => switchTab(b.dataset.tab));
    root.addEventListener('click', e => {
      const c = e.target.closest('[data-id]'); if (c) openBook(c.dataset.id);
    });
    $('bkMClose').onclick = closeModal;
    $('bkOverlay').onclick = e => { if (e.target === $('bkOverlay')) closeModal(); };
  }

  function mount(el) {
    if (el.dataset.mounted) return;
    root = el; el.innerHTML = TEMPLATE; el.dataset.mounted = '1';
    wire(); switchTab('overview');
  }
  return { mount };
})();

// ===== Investment Tracker hub — สรุปข่าวการลงทุน/การเงินโลกรายวัน (data: data/investment.data.js) =====
window.InvestmentView = (function () {
  const DATA = window.INVESTMENT_DATA || { briefs: [] };
  const BRIEFS = DATA.briefs || [];

  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const fmtDate = d => { if (!d) return ''; const [y, m, day] = d.split('-'); return `${day}/${m}/${y.slice(2)}`; };
  const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const fmtMonth = ym => { const [y, m] = ym.split('-'); return `${MONTH_NAMES[parseInt(m, 10) - 1]} ${y}`; };
  const S = p => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const chevron = open => `<svg class="inv-month-chev${open ? ' open' : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>`;

  // ── state ──
  let root, activeTab = 'overview', archFilter = 'all', expandedMonths = null;
  const $ = id => root.querySelector('#' + id);
  const briefById = id => BRIEFS.find(b => b.id === id);
  const latestDate = () => BRIEFS.reduce((m, b) => (b.date > m ? b.date : m), BRIEFS[0] ? BRIEFS[0].date : '');

  const TEMPLATE = `
  <div class="container inv">
    <div id="inv-overview" class="inv-pane active"></div>
    <div id="inv-archive" class="inv-pane"></div>
    <nav class="tabbar">
      <button class="inv-tabbtn tab-item active" data-tab="overview">${S('<path d="M3 12l9-8 9 8"/><path d="M5 10v10h14V10"/>')}<span>Overview</span></button>
      <button class="inv-tabbtn tab-item" data-tab="archive">${S('<path d="M4 6h16M4 12h16M4 18h10"/>')}<span>Archive</span></button>
    </nav>
  </div>

  <div class="overlay" id="invOverlay">
    <div class="modal">
      <div class="sheet-handle"></div>
      <div class="modal-head">
        <div><div class="modal-title" id="invMTitle"></div><div class="modal-sub" id="invMSub"></div></div>
        <button class="modal-close" id="invMClose"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
      </div>
      <div class="modal-body" id="invMBody"></div>
    </div>
  </div>`;

  function tagChip(macro) {
    return `<span class="inv-tag ${macro ? 'macro' : 'company'}">${macro ? 'Macro' : 'Company'}</span>`;
  }

  function rowItem(b) {
    return `<div class="inv-row" data-id="${esc(b.id)}">
      <div class="inv-row-body">
        <div class="inv-row-title">${esc(b.title)}</div>
        <div class="inv-row-sub">${tagChip(b.macro)}<span class="inv-source">${esc(b.sourceName)}</span> · ${fmtDate(b.date)}</div>
      </div>
      <svg class="inv-row-arrow" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>
    </div>`;
  }

  // ── overview ──
  function renderOverview() {
    const ld = latestDate();
    const total = BRIEFS.length;
    const latest = BRIEFS.filter(b => b.date === ld);
    const sources = new Set(BRIEFS.map(b => b.sourceName).filter(Boolean)).size;

    $('inv-overview').innerHTML = `
      <div class="hero inv-hero">
        <div class="hero-eyebrow">Investment Briefs</div>
        <div class="hero-figure" data-count="${total}" data-cdec="0">${total}</div>
        <div class="hero-cap">${ld ? 'Latest: ' + fmtDate(ld) : 'No briefs yet'}</div>
        <div class="hero-split">
          <div class="hero-cell"><div class="hero-cell-lab">Latest Day</div><div class="hero-cell-val">${latest.length}</div></div>
          <div class="hero-cell"><div class="hero-cell-lab">Sources</div><div class="hero-cell-val">${sources}</div></div>
          <div class="hero-cell"><div class="hero-cell-lab">Total</div><div class="hero-cell-val">${total}</div></div>
        </div>
      </div>

      <div class="card inv-list">
        <div class="section-title">Latest Briefs</div>
        ${latest.map(rowItem).join('') || '<div class="empty">No briefs yet</div>'}
      </div>`;
    if (window.UIFX) window.UIFX.countAll($('inv-overview'));
  }

  // ── archive (grouped by month, collapsed except the newest month) ──
  function renderArchive() {
    const list = archFilter === 'all' ? BRIEFS : BRIEFS.filter(b => (archFilter === 'macro' ? b.macro : !b.macro));
    const months = [...new Set(list.map(b => b.date.slice(0, 7)))].sort((a, b) => b.localeCompare(a));
    if (expandedMonths === null) expandedMonths = new Set(months.slice(0, 1));

    const chips = [
      { k: 'all', l: 'All' }, { k: 'macro', l: 'Macro' }, { k: 'company', l: 'Company' }
    ].map(c => `<button class="inv-chipbtn${archFilter === c.k ? ' on' : ''}" data-filt="${c.k}">${c.l}</button>`).join('');

    const groups = months.map(ym => {
      const monthItems = list.filter(b => b.date.slice(0, 7) === ym);
      const open = expandedMonths.has(ym);
      const dates = [...new Set(monthItems.map(b => b.date))].sort((a, b) => b.localeCompare(a));
      const days = dates.map(d => {
        const items = monthItems.filter(b => b.date === d);
        return `<div class="inv-daygroup">
          <div class="inv-day-head">${fmtDate(d)}</div>
          <div class="card inv-list">${items.map(rowItem).join('')}</div>
        </div>`;
      }).join('');
      return `<div class="inv-monthgroup">
        <button class="inv-month-head" data-month="${ym}">
          <span>${fmtMonth(ym)}</span>
          <span class="inv-month-meta">${monthItems.length}${chevron(open)}</span>
        </button>
        <div class="inv-month-body"${open ? '' : ' hidden'}>${days}</div>
      </div>`;
    }).join('');

    $('inv-archive').innerHTML = `
      <div class="inv-filters">${chips}</div>
      ${groups || '<div class="empty">No briefs yet</div>'}`;
    root.querySelectorAll('[data-filt]').forEach(b => b.onclick = () => { archFilter = b.dataset.filt; renderArchive(); });
    root.querySelectorAll('[data-month]').forEach(b => b.onclick = () => {
      const ym = b.dataset.month;
      if (expandedMonths.has(ym)) expandedMonths.delete(ym); else expandedMonths.add(ym);
      renderArchive();
    });
  }

  // ── detail modal ──
  function openBrief(id) {
    const b = briefById(id); if (!b) return;
    $('invMTitle').textContent = b.title;
    $('invMSub').innerHTML = `${tagChip(b.macro)}<span class="inv-source">${esc(b.sourceName)}</span> · ${fmtDate(b.date)}`;
    $('invMBody').innerHTML = `
      <div class="inv-summary">${esc(b.summary)}</div>
      <a class="inv-open-btn" href="${esc(b.url)}" target="_blank" rel="noopener">Open Original &#8599;</a>`;
    $('invOverlay').classList.add('active');
  }
  function closeModal() {
    const o = $('invOverlay'); o.classList.add('closing');
    setTimeout(() => o.classList.remove('active', 'closing'), 300);
  }

  // ── tabs ──
  function switchTab(tab) {
    activeTab = tab;
    root.querySelectorAll('.inv-tabbtn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
    root.querySelectorAll('.inv-pane').forEach(p => p.classList.toggle('active', p.id === 'inv-' + tab));
    if (tab === 'overview') renderOverview();
    else if (tab === 'archive') renderArchive();
  }

  function wire() {
    root.querySelectorAll('.inv-tabbtn').forEach(b => b.onclick = () => switchTab(b.dataset.tab));
    root.addEventListener('click', e => {
      const c = e.target.closest('[data-id]'); if (c) openBrief(c.dataset.id);
    });
    $('invMClose').onclick = closeModal;
    $('invOverlay').onclick = e => { if (e.target === $('invOverlay')) closeModal(); };
  }

  function mount(el) {
    if (el.dataset.mounted) return;
    root = el; el.innerHTML = TEMPLATE; el.dataset.mounted = '1';
    wire(); switchTab('overview');
  }
  return { mount };
})();

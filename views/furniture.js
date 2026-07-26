// ===== Furniture & Decor checklist — ของที่ต้องซื้อ + งบ + ลำดับความสำคัญ (data: data/furniture.data.js) =====
window.FurnitureView = (function () {
  const DATA = window.FURNITURE_DATA || { budget: 0, items: [] };
  const ITEMS = DATA.items || [];
  const BUDGET = DATA.budget || 0;

  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const S = p => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const money = n => '฿' + Math.round(n || 0).toLocaleString('en-US');
  const fmtDate = d => { if (!d) return ''; const [y, m, day] = d.split('-'); return `${day}/${m}/${y.slice(2)}`; };

  const CAT_LABEL = { furniture: 'Furniture', decor: 'Decor', essentials: 'Essentials' };
  const PRIO_LABEL = { must: 'Must-have', nice: 'Nice to have', later: 'Later' };
  const PRIO_ORDER = ['must', 'nice', 'later'];
  // ราคาที่ใช้คิดยอด: ซื้อแล้วใช้ราคาจ่ายจริงถ้ามี ไม่งั้นใช้ราคาประมาณการ
  const cost = it => (it.status === 'bought' && it.paid) ? it.paid : (it.price || 0);

  const todo = () => ITEMS.filter(i => i.status !== 'bought');
  const bought = () => ITEMS.filter(i => i.status === 'bought');
  const sum = list => list.reduce((s, i) => s + cost(i), 0);

  // ── state ──
  let root, activeTab = 'overview', catFilter = 'all';
  const $ = id => root.querySelector('#' + id);
  const itemById = id => ITEMS.find(i => i.id === id);

  const TEMPLATE = `
  <div class="container fn">
    <div id="fn-overview" class="fn-pane active"></div>
    <div id="fn-list" class="fn-pane"></div>
    <div id="fn-bought" class="fn-pane"></div>
    <nav class="tabbar">
      <button class="fn-tab tab-item active" data-tab="overview">${S('<path d="M3 12l9-8 9 8"/><path d="M5 10v10h14V10"/>')}<span>Overview</span></button>
      <button class="fn-tab tab-item" data-tab="list">${S('<path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 6l1.2 1.2L7.5 5"/><path d="M4 12l1.2 1.2L7.5 10"/><path d="M4 18l1.2 1.2L7.5 16"/>')}<span>Checklist</span></button>
      <button class="fn-tab tab-item" data-tab="bought">${S('<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>')}<span>Bought</span></button>
    </nav>
  </div>

  <div class="overlay" id="fnOverlay">
    <div class="modal">
      <div class="sheet-handle"></div>
      <div class="modal-head">
        <div><div class="modal-title" id="fnMTitle"></div><div class="modal-sub" id="fnMSub"></div></div>
        <button class="modal-close" id="fnMClose"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
      </div>
      <div class="modal-body" id="fnMBody"></div>
    </div>
  </div>`;

  function prioChip(p) { return `<span class="chip fn-chip-${p}">${PRIO_LABEL[p] || p}</span>`; }

  // แถวรายการ — วงกลมสถานะ (ซื้อแล้ว = ติ๊ก) + ชื่อ + ราคา
  function row(it) {
    const done = it.status === 'bought';
    const meta = [CAT_LABEL[it.category] || it.category, it.shop].filter(Boolean).join(' · ');
    return `<div class="fn-row${done ? ' done' : ''}" data-id="${esc(it.id)}">
      <span class="fn-check">${done ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12.5l5 5L20 6.5"/></svg>' : ''}</span>
      <span class="fn-row-body">
        <span class="fn-row-title">${esc(it.name)}</span>
        <span class="fn-row-sub">${esc(meta)}${it.url ? ' · link' : ''}</span>
      </span>
      <span class="fn-row-price">${money(cost(it))}</span>
    </div>`;
  }

  // ── overview ──
  function renderOverview() {
    const left = todo(), got = bought();
    const estLeft = sum(left), spent = sum(got);
    const mustLeft = left.filter(i => i.priority === 'must');
    const totalPlan = spent + estLeft;
    const pctDone = ITEMS.length ? Math.round(got.length / ITEMS.length * 100) : 0;

    const upNext = [...left].sort((a, b) => PRIO_ORDER.indexOf(a.priority) - PRIO_ORDER.indexOf(b.priority) || cost(b) - cost(a)).slice(0, 5);

    const budgetCard = BUDGET > 0 ? (() => {
      const usedPct = Math.min(100, Math.round(spent / BUDGET * 100));
      const planPct = Math.min(100, Math.round(totalPlan / BUDGET * 100));
      const over = totalPlan > BUDGET;
      return `<div class="card">
        <div class="section-title">Budget</div>
        <div class="fn-budget-top"><span class="fn-budget-spent">${money(spent)}</span><span class="fn-budget-of">of ${money(BUDGET)}</span></div>
        <div class="fn-bar"><div class="fn-bar-plan" style="width:${planPct}%"></div><div class="fn-bar-fill" style="width:${usedPct}%"></div></div>
        <div class="fn-budget-legend">
          <span><i class="dot solid"></i>Spent ${usedPct}%</span>
          <span><i class="dot ghost"></i>Planned total ${money(totalPlan)}</span>
        </div>
        <div class="fn-budget-note${over ? ' over' : ''}">${over
          ? `Planned total is ${money(totalPlan - BUDGET)} over budget`
          : `${money(BUDGET - totalPlan)} left after buying everything on the list`}</div>
      </div>` ;
    })() : '';

    $('fn-overview').innerHTML = `
      <div class="hero">
        <div class="hero-eyebrow">Still to buy</div>
        <div class="hero-figure" data-count="${estLeft}" data-cprefix="฿" data-cdec="0">${money(estLeft)}</div>
        <div class="hero-cap">${left.length} item${left.length === 1 ? '' : 's'} left${got.length ? ` · ${got.length} bought (${pctDone}%)` : ''}</div>
        <div class="fn-hero-bar"><div class="fn-hero-bar-fill" style="width:${pctDone}%"></div></div>
        <div class="hero-split">
          <div class="hero-cell"><div class="hero-cell-lab">Spent</div><div class="hero-cell-val">${money(spent)}</div></div>
          <div class="hero-cell"><div class="hero-cell-lab">Must-have left</div><div class="hero-cell-val">${mustLeft.length}</div></div>
          <div class="hero-cell"><div class="hero-cell-lab">Planned total</div><div class="hero-cell-val">${money(totalPlan)}</div></div>
        </div>
      </div>

      ${budgetCard}

      <div class="card">
        <div class="section-title">Up Next</div>
        ${upNext.length ? upNext.map(it => `<div class="fn-next" data-id="${esc(it.id)}">
            <div class="fn-next-body">
              <div class="fn-row-title">${esc(it.name)}</div>
              <div class="fn-row-sub">${esc(CAT_LABEL[it.category] || it.category)}${it.note ? ' · ' + esc(it.note) : ''}</div>
            </div>
            <div class="fn-next-right">${prioChip(it.priority)}<div class="fn-row-price">${money(cost(it))}</div></div>
          </div>`).join('') : '<div class="empty">Nothing left to buy</div>'}
      </div>

      <div class="card">
        <div class="section-title">By Category</div>
        ${['furniture', 'decor', 'essentials'].map(c => {
          const all = ITEMS.filter(i => i.category === c);
          if (!all.length) return '';
          const done = all.filter(i => i.status === 'bought').length;
          const pct = Math.round(done / all.length * 100);
          return `<div class="fn-cat">
            <div class="fn-cat-head"><span>${CAT_LABEL[c]}</span><span class="fn-cat-num">${done}/${all.length}</span></div>
            <div class="fn-bar sm"><div class="fn-bar-fill" style="width:${pct}%"></div></div>
            <div class="fn-cat-sub">${money(sum(all.filter(i => i.status !== 'bought')))} left</div>
          </div>`;
        }).join('')}
      </div>`;
    if (window.UIFX) window.UIFX.countAll($('fn-overview'));
  }

  // ── checklist (ยังไม่ซื้อ — จัดกลุ่มตามลำดับความสำคัญ) ──
  function renderList() {
    const base = todo().filter(i => catFilter === 'all' || i.category === catFilter);
    const groups = PRIO_ORDER.map(p => {
      const list = base.filter(i => i.priority === p);
      if (!list.length) return '';
      const sorted = [...list].sort((a, b) => cost(b) - cost(a));
      return `<div class="card fn-group">
        <div class="fn-group-head">
          <div class="section-title" style="margin-bottom:0">${PRIO_LABEL[p]} (${sorted.length})</div>
          <div class="fn-group-sum">${money(sum(sorted))}</div>
        </div>
        ${sorted.map(row).join('')}
      </div>`;
    }).join('');

    const chips = [['all', 'All'], ['furniture', 'Furniture'], ['decor', 'Decor'], ['essentials', 'Essentials']]
      .map(([k, l]) => `<button class="fn-chipbtn${catFilter === k ? ' on' : ''}" data-filt="${k}">${l}</button>`).join('');

    $('fn-list').innerHTML = `
      <div class="fn-filters">${chips}</div>
      ${groups || '<div class="card"><div class="empty">Nothing left in this category</div></div>'}`;
    root.querySelectorAll('[data-filt]').forEach(b => b.onclick = () => { catFilter = b.dataset.filt; renderList(); });
  }

  // ── bought ──
  function renderBought() {
    const got = [...bought()].sort((a, b) => (b.dateBought || '').localeCompare(a.dateBought || ''));
    $('fn-bought').innerHTML = `
      <div class="card">
        <div class="fn-group-head">
          <div class="section-title" style="margin-bottom:0">Bought (${got.length})</div>
          <div class="fn-group-sum">${money(sum(got))}</div>
        </div>
        ${got.length ? got.map(it => `<div class="fn-row done" data-id="${esc(it.id)}">
            <span class="fn-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12.5l5 5L20 6.5"/></svg></span>
            <span class="fn-row-body">
              <span class="fn-row-title">${esc(it.name)}</span>
              <span class="fn-row-sub">${[CAT_LABEL[it.category] || it.category, it.shop, fmtDate(it.dateBought)].filter(Boolean).join(' · ')}</span>
            </span>
            <span class="fn-row-price">${money(cost(it))}</span>
          </div>`).join('') : '<div class="empty">Nothing bought yet</div>'}
      </div>`;
  }

  // ── detail modal ──
  function openItem(id) {
    const it = itemById(id); if (!it) return;
    $('fnMTitle').textContent = it.name;
    $('fnMSub').textContent = [CAT_LABEL[it.category] || it.category, PRIO_LABEL[it.priority] || it.priority].filter(Boolean).join(' · ');
    const done = it.status === 'bought';
    $('fnMBody').innerHTML = `
      <span class="chip fn-chip-${done ? 'bought' : 'todo'}">${done ? 'Bought' : 'To buy'}</span>
      ${prioChip(it.priority)}
      <div class="fn-price-block">
        <div><div class="fn-price-lab">${done ? 'Paid' : 'Estimated'}</div><div class="fn-price-val">${money(cost(it))}</div></div>
        ${done && it.paid && it.price ? `<div><div class="fn-price-lab">Estimated</div><div class="fn-price-val muted">${money(it.price)}</div></div>` : ''}
      </div>
      ${it.shop ? `<div class="modal-sec-title">Shop</div><div class="fn-msub">${esc(it.shop)}</div>` : ''}
      ${it.note ? `<div class="modal-sec-title">Note</div><div class="fn-note">${esc(it.note)}</div>` : ''}
      ${done && it.dateBought ? `<div class="modal-sec-title">Bought on</div><div class="fn-msub">${fmtDate(it.dateBought)}</div>` : ''}
      ${it.url ? `<a class="fn-link" href="${esc(it.url)}" target="_blank" rel="noopener">Open shop link</a>` : ''}`;
    $('fnOverlay').classList.add('active');
  }
  function closeModal() {
    const o = $('fnOverlay'); o.classList.add('closing');
    setTimeout(() => o.classList.remove('active', 'closing'), 300);
  }

  // ── tabs ──
  function switchTab(tab) {
    activeTab = tab;
    root.querySelectorAll('.fn-tab').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
    root.querySelectorAll('.fn-pane').forEach(p => p.classList.toggle('active', p.id === 'fn-' + tab));
    if (tab === 'overview') renderOverview();
    else if (tab === 'list') renderList();
    else renderBought();
  }

  function wire() {
    root.querySelectorAll('.fn-tab').forEach(b => b.onclick = () => switchTab(b.dataset.tab));
    root.addEventListener('click', e => {
      if (e.target.closest('.fn-chipbtn') || e.target.closest('.fn-link')) return;
      const c = e.target.closest('[data-id]'); if (c) openItem(c.dataset.id);
    });
    $('fnMClose').onclick = closeModal;
    $('fnOverlay').onclick = e => { if (e.target === $('fnOverlay')) closeModal(); };
  }

  function mount(el) {
    if (el.dataset.mounted) return;
    root = el; el.innerHTML = TEMPLATE; el.dataset.mounted = '1';
    wire(); switchTab('overview');
  }
  return { mount };
})();

// ===== Rent — furniture checklist + rent payments + deposit + landlord call log =====
// data: data/rent-furniture.data.js, data/rent-payments.data.js, data/rent-deposits.data.js, data/rent-calls.data.js
// สลิป/คลิปเสียงจริงไม่อยู่ในไฟล์เหล่านี้ (repo dashboard เป็น public) — อยู่ที่ Obsidian vault (private repo) แค่มี ref ชื่อไฟล์
window.RentView = (function () {
  const FURN = window.RENT_FURNITURE_DATA || { budget: 0, items: [] };
  const ITEMS = FURN.items || [];
  const BUDGET = FURN.budget || 0;
  const PAY = window.RENT_PAYMENTS_DATA || { rent: { amount: 0, dueDay: 0 }, history: [] };
  const RENT_CFG = PAY.rent || { amount: 0, dueDay: 0 };
  const PAY_HISTORY = PAY.history || [];
  const DEP = window.RENT_DEPOSITS_DATA || { items: [] };
  const DEP_ITEMS = DEP.items || [];
  const CALLS = window.RENT_CALLS_DATA || { items: [] };
  const CALL_ITEMS = CALLS.items || [];

  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const S = p => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const money = n => '฿' + Math.round(n || 0).toLocaleString('en-US');
  const fmtDate = d => { if (!d) return ''; const [y, m, day] = d.split('-'); return `${day}/${m}/${y.slice(2)}`; };
  const MONTH_TH = ['', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
  const fmtMonth = m => { if (!m) return ''; const [y, mo] = m.split('-').map(Number); return `${MONTH_TH[mo]} ${y}`; };
  const todayLocal = () => { const d = new Date(); return { y: d.getFullYear(), m: d.getMonth() + 1, day: d.getDate() }; };
  const monthKey = (y, m) => `${y}-${String(m).padStart(2, '0')}`;

  const CAT_LABEL = { furniture: 'Furniture', decor: 'Decor', essentials: 'Essentials' };
  const PRIO_LABEL = { must: 'Must-have', nice: 'Nice to have', later: 'Later' };
  const PRIO_ORDER = ['must', 'nice', 'later'];
  const cost = it => (it.status === 'bought' && it.paid) ? it.paid : (it.price || 0);
  const todoItems = () => ITEMS.filter(i => i.status !== 'bought');
  const boughtItems = () => ITEMS.filter(i => i.status === 'bought');
  const sum = list => list.reduce((s, i) => s + cost(i), 0);

  // ── state ──
  let root, activeTab = 'overview', catFilter = 'all', furnSub = 'list', callsOpen = false;
  const $ = id => root.querySelector('#' + id);
  const itemById = id => ITEMS.find(i => i.id === id);
  const payById = id => PAY_HISTORY.find(p => p.id === id);
  const depById = id => DEP_ITEMS.find(d => d.id === id);
  const callById = id => CALL_ITEMS.find(c => c.id === id);

  const TEMPLATE = `
  <div class="container rnt">
    <div id="rnt-overview" class="rnt-pane active"></div>
    <div id="rnt-furniture" class="rnt-pane"></div>
    <div id="rnt-payments" class="rnt-pane"></div>
    <div id="rnt-deposit" class="rnt-pane"></div>
    <nav class="tabbar">
      <button class="rnt-tab tab-item active" data-tab="overview">${S('<path d="M3 12l9-8 9 8"/><path d="M5 10v10h14V10"/>')}<span>Overview</span></button>
      <button class="rnt-tab tab-item" data-tab="furniture">${S('<path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 6l1.2 1.2L7.5 5"/><path d="M4 12l1.2 1.2L7.5 10"/><path d="M4 18l1.2 1.2L7.5 16"/>')}<span>Furniture</span></button>
      <button class="fab fab--dock" id="fab" aria-label="Quick capture">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
        <span class="fab-badge" id="fabBadge"></span>
      </button>
      <button class="rnt-tab tab-item" data-tab="payments">${S('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/>')}<span>Payments</span></button>
      <button class="rnt-tab tab-item" data-tab="deposit">${S('<path d="M12 3v18M6 8h9a3 3 0 0 1 0 6H9a3 3 0 0 0 0 6h9"/>')}<span>Deposit</span></button>
    </nav>
  </div>

  <div class="overlay" id="rntOverlay">
    <div class="modal">
      <div class="sheet-handle"></div>
      <div class="modal-head">
        <div><div class="modal-title" id="rntMTitle"></div><div class="modal-sub" id="rntMSub"></div></div>
        <button class="modal-close" id="rntMClose"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
      </div>
      <div class="modal-body" id="rntMBody"></div>
    </div>
  </div>`;

  function prioChip(p) { return `<span class="chip rnt-chip-${p}">${PRIO_LABEL[p] || p}</span>`; }
  function payStatusChip(s) {
    if (s === 'paid') return `<span class="chip rnt-chip-paid">Paid</span>`;
    if (s === 'late') return `<span class="chip rnt-chip-late">Late</span>`;
    return `<span class="chip rnt-chip-pending">Pending</span>`;
  }

  // ── this-month rent status (คำนวณสด ไม่ precompute) ──
  function thisMonthStatus() {
    if (!RENT_CFG.amount) return { configured: false };
    const t = todayLocal(), key = monthKey(t.y, t.m);
    const rec = PAY_HISTORY.find(h => h.month === key);
    if (rec && rec.status === 'paid') return { configured: true, status: 'paid', rec, key };
    const late = RENT_CFG.dueDay && t.day > RENT_CFG.dueDay;
    return { configured: true, status: late ? 'late' : 'pending', rec: rec || null, key, daysDiff: RENT_CFG.dueDay ? Math.abs(t.day - RENT_CFG.dueDay) : null };
  }

  // ── furniture row ──
  function furnRow(it) {
    const done = it.status === 'bought';
    const meta = [CAT_LABEL[it.category] || it.category, it.shop].filter(Boolean).join(' · ');
    return `<div class="rnt-row" data-kind="furn" data-id="${esc(it.id)}">
      <span class="rnt-check${done ? ' done' : ''}">${done ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12.5l5 5L20 6.5"/></svg>' : ''}</span>
      <span class="rnt-row-body">
        <span class="rnt-row-title${done ? ' done' : ''}">${esc(it.name)}</span>
        <span class="rnt-row-sub">${esc(meta)}${it.url ? ' · link' : ''}</span>
      </span>
      <span class="rnt-row-amt">${money(cost(it))}</span>
    </div>`;
  }

  // ── overview ──
  function renderOverview() {
    const left = todoItems(), got = boughtItems();
    const estLeft = sum(left), spent = sum(got);
    const depTotal = DEP_ITEMS.reduce((s, d) => s + (d.amount || 0), 0);
    const ms = thisMonthStatus();

    let heroBody;
    if (!ms.configured) {
      heroBody = `
        <div class="hero-eyebrow">ค่าเช่าเดือนนี้</div>
        <div class="hero-figure">—</div>
        <div class="hero-cap">ยังไม่ได้ตั้งค่าค่าเช่า — บอก Jarvis จำนวนเงิน+วันครบกำหนดจ่ายต่อเดือน</div>`;
    } else {
      const amt = ms.status === 'paid' ? (ms.rec.amountPaid || RENT_CFG.amount) : RENT_CFG.amount;
      const capText = ms.status === 'paid'
        ? `จ่ายแล้ว${ms.rec.datePaid ? ' ' + fmtDate(ms.rec.datePaid) : ''}`
        : ms.status === 'late'
          ? `เลยกำหนดจ่ายมา ${ms.daysDiff} วัน (ครบกำหนดวันที่ ${RENT_CFG.dueDay})`
          : (ms.daysDiff === 0 ? 'ครบกำหนดจ่ายวันนี้' : `ครบกำหนดอีก ${ms.daysDiff} วัน (วันที่ ${RENT_CFG.dueDay})`);
      heroBody = `
        <div class="hero-eyebrow">ค่าเช่าเดือนนี้ · ${payStatusChip(ms.status)}</div>
        <div class="hero-figure" data-count="${amt}" data-cprefix="฿" data-cdec="0">${money(amt)}</div>
        <div class="hero-cap">${capText}</div>`;
    }

    $('rnt-overview').innerHTML = `
      <div class="hero">
        ${heroBody}
        <div class="hero-split">
          <div class="hero-cell"><div class="hero-cell-lab">ของค้างซื้อ</div><div class="hero-cell-val">${left.length}</div></div>
          <div class="hero-cell"><div class="hero-cell-lab">ซื้อแล้ว</div><div class="hero-cell-val">${money(spent)}</div></div>
          <div class="hero-cell"><div class="hero-cell-lab">เงินมัดจำ</div><div class="hero-cell-val">${depTotal ? money(depTotal) : '—'}</div></div>
        </div>
      </div>

      <div class="card">
        <div class="section-title">Up Next</div>
        ${left.filter(i => i.next === true).length ? left.filter(i => i.next === true).map(it => `<div class="rnt-next" data-kind="furn" data-id="${esc(it.id)}">
            <div class="rnt-next-body">
              <div class="rnt-row-title">${esc(it.name)}</div>
              <div class="rnt-row-sub">${esc(CAT_LABEL[it.category] || it.category)}${it.shop ? ' · ' + esc(it.shop) : ''}</div>
            </div>
            <div class="rnt-next-right">${prioChip(it.priority)}<div class="rnt-row-amt">${money(cost(it))}</div></div>
          </div>`).join('') : '<div class="empty">ยังไม่ได้ปักของถัดไป</div>'}
      </div>

      <div class="card">
        <div class="section-title">By Category</div>
        ${['furniture', 'decor', 'essentials'].map(c => {
          const all = ITEMS.filter(i => i.category === c);
          if (!all.length) return '';
          const doneN = all.filter(i => i.status === 'bought').length;
          const pct = Math.round(doneN / all.length * 100);
          return `<div class="rnt-cat">
            <div class="rnt-cat-head"><span>${CAT_LABEL[c]}</span><span class="rnt-cat-num">${doneN}/${all.length}</span></div>
            <div class="rnt-bar sm"><div class="rnt-bar-fill" style="width:${pct}%"></div></div>
          </div>`;
        }).join('')}
      </div>`;
    if (window.UIFX) window.UIFX.countAll($('rnt-overview'));
  }

  // ── furniture tab (checklist / bought toggle) ──
  function renderFurniture() {
    const toggle = `<div class="rnt-toggle">
      <button class="${furnSub === 'list' ? 'on' : ''}" data-furnsub="list">Checklist</button>
      <button class="${furnSub === 'bought' ? 'on' : ''}" data-furnsub="bought">Bought</button>
    </div>`;

    let body;
    if (furnSub === 'list') {
      const base = todoItems().filter(i => catFilter === 'all' || i.category === catFilter);
      const groups = PRIO_ORDER.map(p => {
        const list = base.filter(i => i.priority === p);
        if (!list.length) return '';
        const sorted = [...list].sort((a, b) => cost(b) - cost(a));
        return `<div class="card rnt-group">
          <div class="rnt-group-head"><div class="section-title" style="margin-bottom:0">${PRIO_LABEL[p]} (${sorted.length})</div><div class="rnt-group-sum">${money(sum(sorted))}</div></div>
          ${sorted.map(furnRow).join('')}
        </div>`;
      }).join('');
      const chips = [['all', 'All'], ['furniture', 'Furniture'], ['decor', 'Decor'], ['essentials', 'Essentials']]
        .map(([k, l]) => `<button class="rnt-chipbtn${catFilter === k ? ' on' : ''}" data-filt="${k}">${l}</button>`).join('');
      const budgetCard = BUDGET > 0 ? (() => {
        const spent = sum(boughtItems()), totalPlan = spent + sum(todoItems());
        const usedPct = Math.min(100, Math.round(spent / BUDGET * 100));
        const over = totalPlan > BUDGET;
        return `<div class="card">
          <div class="section-title">Budget</div>
          <div class="rnt-budget-top"><span class="rnt-budget-spent">${money(spent)}</span><span class="rnt-budget-of">of ${money(BUDGET)}</span></div>
          <div class="rnt-bar"><div class="rnt-bar-fill" style="width:${usedPct}%"></div></div>
          <div class="rnt-budget-note${over ? ' over' : ''}">${over ? `เกินงบ ${money(totalPlan - BUDGET)}` : `เหลือ ${money(BUDGET - totalPlan)} ถ้าซื้อครบทุกชิ้นในลิสต์`}</div>
        </div>`;
      })() : '';
      body = `${budgetCard}<div class="rnt-filters">${chips}</div>${groups || '<div class="card"><div class="empty">ไม่มีของในหมวดนี้</div></div>'}`;
    } else {
      const got = [...boughtItems()].sort((a, b) => (b.dateBought || '').localeCompare(a.dateBought || ''));
      body = `<div class="card">
        <div class="rnt-group-head"><div class="section-title" style="margin-bottom:0">Bought (${got.length})</div><div class="rnt-group-sum">${money(sum(got))}</div></div>
        ${got.length ? got.map(it => `<div class="rnt-row" data-kind="furn" data-id="${esc(it.id)}">
            <span class="rnt-check done"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12.5l5 5L20 6.5"/></svg></span>
            <span class="rnt-row-body"><span class="rnt-row-title done">${esc(it.name)}</span><span class="rnt-row-sub">${[CAT_LABEL[it.category] || it.category, it.shop, fmtDate(it.dateBought)].filter(Boolean).join(' · ')}</span></span>
            <span class="rnt-row-amt">${money(cost(it))}</span>
          </div>`).join('') : '<div class="empty">ยังไม่มีของที่ซื้อแล้ว</div>'}
      </div>`;
    }

    $('rnt-furniture').innerHTML = toggle + body;
    root.querySelectorAll('[data-furnsub]').forEach(b => b.onclick = () => { furnSub = b.dataset.furnsub; renderFurniture(); });
    root.querySelectorAll('[data-filt]').forEach(b => b.onclick = () => { catFilter = b.dataset.filt; renderFurniture(); });
  }

  // ── payments tab ──
  function renderPayments() {
    const ms = thisMonthStatus();
    const cfgCard = `<div class="card">
      <div class="section-title">ค่าเช่ารายเดือน</div>
      ${RENT_CFG.amount ? `<div class="rnt-budget-top"><span class="rnt-budget-spent">${money(RENT_CFG.amount)}</span><span class="rnt-budget-of">ครบกำหนดทุกวันที่ ${RENT_CFG.dueDay}</span></div>${RENT_CFG.note ? `<div class="rnt-note">${esc(RENT_CFG.note)}</div>` : ''}`
        : '<div class="empty">ยังไม่ได้ตั้งค่า — บอก Jarvis จำนวนเงิน+วันครบกำหนดจ่ายต่อเดือน</div>'}
    </div>`;

    const sorted = [...PAY_HISTORY].sort((a, b) => b.month.localeCompare(a.month));
    const historyCard = `<div class="card">
      <div class="section-title">ประวัติการจ่าย</div>
      ${sorted.length ? sorted.map(p => `<div class="rnt-row" data-kind="pay" data-id="${esc(p.id)}">
          <span class="rnt-pay-month">${esc(fmtMonth(p.month))}</span>
          <span class="rnt-row-body"><span class="rnt-row-title">${money(p.amountPaid || p.amountDue)}</span><span class="rnt-row-sub">${p.datePaid ? 'จ่าย ' + fmtDate(p.datePaid) : 'ยังไม่จ่าย'}</span></span>
          ${payStatusChip(p.status)}
        </div>`).join('') : `<div class="empty">${ms.configured ? 'ยังไม่มีประวัติการจ่าย' : 'ตั้งค่าเช่าก่อนถึงจะเริ่มบันทึกได้'}</div>`}
    </div>`;

    $('rnt-payments').innerHTML = cfgCard + historyCard;
  }

  // ── deposit tab (+ call log ท้ายแท็บ ไม่เด่น) ──
  function renderDeposit() {
    const total = DEP_ITEMS.reduce((s, d) => s + (d.amount || 0), 0);
    const depCard = `<div class="card">
      <div class="section-title">เงินมัดจำ</div>
      ${DEP_ITEMS.length ? `<div class="rnt-budget-top"><span class="rnt-budget-spent">${money(total)}</span><span class="rnt-budget-of">รวมทั้งหมด</span></div>` : ''}
      ${DEP_ITEMS.length ? DEP_ITEMS.map(d => `<div class="rnt-row" data-kind="dep" data-id="${esc(d.id)}">
          <span class="rnt-row-body"><span class="rnt-row-title">${esc(d.label)}</span><span class="rnt-row-sub">${d.datePaid ? 'จ่าย ' + fmtDate(d.datePaid) : ''}</span></span>
          <span class="chip ${d.refunded ? 'rnt-chip-paid' : d.refundable ? 'rnt-chip-pending' : 'rnt-chip-late'}">${d.refunded ? 'คืนแล้ว' : d.refundable ? 'คืนได้' : 'ไม่คืน'}</span>
        </div>`).join('') : '<div class="empty">ยังไม่มีข้อมูลเงินมัดจำ</div>'}
    </div>`;

    const callsToggle = `<div class="rnt-calls-toggle" id="rntCallsToggle">บันทึกการโทรกับเจ้าของห้อง (${CALL_ITEMS.length}) <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="transform:rotate(${callsOpen ? '180' : '0'}deg)"><path d="M6 9l6 6 6-6"/></svg></div>`;
    const callsList = callsOpen ? `<div class="rnt-calls-list">
        ${CALL_ITEMS.length ? CALL_ITEMS.slice().sort((a, b) => b.date.localeCompare(a.date)).map(c => `<div class="rnt-call-row" data-kind="call" data-id="${esc(c.id)}">
            <span class="rnt-call-date">${fmtDate(c.date)}</span><span class="rnt-call-topic">${esc(c.topic || '(ไม่มีหัวข้อ)')}</span>
          </div>`).join('') : '<div class="empty">ยังไม่มีบันทึก</div>'}
      </div>` : '';

    $('rnt-deposit').innerHTML = depCard + `<div class="rnt-calls-wrap">${callsToggle}${callsList}</div>`;
    $('rntCallsToggle').onclick = () => { callsOpen = !callsOpen; renderDeposit(); };
  }

  // ── detail modals ──
  function openFurn(id) {
    const it = itemById(id); if (!it) return;
    const done = it.status === 'bought';
    $('rntMTitle').textContent = it.name;
    $('rntMSub').textContent = [CAT_LABEL[it.category] || it.category, PRIO_LABEL[it.priority] || it.priority].filter(Boolean).join(' · ');
    $('rntMBody').innerHTML = `
      <span class="chip ${done ? 'rnt-chip-paid' : 'rnt-chip-pending'}">${done ? 'Bought' : 'To buy'}</span>${prioChip(it.priority)}
      <div class="rnt-price-block">
        <div><div class="rnt-price-lab">${done ? 'Paid' : 'Estimated'}</div><div class="rnt-price-val">${money(cost(it))}</div></div>
        ${done && it.paid && it.price ? `<div><div class="rnt-price-lab">Estimated</div><div class="rnt-price-val muted">${money(it.price)}</div></div>` : ''}
      </div>
      ${it.shop ? `<div class="modal-sec-title">Shop</div><div class="rnt-msub">${esc(it.shop)}</div>` : ''}
      ${it.note ? `<div class="modal-sec-title">Note</div><div class="rnt-note">${esc(it.note)}</div>` : ''}
      ${done && it.dateBought ? `<div class="modal-sec-title">Bought on</div><div class="rnt-msub">${fmtDate(it.dateBought)}</div>` : ''}
      ${it.url ? `<a class="rnt-link" href="${esc(it.url)}" target="_blank" rel="noopener">Open shop link</a>` : ''}`;
    $('rntOverlay').classList.add('active');
  }
  function openPay(id) {
    const p = payById(id); if (!p) return;
    $('rntMTitle').textContent = fmtMonth(p.month);
    $('rntMSub').textContent = 'ค่าเช่า';
    $('rntMBody').innerHTML = `
      ${payStatusChip(p.status)}
      <div class="rnt-price-block">
        <div><div class="rnt-price-lab">ยอดที่ต้องจ่าย</div><div class="rnt-price-val">${money(p.amountDue)}</div></div>
        ${p.amountPaid ? `<div><div class="rnt-price-lab">จ่ายจริง</div><div class="rnt-price-val">${money(p.amountPaid)}</div></div>` : ''}
      </div>
      ${p.datePaid ? `<div class="modal-sec-title">วันที่จ่าย</div><div class="rnt-msub">${fmtDate(p.datePaid)}</div>` : ''}
      ${p.slipRef ? `<div class="modal-sec-title">สลิป</div><div class="rnt-msub">เก็บไว้ที่ vault: ${esc(p.slipRef)}</div>` : ''}
      ${p.note ? `<div class="modal-sec-title">Note</div><div class="rnt-note">${esc(p.note)}</div>` : ''}`;
    $('rntOverlay').classList.add('active');
  }
  function openDep(id) {
    const d = depById(id); if (!d) return;
    $('rntMTitle').textContent = d.label;
    $('rntMSub').textContent = 'เงินมัดจำ';
    $('rntMBody').innerHTML = `
      <span class="chip ${d.refunded ? 'rnt-chip-paid' : d.refundable ? 'rnt-chip-pending' : 'rnt-chip-late'}">${d.refunded ? 'คืนแล้ว' : d.refundable ? 'คืนได้' : 'ไม่คืน'}</span>
      <div class="rnt-price-block">
        <div><div class="rnt-price-lab">จำนวนเงิน</div><div class="rnt-price-val">${money(d.amount)}</div></div>
        ${d.refunded && d.refundAmount ? `<div><div class="rnt-price-lab">คืนจริง</div><div class="rnt-price-val">${money(d.refundAmount)}</div></div>` : ''}
      </div>
      ${d.datePaid ? `<div class="modal-sec-title">วันที่จ่าย</div><div class="rnt-msub">${fmtDate(d.datePaid)}</div>` : ''}
      ${d.refundDate ? `<div class="modal-sec-title">วันที่คืน</div><div class="rnt-msub">${fmtDate(d.refundDate)}</div>` : ''}
      ${d.slipRef ? `<div class="modal-sec-title">สลิป</div><div class="rnt-msub">เก็บไว้ที่ vault: ${esc(d.slipRef)}</div>` : ''}
      ${d.note ? `<div class="modal-sec-title">Note</div><div class="rnt-note">${esc(d.note)}</div>` : ''}`;
    $('rntOverlay').classList.add('active');
  }
  function openCall(id) {
    const c = callById(id); if (!c) return;
    $('rntMTitle').textContent = c.topic || 'บันทึกการโทร';
    $('rntMSub').textContent = fmtDate(c.date);
    $('rntMBody').innerHTML = `
      ${c.vaultFile ? `<div class="modal-sec-title">คลิปเสียง</div><div class="rnt-msub">เก็บไว้ที่ vault: ${esc(c.vaultFile)}</div>` : '<div class="empty">ไม่มีการอัดเสียงครั้งนี้</div>'}
      ${c.note ? `<div class="modal-sec-title">สรุป</div><div class="rnt-note">${esc(c.note)}</div>` : ''}`;
    $('rntOverlay').classList.add('active');
  }
  function closeModal() {
    const o = $('rntOverlay'); o.classList.add('closing');
    setTimeout(() => o.classList.remove('active', 'closing'), 300);
  }

  // ── tabs ──
  function switchTab(tab) {
    activeTab = tab;
    root.querySelectorAll('.rnt-tab').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
    root.querySelectorAll('.rnt-pane').forEach(p => p.classList.toggle('active', p.id === 'rnt-' + tab));
    if (tab === 'overview') renderOverview();
    else if (tab === 'furniture') renderFurniture();
    else if (tab === 'payments') renderPayments();
    else renderDeposit();
  }

  function wire() {
    root.querySelectorAll('.rnt-tab').forEach(b => b.onclick = () => switchTab(b.dataset.tab));
    root.addEventListener('click', e => {
      if (e.target.closest('.rnt-chipbtn') || e.target.closest('.rnt-link') || e.target.closest('[data-furnsub]') || e.target.closest('#rntCallsToggle')) return;
      const c = e.target.closest('[data-id]'); if (!c) return;
      const kind = c.dataset.kind;
      if (kind === 'furn') openFurn(c.dataset.id);
      else if (kind === 'pay') openPay(c.dataset.id);
      else if (kind === 'dep') openDep(c.dataset.id);
      else if (kind === 'call') openCall(c.dataset.id);
    });
    $('rntMClose').onclick = closeModal;
    $('rntOverlay').onclick = e => { if (e.target === $('rntOverlay')) closeModal(); };
  }

  function mount(el) {
    if (el.dataset.mounted) return;
    root = el; el.innerHTML = TEMPLATE; el.dataset.mounted = '1';
    wire(); switchTab('overview');
  }
  return { mount };
})();

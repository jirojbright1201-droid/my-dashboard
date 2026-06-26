// ===== Money hub — ภาพรวมเงินทั้งหมด: รายรับ/จ่าย/งบ + โหลเงิน (data: data/money.data.js) =====
window.MoneyView = (function () {
  const DATA = window.MONEY_DATA || {};
  const KEYS = window.MONEY_KEYS || [];
  const SUBS = (window.SUBS_DATA && window.SUBS_DATA.subs) || [];

  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const fmtMoney = n => '฿' + Number(n || 0).toLocaleString('en-US');
  const fmtDate = d => { const [, m, day] = (d || '').split('-'); return `${day}/${m}`; };
  const THMONTH = ['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'];
  const monthLabel = k => { const [y, m] = k.split('-').map(Number); return `${THMONTH[m - 1]} ${y}`; };

  // ── line-icon set (สไตล์เดียวกับ Planner) ──
  const S = p => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const CAT_ICON = {
    Restaurant:    S('<path d="M4 12h16"/><path d="M5 12a7 7 0 0 0 14 0"/><path d="M9 3c0 1.2-1 1.2-1 2.4S9 6.6 9 7.8"/><path d="M13 3c0 1.2-1 1.2-1 2.4s1 1.2 1 2.4"/>'),
    Family:        S('<circle cx="9" cy="8" r="2.6"/><circle cx="16.5" cy="9" r="2.1"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0"/><path d="M14.5 19a4 4 0 0 1 6-3.2"/>'),
    Subscriptions: S('<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18"/><path d="M7 15h4"/>'),
    Rent:          S('<path d="M4 11l8-6 8 6"/><path d="M6 10v9h12v-9"/><path d="M10 19v-5h4v5"/>'),
    Investment:    S('<path d="M4 18l5-5 4 3 7-8"/><path d="M16 8h5v5"/>'),
    Shopping:      S('<path d="M6 8h12l-1 12H7z"/><path d="M9 8a3 3 0 0 1 6 0"/>'),
    Books:         S('<path d="M5 4h11a2 2 0 0 1 2 2v13H7a2 2 0 0 0-2 2z"/><path d="M5 19a2 2 0 0 1 2-2h11"/>'),
    Transport:     S('<path d="M5 13l1.4-4.2A2 2 0 0 1 8.3 7.4h7.4a2 2 0 0 1 1.9 1.4L19 13"/><path d="M4 13h16v4H4z"/><circle cx="7.5" cy="17.5" r="1.2"/><circle cx="16.5" cy="17.5" r="1.2"/>'),
    Beauty:        S('<path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z"/><path d="M18.5 14l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/>'),
    Entertainment: S('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M10 9l5 3-5 3z"/>'),
    Study:         S('<path d="M3 9l9-4 9 4-9 4z"/><path d="M7 11.5V16c0 1 2.2 2 5 2s5-1 5-2v-4.5"/>'),
    Emergency:     S('<path d="M12 4l9 16H3z"/><path d="M12 10v4"/><path d="M12 17h.01"/>'),
    default:       S('<rect x="5" y="3" width="14" height="18" rx="1.5"/><path d="M8 8h8M8 12h8M8 16h5"/>')
  };
  const SRC_ICON = {
    Salary: S('<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7"/><path d="M3 12h18"/>'),
    Other:  S('<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v8h14v-8M12 8v12"/><path d="M12 8C9.5 8 8.5 4.5 10.2 4.5S12 8 12 8s.1-3.5 1.8-3.5S14.5 8 12 8z"/>')
  };
  const PALETTE = ['#cc785c','#d99e3a','#5a9e6f','#c2604a','#caa45a','#8c7a6b','#b5854a','#9a9488'];
  const catSvg = c => CAT_ICON[c] || CAT_ICON.default;
  const catTile = c => `<div class="mny-tile">${catSvg(c)}</div>`;
  const srcTile = s => `<div class="mny-tile">${SRC_ICON[s] || SRC_ICON.Other}</div>`;

  // ── state ──
  let root, monthIdx = 0, activeTab = 'overview', txKind = 'expense';
  const $ = id => root.querySelector('#' + id);
  const cur = () => DATA[KEYS[monthIdx]] || { budget: {}, income: [], expenses: [] };

  const TEMPLATE = `
  <div class="container mny">
    <div class="mny-monthbar">
      <button class="mny-chev" data-mnav="-1" aria-label="ก่อนหน้า">&#8249;</button>
      <span class="mny-month" id="mnyMonth"></span>
      <button class="mny-chev" data-mnav="1" aria-label="ถัดไป">&#8250;</button>
    </div>
    <div class="mny-tabs">
      <button class="mny-tab active" data-tab="overview">ภาพรวม</button>
      <button class="mny-tab" data-tab="tx">รายการ</button>
      <button class="mny-tab" data-tab="subs">ประจำ</button>
      <button class="mny-tab" data-tab="savings">โหลเงิน</button>
    </div>
    <div id="mny-overview" class="mny-pane active"></div>
    <div id="mny-tx" class="mny-pane"></div>
    <div id="mny-subs" class="mny-pane"></div>
    <div id="mny-savings" class="mny-pane"></div>
  </div>

  <div class="overlay" id="mnyOverlay">
    <div class="modal">
      <div class="sheet-handle"></div>
      <div class="modal-head">
        <div><div class="modal-title" id="mnyMTitle"></div><div class="modal-sub" id="mnyMSub"></div></div>
        <button class="modal-close" id="mnyMClose"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
      </div>
      <div class="modal-body" id="mnyMBody"></div>
    </div>
  </div>`;

  // ── overview ──
  function spentByCat(expenses) {
    const m = {}; expenses.forEach(e => m[e.category] = (m[e.category] || 0) + e.amount); return m;
  }

  function donutCSS(pairs, total) {
    if (!total) return 'conic-gradient(var(--surface-3) 0 100%)';
    let acc = 0;
    const stops = pairs.map(([, val], i) => {
      const a = acc / total * 100; acc += val; const b = acc / total * 100;
      return `${PALETTE[i % PALETTE.length]} ${a.toFixed(2)}% ${b.toFixed(2)}%`;
    });
    return `conic-gradient(${stops.join(',')})`;
  }

  function renderOverview() {
    const d = cur();
    const income = d.income || [], expenses = d.expenses || [], budget = d.budget || {};
    const totalIn = income.reduce((s, i) => s + i.amount, 0);
    const totalOut = expenses.reduce((s, e) => s + e.amount, 0);
    const balance = totalIn - totalOut;
    const totalBudget = Object.values(budget).reduce((s, v) => s + v, 0);

    // donut — รวมหมวดเล็กเป็น "อื่นๆ"
    const sc = spentByCat(expenses);
    let pairs = Object.entries(sc).sort((a, b) => b[1] - a[1]);
    if (pairs.length > 7) {
      const head = pairs.slice(0, 6), rest = pairs.slice(6).reduce((s, p) => s + p[1], 0);
      pairs = head.concat([['อื่นๆ', rest]]);
    }
    const legend = pairs.map(([cat, val], i) => `<div class="mny-leg">
      <span class="mny-leg-dot" style="background:${PALETTE[i % PALETTE.length]}"></span>
      <span class="mny-leg-name">${esc(cat)}</span>
      <span class="mny-leg-val">${fmtMoney(val)} · ${totalOut ? Math.round(val / totalOut * 100) : 0}%</span>
    </div>`).join('');

    // budget rows (เรียงงบมาก→น้อย)
    const brows = Object.entries(budget).sort((a, b) => b[1] - a[1]).map(([cat, alloc]) => {
      const spent = sc[cat] || 0;
      const pct = alloc > 0 ? Math.min(100, Math.round(spent / alloc * 100)) : (spent > 0 ? 100 : 0);
      const over = spent > alloc;
      return `<div class="mny-brow" data-cat="${esc(cat)}">
        ${catTile(cat)}
        <div class="mny-brow-body">
          <div class="mny-brow-head"><span class="mny-brow-name">${esc(cat)}</span>
            <span class="mny-brow-amt">${fmtMoney(spent)} / ${fmtMoney(alloc)}</span></div>
          <div class="mny-prog"><div class="mny-prog-fill${over ? ' over' : ''}" style="width:${pct}%"></div></div>
          <div class="mny-brow-foot"><span class="mny-pct${over ? ' over' : ''}">${pct}%</span>
            <span class="mny-rem${over ? ' over' : ''}">${over ? 'เกิน ' + fmtMoney(spent - alloc) : 'เหลือ ' + fmtMoney(alloc - spent)}</span></div>
        </div>
      </div>`;
    }).join('');

    $('mny-overview').innerHTML = `
      <div class="hero mny-hero">
        <div class="mny-hero-lbl">คงเหลือเดือนนี้</div>
        <div class="mny-hero-bal${balance < 0 ? ' neg' : ''}" data-count="${balance}" data-cprefix="฿" data-cdec="0">${fmtMoney(balance)}</div>
        <div class="mny-hero-sub">งบรวม ${fmtMoney(totalBudget)}</div>
        <div class="mny-hero-split">
          <div class="mny-hs"><div class="mny-hs-lab">รายรับ</div><div class="mny-hs-val up">${fmtMoney(totalIn)}</div><div class="mny-hs-cnt">${income.length} รายการ</div></div>
          <div class="mny-hs"><div class="mny-hs-lab">รายจ่าย</div><div class="mny-hs-val down">${fmtMoney(totalOut)}</div><div class="mny-hs-cnt">${expenses.length} รายการ</div></div>
        </div>
      </div>

      <div class="card">
        <div class="section-title">สัดส่วนรายจ่าย</div>
        <div class="mny-donut-wrap">
          <div class="mny-donut" style="background:${donutCSS(pairs, totalOut)}">
            <div class="mny-donut-hole"><span>${fmtMoney(totalOut)}</span><small>จ่ายแล้ว</small></div>
          </div>
          <div class="mny-legend">${legend || '<div class="empty">ไม่มีรายจ่าย</div>'}</div>
        </div>
      </div>

      <div class="card">
        <div class="section-title">งบแต่ละหมวด · แตะดูรายการ</div>
        <div class="mny-budget">${brows}</div>
      </div>`;
    if (window.UIFX) window.UIFX.countAll($('mny-overview'));
  }

  // ── transactions ──
  function renderTx() {
    root.querySelectorAll('[data-txtab]').forEach(b => b.classList.toggle('on', b.dataset.txtab === txKind));
    const d = cur();
    const items = (txKind === 'income' ? [...(d.income || [])] : [...(d.expenses || [])])
      .sort((a, b) => b.date.localeCompare(a.date));
    const total = items.reduce((s, i) => s + i.amount, 0);
    const rows = items.map(it => {
      const tile = txKind === 'income' ? srcTile(it.source) : catTile(it.category);
      const tag = txKind === 'income' ? it.source : it.category;
      const sub = `${esc(tag)} · ${fmtDate(it.date)}${it.notes ? ' · ' + esc(it.notes) : ''}`;
      const amt = txKind === 'income'
        ? `<span class="mny-amt pos">+${fmtMoney(it.amount)}</span>`
        : `<span class="mny-amt neg">-${fmtMoney(it.amount)}</span>`;
      return `<div class="mny-row">${tile}<div class="mny-row-lead">
        <div class="mny-row-title">${esc(it.name || tag)}</div><div class="mny-row-sub">${sub}</div></div>${amt}</div>`;
    }).join('');
    $('mnyTxList').innerHTML = `<div class="mny-list-head"><span>${items.length} รายการ</span><span>รวม ${fmtMoney(total)}</span></div>
      <div class="card mny-list">${rows || '<div class="empty">ไม่มีรายการ</div>'}</div>`;
  }

  function buildTxPane() {
    $('mny-tx').innerHTML = `
      <div class="mny-txtoggle">
        <button data-txtab="expense" class="on">รายจ่าย</button>
        <button data-txtab="income">รายรับ</button>
      </div>
      <div id="mnyTxList"></div>`;
    root.querySelectorAll('[data-txtab]').forEach(b => b.onclick = () => { txKind = b.dataset.txtab; renderTx(); });
    renderTx();
  }

  // ── subscriptions radar ──
  const moEquiv = s => s.cycle === 'yr' ? s.amount / 12 : s.amount;
  function nextRenew(s) {
    const now = new Date(); now.setHours(0, 0, 0, 0);
    if (s.cycle === 'yr') {
      const m = (s.month || 1) - 1;
      let d = new Date(now.getFullYear(), m, s.day);
      if (d < now) d = new Date(now.getFullYear() + 1, m, s.day);
      return d;
    }
    let d = new Date(now.getFullYear(), now.getMonth(), s.day);
    if (d < now) d = new Date(now.getFullYear(), now.getMonth() + 1, s.day);
    return d;
  }
  function renderSubs() {
    if (!SUBS.length) { $('mny-subs').innerHTML = '<div class="empty">ยังไม่มีรายการประจำ</div>'; return; }
    const now = new Date(); now.setHours(0, 0, 0, 0);
    const moBurn = SUBS.reduce((s, x) => s + moEquiv(x), 0);
    const yrBurn = SUBS.reduce((s, x) => s + (x.cycle === 'yr' ? x.amount : x.amount * 12), 0);
    const sorted = [...SUBS].map(s => ({ ...s, next: nextRenew(s) })).sort((a, b) => a.next - b.next);
    const rows = sorted.map(s => {
      const days = Math.round((s.next - now) / 86400000);
      const soon = days <= 5;
      const cyc = s.cycle === 'yr' ? '/ปี' : '/เดือน';
      const nextStr = `${s.next.getDate()} ${THMONTH[s.next.getMonth()].slice(0, 3)}`;
      return `<div class="mny-sub-row">
        <div class="mny-tile">${(s.name[0] || '#').toUpperCase()}</div>
        <div class="mny-sub-body">
          <div class="mny-sub-head"><span class="mny-sub-name">${esc(s.name)}</span>
            <span class="mny-sub-amt">${fmtMoney(s.amount)}<span class="mny-sub-cyc">${cyc}</span></span></div>
          <div class="mny-sub-foot"><span class="mny-sub-next${soon ? ' soon' : ''}">ตัดบิล ${nextStr} · อีก ${days} วัน</span>
            ${s.cycle === 'yr' ? `<span class="mny-sub-eq">≈ ${fmtMoney(Math.round(moEquiv(s)))}/เดือน</span>` : (s.note ? `<span class="mny-sub-eq">${esc(s.note)}</span>` : '')}</div>
        </div></div>`;
    }).join('');
    $('mny-subs').innerHTML = `
      <div class="hero mny-hero">
        <div class="mny-hero-lbl">จ่ายประจำต่อเดือน</div>
        <div class="mny-hero-bal">${fmtMoney(Math.round(moBurn))}</div>
        <div class="mny-hero-sub">${SUBS.length} รายการ · รวมทั้งปี ${fmtMoney(Math.round(yrBurn))}</div>
      </div>
      <div class="card"><div class="section-title">เรียงตามรอบตัดบิลถัดไป</div><div class="mny-subs-list">${rows}</div></div>`;
  }

  // ── category history modal ──
  function openCat(cat) {
    const items = (cur().expenses || []).filter(e => e.category === cat).sort((a, b) => b.date.localeCompare(a.date));
    const total = items.reduce((s, e) => s + e.amount, 0);
    $('mnyMTitle').innerHTML = `<span class="mny-mtitle-ic">${catSvg(cat)}</span>${esc(cat)}`;
    $('mnyMSub').textContent = items.length ? `${items.length} รายการ · รวม ${fmtMoney(total)}` : 'ยังไม่มีรายการ';
    $('mnyMBody').innerHTML = items.length
      ? `<div class="card mny-list">${items.map(e => `<div class="mny-row"><div class="mny-row-lead">
          <div class="mny-row-title">${esc(e.name)}</div><div class="mny-row-sub">${fmtDate(e.date)}${e.notes ? ' · ' + esc(e.notes) : ''}</div></div>
          <span class="mny-amt neg">-${fmtMoney(e.amount)}</span></div>`).join('')}</div>`
      : '<div class="empty">ยังไม่มีรายจ่ายในหมวดนี้</div>';
    $('mnyOverlay').classList.add('active');
  }
  function closeModal() {
    const o = $('mnyOverlay'); o.classList.add('closing');
    setTimeout(() => o.classList.remove('active', 'closing'), 300);
  }

  // ── tabs ──
  function switchTab(tab) {
    activeTab = tab;
    root.querySelectorAll('.mny-tab').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
    root.querySelectorAll('.mny-pane').forEach(p => p.classList.toggle('active', p.id === 'mny-' + tab));
    if (tab === 'overview') renderOverview();
    else if (tab === 'tx') buildTxPane();
    else if (tab === 'subs') renderSubs();
    else if (tab === 'savings' && window.SavingsView) window.SavingsView.render($('mny-savings'));
  }

  function renderMonthBar() {
    $('mnyMonth').textContent = monthLabel(KEYS[monthIdx]);
    root.querySelector('[data-mnav="-1"]').disabled = monthIdx <= 0;
    root.querySelector('[data-mnav="1"]').disabled = monthIdx >= KEYS.length - 1;
  }

  function wire() {
    root.querySelectorAll('.mny-tab').forEach(b => b.onclick = () => switchTab(b.dataset.tab));
    root.querySelectorAll('[data-mnav]').forEach(b => b.onclick = () => {
      monthIdx = Math.max(0, Math.min(KEYS.length - 1, monthIdx + Number(b.dataset.mnav)));
      renderMonthBar(); switchTab(activeTab);
    });
    root.addEventListener('click', e => {
      const br = e.target.closest('[data-cat]'); if (br) openCat(br.dataset.cat);
    });
    $('mnyMClose').onclick = closeModal;
    $('mnyOverlay').onclick = e => { if (e.target === $('mnyOverlay')) closeModal(); };
  }

  function mount(el) {
    if (el.dataset.mounted) return;
    root = el; el.innerHTML = TEMPLATE; el.dataset.mounted = '1';
    monthIdx = KEYS.length - 1;
    wire(); renderMonthBar(); switchTab('overview');
  }
  return { mount };
})();

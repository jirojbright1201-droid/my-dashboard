// ===== Money hub — ภาพรวมเงินทั้งหมด: รายรับ/จ่าย/งบ + โหลเงิน (data: data/money.data.js) =====
window.MoneyView = (function () {
  const DATA = window.MONEY_DATA || {};
  const KEYS = window.MONEY_KEYS || [];

  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const fmtMoney = n => '฿' + Number(n || 0).toLocaleString('en-US');
  const fmtDate = d => { const [, m, day] = (d || '').split('-'); return `${day}/${m}`; };
  const THMONTH = ['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'];
  const monthLabel = k => { const [y, m] = k.split('-').map(Number); return `${THMONTH[m - 1]} ${y}`; };

  const CAT_EMOJI = {
    Restaurant:'🍜', Family:'👪', Subscriptions:'💳', Rent:'🏠', Investment:'📈',
    Shopping:'🛍️', Books:'📚', Transport:'🚗', Beauty:'💄', Entertainment:'🎬', Study:'🎓', Emergency:'🚨'
  };
  const PALETTE = ['#cc785c','#d99e3a','#5a9e6f','#c2604a','#caa45a','#8c7a6b','#b5854a','#9a9488'];
  const catTile = c => `<div class="mny-tile">${CAT_EMOJI[c] || '🧾'}</div>`;
  const srcTile = s => `<div class="mny-tile">${s === 'Salary' ? '💼' : '🎁'}</div>`;

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
      <button class="mny-tab" data-tab="savings">โหลเงิน</button>
    </div>
    <div id="mny-overview" class="mny-pane active"></div>
    <div id="mny-tx" class="mny-pane"></div>
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
      <div class="card mny-hero">
        <div class="mny-hero-lbl">คงเหลือเดือนนี้</div>
        <div class="mny-hero-bal" style="color:${balance < 0 ? 'var(--red)' : 'var(--text)'}">${fmtMoney(balance)}</div>
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

  // ── category history modal ──
  function openCat(cat) {
    const items = (cur().expenses || []).filter(e => e.category === cat).sort((a, b) => b.date.localeCompare(a.date));
    const total = items.reduce((s, e) => s + e.amount, 0);
    $('mnyMTitle').textContent = `${CAT_EMOJI[cat] || '🧾'}  ${cat}`;
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

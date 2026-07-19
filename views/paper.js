// ===== Paper Trade — พอร์ตหุ้นจำลองที่ Claude บริหารเอง (data: data/paper.data.js) =====
window.PaperView = (function () {
  const DATA = window.PAPER_DATA || { startDate: null, startCash: 0, cash: 0, positions: [], trades: [] };
  const POSITIONS = DATA.positions || [];
  const TRADES = DATA.trades || [];

  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const fmtDate = d => { if (!d) return ''; const [y, m, day] = d.split('-'); return `${day}/${m}/${y.slice(2)}`; };
  const fmtUSD = (n, dec) => '$' + Number(n || 0).toLocaleString('en-US', { minimumFractionDigits: dec || 0, maximumFractionDigits: dec || 0 });
  const fmtPct = n => (n >= 0 ? '+' : '') + Number(n || 0).toFixed(1) + '%';
  const fmtShares = n => Number(n || 0).toLocaleString('en-US', { maximumFractionDigits: 4 });
  const S = p => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const emptyState = msg => `<div class="pt-empty">${esc(msg)}</div>`;

  // ── state ──
  let root, activeTab = 'overview';
  const $ = id => root.querySelector('#' + id);

  const TEMPLATE = `
  <div class="container pt">
    <div id="pt-overview" class="pt-pane active"></div>
    <div id="pt-journal" class="pt-pane"></div>
    <nav class="tabbar">
      <button class="pt-tab tab-item active" data-tab="overview">${S('<path d="M4 19V10M10 19V5M16 19v-9M22 19V3"/>')}<span>Overview</span></button>
      <button class="pt-tab tab-item" data-tab="journal">${S('<path d="M6 4h9l4 4v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"/><path d="M9 10h6M9 14h6"/>')}<span>Journal</span></button>
    </nav>
  </div>

  <div class="overlay" id="ptOverlay">
    <div class="modal">
      <div class="sheet-handle"></div>
      <div class="modal-head">
        <div><div class="modal-title" id="ptMTitle"></div><div class="modal-sub" id="ptMSub"></div></div>
        <button class="modal-close" id="ptMClose">${S('<path d="M6 6l12 12M18 6L6 18"/>')}</button>
      </div>
      <div class="modal-body" id="ptMBody"></div>
    </div>
  </div>`;

  // ── derived metrics ──
  function posMetrics(p) {
    const notional = p.shares * p.avgEntry;
    const worth = p.shares * p.price;
    const pl = worth - notional;
    const plPct = notional ? (pl / notional * 100) : 0;
    return { notional, worth, pl, plPct };
  }

  function totals() {
    const investedWorth = POSITIONS.reduce((s, p) => s + posMetrics(p).worth, 0);
    const totalWorth = DATA.cash + investedWorth;
    const totalPL = totalWorth - DATA.startCash;
    const totalPLPct = DATA.startCash ? (totalPL / DATA.startCash * 100) : 0;
    return { investedWorth, totalWorth, totalPL, totalPLPct };
  }

  // ── overview ──
  function posRow(p, totalWorth) {
    const m = posMetrics(p);
    const allocation = totalWorth ? (m.worth / totalWorth * 100) : 0;
    const up = m.pl >= 0;
    return `
    <div class="pt-row" data-ticker="${esc(p.ticker)}">
      <div class="pt-row-lead">
        <div class="pt-row-title">${esc(p.ticker)}</div>
        <div class="pt-row-sub">${esc(p.name || '')} · ${fmtShares(p.shares)} หุ้น · ${allocation.toFixed(1)}% ของพอร์ต</div>
      </div>
      <div class="pt-row-right">
        <div class="pt-amt">${fmtUSD(m.worth, 2)}</div>
        <div class="pt-amt-sub ${up ? 'pos' : 'neg'}">${fmtPct(m.plPct)}</div>
      </div>
    </div>`;
  }

  function renderOverview() {
    const pane = $('pt-overview');
    const t = totals();
    const up = t.totalPL >= 0;
    const cashPct = t.totalWorth ? (DATA.cash / t.totalWorth * 100) : 100;
    pane.innerHTML = `
      <div class="hero">
        <div class="hero-eyebrow">Paper Trade · เริ่ม ${fmtDate(DATA.startDate)} ด้วย ${fmtUSD(DATA.startCash)}</div>
        <div class="hero-figure${up ? '' : ' down'}" data-count="${t.totalWorth}" data-cprefix="$" data-cdec="2">${fmtUSD(t.totalWorth, 2)}</div>
        <div class="hero-cap">มูลค่าพอร์ตรวม — เงินสมมติ ไม่กระทบเงินจริง</div>
        <div class="hero-split">
          <div class="hero-cell">
            <div class="hero-cell-lab">P&amp;L รวม</div>
            <div class="hero-cell-val ${up ? 'pos' : 'neg'}" data-count="${t.totalPL}" data-cprefix="$" data-cdec="2">${fmtUSD(t.totalPL, 2)}</div>
            <div class="hero-cell-sub ${up ? 'pos' : 'neg'}">${fmtPct(t.totalPLPct)}</div>
          </div>
          <div class="hero-cell">
            <div class="hero-cell-lab">เงินสด</div>
            <div class="hero-cell-val" data-count="${DATA.cash}" data-cprefix="$" data-cdec="2">${fmtUSD(DATA.cash, 2)}</div>
            <div class="hero-cell-sub">${cashPct.toFixed(0)}% ของพอร์ต</div>
          </div>
        </div>
      </div>
      <div class="section-title">Positions (${POSITIONS.length})</div>
      <div class="card pt-list">
        ${POSITIONS.length ? POSITIONS.map(p => posRow(p, t.totalWorth)).join('') : emptyState('ยังไม่มีหุ้นที่ถืออยู่ — รอ Jarvis ตัดสินใจเทรดไม้แรก')}
      </div>`;
    if (window.UIFX) window.UIFX.countAll(pane);
  }

  // ── journal ──
  function tradeRow(t) {
    const sideLabel = t.side === 'buy' ? 'ซื้อ' : 'ขาย';
    return `
    <div class="pt-row" data-trade="${esc(t.id)}">
      <div class="pt-row-lead">
        <div class="pt-row-title">${esc(t.ticker)} <span class="chip pt-chip-${t.side}">${sideLabel}</span></div>
        <div class="pt-row-sub">${fmtDate(t.date)} · ${fmtShares(t.shares)} หุ้น @ ${fmtUSD(t.price, 2)}</div>
      </div>
      <div class="pt-row-right">
        <div class="pt-amt">${fmtUSD(t.shares * t.price, 2)}</div>
      </div>
    </div>`;
  }

  function renderJournal() {
    const pane = $('pt-journal');
    const trades = TRADES.slice().reverse();
    pane.innerHTML = `
      <div class="section-title">Trade Journal (${trades.length})</div>
      <div class="card pt-list">
        ${trades.length ? trades.map(tradeRow).join('') : emptyState('ยังไม่มีประวัติเทรด — ทุกไม้ที่ Claude ตัดสินใจจะจด thesis ไว้ที่นี่')}
      </div>`;
  }

  // ── modal ──
  function thesisBlock(t) {
    const sideLabel = t.side === 'buy' ? 'ซื้อ' : 'ขาย';
    return `
    <div class="pt-thesis">
      <div class="pt-thesis-head"><span class="chip pt-chip-${t.side}">${sideLabel}</span><span class="pt-thesis-meta">${fmtDate(t.date)} · ${fmtShares(t.shares)} หุ้น @ ${fmtUSD(t.price, 2)}</span></div>
      <div class="pt-thesis-text">${esc(t.thesis || 'ไม่มีบันทึกเหตุผล')}</div>
    </div>`;
  }

  function openPosition(ticker) {
    const p = POSITIONS.find(x => x.ticker === ticker); if (!p) return;
    const m = posMetrics(p);
    const up = m.pl >= 0;
    const hist = TRADES.filter(x => x.ticker === ticker).slice().reverse();
    $('ptMTitle').textContent = p.ticker;
    $('ptMSub').textContent = p.name || '';
    $('ptMBody').innerHTML = `
      <div class="pt-detail-grid">
        <div class="pt-detail-cell"><div class="pt-detail-lab">Entry เฉลี่ย</div><div class="pt-detail-val">${fmtUSD(p.avgEntry, 2)}</div></div>
        <div class="pt-detail-cell"><div class="pt-detail-lab">ราคาล่าสุด</div><div class="pt-detail-val">${fmtUSD(p.price, 2)}</div></div>
        <div class="pt-detail-cell"><div class="pt-detail-lab">Notional</div><div class="pt-detail-val">${fmtUSD(m.notional, 2)}</div></div>
        <div class="pt-detail-cell"><div class="pt-detail-lab">Worth</div><div class="pt-detail-val">${fmtUSD(m.worth, 2)}</div></div>
        <div class="pt-detail-cell"><div class="pt-detail-lab">P&amp;L</div><div class="pt-detail-val ${up ? 'pos' : 'neg'}">${fmtUSD(m.pl, 2)}</div></div>
        <div class="pt-detail-cell"><div class="pt-detail-lab">P&amp;L %</div><div class="pt-detail-val ${up ? 'pos' : 'neg'}">${fmtPct(m.plPct)}</div></div>
      </div>
      <div class="pt-detail-sub">${fmtShares(p.shares)} หุ้น · ราคาล่าสุดอัปเดต ${fmtDate(p.priceAsOf)} · เปิดสถานะ ${fmtDate(p.opened)}</div>
      <div class="modal-sec-title">Thesis / ประวัติเทรด</div>
      ${hist.map(thesisBlock).join('') || emptyState('ไม่มีบันทึก')}`;
    $('ptOverlay').classList.add('active');
  }

  function openTrade(id) {
    const t = TRADES.find(x => x.id === id); if (!t) return;
    $('ptMTitle').textContent = t.ticker;
    $('ptMSub').textContent = `${t.side === 'buy' ? 'ซื้อ' : 'ขาย'} · ${fmtDate(t.date)}`;
    $('ptMBody').innerHTML = `
      <div class="pt-detail-grid">
        <div class="pt-detail-cell"><div class="pt-detail-lab">จำนวนหุ้น</div><div class="pt-detail-val">${fmtShares(t.shares)}</div></div>
        <div class="pt-detail-cell"><div class="pt-detail-lab">ราคา</div><div class="pt-detail-val">${fmtUSD(t.price, 2)}</div></div>
        <div class="pt-detail-cell"><div class="pt-detail-lab">มูลค่ารวม</div><div class="pt-detail-val">${fmtUSD(t.shares * t.price, 2)}</div></div>
      </div>
      <div class="modal-sec-title">Thesis</div>
      <div class="pt-thesis-text">${esc(t.thesis || 'ไม่มีบันทึกเหตุผล')}</div>`;
    $('ptOverlay').classList.add('active');
  }

  function closeModal() {
    const o = $('ptOverlay'); o.classList.add('closing');
    setTimeout(() => o.classList.remove('active', 'closing'), 300);
  }

  // ── tabs ──
  function switchTab(tab) {
    activeTab = tab;
    root.querySelectorAll('.pt-tab').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
    root.querySelectorAll('.pt-pane').forEach(p => p.classList.toggle('active', p.id === 'pt-' + tab));
    if (tab === 'overview') renderOverview();
    else if (tab === 'journal') renderJournal();
  }

  function wire() {
    root.querySelectorAll('.pt-tab').forEach(b => b.onclick = () => switchTab(b.dataset.tab));
    root.addEventListener('click', e => {
      const posEl = e.target.closest('[data-ticker]');
      if (posEl) { openPosition(posEl.dataset.ticker); return; }
      const tradeEl = e.target.closest('[data-trade]');
      if (tradeEl) { openTrade(tradeEl.dataset.trade); return; }
    });
    $('ptMClose').onclick = closeModal;
    $('ptOverlay').onclick = e => { if (e.target === $('ptOverlay')) closeModal(); };
  }

  function mount(el) {
    if (el.dataset.mounted) return;
    root = el; el.innerHTML = TEMPLATE; el.dataset.mounted = '1';
    wire(); switchTab('overview');
  }
  return { mount };
})();

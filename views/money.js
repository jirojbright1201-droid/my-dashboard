// ===== Money hub — ภาพรวมเงินทั้งหมด: รายรับ/จ่าย/งบ + โหลเงิน (data: data/money.data.js) =====
window.MoneyView = (function () {
  const DATA = window.MONEY_DATA || {};
  const KEYS = window.MONEY_KEYS || [];
  const SUBS = (window.SUBS_DATA && window.SUBS_DATA.subs) || [];

  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const fmtMoney = n => '฿' + Number(n || 0).toLocaleString('en-US');
  const fmtDate = d => { const [, m, day] = (d || '').split('-'); return `${day}/${m}`; };
  const THMONTH = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const monthLabel = k => { const [y, m] = k.split('-').map(Number); return `${THMONTH[m - 1]} ${y}`; };

  // ── outline icon set (tab bar / chevron / insight / bill alert) ──
  const S = p => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  // ── filled icon set (category/source tiles — real paths, Material Design Icons, MIT, via cdn.jsdelivr.net/npm/@mdi/svg) ──
  const svgFill = p => `<svg viewBox="0 0 24 24" fill="currentColor" stroke="none">${p}</svg>`;
  const CAT_ICON = {
    Restaurant:    '<path d="M11,9H9V2H7V9H5V2H3V9C3,11.12 4.66,12.84 6.75,12.97V22H9.25V12.97C11.34,12.84 13,11.12 13,9V2H11V9M16,6V14H18.5V22H21V2C18.24,2 16,4.24 16,6Z"/>',
    Family:        '<path d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z"/>',
    Subscriptions: '<path d="M21 9V6H7V9H21M21 3A2 2 0 0 1 23 5V15A2 2 0 0 1 21 17H7A2 2 0 0 1 5 15V5A2 2 0 0 1 7 3H21M3 19H18V21H3A2 2 0 0 1 1 19V8H3Z"/>',
    Rent:          '<path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"/>',
    Investment:    '<path d="M6,16.5L3,19.44V11H6M11,14.66L9.43,13.32L8,14.64V7H11M16,13L13,16V3H16M18.81,12.81L17,11H22V16L20.21,14.21L13,21.36L9.53,18.34L5.75,22H3L9.47,15.66L13,18.64"/>',
    Shopping:      '<path d="M12,13A5,5 0 0,1 7,8H9A3,3 0 0,0 12,11A3,3 0 0,0 15,8H17A5,5 0 0,1 12,13M12,3A3,3 0 0,1 15,6H9A3,3 0 0,1 12,3M19,6H17A5,5 0 0,0 12,1A5,5 0 0,0 7,6H5C3.89,6 3,6.89 3,8V20A2,2 0 0,0 5,22H19A2,2 0 0,0 21,20V8C21,6.89 20.1,6 19,6Z"/>',
    Books:         '<path d="M12 21.5C10.65 20.65 8.2 20 6.5 20C4.85 20 3.15 20.3 1.75 21.05C1.65 21.1 1.6 21.1 1.5 21.1C1.25 21.1 1 20.85 1 20.6V6C1.6 5.55 2.25 5.25 3 5C4.11 4.65 5.33 4.5 6.5 4.5C8.45 4.5 10.55 4.9 12 6C13.45 4.9 15.55 4.5 17.5 4.5C18.67 4.5 19.89 4.65 21 5C21.75 5.25 22.4 5.55 23 6V20.6C23 20.85 22.75 21.1 22.5 21.1C22.4 21.1 22.35 21.1 22.25 21.05C20.85 20.3 19.15 20 17.5 20C15.8 20 13.35 20.65 12 21.5M12 8V19.5C13.35 18.65 15.8 18 17.5 18C18.7 18 19.9 18.15 21 18.5V7C19.9 6.65 18.7 6.5 17.5 6.5C15.8 6.5 13.35 7.15 12 8Z"/>',
    Transport:     '<path d="M5,11L6.5,6.5H17.5L19,11M17.5,16A1.5,1.5 0 0,1 16,14.5A1.5,1.5 0 0,1 17.5,13A1.5,1.5 0 0,1 19,14.5A1.5,1.5 0 0,1 17.5,16M6.5,16A1.5,1.5 0 0,1 5,14.5A1.5,1.5 0 0,1 6.5,13A1.5,1.5 0 0,1 8,14.5A1.5,1.5 0 0,1 6.5,16M18.92,6C18.72,5.42 18.16,5 17.5,5H6.5C5.84,5 5.28,5.42 5.08,6L3,12V20A1,1 0 0,0 4,21H5A1,1 0 0,0 6,20V19H18V20A1,1 0 0,0 19,21H20A1,1 0 0,0 21,20V12L18.92,6Z"/>',
    Beauty:        '<path d="M15.5,9.63C15.31,6.84 14.18,4.12 12.06,2C9.92,4.14 8.74,6.86 8.5,9.63C9.79,10.31 10.97,11.19 12,12.26C13.03,11.2 14.21,10.32 15.5,9.63M12,15.45C9.85,12.17 6.18,10 2,10C2,20 11.32,21.89 12,22C12.68,21.88 22,20 22,10C17.82,10 14.15,12.17 12,15.45Z"/>',
    Entertainment: '<path d="M15.58,16.8L12,14.5L8.42,16.8L9.5,12.68L6.21,10L10.46,9.74L12,5.8L13.54,9.74L17.79,10L14.5,12.68M20,12C20,10.89 20.9,10 22,10V6C22,4.89 21.1,4 20,4H4A2,2 0 0,0 2,6V10C3.11,10 4,10.9 4,12A2,2 0 0,1 2,14V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V14A2,2 0 0,1 20,12Z"/>',
    Study:         '<path d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z"/>',
    'Emergency Fund': '<path d="M19.83 7.5L17.56 5.23C17.63 4.81 17.74 4.42 17.88 4.08C17.96 3.9 18 3.71 18 3.5C18 2.67 17.33 2 16.5 2C14.86 2 13.41 2.79 12.5 4H7.5C4.46 4 2 6.46 2 9.5S4.5 21 4.5 21H10V19H12V21H17.5L19.18 15.41L22 14.47V7.5H19.83M13 9H8V7H13V9M16 11C15.45 11 15 10.55 15 10S15.45 9 16 9C16.55 9 17 9.45 17 10S16.55 11 16 11Z"/>',
    Laundry:       '<path d="M14.83,11.17C16.39,12.73 16.39,15.27 14.83,16.83C13.27,18.39 10.73,18.39 9.17,16.83L14.83,11.17M6,2H18A2,2 0 0,1 20,4V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2M7,4A1,1 0 0,0 6,5A1,1 0 0,0 7,6A1,1 0 0,0 8,5A1,1 0 0,0 7,4M10,4A1,1 0 0,0 9,5A1,1 0 0,0 10,6A1,1 0 0,0 11,5A1,1 0 0,0 10,4M12,8A6,6 0 0,0 6,14A6,6 0 0,0 12,20A6,6 0 0,0 18,14A6,6 0 0,0 12,8Z"/>',
    Utilities:     '<path d="M7,2V13H10V22L17,10H13L17,2H7Z"/>',
    default:       '<path d="M21,18V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5A2,2 0 0,1 5,3H19A2,2 0 0,1 21,5V6H12C10.89,6 10,6.9 10,8V16A2,2 0 0,0 12,18M12,16H22V8H12M16,13.5A1.5,1.5 0 0,1 14.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,12A1.5,1.5 0 0,1 16,13.5Z"/>'
  };
  const SRC_ICON = {
    Salary: '<path d="M10,2H14A2,2 0 0,1 16,4V6H20A2,2 0 0,1 22,8V19A2,2 0 0,1 20,21H4C2.89,21 2,20.1 2,19V8C2,6.89 2.89,6 4,6H8V4C8,2.89 8.89,2 10,2M14,6V4H10V6H14Z"/>',
    Other:  '<path d="M9.06,1.93C7.17,1.92 5.33,3.74 6.17,6H3A2,2 0 0,0 1,8V10A1,1 0 0,0 2,11H11V8H13V11H22A1,1 0 0,0 23,10V8A2,2 0 0,0 21,6H17.83C19,2.73 14.6,0.42 12.57,3.24L12,4L11.43,3.22C10.8,2.33 9.93,1.94 9.06,1.93M9,4C9.89,4 10.34,5.08 9.71,5.71C9.08,6.34 8,5.89 8,5A1,1 0 0,1 9,4M15,4C15.89,4 16.34,5.08 15.71,5.71C15.08,6.34 14,5.89 14,5A1,1 0 0,1 15,4M2,12V20A2,2 0 0,0 4,22H20A2,2 0 0,0 22,20V12H13V20H11V12H2Z"/>'
  };
  // ไล่เฉด accent blue (เข้ม → อ่อน) ตามจำนวนหมวด — โดนัทเป็นกราฟสัดส่วนจริง ยังคงไล่เฉดได้ต่างจากลิสต์ธรรมดา
  const _lerp = (a, b, t) => Math.round(a + (b - a) * t);
  const _hx = n => n.toString(16).padStart(2, '0');
  function ramp(n) {
    const c1 = [0x00, 0x22, 0x7a], c2 = [0x93, 0xb3, 0xf2]; // navy เข้ม → ฟ้าอ่อน
    if (n <= 1) return ['#0052ff'];
    return Array.from({ length: n }, (_, i) => {
      const t = i / (n - 1);
      return '#' + _hx(_lerp(c1[0], c2[0], t)) + _hx(_lerp(c1[1], c2[1], t)) + _hx(_lerp(c1[2], c2[2], t));
    });
  }
  const catSvg = c => svgFill(CAT_ICON[c] || CAT_ICON.default);
  const catTile = c => `<div class="mny-tile">${catSvg(c)}</div>`;
  const srcTile = s => `<div class="mny-tile">${svgFill(SRC_ICON[s] || SRC_ICON.Other)}</div>`;

  // ── state ──
  let root, monthIdx = 0, activeTab = 'overview', txKind = 'expense';
  const $ = id => root.querySelector('#' + id);
  const cur = () => DATA[KEYS[monthIdx]] || { budget: {}, income: [], expenses: [] };

  const TEMPLATE = `
  <div class="container mny">
    <div class="mny-monthbar">
      <button class="mny-chev" data-mnav="-1" aria-label="Previous">&#8249;</button>
      <span class="mny-month" id="mnyMonth"></span>
      <button class="mny-chev" data-mnav="1" aria-label="Next">&#8250;</button>
    </div>
    <div id="mnyBillAlert"></div>
    <div id="mny-overview" class="mny-pane active"></div>
    <div id="mny-tx" class="mny-pane"></div>
    <div id="mny-subs" class="mny-pane"></div>
    <div id="mny-savings" class="mny-pane"></div>

    <div id="mnyBudgetPage" class="mny-budgetpage">
      <div class="mny-bp-glow"></div>
      <div class="mny-bp-head">
        <button class="mny-bp-back" id="mnyBudgetBack" aria-label="Back">${S('<path d="M15 19l-7-7 7-7"/>')}</button>
        <div class="mny-bp-title">Budget breakdown</div>
      </div>
      <div class="mny-bp-body">
        <div id="mnyBpStats"></div>
        <div class="mny-budget" id="mnyBudgetFullList"></div>
      </div>
    </div>

    <nav class="tabbar">
      <button class="mny-tab tab-item active" data-tab="overview">${S('<path d="M3 12l9-8 9 8"/><path d="M5 10v10h14V10"/>')}<span>Overview</span></button>
      <button class="mny-tab tab-item" data-tab="tx">${S('<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>')}<span>Activity</span></button>
      <button class="fab fab--dock" id="fab" aria-label="Quick capture">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
        <span class="fab-badge" id="fabBadge"></span>
      </button>
      <button class="mny-tab tab-item" data-tab="subs">${S('<path d="M17 2l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 22l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>')}<span>Recurring</span></button>
      <button class="mny-tab tab-item" data-tab="savings">${S('<path d="M5 9h11a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6a3 3 0 0 1-3-3V8a2 2 0 0 1 2-2h7"/><path d="M16 13h.01"/>')}<span>Savings</span></button>
    </nav>
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

  function donutCSS(pairs, total, cols) {
    if (!total) return 'conic-gradient(var(--surface-3) 0 100%)';
    let acc = 0;
    const stops = pairs.map(([, val], i) => {
      const a = acc / total * 100; acc += val; const b = acc / total * 100;
      return `${cols[i]} ${a.toFixed(2)}% ${b.toFixed(2)}%`;
    });
    return `conic-gradient(${stops.join(',')})`;
  }

  // เดือนที่เลือก: อดีต/ปัจจุบัน/อนาคต + จำนวนวันในเดือน (ใช้ทั้ง insight และ perDay)
  function monthMeta(mkey) {
    const [my, mm] = mkey.split('-').map(Number);
    const now = new Date();
    const dim = new Date(my, mm, 0).getDate();
    const isPast = my < now.getFullYear() || (my === now.getFullYear() && mm < now.getMonth() + 1);
    const isFuture = my > now.getFullYear() || (my === now.getFullYear() && mm > now.getMonth() + 1);
    return { my, mm, dim, isPast, isFuture, now };
  }

  // หมวดรายจ่ายคงที่ต้นเดือน (จ่ายก้อนเดียว/กันเงินไว้ ไม่ใช่ใช้กระจายทุกวัน) — กันออกจากการคำนวณ pace เพื่อไม่ให้ต้นเดือนฟันธง "เกินจังหวะ" ผิดๆ
  const FIXED_PACE_CATS = ['Rent', 'Subscriptions', 'Family', 'Investment', 'Emergency Fund', 'Utilities'];
  function variableTotals(expenses, budget) {
    const out = expenses.filter(e => !FIXED_PACE_CATS.includes(e.category)).reduce((s, e) => s + e.amount, 0);
    const bud = Object.entries(budget).filter(([cat]) => !FIXED_PACE_CATS.includes(cat)).reduce((s, [, v]) => s + v, 0);
    return { out, bud };
  }

  // insight การ์ด — เทียบ pace การใช้เงินจริงเทียบกับงบเฉลี่ยต่อวัน เฉพาะหมวดรายจ่ายผันแปร (ไม่ใช่ % คงเหลือแบบเดิมที่โดน cap ที่ 100%)
  function computeInsight(mkey, totalOut, totalBudget) {
    if (totalBudget <= 0) return null;
    const { dim, isPast, isFuture, now } = monthMeta(mkey);
    const daysElapsed = isPast ? dim : (isFuture ? 0 : now.getDate());
    if (daysElapsed <= 0) return null;
    const avgDaily = totalOut / daysElapsed;
    const budgetDaily = totalBudget / dim;
    if (budgetDaily <= 0) return null;
    const overPct = Math.round((avgDaily / budgetDaily - 1) * 100);
    const good = avgDaily <= budgetDaily * 1.02;
    return {
      good,
      title: good ? 'เดือนนี้คุมได้ดี' : 'เดือนนี้ใช้เกินจังหวะ',
      avgDaily: Math.round(avgDaily),
      budgetDaily: Math.round(budgetDaily),
      tail: good ? 'ยังคุมอยู่' : `เกินจังหวะที่วางไว้ ${overPct}%`
    };
  }

  function renderOverview() {
    const d = cur();
    const income = d.income || [], expenses = d.expenses || [], budget = d.budget || {};
    const totalIn = income.reduce((s, i) => s + i.amount, 0);
    const totalOut = expenses.reduce((s, e) => s + e.amount, 0);
    const balance = totalIn - totalOut;
    const totalBudget = Object.values(budget).reduce((s, v) => s + v, 0);

    // เหลือใช้ต่อวัน — งบที่ยังไม่ใช้ ÷ วันที่เหลือในเดือนที่เลือก
    const mkey = KEYS[monthIdx] || '';
    const { dim, isFuture, now } = monthMeta(mkey);
    let daysLeft = 0;
    if (!isFuture) { const [, mm2] = mkey.split('-').map(Number); if (mm2 === now.getMonth() + 1) daysLeft = dim - now.getDate() + 1; }
    else daysLeft = dim;
    const perDay = (totalBudget > 0 && daysLeft > 0) ? Math.max(0, Math.floor((totalBudget - totalOut) / daysLeft)) : null;

    // donut — รวมหมวดเล็กเป็น "อื่นๆ"
    const sc = spentByCat(expenses);
    let pairs = Object.entries(sc).sort((a, b) => b[1] - a[1]);
    if (pairs.length > 7) {
      const head = pairs.slice(0, 6), rest = pairs.slice(6).reduce((s, p) => s + p[1], 0);
      pairs = head.concat([['Others', rest]]);
    }
    const cols = ramp(pairs.length);
    const legend = pairs.map(([cat, val], i) => `<div class="mny-leg">
      <span class="mny-leg-dot" style="background:${cols[i]}"></span>
      <span class="mny-leg-name">${esc(cat)}</span>
      <span class="mny-leg-val">${fmtMoney(val)} · ${totalOut ? Math.round(val / totalOut * 100) : 0}%</span>
    </div>`).join('');

    const variable = variableTotals(expenses, budget);
    const insight = computeInsight(mkey, variable.out, variable.bud);
    const insightIcon = insight ? S(insight.good ? '<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>' : '<path d="M12 9v4"/><path d="M12 17h.01"/><circle cx="12" cy="12" r="9"/>') : '';
    const insightHtml = insight ? `
      <div class="mny-insight">
        <div class="mny-insight-ic ${insight.good ? 'pos' : 'neg'}">${insightIcon}</div>
        <div class="mny-insight-body">
          <div class="mny-insight-title">${insight.title}</div>
          <div class="mny-insight-sub">เฉลี่ยใช้วันละ <b class="${insight.good ? 'pos' : 'neg'}">${fmtMoney(insight.avgDaily)}</b> จากงบที่ตั้งไว้วันละ ${fmtMoney(insight.budgetDaily)} — ${insight.tail}</div>
        </div>
      </div>` : '';

    $('mny-overview').innerHTML = `
      <div class="hero mny-hero">
        <div class="mny-hero-lbl">Balance this month</div>
        <div class="mny-hero-bal${balance < 0 ? ' neg' : ''}" data-count="${balance}" data-cprefix="฿" data-cdec="0">${fmtMoney(balance)}</div>
        <div class="mny-hero-sub">Total budget ${fmtMoney(totalBudget)}</div>
        ${perDay != null ? `<div class="mny-hero-safe"><b data-count="${perDay}" data-cprefix="฿" data-cdec="0">${fmtMoney(perDay)}</b><span>Left/day · ${daysLeft} days left</span></div>` : ''}
        <div class="mny-hero-split">
          <div class="mny-hs"><div class="mny-hs-lab">Income</div><div class="mny-hs-val up">${fmtMoney(totalIn)}</div><div class="mny-hs-cnt">${income.length} items</div></div>
          <div class="mny-hs"><div class="mny-hs-lab">Expenses</div><div class="mny-hs-val down">${fmtMoney(totalOut)}</div><div class="mny-hs-cnt">${expenses.length} items</div></div>
        </div>
      </div>

      ${insightHtml}

      <div class="card mny-donutcard" id="mnyOpenBudget">
        <div class="section-title mny-donutcard-head"><span>Spending breakdown</span>${S('<path d="M9 6l6 6-6 6"/>')}</div>
        <div class="mny-donut-wrap">
          <div class="mny-donut" style="background:${donutCSS(pairs, totalOut, cols)}">
            <div class="mny-donut-hole"><span>${fmtMoney(totalOut)}</span><small>Spent</small></div>
          </div>
          <div class="mny-legend">${legend || '<div class="empty">No expenses</div>'}</div>
        </div>
      </div>`;
    if (window.UIFX) window.UIFX.countAll($('mny-overview'));
    renderBudgetPage();
  }

  // ── Budget breakdown — หน้าเต็มจอ เปิดจากการแตะ donut card ──
  function renderBudgetPage() {
    const d = cur();
    const expenses = d.expenses || [], budget = d.budget || {};
    const sc = spentByCat(expenses);
    const totalBudget = Object.values(budget).reduce((s, v) => s + v, 0);
    const totalOut = expenses.reduce((s, e) => s + e.amount, 0);
    const totalLeft = totalBudget - totalOut;
    const pctUsed = totalBudget > 0 ? Math.round(totalOut / totalBudget * 100) : 0;

    const HR = 56, HRCIRC = 2 * Math.PI * HR;
    const hOff = HRCIRC * (1 - Math.min(100, pctUsed) / 100);
    $('mnyBpStats').innerHTML = `
      <div class="mny-bp-ringwrap">
        <div class="mny-bp-ring">
          <svg viewBox="0 0 132 132">
            <circle cx="66" cy="66" r="${HR}" fill="none" stroke="var(--surface-3)" stroke-width="10"/>
            <circle cx="66" cy="66" r="${HR}" fill="none" stroke="var(--accent)" stroke-width="10" stroke-linecap="round"
              stroke-dasharray="${HRCIRC.toFixed(1)}" stroke-dashoffset="${hOff.toFixed(1)}" transform="rotate(-90 66 66)"/>
          </svg>
          <div class="mny-bp-ringhole"><b>${pctUsed}%</b><span>used</span></div>
        </div>
        <div class="mny-bp-side">
          <div class="mny-bp-row"><span class="k">Budget</span><span class="v">${fmtMoney(totalBudget)}</span></div>
          <div class="mny-bp-div"></div>
          <div class="mny-bp-row"><span class="k">Spent</span><span class="v">${fmtMoney(totalOut)}</span></div>
          <div class="mny-bp-div"></div>
          <div class="mny-bp-row"><span class="k">Left</span><span class="v${totalLeft >= 0 ? ' pos' : ''}">${fmtMoney(totalLeft)}</span></div>
        </div>
      </div>`;

    const bAmt = n => `<span class="bt">฿</span>${Number(n || 0).toLocaleString('en-US')}`;
    const RC = 20, RCIRC = 2 * Math.PI * RC;
    const rowFull = ([cat, alloc]) => {
      const spent = sc[cat] || 0;
      const over = spent > alloc;
      const pct = alloc > 0 ? Math.min(100, Math.round(spent / alloc * 100)) : (spent > 0 ? 100 : 0);
      const off = RCIRC * (1 - pct / 100);
      const overPct = over ? Math.round((spent / alloc - 1) * 100) : 0;
      const endSlot = over
        ? `<div class="mny-over-badge">+${overPct}%</div>`
        : `<div class="mny-ring"><svg viewBox="0 0 46 46">
            <circle cx="23" cy="23" r="${RC}" fill="none" stroke="var(--surface-3)" stroke-width="4"/>
            <circle cx="23" cy="23" r="${RC}" fill="none" stroke="var(--accent)" stroke-width="4" stroke-linecap="round" stroke-dasharray="${RCIRC.toFixed(1)}" stroke-dashoffset="${off.toFixed(1)}" transform="rotate(-90 23 23)"/>
          </svg><span class="mny-ring-lbl">${pct}%</span></div>`;
      return `<div class="mny-brow${over ? ' over' : ''}" data-cat="${esc(cat)}">
        ${catTile(cat)}
        <div class="mny-brow-body">
          <div class="mny-brow-name">${esc(cat)}</div>
          <div class="mny-brow-amt"><b>${bAmt(spent)}</b><span class="of">/ ${bAmt(alloc)}</span></div>
          <div class="mny-brow-sub">${over ? 'Over ' + bAmt(spent - alloc) : 'Left ' + bAmt(alloc - spent)}</div>
        </div>
        ${endSlot}
      </div>`;
    };
    const sorted = Object.entries(budget).sort((a, b) => b[1] - a[1]);
    const overs = sorted.filter(([cat, alloc]) => (sc[cat] || 0) > alloc);
    const rest = sorted.filter(([cat, alloc]) => (sc[cat] || 0) <= alloc);
    let html = '';
    if (overs.length) html += `<div class="mny-brow-tag">Over budget</div>` + overs.map(rowFull).join('');
    if (rest.length) html += `<div class="mny-brow-tag">On track</div>` + rest.map(rowFull).join('');
    $('mnyBudgetFullList').innerHTML = sorted.length ? html : '<div class="empty">No budget set for this month</div>';
  }
  function openBudgetPage() { $('mnyBudgetPage').classList.add('active'); pushOverlayState('budget'); }
  function closeBudgetPage() { $('mnyBudgetPage').classList.remove('active'); }

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
        <div class="mny-row-title">${esc(it.name || tag)}</div>${it.name_th ? `<div class="mny-row-th">${esc(it.name_th)}</div>` : ''}<div class="mny-row-sub">${sub}</div></div>${amt}</div>`;
    }).join('');
    $('mnyTxList').innerHTML = `<div class="mny-list-head"><span>${items.length} items</span><span>Total ${fmtMoney(total)}</span></div>
      <div class="card mny-list">${rows || '<div class="empty">No items</div>'}</div>`;
  }

  function buildTxPane() {
    $('mny-tx').innerHTML = `
      <div class="mny-txtoggle">
        <button data-txtab="expense" class="on">Expenses</button>
        <button data-txtab="income">Income</button>
      </div>
      <div id="mnyTxList"></div>`;
    root.querySelectorAll('[data-txtab]').forEach(b => b.onclick = () => { txKind = b.dataset.txtab; renderTx(); });
    renderTx();
  }

  // ── subscriptions radar ──
  const moEquiv = s => s.cycle === 'yr' ? s.amount / 12 : s.amount;
  const FXR = (window.SUBS_DATA && window.SUBS_DATA.usdthb) || 33.7;
  const toTHB = s => s.cur === 'USD' ? s.amount * FXR : s.amount;          // native single charge → THB
  const moEquivTHB = s => s.cycle === 'yr' ? toTHB(s) / 12 : toTHB(s);     // THB per month
  const fmtCur = (n, cur) => cur === 'USD'
    ? '$' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : '฿' + Math.round(n).toLocaleString('en-US');
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
    if (!SUBS.length) { $('mny-subs').innerHTML = '<div class="empty">No recurring items</div>'; return; }
    const now = new Date(); now.setHours(0, 0, 0, 0);
    const moBurn = SUBS.reduce((s, x) => s + moEquivTHB(x), 0);
    const yrBurn = SUBS.reduce((s, x) => s + (x.cycle === 'yr' ? toTHB(x) : toTHB(x) * 12), 0);
    const sorted = [...SUBS].map(s => ({ ...s, next: nextRenew(s) })).sort((a, b) => a.next - b.next);
    const rows = sorted.map(s => {
      const days = Math.round((s.next - now) / 86400000);
      const soon = days <= 5;
      const cyc = s.cycle === 'yr' ? '/year' : '/month';
      const nextStr = `${s.next.getDate()} ${THMONTH[s.next.getMonth()].slice(0, 3)}`;
      const initial = esc((s.name[0] || '#').toUpperCase());
      const src = s.logo ? esc(s.logo) : (s.domain ? `https://www.google.com/s2/favicons?sz=128&amp;domain=${esc(s.domain)}` : '');
      const tile = src
        ? `<div class="mny-tile mny-sub-ic"><img src="${src}" alt="" onerror="this.remove()"><span>${initial}</span></div>`
        : `<div class="mny-tile">${initial}</div>`;
      const eqText = s.note ? esc(s.note)
        : s.cur === 'USD' ? `≈ ${fmtMoney(Math.round(moEquivTHB(s)))}/month`
        : s.cycle === 'yr' ? `≈ ${fmtMoney(Math.round(moEquiv(s)))}/month`
        : '';
      return `<div class="mny-sub-row">
        ${tile}
        <div class="mny-sub-body">
          <div class="mny-sub-name">${esc(s.name)}</div>
          <div class="mny-sub-foot"><span class="mny-sub-next${soon ? ' soon' : ''}">Bill ${nextStr} · ${days}d left</span></div>
          ${eqText ? `<div class="mny-sub-eq">${eqText}</div>` : ''}
        </div>
        <div class="mny-sub-right"><span class="mny-sub-amt">${fmtCur(s.amount, s.cur)}<span class="mny-sub-cyc">${cyc}</span></span></div>
      </div>`;
    }).join('');
    $('mny-subs').innerHTML = `
      <div class="hero mny-hero">
        <div class="mny-hero-lbl">Recurring per month</div>
        <div class="mny-hero-bal">${fmtMoney(Math.round(moBurn))}</div>
        <div class="mny-hero-sub">${SUBS.length} items · ${fmtMoney(Math.round(yrBurn))}/year</div>
      </div>
      <div class="card"><div class="section-title">By next billing date</div><div class="mny-subs-list">${rows}</div></div>`;
  }

  // ── category history modal ──
  function openCat(cat) {
    const items = (cur().expenses || []).filter(e => e.category === cat).sort((a, b) => b.date.localeCompare(a.date));
    const total = items.reduce((s, e) => s + e.amount, 0);
    $('mnyMTitle').innerHTML = `<span class="mny-mtitle-ic">${catSvg(cat)}</span>${esc(cat)}`;
    $('mnyMSub').textContent = items.length ? `${items.length} items · ${fmtMoney(total)}` : 'No items';
    $('mnyMBody').innerHTML = items.length
      ? `<div class="card mny-list">${items.map(e => `<div class="mny-row"><div class="mny-row-lead">
          <div class="mny-row-title">${esc(e.name)}</div>${e.name_th ? `<div class="mny-row-th">${esc(e.name_th)}</div>` : ''}<div class="mny-row-sub">${fmtDate(e.date)}${e.notes ? ' · ' + esc(e.notes) : ''}</div></div>
          <span class="mny-amt neg">-${fmtMoney(e.amount)}</span></div>`).join('')}</div>`
      : '<div class="empty">No expenses in this category</div>';
    $('mnyOverlay').classList.add('active');
    pushOverlayState('cat');
  }
  function closeModal() {
    const o = $('mnyOverlay'); o.classList.add('closing');
    setTimeout(() => o.classList.remove('active', 'closing'), 300);
  }

  // ── ผูก overlay (modal หมวด / หน้า Budget breakdown) เข้ากับ browser history ──
  // ปุ่ม/ท่า back ของระบบ (Android) เป็นคนละกลไกกับปัดในแอป — ถ้าไม่ผูก history กด back เครื่องจะข้ามออกจากแอปทั้งที
  // overlayStack เก็บลำดับชั้นที่เปิดจริง (LIFO) — กันบัค "เปิด category modal จากใน Budget breakdown แล้วกด back
  // ครั้งเดียวปิดทั้งสองชั้นพร้อมกัน" (เจอจริง 3 ส.ค. 2026): เดิม popstate เช็คว่าชั้นไหน "active" อยู่แล้วปิดทุกชั้นที่ active
  // พร้อมกันหมด ทั้งที่ back ควรปิดแค่ชั้นบนสุดที่เพิ่งถูก pop — ตอนนี้ปิดเฉพาะชั้นที่ pop ออกมาจาก stack เท่านั้น
  let overlayStack = [];
  function pushOverlayState(kind) {
    overlayStack.push(kind);
    history.pushState({ mnyOverlay: kind }, '');
  }
  // ใช้แทนการปิด overlay ตรงๆ ทุกจุดที่ผู้ใช้กดปิดเอง — ให้ history.back() เป็นคนสั่งจริง แล้ว popstate ด้านล่างปิด DOM ให้
  function goBackIfOverlay() {
    if (history.state && history.state.mnyOverlay) history.back();
  }
  function wirePopstate() {
    window.addEventListener('popstate', () => {
      const kind = overlayStack.pop();
      if (kind === 'cat') closeModal();
      else if (kind === 'budget') closeBudgetPage();
    });
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
      if (e.target.closest('#mnyOpenBudget')) { openBudgetPage(); return; }
      const br = e.target.closest('[data-cat]'); if (br) openCat(br.dataset.cat);
    });
    $('mnyMClose').onclick = goBackIfOverlay;
    $('mnyOverlay').onclick = e => { if (e.target === $('mnyOverlay')) goBackIfOverlay(); };
    $('mnyBudgetBack').onclick = goBackIfOverlay;
    wirePopstate();
  }

  // ── bill reminder banner (subscription ตัดบิลใน 2 วัน) ──
  function paidThisCycle(s) {
    const latestKey = KEYS[KEYS.length - 1];
    const exps = (DATA[latestKey] && DATA[latestKey].expenses) || [];
    return exps.some(e => e.category === 'Subscriptions' && e.name.trim().toLowerCase() === s.name.trim().toLowerCase());
  }
  function renderBillAlert() {
    const el = $('mnyBillAlert'); if (!el) return;
    const now = new Date(); now.setHours(0, 0, 0, 0);
    const soon = SUBS.map(s => ({ ...s, days: Math.round((nextRenew(s) - now) / 86400000) }))
      .filter(s => s.days >= 0 && s.days <= 2 && !paidThisCycle(s)).sort((a, b) => a.days - b.days);
    if (!soon.length) { el.innerHTML = ''; return; }
    const when = d => d === 0 ? 'today' : d === 1 ? 'tomorrow' : `in ${d} days`;
    const items = soon.map(s => `<div><b>${esc(s.name)}</b> bills ${when(s.days)} · ${fmtCur(s.amount, s.cur)}</div>`).join('');
    el.innerHTML = `<div class="mny-billalert">
      ${S('<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>')}
      <div>${items}</div></div>`;
  }

  function mount(el) {
    if (el.dataset.mounted) return;
    root = el; el.innerHTML = TEMPLATE; el.dataset.mounted = '1';
    monthIdx = KEYS.length - 1;
    wire(); renderMonthBar(); renderBillAlert(); switchTab('overview');
  }
  return { mount };
})();

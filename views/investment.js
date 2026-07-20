// ===== Investment Tracker hub — สรุปข่าวการลงทุน/การเงินโลกรายวัน (data: data/investment.data.js) =====
window.InvestmentView = (function () {
  const DATA = window.INVESTMENT_DATA || { briefs: [], portfolioReviews: [] };
  const BRIEFS = DATA.briefs || [];
  const REVIEWS = DATA.portfolioReviews || [];

  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const fmtDate = d => { if (!d) return ''; const [y, m, day] = d.split('-'); return `${day}/${m}/${y.slice(2)}`; };
  const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const fmtMonth = ym => { const [y, m] = ym.split('-'); return `${MONTH_NAMES[parseInt(m, 10) - 1]} ${y}`; };
  const S = p => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const chevron = open => `<svg class="inv-month-chev${open ? ' open' : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>`;
  const CHART_ICON = '<path d="M3 3v18h18"/><path d="M7 14l4-5 3 3 5-7"/>';
  // เฉด coral เข้ม→อ่อนตามลำดับ (ภาษาเดียวกับโดนัท Money — ห้ามกลับไปหลายสี)
  const ramp = (i, n) => {
    const t = n <= 1 ? 0 : i / (n - 1);
    const mix = (a, b) => Math.round(a + (b - a) * t);
    return `rgb(${mix(181, 238)},${mix(97, 196)},${mix(63, 176)})`;
  };

  // ── state ──
  let root, activeTab = 'news', archFilter = 'all', expandedMonths = null;
  const $ = id => root.querySelector('#' + id);
  const briefById = id => BRIEFS.find(b => b.id === id);
  const reviewById = id => REVIEWS.find(r => r.id === id);
  const latestDate = () => BRIEFS.reduce((m, b) => (b.date > m ? b.date : m), BRIEFS[0] ? BRIEFS[0].date : '');

  const TEMPLATE = `
  <div class="container inv">
    <div id="inv-news" class="inv-pane active"></div>
    <div id="inv-portfolio" class="inv-pane"></div>
    <nav class="tabbar">
      <button class="inv-tabbtn tab-item active" data-tab="news">${S('<path d="M4 6h16M4 12h16M4 18h10"/>')}<span>News</span></button>
      <button class="inv-tabbtn tab-item" data-tab="portfolio">${S(CHART_ICON)}<span>Portfolio</span></button>
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

  // ── news: hero + "Latest" (ข่าววันล่าสุดเด่นบนสุด) + ประวัติเก่ากลุ่มรายเดือน (พับทุกเดือน) ──
  function renderNews() {
    const ld = latestDate();
    const total = BRIEFS.length;
    const latestCount = BRIEFS.filter(b => b.date === ld).length;
    const macroCount = BRIEFS.filter(b => b.macro).length;
    const sources = new Set(BRIEFS.map(b => b.sourceName).filter(Boolean)).size;

    const list = archFilter === 'all' ? BRIEFS : BRIEFS.filter(b => (archFilter === 'macro' ? b.macro : !b.macro));
    const latestItems = list.filter(b => b.date === ld);
    const earlier = list.filter(b => b.date !== ld);
    const months = [...new Set(earlier.map(b => b.date.slice(0, 7)))].sort((a, b) => b.localeCompare(a));
    if (expandedMonths === null) expandedMonths = new Set();

    const chips = [
      { k: 'all', l: 'All' }, { k: 'macro', l: 'Macro' }, { k: 'company', l: 'Company' }
    ].map(c => `<button class="inv-chipbtn${archFilter === c.k ? ' on' : ''}" data-filt="${c.k}">${c.l}</button>`).join('');

    const latestSec = latestItems.length ? `
      <div class="inv-sec-lab"><span>Latest</span><span>${fmtDate(ld)}</span></div>
      <div class="card inv-list inv-feat">${latestItems.map(rowItem).join('')}</div>` : '';

    const groups = months.map(ym => {
      const monthItems = earlier.filter(b => b.date.slice(0, 7) === ym);
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
          <span class="inv-month-meta"><span class="inv-month-count">${monthItems.length}</span>${chevron(open)}</span>
        </button>
        <div class="inv-month-body"${open ? '' : ' hidden'}>${days}</div>
      </div>`;
    }).join('');
    const earlierSec = groups ? `<div class="inv-sec-lab"><span>Earlier</span></div>${groups}` : '';

    $('inv-news').innerHTML = `
      <div class="hero inv-hero">
        <div class="hero-eyebrow">Investment Briefs</div>
        <div class="hero-figure" data-count="${total}" data-cdec="0">${total}</div>
        <div class="hero-cap">${ld ? 'Latest: ' + fmtDate(ld) : 'No briefs yet'}</div>
        <div class="hero-split">
          <div class="hero-cell"><div class="hero-cell-lab">Latest Day</div><div class="hero-cell-val">${latestCount}</div></div>
          <div class="hero-cell"><div class="hero-cell-lab">Macro</div><div class="hero-cell-val">${macroCount}</div></div>
          <div class="hero-cell"><div class="hero-cell-lab">Sources</div><div class="hero-cell-val">${sources}</div></div>
        </div>
      </div>
      <div class="inv-filters">${chips}</div>
      ${latestSec}${earlierSec}
      ${latestSec || earlierSec ? '' : '<div class="empty">No briefs yet</div>'}`;
    if (window.UIFX) window.UIFX.countAll($('inv-news'));
    root.querySelectorAll('[data-filt]').forEach(b => b.onclick = () => { archFilter = b.dataset.filt; renderNews(); });
    root.querySelectorAll('[data-month]').forEach(b => b.onclick = () => {
      const ym = b.dataset.month;
      if (expandedMonths.has(ym)) expandedMonths.delete(ym); else expandedMonths.add(ym);
      renderNews();
    });
  }

  // ── portfolio review ──
  function reviewRow(r) {
    const snap = (r.snapshot || '').replace(/\s+/g, ' ').trim();
    const excerpt = snap.length > 90 ? snap.slice(0, 90) + '…' : snap;
    return `<div class="inv-row" data-pr-id="${esc(r.id)}">
      <div class="inv-row-body">
        <div class="inv-row-title">Portfolio Review — ${fmtDate(r.date)}</div>
        <div class="inv-row-sub">${excerpt}</div>
      </div>
      <svg class="inv-row-arrow" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>
    </div>`;
  }

  function allocBars(rows) {
    const alloc = (rows || []).slice(0, 5);
    if (!alloc.length) return '';
    return `<div class="inv-abars">${alloc.map((a, i) => {
      const w = Math.min(100, Math.max(0, parseFloat(a.pct) || 0));
      return `<div class="inv-abar-row">
        <div class="inv-abar-lab">${esc(a.label)}</div>
        <div class="inv-abar"><div class="inv-abar-fill" style="width:${w}%;background:${ramp(i, alloc.length)}"></div></div>
        <div class="inv-abar-pct">${esc(a.pct)}%</div>
      </div>`;
    }).join('')}</div>`;
  }

  function renderPortfolio() {
    const sorted = [...REVIEWS].sort((a, b) => b.date.localeCompare(a.date));
    const latest = sorted[0];
    let body;
    if (!latest) {
      body = `<div class="card inv-empty">
        ${S(CHART_ICON)}
        <div class="t">No reviews yet</div>
        <div class="s">Paste your holdings in chat and ask Jarvis to review your portfolio</div>
      </div>`;
    } else {
      const snap = (latest.snapshot || '').replace(/\s+/g, ' ').trim();
      body = `
        <div class="inv-sec-lab"><span>Latest Review</span><span>${fmtDate(latest.date)}</span></div>
        <div class="card inv-spot" data-pr-id="${esc(latest.id)}">
          <div class="inv-spot-snap">${esc(snap)}</div>
          ${allocBars(latest.allocation)}
          <div class="inv-spot-more">Tap for full review</div>
        </div>
        ${sorted.length > 1 ? `<div class="inv-sec-lab"><span>History</span></div>
        <div class="card inv-list">${sorted.slice(1).map(reviewRow).join('')}</div>` : ''}`;
    }
    $('inv-portfolio').innerHTML = `
      <div class="hero inv-hero">
        <div class="hero-eyebrow">Portfolio Reviews</div>
        <div class="hero-figure" data-count="${sorted.length}" data-cdec="0">${sorted.length}</div>
        <div class="hero-cap">${latest ? 'Latest: ' + fmtDate(latest.date) : 'No reviews yet'}</div>
      </div>
      ${body}`;
    if (window.UIFX) window.UIFX.countAll($('inv-portfolio'));
  }

  function allocTable(rows) {
    if (!rows || !rows.length) return '';
    return `<table class="inv-alloc"><tbody>${rows.map(a => `<tr><td>${esc(a.label)}</td><td class="num">${esc(a.pct)}%</td></tr>`).join('')}</tbody></table>`;
  }
  function bulletList(items) {
    return `<ul class="inv-bullets">${(items || []).map(m => `<li><strong>${esc(m.label)}:</strong> ${esc(m.note)}</li>`).join('')}</ul>`;
  }

  function openReview(id) {
    const r = reviewById(id); if (!r) return;
    $('invMTitle').textContent = 'Portfolio Review';
    $('invMSub').textContent = fmtDate(r.date);
    $('invMBody').innerHTML = `
      <div class="inv-pr-section">
        <div class="section-title">Snapshot</div>
        <div class="inv-summary">${esc(r.snapshot)}</div>
        ${allocTable(r.allocation)}
      </div>
      <div class="inv-pr-section">
        <div class="section-title">Current Macro Lens</div>
        ${bulletList(r.macroLens)}
      </div>
      <div class="inv-pr-twocol">
        <div class="inv-pr-pos">
          <div class="section-title">What's Working</div>
          ${bulletList(r.positives)}
        </div>
        <div class="inv-pr-neg">
          <div class="section-title">What Concerns Me</div>
          ${bulletList(r.concerns)}
        </div>
      </div>
      <div class="inv-pr-section">
        <div class="section-title">Discussion Points</div>
        <ol class="inv-bullets">${(r.discussion || []).map(d => `<li>${esc(d)}</li>`).join('')}</ol>
      </div>
      <div class="inv-pr-caveats">${esc(r.caveats)}</div>`;
    $('invOverlay').classList.add('active');
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
    if (tab === 'news') renderNews();
    else if (tab === 'portfolio') renderPortfolio();
  }

  function wire() {
    root.querySelectorAll('.inv-tabbtn').forEach(b => b.onclick = () => switchTab(b.dataset.tab));
    root.addEventListener('click', e => {
      const pr = e.target.closest('[data-pr-id]'); if (pr) { openReview(pr.dataset.prId); return; }
      const c = e.target.closest('[data-id]'); if (c) openBrief(c.dataset.id);
    });
    $('invMClose').onclick = closeModal;
    $('invOverlay').onclick = e => { if (e.target === $('invOverlay')) closeModal(); };
  }

  function mount(el) {
    if (el.dataset.mounted) return;
    root = el; el.innerHTML = TEMPLATE; el.dataset.mounted = '1';
    wire(); switchTab('news');
  }
  return { mount };
})();

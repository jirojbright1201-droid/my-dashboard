// ===== Investment view — พอร์ตลงทุน (data: Investment Tracker/data.js → window.INV_DATA) =====
// ธีม Claude ขาว, กราฟวาดเอง SVG/conic-gradient ไม่พึ่ง Chart.js, modal reuse .overlay/.modal
window.InvestmentView = (function () {
  const D = window.INV_DATA || { holdings: [], thesis: [], companies: [], market: { indices: [], holdings_news: [] }, timeline: [], reports: [] };
  const FX = window.INV_FX || 33;

  // ── derived ──
  const H = (D.holdings || []).map(h => {
    const cost = h.shares * h.avg, val = h.shares * h.price, pl = val - cost;
    return { ...h, cost, val, pl, plpct: cost ? pl / cost * 100 : 0, day: h.prev ? (h.price - h.prev) / h.prev * 100 : 0 };
  });
  const TVAL = H.reduce((s, h) => s + h.val, 0);
  const TCOST = H.reduce((s, h) => s + h.cost, 0);
  const CASH = D.cash || 0;
  const PF = TVAL + CASH;
  H.forEach(h => h.weight = PF ? h.val / PF * 100 : 0);
  const TPL = TVAL - TCOST, TPLPCT = TCOST ? TPL / TCOST * 100 : 0;

  // ── helpers ──
  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const thb = u => '฿' + Math.round(u * FX).toLocaleString();
  const pct = (v, d = 1) => `${v >= 0 ? '+' : ''}${(v || 0).toFixed(d)}%`;
  const cls = v => v >= 0 ? 'pos' : 'neg';
  const paraHtml = s => String(s || '').split(/\n+/).map(p => p.trim()).filter(Boolean).map(p => `<p>${esc(p)}</p>`).join('');
  const THAI_M = { 'ม.ค.':0,'ก.พ.':1,'มี.ค.':2,'เม.ย.':3,'พ.ค.':4,'มิ.ย.':5,'ก.ค.':6,'ส.ค.':7,'ก.ย.':8,'ต.ค.':9,'พ.ย.':10,'ธ.ค.':11 };
  const thaiTs = s => { const p = String(s).trim().split(/\s+/); return new Date(+p[2] || 2026, THAI_M[p[1]] ?? 0, +p[0] || 1).getTime(); };
  const CORAL = ['#cc785c','#e0993c','#5b9e74','#cf6a55','#4f9b96','#c9a23f','#b06f93','#9c7b62'];

  let root, tab = 'overview', coSearch = '';
  const $ = id => root.querySelector('#' + id);

  // ── company icon (logo → fallback ตัวย่อ) ──
  function icon(tk, big) {
    const f = String(tk || '').toLowerCase();
    return `<div class="inv-ic${big ? ' lg' : ''}"><img src="./Investment Tracker/assets/logos/${esc(f)}.png" alt="" onload="this.parentNode.classList.add('hl')" onerror="this.remove()"><span>${esc(String(tk).slice(0, 2))}</span></div>`;
  }

  // ── donut (conic-gradient) สัดส่วนพอร์ต ──
  function donut() {
    const sorted = [...H].sort((a, b) => b.val - a.val);
    const segs = [...sorted.map((h, i) => ({ label: h.tk, val: h.val, col: CORAL[i % CORAL.length] })), { label: 'Cash', val: CASH, col: '#cfc8bd' }];
    const total = segs.reduce((s, x) => s + x.val, 0) || 1;
    let acc = 0;
    const stops = segs.map(s => { const a = acc / total * 100; acc += s.val; return `${s.col} ${a.toFixed(2)}% ${(acc / total * 100).toFixed(2)}%`; });
    const legend = segs.map(s => `<div class="inv-leg"><span class="inv-leg-dot" style="background:${s.col}"></span>
      <span class="inv-leg-n">${esc(s.label)}</span><span class="inv-leg-v">${(s.val / total * 100).toFixed(1)}%</span></div>`).join('');
    return `<div class="inv-donut-wrap">
      <div class="inv-donut" style="background:conic-gradient(${stops.join(',')})"><div class="inv-donut-hole"><span>${H.length}</span><small>ตัว</small></div></div>
      <div class="inv-legend">${legend}</div></div>`;
  }

  // ── performance line (inline SVG area) ──
  function perfChart() {
    const d = D.timeline || [];
    if (d.length < 2) return '<div class="empty">ยังไม่มีข้อมูลพอเพียงพอ</div>';
    const start = d[0].total;
    const pf = d.map(x => (x.total / start - 1) * 100);
    const w = 320, h = 120, mn = Math.min(...pf, 0), mx = Math.max(...pf, 0), r = (mx - mn) || 1;
    const X = i => (i / (pf.length - 1)) * w;
    const Y = v => h - 6 - ((v - mn) / r) * (h - 12);
    // เส้นโค้งนุ่ม (Catmull-Rom → cubic bezier)
    const P = pf.map((v, i) => ({ x: X(i), y: Y(v) }));
    let dPath = `M ${P[0].x.toFixed(1)} ${P[0].y.toFixed(1)}`;
    for (let i = 0; i < P.length - 1; i++) {
      const p0 = P[i ? i - 1 : 0], p1 = P[i], p2 = P[i + 1], p3 = P[i + 2 < P.length ? i + 2 : i + 1], t = 0.17;
      dPath += ` C ${(p1.x + (p2.x - p0.x) * t).toFixed(1)} ${(p1.y + (p2.y - p0.y) * t).toFixed(1)}, ${(p2.x - (p3.x - p1.x) * t).toFixed(1)} ${(p2.y - (p3.y - p1.y) * t).toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }
    const areaPath = `${dPath} L ${w},${h} L 0,${h} Z`;
    const up = pf[pf.length - 1] >= 0, col = up ? 'var(--green)' : 'var(--red)';
    // จุดเด่น: สูงสุด / ต่ำสุด / ล่าสุด
    let hiI = 0, loI = 0;
    pf.forEach((v, i) => { if (v > pf[hiI]) hiI = i; if (v < pf[loI]) loI = i; });
    const lastI = pf.length - 1;
    const dots = [...new Set([hiI, loI, lastI])].map(i => `<circle cx="${X(i).toFixed(1)}" cy="${Y(pf[i]).toFixed(1)}" r="${i === lastI ? 4 : 3.2}" fill="${col}" stroke="#fff" stroke-width="${i === lastI ? 2 : 1.5}"/>`).join('');
    // ข้อมูลต่อจุดสำหรับ crosshair (left%/top% + ค่าที่จะโชว์ตอน hover)
    const meta = pf.map((v, i) => ({ l: +(i / (pf.length - 1) * 100).toFixed(2), t: +(Y(v) / h * 100).toFixed(2), p: +v.toFixed(2), dt: d[i].date, ch: Math.round(d[i].change || 0) }));
    return `<div class="inv-perf-wrap" data-pts='${JSON.stringify(meta)}'>
      <svg class="inv-perf" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
      <defs>
        <linearGradient id="invpf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${col}" stop-opacity=".20"/><stop offset="1" stop-color="${col}" stop-opacity="0"/></linearGradient>
        <filter id="invglow" x="-10%" y="-40%" width="120%" height="200%"><feGaussianBlur stdDeviation="3.2"/></filter>
      </defs>
      <path d="${areaPath}" fill="url(#invpf)"/>
      <path d="${dPath}" fill="none" stroke="${col}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" opacity=".42" filter="url(#invglow)"/>
      <path class="inv-pf-line" d="${dPath}" fill="none" stroke="${col}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
      ${dots}
    </svg>
      <span class="inv-cross"></span><span class="inv-cross-dot"></span><span class="inv-perf-tip"></span>
    </div>`;
  }

  // เส้นแนวตั้งวิ่งตามเมาส์ (crosshair) + ป้ายค่าวันที่ชี้
  function attachPerfHover() {
    const ov = $('inv-overview');
    const wrap = ov && ov.querySelector('.inv-perf-wrap');
    if (!wrap) return;
    let pts; try { pts = JSON.parse(wrap.dataset.pts || '[]'); } catch (e) { return; }
    if (pts.length < 2) return;
    const cross = wrap.querySelector('.inv-cross');
    const dot = wrap.querySelector('.inv-cross-dot');
    const tip = wrap.querySelector('.inv-perf-tip');
    const move = e => {
      const r = wrap.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const ratio = Math.max(0, Math.min(1, (clientX - r.left) / r.width));
      const pt = pts[Math.round(ratio * (pts.length - 1))];
      const up = pt.p >= 0;
      cross.style.left = pt.l + '%';
      dot.style.left = pt.l + '%';
      dot.style.top = pt.t + '%';
      dot.className = 'inv-cross-dot ' + (up ? 'pos' : 'neg');
      tip.innerHTML = `<b class="${up ? 'pos' : 'neg'}">${pct(pt.p)}</b><span>${esc(pt.dt)}</span><i class="${pt.ch >= 0 ? 'pos' : 'neg'}">${pt.ch >= 0 ? '+' : ''}$${Math.abs(pt.ch).toLocaleString()} วันนั้น</i>`;
      tip.style.left = pt.l + '%';
      const ir = pt.l / 100;
      tip.style.transform = ir < 0.14 ? 'translateX(0)' : ir > 0.86 ? 'translateX(-100%)' : 'translateX(-50%)';
      wrap.classList.add('show');
    };
    wrap.addEventListener('mousemove', move);
    wrap.addEventListener('mouseleave', () => wrap.classList.remove('show'));
    wrap.addEventListener('touchstart', move, { passive: true });
    wrap.addEventListener('touchmove', move, { passive: true });
  }

  // ── OVERVIEW ──
  function renderOverview() {
    const top = [...H].sort((a, b) => b.weight - a.weight);
    const assets = top.length ? top.map(h => `<div class="inv-asset" data-act="hold" data-tk="${esc(h.tk)}">
      ${icon(h.tk)}
      <div class="inv-asset-i"><div class="inv-a-tk">${esc(h.tk)}</div><div class="inv-a-nm">${esc(h.name)}</div></div>
      <div class="inv-asset-m"><div class="inv-a-p">$${h.price.toFixed(2)}</div><div class="inv-a-d ${cls(h.day)}">${pct(h.day)}</div></div>
      <div class="inv-asset-e"><div class="inv-a-v">$${Math.round(h.val).toLocaleString()}</div><div class="inv-a-w ${cls(h.pl)}">${pct(h.plpct)}</div></div>
    </div>`).join('') : '<div class="empty" style="line-height:1.7">ยังไม่มีสถานะ — เงินสดรอลงไม้แรก<br><span style="font-size:.78rem">ลงทุนแบบมีวินัย: มี thesis ก่อนซื้อทุกครั้ง</span></div>';

    const d = D.timeline || [];
    const cur = d.length ? d[d.length - 1].total : PF, st = d.length ? d[0].total : PF;
    const chgPct = st ? (cur - st) / st * 100 : 0;
    const today = d.length ? d[d.length - 1].change : 0;

    // recent trades
    const trades = H.flatMap(h => (h.trades || []).map(t => ({ ...t, tk: h.tk }))).sort((a, b) => thaiTs(b.date) - thaiTs(a.date)).slice(0, 4);
    const tradesHtml = trades.length ? trades.map(t => {
      const buy = t.t.includes('ซื้อ');
      return `<div class="inv-trade"><div class="inv-tr-ic ${buy ? 'buy' : 'sell'}">${buy ? '↑' : '↓'}</div>
        <div class="inv-tr-b"><div class="inv-tr-top"><span class="inv-tr-tk">${esc(t.tk)}</span><span class="inv-tr-dt">${esc(t.date)}</span></div>
        <div class="inv-tr-why">${esc(t.why)}</div></div></div>`;
    }).join('') : '<div class="empty">ยังไม่มีการเทรด</div>';

    $('inv-overview').innerHTML = `
      <div class="hero inv-hero">
        <div class="hero-eyebrow">มูลค่าพอร์ต</div>
        <div class="hero-figure" data-count="${PF}" data-cprefix="$" data-cdec="2">$${PF.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        <div class="hero-cap">${thb(PF)} · เงินสด $${CASH.toFixed(2)}</div>
        <div class="hero-split">
          <div class="hero-cell"><div class="hero-cell-lab">ต้นทุน</div><div class="hero-cell-val">$${Math.round(TCOST).toLocaleString()}</div><div class="hero-cell-sub">${thb(TCOST)}</div></div>
          <div class="hero-cell"><div class="hero-cell-lab">กำไร/ขาดทุน</div><div class="hero-cell-val ${cls(TPL)}">${TPL >= 0 ? '+$' : '-$'}${Math.abs(Math.round(TPL)).toLocaleString()}</div><div class="hero-cell-sub ${cls(TPL)}">${pct(TPLPCT)}</div></div>
        </div>
      </div>

      <div class="card"><div class="section-title">ถืออยู่</div><div class="inv-assets">${assets}</div></div>

      <div class="card"><div class="section-title">สัดส่วนพอร์ต</div>${donut()}</div>

      <div class="card">
        <div class="inv-pf-head"><div><div class="section-title" style="margin:0">ผลตอบแทนตั้งแต่เริ่ม</div>
          <div class="inv-pf-bal">$${cur.toLocaleString()} <span class="${cls(chgPct)}">${chgPct >= 0 ? '▲' : '▼'} ${pct(chgPct)}</span></div></div></div>
        <div class="inv-pf-sub">เริ่ม $${st.toLocaleString()} · วันนี้ <b class="${cls(today)}">${today >= 0 ? '+' : ''}$${Math.abs(today).toLocaleString()}</b></div>
        ${perfChart()}
      </div>

      <div class="card"><div class="section-title">เทรดล่าสุด</div><div class="inv-trades">${tradesHtml}</div></div>`;
    attachPerfHover();
    if (window.UIFX) window.UIFX.countAll($('inv-overview'));
  }

  // ── COMPANY ──
  function registry() {
    const youSet = new Set(H.map(h => h.tk));
    const extra = D.companies || [];
    const newsByTk = {};
    const push = (tk, arr) => { if (arr && arr.length) (newsByTk[tk] = newsByTk[tk] || []).push(...arr); };
    H.forEach(h => push(h.tk, h.news));
    (D.market.holdings_news || []).forEach(n => push(n.tk, [n]));
    extra.forEach(c => push(c.tk, c.news));
    Object.values(newsByTk).forEach(a => a.sort((x, y) => thaiTs(y.date) - thaiTs(x.date)));
    const list = [];
    const meta = o => ({ exchange: o.exchange, country: o.country, founded: o.founded, web: o.web });
    H.forEach(h => list.push({ tk: h.tk, name: h.name, sector: h.sector, about: h.about, thesisRef: h.thesisRef, ...meta(h) }));
    extra.forEach(c => list.push({ tk: c.tk, name: c.name, sector: c.sector, about: c.about, thesisRef: c.thesisRef, ...meta(c) }));
    return { list, newsByTk, youSet, soldSet: new Set(extra.filter(c => c.status === 'sold').map(c => c.tk)), watchSet: new Set(extra.filter(c => c.status === 'watch').map(c => c.tk)) };
  }
  let REG = null;
  function badge(tk) {
    if (REG.youSet.has(tk)) return '<span class="inv-badge you">ถืออยู่</span>';
    if (REG.watchSet.has(tk)) return '<span class="inv-badge watch">กำลังดู</span>';
    if (REG.soldSet.has(tk)) return '<span class="inv-badge sold">ขายแล้ว</span>';
    return '';
  }
  function renderCompany() {
    REG = registry();
    $('inv-company').innerHTML = `
      <div class="inv-search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.4-3.4"/></svg>
        <input id="invCoSearch" placeholder="ค้นหา ticker หรือชื่อบริษัท" value="${esc(coSearch)}"></div>
      <div id="invCoList"></div>`;
    $('invCoSearch').oninput = e => { coSearch = e.target.value; renderCoList(); };
    renderCoList();
  }
  function renderCoList() {
    const q = coSearch.trim().toLowerCase();
    const f = REG.list.filter(c => !q || c.tk.toLowerCase().includes(q) || String(c.name || '').toLowerCase().includes(q));
    $('invCoList').innerHTML = f.length ? `<div class="inv-co-grid">${f.map(c => {
      const hasRep = (D.reports || []).some(r => r.ticker === c.tk);
      return `<div class="inv-co-card" data-act="co" data-tk="${esc(c.tk)}">
        <div class="inv-co-top">${icon(c.tk)}<div class="inv-co-h"><span class="inv-co-tk">${esc(c.tk)}</span>${badge(c.tk)}</div></div>
        <div class="inv-co-nm">${esc(c.name)}</div>
        <div class="inv-co-about">${esc(c.about || '—')}</div>
        <div class="inv-co-foot"><span>${esc(c.sector || '')}</span>${hasRep ? '<span class="inv-rep">รายงาน ↗</span>' : ''}</div>
      </div>`;
    }).join('')}</div>` : '<div class="empty">ไม่พบบริษัทที่ค้นหา</div>';
  }

  // ── THESIS ──
  function renderThesis() {
    $('inv-thesis').innerHTML = `<div class="section-title">Thesis — มุมมองเบื้องหลังการลงทุน</div>
      ${(D.thesis || []).map((t, i) => `<div class="card inv-th-row" data-act="th" data-i="${i}">
        <span class="inv-th-cat">${esc(t.cat)}</span>
        <div class="inv-th-t">${esc(t.t)}</div><div class="inv-th-m">${esc(t.sum)}</div></div>`).join('') || '<div class="empty">ยังไม่มี thesis</div>'}`;
  }

  // ── MARKET ──
  function sparkSvg(arr, up) {
    const w = 120, h = 30, mn = Math.min(...arr), mx = Math.max(...arr), r = (mx - mn) || 1;
    const xy = arr.map((v, i) => [(i / (arr.length - 1)) * w, h - 2 - ((v - mn) / r) * (h - 4)]);
    const line = xy.map(p => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
    const col = up ? 'var(--green)' : 'var(--red)';
    return `<svg class="inv-spark" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none"><polyline points="${line}" fill="none" stroke="${col}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/></svg>`;
  }
  function renderMarket() {
    const idx = (D.market.indices || []).map(i => {
      const up = (i.c || 0) >= 0;
      return `<div class="card inv-idx"><div class="inv-idx-top"><span class="inv-idx-n">${esc(i.n)}</span>
        <span class="inv-idx-c ${cls(i.c)}">${i.c >= 0 ? '▲' : '▼'} ${pct(i.c)}</span></div>
        <div class="inv-idx-p">${esc(i.p)}</div>${i.spark ? sparkSvg(i.spark, up) : ''}</div>`;
    }).join('');
    const news = [...H.flatMap(h => (h.news || []).map(n => ({ ...n, tk: h.tk }))), ...(D.market.holdings_news || [])]
      .sort((a, b) => thaiTs(b.date) - thaiTs(a.date));
    news.forEach((n, i) => n._i = i);
    const newsHtml = news.length ? news.map(n => `<div class="card inv-hn" data-act="news" data-i="${n._i}">
      <div class="inv-hn-top"><span class="inv-hn-tk">${esc(n.tk)}</span></div>
      <div class="inv-hn-head">${esc(n.head)}</div>
      <div class="inv-hn-foot"><span>${esc(n.src)}</span> · <span>${esc(n.date)}</span></div></div>`).join('') : '<div class="empty">ยังไม่มีข่าว</div>';
    INV_NEWS = news;
    $('inv-market').innerHTML = `<div class="section-title">ดัชนีตลาด</div><div class="inv-idx-grid">${idx}</div>
      <div class="section-title">ข่าวหุ้นที่ถือ</div><div class="inv-hn-grid">${newsHtml}</div>`;
  }
  let INV_NEWS = [];

  // ── modals ──
  function openModal(title, sub, body) {
    $('invMTitle').innerHTML = title; $('invMSub').textContent = sub || ''; $('invMBody').innerHTML = body;
    $('invOverlay').classList.add('active');
  }
  function closeModal() { const o = $('invOverlay'); o.classList.add('closing'); setTimeout(() => o.classList.remove('active', 'closing'), 300); }

  function openHold(tk) {
    const h = H.find(x => x.tk === tk); if (!h) return;
    const wk = Date.now() - 7 * 86400000;
    const recent = (h.news || []).filter(n => thaiTs(n.date) >= wk);
    const news = recent.length ? recent.map(n => `<div class="inv-news"><div class="inv-news-h">${esc(n.head)}</div><div class="inv-news-f">${esc(n.src)} · ${esc(n.date)}</div></div>`).join('') : '<div class="empty">ไม่มีข่าวใน 7 วันล่าสุด</div>';
    const trades = (h.trades || []).map(t => `<div class="inv-news"><div class="inv-news-h">${esc(t.t)} · ${esc(t.date)}</div><div class="inv-tr-why">${esc(t.why)}</div></div>`).join('') || '<div class="empty">—</div>';
    openModal(`${esc(h.tk)} <span class="inv-m-name">${esc(h.name)}</span>`, h.sector,
      `<div class="inv-stats">
        <div class="inv-st"><span>ราคา</span><b>$${h.price.toFixed(2)} <span class="${cls(h.day)}">${pct(h.day)}</span></b></div>
        <div class="inv-st"><span>มูลค่า</span><b>$${h.val.toFixed(2)}</b></div>
        <div class="inv-st"><span>จำนวนหุ้น</span><b>${h.shares}</b></div>
        <div class="inv-st"><span>ต้นทุนเฉลี่ย</span><b>$${h.avg.toFixed(2)}</b></div>
        <div class="inv-st"><span>สัดส่วน</span><b>${h.weight.toFixed(1)}%</b></div>
        <div class="inv-st"><span>กำไร/ขาดทุน</span><b class="${cls(h.pl)}">${h.pl >= 0 ? '+$' : '-$'}${Math.abs(h.pl).toFixed(2)} (${pct(h.plpct)})</b></div>
      </div>
      <div class="inv-m-sec">ประวัติเทรด</div>${trades}
      <div class="inv-m-sec">ข่าวล่าสุด (7 วัน)</div>${news}`);
  }
  function openCo(tk) {
    const rep = (D.reports || []).slice().reverse().find(r => r.ticker === tk);
    if (rep) { window.open('./reports/' + rep.file, '_blank'); return; }
    const c = REG.list.find(x => x.tk === tk); if (!c) return;
    const allNw = REG.newsByTk[tk] || [];
    const news = allNw.length ? allNw.map(n => `<div class="inv-news"><div class="inv-news-h">${esc(n.head)}</div>${n.sum ? `<div class="inv-news-s">${esc(n.sum)}</div>` : ''}<div class="inv-news-f">${esc(n.src)} · ${esc(n.date)}</div></div>`).join('') : '<div class="empty">ยังไม่มีข่าว</div>';
    const fact = (k, v) => v ? `<div class="inv-fact"><span>${k}</span><span>${esc(String(v))}</span></div>` : '';
    const web = c.web ? `<div class="inv-fact"><span>Website</span><a href="https://${esc(c.web)}" target="_blank" rel="noopener">${esc(c.web)}</a></div>` : '';
    const thIdx = c.thesisRef ? (D.thesis || []).findIndex(t => t.cat === c.thesisRef) : -1;
    const thesis = thIdx >= 0 ? `<div class="inv-m-sec">Thesis ที่เกี่ยวข้อง</div><div class="card inv-th-row" data-act="th" data-i="${thIdx}"><span class="inv-th-cat">${esc(D.thesis[thIdx].cat)}</span><div class="inv-th-t">${esc(D.thesis[thIdx].t)}</div></div>` : '';
    openModal(`${esc(c.tk)} <span class="inv-m-name">${esc(c.name)}</span>`, c.sector,
      `<div class="inv-facts">${fact('Exchange', c.exchange)}${fact('Country', c.country)}${fact('Founded', c.founded)}${web}</div>
       <div class="inv-m-sec">เกี่ยวกับ</div><div class="inv-about">${esc(c.about || '—')}</div>
       ${thesis}
       <div class="inv-m-sec">ข่าว (${allNw.length})</div>${news}`);
  }
  function openThesis(i) {
    const t = (D.thesis || [])[i]; if (!t) return;
    const secs = (t.sections || []).map(s => `<div class="inv-th-sec"><div class="inv-th-sec-h">${esc(s.h)}</div><div class="inv-th-sec-b">${paraHtml(s.b)}</div></div>`).join('');
    openModal(`<span class="inv-th-cat">${esc(t.cat)}</span><div class="inv-m-thtitle">${esc(t.t)}</div>`, 'อัปเดต ' + esc(t.updated),
      `<div class="inv-th-sum">${esc(t.sum)}</div><div class="inv-th-full">${paraHtml(t.full)}</div>${secs}`);
  }
  function openNews(i) {
    const n = INV_NEWS[i]; if (!n) return;
    openModal(`<span class="inv-hn-tk">${esc(n.tk)}</span><div class="inv-m-newshead">${esc(n.head)}</div>`, '',
      `${n.sum ? `<div class="inv-news-s" style="font-size:.9rem;line-height:1.7">${esc(n.sum)}</div>` : ''}<div class="inv-news-f" style="margin-top:14px;text-align:right">${esc(n.src)} · ${esc(n.date)}</div>`);
  }

  // ── tabs ──
  function switchTab(t) {
    tab = t;
    root.querySelectorAll('.inv-tab').forEach(b => b.classList.toggle('active', b.dataset.tab === t));
    root.querySelectorAll('.inv-pane').forEach(p => p.classList.toggle('active', p.id === 'inv-' + t));
    ({ overview: renderOverview, company: renderCompany, thesis: renderThesis, market: renderMarket })[t]();
  }

  const TEMPLATE = `
  <div class="container inv">
    <div class="inv-tabs">
      <button class="inv-tab active" data-tab="overview">ภาพรวม</button>
      <button class="inv-tab" data-tab="company">บริษัท</button>
      <button class="inv-tab" data-tab="thesis">Thesis</button>
      <button class="inv-tab" data-tab="market">ตลาด</button>
    </div>
    <div id="inv-overview" class="inv-pane active"></div>
    <div id="inv-company" class="inv-pane"></div>
    <div id="inv-thesis" class="inv-pane"></div>
    <div id="inv-market" class="inv-pane"></div>
  </div>
  <div class="overlay" id="invOverlay">
    <div class="modal">
      <div class="sheet-handle"></div>
      <div class="modal-head"><div><div class="modal-title" id="invMTitle"></div><div class="modal-sub" id="invMSub"></div></div>
        <button class="modal-close" id="invMClose"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>
      <div class="modal-body" id="invMBody"></div>
    </div>
  </div>`;

  function mount(el) {
    if (el.dataset.mounted) return;
    root = el; el.innerHTML = TEMPLATE; el.dataset.mounted = '1';
    REG = registry();
    root.querySelectorAll('.inv-tab').forEach(b => b.onclick = () => switchTab(b.dataset.tab));
    root.addEventListener('click', e => {
      const a = e.target.closest('[data-act]'); if (!a) return;
      const act = a.dataset.act;
      if (act === 'hold') openHold(a.dataset.tk);
      else if (act === 'co') openCo(a.dataset.tk);
      else if (act === 'th') openThesis(+a.dataset.i);
      else if (act === 'news') openNews(+a.dataset.i);
    });
    $('invMClose').onclick = closeModal;
    $('invOverlay').onclick = e => { if (e.target === $('invOverlay')) closeModal(); };
    switchTab('overview');
  }
  // สรุปพอร์ตให้ Home card
  function summary() { return { value: PF, pl: TPL, plpct: TPLPCT, cash: CASH, holdings: H.length }; }
  return { mount, summary };
})();

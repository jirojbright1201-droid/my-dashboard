// ===== Investment Tracker hub — สรุปข่าวการลงทุน/การเงินโลกรายวัน (data: data/investment.data.js) =====
// ลุค Editorial (หนังสือพิมพ์/Apple News) — jiroj เลือกเอง 21 ก.ค. 2026: masthead แทน hero เข้ม, พาดหัว serif, filter แท็บขีดเส้นใต้
window.InvestmentView = (function () {
  const DATA = window.INVESTMENT_DATA || { briefs: [], portfolioReviews: [], earningsReviews: [], companyDeepDives: [] };
  const BRIEFS = DATA.briefs || [];
  const REVIEWS = DATA.portfolioReviews || [];
  const EARNINGS = DATA.earningsReviews || [];
  const DEEPDIVES = DATA.companyDeepDives || [];
  const VERDICT_LABEL = { beat: 'Beat', miss: 'Miss', inline: 'In-line' };

  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const fmtDate = d => { if (!d) return ''; const [y, m, day] = d.split('-'); return `${day}/${m}/${y.slice(2)}`; };
  const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const fmtLong = d => {
    const [y, m, day] = d.split('-').map(Number);
    return `${WEEKDAYS[new Date(y, m - 1, day).getDay()]} · ${MONTH_NAMES[m - 1]} ${day}, ${y}`;
  };
  const fmtDayLabel = (d, refYear) => {
    const [y, m, day] = d.split('-');
    return `${parseInt(day, 10)} ${MONTH_NAMES[parseInt(m, 10) - 1]}${y !== refYear ? ' ' + y : ''}`;
  };
  const fmtMonth = ym => { const [y, m] = ym.split('-'); return `${MONTH_NAMES[parseInt(m, 10) - 1]} ${y}`; };
  const S = p => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  // เฉด coral เข้ม→อ่อนตามลำดับ (ภาษาเดียวกับโดนัท Money — ห้ามกลับไปหลายสี)
  const ramp = (i, n) => {
    const t = n <= 1 ? 0 : i / (n - 1);
    const mix = (a, b) => Math.round(a + (b - a) * t);
    return `rgb(${mix(181, 238)},${mix(97, 196)},${mix(63, 176)})`;
  };

  // ── state ──
  let root, activeTab = 'news', archFilter = 'all', expandedDays = null, expandedMonths = null;
  const $ = id => root.querySelector('#' + id);
  const briefById = id => BRIEFS.find(b => b.id === id);
  const reviewById = id => REVIEWS.find(r => r.id === id);
  const earningsById = id => EARNINGS.find(e => e.id === id);
  const deepDiveById = id => DEEPDIVES.find(d => d.id === id);
  const latestDate = () => BRIEFS.reduce((m, b) => (b.date > m ? b.date : m), BRIEFS[0] ? BRIEFS[0].date : '');

  const TEMPLATE = `
  <div class="container inv">
    <div id="inv-news" class="inv-pane active"></div>
    <div id="inv-portfolio" class="inv-pane"></div>
    <div id="inv-earnings" class="inv-pane"></div>
    <div id="inv-deepdive" class="inv-pane"></div>
    <nav class="tabbar">
      <button class="inv-tabbtn tab-item active" data-tab="news">${S('<path d="M4 6h16M4 12h16M4 18h10"/>')}<span>News</span></button>
      <button class="inv-tabbtn tab-item" data-tab="portfolio">${S('<path d="M3 3v18h18"/><path d="M7 14l4-5 3 3 5-7"/>')}<span>Portfolio</span></button>
      <button class="inv-tabbtn tab-item" data-tab="earnings">${S('<rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M8 8h8M8 12h8M8 16h5"/>')}<span>Earnings</span></button>
      <button class="inv-tabbtn tab-item" data-tab="deepdive">${S('<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>')}<span>Deep-Dive</span></button>
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
  </div>

  <div class="inv-article" id="invArticle">
    <div class="inv-art-hero">
      <div class="inv-art-media" id="invArtMedia"></div>
      <button class="inv-art-back" id="invArtBack"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg></button>
    </div>
    <div class="inv-art-scroll" id="invArtScroll">
      <div class="inv-art-body">
        <div class="inv-art-h" id="invArtH"></div>
        <div class="inv-art-rule"></div>
        <div class="inv-art-byline" id="invArtByline"></div>
        <div class="inv-art-p" id="invArtP"></div>
      </div>
    </div>
    <div class="inv-art-footer"><a class="inv-open-btn" id="invArtLink" href="#" target="_blank" rel="noopener">Open Original &#8599;</a></div>
  </div>

  <div class="inv-article inv-full-reader" id="invDeepArticle">
    <div class="inv-full-topbar">
      <button class="inv-full-backbtn" id="invDDBack"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg></button>
    </div>
    <div class="inv-art-scroll" id="invDDScroll">
      <div class="inv-art-body" id="invDDBody"></div>
    </div>
  </div>

  <div class="inv-article inv-full-reader" id="invEarnArticle">
    <div class="inv-full-topbar">
      <button class="inv-full-backbtn" id="invEarnBack"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg></button>
    </div>
    <div class="inv-art-scroll" id="invEarnScroll">
      <div class="inv-art-body" id="invEarnBody"></div>
    </div>
  </div>`;

  function tagChip(macro) {
    return `<span class="inv-tag ${macro ? 'macro' : 'company'}">${macro ? 'Macro' : 'Company'}</span>`;
  }
  // ไอคอน fallback สุดท้าย ตามหมวด macro/company — ใช้เมื่อไม่มีทั้ง image จริงและรูปหมวด topic (ห้าม hotlink favicon/tile แบบเดิมที่เคยลองแล้วไม่สวย)
  const ICON_MACRO = S('<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.5 2.5 4 5.5 4 9s-1.5 6.5-4 9c-2.5-2.5-4-5.5-4-9s1.5-6.5 4-9z"/>');
  const ICON_COMPANY = S('<path d="M4 20V10"/><path d="M10 20V4"/><path d="M16 20v-7"/><path d="M2 20h20"/>');
  function fallbackMediaHtml(macro) {
    return `<div class="inv-art-fallback">${macro ? ICON_MACRO : ICON_COMPANY}</div>`;
  }
  // รูปเชิงหมวด (จำลอง/ใกล้เคียง ไม่ใช่รูปข่าวนั้นจริง) — ใช้เมื่อ brief ไม่มี og:image จริง แต่มีการเดา topic ไว้
  // ทุกไฟล์โฮสต์ที่ Wikimedia Commons (ลิงก์ถาวร เหมือนโลโก้ Money — ดู CLAUDE.md ข้อ 8.5) เพิ่ม 22 ก.ค. 2026
  const WM = f => `https://commons.wikimedia.org/wiki/Special:FilePath/${f}?width=1200`;
  const TOPIC_IMAGES = {
    oil: WM('Neste_Oil_Porvoo_refinery.jpg'),
    gold: WM('400-oz-Gold-Bars-AB-01.jpg'),
    fx: WM('Stack_of_100_dollar_bills.jpg'),
    fed: WM('Marriner_S._Eccles_Federal_Reserve_Board_Building.jpg'),
    china: WM('Shanghai_-_Skyline_Sunset_0057.jpg'),
    market: WM('NYSE-floor.jpg'),
    chips: WM('Semiconductor_Wafer_of_Microelectronics.jpg'),
    bigtech: WM('Datacenter_Server_Racks_(22370909788).jpg'),
    auto: WM('Hyundai_car_assembly_line.jpg'),
    aerospace: WM('Antonov_An-225_at_Farnborough_1990_airshow.jpg')
  };
  function renderArtMedia(b) {
    const media = $('invArtMedia');
    const topicUrl = b.topic ? TOPIC_IMAGES[b.topic] : '';
    const src = b.image || topicUrl;
    if (src) {
      media.innerHTML = '';
      const img = document.createElement('img');
      img.alt = '';
      img.referrerPolicy = 'no-referrer';
      // รูปจริงพังก่อน → ลองรูป topic (ถ้ายังไม่ได้ลอง) → ถึงจะตกไปไอคอน
      img.onerror = () => {
        if (b.image && topicUrl && img.src !== topicUrl) { img.src = topicUrl; }
        else { media.innerHTML = fallbackMediaHtml(b.macro); }
      };
      img.src = src;
      media.appendChild(img);
    } else {
      media.innerHTML = fallbackMediaHtml(b.macro);
    }
  }

  // ── editorial building blocks ──
  function masthead(kicker) {
    return `<div class="inv-mast">
      <div class="inv-mast-kicker">${kicker}</div>
      <div class="inv-mast-rule"></div>
    </div>`;
  }
  function edMeta(b, withDate) {
    return `<div class="inv-ed-meta">
      <span class="inv-tag-txt ${b.macro ? 'm' : 'c'}">${b.macro ? 'Macro' : 'Company'}</span>
      <span class="inv-ed-src">${esc(b.sourceName)}</span>${withDate ? `<span>· ${fmtDate(b.date)}</span>` : ''}
    </div>`;
  }
  function edLead(b) {
    return `<div class="inv-ed-lead" data-id="${esc(b.id)}">
      <div class="inv-ed-lead-h">${esc(b.title)}</div>
      <div class="inv-ed-lead-sum">${esc(b.summary)}</div>
      ${edMeta(b, false)}
    </div>`;
  }
  function edItem(b, withDate) {
    return `<div class="inv-ed-item" data-id="${esc(b.id)}">
      <div class="inv-ed-h">${esc(b.title)}</div>
      ${edMeta(b, withDate)}
    </div>`;
  }

  // ── news: masthead + ข่าววันล่าสุด (ตัวแรกเป็น lead) + Earlier คั่นด้วยหัววันที่ ──
  function renderNews() {
    const ld = latestDate();
    const list = archFilter === 'all' ? BRIEFS : BRIEFS.filter(b => (archFilter === 'macro' ? b.macro : !b.macro));
    const latestItems = list.filter(b => b.date === ld);
    const earlier = list.filter(b => b.date !== ld);

    const tabs = [
      { k: 'all', l: 'All' }, { k: 'macro', l: 'Macro' }, { k: 'company', l: 'Company' }
    ].map(c => `<button class="inv-ftab${archFilter === c.k ? ' on' : ''}" data-filt="${c.k}">${c.l}</button>`).join('');

    const todaySec = latestItems.length
      ? edLead(latestItems[0]) + latestItems.slice(1).map(b => edItem(b, false)).join('')
      : '';

    const earlierDates = [...new Set(earlier.map(b => b.date))].sort((a, b) => b.localeCompare(a));
    // default = พับทุกวัน/ทุกเดือน (jiroj สั่ง 21 ก.ค. 2026 — ไม่กางวันล่าสุดให้อัตโนมัติแล้ว)
    if (expandedDays === null) expandedDays = new Set();
    if (expandedMonths === null) expandedMonths = new Set();

    const nBriefs = n => `${n} ${n === 1 ? 'brief' : 'briefs'}`;
    const chev = cls => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>`;
    const dayRow = (d, yearRef, indent) => {
      const items = earlier.filter(b => b.date === d);
      const open = expandedDays.has(d);
      return `<button class="inv-ed-dtog${open ? ' open' : ''}${indent ? ' in-month' : ''}" data-day="${d}">
        <span>${fmtDayLabel(d, yearRef)}</span>
        <span class="inv-ed-dtog-rule"></span>
        <span class="inv-ed-dtog-r">${nBriefs(items.length)}${chev('inv-ed-chev')}</span>
      </button>${open ? items.map(b => edItem(b, false)).join('') : ''}`;
    };

    // ทุกเดือนที่มีข่าว (รวมเดือนปัจจุบัน) ยุบเป็นแถวเดือนเสมอ กดกางออกเป็นแถววันข้างใน (jiroj ขอเพิ่มเลเยอร์เดือนแม้อยู่เดือนปัจจุบัน 22 ก.ค. 2026)
    const allMonths = [...new Set(earlierDates.map(d => d.slice(0, 7)))].sort((a, b) => b.localeCompare(a));
    const earlierSec = allMonths.map(ym => {
      const mDates = earlierDates.filter(d => d.slice(0, 7) === ym);
      const mCount = earlier.filter(b => b.date.slice(0, 7) === ym).length;
      const open = expandedMonths.has(ym);
      return `<button class="inv-ed-mtog${open ? ' open' : ''}" data-emonth="${ym}">
        <span>${fmtMonth(ym)}</span>
        <span class="inv-ed-dtog-rule"></span>
        <span class="inv-ed-dtog-r">${nBriefs(mCount)}${chev('inv-ed-chev')}</span>
      </button>${open ? mDates.map(d => dayRow(d, ym.slice(0, 4), true)).join('') : ''}`;
    }).join('');

    const total = BRIEFS.length;
    const kicker = ld
      ? `${fmtLong(ld)} · ${BRIEFS.filter(b => b.date === ld).length} briefs`
      : 'No briefs yet';

    $('inv-news').innerHTML = `
      ${masthead(kicker)}
      <div class="inv-ftabs">${tabs}</div>
      ${todaySec}
      ${earlierSec ? `<div class="inv-ed-day inv-ed-earlier">Earlier</div>` : ''}${earlierSec}
      ${total && (todaySec || earlierSec) ? '' : '<div class="inv-ed-empty"><div class="t">Nothing here</div><div class="s">No briefs match this filter yet</div></div>'}`;
    root.querySelectorAll('[data-filt]').forEach(b => b.onclick = () => { archFilter = b.dataset.filt; renderNews(); });
    root.querySelectorAll('[data-day]').forEach(b => b.onclick = () => {
      const d = b.dataset.day;
      if (expandedDays.has(d)) expandedDays.delete(d); else expandedDays.add(d);
      renderNews();
    });
    root.querySelectorAll('[data-emonth]').forEach(b => b.onclick = () => {
      const ym = b.dataset.emonth;
      if (expandedMonths.has(ym)) expandedMonths.delete(ym); else expandedMonths.add(ym);
      renderNews();
    });
  }

  // ── current holdings (data/holdings.data.js — snapshot ที่ Jarvis อัปเดตทุกครั้งที่ jiroj แจ้งซื้อ-ขาย ใช้ทั้ง UI นี้และ cloud routine รีวิวพอร์ตวันศุกร์) ──
  // ลุค watchlist ยืมจาก TradingView (jiroj เลือกเองหลังลองมา 7 รอบ 22 ก.ค. 2026) — ขาว/ดำ/เทาล้วน ไม่มีสี ไม่มีรายละเอียดรอง แค่ Symbol/Value/Alloc
  function holdingsCard() {
    const H = window.HOLDINGS_DATA || { asOf: '', items: [], notes: '' };
    const items = H.items || [];
    const asOfTxt = H.asOf ? ` · as of ${fmtDate(H.asOf)}` : '';
    if (!items.length) {
      return `<div class="inv-hold-card">
        <div class="inv-hold-head">
          <div class="inv-hold-kicker">Current Holdings${asOfTxt}</div>
        </div>
        <div class="inv-hold-empty-txt">${esc(H.notes || 'No holdings right now')}</div>
      </div>`;
    }
    const total = items.reduce((s, it) => s + (parseFloat(it.amountTHB) || 0), 0);
    const sorted = [...items].sort((a, b) => (parseFloat(b.amountTHB) || 0) - (parseFloat(a.amountTHB) || 0));
    const rows = sorted.map(it => {
      const amt = parseFloat(it.amountTHB) || 0;
      const pct = total > 0 ? (amt / total * 100).toFixed(1) : '0.0';
      return `<div class="inv-hold-row">
        <div class="inv-hold-sym-wrap"><div class="inv-hold-sym">${esc((it.symbol || it.name || '').toUpperCase())}</div></div>
        <div class="inv-hold-val">฿${Math.round(amt).toLocaleString()}</div>
        <div class="inv-hold-pct-wrap"><span class="inv-hold-pct">${pct}%</span></div>
      </div>`;
    }).join('');
    return `<div class="inv-hold-card">
      <div class="inv-hold-head">
        <div class="inv-hold-kicker">Current Holdings${asOfTxt}</div>
        <div class="inv-hold-total"><span class="cur">฿</span>${Math.round(total).toLocaleString()}</div>
      </div>
      <div class="inv-hold-colhead">
        <div class="inv-hold-col-sym">Symbol</div>
        <div class="inv-hold-col-val">Value</div>
        <div class="inv-hold-col-pct">Alloc</div>
      </div>
      ${rows}
    </div>`;
  }

  // ── portfolio review ──
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
      body = `<div class="inv-ed-empty">
        <div class="t">No reviews yet</div>
        <div class="s">Paste your holdings in chat and ask Jarvis to review your portfolio</div>
      </div>`;
    } else {
      const snap = (latest.snapshot || '').replace(/\s+/g, ' ').trim();
      const history = sorted.slice(1).map(r => {
        const ex = (r.snapshot || '').replace(/\s+/g, ' ').trim();
        return `<div class="inv-ed-item" data-pr-id="${esc(r.id)}">
          <div class="inv-ed-h">Review — ${fmtDate(r.date)}</div>
          <div class="inv-ed-meta"><span>${esc(ex.length > 90 ? ex.slice(0, 90) + '…' : ex)}</span></div>
        </div>`;
      }).join('');
      body = `
        <div class="inv-ed-lead" data-pr-id="${esc(latest.id)}">
          <div class="inv-ed-lead-h">Review — ${fmtDate(latest.date)}</div>
          <div class="inv-ed-lead-sum">${esc(snap)}</div>
          ${allocBars(latest.allocation)}
          <div class="inv-ed-readmore">Read full review</div>
        </div>
        ${history ? `<div class="inv-ed-day inv-ed-earlier">Earlier</div>${history}` : ''}`;
    }
    $('inv-portfolio').innerHTML = `
      ${holdingsCard()}
      ${masthead(`Portfolio Reviews · ${sorted.length}`)}
      ${body}`;
  }

  function allocTable(rows) {
    if (!rows || !rows.length) return '';
    return `<table class="inv-alloc"><tbody>${rows.map(a => `<tr><td>${esc(a.label)}</td><td class="num">${esc(a.pct)}%</td></tr>`).join('')}</tbody></table>`;
  }
  function bulletList(items) {
    return `<ul class="inv-bullets">${(items || []).map(m => `<li><strong>${esc(m.label)}:</strong> ${esc(m.note)}</li>`).join('')}</ul>`;
  }

  // ── earnings analysis (Light + Trend — jiroj เลือกจากพรีวิว 23 ก.ค. 2026) ──
  function erow(e) {
    const rev = (e.metrics || []).find(m => /revenue/i.test(m.label));
    const eps = (e.metrics || []).find(m => /eps/i.test(m.label));
    const bits = [];
    if (rev) bits.push(`Revenue ${rev.deltaPct}`);
    if (eps) bits.push(`EPS ${eps.deltaPct}`);
    return `<div class="inv-ed-item" data-er-id="${esc(e.id)}">
      <div class="inv-er-row-top">
        <div class="inv-ed-h">${esc(e.ticker)} — ${esc(e.quarter)}</div>
        <span class="inv-badge ${esc(e.verdict)}">${esc(VERDICT_LABEL[e.verdict] || e.verdict)}</span>
      </div>
      <div class="inv-ed-meta">${bits.length ? esc(bits.join(' · ')) + ' · ' : ''}${fmtDate(e.reportDate || e.date)}</div>
    </div>`;
  }

  function renderEarnings() {
    const sorted = [...EARNINGS].sort((a, b) => (b.reportDate || b.date).localeCompare(a.reportDate || a.date));
    const body = sorted.length
      ? sorted.map(erow).join('')
      : `<div class="inv-ed-empty"><div class="t">No earnings reviews yet</div><div class="s">Ask Jarvis to analyze a stock's latest quarterly results</div></div>`;
    $('inv-earnings').innerHTML = `${masthead(`Earnings Reviews · ${sorted.length}`)}${body}`;
  }

  function metricsTable(rows) {
    if (!rows || !rows.length) return '';
    return `<div class="inv-stat-tiles">${rows.map(m => `
      <div class="inv-stat-tile">
        <div class="l">${esc(m.label)}</div>
        <div class="v">${esc(m.actual)}</div>
        <div class="n">est ${esc(m.est)} · <span class="d ${m.dir === 'neg' ? 'neg' : 'pos'}">${esc(m.deltaPct)}</span></div>
      </div>`).join('')}</div>`;
  }

  function trendBars(rows, unit) {
    if (!rows || rows.length < 2) return '';
    const n = rows.length;
    const vals = rows.map(r => parseFloat(r.value) || 0);
    const min = Math.min(...vals), max = Math.max(...vals);
    const pad = (max - min) * 0.2 || Math.abs(max) * 0.2 || 1;
    const lo = min - pad, hi = max + pad;
    const yTop = 8, yBot = 56;
    const yFor = v => hi > lo ? yBot - ((v - lo) / (hi - lo)) * (yBot - yTop) : (yTop + yBot) / 2;
    const pts = vals.map((v, i) => [i * 100 + 50, yFor(v)]);
    const linePath = pts.map((p, i) => (i ? 'L' : 'M') + p[0] + ' ' + p[1].toFixed(1)).join(' ');
    const areaPath = `M${pts[0][0]} ${yBot} ` + pts.map(p => `L${p[0]} ${p[1].toFixed(1)}`).join(' ') + ` L${pts[n - 1][0]} ${yBot} Z`;
    const dots = pts.map((p, i) => {
      const last = i === n - 1;
      return `<circle cx="${p[0]}" cy="${p[1].toFixed(1)}" r="${last ? 5 : 3.5}" class="inv-trend-dot${last ? ' cur' : ''}" vector-effect="non-scaling-stroke" />`;
    }).join('');
    const valRow = rows.map((r, i) => {
      const last = i === n - 1;
      return `<div class="inv-trend-val${last ? ' cur' : ''}">${unit ? '$' + vals[i].toFixed(1) + unit : esc(r.value)}</div>`;
    }).join('');
    const labRow = rows.map(r => `<div class="inv-trend-lab">${esc(r.label)}</div>`).join('');
    return `<div class="inv-trend">
      <div class="inv-trend-row">${valRow}</div>
      <div class="inv-trend-plot">
        <svg viewBox="0 0 ${n * 100} 64" preserveAspectRatio="none">
          <path class="inv-trend-area" d="${areaPath}"></path>
          <path class="inv-trend-line" d="${linePath}" vector-effect="non-scaling-stroke"></path>
          ${dots}
        </svg>
      </div>
      <div class="inv-trend-row">${labRow}</div>
    </div>`;
  }

  function guidanceBox(g) {
    if (!g) return '';
    return `<div class="inv-gbox">
      <div class="inv-gcell"><div class="l">${esc(g.priorLabel || 'Prior guide')}</div><div class="v">${esc(g.priorVal)}</div></div>
      <div class="inv-gcell new"><div class="l">${esc(g.newLabel || 'New guide')}</div><div class="v">${esc(g.newVal)}</div></div>
    </div>`;
  }

  function sourcesList(rows) {
    if (!rows || !rows.length) return '<div class="empty">No sources logged</div>';
    return `<div class="inv-srclist">${rows.map(s => `<div class="inv-src-item"><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)}</a><span class="d">${esc(s.domain || '')}</span></div>`).join('')}</div>`;
  }

  // ── company deep-dive (เพิ่ม 24 ก.ค. 2026 — ใช้คอมโพเนนต์ Editorial เดิมของแอปทั้งหมด ไม่มีธีมแยกต่อบริษัท) ──
  // ลิสต์เป็นแถวเล็กล้วน (jiroj ลองสไตล์ News แบบ lead+earlier แล้วขอย้อนกลับมาแบบนี้ 24 ก.ค. 2026)
  function ddrow(d) {
    return `<div class="inv-ed-item" data-dd-id="${esc(d.id)}">
      <div class="inv-ed-h">${esc(d.ticker ? d.ticker + ' — ' + d.company : d.company)}</div>
      <div class="inv-ed-meta"><span>${esc(d.sector || '')}</span>${d.sector ? '<span>·</span>' : ''}<span>${fmtDate(d.date)}</span></div>
    </div>`;
  }
  function renderDeepDive() {
    const sorted = [...DEEPDIVES].sort((a, b) => b.date.localeCompare(a.date));
    const body = sorted.length
      ? sorted.map(ddrow).join('')
      : `<div class="inv-ed-empty"><div class="t">No deep-dives yet</div><div class="s">Ask Jarvis to research a company for you</div></div>`;
    $('inv-deepdive').innerHTML = `${masthead(`Company Deep-Dives · ${sorted.length}`)}${body}`;
  }
  function statTable(rows) {
    if (!rows || !rows.length) return '';
    return `<div class="inv-stat-tiles">${rows.map(m => `
      <div class="inv-stat-tile">
        <div class="l">${esc(m.label)}</div>
        <div class="v">${esc(m.value)}</div>
        ${m.note ? `<div class="n">${esc(m.note)}</div>` : ''}
      </div>`).join('')}</div>`;
  }
  function compTable(rows) {
    if (!rows || !rows.length) return '';
    return `<div class="inv-dd-comp">${rows.map(c => `
      <div class="inv-dd-comp-row">
        <div class="inv-dd-comp-name">${esc(c.name)}</div>
        <div class="inv-dd-comp-line"><span class="l good">Strength</span>${esc(c.strength)}</div>
        <div class="inv-dd-comp-line"><span class="l bad">Weakness</span>${esc(c.weakness)}</div>
      </div>`).join('')}</div>`;
  }
  function chipRow(items) {
    if (!items || !items.length) return '';
    return `<div class="inv-dd-chips">${items.map(t => `<span class="inv-dd-chip">${esc(t)}</span>`).join('')}</div>`;
  }
  function openEarnings(id) {
    const e = earningsById(id); if (!e) return;
    const revMetric = (e.metrics || []).find(m => /revenue/i.test(m.label));
    const unitMatch = revMetric && /([A-Z])\s*$/.exec(String(revMetric.actual || '').trim());
    const trend = trendBars(e.trend, unitMatch ? unitMatch[1] : '');
    const guide = guidanceBox(e.guidance);
    $('invEarnBody').innerHTML = `
      <div class="inv-art-h">${esc(e.ticker)} — ${esc(e.quarter)}</div>
      <div class="inv-art-rule"></div>
      <div class="inv-art-byline">Reported ${fmtDate(e.reportDate || e.date)}</div>
      <div class="inv-er-verdict">
        <span class="inv-badge ${esc(e.verdict)}">${esc(VERDICT_LABEL[e.verdict] || e.verdict)}</span>
        <div class="inv-er-vline">${esc(e.verdictLine)}</div>
      </div>
      <div class="inv-pr-section">
        <div class="section-title">Key Metrics</div>
        ${metricsTable(e.metrics)}
      </div>
      ${trend ? `<div class="inv-pr-section"><div class="section-title">Quarterly Revenue Trend</div>${trend}</div>` : ''}
      ${guide ? `<div class="inv-pr-section"><div class="section-title">Guidance</div>${guide}</div>` : ''}
      <div class="inv-pr-twocol">
        <div class="inv-pr-pos"><div class="section-title">What's Working</div>${bulletList(e.positives)}</div>
        <div class="inv-pr-neg"><div class="section-title">What Concerns Me</div>${bulletList(e.concerns)}</div>
      </div>
      <div class="inv-pr-section">
        <div class="section-title">Discussion Points</div>
        <ol class="inv-bullets">${(e.discussion || []).map(d => `<li>${esc(d)}</li>`).join('')}</ol>
      </div>
      <div class="inv-pr-section">
        <div class="section-title">Sources</div>
        ${sourcesList(e.sources)}
      </div>
      <div class="inv-pr-caveats">${esc(e.caveats)}</div>`;
    $('invEarnArticle').classList.add('open');
    $('invEarnScroll') && ($('invEarnScroll').scrollTop = 0);
    pushOverlayState('earnings');
  }
  function closeEarnArticle() {
    $('invEarnArticle').classList.remove('open');
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
    pushOverlayState('review');
  }

  function openDeepDive(id) {
    const d = deepDiveById(id); if (!d) return;
    $('invDDBody').innerHTML = `
      <div class="inv-art-h">${esc(d.ticker ? d.ticker + ' — ' + d.company : d.company)}</div>
      <div class="inv-art-rule"></div>
      <div class="inv-art-byline">${d.sector ? esc(d.sector) + ' · ' : ''}${fmtDate(d.date)}</div>
      <div class="inv-summary">${esc(d.tagline)}</div>
      <div class="inv-pr-section">
        <div class="section-title">Business Overview</div>
        <div class="inv-summary">${esc(d.overview)}</div>
      </div>
      <div class="inv-pr-section">
        <div class="section-title">Technology &amp; Products</div>
        ${bulletList(d.technology)}
      </div>
      <div class="inv-pr-section">
        <div class="section-title">Market &amp; Competition</div>
        <div class="inv-summary">${esc(d.marketSummary)}</div>
        ${compTable(d.competitors)}
      </div>
      <div class="inv-pr-section">
        <div class="section-title">Financials</div>
        <div class="inv-summary">${esc(d.financialsSummary)}</div>
        ${statTable(d.financialMetrics)}
        ${trendBars(d.financialTrend, '')}
      </div>
      <div class="inv-pr-section">
        <div class="section-title">Management &amp; Investors</div>
        ${bulletList((d.leadership || []).map(p => ({ label: `${p.name} — ${p.role}`, note: p.note })))}
        ${chipRow(d.investors)}
      </div>
      <div class="inv-pr-twocol">
        <div class="inv-pr-pos"><div class="section-title">Catalysts</div>${bulletList(d.catalysts)}</div>
        <div class="inv-pr-neg"><div class="section-title">Risks</div>${bulletList(d.risks)}</div>
      </div>
      ${(d.discussion || []).length ? `<div class="inv-pr-section">
        <div class="section-title">Discussion</div>
        <ol class="inv-bullets">${d.discussion.map(x => `<li>${esc(x)}</li>`).join('')}</ol>
      </div>` : ''}
      <div class="inv-pr-caveats">${esc(d.caveats)}</div>`;
    $('invDeepArticle').classList.add('open');
    $('invDDScroll') && ($('invDDScroll').scrollTop = 0);
    pushOverlayState('deepdive');
  }
  function closeDeepArticle() {
    $('invDeepArticle').classList.remove('open');
  }

  // ── detail: หน้าอ่านเต็มจอ (เปลี่ยนจาก bottom sheet มาเป็นแบบนี้ 22 ก.ค. 2026 — jiroj เลือกจาก mockup 3 แบบ, ชอบ full-screen article) ──
  function openBrief(id) {
    const b = briefById(id); if (!b) return;
    $('invArtH').textContent = b.title;
    $('invArtByline').innerHTML = `${tagChip(b.macro)}<span class="inv-source">${esc(b.sourceName)}</span> · ${fmtDate(b.date)}`;
    $('invArtP').textContent = b.summary;
    $('invArtLink').href = b.url;
    renderArtMedia(b);
    $('invArticle').classList.add('open');
    $('invArtScroll') && ($('invArtScroll').scrollTop = 0);
    pushOverlayState('article');
  }
  function closeArticle() {
    $('invArticle').classList.remove('open');
  }
  function closeModal() {
    const o = $('invOverlay'); o.classList.add('closing');
    setTimeout(() => o.classList.remove('active', 'closing'), 300);
  }

  // ── ผูก overlay (หน้าอ่านข่าว/modal รีวิวพอร์ต) เข้ากับ browser history ──
  // ปุ่ม/ท่า back ของระบบ (Android) เป็นคนละกลไกกับปัดในแอป — ถ้าไม่ผูก history กด back เครื่องจะข้ามออกจากแอปทั้งที เลยต้องปิด overlay ก่อนเสมอ (22 ก.ค. 2026 jiroj ทักว่า back ของเครื่อง Android ไม่ย้อนกลับให้)
  function pushOverlayState(kind) {
    history.pushState({ invOverlay: kind }, '');
  }
  // ใช้แทนการปิด overlay ตรงๆ ทุกจุดที่ผู้ใช้กดปิดเอง (ปุ่ม X/back, แตะพื้นหลัง, ปัด) — ให้ history.back()
  // เป็นคนสั่งจริง แล้ว popstate ด้านล่างเป็นคนปิด DOM ให้ ทาง history จะได้ตรงกับ state บนจอเสมอ
  function goBackIfOverlay() {
    if (history.state && history.state.invOverlay) history.back();
  }
  function wirePopstate() {
    window.addEventListener('popstate', () => {
      if ($('invArticle').classList.contains('open')) closeArticle();
      if ($('invDeepArticle').classList.contains('open')) closeDeepArticle();
      if ($('invEarnArticle').classList.contains('open')) closeEarnArticle();
      if ($('invOverlay').classList.contains('active')) closeModal();
    });
  }

  // ── tabs ──
  function switchTab(tab) {
    activeTab = tab;
    root.querySelectorAll('.inv-tabbtn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
    root.querySelectorAll('.inv-pane').forEach(p => p.classList.toggle('active', p.id === 'inv-' + tab));
    if (tab === 'news') renderNews();
    else if (tab === 'portfolio') renderPortfolio();
    else if (tab === 'earnings') renderEarnings();
    else if (tab === 'deepdive') renderDeepDive();
  }

  function wire() {
    root.querySelectorAll('.inv-tabbtn').forEach(b => b.onclick = () => switchTab(b.dataset.tab));
    root.addEventListener('click', e => {
      const pr = e.target.closest('[data-pr-id]'); if (pr) { openReview(pr.dataset.prId); return; }
      const er = e.target.closest('[data-er-id]'); if (er) { openEarnings(er.dataset.erId); return; }
      const dd = e.target.closest('[data-dd-id]'); if (dd) { openDeepDive(dd.dataset.ddId); return; }
      const c = e.target.closest('[data-id]'); if (c) openBrief(c.dataset.id);
    });
    $('invMClose').onclick = goBackIfOverlay;
    $('invOverlay').onclick = e => { if (e.target === $('invOverlay')) goBackIfOverlay(); };
    $('invArtBack').onclick = goBackIfOverlay;
    $('invDDBack').onclick = goBackIfOverlay;
    $('invEarnBack').onclick = goBackIfOverlay;
    wirePopstate();
  }

  function mount(el) {
    if (el.dataset.mounted) return;
    root = el; el.innerHTML = TEMPLATE; el.dataset.mounted = '1';
    wire(); switchTab('news');
  }
  return { mount };
})();

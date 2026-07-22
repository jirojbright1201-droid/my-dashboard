// ===== Investment Tracker hub — สรุปข่าวการลงทุน/การเงินโลกรายวัน (data: data/investment.data.js) =====
// ลุค Editorial (หนังสือพิมพ์/Apple News) — jiroj เลือกเอง 21 ก.ค. 2026: masthead แทน hero เข้ม, พาดหัว serif, filter แท็บขีดเส้นใต้
window.InvestmentView = (function () {
  const DATA = window.INVESTMENT_DATA || { briefs: [], portfolioReviews: [] };
  const BRIEFS = DATA.briefs || [];
  const REVIEWS = DATA.portfolioReviews || [];

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
  const latestDate = () => BRIEFS.reduce((m, b) => (b.date > m ? b.date : m), BRIEFS[0] ? BRIEFS[0].date : '');

  const TEMPLATE = `
  <div class="container inv">
    <div id="inv-news" class="inv-pane active"></div>
    <div id="inv-portfolio" class="inv-pane"></div>
    <nav class="tabbar">
      <button class="inv-tabbtn tab-item active" data-tab="news">${S('<path d="M4 6h16M4 12h16M4 18h10"/>')}<span>News</span></button>
      <button class="inv-tabbtn tab-item" data-tab="portfolio">${S('<path d="M3 3v18h18"/><path d="M7 14l4-5 3 3 5-7"/>')}<span>Portfolio</span></button>
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
  }

  function wire() {
    root.querySelectorAll('.inv-tabbtn').forEach(b => b.onclick = () => switchTab(b.dataset.tab));
    root.addEventListener('click', e => {
      const pr = e.target.closest('[data-pr-id]'); if (pr) { openReview(pr.dataset.prId); return; }
      const c = e.target.closest('[data-id]'); if (c) openBrief(c.dataset.id);
    });
    $('invMClose').onclick = goBackIfOverlay;
    $('invOverlay').onclick = e => { if (e.target === $('invOverlay')) goBackIfOverlay(); };
    $('invArtBack').onclick = goBackIfOverlay;
    wirePopstate();
  }

  function mount(el) {
    if (el.dataset.mounted) return;
    root = el; el.innerHTML = TEMPLATE; el.dataset.mounted = '1';
    wire(); switchTab('news');
  }
  return { mount };
})();

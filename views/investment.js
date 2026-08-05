// ===== Investment Tracker hub — สรุปข่าวการลงทุน/การเงินโลกรายวัน (data: data/investment-briefs.data.js + investment-portfolio.data.js + investment-earnings.data.js + investment-deepdives.data.js — แยกไฟล์ตามประเภท 3 ส.ค. 2026 กันไฟล์รวมเกิน 256KB) =====
// รื้อลุคเป็น Apple x Coinbase reskin 4 ส.ค. 2026 (เดิม Editorial หนังสือพิมพ์เลือกไว้ 21 ก.ค. 2026) — masthead เหลือ header เรียบ, filter เป็น segmented pill, ลิสต์เป็นการ์ดฟีด, accent น้ำเงิน Coinbase เดียว. token อยู่ investment.css scope ใต้ .inv-shell
window.InvestmentView = (function () {
  const BRIEFS = window.INVESTMENT_BRIEFS || [];
  const REVIEWS = window.INVESTMENT_PORTFOLIO_REVIEWS || [];
  const EARNINGS = window.INVESTMENT_EARNINGS_REVIEWS || [];
  const DEEPDIVES = window.INVESTMENT_DEEP_DIVES || [];
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
  // ไอคอนทึบ MDI (earth/domain) สำหรับ badge หมวด Macro/Company ในลิสต์ข่าว — ทึบ = เนื้อหา/หมวด ตามมาตรฐาน reskin (ต่างจาก S() ที่เป็นเส้น outline สำหรับ nav/chrome)
  const F = p => `<svg viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">${p}</svg>`;
  const ICON_EARTH_FILL = F('<path d="M17.9,17.39C17.64,16.59 16.89,16 16,16H15V13A1,1 0 0,0 14,12H8V10H10A1,1 0 0,0 11,9V7H13A2,2 0 0,0 15,5V4.59C17.93,5.77 20,8.64 20,12C20,14.08 19.2,15.97 17.9,17.39M11,19.93C7.05,19.44 4,16.08 4,12C4,11.38 4.08,10.78 4.21,10.21L9,15V16A2,2 0 0,0 11,18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>'); // mdi-earth
  const ICON_DOMAIN_FILL = F('<path d="M18,15H16V17H18M18,11H16V13H18M20,19H12V17H14V15H12V13H14V11H12V9H20M10,7H8V5H10M10,11H8V9H10M10,15H8V13H10M10,19H8V17H10M6,7H4V5H6M6,11H4V9H6M6,15H4V13H6M6,19H4V17H6M12,7V3H2V21H22V7H12Z"/>'); // mdi-domain
  function bicon(macro) {
    return `<div class="inv-bicon${macro ? ' macro' : ''}">${macro ? ICON_EARTH_FILL : ICON_DOMAIN_FILL}</div>`;
  }
  // ไอคอนทึบต่อหมวดของ Company Deep-Dive (cover + jump-nav + section badge ใช้ตัวเดียวกันหมด) — reskin 5 ส.ค. 2026
  const ICON_DD = {
    overview: F('<path d="M5,3V21H11V17.5H13V21H19V3H5M7,5H9V7H7V5M11,5H13V7H11V5M15,5H17V7H15V5M7,9H9V11H7V9M11,9H13V11H11V9M15,9H17V11H15V9M7,13H9V15H7V13M11,13H13V15H11V13M15,13H17V15H15V13M7,17H9V19H7V17M15,17H17V19H15V17Z"/>'), // office-building
    technology: F('<path d="M6,4H18V5H21V7H18V9H21V11H18V13H21V15H18V17H21V19H18V20H6V19H3V17H6V15H3V13H6V11H3V9H6V7H3V5H6V4M11,15V18H12V15H11M13,15V18H14V15H13M15,15V18H16V15H15Z"/>'), // chip
    market: F('<path d="M6.2,2.44L18.1,14.34L20.22,12.22L21.63,13.63L19.16,16.1L22.34,19.28C22.73,19.67 22.73,20.3 22.34,20.69L21.63,21.4C21.24,21.79 20.61,21.79 20.22,21.4L17,18.23L14.56,20.7L13.15,19.29L15.27,17.17L3.37,5.27V2.44H6.2M15.89,10L20.63,5.26V2.44H17.8L13.06,7.18L15.89,10M10.94,15L8.11,12.13L5.9,14.34L3.78,12.22L2.37,13.63L4.84,16.1L1.66,19.29C1.27,19.68 1.27,20.31 1.66,20.7L2.37,21.41C2.76,21.8 3.39,21.8 3.78,21.41L7,18.23L9.44,20.7L10.85,19.29L8.73,17.17L10.94,15Z"/>'), // sword-cross
    financials: F('<path d="M6,16.5L3,19.44V11H6M11,14.66L9.43,13.32L8,14.64V7H11M16,13L13,16V3H16M18.81,12.81L17,11H22V16L20.21,14.21L13,21.36L9.53,18.34L5.75,22H3L9.47,15.66L13,18.64"/>'), // finance
    management: F('<path d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z"/>'), // account-group
    cr: F('<path d="M12,3C10.73,3 9.6,3.8 9.18,5H3V7H4.95L2,14C1.53,16 3,17 5.5,17C8,17 9.56,16 9,14L6.05,7H9.17C9.5,7.85 10.15,8.5 11,8.83V20H2V22H22V20H13V8.82C13.85,8.5 14.5,7.85 14.82,7H17.95L15,14C14.53,16 16,17 18.5,17C21,17 22.56,16 22,14L19.05,7H21V5H14.83C14.4,3.8 13.27,3 12,3M12,5A1,1 0 0,1 13,6A1,1 0 0,1 12,7A1,1 0 0,1 11,6A1,1 0 0,1 12,5M5.5,10.25L7,14H4L5.5,10.25M18.5,10.25L20,14H17L18.5,10.25Z"/>'), // scale-balance
    catalysts: F('<path d="M13.13 22.19L11.5 18.36C13.07 17.78 14.54 17 15.9 16.09L13.13 22.19M5.64 12.5L1.81 10.87L7.91 8.1C7 9.46 6.22 10.93 5.64 12.5M21.61 2.39C21.61 2.39 16.66 .269 11 5.93C8.81 8.12 7.5 10.53 6.65 12.64C6.37 13.39 6.56 14.21 7.11 14.77L9.24 16.89C9.79 17.45 10.61 17.63 11.36 17.35C13.5 16.53 15.88 15.19 18.07 13C23.73 7.34 21.61 2.39 21.61 2.39M14.54 9.46C13.76 8.68 13.76 7.41 14.54 6.63S16.59 5.85 17.37 6.63C18.14 7.41 18.15 8.68 17.37 9.46C16.59 10.24 15.32 10.24 14.54 9.46M8.88 16.53L7.47 15.12L8.88 16.53M6.24 22L9.88 18.36C9.54 18.27 9.21 18.12 8.91 17.91L4.83 22H6.24M2 22H3.41L8.18 17.24L6.76 15.83L2 20.59V22M2 19.17L6.09 15.09C5.88 14.79 5.73 14.47 5.64 14.12L2 17.76V19.17Z"/>'), // rocket-launch
    risks: F('<path d="M13 14H11V9H13M13 18H11V16H13M1 21H23L12 2L1 21Z"/>'), // alert
    discussion: F('<path d="M17,12V3A1,1 0 0,0 16,2H3A1,1 0 0,0 2,3V17L6,13H16A1,1 0 0,0 17,12M21,6H19V15H6V17A1,1 0 0,0 7,18H18L22,22V7A1,1 0 0,0 21,6Z"/>'), // forum
    check: F('<path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"/>'), // check-circle
    close: F('<path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z"/>'), // close-circle
  };
  function ddIcon(key) { return `<span class="inv-dd-ic">${ICON_DD[key]}</span>`; }
  const DD_SECTIONS = [
    { id: 'dd-overview', label: 'Overview', icon: 'overview' },
    { id: 'dd-tech', label: 'Tech', icon: 'technology' },
    { id: 'dd-market', label: 'Market', icon: 'market' },
    { id: 'dd-fin', label: 'Financials', icon: 'financials' },
    { id: 'dd-mgmt', label: 'Management', icon: 'management' },
    { id: 'dd-cr', label: 'Catalysts/Risks', icon: 'cr' },
    { id: 'dd-disc', label: 'Discussion', icon: 'discussion' },
  ];
  function ddJumpNav() {
    return `<div class="inv-dd-jumpnav"><div class="inv-dd-jumpnav-row">${DD_SECTIONS.map(s =>
      `<button class="inv-dd-jicon" data-t="${s.id}" aria-label="${s.label}">${ICON_DD[s.icon]}</button>`
    ).join('')}</div></div>`;
  }
  function wireDeepDiveNav() {
    const scroll = $('invDDScroll');
    const fill = $('invDDFill');
    const chips = [...root.querySelectorAll('#invDDBody .inv-dd-jicon')];
    if (!scroll || !chips.length) return;
    chips[0].classList.add('on');
    chips.forEach(ch => { ch.onclick = () => {
      const t = $(ch.dataset.t);
      if (t) scroll.scrollTo({ top: t.offsetTop - 8, behavior: 'smooth' });
    }; });
    scroll.onscroll = () => {
      if (fill) {
        const max = scroll.scrollHeight - scroll.clientHeight;
        fill.style.transform = `scaleX(${max > 0 ? Math.min(scroll.scrollTop / max, 1) : 0})`;
      }
      const pos = scroll.scrollTop + 90;
      let active = chips[0];
      for (const ch of chips) { const el = $(ch.dataset.t); if (el && el.offsetTop <= pos) active = ch; }
      chips.forEach(ch => ch.classList.toggle('on', ch === active));
    };
  }
  function ddDiscussion(items) {
    if (!items || !items.length) return '';
    const re = /^(Bull case|Bear case):\s*(.*)$/;
    let out = '', qn = 0;
    items.forEach(x => {
      const m = re.exec(x);
      if (m) out += `<div class="inv-dd-case ${m[1] === 'Bull case' ? 'bull' : 'bear'}"><span class="tag">${esc(m[1])}</span><p>${esc(m[2])}</p></div>`;
      else { qn++; out += `<div class="inv-dd-case q"><span class="tag">Q${qn}</span><p>${esc(x)}</p></div>`; }
    });
    return `<div class="inv-dd-disc">${out}</div>`;
  }
  // เฉดน้ำเงิน Coinbase เข้ม→อ่อนตามลำดับ (เปลี่ยนจากคอรัลตอน reskin 4 ส.ค. 2026 — accent เดียวห้ามมีสีที่สอง)
  const ramp = (i, n) => {
    const t = n <= 1 ? 0 : i / (n - 1);
    const mix = (a, b) => Math.round(a + (b - a) * t);
    return `rgb(${mix(0, 168)},${mix(82, 196)},${mix(255, 255)})`;
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
    <div class="inv-dd-progress"><i id="invDDFill"></i></div>
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
    market: WM('New_York_Stock_Exchange_entrance.jpg'),
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
  // masthead(eyebrow, title, sub) — เปลี่ยนจาก kicker บรรทัดเดียวเป็น 3 ชั้น (เพิ่ม 4 ส.ค. 2026 ตอน reskin)
  function masthead(eyebrow, title, sub) {
    return `<div class="inv-mast">
      <div class="inv-mast-eyebrow">${eyebrow}</div>
      <div class="inv-mast-title">${title}</div>
      ${sub ? `<div class="inv-mast-sub">${sub}</div>` : ''}
    </div>`;
  }
  function edMeta(b) {
    return `<div class="inv-ed-meta">
      <span class="inv-ed-src">${esc(b.sourceName)}</span><span>· ${fmtDate(b.date)}</span>
    </div>`;
  }
  function edLead(b) {
    return `<div class="inv-ed-lead" data-id="${esc(b.id)}">
      <div class="inv-ed-icontop">${bicon(b.macro)}<span class="inv-tag-txt ${b.macro ? 'm' : 'c'}">${b.macro ? 'Macro' : 'Company'}</span></div>
      <div class="inv-ed-lead-h">${esc(b.title)}</div>
      <div class="inv-ed-lead-sum">${esc(b.summary)}</div>
      ${edMeta(b)}
    </div>`;
  }
  function edItem(b) {
    return `<div class="inv-ed-item" data-id="${esc(b.id)}">
      <div class="inv-ed-icontop">${bicon(b.macro)}<span class="inv-tag-txt ${b.macro ? 'm' : 'c'}">${b.macro ? 'Macro' : 'Company'}</span></div>
      <div class="inv-ed-h">${esc(b.title)}</div>
      ${edMeta(b)}
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
      ? edLead(latestItems[0]) + latestItems.slice(1).map(b => edItem(b)).join('')
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
      </button>${open ? items.map(b => edItem(b)).join('') : ''}`;
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
    const ldCount = ld ? BRIEFS.filter(b => b.date === ld).length : 0;

    $('inv-news').innerHTML = `
      ${masthead('News', ld ? fmtLong(ld) : 'No briefs yet', ld ? `${ldCount} ${ldCount === 1 ? 'brief' : 'briefs'} today` : '')}
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
      ${masthead(`Portfolio Reviews · ${sorted.length}`, 'Latest review')}
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
    $('inv-earnings').innerHTML = `${masthead(`Earnings Reviews · ${sorted.length}`, 'All reviews')}${body}`;
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

  // column chart แทนเส้น/พื้นที่ (24 ก.ค. 2026 — jiroj บอกกราฟเส้นเดิม "แบน": ไตรมาสใกล้เคียงกัน 3 ตัวบีบอัดอยู่ปลายล่างเพราะ scale ซูมตาม min-max
  // แท่งเริ่มจาก 0 เสมอ (baseline จริง) ทำให้สัดส่วนจริงของตัวเลขเห็นชัดกว่าเส้นที่ถูกซูม — ไตรมาสเก่าสีเทาจาง ไตรมาสล่าสุดสี accent เด่น
  function trendBars(rows, unit) {
    if (!rows || rows.length < 2) return '';
    const n = rows.length;
    const vals = rows.map(r => parseFloat(r.value) || 0);
    const hi = Math.max(...vals, 0), lo = Math.min(...vals, 0);
    const span = (hi - lo) || Math.abs(hi) || 1;
    const hiPadded = hi + span * 0.14;
    const totalSpan = (hiPadded - lo) || 1;
    const yTop = 14, yBot = 108;
    const scale = v => yBot - ((v - lo) / totalSpan) * (yBot - yTop);
    const y0 = scale(0);
    const barW = 38;
    const bars = vals.map((v, i) => {
      const cx = i * 100 + 50;
      const y = scale(v);
      const top = Math.min(y, y0), h = Math.max(Math.abs(y0 - y), 2);
      const last = i === n - 1;
      return `<rect x="${(cx - barW / 2).toFixed(1)}" y="${top.toFixed(1)}" width="${barW}" height="${h.toFixed(1)}" rx="4" class="inv-trend-bar${last ? ' cur' : ''}" />`;
    }).join('');
    const valRow = rows.map((r, i) => {
      const last = i === n - 1;
      return `<div class="inv-trend-val${last ? ' cur' : ''}">${unit ? '$' + vals[i].toFixed(1) + unit : esc(r.value)}</div>`;
    }).join('');
    const labRow = rows.map(r => `<div class="inv-trend-lab">${esc(r.label)}</div>`).join('');
    return `<div class="inv-trend">
      <div class="inv-trend-row">${valRow}</div>
      <div class="inv-trend-plot">
        <svg viewBox="0 0 ${n * 100} 122" preserveAspectRatio="none">
          <line class="inv-trend-baseline" x1="0" y1="${y0.toFixed(1)}" x2="${n * 100}" y2="${y0.toFixed(1)}" vector-effect="non-scaling-stroke" />
          ${bars}
        </svg>
      </div>
      <div class="inv-trend-row">${labRow}</div>
    </div>`;
  }

  function guidanceBox(g) {
    if (!g) return '';
    const delta = g.deltaPct ? `<div class="n">vs prior · <span class="d ${g.dir === 'neg' ? 'neg' : 'pos'}">${esc(g.deltaPct)}</span></div>` : '';
    return `<div class="inv-stat-tiles">
      <div class="inv-stat-tile"><div class="l">${esc(g.priorLabel || 'Prior guide')}</div><div class="v">${esc(g.priorVal)}</div></div>
      <div class="inv-stat-tile"><div class="l">${esc(g.newLabel || 'New guide')}</div><div class="v">${esc(g.newVal)}</div>${delta}</div>
    </div>`;
  }

  function xcptSegMarkup(s) {
    const enP = s.en.split(/\n\n+/).filter(x => x.trim());
    const thP = s.th.split(/\n\n+/).filter(x => x.trim());
    const paras = enP.length === thP.length ? enP.map((en, i) => ({ en, th: thP[i] })) : [{ en: s.en, th: s.th }];
    const rows = paras.map(p => `
      <div class="inv-xcpt-para">
        <div class="inv-xcpt-en">${esc(p.en)}</div>
        <div class="inv-xcpt-th">${esc(p.th)}</div>
      </div>`).join('');
    return `
    <div class="inv-xcpt-seg">
      <div class="inv-xcpt-heading">${esc(s.heading)}</div>
      ${rows}
    </div>`;
  }
  function transcriptBox(t) {
    if (!t || (!t.text && !(t.segments && t.segments.length))) return '';
    if (t.segments && t.segments.length) {
      const highlights = t.segments.filter(s => s.highlight);
      const highlightBlock = highlights.length ? `
        <div class="inv-xcpt-hl-label">Highlights</div>
        <div class="inv-xcpt-body">${highlights.map(xcptSegMarkup).join('')}</div>` : '';
      const body = t.segments.map(xcptSegMarkup).join('');
      return `${highlightBlock}
        <details class="inv-xcpt">
          <summary>Read full call transcript</summary>
          <div class="inv-xcpt-body">${body}</div>
        </details>`;
    }
    return `
      <details class="inv-xcpt">
        <summary>Read full call excerpt (English)</summary>
        <div class="inv-xcpt-en">${esc(t.text)}</div>
      </details>`;
  }

  const TRACK_CLS = { hit: 'beat', miss: 'miss', partial: 'inline' };
  const TRACK_LABEL = { hit: 'Delivered', miss: 'Missed', partial: 'Partial' };
  function trackRecordList(rows) {
    if (!rows || !rows.length) return '';
    return `<div class="inv-track">${rows.map(r => `
      <div class="inv-track-item">
        <div class="inv-track-top">
          <span class="inv-badge ${TRACK_CLS[r.verdict] || 'inline'}">${TRACK_LABEL[r.verdict] || r.verdict}</span>
          <div class="inv-track-claim">${esc(r.claim)}</div>
        </div>
        <div class="inv-track-note">${esc(r.note)}</div>
      </div>`).join('')}</div>`;
  }

  // ── company deep-dive (เพิ่ม 24 ก.ค. 2026 — ใช้คอมโพเนนต์ Editorial เดิมของแอปทั้งหมด ไม่มีธีมแยกต่อบริษัท) ──
  // ลิสต์เป็นแถวเล็กล้วน (jiroj ลองสไตล์ News แบบ lead+earlier แล้วขอย้อนกลับมาแบบนี้ 24 ก.ค. 2026)
  function ddrow(d) {
    return `<div class="inv-ed-item" data-dd-id="${esc(d.id)}">
      <div class="inv-ed-h">${esc(d.ticker ? d.ticker + ' — ' + d.company : d.company)}</div>
    </div>`;
  }
  function renderDeepDive() {
    const sorted = [...DEEPDIVES].sort((a, b) => b.date.localeCompare(a.date));
    const body = sorted.length
      ? sorted.map(ddrow).join('')
      : `<div class="inv-ed-empty"><div class="t">No deep-dives yet</div><div class="s">Ask Jarvis to research a company for you</div></div>`;
    $('inv-deepdive').innerHTML = `${masthead(`Company Deep-Dives · ${sorted.length}`, 'All companies')}${body}`;
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
    return `<div class="inv-dd-comp-grid">${rows.map(c => `
      <div class="inv-dd-comp-card">
        <div class="inv-dd-comp-name">${esc(c.name)}</div>
        <div class="inv-dd-comp-row g">${ICON_DD.check}<span>${esc(c.strength)}</span></div>
        <div class="inv-dd-comp-row b">${ICON_DD.close}<span>${esc(c.weakness)}</span></div>
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
    const transcript = transcriptBox(e.transcriptExcerpt);
    const track = trackRecordList(e.trackRecord);
    $('invEarnBody').innerHTML = `
      <div class="inv-art-h">${esc(e.ticker)} — ${esc(e.quarter)}</div>
      <div class="inv-art-rule"></div>
      <div class="inv-art-byline">
        <span class="inv-badge ${esc(e.verdict)}">${esc(VERDICT_LABEL[e.verdict] || e.verdict)}</span>
        <span>Reported ${fmtDate(e.reportDate || e.date)}</span>
      </div>
      <div class="inv-er-vline">${esc(e.verdictLine)}</div>
      <div class="inv-pr-section">
        <div class="section-title">Key Metrics</div>
        ${metricsTable(e.metrics)}
      </div>
      ${trend ? `<div class="inv-pr-section"><div class="section-title">Quarterly Revenue Trend</div>${trend}</div>` : ''}
      ${guide ? `<div class="inv-pr-section"><div class="section-title">Guidance</div>${guide}</div>` : ''}
      ${transcript ? `<div class="inv-pr-section"><div class="section-title">Call Transcript</div>${transcript}</div>` : ''}
      ${track ? `<div class="inv-pr-section"><div class="section-title">Track Record</div>${track}</div>` : ''}
      <div class="inv-pr-twocol">
        <div class="inv-pr-pos"><div class="section-title">What's Working</div>${bulletList(e.positives)}</div>
        <div class="inv-pr-neg"><div class="section-title">What Concerns Me</div>${bulletList(e.concerns)}</div>
      </div>
      <div class="inv-pr-section">
        <div class="section-title">Discussion Points</div>
        <ol class="inv-bullets">${(e.discussion || []).map(d => `<li>${esc(d)}</li>`).join('')}</ol>
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
    const hasBreakdown = d.overviewBreakdown && d.overviewBreakdown.length;
    const bigTitle = d.ticker || d.company;
    const trend = trendBars(d.financialTrend, 'M');
    $('invDDBody').innerHTML = `
      <div class="inv-dd-cover">
        <div class="inv-dd-cover-eyebrow"><span class="inv-dd-cover-sector">${esc(d.sector)}</span></div>
        <div class="inv-dd-cover-ticker">${esc(bigTitle)}</div>
        ${d.ticker ? `<div class="inv-dd-cover-name">${esc(d.company)}</div>` : ''}
        <div class="inv-dd-cover-tag">${esc(d.tagline)}</div>
      </div>
      ${ddJumpNav()}
      <div class="inv-pr-section" id="dd-overview">
        <div class="section-title">${ddIcon('overview')}Business Overview</div>
        <div class="inv-summary">${esc(d.overview)}</div>
        ${hasBreakdown ? bulletList(d.overviewBreakdown) : ''}
        ${hasBreakdown && d.overviewOutro ? `<div class="inv-summary">${esc(d.overviewOutro)}</div>` : ''}
      </div>
      <div class="inv-pr-section" id="dd-tech">
        <div class="section-title">${ddIcon('technology')}Technology &amp; Products</div>
        ${bulletList(d.technology)}
      </div>
      <div class="inv-pr-section" id="dd-market">
        <div class="section-title">${ddIcon('market')}Market &amp; Competition</div>
        <div class="inv-summary">${esc(d.marketSummary)}</div>
        ${compTable(d.competitors)}
      </div>
      <div class="inv-pr-section" id="dd-fin">
        <div class="section-title">${ddIcon('financials')}Financials</div>
        <div class="inv-summary">${esc(d.financialsSummary)}</div>
        ${trend ? trend : ''}
        ${statTable(d.financialMetrics)}
      </div>
      <div class="inv-pr-section" id="dd-mgmt">
        <div class="section-title">${ddIcon('management')}Management &amp; Investors</div>
        ${bulletList((d.leadership || []).map(p => ({ label: `${p.name} — ${p.role}`, note: p.note })))}
        ${chipRow(d.investors)}
      </div>
      <div class="inv-pr-twocol" id="dd-cr">
        <div class="inv-pr-pos"><div class="section-title">${ddIcon('catalysts')}Catalysts</div>${bulletList(d.catalysts)}</div>
        <div class="inv-pr-neg"><div class="section-title">${ddIcon('risks')}Risks</div>${bulletList(d.risks)}</div>
      </div>
      ${(d.discussion || []).length ? `<div class="inv-pr-section" id="dd-disc">
        <div class="section-title">${ddIcon('discussion')}Discussion</div>
        ${ddDiscussion(d.discussion)}
      </div>` : ''}
      <div class="inv-pr-caveats">${esc(d.caveats)}</div>`;
    $('invDeepArticle').classList.add('open');
    $('invDDScroll') && ($('invDDScroll').scrollTop = 0);
    wireDeepDiveNav();
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
  // overlayStack เก็บลำดับชั้นที่เปิดจริง (LIFO) — กันบัค "เปิดชั้นซ้อนกันแล้วกด back ครั้งเดียวปิดทุกชั้นพร้อมกัน"
  // (พอร์ตจาก views/money.js 4 ส.ค. 2026 — เดิมที่นี่เช็คว่าชั้นไหน "active"/"open" อยู่แล้วปิดทุกชั้นพร้อมกันหมด
  // ทั้งที่ back ควรปิดแค่ชั้นบนสุดที่เพิ่งถูก pop — ตอนนี้ปิดเฉพาะชั้นที่ pop ออกมาจาก stack เท่านั้น)
  let overlayStack = [];
  function pushOverlayState(kind) {
    overlayStack.push(kind);
    history.pushState({ invOverlay: kind }, '');
  }
  // ใช้แทนการปิด overlay ตรงๆ ทุกจุดที่ผู้ใช้กดปิดเอง (ปุ่ม X/back, แตะพื้นหลัง, ปัด) — ให้ history.back()
  // เป็นคนสั่งจริง แล้ว popstate ด้านล่างเป็นคนปิด DOM ให้ ทาง history จะได้ตรงกับ state บนจอเสมอ
  function goBackIfOverlay() {
    if (history.state && history.state.invOverlay) history.back();
  }
  function wirePopstate() {
    window.addEventListener('popstate', () => {
      const kind = overlayStack.pop();
      if (kind === 'article') closeArticle();
      else if (kind === 'deepdive') closeDeepArticle();
      else if (kind === 'earnings') closeEarnArticle();
      else if (kind === 'review') closeModal();
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

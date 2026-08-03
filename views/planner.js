// ===== Planner view module — logic/render only (data lives in data/planner.data.js) =====
window.PlannerView = (function () {
  const DATA = window.PLANNER_DATA || {};
  const KEYS = window.PLANNER_KEYS || [];
  const TODOS_DATA = window.PLANNER_TODOS_DATA || { todos: [] };
  const HABITS = ['exercise', 'read', 'water', 'sleep_early'];
  const HABIT_LABELS = { exercise: 'Exercise', read: 'Read', water: 'Water', sleep_early: 'Sleep early' };

  const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const DAYS_SHORT = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const DAYS_FULL = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const FLAME = '<svg class="ic-flame" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2c1.2 2.8-.6 4.2-1.7 5.9C9.1 9.7 8 11 8 13a4 4 0 0 0 8 0c0-1.6-.7-2.7-1.4-3.7.1 1.1-.6 1.9-1.4 1.9-1 0-1.5-.9-1.2-2.1C11.4 6.5 12.6 4.4 12 2z"/></svg>';

  // ── contextual stickers (inline SVG เส้น สีเดียวตามธีม — รูปทรงต่างตามบริบท) ──
  const S = (p) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
  const ICONS = {
    mcdonalds: S('<path d="M4 10a8 8 0 0 1 16 0z"/><path d="M3 13.5h18"/><path d="M5 16.5h14a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 5 16.5z"/>'),
    work:     S('<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7"/><path d="M3 12h18"/>'),
    sleep:    S('<path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.5 6.5 0 0 0 9.8 9.8z"/>'),
    exercise: S('<path d="M2.5 12h2M19.5 12h2"/><rect x="4.5" y="8.5" width="3" height="7" rx="1"/><rect x="16.5" y="8.5" width="3" height="7" rx="1"/><path d="M7.5 12h9"/>'),
    read:     S('<path d="M5 4h11a2 2 0 0 1 2 2v13H7a2 2 0 0 0-2 2z"/><path d="M5 19a2 2 0 0 1 2-2h11"/>'),
    clean:    S('<path d="M12 3l1.5 4L18 8.5 13.5 10 12 14l-1.5-4L6 8.5 10.5 7z"/><path d="M18 14.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9z"/>'),
    doc:      S('<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8" cy="11" r="2"/><path d="M13 9.5h5M13 12.5h5M5.5 15h7"/>'),
    video:    S('<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M10 9l5 3-5 3z"/>'),
    food:     S('<path d="M7 2v6a2 2 0 1 0 4 0V2"/><path d="M9 8v14"/><path d="M17 2c-2 1-3 3-3 5s1 3 3 3"/><path d="M17 10v12"/>'),
    game:     S('<rect x="2" y="7" width="20" height="11" rx="5.5"/><path d="M7 10.5v4M5 12.5h4"/><circle cx="15.5" cy="11.5" r="1"/><circle cx="18" cy="13.5" r="1"/>'),
    shower:   S('<path d="M12 3c3 3.5 6 7.2 6 10.5a6 6 0 0 1-12 0C6 10.2 9 6.5 12 3z"/>'),
    default:  S('<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/>')
  };
  const ICON_LABELS = {
    mcdonalds: 'Fast food', work: 'Work', sleep: 'Sleep', exercise: 'Exercise', read: 'Reading',
    clean: 'Cleaning', doc: 'Errands', video: 'Content', food: 'Food', game: 'Gaming', shower: 'Shower', default: 'Other'
  };
  function eventIconKey(e) {
    const title = typeof e === 'string' ? e : (e && e.title) || '';
    const cat = typeof e === 'object' && e && e.icon;
    if (cat && ICONS[cat]) return cat;
    const t = (title || '').toLowerCase();
    const has = (...ks) => ks.some(k => t.includes(k));
    if (has("mcdonald", "แมค")) return 'mcdonalds';
    if (has("sleep", "นอน")) return 'sleep';
    if (has("อาบน้ำ", "shower", "bath", "อาบ")) return 'shower';
    if (has("กินข้าว", "กิน", "ข้าว", "อาหาร", "มื้อ", "food", "eat", "dinner", "lunch", "breakfast")) return 'food';
    if (has("เกม", "game")) return 'game';
    if (has("ออกกำลัง", "วิ่ง", "ยิม", "exercise", "gym", "เวท", "workout", "run")) return 'exercise';
    if (has("อ่าน", "read", "หนังสือ", "book", "เรียน", "study")) return 'read';
    if (has("ทำความสะอาด", "clean", "ล้าง", "เก็บกวาด", "ซัก", "กวาด")) return 'clean';
    if (has("บัตร", "เอกสาร", "ธุระ", "ราชการ", "ธนาคาร", "id", "document", "passport")) return 'doc';
    if (has("youtube", "วิดีโอ", "video", "agent", "content", "อัด", "ถ่าย", "คลิป", "stream", "live")) return 'video';
    if (has("work", "งาน", "ทำงาน", "ประชุม", "meeting")) return 'work';
    return 'default';
  }
  function eventIcon(e) { return ICONS[eventIconKey(e)]; }

  // ── time breakdown donut (Calendar tab) — นับเฉพาะ event ที่มี time+end_time ครบ ──
  function toMin(hhmm) {
    const m = /^(\d{1,2}):(\d{2})$/.exec(String(hhmm || '').trim());
    return m ? Number(m[1]) * 60 + Number(m[2]) : null;
  }
  function eventDuration(e) {
    const s = toMin(e.time), en = toMin(e.end_time);
    if (s == null || en == null) return null;
    let diff = en - s; if (diff <= 0) diff += 24 * 60;
    return diff;
  }
  function timeBreakdown(events) {
    const m = {};
    events.forEach(e => { const d = eventDuration(e); if (d == null) return; const k = eventIconKey(e); m[k] = (m[k] || 0) + d; });
    return Object.entries(m).sort((a, b) => b[1] - a[1]);
  }
  function fmtDur(min) {
    const h = Math.floor(min / 60), m = min % 60;
    return h ? (m ? `${h}h ${m}m` : `${h}h`) : `${m}m`;
  }
  const _clerp = (a, b, t) => Math.round(a + (b - a) * t);
  const _chx = n => n.toString(16).padStart(2, '0');
  function calRamp(n) {
    const c1 = [0x00, 0x22, 0x7a], c2 = [0x93, 0xb3, 0xf2]; // navy เข้ม → ฟ้าอ่อน (เฉดเดียวกับ accent)
    if (n <= 1) return ['#0052ff'];
    return Array.from({ length: n }, (_, i) => {
      const t = i / (n - 1);
      return '#' + _chx(_clerp(c1[0], c2[0], t)) + _chx(_clerp(c1[1], c2[1], t)) + _chx(_clerp(c1[2], c2[2], t));
    });
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
  function renderCalDonut(events) {
    const pairs = timeBreakdown(events);
    const total = pairs.reduce((s, [, v]) => s + v, 0);
    const cols = calRamp(pairs.length || 1);
    const body = pairs.length ? `
      <div class="cal-donut-wrap">
        <div class="cal-donut" style="background:${donutCSS(pairs, total, cols)}">
          <div class="cal-donut-hole"><span>${fmtDur(total)}</span><small>Tracked</small></div>
        </div>
        <div class="cal-donut-leg">${pairs.map(([k, v], i) => `<div class="cal-donut-leg-row">
          <span class="cal-donut-dot" style="background:${cols[i]}"></span>
          <span class="cal-donut-leg-lbl">${esc(ICON_LABELS[k] || 'Other')}</span>
          <span class="cal-donut-leg-val">${fmtDur(v)} · ${total ? Math.round(v / total * 100) : 0}%</span>
        </div>`).join('')}</div>
      </div>` : `<div class="empty">No timed events yet — add an end time when logging an event to see your breakdown</div>`;
    $('calDonut').innerHTML = `<div class="card"><div class="section-title">Time breakdown</div>${body}</div>`;
  }

  // ── state ──
  let root, curMonth = '', selDay = '', activeTab = 'agenda';
  let calMode = 'month', calAnchor = '';
  let overlayStack = [];

  // ── utils ──
  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const p2 = n => String(n).padStart(2, '0');
  const fmtDate = d => `${d.getFullYear()}-${p2(d.getMonth() + 1)}-${p2(d.getDate())}`;
  const today = () => fmtDate(new Date());
  const monthOf = s => s.slice(0, 7);
  const getMonthData = m => DATA[m] || { events: [], habits: [] };
  const allMonthsData = () => KEYS.map(getMonthData);
  const $ = id => root.querySelector('#' + id);
  const fmtDDMon = ds => { const d = new Date(ds + 'T00:00:00'); return `${d.getDate()} ${MONTHS_SHORT[d.getMonth()]}`; };

  function habitDoneMap() {
    const map = {}; HABITS.forEach(h => map[h] = new Set());
    KEYS.forEach(k => (getMonthData(k).habits || []).forEach(rec => {
      const set = map[rec.habit]; if (set) (rec.done_dates || []).forEach(d => set.add(d));
    }));
    return map;
  }

  // ── markup ──
  const TEMPLATE = `
  <div class="container">

    <div id="pl-agenda" class="pl-pane active">
      <div class="hero tsum" id="todaySum"></div>
      <div class="wk-head">
        <span class="wk-month" id="wkMonth"></span>
        <div class="pl-ctl">
          <button data-wk="-1">&#8592;</button>
          <button class="btn-today" id="wkToday">Today</button>
          <button data-wk="1">&#8594;</button>
        </div>
      </div>
      <div class="wk" id="wkStrip"></div>
      <div class="ag-dayhead" id="agDayHead"></div>
      <div class="card"><div class="section-title">Timeline</div><div id="agTimeline"></div></div>
    </div>

    <div id="pl-todo" class="pl-pane">
      <div id="todoList"></div>
    </div>

    <div id="pl-calendar" class="pl-pane">
      <div class="pl-ctl" style="justify-content:space-between;margin-bottom:14px">
        <div class="pl-ctl">
          <button data-cnav="-1">&#8592;</button>
          <span class="pl-ctl-label" id="calLabel"></span>
          <button data-cnav="1">&#8594;</button>
        </div>
        <div class="cal-toggle">
          <button data-cmode="month" class="on">Month</button>
          <button data-cmode="week">Week</button>
        </div>
      </div>
      <div class="cal-summary" id="calSummary"></div>
      <div id="calWrap"></div>
      <div id="calDonut"></div>
    </div>

    <div id="pl-habits" class="pl-pane">
      <div class="habit-overview" id="habitOverview"></div>
      <div class="pl-ctl" style="justify-content:center;margin-bottom:14px">
        <button data-hnav="-1">&#8592;</button>
        <span class="pl-ctl-label" id="habLabel"></span>
        <button data-hnav="1">&#8594;</button>
      </div>
      <div id="habitTracks"></div>
    </div>
    <nav class="tabbar">
      <button class="pl-tab tab-item active" data-tab="agenda"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg><span>Agenda</span></button>
      <button class="pl-tab tab-item" data-tab="todo"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M3,4H7V8H3V4M9,5V7H21V5H9M3,10H7V14H3V10M9,11V13H21V11H9M3,16H7V20H3V16M9,17V19H21V17H9"/></svg><span>Todo</span></button>
      <button class="fab fab--dock" id="fab" aria-label="Quick capture">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
        <span class="fab-badge" id="fabBadge"></span>
      </button>
      <button class="pl-tab tab-item" data-tab="calendar"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M9,10V12H7V10H9M13,10V12H11V10H13M17,10V12H15V10H17M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5A2,2 0 0,1 5,3H6V1H8V3H16V1H18V3H19M19,19V8H5V19H19M9,14V16H7V14H9M13,14V16H11V14H13M17,14V16H15V14H17Z"/></svg><span>Calendar</span></button>
      <button class="pl-tab tab-item" data-tab="habits"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5H14.5Z"/></svg><span>Habits</span></button>
    </nav>
  </div>

  <div class="dp-page" id="dpPage">
    <div class="dp-head">
      <button class="dp-back" id="dpBack"><svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg></button>
      <div class="dp-titlewrap"><div class="dp-title" id="dpTitle"></div><div class="dp-sub" id="dpSub"></div></div>
    </div>
    <div class="dp-body">
      <div class="modal-sec-title">Events</div>
      <div id="dpEvents"></div>
    </div>
  </div>`;

  // ── agenda ──
  function renderAgenda() {
    const d = new Date(selDay + 'T00:00:00'), td = today(), isT = selDay === td;

    // week strip — 7 days of the week containing selDay
    const ws = startOfWeek(selDay);
    $('wkMonth').textContent = `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
    let strip = '';
    for (let i = 0; i < 7; i++) {
      const wd = new Date(ws); wd.setDate(wd.getDate() + i); const ds = fmtDate(wd);
      const cls = (ds === selDay ? ' sel' : '') + (ds === td ? ' today' : '');
      strip += `<div class="wk-day${cls}" data-selday="${ds}">
        <span class="wk-dow">${DAYS_SHORT[wd.getDay()]}</span>
        <span class="wk-num">${wd.getDate()}</span>
        <span class="wk-dot"${ds === td ? '' : ' style="background:transparent"'}></span>
      </div>`;
    }
    $('wkStrip').innerHTML = strip;

    $('agDayHead').innerHTML = `${DAYS_FULL[d.getDay()]}, ${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}${isT ? '<span class="td">Today</span>' : ''}`;

    // timeline — events of the day, จัดกลุ่มตามช่วงเวลา (Morning/Afternoon/Evening/Anytime)
    const dayEvents = allMonthsData().flatMap(m => m.events || []).filter(e => e.date === selDay)
      .sort((a, b) => (a.time || '').localeCompare(b.time || ''));
    $('agTimeline').innerHTML = dayEvents.length ? renderTimelineGrouped(dayEvents, isT) : '<div class="empty">No events today</div>';

    renderTodaySummary();
  }

  function nowHM() { const n = new Date(); return `${p2(n.getHours())}:${p2(n.getMinutes())}`; }
  function isEventNow(e, isToday) {
    if (!isToday || !e.time || !e.end_time) return false;
    const now = nowHM();
    return e.end_time < e.time ? (now >= e.time || now < e.end_time) : (now >= e.time && now < e.end_time);
  }

  function periodOf(time) {
    if (!time) return 'Anytime';
    const h = parseInt(time.slice(0, 2), 10);
    if (h < 12) return 'Morning';
    if (h < 17) return 'Afternoon';
    return 'Evening';
  }
  function renderTimelineGrouped(dayEvents, isT) {
    const order = ['Morning', 'Afternoon', 'Evening', 'Anytime'];
    const groups = {};
    dayEvents.forEach(e => { const p = periodOf(e.time); (groups[p] ??= []).push(e); });
    return order.filter(p => groups[p] && groups[p].length).map(p => `
      <div class="tlg-group">
        <div class="tlg-label">${p}</div>
        ${groups[p].map(e => {
          const isNow = isEventNow(e, isT);
          return `<div class="tlg-row${isNow ? ' now' : ''}">
            <div class="tlg-ic">${eventIcon(e)}</div>
            <div class="tlg-title">${esc(e.title)}</div>
            <div class="tlg-time">${esc(e.time || '')}</div>
          </div>`;
        }).join('')}
      </div>`).join('');
  }

  function renderTodaySummary() {
    const td = today(), d = new Date(td + 'T00:00:00');
    const evToday = allMonthsData().flatMap(m => m.events || []).filter(e => e.date === td).length;
    const doneMap = habitDoneMap();
    const hDone = HABITS.filter(h => doneMap[h].has(td)).length;
    $('todaySum').innerHTML = `
      <div class="hero-eyebrow">Today</div>
      <div class="tsum-date">${DAYS_FULL[d.getDay()]}, ${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}</div>
      <div class="hero-split">
        <div class="hero-cell"><div class="hero-cell-lab">Events</div><div class="hero-cell-val">${evToday}</div></div>
        <div class="hero-cell"><div class="hero-cell-lab">Habits today</div><div class="hero-cell-val up">${hDone}/${HABITS.length}</div></div>
      </div>`;
  }

  // ── todo ──
  function renderTodos() {
    const td = today();
    const items = (TODOS_DATA.todos || []).filter(t => t.status !== 'done');
    const todoRow = t => {
      let dueHtml = '';
      if (t.due) {
        if (t.due < td) dueHtml = `<span class="todo-due overdue">Overdue · ${fmtDDMon(t.due)}</span>`;
        else if (t.due === td) dueHtml = `<span class="todo-due">Due today</span>`;
        else dueHtml = `<span class="todo-due">${fmtDDMon(t.due)}</span>`;
      }
      return `<div class="todo-row">
        <div class="todo-check"></div>
        <div class="todo-body">
          <div class="todo-title">${esc(t.title)}</div>
          <div class="todo-meta">${t.category ? `<span class="chip chip-outline">${esc(t.category)}</span>` : ''}${dueHtml}</div>
        </div>
      </div>`;
    };
    const dueSoon = items.filter(t => t.due && t.due <= td).sort((a, b) => a.due.localeCompare(b.due));
    const upcoming = items.filter(t => !t.due || t.due > td).sort((a, b) => (a.due || '').localeCompare(b.due || ''));
    let html = '';
    if (dueSoon.length) html += `<div class="card"><div class="section-title">Today</div>${dueSoon.map(todoRow).join('')}</div>`;
    if (upcoming.length) html += `<div class="card"><div class="section-title">Upcoming</div>${upcoming.map(todoRow).join('')}</div>`;
    $('todoList').innerHTML = html || '<div class="empty">No to-dos</div>';
  }

  // ── calendar ──
  function startOfWeek(dateStr) { const d = new Date(dateStr + 'T00:00:00'); d.setDate(d.getDate() - d.getDay()); return d; }

  function renderCalendar() {
    const td = today();
    if (calMode === 'week') {
      const ws = startOfWeek(calAnchor), we = new Date(ws); we.setDate(we.getDate() + 6);
      $('calLabel').textContent = `${ws.getDate()} ${MONTHS_SHORT[ws.getMonth()]} – ${we.getDate()} ${MONTHS_SHORT[we.getMonth()]}`;
      $('calSummary').innerHTML = '';
      const evByDate = {}; allMonthsData().flatMap(m => m.events || []).forEach(e => (evByDate[e.date] ??= []).push(e));
      let rows = '', weekEvents = [];
      for (let i = 0; i < 7; i++) {
        const d = new Date(ws); d.setDate(d.getDate() + i); const ds = fmtDate(d), isT = ds === td;
        const evs = (evByDate[ds] || []).sort((a, b) => (a.time || '').localeCompare(b.time || ''));
        weekEvents = weekEvents.concat(evs);
        const body = evs.length ? evs.map(e => `<div class="calwk-ev"><span class="calwk-ev-time">${esc(e.time || '–')}</span><span class="calwk-ev-title">${esc(e.title)}</span></div>`).join('')
          : '<div class="calwk-empty">No events</div>';
        rows += `<div class="calwk-row${isT ? ' today' : ''}">
          <div class="calwk-day"><span class="calwk-dow">${DAYS_SHORT[d.getDay()]}</span><span class="calwk-num">${d.getDate()}</span></div>
          <div class="calwk-evlist">${body}</div>
        </div>`;
      }
      $('calWrap').innerHTML = `<div class="calwk-wrap">${rows}</div>`;
      renderCalDonut(weekEvents);
    } else {
      const [y, m] = monthOf(calAnchor).split('-').map(Number);
      $('calLabel').textContent = `${MONTHS[m - 1]} ${y}`;
      const days = new Date(y, m, 0).getDate(), startDow = new Date(y, m - 1, 1).getDay();
      const monthEvents = getMonthData(`${y}-${p2(m)}`).events || [];
      const evByDate = {}; monthEvents.forEach(e => (evByDate[e.date] ??= []).push(e));
      $('calSummary').innerHTML = monthEvents.length
        ? `<b>${monthEvents.length}</b> event${monthEvents.length === 1 ? '' : 's'} in ${MONTHS[m - 1]}`
        : `No events in ${MONTHS[m - 1]}`;
      const heads = DAYS_SHORT.map(d => `<span>${d}</span>`).join('');
      const cells = [];
      for (let i = 0; i < startDow; i++) cells.push(null);
      for (let day = 1; day <= days; day++) cells.push(day);
      while (cells.length % 7 !== 0) cells.push(null);
      let weeksHtml = '';
      for (let w = 0; w < cells.length; w += 7) {
        const week = cells.slice(w, w + 7);
        weeksHtml += `<div class="calw-week">${week.map(day => {
          if (day === null) return '<div class="calw-cell empty"></div>';
          const ds = `${y}-${p2(m)}-${p2(day)}`, isT = ds === td, ev = evByDate[ds] || [];
          return `<div class="calw-cell${isT ? ' today' : ''}" data-open="${ds}">
            <span class="calw-cell-num">${day}</span>
            <span class="calw-cell-dot${ev.length ? '' : ' none'}"></span>
          </div>`;
        }).join('')}</div>`;
      }
      $('calWrap').innerHTML = `<div class="calw-headrow">${heads}</div><div class="calw-wrap">${weeksHtml}</div>`;
      renderCalDonut(monthEvents);
    }
  }

  // ── habits (วงแหวนความคืบหน้าสไตล์ Apple Activity) ──
  function streakOf(set) {
    let s = 0, d = new Date(today() + 'T00:00:00');
    for (let i = 0; i < 366; i++) { if (set.has(fmtDate(d))) { s++; d.setDate(d.getDate() - 1); } else break; }
    return s;
  }

  function renderHabits() {
    const [y, m] = curMonth.split('-').map(Number);
    $('habLabel').textContent = `${MONTHS[m - 1]} ${y}`;
    const days = new Date(y, m, 0).getDate(), td = today(), done = habitDoneMap();
    const R = 32, C = 2 * Math.PI * R;

    let bestStreak = 0, totalDone = 0, totalElapsed = 0;
    const cards = HABITS.map(h => {
      let doneCount = 0, elapsed = 0;
      for (let d = 1; d <= days; d++) {
        const ds = `${y}-${p2(m)}-${p2(d)}`;
        if (ds > td) continue;
        elapsed++; if (done[h].has(ds)) doneCount++;
      }
      const pct = elapsed > 0 ? Math.round(doneCount / elapsed * 100) : 0;
      const streak = streakOf(done[h]);
      bestStreak = Math.max(bestStreak, streak); totalDone += doneCount; totalElapsed += elapsed;
      const off = (C * (1 - pct / 100)).toFixed(1);
      return `<div class="hbring-card">
        <div class="hbring-ring">
          <svg viewBox="0 0 78 78">
            <circle class="hbring-bg" cx="39" cy="39" r="${R}"/>
            <circle class="hbring-val" cx="39" cy="39" r="${R}" stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${off}"/>
          </svg>
          <div class="hbring-pct">${pct}%</div>
        </div>
        <div class="hbring-name">${HABIT_LABELS[h]}</div>
        ${streak > 0 ? `<div class="hbring-streak">${FLAME} ${streak}d</div>` : ''}
      </div>`;
    }).join('');

    const avgPct = totalElapsed > 0 ? Math.round(totalDone / totalElapsed * 100) : 0;
    const tdDone = HABITS.filter(h => done[h].has(td)).length;
    $('habitOverview').innerHTML = `
      <div class="ho-card"><div class="ho-num" style="color:var(--accent)">${FLAME} ${bestStreak}</div><div class="ho-lbl">Best streak</div></div>
      <div class="ho-card"><div class="ho-num">${avgPct}%</div><div class="ho-lbl">This month</div></div>
      <div class="ho-card"><div class="ho-num" style="color:var(--green)">${tdDone}/${HABITS.length}</div><div class="ho-lbl">Today</div></div>`;
    $('habitTracks').innerHTML = `<div class="hbring-grid">${cards}</div>`;
  }

  // ── day detail — หน้าเต็มจอ ──
  function openDayPage(ds) {
    const d = new Date(ds + 'T00:00:00');
    const evs = allMonthsData().flatMap(m => m.events || []).filter(e => e.date === ds).sort((a, b) => (a.time || '').localeCompare(b.time || ''));
    $('dpTitle').textContent = `${d.getDate()} ${MONTHS[d.getMonth()]}`;
    $('dpSub').textContent = `${DAYS_FULL[d.getDay()]} · ${evs.length} event${evs.length === 1 ? '' : 's'}`;
    $('dpEvents').innerHTML = evs.length
      ? evs.map(e => `<div class="dp-row"><div class="dp-time">${esc(e.time || '–')}</div><div class="dp-evtitle">${esc(e.title)}</div></div>`).join('')
      : '<div class="empty">No events</div>';
    $('dpPage').classList.add('active');
    pushOverlayState('day');
  }
  function closeDayPage() { $('dpPage').classList.remove('active'); }

  // ── ผูกหน้าเต็มจอเข้ากับ browser history (ดูเหตุผลในข้อ 8.6 ของ CLAUDE.md — กัน Android back ข้ามออกจากแอป) ──
  function pushOverlayState(kind) {
    overlayStack.push(kind);
    history.pushState({ plOverlay: kind }, '');
  }
  function goBackIfOverlay() {
    if (history.state && history.state.plOverlay) history.back();
  }
  function wirePopstate() {
    window.addEventListener('popstate', () => {
      const kind = overlayStack.pop();
      if (kind === 'day') closeDayPage();
    });
  }

  // ── tab switching ──
  function switchTab(tab) {
    activeTab = tab;
    root.querySelectorAll('.pl-tab').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
    root.querySelectorAll('.pl-pane').forEach(p => p.classList.toggle('active', p.id === 'pl-' + tab));
    renderTab(tab);
  }
  function renderTab(tab) {
    if (tab === 'agenda') renderAgenda();
    else if (tab === 'todo') renderTodos();
    else if (tab === 'calendar') renderCalendar();
    else if (tab === 'habits') renderHabits();
  }

  // ── events wiring ──
  function wire() {
    root.querySelectorAll('.pl-tab').forEach(b => b.onclick = () => switchTab(b.dataset.tab));
    root.querySelectorAll('[data-wk]').forEach(b => b.onclick = () => {
      const d = new Date(selDay + 'T00:00:00'); d.setDate(d.getDate() + Number(b.dataset.wk) * 7);
      selDay = fmtDate(d); renderAgenda();
    });
    $('wkToday').onclick = () => { selDay = today(); renderAgenda(); };
    root.querySelectorAll('[data-cnav]').forEach(b => b.onclick = () => {
      const dir = Number(b.dataset.cnav);
      if (calMode === 'week') { const d = new Date(calAnchor + 'T00:00:00'); d.setDate(d.getDate() + dir * 7); calAnchor = fmtDate(d); }
      else { const [y, m] = monthOf(calAnchor).split('-').map(Number); const d = new Date(y, m - 1 + dir, 1); calAnchor = fmtDate(d); }
      renderCalendar();
    });
    root.querySelectorAll('[data-cmode]').forEach(b => b.onclick = () => {
      calMode = b.dataset.cmode;
      root.querySelectorAll('[data-cmode]').forEach(x => x.classList.toggle('on', x === b));
      renderCalendar();
    });
    root.querySelectorAll('[data-hnav]').forEach(b => b.onclick = () => {
      const [y, m] = curMonth.split('-').map(Number); const d = new Date(y, m - 1 + Number(b.dataset.hnav), 1);
      curMonth = `${d.getFullYear()}-${p2(d.getMonth() + 1)}`; renderHabits();
    });
    root.addEventListener('click', e => {
      const sd = e.target.closest('[data-selday]');
      if (sd) { selDay = sd.dataset.selday; renderAgenda(); return; }
      const o = e.target.closest('[data-open]'); if (o) openDayPage(o.dataset.open);
    });
    $('dpBack').onclick = goBackIfOverlay;
    wirePopstate();
  }

  // ── public ──
  function mount(el) {
    if (el.dataset.mounted) return;
    root = el; el.innerHTML = TEMPLATE; el.dataset.mounted = '1';
    const td = today(), mm = monthOf(td);
    selDay = td; calAnchor = td;
    curMonth = KEYS.includes(mm) ? mm : (KEYS[KEYS.length - 1] || mm);
    wire();
    switchTab('agenda');
  }
  return { mount };
})();

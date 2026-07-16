// ===== Planner view module — logic/render only (data lives in data/planner.data.js) =====
window.PlannerView = (function () {
  const DATA = window.PLANNER_DATA || {};
  const KEYS = window.PLANNER_KEYS || [];
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
  function eventIcon(title) {
    const t = (title || '').toLowerCase();
    const has = (...ks) => ks.some(k => t.includes(k));
    if (has("mcdonald", "แมค")) return ICONS.mcdonalds;
    if (has("sleep", "นอน")) return ICONS.sleep;
    if (has("อาบน้ำ", "shower", "bath", "อาบ")) return ICONS.shower;
    if (has("กินข้าว", "กิน", "ข้าว", "อาหาร", "มื้อ", "food", "eat", "dinner", "lunch", "breakfast")) return ICONS.food;
    if (has("เกม", "game")) return ICONS.game;
    if (has("ออกกำลัง", "วิ่ง", "ยิม", "exercise", "gym", "เวท", "workout", "run")) return ICONS.exercise;
    if (has("อ่าน", "read", "หนังสือ", "book", "เรียน", "study")) return ICONS.read;
    if (has("ทำความสะอาด", "clean", "ล้าง", "เก็บกวาด", "ซัก", "กวาด")) return ICONS.clean;
    if (has("บัตร", "เอกสาร", "ธุระ", "ราชการ", "ธนาคาร", "id", "document", "passport")) return ICONS.doc;
    if (has("youtube", "วิดีโอ", "video", "agent", "content", "อัด", "ถ่าย", "คลิป", "stream", "live")) return ICONS.video;
    if (has("work", "งาน", "ทำงาน", "ประชุม", "meeting")) return ICONS.work;
    return ICONS.default;
  }

  // ── state ──
  let root, curMonth = '', selDay = '', activeTab = 'agenda';
  let calMode = 'month', calAnchor = '';

  // ── utils ──
  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const p2 = n => String(n).padStart(2, '0');
  const fmtDate = d => `${d.getFullYear()}-${p2(d.getMonth() + 1)}-${p2(d.getDate())}`;
  const today = () => fmtDate(new Date());
  const monthOf = s => s.slice(0, 7);
  const getMonthData = m => DATA[m] || { events: [], habits: [] };
  const allMonthsData = () => KEYS.map(getMonthData);
  const $ = id => root.querySelector('#' + id);

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
      <div id="calWrap"></div>
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
      <button class="pl-tab tab-item" data-tab="calendar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/></svg><span>Calendar</span></button>
      <button class="pl-tab tab-item" data-tab="habits"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3 7-7"/><path d="M20 12a8 8 0 1 1-3.5-6.6"/></svg><span>Habits</span></button>
    </nav>
  </div>

  <div class="overlay" id="plOverlay">
    <div class="modal">
      <div class="sheet-handle"></div>
      <div class="modal-head">
        <div><div class="modal-title" id="mTitle"></div><div class="modal-sub" id="mSub"></div></div>
        <button class="modal-close" id="mClose"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
      </div>
      <div class="modal-body" id="mBody"></div>
    </div>
  </div>`;

  // ── render: shared item builders ──
  function renderEventItem(e) {
    const time = e.time || '';
    const tags = ['Planner'];
    return `<div class="todo-item">${time ? `<div class="event-time">${esc(time)}</div>` : ''}
      <div class="todo-bar" style="background:var(--accent)"></div>
      <div class="todo-content"><div class="todo-title">${esc(e.title)}</div>
      <div class="todo-meta">${tags.map(t => `<span class="chip chip-cat">${esc(t)}</span>`).join('')}</div></div></div>`;
  }

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

    // timeline — events of the day, sorted by time
    const dayEvents = allMonthsData().flatMap(m => m.events || []).filter(e => e.date === selDay)
      .sort((a, b) => (a.time || '').localeCompare(b.time || ''));
    $('agTimeline').innerHTML = dayEvents.length ? `<div class="tl">${dayEvents.map(renderTimelineItem).join('')}</div>`
      : '<div class="empty">No events today</div>';

    renderTodaySummary();
  }

  function renderTimelineItem(e) {
    return `<div class="tl-item">
      <div class="tl-time">${esc(e.time || '–')}</div>
      <div class="tl-node"></div>
      <div class="tl-card">
        <div class="tl-ic">${eventIcon(e.title)}</div>
        <div class="tl-card-main">
          <div class="tl-title">${esc(e.title)}</div>
        </div>
      </div>
    </div>`;
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
        <div class="hero-cell"><div class="hero-cell-lab">Events</div><div class="hero-cell-val" style="color:var(--accent-bright)">${evToday}</div></div>
        <div class="hero-cell"><div class="hero-cell-lab">Habits today</div><div class="hero-cell-val up">${hDone}/${HABITS.length}</div></div>
      </div>`;
  }

  // ── calendar ──
  function startOfWeek(dateStr) { const d = new Date(dateStr + 'T00:00:00'); d.setDate(d.getDate() - d.getDay()); return d; }

  function renderCalendar() {
    const td = today();
    if (calMode === 'week') {
      const ws = startOfWeek(calAnchor), we = new Date(ws); we.setDate(we.getDate() + 6);
      $('calLabel').textContent = `${ws.getDate()} ${MONTHS_SHORT[ws.getMonth()]} – ${we.getDate()} ${MONTHS_SHORT[we.getMonth()]}`;
      const evByDate = {}; allMonthsData().flatMap(m => m.events || []).forEach(e => (evByDate[e.date] ??= []).push(e));
      let rows = '';
      for (let i = 0; i < 7; i++) {
        const d = new Date(ws); d.setDate(d.getDate() + i); const ds = fmtDate(d), isT = ds === td;
        const evs = (evByDate[ds] || []).sort((a, b) => (a.time || '').localeCompare(b.time || ''));
        const body = evs.length ? evs.map(e => `<div class="calw-ev"><span class="calw-ev-time">${esc(e.time || '–')}</span><span>${esc(e.title)}</span></div>`).join('')
          : '<div class="calw-empty">No events</div>';
        rows += `<div class="calw-day${isT ? ' today-day' : ''}" data-open="${ds}">
          <div class="calw-head"><span class="calw-dow">${DAYS_SHORT[d.getDay()]}</span><span class="calw-num">${d.getDate()}</span></div>${body}</div>`;
      }
      $('calWrap').innerHTML = `<div class="cal-wrap">${rows}</div>`;
    } else {
      const [y, m] = monthOf(calAnchor).split('-').map(Number);
      $('calLabel').textContent = `${MONTHS[m - 1]} ${y}`;
      const days = new Date(y, m, 0).getDate(), startDow = new Date(y, m - 1, 1).getDay();
      const evByDate = {}; getMonthData(`${y}-${p2(m)}`).events.forEach(e => (evByDate[e.date] ??= []).push(e));
      const heads = DAYS_SHORT.map(d => `<div class="cal-head">${d}</div>`).join('');
      let cells = '';
      for (let i = 0; i < startDow; i++) cells += `<div class="cal-day empty"></div>`;
      for (let day = 1; day <= days; day++) {
        const ds = `${y}-${p2(m)}-${p2(day)}`, isT = ds === td, ev = evByDate[ds] || [];
        const dots = ev.slice(0, 8).map(e => `<div class="cal-dot" style="background:var(--accent)" title="${esc(e.title)}"></div>`).join('');
        cells += `<div class="cal-day${isT ? ' today-day' : ''}" data-open="${ds}"><div class="cal-num">${day}</div>${dots ? `<div class="cal-todo-dots">${dots}</div>` : ''}</div>`;
      }
      $('calWrap').innerHTML = `<div class="cal-wrap"><div class="cal-grid">${heads}${cells}</div></div>`;
    }
  }

  // ── habits ──
  function streakOf(set) {
    let s = 0, d = new Date(today() + 'T00:00:00');
    for (let i = 0; i < 366; i++) { if (set.has(fmtDate(d))) { s++; d.setDate(d.getDate() - 1); } else break; }
    return s;
  }

  function renderHabits() {
    const [y, m] = curMonth.split('-').map(Number);
    $('habLabel').textContent = `${MONTHS[m - 1]} ${y}`;
    const days = new Date(y, m, 0).getDate(), td = today(), done = habitDoneMap();
    const startDow = new Date(y, m - 1, 1).getDay();
    const dayHeaders = DAYS_SHORT.map(d => `<div class="habit-cal-head">${d}</div>`).join('');

    let bestStreak = 0, totalDone = 0, totalElapsed = 0;
    const cards = HABITS.map(h => {
      let doneCount = 0, elapsed = 0, cells = '';
      for (let i = 0; i < startDow; i++) cells += `<div class="habit-cal-day empty"></div>`;
      for (let d = 1; d <= days; d++) {
        const ds = `${y}-${p2(m)}-${p2(d)}`, isFuture = ds > td, isToday = ds === td;
        let cls;
        if (isFuture) cls = 'future';
        else if (done[h].has(ds)) { cls = 'done'; doneCount++; elapsed++; }
        else { cls = 'nodata'; elapsed++; }
        cells += `<div class="habit-cal-day ${cls}${isToday ? ' today-day' : ''}">${d}</div>`;
      }
      const pct = elapsed > 0 ? Math.round(doneCount / elapsed * 100) : 0;
      const streak = streakOf(done[h]);
      bestStreak = Math.max(bestStreak, streak); totalDone += doneCount; totalElapsed += elapsed;
      return `<div class="habit-track-card"><div class="habit-track-header">
        <span class="habit-track-name">${HABIT_LABELS[h]}</span>
        <div class="habit-track-meta">${streak > 0 ? `<span class="habit-streak">${FLAME} ${streak}d</span>` : ''}
        <span class="habit-pct">${doneCount}d · ${pct}%</span></div></div>
        <div class="habit-cal-grid">${dayHeaders}${cells}</div></div>`;
    }).join('');

    const avgPct = totalElapsed > 0 ? Math.round(totalDone / totalElapsed * 100) : 0;
    const tdDone = HABITS.filter(h => done[h].has(td)).length;
    $('habitOverview').innerHTML = `
      <div class="ho-card"><div class="ho-num" style="color:var(--accent)">${FLAME} ${bestStreak}</div><div class="ho-lbl">Best streak</div></div>
      <div class="ho-card"><div class="ho-num">${avgPct}%</div><div class="ho-lbl">This month</div></div>
      <div class="ho-card"><div class="ho-num" style="color:var(--green)">${tdDone}/${HABITS.length}</div><div class="ho-lbl">Today</div></div>`;
    $('habitTracks').innerHTML = cards;
  }

  // ── modal ──
  function openModal(ds) {
    const d = new Date(ds + 'T00:00:00');
    const evs = allMonthsData().flatMap(m => m.events || []).filter(e => e.date === ds).sort((a, b) => (a.time || '').localeCompare(b.time || ''));
    $('mTitle').textContent = `${d.getDate()} ${MONTHS[d.getMonth()]}`;
    $('mSub').textContent = DAYS_FULL[d.getDay()];
    let html = '';
    if (evs.length) html += `<div class="modal-sec-title">Events</div>` + evs.map(renderEventItem).join('');
    $('mBody').innerHTML = html || `<div class="modal-empty">No events</div>`;
    $('plOverlay').classList.add('active');
  }
  function closeModal() {
    const o = $('plOverlay');
    o.classList.add('closing');
    setTimeout(() => o.classList.remove('active', 'closing'), 300);
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
      const o = e.target.closest('[data-open]'); if (o) openModal(o.dataset.open);
    });
    $('mClose').onclick = closeModal;
    $('plOverlay').onclick = e => { if (e.target === $('plOverlay')) closeModal(); };

    // drag-to-dismiss bottom sheet (จับจาก handle/head)
    const sheet = $('plOverlay').querySelector('.modal');
    let sy = 0, dragging = false;
    sheet.addEventListener('touchstart', e => {
      if (!e.target.closest('.sheet-handle, .modal-head')) return;
      sy = e.touches[0].clientY; dragging = true; sheet.style.transition = 'none';
    }, { passive: true });
    sheet.addEventListener('touchmove', e => {
      if (!dragging) return;
      const dy = e.touches[0].clientY - sy;
      if (dy > 0) sheet.style.transform = `translateY(${dy}px)`;
    }, { passive: true });
    sheet.addEventListener('touchend', e => {
      if (!dragging) return;
      dragging = false; sheet.style.transition = ''; sheet.style.transform = '';
      if (e.changedTouches[0].clientY - sy > 90) closeModal();
    }, { passive: true });
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

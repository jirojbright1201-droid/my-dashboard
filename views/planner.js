// ===== Planner view module — logic/render only (data lives in data/planner.data.js) =====
window.PlannerView = (function () {
  const DATA = window.PLANNER_DATA || {};
  const KEYS = window.PLANNER_KEYS || [];
  const HABITS = ['exercise', 'read', 'water', 'sleep_early'];
  const HABIT_LABELS = { exercise: 'ออกกำลังกาย', read: 'อ่านหนังสือ', water: 'ดื่มน้ำ', sleep_early: 'นอนก่อนเที่ยง' };

  const TH_MONTHS_FULL = ['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'];
  const TH_DAYS_SHORT = ['อา.','จ.','อ.','พ.','พฤ.','ศ.','ส.'];
  const TH_DAYS_FULL = ['อาทิตย์','จันทร์','อังคาร','พุธ','พฤหัสบดี','ศุกร์','เสาร์'];
  const FLAME = '<svg class="ic-flame" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2c1.2 2.8-.6 4.2-1.7 5.9C9.1 9.7 8 11 8 13a4 4 0 0 0 8 0c0-1.6-.7-2.7-1.4-3.7.1 1.1-.6 1.9-1.4 1.9-1 0-1.5-.9-1.2-2.1C11.4 6.5 12.6 4.4 12 2z"/></svg>';

  // ── state ──
  let root, curMonth = '', selDay = '', activeTab = 'agenda';
  let fStatus = 'todo', searchQ = '', calMode = 'month', calAnchor = '';

  // ── utils ──
  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const p2 = n => String(n).padStart(2, '0');
  const fmtDate = d => `${d.getFullYear()}-${p2(d.getMonth() + 1)}-${p2(d.getDate())}`;
  const today = () => fmtDate(new Date());
  const monthOf = s => s.slice(0, 7);
  const getMonthData = m => DATA[m] || { todos: [], events: [], habits: [] };
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
    <div class="pl-tabs">
      <button class="pl-tab active" data-tab="agenda">Agenda</button>
      <button class="pl-tab" data-tab="todos">Todos</button>
      <button class="pl-tab" data-tab="calendar">Calendar</button>
      <button class="pl-tab" data-tab="habits">Habits</button>
    </div>

    <div id="pl-agenda" class="pl-pane active">
      <div class="tsum" id="todaySum"></div>
      <div class="day-nav">
        <button data-day="-1">&#8592;</button>
        <div class="day-heading"><div class="date-big" id="agDateBig"></div><div class="date-sub" id="agDateSub"></div></div>
        <button data-day="1">&#8594;</button>
      </div>
      <div class="card"><div class="section-title">Events</div><div id="agEvents"></div></div>
      <div class="card"><div class="section-title">Tasks ค้างอยู่</div><div id="agTodos"></div></div>
      <div class="card"><div class="section-title">Habits วันนี้</div><div class="habits-today" id="agHabits"></div></div>
    </div>

    <div id="pl-todos" class="pl-pane">
      <div class="stats-row">
        <div class="stat-card"><div class="stat-num" id="stTotal">0</div><div class="stat-lbl">Total</div></div>
        <div class="stat-card"><div class="stat-num" style="color:var(--silver)" id="stTodo">0</div><div class="stat-lbl">Todo</div></div>
        <div class="stat-card"><div class="stat-num" style="color:var(--blue)" id="stDone">0</div><div class="stat-lbl">Done</div></div>
      </div>
      <div class="search-box">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
        <input id="todoSearch" type="text" placeholder="ค้นหา task..." autocomplete="off">
      </div>
      <div class="filter-row">
        <button class="filter-btn" data-fstatus="all">All</button>
        <button class="filter-btn on" data-fstatus="todo">Todo</button>
        <button class="filter-btn" data-fstatus="done">Done</button>
      </div>
      <div class="todo-list-card" id="todosList"></div>
    </div>

    <div id="pl-calendar" class="pl-pane">
      <div class="pl-ctl" style="justify-content:space-between;margin-bottom:14px">
        <div class="pl-ctl">
          <button data-cnav="-1">&#8592;</button>
          <span class="pl-ctl-label" id="calLabel"></span>
          <button data-cnav="1">&#8594;</button>
        </div>
        <div class="cal-toggle">
          <button data-cmode="month" class="on">เดือน</button>
          <button data-cmode="week">สัปดาห์</button>
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
  </div>

  <div class="overlay" id="plOverlay">
    <div class="modal">
      <div class="modal-head">
        <div><div class="modal-title" id="mTitle"></div><div class="modal-sub" id="mSub"></div></div>
        <button class="modal-close" id="mClose"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
      </div>
      <div class="modal-body" id="mBody"></div>
    </div>
  </div>`;

  // ── render: shared item builders ──
  function renderTodoItem(t) {
    const isDone = t.status === 'done';
    const sl = { todo: 'Todo', done: 'Done' }[t.status] || t.status;
    const cls = { todo: 'chip-todo', done: 'chip-done' }[t.status] || 'chip-todo';
    const chips = [`<span class="chip ${cls}">${esc(sl)}</span>`];
    if (t.est) chips.push(`<span class="chip chip-cat">⏱ ${esc(t.est)}</span>`);
    return `<div class="todo-item"><div class="todo-bar" style="background:var(--border)"></div>
      <div class="todo-content"><div class="todo-title${isDone ? ' done' : ''}">${esc(t.title)}</div>
      <div class="todo-meta">${chips.join('')}</div></div></div>`;
  }
  function renderEventItem(e) {
    const time = e.time || '';
    const tags = ['Planner', e.est ? '⏱ ' + e.est : ''].filter(Boolean);
    return `<div class="todo-item">${time ? `<div class="event-time">${esc(time)}</div>` : ''}
      <div class="todo-bar" style="background:var(--accent)"></div>
      <div class="todo-content"><div class="todo-title">${esc(e.title)}</div>
      <div class="todo-meta">${tags.map(t => `<span class="chip chip-cat">${esc(t)}</span>`).join('')}</div></div></div>`;
  }

  // ── agenda ──
  function renderAgenda() {
    const d = new Date(selDay + 'T00:00:00'), isT = selDay === today();
    $('agDateBig').textContent = `วัน${TH_DAYS_FULL[d.getDay()]} ${d.getDate()} ${TH_MONTHS_FULL[d.getMonth()]} ${d.getFullYear()}`;
    const sub = $('agDateSub'); sub.textContent = isT ? 'วันนี้' : ''; sub.className = 'date-sub' + (isT ? ' today-label' : '');

    const dayEvents = allMonthsData().flatMap(m => m.events || []).filter(e => e.date === selDay)
      .sort((a, b) => (a.time || '').localeCompare(b.time || ''));
    $('agEvents').innerHTML = dayEvents.length ? dayEvents.map(renderEventItem).join('') : '<div class="empty">ไม่มี event</div>';

    const pending = allMonthsData().flatMap(m => m.todos || []).filter(t => t.status !== 'done');
    $('agTodos').innerHTML = pending.length ? pending.map(renderTodoItem).join('') : '<div class="empty">ไม่มี task ค้างอยู่</div>';

    const doneMap = habitDoneMap();
    $('agHabits').innerHTML = HABITS.map(h => {
      const state = doneMap[h].has(selDay) ? 'done' : 'no-log';
      return `<div class="habit-today-item"><div class="habit-dot ${state}"></div><span class="habit-name">${HABIT_LABELS[h]}</span></div>`;
    }).join('');

    renderTodaySummary();
  }

  function renderTodaySummary() {
    const td = today(), d = new Date(td + 'T00:00:00');
    const evToday = allMonthsData().flatMap(m => m.events || []).filter(e => e.date === td).length;
    const pending = allMonthsData().flatMap(m => m.todos || []).filter(t => t.status !== 'done').length;
    const doneMap = habitDoneMap();
    const hDone = HABITS.filter(h => doneMap[h].has(td)).length;
    $('todaySum').innerHTML = `
      <div class="tsum-date">วันนี้ · <b>${TH_DAYS_FULL[d.getDay()]} ${d.getDate()} ${TH_MONTHS_FULL[d.getMonth()]} ${d.getFullYear()}</b></div>
      <div class="tsum-row">
        <div class="tsum-cell"><div class="tsum-num" style="color:var(--accent)">${evToday}</div><div class="tsum-lbl">Event วันนี้</div></div>
        <div class="tsum-cell"><div class="tsum-num">${pending}</div><div class="tsum-lbl">Task ค้าง</div></div>
        <div class="tsum-cell"><div class="tsum-num" style="color:var(--green)">${hDone}/${HABITS.length}</div><div class="tsum-lbl">Habit วันนี้</div></div>
      </div>`;
  }

  // ── todos ──
  function renderTodos() {
    const todos = getMonthData(curMonth).todos || [];
    const cnt = { todo: 0, done: 0 };
    todos.forEach(t => { if (cnt[t.status] !== undefined) cnt[t.status]++; });
    $('stTotal').textContent = todos.length; $('stTodo').textContent = cnt.todo; $('stDone').textContent = cnt.done;

    let list = todos.slice();
    if (fStatus !== 'all') list = list.filter(t => t.status === fStatus);
    if (searchQ) list = list.filter(t => (t.title || '').toLowerCase().includes(searchQ));
    list.sort((a, b) => (a.status === 'done') - (b.status === 'done'));
    $('todosList').innerHTML = list.length ? list.map(renderTodoItem).join('')
      : `<div class="empty">${searchQ ? 'ไม่พบ task ที่ค้นหา' : 'ไม่มี task'}</div>`;
  }

  // ── calendar ──
  function startOfWeek(dateStr) { const d = new Date(dateStr + 'T00:00:00'); d.setDate(d.getDate() - d.getDay()); return d; }

  function renderCalendar() {
    const td = today();
    const pending = allMonthsData().flatMap(m => m.todos || []).filter(t => t.status !== 'done');
    if (calMode === 'week') {
      const ws = startOfWeek(calAnchor), we = new Date(ws); we.setDate(we.getDate() + 6);
      $('calLabel').textContent = `${ws.getDate()} ${TH_MONTHS_FULL[ws.getMonth()].slice(0,3)} – ${we.getDate()} ${TH_MONTHS_FULL[we.getMonth()].slice(0,3)}`;
      const evByDate = {}; allMonthsData().flatMap(m => m.events || []).forEach(e => (evByDate[e.date] ??= []).push(e));
      let rows = '';
      for (let i = 0; i < 7; i++) {
        const d = new Date(ws); d.setDate(d.getDate() + i); const ds = fmtDate(d), isT = ds === td;
        const evs = (evByDate[ds] || []).sort((a, b) => (a.time || '').localeCompare(b.time || ''));
        const body = evs.length ? evs.map(e => `<div class="calw-ev"><span class="calw-ev-time">${esc(e.time || '–')}</span><span>${esc(e.title)}</span></div>`).join('')
          : '<div class="calw-empty">ไม่มี event</div>';
        rows += `<div class="calw-day${isT ? ' today-day' : ''}" data-open="${ds}">
          <div class="calw-head"><span class="calw-dow">${TH_DAYS_SHORT[d.getDay()]}</span><span class="calw-num">${d.getDate()}</span></div>${body}</div>`;
      }
      $('calWrap').innerHTML = `<div class="cal-wrap">${rows}</div>`;
    } else {
      const [y, m] = monthOf(calAnchor).split('-').map(Number);
      $('calLabel').textContent = `${TH_MONTHS_FULL[m - 1]} ${y}`;
      const days = new Date(y, m, 0).getDate(), startDow = new Date(y, m - 1, 1).getDay();
      const evByDate = {}; getMonthData(`${y}-${p2(m)}`).events.forEach(e => (evByDate[e.date] ??= []).push(e));
      const heads = TH_DAYS_SHORT.map(d => `<div class="cal-head">${d}</div>`).join('');
      let cells = '';
      for (let i = 0; i < startDow; i++) cells += `<div class="cal-day empty"></div>`;
      for (let day = 1; day <= days; day++) {
        const ds = `${y}-${p2(m)}-${p2(day)}`, isT = ds === td, ev = evByDate[ds] || [];
        const evDots = ev.slice(0, 8).map(e => `<div class="cal-dot" style="background:var(--accent)" title="${esc(e.title)}"></div>`).join('');
        const todoDots = pending.slice(0, 6).map(t => `<div class="cal-dot" style="background:var(--silver)" title="${esc(t.title)}"></div>`).join('');
        const dots = evDots + todoDots;
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
    $('habLabel').textContent = `${TH_MONTHS_FULL[m - 1]} ${y}`;
    const days = new Date(y, m, 0).getDate(), td = today(), done = habitDoneMap();
    const startDow = new Date(y, m - 1, 1).getDay();
    const dayHeaders = TH_DAYS_SHORT.map(d => `<div class="habit-cal-head">${d}</div>`).join('');

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
        <div class="habit-track-meta">${streak > 0 ? `<span class="habit-streak">${FLAME} ${streak} วัน</span>` : ''}
        <span class="habit-pct">${doneCount} วัน · ${pct}%</span></div></div>
        <div class="habit-cal-grid">${dayHeaders}${cells}</div></div>`;
    }).join('');

    const avgPct = totalElapsed > 0 ? Math.round(totalDone / totalElapsed * 100) : 0;
    const tdDone = HABITS.filter(h => done[h].has(td)).length;
    $('habitOverview').innerHTML = `
      <div class="ho-card"><div class="ho-num" style="color:var(--accent)">${FLAME} ${bestStreak}</div><div class="ho-lbl">Streak สูงสุด</div></div>
      <div class="ho-card"><div class="ho-num">${avgPct}%</div><div class="ho-lbl">เฉลี่ยเดือนนี้</div></div>
      <div class="ho-card"><div class="ho-num" style="color:var(--green)">${tdDone}/${HABITS.length}</div><div class="ho-lbl">วันนี้</div></div>`;
    $('habitTracks').innerHTML = cards;
  }

  // ── modal ──
  function openModal(ds) {
    const d = new Date(ds + 'T00:00:00');
    const evs = allMonthsData().flatMap(m => m.events || []).filter(e => e.date === ds).sort((a, b) => (a.time || '').localeCompare(b.time || ''));
    const tds = allMonthsData().flatMap(m => m.todos || []).filter(t => t.status !== 'done');
    $('mTitle').textContent = `${d.getDate()} ${TH_MONTHS_FULL[d.getMonth()]}`;
    $('mSub').textContent = `วัน${TH_DAYS_FULL[d.getDay()]}`;
    let html = '';
    if (evs.length) html += `<div class="modal-sec-title">Events</div>` + evs.map(renderEventItem).join('');
    if (tds.length) html += `<div class="modal-sec-title" style="margin-top:${evs.length ? 14 : 0}px">Tasks ค้างอยู่</div>` + tds.map(renderTodoItem).join('');
    $('mBody').innerHTML = html || `<div class="modal-empty">ไม่มีรายการ</div>`;
    $('plOverlay').classList.add('active');
  }
  const closeModal = () => $('plOverlay').classList.remove('active');

  // ── tab switching ──
  function switchTab(tab) {
    activeTab = tab;
    root.querySelectorAll('.pl-tab').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
    root.querySelectorAll('.pl-pane').forEach(p => p.classList.toggle('active', p.id === 'pl-' + tab));
    renderTab(tab);
  }
  function renderTab(tab) {
    if (tab === 'agenda') renderAgenda();
    else if (tab === 'todos') renderTodos();
    else if (tab === 'calendar') renderCalendar();
    else if (tab === 'habits') renderHabits();
  }

  // ── events wiring ──
  function wire() {
    root.querySelectorAll('.pl-tab').forEach(b => b.onclick = () => switchTab(b.dataset.tab));
    root.querySelectorAll('[data-day]').forEach(b => b.onclick = () => {
      const d = new Date(selDay + 'T00:00:00'); d.setDate(d.getDate() + Number(b.dataset.day));
      selDay = fmtDate(d); renderAgenda();
    });
    root.querySelectorAll('[data-fstatus]').forEach(b => b.onclick = () => {
      fStatus = b.dataset.fstatus;
      root.querySelectorAll('[data-fstatus]').forEach(x => x.classList.toggle('on', x === b));
      renderTodos();
    });
    $('todoSearch').oninput = e => { searchQ = e.target.value.trim().toLowerCase(); renderTodos(); };
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
      const o = e.target.closest('[data-open]'); if (o) openModal(o.dataset.open);
    });
    $('mClose').onclick = closeModal;
    $('plOverlay').onclick = e => { if (e.target === $('plOverlay')) closeModal(); };
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

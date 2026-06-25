// ===== Home view — super-app landing: ทุกอย่างในชีวิตวันนี้ในจอเดียว =====
// อ่านจาก PLANNER_DATA + SAVINGS_DATA ที่โหลดใน shell แล้ว (ไม่มี data file ของตัวเอง)
window.HomeView = (function () {
  const P = window.PLANNER_DATA || {};
  const PKEYS = window.PLANNER_KEYS || [];
  const SV = window.SAVINGS_DATA || { currency: '฿', jars: [] };
  const HABITS = ['exercise', 'read', 'water', 'sleep_early'];
  const HABIT_LABELS = { exercise: 'Exercise', read: 'Read', water: 'Water', sleep_early: 'Sleep early' };
  const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const DAYS_FULL = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const p2 = n => String(n).padStart(2, '0');
  const fmtDate = d => `${d.getFullYear()}-${p2(d.getMonth() + 1)}-${p2(d.getDate())}`;
  const today = () => fmtDate(new Date());
  const baht = n => SV.currency + Number(n || 0).toLocaleString('en-US');

  const go = name => { if (window.Shell) window.Shell.showView(name); };

  function allEvents() { return PKEYS.flatMap(k => (P[k] && P[k].events) || []); }
  function habitDoneToday() {
    const td = today(); const done = {};
    HABITS.forEach(h => done[h] = false);
    PKEYS.forEach(k => ((P[k] && P[k].habits) || []).forEach(rec => {
      if (done[rec.habit] === false && (rec.done_dates || []).includes(td)) done[rec.habit] = true;
    }));
    return done;
  }

  // progress ring (habits done today)
  function ring(done, total) {
    const pct = total > 0 ? done / total : 0;
    const r = 26, c = 2 * Math.PI * r, off = c * (1 - pct);
    return `<svg class="ring" viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="${r}" fill="none" stroke="var(--surface-3)" stroke-width="6"/>
      <circle cx="32" cy="32" r="${r}" fill="none" stroke="var(--green)" stroke-width="6"
        stroke-linecap="round" stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${off.toFixed(1)}"
        transform="rotate(-90 32 32)"/>
      <text x="32" y="34" text-anchor="middle" dominant-baseline="middle" class="ring-txt">${done}/${total}</text>
    </svg>`;
  }

  function greeting() {
    const h = new Date().getHours();
    if (h < 12) return 'สวัสดีตอนเช้า';
    if (h < 17) return 'สวัสดีตอนบ่าย';
    return 'สวัสดีตอนเย็น';
  }

  function render(root) {
    const td = today(), d = new Date(td + 'T00:00:00');
    const evToday = allEvents().filter(e => e.date === td).sort((a, b) => (a.time || '').localeCompare(b.time || ''));
    const done = habitDoneToday();
    const hDone = HABITS.filter(h => done[h]).length;

    // savings
    const jars = SV.jars || [];
    const totalSaved = jars.reduce((s, j) => s + (j.saved || 0), 0);
    const totalGoal = jars.reduce((s, j) => s + (j.goal || 0), 0);
    const savPct = totalGoal > 0 ? Math.round(totalSaved / totalGoal * 100) : 0;
    // jar ที่ใกล้เป้าสุด (ยังไม่ครบ)
    const nearest = jars.filter(j => j.goal > 0 && j.saved < j.goal)
      .sort((a, b) => (b.saved / b.goal) - (a.saved / a.goal))[0];

    // ── today's events timeline (compact) ──
    const evHTML = evToday.length
      ? evToday.map(e => `<div class="ho-ev">
          <span class="ho-ev-time">${esc(e.time || '–')}</span>
          <span class="ho-ev-dot"></span>
          <span class="ho-ev-title">${esc(e.title)}</span>
        </div>`).join('')
      : '<div class="ho-empty">วันนี้ว่าง ไม่มีนัด</div>';

    // ── habits chips ──
    const habHTML = HABITS.map(h => `<span class="ho-hab ${done[h] ? 'on' : ''}">
        <span class="ho-hab-tick">${done[h] ? '&#10003;' : ''}</span>${HABIT_LABELS[h]}
      </span>`).join('');

    root.innerHTML = `<div class="container ho">
      <div class="ho-greet">
        <div class="ho-hi">${greeting()}, jiroj</div>
        <div class="ho-date">${DAYS_FULL[d.getDay()]}, ${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}</div>
      </div>

      <div class="card ho-today" data-go="planner">
        <div class="ho-card-head">
          <div class="section-title" style="margin:0">วันนี้</div>
          <span class="ho-link">Planner &#8594;</span>
        </div>
        <div class="ho-today-grid">
          <div class="ho-events">${evHTML}</div>
          <div class="ho-habits-wrap">
            ${ring(hDone, HABITS.length)}
            <div class="ho-habits">${habHTML}</div>
          </div>
        </div>
      </div>

      <div class="ho-row2">
        <div class="card ho-mini" data-go="money">
          <div class="ho-card-head">
            <div class="section-title" style="margin:0">เงินเก็บ</div>
            <span class="ho-link">Money &#8594;</span>
          </div>
          <div class="ho-big">${baht(totalSaved)}</div>
          <div class="ho-sub">จาก ${baht(totalGoal)} · ${savPct}%</div>
          <div class="ho-bar"><div class="ho-bar-fill" style="width:${Math.min(100, savPct)}%"></div></div>
          ${nearest ? `<div class="ho-foot">ใกล้เป้าสุด: <b>${esc(nearest.name)}</b> ${Math.round(nearest.saved / nearest.goal * 100)}%</div>` : '<div class="ho-foot">ครบทุกโหลแล้ว</div>'}
        </div>

        <div class="card ho-mini ho-invest" data-go="investment">
          <div class="ho-card-head">
            <div class="section-title" style="margin:0">ลงทุน</div>
            <span class="ho-link">Invest &#8594;</span>
          </div>
          <div class="ho-invest-illu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 18l5-5 4 3 7-8"/><path d="M16 8h5v5"/></svg>
          </div>
          <div class="ho-foot">เปิดดูพอร์ต thesis และข่าวหุ้นที่ถือ</div>
        </div>
      </div>

      <div class="ho-quick">
        <button class="ho-q" data-go="planner">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/></svg>
          <span>ตาราง</span>
        </button>
        <button class="ho-q" data-go="planner">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2c1.2 2.8-.6 4.2-1.7 5.9C9.1 9.7 8 11 8 13a4 4 0 0 0 8 0c0-1.6-.7-2.7-1.4-3.7.1 1.1-.6 1.9-1.4 1.9-1 0-1.5-.9-1.2-2.1C11.4 6.5 12.6 4.4 12 2z"/></svg>
          <span>Habits</span>
        </button>
        <button class="ho-q" data-go="money">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2z"/><path d="M16 8V6a2 2 0 0 0-2-2"/></svg>
          <span>โหลเงิน</span>
        </button>
        <button class="ho-q" data-go="investment">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 18l5-5 4 3 7-8"/><path d="M16 8h5v5"/></svg>
          <span>พอร์ต</span>
        </button>
      </div>
    </div>`;

    root.querySelectorAll('[data-go]').forEach(el => el.addEventListener('click', () => go(el.dataset.go)));
  }

  function mount(el) { render(el); } // re-render ทุกครั้งที่เปิด (สะท้อนสถานะวันนี้ล่าสุด)
  return { mount };
})();

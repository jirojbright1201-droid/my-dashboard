// ===== Left Hand Tracker — streak/กิจกรรม/ความคล่อง/โน้ตฝึกมือซ้าย (data: data/lefthand.data.js) =====
window.LeftHandView = (function () {
  const DATA = window.LEFTHAND_DATA || { goal: {}, logs: [] };
  const LOGS = DATA.logs || [];
  const GOAL = DATA.goal || {};

  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const fmtDate = d => { if (!d) return ''; const [y, m, day] = d.split('-'); return `${day}/${m}/${y.slice(2)}`; };
  const S = p => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const toKey = d => d.toISOString().slice(0, 10);
  const diffDays = (a, b) => Math.round((new Date(b + 'T00:00:00') - new Date(a + 'T00:00:00')) / 86400000);

  // ── state ──
  let root, activeTab = 'overview';
  const $ = id => root.querySelector('#' + id);
  const logByDate = d => LOGS.find(l => l.date === d);

  const TEMPLATE = `
  <div class="container lh">
    <div id="lh-overview" class="lh-pane active"></div>
    <div id="lh-history" class="lh-pane"></div>
    <nav class="tabbar">
      <button class="lh-tab tab-item active" data-tab="overview">${S('<path d="M3 12l9-8 9 8"/><path d="M5 10v10h14V10"/>')}<span>ภาพรวม</span></button>
      <button class="lh-tab tab-item" data-tab="history">${S('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>')}<span>ประวัติ</span></button>
    </nav>
  </div>

  <div class="overlay" id="lhOverlay">
    <div class="modal">
      <div class="sheet-handle"></div>
      <div class="modal-head">
        <div><div class="modal-title" id="lhMTitle"></div><div class="modal-sub" id="lhMSub"></div></div>
        <button class="modal-close" id="lhMClose"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
      </div>
      <div class="modal-body" id="lhMBody"></div>
    </div>
  </div>`;

  // ── streak: นับวันติดต่อกันจาก logs ที่เรียงตามวันที่ ──
  function computeStreaks() {
    const sorted = [...LOGS].sort((a, b) => a.date.localeCompare(b.date));
    let best = 0, run = 0, prev = null;
    sorted.forEach(l => {
      if (l.practiced) {
        run = (prev && diffDays(prev, l.date) === 1) ? run + 1 : 1;
        prev = l.date;
        if (run > best) best = run;
      } else { run = 0; prev = null; }
    });
    let current = 0;
    for (let i = sorted.length - 1; i >= 0; i--) {
      const l = sorted[i];
      if (!l.practiced) break;
      if (current === 0) current = 1;
      else if (diffDays(l.date, sorted[i + 1].date) === 1) current++;
      else break;
    }
    return { current, best };
  }

  function dots(n, max) {
    max = max || 5; n = n || 0;
    let out = '';
    for (let i = 1; i <= max; i++) out += `<span class="lh-dot${i <= n ? ' on' : ''}"></span>`;
    return `<span class="lh-dots">${out}</span>`;
  }

  function activityChips(activities) {
    if (!activities || !activities.length) return '';
    return `<div class="lh-chips">${activities.map(a => `<span class="lh-chip">${esc(a.name)}${a.minutes ? ` · ${a.minutes}น.` : ''}</span>`).join('')}</div>`;
  }

  // ── overview ──
  function renderOverview() {
    const { current, best } = computeStreaks();
    const today = toKey(new Date());
    const todayLog = logByDate(today);
    const todayDone = !!(todayLog && todayLog.practiced);

    const weekDates = []; for (let i = 0; i < 7; i++) { const d = new Date(); d.setDate(d.getDate() - i); weekDates.push(toKey(d)); }
    const weekLogs = LOGS.filter(l => weekDates.includes(l.date) && l.practiced);
    const weekMinutes = weekLogs.reduce((s, l) => s + (l.activities || []).reduce((s2, a) => s2 + (a.minutes || 0), 0), 0);
    const fluent = weekLogs.filter(l => l.fluency);
    const avgFluency = fluent.length ? (fluent.reduce((s, l) => s + l.fluency, 0) / fluent.length).toFixed(1) : '–';

    const target = GOAL.streakTarget || 0;
    const targetBar = target > 0 ? `<div class="lh-bar"><div class="lh-bar-fill" style="width:${Math.min(100, Math.round(current / target * 100))}%"></div></div>
      <div class="hero-cap center">${current}/${target} วัน สู่เป้าหมาย</div>` : '';

    const recent = [...LOGS].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6);
    const recentRows = recent.map(l => `
      <div class="lh-row" data-date="${esc(l.date)}">
        <div class="lh-row-date">${fmtDate(l.date)}</div>
        <div class="lh-row-body">
          <div class="lh-row-top">
            <span class="chip ${l.practiced ? 'lh-chip-done' : 'lh-chip-skip'}">${l.practiced ? 'ฝึกแล้ว' : 'ไม่ได้ฝึก'}</span>
            ${l.practiced ? dots(l.fluency) : ''}
          </div>
          ${activityChips(l.activities)}
        </div>
      </div>`).join('');

    $('lh-overview').innerHTML = `
      <div class="hero lh-hero">
        <div class="hero-eyebrow center">Streak ฝึกมือซ้าย</div>
        <div class="lh-streak-num" data-count="${current}" data-cdec="0">${current}</div>
        <div class="hero-cap center">${current === 0 ? 'ยังไม่มี streak — เริ่มวันนี้เลย' : `วันติดต่อกัน${todayDone ? '' : ' · วันนี้ยังไม่ได้ฝึก'}`}</div>
        ${targetBar}
        <div class="hero-split">
          <div class="hero-cell"><div class="hero-cell-lab">Streak สูงสุด</div><div class="hero-cell-val">${best}</div></div>
          <div class="hero-cell"><div class="hero-cell-lab">สัปดาห์นี้</div><div class="hero-cell-val">${weekLogs.length}/7</div></div>
          <div class="hero-cell"><div class="hero-cell-lab">ความคล่องเฉลี่ย</div><div class="hero-cell-val">${avgFluency}</div></div>
        </div>
        <div class="hero-cap center" style="margin-top:6px">${weekMinutes} นาทีที่ฝึกสัปดาห์นี้</div>
      </div>

      <div class="card">
        <div class="section-title">บันทึกล่าสุด</div>
        <div class="lh-list">${recentRows || '<div class="empty">ยังไม่มีบันทึกการฝึก</div>'}</div>
      </div>`;
    if (window.UIFX) window.UIFX.countAll($('lh-overview'));
  }

  // ── history ──
  function renderHistory() {
    const sorted = [...LOGS].sort((a, b) => b.date.localeCompare(a.date));
    const rows = sorted.map(l => `
      <div class="lh-row" data-date="${esc(l.date)}">
        <div class="lh-row-date">${fmtDate(l.date)}</div>
        <div class="lh-row-body">
          <div class="lh-row-top">
            <span class="chip ${l.practiced ? 'lh-chip-done' : 'lh-chip-skip'}">${l.practiced ? 'ฝึกแล้ว' : 'ไม่ได้ฝึก'}</span>
            ${l.practiced ? dots(l.fluency) : ''}
          </div>
          ${activityChips(l.activities)}
          ${l.note ? `<div class="lh-note-preview">${esc(l.note.slice(0, 60))}${l.note.length > 60 ? '…' : ''}</div>` : ''}
        </div>
      </div>`).join('');
    $('lh-history').innerHTML = `<div class="card lh-list">${rows || '<div class="empty">ยังไม่มีประวัติการฝึก</div>'}</div>`;
  }

  // ── detail modal ──
  function openLog(date) {
    const l = logByDate(date); if (!l) return;
    $('lhMTitle').textContent = fmtDate(l.date);
    $('lhMSub').textContent = l.practiced ? 'ฝึกแล้ว' : 'ไม่ได้ฝึก';
    $('lhMBody').innerHTML = `
      ${l.practiced ? `<div class="modal-sec-title">ความคล่อง</div>${dots(l.fluency)}` : ''}
      ${activityChips(l.activities) ? `<div class="modal-sec-title">กิจกรรม</div>${activityChips(l.activities)}` : ''}
      ${l.note ? `<div class="modal-sec-title">โน้ต</div><div class="lh-review-text">${esc(l.note)}</div>` : ''}`;
    $('lhOverlay').classList.add('active');
  }
  function closeModal() {
    const o = $('lhOverlay'); o.classList.add('closing');
    setTimeout(() => o.classList.remove('active', 'closing'), 300);
  }

  // ── tabs ──
  function switchTab(tab) {
    activeTab = tab;
    root.querySelectorAll('.lh-tab').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
    root.querySelectorAll('.lh-pane').forEach(p => p.classList.toggle('active', p.id === 'lh-' + tab));
    if (tab === 'overview') renderOverview();
    else if (tab === 'history') renderHistory();
  }

  function wire() {
    root.querySelectorAll('.lh-tab').forEach(b => b.onclick = () => switchTab(b.dataset.tab));
    root.addEventListener('click', e => {
      const c = e.target.closest('[data-date]'); if (c) openLog(c.dataset.date);
    });
    $('lhMClose').onclick = closeModal;
    $('lhOverlay').onclick = e => { if (e.target === $('lhOverlay')) closeModal(); };
  }

  function mount(el) {
    if (el.dataset.mounted) return;
    root = el; el.innerHTML = TEMPLATE; el.dataset.mounted = '1';
    wire(); switchTab('overview');
  }
  return { mount };
})();

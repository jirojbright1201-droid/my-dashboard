// ===== English Tracker hub — streak/คำศัพท์/จุดผิด (data: data/english.data.js) =====
// สอน 1-on-1 เกิดในแชทกับ Jarvis เอง — แอปนี้แค่ track ผลลัพธ์ ไม่มี logic สอนในไฟล์นี้
window.EnglishView = (function () {
  const DATA = window.ENGLISH_DATA || { level: 'beginner', sessions: [], vocab: [], mistakes: [] };
  const SESSIONS = DATA.sessions || [];
  const VOCAB = DATA.vocab || [];
  const MISTAKES = DATA.mistakes || [];
  const LEVEL_LABEL = { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' };

  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const fmtDate = d => { if (!d) return ''; const [y, m, day] = d.split('-'); return `${day}/${m}/${y.slice(2)}`; };
  const S = p => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;

  // ── state ──
  let root, activeTab = 'overview';
  const $ = id => root.querySelector('#' + id);
  const vocabById = id => VOCAB.find(v => v.id === id);
  const mistakeById = id => MISTAKES.find(m => m.id === id);

  // ── streak: นับวันฝึกต่อเนื่องย้อนจากวันนี้/เมื่อวาน จาก sessions[].date ──
  function toDate(str) { const [y, m, d] = str.split('-').map(Number); return new Date(y, m - 1, d); }
  function calcStreak() {
    const dates = [...new Set(SESSIONS.map(s => s.date))].sort().reverse();
    if (!dates.length) return 0;
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const mostRecent = toDate(dates[0]);
    const diffDays = Math.round((today - mostRecent) / 86400000);
    if (diffDays > 1) return 0;
    let streak = 0, expected = mostRecent;
    for (const dStr of dates) {
      const d = toDate(dStr);
      if (d.getTime() === expected.getTime()) {
        streak++;
        expected = new Date(expected); expected.setDate(expected.getDate() - 1);
      } else if (d.getTime() < expected.getTime()) break;
    }
    return streak;
  }

  const TEMPLATE = `
  <div class="container en">
    <div id="en-overview" class="en-pane active"></div>
    <div id="en-vocab" class="en-pane"></div>
    <div id="en-mistakes" class="en-pane"></div>
    <nav class="tabbar">
      <button class="en-tab tab-item active" data-tab="overview">${S('<path d="M3 12l9-8 9 8"/><path d="M5 10v10h14V10"/>')}<span>Overview</span></button>
      <button class="en-tab tab-item" data-tab="vocab">${S('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>')}<span>Vocab</span></button>
      <button class="en-tab tab-item" data-tab="mistakes">${S('<circle cx="12" cy="12" r="10"/><path d="M12 8v5M12 16h.01"/>')}<span>Mistakes</span></button>
    </nav>
  </div>

  <div class="overlay" id="enOverlay">
    <div class="modal">
      <div class="sheet-handle"></div>
      <div class="modal-head">
        <div><div class="modal-title" id="enMTitle"></div><div class="modal-sub" id="enMSub"></div></div>
        <button class="modal-close" id="enMClose"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
      </div>
      <div class="modal-body" id="enMBody"></div>
    </div>
  </div>`;

  // ── overview ──
  function renderOverview() {
    const streak = calcStreak();
    const monthKey = new Date().toISOString().slice(0, 7);
    const sessionsThisMonth = SESSIONS.filter(s => (s.date || '').startsWith(monthKey)).length;
    const recent = [...SESSIONS].sort((a, b) => (b.date || '').localeCompare(a.date || '')).slice(0, 6);

    const recentRows = recent.map(s => `
      <div class="en-sess">
        <div class="en-sess-date">${fmtDate(s.date)}</div>
        <div class="en-sess-body">
          <div class="en-sess-topic">${esc(s.topic)}</div>
          ${s.note ? `<div class="en-sess-note">${esc(s.note)}</div>` : ''}
        </div>
      </div>`).join('');

    $('en-overview').innerHTML = `
      <div class="hero en-hero">
        <div class="hero-eyebrow center">Practice Streak</div>
        <div class="en-streak-wrap">
          ${S('<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>')}
          <b data-count="${streak}" data-cdec="0">${streak}</b>
        </div>
        <div class="hero-cap center">${streak > 0 ? `day${streak === 1 ? '' : 's'} in a row` : 'Practice today to start a streak'}</div>
        <div class="hero-split">
          <div class="hero-cell"><div class="hero-cell-lab">Level</div><div class="hero-cell-val">${LEVEL_LABEL[DATA.level] || DATA.level}</div></div>
          <div class="hero-cell"><div class="hero-cell-lab">Vocab</div><div class="hero-cell-val">${VOCAB.length}</div></div>
          <div class="hero-cell"><div class="hero-cell-lab">This Month</div><div class="hero-cell-val">${sessionsThisMonth}</div></div>
        </div>
      </div>

      <div class="card">
        <div class="section-title">Recent Sessions</div>
        ${recentRows || '<div class="empty">No sessions logged yet</div>'}
      </div>`;
    if (window.UIFX) window.UIFX.countAll($('en-overview'));
  }

  // ── vocab ──
  function renderVocab() {
    const sorted = [...VOCAB].sort((a, b) => (b.dateAdded || '').localeCompare(a.dateAdded || ''));
    const rows = sorted.map(v => `
      <div class="en-row" data-kind="vocab" data-id="${esc(v.id)}">
        <div class="en-row-body">
          <div class="en-row-title">${esc(v.term)}</div>
          <div class="en-row-sub">${esc(v.meaning)}</div>
        </div>
      </div>`).join('');
    $('en-vocab').innerHTML = `
      <div class="section-title">All Vocab (${sorted.length})</div>
      <div class="card en-list">${rows || '<div class="empty">No vocab logged yet</div>'}</div>`;
  }

  // ── mistakes ──
  function renderMistakes() {
    const sorted = [...MISTAKES].sort((a, b) => (b.dateAdded || '').localeCompare(a.dateAdded || ''));
    const rows = sorted.map(m => `
      <div class="en-row" data-kind="mistake" data-id="${esc(m.id)}">
        <div class="en-row-body">
          <div class="en-row-title en-strike">${esc(m.mistake)}</div>
          <div class="en-row-sub">${esc(m.correction)}</div>
        </div>
      </div>`).join('');
    $('en-mistakes').innerHTML = `
      <div class="section-title">All Mistakes (${sorted.length})</div>
      <div class="card en-list">${rows || '<div class="empty">No mistakes logged yet</div>'}</div>`;
  }

  // ── detail modal ──
  function openVocab(id) {
    const v = vocabById(id); if (!v) return;
    $('enMTitle').textContent = v.term;
    $('enMSub').textContent = 'Added ' + fmtDate(v.dateAdded);
    $('enMBody').innerHTML = `
      <div class="modal-sec-title">Meaning</div>
      <div class="en-review-text">${esc(v.meaning)}</div>
      ${v.example ? `<div class="modal-sec-title">Example</div><div class="en-review-text en-example">${esc(v.example)}</div>` : ''}`;
    $('enOverlay').classList.add('active');
  }
  function openMistake(id) {
    const m = mistakeById(id); if (!m) return;
    $('enMTitle').textContent = m.mistake;
    $('enMSub').textContent = 'Logged ' + fmtDate(m.dateAdded);
    $('enMBody').innerHTML = `
      <div class="modal-sec-title">Correction</div>
      <div class="en-review-text">${esc(m.correction)}</div>
      ${m.why ? `<div class="modal-sec-title">Why</div><div class="en-review-text">${esc(m.why)}</div>` : ''}`;
    $('enOverlay').classList.add('active');
  }
  function closeModal() {
    const o = $('enOverlay'); o.classList.add('closing');
    setTimeout(() => o.classList.remove('active', 'closing'), 300);
  }

  // ── tabs ──
  function switchTab(tab) {
    activeTab = tab;
    root.querySelectorAll('.en-tab').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
    root.querySelectorAll('.en-pane').forEach(p => p.classList.toggle('active', p.id === 'en-' + tab));
    if (tab === 'overview') renderOverview();
    else if (tab === 'vocab') renderVocab();
    else if (tab === 'mistakes') renderMistakes();
  }

  function wire() {
    root.querySelectorAll('.en-tab').forEach(b => b.onclick = () => switchTab(b.dataset.tab));
    root.addEventListener('click', e => {
      const c = e.target.closest('[data-id]'); if (!c) return;
      if (c.dataset.kind === 'vocab') openVocab(c.dataset.id);
      else if (c.dataset.kind === 'mistake') openMistake(c.dataset.id);
    });
    $('enMClose').onclick = closeModal;
    $('enOverlay').onclick = e => { if (e.target === $('enOverlay')) closeModal(); };
  }

  function mount(el) {
    if (el.dataset.mounted) return;
    root = el; el.innerHTML = TEMPLATE; el.dataset.mounted = '1';
    wire(); switchTab('overview');
  }
  return { mount };
})();

// ===== English Tracker hub — streak/vocab/mistakes จาก session ที่เรียนกับ Jarvis ในแชท (data: data/english.data.js) =====
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

  function calcStreak() {
    const days = new Set(SESSIONS.map(s => s.date));
    if (!days.size) return 0;
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const toKey = d => d.toISOString().slice(0, 10);
    let cursor = new Date(today);
    if (!days.has(toKey(cursor))) {
      cursor.setDate(cursor.getDate() - 1);
      if (!days.has(toKey(cursor))) return 0;
    }
    let n = 0;
    while (days.has(toKey(cursor))) { n++; cursor.setDate(cursor.getDate() - 1); }
    return n;
  }

  const TEMPLATE = `
  <div class="container eng">
    <div id="eng-overview" class="eng-pane active"></div>
    <div id="eng-vocab" class="eng-pane"></div>
    <div id="eng-mistakes" class="eng-pane"></div>
    <nav class="tabbar">
      <button class="eng-tab tab-item active" data-tab="overview">${S('<path d="M3 12l9-8 9 8"/><path d="M5 10v10h14V10"/>')}<span>Overview</span></button>
      <button class="eng-tab tab-item" data-tab="vocab">${S('<path d="M5 4h6a4 4 0 0 1 4 4 4 4 0 0 1 4-4h6M12 8v13"/>')}<span>Vocab</span></button>
      <button class="eng-tab tab-item" data-tab="mistakes">${S('<circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/>')}<span>Mistakes</span></button>
    </nav>
  </div>

  <div class="overlay" id="engOverlay">
    <div class="modal">
      <div class="sheet-handle"></div>
      <div class="modal-head">
        <div><div class="modal-title" id="engMTitle"></div><div class="modal-sub" id="engMSub"></div></div>
        <button class="modal-close" id="engMClose"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
      </div>
      <div class="modal-body" id="engMBody"></div>
    </div>
  </div>`;

  function sessionRow(s) {
    return `<div class="eng-row">
      <div class="eng-row-body">
        <div class="eng-row-title">${esc(s.topic)}</div>
        <div class="eng-row-sub">${fmtDate(s.date)}${s.note ? ' · ' + esc(s.note) : ''}</div>
      </div>
    </div>`;
  }

  function vocabRow(v) {
    return `<div class="eng-row" data-vid="${esc(v.id)}">
      <div class="eng-row-body">
        <div class="eng-row-title">${esc(v.term)}</div>
        <div class="eng-row-sub">${esc(v.meaning)}</div>
      </div>
      <svg class="eng-row-arrow" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>
    </div>`;
  }

  function mistakeRow(m) {
    return `<div class="eng-row" data-mid="${esc(m.id)}">
      <div class="eng-row-body">
        <div class="eng-row-title">${esc(m.mistake)}</div>
        <div class="eng-row-sub">${esc(m.correction)}</div>
      </div>
      <svg class="eng-row-arrow" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>
    </div>`;
  }

  // ── overview ──
  function renderOverview() {
    const ym = new Date().toISOString().slice(0, 7);
    const streak = calcStreak();
    const thisMonth = SESSIONS.filter(s => (s.date || '').slice(0, 7) === ym).length;
    const recent = [...SESSIONS].sort((a, b) => (b.date || '').localeCompare(a.date || '')).slice(0, 5);

    $('eng-overview').innerHTML = `
      <div class="hero eng-hero">
        <div class="hero-eyebrow">Day Streak</div>
        <div class="hero-figure" data-count="${streak}" data-cdec="0">${streak}</div>
        <div class="hero-cap">Keep practicing every day</div>
        <div class="hero-split">
          <div class="hero-cell"><div class="hero-cell-lab">Level</div><div class="hero-cell-val">${LEVEL_LABEL[DATA.level] || DATA.level}</div></div>
          <div class="hero-cell"><div class="hero-cell-lab">Vocab</div><div class="hero-cell-val">${VOCAB.length}</div></div>
          <div class="hero-cell"><div class="hero-cell-lab">This Month</div><div class="hero-cell-val">${thisMonth}</div></div>
        </div>
      </div>

      <div class="card eng-list">
        <div class="section-title">Recent Sessions</div>
        ${recent.map(sessionRow).join('') || '<div class="empty">No sessions logged yet</div>'}
      </div>`;
    if (window.UIFX) window.UIFX.countAll($('eng-overview'));
  }

  // ── vocab ──
  function renderVocab() {
    const sorted = [...VOCAB].sort((a, b) => (b.dateAdded || '').localeCompare(a.dateAdded || ''));
    $('eng-vocab').innerHTML = `
      <div class="section-title">All Vocab (${sorted.length})</div>
      <div class="card eng-list">${sorted.map(vocabRow).join('') || '<div class="empty">No vocab logged yet</div>'}</div>`;
  }

  // ── mistakes ──
  function renderMistakes() {
    const sorted = [...MISTAKES].sort((a, b) => (b.dateAdded || '').localeCompare(a.dateAdded || ''));
    $('eng-mistakes').innerHTML = `
      <div class="section-title">Things To Review (${sorted.length})</div>
      <div class="card eng-list">${sorted.map(mistakeRow).join('') || '<div class="empty">No mistakes logged yet</div>'}</div>`;
  }

  // ── detail modals ──
  function openVocab(id) {
    const v = vocabById(id); if (!v) return;
    $('engMTitle').textContent = v.term;
    $('engMSub').textContent = fmtDate(v.dateAdded);
    $('engMBody').innerHTML = `
      <div class="modal-sec-title">Meaning</div><div class="eng-desc">${esc(v.meaning)}</div>
      ${v.example ? `<div class="modal-sec-title">Example</div><div class="eng-desc">${esc(v.example)}</div>` : ''}`;
    $('engOverlay').classList.add('active');
  }
  function openMistake(id) {
    const m = mistakeById(id); if (!m) return;
    $('engMTitle').textContent = m.mistake;
    $('engMSub').textContent = fmtDate(m.dateAdded);
    $('engMBody').innerHTML = `
      <div class="modal-sec-title">Correction</div><div class="eng-desc">${esc(m.correction)}</div>
      ${m.why ? `<div class="modal-sec-title">Why</div><div class="eng-desc">${esc(m.why)}</div>` : ''}`;
    $('engOverlay').classList.add('active');
  }
  function closeModal() {
    const o = $('engOverlay'); o.classList.add('closing');
    setTimeout(() => o.classList.remove('active', 'closing'), 300);
  }

  // ── tabs ──
  function switchTab(tab) {
    activeTab = tab;
    root.querySelectorAll('.eng-tab').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
    root.querySelectorAll('.eng-pane').forEach(p => p.classList.toggle('active', p.id === 'eng-' + tab));
    if (tab === 'overview') renderOverview();
    else if (tab === 'vocab') renderVocab();
    else if (tab === 'mistakes') renderMistakes();
  }

  function wire() {
    root.querySelectorAll('.eng-tab').forEach(b => b.onclick = () => switchTab(b.dataset.tab));
    root.addEventListener('click', e => {
      const v = e.target.closest('[data-vid]'); if (v) { openVocab(v.dataset.vid); return; }
      const m = e.target.closest('[data-mid]'); if (m) { openMistake(m.dataset.mid); return; }
    });
    $('engMClose').onclick = closeModal;
    $('engOverlay').onclick = e => { if (e.target === $('engOverlay')) closeModal(); };
  }

  function mount(el) {
    if (el.dataset.mounted) return;
    root = el; el.innerHTML = TEMPLATE; el.dataset.mounted = '1';
    wire(); switchTab('overview');
  }
  return { mount };
})();

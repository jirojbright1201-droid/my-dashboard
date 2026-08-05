// ===== University — Curriculum module (progress + GPA) — data: data/university-curriculum.data.js =====
// เตรียมรองรับโมดูล Schedule/Notes ที่จะเพิ่มทีหลัง (แท็บใหม่ในไฟล์นี้) — ตอนนี้มีแค่ Curriculum
window.UniversityView = (function () {
  const DATA = window.UNIVERSITY_CURRICULUM_DATA || { program: {}, categories: [], courses: [] };
  const PROGRAM = DATA.program || {};
  const CATEGORIES = DATA.categories || [];
  const COURSES = DATA.courses || [];

  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const S = p => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;

  const CAT_LABEL = Object.fromEntries(CATEGORIES.map(c => [c.key, c.label]));
  const CAT_ORDER = CATEGORIES.map(c => c.key);
  const GRADE_POINTS = { A: 4, 'B+': 3.5, B: 3, 'C+': 2.5, C: 2, 'D+': 1.5, D: 1, F: 0 };

  const catById = key => CATEGORIES.find(c => c.key === key);
  const courseById = id => COURSES.find(c => c.id === id);
  const isGraded = c => c.grade && GRADE_POINTS.hasOwnProperty(c.grade);

  const THAI_M = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
  function examDateLabel(d) {
    const [, m, day] = d.split('-').map(Number);
    return `${day} ${THAI_M[m - 1]}`;
  }

  function creditsEarned(list) { return (list || COURSES).filter(c => c.status === 'passed').reduce((s, c) => s + (c.credits || 0), 0); }
  function totalRequired() { return CATEGORIES.reduce((s, c) => s + (c.credits || 0), 0) || PROGRAM.totalCredits || 0; }
  function gpa() {
    const graded = COURSES.filter(isGraded);
    if (!graded.length) return null;
    const pts = graded.reduce((s, c) => s + GRADE_POINTS[c.grade] * (c.credits || 0), 0);
    const cr = graded.reduce((s, c) => s + (c.credits || 0), 0);
    return cr ? pts / cr : null;
  }

  // ── state ──
  let root, activeTab = 'overview', catFilter = 'all';
  const $ = id => root.querySelector('#' + id);

  const TEMPLATE = `
  <div class="container uni">
    <div id="uni-overview" class="uni-pane active"></div>
    <div id="uni-courses" class="uni-pane"></div>
    <div id="uni-grades" class="uni-pane"></div>
    <nav class="tabbar">
      <button class="uni-tab tab-item active" data-tab="overview">${S('<path d="M3 12l9-8 9 8"/><path d="M5 10v10h14V10"/>')}<span>Overview</span></button>
      <button class="uni-tab tab-item" data-tab="courses">${S('<path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 6l1.2 1.2L7.5 5"/><path d="M4 12l1.2 1.2L7.5 10"/><path d="M4 18l1.2 1.2L7.5 16"/>')}<span>Courses</span></button>
      <button class="uni-tab tab-item" data-tab="grades">${S('<path d="M12 3 2 8l10 5 10-5-10-5z"/><path d="M6 10.5v4c0 1.66 2.69 3 6 3s6-1.34 6-3v-4"/><path d="M22 8v6"/>')}<span>Grades</span></button>
    </nav>
  </div>

  <div class="overlay" id="uniOverlay">
    <div class="modal">
      <div class="sheet-handle"></div>
      <div class="modal-head">
        <div><div class="modal-title" id="uniMTitle"></div><div class="modal-sub" id="uniMSub"></div></div>
        <button class="modal-close" id="uniMClose"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
      </div>
      <div class="modal-body" id="uniMBody"></div>
    </div>
  </div>`;

  function statusChip(c) {
    if (c.status === 'passed') return `<span class="chip uni-chip-passed">Passed</span>`;
    if (c.status === 'failed') return `<span class="chip uni-chip-failed">Retake</span>`;
    return `<span class="chip uni-chip-todo">Not taken</span>`;
  }
  function statusDot(c) {
    if (c.status === 'passed') return '<span class="uni-dot passed"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12.5l5 5L20 6.5"/></svg></span>';
    if (c.status === 'failed') return '<span class="uni-dot failed"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6L6 18"/></svg></span>';
    return '<span class="uni-dot"></span>';
  }

  function row(c) {
    const label = c.code || '(ยังไม่เลือกวิชา)';
    return `<div class="uni-row" data-id="${esc(c.id)}">
      ${statusDot(c)}
      <span class="uni-row-body">
        <span class="uni-row-title">${esc(label)}</span>
        <span class="uni-row-sub">${esc(CAT_LABEL[c.category] || c.category)}${c.grade ? ' · เกรด ' + esc(c.grade) : ''}</span>
      </span>
      <span class="uni-row-cr">${c.credits} หน่วยกิต</span>
    </div>`;
  }

  // ── overview ──
  function renderOverview() {
    const earned = creditsEarned();
    const total = totalRequired();
    const pct = total ? Math.round(earned / total * 100) : 0;
    const g = gpa();
    const passedCount = COURSES.filter(c => c.status === 'passed').length;
    const examCourses = COURSES.filter(c => c.status === 'todo' && c.examDate).sort((a, b) => a.examDate.localeCompare(b.examDate));
    const currentTerm = examCourses.length ? examCourses[0].term : '';

    $('uni-overview').innerHTML = `
      ${PROGRAM.note ? `
      <div class="card">
        <div class="section-title">หลักสูตร</div>
        <div class="uni-note">${esc(PROGRAM.note)}</div>
      </div>` : ''}
      <div class="hero">
        <div class="hero-eyebrow">${esc(PROGRAM.name || 'Curriculum')}</div>
        <div class="hero-figure" data-count="${earned}" data-cprefix="" data-cdec="0">${earned}</div>
        <div class="hero-cap">จาก ${total} หน่วยกิตที่ต้องเรียนทั้งหมด (${pct}%)</div>
        <div class="uni-hero-bar"><div class="uni-hero-bar-fill" style="width:${pct}%"></div></div>
        <div class="hero-split">
          <div class="hero-cell"><div class="hero-cell-lab">ผ่านแล้ว</div><div class="hero-cell-val">${passedCount} วิชา</div></div>
          <div class="hero-cell"><div class="hero-cell-lab">เกรดเฉลี่ย</div><div class="hero-cell-val">${g == null ? '—' : g.toFixed(2)}</div></div>
          <div class="hero-cell"><div class="hero-cell-lab">คงเหลือ</div><div class="hero-cell-val">${Math.max(0, total - earned)} นก.</div></div>
        </div>
      </div>
      ${examCourses.length ? `
      <div class="card">
        <div class="section-title">วิชาเทอมนี้${currentTerm ? ' · ' + esc(currentTerm) : ''} — วันสอบ</div>
        ${examCourses.map(c => `<div class="uni-row" data-id="${esc(c.id)}">
          ${statusDot(c)}
          <span class="uni-row-body">
            <span class="uni-row-title">${esc(c.code)}</span>
            <span class="uni-row-sub">${esc(CAT_LABEL[c.category] || c.category)}${c.examSession ? ' · ช่วง' + esc(c.examSession) : ''}</span>
          </span>
          <span class="uni-row-cr">${examDateLabel(c.examDate)}</span>
        </div>`).join('')}
      </div>` : ''}

      <div class="card">
        <div class="section-title">ความคืบหน้าแต่ละหมวด</div>
        ${CATEGORIES.map(cat => {
          const list = COURSES.filter(c => c.category === cat.key);
          const done = creditsEarned(list);
          const p = cat.credits ? Math.min(100, Math.round(done / cat.credits * 100)) : 0;
          return `<div class="uni-cat">
            <div class="uni-cat-head"><span>${esc(cat.label)}</span><span class="uni-cat-num">${done}/${cat.credits} นก.</span></div>
            <div class="uni-bar"><div class="uni-bar-fill" style="width:${p}%"></div></div>
          </div>`;
        }).join('')}
      </div>`;
    if (window.UIFX) window.UIFX.countAll($('uni-overview'));
  }

  // ── courses (checklist, จัดกลุ่มตามหมวด + filter) ──
  function renderCourses() {
    const base = catFilter === 'all' ? COURSES : COURSES.filter(c => c.category === catFilter);
    const groups = CAT_ORDER.map(key => {
      const list = base.filter(c => c.category === key);
      if (!list.length) return '';
      const cat = catById(key);
      const done = creditsEarned(list);
      return `<div class="card uni-group">
        <div class="uni-group-head">
          <div class="section-title" style="margin-bottom:0">${esc(cat.label)} (${list.length})</div>
          <div class="uni-group-sum">${done}/${cat.credits} นก.</div>
        </div>
        ${list.map(row).join('')}
      </div>`;
    }).join('');

    const chips = [['all', 'ทั้งหมด']].concat(CATEGORIES.map(c => [c.key, c.label]))
      .map(([k, l]) => `<button class="uni-chipbtn${catFilter === k ? ' on' : ''}" data-filt="${k}">${esc(l)}</button>`).join('');

    $('uni-courses').innerHTML = `
      <div class="uni-filters">${chips}</div>
      ${groups || '<div class="card"><div class="empty">ไม่มีวิชาในหมวดนี้</div></div>'}`;
    root.querySelectorAll('[data-filt]').forEach(b => b.onclick = () => { catFilter = b.dataset.filt; renderCourses(); });
  }

  // ── grades (GPA + รายวิชาที่มีเกรดแล้ว) ──
  function renderGrades() {
    const graded = COURSES.filter(isGraded).sort((a, b) => a.code.localeCompare(b.code));
    const g = gpa();
    $('uni-grades').innerHTML = `
      <div class="card">
        <div class="section-title">เกรดเฉลี่ยสะสม (GPA)</div>
        <div class="uni-gpa-big"${g == null ? '' : ` data-count="${g}" data-cprefix="" data-cdec="2"`}>${g == null ? '—' : g.toFixed(2)}</div>
        <div class="uni-gpa-sub">${graded.length ? `คำนวณจาก ${graded.length} วิชาที่มีเกรดแล้ว (${graded.reduce((s, c) => s + c.credits, 0)} หน่วยกิต)` : 'ยังไม่มีเกรดให้คำนวณ'}</div>
      </div>
      <div class="card">
        <div class="section-title">รายวิชาที่มีเกรดแล้ว</div>
        ${graded.length ? graded.map(c => `<div class="uni-row" data-id="${esc(c.id)}">
            ${statusDot(c)}
            <span class="uni-row-body">
              <span class="uni-row-title">${esc(c.code)}</span>
              <span class="uni-row-sub">${esc(CAT_LABEL[c.category] || c.category)}${c.term ? ' · ' + esc(c.term) : ''}</span>
            </span>
            <span class="uni-grade-badge">${esc(c.grade)}</span>
          </div>`).join('') : '<div class="empty">ยังไม่มีวิชาที่สอบผ่าน/ตกและมีเกรด</div>'}
      </div>`;
    if (window.UIFX) window.UIFX.countAll($('uni-grades'));
  }

  // ── detail modal ──
  function openCourse(id) {
    const c = courseById(id); if (!c) return;
    const label = c.code || '(ยังไม่เลือกวิชา)';
    $('uniMTitle').textContent = label;
    $('uniMSub').textContent = `${CAT_LABEL[c.category] || c.category} · ${c.credits} หน่วยกิต`;
    $('uniMBody').innerHTML = `
      ${statusChip(c)}
      ${c.grade ? `<div class="uni-price-block">
        <div><div class="uni-price-lab">เกรด</div><div class="uni-price-val">${esc(c.grade)}</div></div>
        ${c.term ? `<div><div class="uni-price-lab">เทอมที่เรียน</div><div class="uni-price-val muted">${esc(c.term)}</div></div>` : ''}
      </div>` : ''}
      ${c.note ? `<div class="modal-sec-title">โน้ตสรุปการเรียน</div><div class="uni-note">${esc(c.note)}</div>` : ''}
      ${!c.grade && !c.note ? '<div class="empty">ยังไม่มีข้อมูลเพิ่มเติม — บอก Jarvis เวลาสอบผ่าน/ตก หรืออยากเก็บโน้ตสรุปวิชานี้ไว้</div>' : ''}`;
    $('uniOverlay').classList.add('active');
  }
  function closeModal() {
    const o = $('uniOverlay'); o.classList.add('closing');
    setTimeout(() => o.classList.remove('active', 'closing'), 300);
  }

  // ── tabs ──
  function switchTab(tab) {
    activeTab = tab;
    root.querySelectorAll('.uni-tab').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
    root.querySelectorAll('.uni-pane').forEach(p => p.classList.toggle('active', p.id === 'uni-' + tab));
    if (tab === 'overview') renderOverview();
    else if (tab === 'courses') renderCourses();
    else renderGrades();
  }

  function wire() {
    root.querySelectorAll('.uni-tab').forEach(b => b.onclick = () => switchTab(b.dataset.tab));
    root.addEventListener('click', e => {
      if (e.target.closest('.uni-chipbtn')) return;
      const c = e.target.closest('[data-id]'); if (c) openCourse(c.dataset.id);
    });
    $('uniMClose').onclick = closeModal;
    $('uniOverlay').onclick = e => { if (e.target === $('uniOverlay')) closeModal(); };
  }

  function mount(el) {
    if (el.dataset.mounted) return;
    root = el; el.innerHTML = TEMPLATE; el.dataset.mounted = '1';
    wire(); switchTab('overview');
  }
  return { mount };
})();

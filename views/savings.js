// ===== Savings view module — glass jars that fill with coins by progress =====
window.SavingsView = (function () {
  const D = window.SAVINGS_DATA || { currency: '฿', jars: [] };
  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const fmt = n => D.currency + Number(n || 0).toLocaleString('en-US');

  // glass jar that fills with a pile of stacked coins, scaled to pct (0..1)
  function jarSVG(pct, i) {
    pct = Math.max(0, Math.min(1, pct));
    const top = 24, bot = 102, h = bot - top;
    const fillY = bot - h * pct;          // ระดับยอดกองเหรียญ
    const cid = 'jc' + i;
    const rowGap = 6;                     // ระยะห่างเหรียญแต่ละชั้น
    // jitter/สี deterministic ต่อโหล+ชั้น → ดูเป็นกองสุ่มแต่คงที่ทุก render
    const GOLD = ['#e0a93f', '#f0c463', '#ecbb53', '#e7b24a'];

    let coins = '';
    if (pct > 0.01) {
      let r = 0;
      for (let y = bot - 4; y > fillY + 1 && y > top + 1; y -= rowGap, r++) {
        const j = ((i * 7 + r * 13) % 5) - 2;   // เลื่อนซ้าย-ขวา ±2
        const cx = 48 + j;
        const col = GOLD[(i + r) % GOLD.length];
        // ตัวเหรียญ + ขอบล่างเข้มนิด + ไฮไลต์บนสว่าง = ดูเป็นแผ่นกลมหนา
        coins += `<ellipse cx="${cx}" cy="${y + 1}" rx="26" ry="4.4" fill="#b9842d"/>
          <ellipse cx="${cx}" cy="${y}" rx="26" ry="4.4" fill="${col}"/>
          <ellipse cx="${cx}" cy="${y - 1.1}" rx="22" ry="2.4" fill="#fbe6b0" opacity="0.55"/>`;
      }
      // เหรียญหลวมๆ ผิวบนสุดของกอง ให้ดูเป็นกองพูน
      coins += `<ellipse cx="40" cy="${fillY + 4}" rx="8" ry="3" fill="#f3cd83"/>
        <ellipse cx="57" cy="${fillY + 6}" rx="7" ry="2.7" fill="#e6b257"/>`;
    }

    return `<svg class="jar-svg" viewBox="0 0 96 112" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <clipPath id="${cid}"><rect x="19" y="23" width="58" height="80" rx="13"/></clipPath>
      </defs>
      <rect x="26" y="6" width="44" height="11" rx="4" fill="#efece6" stroke="#d8cfc2" stroke-width="2"/>
      <rect x="18" y="22" width="60" height="82" rx="14" fill="#ffffff" stroke="#d8cfc2" stroke-width="2"/>
      <g clip-path="url(#${cid})">${coins}</g>
      <rect x="18" y="22" width="60" height="82" rx="14" fill="none" stroke="#d8cfc2" stroke-width="2"/>
      <path d="M27 33 v58" stroke="rgba(255,255,255,0.65)" stroke-width="3" stroke-linecap="round"/>
    </svg>`;
  }

  function render(root) {
    const jars = D.jars || [];
    const totalSaved = jars.reduce((s, j) => s + (j.saved || 0), 0);
    const totalGoal = jars.reduce((s, j) => s + (j.goal || 0), 0);

    const cards = jars.map((j, i) => {
      const pct = j.goal > 0 ? j.saved / j.goal : 0;
      const pctR = Math.round(pct * 100);
      const done = j.goal > 0 && j.saved >= j.goal;
      const remain = Math.max(0, (j.goal || 0) - (j.saved || 0));
      return `<div class="jar-card">
        <div class="jar-badge ${done ? 'done' : 'togo'}">${done ? 'Done' : pctR + '%'}</div>
        <div class="jar-illu">${jarSVG(pct, i)}</div>
        <div class="jar-name">${esc(j.name)}</div>
        <div class="jar-amt"><b>${fmt(j.saved)}</b> <span>/ ${fmt(j.goal)}</span></div>
        <div class="jar-bar"><div class="jar-bar-fill" style="width:${Math.min(100, pctR)}%"></div></div>
        <div class="jar-foot">${done ? 'Goal reached' : fmt(remain) + ' to go'}</div>
      </div>`;
    }).join('');

    root.innerHTML = `<div class="container">
      <div class="sav-head">
        <div class="sav-total-lbl">Saved across all jars</div>
        <div class="sav-total"><b>${fmt(totalSaved)}</b> <span>/ ${fmt(totalGoal)}</span></div>
      </div>
      <div class="jar-grid">${cards || '<div class="empty">No jars yet</div>'}</div>
      <div class="sav-note">Add to a jar via Jarvis — e.g. "add 500 to PS5 jar"</div>
    </div>`;
  }

  function mount(el) {
    if (el.dataset.mounted) return;
    el.dataset.mounted = '1';
    render(el);
  }
  return { mount };
})();

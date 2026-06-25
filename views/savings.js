// ===== Savings view module — glass jars that fill with coins by progress =====
window.SavingsView = (function () {
  const D = window.SAVINGS_DATA || { currency: '฿', jars: [] };
  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const fmt = n => D.currency + Number(n || 0).toLocaleString('en-US');

  // glass jar that fills with a pile of real coin emoji, scaled to pct (0..1)
  function jarSVG(pct, i) {
    pct = Math.max(0, Math.min(1, pct));
    const top = 24, bot = 102, h = bot - top;
    const fillY = bot - h * pct;          // ระดับยอดกองเหรียญ
    const cid = 'jc' + i;

    let coins = '';
    if (pct > 0.01) {
      const rowH = 9.5;                   // เหรียญเหลื่อมซ้อนกันเป็นกอง (hex-pack)
      const even = [29, 43, 57, 71], odd = [36, 50, 64];
      let r = 0;
      for (let y = bot - 7; y > fillY - 2 && y > top + 2; y -= rowH, r++) {
        const xs = (r % 2 === 0) ? even : odd;
        xs.forEach((x, c) => {
          const jx = (((i * 5 + r * 7 + c * 11) % 3) - 1);   // ขยับเล็กน้อยให้เป็นธรรมชาติ
          coins += `<text x="${x + jx}" y="${y}" font-size="14.5" text-anchor="middle" dominant-baseline="central">🪙</text>`;
        });
      }
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

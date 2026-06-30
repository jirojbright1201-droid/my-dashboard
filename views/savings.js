// ===== Savings view module — glass jars that fill with coins by progress =====
window.SavingsView = (function () {
  const D = window.SAVINGS_DATA || { currency: '฿', jars: [] };
  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const fmt = n => D.currency + Number(n || 0).toLocaleString('en-US');
  const TH_M = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  // อีกกี่เดือนถึงเป้า + เดือนที่คาดถึง (จาก remain / monthly)
  function eta(remain, monthly) {
    if (!monthly || monthly <= 0 || remain <= 0) return '';
    const n = Math.ceil(remain / monthly);
    const t = new Date(); t.setMonth(t.getMonth() + n);
    return `~${n} mo left · ${TH_M[t.getMonth()]} ${t.getFullYear()}`;
  }

  // โหลแก้ว + ระดับ "น้ำทอง" เติมจากก้นตาม pct (0..1) — มี min sliver เวลามีเงินเพื่อให้เห็น progress แม้น้อย
  function jarSVG(pct, i) {
    pct = Math.max(0, Math.min(1, pct));
    const top = 24, bot = 102, h = bot - top;
    let fillY = bot - h * pct;
    if (pct > 0) fillY = Math.min(fillY, bot - 6);   // มีเงินปุ๊บ โชว์น้ำบางๆ ที่ก้นเสมอ (ขั้นต่ำ ~6px)
    const gid = 'jg' + i, cid = 'jc' + i;

    const liquid = pct > 0 ? `<g clip-path="url(#${cid})">
        <rect x="18" y="${fillY.toFixed(1)}" width="60" height="${(104 - fillY).toFixed(1)}" fill="url(#${gid})"/>
        <ellipse cx="48" cy="${fillY.toFixed(1)}" rx="29" ry="2.6" fill="#fff3cf" opacity="0.6"/>
        <rect x="18" y="${fillY.toFixed(1)}" width="60" height="2.4" fill="#fdeec2" opacity="0.55"/>
      </g>` : '';

    return `<svg class="jar-svg" viewBox="0 0 96 112" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#fbe7a6"/><stop offset="0.5" stop-color="#eebb55"/><stop offset="1" stop-color="#d99e3a"/>
        </linearGradient>
        <clipPath id="${cid}"><rect x="19" y="23" width="58" height="80" rx="13"/></clipPath>
      </defs>
      <rect x="26" y="6" width="44" height="11" rx="4" fill="#efece6" stroke="#d8cfc2" stroke-width="2"/>
      ${liquid}
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
        ${done ? '' : `<div class="jar-eta">${eta(remain, j.monthly) || 'Set a monthly amount to see ETA'}</div>`}
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
  return { mount, render };   // render() ใช้ฝังในซับแท็บโหลเงินของ Money hub
})();

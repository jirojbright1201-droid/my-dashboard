// ===== Savings view module — glass jars that fill with coins by progress =====
window.SavingsView = (function () {
  const D = window.SAVINGS_DATA || { currency: '฿', jars: [] };
  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const fmt = n => D.currency + Number(n || 0).toLocaleString('en-US');
  const TH_M = ['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'];
  // อีกกี่เดือนถึงเป้า + เดือนที่คาดถึง (จาก remain / monthly)
  function eta(remain, monthly) {
    if (!monthly || monthly <= 0 || remain <= 0) return '';
    const n = Math.ceil(remain / monthly);
    const t = new Date(); t.setMonth(t.getMonth() + n);
    return `อีก ~${n} เดือน · ${TH_M[t.getMonth()]} ${t.getFullYear()}`;
  }

  // โหลแก้ว + เหรียญทองวาด SVG แยกชิ้น (radial gradient + ขอบ + ตรา ฿ + ประกาย) กองตาม pct (0..1)
  function jarSVG(pct, i) {
    pct = Math.max(0, Math.min(1, pct));
    const top = 24, bot = 102, h = bot - top, fillY = bot - h * pct;
    const gid = 'jg' + i, cid = 'jc' + i;

    // หนึ่งเหรียญทองมีมิติที่ (cx,cy)
    const coin = (cx, cy) => `<g>
      <circle cx="${cx}" cy="${cy + 0.8}" r="8.4" fill="#9c6f25"/>
      <circle cx="${cx}" cy="${cy}" r="8.4" fill="url(#${gid})"/>
      <circle cx="${cx}" cy="${cy}" r="8.4" fill="none" stroke="#b07d20" stroke-width="1"/>
      <circle cx="${cx}" cy="${cy}" r="5.6" fill="none" stroke="#c8902c" stroke-width="0.8"/>
      <text x="${cx}" y="${cy + 0.3}" font-size="7" font-weight="800" text-anchor="middle" dominant-baseline="central" fill="#a9772a" font-family="Georgia,serif">฿</text>
      <path d="M${cx - 4} ${cy - 3.4} a5.4 5.4 0 0 1 4 -1.6" fill="none" stroke="#fdeec2" stroke-width="1.4" stroke-linecap="round" opacity="0.85"/>
    </g>`;

    let coins = '', r = 0;
    if (pct > 0.005) {
      const E = [31, 46, 61], O = [38.5, 53.5];   // hex-pack: แถวคู่ 3 / แถวคี่ 2 เหรียญ
      for (let y = bot - 8; y > fillY - 2 && y > top + 2; y -= 9, r++) {
        (r % 2 === 0 ? E : O).forEach(x => coins += coin(x, y));
      }
    }

    return `<svg class="jar-svg" viewBox="0 0 96 112" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="${gid}" cx="0.38" cy="0.32" r="0.8">
          <stop offset="0" stop-color="#fbe7a6"/><stop offset="0.55" stop-color="#eebb55"/><stop offset="1" stop-color="#d99e3a"/>
        </radialGradient>
        <clipPath id="${cid}"><rect x="19" y="23" width="58" height="80" rx="13"/></clipPath>
      </defs>
      <rect x="26" y="6" width="44" height="11" rx="4" fill="#efece6" stroke="#d8cfc2" stroke-width="2"/>
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
        <div class="jar-foot">${done ? 'ครบเป้าแล้ว' : 'เหลือ ' + fmt(remain)}</div>
        ${done ? '' : `<div class="jar-eta">${eta(remain, j.monthly) || 'ตั้งยอดเก็บต่อเดือนเพื่อดูว่าอีกกี่เดือนถึง'}</div>`}
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

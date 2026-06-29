// ===== shared per-app bootstrap (1 view = 1 PWA) =====
// แต่ละแอปตั้ง window.APP_VIEW ก่อนโหลดไฟล์นี้ → boot จะ mount view เดียว + UIFX + install + SW
(function () {
  // ── UIFX: ตัวเลขวิ่งนับขึ้น (count-up) — money/investment เรียก window.UIFX.countAll ──
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function countUp(el) {
    const to = parseFloat(el.dataset.count);
    if (!isFinite(to) || reduceMotion) return;
    const final = el.textContent;
    const prefix = el.dataset.cprefix || '', dec = parseInt(el.dataset.cdec || '0', 10);
    const dur = 720, t0 = performance.now(), ease = t => 1 - Math.pow(1 - t, 3);
    function frame(now) {
      const t = Math.min(1, (now - t0) / dur);
      if (t >= 1) { el.textContent = final; return; }
      el.textContent = prefix + (to * ease(t)).toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  window.UIFX = { countAll(scope) { (scope || document).querySelectorAll('[data-count]').forEach(countUp); } };

  // ── mount view เดียวของแอปนี้ ──
  const MAP = { planner: 'PlannerView', money: 'MoneyView', investment: 'InvestmentView' };
  const view = window[MAP[window.APP_VIEW]];
  const root = document.getElementById('view-root');
  if (view && root) view.mount(root);

  // ── branded splash → fade out เมื่อ view โหลดเสร็จ (กันหน้าโล่ง/native splash จืดๆ) ──
  const splash = document.getElementById('splash');
  if (splash) {
    setTimeout(() => {
      splash.classList.add('hide');
      setTimeout(() => splash.remove(), 460);
    }, 420);
  }

  // ── install prompt (Android/Chrome) ──
  const bar = document.getElementById('installBar');
  if (bar) {
    let deferred = null;
    const standalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault(); deferred = e;
      if (!standalone && sessionStorage.getItem('hideInstall') !== '1') bar.classList.add('show');
    });
    const btn = document.getElementById('installBtn'), x = document.getElementById('installX');
    if (btn) btn.addEventListener('click', async () => {
      if (!deferred) return;
      bar.classList.remove('show'); deferred.prompt();
      try { await deferred.userChoice; } catch (_) {}
      deferred = null;
    });
    if (x) x.addEventListener('click', () => { bar.classList.remove('show'); sessionStorage.setItem('hideInstall', '1'); });
    window.addEventListener('appinstalled', () => bar.classList.remove('show'));
  }

  // ── service worker ──
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js');
})();

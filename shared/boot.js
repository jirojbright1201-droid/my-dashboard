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
  const MAP = { planner: 'PlannerView', money: 'MoneyView', investment: 'InvestmentView', books: 'BooksView', articles: 'ArticlesView', english: 'EnglishView' };
  const view = window[MAP[window.APP_VIEW]];
  const root = document.getElementById('view-root');
  if (view && root) view.mount(root);

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
  // กันปัญหา "PWA ไม่อัพเดท" — SW เดิม skipWaiting/clients.claim ตอน activate อยู่แล้ว
  // แต่ browser เช็ค SW ใหม่แค่ตอน navigate เท่านั้น ถ้า user แค่สลับแอปกลับมา (ไม่ได้ reload จริง)
  // จะไม่เช็คเลย เพจที่ค้างอยู่ในหน่วยความจำก็ไม่รู้ว่ามีของใหม่ — เลยต้องบังคับเช็ค + reload เอง
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then(reg => {
      if (!reg) return;
      // กลับมาเปิดแอป (จากพื้นหลัง/สลับแอป) → เช็คอัปเดตทันที ไม่ต้องรอ browser เช็คเอง
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') reg.update().catch(() => {});
      });
    });
    // SW ใหม่ยึด control แล้ว → reload ครั้งเดียวให้ได้ HTML/JS/data ชุดใหม่จริง (กันลูปด้วย flag)
    let reloaded = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (reloaded) return;
      reloaded = true;
      window.location.reload();
    });
  }
})();

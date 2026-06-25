// ===== PWA shell — bottom-nav router + swipe + install prompt =====
(function () {
  const ORDER = ['home', 'planner', 'money', 'investment'];
  const TITLES = { home: 'Home', planner: 'Planner', money: 'Money', investment: 'Investment' };
  let current = 'home';
  const haptic = () => { try { if (navigator.vibrate) navigator.vibrate(8); } catch (_) {} };

  function showView(name) {
    if (!TITLES[name]) return;
    current = name;
    document.querySelectorAll('.view').forEach(v => v.classList.toggle('active', v.id === 'view-' + name));
    document.querySelectorAll('.bn').forEach(b => b.classList.toggle('active', b.dataset.view === name));
    document.getElementById('appTitle').textContent = TITLES[name] || '';
    document.querySelector('.scroll').scrollTop = 0;
    // lazy-mount dashboard module on first open
    if (name === 'home' && window.HomeView) window.HomeView.mount(document.getElementById('view-home'));
    if (name === 'planner' && window.PlannerView) window.PlannerView.mount(document.getElementById('view-planner'));
    if (name === 'money' && window.MoneyView) window.MoneyView.mount(document.getElementById('view-money'));
    if (name === 'investment' && window.InvestmentView) window.InvestmentView.mount(document.getElementById('view-investment'));
  }
  window.Shell = { showView };

  document.querySelectorAll('.bn').forEach(b => b.addEventListener('click', () => { haptic(); showView(b.dataset.view); }));

  // ── swipe ซ้าย/ขวา เปลี่ยนแท็บหลัก ──
  const scroller = document.querySelector('.scroll');
  let sx = 0, sy = 0, tracking = false;
  scroller.addEventListener('touchstart', e => {
    if (document.querySelector('.overlay.active')) { tracking = false; return; }
    sx = e.touches[0].clientX; sy = e.touches[0].clientY; tracking = true;
  }, { passive: true });
  scroller.addEventListener('touchend', e => {
    if (!tracking) return; tracking = false;
    const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
    if (Math.abs(dx) < 70 || Math.abs(dx) < Math.abs(dy) * 1.6) return; // ต้องเป็นแนวนอนชัดเจน
    const i = ORDER.indexOf(current), next = dx < 0 ? i + 1 : i - 1;
    if (next >= 0 && next < ORDER.length) { haptic(); showView(ORDER[next]); }
  }, { passive: true });

  // ── install prompt (Android/Chrome) ──
  let deferred = null;
  const bar = document.getElementById('installBar');
  const standalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault(); deferred = e;
    if (!standalone && sessionStorage.getItem('hideInstall') !== '1') bar.classList.add('show');
  });
  document.getElementById('installBtn').addEventListener('click', async () => {
    if (!deferred) return;
    bar.classList.remove('show'); deferred.prompt();
    try { await deferred.userChoice; } catch (_) {}
    deferred = null;
  });
  document.getElementById('installX').addEventListener('click', () => {
    bar.classList.remove('show'); sessionStorage.setItem('hideInstall', '1');
  });
  window.addEventListener('appinstalled', () => bar.classList.remove('show'));

  showView('home');
})();

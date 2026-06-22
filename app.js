// ===== PWA shell — bottom-nav router. Each dashboard is a view module. =====
(function () {
  const TITLES = { planner: 'Planner', money: 'Money', investment: 'Investment' };

  function showView(name) {
    document.querySelectorAll('.view').forEach(v => v.classList.toggle('active', v.id === 'view-' + name));
    document.querySelectorAll('.bn').forEach(b => b.classList.toggle('active', b.dataset.view === name));
    document.getElementById('appTitle').textContent = TITLES[name] || '';
    document.querySelector('.scroll').scrollTop = 0;
    // lazy-mount dashboard module on first open
    if (name === 'planner' && window.PlannerView) window.PlannerView.mount(document.getElementById('view-planner'));
  }

  document.querySelectorAll('.bn').forEach(b => b.addEventListener('click', () => showView(b.dataset.view)));
  showView('planner');
})();

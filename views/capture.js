// ===== Quick capture — จดเร็วในแอป เก็บ localStorage แล้วคัดลอกส่ง Jarvis ไปลงระบบ =====
// static PWA ไม่มี backend → จดไว้ในเครื่อง, กดคัดลอกส่งให้ Jarvis process + push ทีหลัง
(function () {
  const KEY = 'jarvis_inbox';
  const ALL_TYPES = [
    { k: 'expense', l: 'Expense', amt: true },
    { k: 'income', l: 'Income', amt: true },
    { k: 'event', l: 'Event' },
    { k: 'habit', l: 'Habit' },
    { k: 'note', l: 'Note' },
    { k: 'book', l: 'Book' },
    { k: 'vocab', l: 'Vocab' }
  ];
  const TLAB = Object.fromEntries(ALL_TYPES.map(t => [t.k, t.l]));
  // จดเร็วแยกตามแอป — โชว์เฉพาะประเภทของ dashboard นั้น ไม่ขึ้นข้ามโดเมน
  const SCOPE = { money: ['expense', 'income'], planner: ['event', 'habit'], investment: ['note'], books: ['book'], english: ['vocab'] };
  const allow = SCOPE[window.APP_VIEW] || ALL_TYPES.map(t => t.k);
  const TYPES = ALL_TYPES.filter(t => allow.includes(t.k));
  const inScope = it => allow.includes(it.type); // กล่องแต่ละแอปเห็นเฉพาะของตัวเอง
  let sel = (TYPES[0] && TYPES[0].k) || 'note';
  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (_) { return []; } };
  const save = items => { try { localStorage.setItem(KEY, JSON.stringify(items)); } catch (_) {} };

  const $ = id => document.getElementById(id);
  const haptic = () => { try { if (navigator.vibrate) navigator.vibrate(8); } catch (_) {} };

  function fmtItem(it) {
    const amt = it.amount ? ` – ${Number(it.amount).toLocaleString()} THB` : '';
    return `[${TLAB[it.type] || it.type}] ${it.text}${amt}`;
  }

  function updateBadge() {
    const n = load().filter(inScope).length, b = $('fabBadge');
    if (!b) return;
    b.textContent = n; b.style.display = n ? 'flex' : 'none';
  }

  function renderList() {
    const items = load().filter(inScope);
    $('capListHead').textContent = items.length ? `${items.length} in inbox` : '';
    $('capList').innerHTML = items.length
      ? items.map(it => `<div class="cap-item">
          <span class="cap-item-t">${TLAB[it.type] || it.type}</span>
          <span class="cap-item-x">${esc(it.text)}${it.amount ? ` · ${Number(it.amount).toLocaleString()}฿` : ''}</span>
          <button class="cap-del" data-id="${it.id}" aria-label="Delete">&#10005;</button></div>`).join('')
      : '<div class="cap-empty">Inbox is empty</div>';
    $('capActions').innerHTML = items.length
      ? `<button class="cap-copy" id="capCopy">Copy for Jarvis</button><button class="cap-clear" id="capClear">Clear</button>`
      : '';
    if (items.length) {
      $('capCopy').onclick = copyAll;
      $('capClear').onclick = () => { if (confirm('Delete all items in inbox?')) { save(load().filter(it => !inScope(it))); renderList(); updateBadge(); } };
    }
    updateBadge();
  }

  function renderTypes() {
    $('capTypes').innerHTML = TYPES.map(t => `<button class="cap-type${t.k === sel ? ' on' : ''}" data-k="${t.k}">${t.l}</button>`).join('');
    $('capTypes').querySelectorAll('.cap-type').forEach(b => b.onclick = () => {
      sel = b.dataset.k; renderTypes();
      $('capAmount').style.display = (TYPES.find(t => t.k === sel) || {}).amt ? '' : 'none';
    });
    $('capAmount').style.display = (TYPES.find(t => t.k === sel) || {}).amt ? '' : 'none';
  }

  function add() {
    const text = $('capText').value.trim();
    if (!text) { $('capText').focus(); return; }
    const amount = $('capAmount').value.trim().replace(/[^\d.]/g, '');
    const items = load();
    items.unshift({ id: Date.now().toString(36), ts: new Date().toISOString().slice(0, 10), type: sel, text, amount: amount || '' });
    save(items);
    $('capText').value = ''; $('capAmount').value = '';
    haptic(); renderList(); $('capText').focus();
  }

  function copyAll() {
    const items = load().filter(inScope);
    if (!items.length) return;
    const txt = 'Jarvis inbox:\n' + items.map(fmtItem).join('\n');
    const done = () => { const b = $('capCopy'); if (b) { b.textContent = 'Copied ✓'; setTimeout(() => { if ($('capCopy')) $('capCopy').textContent = 'Copy for Jarvis'; }, 1500); } };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done).catch(() => fallbackCopy(txt, done));
    else fallbackCopy(txt, done);
  }
  function fallbackCopy(txt, done) {
    const ta = document.createElement('textarea'); ta.value = txt; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); done(); } catch (_) {}
    document.body.removeChild(ta);
  }

  function open() { renderTypes(); renderList(); $('capOverlay').classList.add('active'); setTimeout(() => $('capText').focus(), 60); }
  function close() { const o = $('capOverlay'); o.classList.add('closing'); setTimeout(() => o.classList.remove('active', 'closing'), 300); }

  function init() {
    if (!$('fab')) return;
    $('fab').onclick = () => { haptic(); open(); };
    $('capClose').onclick = close;
    $('capOverlay').onclick = e => { if (e.target === $('capOverlay')) close(); };
    $('capAdd').onclick = add;
    $('capText').addEventListener('keydown', e => { if (e.key === 'Enter') add(); });
    $('capList').addEventListener('click', e => {
      const d = e.target.closest('.cap-del'); if (!d) return;
      save(load().filter(it => it.id !== d.dataset.id)); renderList();
    });
    updateBadge();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();

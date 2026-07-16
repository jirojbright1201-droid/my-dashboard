// ===== Article Tracker hub — บทความที่ sync จาก Obsidian (data: data/articles.data.js) =====
window.ArticlesView = (function () {
  const DATA = window.ARTICLES_DATA || { articles: [] };
  const ARTICLES = DATA.articles || [];

  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const fmtDate = d => { if (!d) return ''; const [y, m, day] = d.split('-'); return `${day}/${m}/${y.slice(2)}`; };
  const S = p => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const domain = url => { try { return new URL(url).hostname.replace(/^www\./, ''); } catch (_) { return ''; } };

  // ── state ──
  let root, activeTab = 'overview', libFilter = 'all';
  const $ = id => root.querySelector('#' + id);
  const articleById = id => ARTICLES.find(a => a.id === id);

  const TEMPLATE = `
  <div class="container art">
    <div id="art-overview" class="art-pane active"></div>
    <div id="art-library" class="art-pane"></div>
    <nav class="tabbar">
      <button class="art-tab tab-item active" data-tab="overview">${S('<path d="M3 12l9-8 9 8"/><path d="M5 10v10h14V10"/>')}<span>Overview</span></button>
      <button class="art-tab tab-item" data-tab="library">${S('<path d="M4 6h16M4 12h16M4 18h10"/>')}<span>Library</span></button>
    </nav>
  </div>

  <div class="overlay" id="artOverlay">
    <div class="modal">
      <div class="sheet-handle"></div>
      <div class="modal-head">
        <div><div class="modal-title" id="artMTitle"></div><div class="modal-sub" id="artMSub"></div></div>
        <button class="modal-close" id="artMClose"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
      </div>
      <div class="modal-body" id="artMBody"></div>
    </div>
  </div>

  <div class="overlay" id="artReaderOverlay">
    <div class="modal art-reader-modal">
      <div class="sheet-handle"></div>
      <div class="modal-head">
        <div><div class="modal-title" id="artRTitle"></div><div class="modal-sub" id="artRSub"></div></div>
        <button class="modal-close" id="artRClose"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
      </div>
      <div class="modal-body art-reader-body" id="artRBody"></div>
    </div>
  </div>`;

  // ── markdown-lite renderer for in-app reading (## headers, **bold**, [text](url), ![](img), "- " lists) ──
  function escInline(s) {
    let out = esc(s);
    out = out.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    out = out.replace(/\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    return out;
  }
  function renderContent(md) {
    if (!md) return '';
    return md.split(/\n{2,}/).map(block => {
      block = block.trim(); if (!block) return '';
      const h = block.match(/^(#{2,3})\s+(.*)$/);
      if (h) return `<h4 class="art-reader-h">${escInline(h[2])}</h4>`;
      const img = block.match(/^!\[.*?\]\((.*?)\)$/);
      if (img) return `<img class="art-reader-img" src="${esc(img[1])}" alt="">`;
      const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
      if (lines.length > 1 && lines.every(l => /^-\s+/.test(l))) {
        return `<ul class="art-reader-list">${lines.map(l => `<li>${escInline(l.replace(/^-\s+/, ''))}</li>`).join('')}</ul>`;
      }
      return `<p>${escInline(lines.join(' '))}</p>`;
    }).join('');
  }

  function rowItem(a) {
    return `<div class="art-row" data-id="${esc(a.id)}">
      <div class="art-row-body">
        <div class="art-row-title">${esc(a.title)}</div>
        <div class="art-row-sub"><span class="art-domain">${esc(domain(a.source))}</span>${a.author ? ' · ' + esc(a.author) : ''} · ${fmtDate(a.created)}</div>
      </div>
      <svg class="art-row-arrow" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>
    </div>`;
  }

  // ── overview ──
  function renderOverview() {
    const ym = new Date().toISOString().slice(0, 7);
    const total = ARTICLES.length;
    const thisMonth = ARTICLES.filter(a => (a.created || '').slice(0, 7) === ym).length;
    const sources = new Set(ARTICLES.map(a => domain(a.source)).filter(Boolean)).size;
    const tags = new Set(ARTICLES.flatMap(a => a.tags || [])).size;
    const recent = [...ARTICLES].sort((a, b) => (b.created || '').localeCompare(a.created || '')).slice(0, 5);

    $('art-overview').innerHTML = `
      <div class="hero art-hero">
        <div class="hero-eyebrow">Articles Saved</div>
        <div class="hero-figure" data-count="${total}" data-cdec="0">${total}</div>
        <div class="hero-cap">Synced from Obsidian</div>
        <div class="hero-split">
          <div class="hero-cell"><div class="hero-cell-lab">This Month</div><div class="hero-cell-val">${thisMonth}</div></div>
          <div class="hero-cell"><div class="hero-cell-lab">Sources</div><div class="hero-cell-val">${sources}</div></div>
          <div class="hero-cell"><div class="hero-cell-lab">Tags</div><div class="hero-cell-val">${tags}</div></div>
        </div>
      </div>

      <div class="card art-list">
        <div class="section-title">Recently Added</div>
        ${recent.map(rowItem).join('') || '<div class="empty">No articles yet</div>'}
      </div>`;
    if (window.UIFX) window.UIFX.countAll($('art-overview'));
  }

  // ── library ──
  function renderLibrary() {
    const allTags = [...new Set(ARTICLES.flatMap(a => a.tags || []))].sort();
    const list = libFilter === 'all' ? ARTICLES : ARTICLES.filter(a => (a.tags || []).includes(libFilter));
    const sorted = [...list].sort((a, b) => (b.created || '').localeCompare(a.created || ''));
    const chips = ['all', ...allTags].map(t =>
      `<button class="art-chipbtn${libFilter === t ? ' on' : ''}" data-filt="${esc(t)}">${t === 'all' ? 'All' : esc(t)}</button>`).join('');

    $('art-library').innerHTML = `
      <div class="art-filters">${chips}</div>
      <div class="section-title">All Articles (${sorted.length})</div>
      <div class="card art-list">${sorted.map(rowItem).join('') || '<div class="empty">No articles yet</div>'}</div>`;
    root.querySelectorAll('[data-filt]').forEach(b => b.onclick = () => { libFilter = b.dataset.filt; renderLibrary(); });
  }

  // ── detail modal ──
  function openArticle(id) {
    const a = articleById(id); if (!a) return;
    $('artMTitle').textContent = a.title;
    $('artMSub').textContent = [domain(a.source), a.author].filter(Boolean).join(' · ');
    $('artMBody').innerHTML = `
      <div class="art-msub">${[a.published ? 'Published ' + fmtDate(a.published) : '', 'Saved ' + fmtDate(a.created)].filter(Boolean).join(' · ')}</div>
      ${(a.insight && a.insight.length) ? `<div class="modal-sec-title">Insight</div><ul class="art-insight">${a.insight.map(pt => `<li>${esc(pt)}</li>`).join('')}</ul>` : (a.description ? `<div class="modal-sec-title">Description</div><div class="art-desc">${esc(a.description)}</div>` : '')}
      ${(a.tags && a.tags.length) ? `<div class="modal-sec-title">Tags</div><div class="art-tags">${a.tags.map(t => `<span class="chip art-chip-tag">${esc(t)}</span>`).join('')}</div>` : ''}
      <div class="art-actions">
        <button class="art-read-btn" id="artReadBtn">Read Article</button>
        <a class="art-source-link" href="${esc(a.source)}" target="_blank" rel="noopener">View original source &#8599;</a>
      </div>`;
    $('artReadBtn').onclick = () => openReader(id);
    $('artOverlay').classList.add('active');
  }
  function closeModal() {
    const o = $('artOverlay'); o.classList.add('closing');
    setTimeout(() => o.classList.remove('active', 'closing'), 300);
  }

  // ── in-app reader ──
  function openReader(id) {
    const a = articleById(id); if (!a) return;
    $('artRTitle').textContent = a.title;
    $('artRSub').textContent = [domain(a.source), a.author].filter(Boolean).join(' · ');
    $('artRBody').innerHTML = renderContent(a.content) || '<div class="modal-empty">No content synced yet — use "View original source" instead</div>';
    closeModal();
    $('artReaderOverlay').classList.add('active');
  }
  function closeReader() {
    const o = $('artReaderOverlay'); o.classList.add('closing');
    setTimeout(() => o.classList.remove('active', 'closing'), 300);
  }

  // ── tabs ──
  function switchTab(tab) {
    activeTab = tab;
    root.querySelectorAll('.art-tab').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
    root.querySelectorAll('.art-pane').forEach(p => p.classList.toggle('active', p.id === 'art-' + tab));
    if (tab === 'overview') renderOverview();
    else if (tab === 'library') renderLibrary();
  }

  function wire() {
    root.querySelectorAll('.art-tab').forEach(b => b.onclick = () => switchTab(b.dataset.tab));
    root.addEventListener('click', e => {
      const c = e.target.closest('[data-id]'); if (c) openArticle(c.dataset.id);
    });
    $('artMClose').onclick = closeModal;
    $('artOverlay').onclick = e => { if (e.target === $('artOverlay')) closeModal(); };
    $('artRClose').onclick = closeReader;
    $('artReaderOverlay').onclick = e => { if (e.target === $('artReaderOverlay')) closeReader(); };
  }

  function mount(el) {
    if (el.dataset.mounted) return;
    root = el; el.innerHTML = TEMPLATE; el.dataset.mounted = '1';
    wire(); switchTab('overview');
  }
  return { mount };
})();

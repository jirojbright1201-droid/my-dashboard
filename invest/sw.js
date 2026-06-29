// Invest PWA service worker (scope: /invest/)
const CACHE = 'invest-v5';
const CORE = [
  './', './index.html', './manifest.webmanifest',
  '../app.css', '../shared/boot.js',
  '../Investment%20Tracker/data.js', '../views/investment.js', '../views/investment.css',
  '../views/capture.js', '../views/capture.css',
  '../icons/invest-192.png', '../icons/invest-512.png'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => Promise.allSettled(CORE.map(u => c.add(u)))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const isPage = req.mode === 'navigate' || req.destination === 'document';
  const isLocalCode = url.origin === self.location.origin && /\.(js|css)$/.test(url.pathname) && !url.pathname.endsWith('/sw.js');
  if (isPage || isLocalCode) {
    e.respondWith(fetch(req, { cache: 'no-cache' }).then(res => {
      const copy = res.clone(); caches.open(CACHE).then(c => { try { c.put(req, copy); } catch (_) {} }); return res;
    }).catch(() => caches.match(req).then(hit => hit || (isPage ? caches.match('./index.html') : undefined))));
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
    const copy = res.clone(); caches.open(CACHE).then(c => { try { c.put(req, copy); } catch (_) {} }); return res;
  })));
});

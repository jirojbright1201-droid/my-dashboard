// Dashboard PWA service worker
// Pages: network-first (always fresh when online, cached copy when offline)
// Static assets: cache-first with runtime caching
const CACHE = 'dash-v27';
const CORE = [
  './',
  './index.html',
  './app.css',
  './app.js',
  './views/home.js',
  './views/home.css',
  './data/planner.data.js',
  './views/planner.js',
  './views/planner.css',
  './data/savings.data.js',
  './views/savings.js',
  './views/savings.css',
  './data/money.data.js',
  './views/money.js',
  './views/money.css',
  './views/investment.js',
  './views/investment.css',
  './data/subscriptions.data.js',
  './views/capture.js',
  './views/capture.css',
  './Investment%20Tracker/investment.html',
  './Investment%20Tracker/data.js',
  './Investment%20Tracker/app.js',
  './Investment%20Tracker/style.css',
  './Investment%20Tracker/assets/logos/poet.png',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => Promise.allSettled(CORE.map(u => c.add(u))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  // Pages (HTML / navigations) → network-first so an online open always shows latest
  const isPage = req.mode === 'navigate' || req.destination === 'document';
  // Our own code/data (.js/.css same-origin, ไม่นับ sw.js) → network-first ด้วย
  // กัน data.js/app.js ค้าง cache หลัง Felix อัปแล้ว push (สดเมื่อออนไลน์ ใช้ cache เฉพาะออฟไลน์)
  const url = new URL(req.url);
  const isLocalCode = url.origin === self.location.origin
    && /\.(js|css)$/.test(url.pathname)
    && !url.pathname.endsWith('/sw.js');
  if (isPage || isLocalCode) {
    // no-cache = revalidate กับ server ทุกครั้ง (ETag) → ได้ไฟล์สดเมื่อมีการแก้ ไม่ติด HTTP cache 10 นาทีของ Pages
    e.respondWith(
      fetch(req, { cache: 'no-cache' })
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(c => { try { c.put(req, copy); } catch (_) {} });
          return res;
        })
        .catch(() => caches.match(req).then(hit => hit || (isPage ? caches.match('./index.html') : undefined)))
    );
    return;
  }

  // Other assets (icons, fonts, chart.js, ...) → cache-first for speed/offline
  e.respondWith(
    caches.match(req).then(hit => {
      if (hit) return hit;
      return fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => { try { c.put(req, copy); } catch (_) {} });
        return res;
      });
    })
  );
});

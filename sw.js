// Retired monolith SW → self-destruct.
// แอปแยกเป็น /planner/ /money/ /books/ /articles/ /english/ แล้ว (แต่ละตัวมี SW ของตัวเอง)
// ตัวนี้เคยคุม scope ราก ขอ unregister + ล้าง cache เก่าให้ผู้ใช้ที่เคยติดตั้ง shell รวม
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    try {
      const keys = await caches.keys();
      await Promise.all(keys.filter(k => k.startsWith('dash-')).map(k => caches.delete(k)));
    } catch (_) {}
    try { await self.registration.unregister(); } catch (_) {}
    const cs = await self.clients.matchAll(); cs.forEach(c => { try { c.navigate(c.url); } catch (_) {} });
  })());
});

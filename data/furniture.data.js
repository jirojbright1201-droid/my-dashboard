// ===== Furniture & Decor checklist — ของที่ต้องซื้อเข้าห้องเช่า (Jarvis แก้ไฟล์นี้เท่านั้น) =====
// บริบท: Bright เช่าห้องอยู่ และเป็น "ห้องเปล่า" (มีแค่ผนัง-พื้น-ห้องน้ำ + แอร์ ไม่มีเครื่องทำน้ำอุ่น)
// หลักเลือกของ: ถอดประกอบ/ขนย้ายได้ตอนย้ายออก, เลี่ยงของที่ต้องเจาะผนัง, ไม่เอาชิ้นใหญ่เกินห้อง
// ลิสต์นี้ผ่านการคัดทีละรายการกับ Bright แล้ว 27 ก.ค. 2026 (ไม่ใช่ลิสต์ที่ Jarvis เดาให้)
//   - นอนบนท็อปเปอร์วางพื้น ไม่มีเตียง/ที่นอน/ฐานเตียง (ตัดออกแล้ว)
//   - ไม่มีโต๊ะทำงาน/เก้าอี้ทำงาน/โต๊ะกินข้าว/โซฟา (ตัดออกแล้ว)
//   - ไม่มีพัดลม (ห้องมีแอร์), ไม่มีไฟเส้น LED, ไม่มีนาฬิกาแขวน, ต้นไม้ใช้แบบปลอม
//   - ไม่มีเครื่องทำน้ำอุ่น + ไม่มีตู้เสื้อผ้า (Bright ตัดออกเอง 27 ก.ค. 2026 หลังคัดลิสต์รอบแรก)
// schema: flat list ไม่ key ด้วยเดือน (เหมือน books/articles)
//   budget   : งบรวมที่ตั้งไว้ (0 = ยังไม่ตั้ง)
//   items[]  : { id, name, category:'furniture'|'decor'|'essentials',
//                priority:'must'|'nice'|'later', price (ราคาประมาณการ),
//                paid (ราคาจ่ายจริง — ใส่ตอนซื้อแล้ว), status:'todo'|'bought',
//                shop, url, note, dateAdded, dateBought }
window.FURNITURE_DATA = {
  budget: 0,
  currency: 'THB',
  items: [
    // ── เฟอร์นิเจอร์ ──
    { id: 'fn0001', name: 'ท็อปเปอร์ 5 ฟุต', category: 'furniture', priority: 'must', price: 600, paid: 600, status: 'bought', shop: 'TikTok Shop', url: 'https://vt.tiktok.com/ZS9rndw1D67FS-cnTQN/', note: 'ใช้อยู่แล้ว วางกับพื้น ไม่ซื้อเตียง/ฐานเตียง', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0003', name: 'ชั้นวางของเอนกประสงค์', category: 'furniture', priority: 'nice', price: 1200, paid: 0, status: 'todo', shop: '', url: '', note: 'ตั้งพื้น ไม่ต้องเจาะผนัง', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0004', name: 'เก้าอี้นั่งเล่น / พัฟ', category: 'furniture', priority: 'nice', price: 1500, paid: 0, status: 'todo', shop: '', url: '', note: 'ที่นั่งอื่นนอกจากพื้น — แทนโซฟาที่กินพื้นที่และขนย้ายลำบาก', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0005', name: 'โต๊ะข้างเตียง', category: 'furniture', priority: 'nice', price: 700, paid: 0, status: 'todo', shop: '', url: '', note: 'นอนกับพื้น เลือกตัวเตี้ยจะได้ระดับพอดี', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0006', name: 'ชั้นวางรองเท้า', category: 'furniture', priority: 'nice', price: 600, paid: 0, status: 'todo', shop: '', url: '', note: '', dateAdded: '2026-07-27', dateBought: '' },

    // ── ของตกแต่ง ──
    { id: 'fn0007', name: 'ผ้าม่านสำเร็จรูป + ราวแบบไม่เจาะ', category: 'decor', priority: 'must', price: 1200, paid: 0, status: 'todo', shop: '', url: '', note: 'วัดหน้าต่างก่อนสั่ง ใช้ราวสปริง/ขอเกี่ยวแบบไม่เจาะผนัง เจ้าของห้องไม่ว่า', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0008', name: 'โคมไฟหัวเตียง', category: 'decor', priority: 'must', price: 500, paid: 0, status: 'todo', shop: '', url: '', note: 'ไฟห้องเช่ามักขาวจ้าดวงเดียว มีไฟวอร์มช่วยได้เยอะ', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0009', name: 'พรมผืนเล็ก', category: 'decor', priority: 'nice', price: 900, paid: 0, status: 'todo', shop: '', url: '', note: 'นอนกับพื้นอยู่แล้ว มีพรมช่วยทั้งเรื่องสัมผัสและกลบพื้นเดิมของห้อง', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0010', name: 'กระจกเต็มตัวแบบพิงผนัง', category: 'decor', priority: 'nice', price: 900, paid: 0, status: 'todo', shop: '', url: '', note: 'แบบพิง ไม่ต้องยึดผนัง ช่วยให้ห้องดูกว้างขึ้น', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0011', name: 'โคมไฟตั้งพื้น', category: 'decor', priority: 'nice', price: 1200, paid: 0, status: 'todo', shop: '', url: '', note: '', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0012', name: 'ต้นไม้ปลอม 2-3 ต้น', category: 'decor', priority: 'nice', price: 600, paid: 0, status: 'todo', shop: '', url: '', note: 'ไม่ต้องรดน้ำ ไม่มีแมลง — เลือกแบบใบด้าน ไม่เงาเกิน จะดูใกล้เคียงของจริง', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0013', name: 'โปสเตอร์ / กรอบรูป + เทปไม่ทิ้งรอย', category: 'decor', priority: 'later', price: 600, paid: 0, status: 'todo', shop: '', url: '', note: 'ใช้เทปกาวสองหน้าแบบลอกออกได้ ห้ามตอกตะปูผนังห้องเช่า', dateAdded: '2026-07-27', dateBought: '' },

    // ── ของใช้จำเป็น ──
    { id: 'fn0015', name: 'ชุดเครื่องนอน (ผ้าปู/หมอน/ปลอก)', category: 'essentials', priority: 'must', price: 1200, paid: 0, status: 'todo', shop: '', url: '', note: 'ผ้าปูต้องเป็นขนาด 5 ฟุตให้พอดีท็อปเปอร์ ซื้อสำรองอีกชุดไว้สลับซัก', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0016', name: 'ผ้าห่ม', category: 'essentials', priority: 'must', price: 700, paid: 0, status: 'todo', shop: '', url: '', note: '', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0017', name: 'ราวตากผ้าแบบพับได้', category: 'essentials', priority: 'must', price: 600, paid: 0, status: 'todo', shop: '', url: '', note: 'พับเก็บได้ ใช้ในห้อง/ระเบียงเล็ก', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0018', name: 'ถังขยะ + กล่องเก็บของ', category: 'essentials', priority: 'must', price: 600, paid: 0, status: 'todo', shop: '', url: '', note: 'ไม่มีใต้เตียงให้เก็บของ เลือกกล่องแบบวางซ้อนหรือสอดใต้ชั้นแทน', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0019', name: 'ชุดทำความสะอาด (ไม้กวาด/ไม้ถู/ที่โกยผง)', category: 'essentials', priority: 'must', price: 500, paid: 0, status: 'todo', shop: '', url: '', note: 'นอนกับพื้น พื้นสะอาดสำคัญกว่าปกติ', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0020', name: 'ตู้เย็นเล็ก', category: 'essentials', priority: 'nice', price: 4500, paid: 0, status: 'todo', shop: '', url: '', note: 'ขนาด 5-6 คิว พอสำหรับห้องเช่า — ชิ้นที่แพงสุดในลิสต์', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0021', name: 'กาต้มน้ำไฟฟ้า', category: 'essentials', priority: 'nice', price: 500, paid: 0, status: 'todo', shop: '', url: '', note: '', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0022', name: 'ที่แขวน/ชั้นวางในห้องน้ำแบบไม่เจาะ', category: 'essentials', priority: 'nice', price: 400, paid: 0, status: 'todo', shop: '', url: '', note: 'แบบสุญญากาศหรือกาวติด', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0023', name: 'ไมโครเวฟ', category: 'essentials', priority: 'later', price: 2500, paid: 0, status: 'todo', shop: '', url: '', note: 'เช็คกฎหอก่อน บางที่ห้ามเครื่องใช้ไฟฟ้ากินไฟสูง', dateAdded: '2026-07-27', dateBought: '' }
  ]
};
window.FURNITURE_UPDATED = '2026-07-27';

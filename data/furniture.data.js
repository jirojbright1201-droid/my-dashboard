// ===== Furniture & Decor checklist — ของที่ต้องซื้อเข้าบ้าน (Jarvis แก้ไฟล์นี้เท่านั้น) =====
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
    { id: 'fn0001', name: 'เตียง + ฐานเตียง', category: 'furniture', priority: 'must', price: 6900, paid: 0, status: 'todo', shop: '', url: '', note: 'ขนาด 5 ฟุต', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0002', name: 'ที่นอน', category: 'furniture', priority: 'must', price: 8900, paid: 0, status: 'todo', shop: '', url: '', note: 'ลองนอนที่หน้าร้านก่อนซื้อ', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0003', name: 'ตู้เสื้อผ้า', category: 'furniture', priority: 'must', price: 5500, paid: 0, status: 'todo', shop: '', url: '', note: '', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0004', name: 'โซฟา 2-3 ที่นั่ง', category: 'furniture', priority: 'must', price: 9900, paid: 0, status: 'todo', shop: '', url: '', note: 'วัดความกว้างผนังก่อน', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0005', name: 'โต๊ะทำงาน', category: 'furniture', priority: 'must', price: 3200, paid: 0, status: 'todo', shop: '', url: '', note: '', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0006', name: 'เก้าอี้ทำงาน', category: 'furniture', priority: 'must', price: 4500, paid: 0, status: 'todo', shop: '', url: '', note: 'แบบรองรับหลัง นั่งนานได้', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0007', name: 'โต๊ะข้างเตียง', category: 'furniture', priority: 'nice', price: 1200, paid: 0, status: 'todo', shop: '', url: '', note: '', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0008', name: 'โต๊ะกลางโซฟา', category: 'furniture', priority: 'nice', price: 1800, paid: 0, status: 'todo', shop: '', url: '', note: '', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0009', name: 'ชั้นวางของ / ชั้นหนังสือ', category: 'furniture', priority: 'nice', price: 2400, paid: 0, status: 'todo', shop: '', url: '', note: '', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0010', name: 'ตู้รองเท้า', category: 'furniture', priority: 'nice', price: 1900, paid: 0, status: 'todo', shop: '', url: '', note: '', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0011', name: 'โต๊ะกินข้าว + เก้าอี้ 2 ตัว', category: 'furniture', priority: 'later', price: 6500, paid: 0, status: 'todo', shop: '', url: '', note: '', dateAdded: '2026-07-27', dateBought: '' },

    // ── ของตกแต่ง ──
    { id: 'fn0012', name: 'ผ้าม่าน + ราง', category: 'decor', priority: 'must', price: 3500, paid: 0, status: 'todo', shop: '', url: '', note: 'วัดขนาดหน้าต่างก่อนสั่ง', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0013', name: 'โคมไฟหัวเตียง', category: 'decor', priority: 'must', price: 800, paid: 0, status: 'todo', shop: '', url: '', note: '', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0014', name: 'กระจกเต็มตัว', category: 'decor', priority: 'nice', price: 1200, paid: 0, status: 'todo', shop: '', url: '', note: '', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0015', name: 'พรมห้องนั่งเล่น', category: 'decor', priority: 'nice', price: 2200, paid: 0, status: 'todo', shop: '', url: '', note: '', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0016', name: 'โคมไฟตั้งพื้น', category: 'decor', priority: 'nice', price: 1600, paid: 0, status: 'todo', shop: '', url: '', note: '', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0017', name: 'หมอนอิง + ผ้าคลุมโซฟา', category: 'decor', priority: 'nice', price: 1000, paid: 0, status: 'todo', shop: '', url: '', note: '', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0018', name: 'ต้นไม้ในกระถาง 2-3 ต้น', category: 'decor', priority: 'later', price: 1500, paid: 0, status: 'todo', shop: '', url: '', note: 'เลือกชนิดที่เลี้ยงง่าย ในร่มได้', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0019', name: 'ภาพ / กรอบรูปแต่งผนัง', category: 'decor', priority: 'later', price: 900, paid: 0, status: 'todo', shop: '', url: '', note: '', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0020', name: 'นาฬิกาแขวนผนัง', category: 'decor', priority: 'later', price: 600, paid: 0, status: 'todo', shop: '', url: '', note: '', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0021', name: 'ไฟเส้น LED ตกแต่ง', category: 'decor', priority: 'later', price: 700, paid: 0, status: 'todo', shop: '', url: '', note: '', dateAdded: '2026-07-27', dateBought: '' },

    // ── ของใช้จำเป็น ──
    { id: 'fn0022', name: 'ชุดเครื่องนอน (ผ้าปู/ปลอกหมอน)', category: 'essentials', priority: 'must', price: 1800, paid: 0, status: 'todo', shop: '', url: '', note: '', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0023', name: 'ราวตากผ้า', category: 'essentials', priority: 'must', price: 900, paid: 0, status: 'todo', shop: '', url: '', note: '', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0024', name: 'ถังขยะ + กล่องเก็บของ', category: 'essentials', priority: 'must', price: 700, paid: 0, status: 'todo', shop: '', url: '', note: '', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0025', name: 'เครื่องดูดฝุ่นไร้สาย', category: 'essentials', priority: 'nice', price: 3500, paid: 0, status: 'todo', shop: '', url: '', note: '', dateAdded: '2026-07-27', dateBought: '' }
  ]
};
window.FURNITURE_UPDATED = '2026-07-27';

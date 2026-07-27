// ===== Furniture & Decor checklist — ของที่ต้องซื้อเข้าห้องเช่า (Jarvis แก้ไฟล์นี้เท่านั้น) =====
// บริบท: Bright เช่าห้องอยู่ และเป็น "ห้องเปล่า" (มีแค่ผนัง-พื้น-ห้องน้ำ) ต้องซื้อเองเกือบหมด
// หลักเลือกของ: ถอดประกอบ/ขนย้ายได้ตอนย้ายออก, เลี่ยงของที่ต้องเจาะผนัง, ไม่เอาชิ้นใหญ่เกินห้อง
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
    { id: 'fn0001', name: 'ที่นอน 5 ฟุต', category: 'furniture', priority: 'must', price: 5900, paid: 0, status: 'todo', shop: '', url: '', note: 'ลองนอนที่หน้าร้านก่อน — ของชิ้นที่ควรจ่ายแพงสุดในห้อง', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0002', name: 'ฐานเตียงเหล็กถอดประกอบ', category: 'furniture', priority: 'must', price: 1900, paid: 0, status: 'todo', shop: '', url: '', note: 'เลี่ยงเตียงไม้ทั้งชุด ถอดขนย้ายตอนย้ายออกง่ายกว่า มีที่เก็บของใต้เตียงด้วย', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0003', name: 'ตู้เสื้อผ้าถอดประกอบ', category: 'furniture', priority: 'must', price: 1800, paid: 0, status: 'todo', shop: '', url: '', note: 'แบบโครงเหล็กคลุมผ้า หรือพลาสติกประกอบ — เบา ย้ายง่าย', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0004', name: 'โต๊ะทำงาน', category: 'furniture', priority: 'must', price: 1800, paid: 0, status: 'todo', shop: '', url: '', note: 'วัดผนังก่อน กว้าง 100-120 ซม. กำลังดีสำหรับห้องเช่า', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0005', name: 'เก้าอี้ทำงาน', category: 'furniture', priority: 'must', price: 2500, paid: 0, status: 'todo', shop: '', url: '', note: 'แบบรองรับหลัง นั่งนานได้', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0006', name: 'ชั้นวางของเอนกประสงค์', category: 'furniture', priority: 'nice', price: 1200, paid: 0, status: 'todo', shop: '', url: '', note: 'ตั้งพื้น ไม่ต้องเจาะผนัง', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0007', name: 'โต๊ะข้างเตียง', category: 'furniture', priority: 'nice', price: 700, paid: 0, status: 'todo', shop: '', url: '', note: '', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0008', name: 'เก้าอี้นั่งเล่น / พัฟ', category: 'furniture', priority: 'nice', price: 1500, paid: 0, status: 'todo', shop: '', url: '', note: 'แทนโซฟา — ห้องเช่าโซฟาตัวใหญ่กินพื้นที่และขนย้ายลำบาก', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0009', name: 'ชั้นวางรองเท้า', category: 'furniture', priority: 'nice', price: 600, paid: 0, status: 'todo', shop: '', url: '', note: '', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0010', name: 'โต๊ะพับกินข้าว', category: 'furniture', priority: 'later', price: 900, paid: 0, status: 'todo', shop: '', url: '', note: 'พับเก็บได้ ไม่กินที่', dateAdded: '2026-07-27', dateBought: '' },

    // ── ของตกแต่ง ──
    { id: 'fn0011', name: 'ผ้าม่านสำเร็จรูป + ราวแบบไม่เจาะ', category: 'decor', priority: 'must', price: 1200, paid: 0, status: 'todo', shop: '', url: '', note: 'วัดหน้าต่างก่อนสั่ง ใช้ราวสปริง/ขอเกี่ยวแบบไม่เจาะผนัง เจ้าของห้องไม่ว่า', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0012', name: 'โคมไฟหัวเตียง', category: 'decor', priority: 'must', price: 500, paid: 0, status: 'todo', shop: '', url: '', note: 'ไฟห้องเช่ามักขาวจ้าดวงเดียว มีไฟวอร์มช่วยได้เยอะ', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0013', name: 'พรมผืนเล็ก', category: 'decor', priority: 'nice', price: 900, paid: 0, status: 'todo', shop: '', url: '', note: 'ช่วยกลบพื้นกระเบื้อง/ลามิเนตเดิมของห้อง', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0014', name: 'กระจกเต็มตัวแบบพิงผนัง', category: 'decor', priority: 'nice', price: 900, paid: 0, status: 'todo', shop: '', url: '', note: 'แบบพิง ไม่ต้องยึดผนัง ช่วยให้ห้องดูกว้างขึ้น', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0015', name: 'โคมไฟตั้งพื้น', category: 'decor', priority: 'nice', price: 1200, paid: 0, status: 'todo', shop: '', url: '', note: '', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0016', name: 'ต้นไม้ในกระถาง 2-3 ต้น', category: 'decor', priority: 'nice', price: 800, paid: 0, status: 'todo', shop: '', url: '', note: 'เลือกชนิดเลี้ยงง่าย อยู่ในร่มได้ เช่น พลูด่าง ลิ้นมังกร', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0017', name: 'ไฟเส้น LED / ไฟราว', category: 'decor', priority: 'later', price: 400, paid: 0, status: 'todo', shop: '', url: '', note: 'ติดด้วยเทปกาว ลอกออกได้ตอนย้าย', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0018', name: 'โปสเตอร์ / กรอบรูป + เทปไม่ทิ้งรอย', category: 'decor', priority: 'later', price: 600, paid: 0, status: 'todo', shop: '', url: '', note: 'ใช้เทปกาวสองหน้าแบบลอกออกได้ ห้ามตอกตะปูผนังห้องเช่า', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0019', name: 'นาฬิกาแขวน', category: 'decor', priority: 'later', price: 400, paid: 0, status: 'todo', shop: '', url: '', note: 'ใช้ตะขอกาวแบบไม่เจาะ', dateAdded: '2026-07-27', dateBought: '' },

    // ── ของใช้จำเป็น ──
    { id: 'fn0020', name: 'ชุดเครื่องนอน (ผ้าปู/หมอน/ปลอก)', category: 'essentials', priority: 'must', price: 1200, paid: 0, status: 'todo', shop: '', url: '', note: 'ซื้อผ้าปูสำรองอีกชุดไว้สลับซัก', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0021', name: 'ผ้าห่ม', category: 'essentials', priority: 'must', price: 700, paid: 0, status: 'todo', shop: '', url: '', note: '', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0022', name: 'พัดลม', category: 'essentials', priority: 'must', price: 1200, paid: 0, status: 'todo', shop: '', url: '', note: 'ถ้าห้องไม่มีแอร์ให้ ตัวนี้เลื่อนเป็นของด่วนสุด', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0023', name: 'ราวตากผ้าแบบพับได้', category: 'essentials', priority: 'must', price: 600, paid: 0, status: 'todo', shop: '', url: '', note: 'พับเก็บได้ ใช้ในห้อง/ระเบียงเล็ก', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0024', name: 'ถังขยะ + กล่องเก็บของใต้เตียง', category: 'essentials', priority: 'must', price: 600, paid: 0, status: 'todo', shop: '', url: '', note: 'ห้องเช่าพื้นที่จำกัด ใต้เตียงคือที่เก็บของหลัก', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0025', name: 'ชุดทำความสะอาด (ไม้กวาด/ไม้ถู/ที่โกยผง)', category: 'essentials', priority: 'must', price: 500, paid: 0, status: 'todo', shop: '', url: '', note: '', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0026', name: 'ที่แขวน/ชั้นวางในห้องน้ำแบบไม่เจาะ', category: 'essentials', priority: 'nice', price: 400, paid: 0, status: 'todo', shop: '', url: '', note: 'แบบสุญญากาศหรือกาวติด', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0027', name: 'ตู้เย็นเล็ก', category: 'essentials', priority: 'nice', price: 4500, paid: 0, status: 'todo', shop: '', url: '', note: 'ขนาด 5-6 คิว พอสำหรับห้องเช่า เช็คก่อนว่าห้องมีให้ไหม', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0028', name: 'กาต้มน้ำไฟฟ้า', category: 'essentials', priority: 'nice', price: 500, paid: 0, status: 'todo', shop: '', url: '', note: '', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0029', name: 'ไมโครเวฟ', category: 'essentials', priority: 'later', price: 2500, paid: 0, status: 'todo', shop: '', url: '', note: 'เช็คกฎหอก่อน บางที่ห้ามเครื่องใช้ไฟฟ้ากินไฟสูง', dateAdded: '2026-07-27', dateBought: '' },
    { id: 'fn0030', name: 'เครื่องทำน้ำอุ่น', category: 'essentials', priority: 'later', price: 2800, paid: 0, status: 'todo', shop: '', url: '', note: 'เฉพาะถ้าห้องไม่มีให้ — ต้องขออนุญาตเจ้าของห้องก่อนติดตั้ง', dateAdded: '2026-07-27', dateBought: '' }
  ]
};
window.FURNITURE_UPDATED = '2026-07-27';

// ── Paper Trade — พอร์ตหุ้นจำลองที่ Claude (Jarvis) บริหารเอง ──
// ไม่มี vault/Obsidian คู่กัน — ไฟล์นี้คือ source of truth ที่เดียว (single-writer: Jarvis เท่านั้น)
// เงินสมมติ ไม่กระทบเงินจริง — เป้าหมายคือดูว่าถ้าปล่อยให้ AI ตัดสินใจซื้อ-ขายเองผลจะเป็นยังไง
// schema: { startDate, startCash, cash, positions:[{ticker,name,shares,avgEntry,price,priceAsOf,opened}], trades:[{id,date,ticker,name,side,shares,price,thesis}] }
// positions = เฉพาะ ticker ที่ยังถือ (shares > 0) · trades = ประวัติทุกไม้เรียงเก่า→ใหม่ ทุกไม้ต้องมี thesis
// price/priceAsOf ไม่ real-time — อัปเดตเฉพาะตอน Jarvis WebSearch เช็คราคาให้ (ดู skill paper-portfolio)
// worth/P&L/allocation คำนวณฝั่ง views/paper.js ตอน render ไม่ precompute เก็บที่นี่
window.PAPER_DATA = {
  startDate: "2026-07-20",
  startCash: 10000,
  cash: 10000,
  positions: [],
  trades: []
};
window.PAPER_UPDATED = "20/07/2026";

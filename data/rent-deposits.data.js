// ===== Rent > Deposits module — เงินมัดจำ (เพิ่ม 5 ส.ค. 2026) =====
// สลิปจ่ายเงินจริงไม่เก็บในไฟล์นี้/repo นี้ (repo dashboard เป็น public) — เก็บไว้ที่ Obsidian vault
// (repo private "jarvis-vault-backup", โฟลเดอร์ Rent\Slips\) แล้วอ้างชื่อไฟล์ไว้ที่ slipRef เฉยๆ
// items[]: { id, label (เช่น "เงินมัดจำเข้าอยู่"), amount, datePaid,
//   refundable, refunded, refundAmount, refundDate, slipRef, note }
window.RENT_DEPOSITS_DATA = {
  items: []
};
window.RENT_DEPOSITS_UPDATED = '';

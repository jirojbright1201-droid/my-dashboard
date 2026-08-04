// ===== Rent > Payments module — ค่าเช่ารายเดือน + ประวัติการจ่าย (เพิ่ม 5 ส.ค. 2026) =====
// สลิปจ่ายเงินจริงไม่เก็บในไฟล์นี้/repo นี้ (repo dashboard เป็น public) — เก็บไว้ที่ Obsidian vault
// (repo private "jarvis-vault-backup", โฟลเดอร์ Rent\Slips\) แล้วอ้างชื่อไฟล์ไว้ที่ slipRef เฉยๆ
// rent: ค่าเช่า+วันครบกำหนดจ่ายรายเดือน (คงที่ ไม่ต้องตั้งใหม่ทุกเดือนแบบ Subscriptions)
//   amount 0 / dueDay 0 = ยังไม่ตั้งค่า (Bright ยังไม่แจ้ง)
// history[]: บันทึกการจ่ายแต่ละเดือน { id, month:'YYYY-MM', amountDue, amountPaid, datePaid,
//   status:'paid'|'pending'|'late', slipRef (ชื่อไฟล์สลิปใน vault, ว่างได้), note }
window.RENT_PAYMENTS_DATA = {
  rent: { amount: 0, dueDay: 0, currency: 'THB', note: '' },
  history: []
};
window.RENT_PAYMENTS_UPDATED = '';

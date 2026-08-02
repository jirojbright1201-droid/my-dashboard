// ── Savings jars — source of truth (ไม่มี vault, แก้ไฟล์นี้ที่เดียวผ่าน Jarvis) ──
// schema: jars: {id, name, goal, saved, monthly, note}
//   id = slug สั้นๆ (อ้างตอนเติมเงิน), goal/saved/monthly = บาท (number)
//   monthly = ตั้งใจเก็บเดือนละเท่าไร → ใช้คำนวณ "อีกกี่เดือนถึงเป้า" (0 = ไม่คำนวณ)
window.SAVINGS_DATA = {
  "currency": "฿",
  "jars": []
};
window.SAVINGS_UPDATED = "03/08/2026";

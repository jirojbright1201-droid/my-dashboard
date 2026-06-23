// ── Savings jars — source of truth (ไม่มี vault, แก้ไฟล์นี้ที่เดียวผ่าน Jarvis) ──
// schema: jars: {id, name, goal, saved, note}
//   id = slug สั้นๆ (อ้างตอนเติมเงิน), goal/saved = บาท (number)
window.SAVINGS_DATA = {
  "currency": "฿",
  "jars": [
    { "id": "ps5",       "name": "PlayStation 5 Pro", "goal": 25000, "saved": 8000,  "note": "" },
    { "id": "japan",     "name": "ทริปญี่ปุ่น",        "goal": 40000, "saved": 15000, "note": "" },
    { "id": "macbook",   "name": "MacBook",            "goal": 60000, "saved": 12000, "note": "" },
    { "id": "emergency", "name": "กองทุนฉุกเฉิน",      "goal": 30000, "saved": 30000, "note": "" }
  ]
};
window.SAVINGS_UPDATED = "23/06/2026";

// ── Subscriptions radar — ค่าสมาชิก/บริการที่จ่ายประจำ (แก้ไฟล์นี้ผ่าน Jarvis) ──
// schema: subs: {name, amount, cycle:'mo'|'yr', day(1-31), month(1-12 เฉพาะ yr), note}
//   cycle = 'mo' รายเดือน / 'yr' รายปี · day/month = รอบตัดบิล
window.SUBS_DATA = {
  "currency": "฿",
  "subs": [
    { "name": "Adobe",       "amount": 762, "cycle": "mo", "day": 1, "note": "Creative Cloud" },
    { "name": "Claude",      "amount": 722, "cycle": "mo", "day": 7, "note": "" },
    { "name": "Internet",    "amount": 424, "cycle": "mo", "day": 1, "note": "" },
    { "name": "Spotify",     "amount": 79,  "cycle": "mo", "day": 1, "note": "" },
    { "name": "Debit card",  "amount": 250, "cycle": "yr", "day": 3, "month": 6, "note": "ค่าธรรมเนียมรายปี" }
  ]
};
window.SUBS_UPDATED = "25/06/2026";

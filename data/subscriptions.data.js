// ── Subscriptions radar — ค่าสมาชิก/บริการที่จ่ายประจำ (แก้ไฟล์นี้ผ่าน Jarvis) ──
// schema: subs: {name, amount, cycle:'mo'|'yr', day(1-31), month(1-12 เฉพาะ yr), cur:'USD'(ออปชัน, default บาท), domain(ออปชัน), note}
//   cycle = 'mo' รายเดือน / 'yr' รายปี · day/month = รอบตัดบิล
//   cur:'USD' = amount เป็นดอลลาร์ (โชว์ $ จริง) · รวมยอดแปลงเป็นบาทด้วย usdthb
//   domain = โดเมนแบรนด์ดึงโลโก้ผ่าน Clearbit (เช่น 'ais.co.th') → ถ้าไม่มีเด้งเป็นตัวอักษรย่อ
//   logo = URL โลโก้ตรงๆ (ออปชัน) ใช้ override ถ้า Clearbit ไม่มีแบรนด์นั้น — มาก่อน domain
window.SUBS_DATA = {
  "currency": "฿",
  "usdthb": 33.7,
  "subs": [
    { "name": "Adobe",       "amount": 762, "cycle": "mo", "day": 1, "domain": "adobe.com", "note": "Creative Cloud" },
    { "name": "Claude",      "amount": 21.40, "cur": "USD", "cycle": "mo", "day": 7, "domain": "claude.ai", "note": "" },
    { "name": "Internet",    "amount": 424, "cycle": "mo", "day": 26, "domain": "ais.co.th", "logo": "https://icon.horse/icon/ais.th", "note": "AIS" },
    { "name": "Spotify",     "amount": 79,  "cycle": "mo", "day": 1, "domain": "spotify.com", "note": "" },
    { "name": "Debit card",  "amount": 250, "cycle": "yr", "day": 3, "month": 6, "domain": "kasikornbank.com", "logo": "https://commons.wikimedia.org/wiki/Special:FilePath/Kasikornbank_Logo.svg?width=128", "note": "ค่าธรรมเนียมรายปี K Bank" }
  ]
};
window.SUBS_UPDATED = "01/07/2026";

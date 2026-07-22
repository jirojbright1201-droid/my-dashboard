// Investment — current holdings snapshot (ไม่ใช่ transaction log/portfolio tracker ต่อเนื่อง แค่ "ล่าสุดถืออะไรอยู่")
// Jarvis อัปเดตไฟล์นี้ทุกครั้งที่ jiroj แจ้งซื้อ-ขาย-เปลี่ยนแปลง holdings ในแชท (ไม่ auto-fetch จากที่ไหน)
// ใช้โดย: (1) การ์ด "Current Holdings" บนสุดของแท็บ Portfolio ใน views/investment.js
//         (2) cloud routine Portfolio Review อัตโนมัติทุกวันศุกร์ตี 5 (Bangkok) — อ่านไฟล์นี้เป็นแหล่งความจริงเดียวว่าตอนนี้ถือ asset อะไร
// schema: { asOf:"YYYY-MM-DD", items:[{type:"stock"|"cash"|"gold", symbol, name, shares, avgCost, currency, amountTHB, note}], notes }
window.HOLDINGS_DATA = {
  "asOf": "",
  "items": [],
  "notes": ""
};

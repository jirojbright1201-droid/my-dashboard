// ===== พอร์ตของ jiroj (ฝั่ง "คุณ") — แยกไฟล์เพื่อกัน Vega (AI Port) เห็น/อิงพอร์ตคุณ =====
// Vega routine อ่าน data.js เท่านั้น ห้ามเปิดไฟล์นี้. app.js เป็นคน stitch YOU เข้า DATA ตอนโหลด
const YOU = {
  cash: 18.06,            // เงินสดรอลงทุน (USD)
  holdings: [
    {tk:'NOK', name:'Nokia Oyj', sector:'Telecom Equipment', exchange:'NYSE', country:'Finland', founded:'1865', web:'nokia.com',
     shares:2, avg:14.00, price:14.80, prev:14.80,
     about:'บริษัทเทคโนโลยีโทรคมนาคมสัญชาติฟินแลนด์ ผู้ผลิตอุปกรณ์เครือข่าย 5G/IP/optical และโครงสร้างพื้นฐานสำหรับ data center กำลังขยายฐานการผลิต R&D ในสหรัฐฯ มูลค่ารวม $4B รวมถึงโรงงานเซมิคอนดักเตอร์ที่ Pennsylvania',
     trades:[
       {date:'16 มิ.ย. 2026', t:'ซื้อ NOK 2 @ $14.00', why:'Nokia ขยายลงทุนเซมิคอนดักเตอร์ที่ Pennsylvania + โมเมนตัม AI/5G แรง (+127% YTD) ราคา ~$14.80 ต่ำกว่า 52wk high $17.45 analyst avg "Buy" target ~$14.89'}
     ],
     news:[]}
  ],
  thesis:[],              // มุมมอง/ธีมการลงทุนของคุณ — ยังไม่มี เพิ่มก่อนลงไม้แรก
  you:{ret:3.47, val:47.66, hold:[['NOK',1]]},   // สรุปฝั่งคุณบนกระดาน arena
  you_s:[0,3.47],         // ซีรีส์ผลตอบแทนฝั่งคุณ (ยังไม่ render เป็นกราฟ)
  timeline:[
    {date:'15 มิ.ย.', total:46.06, change:0},
    {date:'16 มิ.ย.', total:47.66, change:1.60}
  ]
};

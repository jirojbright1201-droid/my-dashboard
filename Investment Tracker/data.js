// ===== Investment Tracker — DATA (ของจริง ไม่ใช่ม็อคอัพ) =====
// เริ่มต้น 15 มิ.ย. 2026 — นับ 1 ใหม่จากเงินสดล้วน ไม่มีสถานะค้าง (log เก่าที่ซื้อๆขายๆ ทิ้งไว้เป็นบทเรียน)
// source of truth = ไฟล์นี้ที่เดียว. ราคา/ข่าว/ดัชนี ของจริง Newwy เป็นคนดึงมาเติมทีหลัง
const FX = 33; // บาท/USD โดยประมาณ — Newwy อัปเดตของจริงทีหลัง
const DATA = {
  cash: 45.60,            // เงินสดรอลงทุน (USD) — ฝั่งคุณ
  holdings: [],           // ยังไม่มีสถานะ — เริ่มจากเงินสดล้วน รอลงไม้แรกแบบมีวินัย
  // บริษัทที่ดู/watchlist — status: 'vega' (Vega ถือ), 'sold' (เคยถือแล้วขาย), 'watch' (กำลังดู)
  companies: [],
  market:{
    indices:[],           // S&P/Nasdaq/Dow/VIX — Newwy ดึงของจริง
    sectors:[],           // sector performance — Newwy
    news:[],              // ข่าวตลาด (+ ธง feat สำหรับข่าวเด่น) — Newwy
    holdings_news:[]      // ข่าวรายตัวของหุ้นที่ถือ/Vega ถือ — Newwy
  },
  arena:{
    start:'15 มิ.ย. 2026', startVal:45.60,
    you:{ret:0, val:45.60, hold:[]},
    vega:{ret:0, val:45.60, hold:[]},
    labels:['15 มิ.ย.'],
    you_s:[0], vega_s:[0], spx_s:[0],
    moves:[],
    journal:[]
  },
  // ===== Vega — พอร์ต AI (เริ่มวันเดียวกับคุณ ทุนเท่ากัน สร้างพอร์ตเองด้วย research) =====
  vega:{
    name:'AI Port', start:'15 มิ.ย. 2026', startVal:45.60, val:45.60, ret:0, cash:45.60,
    labels:['15 มิ.ย.'],
    series:[0], spx:[0],
    holdings:[], closed:[], nearMiss:[]
  },
  thesis:[],              // มุมมอง/ธีมการลงทุนของคุณ — ยังไม่มี เพิ่มก่อนลงไม้แรก
  timeline:[
    {date:'15 มิ.ย.', total:45.60, change:0}
  ],
  bench:{ spx:[0], nasdaq:[0] }
};

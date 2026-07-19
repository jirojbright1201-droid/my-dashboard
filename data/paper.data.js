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
  cash: 1362.31,
  positions: [
    { ticker: "NVDA", name: "NVIDIA Corporation", shares: 11, avgEntry: 202.55, price: 202.55, priceAsOf: "2026-07-19", opened: "2026-07-20" },
    { ticker: "MA", name: "Mastercard Incorporated", shares: 4, avgEntry: 543.60, price: 543.60, priceAsOf: "2026-07-19", opened: "2026-07-20" },
    { ticker: "LLY", name: "Eli Lilly and Company", shares: 2, avgEntry: 1176.75, price: 1176.75, priceAsOf: "2026-07-19", opened: "2026-07-20" },
    { ticker: "COST", name: "Costco Wholesale Corporation", shares: 2, avgEntry: 940.87, price: 940.87, priceAsOf: "2026-07-17", opened: "2026-07-20" }
  ],
  trades: [
    { id: "t0001", date: "2026-07-20", ticker: "NVDA", name: "NVIDIA Corporation", side: "buy", shares: 11, price: 202.55, thesis: "ผู้นำชิป AI/data center เกือบผูกขาด GPU สำหรับเทรน AI model — CUDA (ระบบซอฟต์แวร์ของ Nvidia ที่นักพัฒนา AI ส่วนใหญ่ผูกติดอยู่) เป็นกำแพงกันคู่แข่งที่แข็งแรง demand จาก hyperscaler (ผู้ให้บริการคลาวด์รายใหญ่อย่าง Microsoft/Google/Amazon/Meta) ยังสูงต่อเนื่อง แต่ราคาหวือหวาตามข่าว AI capex (เงินลงทุนศูนย์ข้อมูล) เป็นรอบๆ — เข้าไซส์กลาง ไม่ all-in ตัวเดียว" },
    { id: "t0002", date: "2026-07-20", ticker: "MA", name: "Mastercard Incorporated", side: "buy", shares: 4, price: 543.60, thesis: "เครือข่ายชำระเงินระดับโลก โมเดล asset-light (ไม่ต้องแบกความเสี่ยงสินเชื่อเหมือนธนาคาร) เก็บค่าธรรมเนียมทุกธุรกรรมที่ไหลผ่านเครือข่าย ได้ประโยชน์จากเทรนด์ระยะยาวที่เงินสดเปลี่ยนเป็นดิจิทัลทั่วโลกซึ่งยังไม่จบ นักวิเคราะห์ให้เรตติ้ง Strong Buy เกือบทั้งหมด — เลือกเป็นตัวสร้างเสถียรภาพให้พอร์ต ไม่หวือหวาเท่า NVDA" },
    { id: "t0003", date: "2026-07-20", ticker: "LLY", name: "Eli Lilly and Company", side: "buy", shares: 2, price: 1176.75, thesis: "ผู้นำยา GLP-1 (กลุ่มยาลดน้ำหนัก/เบาหวานที่เป็นเมกะเทรนด์ของวงการยาตอนนี้) ตลาดยังอยู่ช่วงต้นของการเติบโต demand ยังล้นกำลังผลิต แต่ valuation แพงมาก (P/E ราว 42 เท่า) และราคาต่อหุ้นสูงมากทำให้ position size เล็กโดยธรรมชาติ — เสี่ยงเรื่อง multiple compression (การลดลงของสัดส่วนราคาต่อกำไรตอนตลาดเปลี่ยนมุมมอง) ถ้าโมเมนตัมชะลอ เข้าไซส์เล็กเป็นการทดสอบธีมนี้ก่อน" },
    { id: "t0004", date: "2026-07-20", ticker: "COST", name: "Costco Wholesale Corporation", side: "buy", shares: 2, price: 940.87, thesis: "ธุรกิจค้าปลีกแบบสมาชิก (membership warehouse) รายได้ค่าสมาชิกที่ต่ออายุสม่ำเสมอกว่า 90% ทำให้กระแสเงินสดมั่นคงกว่าค้าปลีกทั่วไป ทนเศรษฐกิจถดถอยได้ดี (defensive) ราคาปัจจุบันต่ำกว่า all-time high ที่เคยทำไว้ประมาณ 14% — เข้าจังหวะย่อตัว เป็นตัวถ่วงดุลความเสี่ยงของ NVDA/LLY ในพอร์ต" }
  ]
};
window.PAPER_UPDATED = "20/07/2026";

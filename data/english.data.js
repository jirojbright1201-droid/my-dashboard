// ── English Tracker — bake จาก Obsidian vault (English Tracker/Sessions.md + Vocab.md + Mistakes.md + Profile.md) ──
// ไม่ใช่เครื่องมือสอน — บทเรียนพูด-สนทนา-แก้ผิดเกิดในแชทกับ Jarvis เอง แอปนี้แค่ track ผลลัพธ์
// flat list ไม่มี KEYS แบบเดือน (เหมือน books/articles) — streak คำนวณฝั่ง UI จาก sessions[].date ไม่ precompute เก็บลง data
// schema: { level: "beginner"|"intermediate"|"advanced", sessions:[{date,topic,note}], vocab:[{id,term,meaning,example,dateAdded}], mistakes:[{id,mistake,correction,why,dateAdded}] }
// source = vault markdown, ไฟล์นี้ = ตัว deploy. CRUD เล็กแก้ที่นี่ + vault แล้ว push
window.ENGLISH_DATA = {
  "level": "beginner",
  "sessions": [
    { "date": "2026-07-19", "topic": "สัมภาษณ์ประเมินระดับเบื้องต้น", "note": "แนะนำตัว + เล่าเหตุการณ์กับลูกค้าที่ McDonald's + อ่านสรุปย่อหน้าข่าวหุ้น สื่อสารใจความหลักได้ดี จุดอ่อน: word order คำถามซ้อน, past tense ปฏิเสธ, ศัพท์การเงิน" },
    { "date": "2026-07-19", "topic": "บทเรียนรอบ 2: อ่าน/แปลข่าวหุ้น + ฟัง earnings call + roleplay ลูกค้า", "note": "แปลย่อหน้าข่าวหุ้นได้เกือบหมด พลาด headwind ตอนแรกแต่จำได้แม่นตอนฟังจริงท้ายชั่วโมง, พลาด greedy ใน Buffett quote จนความหมายกลับด้าน, แก้จุดเดิม vegetarian/vegetation ได้เองในสถานการณ์จริง — ความคืบหน้าชัดเจนกว่ารอบก่อน" }
  ],
  "vocab": [
    { "id": "e0001", "term": "margin", "meaning": "กำไรส่วนต่าง (ส่วนต่างระหว่างรายได้กับต้นทุน)", "example": "Their profit margin narrowed as costs rose.", "dateAdded": "2026-07-19" },
    { "id": "e0002", "term": "input cost", "meaning": "ต้นทุนวัตถุดิบ/ปัจจัยการผลิต", "example": "Input costs rose faster than prices this quarter.", "dateAdded": "2026-07-19" },
    { "id": "e0003", "term": "guidance", "meaning": "การให้แนวโน้มผลประกอบการล่วงหน้าจากผู้บริหาร", "example": "Management gave no firm guidance for next quarter.", "dateAdded": "2026-07-19" },
    { "id": "e0004", "term": "ease (verb)", "meaning": "บรรเทาลง เบาลง", "example": "They expect the pressure to ease in the second half.", "dateAdded": "2026-07-19" },
    { "id": "e0005", "term": "revenue growth", "meaning": "การเติบโตของรายได้", "example": "The company reported strong revenue growth of 15% year-over-year.", "dateAdded": "2026-07-19" },
    { "id": "e0006", "term": "year-over-year (YoY)", "meaning": "เทียบกับช่วงเดียวกันของปีก่อน", "example": "Revenue grew 15% year-over-year.", "dateAdded": "2026-07-19" },
    { "id": "e0007", "term": "headwind", "meaning": "ปัจจัยลบที่ฉุดรั้งผลประกอบการ", "example": "Management warned of a headwind from rising shipping costs.", "dateAdded": "2026-07-19" },
    { "id": "e0008", "term": "outlook", "meaning": "มุมมอง/แนวโน้มที่บริษัทคาดการณ์อนาคตตัวเอง", "example": "They gave a positive outlook for the next two quarters.", "dateAdded": "2026-07-19" },
    { "id": "e0009", "term": "greedy", "meaning": "โลภ อยากได้มาก", "example": "Be fearful when others are greedy.", "dateAdded": "2026-07-19" },
    { "id": "e0010", "term": "fearful", "meaning": "หวาดกลัว ระมัดระวัง", "example": "Be greedy when others are fearful.", "dateAdded": "2026-07-19" }
  ],
  "mistakes": [
    { "id": "m0001", "mistake": "why in Thailand don't have", "correction": "why Thailand doesn't have", "why": "คำถามที่ซ้อนอยู่ในประโยคอื่น (embedded question) เรียงประธาน-กริยาแบบประโยคบอกเล่า ไม่กลับกริยาช่วยมาไว้หน้าประธานแบบคำถามตรง", "dateAdded": "2026-07-19" },
    { "id": "m0002", "mistake": "vegetation burger", "correction": "vegetarian burger", "why": "vegetation แปลว่าพืชพรรณ (mass noun) ส่วน vegetarian หมายถึงมังสวิรัติ คนละคำกันแม้หน้าตาคล้าย", "dateAdded": "2026-07-19" },
    { "id": "m0003", "mistake": "but i can explain that (พูดถึงอดีต)", "correction": "but I couldn't explain that", "why": "พูดถึงเหตุการณ์ในอดีตที่ทำไม่ได้ ต้องใช้ past tense ปฏิเสธ couldn't ไม่ใช่ can (present)", "dateAdded": "2026-07-19" },
    { "id": "m0004", "mistake": "headwind แปลเป็น \"การบริหารจัดการค่าใช้จ่าย\"", "correction": "headwind = ปัจจัยลบที่ฉุดรั้งผลประกอบการ", "why": "ไม่รู้จักศัพท์ใหม่ในบริบท เดาความหมายจากคำที่คุ้นเคย (management) แทน", "dateAdded": "2026-07-19" },
    { "id": "m0005", "mistake": "\"Be fearful when others are greedy\" แปลเป็น \"จงกล้าเมื่อคนอื่นกลัว\"", "correction": "จงกลัวเมื่อคนอื่นโลภ และจงโลภเมื่อคนอื่นกลัว", "why": "ไม่รู้ความหมายคำว่า greedy (โลภ) เดาเป็น \"กล้า\" แทน ทำให้ตรรกะของประโยคกลับด้าน", "dateAdded": "2026-07-19" }
  ]
};
window.ENGLISH_UPDATED = "19/07/2026";

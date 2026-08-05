// ── English Tracker — bake จาก Obsidian vault (English Tracker/Sessions.md + Vocab.md + Mistakes.md + Profile.md) ──
// ไม่ใช่เครื่องมือสอน — บทเรียนพูด-สนทนา-แก้ผิดเกิดในแชทกับ Jarvis เอง แอปนี้แค่ track ผลลัพธ์
// flat list ไม่มี KEYS แบบเดือน (เหมือน books/articles) — streak คำนวณฝั่ง UI จาก sessions[].date ไม่ precompute เก็บลง data
// schema: { level: "beginner"|"intermediate"|"advanced", sessions:[{date,topic,note}], vocab:[{id,term,meaning,example,dateAdded}], mistakes:[{id,mistake,correction,why,dateAdded}] }
// source = vault markdown, ไฟล์นี้ = ตัว deploy. CRUD เล็กแก้ที่นี่ + vault แล้ว push
window.ENGLISH_DATA = {
  "level": "beginner",
  "sessions": [
    { "date": "2026-08-05", "topic": "Talking about a company (SoFi) in English", "note": "Practiced describing SoFi's business and financial performance. Used revenue, quarter, and profit margin correctly in own sentences by end of session. Recurring missing linking verb (is/am) improved over the session." }
  ],
  "vocab": [
    { "id": "e0001", "term": "revenue", "meaning": "รายได้รวมก่อนหักต้นทุน", "example": "SoFi's revenue grew 40% YoY.", "dateAdded": "2026-08-05" },
    { "id": "e0002", "term": "quarter", "meaning": "ไตรมาส ช่วง 3 เดือนที่บริษัทรายงานผลประกอบการ", "example": "Their profit margin is lower than last quarter.", "dateAdded": "2026-08-05" },
    { "id": "e0003", "term": "profit margin", "meaning": "กำไรส่วนต่าง สัดส่วนกำไรเทียบกับรายได้", "example": "Their profit margin is lower than last quarter.", "dateAdded": "2026-08-05" }
  ],
  "mistakes": [
    { "id": "m0001", "mistake": "Dropped the linking verb, e.g. 'the CEO good' / 'I confident'", "correction": "Always include is/am/are: 'The CEO is good' / 'I am confident'", "why": "English requires a linking verb in every clause; Thai can drop it", "dateAdded": "2026-08-05" },
    { "id": "m0002", "mistake": "Used present continuous 'is growing YoY 40%' for an already-reported result, with the percentage misplaced", "correction": "For completed reported results use past tense and place the percentage before YoY: 'grew 40% YoY'", "why": "Reported financial results are completed past events, not ongoing actions", "dateAdded": "2026-08-05" },
    { "id": "m0003", "mistake": "Used 'make the Rule of 40'", "correction": "Correct collocation is 'achieve the Rule of 40'", "why": "'make' does not collocate with targets/benchmarks in English; 'achieve' or 'hit' does", "dateAdded": "2026-08-05" }
  ]
};
window.ENGLISH_UPDATED = "05/08/2026";

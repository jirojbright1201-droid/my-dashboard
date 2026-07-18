// ── English Tracker — bake จาก Obsidian vault (English Tracker/Sessions.md + Vocab.md + Mistakes.md + Profile.md) ──
// ไม่ใช่เครื่องมือสอน — บทเรียนพูด-สนทนา-แก้ผิดเกิดในแชทกับ Jarvis เอง แอปนี้แค่ track ผลลัพธ์
// flat list ไม่มี KEYS แบบเดือน (เหมือน books/articles) — streak คำนวณฝั่ง UI จาก sessions[].date ไม่ precompute เก็บลง data
// schema: { level: "beginner"|"intermediate"|"advanced", sessions:[{date,topic,note}], vocab:[{id,term,meaning,example,dateAdded}], mistakes:[{id,mistake,correction,why,dateAdded}] }
// source = vault markdown, ไฟล์นี้ = ตัว deploy. CRUD เล็กแก้ที่นี่ + vault แล้ว push
window.ENGLISH_DATA = {
  "level": "beginner",
  "sessions": [],
  "vocab": [],
  "mistakes": []
};
window.ENGLISH_UPDATED = "18/07/2026";

// ── Book Tracker — bake จาก Obsidian vault (Book Tracker/Books.md + Reviews.md + Goals.md) ──
// books ไม่ใช่ concept รายเดือนแบบ Money/Planner (เล่มหนึ่งอ่านคาบเกี่ยวหลายเดือนได้)
// จึงเป็น flat list ไม่มี KEYS แบบเดือน — แก้ status ในแถวเดิมของ Books.md ไปเรื่อยๆ
// schema: { goals:{ "YYYY": จำนวนเล่มเป้าหมาย }, books:[{id,title,author,status,genre,totalPages,currentPage,dateAdded,startDate,finishDate,rating,review,cover}] }
// status: "want" | "reading" | "done" · rating: 1-5 หรือ null · cover: URL ตรงๆ ถ้ามี (ไม่ auto-fetch จาก ISBN)
// source = vault markdown, ไฟล์นี้ = ตัว deploy. CRUD เล็กแก้ที่นี่ + vault แล้ว push
window.BOOKS_DATA = {
  "goals": {},
  "books": []
};
window.BOOKS_UPDATED = "13/07/2026";

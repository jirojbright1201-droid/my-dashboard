// ── Book Tracker — bake จาก Obsidian vault (Book Tracker/Books.md + Reviews.md + Goals.md) ──
// books ไม่ใช่ concept รายเดือนแบบ Money/Planner (เล่มหนึ่งอ่านคาบเกี่ยวหลายเดือนได้)
// จึงเป็น flat list ไม่มี KEYS แบบเดือน — แก้ status ในแถวเดิมของ Books.md ไปเรื่อยๆ
// schema: { goals:{ "YYYY": จำนวนเล่มเป้าหมาย }, books:[{id,title,author,status,genre,format,totalPages,currentPage,progressPct,dateAdded,startDate,finishDate,rating,review,cover}] }
// status: "want" | "reading" | "done" · rating: 1-5 หรือ null · cover: URL ตรงๆ ถ้ามี (ไม่ auto-fetch จาก ISBN)
// format: "ebook" → ใช้ progressPct ตรงๆ (ห้ามเดาแปลงเป็นเลขหน้าเอง เพราะ pagination ของ e-book ไม่ตรงฉบับพิมพ์)
//         "physical" → ใช้ currentPage/totalPages คำนวณ % แทน
// source = vault markdown, ไฟล์นี้ = ตัว deploy. CRUD เล็กแก้ที่นี่ + vault แล้ว push
window.BOOKS_DATA = {
  "goals": {},
  "books": [
    {"id":"b0001","title":"อย่าโกหก (Never Lie)","author":"Freida McFadden","status":"reading",
     "genre":"ระทึกขวัญ","format":"ebook","totalPages":null,"currentPage":null,"progressPct":31,
     "dateAdded":"2026-07-13","startDate":"2026-07-13","finishDate":null,
     "rating":null,"review":"","cover":"https://api.chulabook.com/images/pid-232368.JPG"}
  ]
};
window.BOOKS_UPDATED = "13/07/2026";

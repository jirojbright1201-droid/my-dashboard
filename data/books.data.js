// ── Book Tracker — bake จาก Obsidian vault (Book Tracker/Books.md + Reviews.md + Goals.md) ──
// books ไม่ใช่ concept รายเดือนแบบ Money/Planner (เล่มหนึ่งอ่านคาบเกี่ยวหลายเดือนได้)
// จึงเป็น flat list ไม่มี KEYS แบบเดือน — แก้ status ในแถวเดิมของ Books.md ไปเรื่อยๆ
// schema: { goals:{ "YYYY": จำนวนเล่มเป้าหมาย }, books:[{id,title,author,status,genre,format,totalPages,currentPage,progressPct,dateAdded,startDate,finishDate,rating,review,cover,synopsis}] }
// status: "want" | "reading" | "done" · rating: 1-5 หรือ null · cover: URL ตรงๆ ถ้ามี (ไม่ auto-fetch จาก ISBN)
// format: "ebook" → ใช้ progressPct ตรงๆ (ห้ามเดาแปลงเป็นเลขหน้าเอง เพราะ pagination ของ e-book ไม่ตรงฉบับพิมพ์)
//         "physical" → ใช้ currentPage/totalPages คำนวณ % แทน
// synopsis: เรื่องย่อภาษาไทยเสมอ (แม้ UI chrome ที่เหลือเป็นอังกฤษ — เนื้อหาหนังสือคงภาษาต้นฉบับ/ภาษาที่ผู้ใช้อ่านจริง)
// source = vault markdown, ไฟล์นี้ = ตัว deploy. CRUD เล็กแก้ที่นี่ + vault แล้ว push
window.BOOKS_DATA = {
  "goals": {},
  "books": [
    {"id":"b0001","title":"อย่าโกหก (Never Lie)","author":"Freida McFadden","status":"reading",
     "genre":"ระทึกขวัญ","format":"ebook","totalPages":null,"currentPage":null,"progressPct":31,
     "dateAdded":"2026-07-13","startDate":"2026-07-13","finishDate":null,
     "rating":null,"review":"","cover":"https://api.chulabook.com/images/pid-232368.JPG",
     "synopsis":"ทริเซียกับอีธาน คู่แต่งงานใหม่ ไปพบบ้านหลังหนึ่งที่เคยเป็นของนักจิตบำบัดชื่อดัง ดร.เอเดรียน เฮล ผู้หายตัวไปอย่างลึกลับเมื่อหลายปีก่อน ระหว่างติดอยู่ในบ้านเพราะพายุหิมะ ทริเซียพบเทปบันทึกเสียงบำบัดของคนไข้เก่า และเมื่อฟังไปเรื่อยๆ ก็เริ่มขุดพบความจริงที่ซ่อนอยู่เบื้องหลังการหายตัวไปของหมอเฮล"}
  ]
};
window.BOOKS_UPDATED = "13/07/2026";

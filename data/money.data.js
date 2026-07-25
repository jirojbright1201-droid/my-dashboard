// ── Money Tracker — bake จาก Obsidian vault (Money Tracker/YYYY/MM/) ──
// schema ต่อเดือน: { budget:{หมวด:งบ}, income:[{date,amount,source,name,notes}], expenses:[{date,amount,category,name,notes}] }
// source = vault markdown, ไฟล์นี้ = ตัว deploy. CRUD เล็กแก้ที่นี่ + vault แล้ว push
window.MONEY_DATA = {
  "2026-08": {
    "budget": {},
    "income": [],
    "expenses": [
      {"date":"2026-08-01","amount":3500,"category":"Rent","name":"Security deposit","name_th":"มัดจำ","notes":"ห้องใหม่"},
      {"date":"2026-08-01","amount":3500,"category":"Rent","name":"First month rent","name_th":"ค่าห้องเช่า","notes":"เดือนแรก ห้องใหม่"}
    ]
  }
};
window.MONEY_KEYS = ["2026-08"];
window.MONEY_UPDATED = "26/07/2026";

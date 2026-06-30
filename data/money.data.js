// ── Money Tracker — bake จาก Obsidian vault (Money Tracker/YYYY/MM/) ──
// schema ต่อเดือน: { budget:{หมวด:งบ}, income:[{date,amount,source,name,notes}], expenses:[{date,amount,category,name,notes}] }
// source = vault markdown, ไฟล์นี้ = ตัว deploy. CRUD เล็กแก้ที่นี่ + vault แล้ว push
window.MONEY_DATA = {
  "2026-06": {
    "budget": {},
    "income": [],
    "expenses": []
  },
  "2026-07": {
    "budget": {},
    "income": [
      {"date":"2026-07-01","amount":14728,"source":"Salary","name":"เงินเดือน","notes":""}
    ],
    "expenses": []
  }
};
window.MONEY_KEYS = ["2026-06","2026-07"];
window.MONEY_UPDATED = "30/06/2026";

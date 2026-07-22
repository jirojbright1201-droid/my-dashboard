// ── Money Tracker — bake จาก Obsidian vault (Money Tracker/YYYY/MM/) ──
// schema ต่อเดือน: { budget:{หมวด:งบ}, income:[{date,amount,source,name,notes}], expenses:[{date,amount,category,name,notes}] }
// source = vault markdown, ไฟล์นี้ = ตัว deploy. CRUD เล็กแก้ที่นี่ + vault แล้ว push
window.MONEY_DATA = {
  "2026-08": {
    "budget": {},
    "income": [],
    "expenses": []
  }
};
window.MONEY_KEYS = ["2026-08"];
window.MONEY_UPDATED = "22/07/2026";

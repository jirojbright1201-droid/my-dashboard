// ── Money Tracker — bake จาก Obsidian vault (Money Tracker/YYYY/MM/) ──
// schema ต่อเดือน: { budget:{หมวด:งบ}, income:[{date,amount,source,name,notes}], expenses:[{date,amount,category,name,notes}] }
// source = vault markdown, ไฟล์นี้ = ตัว deploy. CRUD เล็กแก้ที่นี่ + vault แล้ว push
window.MONEY_DATA = {
  "2026-07": {
    "budget": {
      "Restaurant": 3000, "Family": 3000, "Subscriptions": 2000, "Rent": 1500,
      "Investment": 1500, "Shopping": 1000,
      "Entertainment": 0, "Study": 0, "Transport": 100, "Emergency Fund": 1000, "Beauty": 0
    },
    "income": [],
    "expenses": []
  },
  "2026-08": {
    "budget": {},
    "income": [],
    "expenses": []
  }
};
window.MONEY_KEYS = ["2026-07","2026-08"];
window.MONEY_UPDATED = "22/07/2026";

// ── Money Tracker — bake จาก Obsidian vault (Money Tracker/YYYY/MM/) ──
// schema ต่อเดือน: { budget:{หมวด:งบ}, income:[{date,amount,source,name,notes}], expenses:[{date,amount,category,name,notes}] }
// source = vault markdown, ไฟล์นี้ = ตัว deploy. CRUD เล็กแก้ที่นี่ + vault แล้ว push
window.MONEY_DATA = {
  "2026-07": {
    "budget": {
      "Restaurant": 3000, "Family": 4500, "Subscriptions": 2000, "Rent": 1500,
      "Investment": 1500, "Shopping": 500, "Beauty": 0, "Books": 500,
      "Entertainment": 0, "Study": 0, "Transport": 100, "Emergency": 1000
    },
    "income": [
      {"date":"2026-07-01","amount":14728,"source":"Salary","name":"เงินเดือน","notes":""}
    ],
    "expenses": [
      {"date":"2026-07-01","amount":1500,"category":"Investment","name":"Dime","notes":""},
      {"date":"2026-07-01","amount":1000,"category":"Emergency","name":"Emergency Fund","notes":""}
    ]
  }
};
window.MONEY_KEYS = ["2026-07"];
window.MONEY_UPDATED = "30/06/2026";

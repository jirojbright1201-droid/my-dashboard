// ── Money Tracker — bake จาก Obsidian vault (Money Tracker/YYYY/MM/) ──
// schema ต่อเดือน: { budget:{หมวด:งบ}, income:[{date,amount,source,name,notes}], expenses:[{date,amount,category,name,notes}] }
// source = vault markdown, ไฟล์นี้ = ตัว deploy. CRUD เล็กแก้ที่นี่ + vault แล้ว push
window.MONEY_DATA = {
  "2026-07": {
    "budget": {
      "Restaurant": 3000, "Family": 3000, "Subscriptions": 2000, "Rent": 1500,
      "Investment": 1500, "Shopping": 1000, "Beauty": 0,
      "Entertainment": 0, "Study": 0, "Transport": 100, "Emergency": 1000
    },
    "income": [
      {"date":"2026-07-01","amount":14728,"source":"Salary","name":"เงินเดือน","notes":""}
    ],
    "expenses": [
      {"date":"2026-07-01","amount":1500,"category":"Investment","name":"Stocks","notes":""},
      {"date":"2026-07-01","amount":1000,"category":"Emergency","name":"Emergency Fund","notes":""},
      {"date":"2026-07-01","amount":3000,"category":"Family","name":"ครอบครัว","notes":""},
      {"date":"2026-07-01","amount":1500,"category":"Rent","name":"ค่าเช่า","notes":""},
      {"date":"2026-07-01","amount":762,"category":"Subscriptions","name":"Adobe","notes":"Creative Cloud"},
      {"date":"2026-07-01","amount":79,"category":"Subscriptions","name":"Spotify","notes":"Premium Student"},
      {"date":"2026-07-01","amount":8,"category":"Restaurant","name":"น้ำเต้าหู้","notes":""}
    ]
  }
};
window.MONEY_KEYS = ["2026-07"];
window.MONEY_UPDATED = "01/07/2026";

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
    "income": [
      {"date":"2026-07-01","amount":14728,"source":"Salary","name":"เงินเดือน","notes":""}
    ],
    "expenses": [
      {"date":"2026-07-01","amount":1500,"category":"Investment","name":"Stocks","notes":""},
      {"date":"2026-07-01","amount":1000,"category":"Emergency Fund","name":"Crypto","notes":""},
      {"date":"2026-07-01","amount":3000,"category":"Family","name":"Father","notes":""},
      {"date":"2026-07-01","amount":1500,"category":"Rent","name":"ค่าเช่า","notes":""},
      {"date":"2026-07-01","amount":762,"category":"Subscriptions","name":"Adobe","notes":"Creative Cloud"},
      {"date":"2026-07-01","amount":79,"category":"Subscriptions","name":"Spotify","notes":"Premium Student"},
      {"date":"2026-07-01","amount":114,"category":"Restaurant","name":"Bonchon","notes":""},
      {"date":"2026-07-01","amount":300,"category":"Shopping","name":"Kiprun นาฬิกาจับเวลา","notes":""},
      {"date":"2026-07-01","amount":130,"category":"Shopping","name":"Janua Perfume","notes":""},
      {"date":"2026-07-03","amount":45,"category":"Restaurant","name":"ข้าวไก่ทอด","notes":""},
      {"date":"2026-07-03","amount":8,"category":"Restaurant","name":"น้ำเต้าหู้","notes":""},
      {"date":"2026-07-04","amount":20,"category":"Restaurant","name":"สับปะรด","notes":""},
      {"date":"2026-07-04","amount":40,"category":"Restaurant","name":"ข้าวปลานิล","notes":""},
      {"date":"2026-07-05","amount":25,"category":"Restaurant","name":"ข้าวเหนียวไก่คลุกฝุ่น","notes":""},
      {"date":"2026-07-05","amount":25,"category":"Restaurant","name":"ข้าวเหนียวไก่แหนม","notes":""},
      {"date":"2026-07-05","amount":50,"category":"Restaurant","name":"บะหมี่เกี๊ยว","notes":""},
      {"date":"2026-07-06","amount":25,"category":"Restaurant","name":"นมชมพู","notes":""},
      {"date":"2026-07-06","amount":40,"category":"Restaurant","name":"สุกี้แห้ง","notes":""}
    ]
  }
};
window.MONEY_KEYS = ["2026-07"];
window.MONEY_UPDATED = "06/07/2026";

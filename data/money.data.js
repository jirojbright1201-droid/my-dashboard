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
      {"date":"2026-07-01","amount":14728,"source":"Salary","name":"Salary","name_th":"เงินเดือน","notes":""}
    ],
    "expenses": [
      {"date":"2026-07-01","amount":1500,"category":"Investment","name":"Stocks","notes":""},
      {"date":"2026-07-01","amount":1000,"category":"Emergency Fund","name":"Crypto","notes":""},
      {"date":"2026-07-01","amount":3000,"category":"Family","name":"Father","notes":""},
      {"date":"2026-07-01","amount":1500,"category":"Rent","name":"Rent","name_th":"ค่าเช่า","notes":""},
      {"date":"2026-07-01","amount":762,"category":"Subscriptions","name":"Adobe","notes":"Creative Cloud Student Plan"},
      {"date":"2026-07-01","amount":79,"category":"Subscriptions","name":"Spotify","notes":"Premium Student Plan"},
      {"date":"2026-07-01","amount":114,"category":"Restaurant","name":"Bonchon","notes":""},
      {"date":"2026-07-01","amount":300,"category":"Shopping","name":"Kiprun stopwatch","name_th":"นาฬิกาจับเวลา","notes":""},
      {"date":"2026-07-01","amount":130,"category":"Shopping","name":"Janua Perfume","notes":""},
      {"date":"2026-07-03","amount":45,"category":"Restaurant","name":"Fried chicken rice","name_th":"ข้าวไก่ทอด","notes":""},
      {"date":"2026-07-03","amount":8,"category":"Restaurant","name":"Soy milk","name_th":"น้ำเต้าหู้","notes":""},
      {"date":"2026-07-04","amount":20,"category":"Restaurant","name":"Pineapple","name_th":"สับปะรด","notes":""},
      {"date":"2026-07-04","amount":40,"category":"Restaurant","name":"Tilapia rice","name_th":"ข้าวปลานิล","notes":""},
      {"date":"2026-07-05","amount":25,"category":"Restaurant","name":"Sticky rice, crispy fried chicken","name_th":"ข้าวเหนียวไก่คลุกฝุ่น","notes":""},
      {"date":"2026-07-05","amount":25,"category":"Restaurant","name":"Sticky rice, nam fried chicken","name_th":"ข้าวเหนียวไก่แหนม","notes":""},
      {"date":"2026-07-05","amount":50,"category":"Restaurant","name":"Wonton noodles","name_th":"บะหมี่เกี๊ยว","notes":""},
      {"date":"2026-07-06","amount":25,"category":"Restaurant","name":"Pink milk","name_th":"นมชมพู","notes":""},
      {"date":"2026-07-06","amount":40,"category":"Restaurant","name":"Dry suki","name_th":"สุกี้แห้ง","notes":""},
      {"date":"2026-07-07","amount":732,"category":"Subscriptions","name":"Claude","notes":"Pro Plan"},
      {"date":"2026-07-07","amount":139,"category":"Shopping","name":"Phone case","name_th":"เคสโทรศัพท์","notes":""},
      {"date":"2026-07-07","amount":25,"category":"Restaurant","name":"Thai tea","name_th":"ชาไทย","notes":""},
      {"date":"2026-07-07","amount":50,"category":"Restaurant","name":"Sticky rice, dry-chili fried chicken","name_th":"ข้าวเหนียวไก่พริกแห้ง","notes":""},
      {"date":"2026-07-08","amount":37,"category":"Restaurant","name":"Fried chicken sandwich","name_th":"แซนวิชไก่ทอด","notes":""},
      {"date":"2026-07-08","amount":52,"category":"Transport","name":"Missed Order","notes":""},
      {"date":"2026-07-08","amount":10,"category":"Restaurant","name":"Plain rice","name_th":"ข้าวเปล่า","notes":""},
      {"date":"2026-07-08","amount":50,"category":"Restaurant","name":"Spicy mama noodle salad","name_th":"ยำมาม่า","notes":""},
      {"date":"2026-07-08","amount":25,"category":"Restaurant","name":"Sticky rice, Korean fried chicken","name_th":"ข้าวเหนียวไก่เกาหลี","notes":""},
      {"date":"2026-07-09","amount":40,"category":"Restaurant","name":"Grilled saba rice","name_th":"ข้าวปลาซาบะ","notes":""},
      {"date":"2026-07-09","amount":25,"category":"Restaurant","name":"Thai tea","name_th":"ชาไทย","notes":""},
      {"date":"2026-07-10","amount":50,"category":"Restaurant","name":"Pad kra pao with fried egg","name_th":"ข้าวกระเพรา+ไข่ดาว","notes":""},
      {"date":"2026-07-10","amount":25,"category":"Restaurant","name":"Pink milk","name_th":"นมชมพู","notes":""},
      {"date":"2026-07-10","amount":60,"category":"Restaurant","name":"Special dry wonton noodles","name_th":"บะหมี่เกี๊ยวแห้งพิเศษ","notes":""},
      {"date":"2026-07-11","amount":50,"category":"Restaurant","name":"Fried chicken","name_th":"ไก่ทอด","notes":""},
      {"date":"2026-07-11","amount":10,"category":"Restaurant","name":"Sticky rice","name_th":"ข้าวเหนียว","notes":""},
      {"date":"2026-07-11","amount":50,"category":"Restaurant","name":"Dry wonton noodles","name_th":"บะหมี่เกี๊ยวแห้ง","notes":""},
      {"date":"2026-07-12","amount":20,"category":"Restaurant","name":"Watermelon","name_th":"แตงโม","notes":""},
      {"date":"2026-07-12","amount":20,"category":"Restaurant","name":"Cantaloupe","name_th":"แคนตาลูป","notes":""},
      {"date":"2026-07-12","amount":16,"category":"Restaurant","name":"Soy milk","name_th":"น้ำเต้าฮู้","notes":""},
      {"date":"2026-07-13","amount":50,"category":"Restaurant","name":"Grilled pork rice","name_th":"ข้าวหมูย่าง","notes":""},
      {"date":"2026-07-13","amount":20,"category":"Restaurant","name":"Green tea","name_th":"ชาเขียว","notes":""},
      {"date":"2026-07-13","amount":40,"category":"Restaurant","name":"Nam tok salad","name_th":"น้ำตก","notes":""},
      {"date":"2026-07-13","amount":10,"category":"Restaurant","name":"Sticky rice","name_th":"ข้าวเหนียว","notes":""}
    ]
  }
};
window.MONEY_KEYS = ["2026-07"];
window.MONEY_UPDATED = "14/07/2026";

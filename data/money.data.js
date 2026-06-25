// ── Money Tracker — bake จาก Obsidian vault (Money Tracker/YYYY/MM/) ──
// schema ต่อเดือน: { budget:{หมวด:งบ}, income:[{date,amount,source,name,notes}], expenses:[{date,amount,category,name,notes}] }
// source = vault markdown, ไฟล์นี้ = ตัว deploy. CRUD เล็กแก้ที่นี่ + vault แล้ว push
window.MONEY_DATA = {
  "2026-06": {
    "budget": {
      "Restaurant": 3000, "Family": 3000, "Subscriptions": 2000, "Rent": 1500,
      "Investment": 1000, "Shopping": 500, "Beauty": 0, "Books": 500,
      "Entertainment": 0, "Study": 0, "Transport": 100, "Emergency": 0
    },
    "income": [
      {"date":"2026-06-01","amount":12880,"source":"Salary","name":"เงินเดือน","notes":""},
      {"date":"2026-06-01","amount":3000,"source":"Other","name":"ป้าเอื้อมให้เงิน","notes":""}
    ],
    "expenses": [
      {"date":"2026-06-01","amount":762,"category":"Subscriptions","name":"Adobe","notes":""},
      {"date":"2026-06-01","amount":79,"category":"Subscriptions","name":"Spotify","notes":""},
      {"date":"2026-06-01","amount":59,"category":"Restaurant","name":"กระเพราไส้กรอก","notes":""},
      {"date":"2026-06-01","amount":10,"category":"Restaurant","name":"น้ำเปล่า","notes":""},
      {"date":"2026-06-01","amount":65,"category":"Restaurant","name":"กาแฟพันธุ์ไทย","notes":""},
      {"date":"2026-06-01","amount":50,"category":"Restaurant","name":"ยำมาม่า","notes":""},
      {"date":"2026-06-01","amount":10,"category":"Restaurant","name":"ข้าวเปล่า","notes":""},
      {"date":"2026-06-01","amount":1500,"category":"Rent","name":"Rent","notes":""},
      {"date":"2026-06-01","amount":424,"category":"Subscriptions","name":"Internet","notes":""},
      {"date":"2026-06-01","amount":6500,"category":"Family","name":"ให้ Family","notes":""},
      {"date":"2026-06-02","amount":79,"category":"Restaurant","name":"ไก่ย่างห้าดาว","notes":""},
      {"date":"2026-06-02","amount":176,"category":"Shopping","name":"โคมไฟหัวเตียง","notes":""},
      {"date":"2026-06-02","amount":50,"category":"Restaurant","name":"บะหมี่เกี๊ยวแห้ง","notes":""},
      {"date":"2026-06-03","amount":25,"category":"Restaurant","name":"ข้าวเหนียวไก่ลาบ","notes":""},
      {"date":"2026-06-03","amount":25,"category":"Restaurant","name":"ข้าวเหนียวไก่เกาหลี","notes":""},
      {"date":"2026-06-03","amount":189,"category":"Shopping","name":"กระเป๋า Yuedpao","notes":""},
      {"date":"2026-06-03","amount":250,"category":"Subscriptions","name":"Debit card","notes":"annual"},
      {"date":"2026-06-03","amount":193,"category":"Books","name":"หนังสือไนปุรานเริกส์","notes":""},
      {"date":"2026-06-03","amount":193,"category":"Books","name":"หนังสือหนึ่งนับวันนิรันดร","notes":""},
      {"date":"2026-06-03","amount":51,"category":"Transport","name":"ค่าส่งหนังสือ","notes":""},
      {"date":"2026-06-03","amount":40,"category":"Restaurant","name":"น้ำตก","notes":""},
      {"date":"2026-06-03","amount":10,"category":"Restaurant","name":"ข้าวเหนียว","notes":""},
      {"date":"2026-06-04","amount":40,"category":"Restaurant","name":"ข้าวหมกไก่","notes":""},
      {"date":"2026-06-04","amount":40,"category":"Restaurant","name":"น้ำตก","notes":""},
      {"date":"2026-06-04","amount":10,"category":"Restaurant","name":"ข้าวเหนียว","notes":""},
      {"date":"2026-06-05","amount":40,"category":"Restaurant","name":"น้ำตก","notes":""},
      {"date":"2026-06-05","amount":10,"category":"Restaurant","name":"ข้าวเหนียว","notes":""},
      {"date":"2026-06-05","amount":25,"category":"Restaurant","name":"ชาเขียว","notes":""},
      {"date":"2026-06-05","amount":40,"category":"Restaurant","name":"ไส้กรอกทอด","notes":""},
      {"date":"2026-06-05","amount":15,"category":"Restaurant","name":"ข้าวสวยหอมมะลิ","notes":""},
      {"date":"2026-06-06","amount":1000,"category":"Investment","name":"Dime","notes":""},
      {"date":"2026-06-06","amount":40,"category":"Restaurant","name":"ผัดไทย","notes":""},
      {"date":"2026-06-06","amount":50,"category":"Restaurant","name":"ทาโกะยากิ","notes":""},
      {"date":"2026-06-07","amount":40,"category":"Restaurant","name":"ข้าวราดแกง","notes":""},
      {"date":"2026-06-07","amount":76,"category":"Shopping","name":"หลอดไฟ","notes":""},
      {"date":"2026-06-07","amount":722,"category":"Subscriptions","name":"Claude","notes":""},
      {"date":"2026-06-08","amount":40,"category":"Restaurant","name":"ข้าวราดแกง","notes":""},
      {"date":"2026-06-08","amount":45,"category":"Restaurant","name":"ข้าวราดแกง","notes":""},
      {"date":"2026-06-09","amount":59,"category":"Restaurant","name":"กระเพราไส้กรอก","notes":""},
      {"date":"2026-06-09","amount":17,"category":"Restaurant","name":"โออิชิ","notes":""},
      {"date":"2026-06-09","amount":52,"category":"Restaurant","name":"กระเพราไก่กรอบ","notes":""},
      {"date":"2026-06-09","amount":51,"category":"Restaurant","name":"ข้าวยำไก่แซ่บ","notes":""},
      {"date":"2026-06-10","amount":50,"category":"Restaurant","name":"ก๋วยเตี๋ยวผัดซอสญี่ปุ่น","notes":""},
      {"date":"2026-06-10","amount":35,"category":"Restaurant","name":"ชาไทย","notes":""},
      {"date":"2026-06-11","amount":50,"category":"Restaurant","name":"ข้าวหน้าเนื้อผัดซอสญี่ปุ่น","notes":""},
      {"date":"2026-06-11","amount":45,"category":"Restaurant","name":"ชาไทยชีส","notes":""},
      {"date":"2026-06-11","amount":40,"category":"Restaurant","name":"ไส้กรอกทอด","notes":""},
      {"date":"2026-06-12","amount":50,"category":"Restaurant","name":"ข้าวหน้าเนื้อผัดซอสญี่ปุ่น","notes":""},
      {"date":"2026-06-12","amount":29,"category":"Restaurant","name":"ชานมไข่มุก","notes":""},
      {"date":"2026-06-12","amount":50,"category":"Restaurant","name":"บะหมี่เกี๊ยวแห้ง","notes":""},
      {"date":"2026-06-13","amount":35,"category":"Restaurant","name":"ชาเขียว","notes":""},
      {"date":"2026-06-14","amount":25,"category":"Restaurant","name":"น้ำเสาวรส","notes":""},
      {"date":"2026-06-14","amount":50,"category":"Restaurant","name":"ข้าวหน้าเนื้อผัดซอสญี่ปุ่น","notes":""},
      {"date":"2026-06-15","amount":60,"category":"Restaurant","name":"ข้าวหน้าเนื้อผัดซอสเกาหลี","notes":""},
      {"date":"2026-06-15","amount":35,"category":"Restaurant","name":"นมชมพู","notes":""},
      {"date":"2026-06-15","amount":50,"category":"Restaurant","name":"บะหมี่เกี๊ยวแห้ง","notes":""},
      {"date":"2026-06-16","amount":40,"category":"Restaurant","name":"น้ำตก","notes":""},
      {"date":"2026-06-16","amount":10,"category":"Restaurant","name":"ข้าวเหนียว","notes":""},
      {"date":"2026-06-16","amount":40,"category":"Restaurant","name":"ผัดไทย","notes":""},
      {"date":"2026-06-16","amount":40,"category":"Restaurant","name":"ไส้กรอกทอด","notes":""},
      {"date":"2026-06-16","amount":37,"category":"Restaurant","name":"มักกะโรนีชีสและไส้กรอก","notes":""}
    ]
  }
};
window.MONEY_KEYS = ["2026-06"];
window.MONEY_UPDATED = "16/06/2026";

// ── Money Tracker — bake จาก Obsidian vault (Money Tracker/YYYY/MM/) ──
// schema ต่อเดือน: { budget:{หมวด:งบ}, income:[{date,amount,source,name,notes}], expenses:[{date,amount,category,name,notes}] }
// source = vault markdown, ไฟล์นี้ = ตัว deploy. CRUD เล็กแก้ที่นี่ + vault แล้ว push
window.MONEY_DATA = {
  "2026-08": {
    "budget": {
      "Restaurant": 3000,
      "Transport": 300,
      "Family": 3000,
      "Shopping": 500,
      "Investment": 500,
      "Study": 300,
      "Entertainment": 200,
      "Emergency Fund": 500,
      "Beauty": 300,
      "Rent": 2800,
      "Subscriptions": 2050
    },
    "income": [
      { "date": "2026-08-01", "amount": 11679, "source": "Salary", "name": "Salary", "name_th": "เงินเดือน", "notes": "" },
      { "date": "2026-08-01", "amount": 3000, "source": "Other", "name": "Transfer from family", "name_th": "รับโอนจากครอบครัว", "notes": "" }
    ],
    "expenses": [
      { "date": "2026-08-01", "amount": 3000, "category": "Family", "name": "Transfer to family", "name_th": "โอนเงินให้ครอบครัว", "notes": "" },
      { "date": "2026-08-01", "amount": 762, "category": "Subscriptions", "name": "Adobe Creative Cloud", "name_th": "", "notes": "" },
      { "date": "2026-08-01", "amount": 79, "category": "Subscriptions", "name": "Spotify Premium", "name_th": "", "notes": "" },
      { "date": "2026-08-03", "amount": 2800, "category": "Rent", "name": "Room deposit", "name_th": "ค่ามัดจำห้อง", "notes": "" }
    ]
  }
};
window.MONEY_KEYS = ["2026-08"];
window.MONEY_UPDATED = "03/08/2026";

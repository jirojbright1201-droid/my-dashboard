// ── Money Tracker — bake จาก Obsidian vault (Money Tracker/YYYY/MM/) ──
// schema ต่อเดือน: { budget:{หมวด:งบ}, income:[{date,amount,source,name,notes}], expenses:[{date,amount,category,name,notes}] }
// source = vault markdown, ไฟล์นี้ = ตัว deploy. CRUD เล็กแก้ที่นี่ + vault แล้ว push
window.MONEY_DATA = {
  "2026-08": {
    "budget": {},
    "income": [
      { "date": "2026-08-01", "amount": 14679, "source": "Salary", "name": "Salary", "name_th": "เงินเดือน", "notes": "" },
      { "date": "2026-08-01", "amount": 3000, "source": "Other", "name": "Transfer from family", "name_th": "รับโอนจากครอบครัว", "notes": "" }
    ],
    "expenses": [
      { "date": "2026-08-01", "amount": 3000, "category": "Family", "name": "Transfer to family", "name_th": "โอนเงินให้ครอบครัว", "notes": "" }
    ]
  }
};
window.MONEY_KEYS = ["2026-08"];
window.MONEY_UPDATED = "03/08/2026";

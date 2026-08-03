// ── Money Tracker — bake จาก Obsidian vault (Money Tracker/YYYY/MM/) ──
// schema ต่อเดือน: { budget:{หมวด:งบ}, income:[{date,amount,source,name,notes}], expenses:[{date,amount,category,name,notes}] }
// source = vault markdown, ไฟล์นี้ = ตัว deploy. CRUD เล็กแก้ที่นี่ + vault แล้ว push
window.MONEY_DATA = {
  "2026-08": {
    "budget": {
      "Restaurant": 3000,
      "Transport": 300,
      "Family": 3000,
      "Shopping": 300,
      "Investment": 500,
      "Study": 0,
      "Entertainment": 132,
      "Emergency Fund": 500,
      "Beauty": 300,
      "Rent": 5600,
      "Subscriptions": 2000,
      "Laundry": 300,
      "Utilities": 0
    },
    "income": [
      { "date": "2026-08-01", "amount": 14435, "source": "Salary", "name": "Salary", "name_th": "เงินเดือน", "notes": "" },
      { "date": "2026-08-01", "amount": 3000, "source": "Other", "name": "Transfer from family", "name_th": "รับโอนจากครอบครัว", "notes": "" }
    ],
    "expenses": [
      { "date": "2026-08-01", "amount": 3000, "category": "Family", "name": "Transfer to family", "name_th": "โอนเงินให้ครอบครัว", "notes": "" },
      { "date": "2026-08-01", "amount": 762, "category": "Subscriptions", "name": "Adobe Creative Cloud", "name_th": "", "notes": "" },
      { "date": "2026-08-01", "amount": 79, "category": "Subscriptions", "name": "Spotify Premium", "name_th": "", "notes": "" },
      { "date": "2026-08-01", "amount": 50, "category": "Restaurant", "name": "Soy sauce pork rice", "name_th": "ข้าวหมูซีอิ๋ว", "notes": "" },
      { "date": "2026-08-01", "amount": 25, "category": "Restaurant", "name": "Thai tea", "name_th": "ชาไทย", "notes": "" },
      { "date": "2026-08-01", "amount": 60, "category": "Restaurant", "name": "Grilled pork with sticky rice", "name_th": "ข้าวเหนียวหมูปิ้ง", "notes": "" },
      { "date": "2026-08-01", "amount": 50, "category": "Restaurant", "name": "Fried sausage", "name_th": "ไส้กรอกทอด", "notes": "" },
      { "date": "2026-08-02", "amount": 40, "category": "Transport", "name": "Grab (return missed order)", "name_th": "Grab ส่งคืน Order ผิด", "notes": "" },
      { "date": "2026-08-02", "amount": 80, "category": "Laundry", "name": "Hot water laundry 14kg", "name_th": "ซักผ้าน้ำร้อน 14 Kg", "notes": "" },
      { "date": "2026-08-02", "amount": 70, "category": "Restaurant", "name": "Five Star grilled chicken", "name_th": "ไก่ย่างห้าดาว", "notes": "" },
      { "date": "2026-08-02", "amount": 132, "category": "Entertainment", "name": "Blood Strike top-up", "name_th": "เติมเกม Blood Strike", "notes": "" },
      { "date": "2026-08-01", "amount": 2800, "category": "Rent", "name": "Room deposit", "name_th": "ค่ามัดจำห้อง", "notes": "" },
      { "date": "2026-08-01", "amount": 2800, "category": "Rent", "name": "Monthly rent", "name_th": "ค่าเช่าห้อง", "notes": "" },
      { "date": "2026-08-01", "amount": 30, "category": "Shopping", "name": "Lenuo phone case with stand (installment 1/5)", "name_th": "เคสโทรศัพท์ Lenuo พร้อมที่ตั้งโทรศัพท์ (ผ่อนงวด 1/5)", "notes": "" },
      { "date": "2026-08-01", "amount": 43, "category": "Shopping", "name": "Fertilizer sack bag 50g (installment 1/5)", "name_th": "กระสอบถุงปุ๋ย 50 กรัม (ผ่อนงวด 1/5)", "notes": "" },
      { "date": "2026-08-01", "amount": 64, "category": "Shopping", "name": "Kiprun stopwatch (installment 1/5)", "name_th": "นาฬิกาจับเวลา Kiprun (ผ่อนงวด 1/5)", "notes": "" },
      { "date": "2026-08-01", "amount": 28, "category": "Beauty", "name": "Janua Perfume (installment 1/5)", "name_th": "น้ำหอม Janua (ผ่อนงวด 1/5)", "notes": "" },
      { "date": "2026-08-01", "amount": 114, "category": "Restaurant", "name": "Bonchon", "name_th": "", "notes": "" },
      { "date": "2026-08-01", "amount": 78, "category": "Transport", "name": "Grab (return missed order)", "name_th": "Grab ส่งคืน Order ผิด", "notes": "" },
      { "date": "2026-08-02", "amount": 49, "category": "Transport", "name": "Grab (return missed order)", "name_th": "Grab ส่งคืน Order ผิด", "notes": "" },
      { "date": "2026-08-01", "amount": 61, "category": "Transport", "name": "Grab (return missed order)", "name_th": "Grab ส่งคืน Order ผิด", "notes": "" },
      { "date": "2026-08-03", "amount": 40, "category": "Restaurant", "name": "Rice with curry", "name_th": "ข้าวราดแกง", "notes": "" },
      { "date": "2026-08-03", "amount": 25, "category": "Restaurant", "name": "Kanom krok", "name_th": "ขนมครก", "notes": "" },
      { "date": "2026-08-03", "amount": 25, "category": "Restaurant", "name": "Thai tea", "name_th": "ชาไทย", "notes": "" },
      { "date": "2026-08-03", "amount": 255, "category": "Shopping", "name": "Insulated tumbler", "name_th": "แก้วเก็บความเย็น", "notes": "" }
    ]
  }
};
window.MONEY_KEYS = ["2026-08"];
window.MONEY_UPDATED = "03/08/2026";


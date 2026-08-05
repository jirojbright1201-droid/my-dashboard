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
      "Investment": 1000,
      "Study": 1000,
      "Entertainment": 135,
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
      { "date": "2026-08-01", "amount": 28, "category": "Shopping", "name": "Janua Perfume (installment 1/5)", "name_th": "น้ำหอม Janua (ผ่อนงวด 1/5)", "notes": "" },
      { "date": "2026-08-01", "amount": 114, "category": "Restaurant", "name": "Bonchon", "name_th": "", "notes": "" },
      { "date": "2026-08-01", "amount": 78, "category": "Transport", "name": "Grab (return missed order)", "name_th": "Grab ส่งคืน Order ผิด", "notes": "" },
      { "date": "2026-08-02", "amount": 49, "category": "Transport", "name": "Grab (return missed order)", "name_th": "Grab ส่งคืน Order ผิด", "notes": "" },
      { "date": "2026-08-01", "amount": 61, "category": "Transport", "name": "Grab (return missed order)", "name_th": "Grab ส่งคืน Order ผิด", "notes": "" },
      { "date": "2026-08-03", "amount": 40, "category": "Restaurant", "name": "Rice with curry", "name_th": "ข้าวราดแกง", "notes": "" },
      { "date": "2026-08-03", "amount": 25, "category": "Restaurant", "name": "Kanom krok", "name_th": "ขนมครก", "notes": "" },
      { "date": "2026-08-03", "amount": 25, "category": "Restaurant", "name": "Thai tea", "name_th": "ชาไทย", "notes": "" },
      { "date": "2026-08-03", "amount": 255, "category": "Shopping", "name": "Insulated tumbler", "name_th": "แก้วเก็บความเย็น", "notes": "" },
      { "date": "2026-08-03", "amount": 60, "category": "Restaurant", "name": "Dry wonton noodles (special)", "name_th": "บะหมี่เกี๊ยวแห้ง (พิเศษ)", "notes": "" },
      { "date": "2026-08-03", "amount": 500, "category": "Emergency Fund", "name": "Emergency fund savings", "name_th": "เงินสำรองฉุกเฉิน", "notes": "" },
      { "date": "2026-08-04", "amount": 100, "category": "Study", "name": "YouTube membership (Longtoon Daily)", "name_th": "Member ช่องยูทูป \"ลงทุน Daily\"", "notes": "" },
      { "date": "2026-08-04", "amount": 50, "category": "Restaurant", "name": "Stir-fried basil rice with fried egg", "name_th": "ข้าวกระเพราไข่ดาว", "notes": "" },
      { "date": "2026-08-04", "amount": 15, "category": "Restaurant", "name": "Mineral water (7-Eleven)", "name_th": "น้ำแร่เซเว่น", "notes": "" },
      { "date": "2026-08-04", "amount": 300, "category": "Beauty", "name": "Haircut", "name_th": "ตัดผม", "notes": "" },
      { "date": "2026-08-04", "amount": 330, "category": "Shopping", "name": "Photo shoot (digital file) for job application", "name_th": "ถ่ายรูป (ไฟล์ดิจิตอล) ไว้ใช้สมัครงาน", "notes": "" },
      { "date": "2026-08-04", "amount": 70, "category": "Restaurant", "name": "Curry powder fried rice with crispy pork", "name_th": "ข้าวผัดผงกระหรี่หมูกรอบ", "notes": "" },
      { "date": "2026-08-04", "amount": 35, "category": "Restaurant", "name": "Longan juice", "name_th": "น้ำลำไย", "notes": "" },
      { "date": "2026-08-04", "amount": 25, "category": "Restaurant", "name": "7-Eleven sausage bread", "name_th": "ขนมปังไส้กรอกเซเว่น", "notes": "" },
      { "date": "2026-08-04", "amount": 20, "category": "Restaurant", "name": "M150 sparkling energy drink", "name_th": "", "notes": "" },
      { "date": "2026-08-05", "amount": 40, "category": "Restaurant", "name": "Rice with curry", "name_th": "ข้าวราดแกง", "notes": "" },
      { "date": "2026-08-05", "amount": 20, "category": "Restaurant", "name": "Thai tea", "name_th": "ชาไทย", "notes": "" },
      { "date": "2026-08-05", "amount": 1525, "category": "Study", "name": "Tuition fee", "name_th": "ค่าเทอม", "notes": "" }
    ]
  }
};
window.MONEY_KEYS = ["2026-08"];
window.MONEY_UPDATED = "05/08/2026";



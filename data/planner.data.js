// ── Planner data — baked from Obsidian vault (agent แตะไฟล์นี้ที่เดียว) ──
// source of truth: Obsidian\Planner\YYYY\MM\{Events,Habits}\
// schema:
//   events: {date:"YYYY-MM-DD", title, time:"HH:MM", end_time, notes}
//   habits: {habit:"exercise"|"read"|"water"|"sleep_early", done_dates:["YYYY-MM-DD", ...]}
window.PLANNER_DATA = {
  "2026-06": {
    "events": [
      {"date":"2026-06-06","title":"Work at McDonald's","time":"22:00","end_time":"","notes":""},
      {"date":"2026-06-07","title":"ทำความสะอาดห้อง","time":"08:00","end_time":"","notes":""},
      {"date":"2026-06-07","title":"อ่านหนังสือ","time":"09:30","end_time":"","notes":""},
      {"date":"2026-06-07","title":"Sleep","time":"10:00","end_time":"","notes":""},
      {"date":"2026-06-07","title":"ทำ Agent Workflow Youtube","time":"18:30","end_time":"","notes":""},
      {"date":"2026-06-07","title":"Work at McDonald's","time":"22:00","end_time":"07:00","notes":"กะดึก ข้ามไป 8 มิ.ย. 07:00"},
      {"date":"2026-06-08","title":"ทำบัตรประชาชน","time":"08:00","end_time":"09:30","notes":""},
      {"date":"2026-06-08","title":"Sleep","time":"10:00","end_time":"18:00","notes":""},
      {"date":"2026-06-09","title":"Work at McDonald's","time":"13:00","end_time":"22:00","notes":""},
      {"date":"2026-06-10","title":"Work at McDonald's","time":"13:00","end_time":"22:00","notes":""},
      {"date":"2026-06-11","title":"Work at McDonald's","time":"13:00","end_time":"22:00","notes":""},
      {"date":"2026-06-12","title":"Work at McDonald's","time":"13:00","end_time":"22:00","notes":""},
      {"date":"2026-06-13","title":"Work at McDonald's","time":"13:00","end_time":"22:00","notes":""},
      {"date":"2026-06-14","title":"Work at McDonald's","time":"13:00","end_time":"22:00","notes":""},
      {"date":"2026-06-17","title":"Work at McDonald's","time":"22:00","end_time":"07:00","notes":""},
      {"date":"2026-06-23","title":"ออกกำลังกาย","time":"09:00","end_time":"09:45","notes":"วิ่ง + เวท"},
      {"date":"2026-06-23","title":"Work at McDonald's","time":"13:00","end_time":"22:00","notes":""},
      {"date":"2026-06-23","title":"อ่านหนังสือ","time":"21:30","end_time":"22:00","notes":"ก่อนนอน"}
    ],
    "habits": [
      {"habit":"exercise","done_dates":[]},
      {"habit":"read","done_dates":[]},
      {"habit":"water","done_dates":[]},
      {"habit":"sleep_early","done_dates":[]}
    ]
  },
  "2026-07": {
    "events": [
      {"date":"2026-07-01","title":"เช็คลิสต์เงินต้นเดือน","time":"09:00","end_time":"","notes":"1) ตั้งงบเดือนใหม่ • 2) โอนเข้าโหลเก็บเงิน • 3) จ่ายบิล/ค่าสมัครประจำ • 4) รีวิวเดือนที่แล้ว"}
    ],
    "habits": [
      {"habit":"exercise","done_dates":[]},
      {"habit":"read","done_dates":[]},
      {"habit":"water","done_dates":[]},
      {"habit":"sleep_early","done_dates":[]}
    ]
  }
};
window.PLANNER_KEYS = ["2026-06","2026-07"];
window.PLANNER_UPDATED = "26/06/2026";

// ── Planner data — baked from Obsidian vault (agent แตะไฟล์นี้ที่เดียว) ──
// source of truth: Obsidian\Planner\YYYY\MM\{Events,Habits}\
// schema:
//   events: {date:"YYYY-MM-DD", title, time:"HH:MM", end_time, est, notes}
//   habits: {habit:"exercise"|"read"|"water"|"sleep_early", done_dates:["YYYY-MM-DD", ...]}
window.PLANNER_DATA = {
  "2026-06": {
    "events": [
      {"date":"2026-06-06","title":"Work at McDonald's","time":"22:00","end_time":"","est":"9h","notes":""},
      {"date":"2026-06-07","title":"ทำความสะอาดห้อง","time":"08:00","end_time":"","est":"1h","notes":""},
      {"date":"2026-06-07","title":"อ่านหนังสือ","time":"09:30","end_time":"","est":"30m","notes":""},
      {"date":"2026-06-07","title":"Sleep","time":"10:00","end_time":"","est":"8h","notes":""},
      {"date":"2026-06-07","title":"ทำ Agent Workflow Youtube","time":"18:30","end_time":"","est":"2h","notes":""},
      {"date":"2026-06-07","title":"Work at McDonald's","time":"22:00","end_time":"07:00","est":"9h","notes":"กะดึก ข้ามไป 8 มิ.ย. 07:00"},
      {"date":"2026-06-08","title":"ทำบัตรประชาชน","time":"08:00","end_time":"09:30","est":"1h30m","notes":""},
      {"date":"2026-06-08","title":"Sleep","time":"10:00","end_time":"18:00","est":"8h","notes":""},
      {"date":"2026-06-09","title":"Work at McDonald's","time":"13:00","end_time":"22:00","est":"9h","notes":""},
      {"date":"2026-06-10","title":"Work at McDonald's","time":"13:00","end_time":"22:00","est":"9h","notes":""},
      {"date":"2026-06-11","title":"Work at McDonald's","time":"13:00","end_time":"22:00","est":"9h","notes":""},
      {"date":"2026-06-12","title":"Work at McDonald's","time":"13:00","end_time":"22:00","est":"9h","notes":""},
      {"date":"2026-06-13","title":"Work at McDonald's","time":"13:00","end_time":"22:00","est":"9h","notes":""},
      {"date":"2026-06-14","title":"Work at McDonald's","time":"13:00","end_time":"22:00","est":"9h","notes":""},
      {"date":"2026-06-17","title":"Work at McDonald's","time":"22:00","end_time":"07:00","est":"9h","notes":""},
      {"date":"2026-06-23","title":"ออกกำลังกาย","time":"09:00","end_time":"09:45","est":"45m","notes":"วิ่ง + เวท"},
      {"date":"2026-06-23","title":"Work at McDonald's","time":"13:00","end_time":"22:00","est":"9h","notes":""},
      {"date":"2026-06-23","title":"อ่านหนังสือ","time":"21:30","end_time":"22:00","est":"30m","notes":"ก่อนนอน"}
    ],
    "habits": [
      {"habit":"exercise","done_dates":[]},
      {"habit":"read","done_dates":[]},
      {"habit":"water","done_dates":[]},
      {"habit":"sleep_early","done_dates":[]}
    ]
  }
};
window.PLANNER_KEYS = ["2026-06"];
window.PLANNER_UPDATED = "23/06/2026";

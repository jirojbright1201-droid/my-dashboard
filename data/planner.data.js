// ── Planner data — baked from Obsidian vault (agent แตะไฟล์นี้ที่เดียว) ──
// source of truth: Obsidian\Planner\YYYY\MM\{Events,Habits}\
// schema:
//   events: {date:"YYYY-MM-DD", title, time:"HH:MM", end_time, notes}
//   habits: {habit:"exercise"|"read"|"water"|"sleep_early", done_dates:["YYYY-MM-DD", ...]}
window.PLANNER_DATA = {
  "2026-07": {
    "events": [
      {"date":"2026-07-13","title":"ทำงาน","time":"07:00","end_time":"","notes":""},
      {"date":"2026-07-14","title":"เข้างาน","time":"22:00","end_time":"","notes":""},
      {"date":"2026-07-16","title":"กินข้าว","time":"08:00","end_time":"08:30","notes":""},
      {"date":"2026-07-16","title":"เล่นเกม","time":"08:30","end_time":"09:30","notes":""},
      {"date":"2026-07-16","title":"อาบน้ำ","time":"09:30","end_time":"09:40","notes":""},
      {"date":"2026-07-16","title":"อ่านหนังสือ","time":"09:40","end_time":"10:00","notes":""},
      {"date":"2026-07-16","title":"นอน","time":"10:00","end_time":"18:00","notes":""},
      {"date":"2026-07-16","title":"อาบน้ำ","time":"19:00","end_time":"19:10","notes":""},
      {"date":"2026-07-16","title":"กินข้าว","time":"21:30","end_time":"22:00","notes":""},
      {"date":"2026-07-16","title":"ทำงาน","time":"22:00","end_time":"07:00","notes":""}
    ],
    "habits": [
      {"habit":"read","done_dates":["2026-07-16"]},
      {"habit":"sleep_early","done_dates":["2026-07-16"]}
    ]
  }
};
window.PLANNER_KEYS = ["2026-07"];
window.PLANNER_UPDATED = "16/07/2026";

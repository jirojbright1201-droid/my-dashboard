// ── Planner data — baked from Obsidian vault (agent แตะไฟล์นี้ที่เดียว) ──
// source of truth: Obsidian\Planner\YYYY\MM\{Events,Habits}\
// schema:
//   events: {date:"YYYY-MM-DD", title, time:"HH:MM", end_time, icon, notes}
//     icon keys: mcdonalds|work|sleep|exercise|read|clean|doc|video|food|game|shower|default (ดู ICONS ใน planner.js)
//   habits: {habit:"exercise"|"read"|"water"|"sleep_early", done_dates:["YYYY-MM-DD", ...]}
window.PLANNER_DATA = {
  "2026-08": {
    "events": [
      {"date":"2026-08-03","title":"Work at McDonald's","time":"22:00","end_time":"07:00","icon":"mcdonalds","notes":""},
      {"date":"2026-08-04","title":"Eat","time":"07:30","end_time":"08:00","icon":"food","notes":""},
      {"date":"2026-08-04","title":"SetUp Ai","time":"08:00","end_time":"08:30","icon":"ai","notes":""},
      {"date":"2026-08-04","title":"Sleep","time":"08:30","end_time":"10:00","icon":"sleep","notes":""},
      {"date":"2026-08-04","title":"Haircut","time":"10:00","end_time":"11:30","icon":"haircut","notes":""},
      {"date":"2026-08-04","title":"Eat","time":"11:30","end_time":"12:00","icon":"food","notes":""},
      {"date":"2026-08-04","title":"Gaming","time":"12:00","end_time":"16:00","icon":"game","notes":""},
      {"date":"2026-08-04","title":"Sleep","time":"16:00","end_time":"21:30","icon":"sleep","notes":""},
      {"date":"2026-08-04","title":"Work at McDonald's","time":"22:00","end_time":"07:00","icon":"mcdonalds","notes":""},
      {"date":"2026-08-05","title":"Work at McDonald's","time":"23:00","end_time":"08:00","icon":"mcdonalds","notes":""},
      {"date":"2026-08-06","title":"Work at McDonald's","time":"22:00","end_time":"07:00","icon":"mcdonalds","notes":""},
      {"date":"2026-08-07","title":"Work at McDonald's","time":"22:00","end_time":"07:00","icon":"mcdonalds","notes":""},
      {"date":"2026-08-08","title":"Work at McDonald's","time":"22:00","end_time":"07:00","icon":"mcdonalds","notes":""}
    ],
    "habits": []
  }
};
window.PLANNER_KEYS = ["2026-08"];
window.PLANNER_UPDATED = "04/08/2026";


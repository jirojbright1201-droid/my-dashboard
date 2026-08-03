// ── Planner data — baked from Obsidian vault (agent แตะไฟล์นี้ที่เดียว) ──
// source of truth: Obsidian\Planner\YYYY\MM\{Events,Habits}\
// schema:
//   events: {date:"YYYY-MM-DD", title, time:"HH:MM", end_time, icon, notes}
//     icon keys: mcdonalds|work|sleep|exercise|read|clean|doc|video|food|game|shower|default (ดู ICONS ใน planner.js)
//   habits: {habit:"exercise"|"read"|"water"|"sleep_early", done_dates:["YYYY-MM-DD", ...]}
window.PLANNER_DATA = {
  "2026-08": {
    "events": [
      {"date":"2026-08-04","title":"นอน","time":"10:00","end_time":"18:00","icon":"sleep","notes":""}
    ],
    "habits": []
  }
};
window.PLANNER_KEYS = ["2026-08"];
window.PLANNER_UPDATED = "04/08/2026";

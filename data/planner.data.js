// ── Planner data — baked from Obsidian vault (agent แตะไฟล์นี้ที่เดียว) ──
// source of truth: Obsidian\Planner\YYYY\MM\{Events,Habits}\
// schema:
//   events: {date:"YYYY-MM-DD", title, time:"HH:MM", end_time, icon, notes}
//     icon keys: mcdonalds|work|sleep|exercise|read|clean|doc|video|food|game|shower|default (ดู ICONS ใน planner.js)
//   habits: {habit:"exercise"|"read"|"water"|"sleep_early", done_dates:["YYYY-MM-DD", ...]}
window.PLANNER_DATA = {
  "2026-08": {
    "events": [
      {"date":"2026-08-01","title":"ย้ายห้อง","time":"09:00","end_time":"","icon":"default","notes":""}
    ],
    "habits": []
  }
};
window.PLANNER_KEYS = ["2026-08"];
window.PLANNER_UPDATED = "26/07/2026";

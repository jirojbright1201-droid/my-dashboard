// ===== Left Hand Tracker — ฝึกใช้มือซ้าย (data สำหรับ views/lefthand.js) =====
// source ต้นทาง: Obsidian\Left Hand\Log.md (+ Notes.md สำหรับโน้ตเต็ม) — bake มาไฟล์นี้ทุกครั้งที่แก้ vault
// schema: flat list ต่อวัน (ไม่ผูกเดือนแบบ Money/Planner) — 1 วันมีได้แค่ 1 record คีย์ด้วย date, log ซ้ำวันเดียวกัน = แก้ record เดิม
// logs[].activities = [{name, minutes}] กิจกรรมที่ฝึกวันนั้น + ระยะเวลา (นาที)
// logs[].fluency = 1-5 ระดับความคล่อง เฉพาะวันที่ practiced=true (ไม่ฝึก = null)
// goal.streakTarget = เป้าหมาย streak วันติดต่อกัน (null = ยังไม่ตั้ง)
window.LEFTHAND_DATA = {
  "goal": { "streakTarget": null },
  "logs": []
};
window.LEFTHAND_UPDATED = "16/07/2026";

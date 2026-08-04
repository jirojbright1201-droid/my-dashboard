// ===== Rent > Calls module — บันทึกคุยกับเจ้าของห้อง (เพิ่ม 5 ส.ค. 2026) =====
// ตั้งใจไม่ให้เด่นในแอป (ดู views/rent.js renderDeposit — อยู่ท้ายแท็บ Deposit เป็นลิสต์เรียบๆ)
// คลิปเสียงจริงไม่เก็บในไฟล์นี้/repo นี้เด็ดขาด (repo dashboard เป็น public) — เก็บไว้ที่ Obsidian vault
// (repo private "jarvis-vault-backup", โฟลเดอร์ Rent\Calls\) แล้วอ้างชื่อไฟล์ไว้ที่ vaultFile เฉยๆ
// items[]: { id, date, topic, vaultFile (ชื่อไฟล์เสียงใน vault, ว่างได้ถ้าไม่มีการอัด), note }
window.RENT_CALLS_DATA = {
  items: []
};
window.RENT_CALLS_UPDATED = '';

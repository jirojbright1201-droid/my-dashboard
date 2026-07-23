// Investment Tracker — สรุปข่าวการลงทุน/การเงินโลกรายวัน (ไม่มี Obsidian vault: ค้นข่าวสดผ่าน WebSearch/WebFetch ทุกครั้ง)
// schema briefs: id/date/title/summary/macro/sourceName/url — append-only ต่อท้ายของเดิมทุกครั้งที่ sync ไม่ full-rebuild
// schema portfolioReviews: id/date/holdingsRaw/snapshot/allocation/macroLens/positives/concerns/discussion/caveats — append-only ต่อท้ายทุกครั้งที่รีวิวพอร์ตใหม่
// schema earningsReviews: id/date/ticker/company/quarter/reportDate/verdict/verdictLine/metrics/trend/guidance/positives/concerns/discussion/sources/caveats — append-only ต่อท้ายทุกครั้งที่รีวิวงบใหม่ (เพิ่ม 23 ก.ค. 2026)
window.INVESTMENT_DATA = {
  "briefs": [],
  "portfolioReviews": [],
  "earningsReviews": []
};

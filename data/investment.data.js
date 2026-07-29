// Investment Tracker — สรุปข่าวการลงทุน/การเงินโลกรายวัน (ไม่มี Obsidian vault: ค้นข่าวสดผ่าน WebSearch/WebFetch ทุกครั้ง)
// schema briefs: id/date/title/summary/macro/sourceName/url — append-only ต่อท้ายของเดิมทุกครั้งที่ sync ไม่ full-rebuild
// schema portfolioReviews: id/date/holdingsRaw/snapshot/allocation/macroLens/positives/concerns/discussion/caveats — append-only ต่อท้ายทุกครั้งที่รีวิวพอร์ตใหม่
// schema earningsReviews: id/date/ticker/company/quarter/reportDate/verdict/verdictLine/metrics/trend/guidance/positives/concerns/discussion/sources/caveats — append-only ต่อท้ายทุกครั้งที่รีวิวงบใหม่ (เพิ่ม 23 ก.ค. 2026) — ล้างข้อมูลเป็นค่าว่างแล้ว 30 ก.ค. 2026 ตามที่ jiroj ขอ
// schema companyDeepDives: id/date/ticker/company/sector/tagline/overview/technology/marketSummary/competitors/financialsSummary/financialMetrics/financialTrend/leadership/investors/catalysts/risks/caveats — append-only ต่อท้ายทุกครั้งที่รีเสิร์ชบริษัทใหม่ (เพิ่ม 24 ก.ค. 2026, ตัด analystSummary/ratingBuy/ratingHold/ratingSell/priceTarget*/sources ออก 24 ก.ค. 2026 — jiroj ขอเอา Analyst Sentiment กับ Sources ออกจาก dashboard) — ล้างข้อมูลเป็นค่าว่างแล้ว 30 ก.ค. 2026 ตามที่ jiroj ขอ
window.INVESTMENT_DATA = {
  "briefs": [],
  "portfolioReviews": [],
  "earningsReviews": [],
  "companyDeepDives": []
};
window.INVESTMENT_UPDATED = "30/07/2026";

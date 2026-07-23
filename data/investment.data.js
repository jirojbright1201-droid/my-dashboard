// Investment Tracker — สรุปข่าวการลงทุน/การเงินโลกรายวัน (ไม่มี Obsidian vault: ค้นข่าวสดผ่าน WebSearch/WebFetch ทุกครั้ง)
// schema briefs: id/date/title/summary/macro/sourceName/url — append-only ต่อท้ายของเดิมทุกครั้งที่ sync ไม่ full-rebuild
// schema portfolioReviews: id/date/holdingsRaw/snapshot/allocation/macroLens/positives/concerns/discussion/caveats — append-only ต่อท้ายทุกครั้งที่รีวิวพอร์ตใหม่
// schema earningsReviews: id/date/ticker/company/quarter/reportDate/verdict/verdictLine/metrics/trend/guidance/positives/concerns/discussion/sources/caveats — append-only ต่อท้ายทุกครั้งที่รีวิวงบใหม่ (เพิ่ม 23 ก.ค. 2026)
window.INVESTMENT_DATA = {
  "briefs": [],
  "portfolioReviews": [],
  "earningsReviews": [
    {
      "id": "er0001",
      "date": "2026-07-23",
      "ticker": "AEHR",
      "company": "Aehr Test Systems, Inc.",
      "quarter": "Q4 FY26",
      "reportDate": "2026-07-14",
      "verdict": "beat",
      "verdictLine": "พลิกจากขาดทุนเป็นกำไรและทำ revenue เหนือ consensus เล็กน้อย แต่ตัวที่ทำให้ตลาดตอบรับแรงจริงๆ คือยอด bookings ที่พุ่งกว่า 5 เท่าตัวจากปีก่อน และ guidance ปีงบ 2027 ที่สูงกว่าที่นักวิเคราะห์คาดไว้มาก",
      "metrics": [
        { "label": "Revenue", "actual": "$18.8M", "est": "~$18.7M", "deltaPct": "+0.7%", "dir": "pos" },
        { "label": "EPS (non-GAAP)", "actual": "$0.11", "est": "-$0.01", "deltaPct": "n/m", "dir": "pos" }
      ],
      "trend": [
        { "label": "Q1 FY26", "value": 11.0 },
        { "label": "Q2 FY26", "value": 9.9 },
        { "label": "Q3 FY26", "value": 10.3 },
        { "label": "Q4 FY26", "value": 18.8 }
      ],
      "guidance": {
        "priorLabel": "Street est. (FY27 revenue)",
        "priorVal": "~$85M",
        "newLabel": "New guide (FY27 revenue)",
        "newVal": "$130M–150M"
      },
      "positives": [
        { "label": "Demand", "note": "ดีมานด์เร่งตัวชัดใน AI processor, silicon photonics (optical I/O ใน data center) และ power semiconductor (SiC/GaN สำหรับรถยนต์ไฟฟ้า) ซึ่งตอนนี้เป็นสัดส่วนหลักของธุรกิจแล้ว" },
        { "label": "Bookings", "note": "bookings ทำสถิติใหม่ $60.7M (มากกว่า 5 เท่าของปีก่อน) และ backlog แตะระดับสูงสุด $80.6M (effective backlog $100.6M) ทำให้เห็นรายได้ล่วงหน้าชัดเจนขึ้นมาก" }
      ],
      "concerns": [
        { "label": "Full-year yoy", "note": "รายได้ทั้งปีงบ 2026 ยังหดตัวจากปีก่อน ($50.0M เทียบ $59.0M) และทั้งปีขาดทุนตาม GAAP — guidance ปี 2027 คือการเดิมพันกับจุดพลิกผันที่ยังไม่เกิดขึ้นจริงในตัวเลขทั้งปี" },
        { "label": "Concentration", "note": "guidance ที่โต 160-200% พึ่งพาดีมานด์ AI/data center ให้เร่งตัวต่อเนื่องตามแผน ถ้าจังหวะสั่งซื้อของลูกค้ารายใหญ่สะดุดแม้บางส่วน เป้าที่ตั้งไว้สูงมากจะเสี่ยงหลุดง่าย" }
      ],
      "discussion": [
        "backlog/effective backlog $100.6M จะแปลงเป็นรายได้จริงตามจังหวะที่บริษัทวางไว้หรือไม่",
        "ถ้า guidance ปีงบ 2027 พลาดแม้บางส่วน หุ้นที่เพิ่งปรับขึ้นแรงจาก guidance รอบนี้จะถูกกดดันมากแค่ไหน"
      ],
      "sources": [
        { "label": "Fiscal 2026 Q4 & full year earnings release (Jul 14, 2026)", "url": "https://www.aehr.com/2026/07/aehr-test-systems-reports-fiscal-2026-fourth-quarter-and-full-year-financial-results-with-record-quarterly-bookings-and-100-million-effective-backlog/", "domain": "aehr.com" },
        { "label": "AEHR beats Q4 earnings and revenue estimates", "url": "https://finance.yahoo.com/markets/stocks/articles/aehr-test-systems-aehr-beats-212001018.html", "domain": "finance.yahoo.com" }
      ],
      "caveats": "ข้อมูลนี้เพื่อประกอบการตัดสินใจ ไม่ใช่คำแนะนำการลงทุนโดยตรง ตัวเลขอ้างอิงจาก earnings release และแหล่งข่าวสาธารณะ ณ วันที่ 23 ก.ค. 2026 — ตัวเลข consensus ของ Revenue/EPS มาจาก Zacks Consensus Estimate ที่ระบุในรายงาน ไม่ใช่ตัวเลขที่คำนวณเอง"
    }
  ]
};
window.INVESTMENT_UPDATED = "23/07/2026";

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
      "verdictLine": "พลิกจากขาดทุนมาเป็นกำไร และทำรายได้แซงตัวเลขคาดการณ์ (consensus) ไปเล็กน้อย แต่สิ่งที่ทำให้ตลาดตอบรับแรงจริงๆ คือยอดคำสั่งซื้อ (bookings) ที่พุ่งกว่า 5 เท่าจากปีก่อน บวกกับประมาณการรายได้ (guidance) ปีงบ 2027 ที่บริษัทให้สูงกว่าที่นักวิเคราะห์คาดไว้มาก",
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
        { "label": "Demand", "note": "ดีมานด์เร่งตัวชัดเจนในกลุ่มชิปประมวลผล AI, silicon photonics (เทคโนโลยีรับส่งข้อมูลด้วยแสงในดาต้าเซ็นเตอร์) และ power semiconductor (ชิปกำลังไฟฟ้าตระกูล SiC/GaN สำหรับรถยนต์ไฟฟ้า) ซึ่งทั้งสามกลุ่มนี้กลายเป็นสัดส่วนหลักของธุรกิจไปแล้ว" },
        { "label": "Bookings", "note": "ยอดคำสั่งซื้อ (bookings) ทำสถิติใหม่ที่ $60.7 ล้าน มากกว่า 5 เท่าของปีก่อน ขณะที่งานในมือ (backlog) แตะระดับสูงสุดที่ $80.6 ล้าน (นับรวม effective backlog แล้วอยู่ที่ $100.6 ล้าน) ทำให้มองเห็นรายได้ล่วงหน้าชัดเจนขึ้นมาก" }
      ],
      "concerns": [
        { "label": "Full-year yoy", "note": "มองทั้งปีงบ 2026 รายได้ยังหดตัวจากปีก่อน ($50.0 ล้าน เทียบกับ $59.0 ล้าน) และทั้งปียังขาดทุนตามมาตรฐานบัญชี GAAP — ประมาณการปี 2027 จึงเป็นการเดิมพันกับจุดพลิกผันที่ยังไม่ปรากฏจริงในตัวเลขรวมทั้งปี" },
        { "label": "Concentration", "note": "เป้าการเติบโต 160-200% ที่บริษัทให้ไว้ พึ่งพาดีมานด์จากกลุ่ม AI และดาต้าเซ็นเตอร์ให้เร่งตัวต่อเนื่องตามแผนเป็นหลัก หากจังหวะสั่งซื้อของลูกค้ารายใหญ่สะดุดแม้เพียงบางส่วน เป้าที่ตั้งไว้สูงมากนี้ก็เสี่ยงหลุดได้ง่าย" }
      ],
      "discussion": [
        "งานในมือรวม (backlog และ effective backlog) มูลค่า $100.6 ล้าน จะแปลงเป็นรายได้จริงตามจังหวะที่บริษัทวางแผนไว้หรือไม่",
        "หากประมาณการปีงบ 2027 พลาดเป้าแม้เพียงบางส่วน หุ้นที่เพิ่งปรับขึ้นแรงจากตัวเลขรอบนี้จะถูกกดดันมากแค่ไหน"
      ],
      "sources": [
        { "label": "Fiscal 2026 Q4 & full year earnings release (Jul 14, 2026)", "url": "https://www.aehr.com/2026/07/aehr-test-systems-reports-fiscal-2026-fourth-quarter-and-full-year-financial-results-with-record-quarterly-bookings-and-100-million-effective-backlog/", "domain": "aehr.com" },
        { "label": "AEHR beats Q4 earnings and revenue estimates", "url": "https://finance.yahoo.com/markets/stocks/articles/aehr-test-systems-aehr-beats-212001018.html", "domain": "finance.yahoo.com" }
      ],
      "caveats": "ข้อมูลนี้ใช้ประกอบการตัดสินใจเท่านั้น ไม่ใช่คำแนะนำการลงทุนโดยตรง ตัวเลขอ้างอิงจากรายงานผลประกอบการ (earnings release) และแหล่งข่าวสาธารณะ ณ วันที่ 23 ก.ค. 2026 — ตัวเลขคาดการณ์ (consensus) ของ Revenue และ EPS มาจาก Zacks Consensus Estimate ที่ระบุไว้ในรายงาน ไม่ใช่ตัวเลขที่คำนวณขึ้นเอง"
    }
  ]
};
window.INVESTMENT_UPDATED = "23/07/2026";

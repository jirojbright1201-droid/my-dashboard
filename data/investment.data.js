// Investment Tracker — สรุปข่าวการลงทุน/การเงินโลกรายวัน (ไม่มี Obsidian vault: ค้นข่าวสดผ่าน WebSearch/WebFetch ทุกครั้ง)
// schema briefs: id/date/title/summary/macro/sourceName/url — append-only ต่อท้ายของเดิมทุกครั้งที่ sync ไม่ full-rebuild
// schema portfolioReviews: id/date/holdingsRaw/snapshot/allocation/macroLens/positives/concerns/discussion/caveats — append-only ต่อท้ายทุกครั้งที่รีวิวพอร์ตใหม่
// schema earningsReviews: id/date/ticker/company/quarter/reportDate/verdict/verdictLine/metrics/trend/guidance/positives/concerns/discussion/sources/caveats — append-only ต่อท้ายทุกครั้งที่รีวิวงบใหม่ (เพิ่ม 23 ก.ค. 2026) — ล้างข้อมูลเป็นค่าว่างแล้ว 30 ก.ค. 2026 ตามที่ jiroj ขอ
// schema companyDeepDives: id/date/ticker/company/sector/tagline/overview/technology/marketSummary/competitors/financialsSummary/financialMetrics/financialTrend/leadership/investors/catalysts/risks/caveats — append-only ต่อท้ายทุกครั้งที่รีเสิร์ชบริษัทใหม่ (เพิ่ม 24 ก.ค. 2026, ตัด analystSummary/ratingBuy/ratingHold/ratingSell/priceTarget*/sources ออก 24 ก.ค. 2026 — jiroj ขอเอา Analyst Sentiment กับ Sources ออกจาก dashboard) — ล้างข้อมูลเป็นค่าว่างแล้ว 30 ก.ค. 2026 ตามที่ jiroj ขอ
window.INVESTMENT_DATA = {
  "briefs": [
    {
      "id": "nw0001",
      "date": "2026-07-29",
      "title": "เฟดคงดอกเบี้ยที่ 3.50-3.75% เป็นครั้งที่ 5 ติดต่อกัน แม้เงินเฟ้อยังสูง กรรมการ 3 คนโหวตค้านขอขึ้นดอกเบี้ย",
      "summary": "คณะกรรมการนโยบายการเงินธนาคารกลางสหรัฐฯ (Federal Reserve) มีมติ 9 ต่อ 3 คงอัตราดอกเบี้ยนโยบายที่ 3.50-3.75% กรรมการ 3 คน (Beth Hammack, Neel Kashkari, Lorie Logan) โหวตค้านต้องการขึ้นดอกเบี้ยแทน เพราะเงินเฟ้อยังสูงกว่าเป้าหมาย 2% มานานกว่า 5 ปี ประธานเฟด Kevin Warsh ระบุกำลังจับตาความขัดแย้งทางทหารและการหยุดชะงักของอุปทานพลังงาน ตลาดหุ้นสหรัฐฯ ปรับตัวลงหลังประกาศ (Nasdaq -0.9%, Dow -1.6%, S&P 500 -0.7%) ขณะที่ทองคำขยับขึ้นรับข่าว",
      "macro": true,
      "sourceName": "Al Jazeera",
      "url": "https://www.aljazeera.com/economy/2026/7/29/us-fed-holds-interest-rates-steady-citing-elevated-inflation",
      "image": "https://www.aljazeera.com/wp-content/uploads/2026/07/reuters_6a6a2dbd-1785343421.jpg?resize=1920%2C1440",
      "topic": "fed"
    },
    {
      "id": "nw0002",
      "date": "2026-07-31",
      "title": "อิหร่านโจมตีฐานทัพสหรัฐฯ ในคูเวตและบาห์เรน หลังสหรัฐฯ ถล่มที่พักอาศัยบนเกาะเกชม์",
      "summary": "กองทัพอิหร่านแถลงว่าใช้โดรนโจมตีฐานทัพอากาศ Ahmad al-Jaber ในคูเวตและฐานทัพ Sheikh Isa ในบาห์เรน เพื่อตอบโต้การโจมตีของสหรัฐฯ ที่ทำให้ครอบครัวหนึ่งบนเกาะเกชม์เสียชีวิต คูเวตและบาห์เรนระบุว่าสกัดกั้นโดรน-ขีปนาวุธไว้ได้เกือบทั้งหมด ความขัดแย้งที่ลากยาวตั้งแต่ปลายเดือนกุมภาพันธ์ 2026 เริ่มลามไปยังอียิปต์ด้วย กระทบการเดินเรือผ่านช่องแคบฮอร์มุซและทะเลแดงอย่างหนัก",
      "macro": true,
      "sourceName": "Al Jazeera",
      "url": "https://www.aljazeera.com/news/2026/7/31/irgc-strikes-us-targets-in-kuwait-a-day-after-us-hits-iran-latest-events",
      "image": "https://www.aljazeera.com/wp-content/uploads/2026/07/afp_6a6c41bacc49-1785479610.jpg?resize=1920%2C1440",
      "topic": ""
    },
    {
      "id": "nw0003",
      "date": "2026-07-31",
      "title": "ราคาน้ำมันดิบพุ่งแตะ 85 ดอลลาร์ต่อบาร์เรล บวกกว่า 20% ในเดือนกรกฎาคม จากความเสี่ยงด้านอุปทานตะวันออกกลาง",
      "summary": "ราคาน้ำมันดิบขยับขึ้นแตะราว 85 ดอลลาร์สหรัฐต่อบาร์เรล ทำให้เดือนกรกฎาคม 2026 เป็นเดือนที่ราคาน้ำมันบวกแรงที่สุดนับตั้งแต่มีนาคม จากความกังวลเรื่องการขนส่งผ่านช่องแคบฮอร์มุซที่ลดฮวบจากสงครามสหรัฐฯ-อิหร่าน ประกอบกับกลุ่มฮูตีโจมตีเรือในทะเลแดงต่อเนื่อง โพลสำนักข่าว Reuters คาดราคาน้ำมันดิบ Brent เฉลี่ยทั้งปี 2026 จะอยู่ที่ 85.22 ดอลลาร์ นักวิเคราะห์มองความเสี่ยงภูมิรัฐศาสตร์จะยังหนุนราคาไปตลอดครึ่งปีหลัง",
      "macro": true,
      "sourceName": "Global Banking & Finance Review (Reuters poll)",
      "url": "https://www.globalbankingandfinance.com/oil-prices-seen-gaining-middle-east-supply-disruptions/",
      "image": "https://www.globalbankingandfinance.com/i/cloud-b6fca51f-9370-4604-93cd-d87c9f8a6ea2/width=1200,height=630,quality=80,format=auto,fit=cover/",
      "topic": "oil"
    },
    {
      "id": "nw0004",
      "date": "2026-07-31",
      "title": "ดัชนี PMI ภาคการผลิตจีนหดตัวเกินคาดในเดือนกรกฎาคม เหลือ 49.2 จุด ยุติการขยายตัว 4 เดือนติด",
      "summary": "ดัชนีผู้จัดการฝ่ายจัดซื้อ (PMI) ภาคการผลิตทางการของจีนลดลงมาอยู่ที่ 49.2 จุดในเดือนกรกฎาคม จาก 50.3 จุดในมิถุนายน ต่ำกว่าที่นักเศรษฐศาสตร์คาดไว้ที่ 50.11 จุด ถือเป็นการหดตัว (ต่ำกว่า 50 จุด) ครั้งแรกในรอบ 4 เดือน ดัชนีคำสั่งซื้อใหม่ร่วงลงมาที่ 48.5 จุด สะท้อนดีมานด์ในประเทศที่อ่อนแอ นักวิเคราะห์มองว่าทางการจีนจะเผชิญแรงกดดันให้ออกมาตรการกระตุ้นการคลังเพิ่มเติม",
      "macro": true,
      "sourceName": "South China Morning Post",
      "url": "https://www.scmp.com/economy/economic-indicators/article/3362490/chinas-manufacturing-sector-falters-july-growth-momentum-cools",
      "image": "https://cdn.i-scmp.com/sites/default/files/styles/og_image_scmp_generic/public/d8/images/canvas/2026/07/31/3e953a73-3d95-4aee-8566-6547a2263bd3_b8b80665.jpg",
      "topic": "china"
    },
    {
      "id": "nw0005",
      "date": "2026-07-30",
      "title": "Apple โชว์ผลประกอบการ Q3 ปีงบ 2026 รายได้ทะลุ 109.4 พันล้านดอลลาร์ โต 16% ทำสถิติไตรมาสมิถุนายนสูงสุด",
      "summary": "Apple รายงานรายได้ไตรมาส 3 ปีงบการเงิน 2026 ที่ 109.4 พันล้านดอลลาร์สหรัฐ เพิ่มขึ้น 16% จากปีก่อน กำไรสุทธิ 29.8 พันล้านดอลลาร์ กำไรต่อหุ้น (EPS) 2.02 ดอลลาร์ ทำสถิติไตรมาสมิถุนายนสูงสุดทุกกลุ่มผลิตภัณฑ์หลัก โดย iPhone ทำรายได้ 54.3 พันล้านดอลลาร์ โต 22% และ Services โต 12% แตะ 30.7 พันล้านดอลลาร์ CEO Tim Cook ระบุว่าเป็นไตรมาสมิถุนายนที่แข็งแกร่งที่สุดเท่าที่เคยมีมา",
      "macro": false,
      "sourceName": "9to5Mac",
      "url": "https://9to5mac.com/2026/07/30/apple-reports-q3-2026-earnings-109-4-billion-in-revenue-up-16/",
      "image": "https://tidbits.com/uploads/2026/07/Q3-2026-iPhone-revenue.png",
      "topic": "bigtech"
    },
    {
      "id": "nw0006",
      "date": "2026-07-30",
      "title": "Amazon กำไรพุ่ง รายได้ทะลุ 200 พันล้านดอลลาร์ครั้งแรก AWS โต 37% เร็วสุดในรอบ 18 ไตรมาส",
      "summary": "Amazon รายงานรายได้ไตรมาส 2 ปี 2026 ที่ 200.6 พันล้านดอลลาร์ โต 20% จากปีก่อน ถือเป็นครั้งแรกที่รายได้รายไตรมาสทะลุ 200 พันล้านดอลลาร์ ธุรกิจคลาวด์ AWS โตถึง 37% เร็วที่สุดในรอบ 18 ไตรมาส รายได้ 42.2 พันล้านดอลลาร์ อัตรากำไรจากการดำเนินงาน 39.4% บริษัทปรับเพิ่มงบลงทุน (capex) ปี 2026 เป็นราว 220 พันล้านดอลลาร์เพื่อรองรับโครงสร้างพื้นฐาน AI หุ้น Amazon พุ่งกว่า 9% หลังตลาดปิด",
      "macro": false,
      "sourceName": "Yahoo Finance",
      "url": "https://finance.yahoo.com/markets/stocks/articles/amazon-q2-2026-earnings-aws-204411872.html",
      "image": "https://s.yimg.com/lo/mysterio/api/AAAA4248C0F3929BD1B194F1705516B5CC2CC0E9CB1C7FE3E2418F5F6AB003D4/subgraphmysterio/resizefill_w1200_h675;quality_80;format_webp/https:%2F%2Fmedia.zenfs.com%2Fen%2Fquartz_855%2Fc3bc78077848bbb4b997a3f0b55d04bd",
      "topic": "bigtech"
    },
    {
      "id": "nw0007",
      "date": "2026-07-29",
      "title": "Microsoft ปิดปีงบ 2026 แกร่ง Azure โตทะลุ 100 พันล้านดอลลาร์เป็นครั้งแรก หุ้นเด้งแรงสุดในประวัติศาสตร์บริษัท",
      "summary": "Microsoft รายงานรายได้ไตรมาส 4 ปีงบการเงิน 2026 ที่ 90 พันล้านดอลลาร์ โต 18% กำไรสุทธิ 35.8 พันล้านดอลลาร์ โต 31% รายได้ Azure และคลาวด์อื่นโต 43% ทำให้รายได้ Azure ทั้งปีทะลุ 100 พันล้านดอลลาร์เป็นครั้งแรก ผู้ใช้ Microsoft 365 Copilot แบบเสียเงินแตะ 30 ล้านที่นั่ง ผลประกอบการที่แข็งแกร่งกว่าคาดทำให้หุ้น Microsoft พุ่งขึ้น 15.5% ในวันเดียว แรงที่สุดในประวัติศาสตร์บริษัท และดึงหุ้นกลุ่มเซมิคอนดักเตอร์ให้ฟื้นตัวตาม",
      "macro": false,
      "sourceName": "Microsoft (Investor Relations)",
      "url": "https://news.microsoft.com/source/2026/07/29/microsoft-cloud-and-ai-strength-fuels-fourth-quarter-results-4/",
      "image": "https://brandclickx.com/wp-content/uploads/2026/07/Microsoft-Profit-Jumps-31-as-Azure-Passes-100-Billion.webp",
      "topic": "bigtech"
    },
    {
      "id": "nw0008",
      "date": "2026-07-29",
      "title": "Meta รายได้โต 28% แตะ 60.8 พันล้านดอลลาร์ แต่กำไรลดจากค่าใช้จ่ายกฎหมายและเลิกจ้างพนักงาน 8,000 คน",
      "summary": "Meta Platforms รายงานรายได้ไตรมาส 2 ปี 2026 ที่ 60.8 พันล้านดอลลาร์ โต 28% จากแรงหนุนธุรกิจโฆษณา แต่กำไรสุทธิลดลง 14% เหลือ 15.8 พันล้านดอลลาร์ EPS 6.18 ดอลลาร์ ต่ำกว่าคาดที่ 7.22 ดอลลาร์ เพราะมีค่าใช้จ่ายพิเศษจากคดีความ 2.4 พันล้านดอลลาร์ และค่าชดเชยเลิกจ้างพนักงานราว 8,000 คนเมื่อพฤษภาคมอีก 1.18 พันล้านดอลลาร์ บริษัทปรับกรอบงบลงทุนปี 2026 เป็น 130-145 พันล้านดอลลาร์รองรับการลงทุน AI",
      "macro": false,
      "sourceName": "StockTitan",
      "url": "https://www.stocktitan.net/news/META/meta-reports-second-quarter-2026-hkjfhayj8l0v.html",
      "image": "https://variety.com/wp-content/uploads/2026/07/Mark-Zuckerberg.png?w=1000&h=563&crop=1",
      "topic": "bigtech"
    },
    {
      "id": "nw0009",
      "date": "2026-07-30",
      "title": "หุ้นกลุ่มเซมิคอนดักเตอร์เด้งแรง ดัชนี SOX พุ่ง 8.2% หลัง Microsoft การันตีกระแสเงินสดแกร่งถึงปี 2027",
      "summary": "ดัชนี PHLX Semiconductor (SOX) ปรับตัวขึ้น 8.2% ยุติการร่วงต่อเนื่อง 5 วัน นำโดยหุ้น Applied Materials ที่พุ่งขึ้น 15% และ Micron Technology ที่พุ่งขึ้น 18.4% แรงหนุนหลักมาจากผลประกอบการแข็งแกร่งของ Microsoft ที่คาดว่าจะสร้างกระแสเงินสดต่อเนื่องถึงปี 2027 ช่วยคลายความกังวลเรื่องการลงทุนโครงสร้างพื้นฐาน AI ของบริษัทเทคโนโลยีรายใหญ่ที่กดดันหุ้นกลุ่มนี้หนักตลอดเดือนกรกฎาคม ดัชนี Dow, S&P 500 และ Nasdaq ปิดบวกพร้อมกันวันเดียวกัน",
      "macro": false,
      "sourceName": "Yahoo Finance",
      "url": "https://finance.yahoo.com/markets/stocks/articles/stocks-rally-stellar-microsoft-earnings-152140326.html",
      "image": "https://s.yimg.com/lo/mysterio/api/49A06B72371880A5B63047AD8D5C2FBA64152D859A2A334724206A9D9113B090/subgraphmysterio/resizefill_w1200_h801;quality_80;format_webp/https:%2F%2Fmedia.zenfs.com%2Fen%2Fbarchart_com_477%2F9a1ff5003151ccd77c6a21a4e3c76ded",
      "topic": "chips"
    },
    {
      "id": "nw0010",
      "date": "2026-07-31",
      "title": "Bitcoin ร่วงหลุด 63,000 ดอลลาร์ หุ้น Coinbase ทรุด 10% หลังกำไรพลาดคาด",
      "summary": "ราคา Bitcoin ปรับตัวลง 2.9% เหลือราว 62,929 ดอลลาร์ หลุดระดับ 63,000 ดอลลาร์ กดดันจากกรรมการเฟด 3 คนที่โหวตต้องการขึ้นดอกเบี้ย ผลประกอบการน่าผิดหวังของ Coinbase ที่หุ้นทรุดกว่า 10% จากปริมาณซื้อขายคริปโทที่ซบเซา และความหวังริบหรี่ลงว่ากฎหมาย Clarity Act จะผ่านสภาทันฤดูร้อนนี้ อย่างไรก็ตาม Bitcoin ยังปิดเดือนกรกฎาคมด้วยผลตอบแทนบวกราว 4.3% ดีกว่าดัชนี Nasdaq ที่ติดลบ 3.2% ในช่วงเวลาเดียวกัน",
      "macro": false,
      "sourceName": "The Motley Fool",
      "url": "https://www.fool.com/coverage/stock-market-today/2026/07/31/crypto-market-today-july-31-bitcoin-slides-below-usd63-000-and-coinbase-tumbles-10/",
      "image": "https://g.foolcdn.com/image/?url=https%3A%2F%2Fcdn.content.foolcdn.com%2Fimages%2F1umn9qeh%2Fproduction%2Ffba1f8637ee52b475744b372db2dad28ef4043f2-200x200.png%3Fw%3D800%26q%3D75%26fit%3Dmax%26auto%3Dformat&w=1200&op=resize",
      "topic": ""
    },
    {
      "id": "nw0011",
      "date": "2026-07-31",
      "title": "Exxon และ Chevron กำไรพุ่งทำสถิติจากราคาน้ำมันที่พุ่งสูงในสงครามอิหร่าน — Chevron กำไรโต 384%",
      "summary": "ExxonMobil รายงานกำไรไตรมาส 2 ปี 2026 ที่ 14.5 พันล้านดอลลาร์ แข็งแกร่งสุดนับตั้งแต่ปี 2022 ขณะที่ Chevron ทำสถิติกำไรไตรมาสสูงสุดที่ 12.1 พันล้านดอลลาร์ โต 384% จากปีก่อน ทั้งสองบริษัทได้แรงหนุนจากราคาน้ำมันที่พุ่งขึ้นจากความขัดแย้งอิหร่าน-สหรัฐฯ กำไรพิเศษด้าน refining margin ที่ดีขึ้น และปริมาณการผลิตที่เพิ่มขึ้น (Chevron โต 20% หลังผนวกสินทรัพย์ Hess)",
      "macro": false,
      "sourceName": "Yahoo Finance / ExxonMobil Investor Relations",
      "url": "https://investor.exxonmobil.com/company-information/press-releases/detail/1208/exxonmobil-announces-second-quarter-2026-results",
      "image": "",
      "topic": "oil"
    },
    {
      "id": "nw0012",
      "date": "2026-08-01",
      "title": "อิหร่านเตือน \"เปลวไฟสงคราม\" เต็มรูปแบบ หลังสหรัฐฯ-อิสราเอลขู่ถล่มโครงสร้างพลังงานอิหร่าน",
      "summary": "นายพล Ali Abdollahi ผู้บัญชาการภาวะสงครามของอิหร่าน เตือนว่าสหรัฐฯ กำลังเร่งให้เกิดสงครามระดับภูมิภาคเต็มรูปแบบ หลังมีรายงานว่าสหรัฐฯ และอิสราเอลกำลังพิจารณาโจมตีโครงสร้างพื้นฐานพลังงานของอิหร่าน (โรงไฟฟ้า โรงงานปิโตรเคมี) ประธานาธิบดี Trump ยังไม่อนุมัติปฏิบัติการเพราะกังวลผลกระทบต่อราคาน้ำมันโลก ขณะที่กระทรวงต่างประเทศสหรัฐฯ ออกประกาศเตือนพลเมืองในตะวันออกกลางให้พิจารณาเดินทางออกจากพื้นที่",
      "macro": true,
      "sourceName": "Al Jazeera",
      "url": "https://www.aljazeera.com/news/2026/8/1/iran-warns-against-fire-of-war-amid-us-strike-threats-on-energy-sites",
      "image": "",
      "topic": ""
    },
    {
      "id": "nw0013",
      "date": "2026-08-01",
      "title": "Berkshire Hathaway เงินสดทะลุ 400,000 ล้านดอลลาร์ ขายหุ้นสุทธิต่อเนื่อง 3 ปี Buffett Indicator พุ่งสูงกว่ายุค dot-com",
      "summary": "Berkshire Hathaway ของ Warren Buffett ถือเงินสดสะสมใกล้แตะ 400,000 ล้านดอลลาร์ และเป็นผู้ขายหุ้นสุทธิ (net seller) ต่อเนื่องมากว่า 3 ปี ขณะที่ \"Buffett Indicator\" (สัดส่วนมูลค่าตลาดหุ้นรวมต่อ GDP ที่ Buffett ใช้วัดความแพง-ถูกของตลาด) พุ่งแตะระดับสูงสุดเป็นประวัติการณ์ที่ 230% สูงกว่าช่วงฟองสบู่ dot-com ปี 2000 ที่เคยขึ้นไปราว 140% บทวิเคราะห์ชี้ว่า Berkshire เคยสะสมเงินสดลักษณะนี้ก่อนวิกฤต dot-com และปี 2008 มาแล้ว แต่ก็เตือนว่าตลาดอาจอยู่ในภาวะตีราคาแพงเกินจริงได้นานหลายปีก่อนจะปรับฐาน",
      "macro": true,
      "sourceName": "The Motley Fool",
      "url": "https://www.fool.com/investing/2026/08/01/warren-buffetts-berkshire-hathaway-is-sounding-a-w/",
      "image": "",
      "topic": "market"
    }
  ],
  "portfolioReviews": [],
  "earningsReviews": [
{
      "id": "er0001",
      "date": "2026-07-30",
      "ticker": "SOFI",
      "company": "SoFi Technologies, Inc.",
      "quarter": "Q2 2026",
      "reportDate": "2026-07-29",
      "verdict": "beat",
      "verdictLine": "รายได้และกำไรต่อหุ้นสูงกว่าประมาณการของนักวิเคราะห์ทั้งคู่ รายได้โต 40% เทียบปีก่อน สูงกว่าประมาณการราว 9% อย่างไรก็ตาม ราคาหุ้นปรับตัวลงหลังการประกาศผลประกอบการ",
      "metrics": [
        {
          "label": "Revenue",
          "actual": "$1.21B",
          "est": "$1.11B",
          "deltaPct": "+8.6%",
          "dir": "pos"
        },
        {
          "label": "EPS",
          "actual": "$0.12",
          "est": "$0.11",
          "deltaPct": "+9.1%",
          "dir": "pos"
        }
      ],
      "trend": [
        {
          "label": "Q3'25",
          "value": 950
        },
        {
          "label": "Q4'25",
          "value": 1013
        },
        {
          "label": "Q1'26",
          "value": 1087
        },
        {
          "label": "Q2'26",
          "value": 1206
        }
      ],
      "guidance": {
        "priorLabel": "FY26 Revenue Guidance (ให้ไว้ตอนประชุม Q1 2026)",
        "priorVal": "~$4.655B",
        "newLabel": "FY26 Revenue Guidance (ปรับใหม่รอบนี้)",
        "newVal": "$4.75B–$4.85B",
        "deltaPct": "~+3.1%",
        "dir": "pos"
      },
      "managementQuotes": [
        {
          "quote": "We had nothing short of an exceptional quarter. Q2 was our 19th consecutive quarter exceeding the rule of 40 with a score of 70.",
          "translation": "ไตรมาสนี้ยอดเยี่ยมมากจริงๆ เป็นไตรมาสที่ 19 ติดต่อกันแล้วที่เราทำ Rule of 40 (เกณฑ์รวมอัตราการเติบโตของรายได้กับมาร์จิ้นกำไรต้องได้อย่างน้อย 40) ผ่านได้สบายๆ ที่คะแนน 70",
          "speaker": "Anthony Noto",
          "title": "CEO"
        },
        {
          "quote": "We are starting to hit escape velocity on our path to be the winner that takes most in digital financial services.",
          "translation": "เรากำลังเริ่มเร่งความเร็วจนหลุดวงโคจร บนเส้นทางที่จะเป็นผู้ชนะที่กินส่วนแบ่งตลาดเกือบทั้งหมดในธุรกิจการเงินดิจิทัล",
          "speaker": "Anthony Noto",
          "title": "CEO"
        },
        {
          "quote": "I believe we will achieve 20%–30% return on tangible common equity. It's just a matter of when, not if.",
          "translation": "ผมเชื่อว่าเราจะทำผลตอบแทนต่อส่วนของผู้ถือหุ้นที่จับต้องได้ (ROTCE) ได้ถึง 20-30% เป็นแค่เรื่องของเวลา ไม่ใช่เรื่องว่าจะทำได้หรือเปล่า",
          "speaker": "Anthony Noto",
          "title": "CEO"
        },
        {
          "quote": "There are just too many large attractive growth areas for us to invest versus adding even more profitability.",
          "translation": "ตอนนี้มีโอกาสเติบโตก้อนใหญ่ๆ ที่น่าลงทุนเยอะเกินกว่าจะเลือกเก็บเป็นกำไรเพิ่มเฉยๆ",
          "speaker": "Chris Lapointe",
          "title": "CFO"
        },
        {
          "quote": "We believe that we can operate comfortably within our target capital range without the need to raise capital.",
          "translation": "เรามั่นใจว่าจะบริหารเงินทุนอยู่ในกรอบเป้าหมายได้สบายๆ โดยไม่จำเป็นต้องระดมทุนเพิ่ม",
          "speaker": "Chris Lapointe",
          "title": "CFO"
        }
      ],
      "transcriptExcerpt": {
        "segments": [
                {
                        "heading": "Opening remarks — Anthony Noto (CEO)",
                        "highlight": true,
                        "en": "\"Thank you and good morning, everyone. I'm pleased to share that we had nothing short of an exceptional quarter. Q2 was our 19th consecutive quarter exceeding the rule of 40 with a score of 70.\"\n\n\"This included exceptional revenue growth of 40% year-over-year and a 30% EBITDA margin. Our team has continued to execute at a remarkable level and our business mix has proven its durability, driving record growth and profitability in the face of a volatile interest rate environment.\"\n\n\"Few businesses have maintained such a strong combination of growth and returns for it has been nearly five years, and it still feels like we're just getting started.\"",
                        "th": "\"ขอบคุณและสวัสดีตอนเช้าทุกท่าน ผมยินดีที่จะบอกว่าไตรมาสนี้เป็นไตรมาสที่ยอดเยี่ยมอย่างแท้จริง Q2 เป็นไตรมาสที่ 19 ติดต่อกันแล้วที่เราทำผลงานเกินเกณฑ์ Rule of 40 (เกณฑ์รวมอัตราการเติบโตของรายได้กับมาร์จิ้นกำไรต้องได้อย่างน้อย 40) ได้สำเร็จ ด้วยคะแนนสูงถึง 70\"\n\n\"ผลงานนี้รวมถึงการเติบโตของรายได้ที่โดดเด่นถึง 40% เทียบปีก่อน และมาร์จิ้น EBITDA 30% ทีมงานของเรายังคงทำงานได้ในระดับที่ยอดเยี่ยมต่อเนื่อง และโครงสร้างธุรกิจของเราก็พิสูจน์ให้เห็นถึงความทนทาน สร้างการเติบโตและกำไรที่ทำสถิติใหม่ ท่ามกลางสภาพแวดล้อมอัตราดอกเบี้ยที่ผันผวน\"\n\n\"มีธุรกิจไม่กี่แห่งที่รักษาระดับการเติบโตควบคู่กับผลตอบแทนที่แข็งแกร่งขนาดนี้มาได้เกือบ 5 ปีแล้ว และเรายังรู้สึกเหมือนเพิ่งเริ่มต้นเท่านั้น\""
                },
                {
                        "heading": "Prepared remarks — Chris Lapointe (CFO), opening",
                        "en": "\"Thank you, Anthony. We had a strong second quarter and have great momentum heading into the back half of 2026. Our innovation and brand building continue to power exceptionally strong revenue growth. In the second quarter, adjusted net revenue grew 40% to $1.2 billion.\"",
                        "th": "\"ขอบคุณแอนโทนี่ ไตรมาสที่สองของเราแข็งแกร่งมาก และเรามีแรงส่งที่ดีต่อเนื่องเข้าสู่ครึ่งปีหลังของปี 2026 นวัตกรรมและการสร้างแบรนด์ของเรายังคงเป็นแรงขับเคลื่อนสำคัญที่ทำให้รายได้เติบโตแข็งแกร่งต่อเนื่อง ในไตรมาสที่สอง รายได้ปรับปรุง (adjusted net revenue) เติบโต 40% เป็น 1.2 พันล้านดอลลาร์\""
                },
                {
                        "heading": "Segment performance — Financial Services",
                        "en": "\"For the second quarter, Financial Services net revenue was $466 million, up 29% year-over-year. Contribution profit was $213 million, up 13% from last year. Contribution margin was 46%.\"",
                        "th": "\"สำหรับไตรมาสที่สอง รายได้สุทธิของกลุ่ม Financial Services อยู่ที่ 466 ล้านดอลลาร์ เพิ่มขึ้น 29% เทียบปีก่อน กำไรก่อนหักส่วนกลาง (contribution profit) อยู่ที่ 213 ล้านดอลลาร์ เพิ่มขึ้น 13% จากปีก่อน คิดเป็นมาร์จิ้น 46%\""
                },
                {
                        "heading": "Segment performance — Technology Platform",
                        "en": "\"For the second quarter, we delivered net revenue of $85 million, up 13% from the prior quarter. Contribution profit was $12 million at a contribution margin of 14%.\"",
                        "th": "\"สำหรับไตรมาสที่สอง เราทำรายได้ 85 ล้านดอลลาร์ เพิ่มขึ้น 13% จากไตรมาสก่อนหน้า กำไรก่อนหักส่วนกลางอยู่ที่ 12 ล้านดอลลาร์ คิดเป็นมาร์จิ้น 14%\""
                },
                {
                        "heading": "Segment performance — Lending",
                        "en": "\"For Q2, adjusted net revenue for the segment was $712 million, up 59% from the same period last year. Contribution profit was $399 million with a 55% contribution margin.\"",
                        "th": "\"สำหรับไตรมาสที่สอง รายได้ปรับปรุงของกลุ่มนี้อยู่ที่ 712 ล้านดอลลาร์ เพิ่มขึ้น 59% เทียบช่วงเดียวกันของปีก่อน กำไรก่อนหักส่วนกลางอยู่ที่ 399 ล้านดอลลาร์ คิดเป็นมาร์จิ้น 55%\""
                },
                {
                        "heading": "Prepared remarks — Chris Lapointe (CFO), credit performance",
                        "en": "\"For personal loans, we saw very strong credit performance during the quarter. Excluding the impact of delinquent loan sales, the estimated all-in annualized net charge-off rate was 3.7%. This 70 basis point decrease from last quarter was driven by an improvement in the underlying credit performance, as well as growth in average loans on the balance sheet. Including the impact from the DQ sales, the net charge-off rate was 2.62%. This is down 41 basis points from the first quarter and 21 basis points from the second quarter of 2025. The on-balance sheet 90-day delinquency rate was 40 basis points, down seven basis points from last quarter.\n\nFor student loans, the annualized charge-off rate was 61 basis points, down four basis points from the prior quarter. The on-balance sheet 90-day delinquency rate was just 11 basis points, up one basis point from the prior quarter.\"",
                        "th": "\"สำหรับสินเชื่อบุคคล เรามีคุณภาพสินเชื่อที่แข็งแกร่งมากในไตรมาสนี้ หากไม่รวมผลจากการขายหนี้เสีย อัตราหนี้เสียสุทธิแบบรวมทุกประเภท (annualized net charge-off) ที่ประมาณการอยู่ที่ 3.7% ลดลง 70 basis point (bps, 1bps=0.01%) จากไตรมาสก่อน ซึ่งเป็นผลจากคุณภาพสินเชื่อพื้นฐานที่ดีขึ้น รวมถึงยอดสินเชื่อเฉลี่ยบนงบดุลที่เพิ่มขึ้น หากรวมผลจากการขายหนี้เสียด้วย อัตราหนี้เสียสุทธิจะอยู่ที่ 2.62% ลดลง 41bps จากไตรมาสแรก และลดลง 21bps จากไตรมาสที่สองของปี 2025 อัตราค้างชำระ 90 วันบนงบดุลอยู่ที่ 40bps ลดลง 7bps จากไตรมาสก่อน\n\nสำหรับสินเชื่อเพื่อการศึกษา อัตราหนี้เสียแบบรวมทุกประเภทอยู่ที่ 61bps ลดลง 4bps จากไตรมาสก่อน อัตราค้างชำระ 90 วันบนงบดุลอยู่ที่เพียง 11bps เพิ่มขึ้น 1bps จากไตรมาสก่อน\""
                },
                {
                        "heading": "Prepared remarks — Chris Lapointe (CFO), balance sheet & capital",
                        "en": "\"Turning to our balance sheet. In the second quarter, total assets grew by $7.2 billion. This was driven primarily by $5.8 billion of loan growth and roughly $800 million of growth in cash equivalents, and investment securities. Total company-wide cash at quarter end was $3.6 billion.\n\nOn the liability side, total deposits grew by $5.3 billion to $45.5 billion, which included strong growth in member deposits. Our net interest margin was 5.98% for the quarter, up 4 basis points sequentially. This included a 7 basis point increase in average asset yields, partially offset by a 1 basis point increase in cost of funds. We continue to expect a healthy net interest margin above 5% for the foreseeable future. In terms of our regulatory capital ratios, we are very well capitalized. Our total capital ratio of 18.8% at quarter end is well above the regulatory minimum of 10.5%, as well as our additional internal stress buffer. Over the medium term, we expect to efficiently deploy our excess capital into high-returning assets while letting our risk-based capital ratio normalize toward the low to mid-teens. Tangible book value grew $4.2 billion year-over-year to $9.5 billion.\n\nThe tangible book value per share at quarter end is $7.34, up from $4.72 a year ago, a 56% increase.\"",
                        "th": "\"มาดูงบดุลกันต่อ ในไตรมาสที่สอง สินทรัพย์รวมของเราเติบโตขึ้น 7.2 พันล้านดอลลาร์ ซึ่งส่วนใหญ่มาจากสินเชื่อที่เติบโต 5.8 พันล้านดอลลาร์ และเงินสด/หลักทรัพย์เพื่อการลงทุนที่เติบโตประมาณ 800 ล้านดอลลาร์ เงินสดรวมทั้งบริษัท ณ สิ้นไตรมาสอยู่ที่ 3.6 พันล้านดอลลาร์\n\nในฝั่งหนี้สิน เงินฝากรวมเติบโตขึ้น 5.3 พันล้านดอลลาร์ เป็น 45.5 พันล้านดอลลาร์ ซึ่งรวมถึงการเติบโตที่แข็งแกร่งของเงินฝากจากสมาชิก ส่วนต่างดอกเบี้ยสุทธิ (net interest margin) ของเราอยู่ที่ 5.98% ในไตรมาสนี้ เพิ่มขึ้น 4bps จากไตรมาสก่อน ซึ่งรวมผลจากอัตราผลตอบแทนสินทรัพย์เฉลี่ยที่เพิ่มขึ้น 7bps หักลบบางส่วนด้วยต้นทุนเงินทุนที่เพิ่มขึ้น 1bps เรายังคงคาดว่าส่วนต่างดอกเบี้ยสุทธิจะอยู่ในระดับที่ดีเกิน 5% ต่อไปในอนาคตอันใกล้ ในแง่อัตราส่วนเงินกองทุนตามเกณฑ์กำกับดูแล เรามีเงินกองทุนที่แข็งแกร่งมาก อัตราส่วนเงินกองทุนรวม (total capital ratio) ที่ 18.8% ณ สิ้นไตรมาส สูงกว่าเกณฑ์ขั้นต่ำตามกฎหมายที่ 10.5% มาก รวมถึงสูงกว่ากันชนสำรองภายในที่เรากันไว้เพิ่มด้วย ในระยะกลาง เราคาดว่าจะนำเงินกองทุนส่วนเกินไปใช้ในสินทรัพย์ที่ให้ผลตอบแทนสูงอย่างมีประสิทธิภาพ ขณะเดียวกันปล่อยให้อัตราส่วนเงินกองทุนตามความเสี่ยงค่อยๆ ปรับลดลงมาอยู่ในระดับ 12-15% โดยประมาณ มูลค่าทางบัญชีที่จับต้องได้ (tangible book value) เติบโตขึ้น 4.2 พันล้านดอลลาร์เทียบปีก่อน เป็น 9.5 พันล้านดอลลาร์\n\nมูลค่าทางบัญชีที่จับต้องได้ต่อหุ้น ณ สิ้นไตรมาสอยู่ที่ 7.34 ดอลลาร์ เพิ่มขึ้นจาก 4.72 ดอลลาร์เมื่อปีก่อน คิดเป็นการเติบโต 56%\""
                },
                {
                        "heading": "Prepared remarks — Chris Lapointe (CFO), full-year 2026 guidance",
                        "highlight": true,
                        "en": "\"For the full year 2026, we now expect to deliver adjusted net revenue of $4.75 billion-$4.85 billion, which equates to year-over-year growth of approximately 32%-35%. This is up from our prior guidance of approximately 30% year-over-year growth. We continue to expect to deliver adjusted EBITDA of approximately $1.6 billion, which equates to an adjusted EBITDA margin of approximately 33%-34%. Adjusted net income of approximately $825 million, which equates to a net income margin of approximately 17%. The EPS of approximately $0.60.\"\n\n\"Overall, Q2 was a strong quarter, and we continue to have strong momentum in our business. Let's now begin the Q&A.\"",
                        "th": "\"สำหรับทั้งปี 2026 ตอนนี้เราคาดว่าจะทำรายได้ปรับปรุงได้ 4.75-4.85 พันล้านดอลลาร์ ซึ่งเทียบเท่าอัตราการเติบโตเทียบปีก่อนประมาณ 32-35% ปรับขึ้นจากเป้าเดิมที่เคยให้ไว้ราว 30% เรายังคงคาดการณ์ EBITDA ปรับปรุงไว้ที่ประมาณ 1.6 พันล้านดอลลาร์ เทียบเท่ามาร์จิ้น EBITDA ปรับปรุงประมาณ 33-34% กำไรสุทธิปรับปรุงประมาณ 825 ล้านดอลลาร์ เทียบเท่ามาร์จิ้นกำไรสุทธิประมาณ 17% และกำไรต่อหุ้นประมาณ 0.60 ดอลลาร์\"\n\n\"โดยรวมแล้ว Q2 เป็นไตรมาสที่แข็งแกร่ง และเรายังคงมีแรงส่งที่ดีต่อเนื่องในธุรกิจของเรา เริ่มช่วงถาม-ตอบกันเลยครับ\""
                },
                {
                        "heading": "Product updates — SoFi Plus",
                        "en": "\"SoFi Plus is our premium membership offering that brings the best of every SoFi product into one experience with a value that is unrivaled in the market. At the start of the second quarter, we relaunched SoFi Plus with significantly enhanced benefits in each of our products. For example, SoFi Money at 4.5% interest and SoFi Invest with a 1% match while fully transitioning the product to a paid subscription model. The results have exceeded our expectations. After just one quarter, we surpassed 200,000 paid subscribers with most of the growth coming from existing members who are upgrading their memberships.\"",
                        "th": "\"SoFi Plus คือบริการสมาชิกระดับพรีเมียมของเราที่รวมสิ่งที่ดีที่สุดของทุกโปรดักต์ SoFi ไว้ในประสบการณ์เดียว ด้วยคุณค่าที่หาตัวจับยากในตลาด ช่วงต้นไตรมาสที่สอง เรารีลอนช์ SoFi Plus ด้วยสิทธิประโยชน์ที่เพิ่มขึ้นอย่างมีนัยสำคัญในแต่ละโปรดักต์ ตัวอย่างเช่น SoFi Money ที่ให้ดอกเบี้ย 4.5% และ SoFi Invest ที่มีเงินสมทบ (match) 1% พร้อมกับเปลี่ยนโปรดักต์นี้ให้เป็นระบบสมาชิกแบบเสียเงินเต็มรูปแบบ ผลลัพธ์เกินความคาดหมายของเรา หลังผ่านไปเพียงไตรมาสเดียว เรามีสมาชิกที่จ่ายเงินเกิน 200,000 คน โดยการเติบโตส่วนใหญ่มาจากสมาชิกเดิมที่อัปเกรดสมาชิกภาพของตัวเอง\""
                },
                {
                        "heading": "Product updates — SoFi Coach",
                        "en": "\"SoFi Coach brings together three things no other company can. The full picture of a member's personal finances across their SoFi products and third-party products, the trust and security of a regulated bank, and soon, the ability to perform actions on behalf of our members. The result is personalized financial guidance across a member's entire financial life that helps them achieve the most critical success factor on their way to realizing their ambitions, which is spending less than they make and investing the rest.\"",
                        "th": "\"SoFi Coach รวมสามสิ่งที่ไม่มีบริษัทไหนทำได้เหมือนเรา คือภาพรวมการเงินส่วนบุคคลของสมาชิกครบทุกด้าน ทั้งจากโปรดักต์ของ SoFi เองและจากบุคคลที่สาม ความน่าเชื่อถือและความปลอดภัยของธนาคารที่อยู่ภายใต้การกำกับดูแล และในเร็วๆ นี้ ความสามารถในการดำเนินการแทนสมาชิกได้จริง ผลลัพธ์คือคำแนะนำทางการเงินส่วนบุคคลที่ครอบคลุมทุกมิติชีวิตทางการเงินของสมาชิก ซึ่งช่วยให้พวกเขาบรรลุปัจจัยความสำเร็จที่สำคัญที่สุดในการไปถึงเป้าหมาย นั่นคือการใช้จ่ายน้อยกว่าที่หามาได้ และนำส่วนที่เหลือไปลงทุน\""
                },
                {
                        "heading": "Product updates — SoFiUSD and Big Business Banking",
                        "en": "\"We have been pioneers in this space, becoming the first nationally licensed bank to launch crypto trading and our own stablecoin in SoFiUSD. In the second quarter, we began settling our trading business in SoFiUSD and in big business banking, we began processing transactions on the SoFi Exchange Network, enabling our first commercial clients to move money in real time 24/7.\"",
                        "th": "\"เราเป็นผู้บุกเบิกในพื้นที่นี้ โดยเป็นธนาคารที่ได้รับใบอนุญาตระดับประเทศรายแรกที่เปิดให้เทรดคริปโตและออก stablecoin (เหรียญดิจิทัลที่ผูกมูลค่ากับสกุลเงินจริง) ของตัวเองในชื่อ SoFiUSD ในไตรมาสที่สอง เราเริ่มใช้ SoFiUSD ในการชำระธุรกิจเทรดของเรา และในฝั่ง Big Business Banking เราเริ่มประมวลผลธุรกรรมบน SoFi Exchange Network ทำให้ลูกค้าองค์กรรายแรกของเราสามารถโอนเงินได้แบบเรียลไทม์ตลอด 24 ชั่วโมงทุกวัน\""
                },
                {
                        "heading": "Q1 — Devin Ryan, Citizens Bank",
                        "highlight": true,
                        "en": "Q: \"Thanks. Good morning, Anthony and Chris. First off, congratulations on the Notre Dame partnership, my alma mater. Good to see that yesterday. You got a lot of attention. Question just on loan platform, really want to focus on some of the new capabilities with SMB and home equity and the new agreements that you guys have recently announced. Can you just give a little bit of context around the capacity that you see in kind of some of these newer categories, also how quickly SoFi can build origination volume into that capacity, just also how we should think about kind of the fee economics in these new categories as you kind of expand beyond personal loans? Thanks.\"\n\nChris Lapointe (CFO): \"Yep, absolutely. Thanks, Devin. In terms of Loan Platform Business, that was originally started a few years ago primarily as a referral channel where we were sending all of our declines to a marketplace and generating a fee. That evolved over time to where we started to originate on behalf of others in meaningful scale from an unsecured personal loan perspective. I would say, and I've said this consistently, the Nirvana state for the LPB business is to be able to go to investors with a menu of options and asset types that allows them to pick and choose exactly what they would like from both a risk and reward and return profile perspective. One of the key things that we needed to achieve was to start expanding Loan Platform Business into other asset types.\n\nThis is the first quarter where we were able to do so by introducing the SMB partnerships. There are two of them. One is with BasePoint Capital for $3 billion over three years, the other is with an undisclosed party for several hundred million dollars. We are also introducing Home Equity Lines of Credit to the mix as well in the coming days. In terms of the overall size and scale and opportunity and our ability to originate into that, we're just starting to originate in meaningful scale on the SMB side. There's considerable demand from an application start perspective. You would expect to see economics in the range of where we're executing today to maybe slightly better. On the closed-end seconds and mortgage side, similar story. We're already originating at a pretty good clip right now on a monthly basis.\n\nThe partnerships that we're talking about are in the $100 million-$200 million per month, we're talking to several parties. We certainly have the ability to originate into that. Again, from an economics perspective, we don't disclose that by party, you could expect it to be similar to where we're executing today.\"\n\nAnthony Noto (CEO), follow-up: \"The other thing I would add is that as we continue to build out a more diversified portfolio of Loan Platform Businesses, we build new relationships that can benefit existing Loan Platform Businesses. The SMB business is one that we think we can be incredibly competitive on, similar to personal loans and credit cards. Most SMB lenders are charging exorbitant rates of over 30%. We think we can operate meaningfully below that and take significant market share. If you think about our portfolio of loans and originations more broadly, we are really taking massive market share from high return, high profit margin types of products. In personal loans, we're underwriting WAC at about 12% compared to credit card at 25%. That's an incredibly compelling value proposition for any individual consumer. In SMB, as I mentioned, we could be 10 points below where the pricing is on SMB.\n\nClosed end, we can be more competitive than others. Because we're more competitive on price, we get higher quality borrowers, which will only reinforce the productivity loop of originating high-quality borrowers, delivering great return assets to our partners, putting great return assets on our balance sheet, driving capital that can continue to fund that. We're very close to that whole equation playing out.\"",
                        "th": "คำถาม: \"ขอบคุณครับ สวัสดีตอนเช้าแอนโทนี่และคริส ก่อนอื่นขอแสดงความยินดีกับพาร์ตเนอร์ชิป Notre Dame ซึ่งเป็นมหาวิทยาลัยที่ผมเรียนจบมา เห็นข่าวเมื่อวานได้รับความสนใจมาก คำถามของผมอยู่ที่ Loan Platform Business (ธุรกิจปล่อยกู้แทนนักลงทุนอื่น) อยากโฟกัสที่ความสามารถใหม่ๆ ทั้ง SMB (ธุรกิจขนาดกลาง-เล็ก) และสินเชื่อบ้าน (home equity) รวมถึงข้อตกลงใหม่ที่เพิ่งประกาศ ช่วยเล่าถึงศักยภาพที่เห็นในหมวดใหม่เหล่านี้ได้ไหม รวมถึง SoFi จะสร้างปริมาณการปล่อยสินเชื่อเข้าสู่ศักยภาพนั้นได้เร็วแค่ไหน และควรมองเรื่องรายได้ค่าธรรมเนียมในหมวดใหม่เหล่านี้อย่างไรเมื่อขยายไปไกลกว่าสินเชื่อบุคคล\"\n\nChris Lapointe (CFO): \"ครับ ขอบคุณเดวิน สำหรับ Loan Platform Business เดิมทีเริ่มจากไม่กี่ปีก่อนในฐานะช่องทางส่งต่อ (referral) ที่เราส่งลูกค้าที่ถูกปฏิเสธสินเชื่อไปยังตลาดกลางแล้วได้ค่าธรรมเนียม จากนั้นพัฒนามาเป็นการปล่อยสินเชื่อแทนผู้อื่นในระดับที่มีนัยสำคัญ โดยเน้นสินเชื่อบุคคลแบบไม่มีหลักประกัน ผมพูดมาตลอดว่าสถานะในอุดมคติของธุรกิจ LPB คือการนำเสนอทางเลือกให้นักลงทุนหลากหลายประเภทสินทรัพย์ ให้พวกเขาเลือกได้เองตามระดับความเสี่ยงและผลตอบแทนที่ต้องการ สิ่งสำคัญอย่างหนึ่งที่เราต้องทำคือการขยาย Loan Platform Business ไปสู่ประเภทสินทรัพย์อื่น\n\nไตรมาสนี้เป็นไตรมาสแรกที่เราทำได้สำเร็จ ด้วยการเปิดตัวพาร์ตเนอร์ชิป SMB สองรายการ รายแรกคือ BasePoint Capital มูลค่า 3 พันล้านดอลลาร์ตลอด 3 ปี อีกรายเป็นคู่สัญญาที่ไม่เปิดเผยชื่อ มูลค่าหลักร้อยล้านดอลลาร์ เรายังกำลังจะเพิ่มสินเชื่อ Home Equity Line of Credit เข้ามาในกลุ่มผลิตภัณฑ์นี้ในอีกไม่กี่วันข้างหน้า ในแง่ขนาดและโอกาสโดยรวม เราเพิ่งเริ่มปล่อยสินเชื่อ SMB ในระดับที่มีนัยสำคัญ ความต้องการสมัครเข้ามาค่อนข้างมาก คาดว่าผลตอบแทนทางเศรษฐกิจจะอยู่ในระดับใกล้เคียงหรือดีกว่าที่เราทำอยู่ตอนนี้เล็กน้อย ส่วนสินเชื่อ closed-end second และสินเชื่อบ้านก็คล้ายกัน เราปล่อยสินเชื่อได้ในอัตราที่ดีพอสมควรต่อเดือนอยู่แล้ว\n\nพาร์ตเนอร์ชิปที่เรากำลังพูดถึงอยู่ในระดับ 100-200 ล้านดอลลาร์ต่อเดือน และเรากำลังคุยกับอีกหลายฝ่าย เรามีความสามารถในการปล่อยสินเชื่อรองรับปริมาณนี้แน่นอน ในแง่เศรษฐศาสตร์เราไม่เปิดเผยรายละเอียดเป็นรายคู่สัญญา แต่คาดว่าจะใกล้เคียงกับที่เราทำอยู่ในปัจจุบัน\"\n\nเสริมโดย Anthony Noto (CEO): \"อีกประเด็นที่อยากเสริมคือ ยิ่งเราสร้างพอร์ต Loan Platform Business ที่หลากหลายมากขึ้นเท่าไหร่ ความสัมพันธ์ใหม่ๆ ที่เราสร้างก็ยิ่งเป็นประโยชน์ต่อ Loan Platform Business เดิมที่มีอยู่ด้วย ธุรกิจ SMB เป็นหนึ่งในธุรกิจที่เราเชื่อว่าจะแข่งขันได้ดีมาก เหมือนกับสินเชื่อบุคคลและบัตรเครดิต ผู้ปล่อยสินเชื่อ SMB ส่วนใหญ่คิดดอกเบี้ยสูงเกิน 30% เราเชื่อว่าเราทำได้ต่ำกว่านั้นอย่างมีนัยสำคัญ และจะแย่งส่วนแบ่งตลาดได้มาก หากมองพอร์ตสินเชื่อและการปล่อยสินเชื่อของเราในภาพกว้าง เรากำลังแย่งส่วนแบ่งตลาดจากผลิตภัณฑ์ที่ให้ผลตอบแทนสูงและมาร์จิ้นกำไรสูง สำหรับสินเชื่อบุคคล เราปล่อยสินเชื่อที่อัตราดอกเบี้ยถัวเฉลี่ยถ่วงน้ำหนัก (WAC) ราว 12% เทียบกับบัตรเครดิตที่ 25% ถือเป็นข้อเสนอที่คุ้มค่ามากสำหรับผู้บริโภครายบุคคล ในหมวด SMB อย่างที่บอกไป เราอาจทำราคาต่ำกว่าตลาดได้ถึง 10 จุด\n\nในหมวด closed-end เราก็แข่งขันได้ดีกว่าคู่แข่ง เพราะเราแข่งขันด้านราคาได้ดีกว่า เราจึงได้ลูกหนี้คุณภาพสูงกว่า ซึ่งจะยิ่งตอกย้ำวงจรการผลิต คือปล่อยสินเชื่อให้ลูกหนี้คุณภาพสูง ส่งมอบสินทรัพย์ผลตอบแทนดีให้พาร์ตเนอร์ นำสินทรัพย์ผลตอบแทนดีไว้บนงบดุลของเราเอง และสร้างเงินทุนที่จะหมุนเวียนต่อไปได้อีก เรากำลังใกล้จุดที่สมการทั้งหมดนี้จะทำงานได้จริงมากแล้ว\""
                },
                {
                        "heading": "Q2 — Andrew Jeffrey, William Blair",
                        "en": "Q: \"Thank you. Good morning. Great to see the momentum you have in the business. Anthony, kind of a high-level question for you. I know the company has been sort of hyper-focused on driving members, given the size of the TAM, now it seems that cross-buys reached a pretty important inflection point. Is this the time to sort of focus on monetization sort of at the margin versus member growth, or do you think you walk and chew gum and we see both metrics rise over the next couple of years?\"\n\nAnthony Noto (CEO): \"It's an important point that you bring up. It was an important inflection point for us in this quarter. It started in Q1. We didn't want to overemphasize in the Q1 relative to Q2. Make no mistake about it, the first half of this year has proven that our broad-based everything app strategy is working. We've seen improvement in products per member in Q1 and Q2. We continue to expect that to happen for the foreseeable future. We have the right portfolio of products where people are organically acquiring the next product. If you think about Relay and you think about SoFi Money, those are tip-of-the-sword products that are broadly appealing. We have over 7 million Money members now, over 6 million Relay members.\n\nThe more Money members we bring in, the more Relay members we bring in, the more downstream benefit we get in SoFi Invest and SoFi Credit Card, and SoFi SMB, as well as all the loan products. Those acquisition costs are basically zero on those other products, which basically doubles the profitability on the loan side. There's a great flywheel here at work, and what's changed this year is that the SoFi Plus product, the SoFi Crypto product, are absolutely driving product per member organically. As we mentioned in the remarks, SoFi Plus relaunched. We're already at over 200,000 paying members, which is, on a run rate basis, going to be over $24 million a year, and it's growing very rapidly.\n\nThe most important thing is that 85% of those new SoFi Plus members are existing members, and a quarter of them are taking out another product after they take out SoFi Plus. If an existing member takes out SoFi Plus, they have at least two products since they're existing, and then 25% of them are taking out another product. Layer on top of that, more broadly appealing products like crypto and more broadly appealing products like SMB and now big business banking, you can see the flywheel really working. Our growth is going to be driven by members, by products per member, and by revenue per product. All three working for us, and you saw that in the quarter.\"",
                        "th": "คำถาม: \"ขอบคุณครับ สวัสดีตอนเช้า ยินดีที่เห็นแรงส่งที่ดีในธุรกิจ แอนโทนี่ ขอถามคำถามระดับภาพรวม ผมทราบว่าบริษัทโฟกัสอย่างหนักกับการเพิ่มจำนวนสมาชิกมาตลอด เพราะขนาดตลาดที่มีศักยภาพ (TAM) ใหญ่มาก ตอนนี้ดูเหมือนว่าการซื้อสินค้าข้ามหมวด (cross-buy) มาถึงจุดเปลี่ยนที่สำคัญแล้ว นี่คือเวลาที่จะโฟกัสไปที่การสร้างรายได้จากฐานสมาชิกเดิมมากกว่าการหาสมาชิกใหม่หรือเปล่า หรือคิดว่าทำสองอย่างพร้อมกันได้ และจะเห็นทั้งสองตัวเลขเติบโตไปพร้อมกันในอีกไม่กี่ปีข้างหน้า\"\n\nAnthony Noto (CEO): \"เป็นประเด็นสำคัญที่คุณพูดถึง ไตรมาสนี้ถือเป็นจุดเปลี่ยนสำคัญสำหรับเรา ซึ่งเริ่มมาตั้งแต่ไตรมาสแรก เราไม่อยากเน้นย้ำมากเกินไปในไตรมาสแรกเทียบกับไตรมาสที่สอง แต่ต้องยืนยันชัดเจนว่า ครึ่งปีแรกของปีนี้พิสูจน์แล้วว่ากลยุทธ์ 'แอปเดียวครบทุกบริการ' (everything app) แบบครอบคลุมของเรานั้นได้ผลจริง เราเห็นจำนวนโปรดักต์ต่อสมาชิกเพิ่มขึ้นทั้งในไตรมาสแรกและไตรมาสที่สอง และเราคาดว่าแนวโน้มนี้จะดำเนินต่อไปในอนาคตอันใกล้ เรามีพอร์ตโปรดักต์ที่ถูกต้อง ที่ทำให้คนซื้อโปรดักต์ถัดไปแบบเป็นธรรมชาติ ถ้านึกถึง Relay กับ SoFi Money สองตัวนี้คือโปรดักต์นำร่องที่ดึงดูดคนได้กว้าง ตอนนี้เรามีสมาชิก Money กว่า 7 ล้านคน และสมาชิก Relay กว่า 6 ล้านคน\n\nยิ่งเรามีสมาชิก Money มากขึ้นเท่าไหร่ ก็ยิ่งมีสมาชิก Relay มากขึ้นเท่านั้น และยิ่งได้ประโยชน์ต่อเนื่องไปยัง SoFi Invest, SoFi Credit Card, SoFi SMB รวมถึงผลิตภัณฑ์สินเชื่อทั้งหมด ต้นทุนการหาลูกค้าสำหรับผลิตภัณฑ์เหล่านั้นแทบเป็นศูนย์ ซึ่งทำให้ความสามารถในการทำกำไรฝั่งสินเชื่อเพิ่มขึ้นเป็นสองเท่า มีกลไก flywheel (วงจรเสริมแรงที่หมุนเร็วขึ้นเรื่อยๆ) ที่ทำงานได้ดีมากตรงนี้ และสิ่งที่เปลี่ยนไปในปีนี้คือ SoFi Plus และ SoFi Crypto กำลังผลักดันจำนวนโปรดักต์ต่อสมาชิกให้เพิ่มขึ้นแบบเป็นธรรมชาติจริงๆ อย่างที่กล่าวไปในคำแถลง SoFi Plus รีลอนช์แล้ว ตอนนี้เรามีสมาชิกจ่ายเงินเกิน 200,000 คน ซึ่งคิดเป็นอัตรารายปีมากกว่า 24 ล้านดอลลาร์ และกำลังเติบโตเร็วมาก\n\nสิ่งสำคัญที่สุดคือ 85% ของสมาชิก SoFi Plus ใหม่เป็นสมาชิกเดิมอยู่แล้ว และหนึ่งในสี่ของพวกเขาซื้อโปรดักต์เพิ่มอีกหนึ่งตัวหลังจากสมัคร SoFi Plus ถ้าสมาชิกเดิมสมัคร SoFi Plus พวกเขาก็มีอย่างน้อยสองโปรดักต์อยู่แล้ว (เพราะเป็นสมาชิกเดิม) และ 25% ของพวกเขาซื้อโปรดักต์เพิ่มอีกตัว เมื่อรวมกับโปรดักต์ที่ดึงดูดคนได้กว้างกว่าอย่างคริปโต, SMB และตอนนี้ Big Business Banking ก็จะเห็นว่ากลไก flywheel กำลังทำงานได้ผลจริง การเติบโตของเราจะขับเคลื่อนโดยสามปัจจัย คือจำนวนสมาชิก จำนวนโปรดักต์ต่อสมาชิก และรายได้ต่อโปรดักต์ ทั้งสามปัจจัยกำลังทำงานให้เรา และเห็นผลชัดเจนในไตรมาสนี้\""
                },
                {
                        "heading": "Q3 — John Hecht, Jefferies",
                        "en": "Q: \"Hey, guys. Good quarter. Thanks very much for taking the question. Anthony, I'm wondering if maybe you can give us an update on the competitive, excuse me, the competitive environment and customer acquisition costs and channels, and how are those trends going?\"\n\nAnthony Noto (CEO): \"Outside the loan business, the competition is very benign. Our customer acquisition costs are staying pretty stable. The team's doing a great job of really optimizing unit economics and driving efficient scale in customers. The fact that we're driving 35% year-over-year growth in members and over 40% growth in products and really keeping CAC constant is a function of the great data analytics we have and the value prop that we have. Each one of our products we absolutely designed to be the best of breed on its own, both from a value proposition to consumer as well as unit economics. We're indifferent in what product they take first. We're seeing continued strong demand in our channels at stable pricing in all of the financial services products. The lending products are definitely more competitive, but we have very unique products.\n\nIn personal loans, we're really not competing with big banks. They don't offer personal loans, primarily because they have these huge credit card businesses that they don't want to cannibalize. We're kind of competing with the smaller companies that don't have as much capital, and they have higher cost of funding than us. We've competed really well. Don't get me wrong, I'm focused on funnels and pricing every day in the PL business. The student loan business doesn't really have a competitor in the home loan business. Overall, pretty benign environment at the top of the funnel. Bottom of the funnel, nothing's changed, it's always been competitive on pricing, and we're pretty nimble and have a significant advantage in lower funding costs than others.\n\nNot to mention, a large percentage of home loans are cross-bought from existing members, and increasingly a higher percentage of personal loans is cross-bought, again, without customer acquisition costs.\"",
                        "th": "คำถาม: \"สวัสดีครับ ไตรมาสที่ดี ขอบคุณมากที่รับคำถาม แอนโทนี่ อยากให้อัปเดตภาวะการแข่งขันและต้นทุนการหาลูกค้ารวมถึงช่องทางต่างๆ ว่าเป็นอย่างไรบ้าง\"\n\nAnthony Noto (CEO): \"นอกเหนือจากธุรกิจสินเชื่อ ภาวะการแข่งขันค่อนข้างเบามาก ต้นทุนการหาลูกค้าของเรายังค่อนข้างคงที่ ทีมงานทำผลงานได้ดีมากในการปรับประสิทธิภาพต้นทุนต่อหน่วย (unit economics) และขยายขนาดลูกค้าอย่างมีประสิทธิภาพ การที่เราเติบโตของสมาชิก 35% เทียบปีก่อน และโปรดักต์เติบโตกว่า 40% ในขณะที่ต้นทุนหาลูกค้าคงที่ เป็นผลมาจากระบบวิเคราะห์ข้อมูลที่ดีและคุณค่าที่เรานำเสนอ แต่ละโปรดักต์ของเราถูกออกแบบมาให้เป็นที่สุดในตัวของมันเอง ทั้งในแง่คุณค่าต่อผู้บริโภคและต้นทุนต่อหน่วย เราไม่สนใจว่าลูกค้าจะเลือกโปรดักต์ไหนเป็นตัวแรก เรายังเห็นดีมานด์ที่แข็งแกร่งต่อเนื่องในทุกช่องทาง ที่ราคาคงที่ ในผลิตภัณฑ์ฝั่ง financial services ทั้งหมด ฝั่งสินเชื่อมีการแข่งขันมากกว่าแน่นอน แต่เรามีผลิตภัณฑ์ที่ไม่เหมือนใคร\n\nสำหรับสินเชื่อบุคคล เราแทบไม่ได้แข่งกับธนาคารใหญ่เลย เพราะธนาคารใหญ่ไม่ปล่อยสินเชื่อบุคคล ส่วนใหญ่เพราะกลัวไปกินส่วนแบ่งธุรกิจบัตรเครดิตขนาดใหญ่ของตัวเอง เรากำลังแข่งกับบริษัทขนาดเล็กกว่าที่มีเงินทุนน้อยกว่าและต้นทุนเงินทุนสูงกว่าเรา เราแข่งขันได้ดีมาก อย่าเข้าใจผิดนะครับ ผมยังโฟกัสเรื่อง funnel และการตั้งราคาทุกวันในธุรกิจสินเชื่อบุคคล ธุรกิจสินเชื่อเพื่อการศึกษาแทบไม่มีคู่แข่งเลย ส่วนสินเชื่อบ้านก็เช่นกัน โดยรวมแล้วภาวะการแข่งขันที่ต้นช่องทาง (top of funnel) ค่อนข้างเบา ที่ปลายช่องทาง (bottom of funnel) ไม่มีอะไรเปลี่ยนแปลง ยังคงแข่งขันด้านราคาเหมือนเดิม และเรามีความคล่องตัวสูงพร้อมความได้เปรียบด้านต้นทุนเงินทุนที่ต่ำกว่าคู่แข่งอย่างมีนัยสำคัญ\n\nไม่ต้องพูดถึงว่าสัดส่วนสินเชื่อบ้านจำนวนมากมาจากการซื้อข้ามหมวดของสมาชิกเดิม และสัดส่วนสินเชื่อบุคคลที่มาจากการซื้อข้ามหมวดก็เพิ่มขึ้นเรื่อยๆ เช่นกัน โดยไม่มีต้นทุนการหาลูกค้าเพิ่มเติมอีกด้วย\""
                },
                {
                        "heading": "Q4 — Dan Dolev, Mizuho",
                        "en": "Q: \"Hey, guys. Really nice results. Congrats. Just wanted to ask, maybe Chris, can you walk us through the rationale of not raising the EBITDA? Obviously, results are super strong. Just some color on that I think a lot of investors are asking. Thank you so much, and congrats again.\"\n\nChris Lapointe (CFO): \"Yep, absolutely. Thanks, Dan. We ended up raising guidance from a revenue perspective about $100 million-$200 million. That obviously reflects the continued strong execution and strong demand that we're seeing across the entire business. As we've said before, when we see opportunities to deploy capital at attractive returns, we're going to lean into them, and that's what we're doing today. There are just too many large attractive growth areas for us to invest versus adding even more profitability. The profitability opportunity is not going to go away, but choosing not to invest today would come at the expense of capturing that growth opportunity in the future. The incremental revenue gives us, obviously, the additional flexibility to invest in initiatives that we believe will drive long-term growth while maintaining the EBITDA and EPS guidance that we've provided.\"\n\nAnthony Noto (CEO), follow-up: \"Dan, the other thing I'd say is we don't want to over-optimize for the actual EPS that we hit or the actual EBITDA that we hit relative to these bigger growth opportunities. We also do need to be balanced relative to the environment. While we couldn't be more positive about the demand for our products, the performance that we're driving with them, the credit trends we're seeing, the spending trends we're seeing, as well as the investing trends, all of those things are green and up and to the right, that's what's allowing us to drive such strong demand. It's not coming at higher costs, which I think is what a lot of people will point to. The incremental investment is on new growth opportunities. This year, we've launched a number of things that were never in our 2026 plan. We just launched big business banking.\n\nWe launched SMB. We launched SoFiUSD. We launched SoFi Crypto. We're leaning into SoFi Plus because of how well it's doing. That momentum is absolutely continuing. The other thing I would just say is we entered the year expecting rate cuts. We're now expecting 2 rate increases. We've not only maintained our guidance for revenue and profitability, we've exceeded expectations on the revenue side. When we think about the back half of the year, I don't know if there's going to be 2 rate cuts. If they are, we're going to be fine. Sorry, 2 rate increases. If there are, we're going to be fine. If there are no rate increases, we probably have upside to the bottom line, but we have the cushion in our guidance to be prepared to deliver regardless of the environment.\"",
                        "th": "คำถาม: \"สวัสดีครับ ผลงานดีมากจริงๆ ยินดีด้วย อยากถามคริส ช่วยอธิบายเหตุผลที่ไม่ปรับเป้า EBITDA ขึ้นได้ไหม เพราะผลงานแข็งแกร่งมาก อยากได้มุมมองเพิ่มเติม เพราะนักลงทุนหลายคนถามเรื่องนี้ ขอบคุณมากและยินดีด้วยอีกครั้ง\"\n\nChris Lapointe (CFO): \"ครับ ขอบคุณแดน เราปรับเป้ารายได้ขึ้นประมาณ 100-200 ล้านดอลลาร์ ซึ่งสะท้อนถึงการดำเนินงานที่แข็งแกร่งต่อเนื่องและดีมานด์ที่แข็งแกร่งที่เราเห็นทั่วทั้งธุรกิจ อย่างที่เคยพูดไว้ เมื่อเราเห็นโอกาสในการใช้เงินทุนเพื่อผลตอบแทนที่น่าสนใจ เราจะเลือกทุ่มเทลงทุนในโอกาสนั้น และนั่นคือสิ่งที่เรากำลังทำอยู่ตอนนี้ มีพื้นที่การเติบโตขนาดใหญ่ที่น่าสนใจมากเกินกว่าที่จะเลือกลงทุนเทียบกับการเพิ่มความสามารถในการทำกำไรเฉยๆ โอกาสด้านความสามารถในการทำกำไรจะไม่หายไปไหน แต่การเลือกไม่ลงทุนวันนี้จะทำให้เสียโอกาสจับโอกาสการเติบโตนั้นในอนาคต รายได้ส่วนเพิ่มนี้ให้ความยืดหยุ่นเพิ่มเติมแก่เราในการลงทุนในโครงการที่เราเชื่อว่าจะขับเคลื่อนการเติบโตระยะยาว ในขณะที่ยังคงรักษาเป้า EBITDA และ EPS ที่เราให้ไว้\"\n\nเสริมโดย Anthony Noto (CEO): \"แดน อีกเรื่องที่อยากบอกคือ เราไม่อยากปรับให้ EPS หรือ EBITDA ที่ทำได้จริงดีเกินไปเมื่อเทียบกับโอกาสการเติบโตก้อนใหญ่เหล่านี้ เราต้องสร้างสมดุลกับสภาพแวดล้อมด้วย แม้เราจะมองบวกอย่างมากกับดีมานด์ต่อผลิตภัณฑ์ของเรา ผลงานที่เรากำลังขับเคลื่อน แนวโน้มด้านเครดิต แนวโน้มด้านการใช้จ่าย และแนวโน้มด้านการลงทุน ทุกอย่างล้วนเป็นสัญญาณบวกและเติบโตขึ้นเรื่อยๆ นั่นคือสิ่งที่ทำให้เราขับเคลื่อนดีมานด์ที่แข็งแกร่งขนาดนี้ได้ และไม่ได้มาพร้อมต้นทุนที่สูงขึ้นอย่างที่หลายคนอาจคิด การลงทุนเพิ่มเติมนี้อยู่ในโอกาสการเติบโตใหม่ๆ ปีนี้เราเปิดตัวหลายอย่างที่ไม่เคยอยู่ในแผนปี 2026 เลย เราเพิ่งเปิดตัว Big Business Banking\n\nเราเปิดตัว SMB เปิดตัว SoFiUSD เปิดตัว SoFi Crypto และเรากำลังทุ่มเทกับ SoFi Plus เพราะมันทำผลงานได้ดีมาก แรงส่งนั้นยังคงดำเนินต่อเนื่อง อีกเรื่องที่อยากพูดคือ เราเข้าปีนี้มาโดยคาดว่าดอกเบี้ยจะลด แต่ตอนนี้เรากลับคาดว่าดอกเบี้ยจะขึ้น 2 ครั้ง เราไม่เพียงรักษาเป้ารายได้และความสามารถในการทำกำไรได้เท่านั้น แต่ยังทำได้เกินคาดในฝั่งรายได้ด้วย เมื่อมองไปที่ครึ่งปีหลัง ผมไม่แน่ใจว่าจะมีการลดดอกเบี้ย 2 ครั้งหรือไม่ ถ้ามี เราก็จะไม่มีปัญหา ขอโทษครับ ขึ้นดอกเบี้ย 2 ครั้ง ถ้ามีเราก็ไม่มีปัญหา ถ้าไม่มีการขึ้นดอกเบี้ยเลย เราน่าจะมี upside (ผลบวกส่วนเพิ่ม) ต่อผลกำไรด้านล่าง แต่เรามีช่องว่างในเป้าหมายที่ให้ไว้ พร้อมส่งมอบผลงานได้ไม่ว่าสภาพแวดล้อมจะเป็นอย่างไร\""
                },
                {
                        "heading": "Q5 — Kyle Peterson, Needham",
                        "en": "Q: \"Great. Good morning. Thank you guys for taking the question. Wanted to talk on the Loan Platform Business. I think this is the second quarter in a row you guys have talked about the demand is really good from the buyers, but you guys aren't necessarily fulfilling some of the upsized requests based on capital levels and unit economics for you guys. I guess how should we think about should that continue on the personal loan side moving forward, as you guys still have really strong capital ratios? I guess, is any of that volume decision impacted by HELOC and SMB starting to get ramped up on the platform? Thank you.\"\n\nChris Lapointe (CFO): \"Yeah. Absolutely. Thanks, Kyle. I'd say on how we're feeling about the PL business as it relates to LPB, we're happy with that level of volume. We're able to meet all of our contractual commitments and then some. Where you're going to start to see more meaningful growth is in some of these other asset types, and I walked through those earlier in the call during my prepared remarks and in the first question. As it relates to some of the capital consumption questions and how that pertains to LPB, what I would say is that we're self-funded through our guidance period and the medium-term operating plan that we've laid out. As our profitability continues to improve, our organic capital generation is going to continue to increase as well.\n\nCombined with continued growth in our capital-light businesses that Anthony's mentioned, as well as the flexibility that we have in how we monetize our originations, whether that's through the LPB program or on the balance sheet, we believe that we can operate comfortably within our target capital range without the need to raise capital under our current operating plan.\"",
                        "th": "คำถาม: \"ดีครับ สวัสดีตอนเช้า ขอบคุณที่รับคำถาม อยากถามเรื่อง Loan Platform Business นี่เป็นไตรมาสที่สองติดต่อกันแล้วที่พวกคุณพูดว่าดีมานด์จากฝั่งผู้ซื้อดีมาก แต่ก็ยังไม่ได้ตอบสนองคำขอปริมาณที่มากขึ้นบางส่วน เพราะข้อจำกัดด้านระดับเงินทุนและต้นทุนต่อหน่วย อยากรู้ว่าเรื่องนี้จะดำเนินต่อไปในฝั่งสินเชื่อบุคคลหรือไม่ ในเมื่อพวกคุณยังมีอัตราส่วนเงินกองทุนที่แข็งแกร่งมาก และการตัดสินใจเรื่องปริมาณนี้ได้รับผลกระทบจาก HELOC และ SMB ที่เริ่มขยายตัวบนแพลตฟอร์มหรือเปล่า ขอบคุณครับ\"\n\nChris Lapointe (CFO): \"ครับ แน่นอน ขอบคุณไคล์ ในแง่ความรู้สึกของเราต่อธุรกิจสินเชื่อบุคคลที่เกี่ยวข้องกับ LPB เราพอใจกับระดับปริมาณตอนนี้ เราสามารถทำได้ตามพันธะสัญญาทุกฉบับและมากกว่านั้น จุดที่จะเห็นการเติบโตที่มีนัยสำคัญมากขึ้นคือประเภทสินทรัพย์อื่นๆ ที่ผมได้อธิบายไปก่อนหน้านี้ในคำแถลงและคำถามแรก สำหรับคำถามเรื่องการใช้เงินกองทุนที่เกี่ยวข้องกับ LPB สิ่งที่ผมอยากบอกคือ เราสามารถดำเนินธุรกิจได้ด้วยเงินทุนตัวเองตลอดช่วงเป้าหมายที่ให้ไว้และแผนดำเนินงานระยะกลางที่เราวางไว้ เมื่อความสามารถในการทำกำไรของเราดีขึ้นต่อเนื่อง การสร้างเงินทุนภายในองค์กร (organic capital generation) ก็จะเพิ่มขึ้นต่อเนื่องเช่นกัน\n\nเมื่อรวมกับการเติบโตต่อเนื่องของธุรกิจที่ใช้เงินทุนน้อย (capital-light) ที่แอนโทนี่พูดถึง รวมถึงความยืดหยุ่นที่เรามีในการแปลงสินเชื่อที่ปล่อยไปเป็นรายได้ ไม่ว่าจะผ่านโปรแกรม LPB หรือเก็บไว้บนงบดุลเอง เราเชื่อว่าเราจะดำเนินธุรกิจได้อย่างสบายภายในกรอบเป้าหมายเงินทุนของเรา โดยไม่จำเป็นต้องระดมทุนเพิ่มภายใต้แผนดำเนินงานปัจจุบัน\""
                },
                {
                        "heading": "Q6 — Peter Christensen, Citi",
                        "en": "Q: \"Thank you. Good morning. Really nice results here. Anthony, I'm curious. With introducing some of these more commercial-like products, how should we think about the cross-buy flywheel here, or I guess in the future, and putting it around some of these newer offerings? Is it, 'Hey, this is a small business. We can connect to some of the proprietors there,' maybe for personal banking? Or do you envision some additional services that could serve that market to increase cross-buy?\"\n\nAnthony Noto (CEO): \"Yeah. What I'd say is the following. The most common sort of path or stage someone goes through is they come in through SoFi Relay or SoFi Money. If they come through Relay, the most prominent next product is going to be SoFi Money. If they come in through SoFi Money, there's going to be a path to Relay or to SoFi Invest or to Loans. SMB really was born out of the fact that a large percentage of our members actually are small business operators. Back during COVID, when the government provided PPP loans, we got a significant amount of demand for applications on PPP loans, even though we were not in the SMB business. We actually stood up an application process that met the government's application criteria and helped pass on that demand to lenders.\n\nThen on the back of that, we built a marketplace so that we actually get paid for that referral process that we're doing. The SMB business is very much synergistic to the rest of our business. I would think of it as just another use case for an individual to satisfy the needs they have from a borrowing standpoint. We'll obviously follow this up with checking and savings in SMB, and other products that are ancillary to that. It will add to the flywheel. Big business banking I don't think is truly appreciated by people outside the company. We were looking to partner with marketplaces and market makers in crypto, and everyone we talked to said, 'Can you please be our actual bank? Can you build a fiat and crypto banking capability that's API-driven?' That's where that business was born out of.\n\nNot only will it be a business on its own, it'll drive second-order benefits in driving more usage of SoFiUSD. The SoFiUSD product is going to be driven, obviously, by the net interest income from leaving that cash at the Fed Bank and earning Fed funds on it. We have a number of pieces of demand for SoFiUSD. We have big business banking, which is now up and running, and people can use SoFiUSD as a form of payment in those payment rails. We have our crypto business, which is actually settling in SoFiUSD. On the consumer side, we have our debit and credit card with Mastercard. We'll begin settling in SoFiUSD with Mastercard in the coming weeks. These businesses are starting to layer on top of each other, and there's synergies across them.\"",
                        "th": "คำถาม: \"ขอบคุณครับ สวัสดีตอนเช้า ผลงานดีมากจริงๆ แอนโทนี่ ผมสงสัยว่า เมื่อเปิดตัวผลิตภัณฑ์แนวธุรกิจ (commercial) มากขึ้น ควรมองกลไก cross-buy flywheel ตรงนี้อย่างไร หรือในอนาคต กับข้อเสนอใหม่ๆ เหล่านี้ หมายถึงแบบ 'นี่คือธุรกิจขนาดเล็ก เราเชื่อมกับเจ้าของกิจการได้' สำหรับธนาคารส่วนบุคคลหรือเปล่า หรือมองเห็นบริการเพิ่มเติมที่จะรองรับตลาดนั้นเพื่อเพิ่ม cross-buy\"\n\nAnthony Noto (CEO): \"ครับ สิ่งที่ผมอยากบอกคือ เส้นทางทั่วไปที่คนจะผ่านคือเข้ามาทาง SoFi Relay หรือ SoFi Money ถ้าเข้ามาทาง Relay โปรดักต์ถัดไปที่โดดเด่นที่สุดคือ SoFi Money ถ้าเข้ามาทาง SoFi Money ก็จะมีเส้นทางไปสู่ Relay หรือ SoFi Invest หรือสินเชื่อ ธุรกิจ SMB เกิดขึ้นจากข้อเท็จจริงที่ว่าสัดส่วนใหญ่ของสมาชิกเราเป็นเจ้าของธุรกิจขนาดเล็กอยู่แล้ว ย้อนไปช่วงโควิด ตอนที่รัฐบาลให้สินเชื่อ PPP เราได้รับความต้องการสมัครสินเชื่อ PPP จำนวนมาก แม้เราจะยังไม่ได้อยู่ในธุรกิจ SMB เราตั้งกระบวนการสมัครที่ตรงตามเกณฑ์ของภาครัฐ และช่วยส่งต่อความต้องการนั้นไปยังผู้ปล่อยสินเชื่อ\n\nจากนั้นเราสร้างตลาดกลางขึ้นมาเพื่อรับค่าตอบแทนจากกระบวนการส่งต่อนั้น ธุรกิจ SMB จึงมีความเชื่อมโยงอย่างมากกับธุรกิจส่วนที่เหลือของเรา ผมมองว่ามันเป็นเพียงอีกกรณีการใช้งานหนึ่งสำหรับคนที่ต้องการสินเชื่อ เราจะตามมาด้วยบัญชีเดินสะพัดและออมทรัพย์สำหรับ SMB และผลิตภัณฑ์อื่นๆ ที่เกี่ยวเนื่อง ซึ่งจะเสริม flywheel ต่อไป Big Business Banking ผมคิดว่าคนภายนอกบริษัทยังไม่เข้าใจคุณค่าที่แท้จริงของมัน เราต้องการหาพาร์ตเนอร์กับตลาดกลางและผู้ดูแลสภาพคล่อง (market maker) ในธุรกิจคริปโต และทุกคนที่เราคุยด้วยพูดว่า 'ช่วยเป็นธนาคารให้เราได้ไหม ช่วยสร้างความสามารถด้านธนาคารทั้งเงินจริงและคริปโตที่เชื่อมผ่าน API ได้ไหม' นั่นคือที่มาของธุรกิจนี้\n\nไม่เพียงแต่จะเป็นธุรกิจของตัวเองเท่านั้น มันยังจะสร้างประโยชน์ทางอ้อมในการเพิ่มการใช้งาน SoFiUSD ด้วย ผลิตภัณฑ์ SoFiUSD จะถูกขับเคลื่อนโดยรายได้ดอกเบี้ยสุทธิจากการฝากเงินสดไว้ที่ธนาคารกลางสหรัฐฯ และรับดอกเบี้ย Fed funds เรามีดีมานด์หลายส่วนสำหรับ SoFiUSD เรามี Big Business Banking ที่เปิดใช้งานแล้ว และผู้คนสามารถใช้ SoFiUSD เป็นช่องทางชำระเงินในระบบนั้นได้ เรามีธุรกิจคริปโตที่กำลังชำระผ่าน SoFiUSD อยู่แล้ว ฝั่งผู้บริโภคเรามีบัตรเดบิตและบัตรเครดิตร่วมกับ Mastercard ซึ่งจะเริ่มชำระผ่าน SoFiUSD กับ Mastercard ในอีกไม่กี่สัปดาห์ข้างหน้า ธุรกิจเหล่านี้กำลังเริ่มซ้อนทับกัน และเกิดประโยชน์ร่วม (synergy) ระหว่างกัน\""
                },
                {
                        "heading": "Q7 — Will Nance, Goldman Sachs",
                        "en": "Q: \"Hey, guys. Thanks for taking the question. I wanted to ask a question on the SoFi Plus commentary that you had and some of the membership growth that you guys have seen. I was hoping you could maybe talk through just the profile of the customers that are adopting the product. What have you seen from a wallet share perspective or an engagement perspective, and have you seen things like average deposit balances increasing, or engagement with the SoFi platform increasing on the back of some of those sign-ups? Thanks.\"\n\nAnthony Noto (CEO): \"Yeah. Our hope when we relaunched SoFi Plus is that it would increase the awareness of the other products that we offered that existing members may not be aware of, or new members may not be aware of, because SoFi Plus is meant to be the best of every individual product. If you sign up for SoFi Plus compared to just SoFi Money, you get a higher interest rate, you get other bells and whistles. If you sign up for SoFi Plus compared to just SoFi Invest, you get a 1% match. In each product, credit card, better rewards, et cetera. Of the 206,000 SoFi Plus members that we reported in the quarter, 85% of them are existing members. It's the same demographic of our member base already because they are members.\n\nThe 25% incremental purchases of a new product after SoFi Plus, primarily the thing that's benefiting the most is Invest, and that's really encouraging. That means we're increasing share of wallet. We have investors for the first time that are novice to new investors, but we're also getting investors that are transferring their money because of the match. Secondarily, the SoFi Money product is the product that benefits if SoFi Plus is in that 15% bucket. If SoFi Plus is the first product of a member, the second product that they're buying is SoFi Money.\n\nIn terms of the actual second-order effects of their existing activity, a SoFi Money member that takes out SoFi Plus, one-fourth of them are taking out a third product, but we're actually seeing increases in their deposits on the back of that SoFi Plus subscription sign-up, and we're seeing increases in AUM as well, and we're seeing increases in spending. There is a benefit for more products being taken out from SoFi Plus, and there's a benefit for more engagement as defined by more deposits, more AUM, and more spending. Here's a really interesting data point. I looked back at the Q1 2021 cohort.\n\nOf the SoFi Money members in the Q1 2021 cohort that became SoFi Money members that quarter, with the launch of SoFi Plus, we increased the product per member of that cohort by one product in the quarter, which is, if you think about it, that's almost five years old, that customer that was acquired, and they added one product for the entire cohort in the quarter. It's having a really strong impact, and that's why we mentioned in the earnings results and in my comments that we're seeing an inflection point benefiting from the flywheel. Crypto's also contributing to that flywheel as well as a new product.\"",
                        "th": "คำถาม: \"สวัสดีครับ ขอบคุณที่รับคำถาม ผมอยากถามเกี่ยวกับความเห็นเรื่อง SoFi Plus และการเติบโตของสมาชิกที่เห็น อยากให้เล่าถึงโปรไฟล์ของลูกค้าที่สมัครใช้ผลิตภัณฑ์นี้ ในแง่ส่วนแบ่งกระเป๋าเงิน (wallet share) หรือระดับการมีส่วนร่วม (engagement) เห็นยอดเงินฝากเฉลี่ยเพิ่มขึ้น หรือการมีส่วนร่วมกับแพลตฟอร์ม SoFi เพิ่มขึ้นจากการสมัครเหล่านี้หรือเปล่า ขอบคุณครับ\"\n\nAnthony Noto (CEO): \"ครับ ความหวังของเราตอนรีลอนช์ SoFi Plus คือให้เพิ่มการรับรู้ถึงผลิตภัณฑ์อื่นที่เรามีให้ ซึ่งสมาชิกเดิมหรือสมาชิกใหม่อาจยังไม่รู้จัก เพราะ SoFi Plus ถูกออกแบบให้เป็นสิ่งที่ดีที่สุดของแต่ละผลิตภัณฑ์ ถ้าสมัคร SoFi Plus เทียบกับแค่ SoFi Money จะได้อัตราดอกเบี้ยที่สูงกว่าและสิทธิประโยชน์อื่นเพิ่ม ถ้าสมัครเทียบกับแค่ SoFi Invest จะได้เงินสมทบ 1% ในแต่ละผลิตภัณฑ์ก็มีรางวัลบัตรเครดิตที่ดีขึ้นและอื่นๆ จากสมาชิก SoFi Plus 206,000 คนที่รายงานในไตรมาสนี้ 85% เป็นสมาชิกเดิมอยู่แล้ว จึงเป็นกลุ่มประชากรเดียวกับฐานสมาชิกเราอยู่แล้ว เพราะพวกเขาเป็นสมาชิกอยู่ก่อนแล้ว\n\nการซื้อผลิตภัณฑ์เพิ่มอีก 25% หลังสมัคร SoFi Plus ส่วนใหญ่ที่ได้ประโยชน์มากที่สุดคือ SoFi Invest ซึ่งน่ายินดีมาก หมายความว่าเรากำลังเพิ่มส่วนแบ่งกระเป๋าเงินของลูกค้า เรามีนักลงทุนหน้าใหม่ที่ไม่เคยลงทุนมาก่อน และยังได้นักลงทุนที่ย้ายเงินมาเพราะเงินสมทบด้วย รองลงมา SoFi Money เป็นผลิตภัณฑ์ที่ได้ประโยชน์ถ้า SoFi Plus อยู่ใน 15% กลุ่มนั้น ถ้า SoFi Plus เป็นผลิตภัณฑ์แรกของสมาชิก ผลิตภัณฑ์ที่สองที่พวกเขาซื้อจะเป็น SoFi Money\n\nในแง่ผลกระทบทางอ้อมต่อกิจกรรมที่มีอยู่เดิม สมาชิก SoFi Money ที่สมัคร SoFi Plus หนึ่งในสี่ของพวกเขาซื้อผลิตภัณฑ์ที่สามเพิ่ม แต่เราเห็นเงินฝากของพวกเขาเพิ่มขึ้นจริงหลังสมัคร SoFi Plus และเห็นสินทรัพย์ภายใต้การบริหาร (AUM) เพิ่มขึ้นด้วย รวมถึงการใช้จ่ายที่เพิ่มขึ้น มีประโยชน์ทั้งจากการซื้อผลิตภัณฑ์เพิ่มจาก SoFi Plus และจากการมีส่วนร่วมที่มากขึ้น ซึ่งวัดได้จากเงินฝาก AUM และการใช้จ่ายที่เพิ่มขึ้น มีข้อมูลที่น่าสนใจมาก ผมย้อนไปดูกลุ่มลูกค้า (cohort) ไตรมาสแรกปี 2021\n\nจากสมาชิก SoFi Money ในกลุ่มไตรมาสแรกปี 2021 ที่กลายเป็นสมาชิก SoFi Money ในไตรมาสนั้น เมื่อ SoFi Plus เปิดตัว เราเพิ่มจำนวนโปรดักต์ต่อสมาชิกของกลุ่มนั้นได้อีกหนึ่งโปรดักต์ในไตรมาสเดียว ซึ่งถ้าคิดดูแล้ว ลูกค้าที่ได้มาเกือบห้าปีแล้ว ยังเพิ่มโปรดักต์ให้ทั้งกลุ่มได้อีกหนึ่งตัวในไตรมาสนั้น มันส่งผลกระทบที่แข็งแกร่งมาก และนั่นคือเหตุผลที่เราพูดถึงในผลประกอบการและในคำแถลงว่าเรากำลังเห็นจุดเปลี่ยนที่ได้ประโยชน์จากกลไก flywheel นี้ คริปโตก็มีส่วนช่วยเสริม flywheel นี้เช่นกันในฐานะผลิตภัณฑ์ใหม่\""
                },
                {
                        "heading": "Q8 — Matt Cote, Truist",
                        "en": "Q: \"Hey. Good morning, guys. Thanks for taking the question. Anthony, I just wanted to ask about the spend down of that excess capital that you guys have talked about. You're in that advantageous position where you have a really strong CET1 ratio, a lot of capital to spend, but you've brought down that CET1 ratio pretty quickly over the past couple quarters. Could you talk about just capital balance sheet growth and kind of the spend down and the pace of the spend down of that excess capital?\"\n\nAnthony Noto (CEO): \"Sure. I'll let Chris get into the numbers in more detail. One of the benefits of growing our balance sheet in Q1 and Q2 of this year is that we have very strong visibility into our revenue for 2027. That visibility is going to continue because if we maintain our balance sheet at this size, it's going to produce the net interest income that's being delivered today consistently over time. Barring a huge change in the economy or overall credit performance, we can kind of count on that revenue in the future. That's a really stable thing to have so we can, at a minimum, fund a significant amount of investments regardless of the environment that we're in.\n\nWhen people ask, 'Why are you putting loans on the balance sheet, why are you not doing everything through Loan Platform Business?' It's because we want to make sure we have revenue in the future that's visible, that can deliver no matter what, and it's 100% in our control. We layer a Loan Platform Business on top of that, not just in PL, but now SMB and closed-end seconds. It's a very incremental additive return on top of something that's very visible, and we have five years of history.\n\nI don't know if people heard the numbers that I mentioned about over $5 billion of cash net interest income from what we generated in Q1 of 2024 through Q2 of 2026. That's an astronomical number, especially where it's 2X greater than what the non-cash revenue was recorded as a premium over time, which shows that the loans are really performing. I'll let Chris talk about where the capital ratios will settle out, et cetera.\"\n\nChris Lapointe (CFO), follow-up: \"Yep. We exited the quarter at an 18.8% total risk-based capital ratio, which is our binding constraint. That's well above the regulatory limit of 10.5%. As I mentioned in my prepared remarks, we believe that having a risk-based capital ratio in the low to mid-teens is appropriate for this business longer term. Like I said a few minutes ago, based on our current operating plan and the guidance that we've provided, we feel really good about being able to operate within those confines without the need to raise capital. As you know, as we continue to expand profitability, our organic capital generation will continue to increase, and by continuing to scale our capital-light fee-based revenue streams, that will help as well.\"",
                        "th": "คำถาม: \"สวัสดีครับ ขอบคุณที่รับคำถาม แอนโทนี่ ผมอยากถามเรื่องการใช้เงินกองทุนส่วนเกินที่พวกคุณพูดถึง คุณอยู่ในสถานะที่ได้เปรียบมาก มีอัตราส่วน CET1 (เงินกองทุนชั้นที่ 1 ต่อสินทรัพย์เสี่ยง) ที่แข็งแกร่งมาก มีเงินทุนให้ใช้เยอะ แต่ก็ลดอัตราส่วน CET1 ลงค่อนข้างเร็วในช่วงสองสามไตรมาสที่ผ่านมา ช่วยเล่าเรื่องการเติบโตของงบดุลกับเงินทุน และจังหวะการใช้เงินทุนส่วนเกินนั้นได้ไหม\"\n\nAnthony Noto (CEO): \"ได้ครับ ผมจะให้คริสลงรายละเอียดตัวเลขเพิ่มเติม ประโยชน์อย่างหนึ่งของการขยายงบดุลในไตรมาสแรกและไตรมาสที่สองของปีนี้คือ เรามองเห็นรายได้ปี 2027 ได้ชัดเจนมาก ความชัดเจนนั้นจะดำเนินต่อไป เพราะถ้าเรารักษาขนาดงบดุลนี้ไว้ มันจะสร้างรายได้ดอกเบี้ยสุทธิที่ส่งมอบได้อย่างสม่ำเสมอต่อเนื่องไปในอนาคต เว้นแต่จะมีการเปลี่ยนแปลงครั้งใหญ่ในเศรษฐกิจหรือคุณภาพสินเชื่อโดยรวม เราค่อนข้างมั่นใจได้กับรายได้นั้นในอนาคต นี่เป็นสิ่งที่มั่นคงมาก ทำให้อย่างน้อยเราสามารถใช้เงินสนับสนุนการลงทุนจำนวนมากได้ ไม่ว่าสภาพแวดล้อมจะเป็นอย่างไร\n\nเวลามีคนถามว่า 'ทำไมถึงเก็บสินเชื่อไว้บนงบดุล ทำไมไม่ทำผ่าน Loan Platform Business ทั้งหมด' เหตุผลคือเราต้องการให้แน่ใจว่าเรามีรายได้ในอนาคตที่มองเห็นชัดเจน ส่งมอบได้ไม่ว่าอะไรจะเกิดขึ้น และอยู่ภายใต้การควบคุมของเรา 100% เราวาง Loan Platform Business ซ้อนทับบนฐานนั้น ไม่ใช่แค่ในสินเชื่อบุคคล แต่ตอนนี้รวม SMB และ closed-end second ด้วย มันเป็นผลตอบแทนเพิ่มเติมที่ต่อยอดจากฐานที่มองเห็นชัดเจนอยู่แล้ว และเรามีประวัติมาห้าปีแล้ว\n\nผมไม่แน่ใจว่าทุกคนได้ยินตัวเลขที่ผมพูดถึงไหม เรื่องรายได้ดอกเบี้ยสุทธิจากเงินสดกว่า 5 พันล้านดอลลาร์ ที่เราสร้างได้ตั้งแต่ไตรมาสแรกปี 2024 จนถึงไตรมาสที่สองปี 2026 นั่นเป็นตัวเลขที่มหาศาลมาก โดยเฉพาะเมื่อมันสูงกว่ารายได้ที่ไม่ใช่เงินสด (non-cash revenue) ที่บันทึกเป็นพรีเมียมตลอดเวลาถึง 2 เท่า ซึ่งแสดงให้เห็นว่าสินเชื่อเหล่านี้ทำผลงานได้ดีจริงๆ ผมจะให้คริสพูดถึงว่าอัตราส่วนเงินกองทุนจะลงตัวที่ระดับไหนต่อไป\"\n\nเสริมโดย Chris Lapointe (CFO): \"ครับ เราปิดไตรมาสด้วยอัตราส่วนเงินกองทุนตามความเสี่ยงรวมที่ 18.8% ซึ่งเป็นข้อจำกัดที่ผูกมัดเรา (binding constraint) สูงกว่าเกณฑ์กำกับดูแลขั้นต่ำที่ 10.5% มาก อย่างที่ผมพูดในคำแถลง เราเชื่อว่าอัตราส่วนเงินกองทุนตามความเสี่ยงที่ระดับ 12-15% โดยประมาณ เหมาะสมกับธุรกิจนี้ในระยะยาว อย่างที่บอกไปเมื่อสักครู่ ตามแผนดำเนินงานปัจจุบันและเป้าหมายที่เราให้ไว้ เรารู้สึกมั่นใจมากว่าจะดำเนินธุรกิจได้ภายในกรอบนั้นโดยไม่ต้องระดมทุนเพิ่ม อย่างที่ทราบกันดี เมื่อเราขยายความสามารถในการทำกำไรต่อเนื่อง การสร้างเงินทุนภายในองค์กรก็จะเพิ่มขึ้นต่อเนื่องเช่นกัน และการขยายสัดส่วนรายได้ค่าธรรมเนียมที่ใช้เงินทุนน้อยก็จะช่วยเสริมตรงนี้ด้วย\""
                },
                {
                        "heading": "Closing remarks — Anthony Noto (CEO)",
                        "highlight": true,
                        "en": "\"In closing, Q2 marks a clear inflection point in our strategy where our Everything App is driving higher products per member, resulting in higher lifetime value, supporting superior levels of investment in our ability to offer more value to our members than anyone else in better rates, products, and services. This continuous reinforcing cycle of the financial services productivity fuels durable growth and high returns. The benefits of this strategy, in our view, are no longer theoretical or a leap of faith. They are 100% in our control via disciplined execution.\n\nI'm often asked why I buy the stock. The answer is simple: I believe we will achieve the returns that Chris walked through before of 20%-30% return on tangible common equity. It's just a matter of when, not if, the market can connect the dots to the attractive return potential of our business. Until then, we're going to keep our heads down and continue to execute and deliver for our members and our shareholders. Thank you. We look forward to talking to you next quarter.\"",
                        "th": "\"สรุปแล้ว ไตรมาสที่สองถือเป็นจุดเปลี่ยนที่ชัดเจนในกลยุทธ์ของเรา ที่ Everything App กำลังผลักดันให้จำนวนโปรดักต์ต่อสมาชิกสูงขึ้น ส่งผลให้มูลค่าตลอดอายุการเป็นสมาชิก (lifetime value) สูงขึ้น รองรับการลงทุนในระดับที่เหนือกว่าเพื่อมอบคุณค่าให้สมาชิกมากกว่าใครในตลาด ทั้งในแง่อัตราดอกเบี้ย ผลิตภัณฑ์ และบริการ วงจรเสริมแรงต่อเนื่องนี้ของประสิทธิภาพการเงินขับเคลื่อนการเติบโตที่ยั่งยืนและผลตอบแทนที่สูง ประโยชน์ของกลยุทธ์นี้ ในมุมมองของเรา ไม่ใช่แค่ทฤษฎีหรือการเดิมพันด้วยความเชื่ออีกต่อไป มันอยู่ภายใต้การควบคุมของเรา 100% ผ่านการดำเนินงานที่มีวินัย\n\nผมมักถูกถามว่าทำไมถึงซื้อหุ้นตัวเอง คำตอบง่ายๆ คือผมเชื่อว่าเราจะบรรลุผลตอบแทนตามที่คริสอธิบายไปก่อนหน้านี้ คือผลตอบแทนต่อส่วนของผู้ถือหุ้นที่จับต้องได้ (ROTCE) ระดับ 20-30% เป็นแค่เรื่องของเวลา ไม่ใช่ว่าจะทำได้หรือเปล่า ที่ตลาดจะเชื่อมโยงจุดต่างๆ เข้าด้วยกันและมองเห็นศักยภาพผลตอบแทนที่น่าสนใจของธุรกิจเรา จนกว่าจะถึงตอนนั้น เราจะยังคงก้มหน้าก้มตาทำงานและดำเนินการต่อไป เพื่อส่งมอบให้สมาชิกและผู้ถือหุ้นของเรา ขอบคุณครับ แล้วพบกันใหม่ไตรมาสหน้า\""
                }
        ]
      },
      "trackRecord": [
        {
          "claim": "ตอนประชุม Q1 2026 ผู้บริหารเคยบอกไว้ว่า Q2 2026 รายได้ปรับปรุงจะโตประมาณ 30% เทียบปีก่อน",
          "verdict": "hit",
          "note": "ผลจริงออกมาโตถึง 40% เกินกว่าที่เคยบอกไว้ค่อนข้างมาก ถือว่าทำได้ดีกว่าที่สัญญาไว้"
        },
        {
          "claim": "ตอนประชุม Q1 2026 เคยบอกว่า Q2 2026 มาร์จิ้น adjusted EBITDA จะอยู่ราว 30%",
          "verdict": "hit",
          "note": "ผลจริงออกมาที่มาร์จิ้น 30% พอดี ตรงตามที่เคยระบุไว้"
        },
        {
          "claim": "ตอนประชุม Q1 2026 เคยบอกว่า Q2 2026 มาร์จิ้นกำไรสุทธิปรับปรุงจะอยู่ราว 12-13%",
          "verdict": "hit",
          "note": "กำไรสุทธิปรับปรุง 160 ล้านดอลลาร์ หารด้วยรายได้ปรับปรุง 1.21 พันล้านดอลลาร์ เท่ากับมาร์จิ้นราว 13% อยู่ในช่วงบนของที่เคยให้ไว้"
        }
      ],
      "positives": [
        {
          "label": "โตเกินคาดทุกตัวเลขหลัก",
          "note": "รายได้ กำไรต่อหุ้น และมาร์จิ้น EBITDA สูงกว่าทั้งเป้าที่บริษัทเคยให้ไว้เองและประมาณการของนักวิเคราะห์"
        },
        {
          "label": "ปรับเป้าทั้งปีขึ้นอีกรอบ",
          "note": "บริษัทปรับเป้ารายได้ทั้งปี 2026 ขึ้นต่อเนื่อง สะท้อนความมั่นใจของผู้บริหารต่อแนวโน้มธุรกิจในครึ่งปีหลัง"
        },
        {
          "label": "ฐานสมาชิกและสินเชื่อโตพร้อมกัน",
          "note": "สมาชิกใหม่ 1.1 ล้านคนในไตรมาสเดียว ถือเป็นสถิติสูงสุด ยอดปล่อยสินเชื่อรวมทำสถิติใหม่ที่ 14.8 พันล้านดอลลาร์เช่นกัน"
        }
      ],
      "concerns": [
        {
          "label": "ราคาหุ้นปรับตัวลงหลังประกาศงบ",
          "note": "แม้ตัวเลขจะดีกว่าคาดในทุกตัวชี้วัดหลัก ราคาหุ้นกลับปรับตัวลงทันทีหลังประกาศผล อาจสะท้อนความกังวลของนักลงทุนในประเด็นอื่น เช่นคุณภาพสินเชื่อ หรือระดับราคาหุ้นก่อนประกาศงบ"
        },
        {
          "label": "ไม่ปรับเป้ามาร์จิ้น EBITDA ขึ้นตามรายได้ที่โต",
          "note": "นักวิเคราะห์สอบถามในที่ประชุมว่าเหตุใดจึงไม่ปรับเป้ามาร์จิ้นกำไรขึ้นทั้งที่รายได้โตกว่าคาด ผู้บริหารชี้แจงว่าเลือกนำรายได้ส่วนเพิ่มไปลงทุนต่อยอดการเติบโตแทนการรับเป็นกำไรทันที"
        }
      ],
      "discussion": [
        "ราคาหุ้นที่ปรับตัวลงทั้งที่ผลประกอบการดีกว่าคาด สะท้อนความกังวลของตลาดในประเด็นใด — คุณภาพสินเชื่อ ความยั่งยืนของอัตราการเติบโต หรือระดับราคาหุ้นก่อนประกาศงบ",
        "การเลือกลงทุนต่อยอดการเติบโตแทนการรับมาร์จิ้นกำไรเพิ่มทันที เป็นการตัดสินใจที่เหมาะสมในระยะยาวหรือเป็นการเลื่อนประเด็นด้านประสิทธิภาพออกไป"
      ],
      "caveats": "ข้อมูลนี้ใช้ประกอบการตัดสินใจเท่านั้น ไม่ใช่คำแนะนำการลงทุนโดยตรง ตัวเลขอ้างอิงจากรายงานผลประกอบการ (earnings release) และรายงานข่าวสาธารณะ ณ วันที่ 29-30 กรกฎาคม 2026 ตัวเลขคาดการณ์ (consensus) ของ Revenue และ EPS อ้างอิงจากรายงานของ Investing.com"
    }
,
    {
      "id": "er0002",
      "date": "2026-07-31",
      "ticker": "FICO",
      "company": "Fair Isaac Corporation",
      "quarter": "Q1 FY26",
      "reportDate": "2026-01-28",
      "verdict": "beat",
      "verdictLine": "รายได้และกำไรต่อหุ้นปรับปรุง (non-GAAP EPS) สูงกว่าประมาณการนักวิเคราะห์ทั้งคู่ โดยได้แรงหนุนหลักจากธุรกิจ Scores ที่เติบโต 29% เทียบปีก่อน ขณะที่ราคาหุ้นกลับปรับตัวลงหลังประกาศผลแม้ผลประกอบการจะออกมาดีกว่าคาด",
      "metrics": [
        {
          "label": "Revenue",
          "actual": "$512M",
          "est": "$511M",
          "deltaPct": "+0.1%",
          "dir": "pos"
        },
        {
          "label": "Non-GAAP EPS",
          "actual": "$7.33",
          "est": "$7.20",
          "deltaPct": "+1.8%",
          "dir": "pos"
        }
      ],
      "trend": [
        {
          "label": "Q2'25",
          "value": 499
        },
        {
          "label": "Q3'25",
          "value": 536
        },
        {
          "label": "Q4'25",
          "value": 516
        },
        {
          "label": "Q1'26",
          "value": 512
        }
      ],
      "guidance": null,
      "trackRecord": [
        {
          "claim": "ตอนประกาศงบไตรมาส 4 ปีงบ 2025 (พ.ย. 2025) ผู้บริหารให้เป้าปีงบ 2026 แบบที่มีการเผื่อความไม่แน่นอนของตลาดจำนองไว้ล่วงหน้า และบอกว่าอาจปรับเป้าขึ้นได้ถ้าสถานการณ์ตลาดดีกว่าคาด",
          "verdict": "partial",
          "note": "ผลไตรมาส 1 ออกมาดีกว่าประมาณการทั้งรายได้และกำไรต่อหุ้นจริง สอดคล้องกับที่เผื่อไว้ แต่ฝ่ายบริหารเลือกยังไม่ปรับเป้าทั้งปีขึ้นในรอบนี้ โดยให้เหตุผลว่าต้องการข้อมูลอีกอย่างน้อยหนึ่งไตรมาสก่อนตัดสินใจ"
        },
        {
          "claim": "ตอนไตรมาส 4 ปีงบ 2025 บริษัทเริ่มโครงการ direct licensing กับพันธมิตรผู้ให้บริการข้อมูลเครดิตในตลาดจำนอง (mortgage reseller) โดยตั้งเป้าขยายจำนวนพันธมิตรต่อเนื่องในปีงบ 2026",
          "verdict": "hit",
          "note": "ไตรมาส 1 เพิ่มพันธมิตรใหม่ 4 ราย (Zaktis, Kotality, Ascend Companies, CIC Credit) และเซ็นข้อตกลงเพิ่มกับ MeridianLink อีกหนึ่งราย ถือว่าขยายได้ตามแผนที่วางไว้"
        },
        {
          "claim": "กำหนดเวลาที่ FICO Score 10T จะได้รับการอนุมัติให้ใช้ในตลาดจำนองมาตรฐาน (conforming) ยังไม่ชัดเจนตอนพูดในไตรมาส 4 ปีงบ 2025",
          "verdict": "hit",
          "note": "ไตรมาส 1 ผู้บริหารยังคงยืนยันว่ายังไม่มีกำหนดเวลาที่แน่นอนจากหน่วยงานกำกับดูแล สอดคล้องกับความไม่แน่นอนที่เคยแจ้งไว้ ไม่ได้มั่นใจเกินจริง"
        }
      ],
      "positives": [
        {
          "label": "ธุรกิจ Scores เร่งตัวแรง",
          "note": "รายได้กลุ่ม Scores โต 29% เทียบปีก่อน จากทั้งฝั่ง B2B (นำโดยการให้คะแนนสินเชื่อจำนอง) และ B2C ที่ยังโตต่อเนื่อง"
        },
        {
          "label": "กระแสเงินสดและการคืนเงินผู้ถือหุ้นแข็งแกร่ง",
          "note": "กระแสเงินสดอิสระ (free cash flow) 4 ไตรมาสล่าสุดรวม 718 ล้านดอลลาร์ เพิ่มขึ้น 7% และยังซื้อหุ้นคืนต่อเนื่อง"
        },
        {
          "label": "ได้รับการยอมรับจาก Gartner ว่าเป็นผู้นำ",
          "note": "FICO Platform ได้รับเลือกเป็น Leader ใน Gartner Magic Quadrant สำหรับ Decision Intelligence Platforms ประจำเดือนมกราคม 2026 สะท้อนความคืบหน้าของกลยุทธ์ปรับเป็นธุรกิจแพลตฟอร์ม"
        }
      ],
      "concerns": [
        {
          "label": "ราคาหุ้นปรับตัวลงแม้ผลประกอบการดีกว่าคาด",
          "note": "หุ้นร่วง 2.8% ในการซื้อขายนอกเวลาหลังประกาศผล สะท้อนว่านักลงทุนบางส่วนกังวลประเด็นอื่นมากกว่าตัวเลขไตรมาสนี้ เช่นการแข่งขันจาก VantageScore"
        },
        {
          "label": "ธุรกิจ Software เติบโตช้ากว่า Scores มาก",
          "note": "รายได้ซอฟต์แวร์โตเพียง 2% เทียบปีก่อน ขณะที่รายได้ที่ไม่ใช่แพลตฟอร์ม (non-platform) ลดลง 13% แสดงว่าการเติบโตของบริษัทตอนนี้พึ่งพาธุรกิจ Scores เป็นหลัก"
        },
        {
          "label": "ยังไม่ปรับเป้าทั้งปีขึ้นทั้งที่ทำได้ดีกว่าคาด",
          "note": "ฝ่ายบริหารเลือกรอดูข้อมูลเพิ่มเติมก่อนปรับเป้า อาจสะท้อนความกังวลต่อความไม่แน่นอนของตลาดจำนองและแรงกดดันด้านราคาจากคู่แข่ง"
        }
      ],
      "discussion": [
        "การที่ฝ่ายบริหารยังไม่ปรับเป้าทั้งปีขึ้นทั้งที่ผลไตรมาสนี้ดีกว่าคาด เป็นความระมัดระวังตามปกติ หรือสะท้อนความกังวลเรื่องการแข่งขันจาก VantageScore ที่เริ่มมีน้ำหนักมากขึ้น",
        "รายได้กลุ่ม Scores ที่พึ่งพาตลาดจำนองเป็นหลักในตอนนี้ จะยังโตต่อเนื่องในระดับนี้ได้อีกกี่ไตรมาส หากอัตราดอกเบี้ยหรือปริมาณการขอสินเชื่อบ้านเปลี่ยนทิศทาง"
      ],
      "caveats": "ข้อมูลนี้ไม่ใช่คำแนะนำการลงทุน จัดทำเพื่อการศึกษาและประกอบการตัดสินใจส่วนบุคคลเท่านั้น ตัวเลขอ้างอิงรายงานผลประกอบการอย่างเป็นทางการของ Fair Isaac Corporation และรายงานข่าวสาธารณะ ณ วันที่ 31 กรกฎาคม 2026 ตัวเลขประมาณการ (consensus) ของนักวิเคราะห์อ้างอิงจากรายงานรวบรวมของสำนักข่าวการเงินสาธารณะ",
      "transcriptExcerpt": {
        "segments": [
          {
            "heading": "Opening remarks — Will Lansing (CEO), financial highlights",
            "highlight": true,
            "en": "Thanks, Dave, and thank you, everyone, for joining us for our first quarter earnings call. We had another strong quarter and are reiterating our fiscal 2026 guidance. We reported Q1 revenues of $512 million, up 16% over last year, as you can see on Page five of our investor presentation. For the quarter, we reported $158 million in GAAP net income, up 4%, and GAAP earnings of $6.61 per share, up 8% from the prior year. We reported $176 million in non-GAAP net income, up 22%, and non-GAAP earnings of $7.33 per share, up 27% from the prior year. We delivered free cash flow of $165 million in our first quarter.\n\nOver the last four quarters, we delivered $718 million in free cash flow, an increase of 7% year over year. We continue to return capital to our shareholders through buybacks by repurchasing 95,000 shares in Q1 at an average price of $1,707 per share. At the segment level, on Page six, you can see our first quarter SCORED segment revenues were $305 million, up 29% versus the prior year. While B2B scores were the key driver of growth, we also saw continued growth in B2C scores. In our software segment, we delivered $207 million in Q1 revenues, up 2% over last year. Results included 37% platform revenue growth and a 13% decline in non-platform revenue.",
            "th": "ขอบคุณเดฟ และขอบคุณทุกท่านที่เข้าร่วมฟังผลประกอบการไตรมาสแรกของเรา ไตรมาสนี้เราทำผลงานได้แข็งแกร่งอีกครั้งและยังคงยืนยันเป้าหมายทั้งปีงบ 2026 ตามเดิม เรารายงานรายได้ไตรมาส 1 ที่ 512 ล้านดอลลาร์ เพิ่มขึ้น 16% จากปีก่อน ตามที่แสดงในหน้า 5 ของเอกสารนำเสนอนักลงทุน สำหรับไตรมาสนี้ เรารายงานกำไรสุทธิตามบัญชี (GAAP net income) 158 ล้านดอลลาร์ เพิ่มขึ้น 4% และกำไรต่อหุ้นตามบัญชี (GAAP EPS) 6.61 ดอลลาร์ เพิ่มขึ้น 8% จากปีก่อน เรารายงานกำไรสุทธิปรับปรุง (non-GAAP net income) 176 ล้านดอลลาร์ เพิ่มขึ้น 22% และกำไรต่อหุ้นปรับปรุง (non-GAAP EPS) 7.33 ดอลลาร์ เพิ่มขึ้น 27% จากปีก่อน เราทำกระแสเงินสดอิสระ (free cash flow) ได้ 165 ล้านดอลลาร์ในไตรมาสแรกนี้\n\nตลอด 4 ไตรมาสที่ผ่านมา เราทำกระแสเงินสดอิสระรวม 718 ล้านดอลลาร์ เพิ่มขึ้น 7% เทียบปีก่อน เรายังคงคืนเงินทุนให้ผู้ถือหุ้นผ่านการซื้อหุ้นคืนต่อเนื่อง โดยซื้อคืน 95,000 หุ้นในไตรมาส 1 ที่ราคาเฉลี่ย 1,707 ดอลลาร์ต่อหุ้น ในระดับเซกเมนต์ตามหน้า 6 รายได้กลุ่ม Scores ในไตรมาสแรกอยู่ที่ 305 ล้านดอลลาร์ เพิ่มขึ้น 29% เทียบปีก่อน แม้สกอร์ฝั่ง B2B จะเป็นตัวขับเคลื่อนหลักของการเติบโต แต่เราก็ยังเห็นการเติบโตต่อเนื่องของฝั่ง B2C ด้วยเช่นกัน ในกลุ่มซอฟต์แวร์ เราทำรายได้ไตรมาส 1 ได้ 207 ล้านดอลลาร์ เพิ่มขึ้น 2% จากปีก่อน ผลลัพธ์นี้รวมถึงรายได้ฝั่งแพลตฟอร์ม (platform) ที่โต 37% ขณะที่รายได้ฝั่งที่ไม่ใช่แพลตฟอร์ม (non-platform) ลดลง 13%"
          },
          {
            "heading": "CEO update — Mortgage direct licensing & FICO Score 10T",
            "highlight": true,
            "en": "The FICO mortgage direct licensing program allows resellers the ability to streamline score access, enhance price transparency, and provide cost savings to lenders to reduce breakage fees. This quarter, we announced the addition of four new strategic resellers to the FICO Mortgage Direct Licensing program: Zaktis, Kotality, Ascend Companies, and CIC Credit. Additionally, we signed a DLP agreement to add another participant, MeridianLink, a key platform provider to the mortgage industry. We'll be releasing a press release on that soon. With strong demand from lenders, FICO is actively working alongside participants to support testing.\n\nOne large reseller is close to completing production integration testing. Another large reseller has completed that testing and is now testing system integration downstream. While we expect to go live soon with multiple partners, we also continue to work on finalizing agreements with additional reseller participants. The direct license program currently supports classic FICO. The conforming market is anticipating the general availability of FICO Score 10 T. We expect FICO Score 10 T to be available for direct licensing in both conforming and nonconforming in 2026.",
            "th": "โครงการให้สิทธิ์ใช้สกอร์โดยตรงสำหรับตลาดจำนอง (FICO mortgage direct licensing) ช่วยให้ผู้ให้บริการข้อมูลเครดิต (reseller) เข้าถึงสกอร์ได้คล่องตัวขึ้น เพิ่มความโปร่งใสด้านราคา และช่วยผู้ให้กู้ประหยัดค่าธรรมเนียมที่เกิดจากการทำธุรกรรมไม่สำเร็จ (breakage fee) ไตรมาสนี้เราประกาศเพิ่มพันธมิตร reseller เชิงกลยุทธ์ใหม่ 4 ราย เข้าโครงการ FICO Mortgage Direct Licensing ได้แก่ Zaktis, Kotality, Ascend Companies และ CIC Credit นอกจากนี้เรายังเซ็นข้อตกลง DLP เพื่อเพิ่มผู้เข้าร่วมอีกราย คือ MeridianLink ซึ่งเป็นผู้ให้บริการแพลตฟอร์มสำคัญของอุตสาหกรรมจำนอง เราจะออกข่าวประชาสัมพันธ์เรื่องนี้เร็วๆ นี้ ด้วยความต้องการที่แข็งแกร่งจากผู้ให้กู้ FICO กำลังทำงานร่วมกับผู้เข้าร่วมอย่างใกล้ชิดเพื่อสนับสนุนการทดสอบระบบ\n\nreseller รายใหญ่รายหนึ่งใกล้เสร็จสิ้นการทดสอบระบบในสภาพแวดล้อมจริง (production integration testing) แล้ว ส่วนอีกรายทดสอบขั้นนั้นเสร็จแล้วและกำลังทดสอบการเชื่อมต่อระบบขั้นถัดไป แม้เราคาดว่าจะเริ่มใช้งานจริง (go live) กับพันธมิตรหลายรายในเร็วๆ นี้ เราก็ยังคงเดินหน้าปิดข้อตกลงกับ reseller รายอื่นเพิ่มเติมต่อไป ปัจจุบันโครงการ direct license รองรับเฉพาะ FICO Score รุ่นคลาสสิก ขณะที่ตลาดจำนองมาตรฐาน (conforming) กำลังรอการเปิดใช้งานทั่วไป (general availability) ของ FICO Score 10T เราคาดว่า FICO Score 10T จะพร้อมให้ใช้สิทธิ์โดยตรงทั้งในตลาด conforming และ nonconforming ภายในปี 2026"
          },
          {
            "heading": "CEO update — UltraFICO/Plaid partnership",
            "en": "This quarter, we also announced a strategic partnership with Plaid to deliver the next generation of UltraFICO Score. The score combines the proven reliability of the FICO Score with real-time cash flow data from Plaid to provide lenders with a single enhanced credit score that delivers superior consumer risk assessment without operational complexity. The enhanced UltraFICO Score solution is credit bureau agnostic and will leverage cash flow data, historical and current information about the money flowing into and out of a consumer's transaction accounts, that's checking, savings, money market, accessed through Plaid's Open Finance network of consumer-permissioned data.\n\nPlaid powers nearly 1 million secure financial connections each day and has helped more than half of Americans with a bank account securely move more of their financial life online. We see growing demand for the score, which will launch for distribution with Plaid in 2026.",
            "th": "ไตรมาสนี้เรายังประกาศความร่วมมือเชิงกลยุทธ์กับ Plaid เพื่อพัฒนา UltraFICO Score รุ่นใหม่ สกอร์นี้ผสมความน่าเชื่อถือที่พิสูจน์แล้วของ FICO Score เข้ากับข้อมูลกระแสเงินสด (cash flow data) แบบเรียลไทม์จาก Plaid เพื่อมอบสกอร์เครดิตที่ยกระดับขึ้นตัวเดียวให้ผู้ให้กู้ ประเมินความเสี่ยงผู้บริโภคได้แม่นยำขึ้นโดยไม่เพิ่มความซับซ้อนในการดำเนินงาน โซลูชัน UltraFICO Score รุ่นปรับปรุงนี้ไม่ผูกติดกับบริษัทข้อมูลเครดิตรายใดรายหนึ่ง (credit bureau agnostic) และจะใช้ข้อมูลกระแสเงินสด ทั้งข้อมูลย้อนหลังและปัจจุบันเกี่ยวกับเงินที่ไหลเข้า-ออกบัญชีธุรกรรมของผู้บริโภค ไม่ว่าจะเป็นบัญชีเดินสะพัด บัญชีออมทรัพย์ หรือบัญชีตลาดเงิน ผ่านเครือข่าย Open Finance ของ Plaid ที่ผู้บริโภคยินยอมให้เข้าถึงข้อมูลเอง\n\nPlaid รองรับการเชื่อมต่อข้อมูลการเงินที่ปลอดภัยเกือบ 1 ล้านครั้งต่อวัน และช่วยให้ชาวอเมริกันกว่าครึ่งที่มีบัญชีธนาคารย้ายชีวิตทางการเงินของตัวเองไปออนไลน์ได้อย่างปลอดภัยมากขึ้น เราเห็นความต้องการสกอร์นี้เพิ่มขึ้นเรื่อยๆ และจะเริ่มจัดจำหน่ายร่วมกับ Plaid ในปี 2026"
          },
          {
            "heading": "CEO update — FICO Score Mortgage Simulator",
            "en": "Within the quarter, we continued to expand adoption of FICO Score Mortgage Simulator by partnering with Sharper Lending Solutions, Credit Interlink, and Ascend Partners. Including Zaktis and MeridianLink announced in fiscal 2025, five resellers have adopted the simulator, and we're expecting another large reseller to sign shortly. The FICO Score Mortgage Simulator is the only simulation tool available to mortgage professionals that use the FICO Score algorithm.\n\nIt enables mortgage professionals to run credit event scenarios by applying mock changes in an applicant's credit report data to simulate potential changes to the applicant's FICO Score. The FICO Score Mortgage Simulator supports simulations on all three credit bureaus and models potential changes to several FICO Score versions used in mortgage lending. More mortgage professionals can leverage valuable insight from the simulator to help drive smarter decisions that can present more loan options and favorable interest rates for customers.",
            "th": "ในไตรมาสนี้เรายังคงขยายการใช้งาน FICO Score Mortgage Simulator ต่อเนื่อง โดยจับมือกับ Sharper Lending Solutions, Credit Interlink และ Ascend Partners เพิ่มเติม รวมกับ Zaktis และ MeridianLink ที่ประกาศไปแล้วในปีงบ 2025 ทำให้ตอนนี้มี reseller ทั้งหมด 5 รายที่นำเครื่องมือนี้ไปใช้ และเราคาดว่าจะมี reseller รายใหญ่อีกรายเซ็นสัญญาเร็วๆ นี้ FICO Score Mortgage Simulator เป็นเครื่องมือจำลองสถานการณ์เพียงตัวเดียวในตลาดสำหรับผู้เชี่ยวชาญด้านสินเชื่อจำนองที่ใช้อัลกอริทึมของ FICO Score โดยตรง\n\nเครื่องมือนี้ช่วยให้ผู้เชี่ยวชาญด้านสินเชื่อจำนองจำลองสถานการณ์เหตุการณ์ด้านเครดิตต่างๆ ได้ ด้วยการปรับเปลี่ยนข้อมูลรายงานเครดิตของผู้สมัครสมมติ เพื่อดูว่า FICO Score ของผู้สมัครอาจเปลี่ยนแปลงไปอย่างไร เครื่องมือนี้รองรับการจำลองข้อมูลจากทั้ง 3 บริษัทข้อมูลเครดิต และจำลองการเปลี่ยนแปลงที่อาจเกิดขึ้นกับ FICO Score หลายเวอร์ชันที่ใช้ในสินเชื่อจำนอง ทำให้ผู้เชี่ยวชาญด้านสินเชื่อจำนองจำนวนมากขึ้นสามารถใช้ข้อมูลเชิงลึกที่มีค่าจากเครื่องมือนี้ เพื่อช่วยตัดสินใจได้ฉลาดขึ้น และนำเสนอทางเลือกสินเชื่อพร้อมอัตราดอกเบี้ยที่ดีกว่าให้ลูกค้าได้มากขึ้น"
          },
          {
            "heading": "CEO update — Gartner recognition & FICO World 2026",
            "en": "In our software business, we're thrilled to be recognized by Gartner as a leader in the January 2026 Gartner Magic Quadrant for decision intelligence platforms. We are positioned the highest for our ability to execute. We believe this recognition is a landmark moment for FICO. Further, we feel it reflects our commitments to empowering customers and delivering lasting impact worldwide. As a market leader in decision intelligence, FICO enables businesses to make real-time decisions at scale. The core of our strategy is to empower customers with always-on real-time customer insights that deliver connected decisions and continuous learning throughout the entire customer life cycle.\n\nOur innovations will be on display at FICO World 2026, which is going to happen May 22 in Orlando, Florida. FICO World brings together customers and partners from around the world, allowing participants to collaborate on how FICO platform makes real-time decisions at scale and optimize interactions with consumers.",
            "th": "ในธุรกิจซอฟต์แวร์ เรารู้สึกยินดีอย่างยิ่งที่ได้รับการยอมรับจาก Gartner ให้เป็นผู้นำ (Leader) ใน Gartner Magic Quadrant สำหรับ Decision Intelligence Platforms ประจำเดือนมกราคม 2026 โดยเราได้คะแนนความสามารถในการดำเนินการ (ability to execute) สูงที่สุด เราเชื่อว่าการยอมรับครั้งนี้เป็นจุดเปลี่ยนสำคัญของ FICO และยังสะท้อนความมุ่งมั่นของเราในการส่งเสริมศักยภาพลูกค้าและสร้างผลกระทบที่ยั่งยืนไปทั่วโลก ในฐานะผู้นำตลาดด้าน decision intelligence (การตัดสินใจเชิงข้อมูลอัจฉริยะ) FICO ช่วยให้ธุรกิจตัดสินใจแบบเรียลไทม์ได้ในระดับขนาดใหญ่ แก่นกลยุทธ์ของเราคือการส่งเสริมให้ลูกค้าใช้ข้อมูลเชิงลึกลูกค้าแบบเรียลไทม์ตลอดเวลา เพื่อสร้างการตัดสินใจที่เชื่อมโยงกันและการเรียนรู้ต่อเนื่องตลอดวงจรชีวิตของลูกค้า\n\nนวัตกรรมของเราจะจัดแสดงในงาน FICO World 2026 ซึ่งจะจัดขึ้นวันที่ 22 พฤษภาคม ที่เมืองออร์แลนโด รัฐฟลอริดา งาน FICO World รวบรวมลูกค้าและพันธมิตรจากทั่วโลก เปิดโอกาสให้ผู้เข้าร่วมได้ร่วมมือกันว่าแพลตฟอร์มของ FICO จะช่วยตัดสินใจแบบเรียลไทม์ในระดับขนาดใหญ่ และเพิ่มประสิทธิภาพการปฏิสัมพันธ์กับผู้บริโภคได้อย่างไร"
          },
          {
            "heading": "CFO Steven Weber — Segment & ARR detail",
            "en": "Our SCORE segment revenues for the quarter were $305 million, up 29% from the prior year. Our software ACV bookings for the quarter were a record $38 million. Our total software ARR was $766 million, a 5% increase over the prior year. Platform ARR was $303 million, representing 40% of our total Q1 2026 ARR. Platform ARR grew 33% versus the prior year. Our dollar-based net retention rate in the quarter was 103%. Platform NRR was 122%, while our non-NRR was 91%.",
            "th": "รายได้กลุ่ม Scores ของเราในไตรมาสนี้อยู่ที่ 305 ล้านดอลลาร์ เพิ่มขึ้น 29% จากปีก่อน ยอดสั่งซื้อซอฟต์แวร์ประจำปี (ACV bookings) ของเราในไตรมาสนี้ทำสถิติสูงสุดที่ 38 ล้านดอลลาร์ รายได้ประจำต่อปีของซอฟต์แวร์รวม (total software ARR) อยู่ที่ 766 ล้านดอลลาร์ เพิ่มขึ้น 5% จากปีก่อน โดย Platform ARR อยู่ที่ 303 ล้านดอลลาร์ คิดเป็น 40% ของ ARR รวมในไตรมาส 1 ปีงบ 2026 และ Platform ARR เติบโต 33% เทียบปีก่อน อัตราการรักษารายได้ลูกค้าเดิมแบบคิดเป็นมูลค่า (dollar-based net retention rate) ในไตรมาสนี้อยู่ที่ 103% โดยฝั่งแพลตฟอร์ม (Platform NRR) อยู่ที่ 122% ขณะที่ฝั่งที่ไม่ใช่แพลตฟอร์มอยู่ที่ 91%"
          },
          {
            "heading": "CFO Steven Weber — Margins & opex",
            "en": "Operating expenses for the quarter were $278 million this quarter versus $279 million in the prior quarter. Our non-GAAP operating margin was 54% for the quarter compared with 50% in the same quarter last year. The effective tax rate for the quarter was 17.5%. The operating tax rate was 25.7%.",
            "th": "ค่าใช้จ่ายในการดำเนินงานของไตรมาสนี้อยู่ที่ 278 ล้านดอลลาร์ เทียบกับ 279 ล้านดอลลาร์ในไตรมาสก่อนหน้า มาร์จิ้นกำไรจากการดำเนินงานปรับปรุง (non-GAAP operating margin) ของเราอยู่ที่ 54% เทียบกับ 50% ในไตรมาสเดียวกันของปีก่อน อัตราภาษีที่แท้จริง (effective tax rate) ของไตรมาสนี้อยู่ที่ 17.5% ส่วนอัตราภาษีจากการดำเนินงาน (operating tax rate) อยู่ที่ 25.7%"
          },
          {
            "heading": "Guidance Q&A — เหตุผลที่ยังไม่ปรับเป้าทั้งปีขึ้น",
            "highlight": true,
            "en": "We had another strong quarter and are reiterating our fiscal 2026 guidance.\n\nWe're pretty confident we're going to be able to beat our guidance... At this point, we're only three months in. There's just a lot of questions out in the macro environment... we don't know what numbers we would move to. So I think by next quarter, we'll have a much better idea. There's just a lot of uncertainty in the marketplace... If we were to take a guess now, we would probably... still think we were being too conservative. So at this point, three months, we're gonna know a lot more.",
            "th": "ไตรมาสนี้เราทำผลงานได้แข็งแกร่งอีกครั้ง และยังคงยืนยันเป้าหมายทั้งปีงบ 2026 ตามเดิม\n\nเรามั่นใจพอสมควรว่าจะทำได้ดีกว่าเป้าที่วางไว้ แต่ตอนนี้เพิ่งผ่านไปแค่ 3 เดือนเท่านั้น ยังมีคำถามเยอะมากในภาพรวมเศรษฐกิจมหภาค เรายังไม่รู้ว่าถ้าจะปรับตัวเลขเป้าใหม่ ควรปรับไปที่เท่าไหร่ ดังนั้นคิดว่าไตรมาสหน้าเราจะเห็นภาพชัดเจนกว่านี้มาก ตลาดตอนนี้ยังมีความไม่แน่นอนอยู่มาก ถ้าให้เดาตอนนี้ เราคงคิดว่าเป้าที่ตั้งไว้ยังระมัดระวังเกินไปด้วยซ้ำ ดังนั้น ณ จุดนี้ที่เพิ่งผ่านไป 3 เดือน เราจะรู้ข้อมูลมากขึ้นอีกเยอะในไตรมาสถัดไป"
          },
          {
            "heading": "Q&A — กำหนดเวลาการอนุมัติ FICO Score 10T (Manav Patnaik, Barclays)",
            "en": "They're still doing a lot of testing. We don't really have a timeline. They haven't published any kind of a timeline yet.",
            "th": "พวกเขา (หน่วยงานกำกับดูแล/GSE) ยังอยู่ระหว่างทดสอบอีกมาก เรายังไม่มีกำหนดเวลาที่แน่นอน และยังไม่มีการประกาศไทม์ไลน์ใดๆ ออกมา"
          },
          {
            "heading": "Q&A — จังหวะเวลาของ LLPA grids (Jason Haas, Wells Fargo)",
            "en": "The short answer to that is no. I don't think anyone knows what the timeline for the LLPA grids looks like.",
            "th": "คำตอบสั้นๆ คือไม่ ผมไม่คิดว่าจะมีใครรู้ว่าไทม์ไลน์ของตาราง LLPA (Loan-Level Price Adjustment — ตารางปรับราคาตามความเสี่ยงระดับสินเชื่อรายตัว) จะเป็นอย่างไร"
          },
          {
            "heading": "Q&A — การเริ่มใช้งานจริงของ reseller และการสื่อสารกับโบรกเกอร์ (Ashish Sabadra, RBC)",
            "en": "This is the mortgage market, and we don't do anything without having everything extremely buttoned up.",
            "th": "นี่คือตลาดจำนอง และเราจะไม่ทำอะไรเลยจนกว่าทุกอย่างจะเรียบร้อยรัดกุมที่สุดแล้ว"
          },
          {
            "heading": "Q&A — กลยุทธ์แพลตฟอร์มกับเป้าหมาย 500 บัญชีลูกค้าหลักทั่วโลก (Surinder Thind, Jefferies)",
            "en": "We're in the beginning of that phase two...the platform is very much designed to be horizontal.",
            "th": "เรายังอยู่ในช่วงเริ่มต้นของเฟสที่สอง แพลตฟอร์มของเราถูกออกแบบมาให้ใช้งานได้ข้ามหลายกลุ่มธุรกิจ (horizontal) เป็นหลัก"
          },
          {
            "heading": "Q&A — ความต่างระหว่าง FICO กับ VantageScore (Jeffrey Meuler, Baird)",
            "highlight": true,
            "en": "Our research suggests that the FICO score and the Vantage score are more than 20 points different 30% of the time.",
            "th": "งานวิจัยของเราชี้ว่า FICO Score กับ VantageScore ให้ผลต่างกันมากกว่า 20 คะแนน ในสัดส่วนถึง 30% ของกรณีทั้งหมด"
          },
          {
            "heading": "Q&A — ความจำเป็นของ LLPA grid สำหรับการยอมรับ 10T ในตลาด conforming (Faiza Alwy, Deutsche Bank)",
            "en": "When 10 T is made available, there'll probably be an adjustment to the grid for that.",
            "th": "เมื่อ 10T พร้อมใช้งานจริง น่าจะมีการปรับตารางราคา (grid) ให้สอดคล้องกันด้วย"
          }
        ]
      }
    },
    {
      "id": "er0003",
      "date": "2026-07-31",
      "ticker": "FICO",
      "company": "Fair Isaac Corporation",
      "quarter": "Q2 FY26",
      "reportDate": "2026-04-28",
      "verdict": "beat",
      "verdictLine": "รายได้และกำไรต่อหุ้นปรับปรุงสูงกว่าประมาณการนักวิเคราะห์ทั้งคู่ค่อนข้างมาก โดยรายได้เติบโตถึง 39% เทียบปีก่อน ได้แรงหนุนหลักจากรายได้สินเชื่อจำนองในกลุ่ม Scores ที่พุ่งขึ้น 127%",
      "metrics": [
        {
          "label": "Revenue",
          "actual": "$692M",
          "est": "$642M",
          "deltaPct": "+7.7%",
          "dir": "pos"
        },
        {
          "label": "Non-GAAP EPS",
          "actual": "$12.50",
          "est": "$10.91",
          "deltaPct": "+14.6%",
          "dir": "pos"
        }
      ],
      "trend": [
        {
          "label": "Q3'25",
          "value": 536
        },
        {
          "label": "Q4'25",
          "value": 516
        },
        {
          "label": "Q1'26",
          "value": 512
        },
        {
          "label": "Q2'26",
          "value": 692
        }
      ],
      "guidance": {
        "priorLabel": "FY26 Revenue Guidance (ให้ไว้ตอนประชุม Q1 2026)",
        "priorVal": "$2.35B",
        "newLabel": "FY26 Revenue Guidance (ปรับใหม่รอบนี้)",
        "newVal": "$2.45B",
        "deltaPct": "+4.3%",
        "dir": "pos"
      },
      "trackRecord": [
        {
          "claim": "ตอนประชุมไตรมาส 1 ปีงบ 2026 (ม.ค. 2026) ผู้บริหารบอกว่ายังไม่ปรับเป้าทั้งปีขึ้นตอนนั้น เพราะอยากรอดูข้อมูลอีกอย่างน้อยหนึ่งไตรมาสก่อนตัดสินใจ",
          "verdict": "hit",
          "note": "พอถึงไตรมาส 2 บริษัทปรับเป้ารายได้ทั้งปีขึ้นจาก 2.35 พันล้านดอลลาร์ เป็น 2.45 พันล้านดอลลาร์ และปรับเป้ากำไรต่อหุ้นปรับปรุงขึ้นจาก 38.17 ดอลลาร์ เป็น 40.45 ดอลลาร์ ตรงตามที่เคยส่งสัญญาณไว้"
        },
        {
          "claim": "ตอนไตรมาส 1 ผู้บริหารบอกว่า reseller รายใหญ่หนึ่งรายใกล้เสร็จการทดสอบระบบในสภาพแวดล้อมจริง อีกรายทดสอบเสร็จแล้วและกำลังทดสอบขั้นถัดไป และคาดว่าจะเริ่มใช้งานจริงกับหลายพันธมิตรเร็วๆ นี้",
          "verdict": "partial",
          "note": "ไตรมาส 2 มีความคืบหน้าเป็นการเซ็นสัญญาอย่างเป็นทางการกับ reseller รายใหญ่ 3 ใน 5 ราย และเจรจาอีก 2 รายที่เหลือ แต่ยังไม่มีการยืนยันชัดเจนว่าเริ่มใช้งานจริง (go live) กับรายใดแล้วตามที่เคยคาดไว้ว่าจะ 'เร็วๆ นี้'"
        },
        {
          "claim": "ตอนไตรมาส 1 UltraFICO ร่วมกับ Plaid ยังอยู่ระหว่างพัฒนา คาดว่าจะเปิดตัวจัดจำหน่ายภายในปี 2026",
          "verdict": "partial",
          "note": "ไตรมาส 2 ยืนยันว่ากำลังเข้าใกล้วันเริ่มใช้งานจริงมากขึ้น แต่ยังไม่ได้เปิดตัวจริง ยังอยู่ในขั้นตอนทดสอบเช่นเดิม สอดคล้องกับกรอบเวลาเดิมที่เคยให้ไว้"
        }
      ],
      "positives": [
        {
          "label": "รายได้มอร์เกจโตร้อนแรงเป็นประวัติการณ์",
          "note": "รายได้จากสินเชื่อจำนองในกลุ่ม Scores เพิ่มขึ้น 127% เทียบปีก่อน คิดเป็นสัดส่วนถึง 63% ของรายได้กลุ่ม Scores ทั้งหมด"
        },
        {
          "label": "มาร์จิ้นขยายตัวชัดเจน",
          "note": "มาร์จิ้นกำไรจากการดำเนินงานปรับปรุงขยายตัวถึง 712 basis point (bps, 1bps เท่ากับ 0.01%) เป็น 65% จาก 58% ในปีก่อน"
        },
        {
          "label": "ซื้อหุ้นคืนครั้งใหญ่ที่สุดในประวัติศาสตร์บริษัท",
          "note": "ซื้อหุ้นคืนมูลค่า 605 ล้านดอลลาร์ในไตรมาสเดียว และยังซื้อเพิ่มอีกหลังสิ้นไตรมาสภายใต้วงเงินอนุมัติใหม่ 1.5 พันล้านดอลลาร์"
        }
      ],
      "concerns": [
        {
          "label": "การเติบโตยังกระจุกตัวในธุรกิจมอร์เกจ",
          "note": "รายได้ที่โตแรงส่วนใหญ่มาจากราคาต่อหน่วยและปริมาณสินเชื่อจำนองที่เพิ่มขึ้น หากตลาดจำนองชะลอตัวหรือดอกเบี้ยเปลี่ยนทิศทาง การเติบโตระดับนี้อาจไม่ยั่งยืน"
        },
        {
          "label": "รายได้ฝั่งที่ไม่ใช่แพลตฟอร์มยังหดตัวต่อเนื่อง",
          "note": "รายได้ซอฟต์แวร์ฝั่งที่ไม่ใช่แพลตฟอร์มลดลง 8-12% ต่อเนื่องหลายไตรมาส สะท้อนว่าธุรกิจเก่ากำลังถูกแทนที่ด้วยแพลตฟอร์มใหม่ ซึ่งยังไม่ชัดว่าจะชดเชยกันได้สมบูรณ์เมื่อไหร่"
        },
        {
          "label": "หนี้สินเพิ่มขึ้นจากการออกหุ้นกู้ใหม่",
          "note": "หนี้สินรวมอยู่ที่ 3.64 พันล้านดอลลาร์ หลังออกหุ้นกู้ใหม่มูลค่า 1 พันล้านดอลลาร์ ต้นทุนดอกเบี้ยเฉลี่ย 5.5% ต้องติดตามว่าจะกระทบกระแสเงินสดในระยะยาวแค่ไหน"
        }
      ],
      "discussion": [
        "การปรับราคา FICO Score 10T ลงอย่างมาก (จาก 4.95 ดอลลาร์ เหลือ 0.99 ดอลลาร์ต่อสกอร์) เป็นการยอมเสียมาร์จิ้นต่อหน่วยเพื่อรักษาปริมาณการใช้งานและส่วนแบ่งตลาดไว้ในระยะยาว หรือเป็นสัญญาณว่าฝ่ายบริหารเริ่มยอมรับว่าอำนาจต่อรองด้านราคาสู้ VantageScore ไม่ได้อีกต่อไป",
        "รายได้กลุ่ม Scores ที่พึ่งพาวัฏจักรตลาดจำนองสูงขนาดนี้ เมื่อเทียบกับรายได้ธุรกิจ Software/Platform ที่โตช้ากว่ามาก จะทำให้ผลประกอบการทั้งบริษัทผันผวนตามวัฏจักรอสังหาริมทรัพย์มากขึ้นในระยะยาวหรือไม่"
      ],
      "caveats": "ข้อมูลนี้ไม่ใช่คำแนะนำการลงทุน จัดทำเพื่อการศึกษาและประกอบการตัดสินใจส่วนบุคคลเท่านั้น ตัวเลขอ้างอิงรายงานผลประกอบการอย่างเป็นทางการของ Fair Isaac Corporation และรายงานข่าวสาธารณะ ณ วันที่ 31 กรกฎาคม 2026 ตัวเลขประมาณการ (consensus) ของนักวิเคราะห์อ้างอิงจากรายงานรวบรวมของสำนักข่าวการเงินสาธารณะ",
      "transcriptExcerpt": {
        "segments": [
          {
            "heading": "Opening remarks — Will Lansing (CEO), financial highlights",
            "highlight": true,
            "en": "Thanks, Dave, and thank you, everyone, for joining us for our second quarter earnings call. We had a very strong quarter and a great start to the first half of our fiscal year. Based on our results and outlook, we are increasing our fiscal 2026 guidance.\n\nWe reported Q2 revenues of $692 million, up 39% over last year. We reported $264 million in GAAP net income in the quarter, up 63%, and GAAP earnings of $11.14 per share, up 69%. We delivered free cash flow of $214 million in our second quarter. Over the last 4 quarters, we delivered $867 million in free cash flow, an increase of 28%.",
            "th": "ขอบคุณเดฟ และขอบคุณทุกท่านที่เข้าร่วมฟังผลประกอบการไตรมาสที่สองของเรา ไตรมาสนี้เราทำผลงานได้แข็งแกร่งมาก และเป็นการเริ่มต้นครึ่งปีแรกของปีงบการเงินที่ดีเยี่ยม จากผลประกอบการและแนวโน้มที่เราเห็น เรากำลังปรับเป้าหมายทั้งปีงบ 2026 ขึ้น\n\nเรารายงานรายได้ไตรมาส 2 ที่ 692 ล้านดอลลาร์ เพิ่มขึ้น 39% จากปีก่อน เรารายงานกำไรสุทธิตามบัญชี 264 ล้านดอลลาร์ในไตรมาสนี้ เพิ่มขึ้น 63% และกำไรต่อหุ้นตามบัญชี 11.14 ดอลลาร์ เพิ่มขึ้น 69% เราทำกระแสเงินสดอิสระได้ 214 ล้านดอลลาร์ในไตรมาสที่สองนี้ ตลอด 4 ไตรมาสที่ผ่านมา เราทำกระแสเงินสดอิสระรวม 867 ล้านดอลลาร์ เพิ่มขึ้น 28%"
          },
          {
            "heading": "CEO update — Scores and Software segment performance",
            "en": "Our second quarter score segment revenues were $475 million, up 60% versus the prior year. While B2B scores were the key driver of growth, we also experienced the sixth straight quarter of growth in B2C scores.\n\nIn our Software segment, we delivered $217 million in Q2 revenues, up 7% over last year. Results included 54% platform revenue growth and a 12% decline in non-platform revenue.",
            "th": "รายได้กลุ่ม Scores ของเราในไตรมาสที่สองอยู่ที่ 475 ล้านดอลลาร์ เพิ่มขึ้น 60% เทียบปีก่อน แม้สกอร์ฝั่ง B2B จะเป็นตัวขับเคลื่อนหลักของการเติบโต แต่เรายังเห็นการเติบโตของฝั่ง B2C ต่อเนื่องเป็นไตรมาสที่ 6 ติดต่อกันด้วย\n\nในกลุ่มซอฟต์แวร์ เราทำรายได้ไตรมาส 2 ได้ 217 ล้านดอลลาร์ เพิ่มขึ้น 7% จากปีก่อน ผลลัพธ์นี้รวมถึงรายได้ฝั่งแพลตฟอร์มที่โต 54% ขณะที่รายได้ฝั่งที่ไม่ใช่แพลตฟอร์มลดลง 12%"
          },
          {
            "heading": "CEO update — FICO Score 10T pricing strategy",
            "highlight": true,
            "en": "To support the goal of increased homeownership and bring the benefits of increased competition to the marketplace, we updated our FICO Score 10T performance model pricing from $4.95 per score plus $33 funding fee to $0.99 per score plus $65 funding fee.",
            "th": "เพื่อสนับสนุนเป้าหมายการเพิ่มอัตราการเป็นเจ้าของบ้าน และนำประโยชน์จากการแข่งขันที่มากขึ้นมาสู่ตลาด เราปรับโครงสร้างราคาแบบ performance model ของ FICO Score 10T จากเดิม 4.95 ดอลลาร์ต่อสกอร์บวกค่าธรรมเนียมการจัดหาเงินทุน (funding fee) 33 ดอลลาร์ เป็น 0.99 ดอลลาร์ต่อสกอร์บวกค่าธรรมเนียมการจัดหาเงินทุน 65 ดอลลาร์"
          },
          {
            "heading": "CEO update — FICO Score 10T early adopter program & homeownership goal",
            "en": "The 55 lenders in the program account for more than $495 billion in annual serviceable originations when evaluated using 2025 HMDA data and more than $1.6 trillion in eligible servicing. FICO Score 10T incorporates rental and utility payment history, enabling more consumers to qualify for mortgages.",
            "th": "ผู้ให้กู้ 55 รายในโครงการนี้ คิดเป็นมูลค่าการปล่อยสินเชื่อที่รองรับได้ต่อปีกว่า 4.95 แสนล้านดอลลาร์ (ประเมินจากข้อมูล HMDA ปี 2025) และมูลค่าพอร์ตที่มีสิทธิ์ให้บริการ (eligible servicing) กว่า 1.6 ล้านล้านดอลลาร์ FICO Score 10T นำประวัติการจ่ายค่าเช่าและค่าสาธารณูปโภคมารวมในการคำนวณด้วย ทำให้ผู้บริโภคมีโอกาสผ่านคุณสมบัติขอสินเชื่อบ้านได้มากขึ้น"
          },
          {
            "heading": "CEO update — UltraFICO/Plaid partnership progress",
            "en": "We're moving closer to the go-live dates of our next-generation Cash Flow UltraFICO Score with our strategic partner, Plaid and the FICO mortgage direct licensing our reseller partners. We continue to actively work alongside participants to support testing on both initiatives.",
            "th": "เรากำลังเข้าใกล้วันเริ่มใช้งานจริงของ UltraFICO Score รุ่นใหม่ที่ใช้ข้อมูลกระแสเงินสด ทั้งกับพันธมิตรเชิงกลยุทธ์อย่าง Plaid และโครงการให้สิทธิ์ใช้สกอร์โดยตรงกับพันธมิตร reseller ในตลาดจำนอง เรายังคงทำงานร่วมกับผู้เข้าร่วมอย่างใกล้ชิดเพื่อสนับสนุนการทดสอบทั้งสองโครงการนี้ต่อไป"
          },
          {
            "heading": "CEO update — AI patents & FICO Platform positioning",
            "en": "FICO has been issued 137 AI-based patents, which include patents and blockchain technology that are helpful for traceable and explainable decision-making...FICO Platform is architected from the ground up to be agentic-by-design.",
            "th": "FICO ได้รับสิทธิบัตรด้าน AI แล้ว 137 ฉบับ ซึ่งรวมถึงสิทธิบัตรด้านเทคโนโลยีบล็อกเชน (blockchain) ที่ช่วยให้การตัดสินใจสามารถตรวจสอบย้อนกลับได้และอธิบายได้ชัดเจน FICO Platform ถูกออกแบบมาตั้งแต่ต้นให้เป็นระบบที่ขับเคลื่อนด้วย AI agent (agentic-by-design) โดยเฉพาะ"
          },
          {
            "heading": "CFO Steven Weber — Scores segment detail",
            "en": "Thanks, and good afternoon, everyone. As Will mentioned, our Scores segment revenues for the quarter were $475 million, up 60% from the prior year.\n\nB2B revenues were up 72%, primarily attributable to higher mortgage origination scores unit price and an increase in volume of mortgage origination. Our B2C revenues were up 5% versus the prior year, driven mainly by our indirect channel partners.\n\nSecond quarter mortgage originations revenues were up 127% versus the prior year. Mortgage originations revenues accounted for 72% of B2B revenue and 63% of total Scores revenue. Auto originations revenues were up 13%, while credit card, personal loan and other originations revenues were up 6% versus the prior year.",
            "th": "ขอบคุณครับ และสวัสดีตอนบ่ายทุกท่าน ตามที่วิลกล่าวไปแล้ว รายได้กลุ่ม Scores ของเราในไตรมาสนี้อยู่ที่ 475 ล้านดอลลาร์ เพิ่มขึ้น 60% จากปีก่อน\n\nรายได้ฝั่ง B2B เพิ่มขึ้น 72% ส่วนใหญ่มาจากราคาต่อหน่วยของสกอร์สินเชื่อจำนองที่สูงขึ้นและปริมาณการปล่อยสินเชื่อจำนองที่เพิ่มขึ้น รายได้ฝั่ง B2C เพิ่มขึ้น 5% เทียบปีก่อน โดยขับเคลื่อนหลักจากพันธมิตรช่องทางจัดจำหน่ายทางอ้อม (indirect channel)\n\nรายได้จากสินเชื่อจำนองในไตรมาสที่สองเพิ่มขึ้น 127% เทียบปีก่อน คิดเป็น 72% ของรายได้ฝั่ง B2B และ 63% ของรายได้กลุ่ม Scores ทั้งหมด รายได้จากสินเชื่อรถยนต์เพิ่มขึ้น 13% ส่วนรายได้จากบัตรเครดิต สินเชื่อส่วนบุคคล และสินเชื่ออื่นๆ เพิ่มขึ้น 6% เทียบปีก่อน"
          },
          {
            "heading": "CFO Steven Weber — Software, ACV, ARR, NRR",
            "en": "Our software ACV bookings for the quarter were $28 million. On a trailing 12-month basis, ACV bookings reached $126 million this quarter, an increase of 36% from the same period last year.\n\nOur total software ARR was $789 million, a 10% increase over the prior year. Platform ARR was $349 million, representing 44% of our total Q2 '26 ARR. Platform ARR grew 49% versus the prior year, while nonplatform declined 8% to $440 million this quarter.\n\nOur dollar-based net retention rate in the quarter was 109%. Platform NRR was 136%, while our non-platform NRR was 90%.\n\nSecond quarter software segment revenues were $217 million, up 7% from the prior year. Within this segment, our SaaS revenues grew by 19%, driven by FICO Platform. Our on-premises revenue declined 4%.",
            "th": "ยอดสั่งซื้อซอฟต์แวร์ประจำปี (ACV bookings) ของเราในไตรมาสนี้อยู่ที่ 28 ล้านดอลลาร์ หากคิดแบบสะสม 12 เดือนย้อนหลัง ยอด ACV bookings อยู่ที่ 126 ล้านดอลลาร์ในไตรมาสนี้ เพิ่มขึ้น 36% จากช่วงเดียวกันของปีก่อน\n\nรายได้ประจำต่อปีของซอฟต์แวร์รวม (total software ARR) อยู่ที่ 789 ล้านดอลลาร์ เพิ่มขึ้น 10% จากปีก่อน โดย Platform ARR อยู่ที่ 349 ล้านดอลลาร์ คิดเป็น 44% ของ ARR รวมในไตรมาส 2 ปีงบ 2026 Platform ARR เติบโต 49% เทียบปีก่อน ขณะที่ฝั่งที่ไม่ใช่แพลตฟอร์มลดลง 8% เหลือ 440 ล้านดอลลาร์ในไตรมาสนี้\n\nอัตราการรักษารายได้ลูกค้าเดิมแบบคิดเป็นมูลค่าในไตรมาสนี้อยู่ที่ 109% โดยฝั่งแพลตฟอร์มอยู่ที่ 136% ขณะที่ฝั่งที่ไม่ใช่แพลตฟอร์มอยู่ที่ 90%\n\nรายได้กลุ่มซอฟต์แวร์ในไตรมาสที่สองอยู่ที่ 217 ล้านดอลลาร์ เพิ่มขึ้น 7% จากปีก่อน ภายในกลุ่มนี้ รายได้ฝั่ง SaaS โต 19% ขับเคลื่อนโดย FICO Platform ขณะที่รายได้ฝั่งติดตั้งในสถานที่ลูกค้า (on-premises) ลดลง 4%"
          },
          {
            "heading": "CFO Steven Weber — Geographic mix & operating expenses",
            "en": "90% of total company revenues this quarter were derived from our Americas region. Our EMEA region generated 7% of revenues and the Asia Pacific region delivered 3%.\n\nOperating expenses for the quarter were $289 million this quarter versus $278 million in the prior quarter, an increase of 4% quarter-over-quarter, driven by personnel expenses. We expect operating expense dollars to trend modestly upward from the Q2 run rate into the back half of the fiscal year, driven mainly by personnel expenses and marketing for both FICO World and our Scores business.",
            "th": "90% ของรายได้รวมทั้งบริษัทในไตรมาสนี้มาจากภูมิภาคอเมริกา ภูมิภาค EMEA (ยุโรป ตะวันออกกลาง แอฟริกา) สร้างรายได้ 7% และภูมิภาคเอเชียแปซิฟิกสร้างรายได้ 3%\n\nค่าใช้จ่ายในการดำเนินงานของไตรมาสนี้อยู่ที่ 289 ล้านดอลลาร์ เทียบกับ 278 ล้านดอลลาร์ในไตรมาสก่อนหน้า เพิ่มขึ้น 4% จากไตรมาสก่อน ขับเคลื่อนโดยค่าใช้จ่ายด้านบุคลากร เราคาดว่าค่าใช้จ่ายในการดำเนินงานจะปรับตัวขึ้นเล็กน้อยจากระดับไตรมาส 2 ต่อเนื่องไปในครึ่งปีหลังของปีงบการเงิน ขับเคลื่อนหลักจากค่าใช้จ่ายด้านบุคลากรและการตลาดสำหรับทั้งงาน FICO World และธุรกิจ Scores"
          },
          {
            "heading": "CFO Steven Weber — Margins & tax",
            "en": "Our non-GAAP operating margin was 65% for the quarter compared with 58% in the same quarter last year. We delivered year-over-year non-GAAP operating margin expansion of 712 basis points. The effective tax rate for the quarter was 25.7%, and we expect a full year operating tax rate of 25% to 26% and an effective tax rate of around 24%.",
            "th": "มาร์จิ้นกำไรจากการดำเนินงานปรับปรุงของเราอยู่ที่ 65% ในไตรมาสนี้ เทียบกับ 58% ในไตรมาสเดียวกันของปีก่อน คิดเป็นการขยายตัวของมาร์จิ้น 712 basis point (bps, 1bps เท่ากับ 0.01%) เทียบปีก่อน อัตราภาษีที่แท้จริงของไตรมาสนี้อยู่ที่ 25.7% และเราคาดว่าอัตราภาษีจากการดำเนินงานทั้งปีจะอยู่ที่ 25-26% และอัตราภาษีที่แท้จริงจะอยู่ที่ราว 24%"
          },
          {
            "heading": "CFO Steven Weber — Balance sheet & debt",
            "en": "At the end of the quarter, we had $272 million in cash and marketable investments. Our total debt at quarter end was $3.64 billion with a weighted average interest rate of 5.5%. This includes the March issuance of $1 billion in senior notes due 2034, which used some proceeds to fund the redemption of $400 million in senior notes that were due in May. As of March 31, 2026, 93% of our debt was held in senior notes. We had $265 million balance on our revolving line of credit, which is repayable at any time. We anticipate interest rate expense dollars to trend modestly upward from the Q2 run rate into the back half of the fiscal year.",
            "th": "ณ สิ้นไตรมาส เรามีเงินสดและเงินลงทุนระยะสั้นที่ซื้อขายได้ 272 ล้านดอลลาร์ หนี้สินรวม ณ สิ้นไตรมาสอยู่ที่ 3.64 พันล้านดอลลาร์ ด้วยอัตราดอกเบี้ยถัวเฉลี่ยถ่วงน้ำหนัก 5.5% ตัวเลขนี้รวมการออกหุ้นกู้ไม่มีหลักประกัน (senior notes) มูลค่า 1 พันล้านดอลลาร์ครบกำหนดปี 2034 เมื่อเดือนมีนาคม ซึ่งบางส่วนของเงินที่ได้นำไปไถ่ถอนหุ้นกู้เดิมมูลค่า 400 ล้านดอลลาร์ที่ครบกำหนดเดือนพฤษภาคม ณ วันที่ 31 มีนาคม 2026 หนี้สิน 93% ของเราอยู่ในรูปหุ้นกู้ไม่มีหลักประกัน เรามียอดคงค้างวงเงินสินเชื่อหมุนเวียน (revolving line of credit) 265 ล้านดอลลาร์ ซึ่งสามารถชำระคืนได้ตลอดเวลา เราคาดว่าค่าใช้จ่ายดอกเบี้ยจะปรับตัวขึ้นเล็กน้อยจากระดับไตรมาส 2 ต่อเนื่องไปในครึ่งปีหลังของปีงบการเงิน"
          },
          {
            "heading": "CFO Steven Weber — Capital returns / share buybacks",
            "en": "In Q2, we repurchased 484,000 shares for a total cost of $605 million, representing the single largest quarterly repurchase in dollars in FICO history. We continue to view share repurchases as an attractive use of cash. With our recent $1.5 billion Board authorization, strong free cash flow and unutilized revolver, since April 1, we have bought an additional $170 million or 164,000 shares at an average price of $1,040 per share.",
            "th": "ในไตรมาส 2 เราซื้อหุ้นคืน 484,000 หุ้น รวมมูลค่า 605 ล้านดอลลาร์ ถือเป็นการซื้อหุ้นคืนรายไตรมาสที่มีมูลค่าสูงสุดในประวัติศาสตร์ของ FICO เรายังคงมองว่าการซื้อหุ้นคืนเป็นการใช้เงินสดที่คุ้มค่า ด้วยวงเงินที่คณะกรรมการเพิ่งอนุมัติใหม่ 1.5 พันล้านดอลลาร์ กระแสเงินสดอิสระที่แข็งแกร่ง และวงเงินสินเชื่อหมุนเวียนที่ยังไม่ได้ใช้ นับตั้งแต่วันที่ 1 เมษายน เราซื้อหุ้นคืนเพิ่มอีก 170 ล้านดอลลาร์ หรือ 164,000 หุ้น ที่ราคาเฉลี่ย 1,040 ดอลลาร์ต่อหุ้น"
          },
          {
            "heading": "CFO Steven Weber — Updated FY2026 guidance",
            "highlight": true,
            "en": "Revenue guidance is now $2.45 billion, an increase of 23% versus prior year. GAAP net income guidance is now $825 million with GAAP earnings per share of $35.60, an increase of 27% and 34%, respectively. Non-GAAP net income guidance is now $946 million with non-GAAP earnings per share of $40.45, an increase of 29% and 35%, respectively.",
            "th": "เป้ารายได้ทั้งปีตอนนี้อยู่ที่ 2.45 พันล้านดอลลาร์ เพิ่มขึ้น 23% เทียบปีก่อน เป้ากำไรสุทธิตามบัญชีตอนนี้อยู่ที่ 825 ล้านดอลลาร์ พร้อมกำไรต่อหุ้นตามบัญชี 35.60 ดอลลาร์ เพิ่มขึ้น 27% และ 34% ตามลำดับ เป้ากำไรสุทธิปรับปรุงตอนนี้อยู่ที่ 946 ล้านดอลลาร์ พร้อมกำไรต่อหุ้นปรับปรุง 40.45 ดอลลาร์ เพิ่มขึ้น 29% และ 35% ตามลำดับ"
          },
          {
            "heading": "Transition to Q&A",
            "en": "With that, I'm going to turn it back to Dave, and we'll open up for Q&A.",
            "th": "เอาล่ะครับ ผมขอส่งไมค์กลับไปให้เดฟ แล้วเราจะเปิดช่วงถาม-ตอบกันต่อ"
          },
          {
            "heading": "Q&A — ปรัชญาเบื้องหลังราคาแบบ performance model $0.99 (Jason Haas, Wells Fargo)",
            "en": "The whole idea behind moving to the performance model was to give us more flexibility so that we could distribute the value -- the monetization of that IP over more players across the chain.",
            "th": "แนวคิดหลักเบื้องหลังการเปลี่ยนมาใช้โมเดลราคาแบบ performance คือการให้เรามีความยืดหยุ่นมากขึ้น เพื่อกระจายมูลค่า หรือการสร้างรายได้จากทรัพย์สินทางปัญญา (IP) นั้นไปยังผู้เล่นหลายรายมากขึ้นตลอดทั้งห่วงโซ่"
          },
          {
            "heading": "Q&A — ความคืบหน้าการรับ 10T และกำหนดเวลาโครงการ direct licensing (Manav Patnaik, Barclays)",
            "en": "We have 3 of the top 5 major resellers signed up. We are in deep discussion with the other 2 and fully anticipate that all 5 of the big resellers will be able to provide the direct license program.",
            "th": "ตอนนี้เรามี 3 ใน 5 reseller รายใหญ่สุดเซ็นสัญญาเข้าร่วมแล้ว และกำลังเจรจาเชิงลึกกับอีก 2 รายที่เหลือ เราคาดหวังเต็มที่ว่าทั้ง 5 รายจะสามารถให้บริการโครงการ direct license ได้ในที่สุด"
          },
          {
            "heading": "Q&A — โครงสร้างค่าธรรมเนียมเทียบกับ VantageScore (Simon Clinch, Rothschild & Co Redburn)",
            "en": "The beauty of the way we've structured this is that mortgage originators and lenders have a choice...it's about revenue neutral for us either way.",
            "th": "จุดที่ดีของโครงสร้างที่เราวางไว้คือผู้ปล่อยสินเชื่อและผู้ให้กู้จำนองมีทางเลือก ไม่ว่าจะเลือกทางไหนก็แทบไม่กระทบรายได้ของเราอยู่ดี"
          },
          {
            "heading": "Q&A — เงื่อนไขที่ FHFA ต้องผ่านก่อนยอมรับ 10T (Surinder Thind, Jefferies)",
            "en": "There are not a bunch of additional things that no one knows about. I think we have to get the 10T data out so that people can test it and then the GSEs have to accept 10T, and that's it.",
            "th": "ไม่มีเงื่อนไขอื่นที่ซ่อนอยู่ที่ไม่มีใครรู้แล้ว ผมคิดว่าสิ่งที่ต้องทำคือเผยแพร่ข้อมูล 10T ออกไปให้คนทดสอบได้ก่อน จากนั้น GSE (Fannie Mae/Freddie Mac) ต้องยอมรับ 10T แค่นั้นเอง"
          },
          {
            "heading": "Q&A — สาเหตุที่รายได้มอร์เกจโต 127% (Faiza Alwy, Deutsche Bank)",
            "highlight": true,
            "en": "We had decent volume growth...There was a period of time where interest rates dropped a little bit. We saw a little bit of an uptick here.",
            "th": "เรามีการเติบโตของปริมาณที่ดีพอสมควร มีช่วงหนึ่งที่อัตราดอกเบี้ยลดลงเล็กน้อย ซึ่งเราเห็นการกระเตื้องขึ้นบ้างในช่วงนั้น"
          },
          {
            "heading": "Q&A — การยอมรับหลายโมเดลสกอร์พร้อมกันของผู้ให้กู้ (Jeff Meuler, Baird)",
            "en": "I think that's waiting on the selling guidelines. I mean I can't speak for the GSEs on that.",
            "th": "ผมคิดว่าเรื่องนี้ต้องรอแนวปฏิบัติการขาย (selling guidelines) ก่อน ผมพูดแทน GSE ในเรื่องนี้ไม่ได้"
          },
          {
            "heading": "Q&A — กลยุทธ์การปรับราคาระยะกลาง (Ashish Sabadra, RBC Capital Markets)",
            "en": "The balancing act is, we don't want to shock the market...we're always evaluating those kinds of things.",
            "th": "สิ่งที่เราต้องรักษาสมดุลคือ เราไม่อยากสร้างแรงกระแทกให้ตลาดมากเกินไป และเรายังคงประเมินแนวทางแบบนี้อยู่ตลอดเวลา"
          }
        ]
      }
    },
    {
      "id": "er0004",
      "date": "2026-07-31",
      "ticker": "FICO",
      "company": "Fair Isaac Corporation",
      "quarter": "Q3 FY26",
      "reportDate": "2026-07-29",
      "verdict": "inline",
      "verdictLine": "รายได้ต่ำกว่าประมาณการนักวิเคราะห์เล็กน้อย ขณะที่กำไรต่อหุ้นปรับปรุงสูงกว่าประมาณการ ผลลัพธ์จึงถือว่าใกล้เคียงประมาณการ (inline) แม้ตัวเลขทั้งสองจะเติบโตแรงเทียบปีก่อน ราคาหุ้นปรับตัวลงหลังประกาศผลจากความกังวลด้านการแข่งขันกับ VantageScore",
      "metrics": [
        {
          "label": "Revenue",
          "actual": "$674M",
          "est": "$692M",
          "deltaPct": "-2.6%",
          "dir": "neg"
        },
        {
          "label": "Non-GAAP EPS",
          "actual": "$12.18",
          "est": "$11.97",
          "deltaPct": "+1.8%",
          "dir": "pos"
        }
      ],
      "trend": [
        {
          "label": "Q4'25",
          "value": 516
        },
        {
          "label": "Q1'26",
          "value": 512
        },
        {
          "label": "Q2'26",
          "value": 692
        },
        {
          "label": "Q3'26",
          "value": 674
        }
      ],
      "guidance": {
        "priorLabel": "FY26 Revenue Guidance (ให้ไว้ตอนประชุม Q2 2026)",
        "priorVal": "$2.45B",
        "newLabel": "FY26 Revenue Guidance (ปรับใหม่รอบนี้)",
        "newVal": "$2.53B",
        "deltaPct": "+3.3%",
        "dir": "pos"
      },
      "trackRecord": [
        {
          "claim": "ตอนไตรมาส 2 ผู้บริหารมี 3 ใน 5 reseller รายใหญ่เซ็นสัญญาแล้ว และคาดว่าจะปิดดีลกับอีก 2 รายที่เหลือได้ในที่สุด",
          "verdict": "partial",
          "note": "ไตรมาส 3 ยังไม่มีการเริ่มใช้งานจริง (go live) ของโครงการ direct license เพราะยังรอการรับรอง (certification) จาก GSE รายหนึ่งอยู่ ความคืบหน้าหยุดอยู่ที่ขั้นตอนกำกับดูแลมากกว่าขั้นตอนเจรจาการค้า"
        },
        {
          "claim": "ตอนไตรมาส 2 ผู้บริหารบอกว่าเมื่อ 10T พร้อมใช้งานจริง น่าจะมีการปรับตารางราคา (LLPA grid) ให้สอดคล้องกัน และยังไม่มีการบอกว่าจะคิดราคา 10T แยกจาก Classic",
          "verdict": "hit",
          "note": "ไตรมาส 3 ยืนยันชัดเจนว่ายังคงพ่วง 10T ไปกับ Classic ฟรี ไม่ได้แยกคิดราคาต่างหาก สอดคล้องกับแนวทางเดิมที่เคยพูดไว้"
        },
        {
          "claim": "ตอนไตรมาส 2 ผู้บริหารบอกว่ารายได้มอร์เกจโต 127% ส่วนหนึ่งมาจากดอกเบี้ยที่ลดลงเล็กน้อยช่วงหนึ่ง",
          "verdict": "partial",
          "note": "ไตรมาส 3 อัตราการเติบโตของรายได้มอร์เกจชะลอลงมาอยู่ที่ 97% (ยังคงสูงมากแต่ต่ำกว่าไตรมาสก่อน) ผู้บริหารยอมรับว่าส่วนหนึ่งของตัวเลข 127% ในไตรมาสก่อนเกิดจากปัจจัยด้านจังหวะเวลาการนับรอบบัญชีเทียบกับรอบของบริษัทข้อมูลเครดิต ไม่ใช่แนวโน้มเติบโตที่ยั่งยืนระดับนั้นตลอดไป"
        }
      ],
      "positives": [
        {
          "label": "ยังไม่เห็นสัญญาณเสียส่วนแบ่งตลาดชัดเจน",
          "note": "ผู้บริหารยืนยันว่ายังไม่เห็นปริมาณการดึงสกอร์ (score pull) ของ FICO ลดลงจากการที่ผู้ให้กู้เริ่มใช้ VantageScore เพิ่ม บ่งชี้ว่าส่วนใหญ่เป็นการดึงสกอร์ทั้งสองตัวควบคู่กันมากกว่าการเปลี่ยนไปใช้ตัวใดตัวหนึ่งแทน"
        },
        {
          "label": "Platform ARR แซงหน้า non-platform เป็นครั้งแรก",
          "note": "Platform ARR โต 62% เทียบปีก่อน เป็น 413 ล้านดอลลาร์ คิดเป็น 51% ของ ARR รวม ถือเป็นครั้งแรกที่รายได้ฝั่งแพลตฟอร์มมีสัดส่วนเกินครึ่งของธุรกิจซอฟต์แวร์ประจำ"
        },
        {
          "label": "ปรับเป้าทั้งปีขึ้นต่อเนื่องเป็นไตรมาสที่สอง",
          "note": "ปรับเป้ารายได้ทั้งปีขึ้นจาก 2.45 พันล้านดอลลาร์ เป็น 2.53 พันล้านดอลลาร์ สะท้อนความมั่นใจของฝ่ายบริหารต่อแนวโน้มธุรกิจ แม้ตลาดกำลังกังวลเรื่องการแข่งขัน"
        }
      ],
      "concerns": [
        {
          "label": "รายได้พลาดประมาณการเป็นครั้งแรกในรอบหลายไตรมาส",
          "note": "แม้จะโตแรงเทียบปีก่อน แต่รายได้จริงต่ำกว่าที่นักวิเคราะห์คาดไว้ราว 2.6% หลังจากที่เคยทำได้เกินคาดต่อเนื่องในไตรมาสก่อนหน้า"
        },
        {
          "label": "อัตราเติบโตรายได้มอร์เกจชะลอตัวจากไตรมาสก่อนอย่างมีนัยสำคัญ",
          "note": "จาก 127% ในไตรมาส 2 เหลือ 97% ในไตรมาสนี้ ผู้บริหารระบุว่าส่วนหนึ่งเป็นผลจากปัจจัยจังหวะเวลาบัญชี ทำให้ตัวเลขไตรมาสก่อนอาจไม่ใช่อัตราการเติบโตปกติที่จะเกิดขึ้นซ้ำได้"
        },
        {
          "label": "ราคาหุ้นร่วงแรงต่อเนื่องหลายวันหลังประกาศงบ",
          "note": "หุ้นปรับตัวลงทันที 9% หลังตลาดปิดวันประกาศผล และยังคงถูกกดดันต่อเนื่องในวันถัดๆ มาจากความกังวลเรื่องการแข่งขันกับ VantageScore ในตลาดจำนอง สะท้อนว่าตลาดให้น้ำหนักกับความเสี่ยงเชิงโครงสร้างมากกว่าตัวเลขไตรมาสนี้"
        },
        {
          "label": "โครงการ direct license ยังติดขั้นตอนกำกับดูแล",
          "note": "ยังต้องรอการรับรองจากหน่วยงานกำกับดูแล (GSE) อย่างน้อยหนึ่งแห่งก่อนจะเริ่มใช้งานจริงได้ แม้จะเจรจากับ reseller รายใหญ่คืบหน้าไปมากแล้วก็ตาม"
        }
      ],
      "discussion": [
        "การที่ปริมาณการดึงสกอร์ FICO ยังไม่ลดลงในตอนนี้ เป็นเพราะผู้ให้กู้ยังต้องใช้ทั้งสองสกอร์คู่ขนานกันในช่วงเปลี่ยนผ่านเท่านั้น หรือเป็นสัญญาณว่า FICO จะรักษาความเป็นสกอร์หลักไว้ได้ในระยะยาวจริง",
        "ตลาดตอบสนองเชิงลบรุนแรงต่อการที่รายได้พลาดประมาณการเพียง 2.6% ทั้งที่กำไรต่อหุ้นยังทำได้เกินคาด สะท้อนว่านักลงทุนกำลังประเมินความเสี่ยงระยะยาวจาก VantageScore มากกว่าตัวเลขไตรมาสเดียว ประเด็นนี้จะคลี่คลายไปทางไหนเมื่อ GSE ตัดสินใจเรื่องการรับรอง 10T ในที่สุด",
        "การชะลอตัวของอัตราเติบโตรายได้มอร์เกจจาก 127% เหลือ 97% เกิดจากปัจจัยจังหวะบัญชีชั่วคราวตามที่ผู้บริหารอธิบาย หรือเป็นสัญญาณเริ่มต้นของการที่แรงหนุนจากราคาต่อหน่วยที่เพิ่มขึ้นมากในปีที่ผ่านมากำลังหมดไป"
      ],
      "caveats": "ข้อมูลนี้ไม่ใช่คำแนะนำการลงทุน จัดทำเพื่อการศึกษาและประกอบการตัดสินใจส่วนบุคคลเท่านั้น ตัวเลขอ้างอิงรายงานผลประกอบการอย่างเป็นทางการของ Fair Isaac Corporation และรายงานข่าวสาธารณะ ณ วันที่ 31 กรกฎาคม 2026 ตัวเลขประมาณการ (consensus) ของนักวิเคราะห์อ้างอิงจากรายงานรวบรวมของสำนักข่าวการเงินสาธารณะ ราคาหุ้นและมูลค่าตลาดผันผวนสูงมากในช่วงนี้จากประเด็นการแข่งขันกับ VantageScore",
      "transcriptExcerpt": {
        "segments": [
          {
            "heading": "Opening remarks — Will Lansing (CEO), financial highlights",
            "highlight": true,
            "en": "With another strong quarter, we are increasing our fiscal 2026 guidance. We reported Q3 revenues of $674 million, up 26% over last year. We reported $237 million in GAAP net income, up 30%, and GAAP earnings of $10.45 per share, up 41% from the prior year. We reported $277 million in non-GAAP net income, up 31%, and non-GAAP earnings of $12.18 per share, up 42% from the prior year. We delivered free cash flow of $370 million in our third quarter.",
            "th": "ด้วยผลงานที่แข็งแกร่งอีกไตรมาส เรากำลังปรับเป้าหมายทั้งปีงบ 2026 ขึ้น เรารายงานรายได้ไตรมาส 3 ที่ 674 ล้านดอลลาร์ เพิ่มขึ้น 26% จากปีก่อน เรารายงานกำไรสุทธิตามบัญชี 237 ล้านดอลลาร์ เพิ่มขึ้น 30% และกำไรต่อหุ้นตามบัญชี 10.45 ดอลลาร์ เพิ่มขึ้น 41% จากปีก่อน เรารายงานกำไรสุทธิปรับปรุง 277 ล้านดอลลาร์ เพิ่มขึ้น 31% และกำไรต่อหุ้นปรับปรุง 12.18 ดอลลาร์ เพิ่มขึ้น 42% จากปีก่อน เราทำกระแสเงินสดอิสระได้ 370 ล้านดอลลาร์ในไตรมาสที่สามนี้"
          },
          {
            "heading": "CEO update — มุมมองต่อตลาดจำนองที่ดีกว่าคาด",
            "en": "The mortgage market has been better than what we had originally guided to, and our volumes are better than what we had originally guided to.",
            "th": "ตลาดจำนองทำผลงานได้ดีกว่าที่เราเคยให้แนวทางไว้ตอนแรก และปริมาณการใช้งานของเราก็ดีกว่าที่เคยให้แนวทางไว้เช่นกัน"
          },
          {
            "heading": "CFO Steven Weber — รายละเอียดกลุ่ม Scores",
            "en": "Our Scores segment revenues for the quarter were $459 million, up 41% from the prior year. B2B revenues were up 49%, primarily attributable to a higher mortgage origination score unit price. Our mortgage originations revenues were up 97% from the prior year. Mortgage origination revenues accounted for 71% of B2B revenues and 62% of total Scores revenues. Auto originations revenues were up 15%, while credit card, personal loan, and other originations revenues were up 9%.",
            "th": "รายได้กลุ่ม Scores ของเราในไตรมาสนี้อยู่ที่ 459 ล้านดอลลาร์ เพิ่มขึ้น 41% จากปีก่อน รายได้ฝั่ง B2B เพิ่มขึ้น 49% ส่วนใหญ่มาจากราคาต่อหน่วยของสกอร์สินเชื่อจำนองที่สูงขึ้น รายได้จากสินเชื่อจำนองเพิ่มขึ้น 97% จากปีก่อน คิดเป็น 71% ของรายได้ฝั่ง B2B และ 62% ของรายได้กลุ่ม Scores ทั้งหมด รายได้จากสินเชื่อรถยนต์เพิ่มขึ้น 15% ส่วนรายได้จากบัตรเครดิต สินเชื่อส่วนบุคคล และสินเชื่ออื่นๆ เพิ่มขึ้น 9%"
          },
          {
            "heading": "CFO Steven Weber — ARR ซอฟต์แวร์และแพลตฟอร์ม",
            "en": "Our total Software ARR, as shown on page 20, was $816 million, a 10% increase over the prior year. Platform ARR grew 62% versus the prior year to $413 million and represented 51% of our total Q3 2026 ARR.",
            "th": "รายได้ประจำต่อปีของซอฟต์แวร์รวม ตามหน้า 20 ของเอกสารนำเสนอ อยู่ที่ 816 ล้านดอลลาร์ เพิ่มขึ้น 10% จากปีก่อน Platform ARR เติบโต 62% เทียบปีก่อน เป็น 413 ล้านดอลลาร์ และคิดเป็น 51% ของ ARR รวมในไตรมาส 3 ปีงบ 2026"
          },
          {
            "heading": "CFO Steven Weber — มาร์จิ้นและเป้าทั้งปีที่ปรับใหม่",
            "highlight": true,
            "en": "Our non-GAAP operating margin, as shown on page 23, was 62% for the quarter, compared with 57% in the same quarter last year. Revenue guidance is now $2.53 billion, an increase of 20% versus prior year. GAAP net income guidance is now $850 million, with GAAP earnings per share of $36.86. Non-GAAP net income guidance is now $979 million, with non-GAAP earnings per share of $42.43.",
            "th": "มาร์จิ้นกำไรจากการดำเนินงานปรับปรุง ตามหน้า 23 ของเอกสารนำเสนอ อยู่ที่ 62% ในไตรมาสนี้ เทียบกับ 57% ในไตรมาสเดียวกันของปีก่อน เป้ารายได้ทั้งปีตอนนี้อยู่ที่ 2.53 พันล้านดอลลาร์ เพิ่มขึ้น 20% เทียบปีก่อน เป้ากำไรสุทธิตามบัญชีตอนนี้อยู่ที่ 850 ล้านดอลลาร์ พร้อมกำไรต่อหุ้นตามบัญชี 36.86 ดอลลาร์ เป้ากำไรสุทธิปรับปรุงตอนนี้อยู่ที่ 979 ล้านดอลลาร์ พร้อมกำไรต่อหุ้นปรับปรุง 42.43 ดอลลาร์"
          },
          {
            "heading": "Q&A — สถานะการรับรองจาก GSE สำหรับโครงการ DLP (Manav Patnaik, Barclays)",
            "en": "We're literally waiting on certification from one of the GSEs so that we can go live.",
            "th": "ตอนนี้เราแค่รอการรับรองจาก GSE (Fannie Mae/Freddie Mac) รายหนึ่งเท่านั้น เพื่อที่จะเริ่มใช้งานจริงได้"
          },
          {
            "heading": "Q&A — ปริมาณการใช้งานที่หายไปจาก VantageScore (Jason Haas, Wells Fargo)",
            "highlight": true,
            "en": "Are we seeing volume loss? No, we are not, which suggests that they're pulling both scores.",
            "th": "เราเห็นปริมาณการใช้งานหายไปไหม? ไม่ครับ ไม่เห็น ซึ่งบ่งชี้ว่าผู้ให้กู้กำลังดึงสกอร์ทั้งสองตัวควบคู่กัน"
          },
          {
            "heading": "Q&A — สาเหตุที่อัตราเติบโตรายได้มอร์เกจชะลอตัว (Jeff Meuler, Baird)",
            "highlight": true,
            "en": "I think there's some of the timing piece, I think there's some of how maybe our quarter cutoff versus what the bureau quarter cutoffs are.",
            "th": "ผมคิดว่าส่วนหนึ่งเป็นเรื่องจังหวะเวลา และอาจเกี่ยวกับการที่รอบบัญชีของเราตัดต่างจากรอบบัญชีของบริษัทข้อมูลเครดิต (bureau) ด้วย"
          },
          {
            "heading": "Q&A — กลยุทธ์ราคาผลิตภัณฑ์อื่นนอกเหนือจากมอร์เกจ (Simon Clinch, Rothschild & Redburn)",
            "en": "It's obviously early in the year for us to be suggesting where the pricing will go for next year.",
            "th": "แน่นอนว่ายังเร็วเกินไปในปีนี้ที่เราจะบอกได้ว่าราคาปีหน้าจะเป็นอย่างไร"
          },
          {
            "heading": "Q&A — อัตราการใช้งาน FICO Platform รุ่นใหม่ (Surinder Thind, Jefferies)",
            "en": "We've got tremendous interest and tremendous uptake, and you can see in our numbers, tremendous Platform growth.",
            "th": "เราได้รับความสนใจและอัตราการใช้งานที่สูงมาก และคุณจะเห็นได้จากตัวเลขของเราว่าแพลตฟอร์มเติบโตอย่างมาก"
          },
          {
            "heading": "Q&A — ส่วนแบ่งตลาดของ VantageScore ที่ขยับขึ้น (Ashish Sabadra, RBC)",
            "en": "When you do the math on what percent of the time a consumer is advantaged... that number... is in the 20s.",
            "th": "เมื่อคำนวณดูว่าผู้บริโภคได้ประโยชน์จากสกอร์อีกตัวกี่เปอร์เซ็นต์ของเวลาทั้งหมด ตัวเลขนั้นอยู่ที่ราว 20 กว่าเปอร์เซ็นต์"
          },
          {
            "heading": "Q&A — โมเดลราคาของ FICO 10T จะแยกจาก Classic หรือไม่ (Faiza Alwy, Deutsche Bank)",
            "en": "Today, as you know, we bundle 10T with Classic, and if you pay for Classic, you get 10T free.",
            "th": "ทุกวันนี้ตามที่ทราบกัน เราพ่วง 10T ไปกับ Classic ถ้าจ่ายค่า Classic ก็ได้ 10T ไปฟรี"
          },
          {
            "heading": "Q&A — ผลต่อส่วนต่างราคาตราสารหนี้ที่มีสินเชื่อจำนองค้ำประกัน (Alexander Hess, JPMorgan)",
            "en": "I'd refer you back to your own MBS traders to really get the insights there.",
            "th": "เรื่องนี้ผมขอให้ไปสอบถามทีมเทรดตราสารหนี้ที่มีสินเชื่อจำนองค้ำประกัน (MBS) ของคุณเองน่าจะได้ข้อมูลเชิงลึกกว่า"
          },
          {
            "heading": "Q&A — ผลกระทบของการเลี่ยงกฎต่อการยอมรับ DLP (Kyle Peterson, Needham)",
            "en": "We don't think so. We think that the benefits of the performance model with DLP are pretty significant from a cost standpoint.",
            "th": "เราไม่คิดอย่างนั้น เราเชื่อว่าประโยชน์ของโมเดลราคาแบบ performance ร่วมกับโครงการ DLP นั้นมีนัยสำคัญมากในแง่ต้นทุน"
          },
          {
            "heading": "Q&A — อัตราการรักษาลูกค้าและยอดขายซอฟต์แวร์ (Ryan Griffin, BMO)",
            "en": "146% DBNRR on the FICO Platform business... that's pretty good. We have very low churn.",
            "th": "อัตราการรักษารายได้ลูกค้าเดิมแบบคิดเป็นมูลค่า (DBNRR) ของธุรกิจ FICO Platform อยู่ที่ 146% ถือว่าดีมาก และเรามีอัตราลูกค้าเลิกใช้บริการ (churn) ต่ำมาก"
          },
          {
            "heading": "Q&A — ความต่างของการเติบโตระหว่างแพลตฟอร์มกับที่ไม่ใช่แพลตฟอร์ม (Owen Lau, Clear Street)",
            "en": "Yes. The short answer is yes... you will continue to see the divergence that you're seeing right now.",
            "th": "ใช่ครับ คำตอบสั้นๆ คือใช่ คุณจะยังคงเห็นความแตกต่างที่กำลังเกิดขึ้นตอนนี้ต่อไปอีก"
          },
          {
            "heading": "Q&A — ความร่วมมือกับ Accenture (Sean Kennedy, Mizuho)",
            "en": "We're IP rich in distribution poor... we're super pleased to now be in this significant strategic partnership.",
            "th": "เรามีทรัพย์สินทางปัญญาเยอะแต่ช่องทางจัดจำหน่ายยังน้อย เรารู้สึกยินดีมากที่ตอนนี้ได้เข้าสู่ความร่วมมือเชิงกลยุทธ์ที่สำคัญนี้"
          },
          {
            "heading": "Q&A — ราคาแบบ performance model ในตลาด nonconforming (Craig Huber, Huber Research)",
            "en": "We have not offered it... It is to be offered through the Direct License Program, and that is not live yet.",
            "th": "เรายังไม่ได้เปิดให้บริการตัวนั้น มันจะถูกเสนอผ่านโครงการ Direct License Program ซึ่งยังไม่เริ่มใช้งานจริง"
          },
          {
            "heading": "Q&A — ความสัมพันธ์กับบริษัทข้อมูลเครดิต (Rayna Kumar, Oppenheimer)",
            "en": "We get along great with the bureaus... At the same time, we're now competing in mortgage scores.",
            "th": "เรายังคงมีความสัมพันธ์ที่ดีมากกับบริษัทข้อมูลเครดิต (bureau) แต่ในขณะเดียวกันตอนนี้เราก็กลายเป็นคู่แข่งกันในตลาดสกอร์สินเชื่อจำนองไปด้วย"
          }
        ]
      }
    }
  ],
  "companyDeepDives": [
{
      "id": "cd0001",
      "date": "2026-07-30",
      "ticker": "SOFI",
      "company": "SoFi Technologies, Inc.",
      "sector": "Digital Consumer Banking & Fintech Platform",
      "tagline": "แพลตฟอร์มการเงินดิจิทัลครบวงจรที่รวมธนาคาร สินเชื่อ การลงทุน และโครงสร้างพื้นฐานฟินเทคไว้ในแอปเดียว ภายใต้ใบอนุญาตธนาคารของตัวเอง",
      "overview": "SoFi Technologies ก่อตั้งขึ้นในปี 2011 ในชื่อ Social Finance เริ่มต้นจากธุรกิจรีไฟแนนซ์สินเชื่อนักเรียน (student loan refinancing) ก่อนขยายมาเป็นแพลตฟอร์มการเงินดิจิทัลครบวงจร ให้บริการทั้งสินเชื่อส่วนบุคคล สินเชื่อบ้าน บัญชีเงินฝาก การลงทุน บัตรเครดิต และประกันภัย ผ่านแอปเดียว สำนักงานใหญ่อยู่ที่ซานฟรานซิสโก\n\nโมเดลธุรกิจแบ่งเป็น 3 กลุ่มหลัก: (1) Lending — สินเชื่อส่วนบุคคล นักเรียน และบ้าน เป็นธุรกิจดั้งเดิมที่ยังทำรายได้หลัก จุดต่างจากคู่แข่งฟินเทคทั่วไปคือ SoFi ใช้เงินฝากของตัวเอง (จากการมีใบอนุญาตธนาคาร) มาปล่อยกู้ ทำให้ได้ NIM (Net Interest Margin — ส่วนต่างระหว่างดอกเบี้ยรับจากการปล่อยกู้กับดอกเบี้ยจ่ายให้ผู้ฝากเงิน) สูงกว่า (2) Financial Services — บัญชีเงินฝาก, SoFi Invest, บัตรเครดิต, ประกันภัย เป็นกลุ่มที่โตเร็วสุดและใช้เป็นช่องทางครอสเซล (cross-sell — ขายสินค้าตัวอื่นต่อให้ลูกค้าเดิม) ต่อยอดจากลูกค้าที่เข้ามาใช้สินเชื่อ (3) Technology Platform — Galileo และ Technisys เป็นธุรกิจ B2B ที่ขายโครงสร้างพื้นฐานธนาคารดิจิทัลให้ฟินเทค/ธนาคารอื่นใช้ต่อ\n\nจุดเปลี่ยนสำคัญคือการได้ใบอนุญาตธนาคารแห่งชาติ (national bank charter) ในปี 2022 ทำให้ SoFi Bank เป็นธนาคารที่มี FDIC ค้ำประกันเงินฝากอย่างเป็นทางการ ต่างจากฟินเทคทั่วไปที่ต้องพึ่งธนาคารพันธมิตร (partner bank) — นี่คือฐานที่ทำให้ต้นทุนเงินทุนถูกลงและขยายสินเชื่อได้เร็วกว่าคู่แข่ง",
      "technology": [
        {
          "label": "Galileo",
          "note": "แพลตฟอร์มโครงสร้างพื้นฐานธนาคารแบบ API-first (เปิด API ให้เชื่อมต่อ) ครอบคลุมการออกบัตร ระบบชำระเงิน ตรวจจับการทุจริต และงานกำกับดูแล ขายเป็นบริการ Banking-as-a-Service ให้ฟินเทค/ธนาคารอื่นหลายสิบราย"
        },
        {
          "label": "Technisys (Cyberbank)",
          "note": "ระบบแกนธนาคาร (core banking) แบบ cloud-native ที่ให้สถาบันการเงินออกแบบ-จัดการผลิตภัณฑ์เงินฝาก สินเชื่อ และดิจิทัลแบงกิ้งได้เอง — รวมกับ Galileo แล้ว SoFi เป็นเจ้าของทั้งชั้นการชำระเงิน ชั้นบัญชีแกน และชั้นประสบการณ์ผู้ใช้ในตัวเอง"
        },
        {
          "label": "SoFiUSD stablecoin",
          "note": "เปิดตัวเดือนพฤษภาคม 2026 เป็น stablecoin (เหรียญดิจิทัลที่ผูกมูลค่า 1:1 กับดอลลาร์สหรัฐ) ตัวแรกที่ออกโดยธนาคารแห่งชาติสหรัฐฯ ให้สมาชิกเกือบ 15 ล้านคนซื้อ-ขาย-แลกได้ตรงในแอป รองรับทั้งบนเครือข่าย Ethereum และ Solana"
        },
        {
          "label": "Big Business Banking",
          "note": "บริการธนาคารสำหรับลูกค้าองค์กรที่รองรับทั้งเงินสกุลปกติและคริปโตในแพลตฟอร์มเดียว มีพันธมิตรเริ่มต้นอย่าง Cumberland, Bullish, BitGo, Fireblocks, Mastercard ต่อยอดจากใบอนุญาตธนาคารที่มีอยู่แล้ว"
        },
        {
          "label": "Peach Finance (เพิ่งควบรวม)",
          "note": "ซื้อกิจการ Peach Finance ผู้ให้บริการซอฟต์แวร์จัดการสินเชื่อ (loan servicing) เข้ามาเสริมฝั่ง Technology Platform เป็นดีลควบรวมกิจการที่ 3 ของปี 2026 ต่อจาก Composer และ PrimaryBid"
        }
      ],
      "marketSummary": "ตลาดธนาคารดิจิทัล/ฟินเทคผู้บริโภคในสหรัฐฯ ยังโตต่อเนื่อง SoFi มีสมาชิกแล้ว 15.8 ล้านคน (เพิ่มขึ้น 35% เทียบปีก่อน) เติบโตเร็วกว่าธนาคารดั้งเดิมมากเพราะไม่มีข้อจำกัดสาขา ต้นทุนต่ำกว่า และใช้โมเดลครอสเซลจากสมาชิกเดิม\n\nคู่แข่งกระจายตามกลุ่มผลิตภัณฑ์: กลุ่ม BNPL/สินเชื่อดิจิทัลมี Affirm และ Upstart เป็นคู่แข่งตรง กลุ่ม neobank (ธนาคารไร้สาขา) มี Chime เป็นคู่แข่งฝั่งบัญชีเงินฝาก ส่วนตลาด LatAm มี Nu Holdings ที่ใหญ่กว่ามากในแง่จำนวนลูกค้าแต่คนละภูมิภาค — จุดที่ SoFi ต่างจากคู่แข่งฟินเทคส่วนใหญ่คือมีใบอนุญาตธนาคารเป็นของตัวเอง ทำให้แข่งขันด้านต้นทุนเงินทุนได้ดีกว่า",
      "competitors": [
        {
          "name": "Affirm",
          "strength": "แบรนด์ BNPL (ซื้อก่อนผ่อนทีหลัง) แข็งแกร่ง มีพันธมิตรร้านค้าปลีกจำนวนมาก",
          "weakness": "ไม่มีใบอนุญาตธนาคาร ผลิตภัณฑ์แคบกว่า SoFi ที่เป็นธนาคารเต็มรูปแบบ"
        },
        {
          "name": "Upstart",
          "strength": "เทคโนโลยี AI ประเมินสินเชื่อ (underwriting) ที่พัฒนามานาน ขายเป็นโมเดลให้ธนาคารอื่นใช้ต่อ",
          "weakness": "ไม่มีเงินฝากของตัวเองมาปล่อยกู้ ต้องพึ่งพาธนาคารพันธมิตร ทำให้ต้นทุนเงินทุนสู้ SoFi ไม่ได้"
        },
        {
          "name": "Chime",
          "strength": "ฐานผู้ใช้ neobank ขนาดใหญ่มาก ต้นทุนหาลูกค้าต่ำ",
          "weakness": "ไม่มีใบอนุญาตธนาคารเป็นของตัวเอง รายได้พึ่งค่าธรรมเนียมเครือข่ายบัตร (interchange) เป็นหลัก ผลิตภัณฑ์แคบกว่า"
        },
        {
          "name": "Nu Holdings",
          "strength": "ฐานลูกค้าใหญ่กว่ามาก (ราว 135 ล้านราย) ในตลาดลาตินอเมริกา",
          "weakness": "เน้นตลาดบราซิล-เม็กซิโก-โคลอมเบีย ไม่ใช่คู่แข่งตรงในตลาดสหรัฐฯ ที่ SoFi อยู่"
        }
      ],
      "financialsSummary": "ไตรมาส 2 ปี 2026 (Q2 2026) SoFi ทำรายได้ปรับปรุง (adjusted net revenue) เป็นสถิติใหม่ที่ 1.21 พันล้านดอลลาร์ โต 40% เทียบปีก่อน กำไรสุทธิตามบัญชี (GAAP net income) 156.6 ล้านดอลลาร์ โต 61% กำไรก่อนหักดอกเบี้ย-ภาษี-ค่าเสื่อม-ตัดจำหน่ายปรับปรุง (adjusted EBITDA) 357.8 ล้านดอลลาร์ ที่มาร์จิ้น 30%\n\nแนวโน้มรายได้ต่อไตรมาสยังโตต่อเนื่องชัดเจนตลอด 4 ไตรมาสล่าสุด และบริษัทเพิ่งปรับเป้าปีทั้งปี 2026 ขึ้น เป็นรายได้ปรับปรุง 4.75-4.85 พันล้านดอลลาร์ (โต 32-35%) พร้อมเป้ากำไรสุทธิปรับปรุงราว 825 ล้านดอลลาร์ และ EPS ปรับปรุงราว 0.60 ดอลลาร์\n\nอย่างไรก็ตาม ราคาหุ้นกลับปรับตัวลงหลังประกาศงบทั้งที่ผลประกอบการดีกว่าคาด สะท้อนว่านักลงทุนบางส่วนกังวลเรื่องคุณภาพสินเชื่อและการที่บริษัทไม่ได้ปรับเป้ามาร์จิ้น EBITDA ขึ้นตามรายได้ที่โต",
      "financialMetrics": [
        {
          "label": "Adjusted Net Revenue (Q2 2026)",
          "value": "$1.21B",
          "note": "+40% YoY, สถิติใหม่"
        },
        {
          "label": "GAAP Net Income (Q2 2026)",
          "value": "$156.6M",
          "note": "+61% YoY"
        },
        {
          "label": "Adjusted EBITDA (Q2 2026)",
          "value": "$357.8M",
          "note": "มาร์จิ้น 30%"
        },
        {
          "label": "Total Members",
          "value": "15.8 ล้านคน",
          "note": "+35% YoY"
        },
        {
          "label": "Loan Originations (Q2 2026)",
          "value": "$14.8B",
          "note": "+69% YoY"
        },
        {
          "label": "Market Cap",
          "value": "~$21.65B",
          "note": "ข้อมูล ณ 28 ก.ค. 2026"
        },
        {
          "label": "FY2026 Revenue Guidance",
          "value": "$4.75B–$4.85B",
          "note": "ปรับขึ้นจากเดิม ~$4.655B"
        }
      ],
      "financialTrend": [
        {
          "label": "Q3'25",
          "value": 950
        },
        {
          "label": "Q4'25",
          "value": 1013
        },
        {
          "label": "Q1'26",
          "value": 1087
        },
        {
          "label": "Q2'26",
          "value": 1206
        }
      ],
      "leadership": [
        {
          "name": "Anthony Noto",
          "role": "CEO",
          "note": "อดีตผู้บริหาร Twitter และ Goldman Sachs เข้ามาเป็น CEO ตั้งแต่ปี 2018 ผู้อยู่เบื้องหลังการเปลี่ยน SoFi จากบริษัทรีไฟแนนซ์สินเชื่อนักเรียนให้กลายเป็นแพลตฟอร์มธนาคารดิจิทัลครบวงจร ถือหุ้นส่วนตัวกว่า 11.6 ล้านหุ้น"
        },
        {
          "name": "Chris Lapointe",
          "role": "CFO",
          "note": "ดูแลด้านการเงิน เป็นผู้ตอบคำถามหลักเรื่องแผนการลงทุน/มาร์จิ้นในที่ประชุมนักวิเคราะห์"
        },
        {
          "name": "Tom Hutton",
          "role": "Independent Chairman",
          "note": "ประธานกรรมการอิสระของบริษัท"
        }
      ],
      "investors": [
        "Vanguard Group",
        "BlackRock",
        "SoftBank",
        "Qatar Investment Authority",
        "Silver Lake",
        "Social Capital (ผู้นำ SPAC ตอน IPO ปี 2021)"
      ],
      "catalysts": [
        {
          "label": "ขยาย SoFiUSD stablecoin",
          "note": "ต่อยอดจากฐานสมาชิก 15 ล้านคนที่มีอยู่แล้ว เป็นช่องทางรายได้ใหม่จากธุรกรรมคริปโตที่กำกับดูแลถูกกฎหมาย"
        },
        {
          "label": "Big Business Banking เจาะลูกค้าองค์กร",
          "note": "มีพันธมิตรตั้งต้นระดับสถาบัน (Mastercard, Fireblocks, BitGo ฯลฯ) เปิดตลาดใหม่ที่ไม่ใช่ผู้บริโภครายย่อย"
        },
        {
          "label": "ควบรวม Peach Finance เสริม Technology Platform",
          "note": "เพิ่มความสามารถด้านซอฟต์แวร์จัดการสินเชื่อ ต่อยอดรายได้ B2B จาก Galileo/Technisys"
        },
        {
          "label": "ปรับเป้ารายได้ทั้งปีขึ้นต่อเนื่อง",
          "note": "สะท้อนความมั่นใจของผู้บริหารต่อโมเมนตัมธุรกิจ แม้ราคาหุ้นตอบสนองลบในช่วงสั้น"
        }
      ],
      "risks": [
        {
          "label": "คุณภาพสินเชื่อพอร์ตส่วนบุคคล",
          "note": "พอร์ตสินเชื่อส่วนบุคคลแบบไม่มีหลักประกัน (unsecured) มูลค่าราว 1.5 หมื่นล้านดอลลาร์ อ่อนไหวต่ออัตราว่างงาน หากเศรษฐกิจสหรัฐฯ ชะลอตัวปลายปี 2026 อาจเห็นหนี้เสียเพิ่มขึ้น"
        },
        {
          "label": "แรงกดดันกำกับดูแล",
          "note": "สถานะธนาคารที่มีใบอนุญาตแห่งชาติทำให้ต้องอยู่ภายใต้การกำกับดูแลที่เข้มงวดกว่าฟินเทคทั่วไป และบริการ stablecoin/คริปโตยังเป็นพื้นที่กฎเกณฑ์ที่เปลี่ยนแปลงได้ตลอด"
        },
        {
          "label": "ถูกสอบสวนจาก short-seller",
          "note": "ช่วงปลายพฤษภาคม-มิถุนายน 2026 เจอการสอบสวนแบบ class-action จากข้อกล่าวหาของนักลงทุนขาย short เกี่ยวกับความถูกต้องของการรายงานผลประกอบการ"
        },
        {
          "label": "นักวิเคราะห์ปรับประมาณการลงต่อเนื่อง",
          "note": "ในช่วง 90 วันก่อนประกาศงบ มีการปรับประมาณการ EPS ลง 6 ครั้งและไม่มีปรับขึ้นเลยแม้ผลจริงจะออกมาดีกว่าคาด สะท้อนความระมัดระวังของตลาดต่อความยั่งยืนของอัตราเติบโตนี้"
        },
        {
          "label": "แข่งขันสูงในหลายผลิตภัณฑ์พร้อมกัน",
          "note": "ต้องสู้กับคู่แข่งเฉพาะทางในแต่ละผลิตภัณฑ์ (Affirm ด้าน BNPL, Chime ด้านบัญชีเงินฝาก, Upstart ด้าน AI underwriting) พร้อมกันหลายด้าน"
        }
      ],
      "discussion": [
        "Bull case: ทำ Rule of 40 (เกณฑ์รวมอัตราการเติบโตของรายได้กับมาร์จิ้นกำไรต้องรวมกันได้อย่างน้อย 40) ติดต่อกันมา 19 ไตรมาสแล้ว สะท้อนว่าโมเดลธุรกิจที่ผสมสินเชื่อ+บริการการเงิน+แพลตฟอร์มเทคโนโลยีเข้าด้วยกันทำงานได้จริง ไม่ใช่แค่เติบโตแบบเผาเงินสด",
        "Bear case: ราคาหุ้นร่วงทันทีหลังประกาศงบทั้งที่ผลประกอบการดีกว่าคาดทุกตัวเลข เป็นสัญญาณว่าตลาดอาจกำลังกังวลเรื่องคุณภาพสินเชื่อหรือความยั่งยืนของอัตราเติบโต 40% มากกว่าที่ตัวเลขไตรมาสนี้จะบอกได้",
        "ถ้าเศรษฐกิจสหรัฐฯ เข้าสู่ภาวะชะลอตัวจริงในช่วงปลายปี 2026 พอร์ตสินเชื่อส่วนบุคคลไม่มีหลักประกันของ SoFi จะกระทบมากแค่ไหน เทียบกับธนาคารดั้งเดิมที่มีพอร์ตกระจายกว่า",
        "การขยายเข้าสู่ stablecoin และ Big Business Banking (ธุรกิจคริปโตสำหรับองค์กร) จะกลายเป็นเครื่องยนต์การเติบโตใหม่ที่คุ้มกับความเสี่ยงด้านกฎเกณฑ์ที่เพิ่มขึ้น หรือจะเป็นจุดที่ทำให้ผู้กำกับดูแลจับตามากขึ้นจนกระทบธุรกิจหลักไปด้วย"
      ],
      "caveats": "ข้อมูลนี้จัดทำเพื่อการศึกษาและประกอบการตัดสินใจส่วนบุคคลเท่านั้น ไม่ใช่คำแนะนำการลงทุน ตัวเลขและสถานการณ์บริษัทอ้างอิงข้อมูลสาธารณะ ณ วันที่ 30 กรกฎาคม 2026 (ผลประกอบการ Q2 2026 ประกาศเมื่อ 29 กรกฎาคม 2026) ราคาหุ้น มูลค่าตลาด และตัวเลขคาดการณ์เปลี่ยนแปลงได้ตลอดเวลา"
    }
,
    {
      "id": "cd0002",
      "date": "2026-07-31",
      "ticker": "FICO",
      "company": "Fair Isaac Corporation",
      "sector": "Credit Scoring & Decision Analytics Software",
      "tagline": "บริษัทเจ้าของ FICO Score ซึ่งเป็นมาตรฐานการวัดความเสี่ยงเครดิตผู้บริโภคที่ใช้แพร่หลายที่สุดในสหรัฐฯ ควบคู่กับธุรกิจซอฟต์แวร์วิเคราะห์และตัดสินใจสำหรับองค์กร",
      "overview": "Fair Isaac Corporation ก่อตั้งขึ้นในปี 1956 โดย Bill Fair วิศวกร และ Earl Isaac นักคณิตศาสตร์ ที่เมืองซานราฟาเอล รัฐแคลิฟอร์เนีย บนแนวคิดว่าข้อมูลที่ใช้อย่างชาญฉลาดจะช่วยให้ตัดสินใจทางธุรกิจได้ดีขึ้น บริษัทเริ่มจากการพัฒนาระบบให้คะแนนสินเชื่อในปี 1958 ก่อนเปิดตัว FICO Score เวอร์ชันทั่วไปตัวแรกในปี 1989 ปัจจุบัน FICO Score กลายเป็นมาตรฐานการวัดความเสี่ยงเครดิตผู้บริโภคที่ใช้กันแพร่หลายที่สุดในสหรัฐฯ โดยผู้ให้กู้กว่า 90% ใช้สกอร์นี้ประกอบการตัดสินใจปล่อยสินเชื่อแทบทุกประเภท ทั้งจำนอง รถยนต์ บัตรเครดิต และสินเชื่อส่วนบุคคล\n\nโมเดลธุรกิจของ FICO แบ่งเป็น 2 กลุ่มหลัก คือ (1) Scores — ขาย FICO Score โดยตรง ส่วนใหญ่เป็นรายได้แบบ B2B ที่คิดค่าธรรมเนียมต่อครั้งที่ผู้ให้กู้หรือ reseller ดึงสกอร์ผ่านบริษัทข้อมูลเครดิตทั้งสามราย (Equifax, Experian, TransUnion) บวกกับรายได้ B2C เล็กน้อยผ่านเว็บไซต์ myFICO.com ที่ขายตรงให้ผู้บริโภค และ (2) Software — ขายซอฟต์แวร์วิเคราะห์และตัดสินใจในรูปแบบ SaaS ผ่าน FICO Platform เป็นรายได้ประจำ (ARR) บวกกับใบอนุญาตแบบติดตั้งในสถานที่ลูกค้า (on-premises) รุ่นเก่าและบริการที่ปรึกษาที่กำลังลดความสำคัญลงเรื่อยๆ ปัจจุบันกลุ่ม Scores กลายเป็นตัวขับเคลื่อนการเติบโตหลักของบริษัทอย่างชัดเจน จากอำนาจการตั้งราคาในตลาดจำนองที่แทบไม่มีคู่แข่งมานานหลายสิบปี\n\nตั้งแต่ปี 2023 เป็นต้นมา FICO ผลักดันกลยุทธ์ FICO Platform อย่างหนัก เป็นแพลตฟอร์มตัดสินใจแบบรวมศูนย์ที่ผสานการตรวจจับทุจริต (Falcon) การตลาด และการให้คะแนนเครดิตไว้ในโปรไฟล์ลูกค้าเดียวที่อัปเดตแบบเรียลไทม์ พยายามเปลี่ยนบริษัทจากการขายโซลูชันแยกส่วนไปสู่ธุรกิจแพลตฟอร์มที่มีรายได้ประจำ แข่งขันในตลาดที่เรียกว่า \"decision intelligence\" ซึ่ง Gartner ยกให้ FICO เป็นผู้นำ (Leader) ในรายงาน Magic Quadrant สำหรับ Decision Intelligence Platforms ฉบับเดือนมกราคม 2026",
      "technology": [
        {
          "label": "FICO Score (Classic, 9, 10, 10T)",
          "note": "ตระกูลโมเดลให้คะแนนเครดิตที่พัฒนาต่อเนื่องมาหลายเวอร์ชัน โดย FICO Score 10T เป็นเวอร์ชันล่าสุดที่ใช้เทคนิคการวิเคราะห์แนวโน้ม (trended data) และนำประวัติการจ่ายค่าเช่า-ค่าสาธารณูปโภคมารวมคำนวณ ช่วยประเมินความเสี่ยงแม่นยำขึ้นและให้ผู้บริโภคกลุ่มที่เคยเข้าถึงสินเชื่อยากมีโอกาสผ่านคุณสมบัติมากขึ้น"
        },
        {
          "label": "FICO Falcon Fraud Manager",
          "note": "ระบบตรวจจับและป้องกันการทุจริตทางการเงินแบบเรียลไทม์ ขับเคลื่อนด้วยสิทธิบัตร machine learning เฉพาะด้านทุจริตกว่า 120 ฉบับ ปกป้องบัญชีการชำระเงินกว่า 2.6 พันล้านบัญชีทั่วโลก"
        },
        {
          "label": "FICO Platform",
          "note": "แพลตฟอร์มตัดสินใจแบบรวมศูนย์ (decisioning platform) ที่ออกแบบให้เป็นระบบขับเคลื่อนด้วย AI agent (agentic-by-design) มีลูกค้าองค์กรใช้งานแล้วกว่า 150 รายทั่วโลก หลายรายใช้งานมากกว่าหนึ่งโซลูชันพร้อมกัน"
        },
        {
          "label": "UltraFICO / Cash Flow Score (ร่วมกับ Plaid)",
          "note": "สกอร์ทางเลือกที่ใช้ข้อมูลกระแสเงินสดจากบัญชีธุรกรรมจริง (ผ่านเครือข่าย Open Finance ของ Plaid) แทนหรือเสริมข้อมูลเครดิตแบบดั้งเดิม ช่วยประเมินผู้บริโภคที่มีประวัติเครดิตบางหรือไม่มีเลย"
        },
        {
          "label": "สิทธิบัตรด้าน AI",
          "note": "มีสิทธิบัตรที่เกี่ยวข้องกับ AI แล้ว 137 ฉบับ รวมถึงเทคโนโลยีบล็อกเชนที่ช่วยให้การตัดสินใจของ AI ตรวจสอบย้อนกลับได้และอธิบายได้ ซึ่งเป็นจุดขายสำคัญในอุตสาหกรรมการเงินที่ถูกกำกับดูแลเข้มงวด"
        }
      ],
      "marketSummary": "ตลาดให้คะแนนเครดิตในสหรัฐฯ เดิมเป็นตลาดที่ FICO ผูกขาดแทบสมบูรณ์มานานหลายสิบปี โดยเฉพาะในตลาดจำนองมาตรฐาน (conforming) ที่ Fannie Mae และ Freddie Mac (GSE) เคยกำหนดให้ใช้ FICO Score เท่านั้น แต่สถานการณ์เปลี่ยนไปมากในช่วงปี 2025-2026 เมื่อ FHFA (หน่วยงานกำกับดูแล GSE) เปิดทางให้ใช้ VantageScore 4.0 ซึ่งเป็นสกอร์คู่แข่งที่ก่อตั้งโดยบริษัทข้อมูลเครดิตทั้งสามรายร่วมกันในปี 2006 ได้ด้วยเช่นกัน ส่งผลให้เกิดสงครามราคาที่ VantageScore ใช้กลยุทธ์ตั้งราคาต่ำกว่าตลาดอย่างชัดเจนเพื่อแย่งส่วนแบ่ง\n\nนอกเหนือจากธุรกิจให้คะแนนเครดิต ตลาดซอฟต์แวร์ตัดสินใจ/ตรวจจับทุจริต/บริหารความสัมพันธ์ลูกค้ามีขนาดใหญ่กว่ามากและกระจัดกระจายกว่า มีผู้เล่นทั้งบริษัทซอฟต์แวร์วิเคราะห์ขนาดใหญ่และบริษัทข้อมูลเครดิตที่เริ่มขยายมาทำธุรกิจซอฟต์แวร์วิเคราะห์ของตัวเองด้วยเช่นกัน",
      "competitors": [
        {
          "name": "VantageScore",
          "strength": "เจ้าของร่วมคือบริษัทข้อมูลเครดิตทั้งสามราย (Equifax, Experian, TransUnion) ทำให้มีช่องทางจัดจำหน่ายตรงอยู่แล้ว บวกกับได้รับไฟเขียวจาก FHFA ให้ใช้ในตลาดจำนองมาตรฐานได้ตั้งแต่กลางปี 2025 และใช้กลยุทธ์ราคาต่ำดึงส่วนแบ่งตลาดอย่างจริงจัง",
          "weakness": "ประวัติการใช้งานในตลาดจำนองยังสั้นกว่า FICO มาก ปัจจุบันสัดส่วนการใช้งานยังอยู่เพียงราว 20-30% ของตลาดจำนอง และยังต้องพิสูจน์ความแม่นยำเชิงพยากรณ์ในระยะยาว"
        },
        {
          "name": "Equifax / Experian / TransUnion",
          "strength": "เป็นเจ้าของข้อมูลเครดิตดิบที่ทั้ง FICO และ VantageScore ต้องพึ่งพา ทำให้มีอำนาจต่อรองสูงและเป็นทั้งพันธมิตรจัดจำหน่ายและคู่แข่งของ FICO ไปพร้อมกัน",
          "weakness": "ความสัมพันธ์แบบ co-opetition (แข่งขันและร่วมมือพร้อมกัน) นี้สร้างความซับซ้อนในการบริหารช่องทางจัดจำหน่าย และตัวบริษัทข้อมูลเครดิตเองก็ยังไม่มีสกอร์ของตัวเองที่ได้รับความน่าเชื่อถือเทียบเท่า FICO Score เดี่ยวๆ"
        },
        {
          "name": "SAS Institute",
          "strength": "บริษัทซอฟต์แวร์วิเคราะห์และตัดสินใจระดับองค์กรที่มีความสัมพันธ์ลูกค้าองค์กรมายาวนาน ครอบคลุมหลายอุตสาหกรรมกว่า FICO",
          "weakness": "เป็นบริษัทเอกชนที่ไม่เน้นการตัดสินใจสำหรับผู้บริโภคแบบเรียลไทม์และ AI agent เท่า FICO Platform"
        },
        {
          "name": "IBM (decisioning & automation tools)",
          "strength": "มีช่องทางจัดจำหน่ายและฐานลูกค้าองค์กรขนาดใหญ่มากผ่านผลิตภัณฑ์ไอทีที่หลากหลาย สามารถขายพ่วงกับโซลูชันอื่นได้ง่าย",
          "weakness": "การตัดสินใจ (decisioning) ไม่ใช่จุดโฟกัสหลักของธุรกิจ เป็นเพียงส่วนหนึ่งของพอร์ตผลิตภัณฑ์ที่กว้างกว่ามาก ทำให้ความลึกเฉพาะทางสู้ FICO ไม่ได้"
        }
      ],
      "financialsSummary": "ปีงบการเงิน 2025 (สิ้นสุดกันยายน 2025) FICO ทำรายได้รวม 1.99 พันล้านดอลลาร์ เพิ่มขึ้น 16% จากปีก่อน เมื่อเข้าสู่ปีงบ 2026 บริษัทปรับเป้ารายได้ทั้งปีขึ้นต่อเนื่องถึง 3 รอบตามผลประกอบการที่ออกมาดีกว่าคาด จากเป้าตั้งต้น 2.35 พันล้านดอลลาร์ เป็น 2.45 พันล้านดอลลาร์ในไตรมาส 2 และล่าสุด 2.53 พันล้านดอลลาร์ในไตรมาส 3 คิดเป็นการเติบโต 20% เทียบปีก่อน\n\nแรงขับเคลื่อนการเติบโตส่วนใหญ่กระจุกตัวอยู่ที่อำนาจการตั้งราคาของกลุ่ม Scores ในตลาดจำนอง (รายได้จากสินเชื่อจำนองในบางไตรมาสโตสูงถึง 97-127% เทียบปีก่อน) มากกว่าการเติบโตของธุรกิจซอฟต์แวร์ในภาพรวมที่ยังโตเพียงหลักเดียวถึงหลักสิบต้นๆ ต่อปี ส่วนที่โดดเด่นในฝั่งซอฟต์แวร์คือ FICO Platform ที่มี ARR โตต่อเนื่อง 33-62% ต่อไตรมาสและเพิ่งแซงหน้ารายได้ฝั่งที่ไม่ใช่แพลตฟอร์มเป็นครั้งแรกในไตรมาส 3 ปีงบ 2026\n\nแม้ผลประกอบการและกระแสเงินสดจะทำสถิติใหม่ต่อเนื่อง ราคาหุ้น FICO กลับผันผวนรุนแรงมากในปี 2026 แกว่งจากจุดสูงสุดในรอบ 52 สัปดาห์ที่ 1,998.01 ดอลลาร์ (ต.ค. 2025) ลงมาต่ำสุดที่ 870.01 ดอลลาร์ (เม.ย. 2026) และร่วงลงอีกครั้งอย่างหนักหลังประกาศผลไตรมาส 3 ปลายเดือนกรกฎาคม 2026 แม้กำไรต่อหุ้นจะทำได้ดีกว่าคาดและมีการปรับเป้าทั้งปีขึ้นอีกครั้งก็ตาม สะท้อนว่าตลาดกำลังให้น้ำหนักกับความเสี่ยงระยะยาวจากการแข่งขันกับ VantageScore มากกว่าตัวเลขผลประกอบการรายไตรมาส",
      "financialMetrics": [
        {
          "label": "Revenue (FY2025)",
          "value": "$1.99B",
          "note": "+16% YoY"
        },
        {
          "label": "Revenue Guidance (FY2026, ปรับล่าสุดหลัง Q3)",
          "value": "$2.53B",
          "note": "+20% YoY เพิ่มขึ้นจากเป้าตั้งต้น $2.35B"
        },
        {
          "label": "Market Cap",
          "value": "~$24.6B",
          "note": "ณ 31 ก.ค. 2026 หลังหุ้นร่วงแรงหลังงบ Q3 — เคยสูงกว่า $34B ในช่วงต้นปีงบ 2026"
        },
        {
          "label": "Trailing P/E",
          "value": "33.1x",
          "note": "Forward P/E ราว 22.2x"
        },
        {
          "label": "Total Debt",
          "value": "$3.64B",
          "note": "ณ สิ้นไตรมาส 2 ปีงบ 2026 ดอกเบี้ยเฉลี่ย 5.5%"
        },
        {
          "label": "Free Cash Flow (TTM ถึง Q3 FY26)",
          "value": "~$1.03B",
          "note": "รวม 4 ไตรมาสล่าสุด (165+214+370+กระแสเงินสด Q4 FY25 ประมาณการ)"
        },
        {
          "label": "Scores vs Software Revenue Mix (Q3 FY26)",
          "value": "68% / 32%",
          "note": "$459M กลุ่ม Scores เทียบ $215M กลุ่ม Software — สัดส่วน Scores เพิ่มขึ้นต่อเนื่อง"
        }
      ],
      "financialTrend": [
        {
          "label": "Q2'25",
          "value": 499
        },
        {
          "label": "Q3'25",
          "value": 536
        },
        {
          "label": "Q4'25",
          "value": 516
        },
        {
          "label": "Q1'26",
          "value": 512
        },
        {
          "label": "Q2'26",
          "value": 692
        },
        {
          "label": "Q3'26",
          "value": 674
        }
      ],
      "leadership": [
        {
          "name": "William J. Lansing",
          "role": "CEO",
          "note": "ดำรงตำแหน่ง CEO มาตั้งแต่ปี 2012 จบนิติศาสตร์จาก Georgetown เคยผ่านงานบริหารที่ McKinsey, GE, Prodigy, Fingerhut, NBC Internet และ InfoSpace ภายใต้การนำของเขา รายได้ FICO เติบโตจากราว 620 ล้านดอลลาร์ในปีงบ 2011 เป็นเกือบ 2 พันล้านดอลลาร์ในปีงบ 2025 และผลตอบแทนรวมต่อผู้ถือหุ้นสะสมสูงกว่า 5,333% ตลอดวาระ"
        },
        {
          "name": "Steven P. Weber",
          "role": "CFO",
          "note": "ดูแลด้านการเงิน เป็นผู้รายงานตัวเลขผลประกอบการแยกเซกเมนต์และตอบคำถามนักวิเคราะห์เรื่องแนวทางการปรับเป้าและกลยุทธ์ราคาในทุกไตรมาส"
        }
      ],
      "investors": [
        "Vanguard Group",
        "BlackRock",
        "State Street",
        "Capital World Investors",
        "Geode Capital Management"
      ],
      "catalysts": [
        {
          "label": "การรับรอง FICO Score 10T จาก GSE",
          "note": "เมื่อ Fannie Mae/Freddie Mac รับรองให้ใช้ 10T อย่างเป็นทางการในตลาดจำนองมาตรฐาน อาจเปิดรอบการอัปเกรดครั้งใหญ่จาก FICO Score รุ่นคลาสสิก"
        },
        {
          "label": "ปรับราคา 10T ลงแรงเพื่อรักษาส่วนแบ่งตลาด",
          "note": "ปรับจาก 4.95 ดอลลาร์ต่อสกอร์ เหลือ 0.99 ดอลลาร์ต่อสกอร์บวกค่าธรรมเนียมใหม่ เพื่อดึงดูดให้ผู้ให้กู้และ reseller เร่งใช้งานเร็วขึ้นแทนที่จะเปลี่ยนไปใช้ VantageScore"
        },
        {
          "label": "FICO Platform เร่งตัวต่อเนื่อง",
          "note": "Platform ARR โตต่อเนื่อง 33-62% ต่อไตรมาสและได้รับการยอมรับจาก Gartner ว่าเป็นผู้นำ Decision Intelligence Platforms ยืนยันว่ากลยุทธ์ปรับเป็นธุรกิจแพลตฟอร์มเริ่มเห็นผล"
        },
        {
          "label": "UltraFICO / ความร่วมมือกับ Plaid",
          "note": "สกอร์ทางเลือกที่ใช้ข้อมูลกระแสเงินสด อาจขยายฐานผู้บริโภคที่เข้าถึงสินเชื่อได้ ซึ่งเป็นตลาดใหม่ที่ FICO Score แบบดั้งเดิมเข้าไม่ถึง"
        },
        {
          "label": "คืนเงินผู้ถือหุ้นต่อเนื่องในระดับสูง",
          "note": "ซื้อหุ้นคืนมูลค่า 605 ล้านดอลลาร์ในไตรมาสเดียว (สูงสุดในประวัติศาสตร์บริษัท) พร้อมวงเงินอนุมัติใหม่ 1.5 พันล้านดอลลาร์ สะท้อนความมั่นใจของฝ่ายบริหาร"
        }
      ],
      "risks": [
        {
          "label": "FHFA เปิดทางให้ใช้ VantageScore ในตลาดจำนองมาตรฐาน",
          "note": "เป็นความเสี่ยงเชิงโครงสร้างที่ใหญ่ที่สุดของ FICO ในรอบหลายสิบปี ทำลายเงื่อนไขที่เคยผูกขาดตลาดจำนองมาตรฐานไว้เกือบสมบูรณ์ แม้ปัจจุบันยังไม่เห็นปริมาณการใช้งาน FICO ลดลงชัดเจน แต่ระยะยาวอำนาจต่อรองด้านราคาอาจถูกกัดกร่อนต่อเนื่อง"
        },
        {
          "label": "แรงกดดันจากการเมืองและหน่วยงานกำกับดูแล",
          "note": "อัยการสูงสุดรัฐฟลอริดาเปิดการสอบสวนด้านการผูกขาด และวุฒิสมาชิก Josh Hawley เรียกร้องให้ FTC/DOJ สอบสวนการขึ้นราคาสกอร์ต่อครั้งที่มีรายงานว่าเพิ่มขึ้นจากไม่ถึง 1 ดอลลาร์ เป็นสูงสุดถึง 10 ดอลลาร์ อาจนำไปสู่มาตรการทางกฎหมายหรือแรงกดดันให้ปรับโครงสร้างราคาเพิ่มเติม"
        },
        {
          "label": "รายได้กระจุกตัวในวัฏจักรตลาดจำนอง",
          "note": "การเติบโตส่วนใหญ่ในปัจจุบันมาจากราคาต่อหน่วยและปริมาณสินเชื่อจำนองที่เพิ่มขึ้น ซึ่งอ่อนไหวต่ออัตราดอกเบี้ยและภาวะตลาดที่อยู่อาศัยสูง หากตลาดจำนองชะลอตัว การเติบโตของทั้งบริษัทอาจชะลอตามไปด้วย"
        },
        {
          "label": "ความผันผวนของราคาหุ้นสูงมาก",
          "note": "หุ้นแกว่งจาก 1,998.01 ดอลลาร์ ลงมาต่ำสุด 870.01 ดอลลาร์ ในรอบ 52 สัปดาห์ และร่วงต่อเนื่องหลายวันแม้ผลประกอบการไตรมาส 3 จะดีกว่าคาดในหลายตัวเลข สะท้อนว่าตลาดกำลังตีราคาความเสี่ยงจากการแข่งขันระยะยาวมากกว่าแค่ตัวเลขรายไตรมาส"
        },
        {
          "label": "ธุรกิจ Software เติบโตช้ากว่าภาพรวมบริษัทมาก",
          "note": "รายได้ซอฟต์แวร์โตเพียงหลักเดียวถึงต้นหลักสิบต่อปี ขณะที่รายได้ฝั่งที่ไม่ใช่แพลตฟอร์มยังหดตัวต่อเนื่องหลายไตรมาส หากแรงหนุนจากราคาสกอร์จำนองแผ่วลงก่อนที่ Platform จะโตมาทดแทนได้ทัน อัตราเติบโตรวมของบริษัทอาจชะลอตัวลงชัดเจน"
        }
      ],
      "discussion": [
        "Bull case: แม้ VantageScore เริ่มมีที่ยืนในตลาดจำนอง แต่ FICO ยังคุมปริมาณการใช้งานส่วนใหญ่ของอุตสาหกรรมอยู่ (ผู้บริหารยืนยันว่ายังไม่เห็นปริมาณการดึงสกอร์ลดลง) และกำลังใช้กลยุทธ์ลดราคาต่อสกอร์อย่างจริงจังเพื่อรักษาปริมาณการใช้งานไว้แทนที่จะสู้แพ้ราคาแบบตั้งรับ หากทำสำเร็จ อาจรักษาฐานลูกค้าไว้ได้แม้มาร์จิ้นต่อสกอร์จะลดลง",
        "Bear case: การที่ FHFA เปิดทางให้ VantageScore ใช้ได้ในตลาดจำนองมาตรฐานถือเป็นการทำลายเงื่อนไขผูกขาดที่ FICO อาศัยมานานหลายสิบปี ต่อให้ตอนนี้ยังไม่เห็นการเปลี่ยนส่วนแบ่งตลาดครั้งใหญ่ แต่เมื่อผู้ให้กู้คุ้นเคยกับ VantageScore มากขึ้นในระยะยาว อำนาจต่อรองด้านราคาของ FICO อาจถูกกัดกร่อนต่อเนื่องจนกระทบมาร์จิ้นของทั้งบริษัท",
        "ธุรกิจ Software/Platform ซึ่งควรเป็นเครื่องยนต์การเติบโตระยะยาวที่มั่นคงกว่าธุรกิจ Scores ที่ผูกกับวัฏจักรตลาดจำนอง จะสามารถโตเร่งขึ้นทันเวลาก่อนที่ลมส่งจากราคาสกอร์จำนองจะเริ่มแผ่วลงหรือไม่",
        "แรงกดดันจากฝั่งการเมืองและหน่วยงานกำกับดูแล (Hawley, อัยการสูงสุดรัฐฟลอริดา) จะจบลงด้วยการที่ FICO ต้องยอมปรับโครงสร้างราคาเพิ่มเติม หรือจะเผชิญมาตรการทางกฎหมายที่รุนแรงกว่านี้"
      ],
      "caveats": "ข้อมูลนี้จัดทำเพื่อการศึกษาและประกอบการตัดสินใจส่วนบุคคลเท่านั้น ไม่ใช่คำแนะนำการลงทุน ตัวเลขและสถานการณ์บริษัทอ้างอิงข้อมูลสาธารณะ ณ วันที่ 31 กรกฎาคม 2026 ราคาหุ้น มูลค่าตลาด และตัวเลขคาดการณ์เปลี่ยนแปลงได้ตลอดเวลา โดยเฉพาะช่วงนี้ที่หุ้น FICO ผันผวนสูงมากจากประเด็นการแข่งขันด้านราคากับ VantageScore"
    }
  ]
};
window.INVESTMENT_UPDATED = "02/08/2026";

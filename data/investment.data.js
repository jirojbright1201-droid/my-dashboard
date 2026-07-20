// Investment Tracker — สรุปข่าวการลงทุน/การเงินโลกรายวัน (ไม่มี Obsidian vault: ค้นข่าวสดผ่าน WebSearch/WebFetch ทุกครั้ง)
// schema briefs: id/date/title/summary/macro/sourceName/url — append-only ต่อท้ายของเดิมทุกครั้งที่ sync ไม่ full-rebuild
// schema portfolioReviews: id/date/holdingsRaw/snapshot/allocation/macroLens/positives/concerns/discussion/caveats — append-only ต่อท้ายทุกครั้งที่รีวิวพอร์ตใหม่
window.INVESTMENT_DATA = {
  "briefs": [
    {
      "id": "nw0001",
      "date": "2026-07-20",
      "title": "อิหร่าน-สหรัฐฯ ยังไม่มีทีท่าจะจบ ทหารอเมริกันตายเพิ่ม อิหร่านฉีกข้อตกลงสงบศึก",
      "summary": "สงครามยืดเยื้อเข้าคืนที่ 8 แล้ว กองทัพสหรัฐฯ ยังโจมตีต่อเนื่อง ล่าสุด CENTCOM ยืนยันมีทหารสหรัฐฯ เสียชีวิตเพิ่มในอิรัก ซ้ำรอยเหตุการณ์ที่จอร์แดนเมื่อไม่กี่วันก่อน ฝั่งอิหร่านตอบโต้ด้วยการประกาศฉีก MoU (บันทึกข้อตกลง) สงบศึกที่เคยเซ็นไว้ทันที นักลงทุนต้องอยู่กับความไม่แน่นอนด้าน geopolitics ไปอีกพักใหญ่",
      "macro": true,
      "sourceName": "Al Jazeera",
      "url": "https://www.aljazeera.com/news/liveblog/2026/7/19/iran-war-live-us-launches-new-strikes-trump-mourns-killed-soldiers"
    },
    {
      "id": "nw0002",
      "date": "2026-07-20",
      "title": "น้ำมันขึ้นยกแผง หลังอิหร่านถล่มโรงไฟฟ้า-โรงกลั่นน้ำในคูเวตซ้ำเป็นรอบสอง",
      "summary": "Brent และ WTI บวกแรงราว 3-4% ในรอบสัปดาห์ หลังคูเวตออกมาแฉว่าโรงไฟฟ้าและโรงกลั่นน้ำโดนอิหร่านถล่มซ้ำเป็นครั้งที่ 2 ภายในสองวัน ตลาดเริ่มหวั่นว่าไฟสงครามจะลามมาปิดเส้นทางขนน้ำมันผ่าน Strait of Hormuz ซึ่งแบกรับซัพพลายน้ำมันโลกอยู่ราว 20%",
      "macro": true,
      "sourceName": "CNBC",
      "url": "https://www.cnbc.com/2026/07/17/oil-price-today-brent-wti.html"
    },
    {
      "id": "nw0003",
      "date": "2026-07-20",
      "title": "ทองคำยังยืนเหนือ 4,000 ดอลลาร์ได้ ทั้งที่ Fed ส่งสัญญาณแข็งกร้าว",
      "summary": "แม้ Fed จะยังยืนกรานท่าที hawkish (เอียงไปทางคุมเข้มดอกเบี้ย) และส่งสัญญาณคงดอกเบี้ยสูงยาว (higher-for-longer) ซึ่งปกติจะกดทองคำผ่าน real yield ที่พุ่งและดอลลาร์ที่แข็ง แต่ราคาทองก็ยังหยัดอยู่เหนือแนวรับ 4,000 ดอลลาร์ได้ เพราะแรงหนุนจากความเสี่ยงสงครามในตะวันออกกลางเข้ามาช่วยพยุงไว้พอดี",
      "macro": true,
      "sourceName": "FX Leaders",
      "url": "https://www.fxleaders.com/news/2026/07/19/gold-price-forecast-positive-signals-as-xau-usd-holds-above-4000-despite-hawkish-fed-and-strait-of-hormuz-tensions/"
    },
    {
      "id": "nw0004",
      "date": "2026-07-20",
      "title": "ดอลลาร์อ่อนแรงต่อ หลังเงินเฟ้อสหรัฐฯ ชะลอกว่าที่คิด",
      "summary": "ดัชนีดอลลาร์ (DXY) โดนเทขายหลังทำแท่งเทียนกลับตัวขาลง (bearish engulfing) เมื่อสัปดาห์ก่อน สาเหตุหลักมาจากตัวเลข CPI และ PPI ที่ออกมาต่ำกว่าคาด ทำให้ตลาดเริ่มมองว่า Fed ไม่จำเป็นต้องรีบขึ้นดอกเบี้ยเร็วๆ นี้ นักวิเคราะห์เชื่อดอลลาร์มีลุ้นอ่อนค่าต่ออีก โดยเฉพาะเมื่อเทียบกับเยนญี่ปุ่น",
      "macro": true,
      "sourceName": "DailyForex",
      "url": "https://www.dailyforex.com/forex-technical-analysis/2026/07/weekly-forex-forecast-20th-to-24th-july-2026/247749"
    },
    {
      "id": "nw0005",
      "date": "2026-07-20",
      "title": "ลุ้นกันทั้งตลาด Fed จะขึ้นดอกเบี้ยปลายเดือนนี้ไหม หลังเงินเฟ้อยังไม่ลงง่ายๆ",
      "summary": "ก่อนประชุม FOMC วันที่ 28-29 กรกฎาคมนี้ เริ่มมีเสียงเก็งว่า Fed อาจขึ้นดอกเบี้ย 0.25% หลัง Christopher Waller ผู้ว่าการ Fed ส่งสัญญาณชัดว่าโฟกัสของธนาคารกลางเปลี่ยนจากเรื่องตลาดแรงงานมาเป็นการเบรกเงินเฟ้อที่คาดจะขยับแตะ 3.6% ในปีนี้แทน ล่าสุดข้อมูลจาก CME FedWatch ให้โอกาสขึ้นดอกเบี้ยรอบนี้ไว้ที่ราว 46.5%",
      "macro": true,
      "sourceName": "CNBC",
      "url": "https://www.cnbc.com/2026/07/13/-a-july-rate-hike-from-the-fed-the-odds-are-rising.html"
    },
    {
      "id": "nw0006",
      "date": "2026-07-20",
      "title": "จีนโตพลาดเป้า ไตรมาส 2 ขยายตัวแค่ 4.3%",
      "summary": "เศรษฐกิจจีนไตรมาส 2 ปี 2026 โตแค่ 4.3% เทียบปีก่อน หลุดกรอบเป้าหมายทางการที่วางไว้ 4.5-5% และต่ำกว่าที่นักเศรษฐศาสตร์คาดไว้ด้วย ตัวฉุดหลักคือการลงทุนในสินทรัพย์ถาวรภาคเมืองที่หดตัวเกินคาดถึง 5.7% แม้ยอดค้าปลีกกับส่งออกจะยังพอประคองได้บ้าง แรงกดดันแบบนี้ทำให้ผู้กำหนดนโยบายต้องเร่งอัดเม็ดเงินภาครัฐเพิ่ม",
      "macro": true,
      "sourceName": "CNBC",
      "url": "https://www.cnbc.com/2026/07/15/china-gdp-retail-sales-investment-june-.html"
    },
    {
      "id": "nw0007",
      "date": "2026-07-20",
      "title": "หุ้นสหรัฐฯ ปิดสัปดาห์แดงทั้งกระดาน กลุ่มชิปโดนหนักสุด",
      "summary": "ดัชนีหลักทั้ง 3 ตัวปิดสัปดาห์ที่แล้วร่วงพร้อมกัน S&P 500 ลบ 1.6% Nasdaq Composite ร่วงแรง 2.9% ส่วน Dow Jones ลบ 0.9% โดยตัวฉุดหลักคือกลุ่มเซมิคอนดักเตอร์ที่โดนเทขายหนัก สัปดาห์นี้ต้องจับตาผลประกอบการจาก Tesla, Alphabet และ Intel ว่าจะพลิกบรรยากาศตลาดได้หรือไม่",
      "macro": true,
      "sourceName": "CNBC",
      "url": "https://www.cnbc.com/2026/07/17/stock-market-next-week-outlook-for-july-20-24-2026.html"
    },
    {
      "id": "nw0008",
      "date": "2026-07-20",
      "title": "Netflix กำไรเข้าเป้า แต่หุ้นดันร่วง 9% เพราะนักลงทุนไม่ชอบใจเรื่อง engagement",
      "summary": "รายได้ไตรมาส 2 ของ Netflix ออกมาตรงเป้าที่ 1.256 หมื่นล้านดอลลาร์ กำไรต่อหุ้นก็ดีกว่าคาดนิดหน่อยที่ 0.80 ดอลลาร์ แต่หุ้นกลับเทขายแรงถึง 9% เพราะนักลงทุนตีความว่าบริษัทกำลัง \"ปิดบังอะไรบางอย่าง\" หลังประกาศลดความถี่รายงานข้อมูล engagement (การมีส่วนร่วมของผู้ชม) เหลือปีละครั้ง ซ้ำด้วยชั่วโมงรับชมที่โตแค่ 2% ตามหลังจำนวนสมาชิกใหม่ และ guidance ไตรมาส 3 ที่หย่อนกว่าที่ Wall Street คาดไว้เล็กน้อย",
      "macro": false,
      "sourceName": "The Motley Fool",
      "url": "https://www.fool.com/investing/2026/07/17/netflix-beat-estimates-but-the-stock-dropped/"
    },
    {
      "id": "nw0009",
      "date": "2026-07-20",
      "title": "IBM ร่วงหนักสุดในรอบ 115 ปี หลังลูกค้าทิ้งซอฟต์แวร์ไปซื้อชิปแทน",
      "summary": "หุ้น IBM ดิ่งทีเดียว 25.2% ในวันเดียว แรงที่สุดเท่าที่บริษัทเคยเจอมา เงินหายไปจากมูลค่าตลาดกว่า 6.7 หมื่นล้านดอลลาร์ Arvind Krishna ซีอีโอออกมายอมรับว่าลูกค้าองค์กรพากันเทงบไปกว้านซื้อฮาร์ดแวร์อย่างเซิร์ฟเวอร์และหน่วยความจำแทน เพราะกลัวราคาชิปหน่วยความจำที่พุ่งขึ้นไปแล้วกว่า 100% ผลคือธุรกิจซอฟต์แวร์และที่ปรึกษาซึ่งเป็นเส้นเลือดใหญ่ของ IBM โตช้ากว่าที่ใครคาดไว้มาก",
      "macro": false,
      "sourceName": "Forbes",
      "url": "https://www.forbes.com/sites/petercohan/2026/07/15/ibm-stock-loses-67-billion--causes-and-recovery-outlook/"
    },
    {
      "id": "nw0010",
      "date": "2026-07-20",
      "title": "หุ้นชิปหลุดเข้าตลาดหมี หลัง AI จีน Kimi K3 จาก Moonshot มาป่วนวงการ",
      "summary": "Philadelphia Semiconductor Index ร่วงจนเข้าเกณฑ์ bear market (ตลาดหมี) ทรุดกว่า 20% จากจุดสูงสุดเมื่อเดือนมิถุนายน ต้นเหตุคือสตาร์ทอัพจีน Moonshot ปล่อยโมเดล Kimi K3 ขนาด 2.8 ล้านล้านพารามิเตอร์ออกมาแรง เก่งเทียบเท่าหรือดีกว่าโมเดลชั้นนำของสหรัฐฯ หลายตัว คนในตลาดรีบเทียบกับเหตุการณ์ DeepSeek shock เมื่อปีก่อนทันที พร้อมเริ่มตั้งคำถามว่าเงินมหาศาลที่ทุ่มไปกับ AI capex ของบริษัทเทคฯ สหรัฐฯ ยังคุ้มอยู่จริงไหม ด้าน TSMC โดนหางเลขร่วงไป 7% ทั้งที่กำไรรายไตรมาสเพิ่งพุ่งขึ้น 77%",
      "macro": false,
      "sourceName": "Fortune",
      "url": "https://fortune.com/2026/07/17/china-moonshot-kimi-k3-markets-china-ai/"
    },
    {
      "id": "nw0011",
      "date": "2026-07-21",
      "title": "หุ้นสหรัฐฯ ปิดลบเบาๆ Dow -0.6% ตลาดชั่งใจระหว่างสงครามอิหร่านกับสัปดาห์ผลประกอบการ Big Tech",
      "summary": "วันจันทร์ Dow Jones ลดลงราว 0.6% S&P 500 ลบราว 0.2% ส่วน Nasdaq ปิดแทบไม่เปลี่ยนแปลง นักลงทุนเล่นเกมรอก่อนสัปดาห์ผลประกอบการชุดใหญ่ (Alphabet, Tesla, Intel, IBM) ที่ตลาดอยากเห็นหลักฐานว่าเงินลงทุน AI เริ่มแปลงเป็นกำไรจริง ขณะเดียวกันราคาน้ำมันที่ขยับขึ้นระหว่างวันจากการโจมตีตอบโต้กันระหว่างสหรัฐฯ-อิหร่านยังกดบรรยากาศ หลัง Trump ประกาศว่าอิหร่าน \"จะต้องชดใช้\"",
      "macro": true,
      "sourceName": "Yahoo Finance",
      "url": "https://finance.yahoo.com/markets/live/stock-market-today-monday-july-20-dow-sp-500-nasdaq-111429441.html"
    },
    {
      "id": "nw0012",
      "date": "2026-07-21",
      "title": "Brent ทะลุ $90 สูงสุดตั้งแต่กลางมิถุนายน อิหร่านสกัดเรือใน Hormuz ซ้ำถล่มโรงน้ำมันคูเวต",
      "summary": "Brent พุ่งเกือบ 4% ขึ้นไปแตะราว $90-91 ต่อบาร์เรล สูงสุดนับตั้งแต่กลางมิถุนายน ก่อนย่อลงมาเล็กน้อย ส่วน WTI ยืนเหนือ $84 หลังกองทัพเรืออิหร่านสกัด \"เรือไม่ระบุสัญชาติ 4 ลำ\" ที่พยายามผ่าน Strait of Hormuz และโรงงานน้ำมันของ Kuwait Petroleum โดนโจมตีเสียหายหนักเมื่อวันเสาร์ นับจากจุดต่ำต้นเดือนราคาน้ำมันบวกมาแล้วราว 30% ตลาดยังแกว่งแรงตามข่าวสงครามสลับข่าวความพยายามหยุดยิง",
      "macro": true,
      "sourceName": "Energy Connects",
      "url": "https://www.energyconnects.com/news/oil/2026/july/brent-oil-tops-90-as-middle-east-attacks-threaten-hormuz-flows/"
    },
    {
      "id": "nw0013",
      "date": "2026-07-21",
      "title": "ตัวกลางยื่นข้อเสนอหยุดยิง 10 วัน หวังฟื้นข้อตกลงชั่วคราวสหรัฐฯ-อิหร่าน",
      "summary": "เจ้าหน้าที่อาวุโสอิหร่านเผยกับ Reuters ว่าตัวกลางส่งข้อเสนอหยุดยิง 10 วันให้เตหะราน เพื่อเปิดทางฟื้น interim deal (ข้อตกลงชั่วคราว) ที่เพิ่งล่มไป โฆษกกระทรวงการต่างประเทศอิหร่าน Baghaei ยืนยันว่า \"ตัวกลางกำลังทำงานเพื่อกันไม่ให้ความตึงเครียดบานปลาย\" แต่ยังไม่ชัดว่าอิหร่านจะรับข้อเสนอหรือไม่ ขณะที่สหรัฐฯ ยังเดินหน้าโจมตีต่อเนื่องเป็นวันที่ 9 ติดต่อกัน",
      "macro": true,
      "sourceName": "The Jerusalem Post",
      "url": "https://www.jpost.com/middle-east/iran-news/article-903074"
    },
    {
      "id": "nw0014",
      "date": "2026-07-21",
      "title": "ทองคำทรงตัวเหนือ $4,000 — safe haven จากสงคราม ชนกับแรงกด Fed คงดอกเบี้ยสูงนาน",
      "summary": "ทองคำแกว่งแถว $4,000-4,030 ต่อออนซ์ (-0.2%) แรงซื้อ safe haven (สินทรัพย์ปลอดภัย) จากสงครามสหรัฐฯ-อิหร่าน ถูกถ่วงด้วยอีกด้าน: น้ำมันแพงจุดความกังวลเงินเฟ้อ ทำให้ตลาดคาดว่า Federal Reserve จะตรึงดอกเบี้ยสูงนานขึ้น (higher-for-longer) ซึ่งปกติกดราคาทอง เดือนนี้ทองย่อแล้วราว 4.4% แต่ยังบวกราว 18% จากปีก่อน หลังเคยทำ all-time high ที่ $5,608 เมื่อมกราคม",
      "macro": true,
      "sourceName": "Trading Economics",
      "url": "https://tradingeconomics.com/commodity/gold"
    },
    {
      "id": "nw0015",
      "date": "2026-07-21",
      "title": "สัปดาห์วัดใจ Wall Street: 70+ บริษัท S&P 500 รายงานงบ, Fed เข้า blackout ก่อนประชุม 28-29 ก.ค., ECB ตัดสินดอกเบี้ยพฤหัสนี้",
      "summary": "สัปดาห์นี้บริษัทใน S&P 500 กว่า 70 แห่งทยอยรายงานผลประกอบการ นำโดย Alphabet กับ Tesla ที่ถูกมองเป็นบททดสอบสำคัญของ AI rally หลัง Nasdaq 100 เพิ่งร่วงเกือบ 3.5% เมื่อสัปดาห์ก่อนจากแรงเทขายหุ้นชิป ฝั่งนโยบายการเงิน Fed เข้าช่วง blackout (งดให้สัมภาษณ์) ก่อนประชุม FOMC วันที่ 28-29 ก.ค. ส่วน ECB มีนัดตัดสินดอกเบี้ยวันพฤหัส ทั้งหมดเกิดขึ้นบนฉากหลังน้ำมันเหนือ $90 ที่คอยจุดความกังวลเงินเฟ้อ",
      "macro": true,
      "sourceName": "Proactive Investors",
      "url": "https://www.proactiveinvestors.com/companies/news/1095711/week-ahead-wall-street-gears-up-for-volatility-as-big-tech-earnings-kick-into-high-gear-1095711.html"
    },
    {
      "id": "nw0016",
      "date": "2026-07-21",
      "title": "หุ้นชิปฟื้นจากตลาดหมี — Microsoft จะติดตั้ง Helios rack ของ AMD บน Azure ท้าชน Nvidia",
      "summary": "หุ้นชิปเด้งกลับหลังสัปดาห์เลวร้าย โดย Philadelphia Semiconductor Index บวกเล็กน้อย ตัวจุดพลุคือ AMD ที่ประกาศดีลให้ Microsoft นำ Helios rack (ระบบ AI ทั้งตู้ รวม GPU MI455X + ซีพียู EPYC Venice) ไปใช้งาน inference บน Azure ถือเป็นคู่แข่งจริงจังรายแรกของระบบ NVL72 ของ Nvidia ดันหุ้น AMD ปิดบวกราว 1.6% ด้าน Google ก็มีข่าวซุ่มพัฒนาชิปใหม่ Frozen v2 ไว้ขับเคลื่อน Gemini เอง",
      "macro": false,
      "sourceName": "Yahoo Finance",
      "url": "https://finance.yahoo.com/news/live/tech-stocks-live-chip-stocks-recover-from-last-weeks-losses-on-google-amd-news-164334720.html"
    },
    {
      "id": "nw0017",
      "date": "2026-07-21",
      "title": "GM รายงานงบ Q2 เช้านี้ — ตลาดคาดกำไรโต 22% จับตากระบะ, รายได้ software และภาระ tariff",
      "summary": "General Motors รายงานผลประกอบการ Q2 ก่อนตลาดเปิดวันนี้ (21 ก.ค.) ตลาดคาด EPS ราว $3.11-3.13 โตราว 22-23% จากปีก่อน บนรายได้ราว $46-47 พันล้านดอลลาร์ โดย GM ชนะคาดการณ์มา 4 ไตรมาสติด จุดที่ต้องดู: margin ในอเมริกาเหนือท่ามกลางยอดขายรถที่หด 4.2%, ความแข็งแรงของกระบะ GMC Sierra, รายได้ digital/software ที่โต 20%, และต้นทุน tariff ทั้งปีที่ลดเหลือ $2.5-3.5 พันล้านหลังคำตัดสิน Supreme Court",
      "macro": false,
      "sourceName": "TradingKey",
      "url": "https://www.tradingkey.com/analysis/stocks/us-stocks/262041142-general-motors-gm-q2-2026-earnings-preview-july-21-trucks-software-tradingkey"
    },
    {
      "id": "nw0018",
      "date": "2026-07-21",
      "title": "Alphabet-Tesla รายงานงบพุธนี้ บททดสอบว่าเงิน AI คืนกำไรจริงไหม — Tesla โดน Wells Fargo ให้เป้าแค่ $130",
      "summary": "Alphabet และ Tesla จะรายงานผลประกอบการหลังปิดตลาดวันพุธนี้ (22 ก.ค.) ตลาดจับตาเป็นพิเศษว่าการลงทุน AI มหาศาลเริ่มสะท้อนกลับมาเป็นรายได้หรือยัง ฝั่ง IBM คาด EPS ราว $3.02 (+8%) บนรายได้ราว $17.85 พันล้าน ส่วน Tesla ที่ราคาหุ้นย่อมาแล้วเกือบ 22% จากจุดสูงสุดในรอบปี โดนนักวิเคราะห์ Wells Fargo มองลบหนัก ให้เป้า 12 เดือนที่ $130 จากราคาปัจจุบันราว $382 อ้างแรงกดดัน margin ต่อคันที่ลดลง",
      "macro": false,
      "sourceName": "FX Leaders",
      "url": "https://www.fxleaders.com/news/2026/07/20/tesla-tsla-and-alphabet-googl-earnings-expected-to-lift-market-this-week/"
    },
    {
      "id": "nw0019",
      "date": "2026-07-21",
      "title": "หุ้นเด่น-หุ้นดับวันจันทร์: Teradyne +8.4% แรงสุดใน S&P 500, Chipotle ร่วงต่อจากเหตุ outbreak",
      "summary": "Teradyne พุ่ง 8.4% ขึ้นแท่นหุ้นแรงสุดใน S&P 500 ดัน YTD (ตั้งแต่ต้นปี) เป็น +80.5% ตามด้วย Honeywell +7.5% ฝั่งขาลง Intuit ลบ 3.4% ตอกย้ำปีที่เลวร้าย (-57.5% YTD), Chipotle ร่วง 4.1% มูลค่าหายราว $1.84 พันล้านจากเหตุ outbreak (การระบาดเชื้อในร้านอาหาร) และ Enphase ลบ 4.1% หลัง TD Cowen หั่นเป้าจาก $70 เหลือ $48 ด้าน bond yield 10 ปีขยับขึ้นแตะ 4.60% สะท้อนความกังวลเงินเฟ้อจากน้ำมัน",
      "macro": false,
      "sourceName": "TS2 Tech",
      "url": "https://ts2.tech/en/stock-market-today-20-07-2026/"
    },
    {
      "id": "nw0020",
      "date": "2026-07-21",
      "title": "Archer จับมือ Anduril เปิดตัวโดรนโจมตี \"Thunder\" ที่งาน Farnborough — หุ้นพุ่งเกือบ 20%",
      "summary": "Archer Aviation กับ Anduril เปิดตัวแพลตฟอร์ม VTOL (อากาศยานขึ้นลงแนวดิ่ง) แบบ hybrid-electric ที่พัฒนาร่วมกันมาเกือบ 2 ปี ในงาน Farnborough Airshow โดยรุ่น defense ชื่อ Thunder เป็นอากาศยานโจมตีไร้คนขับ Group 5 ออกแบบให้บินเคียงเฮลิคอปเตอร์โจมตีอย่าง Apache หุ้น ACHR ทะยานเกือบ 20% รับข่าว แผนถัดไป: บินจริงครั้งแรกปี 2027 และจะประกาศลูกค้าฝั่ง commercial รายแรกภายในสัปดาห์นี้",
      "macro": false,
      "sourceName": "Yahoo Finance",
      "url": "https://finance.yahoo.com/markets/stocks/articles/archer-aviation-stock-rises-anduril-123147999.html"
    }
  ],
  "portfolioReviews": []
};
window.INVESTMENT_UPDATED = "21/07/2026";

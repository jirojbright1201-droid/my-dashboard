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
      "url": "https://www.aljazeera.com/news/liveblog/2026/7/19/iran-war-live-us-launches-new-strikes-trump-mourns-killed-soldiers",
      "image": "https://www.aljazeera.com/wp-content/uploads/2026/07/AFP__20260718__C2JR9DW__v1__HighRes__IranUsIsraelWar-1784440612.jpg?resize=730%2C410&quality=80",
      "topic": "oil"
    },
    {
      "id": "nw0002",
      "date": "2026-07-20",
      "title": "น้ำมันขึ้นยกแผง หลังอิหร่านถล่มโรงไฟฟ้า-โรงกลั่นน้ำในคูเวตซ้ำเป็นรอบสอง",
      "summary": "Brent และ WTI บวกแรงราว 3-4% ในรอบสัปดาห์ หลังคูเวตออกมาแฉว่าโรงไฟฟ้าและโรงกลั่นน้ำโดนอิหร่านถล่มซ้ำเป็นครั้งที่ 2 ภายในสองวัน ตลาดเริ่มหวั่นว่าไฟสงครามจะลามมาปิดเส้นทางขนน้ำมันผ่าน Strait of Hormuz ซึ่งแบกรับซัพพลายน้ำมันโลกอยู่ราว 20%",
      "macro": true,
      "sourceName": "CNBC",
      "url": "https://www.cnbc.com/2026/07/17/oil-price-today-brent-wti.html",
      "image": "",
      "topic": "oil"
    },
    {
      "id": "nw0003",
      "date": "2026-07-20",
      "title": "ทองคำยังยืนเหนือ 4,000 ดอลลาร์ได้ ทั้งที่ Fed ส่งสัญญาณแข็งกร้าว",
      "summary": "แม้ Fed จะยังยืนกรานท่าที hawkish (เอียงไปทางคุมเข้มดอกเบี้ย) และส่งสัญญาณคงดอกเบี้ยสูงยาว (higher-for-longer) ซึ่งปกติจะกดทองคำผ่าน real yield ที่พุ่งและดอลลาร์ที่แข็ง แต่ราคาทองก็ยังหยัดอยู่เหนือแนวรับ 4,000 ดอลลาร์ได้ เพราะแรงหนุนจากความเสี่ยงสงครามในตะวันออกกลางเข้ามาช่วยพยุงไว้พอดี",
      "macro": true,
      "sourceName": "FX Leaders",
      "url": "https://www.fxleaders.com/news/2026/07/19/gold-price-forecast-positive-signals-as-xau-usd-holds-above-4000-despite-hawkish-fed-and-strait-of-hormuz-tensions/",
      "image": "",
      "topic": "gold"
    },
    {
      "id": "nw0004",
      "date": "2026-07-20",
      "title": "ดอลลาร์อ่อนแรงต่อ หลังเงินเฟ้อสหรัฐฯ ชะลอกว่าที่คิด",
      "summary": "ดัชนีดอลลาร์ (DXY) โดนเทขายหลังทำแท่งเทียนกลับตัวขาลง (bearish engulfing) เมื่อสัปดาห์ก่อน สาเหตุหลักมาจากตัวเลข CPI และ PPI ที่ออกมาต่ำกว่าคาด ทำให้ตลาดเริ่มมองว่า Fed ไม่จำเป็นต้องรีบขึ้นดอกเบี้ยเร็วๆ นี้ นักวิเคราะห์เชื่อดอลลาร์มีลุ้นอ่อนค่าต่ออีก โดยเฉพาะเมื่อเทียบกับเยนญี่ปุ่น",
      "macro": true,
      "sourceName": "DailyForex",
      "url": "https://www.dailyforex.com/forex-technical-analysis/2026/07/weekly-forex-forecast-20th-to-24th-july-2026/247749",
      "image": "",
      "topic": "fx"
    },
    {
      "id": "nw0005",
      "date": "2026-07-20",
      "title": "ลุ้นกันทั้งตลาด Fed จะขึ้นดอกเบี้ยปลายเดือนนี้ไหม หลังเงินเฟ้อยังไม่ลงง่ายๆ",
      "summary": "ก่อนประชุม FOMC วันที่ 28-29 กรกฎาคมนี้ เริ่มมีเสียงเก็งว่า Fed อาจขึ้นดอกเบี้ย 0.25% หลัง Christopher Waller ผู้ว่าการ Fed ส่งสัญญาณชัดว่าโฟกัสของธนาคารกลางเปลี่ยนจากเรื่องตลาดแรงงานมาเป็นการเบรกเงินเฟ้อที่คาดจะขยับแตะ 3.6% ในปีนี้แทน ล่าสุดข้อมูลจาก CME FedWatch ให้โอกาสขึ้นดอกเบี้ยรอบนี้ไว้ที่ราว 46.5%",
      "macro": true,
      "sourceName": "CNBC",
      "url": "https://www.cnbc.com/2026/07/13/-a-july-rate-hike-from-the-fed-the-odds-are-rising.html",
      "image": "",
      "topic": "fed"
    },
    {
      "id": "nw0006",
      "date": "2026-07-20",
      "title": "จีนโตพลาดเป้า ไตรมาส 2 ขยายตัวแค่ 4.3%",
      "summary": "เศรษฐกิจจีนไตรมาส 2 ปี 2026 โตแค่ 4.3% เทียบปีก่อน หลุดกรอบเป้าหมายทางการที่วางไว้ 4.5-5% และต่ำกว่าที่นักเศรษฐศาสตร์คาดไว้ด้วย ตัวฉุดหลักคือการลงทุนในสินทรัพย์ถาวรภาคเมืองที่หดตัวเกินคาดถึง 5.7% แม้ยอดค้าปลีกกับส่งออกจะยังพอประคองได้บ้าง แรงกดดันแบบนี้ทำให้ผู้กำหนดนโยบายต้องเร่งอัดเม็ดเงินภาครัฐเพิ่ม",
      "macro": true,
      "sourceName": "CNBC",
      "url": "https://www.cnbc.com/2026/07/15/china-gdp-retail-sales-investment-june-.html",
      "image": "",
      "topic": "china"
    },
    {
      "id": "nw0007",
      "date": "2026-07-20",
      "title": "หุ้นสหรัฐฯ ปิดสัปดาห์แดงทั้งกระดาน กลุ่มชิปโดนหนักสุด",
      "summary": "ดัชนีหลักทั้ง 3 ตัวปิดสัปดาห์ที่แล้วร่วงพร้อมกัน S&P 500 ลบ 1.6% Nasdaq Composite ร่วงแรง 2.9% ส่วน Dow Jones ลบ 0.9% โดยตัวฉุดหลักคือกลุ่มเซมิคอนดักเตอร์ที่โดนเทขายหนัก สัปดาห์นี้ต้องจับตาผลประกอบการจาก Tesla, Alphabet และ Intel ว่าจะพลิกบรรยากาศตลาดได้หรือไม่",
      "macro": true,
      "sourceName": "CNBC",
      "url": "https://www.cnbc.com/2026/07/17/stock-market-next-week-outlook-for-july-20-24-2026.html",
      "image": "",
      "topic": "market"
    },
    {
      "id": "nw0008",
      "date": "2026-07-20",
      "title": "Netflix กำไรเข้าเป้า แต่หุ้นดันร่วง 9% เพราะนักลงทุนไม่ชอบใจเรื่อง engagement",
      "summary": "รายได้ไตรมาส 2 ของ Netflix ออกมาตรงเป้าที่ 1.256 หมื่นล้านดอลลาร์ กำไรต่อหุ้นก็ดีกว่าคาดนิดหน่อยที่ 0.80 ดอลลาร์ แต่หุ้นกลับเทขายแรงถึง 9% เพราะนักลงทุนตีความว่าบริษัทกำลัง \"ปิดบังอะไรบางอย่าง\" หลังประกาศลดความถี่รายงานข้อมูล engagement (การมีส่วนร่วมของผู้ชม) เหลือปีละครั้ง ซ้ำด้วยชั่วโมงรับชมที่โตแค่ 2% ตามหลังจำนวนสมาชิกใหม่ และ guidance ไตรมาส 3 ที่หย่อนกว่าที่ Wall Street คาดไว้เล็กน้อย",
      "macro": false,
      "sourceName": "The Motley Fool",
      "url": "https://www.fool.com/investing/2026/07/17/netflix-beat-estimates-but-the-stock-dropped/",
      "image": "https://g.foolcdn.com/editorial/images/879427/nflx-netflix-logo-red.png",
      "topic": ""
    },
    {
      "id": "nw0009",
      "date": "2026-07-20",
      "title": "IBM ร่วงหนักสุดในรอบ 115 ปี หลังลูกค้าทิ้งซอฟต์แวร์ไปซื้อชิปแทน",
      "summary": "หุ้น IBM ดิ่งทีเดียว 25.2% ในวันเดียว แรงที่สุดเท่าที่บริษัทเคยเจอมา เงินหายไปจากมูลค่าตลาดกว่า 6.7 หมื่นล้านดอลลาร์ Arvind Krishna ซีอีโอออกมายอมรับว่าลูกค้าองค์กรพากันเทงบไปกว้านซื้อฮาร์ดแวร์อย่างเซิร์ฟเวอร์และหน่วยความจำแทน เพราะกลัวราคาชิปหน่วยความจำที่พุ่งขึ้นไปแล้วกว่า 100% ผลคือธุรกิจซอฟต์แวร์และที่ปรึกษาซึ่งเป็นเส้นเลือดใหญ่ของ IBM โตช้ากว่าที่ใครคาดไว้มาก",
      "macro": false,
      "sourceName": "Forbes",
      "url": "https://www.forbes.com/sites/petercohan/2026/07/15/ibm-stock-loses-67-billion--causes-and-recovery-outlook/",
      "image": "https://imageio.forbes.com/specials-images/imageserve/6a570a74dc6278cfd45a6ba7/CHINA-US-COMPUTERS-IBM/0x0.jpg?width=960",
      "topic": "chips"
    },
    {
      "id": "nw0010",
      "date": "2026-07-20",
      "title": "หุ้นชิปหลุดเข้าตลาดหมี หลัง AI จีน Kimi K3 จาก Moonshot มาป่วนวงการ",
      "summary": "Philadelphia Semiconductor Index ร่วงจนเข้าเกณฑ์ bear market (ตลาดหมี) ทรุดกว่า 20% จากจุดสูงสุดเมื่อเดือนมิถุนายน ต้นเหตุคือสตาร์ทอัพจีน Moonshot ปล่อยโมเดล Kimi K3 ขนาด 2.8 ล้านล้านพารามิเตอร์ออกมาแรง เก่งเทียบเท่าหรือดีกว่าโมเดลชั้นนำของสหรัฐฯ หลายตัว คนในตลาดรีบเทียบกับเหตุการณ์ DeepSeek shock เมื่อปีก่อนทันที พร้อมเริ่มตั้งคำถามว่าเงินมหาศาลที่ทุ่มไปกับ AI capex ของบริษัทเทคฯ สหรัฐฯ ยังคุ้มอยู่จริงไหม ด้าน TSMC โดนหางเลขร่วงไป 7% ทั้งที่กำไรรายไตรมาสเพิ่งพุ่งขึ้น 77%",
      "macro": false,
      "sourceName": "Fortune",
      "url": "https://fortune.com/2026/07/17/china-moonshot-kimi-k3-markets-china-ai/",
      "image": "https://fortune.com/img-assets/wp-content/uploads/2026/07/GettyImages-2285809054.jpg?format=webp&w=1440&q=100",
      "topic": "chips"
    },
    {
      "id": "nw0011",
      "date": "2026-07-21",
      "title": "หุ้นสหรัฐฯ ปิดลบเบาๆ Dow -0.6% ตลาดชั่งใจระหว่างสงครามอิหร่านกับสัปดาห์ผลประกอบการ Big Tech",
      "summary": "วันจันทร์ Dow Jones ลดลงราว 0.6% S&P 500 ลบราว 0.2% ส่วน Nasdaq ปิดแทบไม่เปลี่ยนแปลง นักลงทุนเล่นเกมรอก่อนสัปดาห์ผลประกอบการชุดใหญ่ (Alphabet, Tesla, Intel, IBM) ที่ตลาดอยากเห็นหลักฐานว่าเงินลงทุน AI เริ่มแปลงเป็นกำไรจริง ขณะเดียวกันราคาน้ำมันที่ขยับขึ้นระหว่างวันจากการโจมตีตอบโต้กันระหว่างสหรัฐฯ-อิหร่านยังกดบรรยากาศ หลัง Trump ประกาศว่าอิหร่าน \"จะต้องชดใช้\"",
      "macro": true,
      "sourceName": "Yahoo Finance",
      "url": "https://finance.yahoo.com/markets/live/stock-market-today-monday-july-20-dow-sp-500-nasdaq-111429441.html",
      "image": "",
      "topic": "market"
    },
    {
      "id": "nw0012",
      "date": "2026-07-21",
      "title": "Brent ทะลุ $90 สูงสุดตั้งแต่กลางมิถุนายน อิหร่านสกัดเรือใน Hormuz ซ้ำถล่มโรงน้ำมันคูเวต",
      "summary": "Brent พุ่งเกือบ 4% ขึ้นไปแตะราว $90-91 ต่อบาร์เรล สูงสุดนับตั้งแต่กลางมิถุนายน ก่อนย่อลงมาเล็กน้อย ส่วน WTI ยืนเหนือ $84 หลังกองทัพเรืออิหร่านสกัด \"เรือไม่ระบุสัญชาติ 4 ลำ\" ที่พยายามผ่าน Strait of Hormuz และโรงงานน้ำมันของ Kuwait Petroleum โดนโจมตีเสียหายหนักเมื่อวันเสาร์ นับจากจุดต่ำต้นเดือนราคาน้ำมันบวกมาแล้วราว 30% ตลาดยังแกว่งแรงตามข่าวสงครามสลับข่าวความพยายามหยุดยิง",
      "macro": true,
      "sourceName": "Energy Connects",
      "url": "https://www.energyconnects.com/news/oil/2026/july/brent-oil-tops-90-as-middle-east-attacks-threaten-hormuz-flows/",
      "image": "",
      "topic": "oil"
    },
    {
      "id": "nw0013",
      "date": "2026-07-21",
      "title": "ตัวกลางยื่นข้อเสนอหยุดยิง 10 วัน หวังฟื้นข้อตกลงชั่วคราวสหรัฐฯ-อิหร่าน",
      "summary": "เจ้าหน้าที่อาวุโสอิหร่านเผยกับ Reuters ว่าตัวกลางส่งข้อเสนอหยุดยิง 10 วันให้เตหะราน เพื่อเปิดทางฟื้น interim deal (ข้อตกลงชั่วคราว) ที่เพิ่งล่มไป โฆษกกระทรวงการต่างประเทศอิหร่าน Baghaei ยืนยันว่า \"ตัวกลางกำลังทำงานเพื่อกันไม่ให้ความตึงเครียดบานปลาย\" แต่ยังไม่ชัดว่าอิหร่านจะรับข้อเสนอหรือไม่ ขณะที่สหรัฐฯ ยังเดินหน้าโจมตีต่อเนื่องเป็นวันที่ 9 ติดต่อกัน",
      "macro": true,
      "sourceName": "The Jerusalem Post",
      "url": "https://www.jpost.com/middle-east/iran-news/article-903074",
      "image": "https://images.jpost.com/image/upload/f_auto,fl_lossy/q_auto/c_fill,g_faces:center,h_720,w_1280/730658",
      "topic": ""
    },
    {
      "id": "nw0014",
      "date": "2026-07-21",
      "title": "ทองคำทรงตัวเหนือ $4,000 — safe haven จากสงคราม ชนกับแรงกด Fed คงดอกเบี้ยสูงนาน",
      "summary": "ทองคำแกว่งแถว $4,000-4,030 ต่อออนซ์ (-0.2%) แรงซื้อ safe haven (สินทรัพย์ปลอดภัย) จากสงครามสหรัฐฯ-อิหร่าน ถูกถ่วงด้วยอีกด้าน: น้ำมันแพงจุดความกังวลเงินเฟ้อ ทำให้ตลาดคาดว่า Federal Reserve จะตรึงดอกเบี้ยสูงนานขึ้น (higher-for-longer) ซึ่งปกติกดราคาทอง เดือนนี้ทองย่อแล้วราว 4.4% แต่ยังบวกราว 18% จากปีก่อน หลังเคยทำ all-time high ที่ $5,608 เมื่อมกราคม",
      "macro": true,
      "sourceName": "Trading Economics",
      "url": "https://tradingeconomics.com/commodity/gold",
      "image": "",
      "topic": "gold"
    },
    {
      "id": "nw0015",
      "date": "2026-07-21",
      "title": "สัปดาห์วัดใจ Wall Street: 70+ บริษัท S&P 500 รายงานงบ, Fed เข้า blackout ก่อนประชุม 28-29 ก.ค., ECB ตัดสินดอกเบี้ยพฤหัสนี้",
      "summary": "สัปดาห์นี้บริษัทใน S&P 500 กว่า 70 แห่งทยอยรายงานผลประกอบการ นำโดย Alphabet กับ Tesla ที่ถูกมองเป็นบททดสอบสำคัญของ AI rally หลัง Nasdaq 100 เพิ่งร่วงเกือบ 3.5% เมื่อสัปดาห์ก่อนจากแรงเทขายหุ้นชิป ฝั่งนโยบายการเงิน Fed เข้าช่วง blackout (งดให้สัมภาษณ์) ก่อนประชุม FOMC วันที่ 28-29 ก.ค. ส่วน ECB มีนัดตัดสินดอกเบี้ยวันพฤหัส ทั้งหมดเกิดขึ้นบนฉากหลังน้ำมันเหนือ $90 ที่คอยจุดความกังวลเงินเฟ้อ",
      "macro": true,
      "sourceName": "Proactive Investors",
      "url": "https://www.proactiveinvestors.com/companies/news/1095711/week-ahead-wall-street-gears-up-for-volatility-as-big-tech-earnings-kick-into-high-gear-1095711.html",
      "image": "https://cdn.proactiveinvestors.com/eyJidWNrZXQiOiJwYS1jZG4iLCJrZXkiOiJ1cGxvYWRcL05ld3NcL0ltYWdlXC8yMDI2XzA3XC8yMDIyLTEwLTI1LTEwLTQ4LTE1LWY2YmEwNGI2YjMxMGYwNjgyZmU2OTgxYmI4ZjVjYWNkXzZhNWUzNWE4MTE5NGQuanBnIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjoxMjgwLCJoZWlnaHQiOjcyMCwiZml0IjoiY292ZXIifX19",
      "topic": "market"
    },
    {
      "id": "nw0016",
      "date": "2026-07-21",
      "title": "หุ้นชิปฟื้นจากตลาดหมี — Microsoft จะติดตั้ง Helios rack ของ AMD บน Azure ท้าชน Nvidia",
      "summary": "หุ้นชิปเด้งกลับหลังสัปดาห์เลวร้าย โดย Philadelphia Semiconductor Index บวกเล็กน้อย ตัวจุดพลุคือ AMD ที่ประกาศดีลให้ Microsoft นำ Helios rack (ระบบ AI ทั้งตู้ รวม GPU MI455X + ซีพียู EPYC Venice) ไปใช้งาน inference บน Azure ถือเป็นคู่แข่งจริงจังรายแรกของระบบ NVL72 ของ Nvidia ดันหุ้น AMD ปิดบวกราว 1.6% ด้าน Google ก็มีข่าวซุ่มพัฒนาชิปใหม่ Frozen v2 ไว้ขับเคลื่อน Gemini เอง",
      "macro": false,
      "sourceName": "Yahoo Finance",
      "url": "https://finance.yahoo.com/news/live/tech-stocks-live-chip-stocks-recover-from-last-weeks-losses-on-google-amd-news-164334720.html",
      "image": "",
      "topic": "chips"
    },
    {
      "id": "nw0017",
      "date": "2026-07-21",
      "title": "GM รายงานงบ Q2 เช้านี้ — ตลาดคาดกำไรโต 22% จับตากระบะ, รายได้ software และภาระ tariff",
      "summary": "General Motors รายงานผลประกอบการ Q2 ก่อนตลาดเปิดวันนี้ (21 ก.ค.) ตลาดคาด EPS ราว $3.11-3.13 โตราว 22-23% จากปีก่อน บนรายได้ราว $46-47 พันล้านดอลลาร์ โดย GM ชนะคาดการณ์มา 4 ไตรมาสติด จุดที่ต้องดู: margin ในอเมริกาเหนือท่ามกลางยอดขายรถที่หด 4.2%, ความแข็งแรงของกระบะ GMC Sierra, รายได้ digital/software ที่โต 20%, และต้นทุน tariff ทั้งปีที่ลดเหลือ $2.5-3.5 พันล้านหลังคำตัดสิน Supreme Court",
      "macro": false,
      "sourceName": "TradingKey",
      "url": "https://www.tradingkey.com/analysis/stocks/us-stocks/262041142-general-motors-gm-q2-2026-earnings-preview-july-21-trucks-software-tradingkey",
      "image": "https://resource.tradingkey.com/uploads/20260720/GMM-1fbdf52fd5ec49af94e102eb8701d3d4.jpg",
      "topic": "auto"
    },
    {
      "id": "nw0018",
      "date": "2026-07-21",
      "title": "Alphabet-Tesla รายงานงบพุธนี้ บททดสอบว่าเงิน AI คืนกำไรจริงไหม — Tesla โดน Wells Fargo ให้เป้าแค่ $130",
      "summary": "Alphabet และ Tesla จะรายงานผลประกอบการหลังปิดตลาดวันพุธนี้ (22 ก.ค.) ตลาดจับตาเป็นพิเศษว่าการลงทุน AI มหาศาลเริ่มสะท้อนกลับมาเป็นรายได้หรือยัง ฝั่ง IBM คาด EPS ราว $3.02 (+8%) บนรายได้ราว $17.85 พันล้าน ส่วน Tesla ที่ราคาหุ้นย่อมาแล้วเกือบ 22% จากจุดสูงสุดในรอบปี โดนนักวิเคราะห์ Wells Fargo มองลบหนัก ให้เป้า 12 เดือนที่ $130 จากราคาปัจจุบันราว $382 อ้างแรงกดดัน margin ต่อคันที่ลดลง",
      "macro": false,
      "sourceName": "FX Leaders",
      "url": "https://www.fxleaders.com/news/2026/07/20/tesla-tsla-and-alphabet-googl-earnings-expected-to-lift-market-this-week/",
      "image": "",
      "topic": "bigtech"
    },
    {
      "id": "nw0019",
      "date": "2026-07-21",
      "title": "หุ้นเด่น-หุ้นดับวันจันทร์: Teradyne +8.4% แรงสุดใน S&P 500, Chipotle ร่วงต่อจากเหตุ outbreak",
      "summary": "Teradyne พุ่ง 8.4% ขึ้นแท่นหุ้นแรงสุดใน S&P 500 ดัน YTD (ตั้งแต่ต้นปี) เป็น +80.5% ตามด้วย Honeywell +7.5% ฝั่งขาลง Intuit ลบ 3.4% ตอกย้ำปีที่เลวร้าย (-57.5% YTD), Chipotle ร่วง 4.1% มูลค่าหายราว $1.84 พันล้านจากเหตุ outbreak (การระบาดเชื้อในร้านอาหาร) และ Enphase ลบ 4.1% หลัง TD Cowen หั่นเป้าจาก $70 เหลือ $48 ด้าน bond yield 10 ปีขยับขึ้นแตะ 4.60% สะท้อนความกังวลเงินเฟ้อจากน้ำมัน",
      "macro": false,
      "sourceName": "TS2 Tech",
      "url": "https://ts2.tech/en/stock-market-today-20-07-2026/",
      "image": "",
      "topic": "market"
    },
    {
      "id": "nw0020",
      "date": "2026-07-21",
      "title": "Archer จับมือ Anduril เปิดตัวโดรนโจมตี \"Thunder\" ที่งาน Farnborough — หุ้นพุ่งเกือบ 20%",
      "summary": "Archer Aviation กับ Anduril เปิดตัวแพลตฟอร์ม VTOL (อากาศยานขึ้นลงแนวดิ่ง) แบบ hybrid-electric ที่พัฒนาร่วมกันมาเกือบ 2 ปี ในงาน Farnborough Airshow โดยรุ่น defense ชื่อ Thunder เป็นอากาศยานโจมตีไร้คนขับ Group 5 ออกแบบให้บินเคียงเฮลิคอปเตอร์โจมตีอย่าง Apache หุ้น ACHR ทะยานเกือบ 20% รับข่าว แผนถัดไป: บินจริงครั้งแรกปี 2027 และจะประกาศลูกค้าฝั่ง commercial รายแรกภายในสัปดาห์นี้",
      "macro": false,
      "sourceName": "Yahoo Finance",
      "url": "https://finance.yahoo.com/markets/stocks/articles/archer-aviation-stock-rises-anduril-123147999.html",
      "image": "",
      "topic": "aerospace"
    },
    {
      "id": "nw0021",
      "date": "2026-07-22",
      "title": "สงคราม Iran-US ยืดเยื้อวันที่ 9 น้ำมันขยับขึ้นแต่ยังต่ำกว่าพีคเม.ย.-พ.ค. ทองคำแตะ $4,082",
      "summary": "สหรัฐฯ โจมตีอิหร่านต่อเนื่องเป็นวันที่ 9 หลังทรัมป์ขู่อิหร่านต้อง \"ชดใช้\" การเสียชีวิตของทหารสหรัฐฯ ขณะกลุ่มฮูตีในเยเมนขู่ปิดกั้นเส้นทางส่งออกน้ำมันซาอุดีอาระเบีย ดันราคาน้ำมันขยับขึ้น แต่ Brent ยังต่ำกว่าจุดสูงสุดช่วงเม.ย.-พ.ค.มาก สะท้อนตลาดเริ่มหาเส้นทางขนส่งทางเลือก ด้านทองคำขยับขึ้นแตะ $4,082.20 ต่อออนซ์ (+0.14%) สะท้อนความกังวลเงินเฟ้อจากความตึงเครียดในภูมิภาค",
      "macro": true,
      "sourceName": "Yahoo Finance",
      "url": "https://finance.yahoo.com/markets/live/stock-market-today-monday-july-20-dow-sp-500-nasdaq-111429441.html",
      "image": "",
      "topic": "oil"
    },
    {
      "id": "nw0022",
      "date": "2026-07-22",
      "title": "ทรัมป์ประกาศภาษี 50% สินค้าแคนาดา (ไวน์-ไม้ฮอกกี้-ซีเมนต์) อ้างเลือกปฏิบัติ มีผลใน 30 วัน กระทบ USMCA",
      "summary": "ทำเนียบขาวประกาศภาษีนำเข้า 50% กับสินค้าแคนาดาหลายรายการ อ้างมาตรา 338 ของ Tariff Act ปี 1930 ที่ไม่เคยใช้จริงมาก่อน หลังศาลสูงสุดสหรัฐฯ เคยท้าทายคำสั่งภาษีชุดก่อน โดยกล่าวหาแคนาดาเลือกปฏิบัติกับสินค้าเหล้า รถยนต์ และนมสหรัฐฯ ที่สำคัญคือครอบคลุมสินค้าที่เคยได้รับการคุ้มครองภายใต้ USMCA ด้วย นายกฯ แคนาดา Mark Carney เรียกมาตรการนี้ว่าละเมิด USMCA โดยตรง แต่พร้อมเจรจาต่อ",
      "macro": true,
      "sourceName": "Al Jazeera",
      "url": "https://www.aljazeera.com/news/2026/7/21/trump-imposes-50-us-tariffs-on-some-canadian-goods-citing-discrimination",
      "image": "https://www.aljazeera.com/wp-content/uploads/2026/05/reuters_6a0b93ea-1779143658.jpg?resize=770%2C513&quality=80",
      "topic": ""
    },
    {
      "id": "nw0023",
      "date": "2026-07-22",
      "title": "3M ทุบคาด Q2 กำไรต่อหุ้นปรับ $2.40 โต 11% ยอดขาย organic +5.4% ปรับเพิ่ม guidance ทั้งปี",
      "summary": "3M รายงานกำไรต่อหุ้นปรับปรุงไตรมาส 2 ที่ $2.40 โต 11% เทียบปีก่อน ยอดขาย organic (ยอดขายจากธุรกิจเดิมไม่รวมซื้อ-ขายกิจการ) โต 5.4% margin ขยับขึ้น 40 basis point เป็น 24.9% ซีอีโอ William Brown ระบุไตรมาสนี้แข็งแกร่งทั้งยอดขายและกำไร บริษัทปรับเพิ่มเป้ากำไรต่อหุ้นทั้งปี 2026 เป็น $8.80-8.95 จากเดิม $8.50-8.70 พร้อมขยายความร่วมมือกับ Microsoft ด้าน AI data center และ Airbus ด้านฉนวนกันความร้อน",
      "macro": false,
      "sourceName": "3M (PR Newswire)",
      "url": "https://www.prnewswire.com/news-releases/3m-reports-second-quarter-2026-results-increases-full-year-guidance-302830119.html",
      "image": "",
      "topic": "auto"
    },
    {
      "id": "nw0024",
      "date": "2026-07-22",
      "title": "GM ชนะคาด Q2 ชัดเจน กำไรต่อหุ้น $3.57 โต 41% รายได้ $48 พันล้าน ปรับเพิ่ม guidance ทั้งปี",
      "summary": "General Motors รายงานกำไรต่อหุ้นปรับปรุงไตรมาส 2 ที่ $3.57 สูงกว่าคาดการณ์ $3.13 ถึง 14% รายได้ $48.03 พันล้านดอลลาร์ เกินคาด 3.15% หนุนจากการตั้งราคาที่แข็งแกร่งและต้นทุน tariff ที่ลดลง โดยเฉพาะโซนอเมริกาเหนือที่ EBIT (กำไรก่อนหักดอกเบี้ยและภาษี) พุ่ง 42.7% บริษัทปรับเพิ่มเป้า EBIT ทั้งปีเป็น $14-16 พันล้าน และกำไรต่อหุ้นเป็น $12-14 จากเดิม $11.50-13.50",
      "macro": false,
      "sourceName": "Yahoo Finance",
      "url": "https://finance.yahoo.com/markets/stocks/articles/gm-q2-earnings-beat-pricing-142400631.html",
      "image": "",
      "topic": "auto"
    },
    {
      "id": "nw0025",
      "date": "2026-07-22",
      "title": "Alphabet-Tesla รายงานงบวันนี้หลังปิดตลาด บททดสอบใหญ่ว่าเงินลงทุน AI มหาศาลคุ้มค่าจริงไหม",
      "summary": "Alphabet และ Tesla รายงานผลประกอบการ Q2 หลังปิดตลาดวันนี้ (22 ก.ค.) พร้อมกัน โดย Alphabet เพิ่งประกาศขายหุ้นเพื่อระดมทุนสร้างศูนย์ข้อมูล AI ทำให้นักลงทุนแบ่งความเห็น ด้าน Gemini chatbot ได้รับการตอบรับดีแต่มีรายงานว่ารุ่น Gemini 3.5 Pro อาจล่าช้า ฝั่ง Tesla ซีอีโอเดินหน้าปรับทิศทางบริษัทไปทาง AI และหุ่นยนต์ พร้อมเพิ่มงบลงทุนเป็น 3 เท่า แม้ไตรมาสก่อนหน้ายอดส่งมอบจะดีกว่าคาด",
      "macro": false,
      "sourceName": "Yahoo Finance",
      "url": "https://finance.yahoo.com/markets/stocks/articles/expect-markets-week-alphabet-tesla-110000980.html",
      "image": "https://s.yimg.com/lo/mysterio/api/88B51671875FA42BE067FD0B977BA7ABE5175DFCF4AFB479778F29F755ECC57E/subgraphmysterio/resizefit_w960;quality_80;format_webp/https:%2F%2Fmedia.zenfs.com%2Fen%2Finvestopedia_245%2Fb32020082c07d42840c7f4164471fbcc",
      "topic": "bigtech"
    },
    {
      "id": "nw0026",
      "date": "2026-07-22",
      "title": "Jamie Dimon เตือนตลาดประเมินความเสี่ยงต่ำไป ส่วนตัวไม่ซื้อทั้งหุ้นและพันธบัตรระยะยาวตอนนี้",
      "summary": "ซีอีโอ JPMorgan Chase Jamie Dimon กล่าวว่าจะไม่ซื้อพันธบัตรรัฐบาลสหรัฐฯ ระยะยาวหรือดัชนี S&P 500 ในราคาปัจจุบัน โดยมอง yield (อัตราผลตอบแทน) พันธบัตร 10 ปีที่เหมาะสมควรอยู่ราว 4-4.5% เขาอ้างเหตุผลจากความขัดแย้งในยูเครนและตะวันออกกลาง ความตึงเครียดสหรัฐฯ-จีน งบประมาณรัฐบาลที่ขยายตัว และเงินเฟ้อที่สูงเหนือ 3% มานานเกือบ 5 ปี แม้จะไม่ได้มองว่าทุกบริษัทแพงเกินไป แต่เลือกเจาะจงหุ้นรายตัวมากกว่าซื้อทั้งดัชนี",
      "macro": false,
      "sourceName": "Yahoo Finance",
      "url": "https://finance.yahoo.com/markets/stocks/articles/jamie-dimon-warns-market-risks-112521178.html",
      "image": "https://s.yimg.com/lo/mysterio/api/B399772A03959F3DA7DF7C9519FDD2BF60EC5A59544BE0112C455AE788837013/subgraphmysterio/resizefit_w960_h540;quality_80;format_webp/https:%2F%2Fmedia.zenfs.com%2Fen%2Fquartz_855%2Fbd0c2b7a473a24fc4ac9f881179315fd",
      "topic": "market"
    },
    {
      "id": "nw0027",
      "date": "2026-07-22",
      "title": "Intel เตรียมรายงานงบ Q2 พรุ่งนี้ ตลาดคาดพลิกกำไร $0.10 ต่อหุ้น จากขาดทุนปีก่อน หุ้นพุ่ง 456% ในรอบปี",
      "summary": "Intel จะรายงานผลประกอบการ Q2 2026 หลังปิดตลาดวันพรุ่งนี้ (23 ก.ค.) ตลาดคาดกำไรต่อหุ้น $0.10 พลิกจากขาดทุน $0.26 ในไตรมาสเดียวกันปีก่อน บริษัททำได้ดีกว่าคาดการณ์ของ Wall Street มาแล้ว 3 ใน 4 ไตรมาสล่าสุด หุ้น Intel พุ่งขึ้น 455.9% ในรอบ 52 สัปดาห์ ทิ้งห่าง S&P 500 ที่ +20.7% และ ETF กลุ่มเซมิคอนดักเตอร์ที่ +132.6% นักวิเคราะห์ 46 รายให้เรตติ้งเฉลี่ย Moderate Buy ราคาเป้าหมายเฉลี่ย $100.31",
      "macro": false,
      "sourceName": "Yahoo Finance",
      "url": "https://finance.yahoo.com/markets/stocks/articles/earnings-preview-expect-intels-report-131017775.html",
      "image": "https://s.yimg.com/lo/mysterio/api/4FF323C0DCA004913E987FEB8EA0BDE1E13FD4AE3C22E6B70515BDADCCEBBEC2/subgraphmysterio/resizefit_w960;quality_80;format_webp/https:%2F%2Fmedia.zenfs.com%2Fen%2Fbarchart_com_477%2Fe1ba282fa6bef4759ec1fdc0d4620664",
      "topic": "chips"
    },
    {
      "id": "nw0028",
      "date": "2026-07-22",
      "title": "AMD เปิดงาน Advancing AI 2026 วันนี้ที่ซานฟรานซิสโก จ่อเปิดตัวชิป MI450 และแร็ค Helios เต็มรูปแบบ",
      "summary": "AMD เริ่มงาน Advancing AI 2026 งาน AI ประจำปีที่ Moscone Center ซานฟรานซิสโก วันที่ 22-23 ก.ค. โดยซีอีโอ Lisa Su จะขึ้นคีย์โน้ตเช้าวันที่สอง ตลาดคาดเปิดตัวตัวอย่างการใช้งานจริงของแร็ค Helios ผ่านพันธมิตร HPE และ Oracle รวมถึงชิป MI450 (โค้ดเนม Altair) ที่ Oracle ประกาศแล้วว่าจะนำไปใช้ใน cloud ของตัวเอง (OCI) พร้อมโชว์ความร่วมมือกับ Anthropic, OpenAI และชุมชนโอเพนซอร์สอย่าง Hugging Face และ PyTorch",
      "macro": false,
      "sourceName": "IT Pro",
      "url": "https://www.itpro.com/infrastructure/what-to-expect-at-amd-advancing-ai-2026",
      "image": "https://cdn.mos.cms.futurecdn.net/kLnviFBTMkqbE45gfRYfkY.jpg",
      "topic": "chips"
    }
  ],
  "portfolioReviews": [
    {
      "id": "pr0001",
      "date": "2026-07-22",
      "holdingsRaw": "หุ้นสหรัฐฯ: AEHR (Aehr Test Systems) 0.4779970 หุ้น ต้นทุนเฉลี่ย 65.90 USD/หุ้น ต้นทุนรวม 31.50 USD มูลค่าปัจจุบัน 47.28 USD (≈1,591.40 THB ที่ 1 USD = 33.66 THB) กำไรลอยตัว +50.09% (+15.78 USD), ราคาหุ้นวันนี้ +27.86%; เงินสด 500 THB (ระบุว่าเก็บไว้รอซื้อหุ้นเพิ่ม); ทองคำ 1,000 THB (ระบุว่าเป็นเงินสำรองฉุกเฉิน ไม่ใช่เงินลงทุน)",
      "snapshot": "พอร์ตนี้มีมูลค่ารวมประมาณ 3,091 บาท (ราว 92 ดอลลาร์สหรัฐฯ) แบ่งเป็นหุ้นสหรัฐฯ 51.5%, ทองคำ 32.3% และเงินสด 16.2% ฝั่งหุ้นสหรัฐฯ มีสินทรัพย์เดียวคือ AEHR (Aehr Test Systems) ถือ 0.478 หุ้น ต้นทุนเฉลี่ย 65.90 ดอลลาร์/หุ้น กำไรลอยตัวปัจจุบัน +50.09% (+15.78 ดอลลาร์) หลังราคาพุ่ง 27.86% ในวันเดียวจากข่าวผลประกอบการ jiroj ระบุว่าทองคำ 32.3% คือเงินสำรองฉุกเฉิน (ไม่ใช่เงินลงทุนเพื่อการเติบโต) ส่วนเงินสด 16.2% คือเงินรอจังหวะซื้อหุ้นเพิ่ม (dry powder) ดังนั้นสัดส่วนที่ตั้งใจเป็น \"เงินลงทุนจริง\" คือ AEHR บวกเงินสดที่รอเข้า รวมราว 67.7% ของพอร์ต ส่วนทองคำแยกไว้เป็นกันชนฉุกเฉินต่างหาก ไม่นับรวมในความเสี่ยงด้านการลงทุน",
      "allocation": [
        {"label": "AEHR (หุ้นสหรัฐฯ)", "pct": 51.5},
        {"label": "ทองคำ", "pct": 32.3},
        {"label": "เงินสด", "pct": 16.2}
      ],
      "macroLens": [
        {"label": "ดอกเบี้ย/Fed", "note": "Fed คงดอกเบี้ยที่ 3.50-3.75% มาตั้งแต่กลางปี ตลาดให้น้ำหนักราว 25-46% ว่าอาจขึ้นดอกเบี้ยอีกครั้งในการประชุม 28-29 ก.ค. นี้ หลังผู้ว่าการ Fed Christopher Waller ส่งสัญญาณว่าโฟกัสเปลี่ยนจากตลาดแรงงานมาเป็นการคุมเงินเฟ้อแทน วงจรผ่อนคลายดอกเบี้ยที่ตลาดเคยคาดจึงยังไม่ชัดเจน"},
        {"label": "เงินเฟ้อ", "note": "CPI เดือนมิ.ย. (ประกาศ 14 ก.ค.) ออกมาที่ 3.5% YoY ต่ำกว่าคาด (3.8%) จากราคาพลังงานที่ร่วงแรง core CPI ทรงตัวที่ 2.6% เย็นลงกว่าที่กลัว แต่ยังสูงกว่ากรอบเป้าหมาย 2% ของ Fed มาก ทิศทางดอกเบี้ยจึงยังแกว่งได้ทั้งสองทาง"},
        {"label": "Equity leadership", "note": "ตลาดหุ้นสหรัฐฯ กำลังหมุนออกจากกลุ่ม Magnificent 7/เทคโนโลยีขนาดใหญ่ ไปสู่ small-cap, การเงิน, healthcare, อุตสาหกรรม และพลังงาน ขณะที่หุ้นเซมิคอนดักเตอร์บางส่วนเพิ่งหลุดเข้าตลาดหมีเมื่อสัปดาห์ก่อนจากแรงกดดันคู่แข่ง AI จีน (Moonshot Kimi K3) ก่อนจะเริ่มเด้งกลับ AEHR เป็น small-cap semiconductor equipment จึงอยู่ตรงกลางกระแสนี้พอดี — ได้อานิสงส์จาก small-cap แต่เสี่ยงตามความอ่อนไหวของกลุ่มชิป"},
        {"label": "ทองคำ", "note": "เทรดอยู่ราว 4,000-4,080 ดอลลาร์/ออนซ์ ลดลงจากจุดสูงสุดตลอดกาลเดือนม.ค.ที่ 5,595-5,608 ดอลลาร์ ราว 27-28% จากแรงกดดันของ yield พันธบัตรที่สูงขึ้นและดอลลาร์ที่แข็งค่า อยู่ในช่วง sideways consolidation ที่แนวรับ ~3,950-4,000 แต่มีแรงหนุนจากความเสี่ยงสงครามตะวันออกกลาง มุมมองระยะยาวยังเป็นบวก (บางสำนักคาดถึง 6,300 ดอลลาร์ ปลายปี 2026)"},
        {"label": "Geopolitics", "note": "สงครามสหรัฐฯ-อิหร่านยืดเยื้อเข้าสัปดาห์ที่สอง กดดันราคาน้ำมันและหนุนแรงซื้อทองคำในฐานะ safe haven ต่อเนื่อง ขณะเดียวกันทรัมป์เพิ่งประกาศภาษี 50% กับสินค้าแคนาดา เพิ่มความไม่แน่นอนด้านการค้าอีกชั้น ทั้งสองปัจจัยเพิ่มความผันผวนให้ตลาดโดยรวมในระยะสั้น"}
      ],
      "positives": [
        {"label": "จับจังหวะโมเมนตัมได้ตรง", "note": "การถือ AEHR มาก่อนหน้าทำให้รับรู้กำไรเต็มๆ จากผลประกอบการ Q4 ที่รายได้โต 33% ยอดจองพุ่งเป็นสถิติ และ guidance ปีงบ 2027 โตแรงถึง 160-200% เป็นตัวอย่างของการถือหุ้นที่มี catalyst (ตัวเร่งราคา) ชัดเจนรออยู่จริง"},
        {"label": "แยกเงินสำรองฉุกเฉินกับเงินลงทุนชัดเจน", "note": "การกันทองคำไว้เป็น emergency fund ต่างหากจากเงินที่ตั้งใจเอาไปซื้อหุ้น เป็นวินัยทางการเงินที่ดี ทำให้ไม่เผลอเอาเงินฉุกเฉินไปเสี่ยงปนกับเงินลงทุน"},
        {"label": "มี dry powder ชัดเจน", "note": "เงินสด 16% ที่เตรียมไว้ซื้อหุ้นเพิ่มแปลว่ามีแผนต่อยอดพอร์ตอยู่แล้ว ไม่ได้ปล่อยเงินสดไว้เฉยๆ พร้อมใช้จังหวะตลาดผันผวนจากสงคราม/งบ Big Tech สัปดาห์นี้เข้าซื้อได้"}
      ],
      "concerns": [
        {"label": "Concentration risk รุนแรงในเงินลงทุนจริง", "note": "ถ้านับเฉพาะเงินที่ตั้งใจลงทุน (AEHR + เงินสดรอซื้อ) พอร์ตนี้คือหุ้นตัวเดียวเกือบ 100% เพราะ AEHR ครองสัดส่วนลงทุนจริงเกือบทั้งหมดอยู่แล้ว หากไตรมาสถัดไปทำไม่ได้ตาม guidance ที่ตั้งไว้สูงมาก (160-200% growth) แรงขายกลับจะกระทบเงินลงทุนเกือบทั้งก้อน"},
        {"label": "ซื้อหลังข่าวดีไปแล้ว (chasing momentum)", "note": "ราคาขึ้นมาแล้วกว่า 50% จากต้นทุน ตลาดน่าจะปรับมูลค่า (re-rate) รับข่าวดีไปเกือบเต็มที่แล้ว กำไรก้อนนี้จึงเปราะบางต่อแรง profit-taking หรือ \"sell the news\" ในระยะสั้น"},
        {"label": "เงินสำรองฉุกเฉินอยู่ในสินทรัพย์ผันผวน", "note": "ทองคำเพิ่งย่อลงมาราว 27-28% จากจุดสูงสุดเดือนม.ค. เงินสำรองฉุกเฉินควรเบิกใช้ได้แน่นอนเมื่อจำเป็น แต่ถ้าเหตุฉุกเฉินเกิดขึ้นตอนราคาทองกำลังย่อ มูลค่าที่เบิกได้จริงจะน้อยกว่าที่ตั้งใจ — เป็นความเสี่ยงระหว่างจุดประสงค์ (ต้องการความแน่นอน) กับเครื่องมือที่เลือกใช้ (ทองคำ=ผันผวน)"}
      ],
      "discussion": [
        "ถ้า AEHR ปรับฐานแรงจากระดับปัจจุบัน (เช่นย่อกลับไปแถว 70-80 ดอลลาร์ที่เคยอยู่ก่อนประกาศงบ) จะยังถือต่อ หรือมีจุดที่จะพิจารณาขายทำกำไรบางส่วนไว้ก่อน",
        "เงินสำรองฉุกเฉินที่ถือเป็นทองคำ ถ้าต้องเบิกใช้จริงในจังหวะที่ราคาทองย่อตัว (เช่นตอนนี้ที่ย่อจากจุดสูงสุดราว 27-28%) รับความเสี่ยงนี้ได้ไหม หรือควรมีเงินสดสำรองฉุกเฉินแยกไว้อีกส่วนที่ไม่ผันผวนตามราคาทอง",
        "เงินสด 16% ที่เตรียมซื้อหุ้นเพิ่ม มีแผนจะเพิ่มใน AEHR ตัวเดิม (ยิ่งเพิ่ม concentration ที่สูงอยู่แล้ว) หรือกระจายไปหุ้น/สินทรัพย์ตัวใหม่ที่ไม่ทับซ้อนกับ AEHR",
        "มีระดับที่จะ trim สัดส่วน AEHR ลงไหม หากราคายังวิ่งต่อจนสัดส่วนในพอร์ตพุ่งสูงกว่านี้อีก"
      ],
      "caveats": "การวิเคราะห์นี้อ้างอิงข้อมูล holdings ที่ให้มา ณ วันที่ 22 ก.ค. 2026 (มูลค่า AEHR แปลงจาก USD เป็น THB ที่อัตรา 1 USD = 33.66 บาทตามที่แสดงในแอป) รวมถึงเจตนาการใช้เงินที่ jiroj ระบุเพิ่มเติม (ทองคำ=เงินสำรองฉุกเฉิน, เงินสด=รอซื้อหุ้นเพิ่ม) และข้อมูล macro/ข่าวที่ค้นสด ณ วันเดียวกัน เป็นมุมมองเชิงคุณภาพเพื่อประกอบการตัดสินใจเท่านั้น ไม่ใช่คำแนะนำการลงทุนโดยตรง ไม่ได้คำนวณตัวชี้วัดเชิงปริมาณ เช่น VaR/Sharpe/beta และไม่ได้พยากรณ์ราคาล่วงหน้า"
    }
  ]
};
window.INVESTMENT_UPDATED = "22/07/2026";

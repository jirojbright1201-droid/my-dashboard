// ===== Investment Tracker — DATA (ของจริง ไม่ใช่ม็อคอัพ) =====
// เริ่มต้น 15 มิ.ย. 2026 — นับ 1 ใหม่จากเงินสดล้วน ไม่มีสถานะค้าง (log เก่าที่ซื้อๆขายๆ ทิ้งไว้เป็นบทเรียน)
// source of truth = ไฟล์นี้ที่เดียว. ราคา/ข่าว/ดัชนี ของจริง Newwy เป็นคนดึงมาเติมทีหลัง
const FX = 33; // บาท/USD โดยประมาณ — Newwy อัปเดตของจริงทีหลัง
const DATA = {
  // ฝั่งคุณ (cash/holdings/timeline/thesis/arena.you/you_s) ย้ายไป data-you.js แล้ว — Vega ไม่เห็น (app.js stitch เข้า DATA ตอนโหลด)
  // บริษัทที่ดู/watchlist — status: 'vega' (Vega ถือ), 'sold' (เคยถือแล้วขาย), 'watch' (กำลังดู)
  companies: [],
  market:{
    indices:[             // S&P/Nasdaq/Dow/VIX — Newwy ดึงของจริง (as of 16 มิ.ย. 2026 | ปรับแก้ 17 มิ.ย.)
      {n:'S&P 500', p:'7,548.60', c:-0.08, spark:[7350,7301,7372,7431,7554,7549]},
      {n:'Nasdaq Composite', p:'26,376.34', c:-1.15, spark:[25600,25450,25810,25888,26684,26376]},
      {n:'Dow Jones', p:'51,999', c:0.64, spark:[50400,50250,50900,51202,51671,51999]},
      {n:'VIX', p:'16.20', c:0.00, spark:[24.0,23.2,22.8,19.4,17.68,16.20]}
    ],
    news:[               // ข่าวตลาด morning brief — ลงวันที่จริง กระจายรายวัน (+ ธง feat สำหรับข่าวเด่นวันล่าสุด) — Newwy, verify by Jarvis 16 มิ.ย.
      {tag:'Macro', feat:true,
        head:'ตลาดชะลอรอ Fed — ประชุมนัดแรกยุค "Kevin Warsh" เริ่มวันนี้ futures บางๆ',
        sum:'FOMC เริ่มประชุม 2 วัน (16-17 มิ.ย.) นัดแรกที่ Kevin Warsh นั่งประธาน Polymarket ให้โอกาส 99% คงดอกเบี้ยที่ 3.50-3.75% ก่อนเปิดตลาด futures บางๆ: S&P 500 -0.1%, Nasdaq 100 -0.3%, Dow แทบนิ่ง หลังพุ่งแรงเมื่อวานจากดีลสหรัฐ-อิหร่าน',
        body:'หุ้นสหรัฐเข้าสู่โหมดระมัดระวังในเช้าวันอังคาร (16 มิ.ย.) หลังพุ่งแรงเมื่อวาน นักลงทุนหันความสนใจจากดีลสันติภาพสหรัฐ-อิหร่านไปที่การประชุม Federal Reserve ที่เริ่มขึ้นวันนี้และจะประกาศผลพร้อมแถลงข่าวบ่ายวันพุธ (2:30 PM ET ของ 17 มิ.ย.) ก่อนเปิดตลาด สัญญาล่วงหน้าเคลื่อนไหวบางๆ: S&P 500 futures -0.1%, Nasdaq 100 futures -0.3% ส่วน Dow futures แทบไม่ขยับ\n\nการประชุมรอบนี้เป็นนัดแรกที่ Kevin Warsh ทำหน้าที่ประธาน Fed (สาบานตน 22 พ.ค. หลังวุฒิสภาโหวตรับรอง 54-45) ตลาดแทบเป็นเอกฉันท์ว่าจะคงดอกเบี้ยไว้ที่ 3.50-3.75% — Polymarket ให้โอกาสไม่ขยับถึง 99% นักวิเคราะห์จับตาว่า Fed จะขยับท่าทีจากผ่อนคลายไปสู่จุดยืน "เป็นกลาง" หรือไม่ โดยตลาด futures เริ่มกลับมา price-in โอกาสขึ้นดอกเบี้ยช่วงปลายปีมากกว่าจะลด\n\nสิ่งที่ต้องดูคือ dot plot ชุดใหม่และสไตล์การสื่อสารของ Warsh ในแถลงข่าวครั้งแรก ท่ามกลางฉากหลังที่ checklist สัญญาณตลาดใกล้พีคของ Bank of America แตะ 70% เท่าค่าเฉลี่ยที่เคยเกิดก่อนจุดสูงสุดสำคัญ 7 ครั้งในอดีต ทำให้รอบนี้เป็นจุดชี้ทิศทางตลาดครึ่งปีหลัง',
        src:'Yahoo Finance / Kiplinger / FXStreet', date:'16 มิ.ย.'},
      {tag:'Macro',
        head:'Dow ปิดสถิติใหม่ 51,671 — รับดีลสหรัฐ-อิหร่านเปิด Strait of Hormuz',
        sum:'จันทร์ 15 มิ.ย. Dow +468.77 จุด (+0.92%) ปิดสถิติ 51,671.03, S&P 500 +1.65% ที่ 7,554.29, Nasdaq +3.07% ที่ 26,683.94 หลังทรัมป์ประกาศดีลเบื้องต้นยุติการสู้รบและเปิด Strait of Hormuz อีกครั้ง เม็ดเงินไหลกลับเข้าหุ้นเติบโต',
        src:'CNBC / TheStreet', date:'15 มิ.ย.'},
      {tag:'Semis',
        head:'ชิป AI นำตลาดวันจันทร์ — AMD +4%, NVDA/INTC +2% หนุน Nasdaq พุ่ง 3%',
        sum:'วันจันทร์ (15 มิ.ย.) หุ้นชิปนำการดีดของ Nasdaq: AMD +4%, Nvidia และ Intel +2% กว่า, Micron +8% นำกลุ่มก่อน earnings 24 มิ.ย. ราคาน้ำมันที่ร่วงกว่า 5% ช่วยคลายแรงกดดันเงินเฟ้อ ดันเงินกลับเข้าหุ้นเติบโต Lam/Marvell/Arm/ASML ต่อยอดบวกตาม AI infrastructure',
        src:'TipRanks / Yahoo Finance', date:'15 มิ.ย.'},
      {tag:'Earnings',
        head:'Fox ทุ่ม $22B ซื้อ Roku — ดีลสตรีมมิ่งครั้งใหญ่ ROKU พุ่ง FOX ร่วง',
        sum:'วันจันทร์ (15 มิ.ย.) Fox Corp ประกาศซื้อ Roku ที่ $160/หุ้น ($96 เงินสด + 0.9693 หุ้น FOX Class A) มูลค่า ~$22 พันล้าน ราคาเสนอซื้อคิดเป็นพรีเมียม 34% เทียบราคา unaffected ก่อนมีข่าวลือ (11 มิ.ย.) หรือ ~11% เหนือราคาปิดวันก่อนหน้า ผสาน Tubi กับฐานสตรีมเมอร์ 100 ล้านรายของ Roku ดันขึ้นเป็นผู้เล่นทีวีสหรัฐอันดับ 3 — ROKU บวก ~11% ในวันประกาศ (ส่วนต่างถูก price-in จากข่าวลือก่อนแล้ว), FOX ร่วง ~9.5% จากภาระหนี้และ dilution คาดปิดดีลครึ่งแรกปี 2027 ต้องผ่าน antitrust',
        src:'Fox Business / Bloomberg / SEC 8-K', date:'15 มิ.ย.'},
      {tag:'Energy',
        head:'น้ำมันร่วงต่ำสุดตั้งแต่ต้นมี.ค. — WTI หลุด $81 หลังดีลคลายความเสี่ยงซัพพลาย',
        sum:'วันจันทร์ (15 มิ.ย.) น้ำมันดิบสหรัฐปิด -4.8% ที่ $80.75/บาร์เรล, Brent -4.7% ที่ $83.17 ต่ำสุดตั้งแต่ต้นมี.ค. รับดีลสหรัฐ-อิหร่านเปิด Strait of Hormuz หุ้นกลุ่มพลังงานร่วงตาม แต่ตลาดยังตั้งคำถามว่าราคาจะลงต่อได้อีกมากแค่ไหน',
        src:'NBC News / NPR', date:'15 มิ.ย.'},
      {tag:'Crypto',
        head:'คริปโตขานรับดีลอิหร่าน — Bitcoin แตะ $66K, Ethereum ทะลุ $1,760 สูงสุดของเดือน',
        sum:'วันจันทร์ (15 มิ.ย.) สินทรัพย์เสี่ยงรวมถึงคริปโตปรับขึ้นรับดีลหยุดยิงสหรัฐ-อิหร่าน Bitcoin เปิด $65,710 (+2%) ขึ้นแตะ $66,157, Ethereum เปิด $1,724 (+2.6%) ขึ้น $1,762 — ทั้งคู่สูงสุดนับตั้งแต่ต้น มิ.ย. ความเชื่อมั่นไหลกลับเข้าสินทรัพย์เสี่ยงพร้อมหุ้นและทอง',
        src:'Yahoo Finance', date:'15 มิ.ย.'},
      {tag:'Rates',
        head:'บอนด์ยีลด์ร่วงต่ำสุดในรอบเดือน — 10 ปีหลุด 4.47% รับภูมิรัฐศาสตร์คลาย',
        sum:'อัตราผลตอบแทนพันธบัตรสหรัฐ 10 ปีลดลงสู่ ~4.47% วันจันทร์ (15 มิ.ย.) ต่ำสุดในรอบเดือน หลังดีลสหรัฐ-อิหร่านเปิด Strait of Hormuz กดราคาน้ำมันและคลายแรงกดดันเงินเฟ้อ เทรดเดอร์ลดเดิมพันการขึ้นดอกเบี้ย Fed (ยีลด์ 2 ปี -2bps ที่ 4.06%) เช้าอังคาร 16 ทรงตัวรอผลประชุม Fed',
        src:'CNBC', date:'15 มิ.ย.'}
    ],
    holdings_news:[],     // ข่าวรายตัวของหุ้นที่ถือ/Vega ถือ — Newwy
    // ===== Morning Brief (7 หัวข้อ) — Newwy เขียนทุกเช้า 08:00 / 17 มิ.ย. 2026 =====
    brief:{
      date:'17 มิ.ย. 2026',
      recap:{
        bullets:[
          'วันอังคาร (16 มิ.ย.) Dow ทำ ATH (สถิติสูงสุดตลอดกาล) ที่ ~52,000 จุด (+0.64%; ยืนยันไม่ได้ตัวเลขแน่ชัด แหล่ง: TheStreet / Honolulu Star-Advertiser) ขณะ S&P 500 ลง -0.08% ที่ 7,548.60 และ Nasdaq ร่วงหนัก -1.15% ที่ 26,376.34',
          'WTI (น้ำมันดิบสหรัฐ) ร่วง -4.3% สู่ ~$77.31/บาร์เรล หลุดแนวรับสำคัญ $78 ที่พูดถึงใน brief วาน รวม 2 วันน้ำมันหายไปเกือบ 9% จาก ~$84.5 เหตุดีลสหรัฐ-อิหร่านเปิด Strait of Hormuz',
          'SpaceX (SPCX) ยังพุ่งต่อเนื่อง ณ วันอังคาร: $201.80 (prev close $192.50) จาก IPO ที่ $135 เมื่อ 12 มิ.ย. = +49% ใน 3 วันทำการ',
          'วันนี้ (17 มิ.ย.) คือวัน D: FOMC ประกาศดอกเบี้ย 2:00 PM ET + Warsh แถลงข่าวครั้งแรก 2:30 PM ET + May Retail Sales รายงานแล้วเช้านี้ที่ +0.1% MoM (อ่อนกว่า consensus ~0.5% มาก)'
        ],
        theme:'Dow ATH กับ Nasdaq -1.15% ในวันเดียวกัน — Rotation ชัดที่สุดในรอบนี้ ก่อน Warsh แถลงชี้ขาดทิศทางครึ่งปีหลัง'
      },
      top3:[
        {what:'FOMC Decision Day — ประกาศ 2:00 PM ET + Warsh แถลงครั้งแรก 2:30 PM ET',
         interpret:'Rate hold 3.50-3.75% แน่นอน (97%+) แต่ตลาดซื้อขาย dot plot (ประมาณการดอกเบี้ยรายบุคคลของกรรมการ Fed) ซึ่งอาจแสดงการขึ้นดอกเบี้ยปลายปี CME FedWatch price-in โอกาสขึ้นดอกเบี้ยสิ้นปี 70% Warsh ส่งสัญญาณ hawkish และอาจยกเลิก dot plot ในอนาคต',
         winners:'ถ้า Warsh โทน neutral: กลุ่มชิป AI (NVDA, AMD) Nasdaq ฟื้นตัว บอนด์ยีลด์ลด',
         losers:'ถ้า Warsh hawkish ชัด / dot plot ชี้ขึ้นดอกเบี้ย: mega-cap tech valuation สูง พันธบัตรระยะยาว Nasdaq กด',
         watch:'คำว่า neutral vs restrictive ในแถลงการณ์ และ dot plot median สิ้นปี 2026 เป็นเส้นแบ่งทิศทาง',
         takeaway:'อย่าตัดสินใจ buy/sell ก่อน 3:00 PM ET วันนี้ — Warsh คือผู้กำหนดทิศทาง ไม่ใช่ rate decision'},
        {what:'WTI หลุด $78 — รวม 2 วันร่วง ~9% เปลี่ยน narrative จากเงินเฟ้อ เป็น growth scare',
         interpret:'$77.31 บนแนวรับถัดไปที่ $75 การหลุด $78 เปลี่ยนการตีความ: ราคาน้ำมันต่ำเพราะซัพพลายเพิ่มจากอิหร่าน (ดีต่อเงินเฟ้อ) หรือเพราะ demand collapse (บ่งชี้เศรษฐกิจชะลอ) May Retail Sales +0.1% อ่อนมากชี้ว่า demand ส่วนหนึ่งกำลังนิ่ม',
         winners:'สายการบิน โลจิสติกส์ ค้าปลีก ปิโตรเคมี ต้นทุนพลังงานลด',
         losers:'XOM CVX กลุ่ม E&P ทั้งหมด ยังถูกกดต่อเนื่อง',
         watch:'$75 คือแนวรับถัดไปของ WTI หลุดแล้วเสี่ยง demand narrative แย่ลง',
         takeaway:'ระดับ ~$77 ยังดีต่อ cost structure บริษัท แต่ momentum ขาลงยังแรง ยังไม่ใช่เวลาเข้า energy stocks'},
        {what:'Dow ATH vs Nasdaq -1.15% — Divergence ใหญ่สุดในรอบนี้ บ่งชี้ Rotation หรือ Distribution',
         interpret:'Dow ทำ ATH ครั้งที่ 2 ติดกัน นำโดย blue-chip/value ขณะ Nasdaq ร่วงหนักสุดในรอบนี้ pattern นี้คือ classic pre-Fed rotation แต่ถ้าต่อเนื่องหลัง Warsh แถลง คือ regime shift จาก growth-led เป็น value-led ที่กินเวลาหลายเดือน',
         winners:'Dow components: industrials, financials, healthcare — Boeing JPMorgan UnitedHealth',
         losers:'Mega-cap tech AI-play ใน Nasdaq: NVDA AMD MSFT META ที่มี high-multiple valuation',
         watch:'หลัง 2:30 PM ET ดูว่า Nasdaq ฟื้นตาม Dow (rotation ชั่วคราว) หรือยังไม่ฟื้น (regime shift)',
         takeaway:'SpaceX SPCX +49% จาก IPO หนุน Dow ผ่าน aerospace/tech หมวดอื่น — ไม่ใช่ broad market signal'}
      ],
      earnings:[
        {co:'Jabil (JBL) — รายงานวันนี้ (17 มิ.ย.) ก่อนตลาดเปิด',
         expect:'นักวิเคราะห์คาด EPS $3.10 บน revenue $8.55-8.61 พันล้าน บริษัท guidance GAAP EPS $2.36-2.76 (range กว้าง บ่งชี้ความไม่แน่นอน) ผลจริงยืนยันไม่ได้ ณ ตอนนี้',
         watch:'AI infrastructure order book และ margin trend — Jabil เป็น EMS ผู้ผลิตชิ้นส่วนให้ hyperscalers',
         beat:'สัญญาณว่า AI hardware demand ยัง robust กว่าที่ตลาดกังวล หนุน supply chain tech',
         miss:'เพิ่มความกังวล AI capex slowdown บน backdrop FOMC hawkish วันเดียวกัน'},
        {co:'FedEx (FDX) — 23 มิ.ย.',
         expect:'ตลาดรอดูปริมาณขนส่งและมาร์จิ้นสะท้อนสุขภาพ global trade หลัง Q2',
         watch:'Guidance ปีงบใหม่ + ผลกระทบ WTI $77 ที่ลดลงต่อ cost side',
         beat:'สัญญาณ global trade ยัง resilient ยืนยัน soft landing narrative',
         miss:'บ่งชี้ global trade ชะลอ กระทบ macro sentiment ภาพรวม'},
        {co:'Micron (MU) — 24 มิ.ย.',
         expect:'ตลาดรอ HBM/DRAM demand signal — หุ้นวิ่งขึ้น ~19% ใน 2 วัน (15-16 มิ.ย.) ก่อนงบ = bar สูงมาก',
         watch:'HBM + DRAM pricing guidance เป็น proxy ความต้องการ AI infrastructure',
         beat:'หนุนทั้งกลุ่มชิปและ AI ecosystem: NVDA, AMD, LRCX, AMAT',
         miss:'เสี่ยงขายทำกำไรหนักในกลุ่มชิปที่วิ่งขึ้นมามากก่อนงบ'}
      ],
      macro:{
        fed:'FOMC ประกาศวันนี้ 2:00 PM ET คาดคงดอกเบี้ยที่ 3.50-3.75% (97%+) dot plot ชุดใหม่และน้ำเสียง Warsh คือ wildcard ที่แท้จริง',
        yield:'10Y Treasury ~4.47% ทรงตัวรอ Fed | 2Y ~4.06% | ยีลด์ curve ยังกลับหัว (2Y > 10Y บ่งชี้ตลาดกังวล recession)',
        usd:'ดอลลาร์ทรงตัวก่อน Fed | hawkish = USD แข็ง กดสินค้าโภคภัณฑ์ กด EM | neutral = USD อ่อนเล็กน้อย',
        today:'May Retail Sales รายงานแล้ว: +0.1% MoM +2.3% YoY — อ่อนกว่า consensus ~0.5% มาก บ่งชี้ผู้บริโภคชะลอ',
        events:'Jabil Q3 earnings ก่อนตลาดเปิด | May Retail Sales +0.1% MoM (8:30 AM ET แล้ว) | FOMC 2:00 PM ET | Warsh 2:30 PM ET',
        stance:'Hawkish-leaning — รอยืนยันจาก Warsh วันนี้'
      },
      watchlist:[
        {tk:'NVDA',
         thesis:'AI chip leader — ราคาปัจจุบันยืนยันไม่ได้ รอ Warsh แถลงก่อนประเมิน risk/reward',
         catalyst:'ผล FOMC วันนี้ + Micron earnings 24 มิ.ย. คือ double catalyst กลุ่มชิป AI',
         intraday:'หลัง 2:30 PM ET ดู volume + options flow ทันที: Warsh neutral → NVDA ฟื้น | Warsh hawkish → เตรียม hedge หรือถือ cash'},
        {tk:'MU',
         thesis:'HBM/DRAM cycle recovery play — งบ 24 มิ.ย. เป็น near-term catalyst ที่ชัดเจน',
         catalyst:'ราคาวิ่ง ~19% ใน 2 วันก่อนงบ = high bar, risk/reward สูงทั้ง 2 ทาง',
         intraday:'ถ้า FOMC hawkish + MU pullback → โซน $950-1000 อาจเป็น pre-earnings entry ที่คุ้มกว่า'},
        {tk:'SPCX',
         thesis:'SpaceX IPO พุ่ง +49% ใน 3 วัน ($135 IPO → $201.80 วาน) — window หายแล้ว รอ consolidation',
         catalyst:'Index inclusion อนาคตและ lock-up expiry คือ longer-term driver | ระยะสั้น extended มาก',
         intraday:'ไม่แนะนำเข้าใหม่ที่ระดับนี้ รอ pullback สู่ $160-175 ก่อนพิจารณา'}
      ],
      insight:'ภาพวันนี้คือ stagflation lite: เงินเฟ้อ 4.2% ยังสูง + May Retail Sales +0.1% อ่อนมาก + น้ำมัน -9% ใน 2 วัน นี่คือ environment ที่ยากที่สุดสำหรับ Fed Warsh ต้องเลือกระหว่างสู้เงินเฟ้อ (hawkish กด growth) กับพยุงเศรษฐกิจ (neutral/dovish กด credibility) Nasdaq -1.15% วานอาจเป็นตลาด pricing in ล่วงหน้าแล้วว่า Warsh จะออก hawkish — ถ้าเป็นเช่นนั้น downside อาจน้อยกว่าที่กลัว แต่ถ้า Warsh เซอร์ไพรส์ neutral upside ชัดมาก',
      action:{
        verdict:'เฝ้าดู',
        reason:'ถือ cash เต็มพอร์ตจนกว่า Warsh แถลงจบ (~3:00 PM ET) ถ้า tone neutral/dovish: เริ่ม scale-in NVDA ทีละ 25% ถ้า hawkish dot plot ชี้ขึ้นดอกเบี้ย: รออีก 1-2 วันให้ตลาด digest ก่อน'
      },
      sources:[
        {name:'TheStreet — Stock Market Today June 16 2026', url:'https://www.thestreet.com/stock-market-today/stock-market-today-dow-jones-sp-500-nasdaq-updates-june-16-2026', date:'16 มิ.ย.'},
        {name:'Honolulu Star-Advertiser — Dow hits record high oil falls SpaceX surges', url:'https://www.staradvertiser.com/2026/06/16/breaking-news/dow-hits-record-high-as-oil-prices-fall-and-spacex-surges/', date:'16 มิ.ย.'},
        {name:'CNBC — SpaceX IPO SPCX closes $161 first day', url:'https://www.cnbc.com/2026/06/12/spacex-ipo-spcx-live-updates.html', date:'12 มิ.ย.'},
        {name:'IndexBox — Fed Rate Decision June 2026 (เงินเฟ้อ 4.2%)', url:'https://www.indexbox.io/blog/fed-holds-rates-as-inflation-hits-42-warshs-first-fomc-press-conference-in-focus/', date:'16 มิ.ย.'},
        {name:'Mezha — Warsh signals hawkish shift may drop dot plot', url:'https://mezha.net/eng/bukvy/24014cdb_warsh_signals_hawkish/', date:'16 มิ.ย.'},
        {name:'FXDailyReport — WTI Crude Oil June 16 2026 ~$77.31', url:'https://fxdailyreport.com/wti-crude-oil-price-analysis-for-june-16-2026/', date:'16 มิ.ย.'},
        {name:'NRF / Census — May 2026 Retail Sales +0.1% MoM', url:'https://nrf.com/media-center/press-releases/census-retail-sales-data-may-shows-reasonably-healthy-consumer', date:'17 มิ.ย.'},
        {name:'Alphastreet — Jabil Q3 2026 Earnings Preview $3.10 EPS', url:'https://news.alphastreet.com/jabil-q3-2026-earnings-preview-june-17-street-expects-3-10-eps/', date:'17 มิ.ย.'},
        {name:'FinanceCalendar — FOMC Rate Decision June 17 2026', url:'https://www.financecalendar.com/event/fomc-rate-decision-june-2026/', date:'17 มิ.ย.'}
      ]
    }
  },
  arena:{
    start:'15 มิ.ย. 2026', startVal:46.06,
    vega:{ret:0, val:46.06, hold:[['NVDA',0.108]]},
    labels:['15 มิ.ย.','16 มิ.ย.'],
    vega_s:[0,0], spx_s:[0,0.13],
    moves:[
      {date:'16 มิ.ย. 2026',tk:'NVDA',act:'▲ ซื้อ 0.108 หุ้น @$212.44',why:'เปิด AI thesis 50% port ก่อน FOMC — AI capex multi-year ยาวกว่า 1 Fed meeting'}
    ],
    journal:[
      {who:'Vega',good:true,t:'เปิด NVDA 50% รอ Fed ก่อนเพิ่ม',x:'Nasdaq +0.02% ขณะ Dow ทำ ATH บ่งชี้ rotation ชั่วคราวเข้า value ก่อน FOMC Vega เลือก 50/50 cash-NVDA แทนถือเงินสดล้วน เพราะ AI infrastructure thesis ยาวกว่า 1 Fed meeting MU extended เกินไปหลังพุ่ง 2 วันติดก่อนงบ 24 มิ.ย. ไม่เข้า ถือ cash ครึ่งพอร์ตรอสัญญาณ Warsh พรุ่งนี้'}
    ]
  },
  // ===== Vega — พอร์ต AI (เริ่มวันเดียวกับคุณ ทุนเท่ากัน สร้างพอร์ตเองด้วย research) =====
  vega:{
    name:'AI Port', start:'15 มิ.ย. 2026', startVal:46.06, val:46.06, ret:0, cash:23.12,
    labels:['15 มิ.ย.','16 มิ.ย.'],
    series:[0,0], spx:[0,0.13],
    holdings:[
      {tk:'NVDA',name:'NVIDIA Corporation',sector:'Technology',exchange:'NASDAQ',country:'USA',founded:1993,web:'nvidia.com',
       shares:0.108,avg:212.44,price:212.44,prev:212.44,
       about:'ผู้นำตลาดชิป GPU/AI compute ครองระบบนิเวศ CUDA ครบวงจร ลูกค้าหลักคือ hyperscalers ทั่วโลก',
       trades:[{date:'16 มิ.ย. 2026',t:'ซื้อ',why:'เปิดสถานะ 50% port — AI infrastructure secular trend, June 15 bond offering $25B ยืนยัน hyperscaler capex แข็งแกร่ง, Nasdaq flat ก่อน FOMC = entry ไม่ extend. Range: L $208.42 H $212.44 C $212.44 (16 มิ.ย. 2026)'}],
       news:[],
       kill:{thesis:'Fed ขึ้นดอกเบี้ยหลายรอบ + hyperscaler ลด AI capex หรือ GPU market share หลุดอย่างมีนัย — cut ทันทีถ้าหลุด $186.95 (-12% จาก avg)'}}
    ],
    closed:[],
    nearMiss:[
      {tk:'MU',name:'Micron Technology',sector:'Semiconductors',date:'16 มิ.ย. 2026',refPrice:1087.99,why:'HBM/AI memory thesis น่าสนใจ งบ 24 มิ.ย. คือ catalyst ใหญ่',blocker:'Extended มาก: ขึ้น ~8% (15 มิ.ย.) + ~10.8% (16 มิ.ย.) สองวันติด pre-earnings risk/reward ไม่คุ้ม',trigger:'Post-FOMC dip หรือ post-earnings pullback โซน $950-1000 ค่อยพิจารณาใหม่'}
    ]
  },
  bench:{ spx:[0], nasdaq:[0] }
};

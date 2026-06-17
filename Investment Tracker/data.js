// ===== Investment Tracker — DATA (ของจริง ไม่ใช่ม็อคอัพ) =====
// เริ่มต้น 15 มิ.ย. 2026 — นับ 1 ใหม่จากเงินสดล้วน ไม่มีสถานะค้าง (log เก่าที่ซื้อๆขายๆ ทิ้งไว้เป็นบทเรียน)
// source of truth = ไฟล์นี้ที่เดียว. ราคา/ข่าว/ดัชนี ของจริง Newwy เป็นคนดึงมาเติมทีหลัง
const FX = 33; // บาท/USD โดยประมาณ — Newwy อัปเดตของจริงทีหลัง
const DATA = {
  // ===== พอร์ตของคุณ =====
  cash: 18.06,            // เงินสดรอลงทุน (USD)
  holdings: [
    {tk:'NOK', name:'Nokia Oyj', sector:'Telecom Equipment', exchange:'NYSE', country:'Finland', founded:'1865', web:'nokia.com',
     thesisRef:'AI Networking',
     shares:2, avg:14.00, price:13.98, prev:13.98,
     about:'บริษัทเทคโนโลยีโทรคมนาคมสัญชาติฟินแลนด์ ผู้ผลิตอุปกรณ์เครือข่าย 5G/IP/optical และโครงสร้างพื้นฐานสำหรับ data center กำลังขยายฐานการผลิต R&D ในสหรัฐฯ มูลค่ารวม $4B รวมถึงโรงงานเซมิคอนดักเตอร์ที่ Pennsylvania',
     trades:[
       {date:'16 มิ.ย. 2026', t:'ซื้อ NOK 2 @ $14.00', why:'Nokia ขยายลงทุนเซมิคอนดักเตอร์ที่ Pennsylvania + โมเมนตัม AI/5G แรง (+127% YTD) ราคา ~$14.80 ต่ำกว่า 52wk high $17.45 analyst avg "Buy" target ~$14.89'}
     ],
     news:[
       {date:'16 มิ.ย. 2026', head:'Nokia ขยายโรงงานเซมิคอนดักเตอร์ที่ Allentown, Pennsylvania', src:'GlobeNewswire', sum:'เพิ่มกำลังผลิต advanced test/packaging สูงสุด 10 เท่า รองรับชิป optical สำหรับ AI เริ่มเชิงพาณิชย์ปลาย Q3 จ้างเพิ่มแตะ 500+ ตำแหน่ง ผลกระทบเศรษฐกิจ >$500M ใน 5 ปี — ตอกย้ำการลงทุนในสหรัฐฯ'},
       {date:'13 มิ.ย. 2026', head:'NVIDIA ลงทุน $1 พันล้านใน Nokia เร่ง AI-RAN และเปลี่ยนผ่าน 5G→6G', src:'Reuters', sum:'ดีลพันธมิตรเชิงกลยุทธ์ดัน Nokia เข้าสู่เกม AI-native network โดยตรง เสริมความเชื่อมั่นธีม AI infrastructure'},
       {date:'12 มิ.ย. 2026', head:'Nokia คว้าดีล Indosat Ooredoo Hutchison วาง 5G/AI-ready network ในอินโดนีเซีย', src:'Nokia', sum:'สัญญายกระดับโครงข่ายในตลาดเอเชียตะวันออกเฉียงใต้ เพิ่ม backlog ฝั่ง Mobile Networks'},
       {date:'11 มิ.ย. 2026', head:'Nokia เปิดตัว Deepfield Genome Shield และ agentic AI framework ใน Network Services Platform', src:'Nokia', sum:'โซลูชัน cybersecurity เครือข่าย AI + กรอบ agentic AI เริ่มเชิงพาณิชย์ปลายปี 2026 ขยายพอร์ตซอฟต์แวร์/บริการ'}
     ]}
  ],
  thesis:[
    {cat:'AI Networking', t:'NOK — Nokia: AI re-rate ของจริง แต่ราคาวิ่งนำกำไร', updated:'17 มิ.ย. 2026',
     sum:'Optical/AI โตจริง (optical +20%, AI&cloud +49%, ออเดอร์ใหม่ €1B/ไตรมาส) แต่ราคา ~$14 ได้ price-in scenario bull ไปเกือบหมด — valuation ตึงสุดในรอบหลายปี',
     full:'Nokia เลิกเป็น \'หุ้นโทรคมโตช้า\' แล้ว ตลาด re-rate เป็น AI-infrastructure play หลังราคาวิ่ง +~190% ใน 1 ปี (52wk $4.00–$17.45).\nเกิดอะไรขึ้น: ดีล Infinera (ปิด ก.พ. 2025, $2.3B, +75% scale optical) + ดีล Nvidia ลง $1B @ $6.01 = 2.9% (ต.ค. 2025) ทำให้ story AI/data-center ชัด. Q1 2026 ของจริงสวย — net sales €4.5B (+4%), comparable op profit €281M (+54%), gross margin ขยายเป็น 45.5% (+320bps), FCF €629M, net cash ฟื้นเป็น €3.8B. Optical +20%, AI&cloud +49% (ราว 8% ของรายได้) รับออเดอร์ใหม่ €1B ในไตรมาสเดียว และบริษัทขึ้น guidance NI เป็น +12–14% (จาก +6–8%).\nBull: AI capex supercycle ดัน optical/DCI, Nokia เป็นเบอร์ 2 โลก ~20% share, vertical integration (ทำ coherent DSP เอง) เป็น moat ระดับ top-tier — ILA 160/rack vs Ciena/Cisco 128, เคลม TCO −70%, งบดุล net cash หนุน. ถ้า optical โตทันเป้า margin ขยายต่อ กำไรจะไล่ทัน valuation.\nBear: ราคาตึงมาก — trailing P/E ~85–92x, forward ~34x, EV/EBITDA ~24–32x (vs median ตัวเอง ~8x, vs Ericsson forward ~19x) ขณะที่บริษัทตั้งเป้ากำไรรวม \'ทรงตัว\' €2.0–2.5B. ธุรกิจที่โตเป็น margin ต่ำเชิงโครงสร้าง (optical NI op margin แค่ 10.1% — ไม่ใช่ Arista 48%), merchant silicon (Broadcom/Marvell) กัด margin integrated vendor, Mobile/RAN ยังหด (−4%, เสียดีล VMO2 ให้ Ericsson). สินค้า optical เรือธงใหม่ (Huron/Superior/Pacific 1.6T/2.4T/3.2T) GA ปลาย 2027 — ยังไม่ลงรายได้. ดีล Nvidia \'ไม่มี revenue commitment\' trial T-Mobile เพิ่งเริ่ม 2026.\nสรุป: ธุรกิจดีขึ้นจริง แต่ความเสี่ยงไม่ใช่ \'ธุรกิจแย่\' — คือ \'จ่ายแพงเกินไปสำหรับการเติบโตที่ยังต้องพิสูจน์\'. risk/reward ที่ราคานี้ asymmetric ไปทาง downside มากกว่าตอนหุ้น $5–8. ไม่ใช่คำแนะนำซื้อ/ขาย — เป็นข้อมูลให้ jiroj ชั่งเอง.\nจับตา: (1) AI&cloud % ของรายได้ ไต่ขึ้นต่อไหม (2) NI op margin >10.1% หรือไม่ (3) group op profit เริ่มทะลุกรอบ €2.0–2.5B ไหม (4) book-to-bill >1 (5) ดีล Nvidia ออก order data center จริงปี 2026–2027',
     sections:[
       {h:'งบการเงิน', b:'FY2025: net sales €19,889M (+3%), comparable op profit €2.0B (~10.2%) แต่ reported IFRS op margin แค่ 4.5% net income €638M — gap กว้างจาก PPA Infinera/one-off. FCF €1.5B (conv 72%), net cash €3.4B สิ้นปี → ฟื้นเป็น €3.8B สิ้น Q1 2026. Q1 2026: net sales €4.5B (+4%), op profit €281M (+54%), gross 45.5% (+320bps), FCF €629M. คุณภาพ: FCF > net income IFRS = กำไรบัญชีถูกกด non-cash, กระแสเงินสดโอเค.'},
       {h:'Valuation', b:'ราคา ~$14, mkt cap ~$78–82B. Trailing P/E ~85–92x (GAAP EPS ถูกกด), forward ~34x (EPS est $0.34), EV/EBITDA ~24–32x เทียบ median 13 ปีตัวเอง ~8.4x = แพงกว่า ~3–4 เท่า. แพงกว่า Ericsson ~2x forward / ~5x trailing. ตลาดจ่ายล่วงหน้าให้ re-rate เป็น AI play + เป้ากำไร €2.7–3.2B ปี 2028 ที่ยังเป็นความคาดหวัง.'},
       {h:'คู่แข่ง / moat', b:'Optical: Nokia เบอร์ 2 โลก ~20% (หลัง Infinera), moat = vertical integration ทำ coherent DSP เอง (ILA 160/rack vs Ciena/Cisco 128). แต่เป็น oligopoly ไม่ใช่ monopoly — Ciena ครอง US ~50%, Cisco โตเร็วสุด, Coherent component leader ~25%. RAN เป็นเบอร์ 3 รอง Huawei/Ericsson เสีย share อเมริกาเหนือ. เปราะ: merchant silicon (Broadcom/Marvell) ขาย DSP ตรงให้ hyperscaler กัด margin integrated vendor.'},
       {h:'Catalyst', b:'สั้น: งบ Q2/Q3 2026 (optical/AI ทำต่อได้ไหม), convert backlog AI&cloud €2.4B สะสม, trial AI-RAN กับ T-Mobile, โรงงาน Allentown PA พร้อม Q3 2026. ยาว: AI data-center buildout (DCI +34% YoY), GA optical suite ใหม่ H2 2027, synergy Infinera €200M ภายใน 2027, 5G→6G ผ่าน ecosystem Nvidia.'},
       {h:'ความเสี่ยงหลัก', b:'(1) Valuation ตึง — forward 34x บนกำไรที่ตั้งเป้าทรงตัว ความผิดหวังเล็กน้อยลงแรง [สูง] (2) mix shift กด margin — โตในธุรกิจ margin ต่ำ กำไรรวมไม่โตตามรายได้ [สูง] (3) Mobile/RAN หด เสียดีลตะวันตก [สูง] (4) ดีล Nvidia ไม่มี purchase commitment trial เพิ่งเริ่ม — เสี่ยงเหลือแค่ข่าว+dilution [กลาง-สูง] (5) สินค้า optical เรือธง GA 2027 ยังไม่ลงรายได้. thesis พังถ้า: optical ชะลอ + margin หยุดขยาย + Nvidia ไม่มี order จริงใน 12–18 เดือน → de-rate กลับ multiple telecom = downside มหาศาล.'}
     ]}
  ],
  timeline:[
    {date:'15 มิ.ย.', total:46.06, change:0},
    {date:'16 มิ.ย.', total:47.66, change:1.60}
  ],
  // บริษัทที่ดู/watchlist — status: 'sold' (เคยถือแล้วขาย), 'watch' (กำลังดู)
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
  },
  arena:{
    start:'15 มิ.ย. 2026', startVal:46.06,
    you:{ret:3.47, val:47.66, hold:[['NOK',1]]},   // สรุปฝั่งคุณบนหัวข้อ Log
    you_s:[0,3.47],
    journal:[]                                       // pros/cons ของคุณ — เพิ่มได้ภายหลัง
  },
  bench:{ spx:[0], nasdaq:[0] }
};

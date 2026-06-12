const FX = 36.5;
const DATA = {
  holdings: [
    {tk:'MU', name:'Micron', sector:'Semiconductors', shares:5, avg:98, price:142.10, prev:139.0, thesisRef:'Memory', about:'ผู้ผลิตชิปหน่วยความจำ DRAM และ NAND รายใหญ่ของสหรัฐ เป็น 1 ใน 3 เจ้าของโลกที่ผลิต HBM สำหรับ AI ได้ ได้ประโยชน์ตรงจาก memory cycle ขาขึ้นและดีมานด์ AI',
      trades:[{date:'14 เม.ย. 2026', t:'ซื้อ 5 @ $98.00', why:'ดีมานด์ HBM สำหรับ AI ตึงตัว Micron เป็น 1 ใน 3 เจ้าที่ผลิตได้ มอง memory cycle กำลังกลับตัว ราคายัง laggard'}],
      news:[{date:'8 มิ.ย.', head:'ราคา HBM ขยับขึ้นต่อ ผู้ผลิตขายล่วงหน้าเต็มถึงปีหน้า', src:'Bloomberg', sum:'ผู้ผลิต HBM รายใหญ่ทั้งหมดขายสินค้าล่วงหน้าเต็มถึงปี 2027 แล้ว ดีมานด์จาก AI cluster รุ่นใหม่ยังพุ่งต่อเนื่อง ราคาต่อ GB คาดปรับขึ้น 15-20% ในไตรมาส Q3 ซึ่งส่งผลดีต่อมาร์จิ้น Micron โดยตรง นักวิเคราะห์ส่วนใหญ่ปรับ PT ขึ้นหลังข่าวนี้', move:{pct:3.1, period:'1 วัน'}},{date:'20 เม.ย. 2026', head:'Micron รายงานกำไร Q2 FY2026 โต 89% YoY', src:'Reuters', sum:'รายได้จาก HBM ขึ้นเป็น 30% ของยอดรวม ผู้บริหารระบุดีมานด์ยังไม่มีสัญญาณชะลอ กำไรต่อหุ้นสูงกว่า consensus 12% นักวิเคราะห์จากหลายสำนักปรับ price target ขึ้นหลังงบออก', move:{pct:7.8, period:'1 วัน'}},{date:'12 ก.พ. 2026', head:'Micron ได้รับเงิน CHIPS Act $6.1B ยืนยัน fab ใหม่ที่ Idaho', src:'Bloomberg', sum:'กระทรวงพาณิชย์สหรัฐอนุมัติเงินอุดหนุน CHIPS Act $6.1B สำหรับโรงงาน fab ใหม่ที่ Idaho เพิ่มความสามารถแข่งขันระยะยาวกับ Samsung และ SK Hynix ในตลาด DRAM และ HBM', move:{pct:2.4, period:'1 วัน'}}]},
    {tk:'NVDA', name:'Nvidia', sector:'Semiconductors', shares:2, avg:128, price:182.40, prev:180.1, about:'ผู้นำ GPU และชิป AI ครองตลาด accelerator สำหรับ training/inference เป็นแกนหลักของ AI compute ทั้งอุตสาหกรรม ทั้งฮาร์ดแวร์และ ecosystem ซอฟต์แวร์ CUDA',
      trades:[{date:'2 มี.ค. 2026', t:'ซื้อ 3 @ $120.00', why:'แกนหลัก AI compute ครองตลาด GPU'},{date:'20 พ.ค. 2026', t:'ขาย 1 @ $150.00', why:'ล็อกกำไร +25% — ภายหลังมองว่าขายเร็วไป (ดู Arena/Journal)'}],
      news:[{date:'9 มิ.ย.', head:'ดีมานด์ compute ยังแข็งแกร่ง คาดการณ์รายได้ศูนย์ข้อมูลโตต่อ', src:'CNBC', sum:'ยอดสั่งซื้อ Blackwell เกินกำลังการผลิตปัจจุบัน hyperscaler หลายรายเพิ่ม AI capex ต่อเนื่อง รายได้ Data Center ไตรมาสหน้าคาดแตะ $45B นักวิเคราะห์มองว่า valuation ยังสมเหตุสมผลเมื่อเทียบกับ growth rate ที่ยังสูง', move:{pct:1.9, period:'1 วัน'}},{date:'5 เม.ย. 2026', head:'Jensen Huang ประกาศ Blackwell Ultra ใน GTC — หุ้นพุ่ง 8% วันเดียว', src:'CNBC', sum:'Nvidia เปิดตัว Blackwell Ultra GPU ประสิทธิภาพเพิ่มขึ้น 2.5x จาก Blackwell เดิม ยอดสั่งจอง early access จาก hyperscaler เกิน $50B ภายใน 48 ชั่วโมงหลังเปิดตัว', move:{pct:8.1, period:'1 วัน'}}]},
    {tk:'VST', name:'Vistra', sector:'Energy', shares:3, avg:135, price:168.50, prev:164.2, thesisRef:'Energy', about:'ผู้ผลิตและค้าปลีกไฟฟ้ารายใหญ่ของสหรัฐ มีทั้งโรงไฟฟ้าก๊าซ นิวเคลียร์ และพลังงานหมุนเวียน ได้ประโยชน์จากดีมานด์ไฟฟ้าของ data center ที่โตตาม AI',
      trades:[{date:'28 เม.ย. 2026', t:'ซื้อ 3 @ $135.00', why:'ดีมานด์ไฟฟ้าจาก data center โตแรง ดีล nuclear/IPP ได้ประโยชน์ตรง AI play ทางอ้อมที่ตลาดยังประเมินต่ำ'}],
      news:[{date:'7 มิ.ย.', head:'สัญญาจ่ายไฟให้ศูนย์ข้อมูลเพิ่ม หนุนรายได้ระยะยาว', src:'Reuters', sum:'Vistra เซ็นสัญญา PPA ใหม่กับศูนย์ข้อมูล 3 แห่ง ระยะเวลา 10-15 ปี รายได้ที่ล็อกไว้ล่วงหน้าช่วยลดความผันผวนของราคาไฟฟ้า โครงการ nuclear restart กำลังรอใบอนุญาตขั้นสุดท้าย หากผ่านจะเพิ่ม capacity อีก 1.2 GW', move:{pct:2.6, period:'1 วัน'}}]},
    {tk:'COHR', name:'Coherent', sector:'Photonics', shares:4, avg:82, price:99.30, prev:97.8, thesisRef:'Photonics', about:'ผู้ผลิต optical component และ transceiver ความเร็วสูง 800G/1.6T สำหรับ networking ใน data center และ AI cluster photonics เป็นคอขวดสำคัญของโครงสร้าง AI รุ่นใหม่',
      trades:[{date:'5 พ.ค. 2026', t:'ซื้อ 4 @ $82.00', why:'optical transceiver 800G/1.6T โตตาม AI networking — photonics เป็นคอขวดของ data center รุ่นใหม่'}],
      news:[{date:'6 มิ.ย.', head:'คำสั่งซื้อ optical สำหรับ AI cluster พุ่ง', src:'SeekingAlpha', sum:'ยอดสั่งซื้อ 800G transceiver เพิ่มขึ้น 40% QoQ ลูกค้าหลักเป็น hyperscaler ที่กำลัง upgrade network ใน AI cluster รุ่นใหม่ margin โปรดักต์ใหม่สูงกว่ารุ่นเก่าอย่างมีนัยสำคัญ Coherent คาดรายได้ปีนี้โตเกิน 30%', move:{pct:4.3, period:'1 วัน'}}]},
    {tk:'CEG', name:'Constellation', sector:'Energy', shares:2, avg:220, price:255.00, prev:251.0, thesisRef:'Energy', about:'ผู้ผลิตไฟฟ้านิวเคลียร์รายใหญ่ที่สุดของสหรัฐ จ่าย baseload แบบ carbon-free ทำสัญญา PPA ระยะยาวกับ hyperscaler สำหรับป้อนไฟ AI data center',
      trades:[{date:'12 พ.ค. 2026', t:'ซื้อ 2 @ $220.00', why:'nuclear baseload สำหรับ AI — สัญญาระยะยาวกับ hyperscaler'}],
      news:[{date:'5 มิ.ย.', head:'ดีล PPA นิวเคลียร์ใหม่กับบริษัทเทค', src:'WSJ', sum:'Constellation Energy ลงนาม PPA 20 ปีกับ hyperscaler รายใหญ่ ราคาที่ตกลงสูงกว่าราคาตลาดปัจจุบัน ทำให้ revenue visibility ยาวนานขึ้นมาก โรงไฟฟ้านิวเคลียร์ให้ baseload ที่เสถียรและ carbon-free ตอบโจทย์ความต้องการของบริษัทเทคที่มีเป้า net-zero', move:{pct:3.7, period:'1 วัน'}}]},
    {tk:'TSM', name:'TSMC', sector:'Semiconductors', shares:2, avg:175, price:205.60, prev:202.0, about:'โรงงานรับผลิตชิป (foundry) เบอร์ 1 ของโลก ผลิตชิปขั้นสูงสุดให้ Apple, Nvidia, AMD ครองเทคโนโลยีระดับ 3nm/2nm กำลังการผลิตเต็มยาว',
      trades:[{date:'3 พ.ค. 2026', t:'ซื้อ 2 @ $175.00', why:'ผู้ผลิตชิปขั้นสูงเบอร์ 1 ได้ประโยชน์ทุก AI chip กำลังการผลิตเต็ม'}],
      news:[{date:'4 มิ.ย.', head:'ยอดผลิต 2nm จองเต็ม ราคาขายปรับขึ้น', src:'DigiTimes', sum:'กำลังการผลิต 2nm ของ TSMC ถูกจองเต็มแล้วตลอดปี 2026 ลูกค้าหลัก Apple, NVIDIA, AMD ยอมรับราคาใหม่ที่สูงขึ้น 5-7% ยืนยัน pricing power ที่แข็งแกร่ง TSMC วางแผนขยายกำลังการผลิตเพิ่มแต่จะพร้อมเร็วสุดปลายปี 2027', move:{pct:2.1, period:'1 วัน'}}]},
    {tk:'AMD', name:'AMD', sector:'Semiconductors', shares:3, avg:150, price:141.20, prev:143.0, about:'ผู้ผลิต CPU และ GPU คู่แข่งหลักของ Intel และ Nvidia ดันชิป Instinct MI series ชิงส่วนแบ่งตลาด AI accelerator ด้วยราคาที่ถูกกว่า',
      trades:[{date:'15 พ.ค. 2026', t:'ซื้อ 3 @ $150.00', why:'ผู้ท้าชิง GPU/AI accelerator ราคาถูกกว่า NVDA — เก็งส่วนแบ่งตลาดเพิ่ม'}],
      news:[{date:'8 มิ.ย.', head:'การแข่งขัน AI chip กดดันมาร์จิ้นระยะสั้น', src:'Barrons', sum:'NVIDIA ยังครองส่วนแบ่ง GPU ตลาดหลัก AMD MI300X ได้ลูกค้าเพิ่มแต่ต้องลดราคาแข่ง ทำให้ gross margin ถูกกดดัน นักวิเคราะห์บางรายปรับลด PT ลง แต่มองว่าถ้า MI400 ออกมาแข่งขันได้จริงปลายปีนี้ภาพจะเปลี่ยน', move:{pct:-1.8, period:'1 วัน'}},{date:'15 ก.พ. 2026', head:'AMD MI350 เปิดตัว — ประสิทธิภาพ AI inference ใกล้เคียง H100 ราคาถูกกว่า 18%', src:'Barrons', sum:'AMD Instinct MI350 ผ่านการทดสอบจากลูกค้าว่าประสิทธิภาพ AI inference ใกล้เคียง Nvidia H100 แต่ราคาต่ำกว่า 18% หลายองค์กรเริ่มกระจาย AI infrastructure ออกจาก NVDA ทำให้ AMD ได้ deal ใหม่ต่อเนื่อง', move:{pct:5.2, period:'1 วัน'}}]},
    {tk:'AAPL', name:'Apple', sector:'Technology', shares:1.5, avg:205, price:198.20, prev:199.5, about:'บริษัทเทคที่มูลค่าสูงสุดในโลก ขาย iPhone/Mac/iPad และบริการ กระแสเงินสดแกร่งและ ecosystem เหนียวแน่น กำลังไล่ตามเรื่อง AI on-device',
      trades:[{date:'18 พ.ค. 2026', t:'ซื้อ 1.5 @ $205.00', why:'defensive/กระแสเงินสดแกร่ง รอ AI on-device — momentum ยังอ่อน'}],
      news:[{date:'9 มิ.ย.', head:'ความคืบหน้า AI บนอุปกรณ์ยังช้ากว่าคู่แข่ง', src:'The Verge', sum:'Apple Intelligence ยังตามหลัง Google Gemini และ Microsoft Copilot ในด้าน on-device AI capability ผู้ใช้บางส่วนบ่นว่าฟีเจอร์ที่โฆษณาไว้ยังไม่มาครบ อย่างไรก็ตามกระแสเงินสดและโปรแกรม buyback ยังแข็งแกร่ง นักวิเคราะห์มองเป็น short-term headwind ไม่ใช่ structural problem', move:{pct:-0.9, period:'1 วัน'}},{date:'10 ต.ค. 2025', head:'iPhone 17 launch แข็งแกร่ง ยอดสั่งซื้อล่วงหน้าทุบสถิติ', src:'Bloomberg', sum:'Apple รายงานยอดสั่งซื้อ iPhone 17 ล่วงหน้าสูงสุดในประวัติศาสตร์ Apple Intelligence กระตุ้นการอัปเกรดจากผู้ใช้ iPhone 13-14 ผู้วิเคราะห์ปรับ revenue estimate Q4 2025 ขึ้น 8-12%', move:{pct:4.4, period:'1 วัน'}},{date:'5 มิ.ย. 2025', head:'WWDC 2025 เปิดตัว Apple Intelligence 1.0 — AI on-device ครั้งแรก', src:'The Verge', sum:'Apple ประกาศ Apple Intelligence บน iOS 19 ฟีเจอร์ AI on-device แบบ privacy-first ตลาดตอบรับดี หุ้นขึ้น 4% ผู้วิเคราะห์มองเป็นจุดเริ่ม iPhone supercycle รุ่นถัดไป', move:{pct:4.0, period:'1 วัน'}}]}
  ],
  // บริษัทที่ไม่ได้ถือเองตอนนี้ — status: 'nova' (NOVA ถือ), 'sold' (เคยถือแล้วขายทิ้ง), 'watch' (กำลังรีเสิจ/ดูอยู่ ยังไม่เข้า)
  // ข่าวของ NOVA-only ดึงจาก market.holdings_news อัตโนมัติ. ใส่ thesisRef:'<cat>' เพื่อ link การ์ดบริษัทกับ Thesis ที่เกี่ยว (cat ต้องตรงกับ DATA.thesis)
  companies:[
    {tk:'PLTR', name:'Palantir', sector:'Software', status:'nova', about:'บริษัทซอฟต์แวร์ data analytics และ AI ให้ภาครัฐและองค์กร แพลตฟอร์ม AIP เด่นด้าน operational AI มี moat สูงในตลาด government analytics ที่คู่แข่งเข้ายาก',
      trades:[{date:'2 มิ.ย. 2026', t:'เปิดสถานะ (NOVA)', why:'NOVA เห็นข่าวดีลภาครัฐ + งบโตเกินคาด เล่นสาย growth ที่พอร์ตคุณไม่มี'}]},
    {tk:'GOOGL', name:'Alphabet', sector:'Technology', status:'nova', about:'บริษัทแม่ของ Google ครองตลาด search และโฆษณาออนไลน์ มี Google Cloud และโมเดล AI Gemini เป็นเครื่องยนต์เติบโตใหม่ที่กำลังไล่บี้คู่แข่ง',
      trades:[]},
    {tk:'SMCI', name:'Super Micro', sector:'Servers', status:'sold', about:'ผู้ผลิตเซิร์ฟเวอร์และระบบ liquid cooling สำหรับ AI/data center เคยมาแรงตามกระแส AI แต่มีประเด็นความเสี่ยงด้านการตรวจสอบบัญชี',
      soldNote:'NOVA ตัดทิ้งทั้งหมด 28 พ.ค. 2026 — cut loss ทันทีหลังข่าวความเสี่ยงด้านบัญชี',
      trades:[{date:'28 พ.ค. 2026', t:'ขายทิ้งทั้งหมด (NOVA)', why:'ข่าวความเสี่ยงด้านบัญชีโผล่ ตัดขาดทุนทันทีตามวินัย ไม่รอความชัดเจน'}],
      news:[{date:'27 พ.ค. 2026', head:'SMCI เผชิญคำถามด้านการตรวจสอบบัญชี หุ้นร่วงแรง', src:'WSJ', sum:'มีรายงานความกังวลเรื่องการรับรู้รายได้และความล่าช้าในการยื่นงบ ทำให้นักลงทุนเทขาย นักวิเคราะห์หลายรายระงับคำแนะนำชั่วคราวรอความชัดเจน', move:{pct:-9.5, period:'1 วัน'}}]},
    {tk:'LITE', name:'Lumentum', sector:'Photonics', status:'watch', thesisRef:'Photonics', about:'ผู้ผลิต optical component และเลเซอร์ คู่ขนานกับ Coherent ป้อน transceiver/optical module ให้ data center อยู่ในธีม photonics เดียวกับ COHR ที่ถืออยู่ — กำลังดูเทียบ valuation ก่อนตัดสินใจเข้า',
      trades:[],
      news:[{date:'6 มิ.ย.', head:'Lumentum ได้คำสั่งซื้อ optical module เพิ่มจาก hyperscaler', src:'SeekingAlpha', sum:'ดีมานด์ optical สำหรับ AI cluster หนุนยอดสั่งซื้อรุ่น 800G/1.6T เพิ่มต่อเนื่อง บริษัทเร่งขยายกำลังการผลิต margin โปรดักต์ใหม่สูงกว่ารุ่นเก่า', move:{pct:3.4, period:'1 วัน'}}]}
  ],
  market:{
    indices:[
      {n:'S&P 500',p:'6,182',c:0.8,ret:2.5,spark:[6035,6050,6042,6080,6110,6098,6150,6182]},
      {n:'Nasdaq',p:'20,540',c:1.2,ret:3.4,spark:[19850,19900,19880,20050,20180,20240,20410,20540]},
      {n:'Dow Jones',p:'44,910',c:-0.2,ret:1.4,spark:[44700,44820,44950,45010,44980,45050,44980,44910]},
      {n:'VIX',p:'13.4',c:0,flat:'ตลาดนิ่ง',ret:-8.2,spark:[14.6,14.2,14.0,13.8,13.6,13.5,13.3,13.4]}
    ],
    sectors:[
      {n:'Semiconductors',  v:3.1, spark:[1.2,1.5,2.0,1.8,2.4,2.9,3.1]},
      {n:'Energy',          v:2.4, spark:[0.6,1.1,1.4,1.8,2.0,2.2,2.4]},
      {n:'Technology',      v:1.8, spark:[0.3,0.7,1.2,1.0,1.4,1.7,1.8]},
      {n:'Utilities',       v:1.5, spark:[0.2,0.5,0.9,1.1,1.0,1.3,1.5]},
      {n:'Financials',      v:0.5, spark:[0.8,0.4,0.6,0.3,0.5,0.4,0.5]},
      {n:'Industrials',     v:0.3, spark:[0.5,0.2,0.4,0.1,0.3,0.2,0.3]},
      {n:'Healthcare',      v:-0.7,spark:[0.1,-0.1,-0.3,-0.5,-0.4,-0.6,-0.7]},
      {n:'Consumer Staples',v:-1.2,spark:[-0.2,-0.4,-0.6,-0.8,-0.9,-1.1,-1.2]}
    ],
    news:[
      {tag:'Macro', feat:true, head:'Fed ส่งสัญญาณคงดอกเบี้ย ตลาดมองโอกาสลดดอกปลายปีเพิ่ม', sum:'บอนด์ยีลด์ 10 ปีลงมา 4.0% หนุน growth/tech หมุนเงินเข้าเทค/เซมิ', src:'Reuters', date:'9 มิ.ย.', body:'ที่ประชุม FOMC มีมติคงอัตราดอกเบี้ยนโยบายตามคาด พร้อมส่งสัญญาณว่ายังต้องการเห็นเงินเฟ้อชะลอตัวต่อเนื่องก่อนเริ่มผ่อนคลาย แต่ถ้อยแถลงที่อ่อนลงทำให้ตลาดเพิ่มน้ำหนักโอกาสการลดดอกเบี้ยในช่วงปลายปี\n\nผลตอบแทนพันธบัตรสหรัฐอายุ 10 ปีปรับลงมาแตะ 4.0% ซึ่งเป็นปัจจัยบวกต่อหุ้นกลุ่ม growth และ technology ที่อ่อนไหวต่อต้นทุนเงินทุน เม็ดเงินเริ่มหมุนเข้าเทคและเซมิคอนดักเตอร์อย่างชัดเจน\n\nนักวิเคราะห์มองว่าหากตัวเลขเงินเฟ้อรอบถัดไปออกมาตามคาด โอกาสที่ Fed จะลดดอกเบี้ยอย่างน้อยหนึ่งครั้งภายในสิ้นปีจะเพิ่มขึ้นอย่างมีนัยสำคัญ'},
      {tag:'AI / Semis', head:'ดีมานด์ HBM ตึง ราคาชิปหน่วยความจำขึ้นต่อ', sum:'ผู้ผลิตหลักขายล่วงหน้าเต็มถึงปีหน้า บวกต่อ Micron/SK Hynix และซัพพลายเชน photonics', src:'Bloomberg', date:'8 มิ.ย.', body:'ความต้องการหน่วยความจำแบนด์วิดท์สูง (HBM) ที่ใช้ในชิป AI ยังตึงตัวต่อเนื่อง โดยผู้ผลิตหลักรายงานว่ากำลังการผลิตถูกจองล่วงหน้าเต็มไปจนถึงปีหน้าแล้ว ส่งผลให้ราคาชิปหน่วยความจำมีแนวโน้มปรับขึ้นต่อ\n\nสถานการณ์นี้เป็นบวกโดยตรงต่อ Micron และ SK Hynix รวมถึงซัพพลายเชนที่เกี่ยวข้องอย่างกลุ่ม photonics และ packaging ขั้นสูง ซึ่งเป็นคอขวดสำคัญของการผลิต\n\nนักวิเคราะห์ประเมินว่าวัฏจักรราคาขาขึ้นของหน่วยความจำรอบนี้อาจยาวนานกว่าปกติ เพราะดีมานด์จากการลงทุน AI infrastructure ยังไม่มีสัญญาณชะลอ'},
      {tag:'Energy', head:'ดีมานด์ไฟฟ้าจาก data center ดันหุ้นโรงไฟฟ้า/นิวเคลียร์', sum:'IPP และ nuclear ทำสัญญายาวกับ hyperscaler รายได้คาดการณ์ได้', src:'WSJ', date:'7 มิ.ย.', body:'การขยายตัวของ data center สำหรับงาน AI ทำให้ความต้องการไฟฟ้าพุ่งขึ้นอย่างรวดเร็ว ผลักดันหุ้นกลุ่มผู้ผลิตไฟฟ้าอิสระ (IPP) และพลังงานนิวเคลียร์ให้ได้รับความสนใจจากนักลงทุน\n\nผู้ผลิตไฟฟ้าหลายรายเริ่มทำสัญญาซื้อขายไฟระยะยาวกับกลุ่ม hyperscaler ทำให้ประมาณการรายได้มีความแน่นอนสูงขึ้นและลดความผันผวนของกระแสเงินสด\n\nกลุ่มนิวเคลียร์ได้ประโยชน์เป็นพิเศษจากภาพลักษณ์พลังงานสะอาดที่เดินเครื่องได้ตลอดเวลา ตอบโจทย์ความต้องการ baseload ของ data center ที่ต้องการไฟฟ้าเสถียร 24 ชั่วโมง'},
      {tag:'Earnings', head:'ฤดูงบไตรมาส เทคใหญ่กำไรเกินคาดส่วนมาก', sum:'การลงทุน capex AI ยังเพิ่ม ตลาดให้พรีเมียมกลุ่มโครงสร้างพื้นฐาน', src:'CNBC', date:'6 มิ.ย.', body:'ฤดูกาลรายงานผลประกอบการไตรมาสล่าสุด บริษัทเทคโนโลยีขนาดใหญ่ส่วนมากรายงานกำไรเกินคาดการณ์ของตลาด สะท้อนว่าการลงทุนด้าน AI ยังแปลงเป็นรายได้ได้จริง\n\nงบลงทุน (capex) ด้าน AI ยังคงเพิ่มขึ้นต่อเนื่อง โดยหลายบริษัทปรับเพิ่ม guidance การลงทุนสำหรับทั้งปี ทำให้ตลาดให้พรีเมียมกับหุ้นกลุ่มโครงสร้างพื้นฐาน AI เป็นพิเศษ\n\nอย่างไรก็ตาม นักวิเคราะห์บางส่วนเริ่มตั้งคำถามถึงผลตอบแทนจากการลงทุนมหาศาลนี้ และจับตาว่าบริษัทจะพิสูจน์ ROI ได้ชัดเจนแค่ไหนในไตรมาสถัดไป'},
      {tag:'Macro', head:'เงินเฟ้อสหรัฐชะลอตามคาด หนุน sentiment', sum:'core PCE ใกล้เป้า ตลาดหุ้นปรับขึ้นทั้งกระดาน', src:'Bloomberg', date:'5 มิ.ย.', body:'ตัวเลขเงินเฟ้อสหรัฐล่าสุดชะลอตัวลงตามที่ตลาดคาดการณ์ โดยดัชนี core PCE ซึ่งเป็นมาตรวัดที่ Fed ให้น้ำหนัก เคลื่อนเข้าใกล้เป้าหมาย 2% มากขึ้น\n\nข้อมูลดังกล่าวช่วยหนุน sentiment ของตลาดอย่างชัดเจน ดัชนีหุ้นหลักปรับขึ้นเกือบทั้งกระดาน นำโดยกลุ่มที่อ่อนไหวต่อทิศทางดอกเบี้ย\n\nหากแนวโน้มการชะลอตัวของเงินเฟ้อยังต่อเนื่อง จะเปิดทางให้ Fed มีความยืดหยุ่นมากขึ้นในการพิจารณาผ่อนคลายนโยบายการเงินในช่วงครึ่งปีหลัง'}
    ],
    holdings_news:[
      {tk:'PLTR', head:'Palantir คว้าสัญญา DoD ใหม่มูลค่า $480M', src:'Reuters', date:'9 มิ.ย.', sum:'สัญญากับกระทรวงกลาโหมสหรัฐใช้แพลตฟอร์ม AIP สำหรับวิเคราะห์ข่าวกรองแบบ real-time รายได้ภาครัฐกลับมาเติบโตหลังชะลอช่วงปลายปีที่แล้ว ตอกย้ำ moat ในตลาด government analytics ที่คู่แข่งเข้าได้ยาก', move:{pct:5.8, period:'1 วัน'}},
      {tk:'GOOGL', head:'Gemini 2.5 Pro outperform คู่แข่ง YouTube Ads โต 12% YoY', src:'Bloomberg', date:'8 มิ.ย.', sum:'Gemini 2.5 Pro แสดงผลดีกว่าคาดในหลาย benchmark ทั้ง coding, reasoning และ multimodal รายได้โฆษณา YouTube โต 12% YoY จากการ integrate AI ใน Search ช่วยเพิ่ม CTR นักวิเคราะห์ส่วนใหญ่ปรับ price target ขึ้นหลังตัวเลขออก', move:{pct:3.2, period:'1 วัน'}},
      {tk:'GOOGL', head:'Google Cloud Q1 2026 revenue โต 28% — AI workload หนุนแรง', src:'Bloomberg', date:'25 เม.ย. 2026', sum:'Google Cloud รายได้ Q1 2026 โต 28% YoY ขับเคลื่อนด้วยดีมานด์ AI infrastructure จาก enterprise และ Gemini API ที่มีลูกค้าเพิ่ม 3x จากต้นปี Alphabet ปรับ capex guidance ขึ้นเป็น $75B สำหรับปี 2026', move:{pct:4.6, period:'1 วัน'}},
      {tk:'PLTR', head:'Palantir Q4 2025 — กำไร US Commercial โต 64% YoY ทุบ consensus', src:'Reuters', date:'18 ก.พ. 2026', sum:'Palantir รายงานผล Q4 2025 กำไร US Commercial segment โต 64% YoY สูงกว่า consensus 15% AIP มีลูกค้าองค์กรใหม่ 81 รายในไตรมาสเดียว บริษัทยกระดับ guidance ปี 2026 ขึ้น', move:{pct:9.3, period:'1 วัน'}}
    ]
  },
  arena:{
    start:'10 พ.ค. 2026', startVal:80000,
    you:{ret:3.8, val:83048, hold:[['MU',31],['VST',22],['COHR',18],['NVDA',16],['AAPL',13]]},
    // hold: [ticker, น้ำหนัก%, ต้นทุนเฉลี่ย NOVA (จำลอง — NOVA เทรดคนละจังหวะกับคุณ)] — ต้นทุนใส่เฉพาะตัวที่มีราคาจริง (อยู่ใน holdings ของคุณด้วย)
    nova:{ret:1.9, val:81520, hold:[['NVDA',28,150],['PLTR',22],['AMD',20,132],['GOOGL',18],['เงินสด',12]]},
    labels:['10 พ.ค.','17','24','31','7 มิ.ย.'],
    you_s:[0,1.1,2.0,2.9,3.8], nova_s:[0,0.8,1.0,1.6,1.9], spx_s:[0,0.6,1.2,1.9,2.5],
    moves:[
      {date:'5 มิ.ย.', tk:'NVDA', act:'▲ เพิ่มน้ำหนัก NVDA +5%', why:'เห็นว่าคุณขาย NVDA เร็วไปแล้วพลาดขาขึ้น จึงถือยาวตามโมเมนตัม + ข่าวดีมานด์ compute'},
      {date:'2 มิ.ย.', tk:'PLTR', act:'▲ เปิดสถานะ PLTR', why:'ข่าวดีลภาครัฐ + งบโตเกินคาด เล่นสาย growth ที่พอร์ตคุณไม่มี'},
      {date:'28 พ.ค.', tk:'SMCI', act:'▼ ตัด SMCI ทั้งหมด', why:'ข่าวความเสี่ยงด้านบัญชี — cut loss ทันทีตามวินัย'},
      {date:'20 พ.ค.', tk:'AMD', act:'▲ เพิ่ม AMD', why:'เก็งส่วนแบ่ง AI accelerator ราคาถูกกว่า NVDA'}
    ],
    journal:[
      {who:'You', good:true, t:'เข้า MU ก่อนข่าว HBM', x:'จับ memory cycle ถูกจังหวะ เข้าตอนตลาดยังไม่สนใจ +45% — จุดแข็งเรื่อง timing เชิง thesis'},
      {who:'You', good:false, t:'ขาย NVDA เร็วเกินไป', x:'ล็อกกำไร +25% แต่หลังจากนั้นวิ่งต่ออีก ~22% เสีย upside — ครั้งหน้าควรแบ่งขายเป็นขั้น'},
      {who:'NOVA', good:true, t:'ตัดขาดทุนไว', x:'ตัด SMCI ทันทีที่มีข่าวเสี่ยงบัญชี จำกัดขาดทุนได้ดี — วินัย cut loss'},
      {who:'NOVA', good:false, t:'ไล่ราคายอดดอย', x:'เข้า PLTR หลังข่าวออกแล้วราคาพุ่ง ต้นทุนสูง ติดลบช่วงแรก -8% — ระวัง FOMO'},
      {who:'You', good:true, t:'กระจายไป photonics/พลังงาน', x:'ไม่กระจุกแค่ชิป จับธีม AI ทางอ้อม (COHR/VST/CEG) ลดความเสี่ยงเฉพาะตัว'},
      {who:'NOVA', good:false, t:'ถือเงินสดมากไป', x:'มีเงินสด 12% ตอนตลาดขาขึ้น ทำให้ตามหลังพอร์ตที่ลงเต็ม'}
    ]
  },
  thesis:[
    {cat:'Memory', t:'ทำไม Memory ถึงสำคัญ', updated:'2 มิ.ย. 2026', sum:'AI ไม่ได้ต้องการแค่ GPU แต่ต้องการหน่วยความจำแบนด์วิดท์สูง (HBM) ป้อนข้อมูลให้ทัน',
      full:'AI ไม่ได้ต้องการแค่ GPU แต่ต้องการ "หน่วยความจำแบนด์วิดท์สูง" (HBM) ป้อนข้อมูลให้ทัน เมื่อโมเดลใหญ่ขึ้น การคำนวณติดคอขวดที่การส่งข้อมูลเข้า-ออกหน่วยความจำ ไม่ใช่ตัวประมวลผล\n\nผู้ผลิต HBM มีแค่ 3 เจ้าหลัก (Micron, SK Hynix, Samsung) ทำให้มี pricing power สูง และดีมานด์ถูกจองล่วงหน้าหลายไตรมาส\n\nสรุป: ลงทุนใน memory = เล่นกับคอขวดจริงของ AI ไม่ใช่แค่กระแส'},
    {cat:'Photonics', t:'Photonics คืออะไร ทำไมถึงมา', updated:'30 พ.ค. 2026', sum:'การส่งข้อมูลในศูนย์ข้อมูล AI ด้วยแสงแทนทองแดง ลดความร้อน/หน่วงเวลา',
      full:'Photonics คือการส่งข้อมูลด้วย "แสง" แทนสัญญาณไฟฟ้าผ่านทองแดง เมื่อคลัสเตอร์ AI โตถึงระดับล้านชิป การเชื่อมต่อด้วยทองแดงเริ่มจำกัดทั้งความเร็วและความร้อน\n\noptical interconnect (เช่น transceiver 800G/1.6T) จึงกลายเป็นสิ่งจำเป็น ไม่ใช่ทางเลือก ผู้ผลิต component อย่าง Coherent/Lumentum ได้ดีมานด์ตรง'},
    {cat:'Energy', t:'ทำไมหุ้นพลังงานถึงน่าสนใจ', updated:'28 พ.ค. 2026', sum:'data center กินไฟฟ้ามหาศาล ดีมานด์ไฟโตเร็วสุดในรอบหลายสิบปี',
      full:'การเทรน/รัน AI กินไฟมหาศาล ดีมานด์ไฟฟ้าสหรัฐกำลังโตเร็วที่สุดในรอบหลายสิบปีหลังนิ่งมานาน\n\nผู้ผลิตไฟ โดยเฉพาะ baseload ที่เสถียร (nuclear/IPP) กลายเป็น AI play ทางอ้อม — hyperscaler ยอมเซ็นสัญญายาวเพื่อล็อกพลังงาน ทำให้รายได้คาดการณ์ได้และตลาดเพิ่งเริ่มให้พรีเมียม'}
  ],
  timeline:[
    {date:"10 พ.ค.",total:80000,change:0},
    {date:"17 พ.ค.",total:80880,change:880},
    {date:"24 พ.ค.",total:81800,change:920},
    {date:"31 พ.ค.",total:82450,change:650},
    {date:"7 มิ.ย.",total:83048,change:598},
  ],
  bench:{
    spx:[0,0.6,1.2,1.9,2.5],
    nasdaq:[0,1.0,1.9,2.9,3.4],
  }
};

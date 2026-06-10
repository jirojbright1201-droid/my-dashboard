const FX = 36.5;
const DATA = {
  holdings: [
    {tk:'MU', name:'Micron', sector:'Semiconductors', shares:5, avg:98, price:142.10, prev:139.0,
      trades:[{date:'14 เม.ย. 2026', t:'ซื้อ 5 @ $98.00', why:'ดีมานด์ HBM สำหรับ AI ตึงตัว Micron เป็น 1 ใน 3 เจ้าที่ผลิตได้ มอง memory cycle กำลังกลับตัว ราคายัง laggard'}],
      news:[{date:'8 มิ.ย.', head:'ราคา HBM ขยับขึ้นต่อ ผู้ผลิตขายล่วงหน้าเต็มถึงปีหน้า', src:'Bloomberg'}]},
    {tk:'NVDA', name:'Nvidia', sector:'Semiconductors', shares:2, avg:128, price:182.40, prev:180.1,
      trades:[{date:'2 มี.ค. 2026', t:'ซื้อ 3 @ $120.00', why:'แกนหลัก AI compute ครองตลาด GPU'},{date:'20 พ.ค. 2026', t:'ขาย 1 @ $150.00', why:'ล็อกกำไร +25% — ภายหลังมองว่าขายเร็วไป (ดู Arena/Journal)'}],
      news:[{date:'9 มิ.ย.', head:'ดีมานด์ compute ยังแข็งแกร่ง คาดการณ์รายได้ศูนย์ข้อมูลโตต่อ', src:'CNBC'}]},
    {tk:'VST', name:'Vistra', sector:'Energy', shares:3, avg:135, price:168.50, prev:164.2,
      trades:[{date:'28 เม.ย. 2026', t:'ซื้อ 3 @ $135.00', why:'ดีมานด์ไฟฟ้าจาก data center โตแรง ดีล nuclear/IPP ได้ประโยชน์ตรง AI play ทางอ้อมที่ตลาดยังประเมินต่ำ'}],
      news:[{date:'7 มิ.ย.', head:'สัญญาจ่ายไฟให้ศูนย์ข้อมูลเพิ่ม หนุนรายได้ระยะยาว', src:'Reuters'}]},
    {tk:'COHR', name:'Coherent', sector:'Photonics', shares:4, avg:82, price:99.30, prev:97.8,
      trades:[{date:'5 พ.ค. 2026', t:'ซื้อ 4 @ $82.00', why:'optical transceiver 800G/1.6T โตตาม AI networking — photonics เป็นคอขวดของ data center รุ่นใหม่'}],
      news:[{date:'6 มิ.ย.', head:'คำสั่งซื้อ optical สำหรับ AI cluster พุ่ง', src:'SeekingAlpha'}]},
    {tk:'CEG', name:'Constellation', sector:'Energy', shares:2, avg:220, price:255.00, prev:251.0,
      trades:[{date:'12 พ.ค. 2026', t:'ซื้อ 2 @ $220.00', why:'nuclear baseload สำหรับ AI — สัญญาระยะยาวกับ hyperscaler'}],
      news:[{date:'5 มิ.ย.', head:'ดีล PPA นิวเคลียร์ใหม่กับบริษัทเทค', src:'WSJ'}]},
    {tk:'TSM', name:'TSMC', sector:'Semiconductors', shares:2, avg:175, price:205.60, prev:202.0,
      trades:[{date:'3 พ.ค. 2026', t:'ซื้อ 2 @ $175.00', why:'ผู้ผลิตชิปขั้นสูงเบอร์ 1 ได้ประโยชน์ทุก AI chip กำลังการผลิตเต็ม'}],
      news:[{date:'4 มิ.ย.', head:'ยอดผลิต 2nm จองเต็ม ราคาขายปรับขึ้น', src:'DigiTimes'}]},
    {tk:'AMD', name:'AMD', sector:'Semiconductors', shares:3, avg:150, price:141.20, prev:143.0,
      trades:[{date:'15 พ.ค. 2026', t:'ซื้อ 3 @ $150.00', why:'ผู้ท้าชิง GPU/AI accelerator ราคาถูกกว่า NVDA — เก็งส่วนแบ่งตลาดเพิ่ม'}],
      news:[{date:'8 มิ.ย.', head:'การแข่งขัน AI chip กดดันมาร์จิ้นระยะสั้น', src:'Barrons'}]},
    {tk:'AAPL', name:'Apple', sector:'Technology', shares:1.5, avg:205, price:198.20, prev:199.5,
      trades:[{date:'18 พ.ค. 2026', t:'ซื้อ 1.5 @ $205.00', why:'defensive/กระแสเงินสดแกร่ง รอ AI on-device — momentum ยังอ่อน'}],
      news:[{date:'9 มิ.ย.', head:'ความคืบหน้า AI บนอุปกรณ์ยังช้ากว่าคู่แข่ง', src:'The Verge'}]}
  ],
  market:{
    indices:[{n:'S&P 500',p:'6,182',c:0.8,ret:2.5},{n:'Nasdaq',p:'20,540',c:1.2,ret:3.4},{n:'Dow Jones',p:'44,910',c:-0.2,ret:1.4},{n:'VIX',p:'13.4',c:0,flat:'ตลาดนิ่ง',ret:-8.2}],
    sectors:[{n:'Semiconductors',v:3.1},{n:'Energy',v:2.4},{n:'Technology',v:1.8},{n:'Utilities',v:1.5},{n:'Financials',v:0.5},{n:'Industrials',v:0.3},{n:'Healthcare',v:-0.7},{n:'Consumer Staples',v:-1.2}],
    news:[
      {tag:'Macro', head:'Fed ส่งสัญญาณคงดอกเบี้ย ตลาดมองโอกาสลดดอกปลายปีเพิ่ม', sum:'บอนด์ยีลด์ 10 ปีลงมา 4.0% หนุน growth/tech หมุนเงินเข้าเทค/เซมิ', src:'Reuters', date:'9 มิ.ย.'},
      {tag:'AI / Semis', head:'ดีมานด์ HBM ตึง ราคาชิปหน่วยความจำขึ้นต่อ', sum:'ผู้ผลิตหลักขายล่วงหน้าเต็มถึงปีหน้า บวกต่อ Micron/SK Hynix และซัพพลายเชน photonics', src:'Bloomberg', date:'8 มิ.ย.'},
      {tag:'Energy', head:'ดีมานด์ไฟฟ้าจาก data center ดันหุ้นโรงไฟฟ้า/นิวเคลียร์', sum:'IPP และ nuclear ทำสัญญายาวกับ hyperscaler รายได้คาดการณ์ได้', src:'WSJ', date:'7 มิ.ย.'},
      {tag:'Earnings', head:'ฤดูงบไตรมาส เทคใหญ่กำไรเกินคาดส่วนมาก', sum:'การลงทุน capex AI ยังเพิ่ม ตลาดให้พรีเมียมกลุ่มโครงสร้างพื้นฐาน', src:'CNBC', date:'6 มิ.ย.'},
      {tag:'Macro', head:'เงินเฟ้อสหรัฐชะลอตามคาด หนุน sentiment', sum:'core PCE ใกล้เป้า ตลาดหุ้นปรับขึ้นทั้งกระดาน', src:'Bloomberg', date:'5 มิ.ย.'}
    ]
  },
  arena:{
    start:'10 พ.ค. 2026', startVal:80000,
    you:{ret:3.8, val:83048, hold:[['MU',31],['VST',22],['COHR',18],['NVDA',16],['AAPL',13]]},
    nova:{ret:1.9, val:81520, hold:[['NVDA',28],['PLTR',22],['AMD',20],['GOOGL',18],['เงินสด',12]]},
    labels:['10 พ.ค.','17','24','31','7 มิ.ย.'],
    you_s:[0,1.1,2.0,2.9,3.8], nova_s:[0,0.8,1.0,1.6,1.9], spx_s:[0,0.6,1.2,1.9,2.5],
    moves:[
      {date:'5 มิ.ย.', act:'▲ เพิ่มน้ำหนัก NVDA +5%', why:'เห็นว่าคุณขาย NVDA เร็วไปแล้วพลาดขาขึ้น จึงถือยาวตามโมเมนตัม + ข่าวดีมานด์ compute'},
      {date:'2 มิ.ย.', act:'▲ เปิดสถานะ PLTR', why:'ข่าวดีลภาครัฐ + งบโตเกินคาด เล่นสาย growth ที่พอร์ตคุณไม่มี'},
      {date:'28 พ.ค.', act:'▼ ตัด SMCI ทั้งหมด', why:'ข่าวความเสี่ยงด้านบัญชี — cut loss ทันทีตามวินัย'},
      {date:'20 พ.ค.', act:'▲ เพิ่ม AMD', why:'เก็งส่วนแบ่ง AI accelerator ราคาถูกกว่า NVDA'}
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

/* ---------- compute derived ---------- */
const H = DATA.holdings.map(h=>{
  const cost=h.shares*h.avg, val=h.shares*h.price, pl=val-cost, plpct=pl/cost*100, day=(h.price-h.prev)/h.prev*100;
  return {...h, cost, val, pl, plpct, day};
});
const TOTAL_VAL = H.reduce((s,h)=>s+h.val,0);
const TOTAL_COST = H.reduce((s,h)=>s+h.cost,0);
H.forEach(h=>h.weight=h.val/TOTAL_VAL*100);
const TOTAL_PL = TOTAL_VAL-TOTAL_COST, TOTAL_PLPCT = TOTAL_PL/TOTAL_COST*100;

/* ---------- helpers ---------- */
const thb = usd => '฿ '+Math.round(usd*FX).toLocaleString();
const pct = (v,d=1)=>`${v>=0?'+':''}${v.toFixed(d)}%`;
const cls = v => v>=0?'pos':'neg';
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const nl2br = s => esc(s).replace(/\n/g,'<br>');

/* ---------- table ---------- */
function rowHtml(h, showLog){
  return `<tr onclick="openHolding('${h.tk}',${!!showLog})">
    <td class="tk">${h.tk}<small>${esc(h.name)}</small></td>
    <td class="num">$${h.price.toFixed(2)}</td>
    <td class="num ${cls(h.day)}">${pct(h.day)}</td>
    <td class="num">$${Math.round(h.val).toLocaleString()}</td>
    <td class="num">${h.weight.toFixed(1)}%</td>
    <td class="num ${cls(h.pl)}">${pct(h.plpct)}</td>
    <td class="go">›</td>
  </tr>`;
}
function tableHtml(list, withSort, showLog){
  const cols=[['tk','Asset'],['price','Price'],['day','Day'],['val','Value'],['weight','Weight'],['plpct','P/L'],['','']];
  const head=cols.map(([k,l])=>{
    if(!l) return '<th></th>';
    const ar = withSort && sortKey===k ? (sortDir>0?' ▲':' ▼') : (withSort?' <span class="ar">⇅</span>':'');
    return `<th ${withSort?`onclick="setSort('${k}')"`:''}>${l}${ar}</th>`;
  }).join('');
  return `<div class="tbl-card"><table><thead><tr>${head}</tr></thead><tbody>${list.map(h=>rowHtml(h,showLog)).join('')}</tbody></table></div>`;
}

/* ---------- ASSET LIST (Coinbase style) ---------- */
function assetListHtml(list){
  return list.map(h=>`
    <div class="asset-row" onclick="openHolding('${h.tk}',false)">
      <div class="asset-icon">${h.tk.slice(0,2)}</div>
      <div class="asset-info"><div class="a-tk">${esc(h.tk)}</div><div class="a-nm">${esc(h.name)}</div></div>
      <div class="asset-mid"><div class="a-price">$${h.price.toFixed(2)}</div><div class="a-day ${cls(h.day)}">${pct(h.day)}</div></div>
      <div class="asset-end"><div class="a-val">$${Math.round(h.val).toLocaleString()}</div><div class="a-w ${cls(h.pl)}">${pct(h.plpct)}</div></div>
    </div>`).join('');
}

/* ---------- OVERVIEW ---------- */
function renderOverview(){
  const top = [...H].sort((x,y)=>y.weight-x.weight).slice(0,6);
  const d=DATA.timeline, cur=d[d.length-1].total, start=d[0].total;
  const chgAbs=cur-start, chgPct=chgAbs/start*100;
  const totals=d.map(x=>x.total), hi=Math.max(...totals), lo=Math.min(...totals);
  const today=d[d.length-1].change, todayPct=today/(cur-today)*100;
  const benchName = benchSel==='spx'?'S&P 500':benchSel==='nasdaq'?'Nasdaq':'';
  const pfLeg = benchSel ? `<div class="pf-leg"><span class="it"><span class="sw" style="border-color:#0052ff"></span>Your Portfolio</span><span class="it"><span class="sw dash" style="border-color:#8a919e"></span>${benchName}</span></div>` : '';
  document.getElementById('t-overview').innerHTML = `
    <div class="kpis">
      <div class="card kpi"><div class="lbl">Portfolio Value</div><div class="val">$${Math.round(TOTAL_VAL).toLocaleString()}</div><div class="sub">${thb(TOTAL_VAL)}</div></div>
      <div class="card kpi"><div class="lbl">Cost Basis</div><div class="val">$${Math.round(TOTAL_COST).toLocaleString()}</div><div class="sub">${thb(TOTAL_COST)}</div></div>
      <div class="card kpi"><div class="lbl">Total P/L</div><div class="val ${cls(TOTAL_PL)}">${TOTAL_PL>=0?'+$':'-$'}${Math.abs(Math.round(TOTAL_PL)).toLocaleString()}</div><div class="sub ${cls(TOTAL_PL)}">${pct(TOTAL_PLPCT)}</div></div>
    </div>

    <div class="sec-title">Holdings</div>
    <div class="grid2">
      <div class="card" style="padding:0;overflow:hidden">${assetListHtml(top)}</div>
      <div class="card chart-card">
        <div class="ch-head"><span class="ttl">Allocation</span></div>
        <div style="flex:1;min-height:0;display:flex;align-items:center;justify-content:center;padding-top:34px">
          <div style="position:relative;width:100%;height:280px"><canvas id="donut"></canvas></div>
        </div>
      </div>
    </div>

    <div class="card pf-card">
      <div class="pf-lbl">Portfolio Value</div>
      <div class="pf-balrow">
        <span class="pf-bal">$${cur.toLocaleString()}</span>
        <span class="pf-chg ${cls(chgPct)}">${chgPct>=0?'▲':'▼'} ${pct(chgPct)}<span class="pf-chg-sub">since start</span></span>
      </div>
      <div class="pf-sub2">Started at $${start.toLocaleString()} → Now $${cur.toLocaleString()}</div>
      <div class="pf-stats">
        <div class="pf-stat">Today <b class="${cls(today)}">${today>=0?'+':''}$${Math.abs(today).toLocaleString()}</b> <span class="${cls(today)}">(${pct(todayPct)})</span></div>
        <div class="pf-stat-right">
          <span>High <b class="pf-hi">$${hi.toLocaleString()}</b></span>
          <span>Low <b class="pf-lo">$${lo.toLocaleString()}</b></span>
        </div>
      </div>
      <span class="seg pf-seg">
        <button class="${benchSel===null?'on':''}" onclick="setBench(null)">Portfolio</button>
        <button class="${benchSel==='spx'?'on':''}" onclick="setBench('spx')">S&P 500</button>
        <button class="${benchSel==='nasdaq'?'on':''}" onclick="setBench('nasdaq')">Nasdaq</button>
      </span>
      ${pfLeg}
      <div class="pf-grid"><canvas id="portfolioLine"></canvas></div>
    </div>`;
  drawDonut(); drawPortfolio();
}

/* ---------- LOG ---------- */
let sortKey='weight', sortDir=-1; // ใช้โดย tableHtml (Overview) เท่านั้น
const THAI_M={'ม.ค.':0,'ก.พ.':1,'มี.ค.':2,'เม.ย.':3,'พ.ค.':4,'มิ.ย.':5,'ก.ค.':6,'ส.ค.':7,'ก.ย.':8,'ต.ค.':9,'พ.ย.':10,'ธ.ค.':11};
function thaiTs(s){ const p=String(s).trim().split(/\s+/); const d=+p[0]||1, m=THAI_M[p[1]]??0, y=+p[2]||2026; return new Date(y,m,d).getTime(); }
function renderLog(){
  const trades=H.flatMap(h=>h.trades.map(t=>({tk:h.tk,name:h.name,...t}))).sort((a,b)=>thaiTs(b.date)-thaiTs(a.date));
  const tl=trades.map(t=>{ const buy=t.t.includes('ซื้อ');
    return `<div class="log-item">
      <div class="log-date">${esc(t.date)}</div>
      <div class="log-main">
        <div class="log-top"><span class="log-tk">${t.tk}</span><span class="log-act ${buy?'buy':'sell'}">${esc(t.t)}</span></div>
        <div class="log-why">${esc(t.why)}</div>
      </div>
    </div>`; }).join('');
  const lessons=DATA.arena.journal.filter(j=>j.who==='You').map(j=>
    `<div class="jr ${j.good?'good':'bad'}"><div class="j-top">${esc(j.t)} <span class="who">${j.good?'บทเรียน':'จุดพลาด'}</span></div><div class="j-txt">${esc(j.x)}</div></div>`).join('');
  document.getElementById('t-log').innerHTML = `
    <div class="sec-title">ไทม์ไลน์การเทรด <span class="ts" style="text-transform:none;letter-spacing:0">${trades.length} รายการ</span></div>
    <div class="card" style="padding:4px 18px">${tl}</div>
    <div class="sec-title">จุดพลาด & บทเรียน</div>
    <div class="feed">${lessons}</div>`;
}

/* ---------- MARKET ---------- */
function renderMarket(){
  const m=DATA.market;
  const idx=m.indices.map(i=>`<div class="idx"><div class="n">${i.n}</div><div class="p">${i.p}</div>${i.flat?`<span class="chip flat">${i.flat}</span>`:`<span class="chip ${cls(i.c)}">${pct(i.c)}</span>`}<div style="font-size:.62rem;color:var(--dim);margin-top:7px">ตั้งแต่ 10 พ.ค. <span class="${cls(i.ret)}" style="font-weight:800">${pct(i.ret)}</span></div></div>`).join('');
  const maxAbs=Math.max(...m.sectors.map(s=>Math.abs(s.v)));
  const sect=m.sectors.map(s=>{ const w=Math.abs(s.v)/maxAbs*48; const left=s.v>=0?50:50-w;
    return `<div class="sector"><div class="s-name">${s.n}</div><div class="s-bar"><div class="s-fill" style="left:${left}%;width:${w}%;background:var(--${s.v>=0?'up':'down'})"></div></div><div class="s-val ${cls(s.v)}">${pct(s.v)}</div></div>`; }).join('');
  const news=m.news.map(n=>`<div class="news"><div class="n-tag">${esc(n.tag)}</div><div class="n-head">${esc(n.head)}</div><div class="n-sum">${esc(n.sum)}</div><div class="n-foot">ที่มา: (mock) ${esc(n.src)} · ${esc(n.date)}</div></div>`).join('');
  document.getElementById('t-market').innerHTML = `
    <div class="sec-title">ภาพรวมตลาด</div>
    <div class="idx-grid">${idx}</div>
    <div class="sec-title">Sector Movers (วันนี้)</div>
    <div class="card">${sect}</div>
    <div class="sec-title">ข่าวตลาด (Agent สรุป)</div>
    <div class="feed">${news}</div>`;
}

/* ---------- ARENA ---------- */
let arenaSeg='moves';
function renderArena(){
  const a=DATA.arena;
  const pfHold=p=>p.hold.map(([t,w])=>`<div class="h">${t} <span>${w}%</span></div>`).join('');
  const moves=a.moves.map(m=>`<div class="move"><div class="m-act">${esc(m.act)} <span class="ts">${esc(m.date)}</span></div><div class="m-why">เหตุผล NOVA: ${esc(m.why)}</div></div>`).join('');
  const jr=a.journal.map(j=>`<div class="jr ${j.good?'good':'bad'}"><div class="j-top">${esc(j.t)} <span class="who">${j.who}</span></div><div class="j-txt">${esc(j.x)}</div></div>`).join('');
  document.getElementById('t-arena').innerHTML = `
    <div class="sec-title">สนามแข่ง — เริ่มเท่ากันที่ $${a.startVal.toLocaleString()} เมื่อ ${a.start}</div>
    <div class="vs-grid">
      <div class="pf you"><div class="pf-name"><span class="dot b"></span>พอร์ตของคุณ</div><div class="pf-ret ${cls(a.you.ret)}">${pct(a.you.ret)}</div><div class="pf-val">$${a.you.val.toLocaleString()} · กำไร +$${(a.you.val-a.startVal).toLocaleString()} ตั้งแต่เริ่มเกม</div><div class="pf-hold">${pfHold(a.you)}</div></div>
      <div class="pf"><div class="pf-name"><span class="dot p"></span>NOVA (AI)</div><div class="pf-ret ${cls(a.nova.ret)}">${pct(a.nova.ret)}</div><div class="pf-val">$${a.nova.val.toLocaleString()} · กำไร +$${(a.nova.val-a.startVal).toLocaleString()} ตั้งแต่เริ่มเกม</div><div class="pf-hold">${pfHold(a.nova)}</div></div>
    </div>
    <div class="sec-title">เส้นผลตอบแทน (You vs NOVA vs S&P500)</div>
    <div class="card"><div class="chart-wrap"><canvas id="arenaLine"></canvas></div></div>
    <div class="sec-title">บันทึก <span class="seg"><button class="${arenaSeg==='moves'?'on':''}" onclick="setSeg('moves')">การเคลื่อนไหว NOVA</button><button class="${arenaSeg==='journal'?'on':''}" onclick="setSeg('journal')">Journal จุดเด่น/พลาด</button></span></div>
    <div class="feed">${arenaSeg==='moves'?moves:jr}</div>`;
  drawArena();
}
function setSeg(s){ arenaSeg=s; renderArena(); }

/* ---------- THESIS ---------- */
function renderThesis(){
  document.getElementById('t-thesis').innerHTML = `
    <div class="sec-title">Thesis ของคุณ — มุมมองเบื้องหลังการลงทุน</div>
    ${DATA.thesis.map((t,i)=>`<div class="th-row" onclick="openThesis(${i})"><span class="th-cat">${esc(t.cat)}</span><div><div class="th-t">${esc(t.t)}</div><div class="th-m">${esc(t.sum)}</div></div><span class="go">›</span></div>`).join('')}`;
}

/* ---------- DRAWER ---------- */
function openHolding(tk, showLog){
  const h=H.find(x=>x.tk===tk);
  const news=h.news.map(n=>`<div class="news"><div class="n-head">${esc(n.head)}</div><div class="n-foot">ที่มา: (mock) ${esc(n.src)} · ${esc(n.date)}</div></div>`).join('');
  const trades=h.trades.map(t=>`<div class="trade"><div class="t-top">${esc(t.t)} · ${esc(t.date)}</div><div class="t-why">${esc(t.why)}</div></div>`).join('');
  const logAcc = showLog ? `<details class="acc" open>
      <summary>ประวัติเทรด + เหตุผล <span class="acc-count">${h.trades.length}</span><span class="acc-chev">›</span></summary>
      <div class="acc-body">${trades}</div>
    </details>` : '';
  document.getElementById('mbox').innerHTML = `
    <div class="mbox-head">
      <div><div style="font-size:1.25rem;font-weight:800">${h.tk} <span style="font-weight:500;color:var(--dim);font-size:.8rem">${esc(h.name)}</span></div>
        <div style="margin-top:6px"><span class="chip ${cls(h.pl)}">${h.pl>=0?'▲':'▼'} ${pct(h.plpct)}</span> <span class="chip flat">${esc(h.sector)}</span></div></div>
      <button class="dr-close" onclick="closeAlloc()">✕</button>
    </div>
    <div class="stat-grid">
      <div class="stat"><div class="k">จำนวน</div><div class="v">${h.shares} หุ้น</div></div>
      <div class="stat"><div class="k">น้ำหนักพอร์ต</div><div class="v">${h.weight.toFixed(1)}%</div></div>
      <div class="stat"><div class="k">ทุนเฉลี่ย</div><div class="v">$${h.avg.toFixed(2)}</div></div>
      <div class="stat"><div class="k">ราคาปัจจุบัน</div><div class="v">$${h.price.toFixed(2)} <span class="${cls(h.day)}" style="font-size:.7rem">${pct(h.day)}</span></div></div>
      <div class="stat"><div class="k">มูลค่า</div><div class="v">$${h.val.toFixed(2)}</div></div>
      <div class="stat"><div class="k">กำไร/ขาดทุน</div><div class="v ${cls(h.pl)}">${h.pl>=0?'+$':'-$'}${Math.abs(h.pl).toFixed(2)}</div></div>
    </div>
    ${logAcc}
    <details class="acc" ${showLog?'':'open'}>
      <summary>ข่าวล่าสุดของตัวนี้ <span class="acc-count">${h.news.length}</span><span class="acc-chev">›</span></summary>
      <div class="acc-body">${news}</div>
    </details>`;
  document.getElementById('mov').classList.add('open');
}
function openThesis(i){
  const t=DATA.thesis[i];
  document.getElementById('drawer').innerHTML = `
    <div class="dr-head"><div><span class="th-cat">${esc(t.cat)}</span><div style="font-size:1.15rem;font-weight:800;margin-top:7px">${esc(t.t)}</div><div class="th-m" style="font-size:.72rem;color:var(--dim);margin-top:3px">อัปเดต ${esc(t.updated)}</div></div><button class="dr-close" onclick="closeDrawer()">✕</button></div>
    <div class="dr-body" style="font-size:.9rem;line-height:1.7;color:var(--text)">${nl2br(t.full)}</div>`;
  document.getElementById('dov').classList.add('open');
}
function closeDrawer(){ document.getElementById('dov').classList.remove('open'); }
document.addEventListener('keydown',e=>{ if(e.key==='Escape'){ closeDrawer(); closeAlloc(); } });

/* ---------- charts ---------- */
let benchSel=null;
function setBench(b){ benchSel=b; renderOverview(); }
// เส้นหลักเรืองแสง (เฉพาะ dataset 0)
const _pfGlow={id:'pfGlow',
  beforeDatasetDraw(c,a){ if(a.index!==0)return; const x=c.ctx; x.save();
    x.shadowColor='rgba(0,82,255,.40)'; x.shadowBlur=16; x.shadowOffsetX=0; x.shadowOffsetY=6; },
  afterDatasetDraw(c,a){ if(a.index!==0)return; c.ctx.restore(); }};
// เส้นประวิ่งตามเมาส์ (crosshair) ไปยังจุดที่ชี้
const _pfCursor={id:'pfCursor',
  afterDraw(c){ const t=c.tooltip; if(!t||!t._active||!t._active.length)return;
    const x=t._active[0].element.x, {ctx,chartArea}=c; ctx.save();
    ctx.strokeStyle='rgba(91,97,110,.55)'; ctx.lineWidth=1; ctx.setLineDash([3,3]);
    ctx.beginPath(); ctx.moveTo(x,chartArea.top); ctx.lineTo(x,chartArea.bottom); ctx.stroke();
    ctx.restore(); }};
function drawPortfolio(){
  const d=DATA.timeline, start=d[0].total, totals=d.map(x=>x.total);
  const hi=Math.max(...totals), lo=Math.min(...totals);
  // จุดโชว์เฉพาะ จุดล่าสุด + จุดสูงสุด/ต่ำสุด
  const dotR=c=>{const i=c.dataIndex,v=totals[i]; return (i===totals.length-1||v===hi||v===lo)?5:0;};
  const ds=[{label:'Your Portfolio',data:totals,
      borderColor:'#0052ff',borderWidth:2.5,fill:false,tension:.4,
      pointRadius:dotR,pointHoverRadius:6,
      pointBackgroundColor:'#0052ff',pointBorderColor:'#fff',pointBorderWidth:2}];
  const vals=[...totals];
  if(benchSel){
    const series=DATA.bench[benchSel];
    const name=benchSel==='spx'?'S&P 500':'Nasdaq';
    const col='#8a919e';
    const bdata=series.map(p=>Math.round(start*(1+p/100)));
    vals.push(...bdata);
    ds.push({label:name,data:bdata,
      borderColor:col,borderDash:[5,4],fill:false,tension:.4,pointRadius:0,borderWidth:2});
  }
  const mn=Math.min(...vals), mx=Math.max(...vals), pd=Math.max((mx-mn)*0.28,300);
  new Chart(document.getElementById('portfolioLine'),{type:'line',
    data:{labels:d.map(x=>x.date),datasets:ds},
    plugins:[_pfGlow,_pfCursor],
    options:{responsive:true,maintainAspectRatio:false,
      layout:{padding:{top:10}},
      interaction:{mode:'index',intersect:false},
      plugins:{legend:{display:false},
        tooltip:{backgroundColor:'#fff',titleColor:'#8a919e',bodyColor:'#0a0b0d',footerColor:'#0a8a5a',
          borderColor:'#d7dae0',borderWidth:1,
          padding:{top:9,right:13,bottom:9,left:13},cornerRadius:11,displayColors:false,
          titleFont:{size:11,weight:'500'},bodyFont:{size:14,weight:'700'},footerFont:{size:11,weight:'700'},
          callbacks:{label:it=>`${it.dataset.label}  $${Math.round(it.raw).toLocaleString()}`,
            footer:its=>{if(benchSel)return'';const r=d[its[0].dataIndex];const s=r.change>=0?'+':'';
              return `${s}$${Math.round(r.change).toLocaleString()} that day`;}}}},
      scales:{
        x:{ticks:{color:'#5b616e',font:{size:11}},grid:{display:false},border:{display:false}},
        y:{min:Math.floor((mn-pd)/100)*100,max:Math.ceil((mx+pd)/100)*100,
          ticks:{color:'#8a919e',font:{size:10},maxTicksLimit:5,
            callback:v=>'$'+(v/1000).toFixed(1)+'k'},
          grid:{display:false},border:{display:false}}}}});
}

// ไล่เฉดฟ้าอ่อน→เข้มตามจำนวนหุ้น (เยอะแค่ไหนก็ไม่สีซ้ำ)
function blueScale(n){
  const a=[207,224,255], b=[0,67,214];
  return Array.from({length:n},(_,i)=>{ const t=n<=1?0.5:i/(n-1);
    const c=a.map((v,k)=>Math.round(v+(b[k]-v)*t)); return `rgb(${c[0]},${c[1]},${c[2]})`; });
}
const allocSorted=[...H].sort((a,b)=>b.val-a.val);
const allocColors=blueScale(allocSorted.length);
function drawDonut(){
  new Chart(document.getElementById('donut'),{type:'doughnut',
    data:{labels:allocSorted.map(h=>h.tk), datasets:[{data:allocSorted.map(h=>h.val), backgroundColor:allocColors, borderWidth:3, borderColor:'#fff'}]},
    options:{responsive:true,maintainAspectRatio:false,cutout:'66%',layout:{padding:{bottom:6}},plugins:{legend:{display:true,position:'bottom',labels:{color:'#5b616e',font:{size:10},padding:22,usePointStyle:true,pointStyle:'circle',boxWidth:7}}}}});
}
let allocChart=null;
function openAlloc(){
  const legend=allocSorted.map((h,i)=>`<div class="a-row"><span class="sw" style="background:${allocColors[i]}"></span><span class="a-tk">${h.tk}</span><span class="a-nm">${esc(h.name)}</span><span class="a-w">${h.weight.toFixed(1)}%</span><span class="a-v">$${Math.round(h.val).toLocaleString()}</span></div>`).join('');
  document.getElementById('mbox').innerHTML=`
    <div class="mbox-head"><span class="t">สัดส่วนพอร์ต · ${allocSorted.length} ตัว</span><button class="dr-close" onclick="closeAlloc()">✕</button></div>
    <div class="alloc-chart"><canvas id="allocCanvas"></canvas></div>
    <div class="alloc-list">${legend}</div>`;
  document.getElementById('mov').classList.add('open');
  if(allocChart) allocChart.destroy();
  allocChart=new Chart(document.getElementById('allocCanvas'),{type:'doughnut',
    data:{labels:allocSorted.map(h=>h.tk), datasets:[{data:allocSorted.map(h=>h.val), backgroundColor:allocColors, borderWidth:3, borderColor:'#fff'}]},
    options:{responsive:true,maintainAspectRatio:false,cutout:'58%',
      plugins:{legend:{display:false}, tooltip:{callbacks:{label:c=>` ${c.label}: ${c.parsed.toLocaleString(undefined,{maximumFractionDigits:0})} USD`}}}}});
}
function closeAlloc(){ document.getElementById('mov').classList.remove('open'); }
const lineOpts={responsive:true,maintainAspectRatio:false,
  plugins:{legend:{labels:{color:'#5b616e',font:{size:11},usePointStyle:true,pointStyle:'circle',boxWidth:7,padding:14}}},
  scales:{x:{ticks:{color:'#8a919e',font:{size:10}},grid:{display:false},border:{display:false}},
    y:{ticks:{color:'#8a919e',callback:v=>v+'%'},grid:{color:'#ebecf0'},border:{display:false}}}};
function drawArena(){
  const a=DATA.arena;
  new Chart(document.getElementById('arenaLine'),{type:'line',
    data:{labels:a.labels,datasets:[
      {label:'Your Portfolio',data:a.you_s,borderColor:'#0052ff',backgroundColor:'rgba(0,82,255,.06)',fill:true,tension:.35,pointRadius:3},
      {label:'NOVA',data:a.nova_s,borderColor:'#7c4dff',fill:false,tension:.35,pointRadius:3},
      {label:'S&P500',data:a.spx_s,borderColor:'#8a919e',borderDash:[5,4],fill:false,tension:.35,pointRadius:0}]},
    options:lineOpts});
}

/* ---------- tabs ---------- */
const RENDER={overview:renderOverview,log:renderLog,market:renderMarket,arena:renderArena,thesis:renderThesis};
function sw(name,btn){
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c=>c.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('t-'+name).classList.add('active');
  RENDER[name]();
}
renderOverview();

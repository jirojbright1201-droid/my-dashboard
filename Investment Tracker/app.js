/* ---------- compute derived ---------- */
const H = DATA.holdings.map(h=>{
  const cost=h.shares*h.avg, val=h.shares*h.price, pl=val-cost, plpct=pl/cost*100, day=(h.price-h.prev)/h.prev*100;
  return {...h, cost, val, pl, plpct, day};
});
const TOTAL_VAL = H.reduce((s,h)=>s+h.val,0);
const TOTAL_COST = H.reduce((s,h)=>s+h.cost,0);
const YOUR_CASH = DATA.cash||0;            // เงินสดรอลงทุน ฝั่งคุณ
const PF_VALUE = TOTAL_VAL + YOUR_CASH;    // มูลค่าพอร์ตรวมเงินสด
H.forEach(h=>h.weight = PF_VALUE? h.val/PF_VALUE*100 : 0);
const TOTAL_PL = TOTAL_VAL-TOTAL_COST, TOTAL_PLPCT = TOTAL_COST? TOTAL_PL/TOTAL_COST*100 : 0;

/* ---------- helpers ---------- */
const thb = usd => '฿ '+Math.round(usd*FX).toLocaleString();
const pct = (v,d=1)=>`${v>=0?'+':''}${v.toFixed(d)}%`;
const cls = v => v>=0?'pos':'neg';
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const nl2br = s => esc(s).replace(/\n/g,'<br>');

/* ---------- ASSET LIST (Coinbase style) ---------- */
function assetListHtml(list){
  return list.map(h=>`
    <div class="asset-row" onclick="openHolding('${h.tk}')">
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
      <div class="card kpi"><div class="lbl">Portfolio Value</div><div class="val">$${PF_VALUE.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}</div><div class="sub">${thb(PF_VALUE)} · เงินสด $${YOUR_CASH.toFixed(2)}</div></div>
      <div class="card kpi"><div class="lbl">Cost Basis</div><div class="val">$${Math.round(TOTAL_COST).toLocaleString()}</div><div class="sub">${thb(TOTAL_COST)}</div></div>
      <div class="card kpi"><div class="lbl">Total P/L</div><div class="val ${cls(TOTAL_PL)}">${TOTAL_PL>=0?'+$':'-$'}${Math.abs(Math.round(TOTAL_PL)).toLocaleString()}</div><div class="sub ${cls(TOTAL_PL)}">${pct(TOTAL_PLPCT)}</div></div>
    </div>

    <div class="sec-title">Holdings</div>
    <div class="grid2">
      <div class="card" style="padding:0;overflow:hidden">${top.length?assetListHtml(top):'<div class="co-empty" style="padding:30px 18px;text-align:center;line-height:1.7">ยังไม่มีสถานะ — เงินสดรอลงไม้แรก<br><span style="font-size:.78rem;color:var(--dim)">ลงทุนแบบมีวินัย: มี thesis ก่อนซื้อทุกครั้ง</span></div>'}</div>
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
const THAI_M={'ม.ค.':0,'ก.พ.':1,'มี.ค.':2,'เม.ย.':3,'พ.ค.':4,'มิ.ย.':5,'ก.ค.':6,'ส.ค.':7,'ก.ย.':8,'ต.ค.':9,'พ.ย.':10,'ธ.ค.':11};
function thaiTs(s){ const p=String(s).trim().split(/\s+/); const d=+p[0]||1, m=THAI_M[p[1]]??0, y=+p[2]||2026; return new Date(y,m,d).getTime(); }
/* ---------- LOG state & helpers (module-level) ---------- */
let logF={type:'all',period:'all',lim:3};

function _lTrade(t){const buy=t.t.includes('ซื้อ');
  return `<div class="cb-row"><div class="cb-row-ic ${buy?'buy':'sell'}">${buy?'↑':'↓'}</div><div class="cb-row-body"><div class="cb-row-top"><span class="cb-tk">${t.tk}</span><span class="cb-chip ${buy?'buy':'sell'}">${esc(t.t.replace('ซื้อ','Buy').replace('ขาย','Sell'))}</span><span class="cb-dt">${esc(t.date)}</span></div><div class="cb-row-why">${esc(t.why)}</div></div></div>`;}
function _lMove(m){const buy=m.act.includes('▲');
  return `<div class="cb-row"><div class="cb-row-ic ${buy?'buy':'sell'}">${buy?'↑':'↓'}</div><div class="cb-row-body"><div class="cb-row-top"><span class="cb-chip ${buy?'buy':'sell'}">${esc(m.act)}</span><span class="cb-dt">${esc(m.date)}</span></div><div class="cb-row-why">${esc(m.why)}</div></div></div>`;}

function _lFilter(list,isMoves){
  const allTs=H.flatMap(h=>h.trades).map(t=>thaiTs(t.date)).concat(DATA.arena.moves.map(m=>thaiTs(m.date)));
  const maxTs=allTs.length?Math.max(...allTs):Date.now();
  const maxDate=new Date(maxTs);
  const cutoffMap={
    'all':-Infinity,
    '1m':maxTs-30*86400000,
    '3m':maxTs-90*86400000,
    'ytd':new Date(maxDate.getFullYear(),0,1).getTime(),
    '1y':maxTs-365*86400000,
    '5y':maxTs-5*365*86400000
  };
  const cutoff=cutoffMap[logF.period]??-Infinity;
  return list.filter(t=>{
    if(thaiTs(t.date)<cutoff)return false;
    if(logF.type==='all')return true;
    const buy=isMoves?t.act.includes('▲'):t.t.includes('ซื้อ');
    return logF.type==='buy'?buy:!buy;
  });
}

function renderLogFeeds(){
  const youAll=H.flatMap(h=>h.trades.map(t=>({...t,tk:h.tk}))).sort((a,b)=>thaiTs(b.date)-thaiTs(a.date));
  const vegaAll=[...DATA.arena.moves].sort((a,b)=>thaiTs(b.date)-thaiTs(a.date));
  const yF=_lFilter(youAll,false), nF=_lFilter(vegaAll,true);

  // limit ร่วมตัวเดียว: กดทีเดียวขยายพร้อมกันทั้งสองฝั่ง
  const yShown=yF.slice(0,logF.lim), nShown=nF.slice(0,logF.lim);
  const R=Math.max(yShown.length,nShown.length,1);
  const footBtn=items=>{
    if(items.length>logF.lim) return `<button class="cb-more-btn" onclick="loadMoreLog()">Show more</button>`;
    return items.length>3?`<button class="cb-more-btn collapse" onclick="collapseLog()">Show less</button>`:'';
  };

  const cell=(item,renderFn,shownLen,key,i)=>{
    if(item) return `<div class="lfg-cell ${key}-c">${renderFn(item)}</div>`;
    if(i===0&&shownLen===0) return `<div class="lfg-cell ${key}-c"><div class="lf-empty">No items</div></div>`;
    return `<div class="lfg-cell ${key}-c lfg-empty"></div>`;
  };

  let rows='';
  for(let i=0;i<R;i++){
    rows+=cell(yShown[i],_lTrade,yShown.length,'you',i)+cell(nShown[i],_lMove,nShown.length,'vega',i);
  }

  document.getElementById('log-feeds-wrapper').innerHTML=
    `<div class="log-feed-grid">`+
      `<div class="lfg-hd you-c"><span class="lf-name">You</span><span class="lf-cnt">${yF.length} trades</span></div>`+
      `<div class="lfg-hd vega-c"><span class="lf-name">AI Port</span><span class="lf-cnt">${nF.length} moves</span></div>`+
      rows+
      `<div class="lfg-foot you-c">${footBtn(yF)}</div>`+
      `<div class="lfg-foot vega-c">${footBtn(nF)}</div>`+
    `</div>`;
  document.querySelectorAll('.log-type-btn').forEach(b=>b.classList.toggle('on',b.dataset.v===logF.type));
  document.querySelectorAll('.log-period-btn').forEach(b=>b.classList.toggle('on',b.dataset.v===logF.period));
}
function setLogType(v){logF.type=v;logF.lim=3;renderLogFeeds();}
function setLogPeriod(v){logF.period=v;logF.lim=3;renderLogFeeds();}
function loadMoreLog(){logF.lim=Infinity;renderLogFeeds();}
function collapseLog(){logF.lim=3;renderLogFeeds();}

let logJr=false;
const _jrHtml=j=>`<div class="cb-jr"><div class="cb-jr-ic ${j.good?'good':'bad'}">${j.good?'✓':'✕'}</div><div class="cb-jr-body"><div class="cb-jr-t">${esc(j.t)}</div><div class="cb-jr-x">${esc(j.x)}</div></div></div>`;

function renderJrSection(col){
  const who=col==='you'?'You':'Vega';
  const jList=DATA.arena.journal.filter(j=>j.who===who);
  const expanded=logJr;
  const lim=expanded?Infinity:1;
  const good=jList.filter(j=>j.good), bad=jList.filter(j=>!j.good);
  const hidden=(good.length-Math.min(good.length,lim))+(bad.length-Math.min(bad.length,lim));
  const jrCol=(list,lbl,cls)=>`<div><div class="cb-sub-lbl ${cls}">${lbl}</div>${list.slice(0,lim).length?list.slice(0,lim).map(_jrHtml).join(''):'<div class="cb-empty">—</div>'}</div>`;
  const colBtn=expanded&&(good.length+bad.length>2)
    ?`<button class="cb-more-btn collapse" onclick="collapseJr()">Show less</button>`:'';
  document.getElementById(`jr-${col}`).innerHTML=
    `<div class="log-jr-grid">${jrCol(good,'Pros','good')}${jrCol(bad,'Cons','bad')}</div>`+
    (hidden>0?`<button class="cb-more-btn" onclick="expandJr()">Show all</button>`:colBtn);
}
function expandJr(){logJr=true;renderJrSection('you');renderJrSection('vega');}
function collapseJr(){logJr=false;renderJrSection('you');renderJrSection('vega');}

function renderLog(){
  const colTop=(name,cls,av,ret,val)=>`
    <div class="log-col ${cls}">
      <div class="cb-head"><div class="cb-av ${cls}">${av}</div><div class="cb-col-meta"><div class="cb-col-name">${name}</div><div class="cb-col-perf">${ret} · ${val}</div></div></div>
      <div id="jr-${cls}" class="jr-wrap"></div>
    </div>`;

  logF={type:'all',period:'all',lim:3};
  logJr=false;
  document.getElementById('t-log').innerHTML=`
    <div class="log-sub" style="margin-top:0">Pros &amp; Cons</div>
    <div class="log-vs-grid">
      ${colTop('You','you','YOU',pct(DATA.arena.you.ret),'$'+DATA.arena.you.val.toLocaleString())}
      ${colTop('AI Port','vega','AI',pct(DATA.arena.vega.ret),'$'+DATA.arena.vega.val.toLocaleString())}
    </div>
    <div class="log-tl-section">
      <div class="log-tl-bar">
        <span class="log-sub" style="margin:0">Trade Timeline</span>
        <div class="log-filter-bar">
          <div class="seg">
            <button class="log-type-btn on" data-v="all" onclick="setLogType('all')">All</button>
            <button class="log-type-btn" data-v="buy" onclick="setLogType('buy')">Buy / ▲</button>
            <button class="log-type-btn" data-v="sell" onclick="setLogType('sell')">Sell / ▼</button>
          </div>
          <div class="seg">
            <button class="log-period-btn on" data-v="all" onclick="setLogPeriod('all')">All</button>
            <button class="log-period-btn" data-v="1m" onclick="setLogPeriod('1m')">1M</button>
            <button class="log-period-btn" data-v="3m" onclick="setLogPeriod('3m')">3M</button>
            <button class="log-period-btn" data-v="ytd" onclick="setLogPeriod('ytd')">YTD</button>
            <button class="log-period-btn" data-v="1y" onclick="setLogPeriod('1y')">1Y</button>
            <button class="log-period-btn" data-v="5y" onclick="setLogPeriod('5y')">5Y</button>
          </div>
        </div>
      </div>
      <div id="log-feeds-wrapper"></div>
    </div>`;
  renderJrSection('you');
  renderJrSection('vega');
  renderLogFeeds();
}

/* ---------- HOLDINGS NEWS ---------- */
let hnFilter='all', hnPeriod='all', hnLim=4;
function setHnFilter(v){hnFilter=v;hnLim=4;renderHoldingsNews();}
function setHnPeriod(v){hnPeriod=v;hnLim=4;renderHoldingsNews();}
function loadMoreHn(){hnLim=Infinity;renderHoldingsNews();}
function collapseHn(){hnLim=4;renderHoldingsNews();}
function renderHoldingsNews(){
  const vegaSet=new Set(DATA.arena.vega.hold.map(([tk])=>tk));
  const youSet=new Set(H.map(h=>h.tk));
  const all=[...H.flatMap(h=>h.news.map(n=>({...n,tk:h.tk}))),...DATA.market.holdings_news];
  all.forEach((n,i)=>n._i=i);

  const nowTs=Date.now();
  const cutoffMap={'all':-Infinity,'1m':nowTs-30*86400000,'3m':nowTs-90*86400000,
    'ytd':new Date(new Date().getFullYear(),0,1).getTime(),'1y':nowTs-365*86400000,'5y':nowTs-5*365*86400000};
  const cutoff=cutoffMap[hnPeriod]??-Infinity;

  const byOwner=hnFilter==='you'?all.filter(n=>youSet.has(n.tk)):hnFilter==='vega'?all.filter(n=>vegaSet.has(n.tk)):all;
  const filtered=byOwner.filter(n=>thaiTs(n.date)>=cutoff);
  const shown=filtered.slice(0,hnLim);

  const badge=tk=>{const y=youSet.has(tk),n=vegaSet.has(tk);
    return y&&n?`<span class="hn-who both">You &amp; AI Port</span>`:y?`<span class="hn-who you">You</span>`:`<span class="hn-who vega">AI Port</span>`;};
  const cnt=v=>{const arr=(v==='you'?all.filter(n=>youSet.has(n.tk)):v==='vega'?all.filter(n=>vegaSet.has(n.tk)):all).filter(n=>thaiTs(n.date)>=cutoff);
    return `<span class="hn-cnt">${arr.length}</span>`;};
  const moveChip=n=>n.move?`<span class="chip ${n.move.pct>=0?'up':'down'}">${n.move.pct>=0?'+':''}${n.move.pct}%</span>`:''
  const cards=shown.length
    ?shown.map(n=>`<div class="hn-card" onclick="openHnNews(${n._i})"><div class="hn-top"><span class="hn-tk">${esc(n.tk)}</span>${moveChip(n)}${badge(n.tk)}</div><div class="hn-head">${esc(n.head)}</div><div class="hn-foot"><span class="hn-src">${esc(n.src)}</span><span class="mk-dot">·</span><span class="hn-dt">${esc(n.date)}</span></div></div>`).join('')
    :`<div class="hn-empty">ไม่มีข่าวในช่วงนี้</div>`;
  const hasMore=filtered.length>hnLim;
  const footBtn=hasMore
    ?`<button class="cb-more-btn" onclick="loadMoreHn()">ดูทั้งหมด (${filtered.length})</button>`
    :filtered.length>4?`<button class="cb-more-btn collapse" onclick="collapseHn()">ซ่อน</button>`:'';

  const periods=['all','1m','3m','ytd','1y','5y'];
  const pLabels={all:'All','1m':'1M','3m':'3M',ytd:'YTD','1y':'1Y','5y':'5Y'};
  document.getElementById('hn-section').innerHTML=
    `<div class="hn-filter-bar">`+
    `<div class="seg">`+
    `<button class="${hnFilter==='all'?'on':''}" onclick="setHnFilter('all')">All ${cnt('all')}</button>`+
    `<button class="${hnFilter==='you'?'on':''}" onclick="setHnFilter('you')">You ${cnt('you')}</button>`+
    `<button class="${hnFilter==='vega'?'on':''}" onclick="setHnFilter('vega')">AI Port ${cnt('vega')}</button>`+
    `</div><div class="seg">`+
    periods.map(v=>`<button class="${hnPeriod===v?'on':''}" onclick="setHnPeriod('${v}')">${pLabels[v]}</button>`).join('')+
    `</div></div>`+
    `<div class="hn-grid">${cards}</div>${footBtn}`;
}

/* ---------- MARKET ---------- */
// sparkline แบบ inline SVG (เบา ไม่พึ่ง Chart.js): เส้น + พื้นไล่เฉดจาง
function sparkSvg(arr, up){
  const w=120,h=34,mn=Math.min(...arr),mx=Math.max(...arr),r=(mx-mn)||1;
  const xy=arr.map((v,i)=>[(i/(arr.length-1))*w, h-2-((v-mn)/r)*(h-4)]);
  const line=xy.map(p=>`${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  const area=`0,${h} ${line} ${w},${h}`;
  const col=up?'var(--up)':'var(--down)';
  const id='sg'+Math.random().toString(36).slice(2,7);
  return `<svg class="mk-spark" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
    <defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${col}" stop-opacity=".20"/><stop offset="1" stop-color="${col}" stop-opacity="0"/>
    </linearGradient></defs>
    <polygon points="${area}" fill="url(#${id})"/>
    <polyline points="${line}" fill="none" stroke="${col}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
  </svg>`;
}
function renderMarket(){
  const m=DATA.market;
  // index ticker cards + sparkline
  const idx=m.indices.map(i=>{
    const up=(i.c||0)>=0;
    const chip=i.flat?`<span class="chip flat">${esc(i.flat)}</span>`:`<span class="chip ${cls(i.c)}">${i.c>=0?'▲':'▼'} ${pct(i.c)}</span>`;
    const spark=i.spark?sparkSvg(i.spark, i.flat?(i.ret>=0):up):'';
    return `<div class="mk-idx ${i.flat?'flat':up?'up':'dn'}">
      <div class="mk-idx-top"><span class="mk-idx-n">${esc(i.n)}</span>${chip}</div>
      <div class="mk-idx-p">${esc(i.p)}</div>
      ${spark}
      ${typeof i.ret==='number'?`<div class="mk-idx-since">ตั้งแต่เริ่ม <b class="${cls(i.ret)}">${pct(i.ret)}</b></div>`:''}
    </div>`;
  }).join('');

  // แต่ละแถว: พื้นหลัง gradient ไล่สีตามขนาด gainers จากซ้าย / losers จากขวา
  const secCard=s=>{
    const dir=s.v>=0?'up':'dn';
    const chip=`<span class="chip ${cls(s.v)}">${s.v>=0?'▲':'▼'} ${pct(s.v)}</span>`;
    const sp=s.spark?sparkSvg(s.spark,s.v>=0):'';
    return `<div class="mk-idx ${dir}">
      <div class="mk-idx-top"><span class="mk-idx-n">${esc(s.n)}</span>${chip}</div>
      <div class="mk-idx-p ${cls(s.v)}">${pct(s.v)}</div>
      ${sp}
    </div>`;
  };
  const sorted=[...m.sectors].sort((a,b)=>b.v-a.v);
  const sect=sorted.length?sorted.map(secCard).join(''):`<div class="mk-empty">ไม่มีกลุ่มในหมวดนี้</div>`;

  document.getElementById('t-market').innerHTML = `
    <div class="sec-title">Market Overview</div>
    <div class="mk-idx-grid">${idx}</div>

    <div class="sec-title">Sector Performance</div>
    <div class="mk-idx-grid mk-sec-grid">${sect}</div>

    <div class="sec-title">Holdings News</div>
    <div id="hn-section"></div>

    <div class="sec-title">Market News</div>
    <div id="mk-news-section"></div>`;
  renderHoldingsNews();
  renderMarketNews();
}

/* ---------- MARKET NEWS ---------- */
const mkTagCls=t=>{const k=String(t).toLowerCase();
  if(k.includes('ai')||k.includes('semi'))return 'ai';
  if(k.includes('energy'))return 'energy';
  if(k.includes('earn'))return 'earn';
  return 'macro';};
let mkPeriod='all', mkLim=7;
function setMkPeriod(v){mkPeriod=v;mkLim=7;renderMarketNews();}
function loadMoreMk(){mkLim=Infinity;renderMarketNews();}
function collapseMk(){mkLim=7;renderMarketNews();}
function mkNewsFiltered(){
  const nowTs=Date.now();
  const cutoffMap={'all':-Infinity,'1m':nowTs-30*86400000,'3m':nowTs-90*86400000,
    'ytd':new Date(new Date().getFullYear(),0,1).getTime(),'1y':nowTs-365*86400000,'5y':nowTs-5*365*86400000};
  const cutoff=cutoffMap[mkPeriod]??-Infinity;
  return DATA.market.news.map((n,i)=>({...n,_i:i}))
    .filter(n=>thaiTs(n.date)>=cutoff);
}
function renderMarketNews(){
  const newsCard=(n,feat)=>`<div class="mk-news${feat?' feat':''}" onclick="openMkNews(${n._i})">
    <span class="mk-news-tag ${mkTagCls(n.tag)}">${esc(n.tag)}</span>
    <div class="mk-news-head">${esc(n.head)}</div>
    <div class="mk-news-sum">${esc(n.sum)}</div>
    <div class="mk-news-foot"><span class="mk-news-src">${esc(n.src)}</span><span class="mk-dot">·</span>${esc(n.date)}</div>
  </div>`;
  const f=mkNewsFiltered();
  // ข่าวเด่น = ตัวที่ AI ติดธง feat (ผ่าน data) ถ้าตัวนั้นถูกกรองออกค่อย fallback เป็นชิ้นแรก
  const hero=f.find(n=>n.feat)||f[0];
  const ordered=hero?[hero,...f.filter(n=>n!==hero)]:f;
  const periods=['all','1m','3m','ytd','1y','5y'];
  const pLabels={all:'All','1m':'1M','3m':'3M',ytd:'YTD','1y':'1Y','5y':'5Y'};
  const shown=ordered.slice(0,mkLim);
  const news=shown.length
    ?newsCard(shown[0],true)+(shown.length>1?`<div class="mk-news-grid">${shown.slice(1).map(n=>newsCard(n,false)).join('')}</div>`:'')
    :`<div class="hn-empty">ไม่มีข่าวในเงื่อนไขนี้</div>`;
  const footBtn=f.length>mkLim
    ?`<button class="cb-more-btn" onclick="loadMoreMk()">ดูทั้งหมด</button>`
    :f.length>7?`<button class="cb-more-btn collapse" onclick="collapseMk()">ซ่อน</button>`:'';
  document.getElementById('mk-news-section').innerHTML=
    `<div class="hn-filter-bar">`+
    `<div class="seg">`+
    periods.map(v=>`<button class="${mkPeriod===v?'on':''}" onclick="setMkPeriod('${v}')">${pLabels[v]}</button>`).join('')+
    `</div></div>`+
    news+footBtn;
}
function openMkNews(i){
  const n=DATA.market.news[i]; if(!n) return;
  const bodyHtml=n.body
    ?n.body.split(/\n\n+/).map(p=>`<p style="margin:0 0 12px">${esc(p)}</p>`).join('')
    :(n.sum?`<p style="margin:0">${esc(n.sum)}</p>`:'');
  document.getElementById('mbox').innerHTML=`
    <div class="mbox-head">
      <div style="flex:1;min-width:0">
        <div style="margin-bottom:10px"><span class="mk-news-tag ${mkTagCls(n.tag)}">${esc(n.tag)}</span></div>
        <div style="font-size:1.1rem;font-weight:800;line-height:1.45;color:var(--text)">${esc(n.head)}</div>
      </div>
      <button class="dr-close" onclick="closeAlloc()" style="margin-left:14px;flex-shrink:0">✕</button>
    </div>
    <div style="font-size:.88rem;color:var(--silver);line-height:1.8;padding-top:4px">${bodyHtml}</div>
    <div style="margin-top:14px;text-align:right;font-size:.7rem;color:var(--dim)">${esc(n.src)} · ${esc(n.date)}</div>`;
  document.getElementById('mov').classList.add('open');
}

/* ---------- HN NEWS MODAL ---------- */
function openHnNews(i){
  const all=[...H.flatMap(h=>h.news.map(n=>({...n,tk:h.tk}))),...DATA.market.holdings_news];
  const n=all[i]; if(!n) return;
  const vegaSet=new Set(DATA.arena.vega.hold.map(([tk])=>tk));
  const youSet=new Set(H.map(h=>h.tk));
  const y=youSet.has(n.tk), nv=vegaSet.has(n.tk);
  const badge=y&&nv?`<span class="hn-who both">You &amp; AI Port</span>`:y?`<span class="hn-who you">You</span>`:`<span class="hn-who vega">AI Port</span>`;
  const moveChip=n.move?`<span class="chip ${n.move.pct>=0?'up':'down'}">${n.move.pct>=0?'+':''}${n.move.pct}%</span>`:'';
  document.getElementById('mbox').innerHTML=`
    <div class="mbox-head">
      <div style="flex:1;min-width:0">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
          <span class="hn-tk">${esc(n.tk)}</span>${moveChip}
          <span style="margin-left:auto">${badge}</span>
        </div>
        <div style="font-size:1.05rem;font-weight:800;line-height:1.45;color:var(--text)">${esc(n.head)}</div>
      </div>
      <button class="dr-close" onclick="closeAlloc()" style="margin-left:14px;flex-shrink:0">✕</button>
    </div>
    ${n.sum?`<div style="font-size:.88rem;color:var(--silver);line-height:1.75;padding-top:2px">${esc(n.sum)}</div>`:''}
    <div style="margin-top:14px;text-align:right;font-size:.7rem;color:var(--dim)">${esc(n.src)} · ${esc(n.date)}</div>`;
  document.getElementById('mov').classList.add('open');
}

/* ---------- Vega (พอร์ต AI เดี่ยว) ---------- */
// derive: holdings ของ Vega — weight คำนวณสดจาก shares*price (รวมเงินสด)
const NH = DATA.vega.holdings.map(h=>{
  const cost=h.shares*h.avg, val=h.shares*h.price, pl=val-cost, plpct=pl/cost*100, day=(h.price-h.prev)/h.prev*100;
  return {...h, cost, val, pl, plpct, day};
});
const N_EQUITY = NH.reduce((s,h)=>s+h.val,0);
const N_TOTAL = N_EQUITY + DATA.vega.cash;
NH.forEach(h=>h.weight=h.val/N_TOTAL*100);
const N_PL = NH.reduce((s,h)=>s+h.pl,0), N_COST = NH.reduce((s,h)=>s+h.cost,0);
const N_PLPCT = N_COST? N_PL/N_COST*100 : 0;
// timeline absolute (สำหรับการ์ด Portfolio Value แบบ Overview) จาก series %
const N_TL = DATA.vega.series.map((s,i)=>({date:DATA.vega.labels[i], total:Math.round(DATA.vega.startVal*(1+s/100))}));
N_TL.forEach((x,i)=>{ x.change=i===0?0:x.total-N_TL[i-1].total; });
// donut allocation: holdings (ม่วงไล่เฉดตามมูลค่า) + เงินสด (เทา)
const N_HSORT=[...NH].sort((a,b)=>b.val-a.val);
const purpleScale=n=>{ const a=[221,210,255], b=[108,58,230];
  return Array.from({length:n},(_,i)=>{ const t=n<=1?0.4:i/(n-1);
    const c=a.map((v,k)=>Math.round(v+(b[k]-v)*t)); return `rgb(${c[0]},${c[1]},${c[2]})`; }); };
const N_HCOLORS=purpleScale(N_HSORT.length);
const N_DONUT_LABELS=[...N_HSORT.map(h=>h.tk),'Cash'];
const N_DONUT_VALS=[...N_HSORT.map(h=>h.val), DATA.vega.cash];
const N_DONUT_COLORS=[...N_HCOLORS,'#c7ccd6'];
let vegaBench=null;
// asset list สไตล์ Coinbase (ฝั่งซ้าย Holdings) — ราคาทุนอยู่ใต้ชื่อหุ้น คลิกเปิด drawer
function vegaAssetListHtml(list){
  return list.map(h=>`
    <div class="asset-row" onclick="openVegaHolding('${h.tk}')">
      <div class="asset-icon" style="background:rgba(124,77,255,.1);color:#7c4dff">${h.tk.slice(0,2)}</div>
      <div class="asset-info"><div class="a-tk">${esc(h.tk)}</div><div class="a-nm">${esc(h.name)} · Cost $${h.avg.toFixed(2)}</div></div>
      <div class="asset-mid"><div class="a-price">$${h.price.toFixed(2)}</div><div class="a-day ${cls(h.day)}">${pct(h.day)}</div></div>
      <div class="asset-end"><div class="a-val">$${Math.round(h.val).toLocaleString()}</div><div class="a-w ${cls(h.pl)}">${pct(h.plpct)}</div></div>
    </div>`).join('');
}

function renderVega(){
  const n=DATA.vega;
  // การ์ด Portfolio Value ใหญ่ (สไตล์หน้า Overview) — balance + Today/High/Low + toggle benchmark
  const cur=N_TL[N_TL.length-1].total, start=N_TL[0].total, chgPct=(cur-start)/start*100;
  const totals=N_TL.map(x=>x.total), hi=Math.max(...totals), lo=Math.min(...totals);
  const today=N_TL[N_TL.length-1].change, todayPct=today/(cur-today)*100;
  const benchName=vegaBench==='spx'?'S&P 500':vegaBench==='nasdaq'?'Nasdaq':'';
  const pfLeg=vegaBench?`<div class="pf-leg"><span class="it"><span class="sw" style="border-color:#7c4dff"></span>AI Port</span><span class="it"><span class="sw dash" style="border-color:#8a919e"></span>${benchName}</span></div>`:'';
  const pfCard=`<div class="card pf-card vega-pf">
    <div class="pf-lbl">Portfolio Value</div>
    <div class="pf-balrow"><span class="pf-bal">$${cur.toLocaleString()}</span>
      <span class="pf-chg ${cls(chgPct)}">${chgPct>=0?'▲':'▼'} ${pct(chgPct)}<span class="pf-chg-sub">since start</span></span></div>
    <div class="pf-sub2">Started at $${start.toLocaleString()} → Now $${cur.toLocaleString()}</div>
    <div class="pf-stats">
      <div class="pf-stat">Today <b class="${cls(today)}">${today>=0?'+':''}$${Math.abs(today).toLocaleString()}</b> <span class="${cls(today)}">(${pct(todayPct)})</span></div>
      <div class="pf-stat-right">
        <span>High <b class="pf-hi">$${hi.toLocaleString()}</b></span>
        <span>Low <b class="pf-lo">$${lo.toLocaleString()}</b></span>
      </div>
    </div>
    <span class="seg pf-seg">
      <button class="${vegaBench===null?'on':''}" onclick="setVegaBench(null)">AI Port</button>
      <button class="${vegaBench==='spx'?'on':''}" onclick="setVegaBench('spx')">S&P 500</button>
      <button class="${vegaBench==='nasdaq'?'on':''}" onclick="setVegaBench('nasdaq')">Nasdaq</button>
    </span>
    ${pfLeg}
    <div class="pf-grid"><canvas id="vegaPortfolioLine"></canvas></div>
  </div>`;

  // เกือบซื้อ
  const miss=n.nearMiss.map(m=>`<div class="nm-card" onclick="openVegaMiss('${m.tk}')">
    <div class="nm-top">
      <div class="nm-av">${esc(m.tk.slice(0,2))}</div>
      <div class="nm-hd"><span class="nm-tk2">${esc(m.tk)}</span><span class="nm-nm">${esc(m.name)}</span></div>
      <span class="nm-px">${esc(m.refPrice)}</span>
    </div>
    <div class="nm-why">${esc(m.why)}</div></div>`).join('');

  // ปิดสถานะแล้ว
  const closed=n.closed.map(c=>{ const pl=(c.exit-c.avg)/c.avg*100;
    return `<div class="nv-closed" onclick="openVegaClosed('${c.tk}')">
      <div class="nvc-l"><div class="nvc-tk">${c.tk} <span>${esc(c.name)}</span></div>
        <div class="nvc-px">Buy $${c.avg.toFixed(2)} → Sell $${c.exit.toFixed(2)} · ${esc(c.opened)}–${esc(c.closed)}</div></div>
      <div class="nvc-r"><span class="chip ${cls(pl)}">${pct(pl)}</span><span class="go">›</span></div></div>`; }).join('');

  // Latest Activity — รวมเทรดทั้งหมด (holdings + closed) เรียงใหม่→เก่า โชว์ 5 ล่าสุด ว่า Vega เพิ่งทำอะไร
  const activity=[...NH.flatMap(h=>h.trades.map(t=>({...t,tk:h.tk}))), ...n.closed.flatMap(c=>c.trades.map(t=>({...t,tk:c.tk})))]
    .sort((a,b)=>thaiTs(b.date)-thaiTs(a.date)).slice(0,5);
  const actFeed=activity.map(t=>{ const buy=t.t.includes('ซื้อ');
    return `<div class="cb-row"><div class="cb-row-ic ${buy?'buy':'sell'}">${buy?'↑':'↓'}</div>
      <div class="cb-row-body"><div class="cb-row-top"><span class="cb-tk">${t.tk}</span><span class="cb-chip ${buy?'buy':'sell'}">${buy?'Buy':'Sell'}</span><span class="cb-dt">${esc(t.date)}</span></div>
      <div class="cb-row-why">${esc(t.t)} — ${esc(t.why)}</div></div></div>`; }).join('');

  document.getElementById('t-vega').innerHTML = `
    <div class="kpis">
      <div class="card kpi"><div class="lbl">Portfolio Value</div><div class="val">$${Math.round(N_TOTAL).toLocaleString()}</div><div class="sub">${thb(N_TOTAL)}</div></div>
      <div class="card kpi"><div class="lbl">Cost Basis</div><div class="val">$${Math.round(N_COST).toLocaleString()}</div><div class="sub">${thb(N_COST)}</div></div>
      <div class="card kpi"><div class="lbl">Total P/L</div><div class="val ${cls(N_PL)}">${N_PL>=0?'+$':'-$'}${Math.abs(Math.round(N_PL)).toLocaleString()}</div><div class="sub ${cls(N_PL)}">${pct(N_PLPCT)}</div></div>
    </div>

    <div class="sec-title">Holdings <span style="text-transform:none;font-weight:600;color:var(--dim)">${NH.length} positions + cash · tap for reason + thesis</span></div>
    <div class="grid2">
      <div class="card" style="padding:0;overflow:hidden">${N_HSORT.length?vegaAssetListHtml(N_HSORT):'<div class="co-empty" style="padding:30px 18px;text-align:center;line-height:1.7">ยังไม่เปิดสถานะ — เงินสดล้วน<br><span style="font-size:.78rem;color:var(--dim)">Vega จะสร้างพอร์ตเองด้วย research</span></div>'}</div>
      <div class="card chart-card">
        <div class="ch-head"><span class="ttl">Allocation</span></div>
        <div style="flex:1;min-height:0;display:flex;align-items:center;justify-content:center;padding-top:34px">
          <div style="position:relative;width:100%;height:280px"><canvas id="vegaDonut"></canvas></div>
        </div>
      </div>
    </div>

    ${pfCard}

    <div class="sec-title">Latest Activity <span style="text-transform:none;font-weight:600;color:var(--dim)">AI Port's recent moves</span></div>
    <div class="card nv-act-list">${actFeed}</div>

    <div class="sec-title">Almost Bought — Not Yet <span style="text-transform:none;font-weight:600;color:var(--dim)">${n.nearMiss.length} on radar</span></div>
    <div class="nm-grid">${miss}</div>

    <div class="sec-title">Closed Positions</div>
    <div class="nv-closed-list">${closed||'<div class="co-empty">No closed positions</div>'}</div>`;
  drawVegaDonut(); drawVegaPortfolio();
}
function setVegaBench(b){ vegaBench=b; renderVega(); }

// drawer: หุ้นที่ถืออยู่ — stat + เหตุผลซื้อ/ขาย + thesis break รายตัว
function openVegaHolding(tk){
  const h=NH.find(x=>x.tk===tk); if(!h) return;
  const k=h.kill;
  const trades=h.trades.slice().sort((a,b)=>thaiTs(b.date)-thaiTs(a.date))
    .map(t=>{const buy=t.t.includes('ซื้อ');return `<div class="cb-trade"><div class="t-top"><span class="cb-chip ${buy?'buy':'sell'}" style="margin-right:7px">${buy?'Buy':'Sell'}</span>${esc(t.t)} · ${esc(t.date)}</div><div class="t-why">${esc(t.why)}</div></div>`;}).join('');
  document.getElementById('mbox').innerHTML=`
    <div class="mbox-head">
      <div><div style="font-size:1.25rem;font-weight:800">${h.tk} <span style="font-weight:500;color:var(--dim);font-size:.8rem">${esc(h.name)}</span></div>
        <div style="margin-top:6px"><span class="chip ${cls(h.pl)}">${h.pl>=0?'▲':'▼'} ${pct(h.plpct)}</span> <span class="chip flat">${esc(h.sector)}</span></div></div>
      <button class="dr-close" onclick="closeAlloc()">✕</button>
    </div>
    <div class="cb-stats">
      <div class="cb-stat-row"><span class="k">Avg Cost (Buy)</span><span class="v">$${h.avg.toFixed(2)}</span></div>
      <div class="cb-stat-row"><span class="k">Current Price</span><span class="v">$${h.price.toFixed(2)} <span class="${cls(h.day)}" style="font-size:.72rem;margin-left:4px">${pct(h.day)}</span></span></div>
      <div class="cb-stat-row"><span class="k">Shares</span><span class="v">${h.shares}</span></div>
      <div class="cb-stat-row"><span class="k">Market Value</span><span class="v">$${Math.round(h.val).toLocaleString()}</span></div>
      <div class="cb-stat-row"><span class="k">Allocation</span><span class="v">${h.weight.toFixed(1)}%</span></div>
      <div class="cb-stat-row"><span class="k">Total Return</span><span class="v ${cls(h.pl)}">${h.pl>=0?'+$':'-$'}${Math.abs(Math.round(h.pl)).toLocaleString()} (${pct(h.plpct)})</span></div>
      <div class="cb-stat-row"><span class="k">Opened</span><span class="v" style="font-weight:600">${esc(h.opened)}</span></div>
    </div>
    <div class="dr-sec">Buy / Sell Reason</div>
    <div class="cb-list">${trades}</div>
    <div class="dr-sec">Thesis Break</div>
    <div class="tb-card"><span class="tb-ic">!</span><div class="tb-body"><div class="tb-k">ขายถ้า</div><div class="tb-v">${esc(k.thesis)}</div></div></div>`;
  document.getElementById('mov').classList.add('open');
}

function openVegaClosed(tk){
  const c=DATA.vega.closed.find(x=>x.tk===tk); if(!c) return;
  const pl=(c.exit-c.avg)/c.avg*100, plAbs=(c.exit-c.avg)*c.shares;
  const trades=c.trades.slice().sort((a,b)=>thaiTs(b.date)-thaiTs(a.date))
    .map(t=>{const buy=t.t.includes('ซื้อ');return `<div class="cb-trade"><div class="t-top"><span class="cb-chip ${buy?'buy':'sell'}" style="margin-right:7px">${buy?'Buy':'Sell'}</span>${esc(t.t)} · ${esc(t.date)}</div><div class="t-why">${esc(t.why)}</div></div>`;}).join('');
  document.getElementById('mbox').innerHTML=`
    <div class="mbox-head">
      <div><div style="font-size:1.25rem;font-weight:800">${c.tk} <span style="font-weight:500;color:var(--dim);font-size:.8rem">${esc(c.name)}</span></div>
        <div style="margin-top:6px"><span class="chip flat">Closed</span> <span class="chip ${cls(pl)}">${pct(pl)}</span></div></div>
      <button class="dr-close" onclick="closeAlloc()">✕</button>
    </div>
    <div class="cb-stats">
      <div class="cb-stat-row"><span class="k">Avg Buy</span><span class="v">$${c.avg.toFixed(2)}</span></div>
      <div class="cb-stat-row"><span class="k">Sell Price</span><span class="v">$${c.exit.toFixed(2)}</span></div>
      <div class="cb-stat-row"><span class="k">Shares</span><span class="v">${c.shares}</span></div>
      <div class="cb-stat-row"><span class="k">Result</span><span class="v ${cls(pl)}">${plAbs>=0?'+$':'-$'}${Math.abs(Math.round(plAbs)).toLocaleString()} (${pct(pl)})</span></div>
      <div class="cb-stat-row"><span class="k">Holding Period</span><span class="v" style="font-weight:600">${esc(c.opened)} – ${esc(c.closed)}</span></div>
    </div>
    <div class="dr-sec">Buy / Sell Reason</div>
    <div class="cb-list">${trades}</div>`;
  document.getElementById('mov').classList.add('open');
}

function openVegaMiss(tk){
  const m=DATA.vega.nearMiss.find(x=>x.tk===tk); if(!m) return;
  document.getElementById('mbox').innerHTML=`
    <div class="mbox-head">
      <div class="co-mhead">
        <div class="co-av co-av-lg" style="background:rgba(124,77,255,.1);color:#7c4dff">${esc(m.tk.slice(0,2))}</div>
        <div><div style="font-size:1.25rem;font-weight:800">${esc(m.tk)} <span style="font-weight:500;color:var(--dim);font-size:.8rem">${esc(m.name)}</span></div>
        <div style="margin-top:7px"><span class="chip flat">${esc(m.sector)}</span> <span class="chip flat">Not Yet · ${esc(m.refPrice)}</span></div></div>
      </div>
      <button class="dr-close" onclick="closeAlloc()">✕</button>
    </div>
    <div class="dr-sec">Why Interested</div>
    <div class="co-about-full">${esc(m.why)}</div>
    <div class="dr-sec">Blocker</div>
    <div class="co-about-full">${esc(m.blocker)}</div>
    <div class="dr-sec">Entry Trigger</div>
    <div class="co-about-full">${esc(m.trigger)}</div>
    <div class="ks-note" style="margin-top:18px">Reviewed ${esc(m.date)} — still on radar, no position opened</div>`;
  document.getElementById('mov').classList.add('open');
}

/* ---------- THESIS ---------- */
function renderThesis(){
  document.getElementById('t-thesis').innerHTML = `
    <div class="sec-title">Thesis ของคุณ — มุมมองเบื้องหลังการลงทุน</div>
    ${DATA.thesis.map((t,i)=>{
      const tks=thesisTickers(t.cat);
      const chips=tks.length?`<div class="th-tks">${tks.map(tk=>`<span class="th-tk" onclick="event.stopPropagation();openCompany('${tk}')">${esc(tk)}</span>`).join('')}</div>`:'';
      return `<div class="th-row" onclick="openThesis(${i})"><span class="th-cat">${esc(t.cat)}</span><div><div class="th-t">${esc(t.t)}</div><div class="th-m">${esc(t.sum)}</div>${chips}</div><span class="go">›</span></div>`;
    }).join('')}`;
}
// ticker ที่ผูก thesisRef กับ thesis cat นี้ (holdings + companies) — ใช้ทำ link กลับจากหน้า Thesis ไปการ์ดบริษัท
function thesisTickers(cat){
  const out=[];
  H.forEach(h=>{ if(h.thesisRef===cat) out.push(h.tk); });
  (DATA.companies||[]).forEach(c=>{ if(c.thesisRef===cat && !out.includes(c.tk)) out.push(c.tk); });
  return out;
}

/* ---------- COMPANY ---------- */
// รวมข้อมูลทุกบริษัทจาก 3 แหล่ง: holdings (ถืออยู่), market.holdings_news (ข่าว Vega-only), companies (ขายแล้ว/Vega)
function companyRegistry(){
  const vegaSet=new Set(DATA.arena.vega.hold.map(([tk])=>tk));
  const youSet=new Set(H.map(h=>h.tk));
  const extra=DATA.companies||[];
  // ข่าวต่อ ticker — รวมทุกแหล่ง ไม่ซ้ำซ้อน
  const newsByTk={};
  const pushNews=(tk,arr)=>{ if(arr&&arr.length){(newsByTk[tk]=newsByTk[tk]||[]).push(...arr);} };
  H.forEach(h=>pushNews(h.tk,h.news));
  DATA.market.holdings_news.forEach(n=>pushNews(n.tk,[n]));
  extra.forEach(c=>pushNews(c.tk,c.news));
  Object.values(newsByTk).forEach(a=>a.sort((x,y)=>thaiTs(y.date)-thaiTs(x.date)));
  // เทรดของคุณ — จาก holdings เท่านั้น
  const youTradesByTk={};
  H.forEach(h=>{ youTradesByTk[h.tk]=[...(h.trades||[])]; });
  // เทรดของ Vega — หลักจาก arena.moves (tag tk), fallback companies.trades สำหรับ vega/sold ที่ไม่มีใน moves
  const vegaTradesByTk={};
  DATA.arena.moves.forEach(m=>{ if(m.tk){ (vegaTradesByTk[m.tk]=vegaTradesByTk[m.tk]||[]).push({date:m.date, t:m.act, why:m.why}); } });
  extra.forEach(c=>{ if((c.status==='vega'||c.status==='sold') && c.trades && c.trades.length && !vegaTradesByTk[c.tk]) vegaTradesByTk[c.tk]=[...c.trades]; });
  [youTradesByTk, vegaTradesByTk].forEach(map=>Object.values(map).forEach(a=>a.sort((x,y)=>thaiTs(y.date)-thaiTs(x.date))));
  // รายชื่อบริษัท: ถืออยู่ก่อน แล้วตามด้วย companies
  const list=[];
  const meta=o=>({exchange:o.exchange,country:o.country,founded:o.founded,web:o.web});
  H.forEach(h=>list.push({tk:h.tk,name:h.name,sector:h.sector,about:h.about,thesisRef:h.thesisRef,...meta(h)}));
  extra.forEach(c=>list.push({tk:c.tk,name:c.name,sector:c.sector,about:c.about,soldNote:c.soldNote,thesisRef:c.thesisRef,...meta(c)}));
  const soldSet=new Set(extra.filter(c=>c.status==='sold').map(c=>c.tk));
  const watchSet=new Set(extra.filter(c=>c.status==='watch').map(c=>c.tk));
  return {list,newsByTk,youTradesByTk,vegaTradesByTk,vegaSet,youSet,soldSet,watchSet};
}
let _coReg=null;
function coBadges(tk,R){
  const b=[];
  if(R.youSet.has(tk)) b.push('<span class="co-badge you">YOU</span>');
  if(R.vegaSet.has(tk)) b.push('<span class="co-badge vega">AI Port</span>');
  if(R.watchSet.has(tk)) b.push('<span class="co-badge watch">WATCHING</span>');
  if(R.soldSet.has(tk)) b.push('<span class="co-badge sold">SOLD</span>');
  return b.join('');
}
let _coSearch='';
function renderCompany(){
  const R=_coReg=companyRegistry();
  document.getElementById('t-company').innerHTML=
    `<div class="sec-title">All Company <span style="text-transform:none;font-weight:600;color:var(--dim)">${R.list.length} companies</span></div>
     <div class="co-search">
       <svg class="co-search-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"></circle><line x1="20" y1="20" x2="16.65" y2="16.65"></line></svg>
       <input class="co-searchin" id="coSearch" placeholder="Search ticker or company name" oninput="coSearch(this.value)" value="${esc(_coSearch)}">
     </div>
     <div id="coList"></div>`;
  _renderCoList();
}
function coSearch(v){ _coSearch=v; _renderCoList(); }
// สีไอคอนกลม (avatar) ไล่ตามสถานะถือ: ถืออยู่ > Vega > กำลังดู > ขายแล้ว
function coAvClass(tk,R){
  if(R.youSet.has(tk)) return 'co-av-you';
  if(R.vegaSet.has(tk)) return 'co-av-vega';
  if(R.watchSet.has(tk)) return 'co-av-watch';
  if(R.soldSet.has(tk)) return 'co-av-sold';
  return 'co-av-none';
}
// การ์ดบริษัทในกริด แนว Coinbase: ไอคอนกลม + ticker/ชื่อ + คำอธิบายสั้น (3 บรรทัด) + sector ด้านล่าง
function coCardHtml(c,R){
  return `<div class="co-card" onclick="openCompany('${c.tk}')">
    <div class="co-top">
      <div class="co-av ${coAvClass(c.tk,R)}">${esc(c.tk.slice(0,2))}</div>
      <div class="co-head"><span class="co-tk">${esc(c.tk)}</span><span class="co-name">${esc(c.name)}</span></div>
    </div>
    <div class="co-about">${esc(c.about||'—')}</div>
    <div class="co-foot">${esc(c.sector||'')}<span class="co-go">›</span></div>
  </div>`;
}
function _renderCoList(){
  const R=_coReg||companyRegistry();
  const q=_coSearch.trim().toLowerCase();
  const filtered=R.list.filter(c=>
    !q || c.tk.toLowerCase().includes(q) || String(c.name||'').toLowerCase().includes(q)
  );
  const html=filtered.length?`<div class="co-grid">${filtered.map(c=>coCardHtml(c,R)).join('')}</div>`:'';
  document.getElementById('coList').innerHTML = html || '<div class="co-empty" style="padding:26px;text-align:center">No companies match your search</div>';
}
// สถิติฝั่ง Vega ของ ticker — derive จาก น้ำหนัก×มูลค่าพอร์ต Vega; ต้นทุน(avg) มาจาก hold[2] ถ้ามี (เฉพาะตัวที่มีราคาจริง)
function vegaStat(tk, price){
  const e=DATA.arena.vega.hold.find(([t])=>t===tk);
  if(!e) return null;
  const w=e[1], avg=(e[2]!=null?e[2]:null);
  const mv=DATA.arena.vega.val*w/100;
  const shares=price?mv/price:null;
  const ret=(avg!=null&&price)?(price-avg)/avg*100:null;
  return {w, avg, mv, shares, ret};
}
let _coTk=null, _coNwLim=3, _coTab='overview';
function openCompany(tk){ _coTk=tk; _coNwLim=3; _coTab='overview'; _renderCompanyDrawer(); }
function coTab(t){ _coTab=t; _renderCompanyDrawer(); }
function coNwMore(){ _coNwLim=Infinity; _renderCompanyDrawer(); }
function coNwLess(){ _coNwLim=3; _renderCompanyDrawer(); }
function _renderCompanyDrawer(){
  const R=_coReg||companyRegistry();
  const c=R.list.find(x=>x.tk===_coTk); if(!c) return;
  const allNw=R.newsByTk[_coTk]||[];
  const newsHtml=allNw.length
    ?allNw.slice(0,_coNwLim).map(n=>`<div class="cb-news"><div class="n-head">${esc(n.head)}</div>${n.sum?`<div class="n-sum">${esc(n.sum)}</div>`:''}<div class="n-foot">${esc(n.src)} · ${esc(n.date)}${n.move?` <span class="chip ${n.move.pct>=0?'up':'down'}" style="margin-left:6px">${n.move.pct>=0?'+':''}${n.move.pct}%</span>`:''}</div></div>`).join('')
    :'<div class="co-empty">No news yet</div>';
  const nwBtn=allNw.length>3?(_coNwLim===Infinity?`<button class="cb-more-btn collapse" onclick="coNwLess()">Show less</button>`:`<button class="cb-more-btn" onclick="coNwMore()">Show more</button>`):'';
  const nwCap=(allNw.length>3&&_coNwLim!==Infinity)?'Latest 3':'All news';
  const thIdx=c.thesisRef?DATA.thesis.findIndex(t=>t.cat===c.thesisRef):-1;
  const thesisHtml=thIdx>=0
    ?`<div class="dr-sec">Related Thesis</div>
      <div class="th-row" onclick="openThesis(${thIdx})"><span class="th-cat">${esc(DATA.thesis[thIdx].cat)}</span><div><div class="th-t">${esc(DATA.thesis[thIdx].t)}</div><div class="th-m">${esc(DATA.thesis[thIdx].sum)}</div></div><span class="go">›</span></div>`
    :'';
  // แถบข้อมูลบริษัท — โชว์เฉพาะ field ที่มี (sector อยู่บน chip หัวแล้ว ไม่ซ้ำ)
  const fact=(k,v)=>v?`<div class="co-fact"><span class="cf-k">${k}</span><span class="cf-v">${esc(String(v))}</span></div>`:'';
  const webFact=c.web?`<div class="co-fact"><span class="cf-k">Website</span><a class="cf-v cf-link" href="https://${esc(c.web)}" target="_blank" rel="noopener">${esc(c.web)}</a></div>`:'';
  const factsArr=[fact('Exchange',c.exchange),fact('Country',c.country),fact('Founded',c.founded),webFact].filter(Boolean);
  const factsHtml=factsArr.length?`<div class="co-facts">${factsArr.join('')}</div>`:'';
  // เนื้อหาแต่ละแท็บ
  const overviewBody = `${factsHtml}
    <div class="dr-sec">About</div>
    <div class="co-about-full">${esc(c.about||'—')}</div>
    ${c.soldNote?`<div class="co-soldnote">${esc(c.soldNote)}</div>`:''}
    ${thesisHtml}`;
  const newsBody = `${newsHtml}${nwBtn}`;
  const body = _coTab==='news'?newsBody : overviewBody;
  const tab=(k,label,n)=>`<button class="mtab ${_coTab===k?'on':''}" onclick="coTab('${k}')">${label}${n?`<span class="mtab-c">${n}</span>`:''}</button>`;
  document.getElementById('mbox').innerHTML=`
    <div class="mbox-head">
      <div class="co-mhead">
        <div class="co-av co-av-lg ${coAvClass(c.tk,R)}">${esc(c.tk.slice(0,2))}</div>
        <div><div style="font-size:1.25rem;font-weight:800">${esc(c.tk)} <span style="font-weight:500;color:var(--dim);font-size:.8rem">${esc(c.name)}</span></div>
        <div class="co-badges" style="margin-top:7px"><span class="chip flat">${esc(c.sector)}</span></div></div>
      </div>
      <button class="dr-close" onclick="closeAlloc()">✕</button>
    </div>
    <div class="mtabs">
      ${tab('overview','Overview',0)}
      ${tab('news','News',allNw.length)}
    </div>
    <div class="mtab-body">${body}</div>`;
  document.getElementById('mov').classList.add('open');
}

/* ---------- DRAWER ---------- */
let _holdTk=null, _holdLim=3;
function openHolding(tk){ _holdTk=tk; _holdLim=3; _renderHolding(); }
function holdMore(){ _holdLim=Infinity; _renderHolding(); }
function holdLess(){ _holdLim=3; _renderHolding(); }
function _renderHolding(){
  const h=H.find(x=>x.tk===_holdTk);
  // news: last 7 days only (full history lives on the Company page)
  const wk=Date.now()-7*86400000;
  const recent=h.news.filter(n=>thaiTs(n.date)>=wk);
  const news=recent.length
    ?recent.map(n=>`<div class="cb-news"><div class="n-head">${esc(n.head)}</div><div class="n-foot">${esc(n.src)} · ${esc(n.date)}${n.move?` <span class="chip ${n.move.pct>=0?'up':'down'}" style="margin-left:6px">${n.move.pct>=0?'+':''}${n.move.pct}%</span>`:''}</div></div>`).join('')
    :'<div class="co-empty">No news in the last 7 days</div>';
  // trade history: 3 first, expand on demand
  const shownTr=h.trades.slice(0,_holdLim);
  const trades=shownTr.map(t=>`<div class="cb-trade"><div class="t-top">${esc(t.t)} · ${esc(t.date)}</div><div class="t-why">${esc(t.why)}</div></div>`).join('');
  const capped=h.trades.length>3 && _holdLim!==Infinity;
  const trCap=capped?'Latest 3':'All trades';
  const trBtn=h.trades.length>3
    ?(_holdLim===Infinity?`<button class="cb-more-btn collapse" onclick="holdLess()">Show less</button>`:`<button class="cb-more-btn" onclick="holdMore()">Show more</button>`)
    :'';
  document.getElementById('mbox').innerHTML = `
    <div class="mbox-head">
      <div><div style="font-size:1.25rem;font-weight:800">${h.tk} <span style="font-weight:500;color:var(--dim);font-size:.8rem">${esc(h.name)}</span></div>
        <div style="margin-top:6px"><span class="chip ${cls(h.pl)}">${h.pl>=0?'▲':'▼'} ${pct(h.plpct)}</span> <span class="chip flat">${esc(h.sector)}</span></div></div>
      <button class="dr-close" onclick="closeAlloc()">✕</button>
    </div>
    <div class="cb-stats">
      <div class="cb-stat-row"><span class="k">Price</span><span class="v">$${h.price.toFixed(2)} <span class="${cls(h.day)}" style="font-size:.72rem;margin-left:4px">${pct(h.day)}</span></span></div>
      <div class="cb-stat-row"><span class="k">Market Value</span><span class="v">$${h.val.toFixed(2)}</span></div>
      <div class="cb-stat-row"><span class="k">Shares</span><span class="v">${h.shares}</span></div>
      <div class="cb-stat-row"><span class="k">Avg Cost</span><span class="v">$${h.avg.toFixed(2)}</span></div>
      <div class="cb-stat-row"><span class="k">Allocation</span><span class="v">${h.weight.toFixed(1)}%</span></div>
      <div class="cb-stat-row"><span class="k">Total Return</span><span class="v ${cls(h.pl)}">${h.pl>=0?'+$':'-$'}${Math.abs(h.pl).toFixed(2)} (${pct(h.plpct)})</span></div>
    </div>
    <div class="dr-sec">Trade History <span class="dr-sub">${trCap}</span></div>
    <div class="cb-list">${trades}</div>${trBtn}
    <div class="dr-sec">Recent News <span class="dr-sub">Last 7 days</span></div>
    ${news}`;
  document.getElementById('mov').classList.add('open');
}
function openThesis(i){
  const t=DATA.thesis[i];
  document.getElementById('mbox').innerHTML = `
    <div class="mbox-head"><div><span class="th-cat">${esc(t.cat)}</span><div style="font-size:1.15rem;font-weight:800;margin-top:7px">${esc(t.t)}</div><div class="th-m" style="font-size:.72rem;color:var(--dim);margin-top:3px">อัปเดต ${esc(t.updated)}</div></div><button class="dr-close" onclick="closeAlloc()">✕</button></div>
    <div style="font-size:.9rem;line-height:1.7;color:var(--text)">${nl2br(t.full)}</div>`;
  document.getElementById('mov').classList.add('open');
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
        tooltip:{backgroundColor:'#fff',titleColor:'#8a919e',bodyColor:'#0a0b0d',footerColor:'#5b616e',
          borderColor:'#d7dae0',borderWidth:1,
          padding:{top:9,right:13,bottom:9,left:13},cornerRadius:11,displayColors:false,
          titleFont:{size:11,weight:'500'},bodyFont:{size:14,weight:'700'},footerFont:{size:11,weight:'700'},
          callbacks:{label:it=>`${it.dataset.label}  $${Math.round(it.raw).toLocaleString()}`,
            labelTextColor:it=>it.dataset.borderColor,
            footer:its=>{if(benchSel)return'';const r=d[its[0].dataIndex];const s=r.change>=0?'+':'';
              return `${s}$${Math.round(r.change).toLocaleString()} that day`;}}}},
      scales:{
        x:{ticks:{color:'#5b616e',font:{size:11}},grid:{display:false},border:{display:false}},
        y:{min:Math.floor((mn-pd)/100)*100,max:Math.ceil((mx+pd)/100)*100,
          ticks:{color:'#8a919e',font:{size:10},maxTicksLimit:5,
            callback:v=>Math.abs(v)>=1000?'$'+(v/1000).toFixed(1)+'k':'$'+Math.round(v)},
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
// โดนัทฝั่งคุณ = holdings (ฟ้าไล่เฉด) + เงินสด (เทา) — เหมือนฝั่ง Vega
const Y_DONUT_LABELS=[...allocSorted.map(h=>h.tk),'Cash'];
const Y_DONUT_VALS=[...allocSorted.map(h=>h.val), YOUR_CASH];
const Y_DONUT_COLORS=[...allocColors,'#c7ccd6'];
const _donutCenter={id:'donutCenter',afterDraw(chart){
  const act=chart.getActiveElements(); if(!act.length) return;
  const {ctx,chartArea:{left,top,width,height}}=chart;
  const idx=act[0].index;
  const label=chart.data.labels[idx];
  const val=chart.data.datasets[0].data[idx];
  const total=chart.data.datasets[0].data.reduce((a,b)=>a+b,0);
  const p=(val/total*100).toFixed(1)+'%';
  const cx=left+width/2, cy=top+height/2;
  ctx.save(); ctx.textAlign='center'; ctx.textBaseline='middle';
  ctx.font='800 22px Inter'; ctx.fillStyle='#0a0b0d'; ctx.fillText(p,cx,cy-9);
  ctx.font='600 12px Inter'; ctx.fillStyle='#8a919e'; ctx.fillText(label,cx,cy+13);
  ctx.restore();
}};
function drawDonut(){
  new Chart(document.getElementById('donut'),{type:'doughnut',
    plugins:[_donutCenter],
    data:{labels:Y_DONUT_LABELS, datasets:[{data:Y_DONUT_VALS, backgroundColor:Y_DONUT_COLORS, borderWidth:3, borderColor:'#fff'}]},
    options:{responsive:true,maintainAspectRatio:false,cutout:'66%',layout:{padding:{bottom:6}},
      plugins:{legend:{display:true,position:'bottom',labels:{color:'#5b616e',font:{size:10},padding:22,usePointStyle:true,pointStyle:'circle',boxWidth:7}}}
    }
  });
}
let allocChart=null;
function openAlloc(){
  const cashW=PF_VALUE?YOUR_CASH/PF_VALUE*100:0;
  const legend=allocSorted.map((h,i)=>`<div class="a-row"><span class="sw" style="background:${allocColors[i]}"></span><span class="a-tk">${h.tk}</span><span class="a-nm">${esc(h.name)}</span><span class="a-w">${h.weight.toFixed(1)}%</span><span class="a-v">$${Math.round(h.val).toLocaleString()}</span></div>`).join('')
    +`<div class="a-row"><span class="sw" style="background:#c7ccd6"></span><span class="a-tk">Cash</span><span class="a-nm">เงินสดรอลงทุน</span><span class="a-w">${cashW.toFixed(1)}%</span><span class="a-v">$${YOUR_CASH.toFixed(2)}</span></div>`;
  document.getElementById('mbox').innerHTML=`
    <div class="mbox-head"><span class="t">สัดส่วนพอร์ต · ${allocSorted.length} ตัว + เงินสด</span><button class="dr-close" onclick="closeAlloc()">✕</button></div>
    <div class="alloc-chart"><canvas id="allocCanvas"></canvas></div>
    <div class="alloc-list">${legend}</div>`;
  document.getElementById('mov').classList.add('open');
  if(allocChart) allocChart.destroy();
  allocChart=new Chart(document.getElementById('allocCanvas'),{type:'doughnut',
    data:{labels:Y_DONUT_LABELS, datasets:[{data:Y_DONUT_VALS, backgroundColor:Y_DONUT_COLORS, borderWidth:3, borderColor:'#fff'}]},
    options:{responsive:true,maintainAspectRatio:false,cutout:'58%',
      plugins:{legend:{display:false}, tooltip:{callbacks:{label:c=>` ${c.label}: ${c.parsed.toLocaleString(undefined,{maximumFractionDigits:0})} USD`}}}}});
}
function closeAlloc(){ document.getElementById('mov').classList.remove('open'); }
// donut สัดส่วนพอร์ต Vega (holdings ม่วง + เงินสดเทา) — ใช้ center label ร่วมกับ Overview
function drawVegaDonut(){
  new Chart(document.getElementById('vegaDonut'),{type:'doughnut',
    plugins:[_donutCenter],
    data:{labels:N_DONUT_LABELS, datasets:[{data:N_DONUT_VALS, backgroundColor:N_DONUT_COLORS, borderWidth:3, borderColor:'#fff'}]},
    options:{responsive:true,maintainAspectRatio:false,cutout:'66%',layout:{padding:{bottom:6}},
      plugins:{legend:{display:true,position:'bottom',labels:{color:'#5b616e',font:{size:10},padding:22,usePointStyle:true,pointStyle:'circle',boxWidth:7}}}
    }});
}
// การ์ด Portfolio Value ใหญ่ของ Vega (เลียนแบบ drawPortfolio ของ Overview แต่เส้นม่วง)
function drawVegaPortfolio(){
  const d=N_TL, start=d[0].total, totals=d.map(x=>x.total);
  const hi=Math.max(...totals), lo=Math.min(...totals);
  const dotR=c=>{const i=c.dataIndex,v=totals[i]; return (i===totals.length-1||v===hi||v===lo)?5:0;};
  const ds=[{label:'AI Port',data:totals,
      borderColor:'#7c4dff',borderWidth:2.5,fill:false,tension:.4,
      pointRadius:dotR,pointHoverRadius:6,
      pointBackgroundColor:'#7c4dff',pointBorderColor:'#fff',pointBorderWidth:2}];
  const vals=[...totals];
  if(vegaBench){
    const series=vegaBench==='spx'?DATA.vega.spx:DATA.bench.nasdaq;
    const name=vegaBench==='spx'?'S&P 500':'Nasdaq';
    const bdata=series.map(p=>Math.round(start*(1+p/100)));
    vals.push(...bdata);
    ds.push({label:name,data:bdata,borderColor:'#8a919e',borderDash:[5,4],fill:false,tension:.4,pointRadius:0,borderWidth:2});
  }
  const mn=Math.min(...vals), mx=Math.max(...vals), pd=Math.max((mx-mn)*0.28,300);
  const vegaPfGlow={id:'vegaPfGlow',
    beforeDatasetDraw(c,a){ if(a.index!==0)return; const x=c.ctx; x.save();
      x.shadowColor='rgba(124,77,255,.40)'; x.shadowBlur=16; x.shadowOffsetX=0; x.shadowOffsetY=6; },
    afterDatasetDraw(c,a){ if(a.index!==0)return; c.ctx.restore(); }};
  new Chart(document.getElementById('vegaPortfolioLine'),{type:'line',
    data:{labels:d.map(x=>x.date),datasets:ds},
    plugins:[vegaPfGlow,_pfCursor],
    options:{responsive:true,maintainAspectRatio:false,
      layout:{padding:{top:10}},
      interaction:{mode:'index',intersect:false},
      plugins:{legend:{display:false},
        tooltip:{backgroundColor:'#fff',titleColor:'#8a919e',bodyColor:'#0a0b0d',footerColor:'#5b616e',
          borderColor:'#d7dae0',borderWidth:1,
          padding:{top:9,right:13,bottom:9,left:13},cornerRadius:11,displayColors:false,
          titleFont:{size:11,weight:'500'},bodyFont:{size:14,weight:'700'},footerFont:{size:11,weight:'700'},
          callbacks:{label:it=>`${it.dataset.label}  $${Math.round(it.raw).toLocaleString()}`,
            labelTextColor:it=>it.dataset.borderColor,
            footer:its=>{if(vegaBench)return'';const r=d[its[0].dataIndex];const s=r.change>=0?'+':'';
              return `${s}$${Math.round(r.change).toLocaleString()} that day`;}}}},
      scales:{
        x:{ticks:{color:'#5b616e',font:{size:11}},grid:{display:false},border:{display:false}},
        y:{min:Math.floor((mn-pd)/100)*100,max:Math.ceil((mx+pd)/100)*100,
          ticks:{color:'#8a919e',font:{size:10},maxTicksLimit:5,
            callback:v=>Math.abs(v)>=1000?'$'+(v/1000).toFixed(1)+'k':'$'+Math.round(v)},
          grid:{display:false},border:{display:false}}}}});
}

/* ---------- tabs ---------- */
const RENDER={overview:renderOverview,company:renderCompany,log:renderLog,market:renderMarket,vega:renderVega,thesis:renderThesis};
function sw(name,btn){
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c=>c.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('t-'+name).classList.add('active');
  RENDER[name]();
}
renderOverview();

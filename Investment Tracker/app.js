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
/* ---------- LOG state & helpers (module-level) ---------- */
let logF={type:'all',period:'all',lim:3};

function _lTrade(t){const buy=t.t.includes('ซื้อ');
  return `<div class="cb-row"><div class="cb-row-ic ${buy?'buy':'sell'}">${buy?'↑':'↓'}</div><div class="cb-row-body"><div class="cb-row-top"><span class="cb-tk">${t.tk}</span><span class="cb-chip ${buy?'buy':'sell'}">${esc(t.t.replace('ซื้อ','Buy').replace('ขาย','Sell'))}</span><span class="cb-dt">${esc(t.date)}</span></div><div class="cb-row-why">${esc(t.why)}</div></div></div>`;}
function _lMove(m){const buy=m.act.includes('▲');
  return `<div class="cb-row"><div class="cb-row-ic ${buy?'buy':'sell'}">${buy?'↑':'↓'}</div><div class="cb-row-body"><div class="cb-row-top"><span class="cb-chip ${buy?'buy':'sell'}">${esc(m.act)}</span><span class="cb-dt">${esc(m.date)}</span></div><div class="cb-row-why">${esc(m.why)}</div></div></div>`;}

function _lFilter(list,isMoves){
  const allTs=H.flatMap(h=>h.trades).map(t=>thaiTs(t.date)).concat(DATA.arena.moves.map(m=>thaiTs(m.date)));
  const maxTs=Math.max(...allTs);
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
  const novaAll=[...DATA.arena.moves].sort((a,b)=>thaiTs(b.date)-thaiTs(a.date));
  const yF=_lFilter(youAll,false), nF=_lFilter(novaAll,true);

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
    rows+=cell(yShown[i],_lTrade,yShown.length,'you',i)+cell(nShown[i],_lMove,nShown.length,'nova',i);
  }

  document.getElementById('log-feeds-wrapper').innerHTML=
    `<div class="log-feed-grid">`+
      `<div class="lfg-hd you-c"><span class="lf-name">You</span><span class="lf-cnt">${yF.length} trades</span></div>`+
      `<div class="lfg-hd nova-c"><span class="lf-name">NOVA</span><span class="lf-cnt">${nF.length} moves</span></div>`+
      rows+
      `<div class="lfg-foot you-c">${footBtn(yF)}</div>`+
      `<div class="lfg-foot nova-c">${footBtn(nF)}</div>`+
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
  const who=col==='you'?'You':'NOVA';
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
function expandJr(){logJr=true;renderJrSection('you');renderJrSection('nova');}
function collapseJr(){logJr=false;renderJrSection('you');renderJrSection('nova');}

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
      ${colTop('You','you','YOU','+3.8%','$83,048')}
      ${colTop('NOVA (AI)','nova','AI','+1.9%','$81,520')}
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
  renderJrSection('nova');
  renderLogFeeds();
}

/* ---------- HOLDINGS NEWS ---------- */
let hnFilter='all', hnPeriod='all', hnLim=4;
function setHnFilter(v){hnFilter=v;hnLim=4;renderHoldingsNews();}
function setHnPeriod(v){hnPeriod=v;hnLim=4;renderHoldingsNews();}
function loadMoreHn(){hnLim=Infinity;renderHoldingsNews();}
function collapseHn(){hnLim=4;renderHoldingsNews();}
function renderHoldingsNews(){
  const novaSet=new Set(DATA.arena.nova.hold.map(([tk])=>tk));
  const youSet=new Set(H.map(h=>h.tk));
  const all=[...H.flatMap(h=>h.news.map(n=>({...n,tk:h.tk}))),...DATA.market.holdings_news];
  all.forEach((n,i)=>n._i=i);

  const nowTs=Date.now();
  const cutoffMap={'all':-Infinity,'1m':nowTs-30*86400000,'3m':nowTs-90*86400000,
    'ytd':new Date(new Date().getFullYear(),0,1).getTime(),'1y':nowTs-365*86400000,'5y':nowTs-5*365*86400000};
  const cutoff=cutoffMap[hnPeriod]??-Infinity;

  const byOwner=hnFilter==='you'?all.filter(n=>youSet.has(n.tk)):hnFilter==='nova'?all.filter(n=>novaSet.has(n.tk)):all;
  const filtered=byOwner.filter(n=>thaiTs(n.date)>=cutoff);
  const shown=filtered.slice(0,hnLim);

  const badge=tk=>{const y=youSet.has(tk),n=novaSet.has(tk);
    return y&&n?`<span class="hn-who both">You &amp; NOVA</span>`:y?`<span class="hn-who you">You</span>`:`<span class="hn-who nova">NOVA</span>`;};
  const cnt=v=>{const arr=(v==='you'?all.filter(n=>youSet.has(n.tk)):v==='nova'?all.filter(n=>novaSet.has(n.tk)):all).filter(n=>thaiTs(n.date)>=cutoff);
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
    `<button class="${hnFilter==='nova'?'on':''}" onclick="setHnFilter('nova')">NOVA ${cnt('nova')}</button>`+
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
      <div class="mk-idx-since">ตั้งแต่ 10 พ.ค. <b class="${cls(i.ret)}">${pct(i.ret)}</b></div>
    </div>`;
  }).join('');

  const maxAbs=Math.max(...m.sectors.map(s=>Math.abs(s.v)));
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

  // news — ชิ้นแรกเด่นเต็มแถว ที่เหลือ grid 2 คอลัมน์
  const tagCls=t=>{const k=String(t).toLowerCase();
    if(k.includes('ai')||k.includes('semi'))return 'ai';
    if(k.includes('energy'))return 'energy';
    if(k.includes('earn'))return 'earn';
    return 'macro';};
  const newsCard=(n,feat)=>`<div class="mk-news${feat?' feat':''}">
    <span class="mk-news-tag ${tagCls(n.tag)}">${esc(n.tag)}</span>
    <div class="mk-news-head">${esc(n.head)}</div>
    <div class="mk-news-sum">${esc(n.sum)}</div>
    <div class="mk-news-foot"><span class="mk-news-src">${esc(n.src)}</span><span class="mk-dot">·</span>${esc(n.date)}<span class="mk-news-mock">mock</span></div>
  </div>`;
  const news=newsCard(m.news[0],true)+`<div class="mk-news-grid">${m.news.slice(1).map(n=>newsCard(n,false)).join('')}</div>`;

  document.getElementById('t-market').innerHTML = `
    <div class="sec-title">Market Overview</div>
    <div class="mk-idx-grid">${idx}</div>

    <div class="sec-title">Sector Performance</div>
    <div class="mk-idx-grid mk-sec-grid">${sect}</div>

    <div class="sec-title">Holdings News</div>
    <div id="hn-section"></div>

    <div class="sec-title">Market News</div>
    ${news}`;
  renderHoldingsNews();
}

/* ---------- HN NEWS MODAL ---------- */
function openHnNews(i){
  const all=[...H.flatMap(h=>h.news.map(n=>({...n,tk:h.tk}))),...DATA.market.holdings_news];
  const n=all[i]; if(!n) return;
  const novaSet=new Set(DATA.arena.nova.hold.map(([tk])=>tk));
  const youSet=new Set(H.map(h=>h.tk));
  const y=youSet.has(n.tk), nv=novaSet.has(n.tk);
  const badge=y&&nv?`<span class="hn-who both">You &amp; NOVA</span>`:y?`<span class="hn-who you">You</span>`:`<span class="hn-who nova">NOVA</span>`;
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

/* ---------- COMPANY ---------- */
// รวมข้อมูลทุกบริษัทจาก 3 แหล่ง: holdings (ถืออยู่), market.holdings_news (ข่าว NOVA-only), companies (ขายแล้ว/NOVA)
function companyRegistry(){
  const novaSet=new Set(DATA.arena.nova.hold.map(([tk])=>tk));
  const youSet=new Set(H.map(h=>h.tk));
  const extra=DATA.companies||[];
  // ข่าวต่อ ticker — รวมทุกแหล่ง ไม่ซ้ำซ้อน
  const newsByTk={};
  const pushNews=(tk,arr)=>{ if(arr&&arr.length){(newsByTk[tk]=newsByTk[tk]||[]).push(...arr);} };
  H.forEach(h=>pushNews(h.tk,h.news));
  DATA.market.holdings_news.forEach(n=>pushNews(n.tk,[n]));
  extra.forEach(c=>pushNews(c.tk,c.news));
  Object.values(newsByTk).forEach(a=>a.sort((x,y)=>thaiTs(y.date)-thaiTs(x.date)));
  // เทรดต่อ ticker
  const tradesByTk={};
  H.forEach(h=>{ tradesByTk[h.tk]=[...(h.trades||[])]; });
  extra.forEach(c=>{ if(c.trades&&c.trades.length) tradesByTk[c.tk]=[...(tradesByTk[c.tk]||[]),...c.trades]; });
  Object.values(tradesByTk).forEach(a=>a.sort((x,y)=>thaiTs(y.date)-thaiTs(x.date)));
  // รายชื่อบริษัท: ถืออยู่ก่อน แล้วตามด้วย companies
  const list=[];
  H.forEach(h=>list.push({tk:h.tk,name:h.name,sector:h.sector,about:h.about}));
  extra.forEach(c=>list.push({tk:c.tk,name:c.name,sector:c.sector,about:c.about,soldNote:c.soldNote}));
  const soldSet=new Set(extra.filter(c=>c.status==='sold').map(c=>c.tk));
  return {list,newsByTk,tradesByTk,novaSet,youSet,soldSet};
}
let _coReg=null;
function coBadges(tk,R){
  const b=[];
  if(R.youSet.has(tk)) b.push('<span class="co-badge you">ถืออยู่</span>');
  if(R.novaSet.has(tk)) b.push('<span class="co-badge nova">NOVA</span>');
  if(R.soldSet.has(tk)) b.push('<span class="co-badge sold">ขายแล้ว</span>');
  return b.join('');
}
function renderCompany(){
  const R=_coReg=companyRegistry();
  const cards=R.list.map(c=>{
    const nT=(R.tradesByTk[c.tk]||[]).length, nN=(R.newsByTk[c.tk]||[]).length;
    return `<div class="co-card" onclick="openCompany('${c.tk}')">
      <div class="co-top"><span class="co-tk">${esc(c.tk)}</span><span class="co-name">${esc(c.name)}</span></div>
      <div class="co-badges"><span class="chip flat">${esc(c.sector)}</span>${coBadges(c.tk,R)}</div>
      <div class="co-about">${esc(c.about||'')}</div>
      <div class="co-foot"><span>${nT} เทรด</span><span class="mk-dot">·</span><span>${nN} ข่าว</span><span class="co-go">›</span></div>
    </div>`;
  }).join('');
  document.getElementById('t-company').innerHTML=
    `<div class="sec-title">Company — ทุกบริษัทที่เคยเกี่ยวข้อง <span style="text-transform:none;font-weight:600;color:var(--dim)">${R.list.length} บริษัท</span></div>
     <div class="co-grid">${cards}</div>`;
}
function openCompany(tk){
  const R=_coReg||companyRegistry();
  const c=R.list.find(x=>x.tk===tk); if(!c) return;
  const trades=R.tradesByTk[tk]||[], news=R.newsByTk[tk]||[];
  const tradesHtml=trades.length
    ?trades.map(t=>`<div class="trade"><div class="t-top">${esc(t.t)} · ${esc(t.date)}</div><div class="t-why">${esc(t.why)}</div></div>`).join('')
    :'<div class="co-empty">ยังไม่มีประวัติเทรด</div>';
  const newsHtml=news.length
    ?news.map(n=>`<div class="news"><div class="n-head">${esc(n.head)}</div>${n.sum?`<div class="n-sum">${esc(n.sum)}</div>`:''}<div class="n-foot">ที่มา: (mock) ${esc(n.src)} · ${esc(n.date)}${n.move?` <span class="chip ${n.move.pct>=0?'up':'down'}" style="margin-left:6px">${n.move.pct>=0?'+':''}${n.move.pct}%</span>`:''}</div></div>`).join('')
    :'<div class="co-empty">ยังไม่มีข่าว</div>';
  document.getElementById('drawer').innerHTML=`
    <div class="dr-head">
      <div><div style="font-size:1.25rem;font-weight:800">${esc(c.tk)} <span style="font-weight:500;color:var(--dim);font-size:.8rem">${esc(c.name)}</span></div>
      <div class="co-badges" style="margin-top:7px"><span class="chip flat">${esc(c.sector)}</span>${coBadges(c.tk,R)}</div></div>
      <button class="dr-close" onclick="closeDrawer()">✕</button>
    </div>
    <div class="dr-body">
      <div class="dr-sec">เกี่ยวกับบริษัท</div>
      <div style="font-size:.88rem;line-height:1.7;color:var(--text)">${esc(c.about||'—')}</div>
      ${c.soldNote?`<div class="co-soldnote">${esc(c.soldNote)}</div>`:''}
      <div class="dr-sec">ประวัติเทรด + เหตุผล <span class="acc-count">${trades.length}</span></div>
      ${tradesHtml}
      <div class="dr-sec">ประวัติข่าว <span class="acc-count">${news.length}</span></div>
      ${newsHtml}
    </div>`;
  document.getElementById('dov').classList.add('open');
}

/* ---------- DRAWER ---------- */
function openHolding(tk, showLog){
  const h=H.find(x=>x.tk===tk);
  // ข่าวเฉพาะ 7 วันล่าสุด (ประวัติเต็มดูที่หน้า Company)
  const wk=Date.now()-7*86400000;
  const recent=h.news.filter(n=>thaiTs(n.date)>=wk);
  const news=recent.length
    ?recent.map(n=>`<div class="cb-news"><div class="n-head">${esc(n.head)}</div><div class="n-foot">ที่มา: (mock) ${esc(n.src)} · ${esc(n.date)}${n.move?` <span class="chip ${n.move.pct>=0?'up':'down'}" style="margin-left:6px">${n.move.pct>=0?'+':''}${n.move.pct}%</span>`:''}</div></div>`).join('')
    :'<div class="co-empty">ไม่มีข่าวใน 7 วันล่าสุด</div>';
  const trades=h.trades.map(t=>`<div class="trade"><div class="t-top">${esc(t.t)} · ${esc(t.date)}</div><div class="t-why">${esc(t.why)}</div></div>`).join('');
  document.getElementById('mbox').innerHTML = `
    <div class="mbox-head">
      <div><div style="font-size:1.25rem;font-weight:800">${h.tk} <span style="font-weight:500;color:var(--dim);font-size:.8rem">${esc(h.name)}</span></div>
        <div style="margin-top:6px"><span class="chip ${cls(h.pl)}">${h.pl>=0?'▲':'▼'} ${pct(h.plpct)}</span> <span class="chip flat">${esc(h.sector)}</span></div></div>
      <button class="dr-close" onclick="closeAlloc()">✕</button>
    </div>
    <div class="cb-stats">
      <div class="cb-stat-row"><span class="k">ราคาปัจจุบัน</span><span class="v">$${h.price.toFixed(2)} <span class="${cls(h.day)}" style="font-size:.72rem;margin-left:4px">${pct(h.day)}</span></span></div>
      <div class="cb-stat-row"><span class="k">มูลค่าถือครอง</span><span class="v">$${h.val.toFixed(2)}</span></div>
      <div class="cb-stat-row"><span class="k">จำนวน</span><span class="v">${h.shares} หุ้น</span></div>
      <div class="cb-stat-row"><span class="k">ทุนเฉลี่ย</span><span class="v">$${h.avg.toFixed(2)}</span></div>
      <div class="cb-stat-row"><span class="k">น้ำหนักพอร์ต</span><span class="v">${h.weight.toFixed(1)}%</span></div>
      <div class="cb-stat-row"><span class="k">กำไร / ขาดทุน</span><span class="v ${cls(h.pl)}">${h.pl>=0?'+$':'-$'}${Math.abs(h.pl).toFixed(2)} (${pct(h.plpct)})</span></div>
    </div>
    <div class="dr-sec">ประวัติเทรด + เหตุผล <span class="acc-count">${h.trades.length}</span></div>
    ${trades}
    <div class="dr-sec">ข่าวล่าสุด <span class="acc-count">7 วัน</span></div>
    ${news}`;
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
            labelTextColor:it=>it.dataset.borderColor,
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
    data:{labels:allocSorted.map(h=>h.tk), datasets:[{data:allocSorted.map(h=>h.val), backgroundColor:allocColors, borderWidth:3, borderColor:'#fff'}]},
    options:{responsive:true,maintainAspectRatio:false,cutout:'66%',layout:{padding:{bottom:6}},
      plugins:{legend:{display:true,position:'bottom',labels:{color:'#5b616e',font:{size:10},padding:22,usePointStyle:true,pointStyle:'circle',boxWidth:7}}}
    }
  });
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
const RENDER={overview:renderOverview,company:renderCompany,log:renderLog,market:renderMarket,arena:renderArena,thesis:renderThesis};
function sw(name,btn){
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c=>c.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('t-'+name).classList.add('active');
  RENDER[name]();
}
renderOverview();

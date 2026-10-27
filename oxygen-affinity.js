import {ironReactionMarkup} from './iron-paired-reaction.js';
import {oxygenAffinitySeries,compareWithCarbon} from './forge-prep-model.js';

const specimenDescription={K:'油中保存的銀灰色鉀金屬塊',Na:'油中保存的銀白色鈉金屬塊',Ca:'封存於玻璃瓶內的銀灰色鈣金屬顆粒',Mg:'銀白色鎂帶',Al:'銀白色鋁箔',C:'深灰黑色、有層狀紋理的石墨',Zn:'帶藍灰色光澤的鋅金屬塊',Cr:'銀灰色、有晶面光澤的鉻金屬塊',Fe:'灰色鐵棒與鐵塊',Sn:'銀白色錫金屬塊',Pb:'暗藍灰色鉛金屬塊',H:'密閉玻璃瓶中的無色氫氣，氣體本身看不見',Cu:'紅棕色銅片與銅塊',Hg:'封閉玻璃容器中的銀白色液態汞',Ag:'銀白色銀金屬塊',Pt:'灰白色鉑金屬塊',Au:'金黃色金屬塊'};
export function specimenArt(symbol){return `<span class="element-specimen specimen-${symbol}" role="img" aria-label="${specimenDescription[symbol]}，外觀示意"></span>`;}

function comparisonCopy(symbol){
 const x=compareWithCarbon(symbol);
 const examples={
  Fe:['碳排在鐵前面，所以能幫鐵「脫氧」。','在合適高溫條件下，碳可使鐵的氧化物被還原。高爐裡，碳會先參與生成 CO，再由 CO 帶走鐵礦中的氧。'],
  Mg:['鎂排在碳前面，MgO 不容易把氧交給碳。','不能把「碳能還原鐵」套用到鎂。反過來，在合適條件下鎂能從 CO₂ 取得氧；下一張可以比較這個例子。'],
  Al:['鋁排在碳前面，不能照煉鐵的方法提煉鋁。','氧化鋁與氧的結合很穩定，提煉鋁通常採用電解。鋁表面的保護層也會影響看到的反應快慢。'],
  Cu:['碳排在銅前面，也能讓氧化銅失氧。','合適加熱條件下：2CuO + C → 2Cu + CO₂。這是活性表的另一個例子；03 會讓你比較六種材料能否還原氧化鐵。'],
  C:['碳是這次的比較基準。','碳是非金屬。它放在鋁與鋅之間，是為了判斷哪些金屬氧化物可考慮用碳還原，不是把碳當成金屬。'],
  H:['氫也用來比較，但氫不是金屬。','氫排在碳後面。這裡比較的是元素對氧的活性；不是把所有元素當成金屬，也不是用排名直接預測每一種反應。'],
  Cr:['碳排在鉻前面，但排名不是純金屬的保證。','高溫下可用碳還原鉻的氧化物，但也可能形成碳化物；實際產物還要看溫度、原料與反應條件。']
 };
 if(examples[symbol])return examples[symbol];
 if(x.relation==='greater')return [x.name+'比碳更容易與氧結合。','這類元素的氧化物通常較難把氧交給碳，不能直接套用煉鐵的方法。這是相對比較，仍要看具體氧化物與條件。'];
 if(['Hg','Ag','Pt','Au'].includes(symbol))return [x.name+'排在碳後面，對氧活性較小。','這裡只比較與氧結合的傾向，不表示提煉時一定要加碳；有些較不活潑金屬可呈元素態存在，冶煉方法取決於礦物。'];
 return [x.name+'排在碳後面，可考慮用碳還原其氧化物。','能否有效得到金屬，還要看氧化物種類、溫度與氣氛；排列不是反應速率，也不表示常溫混合就會反應。'];
}

export function affinityReference(symbol){
 const x=compareWithCarbon(symbol)||compareWithCarbon('Fe'),copy=comparisonCopy(x.symbol);
 const first=x.relation==='greater'?x:{symbol:'C',name:'碳'},last=x.relation==='greater'?{symbol:'C',name:'碳'}:x;
 return `<section class="oxygen-reference" aria-label="元素對氧活性大小">
  <div class="oxygen-reference-heading"><div><small>先找位置，再做預測</small><h4>元素對氧的活性，由大到小</h4></div><span>點元素，和碳比較</span></div>
  <p class="oxygen-definition">對氧活性，指元素與氧結合的傾向。<b>在本課的比較中，活性越大，通常越容易得氧，形成的氧化物也較難失氧。</b></p>
  <div class="oxygen-series-direction"><b>活性大</b><span>由左到右，換行接續 ↓</span><b>活性小</b></div>
  <ol class="oxygen-series">${oxygenAffinitySeries.map((a,j)=>`<li><button data-affinity="${a.symbol}" aria-pressed="${x.symbol===a.symbol}" aria-label="${a.name} ${a.symbol}，與碳比較" class="${a.symbol==='C'?'carbon-marker':''} ${a.symbol==='H'?'hydrogen-marker':''}"><small>${String(j+1).padStart(2,'0')}</small>${specimenArt(a.symbol)}<strong>${a.symbol}</strong><span>${a.name}</span>${a.symbol==='C'||a.symbol==='H'?'<em>非金屬'+(a.symbol==='C'?' · 石墨':' · 無色氣體')+'</em>':a.symbol==='Hg'?'<em>液態金屬</em>':'<em aria-hidden="true">&nbsp;</em>'}</button>${j<oxygenAffinitySeries.length-1?'<i aria-hidden="true">›</i>':''}</li>`).join('')}</ol>
  <p class="element-specimen-note">圖為物質的代表外觀示意，不能只憑外觀辨認元素。氫氣無色，圖中以密閉容器表示。</p>
  <div class="oxygen-comparison" role="status" aria-live="polite">
   <div class="oxygen-versus"><div><strong>${first.symbol}</strong><span>${first.name}</span></div><b>${x.relation==='same'?'＝':'＞'}</b><div><strong>${last.symbol}</strong><span>${last.name}</span></div><small>對氧活性</small></div>
   <div><h4>${copy[0]}</h4><p>${copy[1]}</p></div>
  </div>
  <p class="oxygen-series-note">碳、氫是非金屬；CO 是化合物，不列入這張元素表。此排列用於本課的相對比較，反應仍受溫度、氣氛與表面狀態影響。</p>
 </section>`;
}

export function pairedRedoxPrinciple(){
 return `<div class="redox-principle"><span>一個反應，兩邊一起變</span><strong>氧化必定伴隨還原，還原也必定伴隨氧化。</strong><p>在這些氧轉移反應中：一方得到氧，另一方就失去氧。追蹤同一批氧，便能同時找到兩邊。</p></div>`;
}

export function ironRedoxScene(pairs){return ironReactionMarkup(pairs);}

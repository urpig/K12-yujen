import {ironReactionMarkup} from './iron-paired-reaction.js';
import {oxygenAffinitySeries,compareWithIron} from './forge-prep-model.js';

const specimenDescription={K:'油中保存的銀灰色鉀金屬塊',Na:'油中保存的銀白色鈉金屬塊',Ca:'封存於玻璃瓶內的銀灰色鈣金屬顆粒',Mg:'銀白色鎂帶',Al:'銀白色鋁箔',C:'深灰黑色、有層狀紋理的石墨',Zn:'帶藍灰色光澤的鋅金屬塊',Cr:'銀灰色、有晶面光澤的鉻金屬塊',Fe:'灰色鐵棒與鐵塊',Sn:'銀白色錫金屬塊',Pb:'暗藍灰色鉛金屬塊',H:'密閉玻璃瓶中的無色氫氣，氣體本身看不見',Cu:'紅棕色銅片與銅塊',Hg:'封閉玻璃容器中的銀白色液態汞',Ag:'銀白色銀金屬塊',Pt:'灰白色鉑金屬塊',Au:'金黃色金屬塊'};
export function specimenArt(symbol){return `<span class="element-specimen specimen-${symbol}" role="img" aria-label="${specimenDescription[symbol]}，外觀示意"></span>`;}

function comparisonCopy(symbol){
 const x=compareWithIron(symbol);
 if(x.relation==='same')return ['以鐵為基準：點選其他元素，看看它排在鐵的哪一邊。'];
 if(x.relation==='greater')return [x.name+'排在鐵前面，對氧活性較大；能把氧化鐵中的氧拿走。'];
 return [x.name+'排在鐵後面，對氧活性較小；不能把氧化鐵中的氧拿走。'];
}

export function affinityReference(symbol){
 const x=compareWithIron(symbol)||compareWithIron('Fe'),copy=comparisonCopy(x.symbol);
 const first=x.relation==='greater'?x:{symbol:'Fe',name:'鐵'},last=x.relation==='greater'?{symbol:'Fe',name:'鐵'}:x;
 return `<section class="oxygen-reference" aria-label="元素對氧活性大小">
  <div class="oxygen-reference-heading"><div><h3>元素對氧的活性大小</h3><h4>哪些元素的活性比鐵大呢？</h4></div><span>點元素，和鐵比較</span></div>
  <p class="oxygen-definition"><b>活性較大：</b><strong>較容易與氧結合</strong>，形成氧化物後，氧也<strong>較難被拿走</strong>。<br><b>活性較小：</b><strong>較不容易與氧結合</strong>，形成氧化物後，氧<strong>較容易被活性更大的元素拿走</strong>。</p>
  <div class="oxygen-series-direction"><b>活性大</b><b>活性小</b></div>
  <ol class="oxygen-series">${oxygenAffinitySeries.map((a,j)=>`<li><button data-affinity="${a.symbol}" aria-pressed="${x.symbol===a.symbol}" aria-label="${a.name} ${a.symbol}，與鐵比較" class="${a.symbol==='Fe'?'iron-marker':''} ${a.symbol==='H'?'hydrogen-marker':''}"><small>${String(j+1).padStart(2,'0')}</small>${specimenArt(a.symbol)}<strong>${a.symbol}</strong><span>${a.name}</span></button>${j<oxygenAffinitySeries.length-1?'<i aria-hidden="true">›</i>':''}</li>`).join('')}</ol>
  <div class="oxygen-comparison" role="status" aria-live="polite">
   <div class="oxygen-versus"><div><strong>${first.symbol}</strong><span>${first.name}</span></div><b>${x.relation==='same'?'＝':'＞'}</b><div><strong>${last.symbol}</strong><span>${last.name}</span></div><small>對氧活性</small></div>
   <div><h4>${copy[0]}</h4></div>
  </div>

 </section>`;
}

export function pairedRedoxPrinciple(){
 return `<div class="redox-principle"><span>一個反應，兩邊一起變</span><strong>氧化必定伴隨還原，還原也必定伴隨氧化。</strong></div>`;
}

export function ironRedoxScene(pairs){return ironReactionMarkup(pairs);}

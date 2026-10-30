import {pairedReactionEquation} from './iron-paired-reaction.js';

const atom=(kind,label)=>`<span class="reaction-atom reaction-atom-${kind}">${label}</span>`;
export const oxygenTransferExamples=[
 {id:'magnesium',label:'鎂＋二氧化碳',summary:'CO₂ 失去氧，被還原成碳；鎂得到氧，被氧化成氧化鎂。'},
 {id:'carbon-copper',label:'碳＋氧化銅',count:2,title:'碳得到氧，氧化銅變成什麼？',donor:'氧化銅 · 2CuO',donorAfter:'金屬銅 · 2Cu',receiver:'碳 · C',receiverAfter:'二氧化碳 · CO₂',reducer:'碳',product:'二氧化碳',reducerAtom:'carbon',symbol:'C',species:[[0,'C'],[2,'CuO'],[0,'CO₂'],[2,'Cu']],condition:'加熱條件下的總反應',equationLabel:'加熱下，C 加 2CuO 生成 CO₂ 加 2Cu',summary:'氧化銅失去氧，被還原成銅；碳得到氧，被氧化成二氧化碳。'},
 {id:'hydrogen-copper',label:'氫氣＋氧化銅',count:1,title:'氫氣得到氧，氧化銅變成什麼？',donor:'氧化銅 · CuO',donorAfter:'金屬銅 · Cu',receiver:'氫氣 · H₂',receiverAfter:'水 · H₂O',reducer:'氫氣',product:'水',reducerAtom:'hydrogen',symbol:'H',species:[[0,'H₂'],[0,'CuO'],[0,'H₂O'],[0,'Cu']],condition:'加熱條件下的反應',equationLabel:'加熱下，H₂ 加 CuO 生成 H₂O 加 Cu',summary:'氧化銅失去氧，被還原成銅；氫氣得到氧，被氧化成水。'}
];
export function oxygenTransferMarkup(id='magnesium',complete=false){
 const e=oxygenTransferExamples.find(x=>x.id===id)||oxygenTransferExamples[0];
 if(e.id==='magnesium')return magnesiumReactionMarkup(complete?[0,1]:[],complete?[0,1]:[]);
 const socket=(j,target=false)=>`<span class="reaction-socket" data-oxygen-${target?'target':'source'}="${j}"><span class="${target?'reaction-arrived':'reaction-original'}" ${(target?!complete:complete)?'hidden':''}>${atom('oxygen','O')}</span></span>`;
 const destination=e.count===2?`${socket(0,true)}<span class="reaction-bond"></span>${atom('carbon','C')}<span class="reaction-bond"></span>${socket(1,true)}`:`${atom('hydrogen','H')}<span class="reaction-bond"></span>${socket(0,true)}<span class="reaction-bond"></span>${atom('hydrogen','H')}`;
 return `<section class="iron-reaction magnesium-reaction" data-iron-reaction data-reaction-kind="${e.id}" data-phase="${complete?'complete':'ready'}" data-donor-ready="${e.donor}" data-receiver-ready="${e.receiver}" data-donor-running="氧化銅 → 銅" data-receiver-running="${e.reducer} → ${e.product}" data-oxygen-total="${e.count}" aria-label="${e.label}的氧轉移">
 <div class="reaction-heading"><div><small>換一組物質，找出同一個規則</small><h4>${e.title}</h4></div><button type="button" class="primary reaction-start" data-react>${complete?'↻ 重播反應':'開始反應 →'}</button></div>
 ${pairedReactionEquation(e.id,e)}
 <div class="reaction-board" data-reaction-board><div class="reaction-sample reaction-donor"><small>氧的出發處</small><h5 data-oxide-name>${complete?e.donorAfter:e.donor}</h5><div class="reaction-copper-donors">${Array.from({length:e.count},(_,j)=>`<div class="reaction-gas">${atom('copper','Cu')}<span class="reaction-donor-bond"></span>${socket(j)}</div>`).join('')}</div><p data-oxide-count>${complete?'氧已被帶走，留下銅':'還有 '+e.count+' 個氧'}</p></div>
 <div class="reaction-journey" aria-hidden="true"><span>氧轉移</span><b>→</b></div><div class="reaction-sample reaction-gases"><small>氧的目的地</small><h5 data-gas-name>${complete?e.receiverAfter:e.receiver}</h5><div class="reaction-gas reaction-receiver-molecule">${destination}</div></div>
 ${Array.from({length:e.count},(_,j)=>`<span class="reaction-traveller" data-traveller="${j}" hidden aria-hidden="true">${atom('oxygen','O')}</span>`).join('')}</div>
 <div class="reaction-outcomes" aria-live="polite"><p><b>氧化銅被還原</b><span>氧化銅失去氧，形成銅。</span></p><span class="reaction-simultaneous">同時發生</span><p><b>${e.reducer}被氧化</b><span>${e.reducer}得到氧，形成${e.product}。</span></p></div><p class="reaction-ledger" data-reaction-ledger role="status">氧原子總數不變：氧化銅端 ${complete?0:e.count} ＋ ${e.reducer}這一端 ${complete?e.count:0} ＝ ${e.count}</p></section>`;
}
export function magnesiumReactionMarkup(moved=[],targets=[]){
 const count=moved.length,complete=count===2;
 const source=j=>`<span class="reaction-socket" data-oxygen-source="${j}"><span class="reaction-original" ${moved.includes(j)?'hidden':''}>${atom('oxygen','O')}</span></span>`;
 return `<section class="iron-reaction magnesium-reaction" data-iron-reaction data-reaction-kind="magnesium" data-phase="${count?'complete':'ready'}" aria-label="二氧化碳與鎂的氧轉移">
  <div class="reaction-heading"><div><small>換一組物質，找出同一個規則</small><h4>鎂得到氧，誰失去了氧？</h4></div><button type="button" class="primary reaction-start" data-react>${count?'↻ 重播反應':'開始反應 →'}</button></div>
  ${pairedReactionEquation('magnesium')}
  <div class="reaction-board" data-reaction-board>
   <div class="reaction-sample reaction-donor"><small>氧的出發處</small><h5 data-oxide-name>${complete?'留下碳 · C':'二氧化碳 · CO₂'}</h5><div class="reaction-carbon-donor">${source(0)}<span class="reaction-donor-bond" ${count?'hidden':''}></span>${atom('carbon','C')}<span class="reaction-donor-bond" ${count?'hidden':''}></span>${source(1)}</div><p data-oxide-count>${complete?'氧已被帶走，留下碳':'還有 '+(2-count)+' 個氧'}</p></div>
   <div class="reaction-journey" aria-hidden="true"><span>氧轉移</span><b>→</b></div>
   <div class="reaction-sample reaction-gases"><small>氧的目的地</small><h5 data-gas-name>${complete?'氧化鎂 · 2MgO':'鎂 · 2Mg'}</h5>${[0,1].map(j=>`<div class="reaction-gas">${atom('magnesium','Mg')}<span class="reaction-bond"></span><span class="reaction-socket" data-oxygen-target="${j}"><span class="reaction-arrived" ${targets.includes(j)?'':'hidden'}>${atom('oxygen','O')}</span></span></div>`).join('')}</div>
   ${[0,1].map(j=>`<span class="reaction-traveller" data-traveller="${j}" hidden aria-hidden="true">${atom('oxygen','O')}</span>`).join('')}
  </div>
  <div class="reaction-outcomes" aria-live="polite"><p><b>CO₂ 被還原</b><span>CO₂ 失去氧，形成碳。</span></p><span class="reaction-simultaneous">同時發生</span><p><b>鎂被氧化</b><span>鎂得到氧，形成氧化鎂。</span></p></div>
  <p class="reaction-ledger" data-reaction-ledger role="status">氧原子總數不變：CO₂ 端 ${2-count} ＋ 鎂這一端 ${count} ＝ 2</p>
 </section><div class="iron-carbon-link"><b>把對氧活性的線索接回來</b><p>鎂對氧的活性比碳大，所以在合適條件下能從 CO₂ 取得氧。鎂自己被氧化，也讓 CO₂ 被還原，是這個反應的還原劑；不能反過來推論碳也能還原氧化鎂。</p></div>
 `;
}

import {pairedReactionEquation} from './iron-paired-reaction.js';

const atom=(kind,label)=>`<span class="reaction-atom reaction-atom-${kind}">${label}</span>`;
export function magnesiumReactionMarkup(moved=[],targets=[]){
 const count=moved.length,complete=count===2;
 const source=j=>`<span class="reaction-socket" data-oxygen-source="${j}"><span class="reaction-original" ${moved.includes(j)?'hidden':''}>${atom('oxygen','O')}</span></span>`;
 return `<section class="iron-reaction magnesium-reaction" data-iron-reaction data-reaction-kind="magnesium" data-phase="${count?'complete':'ready'}" aria-label="二氧化碳與鎂的氧轉移">
  <div class="reaction-heading"><div><small>換一組物質，找出同一個規則</small><h4>鎂得到氧，誰失去了氧？</h4></div><button type="button" class="primary reaction-start" data-react>${count?'↻ 重播反應':'開始反應 →'}</button></div>
  <p class="reaction-instruction">按下反應鍵，看 CO₂ 中的 <b>2 個氧</b> 分別移到 <b>2 份鎂</b>，形成氧化鎂。</p>
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
 <p class="prep-model-note">原子收支示意：前後都是 2 個 Mg、1 個 C、2 個 O。球色、大小、路徑與速度皆為示意，不是真實反應機構；氧化鎂是固態晶體。反應需點燃並在合適條件下進行，僅螢幕模擬。</p>`;
}

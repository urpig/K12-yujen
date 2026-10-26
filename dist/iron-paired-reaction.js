import {ironOxygenLedger} from './forge-prep-model.js';
import {createFoodPlayback} from './food-playback.js';

const atom=(kind,label)=>`<span class="reaction-atom reaction-atom-${kind}">${label}</span>`;
export function ironReactionMarkup(pairs){
 const {count,oxideOxygen,gasOxygen}=ironOxygenLedger(pairs);
 return `<section class="iron-reaction" data-iron-reaction data-phase="${count?'complete':'ready'}" aria-label="氧化鐵與一氧化碳的氧轉移">
  <div class="reaction-heading"><div><small>追蹤同一批氧</small><h4>氧沒有消失，只是換了夥伴。</h4></div><button type="button" class="primary reaction-start" data-react>${count?'↻ 重播反應':'開始反應 →'}</button></div>
  <p class="reaction-instruction">按下反應鍵，看氧化鐵中的 <b>3 個氧</b> 移到 <b>3 份 CO</b>，同時觀察兩邊的變化。</p>
  <div class="reaction-equation" aria-label="合適高溫下，Fe₂O₃ 加 3CO 生成 2Fe 加 3CO₂">
   <small>合適高溫條件下的總反應</small>
   <div class="reaction-formula"><b>Fe₂O₃</b><span>＋</span><b>3CO</b><span>→</span><b>2Fe</b><span>＋</span><b>3CO₂</b></div>
   <div class="reaction-mapping" aria-hidden="true"><svg viewBox="0 0 1000 116" preserveAspectRatio="none"><path class="reduction-map" d="M110 0 V34 H635 V0 m-7 10 7-10 7 10"/><path class="oxidation-map" d="M365 0 V88 H890 V0 m-7 10 7-10 7 10"/></svg><span class="reaction-map-label reduction-label">失去氧 · 被還原</span><span class="reaction-map-label oxidation-label">得到氧 · 被氧化</span></div>
  </div>
  <div class="reaction-board" data-reaction-board>
   <div class="reaction-sample reaction-donor"><small>氧的出發處</small><h5 data-oxide-name>${count===3?'金屬鐵 · 2Fe':'氧化鐵 · Fe₂O₃'}</h5><div class="reaction-iron-atoms">${atom('iron','Fe')}${atom('iron','Fe')}</div><div class="reaction-oxygen-row">${[0,1,2].map(j=>`<span class="reaction-socket" data-oxygen-source="${j}"><span class="reaction-original" ${pairs.includes(j)?'hidden':''}>${atom('oxygen','O')}</span></span>`).join('')}</div><p data-oxide-count>${oxideOxygen?'還有 '+oxideOxygen+' 個氧':'氧已被帶走，留下鐵'}</p></div>
   <div class="reaction-journey" aria-hidden="true"><span>氧轉移</span><b>→</b></div>
   <div class="reaction-sample reaction-gases"><small>氧的目的地</small><h5 data-gas-name>${count===3?'二氧化碳 · 3CO₂':'一氧化碳 · 3CO'}</h5>${[0,1,2].map(j=>`<div class="reaction-gas"><span class="reaction-socket" data-oxygen-target="${j}"><span class="reaction-arrived" ${pairs.includes(j)?'':'hidden'}>${atom('oxygen','O')}</span></span><span class="reaction-bond"></span>${atom('carbon','C')}<span class="reaction-bond"></span>${atom('oxygen','O')}</div>`).join('')}</div>
   ${[0,1,2].map(j=>`<span class="reaction-traveller" data-traveller="${j}" hidden aria-hidden="true">${atom('oxygen','O')}</span>`).join('')}
  </div>
  <div class="reaction-outcomes" aria-live="polite"><p><b>氧化鐵被還原</b><span>Fe₂O₃ 失去氧，形成鐵。</span></p><span class="reaction-simultaneous">同時發生</span><p><b>CO 被氧化</b><span>CO 得到氧，形成 CO₂。</span></p></div>
  <p class="reaction-ledger" data-reaction-ledger role="status">氧原子總數不變：氧化鐵端 ${oxideOxygen} ＋ 氣體端 ${gasOxygen} ＝ 6</p>
 </section><div class="iron-carbon-link"><b>碳怎麼幫上忙？</b><p>碳（焦炭）提供熱，也參與生成 CO：<strong>CO₂ + C → 2CO</strong>。CO 再帶走鐵礦中的氧；在上面的總反應中，CO 被氧化，也是還原劑。</p></div>
 <p class="prep-model-note">原子收支示意：氧化鐵是固態晶體，並非一顆顆獨立的 Fe₂O₃ 分子。球色、大小、移動路徑與速度皆為示意；實際還原分多步進行，需合適高溫。CO 有毒，僅螢幕模擬。</p>`;
}

// Commit evidence only after the whole transfer finishes. Disposing a card must
// cancel its in-flight work before a reset or tab change can render a new card.
export function createIronReaction({onProgress=()=>{},onComplete=()=>{},reducedMotion=false,...clock}={}){
 let playback=null,alive=true,running=false,visible=true;
 return {
  start(){
   if(!alive||running)return false;
   running=true;
   if(reducedMotion){onProgress(1);running=false;onComplete();return true;}
   playback?.dispose();
   playback=createFoodPlayback({...clock,duration:3200,onTime:value=>onProgress(value/4),onState:state=>{if(alive&&running&&state.complete){running=false;onComplete();}}});
   playback.setActive(visible);return true;
  },
  setVisible(value){visible=!!value;playback?.setActive(visible);},
  dispose(){alive=false;running=false;playback?.dispose();}
 };
}

export function bindIronReaction(scene,onComplete){
 const button=scene.querySelector('[data-react]'),board=scene.querySelector('[data-reaction-board]');
 const travellers=[...scene.querySelectorAll('[data-traveller]')];
 const sources=[...scene.querySelectorAll('[data-oxygen-source]')],targets=[...scene.querySelectorAll('[data-oxygen-target]')];
 let started=false;
 const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)');
 const playback=createIronReaction({reducedMotion:reduceMotion.matches,onProgress:p=>{
  scene.dataset.reactionProgress=p.toFixed(3);
  const box=board.getBoundingClientRect(),eased=p*p*(3-2*p);
  travellers.forEach((el,j)=>{
   const from=sources[j].getBoundingClientRect(),to=targets[j].getBoundingClientRect();
   el.style.width=from.width+'px';el.style.height=from.height+'px';
   el.style.transform=`translate(${from.left-box.left+(to.left-from.left)*eased}px,${from.top-box.top+(to.top-from.top)*eased-28*Math.sin(Math.PI*p)}px)`;
  });
 },onComplete:()=>{if(started)onComplete();}});
 button.onclick=()=>{
  if(started)return;started=true;button.disabled=true;button.textContent='反應進行中…';
  scene.dataset.phase='running';
  scene.querySelectorAll('.reaction-original,.reaction-arrived').forEach(el=>el.hidden=true);
  travellers.forEach(el=>el.hidden=false);
  scene.querySelector('[data-oxide-name]').textContent='氧化鐵 → 鐵';
  scene.querySelector('[data-gas-name]').textContent='CO → CO₂';
  scene.querySelector('[data-oxide-count]').textContent='追蹤離開的 3 個氧';
  scene.querySelector('[data-reaction-ledger]').textContent='同一批氧正在轉移；整個反應中，總共仍有 6 個氧。';
  scene.scrollIntoView({block:'start',behavior:'instant'});
  syncVisibility();playback.start();
 };
 const syncVisibility=()=>{
  const rect=scene.getBoundingClientRect(),visible=rect.bottom>0&&rect.top<window.innerHeight&&!document.hidden;
  scene.dataset.playbackVisible=String(visible);playback.setVisible(visible);
 };
 document.addEventListener('visibilitychange',syncVisibility);
 window.addEventListener('scroll',syncVisibility,{passive:true,capture:true});window.addEventListener('resize',syncVisibility);syncVisibility();
 return ()=>{playback.dispose();document.removeEventListener('visibilitychange',syncVisibility);window.removeEventListener('scroll',syncVisibility,true);window.removeEventListener('resize',syncVisibility);button.onclick=null;};
}

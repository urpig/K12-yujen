import {laboratoryBackdrop} from './life-laboratory-scene.js';
import {laboratoryReagent,laboratoryTransfer} from './lab-reagent-art.js';
import {bindReactantPickup} from './life-reactant-drag.js';
import {createFoodPlayback} from './food-playback.js';

export function appleMarkup(complete=false){return `<section class="apple-comparison life-manual-reaction" data-life-observation data-life-reaction="food" data-phase="${complete?'complete':'ready'}" aria-label="維生素 C 與蘋果褐變對照實驗" style="--apple-browning:${complete?1:0}"><header><div><h3>維生素 C 能延緩蘋果褐變嗎？</h3><p>拿取燒杯，加入左側蘋果；比較相同時間後的變化。</p></div><button type="button" class="text-button" data-apple-reset data-life-retry>↺ 重新取用</button></header>
<div class="life-mix-workbench life-bleach-workbench"><div class="life-reactor-panel"><div class="life-reactor-condition">相同蘋果、空氣與溫度 · 只有是否加入維生素 C 不同</div><div class="life-reactor-art life-reactor-food"><div class="life-lab-room apple-lab-room">${laboratoryBackdrop()}<div class="apple-groups lab-specimen-groups"><figure class="lab-experimental"><div class="apple-photo" role="img" aria-label="加入維生素 C 的蘋果"></div><figcaption><b>實驗組</b><span>加入維生素 C 溶液</span></figcaption></figure><figure class="lab-control"><div class="apple-photo" role="img" aria-label="未加維生素 C 的蘋果"></div><figcaption><b>對照組</b><span>未加維生素 C</span></figcaption></figure></div></div>${laboratoryTransfer('vitaminc')}<button type="button" class="life-reactant bleach-bench-reagent" data-life-input="vitaminc" aria-label="拿取維生素 C 溶液燒杯，加入左側實驗組" aria-pressed="false" ${complete?'disabled':''}>${laboratoryReagent('vitaminc')}<span data-input-state>${complete?'✓ 已加入':'拿取 →'}</span></button><button type="button" class="life-reactor-drop" data-life-drop tabindex="-1" aria-label="蘋果，拖入維生素 C 溶液" ${complete?'disabled':''}><span class="life-drop-hint" data-life-drop-hint>${complete?'✓ 觀察完成':'放到這裡 ↓'}</span></button></div></div></div><p data-apple-status role="status">${complete?'同樣經過一段時間，左側較能保持原色，右側明顯褐變。':'拿取燒杯，加入左側蘋果；右側保留原樣對照。'}</p></section>`;}

export function bindAppleComparison(scene,onComplete){
 const cup=scene.querySelector('[data-life-input]'),zone=scene.querySelector('[data-life-drop]'),reset=scene.querySelector('[data-apple-reset]'),status=scene.querySelector('[data-apple-status]');
 let phase=scene.dataset.phase,playback=null,disposed=false;
 const usable=()=>!disposed&&!scene.closest('[inert]');
 function refresh(){scene.dataset.phase=phase;cup.disabled=zone.disabled=phase!=='ready';cup.setAttribute('aria-pressed','false');cup.querySelector('[data-input-state]').textContent=phase==='ready'?'拖曳加入 →':'✓ 已加入';zone.querySelector('[data-life-drop-hint]').textContent=phase==='complete'?'✓ 觀察完成':phase==='running'?'觀察變化中…':'放到這裡 ↓';}
 const visible=()=>{const r=scene.getBoundingClientRect();playback?.setActive(usable()&&phase==='running'&&!document.hidden&&!document.querySelector('dialog[open]')&&r.bottom>0&&r.top<innerHeight);};
 const begin=()=>{if(!usable()||phase!=='ready')return;phase='running';refresh();status.textContent='維生素 C 已加入左側蘋果，觀察兩組隨時間的變化。';playback=createFoodPlayback({duration:matchMedia('(prefers-reduced-motion:reduce)').matches?1:6500,onTime:t=>scene.style.setProperty('--apple-browning',String(t/4)),onState:s=>{if(s.complete&&!disposed){phase='complete';refresh();status.textContent='左側較能保持原色，右側明顯褐變；維生素 C 能延緩褐變。';onComplete?.();}}});visible();};
 const pickup=bindReactantPickup(cup,zone,{disabled:()=>!usable()||phase!=='ready',onDrop:begin,onMiss:()=>{refresh();status.textContent='請放到左側蘋果；請把燒杯拖進實驗組。';},onCancel:()=>{refresh();}});

 reset.onclick=()=>{if(!usable())return;pickup.cancel();playback?.dispose();playback=null;phase='ready';scene.style.setProperty('--apple-browning','0');refresh();status.textContent='已換上新蘋果，拿取燒杯再做一次。';onComplete?.('reset');};
 window.addEventListener('scroll',visible,{passive:true,capture:true});window.addEventListener('resize',visible);document.addEventListener('visibilitychange',visible);refresh();
 return ()=>{disposed=true;playback?.dispose();pickup();reset.onclick=null;window.removeEventListener('scroll',visible,true);window.removeEventListener('resize',visible);document.removeEventListener('visibilitychange',visible);};
}

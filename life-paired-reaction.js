import {laboratoryTransfer} from './lab-reagent-art.js';
import {appleMarkup,bindAppleComparison} from './apple-comparison.js';
import {lifeBiology,lifeBleaches,appleComparison} from './everyday-redox-model.js';
import {bleachSupply} from './life-bleach-art.js';
import {lifeReactorArt} from './life-reactor-art.js';
import {lifeLabDefinition,freshLifeMix,addLifeReactant,finishLifeMix} from './life-reactant-model.js';
import {bindReactantPickup} from './life-reactant-drag.js';
import {createFoodPlayback} from './food-playback.js';
import {biologyMarkup,bindBiologyLab} from './life-biology-lab.js';

// Each entry records BOTH sides of one representative reaction. The electron
// marker conveys direction only, not a literal electron count or mechanism.
export function lifeReactionPair(key){
 if(lifeBiology[key]){
  const b=lifeBiology[key],oxidation=b.paths.find(p=>p.role==='oxidation'),reduction=b.paths.find(p=>p.role==='reduction');
  return {title:b.name,equation:b.equation,condition:b.condition,oxidation,reduction,finding:b.reason};
 }
 if(lifeBleaches[key]){
  const b=lifeBleaches[key],agent={from:b.name+' '+b.formula,to:b.role==='oxidation'?'氧化後的產物':'還原後的產物'},dye={from:'色素',to:'漂白'};
  return {title:b.name+'的漂白作用',condition:'適用色素與合適條件下的代表反應',oxidation:b.role==='oxidation'?agent:dye,reduction:b.role==='reduction'?agent:dye,finding:b.reason};
 }
 if(key==='food')return {title:'維生素 C 延緩蘋果褐變',condition:'相同蘋果、空氣與溫度；比較有無維生素 C',oxidation:{from:'維生素 C',to:'氧化後的維生素 C'},reduction:{from:'褐變中間產物',to:'還原成較不易褐變的物質'},finding:'維生素 C 自己被氧化，幫部分褐變中間產物還原；保護用完後，蘋果仍會逐漸變褐。'};
 throw new Error('Unknown life reaction: '+key);
}
const atom=(name)=>`<i class="life-molecule-atom life-atom-${name}" aria-hidden="true">${name}</i>`;
function substance(label){
 let icon='';
 if(label.includes('CO₂'))icon=['O','C','O'].map(atom).join('');
 else if(label.includes('H₂O₂'))icon=['H','O','O','H'].map(atom).join('');
 else if(label.includes('H₂O'))icon=['H','O','H'].map(atom).join('');
 else if(label.includes('SO₂'))icon=['O','S','O'].map(atom).join('');
 else if(label.includes('NaClO'))icon=['Na','Cl','O'].map(atom).join('');
 else if(label.includes('O₂'))icon=['O','O'].map(atom).join('');
 else if(label.includes('C₆H₁₂O₆'))icon='<i class="life-sugar-symbol" aria-hidden="true">葡萄糖</i>';
 else icon=`<i class="life-substance-symbol ${label.includes('色')?'life-pigment-symbol':''}" aria-hidden="true">${label.includes('維生素')?'C':label.includes('色')?'◈':'◇'}</i>`;
 return `<div class="life-molecule">${icon}</div><strong>${label}</strong>`;
}
export function lifePairedMarkup(key,complete=false){
 if(key==='food')return appleMarkup(complete);
 if(key==='photo'||key==='resp')return biologyMarkup(key,complete);
 const p=lifeReactionPair(key),lab=lifeLabDefinition(key);
 return `<section class="life-paired-reaction life-manual-reaction" data-glossary-skip data-life-observation data-life-reaction="${key}" data-phase="${complete?'complete':'ready'}" style="--life-progress:${complete?1:0}" aria-label="${p.title}的氧化還原配對">
 <div class="reaction-heading"><div><small>親手加入反應物 · 看兩邊一起變</small><h4>${p.title}</h4></div><button type="button" class="text-button" data-life-retry>↺ 重新取用</button></div>
 <p class="life-mix-instruction">${lab.inputs.length===1?(key==='sulfur'?'拿取氣體注射筒，將二氧化硫送入左側的':'拿取燒杯，將試劑加入左側的'):'把兩種反應物拖進'}<strong>${lab.zone}</strong>，觀察反應。<span>也可以先點反應物，再點反應區。</span></p>
 <div class="life-mix-workbench life-bleach-workbench"><div class="life-reactor-panel"><div class="life-reactor-condition">${lab.condition}</div><div class="life-reactor-art life-reactor-${key}">${lifeReactorArt(key)}${laboratoryTransfer(key)}${lab.inputs.map(x=>`<button type="button" class="life-reactant bleach-bench-reagent" data-life-input="${x.id}" aria-pressed="false" aria-label="拿取${x.label}${key==='sulfur'?'氣體注射筒，加入左側密閉罩':'燒杯，加入左側實驗組'}" ${complete?'disabled':''}>${bleachSupply(key)}<span data-input-state>${complete?'✓ 已加入':'拿取 →'}</span></button>`).join('')}<button type="button" class="life-reactor-drop" data-life-drop aria-label="${lab.zone}，放入選取的反應物" ${complete?'disabled':''}><span class="life-zone-name">實驗組</span><span class="life-drop-hint" data-life-drop-hint>放到這裡 ↓</span></button></div>
 <div class="life-mix-slots" aria-label="反應物加入進度">${lab.inputs.map(x=>`<span data-life-slot="${x.id}" class="${complete?'added':''}">${complete?'✓':'○'} ${x.label}</span>`).join('')}<b data-life-mix-count>${complete?lab.inputs.length:0} / ${lab.inputs.length}</b></div>
 ${key==='food'?'<div class="life-paired-time"><b data-life-time-label>剛切開</b><span>維生素 C 的保護能力：<strong data-life-reserve-label>尚未消耗</strong></span></div>':''}</div></div>
 <p class="life-observe-status" data-life-animation-status role="status">${complete?p.finding:lab.inputs.length===1?(key==='sulfur'?'拿取氣體注射筒，加入左側密閉罩；右側保留原樣對照。':'拿取燒杯，加入左側'+lab.zone+'；右側保留原樣對照。'):'反應物還沒到齊，先取一份放進'+lab.zone+'。'}</p>
 <div class="life-manual-results" aria-label="同時追蹤氧化與還原">${['oxidation','reduction'].map((role,i)=>`<div class="life-result-path ${role}"><div class="life-source-name">${p[role].from}</div><span class="life-result-arrow" aria-hidden="true">→</span><div class="life-result-destination"><span class="life-result-wait">等候反應</span><strong data-life-product>${p[role].to}</strong></div><p class="life-pair-label" data-life-pair-label><b>${p[role].from.replace(/ (?:H₂O₂|H₂O|CO₂|O₂|C₆H₁₂O₆|SO₂|NaClO)$/,'')}${i===0?'被氧化':'被還原'}</b></p></div>`).join('')}</div>
 <div class="life-paired-equation"><small>${p.equation?'多步反應的整體表示':'適用情境的質性比較'}</small>${p.equation?`<b>${p.equation}</b>`:'<b class="life-qualitative-equation">兩邊同時改變：一方被氧化，另一方被還原。</b>'}</div>
 </section>`;
}
function paintFood(scene,progress){
 const time=progress*4,x=appleComparison(time);
 for(const k of ['plain','protected'])scene.querySelector(`[data-apple="${k}"]`)?.setAttribute('opacity',String(x[k]*.84));
 const text=(sel,value)=>{const e=scene.querySelector(sel);if(e)e.textContent=value;};
 text('[data-life-time-label]',time<.5?'剛切開':time<3?'一段時間後':'更久以後');
 text('[data-life-reserve-label]',time===0?'尚未消耗':x.reserve>0?'逐漸消耗':'已用完');
 text('[data-apple-caption="plain"]',time<.5?'淡色切面':time<3?'逐漸褐變':'褐變明顯');
 text('[data-apple-caption="protected"]',time<.5?'同樣的起點':time<3?'顏色維持較淡':'保護減弱，也開始褐變');
}
export function bindLifePairedReaction(scene,onComplete){
 if(scene?.dataset.lifeReaction==='food')return bindAppleComparison(scene,onComplete);
 if(!scene)return ()=>{};
 if(['photo','resp'].includes(scene.dataset.lifeReaction))return bindBiologyLab(scene,onComplete);
 const key=scene.dataset.lifeReaction,lab=lifeLabDefinition(key),zone=scene.querySelector('[data-life-drop]'),retry=scene.querySelector('[data-life-retry]'),status=scene.querySelector('[data-life-animation-status]');
 let state=freshLifeMix(key,scene.dataset.phase==='complete'),selected=null,playback=null,alive=true;
 const cleanups=[],inputs=[...scene.querySelectorAll('[data-life-input]')];
 const usable=()=>alive&&!scene.closest('[inert]');
 const paint=p=>{
  scene.querySelectorAll('[data-life-product],[data-life-pair-label]').forEach(e=>e.setAttribute('aria-hidden',String(p===0)));
  scene.querySelectorAll('.life-result-wait').forEach(e=>e.setAttribute('aria-hidden',String(p>0)));
  scene.style.setProperty('--life-progress',String(p));scene.dataset.reactionProgress=p.toFixed(3);
  if(key==='food')paintFood(scene,p);scene.querySelectorAll('.life-dye-after').forEach(dye=>dye.style.opacity=String(1-p*.92));
 };
 const refresh=()=>{
  scene.dataset.phase=state.phase;
  for(const input of inputs){const added=state.added.includes(input.dataset.lifeInput);input.disabled=added||state.phase!=='ready';input.setAttribute('aria-pressed',String(selected===input.dataset.lifeInput));input.querySelector('[data-input-state]').textContent=added?'✓ 已加入':selected===input.dataset.lifeInput?'已拿起 · 放入 →':'拿取 →';}
  lab.inputs.forEach(x=>{const slot=scene.querySelector('[data-life-slot="'+x.id+'"]'),added=state.added.includes(x.id);slot.classList.toggle('added',added);slot.textContent=(added?'✓ ':'○ ')+x.label;});
  scene.querySelector('[data-life-mix-count]').textContent=state.added.length+' / '+lab.inputs.length;zone.disabled=state.phase!=='ready';
  zone.classList.toggle('life-item-selected',!!selected);scene.querySelector('[data-life-drop-hint]').textContent=state.phase==='complete'?'✓ 觀察完成':state.phase==='running'?'反應進行中…':selected?'點這裡，放入反應物 ↓':'放到這裡 ↓';
 };
 const visible=()=>{const r=scene.getBoundingClientRect();playback?.setActive(alive&&state.phase==='running'&&!document.hidden&&!document.querySelector('dialog[open]')&&r.bottom>0&&r.top<innerHeight);};
 const start=()=>{
  status.textContent=lab.inputs.length===1?'試劑已加入，觀察實物變化與兩邊的氧化還原。':'兩種反應物已到齊，留意它們同時變成什麼。';paint(0);
  playback=createFoodPlayback({duration:matchMedia('(prefers-reduced-motion:reduce)').matches?1:key==='food'?6500:4000,onTime:t=>paint(t/4),onState:s=>{if(alive&&s.complete&&finishLifeMix(state)){refresh();status.textContent=lifeReactionPair(key).finding;onComplete();}}});visible();
 };
 const add=id=>{
  if(!usable()||!addLifeReactant(state,id))return;
  selected=null;refresh();const missing=lab.inputs.filter(x=>!state.added.includes(x.id));
  if(state.phase==='running'){zone.focus({preventScroll:true});start();}
  else status.textContent='已加入'+lab.inputs.find(x=>x.id===id).label+'；還需要'+missing.map(x=>x.label).join('、')+'。';
 };
 const cancel=()=>{selected=null;refresh();if(state.phase==='ready')status.textContent='已放回反應物，可以重新拿取。';};
 for(const input of inputs){const id=input.dataset.lifeInput;cleanups.push(bindReactantPickup(input,zone,{disabled:()=>!usable()||state.phase!=='ready'||state.added.includes(id),onSelect:()=>{selected=selected===id?null:id;refresh();status.textContent=selected?'已拿起'+lab.inputs.find(x=>x.id===id).label+'，點'+lab.zone+'放入。':'已放回反應物。';},onDrop:()=>add(id),onMiss:()=>{selected=null;refresh();status.textContent='還沒放進'+lab.zone+'，請再拖一次；也可以先點反應物，再點反應區。';},onCancel:cancel}));}
 zone.onclick=()=>{if(!usable()||state.phase!=='ready')return;if(selected)add(selected);else status.textContent='先拿取場景左邊的試劑，再放進'+lab.zone+'。';};
 retry.onclick=()=>{if(!usable())return;playback?.dispose();playback=null;state=freshLifeMix(key);selected=null;refresh();paint(0);status.textContent='已備好新的反應物，重新拿取，放入'+lab.zone+'。';};
 refresh();paint(state.phase==='complete'?1:0);
 const modalObserver=new MutationObserver(visible);modalObserver.observe(document.body,{attributes:true,subtree:true,attributeFilter:['open']});
 window.addEventListener('scroll',visible,{passive:true,capture:true});window.addEventListener('resize',visible);document.addEventListener('visibilitychange',visible);
 return ()=>{alive=false;playback?.dispose();cleanups.forEach(f=>f());zone.onclick=null;retry.onclick=null;modalObserver.disconnect();window.removeEventListener('scroll',visible,true);window.removeEventListener('resize',visible);document.removeEventListener('visibilitychange',visible);};
}

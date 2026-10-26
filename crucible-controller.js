import {bindDrop,bindFreeInstrument,inside} from './direct-manipulation.js';
import {scopeMarkup} from './card-markup.js';
import {crucibleNearFlame,crucibleRestPosition,newCrucibleHeating,advanceCrucibleHeating,crucibleHeatingMs} from './crucible-heating.js';

export function mountCrucibleController(root,{key,d,loaded,position,crucibleArt,record,notice,onCleanup,setCase,onCooled=()=>{}}){
 const scene=root.querySelector('.redox-scene'),cup=root.querySelector('[data-redox-cup]'),heatTarget=root.querySelector('[data-redox-target]'),pad=root.querySelector('[data-redox-load-target]'),phase=root.querySelector('.redox-phase'),detail=root.querySelector('.redox-detail');
 scene.classList.add('redox-free-scene');scene.dataset.freeCrucible='true';heatTarget.hidden=false;
 heatTarget.querySelector('span').textContent='坩堝放到酒精燈上方 ↓';pad.hidden=false;pad.querySelector('span').textContent='移開後放在耐熱墊 ↓';
 root.querySelector('.redox-rack-heading span').textContent='取一份 → 靠近加熱 → 移開暫停 → 比較產物';
 let point=crucibleRestPosition(position||[160,365]),state=newCrucibleHeating(),held=false,alive=true,recorded=false,cooledShown=false,last=performance.now(),timer=0,lastMessage='';
 const current=document.createElement('div');current.className='redox-current-target drop-target';current.dataset.redoxCurrent='';current.innerHTML='<span>換一份，放在目前坩堝的位置</span>';current.hidden=!loaded;scene.append(current);
 const say=t=>{if(t===lastMessage)return;phase.textContent=t;notice(t);lastMessage=t;};
 const alignCurrent=()=>{current.style.left=((point[0]-80)/760*100)+'%';current.style.top=((point[1]-86)/430*100)+'%';};alignCurrent();
 if(loaded){pad.classList.add('occupied');pad.querySelector('span').hidden=true;}
 for(const item of root.querySelectorAll('[data-redox-sample]')){
  let landing=[160,365];
  const target=()=>{const r=item.getBoundingClientRect(),centre={x:r.x+r.width/2,y:r.y+r.height/2};if(inside(centre,heatTarget.getBoundingClientRect())){landing=[320,229];return heatTarget;}if(loaded&&inside(centre,current.getBoundingClientRect())){landing=[...point];return current;}landing=[160,365];return pad;};
  bindDrop(item,target,{onDrop:()=>setCase(item.dataset.redoxSample,true,landing),onMiss:()=>say('把坩堝放到酒精燈上方、耐熱墊，或眼前坩堝的位置。')});
 }
 if(!cup){say('從上方取一份坩堝，可直接放到酒精燈上方。');return;}
 detail.innerHTML='<b data-redox-state>靠近加熱 · 移開暫停</b><div class="redox-comparison-views"><div>'+scopeMarkup(crucibleArt(key),'redox-before-'+key)+'<small>加熱前</small></div><div><div data-redox-live-view></div><small data-redox-live-label>目前</small></div></div><p data-redox-explanation>移到熱源上方才加熱；加熱完成就比較產物。</p><p class="redox-formula" data-redox-equation hidden></p><div class="redox-heat-summary"><span data-redox-heat-value>受熱示意 0%</span><div class="redox-heat-meter" role="progressbar" aria-label="坩堝受熱進度" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><i></i></div></div>';
 const title=detail.querySelector('[data-redox-state]'),live=detail.querySelector('[data-redox-live-view]'),liveLabel=detail.querySelector('[data-redox-live-label]'),explanation=detail.querySelector('[data-redox-explanation]'),equation=detail.querySelector('[data-redox-equation]'),meter=detail.querySelector('[role="progressbar"]');
 cup.innerHTML=scopeMarkup(crucibleArt(key,false,true,{progress:true}),'redox-moving-cup-'+key)+'<span data-redox-cup-label></span>';live.innerHTML=scopeMarkup(crucibleArt(key,false,true,{progress:true}),'redox-moving-inset-'+key);
 function show(){
  const near=crucibleNearFlame(point),ready=state.ready,ratio=state.heatMs/crucibleHeatingMs;
  const mode=ready?'done':near?'heating':state.heatMs>0?'paused':'ready';
  if(ready&&!cooledShown){cooledShown=true;cup.innerHTML=scopeMarkup(crucibleArt(key,true,true),'redox-cooled-cup-'+key)+'<span data-redox-cup-label></span>';live.innerHTML=scopeMarkup(crucibleArt(key,true,true),'redox-cooled-inset-'+key);onCooled();}
  scene.dataset.productView=ready?'cooled':'before';
  scene.dataset.phase=mode;scene.dataset.heating=state.heating?'active':'paused';scene.dataset.heatMs=Math.round(state.heatMs);scene.dataset.cupX=point[0];scene.dataset.cupY=point[1];scene.dataset.support=held?'held':near?'tripod':'mat';
  scene.style.setProperty('--redox-progress',String(Math.max(0,(ratio-.15)/.85)));scene.style.setProperty('--cup-glow','0');cup.classList.toggle('heating',state.heating);
  let message;
  if(ready){title.textContent='加熱完成 · 冷卻後產物';message='已省略冷卻時間，直接呈現冷卻後的產物。'+d.after+'。'+d.text;}
  else if(near){title.textContent='正在加熱';message='坩堝在火焰上方，正在加熱；移開就停止，放回可接續。';}
  else{title.textContent=state.heatMs>0?'已移開 · 停止加熱':'尚未加熱';message=held?'已移離火焰；鬆手後放在耐熱墊上，放回火焰可接續。':state.heatMs>0?'坩堝已放在耐熱墊，進度保留；放回火焰可接續。':'把坩堝從耐熱墊拖到酒精燈上方，開始加熱。';}
  liveLabel.textContent=ready?'冷卻後產物':'目前變化';
  explanation.textContent=ready?d.text:'觀察粉末的變化，移開火焰可暫停比較。';
  equation.hidden=!ready;equation.textContent=ready?d.formula:'';
  cup.querySelector('[data-redox-cup-label]').textContent=ready?'冷卻後產物 · 可移動':near?'加熱中 · 可拖開':held?'拖到耐熱墊上放下':'耐熱墊上 · 拖回可加熱';
  detail.querySelector('[data-redox-heat-value]').textContent='受熱示意 '+Math.round(ratio*100)+'%';meter.setAttribute('aria-valuenow',String(Math.round(ratio*100)));meter.querySelector('i').style.width=(ratio*100)+'%';
  heatTarget.classList.toggle('receiving-heat',state.heating);pad.classList.toggle('drop-active',held&&!near);pad.querySelector('span').hidden=!held;alignCurrent();say(message);
 }
 function tick(){
  if(!alive||!scene.isConnected)return;const now=performance.now(),dt=Math.min(150,now-last);last=now;const before=state;
  state=advanceCrucibleHeating(state,{near:crucibleNearFlame(point),dt:document.hidden?0:dt});
  if(['heatMs','heating','ready'].some(k=>before[k]!==state[k]))show();
  if(state.ready&&!held&&!recorded){recorded=true;root.querySelector('[data-redox-sample="'+key+'"] small').textContent='✓ 已觀察';record(key);root.querySelector('[data-redox-replay]').hidden=false;}if(recorded)return;
  timer=setTimeout(tick,40);
 }
 const release=bindFreeInstrument(cup,scene,{position:point,offset:[80,86],bounds:[80,680,110,390],instrumentClass:'free-crucible',onGrab:()=>{held=true;show();},onMove:(next,grabbing)=>{point=next;held=grabbing;state=advanceCrucibleHeating(state,{near:crucibleNearFlame(point),dt:0});show();},onRelease:crucibleRestPosition});
 onCleanup(()=>{alive=false;clearTimeout(timer);release();});tick();
}

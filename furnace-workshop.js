import {furnaceNextAction} from './furnace-guidance.js';
import {bindDrop} from './direct-manipulation.js';
import {rockIllustration} from './lesson-materials.js';
import {scopeMarkup} from './card-markup.js';
import {factoryArt} from './factory-art.js';
import {createMoltenFlow} from './molten-flow.js';
import {createFactoryAtmosphere} from './factory-atmosphere.js';
export const furnaceZones=[
 ['charge','原料入爐','送料與預熱',[132,291],[15,28],'鐵礦石 ＋ 焦炭 ＋ 石灰石','送料車沿斜橋上升，爐料由上方加入，逐漸向下移動；向上的熱煤氣先預熱爐料。','ore'],
 ['burn','焦炭燃燒','熱從哪裡來？',[450,451],[85,14],'C + O₂ → CO₂ ＋ 熱','熱風由下部風口進入，焦炭燃燒供熱。高溫讓後續反應與熔融得以持續。','heat'],
 ['co','生成 CO','建立還原氣體',[450,381],[85,21.5],'CO₂ + C → 2CO','碳對氧活性比鐵大，是選用碳材的線索。高溫下，CO₂ 與焦炭生成 CO，向上接觸鐵礦。','heat'],
 ['reduce','還原鐵礦','氧轉移到哪裡？',[450,263],[85,29],'Fe₂O₃ + 3CO → 2Fe + 3CO₂','在合適溫度與 CO／CO₂ 比例下，CO 能再接氧形成 CO₂，使氧化鐵失氧、留下鐵。CO 自己被氧化；鐵向下進入更熱區域，熔化並溶入碳。','iron'],
 ['lime','石灰石分解','先形成 CaO',[450,324],[85,36.5],'CaCO₃ → CaO + CO₂','石灰石受熱分解，生成氧化鈣與二氧化碳。氧化鈣接著參與除雜。','limeHeat'],
 ['slag','形成熔渣','雜質的去處',[450,491],[85,44],'CaO + SiO₂ → CaSiO₃','以 SiO₂ 代表礦石雜質；CaO 與它形成熔渣。除雜與還原各有分工。','slag'],
 ['slagTap','出渣口','較高出口',[582,499],[85,51.5],'熔渣在上層 → 排出','本模型的熔渣密度較小，浮在鐵水上，沿較高的出料溝流入渣罐。','slag'],
 ['ironTap','出鐵口','較低出口',[575,560],[85,59],'下層含碳鐵水 → 生鐵','含碳鐵水由較低出口流出。取得的是生鐵，仍須減碳、除雜與控制製程，才能成為好刀材。','iron']
].map(([id,name,tag,at,pos,formula,text,need])=>({id,name,tag,at,pos,formula,text,need}));
export function furnaceState(feeds){const heat=feeds.has('coke')&&feeds.has('air'),iron=heat&&feeds.has('ore'),slag=iron&&feeds.has('lime');return {heat,iron,slag};}
export function mountFurnace(root,c,{record,notice,delay,onCleanup}){
 const loaded=new Set();let heldFeed=null;let loading=false,selected='charge',paused=false,tour=0,alive=true,running=false,completed=false,step=-1,elapsed=0;root.dataset.furnaceFeeds='';root.dataset.furnaceLoading='';
 const labels={ore:'① 鐵礦石',coke:'② 焦炭',air:'③ 熱風管',lime:'③ 石灰石'},col={ore:'#9a6047',coke:'#303b38',lime:'#c5bda3'},hint={ore:'含 Fe₂O₃、雜質',coke:'供熱與 CO 來源',air:'接到風口',lime:'形成熔渣除雜'};
 const air=`<svg viewBox="0 0 140 74" aria-hidden="true"><defs><linearGradient id="air-token"><stop stop-color="#273f47"/><stop offset=".36" stop-color="#b4c3bb"/><stop offset=".56" stop-color="#56747a"/><stop offset="1" stop-color="#1d363f"/></linearGradient></defs><path d="M15 42H75Q95 42 95 20V10" fill="none" stroke="url(#air-token)" stroke-width="23"/><path d="M23 26V57M66 26V57M78 8H113" stroke="#98aea5" stroke-width="5"/><path d="M9 42H65" stroke="#d6bc7b" stroke-width="2" stroke-dasharray="7 5"/></svg>`;
 root.innerHTML=scopeMarkup(`<section class="factory-simulator" aria-label="現代高爐互動工廠"><header class="factory-topline"><div><span>BLAST FURNACE</span><b>讓整座高爐運作起來</b></div><span class="factory-live" data-factory-live>待投料</span></header><div class="factory-feed-rack" aria-label="可拖曳原料">${['ore','coke','lime'].map(k=>`<div class="factory-feed" data-feed="${k}" aria-label="${labels[k]}，${hint[k]}" title="${hint[k]}">${k==='air'?air:rockIllustration(col[k],'factory-'+k)}<span>${labels[k]}</span></div>`).join('')}</div><div class="factory-layout"><div class="factory-stage"><div class="factory-visual">${factoryArt()}<canvas class="factory-atmosphere" aria-hidden="true"></canvas><canvas class="factory-molten" aria-hidden="true"></canvas><div class="factory-charge-target drop-target" data-charge-target><span>送料車 ↓</span></div><button class="factory-heater" data-factory-heat disabled aria-label="原料齊備後，從熱風管啟動加熱">加熱</button>${furnaceZones.map((z,i)=>`<button class="factory-hotspot" data-zone="${z.id}" aria-pressed="false" disabled style="left:${z.pos[0]}%;top:${z.pos[1]}%"><i>${i+1}</i><span>${z.name}<small>${z.tag}</small></span></button>`).join('')}</div><div class="factory-motion-controls"><button data-factory-pause disabled>暫停說明</button><button data-factory-replay disabled>重播 1–8</button></div></div><aside class="factory-panel" aria-live="polite" aria-atomic="true"><span class="factory-panel-kicker" data-zone-kicker></span><h3 data-zone-title></h3><p class="factory-equation" data-zone-equation></p><p data-zone-description></p><div class="factory-requirement" data-zone-requirement></div><div class="factory-product-status"><div><i class="iron-dot"></i><span>含碳鐵水</span><b data-iron-status>尚未形成</b></div><div><i class="slag-dot"></i><span>熔渣分離</span><b data-slag-status>尚未形成</b></div></div><p class="factory-next-hint">每一步自動停留約 6 秒；可暫停閱讀。</p></aside></div><p class="factory-message" aria-live="polite"></p><div class="factory-progress">${['ore','coke','air','lime'].map(k=>`<span data-furnace-step="${k}">${k==='air'?'○ 加熱與完整觀察':'○ '+labels[k].slice(2)}</span>`).join('')}</div></section><p class="model-caption">現代高爐剖面教學模型，並非古代設備。1–8 是解說順序；運作中的各區反應可同時進行。料層、時間與位置簡化；無色氣體用箭頭追蹤，還原實際分多步進行。此處以 SiO₂、CaSiO₃ 代表除雜。</p>`,'industrial-furnace');
 const sim=root.querySelector('.factory-simulator'),visual=root.querySelector('.factory-visual'),message=root.querySelector('.factory-message'),ring=root.querySelector('[data-zone-ring]'),fx=createFactoryAtmosphere(root.querySelector('.factory-atmosphere'));
 const focus=document.createElement('button');focus.className='studio-enter';focus.textContent='進入高爐，查看原料與整座廠房 ↘';focus.addEventListener('click',()=>sim.scrollIntoView({block:'start',behavior:'instant'}));root.prepend(focus);
 const live=document.createElement('p');live.className='factory-live-equation';live.innerHTML='<small></small><b></b>';visual.append(live);
 // Reading order is separate from physical reaction height; the leader locates the selected step.
 const guide=document.createElement('div');guide.className='factory-step-guide';guide.innerHTML='<svg viewBox="0 0 900 650" aria-hidden="true"><path class="factory-step-rail" d="M765 91V383.5"/><path data-zone-leader/><circle data-zone-point r="4"/></svg>';visual.append(guide);
 const leader=guide.querySelector('[data-zone-leader]'),point=guide.querySelector('[data-zone-point]');

 const molten=createMoltenFlow(root.querySelector('.factory-molten'));sim.classList.toggle('molten-ready',!!molten);
 const heatButton=root.querySelector('[data-factory-heat]'),pauseButton=root.querySelector('[data-factory-pause]'),replayButton=root.querySelector('[data-factory-replay]'),panel=root.querySelector('.factory-panel');
 const say=t=>{message.textContent=t;notice(t);};
 const resizeTokens=()=>sim.style.setProperty('--feed-size',Math.max(36,Math.min(86,visual.getBoundingClientRect().width*.11))+'px');
 const tokenObserver=new ResizeObserver(resizeTokens);tokenObserver.observe(visual);resizeTokens();onCleanup(()=>tokenObserver.disconnect());
 const ready=()=>['ore','coke','lime'].every(k=>loaded.has(k))&&!loading;
 onCleanup(()=>{alive=false;tour++;fx?.dispose();molten?.dispose();});
 function guideNext(){
  root.querySelectorAll('.factory-guided').forEach(el=>{el.classList.remove('factory-guided');el.removeAttribute('data-next-label');});
  pauseButton.setAttribute('aria-label',pauseButton.textContent);replayButton.setAttribute('aria-label',replayButton.textContent);
  const next=furnaceNextAction({loaded:[...loaded],loading,running,paused,completed,held:heldFeed,step});sim.dataset.nextAction=next.id;
  let tool=next.id==='feed'?root.querySelector('[data-feed="'+next.feed+'"]'):next.id==='charge'?root.querySelector('[data-charge-target]'):next.id==='heat'?heatButton:next.id==='resume'?pauseButton:next.id==='replay'?replayButton:next.id==='observe'&&step>=0?root.querySelector('[data-zone="'+furnaceZones[step].id+'"]'):null;
  if(tool){tool.classList.add('factory-guided');tool.dataset.nextLabel=next.label;}
  for(const el of root.querySelectorAll('[data-feed]'))el.setAttribute('aria-pressed',String(heldFeed===el.dataset.feed));
 }
 function paint(){
  const heating=running||step>=1,iron=step>=3,slag=step>=5;
  root.dataset.furnaceFeeds=[...loaded].join(',');root.dataset.furnacePhase=completed?'complete':running?(paused?'paused':'running'):'loading';root.dataset.furnaceStep=String(step+1);
  for(const [k,v] of Object.entries({hasOre:loaded.has('ore'),hasCoke:loaded.has('coke'),hasLime:loaded.has('lime'),hasHeat:heating,hasIron:iron,hasSlag:slag,ironTapped:step>=7,slagTapped:step>=6,sequenceStarted:step>=0}))sim.dataset[k]=v;
  fx?.set(heating,paused);molten?.set({iron,slag,ironTapped:step>=7,slagTapped:step>=6},paused);heatButton.disabled=!ready()||running||completed;heatButton.classList.toggle('heater-ready',ready()&&!running&&!completed);heatButton.textContent='加熱';pauseButton.disabled=!running;replayButton.disabled=!completed;
  root.querySelector('[data-factory-live]').textContent=completed?'1–8 觀察完成':running?(paused?'解說已暫停':step<0?'加熱啟動 · 1 秒後開始解說':'依序解說 '+(step+1)+' / 8'):ready()?'原料齊備 · 可以加熱':'先加入三種原料';
  root.querySelector('[data-iron-status]').textContent=step>=7?'由下層出口流出':iron?'爐內形成，等待出鐵':'尚未形成';
  root.querySelector('[data-slag-status]').textContent=step>=6?'由上層出口排出':slag?'浮在鐵水上，等待出渣':'尚未形成';
  for(const k of ['ore','coke','lime'])root.querySelector('[data-furnace-step="'+k+'"]').textContent=(loaded.has(k)?'✓ ':'○ ')+labels[k].slice(2);
  root.querySelector('[data-furnace-step="air"]').textContent=completed?'✓ 加熱與完整觀察':'○ 加熱與完整觀察';guideNext();
 }
 function inspect(index){
  const z=furnaceZones[index];selected=z.id;
  for(const [i,b] of [...root.querySelectorAll('button[data-zone]')].entries()){b.setAttribute('aria-pressed',String(i===index));b.classList.toggle('is-done',completed||i<step);b.disabled=!completed;}
  root.querySelector('[data-zone-kicker]').textContent=String(index+1).padStart(2,'0')+' / 8 · '+z.tag;
  root.querySelector('[data-zone-title]').textContent=z.name;root.querySelector('[data-zone-equation]').textContent=z.formula;root.querySelector('[data-zone-description]').textContent=z.text;
  const req=root.querySelector('[data-zone-requirement]');req.textContent=index===0?'先看送料車，再跟著爐料進入爐內。':index===6||index===7?'這一步是分層排出，不是新的化學反應。':'留意亮起的區域，追蹤物質如何改變。';req.classList.add('ready');
  visual.dataset.zone=z.id;const [x,y]=z.at,[sx,sy]=[z.pos[0]*9,z.pos[1]*6.5];leader.setAttribute('d',index===0?'M'+sx+' '+sy+'V'+(y-35)+'L'+x+' '+y:'M'+sx+' '+sy+'H630L'+x+' '+y);point.setAttribute('cx',x);point.setAttribute('cy',y);
  for(const [k,v] of Object.entries({cx:x,cy:y,rx:index===0?62:index>5?36:63,ry:index>5?21:43}))ring.setAttribute(k,v);
  panel.classList.remove('step-arriving');void panel.offsetWidth;panel.classList.add('step-arriving');
 }
 function begin(){
  if(!ready()||running)return;tour++;const token=tour;running=true;completed=false;paused=false;step=-1;elapsed=0;sim.classList.remove('factory-paused');pauseButton.textContent='暫停說明';
  for(const b of root.querySelectorAll('button[data-zone]')){b.disabled=true;b.setAttribute('aria-pressed','false');b.classList.remove('is-done');}paint();sim.scrollIntoView({block:'start',behavior:'instant'});say('加熱已啟動，1 秒後開始解說。');let last=performance.now();
  function tick(){if(!alive||token!==tour)return;const now=performance.now();if(!paused&&!document.hidden)elapsed+=Math.min(now-last,500);last=now;
   if(elapsed>=(step<0?1000:6000)){elapsed=0;if(step<7){step++;inspect(step);paint();}else{running=false;completed=true;record('air');paint();inspect(7);say('八步觀察完成：焦炭供熱、CO 還原、石灰石除雜，最後分別排出熔渣與生鐵。可重播或點選已完成的步驟複習。');return;}}
   delay(tick,100);
  }delay(tick,100);
 }
 function addFeed(k){
  if(!k||loaded.has(k)||loading||running||completed)return;
  const item=root.querySelector('[data-feed="'+k+'"]');item.classList.add('feed-loaded');item.setAttribute('aria-disabled','true');heldFeed=null;loading=true;root.dataset.furnaceLoading=k;sim.classList.add('charging');paint();say('送料車正在把原料送入爐頂……');
  delay(()=>{if(!alive)return;loaded.add(k);loading=false;root.dataset.furnaceLoading='';sim.classList.remove('charging');record(k);paint();say(ready()?'三種原料已備妥，點「加熱」開始觀察。':'原料已入爐，拿取下一種原料。');},1900);
 }
 for(const item of root.querySelectorAll('[data-feed]')){const k=item.dataset.feed;
  bindDrop(item,root.querySelector('[data-charge-target]'),{disabled:()=>loaded.has(k)||loading||running||completed,highlightOnPickup:false,onMove:()=>{if(!loading&&!running&&!completed&&!loaded.has(k)){heldFeed=k;guideNext();}},onDrop:()=>addFeed(k),onMiss:()=>{heldFeed=null;paint();say('把原料放進送料車，或先點原料再點送料車。');}});
  item.addEventListener('click',()=>{if(loaded.has(k)||loading||running||completed)return;heldFeed=heldFeed===k?null:k;paint();});
 }
 const chargeTarget=root.querySelector('[data-charge-target]');chargeTarget.tabIndex=0;chargeTarget.setAttribute('role','button');chargeTarget.setAttribute('aria-label','將選取的原料放入送料車');chargeTarget.addEventListener('click',()=>addFeed(heldFeed));chargeTarget.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();addFeed(heldFeed);}});
 heatButton.addEventListener('click',begin);replayButton.addEventListener('click',begin);
 pauseButton.addEventListener('click',()=>{if(!running)return;paused=!paused;sim.classList.toggle('factory-paused',paused);pauseButton.textContent=paused?'繼續說明':'暫停說明';paint();});
 for(const [i,b] of [...root.querySelectorAll('button[data-zone]')].entries())b.addEventListener('click',()=>{if(completed)inspect(i);});
 root.querySelector('[data-zone-kicker]').textContent='準備開始';root.querySelector('[data-zone-title]').textContent='先備料，再加熱';root.querySelector('[data-zone-equation]').textContent='鐵礦石 ＋ 焦炭 ＋ 石灰石';root.querySelector('[data-zone-description]').textContent='三種原料拖進送料車後，點「加熱」。1–8 會自動亮起，帶你追蹤整座高爐。';root.querySelector('[data-zone-requirement]').textContent='✓ 熱風管已接妥，等待啟動';paint();say('把鐵礦石、焦炭與石灰石拖進送料車；原料齊備後即可加熱。');
}

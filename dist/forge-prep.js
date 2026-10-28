import {storySpeech,definitionDialogue,notebookMarkup} from './story-dialogue.js';
import {mountEverydayRedox,resetEverydayRedox,savedLifeStatus} from './everyday-redox.js';
import {magnesiumReactionMarkup} from './magnesium-paired-reaction.js';
import {bindIronReaction} from './iron-paired-reaction.js';
import {bindDrop} from './direct-manipulation.js';
import {prepScenes,affinityOrder,affinityNames,prepQuizzes,freshPrep,restorePrep,prepReady,prepMastered,checkAffinity} from './forge-prep-model.js';
import {affinityReference,pairedRedoxPrinciple,specimenArt} from './oxygen-affinity.js';
const key='lost-forge-preparation-v1';
const titles=['沒有火焰，也算氧化？','碳為什麼能把鐵找回來？','氧化，一定伴隨還原','日常生活中的氧化還原'];
// A pointer drag can also dispatch click; keep its result feedback intact.
function distinguishDrag(item){let origin=null,moved=false;item.addEventListener('pointerdown',e=>{origin=[e.clientX,e.clientY];moved=false;});item.addEventListener('pointermove',e=>{if(origin&&Math.hypot(e.clientX-origin[0],e.clientY-origin[1])>4)moved=true;});item.addEventListener('pointerup',()=>{origin=null;});item.addEventListener('click',e=>{if(moved){e.preventDefault();e.stopImmediatePropagation();moved=false;}},true);}
const sceneArt=id=>`<div class="prep-scene-art prep-art-${id}" aria-hidden="true"><span>${({burn:'炭火近觀',rust:'鏽層近觀',breath:'粒線體與葉綠體示意',ice:'冰水共存'})[id]}</span></div>`;
export function mountForgePrep(root){
 let s=freshPrep(),cleanups=[],selected=null,status='',saved=true;
 try{s=restorePrep(JSON.parse(localStorage.getItem(key)||'null'));}catch{saved=false;}
 const save=()=>{try{localStorage.setItem(key,JSON.stringify(s));}catch{saved=false;}root.dispatchEvent(new CustomEvent('prep-progress',{bubbles:true,detail:[0,1,2].filter(i=>prepMastered(s,i)).length}));};
 const say=text=>{status=text;root.querySelector('[data-prep-status]').textContent=text;};
 function render(){
  cleanups.forEach(f=>f());cleanups=[];selected=null;
  const i=s.tab,q=prepQuizzes[i],life=savedLifeStatus(),ready=prepReady(s,i),mastered=i===3?life.mastered:prepMastered(s,i);
  root.innerHTML=`<header class="chapter-header"><div class="chapter-kicker"><span>工坊試煉｜先認識氧化</span><span>01</span></div><h2 id="forge-prep-title">先弄懂氧，才找得回金屬</h2><p class="core-question">認識氧化、對氧活性與氧的轉移；到生活中找配對，再到樣本架驗證。</p></header>
  <div class="chapter-body">${definitionDialogue()}<div class="prep-conversation story-speech story-speech--${i===0?'kui':'grandpa'}"><span class="story-portrait story-portrait--${i===0?'kui':'grandpa'}" data-expression="${i===0?'curious':'thoughtful'}" aria-hidden="true"></span><p><b>${i===0?'小葵':'阿公'}</b>${['「木炭有火，鐵鏽沒有火。它們都和氧有關嗎？」','「先看誰比較容易和氧結合。碳排在鐵的哪一邊？能幫我們把鐵找回來嗎？」','「氧不會憑空消失。要找出誰被還原，就一起找出誰被氧化。」','「剛才看到一邊失氧、另一邊得氧。回到葉子、衣物和蘋果，能不能也找到一起改變的兩邊？」'][i]}</p></div>
  <div class="prep-tabs" role="group" aria-label="四張工坊試煉">${titles.map((t,j)=>`<button data-prep-tab="${j}" aria-pressed="${i===j}"><span>${(j===3?life.mastered:prepMastered(s,j))?'✓':String.fromCharCode(65+j)}</span><b>${['辨認氧化','對氧活性大小','氧化與還原成對','日常生活中的<br>氧化還原'][j]}</b></button>`).join('')}</div>
  <section class="prep-studio" aria-label="${titles[i]}"><header class="prep-studio-head"><div><small>WORKSHOP / ${String.fromCharCode(65+i)}</small><h3>${titles[i]}</h3></div><div class="prep-studio-tools"><button type="button" class="card-reset card-reset-inverse" data-prep-reset aria-label="重設試煉 ${String.fromCharCode(65+i)}：${titles[i]}">↺ 重設本卡</button><span data-prep-count>${i===0?s.sorted.length+' / 4 份紀錄':i===1?s.order.length+' / 4 個位置':i===2?s.moved.length+' / 2 個氧':life.count+' / 6 份線索'}</span></div></header>
  <div data-prediction-activity>${i===0?classification():i===1?ranking():i===2?redoxExamples():dailyExamples()}</div>
  <p class="prep-live" data-prep-status role="status">${status||(i===0&&ready?'四張圖卡已分類完成，對照下方說明，再整理重點。':['先選一張觀察圖卡，再點下方分類；也可以直接拖進分類區。','先點活性表中的元素，和碳比較；再用線索排出鎂、碳、鐵、銅。','按下反應鍵，追蹤氧從 CO₂ 移到鎂，看兩邊同時改變。','選一個生活情境，依提示拿取物質，放入反應區，找出誰被氧化、誰被還原。'][i])}</p></section>
  ${notebookMarkup(String.fromCharCode(65+i))}
  ${i<3?`<section class="prep-quiz prep-understanding" ${ready?'':'hidden'} aria-label="小試身手"><small>小試身手 · 檢查理解</small><h3>${q.question}</h3><div class="prep-answers">${q.options.map((a,j)=>`<button data-prep-answer="${j}" aria-pressed="${s.answers[i]===j}" class="${s.answers[i]===j?(j===q.answer?'correct':'wrong'):''}">${String.fromCharCode(65+j)}　${a}</button>`).join('')}</div><p class="prep-feedback" role="status">${s.answers[i]===null?'':(mastered?'✓ 答對了。':'正確答案是 '+String.fromCharCode(65+q.answer)+'。')+q.reason}</p></section>`:''}
  <div class="prep-footer"><button class="text-button" data-prep-reset>重設這張試煉</button><span>${saved?'操作與作答會保存在這台裝置。':'本次可操作；瀏覽器暫時無法保存進度。'}</span>${i<3?`<button class="primary" data-prep-next ${mastered?'':'disabled'}>帶著線索，進入${['活性排序','氧的轉移','D 生活情境'][i]} →</button>`:`<a class="primary" href="#card-2">02 到樣本架找證據 →</a>`}</div></div>`;
  root.querySelectorAll('[data-prep-tab]').forEach(b=>b.onclick=()=>{s.tab=+b.dataset.prepTab;status='';render();save();root.querySelector('[data-prep-tab="'+s.tab+'"]').focus({preventScroll:true});});
  root.querySelector('[data-prep-next]')?.addEventListener('click',()=>{if(!prepMastered(s,s.tab))return;s.tab++;status='';render();save();root.querySelector('.prep-tabs').scrollIntoView({block:'start',behavior:'instant'});});
  root.querySelectorAll('[data-prep-reset]').forEach(b=>b.onclick=()=>{if(i===0)s.sorted=[];if(i===1){s.order=[];s.referenceElement='Fe';}if(i===2){s.moved=[];s.targets=[];s.ironPairs=[];}if(i===3){resetEverydayRedox();root.dispatchEvent(new CustomEvent('life-progress',{bubbles:true,detail:0}));}else s.answers[i]=null;status='已重設這張試煉，可以再試一次。';render();save();root.querySelector('.prep-studio-head [data-prep-reset]').focus({preventScroll:true});});
  root.querySelectorAll('[data-prep-answer]').forEach(b=>b.onclick=()=>{if(!prepReady(s,i))return;s.answers[i]=+b.dataset.prepAnswer;render();save();});
  if(i===0)bindClassification();if(i===1){bindRanking();bindAffinityReference();}
  if(i===2)bindRedoxExamples();if(i===3)bindDailyExamples();
 }
 function classification(){return `<div class="prep-oxidation-intro">${storySpeech('grandpa','「前面我們認識了：氧化是物質與氧結合的過程。氧化有劇烈的，也有緩慢的。接著看看這四件事，分別屬於哪一種變化？」','mentor')}${storySpeech('kui','「我來把圖卡放進分類格，看看哪些和氧化有關，哪些只是物理變化！」')}</div><p class="prep-instruction">抓起圖卡，放進對應的格子；也可以點選圖卡，再點分類格。</p><div class="prep-scenes" ${s.sorted.length===prepScenes.length?'hidden':''}>${prepScenes.map(x=>s.sorted.includes(x.id)?`<div class="prep-source-empty" aria-label="${x.title}已移到分類格"><span>✓ ${x.title}</span><small>已放入下方分類格</small></div>`:`<button class="prep-observation" data-scene="${x.id}" aria-label="${x.title}">${sceneArt(x.id)}<small>${x.tag}</small><strong>${x.title}</strong><span>抓起圖卡 ↓</span></button>`).join('')}</div><div class="prep-bins">${[['fast','劇烈的氧化','短時間，明顯放熱'],['slow','緩慢的氧化','沒有火焰，也在變化'],['physical','物理變化','物質種類沒有改變']].map(([id,title,sub])=>`<section class="prep-bin-column"><header><b id="bin-title-${id}">${title}</b><small>${sub}</small></header><button class="prep-bin" data-bin="${id}" aria-labelledby="bin-title-${id}">${prepScenes.filter(x=>x.kind===id&&s.sorted.includes(x.id)).map(x=>`<span class="prep-filed-card" data-filed-scene="${x.id}">${sceneArt(x.id)}<strong>${x.title}</strong><small>✓ 已分類</small></span>`).join('')||'<span class="prep-empty">放到這裡</span>'}</button></section>`).join('')}</div><div class="prep-evidence">${s.sorted.map(id=>{const x=prepScenes.find(a=>a.id===id);return `<p><b>${x.title}</b>${x.detail}<small>${x.equation}</small></p>`;}).join('')}</div><details class="prep-note"><summary>課本之外，再想一步：光合作用呢？</summary><p>光合作用中，水失去電子、被氧化成氧氣；二氧化碳得到電子、被還原並用來合成糖。這張圖卡歸在沒有火焰的生物氧化例子，不代表光合作用整體只有氧化，也不代表所有步驟都很慢。<a href="https://openstax.org/books/biology-ap-courses/pages/8-2-the-light-dependent-reaction-of-photosynthesis" target="_blank" rel="noopener">OpenStax：光合作用的氧化與還原 ↗</a></p></details>`;}
 function classify(id,bin){const x=prepScenes.find(a=>a.id===id);if(!x||s.sorted.includes(id))return;if(x.kind!==bin){say(x.title+'應放在「'+({fast:'劇烈的氧化',slow:'緩慢的氧化',physical:'物理變化'})[x.kind]+'」。'+x.detail+' 再放一次，留下你的紀錄。');return;}s.sorted.push(id);selected=null;status=x.title+'已歸檔。'+x.detail;render();save();}
 function bindClassification(){
  const bins=[...root.querySelectorAll('[data-bin]')];let target=null;
  root.querySelectorAll('[data-scene]:not(:disabled)').forEach(item=>{
   distinguishDrag(item);
   item.onclick=()=>{selected=item.dataset.scene;root.querySelectorAll('[data-scene]').forEach(b=>b.setAttribute('aria-pressed',String(b===item)));say('已選「'+prepScenes.find(x=>x.id===selected).title+'」，點一個紀錄匣。');};
   let reset;reset=bindDrop(item,()=>target||bins[0],{onMove:(_,r)=>{target=bins.find(b=>{const z=b.getBoundingClientRect();return r.left+r.width/2>=z.left&&r.left+r.width/2<=z.right&&r.top+r.height/2>=z.top&&r.top+r.height/2<=z.bottom;})||null;},onDrop:()=>{if(target)classify(item.dataset.scene,target.dataset.bin);reset();target=null;},onMiss:()=>{if(target)classify(item.dataset.scene,target.dataset.bin);else say('圖卡還沒進入紀錄匣，請再拖一次，或點選圖卡後點分類。');reset();target=null;}});cleanups.push(reset);
  });bins.forEach(b=>b.onclick=()=>selected?classify(selected,b.dataset.bin):say('先選一張上方圖卡，再點分類。'));
 }
 function ranking(){return `${affinityReference(s.referenceElement)}<h4 class="prep-sort-heading">換你排：把煉鐵用得上的線索留下</h4><p class="prep-instruction">從對氧活性較大到較小，排出鎂、碳、鐵、銅四個位置。</p><div class="prep-clues"><b>可用線索</b><span>鎂能從 CO₂ 取得氧</span><span>合適高溫下，碳可還原鐵、銅的氧化物</span><span>這組比較中，鐵比銅容易氧化</span></div><div class="prep-affinity-arrow"><span>較容易得氧</span><i></i><span>較不容易得氧</span></div><div class="prep-order">${[0,1,2,3].map(j=>`<button data-order-slot="${j}" class="prep-order-slot ${s.order[j]?'filled':''}" aria-label="第 ${j+1} 個位置${s.order[j]?'，'+affinityNames[s.order[j]]+'，點擊移回':''}"><small>${String(j+1).padStart(2,'0')}</small>${s.order[j]?specimenArt(s.order[j]):''}<b>${s.order[j]||'＋'}</b><span>${s.order[j]?affinityNames[s.order[j]]:'放入元素'}</span></button>`).join('')}</div><div class="prep-elements">${['Cu','Mg','Fe','C'].filter(id=>!s.order.includes(id)).map(id=>`<button class="prep-element prep-element-${id}" data-element="${id}" aria-label="${affinityNames[id]}，放入下一個空位">${specimenArt(id)}<b>${id}</b><span>${affinityNames[id]}</span><small>拖入順位 ↑</small></button>`).join('')}</div><div class="prep-rank-tools"><button data-check-order class="primary" ${s.order.length<4?'disabled':''}>檢查排列</button><button data-clear-order class="text-button">重新排列</button></div>${prepReady(s,1)?`<div class="prep-stability"><div><small>元素的一面</small><b>鎂較容易與氧反應</b><p>元素對氧活性較大，較容易得到氧。</p></div><span>⇄</span><div><small>氧化物的一面</small><b>MgO 較難把氧交出去</b><p>與氧的結合較穩定，不代表容易分解。</p></div></div>`:''}`;}
 function placeElement(id,slot){if(s.order.includes(id))return;const next=s.order.length;if(slot!==next){say('先填第 '+(next+1)+' 個位置，再往右排。');return;}s.order.push(id);s.answers[1]=null;status=s.order.length===4?'四個位置放好了。點「檢查排列」，再比較元素與氧化物。':'已放入'+affinityNames[id]+'。繼續向右排列。';render();save();}
 function bindRanking(){const slots=[...root.querySelectorAll('[data-order-slot]')];let target=null;root.querySelectorAll('[data-element]').forEach(item=>{distinguishDrag(item);item.onclick=()=>placeElement(item.dataset.element,s.order.length);let reset;reset=bindDrop(item,()=>target||slots[s.order.length]||slots[3],{onMove:(_,r)=>{target=slots.find(b=>{const z=b.getBoundingClientRect();return r.left+r.width/2>=z.left&&r.left+r.width/2<=z.right&&r.top+r.height/2>=z.top&&r.top+r.height/2<=z.bottom;})||null;},onDrop:()=>{if(target)placeElement(item.dataset.element,+target.dataset.orderSlot);reset();target=null;},onMiss:()=>{if(target)placeElement(item.dataset.element,+target.dataset.orderSlot);else say('請放進順位框；也可以點元素，依序加入。');reset();target=null;}});cleanups.push(reset);});slots.forEach(b=>b.onclick=()=>{const j=+b.dataset.orderSlot;if(j<s.order.length){s.order.splice(j,1);s.answers[1]=null;status='已把這個元素移回候選區。';render();save();}});root.querySelector('[data-clear-order]').onclick=()=>{s.order=[];s.answers[1]=null;status='從較容易得氧的一端重新排起。';render();save();};root.querySelector('[data-check-order]').onclick=()=>say(checkAffinity(s.order)?'✓ Mg ＞ C ＞ Fe ＞ Cu。留得住氧的元素，形成的氧化物通常也較穩定。':'參考順序是 Mg ＞ C ＞ Fe ＞ Cu。再讀線索，點錯位的元素移回後重排。');}
 function bindAffinityReference(){
  root.querySelectorAll('[data-affinity]').forEach(b=>b.onclick=()=>{s.referenceElement=b.dataset.affinity;render();save();root.querySelector('[data-affinity="'+s.referenceElement+'"]').focus({preventScroll:true});});
 }
 function redoxExamples(){return pairedRedoxPrinciple()+'<p class="prep-instruction">按下反應鍵，追蹤鎂與 CO₂ 之間的氧轉移。<b>同一批氧，讓兩邊一起改變。</b></p>'+transfer();}
 function dailyExamples(){return '<div class="redox-principle"><small>沿用 C 的線索，從工坊看回生活</small><strong>失去電子 → 氧化　｜　得到電子 → 還原</strong><p>得氧、失氧是入門線索；用電子轉移，找出生活反應中同時改變的兩邊。</p></div><div class="redox-examples" role="group" aria-label="日常生活中的氧化還原情境">'+[['biology','葉子與細胞'],['bleach','實驗室漂白'],['food','蘋果保鮮']].map(([id,label])=>'<button data-redox-example="'+id+'" aria-pressed="'+((s.reaction==='magnesium'?'biology':s.reaction)===id)+'">'+label+'</button>').join('')+'</div><div id="everyday-redox" class="life-integrated"></div>';}
 function bindDailyExamples(){
  root.querySelectorAll('[data-redox-example]').forEach(b=>b.onclick=()=>{s.reaction=b.dataset.redoxExample;status='';render();save();root.querySelector('[data-redox-example="'+s.reaction+'"]').focus({preventScroll:true});});
  cleanups.push(mountEverydayRedox(root.querySelector('#everyday-redox'),{tab:{biology:0,bleach:1,food:2}[s.reaction]??0}));
 }
 function bindRedoxExamples(){
  cleanups.push(bindIronReaction(root.querySelector('[data-iron-reaction]'),()=>{
   s.moved=[0,1];s.targets=[0,1];status='CO₂ 失去氧，被還原成碳；鎂得到氧，被氧化成氧化鎂。兩者同時發生，氧原子總數不變。';
   render();save();
   let frame=requestAnimationFrame(()=>{frame=requestAnimationFrame(()=>{
    root.querySelector('[data-iron-reaction]')?.scrollIntoView({block:'start',behavior:'instant'});
    root.querySelector('[data-react]')?.focus({preventScroll:true});
   });});cleanups.push(()=>cancelAnimationFrame(frame));
  }));
 }
 function transfer(){return magnesiumReactionMarkup(s.moved,s.targets);}

 const refreshLife=()=>{const life=savedLifeStatus(),badge=root.querySelector('[data-prep-tab="3"]>span');if(badge)badge.textContent=life.mastered?'✓':'D';if(s.tab===3)root.querySelector('[data-prep-count]').textContent=life.count+' / 6 份線索';};
 root.addEventListener('life-progress',refreshLife);
 const openLife=()=>{s.tab=3;if(s.reaction==='magnesium')s.reaction='biology';render();save();requestAnimationFrame(()=>root.querySelector('.redox-examples')?.scrollIntoView({block:'start',behavior:'instant'}));};
 const onHash=()=>{if(location.hash==='#everyday-redox')openLife();};
 window.addEventListener('hashchange',onHash);
 if(location.hash==='#everyday-redox'){s.tab=3;s.reaction='biology';}
 render();save();return ()=>{cleanups.forEach(f=>f());window.removeEventListener('hashchange',onHash);root.removeEventListener('life-progress',refreshLife);};
}

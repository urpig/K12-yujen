import {biologyObservation,bleachObservation,bindLifeObservation} from './life-observation.js';
import {createFoodPlayback} from './food-playback.js';
import {predictionMarkup,mountPrediction,hasPrediction,clearPrediction} from './prediction.js';
import {lifeBiology,lifeBleaches,lifeEvidence,lifeQuiz,freshLife,restoreLife,lifeReady,lifeMastered,lifeRecord,appleComparison} from './everyday-redox-model.js';
import {appleArt} from './everyday-redox-art.js';
const storageKey='lost-forge-everyday-redox-v1';
const titles=['葉子與細胞','衣物褪色','蘋果保鮮'];
const evidenceLabels={photo:'光合作用的配對',resp:'有氧呼吸的配對',peroxide:'過氧化氫的角色',chlorine:'次氯酸鈉的角色',sulfur:'二氧化硫的角色',food:'維生素 C 的角色'};
const roleName=r=>r==='oxidation'?'被氧化':'被還原';
export function mountEverydayRedox(root){
 let s=freshLife(),message='',saved=true,predictionControl,foodPlayback=null,foodCleanup=()=>{},foodViewTime=0,foodPaused=false,foodVisible=false,sceneCleanup=()=>{};
 const reducedMotion=matchMedia('(prefers-reduced-motion:reduce)');
 try{s=restoreLife(JSON.parse(localStorage.getItem(storageKey)||'null'));}catch{saved=false;}
 const save=()=>{try{localStorage.setItem(storageKey,JSON.stringify(s));}catch{saved=false;}root.dispatchEvent(new CustomEvent('life-progress',{bubbles:true,detail:lifeMastered(s)?1:0}));};
 const focus=selector=>root.querySelector(selector)?.focus({preventScroll:true});
 function render(returnFocus){sceneCleanup();sceneCleanup=()=>{};foodCleanup();foodCleanup=()=>{};foodPlayback=null;if(s.tab!==2)root.dataset.lifePlayback='inactive';const predictionId='life-'+s.tab;
  root.innerHTML=`<header class="chapter-header"><div class="chapter-kicker"><span>工坊筆記｜把觀念帶回生活</span><div class="chapter-actions"><span>02 / 7</span><button class="card-reset" data-life-reset>↺ 重設本卡</button></div></div><h2 id="everyday-redox-title">日常生活中的氧化還原</h2><p class="core-question">葉片放出氧氣、衣物褪色、蘋果變褐，都能找到氧化與還原的另一半嗎？</p></header>
  <div class="chapter-body"><div class="prep-conversation"><span class="story-portrait story-portrait--kui" data-expression="curious" aria-hidden="true"></span><p><b>小葵</b>「剛才追過氧的去向，那窗邊的葉子呢？它明明會放出氧氣！」<br><b>阿公</b>「把生活中的反應成對找出來，再回到礦石。我們就不會只憑顏色下結論。」</p></div>
  <div class="life-simple-intro"><b>從看得見的變化，找出氧化與還原。</b><p>先留下一個猜想，再按下觀察。每次只看一個情境，最後把兩邊的變化配成一對。</p></div>
  <div class="prep-tabs life-tabs" role="group" aria-label="生活中的三個觀察場景">${titles.map((t,i)=>`<button data-life-tab="${i}" aria-pressed="${s.tab===i}"><span>${['A','B','C'][i]}</span><b>${t}</b></button>`).join('')}</div>
  <section class="prep-studio life-studio" aria-label="${titles[s.tab]}"><header class="prep-studio-head"><div><small>EVERYDAY / ${['LEAF & CELL','COLOUR & CHANGE','FOOD & TIME'][s.tab]}</small><h3>${titles[s.tab]}</h3></div><div class="prep-studio-tools"><button class="card-reset card-reset-inverse" data-life-reset aria-label="重設日常生活中的氧化還原整張卡">↺ 重設本卡</button><span class="life-count">${s.evidence.length} / 6 份線索</span></div></header>${predictionMarkup(predictionId)}<div data-prediction-activity inert>${s.tab===0?biology():s.tab===1?bleaching():food()}</div><div data-prediction-review hidden></div><p class="prep-live" data-life-status role="status">${!hasPrediction(predictionId)?'先觀察場景，再留下上方的猜想，就能開始操作。':message||['選好場景，按下「開始觀察」，再回答下面的小問題。','先選一種漂白方式、觀察結果，再判斷漂白劑自己的變化。','自動播放前後變化，同時比較兩片蘋果；可暫停或重播。'][s.tab]}</p></section>
  <div class="life-records" aria-label="已取得的生活線索">${lifeEvidence.map(k=>`<span class="${s.evidence.includes(k)?'done':''}">${s.evidence.includes(k)?'✓':'○'} ${evidenceLabels[k]}</span>`).join('')}</div>
  <section class="prep-quiz" ${lifeReady(s)&&[0,1,2].every(i=>hasPrediction('life-'+i))?'':'hidden'} aria-label="生活氧化還原小試身手"><small>小葵的筆記 · 檢查理解</small><h3>${lifeQuiz.question}</h3><div class="prep-answers">${lifeQuiz.options.map((a,i)=>`<button data-life-answer="${i}" aria-pressed="${s.answer===i}" class="${s.answer===i?(i===lifeQuiz.answer?'correct':'wrong'):''}">${String.fromCharCode(65+i)}　${a}</button>`).join('')}</div><p class="prep-feedback" role="status">${s.answer===null?'':(s.answer===lifeQuiz.answer?'✓ 答對了。':'再試一次。')+lifeQuiz.reason}</p></section>
  <div class="life-bridge"><b>帶著新線索，回到樣本架</b><p>褪色不一定代表同一種反應，沒火焰也可能發生氧化還原。下一步實際比較燃燒前後的產物，再用石蕊試紙補上證據。</p></div>
  <details class="life-sources"><summary>模型說明與資料依據</summary><p>這張卡把附圖的概念改寫為生活觀察；圖像、時間與顏色皆為教學示意。生物反應分很多步，電子箭頭代表整體收支，不是電子直接穿越空間。光合作用總反應式省略中間步驟；釋放的氧氣來自水。</p><ul><li><a href="https://openstax.org/books/biology-2e/pages/8-1-overview-of-photosynthesis" target="_blank" rel="noopener">OpenStax：光合作用的總反應與能量</a></li><li><a href="https://www.ncbi.nlm.nih.gov/books/NBK26819/" target="_blank" rel="noopener">NCBI：水的氧化與二氧化碳的還原</a></li><li><a href="https://openstax.org/books/biology-2e/pages/7-1-energy-in-living-systems" target="_blank" rel="noopener">OpenStax：電子轉移與氧化還原配對</a></li><li><a href="https://ift.onlinelibrary.wiley.com/doi/10.1111/j.1365-2621.1989.tb07931.x" target="_blank" rel="noopener">食品科學研究：蘋果褐變與抗壞血酸</a></li><li><a href="https://edu.rsc.org/soundbite/hydrogen-peroxide/2021244.article" target="_blank" rel="noopener">英國皇家化學學會：過氧化氫與氧化漂白</a></li><li><a href="https://www.fda.gov/food/food-additives-and-gras-ingredients-information-consumers/types-food-ingredients" target="_blank" rel="noopener">FDA：食品中的抗氧化成分</a></li><li><a href="https://www.cdc.gov/infection-control/hcp/disinfection-sterilization/chemical-disinfectants.html" target="_blank" rel="noopener">CDC：含氯漂白劑的使用限制</a></li></ul></details>
  <div class="prep-footer life-footer"><a href="#forge-prep" class="previous">← 01 工坊試煉</a><button class="text-button" data-life-reset>重設本卡</button><a href="#card-2" class="primary">03 到樣本架找證據 →</a><small>${saved?'本卡的觀察與作答會自動保存。':'本次可操作，瀏覽器暫時無法保存。'}</small></div></div>`;
  predictionControl=mountPrediction(root.querySelector('[data-prediction-host]'),predictionId,{activity:root.querySelector('[data-prediction-activity]'),review:root.querySelector('[data-prediction-review]'),observed:s.tab===0?s.seen.some(k=>['photo','resp'].includes(k)):s.tab===1?s.seen.some(k=>['peroxide','chlorine','sulfur'].includes(k)):s.time>0,onStart:()=>{syncFoodPlayback();root.querySelector('[data-life-status]').textContent=message||'猜想已留下，現在可以操作並收集證據。';root.querySelector('.prep-quiz').hidden=!(lifeReady(s)&&[0,1,2].every(i=>hasPrediction('life-'+i)));}});bind();if(s.tab===2)setupFoodPlayback();else sceneCleanup=bindLifeObservation(root.querySelector('[data-life-observation]'),()=>{
   const key=s.tab===0?s.bio:s.bleach;if(!s.seen.includes(key))s.seen.push(key);predictionControl.setObserved(true);message='';render('[data-life-play]');save();let frame=requestAnimationFrame(()=>{frame=requestAnimationFrame(()=>root.querySelector('[data-life-observation]')?.scrollIntoView({block:'start',behavior:'instant'}));});const dispose=sceneCleanup;sceneCleanup=()=>{cancelAnimationFrame(frame);dispose();};
  });if(returnFocus)focus(returnFocus);
 }
 function biology(){return biologyObservation(s,message);}
 function bleaching(){return bleachObservation(s,message);}
 function food(){return `<p class="prep-instruction">自動播放同一段時間；同一顆蘋果、相同空氣與溫度，只比較<b>有沒有維生素 C</b>。</p><div class="life-apples">${['plain','protected'].map(k=>`<figure>${appleArt(k)}<figcaption><b>${k==='plain'?'沒有維生素 C':'加了維生素 C'}</b><span data-apple-caption="${k}"></span></figcaption></figure>`).join('')}</div><div class="life-time-control"><div class="life-playback-heading"><b>自動播放，看前後變化</b><output data-life-time-label></output></div><ol class="life-time-stages" aria-label="前後變化的示意階段"><li data-food-stage="0">剛切開</li><li data-food-stage="2">一段時間後</li><li data-food-stage="4">更久以後</li></ol><div class="life-playback-controls"><span data-food-play-state role="status"></span><button type="button" data-food-pause>暫停對照</button><button type="button" data-food-replay>↺ 重播前後對照</button></div><div class="life-reserve"><span>維生素 C 的剩餘保護能力（示意）</span><div><i data-life-reserve></i></div><b data-life-reserve-label></b></div><p>左邊先變褐；右邊受維生素 C 保護，較慢變色。保護用完後，右邊也會逐漸變褐。</p></div><div class="life-path-task"><h4>維生素 C 保護食物時，自己發生什麼變化？</h4><p>看過後段的自動對照，再比較保護作用用完後的差異。</p><div class="life-role-choices">${['oxidation','reduction'].map(r=>`<button data-life-food-role="${r}" ${s.time<3?'disabled':''} class="${s.evidence.includes('food')&&r==='oxidation'?'chosen':''}">自己${roleName(r)}</button>`).join('')}</div><p class="life-answer-feedback" role="status">${message}</p><p class="life-discovery" data-life-food-discovery ${s.evidence.includes('food')?'':'hidden'}>✓ 維生素 C 先被氧化，幫部分褐變中間產物還原。保護能力有限，不是讓氧化永遠停止。</p></div><p class="life-model-note">播放速度、顏色與保護能力為定性示意，不代表實測分鐘或濃度。胡蘿蔔素、維生素 E 也是抗氧化成分的例子，作用環境各有不同；抗氧化不能取代冷藏、衛生與保存期限。</p>`;}
 function updateFood(){
  const time=reducedMotion.matches?Math.floor(foodViewTime):foodViewTime,x=appleComparison(time),stage=Math.floor(time),labels=['剛切開','稍後','一段時間後','保護逐漸用完','更久以後'];
  const text=(selector,value)=>{const node=root.querySelector(selector);if(node&&node.textContent!==value)node.textContent=value;};
  text('[data-life-time-label]',labels[stage]);for(const k of ['plain','protected'])root.querySelector(`[data-apple="${k}"]`).setAttribute('opacity',String(x[k]*.84));
  text('[data-apple-caption="plain"]',stage===0?'淡色切面':stage>=3?'褐變明顯':'逐漸褐變');text('[data-apple-caption="protected"]',stage===0?'同樣的起點':stage===4?'保護減弱，也開始褐變':'顏色維持較淡');
  root.querySelector('[data-life-reserve]').style.width=x.reserve*100+'%';text('[data-life-reserve-label]',time===0?'尚未消耗':x.reserve>0?'逐漸消耗':'已用完');
  const current=stage<2?0:stage<4?2:4;root.querySelectorAll('[data-food-stage]').forEach(e=>{if(Number(e.dataset.foodStage)===current)e.setAttribute('aria-current','step');else e.removeAttribute('aria-current');});
  root.querySelectorAll('[data-life-food-role]').forEach(b=>b.disabled=s.time<3);root.querySelector('.life-time-control').dataset.time=foodViewTime.toFixed(2);
 }
 function syncFoodPlayback(){foodPlayback?.setActive(foodVisible&&!document.hidden&&!document.querySelector('dialog[open]')&&s.tab===2&&hasPrediction('life-2')&&root.isConnected);}
 function setupFoodPlayback(){
  foodVisible=false;
  foodPlayback=createFoodPlayback({initialTime:foodViewTime,initialPaused:foodPaused,onTime:time=>{
   foodViewTime=time;const checkpoint=Math.floor(time);if(hasPrediction('life-2')&&checkpoint>s.time){s.time=checkpoint;predictionControl.setObserved(true);save();}updateFood();
  },onState:state=>{
   foodPaused=state.paused;const status=!hasPrediction('life-2')?'留下上方猜想後，自動播放':state.complete?'前後對照已播放完成':state.paused?'已暫停':state.running?'自動播放中':'回到圖卡後自動繼續';root.dataset.lifePlayback=state.complete?'complete':state.paused?'paused':state.running?'playing':'waiting';
   const text=root.querySelector('[data-food-play-state]');if(text.textContent!==status)text.textContent=status;const button=root.querySelector('[data-food-pause]');button.textContent=state.paused?'繼續播放':'暫停對照';button.disabled=state.complete;
  }});
  const observer=new IntersectionObserver(entries=>{foodVisible=entries[0].isIntersecting&&entries[0].intersectionRatio>=.2;syncFoodPlayback();},{threshold:.2});observer.observe(root.querySelector('.life-apples'));
  const modalObserver=new MutationObserver(syncFoodPlayback);modalObserver.observe(document.body,{attributes:true,subtree:true,attributeFilter:['open']});document.addEventListener('visibilitychange',syncFoodPlayback);
  root.querySelector('[data-food-pause]').onclick=()=>foodPaused?foodPlayback.resume():foodPlayback.pause();root.querySelector('[data-food-replay]').onclick=()=>foodPlayback.replay();
  foodCleanup=()=>{foodPlayback?.dispose();observer.disconnect();modalObserver.disconnect();document.removeEventListener('visibilitychange',syncFoodPlayback);};
 }
 function bind(){
  root.querySelectorAll('[data-life-tab]').forEach(b=>b.onclick=()=>{if(s.tab!==+b.dataset.lifeTab&&+b.dataset.lifeTab===2){foodViewTime=0;foodPaused=false;}s.tab=+b.dataset.lifeTab;message='';render(`[data-life-tab="${s.tab}"]`);save();});
  root.querySelectorAll('[data-life-bio]').forEach(b=>b.onclick=()=>{s.bio=b.dataset.lifeBio;message='';render(`[data-life-bio="${s.bio}"]`);save();});
  root.querySelectorAll('[data-life-bio-check]').forEach(b=>b.onclick=()=>{const correct=lifeRecord(s,s.bio,+b.dataset.lifeBioCheck===0?'oxidation':'reduction');message=(correct?'✓ 答對了。':'正確答案是左邊的選項，再試一次。')+lifeBiology[s.bio].reason;render('[data-life-bio-check="'+b.dataset.lifeBioCheck+'"]');save();});
  root.querySelectorAll('[data-life-bleach]').forEach(b=>b.onclick=()=>{s.bleach=b.dataset.lifeBleach;message='';render(`[data-life-bleach="${s.bleach}"]`);save();});
  root.querySelector('[data-life-observe]')?.addEventListener('click',()=>{if(!s.seen.includes(s.bleach))s.seen.push(s.bleach);message='顏色變淡了。再看電子方向，判斷漂白劑自己的變化。';render('[data-life-observe]');save();});
  root.querySelectorAll('[data-life-role]').forEach(b=>b.onclick=()=>{if(!s.seen.includes(s.bleach))return;const r=b.dataset.lifeRole,correct=lifeRecord(s,s.bleach,r);message=(correct?'✓ ':'正確是「自己'+roleName(lifeBleaches[s.bleach].role)+'」，再選一次。')+lifeBleaches[s.bleach].reason;render(`[data-life-role="${r}"]`);save();});
  root.querySelectorAll('[data-life-food-role]').forEach(b=>b.onclick=()=>{if(s.time<3)return;const r=b.dataset.lifeFoodRole,correct=lifeRecord(s,'food',r);message=correct?'✓ 維生素 C 自己被氧化，延緩部分食物成分的氧化；用完後，保護也會減弱。':'正確是「自己被氧化」。維生素 C 讓褐變中間產物被還原，自己失去電子；請再選一次。';render(`[data-life-food-role="${r}"]`);save();});
  root.querySelectorAll('[data-life-answer]').forEach(b=>b.onclick=()=>{if(!lifeReady(s))return;s.answer=+b.dataset.lifeAnswer;render(`[data-life-answer="${s.answer}"]`);save();});
  root.querySelectorAll('[data-life-reset]').forEach(b=>b.onclick=()=>{[0,1,2].forEach(i=>clearPrediction('life-'+i));s=freshLife();foodViewTime=0;foodPaused=false;message='已重設本卡，六份生活線索可以重新探索。';render('.chapter-header [data-life-reset]');save();});
 }
 render();save();
}

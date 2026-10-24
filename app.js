import {wetLabMarkup,mountWetLab,stopWetLab} from './wet-lab.js';
import {initJourney,recordEvidence,resetEvidence,syncActivityCases} from './journey.js';
import {createFurnaceAnimation} from './furnace-animation.js';
import {createReactionGeometry} from './crystal-models.js';
import {sphereHostMarkup,mountLessonSphere,disposeLessonViews,inspectorMarkup,mountInspector,arrangeObservationWorkspace} from './lesson-views.js';
import {nonmetalBench,factoryMaterials} from './lesson-materials.js';
import {mountDailyLessons} from './daily-life.js';
import {metalBurnVisual,metalObservationText} from './burning-specimens.js';
import {compoundDescription,reactionMultiple} from './crystal-models.js';
import {sampleVisual} from './specimens.js';
import {createActivity3D} from './activity3d.js';
import {elements,formulaText,compete,furnace,metals,nonmetals,quizzes} from './model.js';
const $=id=>document.getElementById(id);
const storageKey='oxygen-journey-mastery-v1';
let mastery=new Set();
try{const saved=JSON.parse(localStorage.getItem(storageKey)||'[]');if(Array.isArray(saved))mastery=new Set(saved.filter(n=>Number.isInteger(n)&&n>=1&&n<=6));}catch{$('storage-note').textContent='此瀏覽器無法儲存進度；本次仍可正常學習。';}
function saveProgress(){try{localStorage.setItem(storageKey,JSON.stringify([...mastery]));}catch{$('storage-note').textContent='此瀏覽器無法儲存進度；本次仍可正常學習。';}renderProgress();}
function renderProgress(){const n=mastery.size;$('progress-count').textContent=n;$('progress').value=n;$('progress').textContent=`${n} / 6`;$('top-progress').textContent=`已掌握 ${n} / 6`;document.querySelectorAll('[data-route]').forEach(a=>a.classList.toggle('done',mastery.has(+a.dataset.route)));if(n===6){$('finish-title').innerHTML='六張探索卡，全部掌握。';$('finish-text').textContent='你已經找到把礦石變成生鐵的關鍵：讓氧轉移，再移除雜質。試著向同學解釋：焦炭與石灰石，為什麼缺一種就會有不同結果？';}else{$('finish-title').innerHTML='帶走一個解釋，<br>也帶走一個新問題。';$('finish-text').textContent='完成六題小試身手，試著用「氧的轉移」向同學解釋：為什麼鐵礦能變成鐵？';}}
function toast(text){document.querySelector('.toast')?.remove();const t=document.createElement('div');t.className='toast';t.role='status';t.textContent=text;document.body.append(t);setTimeout(()=>t.remove(),3000);}
$('reset-progress').addEventListener('click',()=>{mastery.clear();resetEvidence();saveProgress();document.querySelectorAll('.answer-option').forEach(b=>{b.classList.remove('right','wrong');b.setAttribute('aria-pressed','false');});document.querySelectorAll('.quiz-result').forEach(p=>p.textContent='');document.querySelectorAll('.answer-overlay').forEach(x=>x.remove());toast('學習進度已重設，可以重新挑戰六張卡。');});
function renderQuizzes(){document.querySelectorAll('[data-quiz]').forEach(el=>{const n=+el.dataset.quiz,q=quizzes[n];el.innerHTML=`<div class="quiz-title"><span>小試身手 ${String(n).padStart(2,'0')}</span> 選一個答案，檢查你的理解</div><p class="quiz-question" id="q-${n}">${q.question}</p><div class="answers" role="group" aria-labelledby="q-${n}">${q.options.map((v,i)=>`<button class="answer-option" data-answer="${i}" aria-pressed="false"><span>${String.fromCharCode(65+i)}</span>${v}</button>`).join('')}</div><p class="quiz-result" aria-live="polite">${mastery.has(n)?'✓ 你已掌握這張卡。可以再選一次，複習觀念。':''}</p>`;el.addEventListener('click',e=>{const btn=e.target.closest('[data-answer]');if(!btn||el.querySelector('.answer-overlay'))return;const answer=+btn.dataset.answer;el.querySelectorAll('.answer-option').forEach(b=>{b.classList.remove('right','wrong');b.setAttribute('aria-pressed',String(b===btn));});if(answer===q.answer){btn.classList.add('right');el.querySelector('.quiz-result').textContent=`✓ 答對了！${q.explanation}`;mastery.add(n);saveProgress();}else{btn.classList.add('wrong');el.querySelector('.quiz-result').textContent='再想一想，卡片裡的反應證據會幫助你。';showAnswer(el,q,n,btn);}});});}
function showAnswer(el,q,n,trigger){const overlay=document.createElement('div');overlay.className='answer-overlay';overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');overlay.setAttribute('aria-labelledby',`feedback-${n}`);overlay.innerHTML=`<div class="answer-popup"><button class="popup-close" aria-label="關閉解答">×</button><span class="popup-kicker">CONCEPT CHECK / 觀念解答</span><h3 id="feedback-${n}">答案是 ${String.fromCharCode(65+q.answer)}。一起追蹤反應的線索。</h3><p>${q.explanation}</p><button class="primary popup-retry">我懂了，重新作答 <span>↻</span></button></div>`;el.append(overlay);el.querySelector('.answers').inert=true;function close(){overlay.remove();el.querySelector('.answers').inert=false;trigger.focus({preventScroll:true});}overlay.querySelector('.popup-close').addEventListener('click',close);overlay.querySelector('.popup-retry').addEventListener('click',close);overlay.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();close();}if(e.key==='Tab'){const controls=[...overlay.querySelectorAll('button')];if(e.shiftKey&&document.activeElement===controls[0]){e.preventDefault();controls.at(-1).focus();}else if(!e.shiftKey&&document.activeElement===controls.at(-1)){e.preventDefault();controls[0].focus();}}});el.scrollIntoView({behavior:'smooth',block:'center'});overlay.querySelector('.popup-retry').focus({preventScroll:true});}
renderQuizzes();renderProgress();
let activityState={a:'Zn',b:'Cu',r:compete('Zn','Cu')},activityPhaseKey='',activityCooled=false,activityProgress=0;
function samplePlate(s,oxide,side){
 const e=elements[s],r=activityState.r,productOxide=side==='left',afterOxide=r.reacts?productOxide:oxide;
 const formula=oxide?e.oxide:e.formula,afterFormula=afterOxide?e.oxide:e.formula;
 return '<div class="specimen" data-side="'+side+'"><div class="sample-render" aria-hidden="true"><div class="sample-layer before">'+sampleVisual(s,oxide,true,side+'-before')+'</div><div class="sample-layer after">'+sampleVisual(s,afterOxide,activityCooled||!r.reacts,side+'-after')+'</div></div><div class="sample-identity"><b>'+formulaText(activityProgress>=1?afterFormula:formula)+'</b><span>'+(activityProgress>=1?(afterOxide?e.oxideName:e.name):(oxide?e.oxideName:e.name))+'</span></div><small>'+sampleAppearance(s,activityProgress>=1?afterOxide:oxide)+'</small><div class="sample-change">'+formulaText(formula)+(r.reacts?' → '+formulaText(afterFormula):' · 保持原狀')+'</div></div>';

}
function sampleAppearance(s,oxide){return oxide?(s==='Zn'?(activityCooled?'冷卻後 · 白色':activityProgress>=1&&activityState.r.reacts?'熱時 · 黃色':'常溫 · 白色'):s==='Pb'?'本例示紅色 α-PbO':s==='Hg'?'本例示紅色 HgO':elements[s].oxideAppearance):s==='Zn'?'灰色鋅粉 · 細顆粒':s==='Cu'?'紅棕色銅粉／顆粒':s==='Mg'?'銀白色鎂帶':s==='Al'?'銀白色鋁箔':elements[s].appearance;}
function updateActivityProgress(progress){
 activityProgress=progress;if(progress<1)activityCooled=false;
 const {a,b,r}=activityState,finished=progress>=1,started=progress>0;
 const t=r.reacts?progress:0;
 $('activity-substances').style.setProperty('--reaction',t);
 $('activity-timeline').value=Math.round(progress*100);$('activity-percent').textContent=finished?'觀察完成':started?'觀察變化中':'反應前';
 $('activity-substances').classList.toggle('reaction-heating',started&&!finished);
 if(finished)recordEvidence('activity-'+a+'-'+b);
 const phase=finished?'done':started?'moving':'before',key=a+':'+b+':'+phase+':'+activityCooled;
 $('activity-phase').textContent=finished?(r.comparisonOnly?'比較完成 · 表序預測':activityCooled?'反應後 · 已冷卻':'反應後 · 熱的產物'):started?'觀察變化中':'反應前 · 先做預測';
 $('activity-cool').disabled=!(finished&&r.reacts&&a==='Zn');
 $('activity-cool').textContent=activityCooled?'再看熱的產物':'冷卻產物';
 $('activity-result').hidden=!finished;
 $('activity-substances').dataset.finished=String(finished);
 if(key===activityPhaseKey)return;activityPhaseKey=key;
 $('activity-substances').innerHTML=samplePlate(a,false,'left')+samplePlate(b,true,'right');
 const multiple=reactionMultiple(a,b,r);
 function crystalCaption(s,oxide){const info=oxide?compoundDescription(s):null;return '<div><b>'+formulaText(oxide?elements[s].oxide:elements[s].formula)+'</b><span>'+(info?info.name:elements[s].name+'・元素原子示意')+'</span>'+(info?'<a href="'+info.source+'" target="_blank" rel="noopener">'+info.detail+' ↗</a>':'<small>球色參考元素外觀</small>')+'</div>';}
 $('crystal-labels').innerHTML=started&&!finished?'<p>追蹤氧的轉移；反應前、後的化合物排列依分子／晶體資料繪製。</p>':crystalCaption(a,finished&&r.reacts)+crystalCaption(b,!finished||!r.reacts);
 $('oxygen-account').innerHTML='<b>氧的收支</b><span>最簡反應式對應：'+r.counts.a+' 個 '+a+'、'+r.counts.b+' 個 '+b+'、'+r.counts.oxygen+' 個 O。</span><small>3D 模型按晶胞整數倍呈現（上述份量 × '+multiple+'），共 '+r.counts.a*multiple+' 個 '+a+'、'+r.counts.b*multiple+' 個 '+b+'、'+r.counts.oxygen*multiple+' 個 O；反應前後總數不變。</small>';
 $('appearance-clue').textContent=a==='Zn'&&b==='Cu'?(finished?(activityCooled?'眼前的線索｜ZnO 由黃色變白，銅仍呈紅棕色；冷卻不會把產物變回鋅和氧化銅。':'眼前的線索｜黑色 CuO 被還原，生成紅棕色銅；Zn 得氧形成熱時黃色的 ZnO。試試冷卻產物。'):started?'眼前的線索｜觀察灰色鋅粉與黑色氧化銅粉末，逐漸轉為黃色氧化鋅與紅棕色銅。':'眼前的線索｜左邊是灰色鋅粉，右邊是黑色氧化銅粉末。先預測：加熱後，誰得到氧？'):(finished?r.explanation:'兩個標本盤分別呈現各物質的外觀；無色物質以透明輪廓標示。');
 const status=r.comparisonOnly?'活性表序的預測':r.reacts?'氧化與還原同時發生':'沒有淨奪氧反應';
 $('activity-result').innerHTML='<div class="equation">'+formulaText(r.equation)+'</div><p class="reaction-label">'+(r.comparisonOnly?'活性比較示意；是否實際反應仍取決於條件。':a==='Zn'&&b==='Cu'?'加熱啟動 · Zn 得氧被氧化，CuO 失氧被還原。':status+' · '+r.explanation)+'</p>';
}
const activityModel=createActivity3D($('activity-model'),updateActivityProgress);
function renderActivity(){
 const a=$('activity-metal').value,b=$('activity-oxide').value;
 activityState={a,b,r:compete(a,b)};activityPhaseKey='';activityCooled=false;
 const r=activityState.r;syncActivityCases(a,b);
 $('activity-context').innerHTML='<strong>'+(r.comparisonOnly?'活性比較模型':'具名反應示範')+'</strong><span>'+(r.notes.length?r.notes.join(' '):'比較需在合適的加熱等條件下進行；動畫觀察氧的得失，不模擬速率。')+'</span>';
 $('activity-run').innerHTML=(r.comparisonOnly?'播放活性比較':'加熱，觀察反應')+' <span>▶</span>';
 document.querySelectorAll('[data-activity-element]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.activityElement===a)));
 activityModel.configure(a,b,r);
}
$('activity-metal').addEventListener('change',renderActivity);$('activity-oxide').addEventListener('change',renderActivity);
document.querySelector('.series-list').addEventListener('click',e=>{const button=e.target.closest('[data-activity-element]');if(!button)return;$('activity-metal').value=button.dataset.activityElement;renderActivity();});
$('activity-run').addEventListener('click',()=>activityModel.play());$('activity-reset').addEventListener('click',()=>activityModel.setProgress(0));
$('activity-demo').addEventListener('click',()=>{$('activity-metal').value='Zn';$('activity-oxide').value='Cu';renderActivity();});
$('activity-cool').addEventListener('click',()=>{activityCooled=!activityCooled;updateActivityProgress(1);});
$('view-left').addEventListener('click',()=>activityModel.rotate(-1));$('view-right').addEventListener('click',()=>activityModel.rotate(1));
$('view-near').addEventListener('click',()=>activityModel.magnify(1));$('view-far').addEventListener('click',()=>activityModel.magnify(-1));$('view-reset').addEventListener('click',()=>activityModel.resetView());
renderActivity();
let nonmetalPhase='before',nonmetalTimer=0;
let metalPhase='before',metalTimer=0,metalStart=0;
let metal='Cu',nonmetal='C',metalBurned=false,nonmetalBurned=false,metalWater=false,nonmetalWater=false,cooled=false,oxygen='enough';
function renderElementTabs(){for(const [id,items,chosen] of [['metal-tabs',{Cu:metals.Cu,Mg:metals.Mg,Na:metals.Na,Zn:metals.Zn},metal],['nonmetal-tabs',{C:nonmetals.C,P:nonmetals.P,S:nonmetals.S},nonmetal]]){$(id).innerHTML=Object.entries(items).map(([symbol,d])=>`<button data-element="${symbol}" aria-pressed="${chosen===symbol}"><b>${symbol}</b>${d.name}</button>`).join('');}}
function renderBurn(type){
 if(type==='metal'){renderMetalBurn();return;}
 const root=$('nonmetal-experiment'),symbol=nonmetal==='C'&&oxygen==='limited'?'CO':nonmetal,d=nonmetals[symbol],ready=nonmetalPhase==='product';
 disposeLessonViews(root);stopWetLab(root);
 root.innerHTML=(nonmetal==='C'?`<label class="oxygen-setting">燃燒條件<select id="carbon-oxygen"><option value="enough" ${oxygen==='enough'?'selected':''}>氧氣充足</option><option value="limited" ${oxygen==='limited'?'selected':''}>氧氣不足</option></select></label>`:'')+
 nonmetalBench(symbol,nonmetalPhase)+`<div class="material-record"><div><span class="eyebrow">NONMETAL / ${nonmetal}</span><h3>${d.name}${nonmetalBurned?'的反應紀錄':'準備好了'}</h3><div class="result-row"><b>現象</b><span>${nonmetalBurned?d.phenomenon:'先觀察原料的色澤、形態，再預測加熱後的變化。'}</span></div></div><div><div class="result-row"><b>產物</b><span>${nonmetalBurned?d.product:'按「加熱觀察」，看看留下固體還是氣體。'}</span></div><div class="equation">${nonmetalBurned?d.equation:'非金屬 ＋ 氧 → ？'}</div></div></div><div class="burn-controls"><button class="primary" data-burn="nonmetal" ${nonmetalPhase==='heating'?'disabled':''}>${nonmetalPhase==='heating'?'加熱觀察中…':nonmetalBurned?'再次加熱觀察':'加熱觀察'} <span>▶</span></button>${nonmetalPhase==='heating'?'<button class="secondary" data-nonmetal-finish>查看反應後</button>':nonmetalBurned?`<button class="secondary" data-nonmetal-compare>${ready?'比較加熱前':'查看反應後'}</button>`:''}<button class="secondary" data-water="nonmetal" ${ready?'':'disabled'}>產物加水 · 測石蕊</button></div>${nonmetalBurned?`<p class="model-note">${d.extra}</p>`:''}${nonmetalWater?wetLabMarkup(d,symbol):''}`+
 inspectorMarkup(symbol==='S'?['S8','O2','SO2']:symbol==='P'?['O2','P4O10']:['C','O2',symbol==='CO'?'CO':'CO2']);
 arrangeObservationWorkspace(root,'.physical-bench','.material-record,.burn-controls,.model-note');mountInspector(root);if(nonmetalWater)mountWetLab(root,()=>recordEvidence('wet-'+symbol));
}
function stopNonmetalHeat(){clearTimeout(nonmetalTimer);nonmetalTimer=0;}
function finishNonmetalHeat(){stopNonmetalHeat();const focused=$('nonmetal-experiment').contains(document.activeElement);nonmetalPhase='product';if(nonmetal==='C')recordEvidence('carbon-'+oxygen);renderBurn('nonmetal');if(focused)$('nonmetal-experiment').querySelector('[data-burn]').focus({preventScroll:true});}
function startNonmetalHeat(){stopNonmetalHeat();nonmetalBurned=true;nonmetalWater=false;nonmetalPhase='heating';renderBurn('nonmetal');$('nonmetal-experiment').querySelector('[data-nonmetal-finish]').focus({preventScroll:true});$('nonmetal-experiment').querySelector('.physical-bench').scrollIntoView({behavior:'smooth',block:'center'});nonmetalTimer=setTimeout(finishNonmetalHeat,6000);}

function stopMetalHeat(){cancelAnimationFrame(metalTimer);metalTimer=0;}
function renderMetalBurn(){
 disposeLessonViews($('metal-experiment'));stopWetLab($('metal-experiment'));
 const d=metals[metal],ready=metalPhase==='product',heating=metalPhase==='heating';
 $('metal-experiment').innerHTML=metalBurnVisual(metal,metalPhase,cooled)+
 '<div class="metal-record"><div class="burn-info"><span>METAL / '+metal+'</span><h3>'+d.name+(metalBurned?'的反應紀錄':'準備好了')+'</h3><div class="result-row"><b>現象</b><span>'+(metalBurned?d.phenomenon:'觀察原料的色澤與質感，再按「加熱觀察」。')+'</span></div></div><div class="metal-product-info"><div class="result-row"><b>產物</b><span>'+(metalBurned?d.product:'加熱後，比較原料與產物的外觀。')+'</span></div><div class="equation">'+(metalBurned?d.equation:'金屬 ＋ 氧 → ？')+'</div></div></div>'+
 '<div class="burn-controls"><button class="primary" data-burn="metal" '+(heating?'disabled':'')+'>'+(heating?'加熱觀察中…':metalBurned?'再次加熱觀察':'加熱觀察')+' <span>▶</span></button>'+
 (heating?'<button class="secondary" data-metal-finish>查看反應後</button>':metalBurned?'<button class="secondary" data-metal-compare>'+(ready?'比較加熱前':'查看反應後')+'</button>':'')+
 '<button class="secondary" data-water="metal" '+(ready?'':'disabled')+'>產物加水 · 測石蕊</button>'+
 (metal==='Zn'?'<button class="secondary" data-cool="true" '+(ready?'':'disabled')+'>'+(cooled?'再看熱的產物':'冷卻產物')+'</button>':'')+'</div>'+
 (metalBurned?'<p class="model-note">'+d.extra+'</p>':'')+
 (metalWater?wetLabMarkup(d,metal):'<p class="model-note">先觀察金屬加熱時的變化，再測試產物的酸鹼性。示意圖呈現主要外觀，並非照片或實驗操作步驟。</p>')+inspectorMarkup([metal,'O2',metal+'-oxide']);arrangeObservationWorkspace($('metal-experiment'),'.metal-observation','.metal-record,.burn-controls,.model-note');mountInspector($('metal-experiment'));if(metalWater)mountWetLab($('metal-experiment'),()=>recordEvidence('wet-'+metal));
}
function finishMetalHeat(){const restore=$('metal-experiment').contains(document.activeElement);stopMetalHeat();metalPhase='product';renderMetalBurn();if(restore)$('metal-experiment').querySelector('[data-burn]').focus({preventScroll:true});}
function startMetalHeat(){
 stopMetalHeat();metalBurned=true;metalWater=false;cooled=false;metalPhase='heating';renderMetalBurn();$('metal-experiment').querySelector('[data-metal-finish]').focus({preventScroll:true});$('metal-experiment').querySelector('[data-metal-scene]').scrollIntoView({behavior:'smooth',block:'center'});metalStart=performance.now();
 function tick(now){
  const t=Math.min(1,(now-metalStart)/7000),scene=$('metal-experiment').querySelector('[data-metal-scene]');
  if(!scene||metalPhase!=='heating')return;
  scene.style.setProperty('--burn-progress',Math.max(0,Math.min(1,(t-.15)/.78)));
  scene.querySelector('[data-metal-phase]').textContent=t<.18?'開始加熱':t<.8?'觀察變化中':'反應接近完成';
  if(t<1)metalTimer=requestAnimationFrame(tick);else finishMetalHeat();
 }
 metalTimer=requestAnimationFrame(tick);
}

for(const type of ['metal','nonmetal']){$(type+'-tabs').addEventListener('click',e=>{const b=e.target.closest('[data-element]');if(!b)return;if(type==='metal'){stopMetalHeat();metalPhase='before';metal=b.dataset.element;metalBurned=metalWater=cooled=false;}else{stopNonmetalHeat();nonmetalPhase='before';nonmetal=b.dataset.element;nonmetalBurned=nonmetalWater=false;}renderElementTabs();renderBurn(type);$(type+'-tabs').querySelector(`[data-element="${b.dataset.element}"]`).focus({preventScroll:true});});$(type+'-experiment').addEventListener('click',e=>{const burn=e.target.closest('[data-burn]'),water=e.target.closest('[data-water]'),cool=e.target.closest('[data-cool]');if(type==='nonmetal'&&burn){startNonmetalHeat();return;}if(type==='nonmetal'&&e.target.closest('[data-nonmetal-finish]')){finishNonmetalHeat();return;}if(type==='nonmetal'&&e.target.closest('[data-nonmetal-compare]')){nonmetalPhase=nonmetalPhase==='before'?'product':'before';nonmetalWater=false;renderBurn('nonmetal');$('nonmetal-experiment').querySelector('[data-nonmetal-compare]').focus({preventScroll:true});return;}if(type==='metal'&&burn){startMetalHeat();return;}if(type==='metal'&&e.target.closest('[data-metal-finish]')){finishMetalHeat();$('metal-experiment').querySelector('[data-burn]').focus({preventScroll:true});return;}if(type==='metal'&&e.target.closest('[data-metal-compare]')){metalPhase=metalPhase==='before'?'product':'before';metalWater=false;renderMetalBurn();$('metal-experiment').querySelector('[data-metal-compare]').focus({preventScroll:true});return;}if(burn){if(type==='metal'){metalBurned=true;cooled=false;metalWater=false;}else{nonmetalBurned=true;nonmetalWater=false;}}else if(water){if(type==='metal')metalWater=true;else nonmetalWater=true;}else if(cool)cooled=!cooled;else return;const selector=burn?'[data-burn]':water?'[data-water]':'[data-cool]';renderBurn(type);$(type+'-experiment').querySelector(selector)?.focus({preventScroll:true});if(water)$(type+'-experiment').querySelector('.wet-lab')?.scrollIntoView({behavior:'smooth',block:'center'});});}
$('nonmetal-experiment').addEventListener('change',e=>{if(e.target.id==='carbon-oxygen'){stopNonmetalHeat();nonmetalPhase='before';oxygen=e.target.value;nonmetalBurned=nonmetalWater=false;renderBurn('nonmetal');$('carbon-oxygen').focus({preventScroll:true});}});renderElementTabs();renderBurn('metal');renderBurn('nonmetal');
let redoxDone=false,redoxModel=null;
function renderRedox(){
 const root=$('redox-stage');disposeLessonViews(root);redoxDone=false;root.dataset.redoxPhase='';
 root.innerHTML=`<div class="model-3d-heading"><span data-redox-phase>反應前 · 預測氧的去向</span><span>互動 04 · 3D 實驗台</span></div>${sphereHostMarkup('鎂與氧化銅的立體原子模型')}<div class="redox-account" aria-live="polite"></div><div class="appearance-heading"><span>肉眼觀察 <small>與互動 01 相同的物質圖例</small></span></div><div class="activity-substances redox-material-pair">${[['Mg',false,true,'鎂帶'],['Cu',true,false,'氧化銅粉末']].map(([s,before,after,name],i)=>`<div class="specimen"><div class="sample-render" aria-hidden="true"><div class="sample-layer before">${sampleVisual(s,before,true,'redox-'+i+'-before')}</div><div class="sample-layer after">${sampleVisual(s,after,true,'redox-'+i+'-after')}</div></div><div class="sample-identity"><b data-redox-formula="${i}">${i===0?'Mg':'CuO'}</b><span data-redox-name="${i}">${name}</span></div><small>${i===0?'銀白鎂帶 → 白色氧化鎂':'黑色氧化銅 → 紅棕色銅'}</small></div>`).join('')}</div><p class="reaction-summary" data-redox-summary></p><p class="model-note">CuO 與 MgO 沿用互動 01 的 CIF 晶體座標；模型按最簡反應式的 4 倍顯示，共 4 Mg、4 Cu、4 O。原子總數在反應前後不變；氧的移動動畫用來追蹤收支。<a href="https://www.crystallography.net/cod/9008961.html" target="_blank" rel="noopener">CuO 資料 ↗</a></p>`;
 redoxModel=mountLessonSphere(root,createReactionGeometry('Mg','Cu',compete('Mg','Cu')),'Mg + CuO → MgO + Cu，無連接棒的立體模型',t=>{
  redoxDone=t>=1;if(redoxDone)recordEvidence('redox');root.style.setProperty('--redox-progress',t);root.querySelector('.redox-material-pair').style.setProperty('--reaction',t);const phase=t>=1?'after':t>0?'during':'before';if(root.dataset.redoxPhase===phase)return;root.dataset.redoxPhase=phase;
  root.querySelector('[data-redox-phase]').textContent=t>=1?'反應後 · 氧的收支':t>0?'反應進行中':'反應前 · 預測氧的去向';
  root.querySelector('.redox-account').innerHTML='<b>Mg + CuO → MgO + Cu</b><span>'+(t>=1?'Mg 得氧被氧化；CuO 失氧被還原。':t>0?'氧正在由 CuO 轉移到 Mg；觀察前後原子的排列變化。':'左：Mg 元素原子群；右：CuO 晶體片段。按播放追蹤反應。')+'</span>';
  root.querySelector('[data-redox-formula="0"]').textContent=t>=1?'MgO':'Mg';root.querySelector('[data-redox-formula="1"]').textContent=t>=1?'Cu':'CuO';root.querySelector('[data-redox-name="0"]').textContent=t>=1?'氧化鎂':'鎂帶';root.querySelector('[data-redox-name="1"]').textContent=t>=1?'銅粉／顆粒':'氧化銅粉末';
  root.querySelector('[data-redox-summary]').textContent=t>=1?'氧由氧化銅轉移到鎂；白色氧化鎂和紅棕色銅成為新的反應線索。':'拖曳模型旋轉，或使用方向鍵，觀察原子排列。';
 });
 $('oxidation-rule').textContent='得到氧';$('reduction-rule').textContent='失去氧';$('redox-run').innerHTML='播放氧的轉移 <span>▶</span>';
}
$('redox-run').addEventListener('click',()=>{redoxModel.play();$('redox-stage').querySelector('.lesson-sphere-host').scrollIntoView({behavior:'smooth',block:'center'});});
$('redox-reset').addEventListener('click',()=>redoxModel.setProgress(0));renderRedox();

function renderFactoryViews(){$('factory-material-view').innerHTML=factoryMaterials();}

const recipe={ore:2,coke:0,lime:0};
const factoryAnimation=createFurnaceAnimation($('furnace-scene'),{onPrepare:options=>runFactory(options)});
function renderIngredients(){$('factory-inputs').innerHTML=[['ore','鐵礦石','Fe₂O₃ ＋ SiO₂ 雜質'],['coke','焦炭','C · 熱與還原氣體來源'],['lime','石灰石','CaCO₃ · 除雜質']].map(([id,name,desc])=>`<div class="ingredient-row"><div class="ingredient-name"><b>${name}</b><small>${desc}</small></div><div class="ingredient-stepper"><button type="button" data-ingredient="${id}" data-delta="-1" aria-label="減少${name}" ${recipe[id]===0?'disabled':''}>−</button><output id="${id}-value" aria-live="polite">${recipe[id]} 份</output><button type="button" data-ingredient="${id}" data-delta="1" aria-label="增加${name}" ${recipe[id]===4?'disabled':''}>＋</button></div></div>`).join('');}
function markRecipeChanged(step=3){factoryAnimation.reset();document.querySelectorAll('[data-factory-case]').forEach(b=>b.setAttribute('aria-pressed','false'));runFactory({step});}
$('factory-inputs').addEventListener('click',e=>{const b=e.target.closest('[data-ingredient]');if(!b)return;const id=b.dataset.ingredient;recipe[id]=Math.max(0,Math.min(4,recipe[id]+Number(b.dataset.delta)));renderIngredients();markRecipeChanged(id==='lime'?5:3);$('factory-inputs').querySelector('[data-ingredient="'+id+'"][data-delta="'+b.dataset.delta+'"]')?.focus({preventScroll:true});});$('hot-air').addEventListener('change',()=>markRecipeChanged());
$('factory-reset').addEventListener('click',()=>{factoryAnimation.reset();Object.assign(recipe,{ore:2,coke:0,lime:0});$('hot-air').checked=true;renderIngredients();runFactory({step:3});document.querySelectorAll('[data-factory-case]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.factoryCase==='ore')));});
function runFactory({step=0,autoplay=false,scroll=false}={}){const r=furnace({...recipe,air:$('hot-air').checked}),out=$('factory-output');const title=r.full?'這一爐，還原與除雜質都完成！':r.reduced>0?'有鐵產生，這份配方還能再調整。':r.running?'高爐啟動了，但這一爐沒有鐵。':'這一爐，沒有成功還原鐵。';const chips=[];if(r.reduced)chips.push(`<span class="iron">生鐵：${r.reduced} 份礦石完成還原</span>`);if(r.slag)chips.push(`<span class="slag">爐渣：已處理 ${r.slag} 份雜質</span>`);if(r.unreduced)chips.push(`<span>未還原礦石：${r.unreduced} 份</span>`);if(r.unremovedImpurity)chips.push(`<span>未處理雜質：${r.unremovedImpurity} 份</span>`);if(r.unusedCoke)chips.push(`<span>未投入還原工作的焦炭：${r.unusedCoke} 份</span>`);if(r.running)chips.push('<span>爐頂氣體：CO₂、可能有 CO 與空氣中的 N₂</span>');const tips=[];if(!recipe.ore)tips.push('沒有含鐵原料，就沒有可被還原的鐵。');if(!recipe.coke)tips.push('缺少焦炭：沒有這個模型所需的熱源與 CO 來源。');if(!$('hot-air').checked)tips.push('沒有熱空氣：焦炭無法在本模型啟動燃燒，高爐也達不到所需條件。');if(r.running&&r.unreduced)tips.push('焦炭的教學份數不足，仍有氧化鐵未還原；提高焦炭份數再比較。');if(r.running&&r.unremovedImpurity)tips.push('石灰石不足，部分 SiO₂ 沒有轉成爐渣；即使生成鐵，也不代表除雜質已完成。');if(r.reduced)tips.push('Fe₂O₃ 失去氧被還原；CO 得到氧變成 CO₂，本身被氧化。');if(r.full)tips.push('石灰石的工作是除雜質；實際生鐵仍含碳與其他雜質，需進一步煉鋼。');if(r.running&&recipe.coke>recipe.ore)tips.push('焦炭過多不會憑空增加鐵，鐵的來源受礦石量限制。');out.innerHTML=`<h3>${title}</h3><div class="output-chips">${chips.join('')||'<span>沒有可觀察的產物</span>'}</div>${r.reduced?'<div class="equation">Fe₂O₃ + 3CO → 2Fe + 3CO₂</div>':''}${r.slag?'<div class="equation">CaO + SiO₂ → CaSiO₃（熔渣）</div>':''}<ul>${tips.map(t=>`<li>${t}</li>`).join('')}</ul><p class="tiny">這是依配方判斷的概念結果，不是質量、能耗或真實生鐵品質的計算。</p>`;out.classList.remove('updated');requestAnimationFrame(()=>out.classList.add('updated'));$('furnace-scene').classList.toggle('iron',r.reduced>0);$('furnace-scene').classList.toggle('slag',r.slag>0);$('furnace-state').textContent=r.full?'成功出鐵 · 已形成爐渣':r.reduced?'已出鐵 · 再調整原料':r.running?'運轉中 · 沒有鐵產生':'未啟動還原';$('factory-equations').open=false;renderFactoryViews(r);factoryAnimation.play({result:r,recipe:{...recipe},air:$('hot-air').checked},{step,autoplay});if(scroll)$('furnace-scene').scrollIntoView({behavior:'smooth',block:'start'});}
$('factory-run').addEventListener('click',()=>runFactory({step:3,scroll:true}));renderIngredients();renderFactoryViews();
mountDailyLessons($('daily-tabs'),$('daily-experiment'));
const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){document.querySelectorAll('[data-route]').forEach(a=>a.classList.toggle('current',a.dataset.route===entry.target.id.split('-')[1]));}});},{rootMargin:'-15% 0px -60% 0px',threshold:0});document.querySelectorAll('.learning-card').forEach(c=>observer.observe(c));

initJourney({
 activity(a,b){$('activity-metal').value=a;$('activity-oxide').value=b;renderActivity();},
 factoryCase(id){const recipes={ore:{ore:2,coke:0,lime:0},coke:{ore:2,coke:2,lime:0},full:{ore:2,coke:2,lime:2}};Object.assign(recipe,recipes[id]);$('hot-air').checked=true;renderIngredients();factoryAnimation.reset();runFactory({step:id==='full'?5:3,scroll:true});document.querySelectorAll('[data-factory-case]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.factoryCase===id)));recordEvidence('factory-'+id);}
});

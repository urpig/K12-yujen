import {rockIllustration} from './lesson-materials.js';

const journeyChapters={
 1:{title:'先找一個能把氧帶走的幫手',question:'黑色氧化銅裡的銅，能被「找回來」嗎？',opening:'礦石中的鐵不是一塊被泥土包住的金屬。以赤鐵礦為例，鐵與氧已經結合成氧化鐵 Fe₂O₃。要得到金屬，得先想辦法讓它失去氧。我們先用顏色變化更清楚的「鋅＋氧化銅」找線索。',task:'先加熱鋅＋氧化銅，觀察黑色粉末和產物的顏色；再比較把鋅、銅的角色交換後會怎樣。',concept:'黑色 CuO 變成紅棕色銅；氧沒有消失，而是和鋅結合成 ZnO。鋅比銅容易與氧結合，稱為「對氧活性較大」。這讓我們找到一個方向：選對幫手，有機會從金屬氧化物取回金屬。',bridge:'我們找到讓金屬「失去氧」的方法。但金屬一開始怎麼得到氧？把剛才找回的銅再加熱，能不能走回黑色的氧化物？',next:'看金屬如何與氧結合',needed:['activity-Zn-Cu'],steps:[['activity-Zn-Cu','觀察鋅＋氧化銅的反應']]},
 2:{title:'把銅加熱，黑色又回來了',question:'銅變黑、鎂變白，都是同一類改變嗎？',opening:'剛才氧化銅失去氧，露出銅的紅棕色。現在讓銅在空氣中加熱：它能重新得到氧，形成黑色氧化銅。物質和氧結合，叫作「氧化」。再用鎂作對照，看看產物的性質是否也一樣。',task:'依序觀察銅與鎂：加熱 → 收集產物 → 產物加水、浸入石蕊。紅色石蕊變藍是鹼性線索；藍色變紅是酸性線索。兩張都不變色，就不能宣稱測到酸或鹼。',concept:'銅變成黑色 CuO；鎂燃燒留下白色 MgO。CuO 加水不使石蕊明顯變色，MgO 與水作用後可使紅色石蕊變藍。都是金屬氧化物，對水的反應卻不同：物質的性質要用觀察判斷。',bridge:'金屬會與氧結合。煉鐵廠裡黑色的焦炭不是金屬，它也能與氧反應嗎？它的產物，會不會成為運送氧的幫手？',next:'追查碳燃燒後去了哪裡',needed:['wet-Cu','wet-Mg'],steps:[['wet-Cu','銅：加熱並測石蕊'],['wet-Mg','鎂：加熱並測石蕊']]},
 3:{title:'焦炭的線索，藏在無色氣體裡',question:'同樣是碳，氧夠不夠，產物會一樣嗎？',opening:'高爐要加入焦炭，主要成分是碳。先用容易觀察的木炭代表碳材：加熱後看見紅光，卻找不到一堆新的固體——產物可能進入空氣了。先比較碳的供氧條件，再用硫、磷分清楚「氣體」和「白煙」。',task:'先比較木炭在氧充足、氧不足時的產物，再試紅磷的白煙。將產物與水接觸，觀察藍色石蕊有沒有變紅；別只憑看起來像煙，就判定是氣體。',concept:'碳充分燃燒形成無色 CO₂；氧不足時可能產生 CO，並混有其他產物。CO₂ 與水作用可使水呈酸性，CO 本身不會。紅磷的白煙是細小固體微粒，產物與水作用後呈酸性。產物不同，後續的工作也會不同。',bridge:'碳可以形成 CO，這正是高爐裡的重要幫手。但「把氧帶走」時，幫手自己發生了什麼？回到一場看得清楚的交接，替兩邊的變化命名。',next:'同時追蹤得到氧與失去氧',needed:['carbon-enough','carbon-limited','wet-P'],steps:[['carbon-enough','碳：氧充足的產物'],['carbon-limited','碳：氧不足的產物'],['wet-P','磷：觀察白煙並測石蕊']]},
 4:{title:'一邊得到氧，一邊失去氧',question:'幫手把氧帶走時，自己也會改變嗎？',opening:'第一張卡裡，鋅拿走氧化銅中的氧；第二張卡裡，我們看見金屬得到氧。現在換成鎂與氧化銅，盯住同一批氧：它離開哪裡，又到了哪裡？',task:'按「播放氧的轉移」，同時看兩側的原子與物質外觀。先看清楚變化，再指出哪個角色被氧化、哪個角色被還原。',concept:'Mg 得到氧形成 MgO：鎂被氧化。CuO 失去氧形成 Cu：氧化銅被還原。在這場氧的交接中，兩件事同時發生。能使另一物質被還原的幫手叫還原劑；它自己會被氧化。',bridge:'現在可以回到起初那批鐵礦了：讓 CO 得到氧、讓氧化鐵失去氧。不過礦石還夾著雜質，除了取回鐵，我們也要把雜質分出去。',next:'回到高爐，完成煉鐵任務',needed:['redox'],steps:[['redox','追蹤一次完整的氧交接']]},
 5:{title:'回到高爐，把線索組合起來',question:'得到鐵之後，礦石裡的雜質怎麼辦？',opening:'現在你是這座煉鐵廠的老闆。鐵礦含 Fe₂O₃ 和 SiO₂ 等雜質；焦炭與熱空氣提供熱並生成 CO，CO 能把氧化鐵還原。先比較三份配方，一次只增加一種原料，找出石灰石的工作。',task:'依序試「只有礦石」「加入焦炭」「再加石灰石」。每次選配方，高爐立刻顯示結果；再點還原區、出鐵口或出渣口，看產物往哪裡去，並對照反應式。',concept:'焦炭燃燒提供熱，高溫下 CO₂＋C → 2CO；CO 奪取 Fe₂O₃ 中的氧形成 CO₂，鐵被還原出來。石灰石分解出的 CaO 與 SiO₂ 形成 CaSiO₃（熔渣）。鐵水在下、熔渣在上。出爐的是含碳等雜質的生鐵，還需依用途加工或煉鋼。',bridge:'最初的礦石終於能產出生鐵。但做好的鐵，為什麼又會生鏽？同一種氧化還原規律，也在身邊悄悄發生。',next:'帶著這個規律走出工廠',needed:['factory-ore','factory-coke','factory-full'],steps:[['factory-ore','只有礦石：找出缺少的條件'],['factory-coke','加入焦炭：得到鐵但雜質仍在'],['factory-full','加入石灰石：讓雜質進入熔渣']]},
 6:{title:'走出工廠，繼續追蹤變化',question:'沒有高爐和火焰，也會有氧化還原嗎？',opening:'鐵離開高爐後，遇到水與氧又可能生鏽；暖暖包則利用鐵粉氧化放熱。把視線移到植物和身體：光合作用、有氧呼吸，也各自包含一對同時發生的氧化與還原。',task:'先比較光合作用與呼吸作用的兩個角色，再選一個抗氧化例子。較複雜的生物與漂白反應，這裡直接提供已確認的反應角色，不用靠外觀硬猜。',concept:'不能把光合作用整個叫「還原」、把呼吸作用整個叫「氧化」：每個過程裡都有兩個角色。維他命 C、E 發揮抗氧化作用時，自己會被氧化，另一物質被還原。漂白也要看機制，物品變白本身並不足以證明氧化還原。',bridge:'回到礦場的問題：不是把石頭「燒成鐵」，而是用反應讓氧離開鐵的化合物，再把雜質分開。當你能說清楚物質從哪裡來、到哪裡去，就不只是在背反應式了。',next:'回看最初的問題',needed:['daily-photo','daily-resp','daily-antioxidant'],steps:[['daily-photo','追蹤光合作用'],['daily-resp','追蹤有氧呼吸'],['daily-antioxidant','觀察維他命 C 或 E']]}
};
const collectedEvidence=new Set();
let journeyReady=false;
export function recordEvidence(key){collectedEvidence.add(key);if(journeyReady)updateJourneyEvidence();}
export function resetEvidence(){collectedEvidence.clear();if(journeyReady)updateJourneyEvidence();}
function updateJourneyEvidence(){
 for(const [id,ch] of Object.entries(journeyChapters)){
  const card=document.getElementById('card-'+id),ready=ch.needed.every(key=>collectedEvidence.has(key));
  card.querySelectorAll('[data-evidence]').forEach(el=>{const done=collectedEvidence.has(el.dataset.evidence);el.classList.toggle('collected',done);el.querySelector('i').textContent=done?'✓':'○';});
  card.querySelector('.chapter-discovery').hidden=!ready;card.querySelector('.quiz').hidden=!ready;
  const status=card.querySelector('.chapter-ready');status.hidden=ready;
  card.dataset.explored=String(ready);
 }
}
function mountMineOpening(){
 const art=document.querySelector('.hero-art');art.className='hero-art mine-opening';art.setAttribute('aria-label','赤鐵礦加熱的開場觀察');
 art.innerHTML=`<div class="mine-label">礦場來了一批新原料</div><div class="mine-ore">${rockIllustration('#96543e','opening-hematite')}</div><div class="mine-heat" aria-hidden="true"><span></span><span></span><span></span></div><div class="mine-identity"><b>赤鐵礦</b><span>含氧化鐵 Fe₂O₃，也含雜質</span></div><button class="primary" id="mine-heat">先試試：只把礦石加熱</button><p id="mine-result" aria-live="polite">它看起來是石頭。裡面的鐵，怎樣才能拿出來？</p>`;
 let timer;document.getElementById('mine-heat').addEventListener('click',()=>{
  clearTimeout(timer);art.classList.remove('mine-hot');void art.offsetWidth;art.classList.add('mine-hot');
  document.getElementById('mine-result').textContent='加熱中……礦石變熱了，但有鐵出現嗎？';
  const button=document.getElementById('mine-heat');button.disabled=true;
  timer=setTimeout(()=>{art.classList.remove('mine-hot');button.disabled=false;button.textContent='再觀察一次';document.getElementById('mine-result').textContent='沒有得到金屬鐵。一般只加熱赤鐵礦，不會把 Fe₂O₃ 直接變成 Fe。我們還需要能把氧帶走的幫手。';},matchMedia('(prefers-reduced-motion: reduce)').matches?40:2600);
 });
}
export function initJourney(actions){
 const hero=document.querySelector('.hero-copy');hero.querySelector('.eyebrow').innerHTML='<span></span> 一塊礦石的旅程 / 國二理化';
 document.getElementById('hero-title').innerHTML='挖到了鐵礦，<br>然後呢<span>？</span>';
 hero.querySelector('.hero-subtitle').innerHTML='一塊紅棕色的礦石，要怎麼變成可以使用的鐵？<br>從礦場出發，帶著六條線索，親手解開煉鐵的秘密。';
 hero.querySelector('.hero-start').innerHTML='跟著線索，找出方法 <span>↗</span>';
 mountMineOpening();
 document.querySelector('#unit-oxidation h2').textContent='先在實驗台找線索';document.querySelector('#unit-oxidation p').textContent='從氧化物取回金屬之前，先弄懂物質如何與氧結合。';
 document.querySelector('#unit-redox h2').textContent='把線索帶回煉鐵廠';document.querySelector('#unit-redox p').textContent='追蹤氧的交接，再把反應變成取回鐵的方法。';
 for(const [id,ch] of Object.entries(journeyChapters)){
  const card=document.getElementById('card-'+id),body=card.querySelector('.card-body');
  card.querySelector('h2').textContent=ch.title;body.querySelector('.core-question').textContent=ch.question;
  body.querySelector('.core-question').nextElementSibling.textContent=ch.opening;
  const task=document.createElement('div');task.className='story-task';task.innerHTML=`<span>這次只追一條線索</span><p>${ch.task}</p>`;body.querySelector('.core-question').nextElementSibling.after(task);
  const takeaway=body.querySelector('.takeaway');if(takeaway)takeaway.remove();
  const journal=document.createElement('section');journal.className='chapter-journal';journal.setAttribute('aria-label','本卡的觀察紀錄');
  journal.innerHTML=`<div class="evidence-list">${ch.steps.map(([key,label])=>`<span data-evidence="${key}"><i>○</i>${label}</span>`).join('')}</div><p class="chapter-ready" role="status">先完成上面的觀察，再用證據整理觀念、挑戰小試身手。</p><div class="chapter-discovery" hidden><span>用剛才的證據回答</span><p>${ch.concept}</p></div>`;
  card.querySelector('.quiz').before(journal);
  const bridge=document.createElement('div');bridge.className='story-bridge';bridge.innerHTML=`<span>${id==='6'?'回到最初的問題':'下一條線索'}</span><p>${ch.bridge}</p><a href="${id==='6'?'#top':'#card-'+(+id+1)}">${ch.next} <b>→</b></a>`;card.after(bridge);
  const route=document.querySelector(`[data-route="${id}"]`);route.innerHTML=`<span>0${id}</span>${['找能帶走氧的幫手','氧化物怎麼形成','碳變成什麼氣體','氧的兩個角色','回高爐完成任務','生活也有氧化還原'][+id-1]}<i></i>`;
 }
 // Keep the full element set available, but begin with three interpretable cases.
 const card1=document.getElementById('card-1'),experiment=card1.querySelector('.experiment');
 const choices=document.createElement('div');choices.className='guided-cases';choices.setAttribute('role','group');choices.setAttribute('aria-label','先比較三個常見反應');
 const cases=[['Zn','Cu','① 鋅＋氧化銅','找回紅棕色的銅'],['Cu','Zn','② 交換兩邊','銅也能拿走鋅的氧嗎？'],['Mg','Cu','③ 換鎂當幫手','為氧的交接做準備']];
 choices.innerHTML=cases.map(([a,b,label,hint],i)=>`<button type="button" data-guided-pair="${a},${b}" aria-pressed="${i===0}"><b>${label}</b><small>${hint}</small></button>`).join('');
 experiment.querySelector('.first-step').replaceWith(choices);
 const advanced=document.createElement('details');advanced.className='science-detail activity-advanced';advanced.innerHTML='<summary>找到規律之後：展開 17 種元素，自由比較</summary><p>先用已知反應建立規律，再看完整活性表。非典型組合僅作表序比較，不能當成實際反應預測。</p>';
 advanced.append(card1.querySelector('.full-activity-series'),experiment.querySelector('.selection-pair'));choices.after(advanced);
 const models=document.createElement('details');models.className='atom-details activity-atom-panel';models.innerHTML='<summary>氧跑到哪裡？打開 3D 模型追蹤同一批氧</summary>';
 const stage=document.getElementById('activity-stage');
 for(const selector of ['.model-3d-heading','#activity-model','#crystal-labels','#oxygen-account','.model-drag-hint','.model-view-controls'])models.append(stage.querySelector(selector));
 stage.append(models);stage.before(experiment.querySelector('.activity-actions'));
 models.append(experiment.querySelector(':scope > .model-note'));
 document.querySelector('.reaction-scrubber').replaceWith(Object.assign(document.createElement('div'),{className:'reaction-status',innerHTML:'<span>觀察進程</span><progress id="activity-timeline" max="100" value="0" aria-label="氧轉移動畫進程"></progress><output id="activity-percent">反應前</output>'}));
 experiment.querySelector('.experiment-top>span:last-child').textContent='先比較三個案例，再自由探索';
 choices.addEventListener('click',e=>{const button=e.target.closest('[data-guided-pair]');if(button){const [a,b]=button.dataset.guidedPair.split(',');actions.activity(a,b);}});
 const help=document.createElement('div');help.className='bench-sequence';help.innerHTML='<b>先看銅，再看鎂</b><span>① 選材料　→　② 加熱觀察　→　③ 產物加水、測石蕊</span>';
 document.getElementById('metal-tabs').before(help);
 const redoxControls=document.createElement('div');redoxControls.className='activity-actions';redoxControls.append(document.getElementById('redox-run'),document.getElementById('redox-reset'));document.getElementById('redox-stage').before(redoxControls);
 const factoryCases=document.createElement('div');factoryCases.className='guided-cases factory-cases';factoryCases.setAttribute('role','group');factoryCases.setAttribute('aria-label','比較三份高爐配方');
 factoryCases.innerHTML=[['ore','① 只有礦石','先看看為何沒有鐵'],['coke','② 加入焦炭','還原鐵礦，雜質仍在'],['full','③ 再加石灰石','讓雜質進入熔渣']].map(([id,label,hint])=>`<button type="button" data-factory-case="${id}" aria-pressed="false"><b>${label}</b><small>${hint}</small></button>`).join('');
 const layout=document.querySelector('.factory-layout');layout.before(factoryCases);
 const recipeDetails=document.createElement('details');recipeDetails.className='science-detail recipe-details';recipeDetails.innerHTML='<summary>進一步比較：自行增減原料與熱空氣</summary>';recipeDetails.append(layout.querySelector('.factory-controls'));layout.before(recipeDetails);
 factoryCases.addEventListener('click',e=>{const b=e.target.closest('[data-factory-case]');if(b)actions.factoryCase(b.dataset.factoryCase);});
 journeyReady=true;updateJourneyEvidence();
}
export function syncActivityCases(a,b){document.querySelectorAll('[data-guided-pair]').forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.guidedPair===a+','+b)));}

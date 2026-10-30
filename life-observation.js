import {lifeBiology,lifeBleaches} from './everyday-redox-model.js';
import {leafArt,clothArt} from './everyday-redox-art.js';
import {createFoodPlayback} from './food-playback.js';

const roleName=r=>r==='oxidation'?'被氧化':'被還原';
const token=(label,formula)=>`<span class="life-material"><b>${label}</b><small>${formula}</small></span>`;
const feedback=message=>`<p class="life-answer-feedback" role="status">${message}</p>`;
export function biologyObservation(s,message=''){
 const b=lifeBiology[s.bio],photo=s.bio==='photo',seen=s.seen.includes(s.bio)||s.evidence.includes(s.bio);
 const input=photo?[['二氧化碳','CO₂'],['水','H₂O']]:[['葡萄糖','C₆H₁₂O₆'],['氧氣','O₂']];
 const output=photo?[['葡萄糖','C₆H₁₂O₆'],['氧氣','O₂']]:[['二氧化碳','CO₂'],['水','H₂O']];
 return `<p class="prep-instruction">① 選一個場景　② 按下觀察　③ 找出同時發生的兩種變化</p>
 <div class="life-selector" role="group" aria-label="選擇生物反應">${Object.entries(lifeBiology).map(([k,v])=>`<button data-life-bio="${k}" aria-pressed="${s.bio===k}">${k==='photo'?'☀ 葉子製造養分':'◉ 細胞利用養分'}${s.evidence.includes(k)?' ✓':''}<small>${v.name}</small></button>`).join('')}</div>
 <section class="life-observation" data-life-observation data-observed="${seen}">
 <header><div><small>${photo?'窗邊的葉子':'身體裡的細胞'}</small><h4>${photo?'有了光，葉子會做出什麼？':'養分進入細胞後，變成什麼？'}</h4></div><button class="primary life-observe-button" data-life-play>${seen?'↻ 重播觀察':photo?'照光，開始觀察 →':'開始觀察 →'}</button></header>
 <div class="life-process-scene" data-photo="${photo}"><div class="life-materials life-inputs"><small>反應前 · 用到</small>${input.map(x=>token(...x)).join('')}</div><span class="life-flow-arrow" aria-hidden="true">→</span><figure class="life-process-art">${photo?leafArt():'<div class="prep-art-breath life-cell-picture" role="img" aria-label="細胞內粒線體的卡通示意"></div>'}<figcaption>${photo?'光能幫忙，把能量存進養分':'分步釋放能量，供細胞使用'}</figcaption></figure><span class="life-flow-arrow" aria-hidden="true">→</span><div class="life-materials life-outputs"><small>反應後 · 產生</small>${output.map(x=>token(...x)).join('')}</div></div>
 <p class="life-observe-status" data-life-animation-status role="status">${seen?'觀察完成，兩邊同時改變。':'按下上方按鈕，從反應前看到反應後。'}</p>
 <div class="life-paired-results" ${seen?'':'hidden'}>${b.paths.map(p=>`<div class="${p.role}"><small>${roleName(p.role)}</small><b>${p.from} → ${p.to}</b></div>`).join('')}</div>
 <p class="life-key-finding" ${seen?'':'hidden'}>${photo?'葉子放出的氧氣來自水。水被氧化的同時，二氧化碳被還原成養分。':'葡萄糖被氧化、氧氣被還原，兩者一起發生。沒有火焰，也能釋放能量。植物也會呼吸！'}</p>
 </section>
 <div class="life-path-task"><h4>${photo?'光合作用放出氧氣，代表它沒有氧化嗎？':'細胞裡沒有火焰，養分還會被氧化嗎？'}</h4><div class="life-role-choices">${(photo?['有氧化，也有還原','只有還原，沒有氧化']:['會，氧化不一定有火焰','不會，只有燃燒才算氧化']).map((label,i)=>`<button data-life-bio-check="${i}" ${seen?'':'disabled'}>${label}</button>`).join('')}</div>${feedback(message)}</div>
 <details class="prep-note"><summary>展開反應式與解釋</summary><p>${b.equation}</p><p>${b.condition}。${b.energy}。</p><p>這些反應要經過很多步。氧化與還原會同時發生；找出兩邊各自的變化。</p></details>`;
}
export function bleachObservation(s,message=''){
 const b=lifeBleaches[s.bleach],seen=s.seen.includes(s.bleach),done=s.evidence.includes(s.bleach);
 return `<p class="prep-instruction">① 選一種漂白方式　② 觀察褪色　③ 看漂白劑與色素各自的變化</p>
 <div class="life-selector life-reagents" role="group" aria-label="選擇漂白方式">${Object.entries(lifeBleaches).map(([k,v])=>`<button data-life-bleach="${k}" aria-pressed="${s.bleach===k}">${v.name}${s.evidence.includes(k)?' ✓':''}<small>${v.formula} · ${v.kind}</small></button>`).join('')}</div>
 <section class="life-observation" data-life-observation data-observed="${seen}"><header><div><small>褪色只是看到的結果</small><h4>${b.name}讓顏色變淡時</h4></div><button class="primary life-observe-button" data-life-play>${seen?'↻ 重播觀察':'開始觀察 →'}</button></header>
 <figure class="life-new-cloths ${seen?'observed':''}">${clothArt(s.bleach)}<figcaption><span>反應前</span><span>反應後</span></figcaption></figure>
 <p class="life-observe-status" data-life-animation-status role="status">${seen?'顏色變淡了，再找出氧化與還原。':'按下觀察，比較左、右兩塊布的顏色。'}</p>
 <div class="life-paired-results" ${seen?'':'hidden'}><div class="${b.role==='oxidation'?'reduction':'oxidation'}"><small>${b.dye}</small><b>有色結構改變 → 褪色</b></div><div class="${b.role}"><small>${b.name}${roleName(b.role)}</small><b>${b.role==='reduction'?'自己被還原，讓色素被氧化':'自己被氧化，讓色素被還原'}</b></div></div>
 <p class="life-key-finding" ${seen?'':'hidden'}>都看見褪色，背後的反應卻不一定相同。切換另一種漂白方式，再比較看看。</p></section>
 <div class="life-path-task"><h4>這次反應中，${b.name}自己發生了什麼變化？</h4><div class="life-role-choices">${['oxidation','reduction'].map(r=>`<button data-life-role="${r}" ${seen?'':'disabled'} class="${done&&r===b.role?'chosen':''}">自己${roleName(r)}</button>`).join('')}</div>${feedback(message)}<p class="life-safety">${s.bleach==='chlorine'?'含氯漂白水不可混合酸性或含氨清潔劑。':s.bleach==='sulfur'?'二氧化硫具刺激性，只在螢幕中模擬，不自行操作。':'以適合的色素與反應條件為例，並非每種材料都適用。'}</p></div>
 <details class="prep-note"><summary>為什麼叫氧化劑、還原劑？</summary><p>讓別人被氧化、自己被還原的是氧化劑；讓別人被還原、自己被氧化的是還原劑。這裡比較的是各試劑適用的代表反應，並非對同一種色素做實測。</p></details>`;
}

export function bindLifeObservation(scene,onComplete){
 const button=scene.querySelector('[data-life-play]'),status=scene.querySelector('[data-life-animation-status]');
 let started=false,finished=false,playback;
 const visible=()=>{const r=scene.getBoundingClientRect();playback?.setActive(started&&!document.hidden&&r.bottom>0&&r.top<innerHeight);};
 button.onclick=()=>{
  if(started)return;started=true;finished=false;button.disabled=true;button.textContent='正在觀察…';scene.dataset.observed='false';scene.classList.add('is-playing');
  scene.querySelectorAll('.life-paired-results,.life-key-finding').forEach(e=>e.hidden=true);
  playback?.dispose();playback=createFoodPlayback({duration:matchMedia('(prefers-reduced-motion:reduce)').matches?1:3600,onTime:t=>{
   scene.style.setProperty('--observation-progress',String(t/4));status.textContent=t<1?'先看看反應前的物質。':t<3?'反應正在發生，留意物質的變化。':'看看反應後留下或產生的物質。';
   const dye=scene.querySelector('.life-dye-after');if(dye)dye.style.opacity=String(1-t/4*.9);
  },onState:s=>{if(s.complete&&!finished){finished=true;onComplete();}}});
  scene.scrollIntoView({block:'start',behavior:'instant'});visible();
 };
 window.addEventListener('scroll',visible,{passive:true,capture:true});window.addEventListener('resize',visible);document.addEventListener('visibilitychange',visible);
 return ()=>{playback?.dispose();button.onclick=null;window.removeEventListener('scroll',visible,true);window.removeEventListener('resize',visible);document.removeEventListener('visibilitychange',visible);};
}

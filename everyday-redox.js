import {lifePairedMarkup,bindLifePairedReaction} from './life-paired-reaction.js';
import {lifeBiology,lifeBleaches,lifeEvidence,lifeQuiz,freshLife,restoreLife,lifeMastered,lifeRecord} from './everyday-redox-model.js';
const storageKey='lost-forge-everyday-redox-v1';
const labels={photo:'光合作用',resp:'有氧呼吸',peroxide:'過氧化氫',chlorine:'次氯酸鈉',sulfur:'二氧化硫',food:'維生素 C'};
const roleName=r=>r==='oxidation'?'被氧化':'被還原';
export function savedLifeStatus(){let s=freshLife();try{s=restoreLife(JSON.parse(localStorage.getItem(storageKey)||'null'));}catch{}return {count:s.evidence.length,observed:s.seen.length>0||s.time>0||s.evidence.length>0,mastered:lifeMastered(s)};}
export function savedLifeProgress(){return savedLifeStatus().mastered?1:0;}
export function resetEverydayRedox(){try{localStorage.removeItem(storageKey);}catch{}}

// Embedded in workshop D. Keep the old storage key when moving the activities.
export function mountEverydayRedox(root,{tab=0,reviewRoot=null}={}){
 let s=freshLife(),message='',cleanup=()=>{},saved=true;
 try{s=restoreLife(JSON.parse(localStorage.getItem(storageKey)||'null'));}catch{saved=false;}
 s.tab=tab;
 const save=()=>{try{localStorage.setItem(storageKey,JSON.stringify(s));}catch{saved=false;}root.dispatchEvent(new CustomEvent('life-progress',{bubbles:true,detail:lifeMastered(s)?1:0}));};
 const activeKey=()=>s.tab===0?s.bio:s.tab===1?s.bleach:'food';
 function render(focus){
  cleanup();cleanup=()=>{};const key=activeKey(),seen=key==='food'?(s.time>=4||s.evidence.includes('food')):s.seen.includes(key)||s.evidence.includes(key);
  const reviewMarkup=`<section class="prep-quiz life-integrated-quiz" aria-label="生活氧化還原小試身手"><small>小試身手 · 檢查理解</small><h3>${lifeQuiz.question}</h3><div class="prep-answers">${lifeQuiz.options.map((a,i)=>`<button data-life-answer="${i}" aria-pressed="${s.answer===i}" class="${s.answer===i?(i===lifeQuiz.answer?'correct':'wrong'):''}">${String.fromCharCode(65+i)}　${a}</button>`).join('')}</div><p class="prep-feedback" role="status">${s.answer===null?'':(s.answer===lifeQuiz.answer?'✓ 答對了。':'正確答案是 '+String.fromCharCode(65+lifeQuiz.answer)+'。')+lifeQuiz.reason}</p></section>`;
  root.innerHTML=`<div class="life-integrated-intro"><b>從工坊，看回生活</b><span>${key==='food'?'拿取維生素 C 溶液，加入左側蘋果，比較兩組變化。':'拿取反應物、放入反應區，找出同時發生的氧化與還原。'}</span></div>
  ${s.tab<2?`<div class="life-selector" role="group" aria-label="${s.tab===0?'選擇生物反應':'選擇漂白方式'}">${Object.entries(s.tab===0?lifeBiology:lifeBleaches).map(([k,b])=>`<button data-life-choice="${k}" aria-pressed="${key===k}">${s.tab===1?({peroxide:'過氧化氫 × 豆干',chlorine:'次氯酸鈉 × 衣服',sulfur:'二氧化硫 × 竹筷'})[k]:b.name}${s.evidence.includes(k)?' ✓':''}</button>`).join('')}</div>`:''}
  ${lifePairedMarkup(key,seen)}
  <section class="life-path-task" aria-label="反應後的小問題"><h4>${s.tab===0?(key==='photo'?'光合作用放出氧氣，代表它沒有氧化嗎？':'細胞裡沒有火焰，養分還會被氧化嗎？'):labels[key]+'在這次反應中，自己發生什麼變化？'}</h4>
  <div class="life-role-choices">${(s.tab===0?(key==='photo'?['有氧化，也有還原','只有還原，沒有氧化']:['會，氧化不一定有火焰','不會，只有燃燒才算氧化']):['自己被氧化','自己被還原']).map((label,i)=>`<button data-life-check="${i===0?'oxidation':'reduction'}" ${seen?'':'disabled'}>${label}</button>`).join('')}</div><p class="life-answer-feedback" role="status">${message}</p></section>
  ${s.tab===1?`<p class="life-safety">${key==='chlorine'?'含氯漂白水不可混合酸性或含氨清潔劑。':key==='sulfur'?'二氧化硫具刺激性，只在螢幕中模擬，不自行操作。':'豆干漂白僅作氧化還原觀察，不是食品加工示範；不可自行處理或食用。'}</p>`:''}
  <div class="life-records" aria-label="已取得的生活線索">${lifeEvidence.map(k=>`<span class="${s.evidence.includes(k)?'done':''}">${s.evidence.includes(k)?'✓':'○'} ${labels[k]}</span>`).join('')}</div>
  ${reviewRoot?'':reviewMarkup}
  <div class="life-integrated-footer"><small>${saved?'生活觀察與作答會自動保存。':'本次可操作，瀏覽器暫時無法保存。'}</small></div>
  `;
  if(reviewRoot)reviewRoot.innerHTML=reviewMarkup;
  cleanup=bindLifePairedReaction(root.querySelector('[data-life-observation]'),event=>{
 if(event==='reset'){s.time=0;s.evidence=s.evidence.filter(x=>x!=='food');message='';render('[data-life-input]');save();return;}

   if(key==='food')s.time=4;else if(!s.seen.includes(key))s.seen.push(key);
   message='觀察完成，試著回答下面的小問題。';render('[data-life-retry]');save();root.dispatchEvent(new CustomEvent('life-observed',{bubbles:true}));
  });
  root.querySelectorAll('[data-life-choice]').forEach(b=>b.onclick=()=>{if(s.tab===0)s.bio=b.dataset.lifeChoice;else s.bleach=b.dataset.lifeChoice;message='';render('[data-life-choice="'+activeKey()+'"]');save();});
  root.querySelectorAll('[data-life-check]').forEach(b=>b.onclick=()=>{
   const role=b.dataset.lifeCheck,correct=lifeRecord(s,key,role),answer=s.tab===1?lifeBleaches[key].role:'oxidation';
   message=(correct?'✓ 答對了。':s.tab===0?'正確答案是左邊的選項，再試一次。':'正確答案是「自己'+roleName(answer)+'」，再試一次。')+(s.tab===0?lifeBiology[key].reason:s.tab===1?lifeBleaches[key].reason:'維生素 C 自己被氧化，使部分褐變中間產物被還原；保護作用有限。');render('[data-life-check="'+role+'"]');save();
  });
  (reviewRoot||root).querySelectorAll('[data-life-answer]').forEach(b=>b.onclick=()=>{s.answer=+b.dataset.lifeAnswer;render('[data-life-answer="'+s.answer+'"]');save();});
  if(focus)(root.querySelector(focus)||reviewRoot?.querySelector(focus))?.focus({preventScroll:true});
 }
 render();save();return ()=>{cleanup();reviewRoot?.replaceChildren();};
}

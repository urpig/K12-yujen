import {predictionQuestions,restorePredictions,commitPrediction,clearPredictionRecord,escapePredictionText} from './prediction-model.js';
const key='lost-forge-predictions-v1',esc=escapePredictionText;
let records={},saved=true;try{records=restorePredictions(JSON.parse(localStorage.getItem(key)||'null'));}catch{saved=false;}
function save(){try{localStorage.setItem(key,JSON.stringify(records));}catch{saved=false;}}
export function hasPrediction(id){return !!records[id];}
export function clearPrediction(id){clearPredictionRecord(records,id);save();}
export function predictionMarkup(id){return `<section class="prediction-block" data-prediction-host="${id}" aria-label="操作前先留下猜想"></section>`;}
export function mountPrediction(host,id,{activity,review,observed=false,onStart=()=>{}}={}){
 const q=predictionQuestions[id];if(!q)throw new Error('Missing prediction question: '+id);let started=false,hasObserved=observed;const previewNote=document.createElement('p');previewNote.className='prediction-preview-note';previewNote.setAttribute('role','note');previewNote.textContent='場景預覽 · 先觀察下方場景，留下上方猜想後再動手操作。';activity.before(previewNote);
 function renderReview(){if(!review)return;const entry=records[id];review.hidden=!(entry&&hasObserved);if(review.hidden){review.innerHTML='';return;}
  review.innerHTML=`<section class="prediction-review" aria-label="用觀察回看猜想"><small>觀察後，回看剛才的想法</small><p><b>我原先猜：</b>${esc(q.choices[entry.choice])}</p></section>`;
 }
 function render(){const entry=records[id];activity.hidden=false;activity.inert=!entry;activity.classList.toggle('prediction-preview',!entry);previewNote.hidden=!!entry;
  host.innerHTML=entry?`<div class="prediction-saved"><span class="prediction-icon" aria-hidden="true">✓</span><div><small>操作前的猜想 · 已留下</small><h4 tabindex="-1">${esc(q.question)}</h4><p>${esc(q.choices[entry.choice])}</p><span class="prediction-note">帶著這個想法操作，看看證據會怎麼回答。</span>${saved?'':'<span class="prediction-note">瀏覽器暫時無法保存；本次仍可繼續操作。</span>'}</div></div>`:
  `<div class="prediction-heading"><span class="prediction-icon" aria-hidden="true">?</span><div><small>先猜一猜 · 操作前</small><h4>${esc(q.question)}</h4><p>先留下現在的想法，操作後再回來看。還沒把握也可以。</p></div></div><form class="prediction-form"><fieldset><legend class="prediction-legend">我目前的猜想</legend>${q.choices.map((text,i)=>`<label class="prediction-choice"><input type="radio" name="${id}-guess" value="${i}"><span>${esc(text)}</span></label>`).join('')}</fieldset><div class="prediction-submit-row"><button class="primary" type="submit" disabled>留下猜想，開始操作 →</button><span>選好想法後，再按按鈕開始操作。</span></div></form>`;
  renderReview();if(entry){if(!started){started=true;onStart();}return;}
  const form=host.querySelector('form');form.addEventListener('change',()=>{form.querySelector('[type=submit]').disabled=!form.querySelector('input:checked');});
  form.addEventListener('submit',event=>{event.preventDefault();const chosen=form.querySelector('input:checked');if(!chosen)return;if(!commitPrediction(records,id,Number(chosen.value)))return;save();render();host.querySelector('h4').focus({preventScroll:true});});
 }
 render();return {setObserved(value){if(hasObserved===value)return;hasObserved=value;renderReview();}};
}

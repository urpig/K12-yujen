import {lifeBiology,lifeBleaches,appleComparison} from './everyday-redox-model.js';
import {leafArt,clothArt,appleArt} from './everyday-redox-art.js';
import {createFoodPlayback} from './food-playback.js';

// Each entry records BOTH sides of one representative reaction. The electron
// marker conveys direction only, not a literal electron count or mechanism.
export function lifeReactionPair(key){
 if(lifeBiology[key]){
  const b=lifeBiology[key],oxidation=b.paths.find(p=>p.role==='oxidation'),reduction=b.paths.find(p=>p.role==='reduction');
  return {title:b.name,equation:b.equation,condition:b.condition,oxidation,reduction,finding:b.reason};
 }
 if(lifeBleaches[key]){
  const b=lifeBleaches[key],agent={from:b.name+' '+b.formula,to:b.role==='oxidation'?'氧化後的產物':'還原後的產物'},dye={from:'有色物質',to:'色素結構改變 · 褪色'};
  return {title:b.name+'的漂白作用',condition:'適用色素與合適條件下的代表反應',oxidation:b.role==='oxidation'?agent:dye,reduction:b.role==='reduction'?agent:dye,finding:b.reason};
 }
 if(key==='food')return {title:'維生素 C 延緩蘋果褐變',condition:'相同蘋果、空氣與溫度；比較有無維生素 C',oxidation:{from:'維生素 C',to:'氧化後的維生素 C'},reduction:{from:'褐變中間產物',to:'還原成較不易褐變的物質'},finding:'維生素 C 自己被氧化，幫部分褐變中間產物還原；保護用完後，蘋果仍會逐漸變褐。'};
 throw new Error('Unknown life reaction: '+key);
}
const atom=(name)=>`<i class="life-molecule-atom life-atom-${name}" aria-hidden="true">${name}</i>`;
function substance(label){
 let icon='';
 if(label.includes('CO₂'))icon=['O','C','O'].map(atom).join('');
 else if(label.includes('H₂O')&&!label.includes('H₂O₂'))icon=['H','O','H'].map(atom).join('');
 else if(label.includes('O₂')&&!label.includes('H₂O₂')&&!label.includes('SO₂'))icon=['O','O'].map(atom).join('');
 else if(label.includes('C₆H₁₂O₆'))icon='<i class="life-sugar-symbol" aria-hidden="true">葡萄糖</i>';
 else icon=`<i class="life-substance-symbol" aria-hidden="true">${label.includes('維生素')?'C':label.includes('色')?'◈':'◇'}</i>`;
 return `<div class="life-molecule">${icon}</div><strong>${label}</strong>`;
}
function contextArt(key){
 if(key==='photo')return `<figure class="life-reaction-context">${leafArt()}<figcaption>光能 → 養分中的化學能</figcaption></figure>`;
 if(key==='resp')return '<figure class="life-reaction-context"><div class="prep-art-breath life-cell-picture" role="img" aria-label="細胞內粒線體的卡通示意"></div><figcaption>分步釋放能量，不需要火焰</figcaption></figure>';
 if(key==='food')return `<div class="life-apples paired-apples">${['plain','protected'].map(k=>`<figure>${appleArt(k)}<figcaption><b>${k==='plain'?'沒有維生素 C':'加了維生素 C'}</b><span data-apple-caption="${k}"></span></figcaption></figure>`).join('')}</div><div class="life-paired-time"><b data-life-time-label>剛切開</b><span>維生素 C 的保護能力：<strong data-life-reserve-label>尚未消耗</strong></span></div>`;
 return `<figure class="life-new-cloths life-reaction-context">${clothArt(key)}<figcaption>反應前 → 反應後 · 顏色變淡</figcaption></figure>`;
}
export function lifePairedMarkup(key,complete=false){
 const p=lifeReactionPair(key);
 return `<section class="life-paired-reaction" data-glossary-skip data-life-observation data-life-reaction="${key}" data-phase="${complete?'complete':'ready'}" style="--life-progress:${complete?1:0}" aria-label="${p.title}的氧化還原配對">
 <div class="reaction-heading"><div><small>同一個反應 · 兩邊一起變</small><h4>${p.title}</h4></div><button type="button" class="primary reaction-start" data-life-play>${complete?'↻ 重播反應':'開始反應 →'}</button></div>
 <div class="life-paired-equation"><small>${p.condition}</small>${p.equation?`<b>${p.equation}</b>`:'<b class="life-qualitative-equation"><span>失去電子的一方</span> ＋ <span>得到電子的一方</span> → <span>反應後的物質</span></b>'}</div>
 <div class="life-pair-layout"><div class="life-pair-board" data-life-pair-board>
 ${['oxidation','reduction'].map((role,i)=>`<div class="life-pair-sample ${role}"><small>${i===0?'這一邊失去電子':'這一邊得到電子'}</small><div class="life-substance-change"><div class="life-substance-before"><span>反應前</span>${substance(p[role].from)}</div><div class="life-substance-after"><span>反應後</span>${substance(p[role].to)}</div></div><p class="life-pair-label" data-life-pair-label><b>${p[role].from.split(' ')[0]}${i===0?'被氧化':'被還原'}</b></p></div>`).join('')}
 <div class="life-electron-track" aria-hidden="true"><span>電子轉移（示意） →</span><i data-life-electron>e⁻</i></div>
 </div>${contextArt(key)}</div>
 <p class="life-observe-status" data-life-animation-status role="status">${complete?p.finding:'按下反應鍵，觀察兩邊物質的改變。'}</p>
 <p class="life-pair-model">下方圖樣表示物質種類，並非等量粒子模型。電子圖示只表示轉移方向，不代表數量或實際路徑；反應分多步進行。${key==='photo'?'放出的氧氣來自水，總反應式省略中間步驟。':key==='food'?'時間與變色為示意，保護用完後仍會褐變。':'圖像、顏色與速度皆為教學示意。'}</p></section>`;
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
 if(!scene)return ()=>{};
 const key=scene.dataset.lifeReaction,button=scene.querySelector('[data-life-play]'),status=scene.querySelector('[data-life-animation-status]');
 let playback=null,started=false,finished=false;
 const paint=p=>{scene.querySelectorAll('.life-substance-before').forEach(e=>e.setAttribute('aria-hidden',String(p>=1)));scene.querySelectorAll('.life-substance-after').forEach(e=>e.setAttribute('aria-hidden',String(p===0)));scene.querySelectorAll('[data-life-pair-label]').forEach(e=>e.setAttribute('aria-hidden',String(p===0)));scene.style.setProperty('--life-progress',String(p));scene.dataset.reactionProgress=p.toFixed(3);if(key==='food')paintFood(scene,p);const dye=scene.querySelector('.life-dye-after');if(dye)dye.style.opacity=String(1-p*.9);};
 paint(scene.dataset.phase==='complete'?1:0);
 const visible=()=>{const r=scene.getBoundingClientRect();playback?.setActive(started&&!document.hidden&&!document.querySelector('dialog[open]')&&r.bottom>0&&r.top<innerHeight);};
 button.onclick=()=>{
  if(started)return;started=true;button.disabled=true;button.textContent='反應進行中…';scene.dataset.phase='running';paint(0);
  status.textContent='留意兩邊的物質：氧化與還原正在同時發生。';
  playback=createFoodPlayback({duration:matchMedia('(prefers-reduced-motion:reduce)').matches?1:key==='food'?6500:3600,onTime:t=>paint(t/4),onState:s=>{if(s.complete&&!finished){finished=true;onComplete();}}});
  scene.scrollIntoView({block:'start',behavior:'instant'});visible();
 };
 const modalObserver=new MutationObserver(visible);modalObserver.observe(document.body,{attributes:true,subtree:true,attributeFilter:['open']});
 window.addEventListener('scroll',visible,{passive:true,capture:true});window.addEventListener('resize',visible);document.addEventListener('visibilitychange',visible);
 return ()=>{started=false;finished=true;playback?.dispose();button.onclick=null;modalObserver.disconnect();window.removeEventListener('scroll',visible,true);window.removeEventListener('resize',visible);document.removeEventListener('visibilitychange',visible);};
}

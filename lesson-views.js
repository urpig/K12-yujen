import {createActivity3D} from './activity3d.js';
import {staticLessonGeometry,lessonSpecies} from './lesson-models.js';

const mountedLessonScenes=new Map();
export function arrangeObservationWorkspace(root,artSelector,readingSelector){
 const art=root.querySelector(artSelector);if(!art)return;
 const readings=[...root.children].filter(node=>node.matches(readingSelector));
 const layout=document.createElement('div'),visual=document.createElement('div'),reading=document.createElement('div');
 layout.className='observation-workspace';visual.className='observation-visual';reading.className='observation-reading';
 art.before(layout);layout.append(visual,reading);visual.append(art);reading.append(...readings);
}
export function disposeLessonViews(root){
 for(const [host,model] of mountedLessonScenes)if(root.contains(host)){model.dispose();mountedLessonScenes.delete(host);}
}
export function sphereHostMarkup(label='可旋轉的立體原子模型'){
 return `<div class="model-3d lesson-sphere-host"><canvas tabindex="0" role="img" aria-label="${label}"></canvas><div class="model-fallback" hidden>此瀏覽器未啟用 WebGL；請參考下方反應式與物質外觀。</div></div><div class="model-view-controls lesson-view-controls" role="group" aria-label="立體模型視角"><button type="button" data-orbit="-1">↶ 左轉</button><button type="button" data-orbit="1">右轉 ↷</button><button type="button" data-magnify="1" aria-label="放大模型">＋</button><button type="button" data-magnify="-1" aria-label="縮小模型">−</button><button type="button" data-home-view>重設視角</button></div>`;
}
export function mountLessonSphere(root,geometry,description,onProgress=()=>{}){
 const host=root.querySelector('.lesson-sphere-host'),model=createActivity3D(host,onProgress);
 mountedLessonScenes.set(host,model);model.setGeometry(geometry,description);
 root.querySelector('.lesson-view-controls').addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b)return;
  if(b.dataset.orbit)model.rotate(+b.dataset.orbit);
  else if(b.dataset.magnify)model.magnify(+b.dataset.magnify);
  else if(b.hasAttribute('data-home-view'))model.resetView();
 });
 return model;
}
export function inspectorMarkup(keys,selected=keys[0]){
 return `<details class="atom-details"><summary>放大到原子世界 · 觀察物質的立體模型</summary><div class="lesson-inspector" data-selected-species="${selected}"><div class="observation-heading"><span>原子觀察 <i>／</i> 可旋轉 3D 模型</span><b>無連接棒</b></div><div class="species-tabs" role="group" aria-label="選擇觀察的物質">${keys.map(key=>`<button type="button" data-species="${key}" aria-pressed="${key===selected}">${lessonSpecies(key).name.split(' · ')[0].split('・')[0]}</button>`).join('')}</div>${sphereHostMarkup()}<div class="species-source"></div><p class="model-note">拖曳模型或用方向鍵旋轉。氧球採不透明淺色；其餘球色參考元素外觀。球徑適度調整，物質的整體顏色請看肉眼觀察。</p></div></details>`;
}
export function mountInspector(root){
 const panel=root.querySelector('.lesson-inspector');if(!panel)return;
 let model;
 function select(key){
  const d=lessonSpecies(key),geometry=staticLessonGeometry(key);
  if(!model)model=mountLessonSphere(panel,geometry,d.name+'，無連接棒的立體原子模型');else model.setGeometry(geometry,d.name+'，無連接棒的立體原子模型');
  panel.dataset.selectedSpecies=key;
  panel.querySelectorAll('[data-species]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.species===key)));
  panel.querySelector('.species-source').innerHTML=`<b>${d.name}</b><span>${d.detail}</span>${d.source?`<a href="${d.source}" target="_blank" rel="noopener">結構資料 ↗</a>`:''}`;
 }
 panel.querySelector('.species-tabs').addEventListener('click',e=>{const b=e.target.closest('[data-species]');if(b)select(b.dataset.species);});select(panel.dataset.selectedSpecies);
}

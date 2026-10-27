import {ironAppearanceStage} from './forge-prep-model.js';
import {mountIronSample} from './iron-sample-renderer.js';
const renderers=new WeakMap();
const sample=live=>`<div class="iron-sample-model"><canvas data-iron-sample="${live?'changing':'reference'}" role="img" aria-label="${live?'與序章相同的赤鐵礦模型，外觀隨還原進度改變':'與序章相同的赤鐵礦模型，保留原本紅棕與深灰岩面'}"></canvas></div>`;
export function ironAppearanceMarkup(){return `<section class="iron-appearance" aria-label="氧化鐵與還原後金屬鐵的外觀比較"><div class="iron-appearance-head"><b>同時看：礦石的外觀</b><span>與原子轉移同步</span></div><div class="iron-sample-comparison"><figure>${sample(false)}<figcaption>對照：原本的氧化鐵 Fe₂O₃</figcaption></figure><figure>${sample(true)}<figcaption data-sample-label>氧化鐵 · 紅棕色</figcaption></figure></div><div class="iron-sample-progress" aria-hidden="true">${[1,2,3].map(i=>`<span data-sample-step="${i}"></span>`).join('')}</div><p data-sample-description aria-live="polite">先把 CO 拖入反應區，觀察這份樣本。</p><details class="iron-appearance-note"><summary>外觀示意說明</summary><small>外觀為固態還原的示意，並非照片或真實逐幀變化。灰色區域只連動操作進度，不表示實際成分比例；中途可有不同氧化物共存，顏色不能單獨確認成分。實際還原分多步，高爐中的熔融另見 05。</small></details></section>`;}
export function mountIronAppearance(root){
 const reference=mountIronSample(root.querySelector('[data-iron-sample="reference"]'));
 const changing=mountIronSample(root.querySelector('[data-iron-sample="changing"]'));
 renderers.set(root,changing);
 return ()=>{reference.dispose();changing.dispose();renderers.delete(root);};
}
export function updateIronAppearance(root,count){const stage=ironAppearanceStage(count);renderers.get(root)?.setFraction(stage.fraction);root.querySelector('[data-sample-label]').textContent=stage.label;root.querySelector('[data-sample-description]').textContent=stage.description;root.querySelectorAll('[data-sample-step]').forEach(el=>el.classList.toggle('done',+el.dataset.sampleStep<=stage.count));}

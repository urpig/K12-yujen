import {sampleVisual} from './specimens.js';
import {scopeMarkup} from './card-markup.js';
export const productEvidence={
 Cu:{before:'紅棕色、帶金屬光澤的銅片',after:'黑色表層 · 氧化銅 CuO',detail:'薄片仍在，表面已變黑。黑色是氧化層；裡面可能還有未反應的銅。',state:'固體表層'},
 Mg:{before:'銀白色的鎂帶',after:'白色鬆脆灰燼 · 氧化鎂 MgO',detail:'金屬光澤消失，留下白色固體；白光是反應中的現象。',state:'白色固體'},
 Zn:{before:'灰色、有微弱光澤的鋅粉',after:'氧化鋅 ZnO · 熱黃，冷白',detail:'先看黃色熱產物，再拖到冷卻台；變白後仍是 ZnO，並沒有變回鋅。',state:'固體'},
 Na:{before:'銀白色的鈉塊',after:'淡黃色產物 · 以 Na₂O₂ 為代表',detail:'此案例氧充足。下一步遇水測試沿用這次燃燒的 Na₂O₂，會生成 NaOH。',state:'淡黃色固體'},
 S:{before:'黃色硫粉',after:'無色氣體 · 二氧化硫 SO₂',detail:'原本黃色固體減少；產物向上逸散。藍色是火焰，SO₂ 本身沒有顏色。',state:'無色氣體'},
 P:{before:'暗紅色的紅磷',after:'白煙與白色沉積 · P₄O₁₀',detail:'白煙是懸浮的細小固體，部分落回反應盤；不是白色氣體。',state:'白色固體微粒'},
 C:{before:'黑色木炭 · 氧充足',after:'無色氣體 · 二氧化碳 CO₂',detail:'碳與氧形成氣體，產物逸散到空氣中；看不見不等於沒有生成物。',state:'無色氣體'},
 CO:{before:'黑色木炭 · 氧不足',after:'可形成 CO · 常是混合產物',detail:'氧不足時可能生成 CO，並混有 CO₂、未反應的碳。遇水比較改用已知 CO 樣本。',state:'混合產物案例'}
};
export function productEvidenceMarkup(key,cool){const d=productEvidence[key],solid=['Cu','Mg','Zn','Na'].includes(key);const visual=solid?sampleVisual(key,true,cool,'result-'+key,{vessel:'ceramic',...(key==='Cu'?{form:'sheet',colour:'#272c29'}:{}),...(key==='Na'?{colour:'#eee1a3'}:{})}).replaceAll('氧化鈉','過氧化鈉'):`<div class="escaped-evidence ${key==='P'?'phosphorus-evidence':''}"><span class="escape-mark">${key==='P'?'· · ·':'↑ ↑ ↑'}</span>${key==='P'?'<span class="white-deposit"></span>':''}<b>${key==='S'?'SO₂':key==='P'?'P₄O₁₀':key==='C'?'CO₂':'CO 等'}</b><small>${d.state}</small></div>`;return scopeMarkup(`<div class="product-evidence"><div class="product-portrait">${visual}</div><div><span class="step-label">反應後 · 把外觀說清楚</span><h4>${key==='Zn'?(cool?'冷卻後：白色氧化鋅 ZnO':'仍熱：黃色氧化鋅 ZnO'):d.after}</h4><p><b>原先：</b>${d.before}</p><p>${d.detail}</p></div></div>`,'product-evidence-'+key);}


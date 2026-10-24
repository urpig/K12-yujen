export const cases={
 'wet-metals':[['Na','Na₂O 預備樣本'],['Mg','MgO 氧化鎂'],['Zn','ZnO 氧化鋅'],['Cu','CuO 氧化銅']],
 'wet-nonmetals':[['S','SO₂ 二氧化硫'],['P','P₄O₁₀ 磷氧化物'],['C','CO₂ 二氧化碳'],['CO','CO 一氧化碳']],
 carbon:[['C','氧充足'],['CO','氧不足']],activity:[['ZnCu','鋅 ＋ 氧化銅'],['CuZn','銅 ＋ 氧化鋅']],furnace:[['ore','① 只有礦石'],['coke','② 加焦炭與熱風'],['full','③ 再加石灰石']],steel:[['pure','低碳鐵'],['pig','高碳生鐵'],['steel','適當鋼材']]
};
export function required(c){if(c.type==='mine')return ['inspect','heat','cool'];if(c.type==='metal')return c.symbol==='Zn'?['burn','cool']:['burn'];if(c.type==='nonmetal')return ['burn','wet'];return cases[c.type]?cases[c.type].map(x=>x[0]):['run'];}
export function initialState(c){return {selected:cases[c.type]?.[0][0]||c.symbol||'',phase:'before',cool:false,evidence:[],quizOpen:false,answer:null};}
export function ready(c,s){return required(c).every(k=>s.evidence.includes(k));}
export function sanitize(c,value){const base=initialState(c);if(!value||typeof value!=='object')return base;const allow=required(c);base.evidence=Array.isArray(value.evidence)?[...new Set(value.evidence.filter(x=>allow.includes(x)))]:[];if(cases[c.type]?.some(x=>x[0]===value.selected))base.selected=value.selected;base.cool=c.symbol==='Zn'&&base.evidence.includes('cool');base.phase=value.phase==='after'?'after':'before';
 if(c.type==='mine'){
  // Resume at the last completed observation; old one-click progress is not enough.
  let missing=false;base.evidence=allow.filter(key=>{if(!base.evidence.includes(key))missing=true;return !missing;});
  base.phase=base.evidence.includes('cool')?'after':base.evidence.includes('heat')?'hot':base.evidence.includes('inspect')?'inspected':'before';
 }
 base.quizOpen=ready(c,base)&&value.quizOpen===true;base.answer=base.quizOpen&&Number.isInteger(value.answer)&&value.answer>=0&&value.answer<4?value.answer:null;return base;}

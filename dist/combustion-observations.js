import {combustionProducts} from './combustion-products.js';

// Descriptions refer to the specimen, not to the blue alcohol-lamp flame.
export const specimenFlames={
 Cu:{colour:'#8a5e43',text:'銅片：沒有明顯的自身火焰',detail:'銅片加熱後表面變黑；下方藍色火焰來自酒精燈。'},
 Mg:{colour:'#fff9df',text:'鎂帶：耀眼白光',detail:'燃燒發出強烈白光，形成白色氧化鎂。'},
 Zn:{colour:'#62bdae',text:'鋅粉：藍綠色火焰',detail:'充分加熱後燃燒；氧化鋅熱時黃、冷卻後白。'},
 Na:{colour:'#ffc13d',text:'鈉：黃色火焰',detail:'在本次氧充足條件下，以過氧化鈉為代表產物。'},
 S:{colour:'#467bf6',text:'硫：藍色火焰',detail:'藍色是火焰；生成的二氧化硫是無色氣體。'},
 P:{colour:'#fff0c3',text:'紅磷：明亮黃白色火焰',detail:'同時出現白煙；白煙是磷氧化物固體微粒。'},
 C:{colour:'#e76c36',text:'木炭：紅熱發光，通常沒有明顯火焰',detail:'這裡觀察完全燃燒；生成的二氧化碳是無色氣體。'}
};
export const waterReactions={
 Cu:{equation:null,text:'CuO 加入水：無明顯反應',detail:'氧化銅難溶，黑色固體留在杯底；不寫成生成氫氧化銅。'},
 Mg:{equation:'MgO + H₂O → Mg(OH)₂',text:'氧化鎂與水緩慢作用',detail:'形成難溶的氫氧化鎂，液相呈鹼性。'},
 Zn:{equation:null,text:'ZnO 加入水：無明顯反應',detail:'氧化鋅難溶；不能把加入水直接寫成生成氫氧化鋅。'},
 Na:{equation:'2Na₂O₂ + 2H₂O → 4NaOH + O₂',text:'過氧化鈉與水作用（總反應）',detail:'先形成 NaOH 與 H₂O₂，H₂O₂ 再分解；液相呈鹼性。'},
 S:{equation:'SO₂ + H₂O ⇌ H₂SO₃',text:'二氧化硫溶於水，呈酸性',detail:'國中簡化表示；溶液中多種形式共存，不代表全部變成 H₂SO₃。'},
 P:{equation:'P₄O₁₀ + 6H₂O → 4H₃PO₄',text:'磷氧化物與足量水生成磷酸',detail:'形成酸性溶液。'},
 C:{equation:'CO₂ + H₂O ⇌ H₂CO₃',text:'部分二氧化碳與水形成碳酸',detail:'反應可逆，只有部分 CO₂ 形成 H₂CO₃，溶液呈酸性。'},
 CO:{equation:null,text:'CO 加入水：無明顯反應',detail:'一氧化碳難溶於水。'}
};
export function reactionObservations(key,{ignited=false,heatMs=0,completed=false,waterAdded=false}={}){
 const reacting=completed||ignited||(key==='Cu'&&heatMs>0);
 return {burn:reacting&&combustionProducts[key]?{...combustionProducts[key],...specimenFlames[key]}:null,water:completed&&waterAdded?waterReactions[key]||null:null};
}
export function mountReactionObservations(board,key,{completed=false}={}){
 const live=document.createElement('aside');live.className='specimen-reaction-live';live.hidden=true;live.setAttribute('aria-live','polite');live.setAttribute('aria-atomic','true');board.append(live);
 const record=document.createElement('section');record.className='combustion-reaction-record';record.setAttribute('aria-label','燃燒與加水的反應紀錄');record.innerHTML='<div data-burn-reaction hidden></div><div data-water-reaction hidden></div>';board.after(record);
 const burn=record.querySelector('[data-burn-reaction]'),wet=record.querySelector('[data-water-reaction]');wet.setAttribute('aria-live','polite');
 let lastBurn=false,lastWater=false;
 return function update(state={}){
  const data=reactionObservations(key,{...state,completed});
  if(data.burn&&!lastBurn){const d=data.burn,html=`<b><i style="--specimen-colour:${d.colour}" aria-hidden="true"></i>${d.text}</b><strong class="specimen-equation">${d.equation}</strong><small>${d.detail}</small>`;live.innerHTML=`<b><i style="--specimen-colour:${d.colour}" aria-hidden="true"></i>${d.text}</b><strong class="specimen-equation">${d.equation}</strong>`;burn.innerHTML='<span class="reaction-record-step">① 與氧反應 · 氧化</span>'+html;lastBurn=true;}
  live.hidden=completed||!data.burn;board.classList.toggle('show-specimen-reaction',!live.hidden);burn.hidden=!completed||!data.burn;
  if(data.water&&!lastWater){const d=data.water;wet.innerHTML='<span class="reaction-record-step">② 產物加入水後</span><b>'+d.text+'</b>'+(d.equation?'<strong class="specimen-equation">'+d.equation+'</strong>':'')+'<small>'+d.detail+'</small>';lastWater=true;}
  wet.hidden=!data.water;record.hidden=burn.hidden&&wet.hidden;
 };
}

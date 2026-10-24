import {sampleVisual} from './specimens.js';

const metalSamples={
 Na:{form:'block',name:'鈉塊',before:'銀白色切面 · 塊狀金屬',during:'黃色火焰包圍鈉塊，表面逐漸形成產物。',after:'氧充足時，形成以淡黃色過氧化鈉 Na₂O₂ 為代表的產物。',colour:'#ffb525'},
 Mg:{form:'ribbon',name:'鎂帶',before:'銀白色金屬帶 · 表面有金屬光澤',during:'鎂帶燃燒，放出耀眼白光，逐漸變成白色灰燼。',after:'銀白色鎂帶變成白色、鬆脆的氧化鎂。',colour:'#fffef3'},
 Zn:{form:'powder',name:'鋅粉',before:'灰色細粉 · 顆粒帶有微弱金屬光澤',during:'鋅粉充分加熱，出現藍綠色火焰，形成熱時黃色的氧化鋅。',after:'熱的氧化鋅呈黃色；按「冷卻產物」比較冷卻後的白色。',colour:'#68d3bf'},
 Cu:{form:'sheet',name:'銅片',before:'紅棕色薄片 · 表面有金屬光澤',during:'熱源持續加熱，銅片表面逐漸變黑；銅片本身沒有明顯火焰。',after:'紅棕色銅片表面形成黑色氧化銅，內部仍可能有銅。',colour:'#bd6844'}
};

export function metalObservationText(symbol,phase,cool=false){
 const d=metalSamples[symbol];
 return phase==='before'?d.before:phase==='heating'?d.during:symbol==='Zn'&&cool?'冷卻後，氧化鋅由黃色變白；它仍然是 ZnO。':d.after;
}

export function metalBurnVisual(symbol,phase,cool=false){
 const d=metalSamples[symbol],id='burn-'+symbol;
 const before=sampleVisual(symbol,false,true,id+'-raw',{form:d.form,vessel:'ceramic'}).replace('<svg ', '<svg aria-hidden="true" width="300" height="190" ');
 // Copper is a sheet with an oxide coating, rather than a pile of CuO powder.
 const after=symbol==='Cu'?before.replaceAll(id+'-raw',id+'-oxide').replaceAll('#a65d42','#252723').replaceAll('#fafaf4','#66685e').replaceAll('#e8b58e','#494b42').replaceAll('#7f4936','#252723').replaceAll('#84503b','#373a30').replaceAll('#515c63','#121411')
  :sampleVisual(symbol,true,cool,id+'-oxide',{vessel:'ceramic',...(symbol==='Na'?{colour:'#eee1a3'}:{})}).replaceAll('氧化鈉','過氧化鈉').replace('<svg ', '<svg aria-hidden="true" width="300" height="190" ');
 const flame=symbol==='Cu'?'':`<g class="sample-fire" style="--fire-colour:${d.colour}"><ellipse cx="320" cy="190" rx="97" ry="70" fill="url(#${id}-halo)"/><g class="fire-waver"><path d="M249 214C220 182 254 153 255 133C279 154 273 170 286 175C267 124 308 103 312 62C341 99 332 117 351 145C366 122 363 113 361 102C409 150 423 192 384 216Z" fill="url(#${id}-fire)"/><path d="M276 214C260 191 285 165 287 151C310 171 308 159 315 125C331 151 329 166 345 180C350 162 354 153 355 143C378 173 392 198 369 218Z" fill="${symbol==='Mg'?'#fff':'#fff6cb'}" opacity=".88"/></g>${symbol==='Mg'?`<ellipse cx="322" cy="198" rx="61" ry="24" fill="#fff" filter="url(#${id}-glow)"/><path d="M319 135v-35M319 246v-17M253 191h-36M425 191h-34M274 145l-17-18M366 230l18 18M366 145l18-18" stroke="#fffef2" stroke-width="2" opacity=".8"/>`:''}</g>`;
 const tong=symbol==='Mg'?`<g stroke="url(#${id}-steel)" stroke-width="8" fill="none" stroke-linecap="round"><path d="M388 195L482 154L600 175"/><path d="M391 205L486 171L600 185"/></g><circle cx="485" cy="163" r="6" fill="#7c8780" stroke="#e5e8df"/>`:'';
 return `<div class="metal-observation" data-metal-scene="${symbol}" data-phase="${phase}" style="--sample-colour:${d.colour};--burn-progress:${phase==='product'?1:0}">
 <div class="observation-heading"><span>肉眼觀察 <i>／</i> ${d.name}</span><b data-metal-phase>${phase==='before'?'加熱前':phase==='heating'?'加熱中':'反應後'}</b></div>
 <svg class="metal-lab-svg" viewBox="0 0 640 340" role="img" aria-label="${d.name}的加熱與外觀變化示意">
 <defs>
 <linearGradient id="${id}-wall" x2="0" y2="1"><stop stop-color="#e1e9df"/><stop offset="1" stop-color="#f4f4e9"/></linearGradient>
 <linearGradient id="${id}-floor" x2="0" y2="1"><stop stop-color="#d3ddce"/><stop offset="1" stop-color="#e9ecdf"/></linearGradient>
 <linearGradient id="${id}-steel" x2="0" y2="1"><stop stop-color="#c6cec6"/><stop offset=".4" stop-color="#f4f5ea"/><stop offset=".6" stop-color="#738177"/><stop offset="1" stop-color="#9faa9c"/></linearGradient>
 <linearGradient id="${id}-fire" x2="0" y2="1"><stop stop-color="${d.colour}" stop-opacity=".05"/><stop offset=".45" stop-color="${d.colour}" stop-opacity=".8"/><stop offset="1" stop-color="${d.colour}"/></linearGradient>
 <radialGradient id="${id}-halo"><stop stop-color="${d.colour}" stop-opacity=".6"/><stop offset="1" stop-color="${d.colour}" stop-opacity="0"/></radialGradient>
 <filter id="${id}-glow" x="-100%" y="-150%" width="300%" height="400%"><feGaussianBlur stdDeviation="10"/></filter>
 </defs>
 <path d="M0 0H640V245H0Z" fill="url(#${id}-wall)"/><path d="M0 245H640V340H0Z" fill="url(#${id}-floor)"/>
 <g stroke="#a6b9a1" stroke-width=".7" opacity=".23"><path d="M0 65H640M0 125H640M0 185H640M80 0V245M160 0V245M240 0V245M320 0V245M400 0V245M480 0V245M560 0V245"/><path d="M0 245H640M0 269H640M0 301H640M320 245L0 340M320 245L160 340M320 245V340M320 245L480 340M320 245L640 340"/></g>
 <ellipse cx="325" cy="307" rx="117" ry="14" fill="#425a40" opacity=".13"/>
 <g stroke="#7a8776" fill="none" stroke-width="4"><ellipse cx="320" cy="239" rx="89" ry="12"/><path d="M247 245L225 308M393 245L415 308M322 251L329 315"/></g>
 <g class="heat-source"><path d="M305 280C290 265 307 251 311 239C317 249 320 251 323 239C335 256 346 272 333 281Z" fill="#589dc5" opacity=".8"/><path d="M312 279Q310 263 320 252Q334 272 326 280Z" fill="#b7e0e6"/></g>
 <ellipse cx="321" cy="302" rx="31" ry="17" fill="#d8e9e388" stroke="#92aa9c"/><path d="M293 307Q321 316 349 307" fill="none" stroke="#b4c9be"/><rect x="310" y="281" width="22" height="8" rx="2" fill="#9da99e"/><path d="M321 281v-5" stroke="#c5b78f" stroke-width="5"/>
 <g class="burn-raw" transform="translate(154 61) scale(1.1)">${before}</g>
 <g class="burn-product" transform="translate(154 61) scale(1.1)">${after}</g>
 ${tong}${flame}
 <g class="oxide-dust" fill="#fffdf2" opacity=".35"><circle cx="302" cy="140" r="8"/><circle cx="326" cy="112" r="11"/><circle cx="319" cy="80" r="15"/></g>
 <text x="24" y="320" fill="#74836c" font-size="11" letter-spacing="1">依實物外觀繪製</text>
 <text x="617" y="320" fill="#74836c" font-size="11" text-anchor="end">動畫時間為示意</text>
 </svg>
 <div class="metal-observation-caption" data-metal-caption aria-live="polite">${metalObservationText(symbol,phase,cool)}</div>
 <div class="metal-heat-track" aria-hidden="true"><i></i></div>
 </div>`;
}


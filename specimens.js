import {elements} from './model.js';
import {specimenColour} from './structures.js';

// Original code-drawn illustrations based on bulk samples, not photographs.
// Stable grain placement keeps the same sample when the reaction is scrubbed.
export function sampleVisual(symbol,oxide,cool=false,id='sample',options={}){
 const e=elements[symbol]||{name:symbol==='S'?'硫':'紅磷',oxideName:'磷氧化物 P₄O₁₀',colour:symbol==='S'?'#e4c93d':'#9b3e30'},gas=symbol==='H'&&!oxide||symbol==='C'&&oxide;
 const kind=options.form|| (gas?'gas':symbol==='H'?'water':symbol==='Hg'&&!oxide?'mercury':oxide||symbol==='Zn'||symbol==='Cu'?'powder':symbol==='Mg'?'ribbon':symbol==='Al'?'foil':symbol==='C'?'carbon':'metal');
 const colour=options.colour||(oxide?specimenColour(symbol,true,cool):symbol==='Zn'?'#81878b':symbol==='Cu'?'#a65d42':e.colour);
 const title=(oxide?e.oxideName:e.name)+'的'+(kind==='gas'?'無色氣體':kind==='powder'?'粉末／顆粒':'物質外觀')+'繪製示意';
 const defs=`<defs><linearGradient id="${id}-glass" x2="0" y2="1"><stop stop-color="#f7fcf9" stop-opacity=".08"/><stop offset="1" stop-color="#bfd2cb" stop-opacity=".3"/></linearGradient><linearGradient id="${id}-metal" x2=".7" y2="1"><stop stop-color="#fafaf4"/><stop offset=".3" stop-color="${colour}"/><stop offset=".7" stop-color="#515c63"/><stop offset="1" stop-color="${colour}"/></linearGradient><linearGradient id="${id}-powder" x1=".25" y1="0" x2=".7" y2="1"><stop stop-color="${colour}"/><stop offset=".7" stop-color="${colour}"/><stop offset="1" stop-color="#000" stop-opacity=".4"/></linearGradient><filter id="${id}-rough"><feTurbulence type="fractalNoise" baseFrequency=".55" numOctaves="3" seed="11" result="noise"/><feColorMatrix in="noise" type="saturate" values="0"/><feComposite in2="SourceGraphic" operator="in" result="grain"/><feBlend in="SourceGraphic" in2="grain" mode="multiply"/></filter></defs>`;
 const dish=options.vessel==='none'?'':options.vessel==='ceramic'?`<ellipse cx="150" cy="156" rx="111" ry="13" fill="#26382f" opacity=".14"/><path d="M32 126Q39 166 150 168Q261 166 268 126" fill="#d3d4c9" stroke="#a5ada4"/><ellipse cx="150" cy="126" rx="118" ry="29" fill="#fffef4" stroke="#bdc6b8"/><ellipse cx="150" cy="125" rx="104" ry="22" fill="#ecece0"/><path d="M39 136Q62 157 146 158" fill="none" stroke="#fffef9" stroke-width="4"/>`:`<ellipse cx="150" cy="148" rx="118" ry="16" fill="#41534d" opacity=".09"/><path d="M30 131 Q32 159 150 161 Q268 159 270 131" fill="url(#${id}-glass)" stroke="#b9c9c1" stroke-width="1.2"/><ellipse cx="150" cy="131" rx="120" ry="28" fill="#edf4ee" fill-opacity=".27" stroke="#aebfb6"/><path d="M37 135Q53 155 148 155" fill="none" stroke="#fff" stroke-width="3" opacity=".8"/>`;
 let body='';
 if(kind==='sheet'){
 body=dish+`<path d="M68 105L184 72Q203 78 217 100L233 129L112 146Q87 132 68 105Z" fill="url(#${id}-metal)" stroke="#84503b" stroke-width="1.2"/><path d="M68 105L184 72L191 78L77 110Z" fill="#e8b58e"/><path d="M78 111L191 82M85 120L202 93M96 132L214 110" stroke="#fff" stroke-opacity=".18" fill="none"/><path d="M112 146L233 129L231 132L113 149Z" fill="#7f4936"/>`;
 }else if(kind==='block'){
 body=dish+`<path d="M100 103L155 78L198 99L145 128Z" fill="#e4e8e4" stroke="#b5c0bc"/><path d="M100 103L145 128L144 148L100 124Z" fill="#a0aaa9"/><path d="M145 128L198 99L195 125L144 148Z" fill="url(#${id}-metal)"/><path d="M108 104L156 83L187 99" fill="none" stroke="#fff" stroke-width="2"/><path d="M150 132L187 111" stroke="#edf0eb" stroke-opacity=".7"/>`;
 }else if(kind==='powder'){

  const mound='M52 135 Q61 128 76 124 C93 119 103 96 119 87 Q128 77 139 79 Q150 73 160 80 C177 87 182 99 197 110 Q211 121 225 126 Q238 131 246 135 Q213 148 151 148 Q88 148 52 135Z';
  let seed=197+(oxide?31:0)+symbol.charCodeAt(0);const rand=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
  const metallic=!oxide,grain=[];
  for(let i=0;i<480;i++){
   const y=62+rand()*83,half=10+(y-62)*1.12,x=150+(rand()*2-1)*half,r=(metallic?.55:.25)+rand()*(metallic?1.3:.9),light=rand()>.47;
   grain.push(`<path d="M${x.toFixed(1)} ${y.toFixed(1)}l${(r*1.8).toFixed(1)} ${(-r*.7).toFixed(1)}l${(-r*.3).toFixed(1)} ${(r*1.4).toFixed(1)}z" fill="${light?'#fff':'#000'}" opacity="${(metallic?.09:.045)+(rand()*.15)}"/>`);
  }
  for(let i=0;i<45;i++){const x=45+rand()*209,y=133+rand()*15;grain.push(`<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${(.35+rand()*1.2).toFixed(1)}" ry="${(.2+rand()*.6).toFixed(1)}" fill="${colour}" opacity=".8"/>`);}
  body=dish+`<defs><clipPath id="${id}-clip"><path d="${mound}"/></clipPath></defs><path d="${mound}" fill="${colour}"/><path d="${mound}" fill="url(#${id}-powder)" opacity=".5"/><g clip-path="url(#${id}-clip)" filter="url(#${id}-rough)"><path d="${mound}" fill="${colour}" opacity=".13"/>${grain.slice(0,480).join('')}</g>${grain.slice(480).join('')}`;
 }else if(kind==='gas'){
  body=`<ellipse cx="150" cy="158" rx="62" ry="10" fill="#547168" opacity=".08"/><path d="M130 36h40v34l39 70q9 16-10 17H101q-19-1-10-17l39-70z" fill="url(#${id}-glass)" stroke="#b4c6bd" stroke-width="2"/><path d="M130 36h40v9h-40z" fill="#a5bcae"/><path d="M122 93l-25 47q-5 9 4 10" fill="none" stroke="#fff" stroke-width="4"/><text x="150" y="121" text-anchor="middle" font-size="17" fill="#71877e">${symbol==='H'?'H₂':'CO₂'}</text><text x="150" y="183" text-anchor="middle" font-size="10" fill="#81948a">無色氣體 · 容器僅用來標示</text>`;
 }else if(kind==='water')body=dish+`<ellipse cx="150" cy="135" rx="104" ry="18" fill="#c1d9d6" fill-opacity=".2" stroke="#b2cdca"/><path d="M70 135q39-15 88-8" stroke="#fff" stroke-width="3" fill="none" opacity=".9"/>`;
 else if(kind==='mercury')body=dish+`<path d="M91 119Q97 87 131 97Q155 75 183 101Q216 102 218 124Q202 145 151 145Q103 145 91 119Z" fill="url(#${id}-metal)" stroke="#a4afb1"/><ellipse cx="138" cy="106" rx="22" ry="6" fill="#fff" opacity=".8"/><ellipse cx="73" cy="139" rx="7" ry="4" fill="url(#${id}-metal)"/>`;
 else if(kind==='ribbon')body=dish+`<path d="M73 120Q104 64 156 91T218 119L209 129Q167 101 141 103T83 132Z" fill="url(#${id}-metal)" stroke="#838f93"/><path d="M83 122Q113 81 151 96T208 122" fill="none" stroke="#e9eeed" stroke-width="3"/>`;
 else if(kind==='foil')body=dish+`<path d="M69 105l58-25 31 11 51-8 24 43-52 13-42-11-50 13Z" fill="url(#${id}-metal)" stroke="#9da8a9"/><path d="M73 106l58 13 29-27 22 44M131 119l-40 17M160 92l44 15 22 17" fill="none" stroke="#f5f8f6" stroke-width="2"/>`;
 else if(kind==='carbon'){
  const charcoal='M68 128L71 115L78 111L77 100L86 92L88 83L100 79L113 75L122 80L132 78L140 88L143 100L151 106L154 122L148 131L136 136L128 143L114 141L102 145L92 138L80 139Z M163 137L157 126L160 117L157 104L165 96L169 86L181 79L191 81L203 77L216 87L216 97L225 102L231 118L225 130L214 134L207 142L191 143L181 139L172 143Z';
  const pores=Array.from({length:78},(_,i)=>{const x=76+i*47%150,y=83+i*29%56;return `<ellipse cx="${x}" cy="${y}" rx="${1+i%3*.6}" ry="${.7+i%2*.5}" fill="${i%3?'#070b0c':'#838682'}" opacity="${i%3?.65:.24}"/>`;}).join('');
  body=dish+`<defs><linearGradient id="${id}-charcoal" x2=".6" y2="1"><stop stop-color="#545957"/><stop offset=".45" stop-color="#272d2d"/><stop offset="1" stop-color="#101516"/></linearGradient><clipPath id="${id}-charcoal-clip"><path d="${charcoal}"/></clipPath></defs><path d="${charcoal}" fill="url(#${id}-charcoal)" stroke="#161d1c" stroke-width="1.2"/><g clip-path="url(#${id}-charcoal-clip)"><path d="M81 97Q100 84 135 91M79 107Q105 92 140 101M84 119Q108 107 146 110M97 139L107 109L117 99L121 79M174 88Q188 101 216 95M163 104Q189 115 224 108M165 120Q195 133 221 121M190 82L184 99L193 118L189 143" fill="none" stroke="#101515" stroke-width="2.3"/><path d="M80 95Q103 82 134 88M83 117Q109 104 146 108M165 102Q192 111 220 105" fill="none" stroke="#777d79" opacity=".4" stroke-width="1"/>${pores}</g><g fill="#242a28"><path d="M65 142l5-3 6 3-5 3Z M146 149l4-4 4 3-2 2Z M220 144l4-3 5 3-3 2Z"/></g>`;
 }
 else body=dish+`<path d="M77 123l6-28 29-14 28 8 12 29-23 22-34-3Z" fill="${colour}" stroke="#000" stroke-opacity=".2"/><path d="M83 95l29-14 28 8-22 15Z" fill="#fff" opacity=".24"/><path d="M163 132l-8-27 28-26 31 10 15 31-24 22Z" fill="${colour}"/><path d="M155 105l28-26 31 10-24 20Z" fill="#fff" opacity=".18"/>`;
 return `<svg class="material-illustration" viewBox="0 0 300 190" role="img" aria-label="${title}">${defs}${body}</svg>`;
}

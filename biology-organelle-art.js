import {moleculeDefinitions,moleculeFragment} from './bio-molecule-art.js';
function leafContext(){return `<g class="photo-leaf-context" opacity=".4"><path d="M434 270Q649 161 919 46" stroke="#5f7d43" stroke-width="8" fill="none"/><path d="M475 230C482 93 670 28 919 46C865 206 697 288 475 230Z" fill="url(#photo-leaf)" stroke="#678c4f" stroke-width="1.5"/><g clip-path="url(#photo-leaf-clip)"><path d="M475 230Q694 147 919 46" stroke="#e5edb8" stroke-width="3" fill="none"/>${Array.from({length:10},(_,i)=>{const x=497+i*37,y=221-i*14;return `<path d="M${x} ${y}q-9 -54 28 -93M${x} ${y}q55 5 77 -13" fill="none" stroke="#e1ebb4" stroke-width="1" opacity=".65"/>`;}).join('')}</g></g>`;}
function sunlight(){return `<g aria-hidden="true"><circle cx="83" cy="70" r="105" fill="url(#photo-corona)"/><circle cx="83" cy="70" r="34" fill="url(#photo-sun)"/><circle cx="83" cy="70" r="34" fill="url(#photo-sun)" filter="url(#photo-sun-texture)" opacity=".6"/><circle cx="83" cy="70" r="36" fill="none" stroke="#f8d391" opacity=".5"/><path d="M55 60Q55 38 79 38" fill="none" stroke="#fff7d0" stroke-width="1.7" opacity=".8"/></g><g class="photo-sun-rays" aria-hidden="true" fill="none" stroke="url(#photo-sun-ray)" stroke-width="2.4" stroke-linecap="round">${['M109 96L244 189','M103 102L224 210','M95 107L199 228','M86 109L174 243','M77 109L146 253'].map(d=>`<path class="bio-photon-path bio-sun-ray" d="${d}" stroke-dasharray="6 7"/>`).join('')}</g>`;}
export function organelleArt(key){const photo=key==='photo',prefix=photo?'photo-particles':'resp-particles';return `<svg class="${photo?'photo-detailed-art':'resp-matched-art'}" viewBox="0 0 960 560" role="img" aria-label="${photo?'陽光照亮葉片，放大葉綠體的立體剖面；水被氧化成氧氣，二氧化碳被還原並用來合成糖':'細胞中的粒線體立體剖面：葡萄糖被氧化成二氧化碳，氧氣被還原成水'}">
${moleculeDefinitions(prefix)}
<defs>
 <linearGradient id="${key}-calm" x2=".8" y2="1"><stop stop-color="#fffdf1"/><stop offset=".6" stop-color="#edf2df"/><stop offset="1" stop-color="#dce8cf"/></linearGradient>
 <radialGradient id="${key}-molecule-halo"><stop stop-color="#fffdf1" stop-opacity=".96"/><stop offset="1" stop-color="#fffdf1" stop-opacity="0"/></radialGradient>
 ${photo?`<linearGradient id="photo-leaf" x1="0" y1="1" x2="1" y2="0"><stop stop-color="#315d3d"/><stop offset=".55" stop-color="#87ac58"/><stop offset="1" stop-color="#c0d38c"/></linearGradient>
 <radialGradient id="photo-corona"><stop stop-color="#fff0b2" stop-opacity=".9"/><stop offset=".45" stop-color="#f8d87b" stop-opacity=".32"/><stop offset="1" stop-color="#ffd17c" stop-opacity="0"/></radialGradient>
 <radialGradient id="photo-sun" cx="36%" cy="30%"><stop stop-color="#fff8cb"/><stop offset=".45" stop-color="#ffdc80"/><stop offset=".85" stop-color="#eaa23f"/><stop offset="1" stop-color="#bf722b"/></radialGradient>
 <linearGradient id="photo-sun-ray" x2=".5" y2="1"><stop stop-color="#ffdc7d" stop-opacity=".8"/><stop offset="1" stop-color="#c99942" stop-opacity=".18"/></linearGradient>
 <filter id="photo-sun-texture"><feTurbulence baseFrequency=".16" numOctaves="3" seed="17"/><feComposite in2="SourceAlpha" operator="in"/><feBlend in="SourceGraphic" mode="soft-light"/></filter>
 <clipPath id="photo-leaf-clip"><path d="M475 230C482 93 670 28 919 46C865 206 697 288 475 230Z"/></clipPath>`:''}
</defs>
<rect width="960" height="560" fill="url(#${key}-calm)"/>
${photo?leafContext()+sunlight():''}
<ellipse cx="480" cy="477" rx="378" ry="20" fill="#4c6342" opacity=".1"/>
<image class="bio-organelle ${photo?'photo':'resp'}-organelle" href="${photo?'./assets/story/chloroplast-cutaway-v2.png':'./assets/story/mitochondrion-cutaway-v2.png'}" x="${photo?30:15}" y="143" width="${photo?900:930}" height="360" preserveAspectRatio="xMidYMid meet" opacity="${photo?.91:.87}"/>
<g data-bio-input-one opacity="0"><g transform="translate(12 245) scale(${photo?.7:.85})">${moleculeFragment(photo?'water':'glucose',prefix)}</g></g>
<g data-bio-oxygen-out opacity="0"><ellipse cx="185" cy="238" rx="90" ry="70" fill="url(#${key}-molecule-halo)"/><g transform="translate(125 188) scale(.75)">${moleculeFragment(photo?'oxygen':'co2',prefix)}</g><text x="185" y="279" class="bio-particle-caption">${photo?'氧氣 O₂':'二氧化碳 CO₂'}</text></g>
<g data-bio-input-two opacity="0"><g transform="translate(825 256) scale(.7)">${moleculeFragment(photo?'co2':'oxygen',prefix)}</g></g>
<g data-bio-product opacity="0"><ellipse cx="792" cy="377" rx="${photo?104:86}" ry="85" fill="url(#${key}-molecule-halo)"/><g transform="translate(${photo?'717 315':'731 327'}) scale(${photo?.95:.75})">${moleculeFragment(photo?'glucose':'water',prefix)}</g><text x="792" y="454" class="bio-particle-caption">${photo?'葡萄糖 C₆H₁₂O₆':'水 H₂O'}</text></g>
</svg>`;}

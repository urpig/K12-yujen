import {moleculeDefinitions,moleculeFragment} from './bio-molecule-art.js';
const leafPath='M139 351C102 197 242 44 706 19C664 193 464 346 139 351Z';
function leafVeins(){return Array.from({length:16},(_,i)=>{const t=i/16,x=155+t*510,y=337-t*295;return `<path d="M${x} ${y}Q${x-43} ${y-68} ${x+5} ${y-128*(1-t)}M${x} ${y}Q${x+96} ${y+24} ${x+126*(1-t)} ${y+17}"/>`;}).join('');}
function granum(x,y,scale=1){return `<g transform="translate(${x} ${y}) scale(${scale})" filter="url(#photo-depth)">${[0,1,2,3,4].map(i=>`<path d="M-48 ${i*8}v5a48 11 0 0 0 96 0v-5Z" fill="url(#photo-disc-side)" stroke="#3c6f3c" stroke-width=".6"/><ellipse cy="${i*8}" rx="48" ry="11" fill="url(#photo-disc)" stroke="#aac475" stroke-width=".8"/><path d="M-34 ${i*8-2}Q0 ${i*8-11} 32 ${i*8-2}" fill="none" stroke="#eff4ba" stroke-opacity=".26"/>`).join('')}</g>`;}
export function photosynthesisArt(){return `<svg class="photo-detailed-art" viewBox="0 0 760 405" role="img" aria-label="陽光照亮具有葉脈的葉片，放大葉片內的葉綠體，追蹤水裂解及碳反應">
 <defs>
 <linearGradient id="photo-air" x2="1" y2="1"><stop stop-color="#fbf1d7"/><stop offset=".5" stop-color="#e5edcc"/><stop offset="1" stop-color="#cadbb8"/></linearGradient>
 <linearGradient id="photo-leaf" x1=".2" y1=".8" x2=".8" y2=".1"><stop stop-color="#1f503b"/><stop offset=".4" stop-color="#659541"/><stop offset=".7" stop-color="#8bb54b"/><stop offset="1" stop-color="#d6df82"/></linearGradient>
 <radialGradient id="photo-corona"><stop stop-color="#fff7bb" stop-opacity=".8"/><stop offset=".45" stop-color="#ffdc88" stop-opacity=".45"/><stop offset="1" stop-color="#f8d781" stop-opacity="0"/></radialGradient>
 <radialGradient id="photo-sun" cx="40%" cy="35%"><stop stop-color="#fffde1"/><stop offset=".45" stop-color="#ffe08c"/><stop offset=".8" stop-color="#f2b64d"/><stop offset="1" stop-color="#d78c30"/></radialGradient>
 <radialGradient id="photo-stroma" cx="36%" cy="28%" r="80%"><stop stop-color="#f1f4c9" stop-opacity=".96"/><stop offset=".55" stop-color="#c1d591" stop-opacity=".93"/><stop offset="1" stop-color="#719c57" stop-opacity=".98"/></radialGradient>
 <linearGradient id="photo-membrane" x2=".2" y2="1"><stop stop-color="#e9f4c7"/><stop offset=".32" stop-color="#a8c977"/><stop offset=".65" stop-color="#6a934d"/><stop offset="1" stop-color="#3b683f"/></linearGradient>
 <linearGradient id="photo-disc" x2=".3" y2="1"><stop stop-color="#c7dc84"/><stop offset=".45" stop-color="#7d9f46"/><stop offset="1" stop-color="#456b34"/></linearGradient>
 <linearGradient id="photo-disc-side" x2="0" y2="1"><stop stop-color="#759345"/><stop offset="1" stop-color="#315530"/></linearGradient>
 <filter id="photo-leaf-texture"><feTurbulence type="fractalNoise" baseFrequency=".19" numOctaves="3" seed="7"/><feColorMatrix type="saturate" values="0"/><feBlend in="SourceGraphic" mode="soft-light"/></filter>
 <filter id="photo-sun-texture"><feTurbulence type="fractalNoise" baseFrequency=".16" numOctaves="3" seed="17"/><feComposite in2="SourceAlpha" operator="in"/><feBlend in="SourceGraphic" mode="soft-light"/></filter>
 <filter id="photo-depth" x="-30%" y="-40%" width="160%" height="200%"><feDropShadow dx="0" dy="4" stdDeviation="3" flood-color="#24432b" flood-opacity=".3"/></filter>
 <filter id="photo-soft"><feGaussianBlur stdDeviation="6"/></filter>
 <clipPath id="photo-leaf-clip"><path d="${leafPath}"/></clipPath>
 <clipPath id="photo-stroma-clip"><ellipse cx="388" cy="219" rx="304" ry="124"/></clipPath>
 </defs>${moleculeDefinitions('photo-particles')}
 <rect width="760" height="405" fill="url(#photo-air)"/>
 <g opacity=".25" filter="url(#photo-soft)"><circle cx="688" cy="307" r="85" fill="#79a05a"/><circle cx="63" cy="329" r="70" fill="#b7c888"/><circle cx="610" cy="38" r="30" fill="#ffffe6"/></g>
 <path d="M105 388Q188 293 360 208" stroke="#43673c" stroke-width="11" fill="none"/><path d="${leafPath}" fill="url(#photo-leaf)" stroke="#547a3d" stroke-width="1.5"/>
 <g clip-path="url(#photo-leaf-clip)"><rect x="118" y="18" width="590" height="352" fill="#668f40" opacity=".24" filter="url(#photo-leaf-texture)"/><g fill="none" stroke="#d7e69c" stroke-opacity=".46" stroke-width="1">${leafVeins()}</g><path d="M139 351Q363 185 706 19" fill="none" stroke="#dfedac" stroke-width="4"/><path d="M141 353Q363 190 706 21" fill="none" stroke="#365b33" stroke-opacity=".35" stroke-width="2"/></g>
 <g aria-hidden="true"><circle cx="76" cy="48" r="91" fill="url(#photo-corona)"/><circle cx="76" cy="48" r="33" fill="url(#photo-sun)"/><circle cx="76" cy="48" r="32" fill="url(#photo-sun)" filter="url(#photo-sun-texture)" opacity=".55"/><path d="M45 42Q42 11 75 15M101 35Q119 61 93 77" fill="none" stroke="#fff6c2" stroke-width="1.2" opacity=".8"/><path d="M102 79L190 156L170 169L91 86Z" fill="#fff0a9" opacity=".32"/><path class="bio-photon-path" d="M100 79L177 153" stroke="#d1a34e" stroke-width="2" stroke-dasharray="3 8"/><text x="124" y="49" fill="#7a642e" font-size="12">太陽光</text></g>
 <text x="640" y="50" fill="#325536" font-size="13">葉片與葉脈</text><path d="M638 57l-27 22" stroke="#6a8651" fill="none"/>
 <ellipse cx="392" cy="234" rx="313" ry="132" fill="#294a2e" opacity=".17" filter="url(#photo-soft)"/>
 <ellipse cx="388" cy="222" rx="320" ry="139" fill="url(#photo-membrane)" stroke="#547b45" stroke-width="2"/>
 <ellipse cx="388" cy="216" rx="315" ry="135" fill="none" stroke="#ebf2cf" stroke-width="2"/>
 <ellipse cx="388" cy="219" rx="305" ry="125" fill="url(#photo-stroma)" stroke="#587f45" stroke-width="1"/>
 <g clip-path="url(#photo-stroma-clip)">
 ${Array.from({length:68},(_,i)=>`<circle cx="${112+(i*83)%557}" cy="${120+(i*47)%195}" r="${.7+(i%3)*.6}" fill="#658344" opacity=".2"/>`).join('')}
 <path d="M147 242Q204 220 292 243T379 218M211 220Q240 201 303 206" fill="none" stroke="#648547" stroke-width="8"/><path d="M147 239Q204 217 292 240T379 215" fill="none" stroke="#cedb8d" stroke-width="2"/>
 ${granum(148,221,.62)}${granum(301,197,.76)}${granum(213,171,1.02)}
 <ellipse cx="367" cy="276" rx="22" ry="10" transform="rotate(-18 367 276)" fill="#dbe3b4" stroke="#b0c48d"/>
 </g>
 <rect x="267" y="91" width="242" height="27" rx="13" fill="#eef3d4" fill-opacity=".94" stroke="#adbf88"/><text x="388" y="110" text-anchor="middle" font-size="14" fill="#3b603d" font-weight="bold">葉綠體 · 葉片內部放大</text>
 <g fill="#315733" font-size="13"><text x="213" y="142" text-anchor="middle">① 光反應 · 水裂解</text><text x="534" y="142" text-anchor="middle">② 碳反應</text></g>
 <circle cx="529" cy="215" r="67" fill="#e9f0cc" fill-opacity=".53" stroke="#9ab773" stroke-width="1.3"/>
 <path d="M485 171Q541 142 581 197M579 183l4 17-17-3M573 254Q522 288 479 234M480 248l-3-17 17 2" fill="none" stroke="#537c4b" stroke-width="2.5"/>
 <g data-bio-carrier opacity="0"><path d="M274 259Q368 315 452 260" fill="none" stroke="#b19755" stroke-width="3" stroke-dasharray="5 5"/><rect x="272" y="302" width="231" height="25" rx="12" fill="#fbf2ce" stroke="#c5b879"/><text x="388" y="319" text-anchor="middle" fill="#705d31" font-size="11">ATP、NADPH：帶來能量與還原力</text></g>
 <g data-bio-input-one><g transform="translate(-1 169) scale(.45)">${moleculeFragment('water','photo-particles')}</g><g transform="translate(-1 207) scale(.45)">${moleculeFragment('water','photo-particles')}</g></g>
 <g data-bio-oxygen-out opacity="0"><g transform="translate(198 94) scale(.55)">${moleculeFragment('oxygen','photo-particles')}</g><text x="242" y="165" text-anchor="middle" font-size="12" fill="#355b41">O₂ 排出</text></g>
 <g data-bio-hydrogen opacity="0"><rect x="174" y="253" width="86" height="23" rx="11" fill="#eaf0cd"/><text x="217" y="269" text-anchor="middle" font-size="13" fill="#395f51">H⁺ ＋ e⁻</text></g>
 <g data-bio-input-two opacity="0"><g transform="translate(695 179) scale(.5)">${moleculeFragment('co2','photo-particles')}</g></g>
 <g data-bio-intermediate opacity="0"><rect x="481" y="190" width="96" height="50" rx="10" fill="#fff8de" stroke="#aeb97d"/><text x="529" y="212" text-anchor="middle" font-size="13" fill="#557349">三碳糖</text><text x="529" y="229" text-anchor="middle" font-size="11" fill="#81915d">G3P</text></g>
 <g data-bio-product opacity="0"><path d="M585 253L624 279" stroke="#859553" stroke-width="2" fill="none"/><g transform="translate(615 264) scale(.5)">${moleculeFragment('glucose','photo-particles')}</g><rect x="614" y="332" width="89" height="24" rx="12" fill="#fff2d4" stroke="#c3ac70"/><text x="659" y="349" text-anchor="middle" font-size="12" fill="#66512d">葡萄糖</text></g>
 <text x="388" y="388" text-anchor="middle" fill="#506848" font-size="11">葉綠體與分子為放大示意 · 先追水，再追碳；兩階段相互配合</text>
 </svg>`;}

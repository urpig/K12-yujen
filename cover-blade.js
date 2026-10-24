export function coverBlade(){
 // Layered etching stays inside the blade; the cutting bevel remains polished.
 let layers='';
 for(let i=0;i<55;i++){
  const y=17+i*2.35;let d='';
  for(let x=95;x<=365;x+=3){const bend=3.2*Math.sin(x*.047+y*.057)+1.15*Math.sin(x*.153+y*.08)+3.4*Math.sin((x-230)*.023)*Math.cos(y*.06);d+=(x===95?'M':'L')+x+' '+(y+bend).toFixed(2);}
  layers+=`<path d="${d}" stroke="${i%3===0?'#f0f5f6':'#273c49'}" stroke-width="${i%3===0?.6:.72}" opacity="${i%3===0?.68:.46}"/>`;
 }
 for(let i=0;i<13;i++){
  const rx=4+i*2.7,ry=1.5+i*1.16;let d='';
  for(let n=0;n<=80;n++){const a=n/80*Math.PI*2,w=1+.08*Math.sin(a*3+i*.4);d+=(n?'L':'M')+(237+Math.cos(a)*rx*w).toFixed(2)+' '+(95+Math.sin(a)*ry*w).toFixed(2);}
  layers+=`<path d="${d}Z" stroke="${i%2?'#f3f8fa':'#1b303e'}" stroke-width=".65" opacity=".42"/>`;
 }
 return `<svg class="cover-blade" viewBox="0 0 400 400" role="img" aria-label="放大的大馬士革鋼紋刀：層疊波紋刀身、拋光刃口、黃銅護手與纏繩刀柄"><defs>
 <linearGradient id="cover-blade-steel" x1="0" y1="0" x2=".13" y2="1"><stop stop-color="#172d3b"/><stop offset=".15" stop-color="#627785"/><stop offset=".34" stop-color="#ccd6dc"/><stop offset=".49" stop-color="#f4f7f7"/><stop offset=".55" stop-color="#8296a4"/><stop offset=".79" stop-color="#344d60"/><stop offset="1" stop-color="#c7d3da"/></linearGradient>
 <linearGradient id="cover-blade-edge" x2=".2" y2="1"><stop stop-color="#6e8391"/><stop offset=".3" stop-color="#cddbe1"/><stop offset=".72" stop-color="#fff"/><stop offset="1" stop-color="#b7c6ce"/></linearGradient>
 <linearGradient id="cover-blade-reflection" x1="0" y1="0" x2="1" y2=".2"><stop stop-color="#fff" stop-opacity="0"/><stop offset=".32" stop-color="#fff" stop-opacity="0"/><stop offset=".48" stop-color="#fff" stop-opacity=".58"/><stop offset=".56" stop-color="#fff" stop-opacity=".08"/><stop offset=".8" stop-color="#fff" stop-opacity="0"/></linearGradient>
 <linearGradient id="cover-blade-brass" x2="1" y2=".25"><stop stop-color="#66502d"/><stop offset=".18" stop-color="#ad8a4c"/><stop offset=".4" stop-color="#f5e5b6"/><stop offset=".52" stop-color="#fff3cc"/><stop offset=".65" stop-color="#a88849"/><stop offset="1" stop-color="#6f542f"/></linearGradient>
 <linearGradient id="cover-blade-grip" x2="0" y2="1"><stop stop-color="#211d19"/><stop offset=".34" stop-color="#71523a"/><stop offset=".6" stop-color="#523d2c"/><stop offset="1" stop-color="#211d19"/></linearGradient>
 <clipPath id="cover-blade-outline"><path d="M106 76H258C302 76 331 58 354 35C350 79 331 107 292 116L107 119Z"/></clipPath>
 <filter id="cover-blade-shadow" x="-20%" y="-50%" width="150%" height="220%"><feDropShadow dx="0" dy="5" stdDeviation="3.2" flood-color="#23352e" flood-opacity=".25"/></filter></defs>
 <g transform="translate(200 197) rotate(-28) scale(1.16) translate(-200 -100)" filter="url(#cover-blade-shadow)">
 <path d="M106 76H258C302 76 331 58 354 35C350 79 331 107 292 116L107 119Z" fill="url(#cover-blade-steel)" stroke="#4a616e" stroke-width="1.2"/>
 <g clip-path="url(#cover-blade-outline)"><g fill="none">${layers}</g><path d="M100 25H365V125H100Z" fill="url(#cover-blade-reflection)"/></g>
 <path d="M114 109L286 107C317 104 339 77 350 49C340 89 323 109 291 116L113 118Z" fill="url(#cover-blade-edge)" stroke="#dce7e9" stroke-width=".4"/>
 <path d="M114 118L291 116C325 109 342 87 352 44" fill="none" stroke="#faffff" stroke-width="1.1"/>
 <path d="M115 77H258C299 77 329 60 351 38" fill="none" stroke="#e5edf0" stroke-width="1.15" opacity=".8"/>
 <rect x="34" y="86" width="72" height="25" rx="6" fill="url(#cover-blade-grip)" stroke="#382c22"/>
 <g stroke="#bd9b62" stroke-width="2.8"><path d="M42 87l12 23m-1-23 12 23m-1-23 12 23m-1-23 12 23m-1-23 12 23"/></g><path d="M42 89h55" stroke="#cdb18b" stroke-width=".75" opacity=".5"/>
 <path d="M99 68Q110 62 116 68L113 128Q105 134 99 127L102 101Z" fill="url(#cover-blade-brass)" stroke="#8b703f"/>
 <path d="M26 87Q34 80 40 88L38 112Q30 117 25 110Z" fill="url(#cover-blade-brass)" stroke="#80643a"/>
 <path d="M105 70L108 126" stroke="#fff0bf" stroke-width="1.5" opacity=".85"/>
 </g></svg>`;
}

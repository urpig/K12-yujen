// The opening card separates an observation from the supplied composition clue.
export function mineObservation(phase){return {
 before:'左邊是礦石，右邊是斷鐵器的一角。翻看礦石破面，找找是否有露出的金屬。',
 inspected:'破面仍呈紅棕色。下一個想法：只把它加熱，能不能取得像右側那樣的鐵？',
 heating:'只加熱左邊的礦石。留意：發出的光，和盤裡留下的物質，是同一件事嗎？',
 hot:'礦石受熱發紅了。先別急著判定成功，關掉熱源、冷卻後再比較。',
 cooling:'熱源已關閉，紅光逐漸消退。繼續看冷卻後的外觀。',
 after:'冷卻後，紅光消退，留下的樣本仍與右側鐵片不同。「裡面有鐵」到底是什麼意思？'
 }[phase]||'';}
export function mineEvidenceLabel(key){return {inspect:'翻看破面，與鐵片比較',heat:'看見礦石受熱發紅',cool:'冷卻後，再比較留下的物質'}[key]||key;}
export function mineControls(state,busy){
 const rows=[['inspect','inspect','翻看礦石破面',true],['heat','run','只加熱，看看會怎樣',state.evidence.includes('inspect')],['cool','cool-mine','停止加熱，冷卻比較',state.evidence.includes('heat')]];
 return `<div class="mine-controls">${rows.map(([key,action,label,available],i)=>{const done=state.evidence.includes(key);return `<button class="${available&&!done?'primary':'secondary'} mine-step ${done?'is-done':''}" data-action="${action}" ${busy||done||!available?'disabled':''}><span>${done?'✓':String(i+1).padStart(2,'0')} · ${label}</span><span>${done?'完成':busy&&((key==='heat'&&state.phase==='heating')||(key==='cool'&&state.phase==='cooling'))?'觀察中…':available?'→':'待前一步'}</span></button>`;}).join('')}<p class="control-hint">依序比較三個時刻。想再看一次，可按卡片底部「重設本卡」。</p></div>`;
}
export function mineSceneBody(state={}){
 const phase=state.phase||'before',turned=phase!=='before';
 const outline='M104 211L94 188L103 162L101 138L122 117L148 109L161 94L191 100L211 89L236 105L261 107L282 131L286 155L305 175L297 200L280 219L258 225L235 238L205 229L183 239L154 226L131 230Z';
 const grain=Array.from({length:75},(_,i)=>`<path d="M${104+(i*47)%193} ${112+(i*31)%116}l${2+i%3} -2 3 3 -4 2Z" fill="${i%3?'#482d25':'#e7ba8f'}" opacity="${i%3?.18:.3}"/>`).join('');
 const label=(x,y,text,size=14)=>`<text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" fill="#46604b">${text}</text>`;
 return `<defs><linearGradient id="mine-rock" x2=".8" y2="1"><stop stop-color="#b77b5d"/><stop offset=".45" stop-color="#92513d"/><stop offset="1" stop-color="#684a3c"/></linearGradient><radialGradient id="mine-incandescence"><stop stop-color="#ffbd72"/><stop offset=".6" stop-color="#ed6436"/><stop offset="1" stop-color="#bc3528"/></radialGradient><clipPath id="mine-rock-clip"><path d="${outline}"/></clipPath></defs>
 ${label(203,35,turned?'翻開破面後的礦石':'礦工帶來的礦石',17)}${label(523,35,'斷鐵器的一角',17)}
 <path d="M419 61V285" stroke="#9eaf96" stroke-dasharray="4 6" opacity=".65"/>
 <ellipse cx="202" cy="287" rx="141" ry="17" fill="#48544222"/><path d="M69 240Q202 277 337 240L325 266Q205 295 82 266Z" fill="#b8baaa" stroke="#8e9887"/><ellipse cx="203" cy="239" rx="134" ry="24" fill="#eeeee0" stroke="#a6ad9a"/>
 <g class="mine-rock ${phase==='inspected'?'mine-turn':''}"><path d="${outline}" fill="url(#mine-rock)" stroke="#63432f" stroke-width="1.5"/>
 ${turned?'<path d="M122 117L162 99L191 109L211 96L260 113L284 157L254 187L208 175L165 197L107 164Z" fill="#b46f51"/><path d="M123 119L165 141L210 119L250 143L279 157M165 141L163 196M210 119L210 175M208 175L251 144M165 196L208 175L257 189" stroke="#754a36" stroke-width="2" fill="none"/><path d="M125 120L164 137L209 115L254 140" stroke="#e0a580" stroke-width="2" opacity=".7" fill="none"/>':'<path d="M104 137L148 110L190 102L218 125L185 164L139 172Z" fill="#be8764" opacity=".6"/><path d="M139 171L151 202L179 221M185 165L232 159L277 132M232 160L244 209L260 221M218 125L236 106" stroke="#63432e" stroke-width="2" fill="none"/>'}
 <g clip-path="url(#mine-rock-clip)">${grain}<path class="mine-heat-glow" d="${outline}" fill="url(#mine-incandescence)"/></g></g>
 <g class="mine-heat-waves" fill="none" stroke="#dc9060" stroke-width="2" opacity="0"><path d="M151 88q-9 -13 0 -23M204 79q-9 -13 0 -23M250 91q-9 -13 0 -23"/></g>
 <path d="M107 279H292" stroke="#6c6b5b" stroke-width="8" stroke-linecap="round"/><path class="mine-heater" d="M119 279h162" stroke="#827c66" stroke-width="4"/>
 <ellipse cx="522" cy="229" rx="74" ry="13" fill="#49544a22"/><path d="M454 190L468 158L550 142L562 153L555 169L578 181L568 193L577 207L484 224Z" fill="$METAL" stroke="#516159" stroke-width="2"/><path d="M468 158L550 142L546 150L473 166Z" fill="#e6ece1"/><path d="M454 190L484 224L577 207L576 214L485 231L453 197Z" fill="#4f6056"/><path d="M475 181L538 164M485 198L551 182M499 215L546 203" stroke="#eef1e9" stroke-width="1.5" opacity=".5"/><path d="M549 144L539 162L552 173L545 190L568 205" stroke="#46564b" stroke-width="2" fill="none"/>
 ${label(522,267,'留在旁邊，作外觀對照',13)}${label(203,309,phase==='heating'||phase==='hot'?'盤下熱源加熱中':phase==='cooling'?'已關閉熱源，正在冷卻':phase==='after'?'已冷卻：再和右側比較':'先查看礦石，再啟動熱源',13)}
 ${label(320,346,'虛擬觀察：空氣中單獨加熱；樣本與熱源隔離，時間經壓縮。',12)}`;
}
